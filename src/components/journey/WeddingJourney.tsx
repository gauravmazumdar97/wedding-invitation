"use client";

import { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { eventsForGuest, venueById } from "@/config/wedding";
import { loreForEvent } from "@/config/culture";
import { WeddingPhoto } from "@/components/media/WeddingPhoto";
import { TiltCard } from "@/components/motion/TiltCard";
import { Marigold, Diya, Kalka, RitualMark } from "@/components/art/BengaliMotifs";
import { useExperience } from "@/components/providers/ExperienceProvider";
import { useIsMobile, usePrefersReducedMotion } from "@/hooks/useMedia";
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

  useGSAP(
    () => {
      if (!root.current || reduced || mobile) return;
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
    { scope: root, dependencies: [reduced, mobile, events.length] },
  );

  return (
    <section id="events" ref={root} className="section-cv">
      <div className="bg-[var(--color-ivory)] px-6 py-20 text-center">
        <p className="font-bn text-xl text-[var(--color-sindoor)]">বাংলা বিবাহ যাত্রা</p>
        <h2 className="mt-3 font-serif text-5xl md:text-7xl">The Wedding Journey</h2>
        <p className="mx-auto mt-5 max-w-xl font-serif text-lg italic">
          From aiburo bhaat to bou bhaat: the rites of a Bengali marriage, in the order they are lived.
        </p>
      </div>

      {events.map((event) => {
        const venue = venueById(event.venueId);
        const lore = loreForEvent(event.id);
        const personal = language === "bn" ? event.descriptionBn : event.description;
        const showPersonal = personal && !personal.startsWith("[");
        return (
          <article
            key={event.id}
            data-event-chapter
            className={cn("relative min-h-[88dvh] overflow-hidden px-6 py-20", atmospheres[event.atmosphere])}
            style={{ background: "var(--bg)", color: "var(--fg)" }}
          >
            {!mobile ? (
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
            ) : null}

            <div className="relative z-10 mx-auto grid max-w-6xl items-center gap-10 md:grid-cols-2">
              <TiltCard max={mobile ? 0 : 10}>
                <WeddingPhoto
                  framed
                  src={event.photograph}
                  alt={event.name}
                  className="aspect-[5/4] w-full"
                />
              </TiltCard>
              <div>
                <RitualMark id={event.id} className="mb-5 h-12 w-20 opacity-90" />
                <p className="font-bn text-2xl">{event.nameBn}</p>
                <h3 className="mt-2 font-serif text-5xl">{event.name}</h3>
                <p className="mt-6 font-serif text-xl tracking-[0.18em] uppercase">
                  {event.date} · {event.time}
                </p>
                <p className="mt-3 text-sm tracking-wide opacity-80">{venue?.name}</p>
                {lore ? (
                  <p className="mt-6 max-w-md font-serif text-lg leading-relaxed">
                    {language === "bn" ? lore.meaningBn : lore.meaning}
                  </p>
                ) : null}
                {showPersonal ? (
                  <p className="mt-4 max-w-md font-serif text-base italic leading-relaxed opacity-80">{personal}</p>
                ) : null}
                <p className="mt-6 text-sm uppercase tracking-[0.2em] opacity-70">Dress</p>
                <p className="font-serif text-lg">
                  {language === "bn" ? event.dressCodeBn : event.dressCode}
                </p>
                <a
                  href={event.mapLink}
                  target="_blank"
                  rel="noreferrer"
                  className="mt-8 inline-block min-h-11 border border-current px-5 py-2 font-serif text-sm tracking-[0.18em]"
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
