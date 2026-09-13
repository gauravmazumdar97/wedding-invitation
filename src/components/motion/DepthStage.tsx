"use client";

import { useEffect, useRef, type ReactNode } from "react";
import { cn } from "@/lib/cn";
import { subscribeScroll } from "@/lib/scroll-bus";
import { useNativeScrollExperience, usePrefersReducedMotion } from "@/hooks/useMedia";

interface DepthStageProps {
  children: ReactNode;
  className?: string;
  intensity?: number;
}

/**
 * Live 3D that follows the section through the viewport.
 * Scroll down tilts it away; scroll up tilts it back. Transform/opacity only.
 */
export function DepthStage({ children, className, intensity = 1 }: DepthStageProps) {
  const root = useRef<HTMLDivElement>(null);
  const stage = useRef<HTMLDivElement>(null);
  const reduced = usePrefersReducedMotion();
  const nativeScroll = useNativeScrollExperience();

  useEffect(() => {
    if (reduced || !root.current || !stage.current) return undefined;
    const node = stage.current;
    const hold = root.current;
    const scale = (nativeScroll ? 0.55 : 1) * intensity;

    return subscribeScroll(({ velocity }) => {
      const rect = hold.getBoundingClientRect();
      const viewH = window.innerHeight || 1;
      if (rect.bottom < -120 || rect.top > viewH + 120) return;

      const mid = rect.top + rect.height * 0.5;
      const view = Math.max(-1, Math.min(1, (mid - viewH * 0.52) / viewH));
      const lean = Math.max(-1, Math.min(1, velocity / 42));
      const xRot = view * 14 * scale + lean * 4 * scale;
      const yMove = view * 36 * scale;
      const zMove = -Math.abs(view) * 64 * scale;
      const fade = 1 - Math.min(0.22, Math.abs(view) * 0.28);

      node.style.transform = `translate3d(0, ${yMove.toFixed(1)}px, ${zMove.toFixed(1)}px) rotateX(${xRot.toFixed(2)}deg)`;
      node.style.opacity = fade.toFixed(3);
    });
  }, [reduced, nativeScroll, intensity]);

  return (
    <div ref={root} className={cn("scene-3d", className)}>
      <div ref={stage} className="preserve-3d will-change-transform">
        {children}
      </div>
    </div>
  );
}
