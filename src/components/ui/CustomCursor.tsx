"use client";

import { useEffect, useRef } from "react";
import { subscribePointer } from "@/lib/pointer-bus";
import { useIsFinePointer, usePrefersReducedMotion } from "@/hooks/useMedia";

export function CustomCursor() {
  const fine = useIsFinePointer();
  const reduced = usePrefersReducedMotion();
  const dot = useRef<HTMLDivElement>(null);
  const ring = useRef<HTMLDivElement>(null);
  const label = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    if (!fine || reduced) return undefined;
    document.documentElement.classList.add("has-cursor");

    const dotNode = dot.current;
    const ringNode = ring.current;
    const labelNode = label.current;
    if (!dotNode || !ringNode) return undefined;

    let ringX = window.innerWidth / 2;
    let ringY = window.innerHeight / 2;
    let hover = false;
    let frame = 0;
    let running = true;

    const tick = () => {
      if (!running) return;
      const pointer = { x: ringX, y: ringY };
      const snapX = Number(dotNode.dataset.x || pointer.x);
      const snapY = Number(dotNode.dataset.y || pointer.y);
      ringX += (snapX - ringX) * 0.18;
      ringY += (snapY - ringY) * 0.18;
      const scale = hover ? 2.15 : 1;
      ringNode.style.transform = `translate3d(${ringX}px, ${ringY}px, 0) translate(-50%, -50%) scale(${scale})`;
      ringNode.style.opacity = hover ? "1" : "0.7";
      frame = window.requestAnimationFrame(tick);
    };

    const unsub = subscribePointer((pointer) => {
      const cx = pointer.inside ? pointer.clientX : window.innerWidth / 2;
      const cy = pointer.inside ? pointer.clientY : window.innerHeight / 2;
      dotNode.dataset.x = String(cx);
      dotNode.dataset.y = String(cy);
      dotNode.style.transform = `translate3d(${cx}px, ${cy}px, 0) translate(-50%, -50%)`;
      dotNode.style.opacity = pointer.inside ? "1" : "0";
      ringNode.style.opacity = pointer.inside ? (hover ? "1" : "0.7") : "0";

      const under = document.elementFromPoint(cx, cy) as HTMLElement | null;
      hover = Boolean(under?.closest("a, button, input, textarea, select, [data-cursor='hover']"));
      const gallery = Boolean(under?.closest("#gallery button, [data-cursor='view']"));
      if (labelNode) {
        labelNode.textContent = gallery ? "View" : hover ? "Open" : "";
        labelNode.style.opacity = hover ? "1" : "0";
      }
    });

    frame = window.requestAnimationFrame(tick);

    return () => {
      running = false;
      unsub();
      document.documentElement.classList.remove("has-cursor");
      if (frame) window.cancelAnimationFrame(frame);
    };
  }, [fine, reduced]);

  if (!fine || reduced) return null;

  return (
    <>
      <div ref={dot} className="cursor-dot pointer-events-none fixed left-0 top-0 z-[90] hidden md:block" aria-hidden />
      <div ref={ring} className="cursor-ring pointer-events-none fixed left-0 top-0 z-[90] hidden md:block" aria-hidden>
        <span ref={label} className="cursor-label" />
      </div>
    </>
  );
}
