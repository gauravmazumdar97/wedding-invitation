"use client";

import { useRef, type ReactNode } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { cn } from "@/lib/cn";
import { useNativeScrollExperience, usePrefersReducedMotion } from "@/hooks/useMedia";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

interface DepthStageProps {
  children: ReactNode;
  className?: string;
  intensity?: number;
}

/** Soft scroll entrance - transform/opacity only, lighter on touch and narrow screens. */
export function DepthStage({ children, className, intensity = 1 }: DepthStageProps) {
  const root = useRef<HTMLDivElement>(null);
  const stage = useRef<HTMLDivElement>(null);
  const reduced = usePrefersReducedMotion();
  const nativeScroll = useNativeScrollExperience();

  useGSAP(
    () => {
      if (!root.current || !stage.current || reduced) return;
      if (nativeScroll) {
        gsap.fromTo(
          stage.current,
          { y: 22, opacity: 0.45 },
          {
            y: 0,
            opacity: 1,
            ease: "none",
            scrollTrigger: {
              trigger: root.current,
              start: "top 90%",
              end: "top 58%",
              scrub: 0.28,
            },
          },
        );
        return;
      }
      gsap.fromTo(
        stage.current,
        {
          rotateX: 10 * intensity,
          y: 36,
          z: -80 * intensity,
          opacity: 0.45,
          transformPerspective: 1000,
        },
        {
          rotateX: 0,
          y: 0,
          z: 0,
          opacity: 1,
          ease: "none",
          scrollTrigger: {
            trigger: root.current,
            start: "top 88%",
            end: "top 48%",
            scrub: 0.4,
          },
        },
      );
    },
    { scope: root, dependencies: [reduced, intensity, nativeScroll] },
  );

  return (
    <div ref={root} className={cn(nativeScroll ? "" : "scene-3d", className)}>
      <div ref={stage} className="will-change-transform">
        {children}
      </div>
    </div>
  );
}
