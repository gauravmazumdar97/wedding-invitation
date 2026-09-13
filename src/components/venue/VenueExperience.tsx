"use client";

import { wedding } from "@/config/wedding";
import { WeddingPhoto } from "@/components/media/WeddingPhoto";
import { useExperience } from "@/components/providers/ExperienceProvider";

export function VenueExperience() {
  const { guest, language } = useExperience();
  const unique = wedding.venues.filter((venue) => venue.eventIds.some((id) => guest.events.includes(id)));

  return (
    <section id="venue" className="bg-[var(--color-paper)] px-6 py-24">
      <div className="mx-auto max-w-3xl text-center">
        <p className="font-bn text-xl text-[var(--color-sindoor)]">{wedding.copy.venueBn}</p>
        <h2 className="mt-3 font-serif text-5xl md:text-7xl">Where we gather</h2>
      </div>
      <div className="mx-auto mt-14 grid max-w-6xl gap-10">
        {unique.map((venue) => (
          <article key={venue.id} className="grid gap-8 overflow-hidden border border-[var(--color-gold)]/30 md:grid-cols-2">
            <WeddingPhoto src={venue.illustration} alt={venue.name} className="min-h-[18rem]" />
            <div className="flex flex-col justify-center px-6 py-8">
              <h3 className="font-serif text-3xl text-[var(--color-sindoor)]">{venue.name}</h3>
              <p className="mt-3 text-[var(--color-muted)]">{venue.address}</p>
              <p className="mt-4 text-sm">{venue.landmark}</p>
              <p className="mt-2 text-sm">{venue.parking}</p>
              <p className="mt-4 font-serif italic">{venue.travelNotes}</p>
              <a
                href={venue.mapLink}
                target="_blank"
                rel="noreferrer"
                className="mt-6 inline-flex min-h-11 w-fit items-center border border-[var(--color-sindoor)] px-5 font-serif text-sm tracking-[0.18em] text-[var(--color-sindoor)]"
              >
                {language === "bn" ? "মানচিত্র খুলুন" : wedding.copy.openMaps}
              </a>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
