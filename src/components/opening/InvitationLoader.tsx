"use client";

import { wedding } from "@/config/wedding";
import { AlpanaIllustration } from "@/components/art/AlpanaIllustration";
import { useExperience } from "@/components/providers/ExperienceProvider";

export function InvitationLoader() {
  const { language } = useExperience();
  const { left, right, joiner } = wedding.couple.monogram;

  return (
    <div className="paper-grain silk-texture fixed inset-0 z-[80] grid place-items-center" aria-hidden>
      <div className="relative grid place-items-center">
        <AlpanaIllustration className="h-64 w-64 text-[var(--color-sindoor)] opacity-80 md:h-80 md:w-80" />
        <div className="absolute inset-0 grid place-items-center">
          <p className="font-serif text-3xl tracking-[0.28em] text-[var(--color-sindoor)] md:text-4xl">
            {left} <span className="text-[var(--color-gold)]">{joiner}</span> {right}
          </p>
        </div>
      </div>
      <p className="absolute bottom-16 font-bn text-sm tracking-[0.18em] text-[var(--color-muted)]">
        {language === "bn" ? wedding.copy.preparingBn : wedding.copy.preparing}
      </p>
    </div>
  );
}
