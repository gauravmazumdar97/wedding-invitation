"use client";

import { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { wedding } from "@/config/wedding";
import { coupleDisplay } from "@/lib/invite";
import { WeddingPhoto } from "@/components/media/WeddingPhoto";
import { BengaliArch, PaanLeaf } from "@/components/art/Ornaments";
import { BananaLeaf, Mukut, ShankhaPola, Topor } from "@/components/art/BengaliMotifs";
import { useExperience } from "@/components/providers/ExperienceProvider";
import { useSceneTilt } from "@/hooks/useSceneTilt";
import { useIsMobile, useNativeScrollExperience, usePrefersReducedMotion } from "@/hooks/useMedia";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export function WeddingHero() {
  const { language } = useExperience();
  const { first, second } = coupleDisplay();
  const section = useRef<HTMLElement>(null);
  const world = useRef<HTMLDivElement>(null);
  const bg = useRef<HTMLDivElement>(null);
  const mid = useRef<HTMLDivElement>(null);
  const fg = useRef<HTMLDivElement>(null);
  const reduced = usePrefersReducedMotion();
  const mobile = useIsMobile();
  const nativeScroll = useNativeScrollExperience();

  useSceneTilt(world, {
    intensity: nativeScroll ? 7 : 11,
    depth: nativeScroll ? 16 : 28,
    enabled: !reduced,
  });

  useGSAP(
    () => {
      if (!section.current || reduced) return;
      const amount = nativeScroll ? 0.45 : 1;
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: section.current,
          start: "top top",
          end: "bottom top",
          scrub: nativeScroll ? 0.25 : 0.35,
        },
      });
      if (bg.current) tl.to(bg.current, { y: 56 * amount, scale: 1 + 0.08 * amount, ease: "none" }, 0);
      if (mid.current) tl.to(mid.current, { y: 28 * amount, ease: "none" }, 0);
      if (fg.current) tl.to(fg.current, { y: -18 * amount, opacity: 0.55 + 0.1 * (1 - amount), ease: "none" }, 0);
    },
    { scope: section, dependencies: [reduced, nativeScroll] },
  );

  return (
    <section
      ref={section}
      className="scene-3d relative isolate min-h-dvh overflow-hidden bg-[var(--color-burgundy)] text-[var(--color-ivory)]"
    >
      <div ref={world} className="preserve-3d relative min-h-dvh">
        <div
          ref={bg}
          className={
            nativeScroll
              ? "absolute inset-[-4%] [transform:translateZ(-60px)_scale(1.08)]"
              : "absolute inset-[-8%] [transform:translateZ(-120px)_scale(1.15)]"
          }
        >
          <WeddingPhoto
            priority
            src={wedding.photos.hero}
            alt={first.fullName + " and " + second.fullName}
            className="h-full w-full opacity-50"
            sizes="100vw"
          />
        </div>
        <div className="absolute inset-0 bg-gradient-to-b from-[rgba(42,18,22,0.2)] via-[rgba(42,18,22,0.38)] to-[rgba(42,18,22,0.78)] [transform:translateZ(-50px)]" />

        <div ref={mid} className="preserve-3d absolute inset-0">
          <div className="pointer-events-none absolute left-1/2 top-[max(1rem,var(--safe-top))] h-[88%] w-[min(92vw,42rem)] -translate-x-1/2 opacity-35 [transform:translateZ(10px)]">
            <BengaliArch className="h-full w-full" />
          </div>
          <div className="pointer-events-none absolute bottom-[max(1.5rem,var(--safe-bottom))] left-1/2 w-[min(90vw,36rem)] -translate-x-1/2 opacity-25 [transform:translateZ(28px)]">
            <BananaLeaf className="h-auto w-full" />
          </div>
          {mobile ? (
            <>
              <div className="float-3d-soft pointer-events-none absolute left-4 top-20 opacity-40 [transform:translateZ(40px)]">
                <Topor className="h-12 w-10" />
              </div>
              <div className="float-3d-soft pointer-events-none absolute right-4 top-20 opacity-40 [animation-delay:0.8s] [transform:translateZ(48px)]">
                <Mukut className="h-9 w-14" />
              </div>
            </>
          ) : (
            <>
              <div className="float-3d pointer-events-none absolute left-8 top-24 opacity-55 md:left-16 [transform:translateZ(70px)]">
                <Topor className="h-16 w-14" />
              </div>
              <div className="float-3d pointer-events-none absolute right-8 top-24 opacity-55 [animation-delay:0.8s] md:right-16 [transform:translateZ(80px)]">
                <Mukut className="h-12 w-20" />
              </div>
              <div className="float-3d pointer-events-none absolute bottom-20 left-8 opacity-45 [animation-delay:1.2s] [transform:translateZ(40px)]">
                <PaanLeaf className="h-16" />
              </div>
            </>
          )}
        </div>

        <div
          ref={fg}
          className="relative z-10 flex min-h-dvh flex-col items-center justify-center px-[var(--page-x)] pb-[max(5rem,calc(var(--safe-bottom)+4rem))] pt-[max(5rem,calc(var(--safe-top)+3.5rem))] text-center [transform:translateZ(56px)]"
        >
          <p className="font-bn text-sm tracking-[0.28em] text-[var(--color-candle)] sm:tracking-[0.35em]">
            {wedding.copy.shubhoBibaho}
          </p>
          <h1 className="mt-5 font-serif text-[clamp(2.75rem,13vw,7.5rem)] leading-[0.88] sm:mt-6">
            <span className="block">{first.fullName}</span>
            <span className="my-2 block font-serif text-xl text-[var(--color-gold)] sm:my-3 sm:text-2xl md:text-4xl">&</span>
            <span className="block">{second.fullName}</span>
          </h1>
          <p className="mt-6 font-bn text-base text-[var(--color-beige)] sm:mt-8 sm:text-lg">
            {first.bengaliName} ও {second.bengaliName}
          </p>
          <p className="mt-6 max-w-md font-serif text-lg italic text-[var(--color-ivory)]/90 sm:mt-8 sm:text-xl">
            {language === "bn" ? wedding.hero.kickerBn : wedding.hero.kicker}
          </p>
          <p className="mt-8 font-serif text-xs tracking-[0.28em] uppercase text-[var(--color-gold)] sm:mt-10 sm:text-sm sm:tracking-[0.32em]">
            {wedding.date.display} · {wedding.location.city}
          </p>
          <ShankhaPola className="mx-auto mt-6 h-9 w-20 opacity-80 sm:mt-8 sm:h-10 sm:w-24" />
        </div>
      </div>
    </section>
  );
}
