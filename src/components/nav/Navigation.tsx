"use client";

import { useEffect, useRef, useState } from "react";
import { wedding } from "@/config/wedding";
import { useExperience } from "@/components/providers/ExperienceProvider";
import { WeddingMonogram } from "@/components/art/WeddingMonogram";
import { subscribeScroll } from "@/lib/scroll-bus";

const links = [
  { href: "#story", en: wedding.copy.ourStory, bn: wedding.copy.ourStoryBn },
  { href: "#events", en: wedding.copy.events, bn: wedding.copy.eventsBn },
  { href: "#gallery", en: wedding.copy.gallery, bn: wedding.copy.galleryBn },
  { href: "#venue", en: wedding.copy.venue, bn: wedding.copy.venueBn },
  { href: "#rsvp", en: wedding.copy.rsvp, bn: wedding.copy.rsvp },
];

export function Navigation() {
  const { opened, language, setLanguage, setRsvpOpen, triggerPetals } = useExperience();
  const [open, setOpen] = useState(false);
  const bar = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!opened) return undefined;
    return subscribeScroll(({ progress }) => {
      if (bar.current) bar.current.style.transform = `scaleX(${progress})`;
    });
  }, [opened]);

  if (!opened) return null;

  const go = (href: string) => {
    setOpen(false);
    if (href === "#rsvp") {
      setRsvpOpen(true);
      document.getElementById("rsvp")?.scrollIntoView({ behavior: "smooth" });
      return;
    }
    document.querySelector(href)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <>
      <div className="fixed left-0 top-0 z-50 h-[2px] w-full origin-left bg-[var(--color-gold)]/20">
        <div
          ref={bar}
          className="h-full w-full origin-left bg-[var(--color-sindoor)] will-change-transform"
          style={{ transform: "scaleX(0)" }}
        />
      </div>

      <header className="fixed right-4 top-4 z-50 flex items-center gap-3 md:right-6 md:top-6">
        <button
          type="button"
          onClick={() => setLanguage(language === "en" ? "bn" : "en")}
          className="min-h-10 border border-[var(--color-gold)]/40 bg-[var(--color-paper)]/90 px-3 font-serif text-[0.65rem] tracking-[0.22em]"
          aria-label="Toggle language"
        >
          {language === "en" ? "বাংলা" : "EN"}
        </button>
        <button
          type="button"
          className="min-h-10 min-w-10 border border-[var(--color-gold)]/40 bg-[var(--color-paper)]/90 font-serif text-[0.65rem] tracking-[0.2em]"
          aria-expanded={open}
          aria-label="Open menu"
          onClick={() => setOpen(true)}
        >
          Menu
        </button>
      </header>

      {open ? (
        <div className="silk-texture fixed inset-0 z-[70] flex flex-col items-center justify-center bg-[var(--color-paper)]">
          <WeddingMonogram className="mb-10" onEasterEgg={triggerPetals} />
          <nav className="flex flex-col items-center gap-6">
            {links.map((link) => (
              <button
                key={link.href}
                type="button"
                onClick={() => go(link.href)}
                className="font-serif text-3xl tracking-[0.18em] text-[var(--color-sindoor)] md:text-4xl"
              >
                {language === "bn" ? link.bn : link.en}
              </button>
            ))}
          </nav>
          <button
            type="button"
            onClick={() => setOpen(false)}
            className="mt-14 min-h-11 font-serif text-xs tracking-[0.3em]"
          >
            Close
          </button>
        </div>
      ) : null}
    </>
  );
}
