"use client";

import { useRef, type ReactNode } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { cn } from "@/lib/cn";
import { useIsMobile, usePrefersReducedMotion } from "@/hooks/useMedia";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

interface DepthStageProps {
  children: ReactNode;
  className?: string;
  intensity?: number;
}

/** Soft scroll entrance - transform/opacity only, lighter on mobile. */
export function DepthStage({ children, className, intensity = 1 }: DepthStageProps) {
  const root = useRef<HTMLDivElement>(null);
  const stage = useRef<HTMLDivElement>(null);
  const reduced = usePrefersReducedMotion();
  const mobile = useIsMobile();

  useGSAP(
    () => {
      if (!root.current || !stage.current || reduced) return;
      if (mobile) {
        gsap.fromTo(
          stage.current,
          { y: 28, opacity: 0.4 },
          {
            y: 0,
            opacity: 1,
            ease: "none",
            scrollTrigger: {
              trigger: root.current,
              start: "top 88%",
              end: "top 55%",
              scrub: 0.35,
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
    { scope: root, dependencies: [reduced, intensity, mobile] },
  );

  return (
    <div ref={root} className={cn(mobile ? "" : "scene-3d", className)}>
      <div ref={stage} className="will-change-transform">
        {children}
      </div>
    </div>
  );
}
