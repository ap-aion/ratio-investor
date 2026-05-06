"use client";

import { motion } from "motion/react";
import dynamic from "next/dynamic";
import { CountUp, EASE, Reveal } from "./_motion";

const ConstellationCanvas = dynamic(
  () => import("./_constellation-three").then((m) => m.ConstellationCanvas),
  { ssr: false }
);

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
  return (
    <section
      id="substrate"
      style={{
        display: "flex",
        flexDirection: "column",
        paddingBottom: 80,
        paddingTop: 80,
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

      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 1.4, ease: EASE }}
        style={{
          flexShrink: 0,
          height: 560,
          position: "relative",
          width: 1440,
        }}
      >
        <ConstellationCanvas />

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
      </motion.div>

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
