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

export function OurStory() {
  const { language } = useExperience();
  const root = useRef<HTMLElement>(null);
  const reduced = usePrefersReducedMotion();
  const mobile = useIsMobile();
  const chapters = wedding.story;
  const stacked = reduced || mobile;

  useGSAP(
    () => {
      if (!root.current || stacked) return;
      const slides = gsap.utils.toArray<HTMLElement>("[data-slide]");
      gsap.set(slides, { autoAlpha: 0 });
      gsap.set(slides[0], { autoAlpha: 1 });

      const timeline = gsap.timeline({
        scrollTrigger: {
          trigger: root.current,
          start: "top top",
          end: () => `+=${Math.max(1, chapters.length) * 90}%`,
          pin: true,
          scrub: 0.4,
          anticipatePin: 1,
        },
      });

      slides.forEach((slide, index) => {
        if (index === 0) return;
        timeline.to(slides[index - 1], { autoAlpha: 0, duration: 1 }, index);
        timeline.fromTo(slide, { autoAlpha: 0, y: 24 }, { autoAlpha: 1, y: 0, duration: 1 }, index);
      });
    },
    { scope: root, dependencies: [stacked, chapters.length] },
  );

  return (
    <section id="story" ref={root} className="relative bg-[var(--color-paper)] section-cv">
      <div className={stacked ? "space-y-16 px-6 py-20" : "relative h-dvh overflow-hidden"}>
        {chapters.map((chapter, index) => (
          <article
            key={chapter.id}
            data-slide
            className={stacked ? "mx-auto grid max-w-6xl gap-8 md:grid-cols-2" : "absolute inset-0 grid items-center gap-8 px-6 py-20 md:grid-cols-2 md:px-16"}
          >
            {index === 0 && !stacked ? (
              <p className="absolute left-6 top-8 font-bn text-sm tracking-[0.28em] text-[var(--color-sindoor)] md:left-16">
                {wedding.storyIntro.titleBn}
              </p>
            ) : null}
            <WeddingPhoto framed src={chapter.photo} alt={chapter.photoAlt} className="mx-auto aspect-[4/5] w-full max-w-md" />
            <div>
              <p className="font-serif text-sm tracking-[0.3em] text-[var(--color-gold)]">{chapter.year}</p>
              <h3 className="mt-3 font-serif text-4xl text-[var(--color-sindoor)] md:text-6xl">
                {language === "bn" ? chapter.titleBn : chapter.title}
              </h3>
              <p className="mt-2 font-bn text-xl text-[var(--color-maroon)]">
                {language === "bn" ? chapter.title : chapter.titleBn}
              </p>
              <p className="mt-6 max-w-md font-serif text-xl leading-relaxed italic">
                {language === "bn" ? chapter.textBn : chapter.text}
              </p>
              <p className="mt-8 font-serif text-xs tracking-[0.25em] text-[var(--color-muted)]">
                {index + 1} / {chapters.length}
              </p>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
