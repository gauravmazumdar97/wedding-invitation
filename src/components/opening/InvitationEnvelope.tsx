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
    <div className="paper-grain relative flex min-h-dvh items-center justify-center overflow-hidden bg-[#8f1d22] px-4 py-16">
      <AlpanaIllustration className="pointer-events-none absolute left-1/2 top-1/2 h-[130vw] w-[130vw] -translate-x-1/2 -translate-y-1/2 opacity-[0.12] md:h-[55vw] md:w-[55vw]" />
      <Kalka className="pointer-events-none absolute left-3 top-6 h-20 w-14 opacity-30 md:left-10" />
      <Kalka className="pointer-events-none absolute right-3 top-6 h-20 w-14 rotate-180 opacity-30 md:right-10" />

      <div className="scene-3d relative w-full max-w-[26rem]">
        <div ref={world} className="preserve-3d">
          <motion.article
            className="relative overflow-hidden bg-[var(--color-paper)] px-6 py-10 shadow-[0_40px_100px_rgba(20,8,10,0.45)] md:px-8 md:py-12"
            style={{ boxShadow: "inset 0 0 0 1px #c4a574, inset 0 0 0 7px #8f1d22, inset 0 0 0 8px #c4a574" }}
            animate={
              opening && !reduced
                ? { rotateY: -88, rotateX: 6, z: 100, scale: 1.04, opacity: 0 }
                : { rotateY: 0, rotateX: 0, z: 0, scale: 1, opacity: 1 }
            }
            transition={{ duration: 0.85, ease: [0.22, 1, 0.36, 1] }}
          >
            <CornerAlpana className="absolute left-3 top-3 h-11 w-11" />
            <CornerAlpana className="absolute right-3 top-3 h-11 w-11 rotate-90" />
            <CornerAlpana className="absolute bottom-3 left-3 h-11 w-11 -rotate-90" />
            <CornerAlpana className="absolute bottom-3 right-3 h-11 w-11 rotate-180" />

            <p className="text-center font-bn text-2xl text-[var(--color-sindoor)]">{wedding.copy.shubhoBibaho}</p>
            <KanthaBorder className="mx-auto mt-4 w-48" />
            <p className="mt-6 text-center font-serif text-[0.65rem] uppercase tracking-[0.42em] text-[var(--color-gold)]">
              {language === "bn" ? wedding.copy.invitationForBn : wedding.copy.invitationFor}
            </p>
            <h1 className="mt-3 text-center font-serif text-4xl leading-tight text-[var(--color-ink)]">
              {guest.guestName}
            </h1>
            <p className="mt-2 text-center font-bn text-lg text-[var(--color-maroon)]">{guest.greetingBn}</p>
            <p className="mx-auto mt-6 max-w-xs text-center font-serif text-lg italic leading-relaxed">
              {language === "bn" ? guest.inviteTextBn : guest.inviteText}
            </p>
            <div className="mt-7 flex justify-center">
              <WeddingMonogram decorative size="sm" />
            </div>
            <p className="mt-5 text-center font-serif text-xl text-[var(--color-sindoor)]">
              {first.fullName}
            </p>
            <p className="text-center font-serif text-sm text-[var(--color-gold)]">&</p>
            <p className="text-center font-serif text-xl text-[var(--color-sindoor)]">{second.fullName}</p>
            <p className="mt-4 text-center font-serif text-xs tracking-[0.22em] text-[var(--color-muted)]">
              {wedding.date.display} · {wedding.location.city}
            </p>
            <ShankhaPola className="mx-auto mt-6 h-8 w-20" />
          </motion.article>
        </div>
      </div>

      <div className="absolute bottom-8 left-0 right-0 z-20 px-6 text-center">
        <MagneticButton
          type="button"
          onClick={open}
          className="min-h-12 border border-[var(--color-candle)] bg-[var(--color-paper)] px-8 py-3 font-serif text-sm tracking-[0.28em] text-[var(--color-sindoor)]"
        >
          {language === "bn" ? wedding.copy.openInvitationBn : wedding.copy.openInvitation}
        </MagneticButton>
      </div>
    </div>
  );
}
