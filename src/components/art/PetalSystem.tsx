"use client";

import { useMemo } from "react";
import { useExperience } from "@/components/providers/ExperienceProvider";
import { useIsMobile, useNativeScrollExperience, usePrefersReducedMotion } from "@/hooks/useMedia";

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
    hue: index % 3 === 0 ? "#8f1d22" : index % 3 === 1 ? "#c98986" : "#c4a574",
  }));
}

export function PetalSystem() {
  const { opened, petalBurst } = useExperience();
  const mobile = useIsMobile();
  const nativeScroll = useNativeScrollExperience();
  const reduced = usePrefersReducedMotion();

  const petals = useMemo(() => {
    if (!opened) return makePetals(mobile ? 2 : 3, "a");
    const ambientCount = mobile ? 2 : nativeScroll ? 3 : 6;
    const burstCount = mobile ? 5 : nativeScroll ? 7 : 10;
    const ambient = makePetals(ambientCount, "a");
    const burst = petalBurst ? makePetals(burstCount, `b${petalBurst}`) : [];
    return [...ambient, ...burst];
  }, [mobile, nativeScroll, opened, petalBurst]);

  if (reduced) return null;

  return (
    <div className="pointer-events-none fixed inset-0 z-[40] overflow-hidden" aria-hidden>
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
