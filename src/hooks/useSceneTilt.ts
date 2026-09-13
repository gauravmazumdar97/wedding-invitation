"use client";

import { useEffect, type RefObject } from "react";
import { subscribePointer } from "@/lib/pointer-bus";
import { useIsFinePointer, useIsMobile, usePrefersReducedMotion } from "@/hooks/useMedia";

/**
 * Desktop: pointer-driven 3D tilt from the shared PointerBus.
 * Touch: soft ambient drift so depth stays present without hover.
 */
export function useSceneTilt(
  ref: RefObject<HTMLElement | null>,
  options?: { intensity?: number; enabled?: boolean; depth?: number },
): void {
  const fine = useIsFinePointer();
  const mobile = useIsMobile();
  const reduced = usePrefersReducedMotion();
  const baseIntensity = options?.intensity ?? 14;
  const enabled = (options?.enabled ?? true) && !reduced;
  const depth = options?.depth ?? 24;

  useEffect(() => {
    const el = ref.current;
    if (!el || !enabled) return undefined;

    let targetX = 0;
    let targetY = 0;
    let currentX = 0;
    let currentY = 0;
    let frame = 0;
    let ambientFrame = 0;
    let running = true;
    const intensity = fine
      ? Math.min(baseIntensity, 16)
      : Math.min(baseIntensity * (mobile ? 0.32 : 0.4), 6.5);
    const depthScale = fine ? depth : depth * 0.4;
    const smoothing = fine ? 0.16 : 0.08;

    const tick = () => {
      frame = 0;
      if (!running) return;
      currentX += (targetX - currentX) * smoothing;
      currentY += (targetY - currentY) * smoothing;
      if (Math.abs(targetX - currentX) < 0.0008 && Math.abs(targetY - currentY) < 0.0008) {
        currentX = targetX;
        currentY = targetY;
      }
      const z = Math.hypot(currentX, currentY) * depthScale;
      el.style.transform = `translate3d(0,0,${z.toFixed(2)}px) rotateX(${(-currentY * intensity).toFixed(2)}deg) rotateY(${(currentX * intensity).toFixed(2)}deg)`;
      if (currentX !== targetX || currentY !== targetY) {
        frame = window.requestAnimationFrame(tick);
      }
    };

    const schedule = () => {
      if (!frame && running) frame = window.requestAnimationFrame(tick);
    };

    const ambient = (now: number) => {
      if (!running) return;
      const t = now * 0.00032;
      targetX = Math.sin(t) * 0.26;
      targetY = Math.cos(t * 0.82) * 0.16;
      schedule();
      ambientFrame = window.requestAnimationFrame(ambient);
    };

    const onVisibility = () => {
      running = document.visibilityState === "visible";
      if (running) {
        schedule();
        if (!fine && !ambientFrame) ambientFrame = window.requestAnimationFrame(ambient);
      } else if (ambientFrame) {
        window.cancelAnimationFrame(ambientFrame);
        ambientFrame = 0;
      }
    };

    const unsub = fine
      ? subscribePointer((pointer) => {
          if (!pointer.inside) {
            targetX = 0;
            targetY = 0;
          } else {
            targetX = pointer.nx;
            targetY = pointer.ny;
          }
          schedule();
        })
      : undefined;

    if (!fine) ambientFrame = window.requestAnimationFrame(ambient);

    document.addEventListener("visibilitychange", onVisibility);

    return () => {
      running = false;
      unsub?.();
      document.removeEventListener("visibilitychange", onVisibility);
      if (frame) window.cancelAnimationFrame(frame);
      if (ambientFrame) window.cancelAnimationFrame(ambientFrame);
      el.style.transform = "";
    };
  }, [ref, baseIntensity, enabled, depth, fine, mobile]);
}
