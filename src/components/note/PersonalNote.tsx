"use client";

import { wedding } from "@/config/wedding";
import { coupleDisplay } from "@/lib/invite";
import { DepthStage } from "@/components/motion/DepthStage";
import { TiltCard } from "@/components/motion/TiltCard";
import { useExperience } from "@/components/providers/ExperienceProvider";

export function PersonalNote() {
  const { guest, language } = useExperience();
  const { first, second } = coupleDisplay();
  const video = wedding.personalNote.video?.trim();

  return (
    <section className="section-pad">
      <DepthStage>
        <TiltCard max={9} pressFeedback>
      <div className="festival-card mx-auto max-w-2xl px-5 py-10 text-center sm:px-10 sm:py-14">
        <p className="festival-kicker">A personal message</p>
        <h2 className="festival-title mt-4 text-[clamp(1.7rem,7vw,2.15rem)] leading-[1.15] sm:text-4xl">
          A Personal Message
          <span className="mt-1 block">From The Couple</span>
        </h2>
        <p className="mt-8 font-serif text-xl italic text-[var(--color-navy)] sm:text-2xl">
          Dear {guest.guestName || "Family and Friends"},
        </p>
        <p className="mx-auto mt-5 max-w-lg font-serif text-lg leading-relaxed text-[var(--color-navy)]/80 sm:text-xl">
          {language === "bn" ? wedding.personalNote.textBn : wedding.personalNote.text}
        </p>
        <p className="mt-6 font-serif text-lg italic text-[var(--color-navy)]">
          We look forward to celebrating with you.
        </p>
        {video ? (
          <a href={video} target="_blank" rel="noreferrer" className="festival-pill app-press mt-8 px-8">
            Watch our invitation
          </a>
        ) : null}
        <p className="festival-title mt-10 text-3xl sm:text-4xl">
          {first.firstName} <span className="not-italic text-[var(--color-coral)]">&</span> {second.firstName}
        </p>
        <p className="mt-3 font-sans text-[0.65rem] uppercase tracking-[0.2em] text-[var(--color-muted)] sm:tracking-[0.28em]">
          Recorded with love
        </p>
      </div>
        </TiltCard>
      </DepthStage>
    </section>
  );
}
