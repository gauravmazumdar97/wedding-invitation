"use client";

import { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { wedding } from "@/config/wedding";
import { WeddingPhoto } from "@/components/media/WeddingPhoto";
import { useExperience } from "@/components/providers/ExperienceProvider";
import { useNativeScrollExperience, usePrefersReducedMotion } from "@/hooks/useMedia";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export function CinematicGallery() {
  const { language } = useExperience();
  const section = useRef<HTMLElement>(null);
  const row = useRef<HTMLDivElement>(null);
  const reduced = usePrefersReducedMotion();
  const nativeScroll = useNativeScrollExperience();
  const useNativeStrip = reduced || nativeScroll;

  useGSAP(
    () => {
      if (!section.current || !row.current || useNativeStrip) return;
      const distance = row.current.scrollWidth - window.innerWidth;
      if (distance <= 0) return;
      gsap.to(row.current, {
        x: -distance,
        ease: "none",
        scrollTrigger: {
          trigger: section.current,
          start: "top top",
          end: () => `+=${distance}`,
          pin: true,
          scrub: 0.35,
          anticipatePin: 1,
        },
      });
    },
    { scope: section, dependencies: [useNativeStrip] },
  );

  return (
    <section ref={section} className="relative overflow-hidden bg-[var(--color-ivory)]">
      <p className="px-[var(--page-x)] pt-8 text-center font-serif text-sm tracking-[0.28em] text-[var(--color-muted)] sm:pt-10">
        {language === "bn"
          ? "স্মৃতির ফিতা"
          : useNativeStrip
            ? "Swipe through the film."
            : "Keep scrolling. The film moves sideways."}
      </p>
      <div
        ref={row}
        className={
          useNativeStrip
            ? "touch-scroll-x hidden-scrollbar flex gap-4 px-[var(--page-x)] py-8 sm:gap-5 sm:py-10"
            : "flex w-max gap-6 px-10 py-12 will-change-transform"
        }
      >
        {wedding.photos.preWedding.map((src) => (
          <WeddingPhoto
            key={src}
            framed
            src={src}
            alt="A quieter day"
            className="h-[68vw] w-[78vw] max-h-[28rem] shrink-0 snap-center sm:h-[58vw] sm:w-[70vw] md:h-[70vh] md:w-[28rem] md:max-h-none"
            sizes="(max-width: 767px) 78vw, (max-width: 1023px) 70vw, 448px"
          />
        ))}
      </div>
    </section>
  );
}
