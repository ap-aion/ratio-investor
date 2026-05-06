"use client";

import { motion, useInView } from "motion/react";
import { useRef } from "react";
import { POINTS, EDGES } from "./_constellation-data";
import { CountUp, EASE, Reveal } from "./_motion";

const mono: React.CSSProperties = {
  fontFamily: '"IBM Plex Mono", ui-monospace, monospace',
};

const sectionLabel: React.CSSProperties = {
  ...mono,
  color: "var(--ink-5)",
  fontSize: 10,
  fontWeight: 500,
  letterSpacing: "0.16em",
  lineHeight: "12px",
  textTransform: "uppercase",
};

const muted: React.CSSProperties = {
  ...mono,
  color: "var(--ink-5)",
  fontSize: 10,
  letterSpacing: "0.08em",
  lineHeight: "12px",
  textTransform: "uppercase",
};

const cornerEyebrow: React.CSSProperties = {
  ...mono,
  color: "var(--ink-5)",
  fontSize: 10,
  fontWeight: 500,
  letterSpacing: "0.12em",
  lineHeight: "12px",
  textTransform: "uppercase",
};

const cornerTitle: React.CSSProperties = {
  color: "var(--ink)",
  fontFamily: '"IBM Plex Sans", system-ui, sans-serif',
  fontSize: 22,
  fontWeight: 500,
  letterSpacing: "-0.02em",
  lineHeight: "28px",
};

const cornerCaption: React.CSSProperties = {
  color: "var(--ink-4)",
  fontSize: 12,
  lineHeight: "16px",
};

function CornerLabel({
  position,
  eyebrow,
  title,
  caption,
  delay,
}: {
  position: "tl" | "tr" | "bl" | "br";
  eyebrow: string;
  title: string;
  caption: string;
  delay: number;
}) {
  const placement: React.CSSProperties =
    position === "tl"
      ? { left: 80, top: 80 }
      : position === "tr"
      ? { right: 80, top: 80, alignItems: "flex-end" }
      : position === "bl"
      ? { left: 80, bottom: 60 }
      : { right: 80, bottom: 60, alignItems: "flex-end" };

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.9, ease: EASE, delay }}
      style={{
        display: "flex",
        flexDirection: "column",
        gap: 6,
        position: "absolute",
        ...placement,
      }}
    >
      <span style={cornerEyebrow}>{eyebrow}</span>
      <span style={cornerTitle}>{title}</span>
      <span style={cornerCaption}>{caption}</span>
    </motion.div>
  );
}

export function Constellation() {
  const svgRef = useRef<SVGSVGElement>(null);
  const inView = useInView(svgRef, { amount: 0.2, once: true });

  // Order edges roughly outside-in by distance from centroid for a "ripple" draw
  const orderedEdges = EDGES.map(([x1, y1, x2, y2, stroke], i) => {
    const mx = (x1 + x2) / 2 - 720;
    const my = (y1 + y2) / 2 - 280;
    const r = Math.sqrt(mx * mx + my * my);
    return { x1, y1, x2, y2, stroke, r, i };
  }).sort((a, b) => b.r - a.r); // farthest-first

  const totalEdgeDelay = 1.2; // seconds across all edges
  const edgeStart = 0.2;

  return (
    <section
      style={{
        display: "flex",
        flexDirection: "column",
        paddingBottom: 80,
      }}
    >
      <Reveal
        style={{
          alignItems: "center",
          display: "flex",
          justifyContent: "space-between",
          paddingBottom: 32,
          paddingInline: 56,
        }}
      >
        <div style={{ alignItems: "center", display: "flex", gap: 12 }}>
          <span style={sectionLabel}>[ 02 / The Substrate ]</span>
          <span
            style={{
              background: "var(--rule)",
              flexShrink: 0,
              height: 1,
              width: 32,
            }}
          />
          <span style={muted}>Reality is structured</span>
        </div>
        <span style={{ ...muted, textTransform: "none" }}>Fig. 01</span>
      </Reveal>

      <div
        style={{
          flexShrink: 0,
          height: 560,
          position: "relative",
          width: 1440,
        }}
      >
        <svg
          ref={svgRef}
          width="1440"
          height="560"
          viewBox="0 0 1440 560"
          xmlns="http://www.w3.org/2000/svg"
          style={{ position: "absolute", top: 0, left: 0 }}
          aria-hidden
        >
          <defs>
            <radialGradient id="constellation-glow" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="rgba(139,92,246,0.18)" />
              <stop offset="100%" stopColor="rgba(139,92,246,0)" />
            </radialGradient>
          </defs>
          <motion.circle
            cx="720"
            cy="280"
            r="240"
            fill="url(#constellation-glow)"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={inView ? { opacity: 1, scale: 1 } : undefined}
            transition={{ duration: 1.6, ease: EASE }}
            style={{ transformOrigin: "720px 280px", transformBox: "fill-box" }}
          />

          {orderedEdges.map(({ x1, y1, x2, y2, stroke, i }, idx) => {
            const delay =
              edgeStart + (idx / orderedEdges.length) * totalEdgeDelay;
            return (
              <motion.line
                key={`e${i}`}
                x1={x1}
                y1={y1}
                x2={x2}
                y2={y2}
                stroke={stroke}
                strokeWidth={0.5}
                initial={{ pathLength: 0, opacity: 0 }}
                animate={
                  inView ? { pathLength: 1, opacity: 1 } : undefined
                }
                transition={{
                  pathLength: { duration: 0.6, ease: EASE, delay },
                  opacity: { duration: 0.3, delay },
                }}
              />
            );
          })}

          {POINTS.map(([cx, cy, r, fill], i) => {
            // points pop in with the closest edges
            const delay = edgeStart + 0.6 + (i / POINTS.length) * 0.8;
            return (
              <motion.circle
                key={`p${i}`}
                cx={cx}
                cy={cy}
                r={r}
                fill={fill}
                initial={{ scale: 0, opacity: 0 }}
                animate={inView ? { scale: 1, opacity: 1 } : undefined}
                transition={{ duration: 0.4, ease: EASE, delay }}
                style={{
                  transformOrigin: `${cx}px ${cy}px`,
                  transformBox: "fill-box",
                }}
              />
            );
          })}

          {/* highlighted locator — appears last */}
          <motion.circle
            cx="710.7"
            cy="192.7"
            r="6"
            fill="none"
            stroke="#8B5CF6"
            initial={{ scale: 0, opacity: 0 }}
            animate={inView ? { scale: 1, opacity: 1 } : undefined}
            transition={{ duration: 0.6, ease: EASE, delay: 2.1 }}
            style={{
              transformOrigin: "710.7px 192.7px",
              transformBox: "fill-box",
            }}
          />
          <motion.circle
            cx="710.7"
            cy="192.7"
            r="11"
            fill="none"
            stroke="#8B5CF680"
            strokeWidth={0.5}
            className="locator-pulse"
            initial={{ opacity: 0 }}
            animate={inView ? { opacity: 1 } : undefined}
            transition={{ duration: 0.5, delay: 2.3 }}
          />
          <motion.circle
            cx="710.7"
            cy="192.7"
            r="3"
            fill="#8B5CF6"
            initial={{ scale: 0 }}
            animate={inView ? { scale: 1 } : undefined}
            transition={{ duration: 0.5, ease: EASE, delay: 2.1 }}
            style={{
              transformOrigin: "710.7px 192.7px",
              transformBox: "fill-box",
            }}
          />
        </svg>

        <CornerLabel
          position="tl"
          eyebrow="A · Chemistry"
          title="Molecules"
          caption="Fold by symmetry."
          delay={2.0}
        />
        <CornerLabel
          position="tr"
          eyebrow="B · Physics"
          title="Fields"
          caption="Conserve quantities."
          delay={2.15}
        />
        <CornerLabel
          position="bl"
          eyebrow="C · Markets"
          title="Invariances"
          caption="Persist through noise."
          delay={2.3}
        />
        <CornerLabel
          position="br"
          eyebrow="D · Engineering"
          title="Meshes"
          caption="Obey contact and force."
          delay={2.45}
        />
      </div>

      {/* caption strip */}
      <Reveal
        style={{
          alignItems: "flex-end",
          borderTop: "1px solid var(--rule)",
          display: "flex",
          justifyContent: "space-between",
          paddingTop: 32,
          paddingInline: 56,
        }}
      >
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: 6,
            maxWidth: 720,
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
            Fig. 01 — geometry-native primitives
          </span>
          <p
            style={{
              color: "var(--ink-2)",
              fontSize: 15,
              lineHeight: "22px",
              margin: 0,
            }}
          >
            The world is structured. Today&apos;s AI treats it as unstructured
            data. Geometry-native models read graphs, meshes, manifolds, and
            fields as first-class primitives — not strings of tokens.
          </p>
        </div>
        <div style={{ display: "flex", gap: 24, paddingTop: 4 }}>
          {[
            { label: "Nodes", value: 64, render: (n: number) => Math.round(n).toString() },
            { label: "Edges", value: 145, render: (n: number) => Math.round(n).toString() },
            { label: "Symmetry", value: "SO(3)" as const, render: null },
          ].map((stat, i, arr) => (
            <div
              key={stat.label}
              style={{ alignItems: "center", display: "flex", gap: 24 }}
            >
              <div
                style={{
                  alignItems: "flex-end",
                  display: "flex",
                  flexDirection: "column",
                  gap: 4,
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
                  {stat.label}
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
                  {typeof stat.value === "number" ? (
                    <CountUp
                      to={stat.value}
                      duration={1.4}
                      format={stat.render ?? undefined}
                    />
                  ) : (
                    stat.value
                  )}
                </span>
              </div>
              {i < arr.length - 1 && (
                <span
                  style={{
                    background: "var(--rule)",
                    flexShrink: 0,
                    height: 32,
                    width: 1,
                  }}
                />
              )}
            </div>
          ))}
        </div>
      </Reveal>
    </section>
  );
}
