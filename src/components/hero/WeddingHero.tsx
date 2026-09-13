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
import { useIsMobile, usePrefersReducedMotion } from "@/hooks/useMedia";

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

  useSceneTilt(world, { intensity: 11, depth: 28, enabled: !reduced && !mobile });

  useGSAP(
    () => {
      if (!section.current || reduced || mobile) return;
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: section.current,
          start: "top top",
          end: "bottom top",
          scrub: 0.35,
        },
      });
      if (bg.current) tl.to(bg.current, { y: 56, scale: 1.08, ease: "none" }, 0);
      if (mid.current) tl.to(mid.current, { y: 28, ease: "none" }, 0);
      if (fg.current) tl.to(fg.current, { y: -18, opacity: 0.65, ease: "none" }, 0);
    },
    { scope: section, dependencies: [reduced, mobile] },
  );

  return (
    <section
      ref={section}
      className="scene-3d relative isolate min-h-dvh overflow-hidden bg-[var(--color-burgundy)] text-[var(--color-ivory)]"
    >
      <div ref={world} className="preserve-3d relative min-h-dvh">
        <div ref={bg} className="absolute inset-[-8%] [transform:translateZ(-120px)_scale(1.15)]">
          <WeddingPhoto
            priority
            src={wedding.photos.hero}
            alt={first.fullName + " and " + second.fullName}
            className="h-full w-full opacity-50"
          />
        </div>
        <div className="absolute inset-0 bg-gradient-to-b from-[rgba(42,18,22,0.2)] via-[rgba(42,18,22,0.38)] to-[rgba(42,18,22,0.78)] [transform:translateZ(-50px)]" />

        <div ref={mid} className="preserve-3d absolute inset-0">
          <div className="pointer-events-none absolute left-1/2 top-6 h-[88%] w-[min(92vw,42rem)] -translate-x-1/2 opacity-35 [transform:translateZ(10px)]">
            <BengaliArch className="h-full w-full" />
          </div>
          <div className="pointer-events-none absolute bottom-8 left-1/2 w-[min(90vw,36rem)] -translate-x-1/2 opacity-25 [transform:translateZ(28px)]">
            <BananaLeaf className="h-auto w-full" />
          </div>
          {!mobile ? (
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
          ) : null}
        </div>

        <div
          ref={fg}
          className="relative z-10 flex min-h-dvh flex-col items-center justify-center px-6 py-28 text-center [transform:translateZ(56px)]"
        >
          <p className="font-bn text-sm tracking-[0.35em] text-[var(--color-candle)]">{wedding.copy.shubhoBibaho}</p>
          <h1 className="mt-6 font-serif text-[14vw] leading-[0.85] md:text-[7.5rem]">
            <span className="block">{first.fullName}</span>
            <span className="my-3 block font-serif text-2xl text-[var(--color-gold)] md:text-4xl">&</span>
            <span className="block">{second.fullName}</span>
          </h1>
          <p className="mt-8 font-bn text-lg text-[var(--color-beige)]">
            {first.bengaliName} ও {second.bengaliName}
          </p>
          <p className="mt-8 max-w-md font-serif text-xl italic text-[var(--color-ivory)]/90">
            {language === "bn" ? wedding.hero.kickerBn : wedding.hero.kicker}
          </p>
          <p className="mt-10 font-serif text-sm tracking-[0.32em] uppercase text-[var(--color-gold)]">
            {wedding.date.display} · {wedding.location.city}
          </p>
          <ShankhaPola className="mx-auto mt-8 h-10 w-24 opacity-80" />
        </div>
      </div>
    </section>
  );
}
