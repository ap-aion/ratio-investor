"use client";

import { motion, useAnimationFrame, useMotionValue } from "motion/react";
import { useRef, useState } from "react";

const KEYWORDS = [
  "EQUIVARIANCE",
  "SE(3)",
  "CONSERVATION",
  "PARTIAL DIFFERENTIAL EQUATIONS",
  "MESH",
  "MANIFOLD",
  "GRAPH NEURAL NETWORK",
  "GEOMETRIC DEEP LEARNING",
  "SYMMETRY",
  "INVARIANCE",
  "MOLECULAR DYNAMICS",
  "COMPUTATIONAL FLUID DYNAMICS",
  "FIELD",
  "TENSOR",
  "MESSAGE PASSING",
  "PHYSICS-INFORMED",
];

export function KeywordMarquee() {
  const [hovered, setHovered] = useState(false);
  const x = useMotionValue(0);
  const trackRef = useRef<HTMLDivElement>(null);
  const speedRef = useRef(40); // px / second
  const targetSpeed = useRef(40);

  useAnimationFrame((_, delta) => {
    const desired = hovered ? 8 : 40;
    targetSpeed.current = desired;
    speedRef.current += (desired - speedRef.current) * 0.05;

    const next = x.get() - (speedRef.current * delta) / 1000;
    const trackWidth = trackRef.current?.scrollWidth ?? 0;
    const half = trackWidth / 2;
    if (half > 0 && next <= -half) {
      x.set(next + half);
    } else {
      x.set(next);
    }
  });

  // doubled list for seamless loop
  const items = [...KEYWORDS, ...KEYWORDS];

  return (
    <div
      onPointerEnter={() => setHovered(true)}
      onPointerLeave={() => setHovered(false)}
      style={{
        borderTop: "1px solid var(--rule)",
        borderBottom: "1px solid var(--rule)",
        overflow: "hidden",
        position: "relative",
        width: 1440,
      }}
    >
      <div
        aria-hidden
        style={{
          background:
            "linear-gradient(90deg, var(--bg) 0%, transparent 6%, transparent 94%, var(--bg) 100%)",
          inset: 0,
          pointerEvents: "none",
          position: "absolute",
          zIndex: 2,
        }}
      />
      <motion.div
        ref={trackRef}
        style={{
          alignItems: "center",
          display: "flex",
          gap: 56,
          paddingBlock: 18,
          whiteSpace: "nowrap",
          willChange: "transform",
          x,
        }}
      >
        {items.map((word, i) => (
          <span
            key={`${word}-${i}`}
            style={{
              alignItems: "center",
              color: i % 6 === 2 ? "var(--accent-2)" : "var(--ink-3)",
              display: "flex",
              fontFamily: '"IBM Plex Mono", ui-monospace, monospace',
              fontSize: 14,
              fontWeight: 500,
              gap: 56,
              letterSpacing: "0.18em",
              lineHeight: "16px",
            }}
          >
            {word}
            <span
              aria-hidden
              style={{
                color: "var(--ink-5)",
                fontSize: 12,
              }}
            >
              ✦
            </span>
          </span>
        ))}
      </motion.div>
    </div>
  );
}
