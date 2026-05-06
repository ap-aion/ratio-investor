"use client";

import { motion, useInView } from "motion/react";
import { useRef, useState } from "react";
import { CountUp, EASE, Reveal } from "./_motion";

const mono: React.CSSProperties = {
  fontFamily: '"IBM Plex Mono", ui-monospace, monospace',
};

function AffiliationGraph() {
  // Hub HSB at center (230,230). Outer ring at radius ~165 for 8 nodes; ring node "Bronstein" highlighted.
  const c = 230;
  const r = 165;
  const nodes: Array<{
    angleDeg: number;
    label: string;
    sub?: string;
    accent?: boolean;
  }> = [
    { angleDeg: -90, label: "Imperial", sub: "visiting" },
    { angleDeg: -45, label: "Cambridge", sub: "visiting" },
    { angleDeg: 0, label: "Oxford", sub: "visiting" },
    { angleDeg: 45, label: "TUM" },
    { angleDeg: 90, label: "ETH" },
    { angleDeg: 135, label: "MIT" },
    { angleDeg: 180, label: "Harvard", sub: "collab." },
    { angleDeg: 225, label: "Bronstein", sub: "co-author", accent: true },
  ];

  const ring = nodes.map((n) => {
    const a = (n.angleDeg * Math.PI) / 180;
    return { ...n, x: +(c + r * Math.cos(a)).toFixed(1), y: +(c + r * Math.sin(a)).toFixed(1) };
  });

  const ref = useRef<SVGSVGElement>(null);
  const inView = useInView(ref, { amount: 0.3, once: true });
  const [hovered, setHovered] = useState<number | null>(null);

  return (
    <svg
      ref={ref}
      viewBox="0 0 460 460"
      xmlns="http://www.w3.org/2000/svg"
      style={{ position: "absolute", inset: 0, height: "100%", width: "100%" }}
      aria-hidden
    >
      {/* outer ring connections */}
      {ring.map((n, i) => {
        const next = ring[(i + 1) % ring.length];
        return (
          <motion.line
            key={`ring-${i}`}
            x1={n.x}
            y1={n.y}
            x2={next.x}
            y2={next.y}
            stroke="#FAFAF90D"
            strokeWidth="0.5"
            initial={{ pathLength: 0 }}
            animate={inView ? { pathLength: 1 } : undefined}
            transition={{ duration: 0.8, ease: EASE, delay: 1.6 + i * 0.06 }}
          />
        );
      })}
      {/* spokes from center */}
      {ring.map((n, i) => (
        <motion.line
          key={`spoke-${i}`}
          x1={c}
          y1={c}
          x2={n.x}
          y2={n.y}
          stroke={n.accent ? "#8B5CF6" : "#3B3A37"}
          strokeWidth={n.accent ? 1.25 : 0.75}
          initial={{ pathLength: 0 }}
          animate={inView ? { pathLength: 1 } : undefined}
          transition={{
            duration: 0.7,
            ease: EASE,
            delay: 0.5 + i * 0.08,
          }}
        />
      ))}
      {/* central hub */}
      <motion.circle
        cx={c}
        cy={c}
        r="42"
        fill="#8B5CF614"
        stroke="#8B5CF6"
        initial={{ scale: 0, opacity: 0 }}
        animate={inView ? { scale: 1, opacity: 1 } : undefined}
        transition={{ duration: 0.8, ease: EASE, delay: 0.1 }}
        style={{ transformOrigin: `${c}px ${c}px`, transformBox: "fill-box" }}
      />
      <motion.circle
        cx={c}
        cy={c}
        r="28"
        fill="#0C0C0B"
        stroke="#8B5CF6"
        strokeWidth="1.25"
        initial={{ scale: 0 }}
        animate={inView ? { scale: 1 } : undefined}
        transition={{ duration: 0.7, ease: EASE, delay: 0.2 }}
        style={{ transformOrigin: `${c}px ${c}px`, transformBox: "fill-box" }}
      />
      <text
        x={c}
        y={c - 4}
        textAnchor="middle"
        fontFamily="IBM Plex Mono"
        fontSize="10"
        fontWeight="500"
        letterSpacing="0.08em"
        fill="#FAFAF9"
        style={{ textTransform: "uppercase" }}
      >
        HSB
      </text>
      <text
        x={c}
        y={c + 10}
        textAnchor="middle"
        fontFamily="IBM Plex Mono"
        fontSize="7"
        fontWeight="400"
        letterSpacing="0.12em"
        fill="#C4B5FD"
        style={{ textTransform: "uppercase" }}
      >
        Chief sci.
      </text>

      {/* outer nodes */}
      {ring.map((n, i) => {
        const isAccent = !!n.accent;
        const radius = isAccent ? 26 : 22;
        const fontSize = n.label.length > 7 ? 8 : 9;
        const isHovered = hovered === i;
        return (
          <motion.g
            key={`node-${i}`}
            onHoverStart={() => setHovered(i)}
            onHoverEnd={() => setHovered(null)}
            style={{
              cursor: "default",
              transformOrigin: `${n.x}px ${n.y}px`,
              transformBox: "fill-box",
            }}
            initial={{ opacity: 0, scale: 0 }}
            animate={inView ? { opacity: 1, scale: 1 } : undefined}
            transition={{
              duration: 0.55,
              ease: EASE,
              delay: 1.0 + i * 0.08,
            }}
          >
            <motion.circle
              cx={n.x}
              cy={n.y}
              r={radius}
              fill={isAccent ? "#8B5CF60F" : "#0C0C0B"}
              stroke={isAccent ? "#8B5CF6" : "#FAFAF9"}
              strokeWidth={isAccent ? 1 : 0.75}
              animate={{
                r: isHovered ? radius + 4 : radius,
                stroke: isHovered
                  ? "#C4B5FD"
                  : isAccent
                  ? "#8B5CF6"
                  : "#FAFAF9",
              }}
              transition={{ duration: 0.3, ease: EASE }}
            />
            <text
              x={n.x}
              y={n.y - (n.sub ? 2 : 0)}
              textAnchor="middle"
              fontFamily="IBM Plex Mono"
              fontSize={fontSize}
              fontWeight="500"
              letterSpacing="0.06em"
              fill={isHovered ? "#FAFAF9" : isAccent ? "#C4B5FD" : "#FAFAF9"}
              style={{ textTransform: "uppercase" }}
            >
              {n.label}
            </text>
            {n.sub && (
              <text
                x={n.x}
                y={n.y + 9}
                textAnchor="middle"
                fontFamily="IBM Plex Mono"
                fontSize="6"
                fontWeight="400"
                fill={isAccent ? "#FAFAF9" : "#62615B"}
                letterSpacing={isAccent ? "0.06em" : undefined}
              >
                {n.sub}
              </text>
            )}
          </motion.g>
        );
      })}
    </svg>
  );
}

export function Moat() {
  return (
    <section
      id="team"
      style={{
        borderTop: "1px solid var(--rule)",
        display: "flex",
        flexDirection: "column",
        gap: 40,
        paddingBlock: "var(--section-pad-y)",
        paddingInline: "var(--pad-x)",
      }}
    >
      <Reveal
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
            [ 08 / The Moat ]
          </span>
          <h2
            style={{
              color: "var(--ink)",
              fontFamily: '"IBM Plex Sans", system-ui, sans-serif',
              fontSize: "var(--display-fz)",
              fontWeight: 500,
              letterSpacing: "-0.03em",
              lineHeight: "var(--display-lh)",
              margin: 0,
            }}
          >
            Upstream of formation, not downstream of recruitment.
          </h2>
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
          Fig. 03 · Affiliation graph
        </span>
      </Reveal>

      <div
        className="stack-md with-rules"
        style={{
          borderTop: "1px solid var(--rule)",
          borderBottom: "1px solid var(--rule)",
          display: "flex",
        }}
      >
        {/* bio panel */}
        <Reveal
          delay={0.1}
          style={{
            borderRight: "1px solid var(--rule)",
            display: "flex",
            flex: "1.3 1 0",
            flexBasis: 0,
            flexDirection: "column",
            gap: 28,
            paddingTop: 36,
            paddingRight: 36,
            paddingBottom: 36,
          }}
        >
          <div style={{ alignItems: "flex-start", display: "flex", gap: 18 }}>
            <div
              style={{
                alignItems: "center",
                background: "var(--bg-elev)",
                border: "1px solid var(--rule)",
                display: "flex",
                flexShrink: 0,
                height: 64,
                justifyContent: "center",
                width: 64,
              }}
            >
              <span
                style={{
                  ...mono,
                  color: "var(--ink)",
                  fontSize: 18,
                  fontWeight: 500,
                  letterSpacing: "-0.01em",
                  lineHeight: "22px",
                }}
              >
                HSB
              </span>
            </div>
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                gap: 6,
                paddingTop: 4,
              }}
            >
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
                Chief Scientist · Co-founder
              </span>
              <span
                style={{
                  color: "var(--ink)",
                  fontFamily:
                    '"IBM Plex Sans", system-ui, sans-serif',
                  fontSize: 28,
                  fontWeight: 500,
                  letterSpacing: "-0.02em",
                  lineHeight: "32px",
                }}
              >
                Haitz Sáez de Ocáriz Borde
              </span>
              <div
                style={{
                  alignItems: "center",
                  display: "flex",
                  gap: 8,
                  paddingTop: 4,
                }}
              >
                <div
                  style={{
                    alignItems: "center",
                    background: "rgba(139,92,246,0.08)",
                    border: "1px solid var(--accent-deep)",
                    display: "flex",
                    gap: 6,
                    paddingBlock: 3,
                    paddingInline: 8,
                  }}
                >
                  <span
                    style={{
                      background: "var(--accent)",
                      borderRadius: 999,
                      flexShrink: 0,
                      height: 4,
                      width: 4,
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
                    Bronstein co-author
                  </span>
                </div>
                <span
                  style={{
                    ...mono,
                    color: "var(--ink-5)",
                    fontSize: 10,
                    fontWeight: 500,
                    letterSpacing: "0.06em",
                    lineHeight: "12px",
                    textTransform: "uppercase",
                  }}
                >
                  MIT Press · 2025
                </span>
              </div>
            </div>
          </div>

          <p
            style={{
              color: "var(--ink-2)",
              fontSize: 15,
              lineHeight: "24px",
              margin: 0,
            }}
          >
            Haitz is Michael Bronstein&apos;s most active collaborator and
            co-author of Mathematical Foundations of Geometric Deep Learning —
            the textbook the field is being taught from.
          </p>

          {/* stats row */}
          <div
            className="stack-sm with-rules"
            style={{
              borderTop: "1px solid var(--rule)",
              borderBottom: "1px solid var(--rule)",
              display: "flex",
            }}
          >
            {[
              {
                label: "Visiting positions",
                count: 3,
                valueAfter: " concurrent",
                sub: "Imperial · Cambridge · Oxford",
              },
              {
                label: "Active relationships",
                count: 7,
                valueAfter: " institutions",
                sub: "+ TUM · ETH · MIT · Harvard",
              },
              {
                label: "Publication record",
                count: 3,
                valueAfter: " of 3 first-author",
                sub: "2023 → 2026 · ICLR / arXiv / 3AF",
              },
            ].map((s, i, arr) => (
              <div
                key={s.label}
                style={{
                  borderRight:
                    i < arr.length - 1 ? "1px solid var(--rule)" : undefined,
                  display: "flex",
                  flex: "1 1 0",
                  flexBasis: 0,
                  flexDirection: "column",
                  gap: 4,
                  paddingBlock: 14,
                  paddingInline: 16,
                  paddingLeft: i === 0 ? 0 : 16,
                  paddingRight: i === arr.length - 1 ? 0 : 16,
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
                  {s.label}
                </span>
                <span
                  style={{
                    ...mono,
                    color: "var(--ink)",
                    fontSize: 16,
                    fontVariantNumeric: "tabular-nums",
                    lineHeight: "20px",
                  }}
                >
                  <CountUp to={s.count} duration={1.2} suffix={s.valueAfter} />
                </span>
                <span
                  style={{
                    ...mono,
                    color: "var(--ink-3)",
                    fontSize: 10,
                    letterSpacing: "0.04em",
                    lineHeight: "12px",
                  }}
                >
                  {s.sub}
                </span>
              </div>
            ))}
          </div>

          <p
            style={{
              color: "var(--ink-2)",
              fontSize: 14,
              lineHeight: "21px",
              margin: 0,
            }}
          >
            Students in those rooms encounter our work in their coursework,
            cite our papers in their dissertations, build on our datasets, and
            convert into the lab through internships, funded research, and
            hires. In a field where competing efforts are still picking a
            layer, we are building all three.
          </p>
        </Reveal>

        {/* graph panel */}
        <Reveal
          delay={0.2}
          amount={0.1}
          style={{
            alignItems: "flex-start",
            display: "flex",
            flex: "1 1 0",
            flexBasis: 0,
            flexDirection: "column",
            gap: 12,
            paddingBottom: 32,
            paddingLeft: 36,
            paddingTop: 32,
          }}
        >
          <span
            style={{
              ...mono,
              color: "var(--ink-5)",
              fontSize: 10,
              fontWeight: 500,
              letterSpacing: "0.08em",
              lineHeight: "12px",
              textTransform: "uppercase",
            }}
          >
            Fig. 03 — affiliation network
          </span>
          <div
            style={{
              aspectRatio: "1 / 1",
              flexShrink: 0,
              maxWidth: 460,
              position: "relative",
              width: "100%",
            }}
          >
            <AffiliationGraph />
          </div>
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
            Edge weight ∝ collaboration depth · brand-purple denotes
            co-authorship
          </span>
        </Reveal>
      </div>
    </section>
  );
}
