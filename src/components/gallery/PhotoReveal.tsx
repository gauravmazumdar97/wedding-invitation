"use client";

import { useRef } from "react";
import { wedding } from "@/config/wedding";
import { WeddingPhoto } from "@/components/media/WeddingPhoto";
import { coupleDisplay } from "@/lib/invite";
import { useSceneTilt } from "@/hooks/useSceneTilt";
import { useNativeScrollExperience, usePrefersReducedMotion } from "@/hooks/useMedia";

export function PhotoReveal() {
  const { first, second } = coupleDisplay();
  const world = useRef<HTMLDivElement>(null);
  const reduced = usePrefersReducedMotion();
  const nativeScroll = useNativeScrollExperience();
  useSceneTilt(world, {
    intensity: nativeScroll ? 5 : 8,
    depth: nativeScroll ? 14 : 24,
    enabled: !reduced,
  });

  return (
    <section className="scene-3d relative min-h-[78dvh] overflow-hidden bg-[var(--color-burgundy)] sm:min-h-[90dvh]">
      <div ref={world} className="preserve-3d absolute inset-0">
        <div
          className={
            nativeScroll
              ? "absolute inset-[-3%] [transform:translateZ(-40px)_scale(1.06)]"
              : "absolute inset-[-6%] [transform:translateZ(-80px)_scale(1.12)]"
          }
        >
          <WeddingPhoto
            src={wedding.photos.couplePortrait}
            alt={`${first.fullName} and ${second.fullName}`}
            className="h-full w-full"
            sizes="100vw"
          />
        </div>
        <div className="absolute inset-0 bg-[rgba(42,18,22,0.28)] [transform:translateZ(-20px)]" />
        <p className="absolute bottom-[max(2rem,calc(var(--safe-bottom)+1.5rem))] left-[var(--page-x)] font-serif text-[2.75rem] text-[var(--color-ivory)] [transform:translateZ(70px)] sm:text-5xl md:text-8xl">
          {first.initial}
          <span className="mx-2 text-[var(--color-gold)]">x</span>
          {second.initial}
        </p>
        <p className="absolute right-[var(--page-x-end)] top-[32%] max-w-[7.5rem] text-right font-bn text-sm text-[var(--color-ivory)]/70 [transform:translateZ(50px)] sm:max-w-[8rem] md:top-1/3">
          দুটি হৃদয়, একটি পথ
        </p>
      </div>
    </section>
  );
}
