"use client";

import { useEffect, useRef } from "react";
import { Mukut, Topor } from "@/components/art/BengaliMotifs";
import { subscribePointer } from "@/lib/pointer-bus";
import { subscribeScroll } from "@/lib/scroll-bus";
import { useIsLaptop, usePrefersReducedMotion } from "@/hooks/useMedia";

/** Mukut left, topor right. Laptop only; they travel with scroll and lean with the pointer. */
export function CulturePresence() {
  const laptop = useIsLaptop();
  const mukut = useRef<HTMLDivElement>(null);
  const topor = useRef<HTMLDivElement>(null);
  const reduced = usePrefersReducedMotion();

  useEffect(() => {
    if (!laptop || reduced) return undefined;

    const pointer = { x: 0, y: 0 };
    const scroll = { progress: 0, velocity: 0, dir: 1 as -1 | 1 };

    const paint = () => {
      const p = scroll.progress;
      const dir = scroll.dir;
      const lift = Math.max(-18, Math.min(18, -scroll.velocity * 0.1));
      const lean = pointer.x * 14;
      const dip = pointer.y * 8;

      if (mukut.current) {
        const y = Math.sin(p * Math.PI * 2.1) * 11 * dir + lift + dip;
        mukut.current.style.transform = `translate3d(${(Math.sin(p * Math.PI * 1.6) * 10 * dir + lean).toFixed(1)}px, ${y.toFixed(1)}vh, ${(28 + p * 18).toFixed(1)}px) rotateZ(${(-10 + p * 16 * dir).toFixed(1)}deg) rotateY(${(-24 + pointer.x * 18).toFixed(1)}deg)`;
      }

      if (topor.current) {
        const y = Math.cos(p * Math.PI * 1.8) * 10 * dir + lift * 0.75 - dip;
        topor.current.style.transform = `translate3d(${(Math.cos(p * Math.PI * 1.4) * 9 * dir - lean).toFixed(1)}px, ${y.toFixed(1)}vh, ${(34 - p * 12).toFixed(1)}px) rotateZ(${(8 - p * 14 * dir).toFixed(1)}deg) rotateY(${(22 + pointer.x * 16).toFixed(1)}deg)`;
      }
    };

    const stopPointer = subscribePointer(({ nx, ny, inside }) => {
      pointer.x = inside ? nx : pointer.x * 0.88;
      pointer.y = inside ? ny : pointer.y * 0.88;
      paint();
    });

    const stopScroll = subscribeScroll(({ progress, velocity, direction }) => {
      scroll.progress = progress;
      scroll.velocity = velocity;
      if (direction !== 0) scroll.dir = direction;
      paint();
    });

    paint();
    return () => {
      stopPointer();
      stopScroll();
    };
  }, [laptop, reduced]);

  if (!laptop) return null;

  return (
    <div className="pointer-events-none fixed inset-0 z-[3] overflow-hidden scene-3d" aria-hidden>
      <div className="preserve-3d absolute inset-0">
        <div
          ref={mukut}
          className="absolute left-[max(1rem,calc(50%-26rem-5.5rem))] top-[22%] will-change-transform"
        >
          <Mukut className="crown-bob h-16 w-[6.75rem]" />
        </div>
        <div
          ref={topor}
          className="absolute right-[max(1rem,calc(50%-26rem-5.25rem))] top-[34%] will-change-transform"
        >
          <Topor className="crown-bob crown-bob-groom h-[7.25rem] w-[5.4rem]" />
        </div>
      </div>
    </div>
  );
}
