"use client";

import { wedding } from "@/config/wedding";
import { FestivalHeading } from "@/components/ui/FestivalHeading";
import { DepthStage } from "@/components/motion/DepthStage";
import { useExperience } from "@/components/providers/ExperienceProvider";

function mapEmbed(mapLink: string) {
  try {
    const url = new URL(mapLink);
    const query = url.searchParams.get("q") || mapLink;
    return `https://maps.google.com/maps?q=${encodeURIComponent(query)}&z=14&output=embed`;
  } catch {
    return `https://maps.google.com/maps?q=${encodeURIComponent(mapLink)}&output=embed`;
  }
}

export function VenueExperience() {
  const { guest, language } = useExperience();
  const venues = wedding.venues.filter((venue) => venue.eventIds.some((id) => guest.events.includes(id)));
  const featured = venues.find((venue) => venue.eventIds.includes("wedding")) ?? venues[0];

  if (!featured) return null;

  return (
    <section id="venue" className="section-pad">
      <DepthStage>
        <FestivalHeading kicker="The venue" title={featured.name} />
        <p className="mt-3 text-center font-serif text-xl italic text-[var(--color-navy)] sm:text-2xl">
          {wedding.location.city}, {wedding.location.region}
        </p>
        <div className="festival-card mx-auto mt-8 max-w-xl overflow-hidden">
          <iframe
            title={featured.name}
            src={mapEmbed(featured.mapLink)}
            className="h-52 w-full sm:h-80"
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          />
          <div className="px-5 py-4 text-center sm:px-6">
            <p className="text-sm text-[var(--color-muted)]">{featured.address}</p>
            <a
              href={featured.mapLink}
              target="_blank"
              rel="noreferrer"
              className="app-press mt-4 inline-flex min-h-[var(--touch-min)] items-center font-sans text-[0.68rem] uppercase tracking-[0.2em] text-[var(--color-coral)]"
            >
              {language === "bn" ? "দিকনির্দেশ" : "Get directions"}
            </a>
          </div>
        </div>
      </DepthStage>
    </section>
  );
}
