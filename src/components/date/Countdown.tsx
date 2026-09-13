"use client";

import { useSyncExternalStore } from "react";
import { wedding } from "@/config/wedding";
import { FestivalHeading } from "@/components/ui/FestivalHeading";
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

function computeRemaining(): Remaining {
  const delta = new Date(wedding.date.iso).getTime() - Date.now();
  if (delta <= 0) {
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
    <TiltCard max={11} pressFeedback>
    <div className="festival-card flex min-h-[5.75rem] flex-col items-center justify-center aspect-auto py-5 sm:aspect-square sm:min-h-[7.5rem]">
      <p className="font-serif text-4xl italic text-[var(--color-coral)] sm:text-5xl">
        {String(value).padStart(2, "0")}
      </p>
      <p className="mt-2 font-sans text-[0.62rem] uppercase tracking-[0.22em] text-[var(--color-muted)]">
        {label}
      </p>
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
        <DepthStage>
          <FestivalHeading
            kicker="The countdown"
            title={language === "bn" ? wedding.countdown.beforeBn : wedding.countdown.before}
          />
          <div className="mx-auto mt-8 grid max-w-md grid-cols-2 gap-2.5 sm:mt-12 sm:gap-4">
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
