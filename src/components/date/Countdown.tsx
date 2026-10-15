"use client";

import { useSyncExternalStore } from "react";
import { wedding } from "@/config/wedding";
import { FestivalHeading } from "@/components/ui/FestivalHeading";
import { Divider } from "@/components/art/Ornaments";
import { DepthStage } from "@/components/motion/DepthStage";
import { TiltCard } from "@/components/motion/TiltCard";
import { useExperience } from "@/components/providers/ExperienceProvider";

interface Remaining {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
  past: boolean;
}

const empty: Remaining = { days: 0, hours: 0, minutes: 0, seconds: 0, past: false };

/** Wedding day: 26 November 2026, 6:30pm (from wedding.date.iso). */
const WEDDING_AT_MS = Date.parse(wedding.date.iso);

function computeRemaining(nowMs = Date.now()): Remaining {
  const delta = WEDDING_AT_MS - nowMs;
  if (!Number.isFinite(WEDDING_AT_MS) || delta <= 0) {
    return { days: 0, hours: 0, minutes: 0, seconds: 0, past: true };
  }
  return {
    days: Math.floor(delta / 86400000),
    hours: Math.floor((delta % 86400000) / 3600000),
    minutes: Math.floor((delta % 3600000) / 60000),
    seconds: Math.floor((delta % 60000) / 1000),
    past: false,
  };
}

let cached: Remaining = empty;

function getSnapshot(): Remaining {
  const next = computeRemaining();
  if (
    cached.days === next.days &&
    cached.hours === next.hours &&
    cached.minutes === next.minutes &&
    cached.seconds === next.seconds &&
    cached.past === next.past
  ) {
    return cached;
  }
  cached = next;
  return cached;
}

function getServerSnapshot(): Remaining {
  return empty;
}

function subscribe(onStoreChange: () => void): () => void {
  const id = window.setInterval(onStoreChange, 1000);
  return () => window.clearInterval(id);
}

function Cell({ value, label }: { value: number; label: string }) {
  return (
    <TiltCard max={6} pressFeedback>
      <div className="festival-card flex min-h-[6.25rem] flex-col items-center justify-center px-3 py-5 sm:min-h-[7.75rem] sm:py-6">
        <p className="font-serif text-[clamp(2rem,7vw,3rem)] italic leading-none text-[var(--color-sindoor)]">
          {String(value).padStart(2, "0")}
        </p>
        <p className="festival-kicker mt-3">{label}</p>
      </div>
    </TiltCard>
  );
}

export function Countdown() {
  const { language } = useExperience();
  const time = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);

  return (
    <section className="section-pad">
      {time.past ? (
        <FestivalHeading kicker="The countdown" title={wedding.countdown.after} />
      ) : (
        <DepthStage intensity={0.45}>
          <FestivalHeading
            kicker="The countdown"
            title={language === "bn" ? wedding.countdown.beforeBn : wedding.countdown.before}
          />
          <Divider className="mx-auto my-5 sm:my-6" />
          <p className="text-center font-serif text-lg text-[var(--color-navy)] sm:text-xl">
            {language === "bn" ? wedding.date.displayBn : wedding.date.display}
          </p>
          <p className="mt-2 text-center font-sans text-[0.65rem] uppercase tracking-[0.22em] text-[var(--color-muted)]">
            {wedding.date.time}
          </p>
          <div className="mx-auto mt-8 grid max-w-2xl grid-cols-2 gap-3 sm:mt-10 sm:grid-cols-4 sm:gap-4">
            <Cell value={time.days} label="Days" />
            <Cell value={time.hours} label="Hours" />
            <Cell value={time.minutes} label="Minutes" />
            <Cell value={time.seconds} label="Seconds" />
          </div>
        </DepthStage>
      )}
    </section>
  );
}
