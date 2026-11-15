"use client";

import { motion } from "framer-motion";
import { venueById, wedding } from "@/config/wedding";
import { coupleDisplay } from "@/lib/invite";
import { Marigold, Mukut, ShankhaPola, Topor, WeddingMala } from "@/components/art/BengaliMotifs";
import { WeddingPhoto } from "@/components/media/WeddingPhoto";
import { DepthStage } from "@/components/motion/DepthStage";
import { useExperience } from "@/components/providers/ExperienceProvider";
import { usePrefersReducedMotion } from "@/hooks/useMedia";

export function ClosingInvite() {
  const { language } = useExperience();
  const { first, second } = coupleDisplay();
  const bn = language === "bn";
  const reduced = usePrefersReducedMotion();
  const weddingEvent = wedding.events.find((event) => event.id === "wedding");
  const receptionEvent = wedding.events.find((event) => event.id === "reception");
  const weddingVenue = weddingEvent ? venueById(weddingEvent.venueId) : undefined;
  const receptionVenue = receptionEvent ? venueById(receptionEvent.venueId) : undefined;

  return (
    <section className="closing-invite relative overflow-hidden section-pad pb-[calc(var(--section-y)+2.5rem)]">
      <div className="closing-invite-glow pointer-events-none absolute inset-0" aria-hidden />
      <Marigold className="pointer-events-none absolute left-[max(0.5rem,var(--safe-left))] top-10 h-10 w-10 opacity-50 sm:left-6 sm:h-14 sm:w-14" />
      <Marigold className="pointer-events-none absolute right-[max(0.5rem,var(--safe-right))] top-16 h-10 w-10 opacity-50 sm:right-6 sm:h-14 sm:w-14" />

      <DepthStage>
        <div className="relative mx-auto max-w-2xl text-center">
          <motion.p
            className="festival-kicker"
            initial={reduced ? false : { opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.5 }}
            transition={{ duration: 0.55 }}
          >
            {bn ? wedding.finale.kickerBn : wedding.finale.kicker}
          </motion.p>

          <motion.div
            className="relative mx-auto mt-7 h-36 w-36 overflow-hidden rounded-full border border-[var(--color-gold)]/55 shadow-[0_0_0_6px_rgba(201,164,78,0.12)] sm:mt-9 sm:h-44 sm:w-44"
            initial={reduced ? false : { opacity: 0, scale: 0.92 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, amount: 0.4 }}
            transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
          >
            <WeddingPhoto
              src={wedding.photos.couplePortrait}
              alt={`${first.fullName} and ${second.fullName}`}
              className="h-full w-full"
              sizes="176px"
            />
          </motion.div>

          <div className="mt-5 flex items-end justify-center gap-3 opacity-90">
            <Topor className="h-10 w-8" />
            <WeddingMala className="mb-1 h-8 w-14" />
            <Mukut className="h-9 w-12" />
          </div>

          <motion.h2
            className="festival-title mt-5 text-[clamp(2.2rem,9vw,3.4rem)] leading-[0.95] text-[var(--color-navy)]"
            initial={reduced ? false : { opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.5 }}
            transition={{ duration: 0.6, delay: 0.05 }}
          >
            {bn ? wedding.finale.titleBn : wedding.finale.title}
          </motion.h2>
          {!bn ? (
            <p className="mt-2 font-bn text-lg text-[var(--color-maroon)] sm:text-xl">{wedding.finale.titleBn}</p>
          ) : null}

          <p className="mx-auto mt-6 max-w-xl font-serif text-[clamp(1.15rem,4.4vw,1.55rem)] italic leading-relaxed text-[var(--color-navy)]/90">
            {bn ? wedding.finale.textBn : wedding.finale.text}
          </p>

          <div className="mx-auto mt-9 h-px w-24 bg-[var(--color-gold)]/55" aria-hidden />

          <div className="mx-auto mt-8 grid max-w-lg gap-6 sm:grid-cols-2 sm:gap-8">
            {weddingEvent ? (
              <div>
                <p className="font-sans text-[0.62rem] uppercase tracking-[0.24em] text-[var(--color-coral)]">
                  {bn ? weddingEvent.nameBn : weddingEvent.name}
                </p>
                <p className="mt-2 font-serif text-xl italic text-[var(--color-navy)] sm:text-2xl">
                  {weddingEvent.date}
                </p>
                <p className="mt-1 font-serif text-sm italic text-[var(--color-muted)]">
                  {weddingVenue?.name}
                </p>
                <p className="mt-1 font-sans text-[0.62rem] uppercase tracking-[0.2em] text-[var(--color-navy)]/70">
                  {bn ? "কলকাতা" : "Kolkata"}
                </p>
              </div>
            ) : null}
            {receptionEvent ? (
              <div>
                <p className="font-sans text-[0.62rem] uppercase tracking-[0.24em] text-[var(--color-coral)]">
                  {bn ? receptionEvent.nameBn : receptionEvent.name}
                </p>
                <p className="mt-2 font-serif text-xl italic text-[var(--color-navy)] sm:text-2xl">
                  {receptionEvent.date}
                </p>
                <p className="mt-1 font-serif text-sm italic text-[var(--color-muted)]">
                  {receptionVenue?.name}
                </p>
                <p className="mt-1 font-sans text-[0.62rem] uppercase tracking-[0.2em] text-[var(--color-navy)]/70">
                  {bn ? "দিল্লি" : "Delhi"}
                </p>
              </div>
            ) : null}
          </div>

          <ShankhaPola className="mx-auto mt-8 h-8 w-[4.5rem] opacity-80" />

          <p className="mt-8 whitespace-pre-line font-serif text-base italic leading-relaxed text-[var(--color-muted)] sm:text-lg">
            {bn ? wedding.finale.signOffBn : wedding.finale.signOff}
          </p>
          <p className="festival-kicker mt-10">{bn ? wedding.finale.lineBn : wedding.finale.line}</p>
        </div>
      </DepthStage>
    </section>
  );
}
