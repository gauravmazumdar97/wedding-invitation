"use client";

import { useEffect, useRef } from "react";
import { useIsFinePointer, usePrefersReducedMotion } from "@/hooks/useMedia";

/** Cursor that updates DOM directly - no React re-render on every mousemove. */
export function CustomCursor() {
  const fine = useIsFinePointer();
  const reduced = usePrefersReducedMotion();
  const dot = useRef<HTMLDivElement>(null);
  const hovering = useRef(false);

  useEffect(() => {
    if (!fine || reduced) return undefined;
    const el = dot.current;
    if (!el) return undefined;

    let x = 0;
    let y = 0;
    let frame = 0;
    let dirty = false;

    const paint = () => {
      frame = 0;
      dirty = false;
      const scale = hovering.current ? 1.55 : 1;
      el.style.transform = `translate3d(${x}px, ${y}px, 0) translate(-50%, -50%) scale(${scale})`;
    };

    const move = (event: MouseEvent) => {
      x = event.clientX;
      y = event.clientY;
      const target = event.target as HTMLElement | null;
      hovering.current = Boolean(
        target?.closest("a, button, input, textarea, select, [data-cursor='hover']"),
      );
      if (!dirty) {
        dirty = true;
        frame = window.requestAnimationFrame(paint);
      }
    };

    window.addEventListener("pointermove", move, { passive: true });
    return () => {
      window.removeEventListener("pointermove", move);
      if (frame) window.cancelAnimationFrame(frame);
    };
  }, [fine, reduced]);

  if (!fine || reduced) return null;

  return (
    <div
      ref={dot}
      className="pointer-events-none fixed left-0 top-0 z-[90] hidden will-change-transform md:block"
      aria-hidden
    >
      <span className="block h-3 w-3 rounded-full border border-[#c4a574]" />
    </div>
  );
}
