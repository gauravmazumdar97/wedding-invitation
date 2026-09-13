"use client";

import { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { Dhaak } from "@/components/art/Ornaments";
import {
  Dhunuchi,
  Mukut,
  ShankhaPola,
  SindoorPot,
  Topor,
  WeddingMala,
} from "@/components/art/BengaliMotifs";
import { useExperience } from "@/components/providers/ExperienceProvider";
import { useIsMobile, usePrefersReducedMotion } from "@/hooks/useMedia";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

const signs = [
  {
    title: "Shankha & Pola",
    titleBn: "শাঁখা ও পলা",
    text: "White conch and red coral bangles. The married signs of a Bengali bride.",
    art: <ShankhaPola className="h-16 w-32" />,
  },
  {
    title: "Topor",
    titleBn: "টোপর",
    text: "The groom's shola headgear. Worn only for the wedding hour.",
    art: <Topor className="h-24 w-20" />,
  },
  {
    title: "Mukut",
    titleBn: "মুকুট",
    text: "The bride's crown of shola pith, above the veil until subho drishti.",
    art: <Mukut className="h-16 w-28" />,
  },
  {
    title: "Dhunuchi",
    titleBn: "ধুনুচি",
    text: "Incense in a clay censer, swung to the dhaak on the wedding night.",
    art: <Dhunuchi className="h-24 w-16" />,
  },
  {
    title: "Sindoor",
    titleBn: "সিঁদুর",
    text: "Vermilion in the parting of the hair. The rite that names the marriage.",
    art: <SindoorPot className="h-20 w-16" />,
  },
  {
    title: "Mala Badal",
    titleBn: "মালাবদল",
    text: "Garlands of rajanigandha and marigold, exchanged before the fire.",
    art: <WeddingMala className="h-20 w-28" />,
  },
];

export function BengaliHeritage() {
  const { language } = useExperience();
  const root = useRef<HTMLElement>(null);
  const reduced = usePrefersReducedMotion();
  const mobile = useIsMobile();
  const stacked = reduced || mobile;

  useGSAP(
    () => {
      if (!root.current || stacked) return;
      const slides = gsap.utils.toArray<HTMLElement>("[data-sign]");
      gsap.set(slides, { autoAlpha: 0 });
      gsap.set(slides[0], { autoAlpha: 1 });
      const timeline = gsap.timeline({
        scrollTrigger: {
          trigger: root.current,
          start: "top top",
          end: () => `+=${signs.length * 75}%`,
          pin: true,
          scrub: 0.4,
          anticipatePin: 1,
        },
      });
      slides.forEach((slide, index) => {
        if (index === 0) return;
        timeline.to(slides[index - 1], { autoAlpha: 0, duration: 1 }, index);
        timeline.fromTo(slide, { autoAlpha: 0, y: 18 }, { autoAlpha: 1, y: 0, duration: 1 }, index);
      });
    },
    { scope: root, dependencies: [stacked] },
  );

  return (
    <section ref={root} className="relative bg-[var(--color-burgundy)] text-[var(--color-ivory)] section-cv">
      <div className={stacked ? "space-y-16 px-6 py-20" : "relative h-dvh overflow-hidden"}>
        {signs.map((sign, index) => (
          <article
            key={sign.title}
            data-sign
            className={stacked ? "mx-auto max-w-xl text-center" : "absolute inset-0 flex flex-col items-center justify-center px-6 text-center"}
          >
            {index === 0 && !reduced ? (
              <p className="absolute left-6 top-10 font-bn text-sm tracking-[0.3em] text-[var(--color-candle)] md:left-12">
                বাংলা বিবাহের চিহ্ন
              </p>
            ) : null}
            <div className="mb-8">{sign.art}</div>
            <p className="font-bn text-2xl text-[var(--color-candle)]">{sign.titleBn}</p>
            <h3 className="mt-2 font-serif text-4xl md:text-6xl">{sign.title}</h3>
            <p className="mx-auto mt-5 max-w-md font-serif text-xl italic leading-relaxed text-[var(--color-beige)]">
              {language === "bn" ? sign.text : sign.text}
            </p>
            {index === signs.length - 1 ? <Dhaak className="mt-10 h-10 w-16 opacity-60" /> : null}
          </article>
        ))}
      </div>
    </section>
  );
}
