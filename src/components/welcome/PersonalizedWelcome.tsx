"use client";

import { wedding, eventsForGuest } from "@/config/wedding";
import { KanthaBorder, ShankhaPola } from "@/components/art/BengaliMotifs";
import { DepthStage } from "@/components/motion/DepthStage";
import { TiltCard } from "@/components/motion/TiltCard";
import { useExperience } from "@/components/providers/ExperienceProvider";

export function PersonalizedWelcome() {
  const { guest, language } = useExperience();
  const invited = eventsForGuest(guest.events);

  return (
    <section className="section-cv section-pad-lg silk-texture">
      <DepthStage className="mx-auto max-w-2xl">
        <TiltCard max={9} pressFeedback>
          <article className="bg-[var(--color-paper)] text-center" style={{ boxShadow: "inset 0 0 0 1px rgba(196,165,116,0.45)" }}>
            <div className="px-5 py-12 sm:px-6 sm:py-14 md:px-12">
              <ShankhaPola className="mx-auto mb-5 h-9 w-20 sm:mb-6 sm:h-10 sm:w-24" />
              <p className="font-bn text-xl text-[var(--color-sindoor)] sm:text-2xl">{guest.greetingBn}</p>
              <h2 className="mt-3 font-serif text-[2.15rem] leading-tight sm:mt-4 sm:text-4xl md:text-6xl">
                Dear {guest.guestName}
              </h2>
              <p className="mt-6 font-serif text-xl italic leading-relaxed sm:mt-8 sm:text-2xl">
                {language === "bn" ? guest.inviteTextBn : guest.inviteText}
              </p>
              <p className="mt-5 font-bn text-base text-[var(--color-maroon)] sm:mt-6 sm:text-lg">{wedding.copy.comeCelebrate}</p>
              <KanthaBorder className="mx-auto my-8 w-full max-w-sm sm:my-10" />
              <p className="font-serif text-xs uppercase tracking-[0.3em] text-[var(--color-gold)]">
                {language === "bn" ? "আপনাদের আমন্ত্রণ" : "You are called to"}
              </p>
              <ul className="mt-4 space-y-2.5 sm:mt-5">
                {invited.map((event) => (
                  <li key={event.id} className="font-serif text-base sm:text-lg">
                    <span className="font-bn text-[var(--color-sindoor)]">{event.nameBn}</span>
                    <span className="mx-2 text-[var(--color-gold)]">·</span>
                    {event.name}
                  </li>
                ))}
              </ul>
              <p className="mt-7 text-sm tracking-wide text-[var(--color-muted)] sm:mt-8">
                A place for {guest.allowedGuests}
              </p>
            </div>
          </article>
        </TiltCard>
      </DepthStage>
    </section>
  );
}
