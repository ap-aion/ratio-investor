"use client";

import { motion } from "motion/react";
import { EASE, Reveal } from "./_motion";

const mono: React.CSSProperties = {
  fontFamily: '"IBM Plex Mono", ui-monospace, monospace',
};

function FoundationViz() {
  // Equivariant net: 3 input nodes → 3 hidden → 1 output
  return (
    <svg width="120" height="80" viewBox="0 0 120 80" fill="none" aria-hidden>
      {[
        ["20", "14", "60", "14", "C4B5FD59"],
        ["20", "14", "60", "40", "C4B5FD40"],
        ["20", "14", "60", "66", "C4B5FD26"],
        ["20", "40", "60", "14", "C4B5FD40"],
        ["20", "40", "60", "40", "C4B5FD66"],
        ["20", "40", "60", "66", "C4B5FD40"],
        ["20", "66", "60", "14", "C4B5FD26"],
        ["20", "66", "60", "40", "C4B5FD40"],
        ["20", "66", "60", "66", "C4B5FD59"],
        ["60", "14", "100", "40", "C4B5FD66"],
        ["60", "66", "100", "40", "C4B5FD66"],
      ].map(([x1, y1, x2, y2, c], i) => (
        <line
          key={i}
          x1={x1}
          y1={y1}
          x2={x2}
          y2={y2}
          stroke={`#${c}`}
          strokeWidth="0.5"
        />
      ))}
      <line x1="60" y1="40" x2="100" y2="40" stroke="#C4B5FD8C" strokeWidth="0.6" />
      {[
        [20, 14, "#0C0C0B", "#FAFAF9"],
        [20, 40, "#0C0C0B", "#FAFAF9"],
        [20, 66, "#0C0C0B", "#FAFAF9"],
        [60, 14, "#0C0C0B", "#C4B5FD"],
        [60, 66, "#0C0C0B", "#C4B5FD"],
      ].map(([cx, cy, fill, stroke], i) => (
        <circle
          key={i}
          cx={cx as number}
          cy={cy as number}
          r="3"
          fill={fill as string}
          stroke={stroke as string}
          strokeWidth="0.7"
        />
      ))}
      <circle cx="60" cy="40" r="3.6" fill="#8B5CF6" stroke="#C4B5FD" strokeWidth="0.7" />
      <circle cx="100" cy="40" r="3.5" fill="#FAFAF9" />
      <text x="20" y="80" textAnchor="middle" fontFamily="IBM Plex Mono" fontSize="6" fill="#62615B" letterSpacing="0.06em">
        x
      </text>
      <text x="60" y="80" textAnchor="middle" fontFamily="IBM Plex Mono" fontSize="6" fill="#62615B" letterSpacing="0.06em">
        h
      </text>
      <text x="100" y="80" textAnchor="middle" fontFamily="IBM Plex Mono" fontSize="6" fill="#62615B" letterSpacing="0.06em">
        y
      </text>
    </svg>
  );
}

function InfraViz() {
  return (
    <svg width="120" height="80" viewBox="0 0 120 80" fill="none" aria-hidden>
      <rect x="6" y="14" width="36" height="14" stroke="#FAFAF980" strokeWidth="0.6" fill="none" />
      <rect x="6" y="32" width="36" height="14" stroke="#FAFAF966" strokeWidth="0.6" fill="none" />
      <rect x="6" y="50" width="36" height="14" stroke="#FAFAF94D" strokeWidth="0.6" fill="none" />
      <text x="9" y="24" fontFamily="IBM Plex Mono" fontSize="6" fill="#A1A09A" letterSpacing="0.04em">
        RANS.csv
      </text>
      <text x="9" y="42" fontFamily="IBM Plex Mono" fontSize="6" fill="#A1A09A" letterSpacing="0.04em">
        hyper.h5
      </text>
      <text x="9" y="60" fontFamily="IBM Plex Mono" fontSize="6" fill="#A1A09A" letterSpacing="0.04em">
        md.zip
      </text>
      <line x1="42" y1="21" x2="56" y2="21" stroke="#FAFAF94D" strokeWidth="0.5" />
      <line x1="42" y1="39" x2="56" y2="39" stroke="#FAFAF94D" strokeWidth="0.5" />
      <line x1="42" y1="57" x2="56" y2="57" stroke="#FAFAF94D" strokeWidth="0.5" />
      <rect x="56" y="14" width="58" height="50" stroke="#FAFAF966" strokeWidth="0.6" fill="#FAFAF905" />
      <text x="62" y="26" fontFamily="IBM Plex Mono" fontSize="7" fill="#FAFAF9" letterSpacing="0.04em">
        $ ratio
      </text>
      <text x="62" y="38" fontFamily="IBM Plex Mono" fontSize="6" fill="#62615B" letterSpacing="0.04em">
        › bench
      </text>
      <text x="62" y="48" fontFamily="IBM Plex Mono" fontSize="6" fill="#62615B" letterSpacing="0.04em">
        › train
      </text>
      <text x="62" y="58" fontFamily="IBM Plex Mono" fontSize="6" fill="#62615B" letterSpacing="0.04em">
        › deploy
      </text>
      <rect x="60" y="60" width="2" height="2" fill="#FAFAF9" />
      <text x="60" y="80" fontFamily="IBM Plex Mono" fontSize="6" fill="#62615B" letterSpacing="0.06em">
        open · public
      </text>
    </svg>
  );
}

function VerticalsViz() {
  return (
    <svg width="120" height="80" viewBox="0 0 120 80" fill="none" aria-hidden>
      <line x1="6" y1="38" x2="36" y2="38" stroke="#FAFAF926" strokeWidth="0.5" />
      <path d="M 21 8 L 26 18 L 26 38 L 16 38 L 16 18 Z" stroke="#FAFAF9B3" strokeWidth="0.6" fill="none" />
      <line x1="18" y1="38" x2="14" y2="46" stroke="#FAFAF980" strokeWidth="0.5" />
      <line x1="24" y1="38" x2="28" y2="46" stroke="#FAFAF980" strokeWidth="0.5" />
      <line x1="21" y1="38" x2="21" y2="50" stroke="#FAFAF966" strokeWidth="0.5" />
      <text x="21" y="76" textAnchor="middle" fontFamily="IBM Plex Mono" fontSize="6" fill="#62615B" letterSpacing="0.04em">
        CFD
      </text>
      <line x1="46" y1="38" x2="76" y2="38" stroke="#FAFAF926" strokeWidth="0.5" />
      <circle cx="61" cy="22" r="3" stroke="#FAFAF999" strokeWidth="0.6" fill="none" />
      <circle cx="51" cy="34" r="3" stroke="#FAFAF999" strokeWidth="0.6" fill="none" />
      <circle cx="71" cy="34" r="3" stroke="#FAFAF999" strokeWidth="0.6" fill="none" />
      <circle cx="61" cy="46" r="3" stroke="#FAFAF999" strokeWidth="0.6" fill="none" />
      <line x1="61" y1="25" x2="51" y2="31" stroke="#FAFAF966" strokeWidth="0.5" />
      <line x1="61" y1="25" x2="71" y2="31" stroke="#FAFAF966" strokeWidth="0.5" />
      <line x1="51" y1="37" x2="61" y2="43" stroke="#FAFAF966" strokeWidth="0.5" />
      <line x1="71" y1="37" x2="61" y2="43" stroke="#FAFAF966" strokeWidth="0.5" />
      <text x="61" y="76" textAnchor="middle" fontFamily="IBM Plex Mono" fontSize="6" fill="#62615B" letterSpacing="0.04em">
        PHARMA
      </text>
      <line x1="86" y1="38" x2="116" y2="38" stroke="#FAFAF926" strokeWidth="0.5" />
      <path d="M 86 24 Q 96 14 101 22 Q 106 12 116 22" stroke="#FAFAF999" strokeWidth="0.6" fill="none" />
      <path d="M 86 30 Q 96 22 101 28 Q 106 18 116 28" stroke="#FAFAF966" strokeWidth="0.5" fill="none" />
      <path d="M 87 36 Q 97 30 102 32 Q 107 26 115 32" stroke="#FAFAF94D" strokeWidth="0.4" fill="none" />
      <text x="101" y="76" textAnchor="middle" fontFamily="IBM Plex Mono" fontSize="6" fill="#62615B" letterSpacing="0.04em">
        CLIMATE
      </text>
    </svg>
  );
}

type Layer = {
  tag: string;
  title: string;
  caption: string;
  bullets: string[];
  bulletColor: string;
  visualEyebrow: string;
  visual: React.ReactNode;
  emphasized?: boolean;
};

const LAYERS: Layer[] = [
  {
    tag: "[ Layer 03 · Top ]",
    title: "Foundation Model",
    caption: "Geometry-native pre-training",
    bullets: [
      "Equivariant message passing on graphs · meshes · manifolds · fields",
      "Trained on proprietary high-fidelity simulation generated in-house",
      "Released as a foundation model with API + weights for partners",
    ],
    bulletColor: "var(--ink-2)",
    visualEyebrow: "Equivariant net",
    visual: <FoundationViz />,
    emphasized: true,
  },
  {
    tag: "[ Layer 02 · Mid ]",
    title: "Open Infrastructure",
    caption: "Picks & shovels for the field",
    bullets: [
      "Open datasets (RANS / hypersonic / molecular dynamics) for academic + industrial use",
      "Public benchmarks tracking equivariance, conservation, and physical fidelity",
      "SDK + reference implementations for graph / mesh / field deployment",
    ],
    bulletColor: "var(--ink-3)",
    visualEyebrow: "Datasets · SDK",
    visual: <InfraViz />,
  },
  {
    tag: "[ Layer 01 · Base ]",
    title: "Commercial Verticals",
    caption: "Where revenue compounds",
    bullets: [
      "Aerospace & defense — CFD-by-inference for geometry iteration in seconds",
      "Pharma & materials — molecule + crystal generation with physical guarantees",
      "Climate & energy — high-resolution forecasting and reactor / grid simulation",
    ],
    bulletColor: "var(--ink-3)",
    visualEyebrow: "3 verticals",
    visual: <VerticalsViz />,
  },
];

function StackRow({
  layer,
  withBottomBorder,
  index,
}: {
  layer: Layer;
  withBottomBorder: boolean;
  index: number;
}) {
  const tagStyle: React.CSSProperties = layer.emphasized
    ? {
        ...mono,
        color: "var(--accent-2)",
        fontSize: 10,
        fontWeight: 500,
        letterSpacing: "0.16em",
        lineHeight: "12px",
        textTransform: "uppercase",
      }
    : {
        ...mono,
        color: "var(--ink-5)",
        fontSize: 10,
        fontWeight: 500,
        letterSpacing: "0.16em",
        lineHeight: "12px",
        textTransform: "uppercase",
      };

  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.9, ease: EASE, delay: index * 0.15 }}
      whileHover={
        layer.emphasized
          ? { background: "rgba(139, 92, 246, 0.10)" }
          : { background: "rgba(255,255,255,0.02)" }
      }
      style={{
        background: layer.emphasized ? "rgba(139, 92, 246, 0.06)" : undefined,
        borderLeft: layer.emphasized ? "2px solid var(--accent)" : undefined,
        borderBottom: withBottomBorder ? "1px solid var(--rule)" : undefined,
        display: "flex",
        paddingBlock: 24,
        paddingInline: 20,
      }}
    >
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          flexShrink: 0,
          gap: 6,
          width: 280,
        }}
      >
        <span style={tagStyle}>{layer.tag}</span>
        <span
          style={{
            color: "var(--ink)",
            fontFamily: '"IBM Plex Sans", system-ui, sans-serif',
            fontSize: 22,
            fontWeight: 500,
            letterSpacing: "-0.02em",
            lineHeight: "28px",
          }}
        >
          {layer.title}
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
          {layer.caption}
        </span>
      </div>

      <span
        style={{
          background: "var(--rule)",
          flexShrink: 0,
          marginInline: 24,
          width: 1,
        }}
      />

      <ul
        style={{
          display: "flex",
          flex: "1 1 0",
          flexBasis: 0,
          flexDirection: "column",
          gap: 10,
          listStyle: "none",
          margin: 0,
          padding: 0,
        }}
      >
        {layer.bullets.map((b, i) => (
          <li key={i} style={{ display: "flex", gap: 10 }}>
            <span
              style={{
                ...mono,
                color: "var(--ink-5)",
                fontSize: 11,
                lineHeight: "14px",
                paddingTop: 1,
              }}
            >
              ·
            </span>
            <span
              style={{
                color: layer.bulletColor,
                fontSize: 14,
                lineHeight: "20px",
              }}
            >
              {b}
            </span>
          </li>
        ))}
      </ul>

      <div
        style={{
          alignItems: "flex-end",
          borderLeft: "1px solid var(--rule)",
          display: "flex",
          flexDirection: "column",
          flexShrink: 0,
          gap: 8,
          paddingLeft: 24,
          width: 160,
        }}
      >
        <span
          style={{
            ...mono,
            color: layer.emphasized ? "var(--accent-2)" : "var(--ink-5)",
            fontSize: 9,
            fontWeight: 500,
            letterSpacing: "0.06em",
            lineHeight: "12px",
            textTransform: "uppercase",
          }}
        >
          {layer.visualEyebrow}
        </span>
        {layer.visual}
      </div>
    </motion.div>
  );
}

export function Conviction() {
  return (
    <section
      id="stack"
      style={{
        borderTop: "1px solid var(--rule)",
        display: "flex",
        flexDirection: "column",
        gap: 56,
        paddingBlock: 80,
        paddingInline: 56,
      }}
    >
      <Reveal style={{ display: "flex", flexDirection: "column", gap: 32 }}>
        <div style={{ alignItems: "center", display: "flex", gap: 12 }}>
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
            [ 06 / Conviction ]
          </span>
          <span
            style={{
              background: "var(--rule)",
              flexShrink: 0,
              height: 1,
              width: 32,
            }}
          />
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
            Geometry-native AI
          </span>
        </div>
        <div
          style={{
            alignItems: "flex-start",
            display: "flex",
            gap: 56,
          }}
        >
          <h2
            style={{
              color: "var(--ink)",
              flex: "1.6 1 0",
              flexBasis: 0,
              fontFamily: '"IBM Plex Sans", system-ui, sans-serif',
              fontSize: 56,
              fontWeight: 500,
              letterSpacing: "-0.035em",
              lineHeight: "60px",
              margin: 0,
            }}
          >
            Intelligence that moves the world must understand the world.
          </h2>
          <div
            style={{
              display: "flex",
              flex: "1 1 0",
              flexBasis: 0,
              flexDirection: "column",
              gap: 14,
              paddingTop: 12,
            }}
          >
            <p
              style={{
                color: "var(--ink-2)",
                fontSize: 15,
                lineHeight: "23px",
                margin: 0,
              }}
            >
              That means AI grounded in physics, semantics, and symmetry —
              before language and before vision.
            </p>
            <p
              style={{
                color: "var(--ink-3)",
                fontSize: 13,
                lineHeight: "20px",
                margin: 0,
              }}
            >
              GraphCast (DeepMind, Science 2023) beat the leading numerical
              weather model on 10-day forecasts. GNoME (DeepMind, Nature 2023)
              discovered 2.2M stable materials. MACE, NequIP, and Allegro
              dominate molecular dynamics benchmarks. When reality has
              structure, the architecture should too.
            </p>
          </div>
        </div>
      </Reveal>

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
            background: "var(--bg-elev)",
            borderBottom: "1px solid var(--rule)",
            display: "flex",
            justifyContent: "space-between",
            paddingBlock: 14,
            paddingInline: 20,
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
              The Ratio Stack
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
              Foundation model + picks &amp; shovels
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
            3 layers · all in-house
          </span>
        </div>
        {LAYERS.map((layer, i) => (
          <StackRow
            key={layer.title}
            layer={layer}
            withBottomBorder={i < LAYERS.length - 1}
            index={i}
          />
        ))}
      </Reveal>
    </section>
  );
}
