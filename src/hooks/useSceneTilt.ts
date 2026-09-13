"use client";

import { useEffect, type RefObject } from "react";
import { useIsFinePointer, useIsMobile, usePrefersReducedMotion } from "@/hooks/useMedia";

export function useSceneTilt(
  ref: RefObject<HTMLElement | null>,
  options?: { intensity?: number; enabled?: boolean; depth?: number },
): void {
  const fine = useIsFinePointer();
  const mobile = useIsMobile();
  const reduced = usePrefersReducedMotion();
  const baseIntensity = options?.intensity ?? 14;
  const enabled = (options?.enabled ?? true) && fine && !reduced && !mobile;
  const depth = options?.depth ?? 24;

  useEffect(() => {
    const el = ref.current;
    if (!el || !enabled) return undefined;

    let targetX = 0;
    let targetY = 0;
    let currentX = 0;
    let currentY = 0;
    let frame = 0;
    let running = true;
    const intensity = Math.min(baseIntensity, 16);

    const tick = () => {
      frame = 0;
      if (!running) return;
      currentX += (targetX - currentX) * 0.16;
      currentY += (targetY - currentY) * 0.16;
      const dx = targetX - currentX;
      const dy = targetY - currentY;
      if (Math.abs(dx) < 0.0008 && Math.abs(dy) < 0.0008) {
        currentX = targetX;
        currentY = targetY;
      }
      const z = Math.hypot(currentX, currentY) * depth;
      el.style.transform = `translate3d(0,0,${z.toFixed(2)}px) rotateX(${(-currentY * intensity).toFixed(2)}deg) rotateY(${(currentX * intensity).toFixed(2)}deg)`;
      if (currentX !== targetX || currentY !== targetY) {
        frame = window.requestAnimationFrame(tick);
      }
    };

    const schedule = () => {
      if (!frame && running) frame = window.requestAnimationFrame(tick);
    };

    const onMove = (event: PointerEvent) => {
      targetX = (event.clientX / window.innerWidth - 0.5) * 2;
      targetY = (event.clientY / window.innerHeight - 0.5) * 2;
      schedule();
    };

    const onVisibility = () => {
      running = document.visibilityState === "visible";
      if (running) schedule();
    };

    window.addEventListener("pointermove", onMove, { passive: true });
    document.addEventListener("visibilitychange", onVisibility);

    return () => {
      running = false;
      window.removeEventListener("pointermove", onMove);
      document.removeEventListener("visibilitychange", onVisibility);
      if (frame) window.cancelAnimationFrame(frame);
      el.style.transform = "";
    };
  }, [ref, baseIntensity, enabled, depth]);
}
