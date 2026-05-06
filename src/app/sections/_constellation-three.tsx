"use client";

import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { useEffect, useMemo, useRef } from "react";
import * as THREE from "three";
import { EDGES, POINTS } from "./_constellation-data";

const W = 1440;
const H = 560;
// the locator point in the original
const LOC = { x: 710.7, y: 192.7 };

const POINT_VERT = /* glsl */ `
attribute float aSize;
attribute float aIntensity;
varying float vIntensity;
void main() {
  vIntensity = aIntensity;
  vec4 mv = modelViewMatrix * vec4(position, 1.0);
  gl_Position = projectionMatrix * mv;
  gl_PointSize = aSize;
}
`;

const POINT_FRAG = /* glsl */ `
varying float vIntensity;
uniform vec3 uColor;
void main() {
  vec2 uv = gl_PointCoord - 0.5;
  float r = length(uv);
  if (r > 0.5) discard;
  float core = smoothstep(0.5, 0.0, r);
  float halo = smoothstep(0.5, 0.2, r);
  float a = pow(core, 1.5) * vIntensity;
  // additive halo for the brighter points
  vec3 col = uColor + vec3(0.05, 0.02, 0.10) * halo;
  gl_FragColor = vec4(col, a);
}
`;

const LINE_VERT = /* glsl */ `
attribute float aIntensity;
varying float vIntensity;
void main() {
  vIntensity = aIntensity;
  gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
}
`;

const LINE_FRAG = /* glsl */ `
varying float vIntensity;
uniform vec3 uColor;
uniform vec3 uAccent;
void main() {
  // vIntensity > 1.0 means cursor-boosted: bias toward accent
  float boost = clamp(vIntensity - 1.0, 0.0, 1.5);
  float base = clamp(vIntensity, 0.0, 1.0);
  vec3 col = mix(uColor, uAccent, smoothstep(0.0, 1.2, boost));
  float a = base + boost * 0.8;
  gl_FragColor = vec4(col, clamp(a, 0.0, 1.0));
}
`;

const BG_VERT = /* glsl */ `
varying vec2 vUv;
void main() {
  vUv = uv;
  gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
}
`;

const BG_FRAG = /* glsl */ `
varying vec2 vUv;
uniform vec2 uMouse; // 0..1 in canvas
uniform float uTime;

float hash(vec2 p) { return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453); }

void main() {
  vec2 c = vec2(0.5, 0.5);
  // mouse parallax: glow center drifts with cursor by a small amount
  vec2 glowCenter = c + (uMouse - c) * 0.18;
  float d = distance(vUv, glowCenter);
  float aspect = 1440.0 / 560.0;
  vec2 v = vUv - glowCenter;
  v.x *= aspect; // circular falloff in pixel space
  d = length(v) * (560.0 / 1440.0);

  float glow = smoothstep(0.45, 0.0, d) * 0.18;
  // secondary tighter core
  float core = smoothstep(0.18, 0.0, d) * 0.22;

  // very subtle moving caustic
  float n = hash(floor(vUv * 600.0));
  float twinkle = (n - 0.5) * 0.012;

  vec3 col = vec3(0.043, 0.043, 0.041); // var(--bg) #0C0C0B
  col += vec3(0.545, 0.361, 0.965) * (glow + core); // var(--accent)
  col += vec3(twinkle);

  // film grain via large-scale animated hash
  float g = hash(floor(vUv * 1400.0) + uTime * 0.1) - 0.5;
  col += g * 0.018;

  gl_FragColor = vec4(col, 1.0);
}
`;

function ConstellationScene({
  hoverEnabled,
}: {
  hoverEnabled: boolean;
}) {
  const linesRef = useRef<THREE.LineSegments>(null);
  const pointsRef = useRef<THREE.Points>(null);
  const locatorRef = useRef<THREE.Group>(null);
  const bgRef = useRef<THREE.Mesh>(null);
  const mouseWorld = useRef(new THREE.Vector2(W * 2, H * 2));
  const targetMouseWorld = useRef(new THREE.Vector2(W * 2, H * 2));
  const mouseUv = useRef(new THREE.Vector2(0.5, 0.5));
  const targetUv = useRef(new THREE.Vector2(0.5, 0.5));
  const locatorPos = useRef(new THREE.Vector2(LOC.x, H - LOC.y));

  const { gl, size } = useThree();

  // stable point/edge data
  const data = useMemo(() => {
    const pCount = POINTS.length;
    const posArr = new Float32Array(pCount * 3);
    const restArr = new Float32Array(pCount * 3);
    const sizes = new Float32Array(pCount);
    const intensities = new Float32Array(pCount);
    const baseAlpha = new Float32Array(pCount);
    const phases = new Float32Array(pCount);
    const freqs = new Float32Array(pCount);

    POINTS.forEach(([cx, cy, r, fill], i) => {
      const x = cx;
      const y = H - cy;
      posArr[i * 3 + 0] = x;
      posArr[i * 3 + 1] = y;
      posArr[i * 3 + 2] = 0;
      restArr[i * 3 + 0] = x;
      restArr[i * 3 + 1] = y;
      restArr[i * 3 + 2] = 0;
      sizes[i] = r * 5;
      // parse last two hex chars as alpha
      const alpha = parseInt(fill.slice(7, 9), 16) / 255;
      baseAlpha[i] = alpha;
      intensities[i] = alpha;
      phases[i] = Math.random() * Math.PI * 2;
      freqs[i] = 0.4 + Math.random() * 0.6;
    });

    const eCount = EDGES.length;
    const ePos = new Float32Array(eCount * 6);
    const eInt = new Float32Array(eCount * 2);
    const eAlpha = new Float32Array(eCount);
    const eMid = new Float32Array(eCount * 2); // for cursor distance
    const eEnds = new Int32Array(eCount * 2); // index into POINTS

    // helper: nearest point index to (x, y)
    const idx = (x: number, y: number) => {
      let best = 0;
      let bd = Infinity;
      for (let i = 0; i < POINTS.length; i++) {
        const px = POINTS[i][0];
        const py = POINTS[i][1];
        const d = (px - x) ** 2 + (py - y) ** 2;
        if (d < bd) {
          bd = d;
          best = i;
        }
      }
      return best;
    };

    EDGES.forEach((e, i) => {
      const [x1, y1, x2, y2, stroke] = e;
      ePos[i * 6 + 0] = x1;
      ePos[i * 6 + 1] = H - y1;
      ePos[i * 6 + 2] = 0;
      ePos[i * 6 + 3] = x2;
      ePos[i * 6 + 4] = H - y2;
      ePos[i * 6 + 5] = 0;
      const alpha = parseInt(stroke.slice(7, 9), 16) / 255;
      eAlpha[i] = alpha;
      eInt[i * 2 + 0] = alpha;
      eInt[i * 2 + 1] = alpha;
      eMid[i * 2 + 0] = (x1 + x2) / 2;
      eMid[i * 2 + 1] = H - (y1 + y2) / 2;
      eEnds[i * 2 + 0] = idx(x1, y1);
      eEnds[i * 2 + 1] = idx(x2, y2);
    });

    return {
      pCount,
      eCount,
      posArr,
      restArr,
      sizes,
      intensities,
      baseAlpha,
      phases,
      freqs,
      ePos,
      eInt,
      eAlpha,
      eMid,
      eEnds,
    };
  }, []);

  useEffect(() => {
    const handle = (e: PointerEvent) => {
      const rect = gl.domElement.getBoundingClientRect();
      const cx = e.clientX - rect.left;
      const cy = e.clientY - rect.top;
      const ux = cx / rect.width;
      const uy = cy / rect.height;
      targetMouseWorld.current.set(cx * (W / rect.width), H - cy * (H / rect.height));
      targetUv.current.set(ux, 1 - uy);
    };
    const leave = () => {
      targetMouseWorld.current.set(W * 2, H * 2);
      targetUv.current.set(0.5, 0.5);
    };
    const node = gl.domElement;
    node.addEventListener("pointermove", handle);
    node.addEventListener("pointerleave", leave);
    return () => {
      node.removeEventListener("pointermove", handle);
      node.removeEventListener("pointerleave", leave);
    };
  }, [gl]);

  useFrame((state, delta) => {
    const t = state.clock.getElapsedTime();

    // ease cursor toward target
    mouseWorld.current.lerp(targetMouseWorld.current, 0.18);
    mouseUv.current.lerp(targetUv.current, 0.12);

    if (bgRef.current) {
      const mat = bgRef.current.material as THREE.ShaderMaterial;
      mat.uniforms.uMouse.value.set(
        mouseUv.current.x,
        mouseUv.current.y
      );
      mat.uniforms.uTime.value = t;
    }

    // update points
    if (pointsRef.current) {
      const geom = pointsRef.current.geometry;
      const pos = geom.attributes.position.array as Float32Array;
      const inten = geom.attributes.aIntensity.array as Float32Array;
      const mx = mouseWorld.current.x;
      const my = mouseWorld.current.y;
      const RANGE = 90; // px
      const PULL = 7; // max pull in px
      const LIFT = 0.7; // max intensity boost
      for (let i = 0; i < data.pCount; i++) {
        const restX = data.restArr[i * 3 + 0];
        const restY = data.restArr[i * 3 + 1];
        const phase = data.phases[i];
        const freq = data.freqs[i];
        // gentle float
        const fx = Math.sin(t * freq + phase) * 0.6;
        const fy = Math.cos(t * freq * 0.7 + phase) * 0.6;
        let x = restX + fx;
        let y = restY + fy;
        // mouse pull
        if (hoverEnabled) {
          const dx = mx - restX;
          const dy = my - restY;
          const d = Math.hypot(dx, dy);
          if (d < RANGE) {
            const k = 1 - d / RANGE;
            x += (dx / d) * PULL * k;
            y += (dy / d) * PULL * k;
            inten[i] = data.baseAlpha[i] + LIFT * k * k;
          } else {
            inten[i] = data.baseAlpha[i];
          }
        } else {
          inten[i] = data.baseAlpha[i];
        }
        pos[i * 3 + 0] = x;
        pos[i * 3 + 1] = y;
      }
      (geom.attributes.position as THREE.BufferAttribute).needsUpdate = true;
      (geom.attributes.aIntensity as THREE.BufferAttribute).needsUpdate = true;
    }

    // update edges
    if (linesRef.current && pointsRef.current) {
      const ppos = pointsRef.current.geometry.attributes.position
        .array as Float32Array;
      const lgeom = linesRef.current.geometry;
      const lpos = lgeom.attributes.position.array as Float32Array;
      const lint = lgeom.attributes.aIntensity.array as Float32Array;
      const mx = mouseWorld.current.x;
      const my = mouseWorld.current.y;
      const RANGE = 130;
      for (let i = 0; i < data.eCount; i++) {
        const a = data.eEnds[i * 2 + 0];
        const b = data.eEnds[i * 2 + 1];
        const ax = ppos[a * 3 + 0];
        const ay = ppos[a * 3 + 1];
        const bx = ppos[b * 3 + 0];
        const by = ppos[b * 3 + 1];
        lpos[i * 6 + 0] = ax;
        lpos[i * 6 + 1] = ay;
        lpos[i * 6 + 3] = bx;
        lpos[i * 6 + 4] = by;
        const mxe = (ax + bx) / 2;
        const mye = (ay + by) / 2;
        let intensity = data.eAlpha[i];
        if (hoverEnabled) {
          const d = Math.hypot(mx - mxe, my - mye);
          if (d < RANGE) {
            const k = 1 - d / RANGE;
            intensity += k * k * 1.6; // > 1 triggers accent in shader
          }
        }
        lint[i * 2 + 0] = intensity;
        lint[i * 2 + 1] = intensity;
      }
      (lgeom.attributes.position as THREE.BufferAttribute).needsUpdate = true;
      (lgeom.attributes.aIntensity as THREE.BufferAttribute).needsUpdate = true;
    }

    // locator orbits toward cursor with leash
    if (locatorRef.current) {
      const target = mouseWorld.current;
      const cur = locatorPos.current;
      const dx = target.x - cur.x;
      const dy = target.y - cur.y;
      const d = Math.hypot(dx, dy);
      const HOMING = 220; // only chase within this radius
      if (hoverEnabled && d < HOMING) {
        const k = 1 - d / HOMING;
        cur.x += dx * 0.03 * (0.4 + k);
        cur.y += dy * 0.03 * (0.4 + k);
      } else {
        // return to rest
        const rx = LOC.x;
        const ry = H - LOC.y;
        cur.x += (rx - cur.x) * 0.04;
        cur.y += (ry - cur.y) * 0.04;
      }
      locatorRef.current.position.set(cur.x, cur.y, 0.1);
      // gentle pulse on the outer ring
      const pulse = 1 + Math.sin(t * 1.6) * 0.18;
      const outer = locatorRef.current.children[1] as THREE.Mesh | undefined;
      if (outer) outer.scale.setScalar(pulse);
    }

    void delta;
    void size;
  });

  return (
    <>
      {/* background plane */}
      <mesh ref={bgRef} position={[W / 2, H / 2, -1]}>
        <planeGeometry args={[W, H]} />
        <shaderMaterial
          vertexShader={BG_VERT}
          fragmentShader={BG_FRAG}
          uniforms={{
            uMouse: { value: new THREE.Vector2(0.5, 0.5) },
            uTime: { value: 0 },
          }}
        />
      </mesh>

      {/* edges */}
      <lineSegments ref={linesRef}>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            args={[data.ePos, 3]}
          />
          <bufferAttribute
            attach="attributes-aIntensity"
            args={[data.eInt, 1]}
          />
        </bufferGeometry>
        <shaderMaterial
          vertexShader={LINE_VERT}
          fragmentShader={LINE_FRAG}
          transparent
          depthWrite={false}
          blending={THREE.AdditiveBlending}
          uniforms={{
            uColor: { value: new THREE.Color("#FAFAF9") },
            uAccent: { value: new THREE.Color("#C4B5FD") },
          }}
        />
      </lineSegments>

      {/* points */}
      <points ref={pointsRef}>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            args={[data.posArr, 3]}
          />
          <bufferAttribute
            attach="attributes-aSize"
            args={[data.sizes, 1]}
          />
          <bufferAttribute
            attach="attributes-aIntensity"
            args={[data.intensities, 1]}
          />
        </bufferGeometry>
        <shaderMaterial
          vertexShader={POINT_VERT}
          fragmentShader={POINT_FRAG}
          transparent
          depthWrite={false}
          blending={THREE.AdditiveBlending}
          uniforms={{
            uColor: { value: new THREE.Color("#FAFAF9") },
          }}
        />
      </points>

      {/* locator group */}
      <group ref={locatorRef} position={[LOC.x, H - LOC.y, 0.1]}>
        {/* core */}
        <mesh>
          <circleGeometry args={[3, 32]} />
          <meshBasicMaterial color="#8B5CF6" transparent depthWrite={false} />
        </mesh>
        {/* outer ring (pulsed) */}
        <mesh>
          <ringGeometry args={[5.6, 6.4, 64]} />
          <meshBasicMaterial color="#8B5CF6" transparent opacity={0.9} depthWrite={false} />
        </mesh>
        {/* halo */}
        <mesh>
          <ringGeometry args={[10.6, 11.2, 64]} />
          <meshBasicMaterial
            color="#8B5CF6"
            transparent
            opacity={0.5}
            depthWrite={false}
          />
        </mesh>
      </group>
    </>
  );
}

export function ConstellationCanvas() {
  return (
    <Canvas
      orthographic
      dpr={[1, 2]}
      gl={{ antialias: true, alpha: false }}
      camera={{
        left: 0,
        right: W,
        top: H,
        bottom: 0,
        near: -10,
        far: 10,
        position: [0, 0, 5],
      }}
      style={{
        position: "absolute",
        inset: 0,
        width: "100%",
        height: "100%",
      }}
    >
      <color attach="background" args={["#0C0C0B"]} />
      <ConstellationScene hoverEnabled />
    </Canvas>
  );
}
