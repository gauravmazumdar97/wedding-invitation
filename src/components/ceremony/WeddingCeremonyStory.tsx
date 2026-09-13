"use client";

import { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { wedding } from "@/config/wedding";
import { coupleDisplay } from "@/lib/invite";
import { useNativeScrollExperience, usePrefersReducedMotion } from "@/hooks/useMedia";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

const beats = [
  { title: "Dhaak", titleBn: "ঢাক", kind: "dhaak" as const },
  { title: "Bor Jatri", titleBn: "বর যাত্রী", kind: "approach" as const },
  { title: "Mala Badal", titleBn: "মালা বদল", kind: "garland" as const },
  { title: "Saat Paak", titleBn: "সাত পাক", kind: "circles" as const },
  { title: "Subho Drishti", titleBn: "শুভ দৃষ্টি", kind: "reveal" as const },
  { title: "Sindoor Daan", titleBn: "সিঁদুর দান", kind: "sindoor" as const },
];

export function WeddingCeremonyStory() {
  const { first, second } = coupleDisplay();
  const root = useRef<HTMLElement>(null);
  const reduced = usePrefersReducedMotion();
  const nativeScroll = useNativeScrollExperience();
  const stacked = reduced || nativeScroll;
  const scenes = [...beats, { title: "Together", titleBn: wedding.copy.shubhoBibaho, kind: "together" as const }];

  useGSAP(
    () => {
      if (!root.current || stacked) return;
      const slides = gsap.utils.toArray<HTMLElement>("[data-rite]");
      gsap.set(slides, { autoAlpha: 0 });
      gsap.set(slides[0], { autoAlpha: 1 });
      const timeline = gsap.timeline({
        scrollTrigger: {
          trigger: root.current,
          start: "top top",
          end: () => `+=${scenes.length * 80}%`,
          pin: true,
          scrub: 0.4,
          anticipatePin: 1,
        },
      });
      slides.forEach((slide, index) => {
        if (index === 0) return;
        timeline.to(slides[index - 1], { autoAlpha: 0, duration: 1 }, index);
        timeline.fromTo(slide, { autoAlpha: 0, scale: 0.97 }, { autoAlpha: 1, scale: 1, duration: 1 }, index);
      });
    },
    { scope: root, dependencies: [stacked, scenes.length] },
  );

  return (
    <section ref={root} className="relative bg-[var(--color-burgundy)] text-[var(--color-ivory)] section-cv">
      <div className={stacked ? "space-y-0" : "relative h-dvh overflow-hidden"}>
        {scenes.map((beat) => {
          const sindoor = beat.kind === "sindoor" || beat.kind === "together" || beat.kind === "reveal";
          return (
            <div
              key={beat.title}
              data-rite
              className={
                stacked
                  ? "flex min-h-[72dvh] flex-col items-center justify-center px-[var(--page-x)] py-16 text-center sm:min-h-[78dvh] sm:py-20"
                  : "absolute inset-0 flex flex-col items-center justify-center px-6 text-center"
              }
              style={{
                background: sindoor
                  ? "radial-gradient(circle at center, #8f1d22 0%, #3f151c 72%)"
                  : "radial-gradient(circle at center, #4a1c24 0%, #1c1214 75%)",
              }}
            >
              {beat.kind === "together" ? (
                <>
                  <p className="font-serif text-sm tracking-[0.35em] uppercase text-[var(--color-candle)]">Together</p>
                  <p className="mt-5 font-serif text-[2.5rem] leading-tight sm:mt-6 sm:text-5xl md:text-7xl">
                    {first.fullName} & {second.fullName}
                  </p>
                  <p className="mt-4 font-bn text-xl sm:text-2xl">{wedding.copy.shubhoBibaho}</p>
                </>
              ) : (
                <>
                  <p className="font-bn text-xl text-[var(--color-candle)] sm:text-2xl">{beat.titleBn}</p>
                  <h3 className="mt-2 font-serif text-[2.5rem] leading-tight sm:mt-3 sm:text-5xl md:text-7xl">
                    {beat.title}
                  </h3>
                </>
              )}
            </div>
          );
        })}
      </div>
    </section>
  );
}
