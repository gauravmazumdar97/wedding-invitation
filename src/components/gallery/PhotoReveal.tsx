"use client";

import { useRef } from "react";
import { wedding } from "@/config/wedding";
import { WeddingPhoto } from "@/components/media/WeddingPhoto";
import { coupleDisplay } from "@/lib/invite";
import { useSceneTilt } from "@/hooks/useSceneTilt";
import { usePrefersReducedMotion } from "@/hooks/useMedia";

export function PhotoReveal() {
  const { first, second } = coupleDisplay();
  const world = useRef<HTMLDivElement>(null);
  const reduced = usePrefersReducedMotion();
  useSceneTilt(world, { intensity: 8, enabled: !reduced });

  return (
    <section className="scene-3d relative min-h-[90dvh] overflow-hidden bg-[var(--color-burgundy)]">
      <div ref={world} className="preserve-3d absolute inset-0">
        <div className="absolute inset-[-6%] [transform:translateZ(-80px)_scale(1.12)]">
          <WeddingPhoto
            src={wedding.photos.couplePortrait}
            alt={`${first.fullName} and ${second.fullName}`}
            className="h-full w-full"
          />
        </div>
        <div className="absolute inset-0 bg-[rgba(42,18,22,0.28)] [transform:translateZ(-20px)]" />
        <p className="absolute bottom-10 left-6 font-serif text-5xl text-[var(--color-ivory)] [transform:translateZ(70px)] md:left-12 md:text-8xl">
          {first.initial}
          <span className="mx-2 text-[var(--color-gold)]">x</span>
          {second.initial}
        </p>
        <p className="absolute right-6 top-1/3 max-w-[8rem] text-right font-bn text-sm text-[var(--color-ivory)]/70 [transform:translateZ(50px)] md:right-12">
          দুটি হৃদয়, একটি পথ
        </p>
      </div>
    </section>
  );
}
