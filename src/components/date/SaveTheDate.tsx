"use client";

import { wedding } from "@/config/wedding";
import { coupleDisplay } from "@/lib/invite";
import { buildGoogleCalendarUrl, downloadIcs } from "@/lib/calendar";
import { Divider } from "@/components/art/Ornaments";
import { MagneticButton } from "@/components/motion/MagneticButton";
import { DepthStage } from "@/components/motion/DepthStage";
import { useExperience } from "@/components/providers/ExperienceProvider";

export function SaveTheDate() {
  const { language } = useExperience();
  const { first, second } = coupleDisplay();

  return (
    <section className="section-cv section-pad-lg silk-texture relative text-center">
      <DepthStage>
        <p className="font-serif text-[0.7rem] uppercase tracking-[0.4em] text-[var(--color-gold)]">Save the date</p>
        <h2 className="mx-auto mt-5 max-w-3xl font-serif text-[2.5rem] leading-tight text-[var(--color-sindoor)] sm:mt-6 sm:text-5xl md:text-7xl">
          {first.fullName} & {second.fullName}
        </h2>
        <Divider className="my-7 sm:my-8" />
        <p className="font-serif text-2xl sm:text-3xl md:text-4xl">{wedding.date.display}</p>
        <p className="mt-3 font-bn text-base text-[var(--color-maroon)] sm:text-lg">{wedding.date.displayBn}</p>
        <p className="mt-2 tracking-[0.2em] text-[var(--color-muted)]">
          {wedding.date.time} · {wedding.location.city}
        </p>
        <p className="mx-auto mt-6 max-w-md font-serif text-base italic sm:mt-8 sm:text-lg">
          {language === "bn" ? wedding.saveTheDate.lineBn : wedding.saveTheDate.line}
        </p>
        <div className="mt-8 flex flex-col items-stretch justify-center gap-3 sm:mt-10 sm:flex-row sm:items-center">
          <a
            href={buildGoogleCalendarUrl()}
            target="_blank"
            rel="noreferrer"
            className="app-press magnetic-btn inline-flex min-h-[var(--touch-min)] items-center justify-center border border-[var(--color-sindoor)] px-6 py-3 font-serif text-sm tracking-[0.2em] text-[var(--color-sindoor)] hover:bg-[var(--color-sindoor)] hover:text-[var(--color-ivory)]"
          >
            Google Calendar
          </a>
          <MagneticButton
            type="button"
            onClick={downloadIcs}
            className="min-h-[var(--touch-min)] border border-[var(--color-gold)] px-6 py-3 font-serif text-sm tracking-[0.2em]"
          >
            Apple / ICS
          </MagneticButton>
        </div>
      </DepthStage>
    </section>
  );
}
