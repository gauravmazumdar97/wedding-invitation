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

export function OurStory() {
  const { language } = useExperience();
  const root = useRef<HTMLElement>(null);
  const reduced = usePrefersReducedMotion();
  const nativeScroll = useNativeScrollExperience();
  const chapters = wedding.story;
  const stacked = reduced || nativeScroll;

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
      <div className={stacked ? "space-y-14 px-[var(--page-x)] py-[var(--section-y-lg)] sm:space-y-16" : "relative h-dvh overflow-hidden"}>
        {stacked ? (
          <div className="mx-auto max-w-6xl text-center md:text-left">
            <p className="font-bn text-sm tracking-[0.28em] text-[var(--color-sindoor)]">{wedding.storyIntro.titleBn}</p>
            <h2 className="mt-2 font-serif text-[2.35rem] text-[var(--color-sindoor)] sm:text-4xl">
              {language === "bn" ? wedding.storyIntro.titleBn : wedding.storyIntro.title}
            </h2>
          </div>
        ) : null}
        {chapters.map((chapter, index) => (
          <article
            key={chapter.id}
            data-slide
            className={
              stacked
                ? "mx-auto grid max-w-6xl gap-7 md:grid-cols-2 md:gap-10 md:items-center"
                : "absolute inset-0 grid items-center gap-8 px-6 py-20 md:grid-cols-2 md:px-16"
            }
          >
            {index === 0 && !stacked ? (
              <p className="absolute left-6 top-8 font-bn text-sm tracking-[0.28em] text-[var(--color-sindoor)] md:left-16">
                {wedding.storyIntro.titleBn}
              </p>
            ) : null}
            <WeddingPhoto
              framed
              src={chapter.photo}
              alt={chapter.photoAlt}
              className="mx-auto aspect-[4/5] w-full max-w-md"
              sizes="(max-width: 767px) 88vw, (max-width: 1023px) 42vw, 448px"
            />
            <div className={stacked ? "text-center md:text-left" : undefined}>
              <p className="font-serif text-sm tracking-[0.3em] text-[var(--color-gold)]">{chapter.year}</p>
              <h3 className="mt-3 font-serif text-[2.15rem] leading-tight text-[var(--color-sindoor)] sm:text-4xl md:text-6xl">
                {language === "bn" ? chapter.titleBn : chapter.title}
              </h3>
              <p className="mt-2 font-bn text-lg text-[var(--color-maroon)] sm:text-xl">
                {language === "bn" ? chapter.title : chapter.titleBn}
              </p>
              <p className="mx-auto mt-5 max-w-md font-serif text-lg leading-relaxed italic sm:mt-6 sm:text-xl md:mx-0">
                {language === "bn" ? chapter.textBn : chapter.text}
              </p>
              <p className="mt-6 font-serif text-xs tracking-[0.25em] text-[var(--color-muted)] sm:mt-8">
                {index + 1} / {chapters.length}
              </p>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
