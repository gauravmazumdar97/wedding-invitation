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
    <section className="section-cv silk-texture relative px-6 py-28 text-center md:py-36">
      <DepthStage>
        <p className="font-serif text-[0.7rem] uppercase tracking-[0.4em] text-[var(--color-gold)]">Save the date</p>
        <h2 className="mx-auto mt-6 max-w-3xl font-serif text-5xl leading-tight text-[var(--color-sindoor)] md:text-7xl">
          {first.fullName} & {second.fullName}
        </h2>
        <Divider className="my-8" />
        <p className="font-serif text-3xl md:text-4xl">{wedding.date.display}</p>
        <p className="mt-3 font-bn text-lg text-[var(--color-maroon)]">{wedding.date.displayBn}</p>
        <p className="mt-2 tracking-[0.2em] text-[var(--color-muted)]">
          {wedding.date.time} · {wedding.location.city}
        </p>
        <p className="mx-auto mt-8 max-w-md font-serif text-lg italic">
          {language === "bn" ? wedding.saveTheDate.lineBn : wedding.saveTheDate.line}
        </p>
        <div className="mt-10 flex flex-col items-center justify-center gap-3 sm:flex-row">
          <a
            href={buildGoogleCalendarUrl()}
            target="_blank"
            rel="noreferrer"
            className="magnetic-btn min-h-12 border border-[var(--color-sindoor)] px-6 py-3 font-serif text-sm tracking-[0.2em] text-[var(--color-sindoor)] hover:bg-[var(--color-sindoor)] hover:text-[var(--color-ivory)]"
          >
            Google Calendar
          </a>
          <MagneticButton
            type="button"
            onClick={downloadIcs}
            className="min-h-12 border border-[var(--color-gold)] px-6 py-3 font-serif text-sm tracking-[0.2em]"
          >
            Apple / ICS
          </MagneticButton>
        </div>
      </DepthStage>
    </section>
  );
}
