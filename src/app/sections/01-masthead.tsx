"use client";

import { motion } from "motion/react";
import { Magnetic } from "./_cursor";
import { ScrollProgress, useActiveSection } from "./_motion";

const mono: React.CSSProperties = {
  fontFamily: '"IBM Plex Mono", ui-monospace, monospace',
};

const NAV_ITEMS = [
  { id: "thesis", label: "01 Thesis" },
  { id: "validation", label: "02 Validation" },
  { id: "stack", label: "03 Stack" },
  { id: "proof", label: "04 Proof" },
  { id: "team", label: "05 Team" },
];

export function Masthead() {
  const active = useActiveSection(NAV_ITEMS.map((n) => n.id));

  return (
    <>
      <ScrollProgress />
      <motion.header
        initial={{ opacity: 0, y: -8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
        style={{
          display: "flex",
          flexDirection: "column",
          paddingTop: 24,
          paddingInline: "var(--pad-x)",
          position: "sticky",
          top: 0,
          zIndex: 50,
          background:
            "linear-gradient(180deg, rgba(12,12,11,0.96) 0%, rgba(12,12,11,0.86) 70%, rgba(12,12,11,0) 100%)",
          backdropFilter: "blur(8px)",
          WebkitBackdropFilter: "blur(8px)",
        }}
      >
        <div
          style={{
            alignItems: "center",
            borderBottom: "1px solid var(--rule)",
            display: "flex",
            justifyContent: "space-between",
            paddingBottom: 18,
          }}
        >
          <div style={{ alignItems: "center", display: "flex", gap: 18 }}>
            <Magnetic strength={0.35} radius={70}>
              <motion.a
                href="#thesis"
                aria-label="Ratio Labs — top of brief"
                data-cursor="hover"
                data-cursor-label="top"
                whileHover={{ opacity: 0.78 }}
                transition={{ duration: 0.2, ease: "easeOut" }}
                style={{
                  alignItems: "center",
                  display: "flex",
                  flexShrink: 0,
                  textDecoration: "none",
                }}
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src="/ratio-labs.png"
                  alt="Ratio Labs"
                  width={1236}
                  height={522}
                  style={{
                    display: "block",
                    height: 38,
                    width: "auto",
                  }}
                />
              </motion.a>
            </Magnetic>
            <span
              className="hide-sm"
              style={{
                background: "var(--rule)",
                flexShrink: 0,
                height: 14,
                width: 1,
              }}
            />
            <span
              className="hide-sm"
              style={{
                ...mono,
                color: "var(--ink-5)",
                fontSize: 10,
                letterSpacing: "0.08em",
                lineHeight: "12px",
                textTransform: "uppercase",
              }}
            >
              Investor Brief · v0.1 · 2026.05
            </span>
          </div>

          <nav
            className="masthead-nav"
            style={{ alignItems: "center", display: "flex", gap: 28 }}
          >
            <span className="hide-md" style={{ alignItems: "center", display: "flex", gap: 28 }}>
              {NAV_ITEMS.map((item) => {
                const isActive = active === item.id;
                return (
                  <Magnetic key={item.id} strength={0.4} radius={70}>
                    <motion.a
                      href={`#${item.id}`}
                      whileHover={{ color: "var(--ink)" }}
                      transition={{ duration: 0.2 }}
                      data-cursor="hover"
                      style={{
                        ...mono,
                        color: isActive ? "var(--ink)" : "var(--ink-5)",
                        fontSize: 10,
                        fontWeight: 500,
                        letterSpacing: "0.08em",
                        lineHeight: "12px",
                        position: "relative",
                        textDecoration: "none",
                        textTransform: "uppercase",
                      }}
                    >
                      {item.label}
                      {isActive && (
                        <motion.span
                          layoutId="nav-active-underline"
                          transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                          style={{
                            background: "var(--accent-2)",
                            bottom: -6,
                            height: 1,
                            left: 0,
                            position: "absolute",
                            right: 0,
                          }}
                        />
                      )}
                    </motion.a>
                  </Magnetic>
                );
              })}
            </span>

            <div
              style={{
                alignItems: "center",
                border: "1px solid var(--rule)",
                display: "flex",
                gap: 6,
                paddingBlock: 4,
                paddingInline: 10,
              }}
            >
              <motion.svg
                width="10"
                height="10"
                viewBox="0 0 12 12"
                fill="none"
                style={{ flexShrink: 0 }}
                animate={{ rotate: 360 }}
                transition={{ duration: 18, repeat: Infinity, ease: "linear" }}
                aria-hidden
              >
                <circle cx="6" cy="6" r="4.5" stroke="#62615B" />
                <path
                  d="M6 4 L6 6 L7.5 7"
                  stroke="#62615B"
                  strokeLinecap="round"
                />
              </motion.svg>
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
                5 min read
              </span>
            </div>
          </nav>
        </div>
      </motion.header>
    </>
  );
}
