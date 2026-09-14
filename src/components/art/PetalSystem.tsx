"use client";

import { useEffect, useMemo, useRef } from "react";
import { useExperience } from "@/components/providers/ExperienceProvider";
import { useIsMobile, useNativeScrollExperience, usePrefersReducedMotion } from "@/hooks/useMedia";
import { subscribeScroll } from "@/lib/scroll-bus";

interface Petal {
  id: string;
  left: number;
  delay: number;
  duration: number;
  size: number;
  rotate: number;
  hue: string;
}

function makePetals(count: number, prefix: string): Petal[] {
  return Array.from({ length: count }, (_, index) => ({
    id: `${prefix}-${index}`,
    left: (index * 37 + 11) % 100,
    delay: (index * 0.45) % 3.5,
    duration: 12 + (index % 4) * 2.5,
    size: 7 + (index % 3) * 3,
    rotate: (index * 29) % 360,
    hue: index % 3 === 0 ? "#c41e3a" : index % 3 === 1 ? "#9e1830" : "#c9a44e",
  }));
}

export function PetalSystem() {
  const { opened, petalBurst } = useExperience();
  const mobile = useIsMobile();
  const nativeScroll = useNativeScrollExperience();
  const reduced = usePrefersReducedMotion();

  const petals = useMemo(() => {
    if (!opened) return makePetals(mobile ? 2 : 3, "a");
    const ambientCount = mobile ? 5 : nativeScroll ? 7 : 11;
    const burstCount = mobile ? 8 : nativeScroll ? 10 : 14;
    const ambient = makePetals(ambientCount, "a");
    const burst = petalBurst ? makePetals(burstCount, `b${petalBurst}`) : [];
    return [...ambient, ...burst];
  }, [mobile, nativeScroll, opened, petalBurst]);

  const layer = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (reduced || !layer.current) return undefined;
    const node = layer.current;
    return subscribeScroll(({ velocity, direction }) => {
      const drift = Math.max(-18, Math.min(18, -velocity * 0.35));
      node.style.transform = `translate3d(0, ${drift.toFixed(1)}px, 0)`;
      node.style.opacity = direction < 0 ? "0.72" : "1";
    });
  }, [reduced]);

  if (reduced) return null;

  return (
    <div ref={layer} className={`pointer-events-none fixed inset-0 overflow-hidden will-change-transform ${opened ? "z-[40]" : "z-[80]"}`} aria-hidden>
      {petals.map((petal) => (
        <span
          key={petal.id}
          className="absolute top-[-8vh] rounded-[60%_40%_60%_40%] opacity-50 will-change-transform sm:opacity-55"
          style={{
            left: `${petal.left}%`,
            width: petal.size,
            height: petal.size * 1.3,
            background: petal.hue,
            animation: `petal-drift ${petal.duration}s linear ${petal.delay}s infinite`,
            transform: `rotate(${petal.rotate}deg) translateZ(0)`,
          }}
        />
      ))}
    </div>
  );
}
