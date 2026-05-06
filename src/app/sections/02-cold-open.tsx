"use client";

import { motion } from "motion/react";
import { EASE, MEDIUM, Reveal, RevealChild, RevealStagger } from "./_motion";

const mono: React.CSSProperties = {
  fontFamily: '"IBM Plex Mono", ui-monospace, monospace',
};

const sectionLabel: React.CSSProperties = {
  ...mono,
  color: "var(--accent-2)",
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

const TOKENS: Array<{ word: string; opacity: number; color: string; dashed?: boolean }> = [
  { word: "the", opacity: 0.4, color: "var(--ink-3)" },
  { word: "world", opacity: 0.55, color: "var(--ink-3)" },
  { word: "is", opacity: 0.7, color: "var(--ink-3)" },
  { word: "made", opacity: 0.85, color: "var(--ink-2)" },
  { word: "of", opacity: 1, color: "var(--ink)" },
  { word: "objects", opacity: 1, color: "var(--ink)" },
  { word: "forces", opacity: 0.85, color: "var(--ink-2)" },
  { word: "symmetries", opacity: 0.7, color: "var(--ink-3)" },
  { word: "laws", opacity: 0.55, color: "var(--ink-3)" },
  { word: "…", opacity: 0.35, color: "var(--ink-5)", dashed: true },
];

export function ColdOpen() {
  return (
    <section
      id="thesis"
      style={{
        display: "flex",
        flexDirection: "column",
        gap: "var(--section-gap)",
        paddingTop: "var(--section-pad-y)",
        paddingInline: "var(--pad-x)",
        paddingBottom: "var(--section-pad-y)",
      }}
    >
      {/* label strip */}
      <Reveal
        style={{
          alignItems: "center",
          display: "flex",
          flexWrap: "wrap",
          gap: 16,
          justifyContent: "space-between",
        }}
      >
        <div style={{ alignItems: "center", display: "flex", gap: 12 }}>
          <span style={sectionLabel}>[ 01 / Thesis ]</span>
          <motion.span
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ duration: 0.7, ease: EASE, delay: 0.3 }}
            style={{
              background: "var(--rule)",
              flexShrink: 0,
              height: 1,
              transformOrigin: "0% 50%",
              width: 32,
            }}
          />
          <span style={muted}>The World Model Company</span>
        </div>
        <span style={{ ...muted, textTransform: "none" }}>[ 2017 → 2026 ]</span>
      </Reveal>

      {/* hero — line by line clip-path reveal */}
      <div style={{ display: "flex", flexDirection: "column", gap: 36 }}>
        <h1
          style={{
            color: "var(--ink)",
            fontFamily: '"IBM Plex Sans", system-ui, sans-serif',
            fontSize: "var(--hero-fz)",
            fontWeight: 500,
            letterSpacing: "-0.04em",
            lineHeight: "var(--hero-lh)",
            margin: 0,
            maxWidth: 1100,
          }}
        >
          {["The age of language", "is behind us."].map((line, i) => (
            <span
              key={line}
              style={{ display: "block", overflow: "hidden", paddingBottom: 4 }}
            >
              <motion.span
                initial={{ y: "110%" }}
                animate={{ y: "0%" }}
                transition={{
                  duration: 1.05,
                  ease: EASE,
                  delay: 0.15 + i * 0.13,
                }}
                style={{ display: "inline-block", willChange: "transform" }}
              >
                {line}
              </motion.span>
            </span>
          ))}
        </h1>
        <motion.span
          initial={{ opacity: 0, letterSpacing: "0.04em" }}
          animate={{ opacity: 1, letterSpacing: "0.18em" }}
          transition={{ duration: 1, ease: EASE, delay: 0.7 }}
          style={{
            ...mono,
            color: "var(--accent-2)",
            fontSize: 13,
            lineHeight: "16px",
            textTransform: "uppercase",
          }}
        >
          Teaching machines to reason in the world
        </motion.span>
      </div>

      {/* body grid */}
      <RevealStagger
        delay={0.1}
        each={0.12}
        className="wrap-md"
        style={{
          alignItems: "flex-start",
          borderTop: "1px solid var(--rule)",
          display: "flex",
          flexWrap: "wrap",
          gap: "clamp(24px, 3vw, 56px)",
          paddingTop: 16,
        }}
      >
        <RevealChild
          style={{
            display: "flex",
            flexDirection: "column",
            flexShrink: 0,
            gap: 8,
            width: 220,
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
            Authored
          </span>
          <span
            style={{
              ...mono,
              color: "var(--ink)",
              fontSize: 13,
              fontWeight: 500,
              letterSpacing: "0.04em",
              lineHeight: "16px",
            }}
          >
            Ratio Labs · 2026.05
          </span>
          <span
            style={{
              ...mono,
              color: "var(--ink-5)",
              fontSize: 10,
              letterSpacing: "0.06em",
              lineHeight: "12px",
              textTransform: "uppercase",
            }}
          >
            Confidential — recipient only
          </span>
        </RevealChild>
        <RevealChild
          style={{
            display: "flex",
            flexDirection: "column",
            gap: 18,
            maxWidth: 720,
          }}
        >
          <p
            style={{
              color: "var(--ink-2)",
              fontSize: 17,
              lineHeight: "27px",
              margin: 0,
            }}
          >
            Attention Is All You Need gave us machines that speak, translate,
            code and autocomplete. But the world is not made of tokens. It is
            made of objects, forces, symmetries, and laws. Reality does not
            unfold as a string of words. It unfolds in space, time, and motion.
          </p>
          <p
            style={{
              color: "var(--ink)",
              fontSize: 17,
              lineHeight: "27px",
              margin: 0,
            }}
          >
            If AI is to matter beyond the screen, it must understand more than
            text and pixels. It must understand the symmetries and laws of the
            physical world.
          </p>
        </RevealChild>
        <RevealChild
          style={{
            display: "flex",
            flexDirection: "column",
            flexShrink: 0,
            gap: 4,
            paddingTop: 4,
            width: 200,
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
            Origin
          </span>
          <span
            style={{
              ...mono,
              color: "var(--ink)",
              fontSize: 11,
              lineHeight: "16px",
            }}
          >
            Vaswani et al.
          </span>
          <span
            style={{
              ...mono,
              color: "var(--ink-5)",
              fontSize: 11,
              lineHeight: "16px",
            }}
          >
            NeurIPS 2017
          </span>
          <span
            style={{
              ...mono,
              color: "var(--ink-5)",
              fontSize: 11,
              lineHeight: "16px",
            }}
          >
            arXiv:1706.03762
          </span>
        </RevealChild>
      </RevealStagger>

      {/* phase transition diagram */}
      <Reveal
        amount={0.15}
        style={{
          borderTop: "1px solid var(--rule)",
          display: "flex",
          flexDirection: "column",
          gap: 24,
          marginTop: 24,
          paddingTop: 64,
        }}
      >
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
              fontSize: 10,
              fontWeight: 500,
              letterSpacing: "0.16em",
              lineHeight: "12px",
              textTransform: "uppercase",
            }}
          >
            Fig. 00 — phase transition
          </span>
          <span style={muted}>1D string → 3D structure</span>
        </div>

        <div className="stack-md with-rules" style={{ border: "1px solid var(--rule)", display: "flex" }}>
          {/* tokens panel */}
          <div
            style={{
              borderRight: "1px solid var(--rule)",
              display: "flex",
              flexBasis: 0,
              flexDirection: "column",
              flexGrow: 1.1,
              gap: 18,
              padding: 28,
            }}
          >
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
                  fontSize: 10,
                  fontWeight: 500,
                  letterSpacing: "0.12em",
                  lineHeight: "12px",
                  textTransform: "uppercase",
                }}
              >
                Tokens · 1D · Language-native
              </span>
              <span
                style={{
                  ...mono,
                  color: "var(--ink-5)",
                  fontSize: 9,
                  letterSpacing: "0.04em",
                  lineHeight: "12px",
                  textTransform: "uppercase",
                }}
              >
                linear
              </span>
            </div>

            <RevealStagger
              amount={0.1}
              each={0.05}
              delay={0.1}
              style={{
                alignItems: "center",
                display: "flex",
                flexWrap: "wrap",
                gap: 4,
              }}
            >
              {TOKENS.map((t) => (
                <RevealChild key={t.word} y={6}>
                  <motion.span
                    whileHover={{
                      borderColor: "var(--accent-2)",
                      color: "var(--ink)",
                    }}
                    transition={{ duration: 0.18 }}
                    style={{
                      alignItems: "center",
                      border: `1px ${t.dashed ? "dashed" : "solid"} var(--rule-strong)`,
                      display: "flex",
                      flexShrink: 0,
                      justifyContent: "center",
                      opacity: t.opacity,
                      paddingBlock: 6,
                      paddingInline: 8,
                      ...mono,
                      color: t.color,
                      fontSize: 10,
                      letterSpacing: "0.04em",
                      lineHeight: "12px",
                    }}
                  >
                    {t.word}
                  </motion.span>
                </RevealChild>
              ))}
            </RevealStagger>

            <div style={{ alignItems: "center", display: "flex", gap: 12 }}>
              <span
                style={{
                  background: "var(--rule-strong)",
                  flexShrink: 0,
                  height: 1,
                  width: 12,
                }}
              />
              <span
                style={{
                  color: "var(--ink-3)",
                  fontSize: 13,
                  lineHeight: "18px",
                }}
              >
                Sequence has order. Reality does not.
              </span>
            </div>
          </div>

          {/* arrow panel */}
          <div
            style={{
              alignItems: "center",
              borderRight: "1px solid var(--rule)",
              display: "flex",
              flexDirection: "column",
              flexShrink: 0,
              gap: 14,
              justifyContent: "center",
              padding: 28,
              width: "min(220px, 100%)",
            }}
          >
            <span
              style={{
                ...mono,
                color: "var(--accent-2)",
                fontSize: 9,
                fontWeight: 500,
                letterSpacing: "0.16em",
                lineHeight: "12px",
                textTransform: "uppercase",
              }}
            >
              phase transition
            </span>
            <svg
              width="160"
              height="48"
              viewBox="0 0 160 48"
              fill="none"
              aria-hidden
            >
              <motion.line
                x1="0"
                y1="24"
                x2="140"
                y2="24"
                stroke="#8B5CF6"
                initial={{ pathLength: 0 }}
                whileInView={{ pathLength: 1 }}
                viewport={{ once: true, amount: 0.4 }}
                transition={{ duration: 1.1, ease: EASE, delay: 0.2 }}
              />
              <motion.path
                d="M 130 16 L 148 24 L 130 32"
                stroke="#8B5CF6"
                fill="none"
                strokeLinecap="round"
                strokeLinejoin="round"
                initial={{ pathLength: 0 }}
                whileInView={{ pathLength: 1 }}
                viewport={{ once: true, amount: 0.4 }}
                transition={{ duration: 0.5, ease: EASE, delay: 1.2 }}
              />
              {[20, 60, 100].map((cx, i) => (
                <motion.circle
                  key={cx}
                  cx={cx}
                  cy="24"
                  r="2"
                  fill="#8B5CF6"
                  initial={{ scale: 0, opacity: 0 }}
                  whileInView={{ scale: 1, opacity: 1 }}
                  viewport={{ once: true, amount: 0.4 }}
                  transition={{ duration: 0.4, ease: EASE, delay: 0.4 + i * 0.18 }}
                  style={{ transformOrigin: `${cx}px 24px` }}
                />
              ))}
              <text
                x="74"
                y="14"
                textAnchor="middle"
                fontFamily="IBM Plex Mono"
                fontSize="8"
                fontWeight="500"
                letterSpacing="0.12em"
                fill="#62615B"
                style={{ textTransform: "uppercase" }}
              >
                ≠ token order
              </text>
            </svg>
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
              From string to structure
            </span>
          </div>

          {/* mesh panel */}
          <motion.div
            whileHover={{
              backgroundColor: "rgba(139, 92, 246, 0.08)",
            }}
            transition={{ duration: 0.4, ease: EASE }}
            style={{
              background: "rgba(139, 92, 246, 0.04)",
              display: "flex",
              flexBasis: 0,
              flexDirection: "column",
              flexGrow: 1.1,
              gap: 18,
              padding: 28,
            }}
          >
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
                  fontSize: 10,
                  fontWeight: 500,
                  letterSpacing: "0.12em",
                  lineHeight: "12px",
                  textTransform: "uppercase",
                }}
              >
                Mesh · 3D · Geometry-native
              </span>
              <span
                style={{
                  ...mono,
                  color: "var(--ink-5)",
                  fontSize: 9,
                  letterSpacing: "0.04em",
                  lineHeight: "12px",
                  textTransform: "uppercase",
                }}
              >
                structured
              </span>
            </div>

            <div style={{ alignItems: "center", display: "flex", gap: 24 }}>
              <motion.svg
                width="120"
                height="120"
                viewBox="0 0 120 120"
                fill="none"
                style={{ flexShrink: 0 }}
                whileHover={{ rotate: 12, scale: 1.04 }}
                transition={{ duration: 0.6, ease: EASE }}
                aria-hidden
              >
                <circle cx="60" cy="60" r="54" fill="#8B5CF60F" />
                {[
                  ["60", "10", "20", "35"],
                  ["60", "10", "100", "35"],
                  ["60", "10", "60", "55"],
                  ["20", "35", "20", "85"],
                  ["100", "35", "100", "85"],
                  ["20", "35", "60", "55"],
                  ["100", "35", "60", "55"],
                  ["20", "85", "60", "65"],
                  ["100", "85", "60", "65"],
                  ["60", "55", "60", "65"],
                  ["20", "85", "60", "110"],
                  ["100", "85", "60", "110"],
                  ["60", "65", "60", "110"],
                ].map(([x1, y1, x2, y2], i) => (
                  <motion.line
                    key={i}
                    x1={x1}
                    y1={y1}
                    x2={x2}
                    y2={y2}
                    stroke="#FAFAF9"
                    strokeOpacity={0.45}
                    strokeWidth={0.6}
                    initial={{ pathLength: 0 }}
                    whileInView={{ pathLength: 1 }}
                    viewport={{ once: true, amount: 0.3 }}
                    transition={{
                      duration: 0.7,
                      ease: EASE,
                      delay: 0.05 * i,
                    }}
                  />
                ))}
                {[
                  [60, 10, 2.2, "#FAFAF9"],
                  [20, 35, 2, "#EEEEEC"],
                  [100, 35, 2, "#EEEEEC"],
                  [60, 55, 2.4, "#FAFAF9"],
                  [60, 65, 2.4, "#8B5CF6"],
                  [20, 85, 2, "#EEEEEC"],
                  [100, 85, 2, "#EEEEEC"],
                  [60, 110, 2.2, "#FAFAF9"],
                ].map(([cx, cy, r, fill], i) => (
                  <motion.circle
                    key={i}
                    cx={cx as number}
                    cy={cy as number}
                    r={r as number}
                    fill={fill as string}
                    initial={{ scale: 0, opacity: 0 }}
                    whileInView={{ scale: 1, opacity: 1 }}
                    viewport={{ once: true, amount: 0.3 }}
                    transition={{
                      duration: 0.5,
                      ease: EASE,
                      delay: 0.7 + i * 0.05,
                    }}
                    style={{
                      transformOrigin: `${cx}px ${cy}px`,
                      transformBox: "fill-box",
                    }}
                  />
                ))}
              </motion.svg>

              <RevealStagger
                each={0.1}
                delay={0.5}
                amount={0.3}
                style={{
                  display: "flex",
                  flexDirection: "column",
                  gap: 8,
                }}
              >
                {[
                  { dot: "var(--accent-2)", text: "Vertices · 8", color: "var(--ink)" },
                  { dot: "var(--accent-2)", text: "Edges · 14", color: "var(--ink)" },
                  {
                    dot: "var(--accent-2)",
                    text: "Symmetry · SE(3)",
                    color: "var(--ink)",
                  },
                  {
                    dot: "var(--accent)",
                    text: "Conserves · mass · momentum",
                    color: "var(--accent-2)",
                  },
                ].map((row) => (
                  <RevealChild key={row.text} y={6}>
                    <span
                      style={{ alignItems: "center", display: "flex", gap: 10 }}
                    >
                      <span
                        style={{
                          background: row.dot,
                          flexShrink: 0,
                          height: 1,
                          width: 6,
                        }}
                      />
                      <span
                        style={{
                          ...mono,
                          color: row.color,
                          fontSize: 10,
                          letterSpacing: "0.06em",
                          lineHeight: "12px",
                        }}
                      >
                        {row.text}
                      </span>
                    </span>
                  </RevealChild>
                ))}
              </RevealStagger>
            </div>

            <div style={{ alignItems: "center", display: "flex", gap: 12 }}>
              <span
                style={{
                  background: "var(--accent)",
                  flexShrink: 0,
                  height: 1,
                  width: 12,
                }}
              />
              <span
                style={{
                  color: "var(--ink)",
                  fontSize: 13,
                  lineHeight: "18px",
                }}
              >
                Geometry has structure. Architecture should too.
              </span>
            </div>
          </motion.div>
        </div>
      </Reveal>
    </section>
  );
}

// silence unused linter warnings if any
void MEDIUM;
