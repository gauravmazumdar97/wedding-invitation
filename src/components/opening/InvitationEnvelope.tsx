"use client";

import { useRef, useState } from "react";
import { motion } from "framer-motion";
import { wedding } from "@/config/wedding";
import { coupleDisplay } from "@/lib/invite";
import { AlpanaIllustration } from "@/components/art/AlpanaIllustration";
import { CornerAlpana } from "@/components/art/Ornaments";
import { Kalka, KanthaBorder, ShankhaPola } from "@/components/art/BengaliMotifs";
import { WeddingMonogram } from "@/components/art/WeddingMonogram";
import { MagneticButton } from "@/components/motion/MagneticButton";
import { useExperience } from "@/components/providers/ExperienceProvider";
import { useSceneTilt } from "@/hooks/useSceneTilt";
import { usePrefersReducedMotion } from "@/hooks/useMedia";

export function InvitationEnvelope({ onOpened }: { onOpened: () => void }) {
  const { guest, language, setMusicOn, triggerPetals } = useExperience();
  const [opening, setOpening] = useState(false);
  const world = useRef<HTMLDivElement>(null);
  const reduced = usePrefersReducedMotion();
  const { first, second } = coupleDisplay();

  useSceneTilt(world, { intensity: 14, depth: 28, enabled: !opening && !reduced });

  const open = () => {
    if (opening) return;
    setOpening(true);
    setMusicOn(true);
    triggerPetals();
    window.setTimeout(onOpened, reduced ? 120 : 900);
  };

  return (
    <div className="paper-grain relative flex min-h-dvh items-center justify-center overflow-hidden bg-[#8f1d22] px-[var(--page-x)] pb-[max(6.5rem,calc(var(--safe-bottom)+5.5rem))] pt-[max(3rem,calc(var(--safe-top)+1.5rem))]">
      <AlpanaIllustration className="pointer-events-none absolute left-1/2 top-1/2 h-[min(130vw,42rem)] w-[min(130vw,42rem)] -translate-x-1/2 -translate-y-1/2 opacity-[0.12] md:h-[55vw] md:w-[55vw]" />
      <Kalka className="pointer-events-none absolute left-[max(0.75rem,var(--safe-left))] top-[max(1.25rem,calc(var(--safe-top)+0.75rem))] h-16 w-11 opacity-30 sm:h-20 sm:w-14 md:left-10" />
      <Kalka className="pointer-events-none absolute right-[max(0.75rem,var(--safe-right))] top-[max(1.25rem,calc(var(--safe-top)+0.75rem))] h-16 w-11 rotate-180 opacity-30 sm:h-20 sm:w-14 md:right-10" />

      <div className="scene-3d relative w-full max-w-[26rem]">
        <div ref={world} className="preserve-3d">
          <motion.article
            className="relative overflow-hidden bg-[var(--color-paper)] px-5 py-9 shadow-[0_40px_100px_rgba(20,8,10,0.45)] sm:px-6 sm:py-10 md:px-8 md:py-12"
            style={{ boxShadow: "inset 0 0 0 1px #c4a574, inset 0 0 0 7px #8f1d22, inset 0 0 0 8px #c4a574" }}
            animate={
              opening && !reduced
                ? { rotateY: -88, rotateX: 6, z: 100, scale: 1.04, opacity: 0 }
                : { rotateY: 0, rotateX: 0, z: 0, scale: 1, opacity: 1 }
            }
            transition={{ duration: 0.85, ease: [0.22, 1, 0.36, 1] }}
          >
            <CornerAlpana className="absolute left-3 top-3 h-10 w-10 sm:h-11 sm:w-11" />
            <CornerAlpana className="absolute right-3 top-3 h-10 w-10 rotate-90 sm:h-11 sm:w-11" />
            <CornerAlpana className="absolute bottom-3 left-3 h-10 w-10 -rotate-90 sm:h-11 sm:w-11" />
            <CornerAlpana className="absolute bottom-3 right-3 h-10 w-10 rotate-180 sm:h-11 sm:w-11" />

            <p className="text-center font-bn text-xl text-[var(--color-sindoor)] sm:text-2xl">{wedding.copy.shubhoBibaho}</p>
            <KanthaBorder className="mx-auto mt-4 w-44 sm:w-48" />
            <p className="mt-5 text-center font-serif text-[0.65rem] uppercase tracking-[0.36em] text-[var(--color-gold)] sm:mt-6 sm:tracking-[0.42em]">
              {language === "bn" ? wedding.copy.invitationForBn : wedding.copy.invitationFor}
            </p>
            <h1 className="mt-3 text-center font-serif text-[2rem] leading-tight text-[var(--color-ink)] sm:text-4xl">
              {guest.guestName}
            </h1>
            <p className="mt-2 text-center font-bn text-base text-[var(--color-maroon)] sm:text-lg">{guest.greetingBn}</p>
            <p className="mx-auto mt-5 max-w-xs text-center font-serif text-base italic leading-relaxed sm:mt-6 sm:text-lg">
              {language === "bn" ? guest.inviteTextBn : guest.inviteText}
            </p>
            <div className="mt-6 flex justify-center sm:mt-7">
              <WeddingMonogram decorative size="sm" />
            </div>
            <p className="mt-4 text-center font-serif text-lg text-[var(--color-sindoor)] sm:mt-5 sm:text-xl">
              {first.fullName}
            </p>
            <p className="text-center font-serif text-sm text-[var(--color-gold)]">&</p>
            <p className="text-center font-serif text-lg text-[var(--color-sindoor)] sm:text-xl">{second.fullName}</p>
            <p className="mt-3 text-center font-serif text-xs tracking-[0.22em] text-[var(--color-muted)] sm:mt-4">
              {wedding.date.display} · {wedding.location.city}
            </p>
            <ShankhaPola className="mx-auto mt-5 h-7 w-16 sm:mt-6 sm:h-8 sm:w-20" />
          </motion.article>
        </div>
      </div>

      <div className="safe-fixed-bc absolute left-0 right-0 z-20 px-[var(--page-x)] text-center">
        <MagneticButton
          type="button"
          onClick={open}
          className="min-h-[var(--touch-min)] border border-[var(--color-candle)] bg-[var(--color-paper)] px-8 py-3 font-serif text-sm tracking-[0.28em] text-[var(--color-sindoor)]"
        >
          {language === "bn" ? wedding.copy.openInvitationBn : wedding.copy.openInvitation}
        </MagneticButton>
      </div>
    </div>
  );
}
