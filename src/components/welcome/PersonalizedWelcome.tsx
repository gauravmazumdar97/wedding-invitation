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
    <section className="section-cv silk-texture px-6 py-28 md:py-36">
      <DepthStage className="mx-auto max-w-2xl">
        <TiltCard max={9}>
          <article className="bg-[var(--color-paper)] text-center" style={{ boxShadow: "inset 0 0 0 1px rgba(196,165,116,0.45)" }}>
            <div className="px-6 py-14 md:px-12">
              <ShankhaPola className="mx-auto mb-6 h-10 w-24" />
              <p className="font-bn text-2xl text-[var(--color-sindoor)]">{guest.greetingBn}</p>
              <h2 className="mt-4 font-serif text-4xl md:text-6xl">Dear {guest.guestName}</h2>
              <p className="mt-8 font-serif text-2xl italic leading-relaxed">
                {language === "bn" ? guest.inviteTextBn : guest.inviteText}
              </p>
              <p className="mt-6 font-bn text-lg text-[var(--color-maroon)]">{wedding.copy.comeCelebrate}</p>
              <KanthaBorder className="mx-auto my-10 w-full max-w-sm" />
              <p className="font-serif text-xs uppercase tracking-[0.3em] text-[var(--color-gold)]">
                {language === "bn" ? "আপনাদের আমন্ত্রণ" : "You are called to"}
              </p>
              <ul className="mt-5 space-y-2">
                {invited.map((event) => (
                  <li key={event.id} className="font-serif text-lg">
                    <span className="font-bn text-[var(--color-sindoor)]">{event.nameBn}</span>
                    <span className="mx-2 text-[var(--color-gold)]">·</span>
                    {event.name}
                  </li>
                ))}
              </ul>
              <p className="mt-8 text-sm tracking-wide text-[var(--color-muted)]">
                A place for {guest.allowedGuests}
              </p>
            </div>
          </article>
        </TiltCard>
      </DepthStage>
    </section>
  );
}
