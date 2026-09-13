"use client";

import { useSyncExternalStore } from "react";
import { wedding } from "@/config/wedding";
import { useExperience } from "@/components/providers/ExperienceProvider";
import { DepthStage } from "@/components/motion/DepthStage";

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
    <div className="min-w-[3.75rem] text-center sm:min-w-[4.5rem]">
      <p key={value} className="font-serif text-[2.5rem] text-[var(--color-sindoor)] sm:text-5xl md:text-7xl">
        {String(value).padStart(2, "0")}
      </p>
      <p className="mt-2 font-serif text-[0.65rem] uppercase tracking-[0.28em] text-[var(--color-muted)]">{label}</p>
    </div>
  );
}

export function Countdown() {
  const { language } = useExperience();
  const time = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);

  return (
    <section className="section-cv section-pad silk-texture text-center">
      <DepthStage intensity={0.85}>
        {time.past ? (
          <>
            <p className="font-bn text-xl text-[var(--color-sindoor)] sm:text-2xl">{wedding.countdown.afterBn}</p>
            <p className="mt-4 font-serif text-2xl italic sm:text-3xl">{wedding.countdown.after}</p>
          </>
        ) : (
          <>
            <p className="font-serif text-lg italic sm:text-xl md:text-2xl">
              {language === "bn" ? wedding.countdown.beforeBn : wedding.countdown.before}
            </p>
            <div className="mt-8 flex flex-wrap items-start justify-center gap-5 sm:mt-10 sm:gap-8">
              <Cell value={time.days} label="Days" />
              <Cell value={time.hours} label="Hours" />
              <Cell value={time.minutes} label="Minutes" />
              <Cell value={time.seconds} label="Seconds" />
            </div>
          </>
        )}
      </DepthStage>
    </section>
  );
}
