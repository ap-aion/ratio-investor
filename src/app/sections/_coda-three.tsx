"use client";

import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { useEffect, useRef } from "react";
import * as THREE from "three";

const W = 1440;
const H = 540;

const VERT = /* glsl */ `
varying vec2 vUv;
void main() {
  vUv = uv;
  gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
}
`;

const FRAG = /* glsl */ `
varying vec2 vUv;
uniform vec2 uMouse;
uniform float uTime;
uniform vec2 uRes;

float hash(vec2 p) { return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453); }
float hash3(vec3 p) { return fract(sin(dot(p, vec3(127.1, 311.7, 74.7))) * 43758.5453); }

float noise(vec2 p) {
  vec2 i = floor(p);
  vec2 f = fract(p);
  vec2 u = f * f * (3.0 - 2.0 * f);
  return mix(
    mix(hash(i + vec2(0.0, 0.0)), hash(i + vec2(1.0, 0.0)), u.x),
    mix(hash(i + vec2(0.0, 1.0)), hash(i + vec2(1.0, 1.0)), u.x),
    u.y
  );
}

float fbm(vec2 p) {
  float v = 0.0;
  float a = 0.5;
  for (int i = 0; i < 5; i++) {
    v += noise(p) * a;
    p *= 2.0;
    a *= 0.5;
  }
  return v;
}

// pseudo-volumetric stars
float stars(vec2 uv, float density, float twinkle) {
  vec2 g = floor(uv);
  vec2 f = fract(uv);
  float h = hash(g);
  float on = step(1.0 - density, h);
  vec2 center = vec2(hash(g + 1.7), hash(g + 4.3));
  float d = distance(f, center);
  float r = mix(0.005, 0.04, hash(g + 2.1));
  float s = smoothstep(r, 0.0, d) * on;
  // twinkle
  float t = 0.6 + 0.4 * sin(uTime * (1.0 + hash(g) * 3.0) + hash(g) * 6.28);
  return s * mix(1.0, t, twinkle);
}

void main() {
  vec2 uv = vUv;
  // mouse parallax: small drift of layers
  vec2 m = uMouse - vec2(0.5);

  // horizon: bottom 40% glows
  float horizon = 1.0 - smoothstep(0.0, 0.55, uv.y);

  // nebula: low-frequency fbm centered around horizon
  vec2 npos = uv * vec2(2.6, 2.0) + vec2(uTime * 0.015, 0.0);
  float n = fbm(npos);
  // sculpt nebula along the horizon band
  float band = exp(-pow((uv.y - 0.05 - m.y * 0.06) * 6.0, 2.0));
  float nebula = n * band;

  // accent glow at center, drifts with mouse
  vec2 cc = vec2(0.5 + m.x * 0.08, 0.05 + m.y * 0.04);
  vec2 d2 = (uv - cc);
  d2.x *= uRes.x / uRes.y;
  float coreGlow = exp(-length(d2 * vec2(2.6, 5.0)) * 1.4);

  // starfield (3 layers with parallax)
  vec2 ssize = vec2(uRes.x / 6.0, uRes.y / 4.0);
  vec2 uv1 = uv * ssize - m * 4.0;
  vec2 uv2 = uv * ssize * 1.6 - m * 7.0;
  vec2 uv3 = uv * ssize * 2.4 - m * 11.0;
  float s = 0.0;
  s += stars(uv1, 0.005, 0.7) * 0.9;
  s += stars(uv2, 0.004, 0.85) * 0.7;
  s += stars(uv3, 0.003, 1.0) * 0.5;

  // mute stars near horizon glow center
  s *= mix(1.0, 0.25, coreGlow);

  vec3 col = vec3(0.043, 0.043, 0.041); // bg
  col += vec3(0.545, 0.361, 0.965) * (nebula * 0.55 + coreGlow * 0.42);
  col += vec3(0.77, 0.71, 0.99) * (s * 0.85);
  // very dim violet horizon line ambience
  col += vec3(0.4, 0.3, 0.7) * horizon * 0.04;

  // film grain
  float g = hash(floor(uv * uRes * 2.0) + uTime * 0.07) - 0.5;
  col += g * 0.014;

  gl_FragColor = vec4(col, 1.0);
}
`;

function Scene() {
  const meshRef = useRef<THREE.Mesh>(null);
  const mouse = useRef(new THREE.Vector2(0.5, 0.5));
  const target = useRef(new THREE.Vector2(0.5, 0.5));
  const { gl } = useThree();

  useEffect(() => {
    const node = gl.domElement;
    const move = (e: PointerEvent) => {
      const rect = node.getBoundingClientRect();
      target.current.set(
        (e.clientX - rect.left) / rect.width,
        1 - (e.clientY - rect.top) / rect.height
      );
    };
    const leave = () => target.current.set(0.5, 0.5);
    // listen on window so mouse anywhere on the section drives parallax
    window.addEventListener("pointermove", move);
    window.addEventListener("pointerleave", leave);
    return () => {
      window.removeEventListener("pointermove", move);
      window.removeEventListener("pointerleave", leave);
    };
  }, [gl]);

  useFrame((state) => {
    const t = state.clock.getElapsedTime();
    mouse.current.lerp(target.current, 0.06);
    if (meshRef.current) {
      const mat = meshRef.current.material as THREE.ShaderMaterial;
      mat.uniforms.uMouse.value.copy(mouse.current);
      mat.uniforms.uTime.value = t;
    }
  });

  return (
    <mesh ref={meshRef} position={[W / 2, H / 2, 0]}>
      <planeGeometry args={[W, H]} />
      <shaderMaterial
        vertexShader={VERT}
        fragmentShader={FRAG}
        uniforms={{
          uMouse: { value: new THREE.Vector2(0.5, 0.5) },
          uTime: { value: 0 },
          uRes: { value: new THREE.Vector2(W, H) },
        }}
      />
    </mesh>
  );
}

export function CodaHorizonCanvas() {
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
        height: "100%",
        left: 0,
        position: "absolute",
        top: 0,
        width: "100%",
        zIndex: 0,
      }}
    >
      <color attach="background" args={["#0A0A09"]} />
      <Scene />
    </Canvas>
  );
}
