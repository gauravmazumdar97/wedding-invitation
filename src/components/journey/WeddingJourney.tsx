"use client";

import { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { eventsForGuest, venueById } from "@/config/wedding";
import { WeddingPhoto } from "@/components/media/WeddingPhoto";
import { TiltCard } from "@/components/motion/TiltCard";
import { Marigold, Diya, Kalka, RitualMark } from "@/components/art/BengaliMotifs";
import { useExperience } from "@/components/providers/ExperienceProvider";
import { useIsMobile, useNativeScrollExperience, usePrefersReducedMotion } from "@/hooks/useMedia";
import { cn } from "@/lib/cn";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

const atmospheres: Record<string, string> = {
  ivory: "atmosphere-ivory",
  marigold: "atmosphere-marigold",
  festive: "atmosphere-festive",
  ceremonial: "atmosphere-ceremonial",
  sindoor: "atmosphere-sindoor",
  candlelight: "atmosphere-candlelight",
};

export function WeddingJourney() {
  const { guest, language } = useExperience();
  const events = eventsForGuest(guest.events);
  const root = useRef<HTMLElement>(null);
  const reduced = usePrefersReducedMotion();
  const mobile = useIsMobile();
  const nativeScroll = useNativeScrollExperience();
  const lightMotion = reduced || nativeScroll;

  useGSAP(
    () => {
      if (!root.current || lightMotion) return;
      const chapters = gsap.utils.toArray<HTMLElement>("[data-event-chapter]");
      chapters.forEach((chapter) => {
        const decor = chapter.querySelectorAll("[data-event-float]");
        gsap.fromTo(
          decor,
          { y: 24, opacity: 0.2 },
          {
            y: -16,
            opacity: 0.75,
            ease: "none",
            scrollTrigger: {
              trigger: chapter,
              start: "top 85%",
              end: "bottom 25%",
              scrub: 0.35,
            },
          },
        );
      });
    },
    { scope: root, dependencies: [lightMotion, events.length] },
  );

  return (
    <section id="events" ref={root} className="section-cv">
      <div className="section-pad bg-[var(--color-ivory)] text-center">
        <p className="font-bn text-lg text-[var(--color-sindoor)] sm:text-xl">বাংলা বিবাহ যাত্রা</p>
        <h2 className="mt-3 font-serif text-[2.65rem] leading-[1.05] sm:text-5xl md:text-7xl">
          The Wedding Journey
        </h2>
        <p className="mx-auto mt-4 max-w-xl font-serif text-base italic sm:mt-5 sm:text-lg">
          From aiburo bhaat to bou bhaat: the rites of a Bengali marriage, in the order they are lived.
        </p>
      </div>

      {events.map((event) => {
        const venue = venueById(event.venueId);
        const personal = language === "bn" ? event.descriptionBn : event.description;
        const showPersonal = personal && !personal.startsWith("[");
        return (
          <article
            key={event.id}
            data-event-chapter
            className={cn(
              "relative overflow-hidden section-pad",
              mobile ? "min-h-0 py-[var(--section-y-lg)]" : "min-h-[min(88dvh,52rem)]",
              atmospheres[event.atmosphere],
            )}
            style={{ background: "var(--bg)", color: "var(--fg)" }}
          >
            {!nativeScroll ? (
              <>
                <div data-event-float className="pointer-events-none absolute right-[6%] top-[12%]">
                  <Marigold className="h-12 w-12" />
                </div>
                <div data-event-float className="pointer-events-none absolute bottom-[14%] left-[5%]">
                  <Diya className="h-10 w-14" />
                </div>
                <div data-event-float className="pointer-events-none absolute left-[8%] top-[20%]">
                  <Kalka className="h-16 w-12" />
                </div>
              </>
            ) : mobile ? (
              <div className="pointer-events-none absolute right-[5%] top-[8%] opacity-40">
                <Marigold className="h-9 w-9" />
              </div>
            ) : null}

            <div className="relative z-10 mx-auto grid max-w-6xl items-center gap-8 md:grid-cols-2 md:gap-10 lg:gap-14">
              <TiltCard max={nativeScroll ? 5 : 10} pressFeedback>
                <WeddingPhoto
                  framed
                  src={event.photograph}
                  alt={event.name}
                  className="aspect-[5/4] w-full"
                  sizes="(max-width: 767px) 92vw, (max-width: 1023px) 46vw, 560px"
                />
              </TiltCard>
              <div className={mobile ? "text-center md:text-left" : undefined}>
                <RitualMark id={event.id} className={cn("mb-4 h-11 w-[4.5rem] opacity-90 sm:mb-5 sm:h-12 sm:w-20", mobile && "mx-auto md:mx-0")} />
                <p className="font-bn text-xl sm:text-2xl">{event.nameBn}</p>
                <h3 className="mt-2 font-serif text-[2.35rem] leading-tight sm:text-5xl">{event.name}</h3>
                <p className="mt-5 font-serif text-lg tracking-[0.14em] uppercase sm:mt-6 sm:text-xl sm:tracking-[0.18em]">
                  {event.date} · {event.time}
                </p>
                <p className="mt-2 text-sm tracking-wide opacity-80 sm:mt-3">{venue?.name}</p>
                {showPersonal ? (
                  <p className="mt-5 max-w-md font-serif text-base italic leading-relaxed opacity-85 sm:mt-6 sm:text-lg md:mx-0 mx-auto">
                    {personal}
                  </p>
                ) : null}
                <p className="mt-5 text-sm uppercase tracking-[0.2em] opacity-70 sm:mt-6">Dress</p>
                <p className="font-serif text-base sm:text-lg">
                  {language === "bn" ? event.dressCodeBn : event.dressCode}
                </p>
                <a
                  href={event.mapLink}
                  target="_blank"
                  rel="noreferrer"
                  className="app-press mt-7 inline-flex min-h-[var(--touch-min)] items-center border border-current px-5 py-2 font-serif text-sm tracking-[0.18em] sm:mt-8"
                >
                  Directions
                </a>
              </div>
            </div>
          </article>
        );
      })}
    </section>
  );
}
