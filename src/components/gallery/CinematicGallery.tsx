"use client";

import { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { wedding } from "@/config/wedding";
import { WeddingPhoto } from "@/components/media/WeddingPhoto";
import { useExperience } from "@/components/providers/ExperienceProvider";
import { useIsMobile, usePrefersReducedMotion } from "@/hooks/useMedia";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export function CinematicGallery() {
  const { language } = useExperience();
  const section = useRef<HTMLElement>(null);
  const row = useRef<HTMLDivElement>(null);
  const reduced = usePrefersReducedMotion();
  const mobile = useIsMobile();

  useGSAP(
    () => {
      if (!section.current || !row.current || reduced || mobile) return;
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
    { scope: section, dependencies: [reduced, mobile] },
  );

  return (
    <section ref={section} className="relative overflow-hidden bg-[var(--color-ivory)]">
      <p className="px-6 pt-10 text-center font-serif text-sm tracking-[0.28em] text-[var(--color-muted)]">
        {language === "bn" ? "স্মৃতির ফিতা" : "Keep scrolling. The film moves sideways."}
      </p>
      <div
        ref={row}
        className={
          mobile || reduced
            ? "hidden-scrollbar flex gap-5 overflow-x-auto px-6 py-10"
            : "flex w-max gap-6 px-10 py-12 will-change-transform"
        }
      >
        {wedding.photos.preWedding.map((src) => (
          <WeddingPhoto
            key={src}
            framed
            src={src}
            alt="A quieter day"
            className="h-[70vw] w-[78vw] shrink-0 md:h-[70vh] md:w-[28rem]"
          />
        ))}
      </div>
    </section>
  );
}
