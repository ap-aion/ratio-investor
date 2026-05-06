"use client";

import {
  motion,
  useMotionValue,
  useMotionValueEvent,
  useTransform,
  type MotionValue,
} from "motion/react";
import { useRef, useState } from "react";
import {
  CountUp,
  EASE,
  Reveal,
  RevealChild,
  RevealStagger,
  useScrollSkew,
  useSectionProgress,
} from "./_motion";

const mono: React.CSSProperties = {
  fontFamily: '"IBM Plex Mono", ui-monospace, monospace',
};

type SpeedupCardData = {
  eyebrow: string;
  value: number;
  caption: string;
  accent: boolean;
  scrollSlice: [number, number];
};

function SpeedupCard({
  card,
  progress,
  isLast,
}: {
  card: SpeedupCardData;
  progress: MotionValue<number>;
  isLast: boolean;
}) {
  const [s, e] = card.scrollSlice;
  // scale up briefly when this card's slice hits, then settle
  const scale = useTransform(
    progress,
    [s - 0.05, s, (s + e) / 2, e + 0.05],
    [1, 1.04, 1.08, 1]
  );
  // accent color drift on the eyebrow when active
  const eyebrowColor = useTransform(
    progress,
    [s - 0.05, s, e, e + 0.1],
    [
      card.accent ? "#C4B5FD" : "#62615B",
      "#FFFFFF",
      card.accent ? "#C4B5FD" : "#62615B",
      card.accent ? "#C4B5FD" : "#62615B",
    ]
  );

  return (
    <motion.div
      whileHover={
        card.accent
          ? { background: "rgba(139,92,246,0.10)" }
          : { background: "rgba(255,255,255,0.02)" }
      }
      style={{
        background: card.accent ? "rgba(139,92,246,0.06)" : undefined,
        borderRight: !isLast ? "1px solid var(--rule)" : undefined,
        cursor: "default",
        display: "flex",
        flex: "1 1 0",
        flexBasis: 0,
        flexDirection: "column",
        gap: 6,
        paddingBlock: 28,
        paddingInline: 24,
      }}
    >
      <motion.span
        style={{
          ...mono,
          color: eyebrowColor,
          fontSize: 10,
          fontWeight: 500,
          letterSpacing: "0.08em",
          lineHeight: "12px",
          textTransform: "uppercase",
        }}
      >
        {card.eyebrow}
      </motion.span>
      <motion.span
        style={{
          ...mono,
          color: "var(--ink)",
          display: "inline-block",
          fontSize: 56,
          fontVariantNumeric: "tabular-nums",
          letterSpacing: "-0.03em",
          lineHeight: "56px",
          scale,
          transformOrigin: "0 50%",
        }}
      >
        <CountUp to={card.value} duration={2} suffix="×" />
      </motion.span>
      <span
        style={{
          color: card.accent ? "var(--accent-2)" : "var(--ink-3)",
          fontSize: 12,
          lineHeight: "16px",
        }}
      >
        {card.caption}
      </span>
    </motion.div>
  );
}

function CFDVisual({ progress }: { progress: MotionValue<number> }) {
  // M counts up 0 → 25 between progress 0.05 → 0.35
  const machNum = useTransform(progress, [0.05, 0.35], [0, 25], {
    clamp: true,
  });
  const [machText, setMachText] = useState("M∞ = 0");
  useMotionValueEvent(machNum, "change", (v) => {
    setMachText(`M∞ = ${Math.round(v)}`);
  });
  // freestream arrow length: 0 → 60
  const freestreamLen = useTransform(progress, [0.05, 0.3], [0, 60], {
    clamp: true,
  });
  const fsX2 = useTransform(freestreamLen, (l) => 100 + l);
  const fsHead1 = useTransform(freestreamLen, (l) => 100 + l);
  const fsHead2 = useTransform(freestreamLen, (l) => 100 + l + 8);

  // bow shock pathLength
  const shockProg = useTransform(progress, [0.15, 0.45], [0, 1], {
    clamp: true,
  });

  // capsule subtle parallax
  const capsuleX = useTransform(progress, [0, 1], [-12, 12]);

  return (
    <svg
      width="100%"
      height="280"
      viewBox="0 0 1392 280"
      preserveAspectRatio="xMidYMid meet"
      fill="none"
      style={{ flexShrink: 0 }}
      aria-hidden
    >
      <defs>
        <linearGradient id="cfd-press" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#8B5CF6" stopOpacity="0.35" />
          <stop offset="40%" stopColor="#8B5CF6" stopOpacity="0.15" />
          <stop offset="100%" stopColor="#8B5CF6" stopOpacity="0" />
        </linearGradient>
        <radialGradient id="cfd-stag" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#8B5CF6" stopOpacity="0.5" />
          <stop offset="100%" stopColor="#8B5CF6" stopOpacity="0" />
        </radialGradient>
      </defs>
      {[20, 80, 140, 200, 260].map((y) => (
        <line
          key={y}
          x1="40"
          y1={y}
          x2="1352"
          y2={y}
          stroke="#FAFAF90A"
          strokeWidth="0.5"
        />
      ))}
      <text x="40" y="14" fontFamily="IBM Plex Mono" fontSize="9" fill="#62615B" letterSpacing="0.06em" style={{ textTransform: "uppercase" }}>
        Y · m
      </text>
      {[
        ["−2", 200],
        ["0", 140],
        ["+2", 80],
        ["+4", 14],
      ].map(([label, y]) => (
        <text
          key={String(label)}
          x="34"
          y={y as number}
          textAnchor="end"
          fontFamily="IBM Plex Mono"
          fontSize="8"
          fill="#62615B"
        >
          {label}
        </text>
      ))}

      {/* Freestream arrow — extends with scroll */}
      <g>
        <motion.line x1="100" y1="138" x2={fsX2} y2="138" stroke="#C4B5FD" strokeWidth="0.7" />
        <motion.line x1="100" y1="142" x2={fsX2} y2="142" stroke="#C4B5FD" strokeWidth="0.7" />
        <motion.line x1="100" y1="134" x2={fsX2} y2="134" stroke="#C4B5FD99" strokeWidth="0.5" />
        <motion.line x1="100" y1="146" x2={fsX2} y2="146" stroke="#C4B5FD99" strokeWidth="0.5" />
        <motion.polygon
          points="0,-2 8,0 0,2"
          fill="#C4B5FD"
          style={{ x: fsHead1, y: 140 }}
        />
        <motion.text
          x="100"
          y="124"
          fontFamily="IBM Plex Mono"
          fontSize="9"
          fill="#C4B5FD"
          letterSpacing="0.06em"
          style={{ textTransform: "uppercase" }}
        >
          {machText}
        </motion.text>
        <text
          x="100"
          y="160"
          fontFamily="IBM Plex Mono"
          fontSize="8"
          fill="#62615B"
          letterSpacing="0.06em"
          style={{ textTransform: "uppercase" }}
        >
          freestream
        </text>
      </g>

      {/* Bow shock — draws on with scroll */}
      <motion.path
        d="M 240 60 Q 380 80 520 138 Q 380 198 240 220"
        stroke="#C4B5FD"
        fill="none"
        strokeDasharray="6 3"
        style={{ pathLength: shockProg }}
      />
      <text x="270" y="50" fontFamily="IBM Plex Mono" fontSize="9" fill="#C4B5FD" letterSpacing="0.06em" style={{ textTransform: "uppercase" }}>
        Bow shock
      </text>

      {/* compression streamlines */}
      <path d="M 280 100 Q 400 110 540 140" stroke="#FAFAF92E" strokeWidth="0.5" fill="none" />
      <path d="M 280 80 Q 400 95 530 138" stroke="#FAFAF924" strokeWidth="0.5" fill="none" />
      <path d="M 280 60 Q 400 80 520 132" stroke="#FAFAF91A" strokeWidth="0.5" fill="none" />
      <path d="M 280 180 Q 400 170 540 140" stroke="#FAFAF92E" strokeWidth="0.5" fill="none" />
      <path d="M 280 200 Q 400 185 530 142" stroke="#FAFAF924" strokeWidth="0.5" fill="none" />
      <path d="M 280 220 Q 400 200 520 148" stroke="#FAFAF91A" strokeWidth="0.5" fill="none" />

      {/* Capsule body — subtle parallax with scroll */}
      <motion.g style={{ x: capsuleX }}>
        <ellipse cx="600" cy="140" rx="80" ry="65" fill="url(#cfd-press)" style={{ opacity: 0.4 }} />
        <path
          d="M 540 90 L 740 90 L 760 105 L 760 175 L 740 190 L 540 190 Q 530 190 530 180 L 525 145 Q 528 140 525 135 L 530 100 Q 530 90 540 90 Z"
          stroke="#FAFAF9"
          strokeWidth="1.2"
          fill="#0C0C0B"
        />
        <path
          d="M 542 100 L 740 100 M 542 110 L 740 110 M 542 120 L 758 120 M 542 130 L 760 130 M 542 140 L 760 140 M 542 150 L 760 150 M 542 160 L 758 160 M 542 170 L 740 170 M 542 180 L 740 180"
          stroke="#FAFAF914"
          strokeWidth="0.4"
        />
        <ellipse cx="528" cy="140" rx="14" ry="14" fill="url(#cfd-stag)" />
        <circle cx="528" cy="140" r="3" fill="#FAFAF9" />
      </motion.g>

      <text x="490" y="105" textAnchor="end" fontFamily="IBM Plex Mono" fontSize="9" fill="#FAFAF9" letterSpacing="0.06em" style={{ textTransform: "uppercase" }}>
        Stagnation
      </text>
      <text x="490" y="118" textAnchor="end" fontFamily="IBM Plex Mono" fontSize="8" fill="#C4B5FD" letterSpacing="0.04em">
        P/P∞ = 1.0
      </text>
      <line x1="528" y1="140" x2="492" y2="120" stroke="#FAFAF980" strokeWidth="0.5" strokeDasharray="2 2" />

      <path d="M 760 105 Q 820 130 880 105 M 760 175 Q 820 150 880 175" stroke="#FAFAF966" strokeWidth="0.5" fill="none" strokeDasharray="3 2" />
      <path d="M 880 100 Q 940 110 1000 95" stroke="#FAFAF92E" strokeWidth="0.4" fill="none" strokeDasharray="2 4" />
      <path d="M 880 105 Q 940 120 1000 110" stroke="#FAFAF92E" strokeWidth="0.4" fill="none" strokeDasharray="2 4" />
      <path d="M 880 175 Q 940 165 1000 180" stroke="#FAFAF92E" strokeWidth="0.4" fill="none" strokeDasharray="2 4" />
      <path d="M 880 180 Q 940 170 1000 190" stroke="#FAFAF92E" strokeWidth="0.4" fill="none" strokeDasharray="2 4" />
      <text x="900" y="80" fontFamily="IBM Plex Mono" fontSize="9" fill="#62615B" letterSpacing="0.06em" style={{ textTransform: "uppercase" }}>
        Wake · low P
      </text>
      <text x="900" y="92" fontFamily="IBM Plex Mono" fontSize="8" fill="#62615B" letterSpacing="0.04em">
        expansion fan
      </text>

      <line x1="800" y1="138" x2="900" y2="138" stroke="#C4B5FD66" strokeWidth="0.5" strokeDasharray="2 2" />
      <line x1="800" y1="142" x2="900" y2="142" stroke="#C4B5FD66" strokeWidth="0.5" strokeDasharray="2 2" />

      {/* readout */}
      <text x="1080" y="58" fontFamily="IBM Plex Mono" fontSize="9" fill="#FAFAF9" letterSpacing="0.06em" style={{ textTransform: "uppercase" }}>
        22.8 M cells learned
      </text>
      <text x="1080" y="76" fontFamily="IBM Plex Mono" fontSize="8" fill="#62615B" letterSpacing="0.04em">
        Ratio neural inference · ~5s
      </text>
      <line x1="1080" y1="86" x2="1320" y2="86" stroke="#3B2A5E" strokeWidth="0.5" />
      {[
        ["T_max", "2,760 K", 106, "#FAFAF9"],
        ["P_max", "9.2 atm", 134, "#FAFAF9"],
        ["Q_max", "11.2 MW/m²", 162, "#FAFAF9"],
        ["Δ vs CFD", "< 0.8 %", 190, "#C4B5FD"],
      ].map(([label, val, y, color]) => (
        <g key={String(label)}>
          <text x="1080" y={y as number} fontFamily="IBM Plex Mono" fontSize="11" fill={color as string} letterSpacing="0.04em">
            {label}
          </text>
          <text
            x="1320"
            y={y as number}
            textAnchor="end"
            fontFamily="IBM Plex Mono"
            fontSize="11"
            fill={color as string}
            letterSpacing="0.04em"
          >
            {val}
          </text>
          <line x1="1080" y1={(y as number) + 10} x2="1320" y2={(y as number) + 10} stroke="#FAFAF90F" strokeWidth="0.5" />
        </g>
      ))}

      <line x1="40" y1="262" x2="1352" y2="262" stroke="#FAFAF914" strokeWidth="0.5" />
      <text x="40" y="276" fontFamily="IBM Plex Mono" fontSize="8" fill="#62615B" letterSpacing="0.06em" style={{ textTransform: "uppercase" }}>
        x · m
      </text>
      {[
        ["−4", 240],
        ["0", 528],
        ["+4", 800],
        ["+8", 1040],
      ].map(([label, x]) => (
        <text key={String(label)} x={x as number} y="276" textAnchor="middle" fontFamily="IBM Plex Mono" fontSize="8" fill="#62615B">
          {label}
        </text>
      ))}
    </svg>
  );
}

type Bar = {
  tag: string;
  desc: string;
  value: string;
  width: string;
  accent: boolean;
};

const BARS: Bar[] = [
  {
    tag: "2D · subsonic airfoil",
    desc: "OpenFOAM RANS reference",
    value: "5,400.0s",
    width: "88%",
    accent: false,
  },
  {
    tag: "2D · subsonic airfoil",
    desc: "Ratio neural inference",
    value: "0.1s",
    width: "0.8%",
    accent: true,
  },
  {
    tag: "3D · 22.8M-cell hypersonic",
    desc: "OpenFOAM 3D reference",
    value: "multi-day",
    width: "100%",
    accent: false,
  },
  {
    tag: "3D · 22.8M-cell hypersonic",
    desc: "Ratio neural inference",
    value: "~5s",
    width: "0.5%",
    accent: true,
  },
];

type Paper = {
  idx: string;
  title: string;
  authors: string;
  meta: string;
  badge: { eyebrow: string; value: string; emphasized?: boolean };
  highlight?: boolean;
};

const PAPERS: Paper[] = [
  {
    idx: "[01]",
    title: "Aerothermodynamic Simulators for Rocket Design Using Neural Fields",
    authors: "Sáez de Ocáriz Borde · Innocenzi · Savarino",
    meta: "3AF Conference · Bordeaux · 2023 — arXiv:2303.10283",
    badge: { eyebrow: "First proof", value: "Neural fields · CFD" },
  },
  {
    idx: "[02]",
    title:
      "Geometry-Conditioned Neural Fields for Subsonic Downforce-Generating Airfoil Flow Simulation and Dataset",
    authors:
      "9,977 RANS simulations across 907 geometries · 0.1s inference vs 1.5h OpenFOAM reference",
    meta: "Under review · ICLR 2026",
    badge: { eyebrow: "Speedup", value: "54,000×", emphasized: true },
  },
  {
    idx: "[03]",
    title:
      "Learning 3D Hypersonic Flow with Physics-Enhanced Neural Fields: A Case Study on the Orion Reentry Capsule",
    authors:
      "Sáez de Ocáriz Borde · Innocenzi · Savarino · Popescu · Papageorgiou — 22.8M-cell CFD learned to seconds of inference",
    meta: "arXiv:2603.28791 · 2026",
    badge: { eyebrow: "Speedup · 2× H100", value: "156,000×", emphasized: true },
    highlight: true,
  },
];

export function Speedup() {
  const sectionRef = useRef<HTMLElement>(null);
  const progress = useSectionProgress(sectionRef);
  const skew = useScrollSkew(3);

  return (
    <section
      id="proof"
      ref={sectionRef}
      style={{
        borderTop: "1px solid var(--rule)",
        display: "flex",
        flexDirection: "column",
        gap: 48,
        paddingBlock: "var(--section-pad-y)",
        paddingInline: "var(--pad-x)",
        position: "relative",
      }}
    >
      <motion.div
        style={{
          alignItems: "flex-end",
          display: "flex",
          flexWrap: "wrap",
          gap: 28,
          justifyContent: "space-between",
        }}
      >
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: 14,
            maxWidth: 720,
          }}
        >
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
            [ 07 / Proof ]
          </span>
          <motion.h2
            style={{
              color: "var(--ink)",
              fontFamily: '"IBM Plex Sans", system-ui, sans-serif',
              fontSize: "var(--display-fz)",
              fontWeight: 500,
              letterSpacing: "-0.03em",
              lineHeight: "var(--display-lh)",
              margin: 0,
              skewX: skew,
              transformOrigin: "0 50%",
            }}
          >
            Five orders of magnitude faster than the reference solver.
          </motion.h2>
        </div>
        <span
          style={{
            ...mono,
            color: "var(--ink-5)",
            fontSize: 10,
            letterSpacing: "0.08em",
            lineHeight: "12px",
            textTransform: "uppercase",
          }}
        >
          Fig. 02 · Single H100 node
        </span>
      </motion.div>

      {/* chart card */}
      <Reveal
        amount={0.1}
        style={{
          border: "1px solid var(--rule)",
          display: "flex",
          flexDirection: "column",
        }}
      >
        <div
          style={{
            alignItems: "center",
            borderBottom: "1px solid var(--rule)",
            display: "flex",
            justifyContent: "space-between",
            paddingBlock: 14,
            paddingInline: 24,
          }}
        >
          <div style={{ alignItems: "center", display: "flex", gap: 12 }}>
            <span
              style={{
                ...mono,
                color: "var(--ink)",
                fontSize: 10,
                fontWeight: 500,
                letterSpacing: "0.08em",
                lineHeight: "12px",
                textTransform: "uppercase",
              }}
            >
              Time-to-Solution
            </span>
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
                fontSize: 10,
                letterSpacing: "0.04em",
                lineHeight: "12px",
                textTransform: "uppercase",
              }}
            >
              Log scale · seconds
            </span>
          </div>
          <div style={{ display: "flex", gap: 18 }}>
            {[
              { color: "var(--ink-5)", label: "OpenFOAM ref." },
              { color: "var(--accent)", label: "Ratio inference" },
            ].map((it) => (
              <div
                key={it.label}
                style={{ alignItems: "center", display: "flex", gap: 6 }}
              >
                <span
                  style={{
                    background: it.color,
                    flexShrink: 0,
                    height: 8,
                    width: 8,
                  }}
                />
                <span
                  style={{
                    ...mono,
                    color: "var(--ink)",
                    fontSize: 9,
                    fontWeight: 500,
                    letterSpacing: "0.06em",
                    lineHeight: "12px",
                    textTransform: "uppercase",
                  }}
                >
                  {it.label}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* CFD visual */}
        <div
          className="chart-scroll"
          style={{
            borderBottom: "1px solid var(--rule)",
            display: "flex",
            flexDirection: "column",
          }}
        >
          <div
            style={{
              alignItems: "center",
              borderBottom: "1px solid var(--rule)",
              display: "flex",
              justifyContent: "space-between",
              paddingBlock: 12,
              paddingInline: 24,
            }}
          >
            <div style={{ alignItems: "center", display: "flex", gap: 12 }}>
              <span
                style={{
                  ...mono,
                  color: "var(--ink)",
                  fontSize: 10,
                  fontWeight: 500,
                  letterSpacing: "0.08em",
                  lineHeight: "12px",
                  textTransform: "uppercase",
                }}
              >
                Pressure field · Orion outer mold line
              </span>
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
                  fontSize: 10,
                  letterSpacing: "0.04em",
                  lineHeight: "12px",
                  textTransform: "uppercase",
                }}
              >
                M∞ = 25 · 22.8 M cells · learned in seconds
              </span>
            </div>
            <div style={{ alignItems: "center", display: "flex", gap: 6 }}>
              <span
                style={{
                  background:
                    "linear-gradient(90deg, rgba(139,92,246,0.2), rgba(139,92,246,1))",
                  flexShrink: 0,
                  height: 2,
                  width: 10,
                }}
              />
              <span
                style={{
                  ...mono,
                  color: "var(--accent-2)",
                  fontSize: 9,
                  fontWeight: 500,
                  letterSpacing: "0.06em",
                  lineHeight: "12px",
                  textTransform: "uppercase",
                }}
              >
                P / Pₘₐₓ
              </span>
            </div>
          </div>
          <CFDVisual progress={progress} />
        </div>

        {/* bars */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            paddingTop: 24,
            paddingInline: 24,
            paddingBottom: 16,
          }}
        >
          {BARS.map((bar, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 8 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.4 }}
              transition={{ duration: 0.6, ease: EASE, delay: i * 0.15 }}
              style={{
                alignItems: "center",
                borderBottom:
                  i < BARS.length - 1 ? "1px solid var(--rule)" : undefined,
                display: "flex",
                paddingBlock: 12,
              }}
            >
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  flexShrink: 0,
                  gap: 2,
                  width: "min(240px, 50%)",
                }}
              >
                <span
                  style={{
                    ...mono,
                    color: bar.accent ? "var(--accent-2)" : "var(--ink-5)",
                    fontSize: 9,
                    fontWeight: 500,
                    letterSpacing: "0.06em",
                    lineHeight: "12px",
                    textTransform: "uppercase",
                  }}
                >
                  {bar.tag}
                </span>
                <span
                  style={{
                    color: bar.accent ? "var(--ink)" : "var(--ink-3)",
                    fontSize: 13,
                    lineHeight: "16px",
                  }}
                >
                  {bar.desc}
                </span>
              </div>
              <motion.div
                initial={{ scaleX: 0 }}
                whileInView={{ scaleX: 1 }}
                viewport={{ once: true, amount: 0.4 }}
                transition={{
                  duration: 1.2,
                  ease: EASE,
                  delay: i * 0.15 + 0.2,
                }}
                style={{
                  background: bar.accent ? "var(--accent)" : "var(--ink-5)",
                  boxShadow: bar.accent
                    ? "0 0 20px rgba(139,92,246,0.5)"
                    : undefined,
                  flex: "1 1 0",
                  flexBasis: 0,
                  height: 16,
                  maxWidth: bar.width,
                  minWidth: bar.accent ? 4 : undefined,
                  transformOrigin: "0% 50%",
                }}
              />
              <span
                style={{
                  ...mono,
                  color: bar.accent ? "var(--accent-2)" : "var(--ink)",
                  flexShrink: 0,
                  fontSize: 14,
                  fontVariantNumeric: "tabular-nums",
                  fontWeight: 500,
                  lineHeight: "18px",
                  textAlign: "right",
                  width: 120,
                }}
              >
                {bar.value}
              </span>
            </motion.div>
          ))}
        </div>

        {/* big metrics */}
        <div
          className="stack-md with-rules"
          style={{
            background: "var(--bg-elev)",
            borderTop: "1px solid var(--rule)",
            display: "flex",
          }}
        >
          {[
            {
              eyebrow: "Speedup · 2D Airfoil",
              value: 54000,
              caption: "1.5h reference → 0.1s inference",
              accent: false,
              scrollSlice: [0.55, 0.62] as [number, number],
            },
            {
              eyebrow: "Speedup · 3D Hypersonic · 1× H100",
              value: 93600,
              caption: "22.8M-cell CFD on Orion outer mold line.",
              accent: true,
              scrollSlice: [0.65, 0.72] as [number, number],
            },
            {
              eyebrow: "Speedup · 3D · 2× H100",
              value: 156000,
              caption: "Linear scaling across the node.",
              accent: true,
              scrollSlice: [0.75, 0.82] as [number, number],
            },
          ].map((m, i, arr) => (
            <SpeedupCard
              key={m.eyebrow}
              card={m}
              progress={progress}
              isLast={i === arr.length - 1}
            />
          ))}
        </div>
      </Reveal>

      {/* papers */}
      <RevealStagger
        amount={0.1}
        each={0.12}
        style={{
          borderTop: "1px solid var(--rule)",
          display: "flex",
          flexDirection: "column",
        }}
      >
        <div
          style={{
            alignItems: "center",
            display: "flex",
            justifyContent: "space-between",
            paddingBlock: 18,
          }}
        >
          <div style={{ alignItems: "center", display: "flex", gap: 12 }}>
            <span
              style={{
                ...mono,
                color: "var(--ink)",
                fontSize: 10,
                fontWeight: 500,
                letterSpacing: "0.08em",
                lineHeight: "12px",
                textTransform: "uppercase",
              }}
            >
              Published Proof
            </span>
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
                fontSize: 10,
                letterSpacing: "0.04em",
                lineHeight: "12px",
                textTransform: "uppercase",
              }}
            >
              3 papers · 2023 → 2026
            </span>
          </div>
          <span
            style={{
              ...mono,
              color: "var(--accent-2)",
              fontSize: 10,
              fontWeight: 500,
              letterSpacing: "0.08em",
              lineHeight: "12px",
              textTransform: "uppercase",
            }}
          >
            arXiv ↗
          </span>
        </div>

        {PAPERS.map((p) => (
          <motion.div
            key={p.idx}
            variants={{
              hidden: { opacity: 0, y: 12 },
              visible: {
                opacity: 1,
                y: 0,
                transition: { duration: 0.7, ease: EASE },
              },
            }}
            whileHover={{
              background: p.highlight
                ? "rgba(139,92,246,0.10)"
                : "rgba(139,92,246,0.05)",
              x: 4,
            }}
            transition={{ duration: 0.3, ease: EASE }}
            style={{
              alignItems: "flex-start",
              background: p.highlight ? "rgba(139,92,246,0.04)" : undefined,
              borderTop: "1px solid var(--rule)",
              borderBottom: p.highlight ? "1px solid var(--rule)" : undefined,
              cursor: "pointer",
              display: "flex",
              flexWrap: "wrap",
              gap: 24,
              paddingBlock: 22,
              paddingInline: 4,
            }}
          >
            <span
              style={{
                ...mono,
                color: p.highlight ? "var(--accent-2)" : "var(--ink-5)",
                flexShrink: 0,
                fontSize: 12,
                fontVariantNumeric: "tabular-nums",
                lineHeight: "16px",
                width: 60,
              }}
            >
              {p.idx}
            </span>
            <div
              style={{
                display: "flex",
                flex: "2 1 280px",
                flexDirection: "column",
                gap: 6,
              }}
            >
              <span
                style={{
                  color: "var(--ink)",
                  fontFamily:
                    '"IBM Plex Sans", system-ui, sans-serif',
                  fontSize: 17,
                  fontWeight: 500,
                  letterSpacing: "-0.01em",
                  lineHeight: "22px",
                }}
              >
                {p.title}
              </span>
              <span
                style={{
                  color: "var(--ink-3)",
                  fontSize: 13,
                  lineHeight: "16px",
                }}
              >
                {p.authors}
              </span>
              <span
                style={{
                  ...mono,
                  color: "var(--ink-5)",
                  fontSize: 11,
                  letterSpacing: "0.04em",
                  lineHeight: "14px",
                }}
              >
                {p.meta}
              </span>
            </div>
            <div
              className="paper-badge"
              style={{
                alignItems: "flex-end",
                display: "flex",
                flex: "0 0 auto",
                flexDirection: "column",
                gap: 4,
                width: "min(200px, 100%)",
              }}
            >
              <span
                style={{
                  ...mono,
                  color: "var(--ink-5)",
                  fontSize: 9,
                  fontWeight: 500,
                  letterSpacing: "0.08em",
                  lineHeight: "12px",
                  textTransform: "uppercase",
                }}
              >
                {p.badge.eyebrow}
              </span>
              <span
                style={{
                  ...mono,
                  color: p.badge.emphasized ? "var(--accent-2)" : "var(--ink)",
                  fontSize: p.badge.emphasized ? 26 : 18,
                  fontVariantNumeric: "tabular-nums",
                  letterSpacing: "-0.01em",
                  lineHeight: p.badge.emphasized ? "32px" : "22px",
                }}
              >
                {p.badge.value === "54,000×" ? (
                  <CountUp to={54000} duration={1.6} suffix="×" />
                ) : p.badge.value === "156,000×" ? (
                  <CountUp to={156000} duration={1.8} suffix="×" />
                ) : (
                  p.badge.value
                )}
              </span>
            </div>
          </motion.div>
        ))}
      </RevealStagger>
    </section>
  );
}

void RevealChild;
