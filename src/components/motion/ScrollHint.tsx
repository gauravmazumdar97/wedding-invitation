"use client";

import { useEffect, useRef } from "react";
import { subscribeScroll } from "@/lib/scroll-bus";
import { usePrefersReducedMotion } from "@/hooks/useMedia";

export function ScrollHint() {
  const down = useRef<HTMLButtonElement>(null);
  const up = useRef<HTMLButtonElement>(null);
  const reduced = usePrefersReducedMotion();

  useEffect(() => {
    if (reduced) return undefined;
    return subscribeScroll(({ y, direction, progress }) => {
      if (down.current) {
        const showDown = y < 72;
        down.current.style.opacity = showDown ? "1" : "0";
        down.current.style.pointerEvents = showDown ? "auto" : "none";
        down.current.style.transform = `translate3d(-50%, ${direction > 0 ? 8 : 0}px, 0)`;
      }
      if (up.current) {
        const showUp = y > 520 && (direction < 0 || progress > 0.18);
        up.current.style.opacity = showUp ? "1" : "0";
        up.current.style.pointerEvents = showUp ? "auto" : "none";
        up.current.style.transform = `translate3d(0, ${direction < 0 ? -6 : 0}px, 0)`;
      }
    });
  }, [reduced]);

  const go = (top: number) => {
    window.scrollTo({ top, behavior: reduced ? "auto" : "smooth" });
  };

  if (reduced) return null;

  return (
    <>
      <button
        ref={down}
        type="button"
        className="scroll-cue app-press fixed left-1/2 z-[55] flex flex-col items-center gap-1 text-[var(--color-coral)]"
        style={{ bottom: "calc(1.35rem + var(--safe-bottom))", transform: "translate3d(-50%, 0, 0)" }}
        onClick={() => {
          const next = document.getElementById("story") || document.querySelector("main section:nth-of-type(2)");
          next?.scrollIntoView({ behavior: "smooth", block: "start" });
        }}
        aria-label="Scroll down"
      >
        <span className="font-sans text-[0.62rem] uppercase tracking-[0.28em]">Scroll</span>
        <span className="scroll-cue-arrow block h-7 w-4" aria-hidden />
      </button>

      <button
        ref={up}
        type="button"
        className="app-press fixed z-[55] inline-flex min-h-[var(--touch-min)] items-center rounded-full border border-[var(--color-navy)]/15 bg-[var(--color-paper)]/92 px-4 font-sans text-[0.62rem] uppercase tracking-[0.2em] text-[var(--color-navy)] opacity-0 backdrop-blur-md"
        style={{ top: "auto", bottom: "calc(5.25rem + var(--safe-bottom))", right: "calc(0.85rem + var(--safe-right))" }}
        onClick={() => go(0)}
        aria-label="Scroll to top"
      >
        Top
      </button>
    </>
  );
}
