"use client";

import { motion } from "motion/react";
import dynamic from "next/dynamic";
import { EASE, Reveal } from "./_motion";

const CodaHorizonCanvas = dynamic(
  () => import("./_coda-three").then((m) => m.CodaHorizonCanvas),
  { ssr: false }
);

const mono: React.CSSProperties = {
  fontFamily: '"IBM Plex Mono", ui-monospace, monospace',
};

function HorizonGlow() {
  return (
    <svg
      width="100%"
      height="120"
      viewBox="0 0 1328 120"
      fill="none"
      style={{ flexShrink: 0 }}
      aria-hidden
    >
      <defs>
        <radialGradient id="coda-glow" cx="50%" cy="100%" r="55%">
          <stop offset="0%" stopColor="#8B5CF6" stopOpacity="0.25" />
          <stop offset="50%" stopColor="#8B5CF6" stopOpacity="0.06" />
          <stop offset="100%" stopColor="#8B5CF6" stopOpacity="0" />
        </radialGradient>
        <linearGradient id="coda-rule" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="rgba(250,250,249,0)" />
          <stop offset="50%" stopColor="rgba(250,250,249,0.6)" />
          <stop offset="100%" stopColor="rgba(250,250,249,0)" />
        </linearGradient>
        <linearGradient id="coda-rule-accent" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="rgba(139,92,246,0)" />
          <stop offset="50%" stopColor="rgba(196,181,253,0.6)" />
          <stop offset="100%" stopColor="rgba(139,92,246,0)" />
        </linearGradient>
      </defs>

      {/* radial glow now provided by Three.js layer */}
      <motion.line
        x1="0"
        y1="100"
        x2="1328"
        y2="100"
        stroke="url(#coda-rule)"
        strokeWidth="0.7"
        initial={{ pathLength: 0 }}
        whileInView={{ pathLength: 1 }}
        viewport={{ once: true, amount: 0.5 }}
        transition={{ duration: 1.6, ease: EASE, delay: 0.1 }}
      />
      {[
        { x1: 200, y: 80, x2: 1128, dash: "2 6", opacity: 0.5, delay: 0.4 },
        { x1: 280, y: 60, x2: 1048, dash: "2 8", opacity: 0.3, delay: 0.55 },
        { x1: 360, y: 40, x2: 968, dash: "2 10", opacity: 0.18, delay: 0.7 },
        { x1: 440, y: 20, x2: 888, dash: "2 12", opacity: 0.12, delay: 0.85 },
      ].map((l, i) => (
        <motion.line
          key={i}
          x1={l.x1}
          y1={l.y}
          x2={l.x2}
          y2={l.y}
          stroke="url(#coda-rule)"
          strokeWidth="0.4"
          strokeDasharray={l.dash}
          initial={{ pathLength: 0, opacity: 0 }}
          whileInView={{ pathLength: 1, opacity: l.opacity }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 1.2, ease: EASE, delay: l.delay }}
        />
      ))}
      {[
        [500, 14, 0.8, "#FAFAF966"],
        [580, 22, 0.9, "#FAFAF980"],
        [664, 8, 1.2, "#FAFAF9B3"],
        [748, 22, 0.9, "#FAFAF980"],
        [828, 14, 0.8, "#FAFAF966"],
      ].map(([cx, cy, r, fill], i) => (
        <motion.circle
          key={i}
          cx={cx as number}
          cy={cy as number}
          r={r as number}
          fill={fill as string}
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.6, delay: 1.0 + i * 0.1 }}
        />
      ))}
      <motion.circle
        cx="664"
        cy="100"
        r="2.4"
        fill="#FAFAF9"
        initial={{ scale: 0 }}
        whileInView={{ scale: 1 }}
        viewport={{ once: true, amount: 0.5 }}
        transition={{ duration: 0.6, ease: EASE, delay: 0.3 }}
        style={{ transformOrigin: "664px 100px", transformBox: "fill-box" }}
      />
      <motion.circle
        cx="664"
        cy="100"
        r="6"
        fill="none"
        stroke="#8B5CF699"
        strokeWidth="0.5"
        initial={{ scale: 0, opacity: 0 }}
        whileInView={{
          scale: [0, 1.4, 1],
          opacity: [0, 1, 0.6],
        }}
        viewport={{ once: true, amount: 0.5 }}
        transition={{ duration: 1.4, ease: EASE, delay: 0.5 }}
        style={{ transformOrigin: "664px 100px", transformBox: "fill-box" }}
      />
      <motion.line
        x1="664"
        y1="100"
        x2="664"
        y2="74"
        stroke="#C4B5FD80"
        strokeWidth="0.5"
        strokeDasharray="2 2"
        initial={{ pathLength: 0 }}
        whileInView={{ pathLength: 1 }}
        viewport={{ once: true, amount: 0.5 }}
        transition={{ duration: 0.8, ease: EASE, delay: 1.4 }}
      />
      <motion.text
        x="664"
        y="68"
        textAnchor="middle"
        fontFamily="IBM Plex Mono"
        fontSize="9"
        letterSpacing="0.18em"
        fill="#C4B5FD"
        style={{ textTransform: "uppercase" }}
        initial={{ opacity: 0, y: 4 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.5 }}
        transition={{ duration: 0.7, ease: EASE, delay: 1.7 }}
      >
        ▲ upstream
      </motion.text>
      <motion.line
        x1="0"
        y1="119"
        x2="1328"
        y2="119"
        stroke="url(#coda-rule-accent)"
        strokeWidth="0.5"
        initial={{ pathLength: 0 }}
        whileInView={{ pathLength: 1 }}
        viewport={{ once: true, amount: 0.5 }}
        transition={{ duration: 1.4, ease: EASE, delay: 0.2 }}
      />
    </svg>
  );
}

export function Coda() {
  return (
    <section
      style={{
        background: "var(--bg-deep)",
        borderTop: "1px solid var(--rule)",
        display: "flex",
        flexDirection: "column",
        gap: 64,
        paddingBottom: 32,
        paddingInline: 56,
        paddingTop: 96,
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* WebGL horizon — sits behind the upper hero block */}
      <div
        aria-hidden
        style={{
          height: 540,
          left: 0,
          pointerEvents: "none",
          position: "absolute",
          top: 0,
          width: 1440,
          zIndex: 0,
          maskImage:
            "linear-gradient(180deg, rgba(0,0,0,1) 0%, rgba(0,0,0,1) 70%, rgba(0,0,0,0) 100%)",
          WebkitMaskImage:
            "linear-gradient(180deg, rgba(0,0,0,1) 0%, rgba(0,0,0,1) 70%, rgba(0,0,0,0) 100%)",
        }}
      >
        <CodaHorizonCanvas />
      </div>

      {/* horizon hero */}
      <div
        style={{
          alignItems: "center",
          display: "flex",
          flexDirection: "column",
          gap: 32,
          position: "relative",
          zIndex: 1,
        }}
      >
        <HorizonGlow />
        <span
          style={{
            ...mono,
            color: "var(--accent-2)",
            fontSize: 10,
            fontWeight: 500,
            letterSpacing: "0.16em",
            lineHeight: "12px",
            textTransform: "uppercase",
          }}
        >
          [ 09 / Coda ]
        </span>
        <h2
          style={{
            color: "var(--ink)",
            fontFamily: '"IBM Plex Sans", system-ui, sans-serif',
            fontSize: 64,
            fontWeight: 500,
            letterSpacing: "-0.04em",
            lineHeight: "68px",
            margin: 0,
            maxWidth: 1100,
            textAlign: "center",
          }}
        >
          {[
            "We are upstream of formation,",
            "not downstream of recruitment.",
          ].map((line, i) => (
            <span
              key={line}
              style={{
                display: "block",
                overflow: "hidden",
                paddingBottom: 4,
              }}
            >
              <motion.span
                initial={{ y: "110%" }}
                whileInView={{ y: "0%" }}
                viewport={{ once: true, amount: 0.4 }}
                transition={{
                  duration: 1.2,
                  ease: EASE,
                  delay: 0.4 + i * 0.18,
                }}
                style={{ display: "inline-block", willChange: "transform" }}
              >
                {line}
              </motion.span>
            </span>
          ))}
        </h2>
        <div style={{ alignItems: "center", display: "flex", gap: 16 }}>
          <span
            style={{
              background: "var(--rule)",
              flexShrink: 0,
              height: 1,
              width: 60,
            }}
          />
          <span
            style={{
              ...mono,
              color: "var(--accent-2)",
              fontSize: 11,
              fontWeight: 500,
              letterSpacing: "0.16em",
              lineHeight: "14px",
              textTransform: "uppercase",
            }}
          >
            Building all three layers · today
          </span>
          <span
            style={{
              background: "var(--rule)",
              flexShrink: 0,
              height: 1,
              width: 60,
            }}
          />
        </div>
      </div>

      {/* footer */}
      <Reveal
        style={{
          alignItems: "center",
          borderTop: "1px solid var(--rule)",
          display: "flex",
          justifyContent: "space-between",
          paddingTop: 24,
        }}
      >
        <div style={{ alignItems: "center", display: "flex", gap: 16 }}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/ratio-labs.png"
            alt="Ratio Labs"
            width={1236}
            height={522}
            style={{
              display: "block",
              height: 26,
              width: "auto",
            }}
          />
          <span
            style={{
              background: "var(--rule)",
              flexShrink: 0,
              height: 12,
              width: 1,
            }}
          />
          <span
            style={{
              ...mono,
              color: "var(--ink-5)",
              fontSize: 9,
              letterSpacing: "0.08em",
              lineHeight: "12px",
              textTransform: "uppercase",
            }}
          >
            © 2026 · Confidential — recipient only
          </span>
        </div>
        <div style={{ alignItems: "center", display: "flex", gap: 24 }}>
          {["v0.1 · 2026.05", "Set in IBM Plex", "↑ Top"].map((t) => {
            const isTop = t === "↑ Top";
            const Tag = isTop ? motion.a : motion.span;
            return (
              <Tag
                key={t}
                href={isTop ? "#thesis" : undefined}
                whileHover={isTop ? { color: "var(--ink)" } : undefined}
                transition={{ duration: 0.2 }}
                style={{
                  ...mono,
                  color: "var(--ink-5)",
                  cursor: isTop ? "pointer" : undefined,
                  fontSize: 9,
                  fontWeight: 500,
                  letterSpacing: "0.08em",
                  lineHeight: "12px",
                  textDecoration: "none",
                  textTransform: "uppercase",
                }}
              >
                {t}
              </Tag>
            );
          })}
        </div>
      </Reveal>
    </section>
  );
}
