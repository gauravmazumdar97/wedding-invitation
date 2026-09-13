"use client";

import { wedding } from "@/config/wedding";
import { DepthStage } from "@/components/motion/DepthStage";
import { useExperience } from "@/components/providers/ExperienceProvider";

export function ClosingQuote() {
  const { language } = useExperience();
  return (
    <section className="section-pad">
      <DepthStage>
        <blockquote className="mx-auto max-w-2xl px-1 text-center font-serif text-[clamp(1.4rem,5.6vw,1.85rem)] italic leading-snug text-[var(--color-navy)] sm:text-4xl">
          "{language === "bn" ? wedding.quote.textBn : wedding.quote.text}"
        </blockquote>
      </DepthStage>
    </section>
  );
}
