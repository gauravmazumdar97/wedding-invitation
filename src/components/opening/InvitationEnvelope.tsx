"use client";

import { useRef, useState } from "react";
import { motion } from "framer-motion";
import { wedding } from "@/config/wedding";
import { coupleDisplay } from "@/lib/invite";
import { AlpanaIllustration } from "@/components/art/AlpanaIllustration";
import { Kalka, KanthaBorder, ShankhaPola } from "@/components/art/BengaliMotifs";
import { MagneticButton } from "@/components/motion/MagneticButton";
import { useExperience } from "@/components/providers/ExperienceProvider";
import { useSceneTilt } from "@/hooks/useSceneTilt";
import { useNativeScrollExperience, usePrefersReducedMotion } from "@/hooks/useMedia";

export function InvitationEnvelope({ onOpened }: { onOpened: () => void }) {
  const { guest, language, setMusicOn, triggerPetals } = useExperience();
  const [opening, setOpening] = useState(false);
  const world = useRef<HTMLDivElement>(null);
  const reduced = usePrefersReducedMotion();
  const nativeScroll = useNativeScrollExperience();
  const { first, second } = coupleDisplay();

  useSceneTilt(world, {
    intensity: nativeScroll ? 8 : 14,
    depth: nativeScroll ? 18 : 30,
    enabled: !opening && !reduced,
  });

  const open = () => {
    if (opening) return;
    setOpening(true);
    setMusicOn(true);
    triggerPetals();
    window.setTimeout(onOpened, reduced ? 140 : 1680);
  };

  return (
    <div className="paper-grain silk-texture relative flex h-full min-h-dvh flex-col items-center justify-center overflow-hidden px-[var(--page-x)] pb-[max(6.5rem,calc(var(--safe-bottom)+5.25rem))] pt-[max(3rem,calc(var(--safe-top)+1.5rem))]">
      <AlpanaIllustration className="pointer-events-none absolute left-1/2 top-[42%] h-[min(128vw,40rem)] w-[min(128vw,40rem)] -translate-x-1/2 -translate-y-1/2 opacity-[0.16]" />
      <Kalka className="pointer-events-none absolute left-[max(0.75rem,var(--safe-left))] top-[max(1.1rem,calc(var(--safe-top)+0.6rem))] h-16 w-11 opacity-40 sm:h-20 sm:w-14" />
      <Kalka className="pointer-events-none absolute right-[max(0.75rem,var(--safe-right))] top-[max(1.1rem,calc(var(--safe-top)+0.6rem))] h-16 w-11 rotate-180 opacity-40 sm:h-20 sm:w-14" />

      <p className="festival-kicker relative z-10">{wedding.copy.shubhoBibaho}</p>
      <p className="relative z-10 mt-3 max-w-sm text-center font-serif text-lg italic text-[var(--color-navy)] sm:text-xl">
        {language === "bn" ? wedding.copy.invitationForBn : wedding.copy.invitationFor}
      </p>

      <div className="scene-3d relative z-10 mt-8 w-full max-w-[22.5rem] sm:mt-10">
        <motion.div
          className="preserve-3d flex justify-center"
          animate={
            opening && !reduced
              ? { y: -22, scale: 1.05, opacity: 0 }
              : { y: 0, scale: 1, opacity: 1 }
          }
          transition={{ duration: opening ? 0.85 : 0.7, delay: opening ? 0.78 : 0, ease: [0.22, 1, 0.36, 1] }}
        >
          <div className="preserve-3d" style={{ transform: "rotateX(14deg)" }}>
          <div ref={world} className="preserve-3d">
          <button type="button" className="envelope-stage relative" onClick={open} aria-label={wedding.copy.openInvitation}>
            <span className="envelope-glow" aria-hidden />
            <span className="envelope-back" aria-hidden />

            <motion.span
              className="envelope-letter overflow-hidden px-4 py-5 text-center sm:px-5 sm:py-6"
              animate={
                opening && !reduced
                  ? { y: "-54%", z: 46, rotateX: -6, scale: 1.05 }
                  : { y: "12%", z: 12, rotateX: 0, scale: 1 }
              }
              transition={{ duration: 1.05, delay: opening ? 0.22 : 0, ease: [0.22, 1, 0.36, 1] }}
              style={{ transformStyle: "preserve-3d" }}
            >
              <p className="font-sans text-[0.58rem] uppercase tracking-[0.28em] text-[var(--color-coral)]">
                {language === "bn" ? wedding.copy.invitationForBn : wedding.copy.invitationFor}
              </p>
              <p className="mt-2 font-serif text-xl italic text-[var(--color-navy)] sm:text-2xl">{guest.guestName}</p>
              <p className="mt-1 font-bn text-sm text-[var(--color-maroon)]">{guest.greetingBn}</p>
              <KanthaBorder className="mx-auto mt-3 w-32 opacity-80" />
              <p className="festival-title mt-3 text-2xl leading-none sm:text-3xl">
                {first.firstName} <span className="not-italic text-[var(--color-coral)]">&</span> {second.firstName}
              </p>
              <p className="mt-2 font-bn text-sm text-[var(--color-maroon)]">
                {first.bengaliName} ও {second.bengaliName}
              </p>
              <p className="mt-3 font-sans text-[0.58rem] uppercase tracking-[0.2em] text-[var(--color-muted)]">
                {language === "bn" ? wedding.date.displayBn : wedding.date.display}
              </p>
            </motion.span>

            <span className="envelope-pocket" aria-hidden />

            <motion.span
              className="envelope-flap"
              animate={opening && !reduced ? { rotateX: -158 } : { rotateX: 0 }}
              transition={{ duration: 1.12, ease: [0.22, 1, 0.36, 1] }}
              style={{ transformStyle: "preserve-3d" }}
            >
              <span className="envelope-flap-skin" aria-hidden />
              <span className="envelope-flap-lining" aria-hidden />
              <motion.span
                className="envelope-seal font-serif text-sm tracking-[0.12em] text-[var(--color-paper)]"
                animate={opening && !reduced ? { scale: 0.2, y: -18, opacity: 0 } : { scale: 1, y: 0, opacity: 1 }}
                transition={{ duration: 0.42, ease: [0.22, 1, 0.36, 1] }}
              >
                {wedding.couple.monogram.left}
                {wedding.couple.monogram.joiner}
                {wedding.couple.monogram.right}
              </motion.span>
            </motion.span>
          </button>
          </div>
          </div>
        </motion.div>
      </div>

      <ShankhaPola className="relative z-10 mt-8 h-8 w-[4.5rem] opacity-80" />

      <div className="safe-fixed-bc absolute left-0 right-0 z-20 px-[var(--page-x)] text-center">
        <MagneticButton
          type="button"
          onClick={open}
          disabled={opening}
          className="festival-pill px-8 font-serif text-sm tracking-[0.22em]"
        >
          {language === "bn" ? wedding.copy.openInvitationBn : wedding.copy.openInvitation}
        </MagneticButton>
      </div>
    </div>
  );
}
