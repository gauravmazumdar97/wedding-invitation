"use client";

import { useEffect, useRef } from "react";
import { subscribePointer } from "@/lib/pointer-bus";
import { useIsFinePointer, usePrefersReducedMotion } from "@/hooks/useMedia";

export function PointerHud() {
  const x = useRef<HTMLSpanElement>(null);
  const y = useRef<HTMLSpanElement>(null);
  const fine = useIsFinePointer();
  const reduced = usePrefersReducedMotion();

  useEffect(() => {
    if (!fine || reduced) return undefined;
    return subscribePointer((pointer) => {
      if (x.current) x.current.textContent = String(Math.round(pointer.x * 1000)).padStart(4, "0");
      if (y.current) y.current.textContent = String(Math.round(pointer.y * 1000)).padStart(4, "0");
    });
  }, [fine, reduced]);

  if (!fine || reduced) return null;

  return (
    <p className="pointer-events-none fixed left-[var(--page-x)] top-[calc(var(--safe-top)+0.7rem)] z-[56] hidden font-sans text-[0.58rem] tracking-[0.22em] text-[var(--color-gold)] md:block">
      <span ref={x}>0500</span> X&nbsp;&nbsp;
      <span ref={y}>0500</span> Y
    </p>
  );
}
