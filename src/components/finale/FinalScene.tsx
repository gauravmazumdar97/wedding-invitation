"use client";

import { wedding } from "@/config/wedding";
import { coupleDisplay } from "@/lib/invite";
import { buildGoogleCalendarUrl, downloadIcs } from "@/lib/calendar";
import { WeddingMonogram } from "@/components/art/WeddingMonogram";
import { ShankhaPola } from "@/components/art/BengaliMotifs";
import { WeddingPhoto } from "@/components/media/WeddingPhoto";
import { useExperience } from "@/components/providers/ExperienceProvider";
import { usePrefersReducedMotion } from "@/hooks/useMedia";

export function FinalScene() {
  const { language, setRsvpOpen, triggerPetals } = useExperience();
  const { first, second } = coupleDisplay();
  const contact = wedding.contacts[0];
  const reduced = usePrefersReducedMotion();

  return (
    <section className="relative min-h-dvh overflow-hidden bg-[var(--color-burgundy)] text-[var(--color-ivory)]">
      <WeddingPhoto
        src={wedding.photos.finale}
        alt="Finale photograph"
        className="absolute inset-0 h-full w-full opacity-35"
        sizes="100vw"
      />
      <div className="relative z-10 flex min-h-dvh flex-col items-center justify-center px-[var(--page-x)] py-[var(--section-y-lg)] pb-[max(var(--section-y-lg),calc(var(--safe-bottom)+3rem))] pt-[max(var(--section-y-lg),calc(var(--safe-top)+2rem))] text-center">
        <WeddingMonogram className="text-[var(--color-ivory)]" onEasterEgg={triggerPetals} />
        <h2 className="mt-6 font-serif text-[2.5rem] leading-tight sm:mt-8 sm:text-5xl md:text-7xl">
          {first.fullName} & {second.fullName}
        </h2>
        <p className="mt-4 tracking-[0.24em] uppercase text-[var(--color-gold)] sm:tracking-[0.3em]">{wedding.date.display}</p>
        <p className="mt-8 font-serif text-2xl italic sm:mt-10 sm:text-3xl">
          {language === "bn" ? wedding.finale.lineBn : wedding.finale.line}
        </p>
        <p className="mt-3 font-bn text-xl sm:text-2xl">{wedding.copy.shubhoBibaho}</p>
        <ShankhaPola className="mx-auto mt-5 h-9 w-20 opacity-80 sm:mt-6 sm:h-10 sm:w-24" />
        <div className="mt-10 flex max-w-lg flex-wrap justify-center gap-3 sm:mt-12">
          <button
            type="button"
            onClick={() => {
              document.getElementById("rsvp")?.scrollIntoView({ behavior: reduced ? "auto" : "smooth" });
              setRsvpOpen(true);
            }}
            className="app-press inline-flex min-h-[var(--touch-min)] items-center border border-[var(--color-ivory)] px-5 font-serif text-sm tracking-[0.2em]"
          >
            RSVP
          </button>
          <a href="#venue" className="app-press inline-flex min-h-[var(--touch-min)] items-center border border-[var(--color-ivory)]/50 px-5 font-serif text-sm tracking-[0.2em]">
            Directions
          </a>
          <a href={`tel:${contact?.phone ?? ""}`} className="app-press inline-flex min-h-[var(--touch-min)] items-center border border-[var(--color-ivory)]/50 px-5 font-serif text-sm tracking-[0.2em]">
            Contact
          </a>
          <a href={buildGoogleCalendarUrl()} target="_blank" rel="noreferrer" className="app-press inline-flex min-h-[var(--touch-min)] items-center border border-[var(--color-ivory)]/50 px-5 font-serif text-sm tracking-[0.2em]">
            Calendar
          </a>
          <button type="button" onClick={downloadIcs} className="app-press inline-flex min-h-[var(--touch-min)] items-center border border-[var(--color-ivory)]/50 px-5 font-serif text-sm tracking-[0.2em]">
            ICS
          </button>
        </div>
        <p className="mt-12 font-serif text-xs tracking-[0.35em] text-[var(--color-gold)] sm:mt-16">
          {wedding.date.display.replace(/\D/g, " · ")}
        </p>
      </div>
    </section>
  );
}
