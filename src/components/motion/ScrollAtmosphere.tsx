"use client";

import { useEffect, useRef } from "react";
import { subscribeScroll } from "@/lib/scroll-bus";
import { useIsMobile, usePrefersReducedMotion } from "@/hooks/useMedia";

const planes = [
  { x: "8%", y: "22%", w: 120, h: 160, depth: 40, spin: 1 },
  { x: "78%", y: "18%", w: 90, h: 120, depth: 70, spin: -1 },
  { x: "84%", y: "62%", w: 110, h: 80, depth: 28, spin: 0.6 },
  { x: "6%", y: "68%", w: 80, h: 80, depth: 55, spin: -0.8 },
];

/** Floating 3D planes that reverse as you scroll up. */
export function ScrollAtmosphere() {
  const world = useRef<HTMLDivElement>(null);
  const reduced = usePrefersReducedMotion();
  const mobile = useIsMobile();

  useEffect(() => {
    if (reduced || !world.current) return undefined;
    const nodes = Array.from(world.current.querySelectorAll<HTMLElement>("[data-plane]"));
    const amp = mobile ? 0.55 : 1;

    return subscribeScroll(({ progress, velocity, direction }) => {
      const turn = progress * 18 * amp;
      const lift = Math.max(-14, Math.min(14, -velocity * 0.12));
      nodes.forEach((node, index) => {
        const plane = planes[index];
        if (!plane) return;
        const dir = direction === 0 ? 1 : direction;
        const rotY = turn * plane.spin + dir * 6 * plane.spin;
        const rotX = 16 + progress * 10 * dir;
        const z = plane.depth + progress * 36 * amp * dir;
        node.style.transform = `translate3d(0, ${lift.toFixed(1)}px, ${z.toFixed(1)}px) rotateX(${rotX.toFixed(1)}deg) rotateY(${rotY.toFixed(1)}deg)`;
      });
    });
  }, [reduced, mobile]);

  if (reduced) return null;

  return (
    <div className="pointer-events-none fixed inset-0 z-[1] overflow-hidden scene-3d" aria-hidden>
      <div ref={world} className="preserve-3d absolute inset-0">
        {planes.slice(0, mobile ? 2 : 4).map((plane, index) => (
          <span
            key={index}
            data-plane
            className="atmosphere-plane absolute rounded-[1.2rem] will-change-transform"
            style={{
              left: plane.x,
              top: plane.y,
              width: plane.w,
              height: plane.h,
            }}
          />
        ))}
      </div>
    </div>
  );
}
