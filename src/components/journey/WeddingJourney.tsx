"use client";

import { eventsForGuest, venueById } from "@/config/wedding";
import { WeddingPhoto } from "@/components/media/WeddingPhoto";
import { FestivalHeading } from "@/components/ui/FestivalHeading";
import { DepthStage } from "@/components/motion/DepthStage";
import { TiltCard } from "@/components/motion/TiltCard";
import { useExperience } from "@/components/providers/ExperienceProvider";

function eventStamp(dateIso: string) {
  const date = new Date(dateIso);
  const time = new Intl.DateTimeFormat("en-GB", {
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
    timeZone: "Asia/Kolkata",
  }).format(date);
  const day = new Intl.DateTimeFormat("en-GB", {
    day: "2-digit",
    month: "short",
    timeZone: "Asia/Kolkata",
  })
    .format(date)
    .toUpperCase();
  return { time, day };
}

export function WeddingJourney() {
  const { guest, language } = useExperience();
  const events = eventsForGuest(guest.events);

  return (
    <section id="events" className="section-pad">
      <DepthStage>
        <FestivalHeading kicker="Celebrations" title="The Schedule" bengali="অনুষ্ঠানের সূচি" />
        <div className="mx-auto mt-8 max-w-xl space-y-4 sm:mt-12 sm:space-y-6">
          {events.map((event) => {
            const venue = venueById(event.venueId);
            const stamp = eventStamp(event.dateIso);
            return (
              <TiltCard key={event.id} max={7} pressFeedback>
                <article className="festival-card overflow-hidden">
                  <WeddingPhoto
                    src={event.photograph}
                    alt={event.name}
                    className="aspect-[16/10] w-full sm:aspect-[16/9]"
                    sizes="(max-width: 767px) 92vw, 576px"
                  />
                  <div className="flex items-start gap-3 px-4 py-4 sm:gap-4 sm:px-6 sm:py-5">
                    <div className="min-w-[4.15rem]">
                      <p className="font-serif text-[1.65rem] italic leading-none text-[var(--color-coral)] sm:text-3xl">
                        {stamp.time}
                      </p>
                      <p className="mt-1.5 font-sans text-[0.6rem] tracking-[0.16em] text-[var(--color-muted)]">
                        {stamp.day}
                      </p>
                    </div>
                    <div className="min-w-0">
                      <h3 className="font-serif text-lg leading-snug text-[var(--color-navy)] sm:text-2xl">
                        {language === "bn" ? event.nameBn : event.name}
                      </h3>
                      {language === "en" ? (
                        <p className="font-bn text-sm text-[var(--color-maroon)]">{event.nameBn}</p>
                      ) : null}
                      <p className="mt-1 text-sm text-[var(--color-muted)]">{venue?.name}</p>
                      <p className="mt-2 font-serif text-sm italic leading-relaxed text-[var(--color-muted)] sm:text-base">
                        {language === "bn" ? event.descriptionBn : event.description}
                      </p>
                    </div>
                  </div>
                </article>
              </TiltCard>
            );
          })}
        </div>
      </DepthStage>
    </section>
  );
}
