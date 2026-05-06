"use client";

import { motion } from "motion/react";
import { CountUp, EASE, Reveal, RevealChild, RevealStagger } from "./_motion";

const mono: React.CSSProperties = {
  fontFamily: '"IBM Plex Mono", ui-monospace, monospace',
};

type Exhibit = {
  letter: "A" | "B" | "C";
  domain: string;
  title: string;
  metricValue: number;
  metricPrefix?: string;
  metricSuffix?: string;
  metricFormat?: (n: number) => string;
  metricTag: string;
  bullets: string[];
  source: string;
};

const oneDecimal = (n: number) => n.toFixed(1);

const EXHIBITS: Exhibit[] = [
  {
    letter: "A",
    domain: "Drug discovery",
    title: "AlphaFold & Isomorphic Labs",
    metricValue: 3,
    metricPrefix: "$",
    metricSuffix: "B",
    metricTag: "in pharma alliances",
    bullets: [
      "200M protein structures predicted; 2024 Nobel Prize in Chemistry.",
      "Eli Lilly & Novartis pharma R&D alliances ↗ projected 25–45 % drug-discovery cost reduction this decade.",
      "1.2M researchers worldwide actively using AlphaFold today.",
    ],
    source: "Source · Financial Content (Jan 2026); Springer Nature (Dec 2025)",
  },
  {
    letter: "B",
    domain: "Hyperscale GNNs",
    title: "TikTok · Pinterest · Spotify",
    metricValue: 2.7,
    metricFormat: oneDecimal,
    metricSuffix: "B",
    metricTag: "monthly active users served",
    bullets: [
      "ByteGraph processes trillions of edges for TikTok recommendation, social graph, fraud detection across 1B+ MAU.",
      "PinSage generates embeddings for 3B+ Pins; powers visual discovery + ad targeting.",
      "Spotify GNN-driven discovery underpins $90B+ market cap, 675M MAU.",
    ],
    source: "Source · Production deployments at planetary scale",
  },
  {
    letter: "C",
    domain: "Antimicrobial",
    title: "Halicin & Nature 2024 antibiotics",
    metricValue: 1.2,
    metricFormat: oneDecimal,
    metricSuffix: "M",
    metricTag: "deaths annually from AMR",
    bullets: [
      "Halicin — first antibiotic discovered by AI, identified by a GNN on molecular graphs.",
      "2024 Nature cover: explainable GNNs screened 12M+ compounds, found a new structural class.",
      "Decades of conventional drug discovery had stalled in this space. GNNs unstuck it.",
    ],
    source: "Source · Stokes et al. (Cell 2020); Wong et al. (Nature 2024)",
  },
];

function ExhibitCard({ exhibit, withRightDivider }: { exhibit: Exhibit; withRightDivider: boolean }) {
  return (
    <motion.div
      variants={{
        hidden: { opacity: 0, y: 20 },
        visible: {
          opacity: 1,
          y: 0,
          transition: { duration: 0.9, ease: EASE },
        },
      }}
      whileHover={{
        background: "rgba(139, 92, 246, 0.04)",
      }}
      style={{
        borderRight: withRightDivider ? "1px solid var(--rule)" : undefined,
        display: "flex",
        flex: "1 1 0",
        flexBasis: 0,
        flexDirection: "column",
        gap: 18,
        padding: 32,
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
            letterSpacing: "0.16em",
            lineHeight: "12px",
            textTransform: "uppercase",
          }}
        >
          [ Exhibit {exhibit.letter} ]
        </span>
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
          {exhibit.domain}
        </span>
      </div>

      <h3
        style={{
          color: "var(--ink)",
          fontFamily: '"IBM Plex Sans", system-ui, sans-serif',
          fontSize: 22,
          fontWeight: 500,
          letterSpacing: "-0.02em",
          lineHeight: "26px",
          margin: 0,
        }}
      >
        {exhibit.title}
      </h3>

      <div style={{ alignItems: "baseline", display: "flex", gap: 8 }}>
        <span
          style={{
            ...mono,
            color: "var(--ink)",
            fontSize: 56,
            fontVariantNumeric: "tabular-nums",
            letterSpacing: "-0.03em",
            lineHeight: "56px",
          }}
        >
          <CountUp
            to={exhibit.metricValue}
            duration={1.6}
            prefix={exhibit.metricPrefix}
            suffix={exhibit.metricSuffix}
            format={exhibit.metricFormat}
          />
        </span>
        <span
          style={{
            ...mono,
            color: "var(--ink-5)",
            fontSize: 11,
            letterSpacing: "0.06em",
            lineHeight: "14px",
            textTransform: "uppercase",
          }}
        >
          {exhibit.metricTag}
        </span>
      </div>

      <ul
        style={{
          borderTop: "1px solid var(--rule)",
          display: "flex",
          flexDirection: "column",
          gap: 8,
          listStyle: "none",
          margin: 0,
          padding: 0,
          paddingTop: 4,
        }}
      >
        {exhibit.bullets.map((b, i) => (
          <li
            key={i}
            style={{ alignItems: "flex-start", display: "flex", gap: 8 }}
          >
            <span
              style={{
                ...mono,
                color: "var(--ink-5)",
                fontSize: 10,
                lineHeight: "12px",
                paddingTop: 4,
              }}
            >
              ·
            </span>
            <span
              style={{ color: "var(--ink-2)", fontSize: 13, lineHeight: "19px" }}
            >
              {b}
            </span>
          </li>
        ))}
      </ul>

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
        {exhibit.source}
      </span>
    </motion.div>
  );
}

export function Validation() {
  return (
    <section
      id="validation"
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
            [ 04 / Validation ]
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
            Geometry-native AI already works. The outcomes are measured in
            billions.
          </h2>
        </div>
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
          3 exhibits · all single-domain
        </span>
      </Reveal>

      <RevealStagger
        amount={0.15}
        each={0.16}
        className="stack-md with-rules"
        style={{
          borderTop: "1px solid var(--rule)",
          borderBottom: "1px solid var(--rule)",
          display: "flex",
        }}
      >
        {EXHIBITS.map((ex, i) => (
          <ExhibitCard
            key={ex.letter}
            exhibit={ex}
            withRightDivider={i < EXHIBITS.length - 1}
          />
        ))}
      </RevealStagger>

      <Reveal style={{ alignItems: "center", display: "flex", gap: 12 }}>
        <span
          style={{
            ...mono,
            color: "var(--accent-2)",
            fontSize: 11,
            fontWeight: 500,
            letterSpacing: "0.06em",
            lineHeight: "14px",
            textTransform: "uppercase",
          }}
        >
          Pattern
        </span>
        <span
          style={{
            background: "var(--rule)",
            flexShrink: 0,
            height: 1,
            width: 24,
          }}
        />
        <p
          style={{
            color: "var(--ink-2)",
            fontSize: 14,
            lineHeight: "20px",
            margin: 0,
            maxWidth: 1100,
          }}
        >
          All three are geometric deep learning systems. All three outperformed
          decades of traditional methods. All three addressed single domains. We
          are building the horizontal platform.
        </p>
      </Reveal>
    </section>
  );
}

void RevealChild;
