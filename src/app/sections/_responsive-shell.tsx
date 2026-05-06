"use client";

import {
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
  type ReactNode,
} from "react";

const DESIGN_WIDTH = 1440;
// Estimated natural height of the design — only used to pre-reserve vertical
// space on the very first paint to avoid CLS. Once the inner content mounts
// we measure it exactly with a ResizeObserver and use the real number.
const DESIGN_HEIGHT_ESTIMATE = 8800;
// We don't shrink the design below this width — below this threshold we keep
// the design at this width and let the page scroll horizontally. The
// alternative (rebuilding 10 dense data sections for narrow viewports) would
// gut the design's identity.
const MIN_RENDER_WIDTH = 360;

const useIsoLayoutEffect =
  typeof window !== "undefined" ? useLayoutEffect : useEffect;

/**
 * Wraps a 1440-native design and proportionally scales it down for smaller
 * viewports. The scaled height is mirrored on the outer wrapper so vertical
 * scroll is in real (visible) pixels — Lenis, IntersectionObserver, and
 * sticky positioning all keep working because the scroll container is the
 * window and the inner shell remains a 1440-wide layout.
 */
export function ResponsiveShell({ children }: { children: ReactNode }) {
  const innerRef = useRef<HTMLDivElement>(null);
  const [scale, setScale] = useState(1);
  const [innerHeight, setInnerHeight] = useState<number | null>(null);

  // Track viewport width → scale
  useIsoLayoutEffect(() => {
    if (typeof window === "undefined") return;
    const update = () => {
      const w = Math.max(window.innerWidth, MIN_RENDER_WIDTH);
      setScale(Math.min(1, w / DESIGN_WIDTH));
    };
    update();
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, []);

  // Track inner height so the outer wrapper reserves the correct visual height
  useIsoLayoutEffect(() => {
    if (!innerRef.current) return;
    const node = innerRef.current;
    const ro = new ResizeObserver((entries) => {
      for (const e of entries) {
        const h = e.contentRect.height || node.offsetHeight;
        setInnerHeight(h);
      }
    });
    ro.observe(node);
    setInnerHeight(node.offsetHeight);
    return () => ro.disconnect();
  }, []);

  // First-paint placeholder: aspect-ratio reserves the right amount of space
  // before we've measured anything.
  const placeholderHeight = `calc(100vw * ${
    DESIGN_HEIGHT_ESTIMATE / DESIGN_WIDTH
  })`;
  const wrapperHeight =
    innerHeight !== null ? `${innerHeight * scale}px` : placeholderHeight;

  return (
    <div
      style={{
        height: wrapperHeight,
        margin: "0 auto",
        maxWidth: DESIGN_WIDTH,
        overflow: "hidden",
        position: "relative",
        width: "100%",
      }}
    >
      <div
        ref={innerRef}
        style={{
          left: 0,
          position: "absolute",
          top: 0,
          transform: `scale(${scale})`,
          transformOrigin: "0 0",
          width: DESIGN_WIDTH,
        }}
      >
        {children}
      </div>
    </div>
  );
}
