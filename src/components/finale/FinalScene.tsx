"use client";

import { wedding } from "@/config/wedding";
import { coupleDisplay } from "@/lib/invite";
import { buildGoogleCalendarUrl, downloadIcs } from "@/lib/calendar";
import { WeddingMonogram } from "@/components/art/WeddingMonogram";
import { ShankhaPola } from "@/components/art/BengaliMotifs";
import { WeddingPhoto } from "@/components/media/WeddingPhoto";
import { useExperience } from "@/components/providers/ExperienceProvider";

export function FinalScene() {
  const { language, setRsvpOpen, triggerPetals } = useExperience();
  const { first, second } = coupleDisplay();
  const contact = wedding.contacts[0];

  return (
    <section className="relative min-h-dvh overflow-hidden bg-[var(--color-burgundy)] text-[var(--color-ivory)]">
      <WeddingPhoto src={wedding.photos.finale} alt="Finale photograph" className="absolute inset-0 h-full w-full opacity-35" />
      <div className="relative z-10 flex min-h-dvh flex-col items-center justify-center px-6 py-24 text-center">
        <WeddingMonogram className="text-[var(--color-ivory)]" onEasterEgg={triggerPetals} />
        <h2 className="mt-8 font-serif text-5xl md:text-7xl">
          {first.fullName} & {second.fullName}
        </h2>
        <p className="mt-4 tracking-[0.3em] uppercase text-[var(--color-gold)]">{wedding.date.display}</p>
        <p className="mt-10 font-serif text-3xl italic">{language === "bn" ? wedding.finale.lineBn : wedding.finale.line}</p>
        <p className="mt-3 font-bn text-2xl">{wedding.copy.shubhoBibaho}</p>
        <ShankhaPola className="mx-auto mt-6 h-10 w-24 opacity-80" />
        <div className="mt-12 flex flex-wrap justify-center gap-3">
          <button
            type="button"
            onClick={() => {
              document.getElementById("rsvp")?.scrollIntoView({ behavior: "smooth" });
              setRsvpOpen(true);
            }}
            className="min-h-11 border border-[var(--color-ivory)] px-5 font-serif text-sm tracking-[0.2em]"
          >
            RSVP
          </button>
          <a href="#venue" className="min-h-11 border border-[var(--color-ivory)]/50 px-5 py-2.5 font-serif text-sm tracking-[0.2em]">
            Directions
          </a>
          <a href={`tel:${contact?.phone ?? ""}`} className="min-h-11 border border-[var(--color-ivory)]/50 px-5 py-2.5 font-serif text-sm tracking-[0.2em]">
            Contact
          </a>
          <a href={buildGoogleCalendarUrl()} target="_blank" rel="noreferrer" className="min-h-11 border border-[var(--color-ivory)]/50 px-5 py-2.5 font-serif text-sm tracking-[0.2em]">
            Calendar
          </a>
          <button type="button" onClick={downloadIcs} className="min-h-11 border border-[var(--color-ivory)]/50 px-5 font-serif text-sm tracking-[0.2em]">
            ICS
          </button>
        </div>
        <p className="mt-16 font-serif text-xs tracking-[0.35em] text-[var(--color-gold)]">
          {wedding.date.display.replace(/\D/g, " · ")}
        </p>
      </div>
    </section>
  );
}
