"use client";

import {
  motion,
  useInView,
  useMotionValue,
  useTransform,
  animate as motionAnimate,
  useScroll,
  useSpring,
  useVelocity,
  type HTMLMotionProps,
  type MotionValue,
  type Transition,
  type Variants,
} from "motion/react";
import {
  useEffect,
  useRef,
  useState,
  type ComponentPropsWithoutRef,
  type ReactNode,
  type RefObject,
} from "react";

// Editorial easing: expo-out feels like ink settling
export const EASE = [0.16, 1, 0.3, 1] as const;
export const FAST: Transition = { duration: 0.5, ease: EASE };
export const MEDIUM: Transition = { duration: 0.8, ease: EASE };
export const SLOW: Transition = { duration: 1.2, ease: EASE };

export const fadeUp: Variants = {
  hidden: { opacity: 0, y: 18 },
  visible: { opacity: 1, y: 0 },
};

export const fadeIn: Variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1 },
};

export const stagger = (delay = 0, each = 0.06): Variants => ({
  hidden: {},
  visible: {
    transition: { staggerChildren: each, delayChildren: delay },
  },
});

/**
 * Scroll-triggered fade+rise wrapper. Fires once when 25% of the element is visible.
 */
export function Reveal({
  children,
  delay = 0,
  y = 18,
  amount = 0.25,
  as: As = "div",
  className,
  style,
  ...rest
}: {
  children: ReactNode;
  delay?: number;
  y?: number;
  amount?: number;
  as?: "div" | "section" | "header" | "span";
  className?: string;
  style?: React.CSSProperties;
} & Omit<HTMLMotionProps<"div">, "variants" | "initial" | "animate" | "children">) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { amount, once: true });
  const Component = (motion as unknown as Record<string, typeof motion.div>)[As];

  return (
    <Component
      ref={ref}
      initial={{ opacity: 0, y }}
      animate={inView ? { opacity: 1, y: 0 } : undefined}
      transition={{ ...MEDIUM, delay }}
      className={className}
      style={style}
      {...rest}
    >
      {children}
    </Component>
  );
}

/**
 * Stagger container: children with className "rv-child" or motion components using `child` variants
 * will reveal sequentially when the parent enters the viewport.
 */
export function RevealStagger({
  children,
  amount = 0.2,
  delay = 0,
  each = 0.08,
  className,
  style,
}: {
  children: ReactNode;
  amount?: number;
  delay?: number;
  each?: number;
  className?: string;
  style?: React.CSSProperties;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { amount, once: true });
  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={inView ? "visible" : "hidden"}
      variants={stagger(delay, each)}
      className={className}
      style={style}
    >
      {children}
    </motion.div>
  );
}

/**
 * One staggered child of a RevealStagger. Fades up.
 */
export function RevealChild({
  children,
  className,
  style,
  y = 14,
}: {
  children: ReactNode;
  className?: string;
  style?: React.CSSProperties;
  y?: number;
}) {
  return (
    <motion.div
      variants={{
        hidden: { opacity: 0, y },
        visible: {
          opacity: 1,
          y: 0,
          transition: MEDIUM,
        },
      }}
      className={className}
      style={style}
    >
      {children}
    </motion.div>
  );
}

/**
 * Count-up number display that fires when scrolled into view.
 * Renders the formatted number; `format` controls thousands separator + suffix.
 */
export function CountUp({
  to,
  duration = 1.6,
  format = (v: number) => Math.round(v).toLocaleString(),
  suffix = "",
  prefix = "",
  className,
  style,
}: {
  to: number;
  duration?: number;
  format?: (v: number) => string;
  suffix?: string;
  prefix?: string;
  className?: string;
  style?: React.CSSProperties;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { amount: 0.8, once: true });
  const mv = useMotionValue(0);
  const display = useTransform(mv, (v) => `${prefix}${format(v)}${suffix}`);

  useEffect(() => {
    if (!inView) return;
    const controls = motionAnimate(mv, to, {
      duration,
      ease: EASE,
    });
    return () => controls.stop();
  }, [inView, to, duration, mv]);

  return (
    <motion.span ref={ref} className={className} style={style}>
      {display}
    </motion.span>
  );
}

/**
 * Thin scroll progress bar that pins to the top of the viewport.
 */
export function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 220,
    damping: 32,
    mass: 0.6,
  });
  return (
    <motion.div
      aria-hidden
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        height: 1,
        transformOrigin: "0% 50%",
        scaleX,
        background:
          "linear-gradient(90deg, rgba(196,181,253,0.0), rgba(196,181,253,0.95) 50%, rgba(139,92,246,0))",
        zIndex: 80,
        pointerEvents: "none",
      }}
    />
  );
}

/**
 * Tracks which section the viewport is currently centered over.
 * Sections are passed by id — the hook returns the active id.
 */
export function useActiveSection(ids: string[]): string {
  const [active, setActive] = useState(ids[0] ?? "");
  useEffect(() => {
    if (typeof window === "undefined") return;
    const onScroll = () => {
      const probe = window.scrollY + window.innerHeight * 0.35;
      let current = ids[0] ?? "";
      for (const id of ids) {
        const el = document.getElementById(id);
        if (!el) continue;
        if (el.offsetTop <= probe) current = id;
      }
      setActive(current);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [ids]);
  return active;
}

/**
 * Returns a 0..1 progress value that tracks the section's traversal of the
 * viewport. 0 = section's top hits viewport bottom, 1 = section's bottom
 * leaves viewport top.
 */
export function useSectionProgress(ref: RefObject<HTMLElement | null>) {
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  return scrollYProgress;
}

/**
 * Same shape but the section is "pinned" — progress runs while the section's
 * top is at the viewport top until its bottom reaches the viewport bottom.
 */
export function usePinnedProgress(ref: RefObject<HTMLElement | null>) {
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end end"],
  });
  return scrollYProgress;
}

/**
 * Velocity-driven skew. Returns a smoothed degrees value clamped at ±max.
 * Apply to skewX or skewY on display headings for a subtle Locomotive feel.
 */
export function useScrollSkew(max = 4) {
  const { scrollY } = useScroll();
  const v = useVelocity(scrollY);
  const sv = useSpring(v, { stiffness: 220, damping: 32, mass: 0.6 });
  return useTransform(sv, (val) => {
    const clamp = Math.max(-3000, Math.min(3000, val));
    return (clamp / 3000) * max;
  });
}

/**
 * Word inside a paragraph whose opacity is tied to scroll progress.
 */
function ScrollWord({
  progress,
  start,
  end,
  children,
}: {
  progress: MotionValue<number>;
  start: number;
  end: number;
  children: string;
}) {
  const opacity = useTransform(progress, [start, end], [0.18, 1], {
    clamp: true,
  });
  return <motion.span style={{ opacity }}>{children}</motion.span>;
}

/**
 * Renders a paragraph word-by-word, with each word tied to a slice of the
 * passed-in scroll progress. The first word lights up at `start`, the last
 * by `end`. Whitespace is preserved.
 */
export function ScrollText({
  text,
  progress,
  start = 0,
  end = 1,
}: {
  text: string;
  progress: MotionValue<number>;
  start?: number;
  end?: number;
}) {
  const tokens = text.split(/(\s+)/);
  const wordCount = tokens.filter((t) => t.trim().length > 0).length;
  const span = (end - start) / Math.max(1, wordCount);
  let wIdx = -1;
  return (
    <>
      {tokens.map((tok, i) => {
        if (!tok.trim()) return <span key={i}>{tok}</span>;
        wIdx++;
        const ws = start + wIdx * span;
        const we = ws + span * 1.6;
        return (
          <ScrollWord key={i} progress={progress} start={ws} end={we}>
            {tok}
          </ScrollWord>
        );
      })}
    </>
  );
}

/**
 * SVG path that draws on when scrolled into view.
 */
export function DrawPath({
  d,
  stroke = "currentColor",
  strokeWidth = 1,
  duration = 1.4,
  delay = 0,
  fill = "none",
  ...rest
}: {
  d: string;
  stroke?: string;
  strokeWidth?: number;
  duration?: number;
  delay?: number;
  fill?: string;
} & Omit<ComponentPropsWithoutRef<typeof motion.path>, "d" | "stroke" | "fill" | "strokeWidth">) {
  const ref = useRef<SVGPathElement>(null);
  const inView = useInView(ref, { amount: 0.4, once: true });
  return (
    <motion.path
      ref={ref}
      d={d}
      stroke={stroke}
      strokeWidth={strokeWidth}
      fill={fill}
      initial={{ pathLength: 0, opacity: 0 }}
      animate={inView ? { pathLength: 1, opacity: 1 } : undefined}
      transition={{
        pathLength: { duration, ease: EASE, delay },
        opacity: { duration: 0.2, delay },
      }}
      {...rest}
    />
  );
}
