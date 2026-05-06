"use client";

import {
  motion,
  useMotionValue,
  useSpring,
  useTransform,
} from "motion/react";
import {
  useEffect,
  useRef,
  useState,
  type CSSProperties,
  type ReactNode,
} from "react";

/**
 * Crosshair cursor that follows the pointer with a soft spring and inflates
 * into a small disc over [data-cursor="hover"] or interactive elements.
 * Hides itself on touch / coarse pointer devices.
 */
export function CustomCursor() {
  const x = useMotionValue(-100);
  const y = useMotionValue(-100);
  const xs = useSpring(x, { stiffness: 600, damping: 50, mass: 0.4 });
  const ys = useSpring(y, { stiffness: 600, damping: 50, mass: 0.4 });
  const [enabled, setEnabled] = useState(false);
  const [hover, setHover] = useState(false);
  const [label, setLabel] = useState<string | null>(null);

  useEffect(() => {
    if (typeof window === "undefined") return;
    if (window.matchMedia("(pointer: coarse)").matches) return;
    setEnabled(true);
    document.body.style.cursor = "none";

    const move = (e: PointerEvent) => {
      x.set(e.clientX);
      y.set(e.clientY);
    };
    const over = (e: PointerEvent) => {
      const t = (e.target as HTMLElement | null)?.closest(
        'a, button, [data-cursor="hover"], [role="button"]'
      ) as HTMLElement | null;
      setHover(!!t);
      const lbl = t?.getAttribute("data-cursor-label");
      setLabel(lbl ?? null);
    };
    const out = () => {
      x.set(-100);
      y.set(-100);
    };
    window.addEventListener("pointermove", move);
    window.addEventListener("pointerover", over);
    window.addEventListener("pointerleave", out);
    return () => {
      document.body.style.cursor = "";
      window.removeEventListener("pointermove", move);
      window.removeEventListener("pointerover", over);
      window.removeEventListener("pointerleave", out);
    };
  }, [x, y]);

  // outer ring follows with a slower spring for a satisfying trail
  const lagX = useSpring(x, { stiffness: 180, damping: 22, mass: 0.7 });
  const lagY = useSpring(y, { stiffness: 180, damping: 22, mass: 0.7 });
  const ringX = useTransform(lagX, (v) => v - 18);
  const ringY = useTransform(lagY, (v) => v - 18);

  if (!enabled) return null;

  return (
    <>
      {/* core crosshair */}
      <motion.div
        aria-hidden
        style={{
          height: 14,
          left: -7,
          mixBlendMode: "difference",
          pointerEvents: "none",
          position: "fixed",
          top: -7,
          translateX: xs,
          translateY: ys,
          width: 14,
          willChange: "transform",
          x: 0,
          y: 0,
          zIndex: 9999,
        }}
      >
        <motion.div
          animate={{
            scale: hover ? 0.6 : 1,
            opacity: hover ? 0.4 : 1,
          }}
          transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
          style={{
            inset: 0,
            position: "absolute",
          }}
        >
          <span
            style={{
              background: "#FAFAF9",
              height: 1,
              left: "50%",
              position: "absolute",
              top: 0,
              transform: "translateX(-50%)",
              width: 1,
              ...({} as CSSProperties),
            }}
          />
          <span
            style={{
              background: "#FAFAF9",
              height: 1,
              left: "50%",
              position: "absolute",
              transform: "translateX(-50%)",
              top: 13,
              width: 1,
            }}
          />
          <span
            style={{
              background: "#FAFAF9",
              height: 1,
              left: 0,
              position: "absolute",
              top: "50%",
              transform: "translateY(-50%)",
              width: 1,
            }}
          />
          <span
            style={{
              background: "#FAFAF9",
              height: 1,
              left: 13,
              position: "absolute",
              top: "50%",
              transform: "translateY(-50%)",
              width: 1,
            }}
          />
        </motion.div>
      </motion.div>

      {/* outer reactive ring */}
      <motion.div
        aria-hidden
        style={{
          left: 0,
          pointerEvents: "none",
          position: "fixed",
          top: 0,
          translateX: ringX,
          translateY: ringY,
          willChange: "transform",
          zIndex: 9998,
        }}
      >
        <motion.div
          animate={{
            scale: hover ? 1 : 0.42,
            background: hover ? "rgba(196,181,253,0.16)" : "rgba(196,181,253,0)",
            borderColor: hover
              ? "rgba(196,181,253,0.85)"
              : "rgba(196,181,253,0.35)",
          }}
          transition={{
            duration: 0.45,
            ease: [0.16, 1, 0.3, 1],
          }}
          style={{
            border: "1px solid rgba(196,181,253,0.35)",
            borderRadius: 999,
            height: 36,
            width: 36,
          }}
        />
        {label && (
          <motion.span
            initial={{ opacity: 0, y: 4 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            style={{
              color: "#C4B5FD",
              fontFamily: '"IBM Plex Mono", ui-monospace, monospace',
              fontSize: 9,
              fontWeight: 500,
              left: 44,
              letterSpacing: "0.16em",
              lineHeight: "12px",
              position: "absolute",
              textTransform: "uppercase",
              top: 14,
              whiteSpace: "nowrap",
            }}
          >
            {label}
          </motion.span>
        )}
      </motion.div>
    </>
  );
}

/**
 * Element wrapper that gently tugs toward the pointer when it's nearby.
 * Used for nav links, the R logo, and CTAs. Cheap math, no rerenders.
 */
export function Magnetic({
  children,
  strength = 0.35,
  radius = 90,
  className,
  style,
  as = "div",
}: {
  children: ReactNode;
  strength?: number;
  radius?: number;
  className?: string;
  style?: CSSProperties;
  as?: "div" | "span" | "a" | "button";
}) {
  const ref = useRef<HTMLElement>(null);
  const tx = useMotionValue(0);
  const ty = useMotionValue(0);
  const sx = useSpring(tx, { stiffness: 320, damping: 28, mass: 0.5 });
  const sy = useSpring(ty, { stiffness: 320, damping: 28, mass: 0.5 });

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (typeof window === "undefined") return;
    if (window.matchMedia("(pointer: coarse)").matches) return;

    let frame = 0;
    const onMove = (e: PointerEvent) => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(() => {
        const rect = el.getBoundingClientRect();
        const cx = rect.left + rect.width / 2;
        const cy = rect.top + rect.height / 2;
        const dx = e.clientX - cx;
        const dy = e.clientY - cy;
        const dist = Math.hypot(dx, dy);
        if (dist < radius) {
          tx.set(dx * strength);
          ty.set(dy * strength);
        } else {
          tx.set(0);
          ty.set(0);
        }
      });
    };
    const onLeave = () => {
      tx.set(0);
      ty.set(0);
    };
    window.addEventListener("pointermove", onMove);
    window.addEventListener("pointerleave", onLeave);
    return () => {
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("pointerleave", onLeave);
      cancelAnimationFrame(frame);
    };
  }, [strength, radius, tx, ty]);

  const MotionTag = (motion as unknown as Record<string, typeof motion.div>)[
    as
  ];
  return (
    <MotionTag
      ref={ref as React.RefObject<HTMLDivElement>}
      style={{ ...style, x: sx, y: sy, display: "inline-flex" }}
      className={className}
    >
      {children}
    </MotionTag>
  );
}
