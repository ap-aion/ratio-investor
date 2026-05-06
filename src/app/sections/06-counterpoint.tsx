"use client";

import { motion, useTransform, type MotionValue } from "motion/react";
import { useRef } from "react";
import {
  EASE,
  Reveal,
  ScrollText,
  useScrollSkew,
  useSectionProgress,
} from "./_motion";

const mono: React.CSSProperties = {
  fontFamily: '"IBM Plex Mono", ui-monospace, monospace',
};

function TokensRail({ progress }: { progress: MotionValue<number> }) {
  const boxes = Array.from({ length: 21 }, (_, i) => i);
  const opacity = (i: number) => {
    const dist = Math.abs(i - 10);
    return Math.max(0.1, 0.72 - dist * 0.06);
  };
  return (
    <svg
      width="100%"
      height="64"
      viewBox="0 0 600 64"
      preserveAspectRatio="xMinYMid meet"
      fill="none"
      style={{ flexShrink: 0 }}
      aria-hidden
    >
      <line
        x1="0"
        y1="32"
        x2="600"
        y2="32"
        stroke="#FAFAF90F"
        strokeWidth="0.5"
      />
      {boxes.map((i) => {
        // each box illuminates over its own slice of section progress
        const start = 0.15 + (i / boxes.length) * 0.4;
        const end = start + 0.08;
        return (
          <ScrollBox
            key={i}
            x={6 + i * 28}
            baseOpacity={opacity(i)}
            dashed={i >= 19}
            progress={progress}
            start={start}
            end={end}
          />
        );
      })}
      <line
        x1="6"
        y1="50"
        x2="588"
        y2="50"
        stroke="#FAFAF914"
        strokeWidth="0.4"
        strokeDasharray="1 3"
      />
      <text
        x="6"
        y="62"
        fontFamily="IBM Plex Mono"
        fontSize="7"
        fill="#62615B"
        letterSpacing="0.06em"
      >
        i=0
      </text>
      <text
        x="588"
        y="62"
        textAnchor="end"
        fontFamily="IBM Plex Mono"
        fontSize="7"
        fill="#62615B"
        letterSpacing="0.06em"
      >
        i=N
      </text>
    </svg>
  );
}

function ScrollBox({
  x,
  baseOpacity,
  dashed,
  progress,
  start,
  end,
}: {
  x: number;
  baseOpacity: number;
  dashed: boolean;
  progress: MotionValue<number>;
  start: number;
  end: number;
}) {
  // border alpha rises from base * 0.4 to base, plus a brief flash at peak
  const stroke = useTransform(progress, [start - 0.04, start, end, end + 0.1], [
    `rgba(250,250,249,${baseOpacity * 0.35})`,
    `rgba(196,181,253,${Math.min(1, baseOpacity + 0.4)})`,
    `rgba(250,250,249,${baseOpacity})`,
    `rgba(250,250,249,${baseOpacity})`,
  ]);
  return (
    <motion.rect
      x={x}
      y="22"
      width="22"
      height="20"
      stroke={stroke}
      strokeWidth="0.6"
      fill="none"
      strokeDasharray={dashed ? "2 2" : undefined}
    />
  );
}

function VectorField({ progress }: { progress: MotionValue<number> }) {
  const cols = Array.from({ length: 13 }, (_, i) => 12 + i * 48);
  const rows = [12, 36, 60];
  const cx = 300;
  const cy = 36;

  const arrows: React.ReactNode[] = [];
  cols.forEach((x) =>
    rows.forEach((y) => {
      const dx = x - cx;
      const dy = y - cy;
      const r = Math.sqrt(dx * dx + dy * dy) || 1;
      // rest direction: tangential to center
      const tx = -dy / r;
      const ty = dx / r;
      const len = 9;
      const x2 = +(x + tx * len).toFixed(1);
      const y2 = +(y + ty * len).toFixed(1);

      // delay grows with radius for radial sweep
      const startDelay = 0.55 + (r / 320) * 0.25;
      arrows.push(
        <ScrollArrow
          key={`${x}-${y}`}
          cx={x}
          cy={y}
          tipX={x2}
          tipY={y2}
          progress={progress}
          start={startDelay}
          end={startDelay + 0.3}
        />
      );
    })
  );

  return (
    <svg
      width="100%"
      height="72"
      viewBox="0 0 600 72"
      preserveAspectRatio="xMinYMid meet"
      fill="none"
      style={{ flexShrink: 0 }}
      aria-hidden
    >
      <line
        x1="0"
        y1="36"
        x2="600"
        y2="36"
        stroke="#8B5CF60A"
        strokeWidth="0.5"
      />
      <circle
        cx="300"
        cy="36"
        r="22"
        fill="none"
        stroke="#8B5CF61F"
        strokeWidth="0.5"
        strokeDasharray="2 3"
      />
      {arrows}
      <circle cx="300" cy="36" r="3" fill="#FAFAF9" />
    </svg>
  );
}

function ScrollArrow({
  cx,
  cy,
  tipX,
  tipY,
  progress,
  start,
  end,
}: {
  cx: number;
  cy: number;
  tipX: number;
  tipY: number;
  progress: MotionValue<number>;
  start: number;
  end: number;
}) {
  // each arrow rotates from straight-up to its target tangential direction
  // as section progress crosses [start, end]
  const initRad = -Math.PI / 2; // up
  const targetRad = Math.atan2(tipY - cy, tipX - cx);
  const rad = useTransform(progress, [start, end], [initRad, targetRad], {
    clamp: true,
  });
  const opacity = useTransform(progress, [start - 0.04, start], [0, 1], {
    clamp: true,
  });
  // tip position derived from rad
  const len = Math.hypot(tipX - cx, tipY - cy);
  const tx = useTransform(rad, (r) => cx + Math.cos(r) * len);
  const ty = useTransform(rad, (r) => cy + Math.sin(r) * len);

  return (
    <motion.g style={{ opacity }}>
      <motion.line
        x1={cx}
        y1={cy}
        x2={tx}
        y2={ty}
        stroke="#8B5CF6"
        strokeWidth="0.7"
        strokeLinecap="round"
      />
      <motion.circle r="1.3" fill="#C4B5FD" cx={tx} cy={ty} />
    </motion.g>
  );
}

const LEFT_PARA_1 =
  "The frontier labs are racing through language. The application stacks are racing through pixels. Both are racing through the 2D world.";
const LEFT_PARA_2 =
  "Transformers are not equivariant to physical symmetries. They do not respect locality. They do not encode conservation laws.";
const RIGHT_PARA_1 =
  "Fluids, fields, structures, materials, and motion run on partial differential equations, conservation laws, and symmetry groups that the dominant architecture cannot represent.";
const RIGHT_PARA_2 =
  "Geometric deep learning, message passing, and equivariant networks do. The talent fluent in the math is small. The data is not on the internet — it is generated through high-fidelity simulation.";

export function Counterpoint() {
  const sectionRef = useRef<HTMLElement>(null);
  const progress = useSectionProgress(sectionRef);
  const skew = useScrollSkew(3.5);

  // Subtle parallax on each column — they drift slightly as section traverses
  const leftY = useTransform(progress, [0, 1], [40, -40]);
  const rightY = useTransform(progress, [0, 1], [-30, 50]);

  // Title floats slightly on its way through
  const titleY = useTransform(progress, [0, 1], [0, -30]);

  return (
    <section
      ref={sectionRef}
      style={{
        borderTop: "1px solid var(--rule)",
        display: "flex",
        flexDirection: "column",
        gap: 40,
        paddingBlock: "var(--section-pad-y)",
        paddingInline: "var(--pad-x)",
        position: "relative",
      }}
    >
      {/* Sticky heading — pins while the diptych scrolls past */}
      <motion.div
        style={{
          display: "flex",
          flexDirection: "column",
          gap: 14,
          paddingTop: 4,
          position: "sticky",
          top: 96,
          y: titleY,
          zIndex: 5,
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
          [ 05 / The Vacuum ]
        </span>
        <motion.h2
          style={{
            color: "var(--ink)",
            fontFamily: '"IBM Plex Sans", system-ui, sans-serif',
            fontSize: "var(--section-fz)",
            fontWeight: 500,
            letterSpacing: "-0.035em",
            lineHeight: "var(--section-lh)",
            margin: 0,
            maxWidth: 900,
            skewX: skew,
            transformOrigin: "0 50%",
          }}
        >
          Why no one is solving it.
        </motion.h2>
      </motion.div>

      {/* Diptych container */}
      <div
        className="stack-md with-rules"
        style={{
          borderTop: "1px solid var(--rule)",
          display: "flex",
          marginTop: 32,
          position: "relative",
        }}
      >
        {/* Left column */}
        <motion.div
          style={{
            borderRight: "1px solid var(--rule)",
            display: "flex",
            flex: "1 1 0",
            flexBasis: 0,
            flexDirection: "column",
            gap: 16,
            paddingTop: 32,
            paddingRight: 32,
            paddingBottom: 32,
            position: "relative",
            y: leftY,
            zIndex: 2,
          }}
        >
          <div style={{ alignItems: "center", display: "flex", gap: 12 }}>
            <span
              style={{
                background: "var(--ink-5)",
                borderRadius: 999,
                flexShrink: 0,
                height: 5,
                width: 5,
              }}
            />
            <span
              style={{
                ...mono,
                color: "var(--ink-5)",
                fontSize: 10,
                fontWeight: 500,
                letterSpacing: "0.12em",
                lineHeight: "12px",
                textTransform: "uppercase",
              }}
            >
              What everyone is doing
            </span>
          </div>

          <h3
            style={{
              color: "var(--ink-5)",
              fontFamily: '"IBM Plex Sans", system-ui, sans-serif',
              fontSize: 28,
              fontWeight: 500,
              letterSpacing: "-0.02em",
              lineHeight: "32px",
              margin: 0,
            }}
          >
            Frontier labs → language &amp; pixels &amp; 2D
          </h3>

          <div
            style={{
              borderTop: "1px solid var(--rule)",
              borderBottom: "1px solid var(--rule)",
              display: "flex",
              flexDirection: "column",
              gap: 10,
              marginTop: 4,
              paddingBlock: 18,
            }}
          >
            <span
              style={{
                ...mono,
                color: "var(--ink-5)",
                fontSize: 9,
                fontWeight: 500,
                letterSpacing: "0.12em",
                lineHeight: "12px",
                textTransform: "uppercase",
              }}
            >
              Linear sequence · self-attention
            </span>
            <TokensRail progress={progress} />
            <div
              style={{
                alignItems: "center",
                display: "flex",
                justifyContent: "space-between",
              }}
            >
              <span
                style={{
                  ...mono,
                  color: "var(--ink-5)",
                  fontSize: 9,
                  letterSpacing: "0.06em",
                  lineHeight: "12px",
                  textTransform: "uppercase",
                }}
              >
                Order matters · permutation breaks meaning
              </span>
              <span
                style={{
                  ...mono,
                  color: "var(--ink-5)",
                  fontSize: 9,
                  fontWeight: 500,
                  letterSpacing: "0.06em",
                  lineHeight: "12px",
                  textTransform: "uppercase",
                }}
              >
                N tokens · O(N²)
              </span>
            </div>
          </div>

          <div
            style={{
              color: "var(--ink-3)",
              display: "flex",
              flexDirection: "column",
              fontSize: 14,
              gap: 14,
              lineHeight: "21px",
              paddingTop: 8,
            }}
          >
            <p style={{ margin: 0 }}>
              <ScrollText
                text={LEFT_PARA_1}
                progress={progress}
                start={0.18}
                end={0.5}
              />
            </p>
            <p style={{ margin: 0 }}>
              <ScrollText
                text={LEFT_PARA_2}
                progress={progress}
                start={0.32}
                end={0.62}
              />
            </p>
            <div
              style={{
                border: "1px solid var(--rule)",
                display: "flex",
                flexDirection: "column",
                gap: 6,
                marginTop: 4,
                paddingBlock: 12,
                paddingInline: 14,
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
                Architecture mismatch
              </span>
              <motion.span
                style={{
                  ...mono,
                  color: "var(--ink)",
                  display: "block",
                  fontSize: 12,
                  lineHeight: "18px",
                }}
              >
                <ScrollText
                  text="tokens ≠ objects · attention ≠ message passing · sequence ≠ field"
                  progress={progress}
                  start={0.4}
                  end={0.7}
                />
              </motion.span>
            </div>
          </div>
        </motion.div>

        {/* Right column */}
        <motion.div
          style={{
            display: "flex",
            flex: "1 1 0",
            flexBasis: 0,
            flexDirection: "column",
            gap: 16,
            paddingTop: 32,
            paddingLeft: 32,
            paddingBottom: 32,
            position: "relative",
            y: rightY,
            zIndex: 2,
          }}
        >
          <div style={{ alignItems: "center", display: "flex", gap: 12 }}>
            <span
              style={{
                background: "var(--accent)",
                borderRadius: 999,
                flexShrink: 0,
                height: 5,
                width: 5,
              }}
            />
            <span
              style={{
                ...mono,
                color: "var(--accent-2)",
                fontSize: 10,
                fontWeight: 500,
                letterSpacing: "0.12em",
                lineHeight: "12px",
                textTransform: "uppercase",
              }}
            >
              What reality demands
            </span>
          </div>

          <h3
            style={{
              color: "var(--ink)",
              fontFamily: '"IBM Plex Sans", system-ui, sans-serif',
              fontSize: 28,
              fontWeight: 500,
              letterSpacing: "-0.02em",
              lineHeight: "32px",
              margin: 0,
            }}
          >
            The 3D world → PDEs &amp; symmetry &amp; conservation
          </h3>

          <div
            style={{
              borderTop: "1px solid var(--accent-deep)",
              borderBottom: "1px solid var(--accent-deep)",
              display: "flex",
              flexDirection: "column",
              gap: 10,
              marginTop: 4,
              paddingBlock: 18,
            }}
          >
            <span
              style={{
                ...mono,
                color: "var(--accent-2)",
                fontSize: 9,
                fontWeight: 500,
                letterSpacing: "0.12em",
                lineHeight: "12px",
                textTransform: "uppercase",
              }}
            >
              Vector field · equivariant message passing
            </span>
            <VectorField progress={progress} />
            <div
              style={{
                alignItems: "center",
                display: "flex",
                justifyContent: "space-between",
              }}
            >
              <span
                style={{
                  ...mono,
                  color: "var(--accent-2)",
                  fontSize: 9,
                  letterSpacing: "0.06em",
                  lineHeight: "12px",
                  textTransform: "uppercase",
                }}
              >
                Equivariant · rotation preserves the answer
              </span>
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
                Local · O(N · k)
              </span>
            </div>
          </div>

          <div
            style={{
              color: "var(--ink-2)",
              display: "flex",
              flexDirection: "column",
              fontSize: 14,
              gap: 14,
              lineHeight: "21px",
              paddingTop: 8,
            }}
          >
            <p style={{ margin: 0 }}>
              <ScrollText
                text={RIGHT_PARA_1}
                progress={progress}
                start={0.45}
                end={0.78}
              />
            </p>
            <p style={{ margin: 0 }}>
              <ScrollText
                text={RIGHT_PARA_2}
                progress={progress}
                start={0.55}
                end={0.88}
              />
            </p>
            <div
              style={{
                background: "rgba(139, 92, 246, 0.08)",
                border: "1px solid var(--accent-deep)",
                display: "flex",
                flexDirection: "column",
                gap: 6,
                marginTop: 4,
                paddingBlock: 12,
                paddingInline: 14,
              }}
            >
              <span
                style={{
                  ...mono,
                  color: "var(--accent-2)",
                  fontSize: 9,
                  fontWeight: 500,
                  letterSpacing: "0.08em",
                  lineHeight: "12px",
                  textTransform: "uppercase",
                }}
              >
                Canonical reference
              </span>
              <span
                style={{
                  color: "var(--ink)",
                  fontSize: 12,
                  lineHeight: "17px",
                }}
              >
                Bronstein, Bruna, Cohen, Veličković — Geometric Deep Learning,
                2021. Sáez de Ocáriz Borde &amp; Bronstein — Mathematical
                Foundations of Geometric Deep Learning, MIT Press 2025.
              </span>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

void Reveal;
void EASE;
