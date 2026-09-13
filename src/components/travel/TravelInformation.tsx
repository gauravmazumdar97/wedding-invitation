"use client";

import { wedding } from "@/config/wedding";
import { useExperience } from "@/components/providers/ExperienceProvider";

export function TravelInformation() {
  const { language } = useExperience();
  if (!wedding.travel.enabled) return null;

  const items = [
    { label: "Airport", value: wedding.travel.airport.name, detail: wedding.travel.airport.detail },
    { label: "Railway", value: wedding.travel.railway.name, detail: wedding.travel.railway.detail },
    { label: "Hotel", value: wedding.travel.hotel.name, detail: `${wedding.travel.hotel.detail} ${wedding.travel.hotel.bookingNote}` },
    { label: "Transport", value: wedding.travel.transport, detail: wedding.travel.pickup },
  ];

  return (
    <section className="section-pad bg-[var(--color-ivory)]">
      <div className="mx-auto max-w-3xl text-center">
        <h2 className="font-serif text-[2.5rem] leading-tight sm:text-5xl md:text-6xl">Your Journey</h2>
        <p className="mt-4 font-serif italic text-[var(--color-muted)]">
          {language === "bn" ? "দূর থেকে আসছেন?" : "For guests travelling in"}
        </p>
      </div>
      <ol className="mx-auto mt-10 max-w-3xl space-y-7 sm:mt-14 sm:space-y-8">
        {items.map((item, index) => (
          <li key={item.label} className="grid grid-cols-[2.75rem_1fr] gap-3 sm:grid-cols-[3rem_1fr] sm:gap-4">
            <span className="font-serif text-xl text-[var(--color-gold)] sm:text-2xl">0{index + 1}</span>
            <div>
              <p className="text-xs uppercase tracking-[0.25em] text-[var(--color-muted)]">{item.label}</p>
              <p className="mt-1 font-serif text-xl sm:text-2xl">{item.value}</p>
              <p className="mt-2 text-sm text-[var(--color-muted)] sm:text-base">{item.detail}</p>
            </div>
          </li>
        ))}
      </ol>
      <p className="mt-10 text-center text-sm text-[var(--color-muted)] sm:mt-12">
        {wedding.travel.contactName} · {wedding.travel.contactNumber}
      </p>
    </section>
  );
}
