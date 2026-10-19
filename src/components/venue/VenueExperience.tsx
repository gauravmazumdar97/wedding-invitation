"use client";

import { venueById } from "@/config/wedding";
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

const featuredVenues = [
  {
    venueId: "mandap",
    labelEn: "Wedding Ceremony",
    labelBn: "শুভ বিবাহ",
    placeEn: "Kolkata",
    placeBn: "কলকাতা",
  },
  {
    venueId: "banquet",
    labelEn: "Reception",
    labelBn: "বৌ ভাত / রিসেপশন",
    placeEn: "New Delhi",
    placeBn: "নয়াদিল্লি",
  },
] as const;

export function VenueExperience() {
  const { language } = useExperience();

  return (
    <section id="venue" className="section-pad">
      <DepthStage>
        <FestivalHeading
          kicker="The venues"
          title={language === "bn" ? "কোথায় মিলবে" : "Where we gather"}
          bengali={language === "bn" ? undefined : "আমাদের স্থান"}
        />
        <div className="mx-auto mt-8 grid max-w-4xl gap-6 sm:mt-10 md:grid-cols-2">
          {featuredVenues.map((item) => {
            const venue = venueById(item.venueId);
            if (!venue) return null;
            return (
              <a
                key={venue.id}
                href={venue.mapLink}
                target="_blank"
                rel="noreferrer"
                className="festival-card app-press block overflow-hidden transition duration-200 hover:-translate-y-0.5"
              >
                <div className="px-5 pt-5 text-center sm:px-6 sm:pt-6">
                  <p className="festival-kicker">{language === "bn" ? item.labelBn : item.labelEn}</p>
                  <h3 className="mt-2 font-serif text-xl italic text-[var(--color-navy)] sm:text-2xl">
                    {venue.name}
                  </h3>
                  <p className="mt-1 font-bn text-sm text-[var(--color-maroon)]">
                    {language === "bn" ? item.placeBn : item.placeEn}
                  </p>
                </div>
                <div className="relative mt-4">
                  <iframe
                    title={venue.name}
                    src={mapEmbed(venue.mapLink)}
                    className="pointer-events-none h-48 w-full sm:h-56"
                    loading="lazy"
                    tabIndex={-1}
                    referrerPolicy="no-referrer-when-downgrade"
                  />
                </div>
                <div className="px-5 py-4 text-center sm:px-6">
                  <p className="text-sm leading-relaxed text-[var(--color-muted)]">{venue.address}</p>
                  <p className="mt-4 font-sans text-[0.68rem] uppercase tracking-[0.2em] text-[var(--color-coral)]">
                    {language === "bn" ? "গুগল ম্যাপে খুলুন" : "Open in Google Maps"}
                  </p>
                </div>
              </a>
            );
          })}
        </div>
      </DepthStage>
    </section>
  );
}
