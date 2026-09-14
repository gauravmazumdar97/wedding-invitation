"use client";

import { motion } from "framer-motion";
import { wedding } from "@/config/wedding";
import { AlpanaIllustration } from "@/components/art/AlpanaIllustration";
import { useExperience } from "@/components/providers/ExperienceProvider";
import { usePrefersReducedMotion } from "@/hooks/useMedia";

export function InvitationLoader() {
  const { language } = useExperience();
  const { left, right, joiner } = wedding.couple.monogram;
  const reduced = usePrefersReducedMotion();

  return (
    <div className="paper-grain silk-texture relative grid h-full min-h-dvh place-items-center overflow-hidden">
      <div className="scene-3d relative grid place-items-center">
        <motion.div
          className="preserve-3d"
          animate={reduced ? undefined : { rotateY: 360 }}
          transition={reduced ? undefined : { duration: 22, repeat: Infinity, ease: "linear" }}
        >
          <AlpanaIllustration className="h-56 w-56 opacity-80 sm:h-72 sm:w-72" />
        </motion.div>
        <div className="absolute inset-0 grid place-items-center">
          <p className="festival-title text-3xl tracking-[0.2em] text-[var(--color-coral)] sm:text-4xl">
            {left} <span className="not-italic text-[var(--color-gold)]">{joiner}</span> {right}
          </p>
        </div>
      </div>
      <p className="absolute bottom-[calc(1.75rem+var(--safe-bottom))] font-bn text-sm tracking-[0.18em] text-[var(--color-maroon)]">
        {language === "bn" ? wedding.copy.preparingBn : wedding.copy.preparing}
      </p>
    </div>
  );
}
