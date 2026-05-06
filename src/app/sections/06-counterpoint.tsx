"use client";

import { motion } from "motion/react";
import { EASE, Reveal } from "./_motion";

const mono: React.CSSProperties = {
  fontFamily: '"IBM Plex Mono", ui-monospace, monospace',
};

function TokensRail() {
  // 21 boxes, fading toward edges, last 2 dashed
  const boxes = Array.from({ length: 21 }, (_, i) => i);
  const opacity = (i: number) => {
    const dist = Math.abs(i - 10);
    return Math.max(0.1, 0.72 - dist * 0.06).toFixed(2);
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
      <line x1="0" y1="32" x2="600" y2="32" stroke="#FAFAF90F" strokeWidth="0.5" />
      {boxes.map((i) => (
        <motion.rect
          key={i}
          x={6 + i * 28}
          y="22"
          width="22"
          height="20"
          stroke={`rgba(250,250,249,${opacity(i)})`}
          strokeWidth="0.6"
          fill="none"
          strokeDasharray={i >= 19 ? "2 2" : undefined}
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.45, ease: EASE, delay: i * 0.04 }}
        />
      ))}
      <line
        x1="6"
        y1="50"
        x2="588"
        y2="50"
        stroke="#FAFAF914"
        strokeWidth="0.4"
        strokeDasharray="1 3"
      />
      <text x="6" y="62" fontFamily="IBM Plex Mono" fontSize="7" fill="#62615B" letterSpacing="0.06em">
        i=0
      </text>
      <text x="588" y="62" textAnchor="end" fontFamily="IBM Plex Mono" fontSize="7" fill="#62615B" letterSpacing="0.06em">
        i=N
      </text>
    </svg>
  );
}

function VectorField() {
  // Grid 13x3 with arrows, equivariant pattern around (300, 36)
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
      // tangential field
      const tx = -dy / r;
      const ty = dx / r;
      const len = 9;
      const x2 = +(x + tx * len).toFixed(1);
      const y2 = +(y + ty * len).toFixed(1);
      // delay grows with radius for a swirling-on effect
      const delay = (r / 280) * 0.7;
      arrows.push(
        <motion.g
          key={`${x}-${y}`}
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.5, ease: EASE, delay }}
        >
          <motion.line
            x1={x}
            y1={y}
            x2={x2}
            y2={y2}
            stroke="#8B5CF6"
            strokeWidth="0.7"
            strokeLinecap="round"
            initial={{ pathLength: 0 }}
            whileInView={{ pathLength: 1 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.6, ease: EASE, delay: delay + 0.1 }}
          />
          <motion.circle
            cx={x2}
            cy={y2}
            r="1.3"
            fill="#C4B5FD"
            initial={{ scale: 0 }}
            whileInView={{ scale: 1 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.4, ease: EASE, delay: delay + 0.6 }}
            style={{
              transformOrigin: `${x2}px ${y2}px`,
              transformBox: "fill-box",
            }}
          />
        </motion.g>
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
      <line x1="0" y1="36" x2="600" y2="36" stroke="#8B5CF60A" strokeWidth="0.5" />
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

export function Counterpoint() {
  return (
    <section
      style={{
        borderTop: "1px solid var(--rule)",
        display: "flex",
        flexDirection: "column",
        gap: 40,
        paddingBlock: 80,
        paddingInline: 56,
      }}
    >
      <Reveal style={{ display: "flex", flexDirection: "column", gap: 14 }}>
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
        <h2
          style={{
            color: "var(--ink)",
            fontFamily: '"IBM Plex Sans", system-ui, sans-serif',
            fontSize: 44,
            fontWeight: 500,
            letterSpacing: "-0.03em",
            lineHeight: "48px",
            margin: 0,
            maxWidth: 900,
          }}
        >
          Why no one is solving it.
        </h2>
      </Reveal>

      <div style={{ borderTop: "1px solid var(--rule)", display: "flex" }}>
        {/* Left column */}
        <Reveal
          delay={0.1}
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
            <TokensRail />
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
              display: "flex",
              flexDirection: "column",
              gap: 14,
              paddingTop: 8,
            }}
          >
            <p
              style={{
                color: "var(--ink-3)",
                fontSize: 14,
                lineHeight: "21px",
                margin: 0,
              }}
            >
              The frontier labs are racing through language. The application
              stacks are racing through pixels. Both are racing through the 2D
              world.
            </p>
            <p
              style={{
                color: "var(--ink-3)",
                fontSize: 14,
                lineHeight: "21px",
                margin: 0,
              }}
            >
              Transformers are not equivariant to physical symmetries. They do
              not respect locality. They do not encode conservation laws.
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
              <span
                style={{
                  ...mono,
                  color: "var(--ink)",
                  fontSize: 12,
                  lineHeight: "18px",
                }}
              >
                tokens ≠ objects · attention ≠ message passing · sequence ≠
                field
              </span>
            </div>
          </div>
        </Reveal>

        {/* Right column */}
        <Reveal
          delay={0.25}
          style={{
            display: "flex",
            flex: "1 1 0",
            flexBasis: 0,
            flexDirection: "column",
            gap: 16,
            paddingTop: 32,
            paddingLeft: 32,
            paddingBottom: 32,
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
            <VectorField />
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
              display: "flex",
              flexDirection: "column",
              gap: 14,
              paddingTop: 8,
            }}
          >
            <p
              style={{
                color: "var(--ink-2)",
                fontSize: 14,
                lineHeight: "21px",
                margin: 0,
              }}
            >
              Fluids, fields, structures, materials, and motion run on partial
              differential equations, conservation laws, and symmetry groups
              that the dominant architecture cannot represent.
            </p>
            <p
              style={{
                color: "var(--ink-2)",
                fontSize: 14,
                lineHeight: "21px",
                margin: 0,
              }}
            >
              Geometric deep learning, message passing, and equivariant networks
              do. The talent fluent in the math is small. The data is not on the
              internet — it is generated through high-fidelity simulation.
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
        </Reveal>
      </div>
    </section>
  );
}
