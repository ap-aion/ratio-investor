"use client";

import { motion } from "motion/react";
import { EASE, Reveal, RevealChild, RevealStagger } from "./_motion";

const mono: React.CSSProperties = {
  fontFamily: '"IBM Plex Mono", ui-monospace, monospace',
};

const headerCell: React.CSSProperties = {
  ...mono,
  color: "var(--ink-5)",
  fontSize: 10,
  fontWeight: 500,
  letterSpacing: "0.08em",
  lineHeight: "12px",
  textTransform: "uppercase",
};

type Row = {
  idx: string;
  visual: React.ReactNode;
  domain: string;
  domainTag: string;
  symmetry: string;
  fail: string;
  fix: string;
};

const ROWS: Row[] = [
  {
    idx: "01",
    visual: (
      <svg width="96" height="80" viewBox="0 0 96 80" fill="none" aria-hidden>
        <circle
          cx="48"
          cy="40"
          r="36"
          fill="none"
          stroke="#FAFAF90F"
          strokeWidth="0.5"
          strokeDasharray="2 3"
        />
        <line x1="48" y1="22" x2="32" y2="50" stroke="#FAFAF966" strokeWidth="0.7" />
        <line x1="48" y1="22" x2="64" y2="50" stroke="#FAFAF966" strokeWidth="0.7" />
        <line x1="32" y1="50" x2="64" y2="50" stroke="#FAFAF940" strokeWidth="0.5" strokeDasharray="1 2" />
        <line x1="48" y1="22" x2="48" y2="14" stroke="#FAFAF999" strokeWidth="0.7" />
        <circle cx="48" cy="22" r="4" fill="#0C0C0B" stroke="#FAFAF9" strokeWidth="0.8" />
        <circle cx="32" cy="50" r="3" fill="#0C0C0B" stroke="#FAFAF9" strokeWidth="0.8" />
        <circle cx="64" cy="50" r="3" fill="#0C0C0B" stroke="#FAFAF9" strokeWidth="0.8" />
        <circle cx="48" cy="14" r="2" fill="#FAFAF9" />
        <path d="M 78 32 A 14 14 0 0 1 78 48" stroke="#8B5CF6" strokeWidth="0.7" fill="none" />
        <path d="M 76 46 L 79 49 L 78 45" stroke="#8B5CF6" strokeWidth="0.7" strokeLinecap="round" strokeLinejoin="round" fill="none" />
        <text x="48" y="78" textAnchor="middle" fontFamily="IBM Plex Mono" fontSize="6" letterSpacing="0.08em" fill="#62615B" style={{ textTransform: "uppercase" }}>
          SE(3)
        </text>
      </svg>
    ),
    domain: "Molecules",
    domainTag: "Chemistry · biology",
    symmetry: "SE(3) · permutation",
    fail: "Hallucinated bonds, broken stereochemistry, no folding constraints.",
    fix: "Equivariant message passing on atomic graphs.",
  },
  {
    idx: "02",
    visual: (
      <svg width="96" height="80" viewBox="0 0 96 80" fill="none" aria-hidden>
        {[14, 38, 62].map((x) =>
          [14, 38].map((y) => (
            <rect key={`${x}-${y}`} x={x} y={y} width="20" height="20" stroke="#FAFAF94D" strokeWidth="0.6" fill="none" />
          ))
        )}
        <rect x="14" y="38" width="20" height="20" stroke="#FAFAF9" fill="#8B5CF60F" />
        {[
          [14, 14],
          [34, 14, "#FAFAF999"],
          [58, 14, "#FAFAF999"],
          [82, 14, "#FAFAF999"],
          [14, 34, "#FAFAF999"],
          [34, 34, "#8B5CF6"],
          [58, 34, "#FAFAF999"],
          [82, 34, "#FAFAF999"],
          [14, 58, "#FAFAF999"],
          [34, 58, "#FAFAF999"],
          [58, 58, "#FAFAF999"],
          [82, 58, "#FAFAF999"],
        ].map(([cx, cy, fill = "#FAFAF9"], i) => (
          <circle key={i} cx={cx} cy={cy} r="1.5" fill={fill as string} />
        ))}
        <line x1="24" y1="48" x2="24" y2="46" stroke="#C4B5FD" strokeWidth="0.5" />
        <text x="48" y="78" textAnchor="middle" fontFamily="IBM Plex Mono" fontSize="6" letterSpacing="0.08em" fill="#62615B" style={{ textTransform: "uppercase" }}>
          P4mm · unit cell
        </text>
      </svg>
    ),
    domain: "Materials",
    domainTag: "Crystals · alloys",
    symmetry: "Crystallographic groups",
    fail: "Predicts unstable lattices, ignores conduction geometry.",
    fix: "GNoME-class crystal graph networks.",
  },
  {
    idx: "03",
    visual: (
      <svg width="96" height="80" viewBox="0 0 96 80" fill="none" aria-hidden>
        <line x1="6" y1="46" x2="90" y2="46" stroke="#8B5CF6" strokeWidth="0.6" strokeDasharray="3 2" />
        <text x="86" y="44" textAnchor="end" fontFamily="IBM Plex Mono" fontSize="6" fill="#C4B5FD" letterSpacing="0.06em">
          μ
        </text>
        {[
          [10, 32, 60, 8, 38, 14, "#FAFAF999"],
          [20, 20, 58, 18, 26, 22, "#FAFAF9B3"],
          [30, 36, 62, 28, 42, 14, "#62615B"],
          [40, 22, 56, 38, 28, 20, "#FAFAF9B3"],
          [50, 34, 64, 48, 40, 18, "#62615B"],
          [60, 18, 50, 58, 22, 20, "#FAFAF9CC"],
          [70, 30, 58, 68, 36, 14, "#62615B"],
          [80, 14, 44, 78, 18, 22, "#FAFAF9D9"],
        ].map((row, i) => {
          const [lx1, ly1, ly2, rx, ry, rh, fill] = row as number[] & string[];
          return (
            <g key={i}>
              <line x1={lx1 as number} y1={ly1 as number} x2={lx1 as number} y2={ly2 as number} stroke="#FAFAF966" strokeWidth="0.5" />
              <rect x={rx as number} y={ry as number} width="4" height={rh as number} fill={fill as string} />
            </g>
          );
        })}
        <text x="48" y="78" textAnchor="middle" fontFamily="IBM Plex Mono" fontSize="6" letterSpacing="0.08em" fill="#62615B" style={{ textTransform: "uppercase" }}>
          conserved baseline
        </text>
      </svg>
    ),
    domain: "Markets",
    domainTag: "Macro · risk",
    symmetry: "Time-translation invariance",
    fail: "Fits noise as signal, no notion of conserved quantities.",
    fix: "Graph nets over multi-asset relational structure.",
  },
  {
    idx: "04",
    visual: (
      <svg width="96" height="80" viewBox="0 0 96 80" fill="none" aria-hidden>
        <line x1="6" y1="62" x2="90" y2="62" stroke="#FAFAF926" strokeWidth="0.5" />
        <path d="M 28 60 L 28 38 L 48 26 L 68 38 L 68 60 Z" stroke="#FAFAF9" strokeWidth="0.7" fill="#FAFAF90A" />
        <line x1="28" y1="38" x2="68" y2="38" stroke="#FAFAF966" strokeWidth="0.5" />
        <line x1="48" y1="26" x2="48" y2="60" stroke="#FAFAF94D" strokeWidth="0.5" strokeDasharray="1 2" />
        <path d="M 76 28 L 70 36" stroke="#8B5CF6" strokeWidth="0.8" strokeLinecap="round" />
        <path d="M 70 36 L 73 33 M 70 36 L 71 32" stroke="#8B5CF6" strokeWidth="0.8" strokeLinecap="round" />
        <text x="80" y="26" fontFamily="IBM Plex Mono" fontSize="6" fill="#C4B5FD" letterSpacing="0.06em">
          F
        </text>
        {Array.from({ length: 21 }, (_, i) => 28 + i * 2).map((x) => (
          <line key={x} x1={x} y1="60" x2={x} y2="67" stroke="#FAFAF92E" strokeWidth="0.4" />
        ))}
        <text x="48" y="78" textAnchor="middle" fontFamily="IBM Plex Mono" fontSize="6" letterSpacing="0.08em" fill="#62615B" style={{ textTransform: "uppercase" }}>
          contact + force
        </text>
      </svg>
    ),
    domain: "Cities & objects",
    domainTag: "Engineering · video",
    symmetry: "Euclidean + contact",
    fail: "Generated images cannot generate trust — physics is wrong.",
    fix: "Mesh- and field-conditioned neural simulators.",
  },
];

export function Invariances() {
  return (
    <section
      style={{
        borderTop: "1px solid var(--rule)",
        display: "flex",
        flexDirection: "column",
        gap: 32,
        paddingBlock: 80,
        paddingInline: 56,
      }}
    >
      {/* heading + subhead */}
      <Reveal
        style={{
          alignItems: "flex-end",
          display: "flex",
          gap: 56,
          justifyContent: "space-between",
        }}
      >
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: 14,
            maxWidth: 520,
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
            [ 03 / Why It Matters ]
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
            }}
          >
            Everything we care about lives in the structured world.
          </h2>
        </div>
        <p
          style={{
            color: "var(--ink-3)",
            fontSize: 15,
            lineHeight: "22px",
            margin: 0,
            maxWidth: 480,
          }}
        >
          Today&apos;s AI treats the physical world as unstructured data. That
          is why frontier video models violate mass, momentum, and contact. Why
          state-of-the-art LLMs fail physical reasoning at every parameter
          count.
        </p>
      </Reveal>

      {/* table */}
      <RevealStagger
        amount={0.1}
        each={0.12}
        style={{
          borderTop: "1px solid var(--rule)",
          borderBottom: "1px solid var(--rule)",
          display: "flex",
          flexDirection: "column",
        }}
      >
        {/* header */}
        <div
          style={{
            alignItems: "center",
            display: "flex",
            paddingBlock: 12,
          }}
        >
          <span style={{ ...headerCell, flexShrink: 0, width: 40 }}>Idx</span>
          <span style={{ ...headerCell, flexShrink: 0, width: 112 }}>
            Visual
          </span>
          <span style={{ ...headerCell, flex: "0.9 1 0", flexBasis: 0 }}>
            Domain
          </span>
          <span style={{ ...headerCell, flex: "1.3 1 0", flexBasis: 0 }}>
            Underlying Symmetry
          </span>
          <span style={{ ...headerCell, flex: "1.7 1 0", flexBasis: 0 }}>
            Today&apos;s AI fails at
          </span>
          <span style={{ ...headerCell, flex: "1.3 1 0", flexBasis: 0 }}>
            Geometry-native fix
          </span>
        </div>

        {ROWS.map((row) => (
          <motion.div
            key={row.idx}
            variants={{
              hidden: { opacity: 0, y: 14 },
              visible: {
                opacity: 1,
                y: 0,
                transition: { duration: 0.7, ease: EASE },
              },
            }}
            whileHover={{ background: "rgba(139, 92, 246, 0.04)" }}
            transition={{ duration: 0.25 }}
            style={{
              alignItems: "center",
              borderTop: "1px solid var(--rule)",
              display: "flex",
              paddingBlock: 18,
            }}
          >
            <span
              style={{
                ...mono,
                color: "var(--ink-5)",
                flexShrink: 0,
                fontSize: 12,
                fontVariantNumeric: "tabular-nums",
                lineHeight: "16px",
                width: 40,
              }}
            >
              {row.idx}
            </span>
            <div style={{ flexShrink: 0, height: 80, width: 112 }}>
              {row.visual}
            </div>
            <div
              style={{
                display: "flex",
                flex: "0.9 1 0",
                flexBasis: 0,
                flexDirection: "column",
                gap: 4,
              }}
            >
              <span
                style={{
                  color: "var(--ink)",
                  fontFamily:
                    '"IBM Plex Sans", system-ui, sans-serif',
                  fontSize: 16,
                  fontWeight: 500,
                  lineHeight: "20px",
                }}
              >
                {row.domain}
              </span>
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
                {row.domainTag}
              </span>
            </div>
            <span
              style={{
                ...mono,
                color: "var(--ink-2)",
                flex: "1.3 1 0",
                flexBasis: 0,
                fontSize: 13,
                lineHeight: "16px",
              }}
            >
              {row.symmetry}
            </span>
            <span
              style={{
                color: "var(--ink-3)",
                flex: "1.7 1 0",
                flexBasis: 0,
                fontSize: 13,
                lineHeight: "18px",
              }}
            >
              {row.fail}
            </span>
            <span
              style={{
                color: "var(--accent-2)",
                flex: "1.3 1 0",
                flexBasis: 0,
                fontSize: 13,
                lineHeight: "18px",
              }}
            >
              {row.fix}
            </span>
          </motion.div>
        ))}
      </RevealStagger>
    </section>
  );
}

// quiet linter
void RevealChild;
