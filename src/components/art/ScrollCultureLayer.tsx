"use client";

import { useEffect, useRef } from "react";
import { Kalka, Marigold, Diya, ShankhaPola } from "@/components/art/BengaliMotifs";
import { PaanLeaf, Lotus } from "@/components/art/Ornaments";
import { subscribeScroll } from "@/lib/scroll-bus";
import { useIsMobile, useNativeScrollExperience, usePrefersReducedMotion } from "@/hooks/useMedia";

/**
 * Lightweight culture layer: one scroll subscription drives a few GPU transforms.
 * Narrow/touch devices keep motifs but use gentler motion.
 */
export function ScrollCultureLayer() {
  const root = useRef<HTMLDivElement>(null);
  const world = useRef<HTMLDivElement>(null);
  const vineLeft = useRef<SVGPathElement>(null);
  const vineRight = useRef<SVGPathElement>(null);
  const reduced = usePrefersReducedMotion();
  const mobile = useIsMobile();
  const nativeScroll = useNativeScrollExperience();
  const lengths = useRef({ left: 0, right: 0 });

  useEffect(() => {
    if (reduced || !world.current) return undefined;

    if (vineLeft.current) {
      lengths.current.left = vineLeft.current.getTotalLength();
      vineLeft.current.style.strokeDasharray = `${lengths.current.left}`;
      vineLeft.current.style.strokeDashoffset = `${lengths.current.left}`;
    }
    if (vineRight.current) {
      lengths.current.right = vineRight.current.getTotalLength();
      vineRight.current.style.strokeDasharray = `${lengths.current.right}`;
      vineRight.current.style.strokeDashoffset = `${lengths.current.right}`;
    }

    return subscribeScroll(({ progress, velocity }) => {
      if (!world.current || !root.current) return;
      const turn = nativeScroll ? progress * 2.2 : progress * 7;
      const lift = Math.max(nativeScroll ? -6 : -10, Math.min(nativeScroll ? 6 : 10, -velocity * (nativeScroll ? 0.045 : 0.08)));
      world.current.style.transform = `translate3d(0, ${lift.toFixed(1)}px, 0) rotateY(${turn.toFixed(2)}deg)`;

      if (vineLeft.current && lengths.current.left) {
        vineLeft.current.style.strokeDashoffset = `${lengths.current.left * (1 - progress)}`;
      }
      if (vineRight.current && lengths.current.right) {
        vineRight.current.style.strokeDashoffset = `${lengths.current.right * (1 - progress)}`;
      }

      root.current.style.setProperty("--culture-p", progress.toFixed(3));
    });
  }, [reduced, nativeScroll]);

  if (reduced) return null;

  const count = mobile ? 3 : nativeScroll ? 4 : 6;

  return (
    <div ref={root} className="pointer-events-none fixed inset-0 z-[1] overflow-hidden scene-3d" aria-hidden>
      <div ref={world} className="preserve-3d absolute inset-0 will-change-transform">
        <svg className="absolute inset-y-0 left-0 h-full w-12 opacity-35 sm:w-16 sm:opacity-45 md:w-28" viewBox="0 0 80 900" fill="none">
          <path
            ref={vineLeft}
            d="M40 20 C18 90 62 150 40 220 C12 300 68 360 40 440 C16 520 64 580 40 660 C20 740 58 800 40 880"
            stroke="#8f1d22"
            strokeWidth="1.2"
          />
        </svg>
        <svg className="absolute inset-y-0 right-0 h-full w-12 opacity-35 sm:w-16 sm:opacity-45 md:w-28" viewBox="0 0 80 900" fill="none">
          <path
            ref={vineRight}
            d="M40 20 C62 90 18 150 40 220 C68 300 12 360 40 440 C64 520 16 580 40 660 C60 740 22 800 40 880"
            stroke="#c4a574"
            strokeWidth="1"
          />
        </svg>

        {Array.from({ length: count }).map((_, index) => {
          const left = index % 2 === 0;
          const Motif =
            index % 4 === 0 ? Marigold : index % 4 === 1 ? PaanLeaf : index % 4 === 2 ? Kalka : Lotus;
          const travel = (nativeScroll ? 5 : 8) + index * (nativeScroll ? 3 : 4);
          return (
            <div
              key={index}
              className="culture-motif absolute"
              style={{
                left: left ? `${4 + (index % 2) * 2}%` : "auto",
                right: left ? "auto" : `${4 + (index % 2) * 2}%`,
                top: `${10 + index * (mobile ? 18 : 12)}%`,
                transform: `translate3d(0, calc(var(--culture-p, 0) * -${travel}vh), 0)`,
              }}
            >
              <Motif className={`h-8 w-8 opacity-60 sm:h-9 sm:w-9 sm:opacity-70 md:h-12 md:w-12 ${left ? "" : "scale-x-[-1]"}`} />
            </div>
          );
        })}

        <div
          className="culture-motif absolute bottom-[16%] left-[6%]"
          style={{ transform: "translate3d(0, calc(var(--culture-p, 0) * -10vh), 0)" }}
        >
          <ShankhaPola className="h-8 w-16 opacity-50 sm:h-10 sm:w-20 sm:opacity-60" />
        </div>
        <div
          className="culture-motif absolute bottom-[10%] right-[5%]"
          style={{ transform: "translate3d(0, calc(var(--culture-p, 0) * -8vh), 0)" }}
        >
          <Diya className="h-8 w-11 opacity-50 sm:h-10 sm:w-14" />
        </div>
      </div>
    </div>
  );
}
