"use client";

import { wedding } from "@/config/wedding";
import { DepthStage } from "@/components/motion/DepthStage";
import { TiltCard } from "@/components/motion/TiltCard";
import { useExperience } from "@/components/providers/ExperienceProvider";

export function ClosingQuote() {
  const { language } = useExperience();
  return (
    <section className="section-pad">
      <DepthStage>
        <TiltCard max={8} pressFeedback>
          <blockquote className="festival-card mx-auto max-w-2xl px-5 py-10 text-center sm:px-10 sm:py-14">
            <p className="festival-kicker">{wedding.copy.shubhoBibaho}</p>
            <p className="mt-5 font-serif text-[clamp(1.4rem,5.6vw,1.85rem)] italic leading-snug text-[var(--color-navy)] sm:text-4xl">
              {`"${language === "bn" ? wedding.quote.textBn : wedding.quote.text}"`}
            </p>
          </blockquote>
        </TiltCard>
      </DepthStage>
    </section>
  );
}
