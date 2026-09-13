"use client";

import { useEffect, useRef, useState } from "react";
import { wedding } from "@/config/wedding";
import { useExperience } from "@/components/providers/ExperienceProvider";
import { WeddingMonogram } from "@/components/art/WeddingMonogram";
import { subscribeScroll } from "@/lib/scroll-bus";
import { usePrefersReducedMotion } from "@/hooks/useMedia";

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
  const reduced = usePrefersReducedMotion();

  useEffect(() => {
    if (!opened) return undefined;
    return subscribeScroll(({ progress }) => {
      if (bar.current) bar.current.style.transform = `scaleX(${progress})`;
    });
  }, [opened]);

  useEffect(() => {
    document.body.classList.toggle("menu-locked", open);
    return () => document.body.classList.remove("menu-locked");
  }, [open]);

  useEffect(() => {
    if (!open) return undefined;
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  if (!opened) return null;

  const go = (href: string) => {
    setOpen(false);
    const behavior: ScrollBehavior = reduced ? "auto" : "smooth";
    if (href === "#rsvp") {
      setRsvpOpen(true);
      document.getElementById("rsvp")?.scrollIntoView({ behavior });
      return;
    }
    document.querySelector(href)?.scrollIntoView({ behavior });
  };

  return (
    <>
      <div className="fixed left-0 top-0 z-50 h-[2px] w-full origin-left bg-[var(--color-gold)]/20 pt-[var(--safe-top)]">
        <div
          ref={bar}
          className="h-full w-full origin-left bg-[var(--color-sindoor)] will-change-transform"
          style={{ transform: "scaleX(0)" }}
        />
      </div>

      <header className="safe-fixed-tr fixed z-50 flex items-center gap-2.5 sm:gap-3">
        <button
          type="button"
          onClick={() => setLanguage(language === "en" ? "bn" : "en")}
          className="app-press inline-flex min-h-[var(--touch-min)] min-w-[3.25rem] items-center justify-center border border-[var(--color-gold)]/40 bg-[var(--color-paper)]/92 px-3 font-serif text-[0.65rem] tracking-[0.22em] backdrop-blur-sm"
          aria-label="Toggle language"
        >
          {language === "en" ? "বাংলা" : "EN"}
        </button>
        <button
          type="button"
          className="app-press inline-flex min-h-[var(--touch-min)] min-w-[var(--touch-min)] items-center justify-center border border-[var(--color-gold)]/40 bg-[var(--color-paper)]/92 px-3 font-serif text-[0.65rem] tracking-[0.2em] backdrop-blur-sm"
          aria-expanded={open}
          aria-label="Open menu"
          onClick={() => setOpen(true)}
        >
          Menu
        </button>
      </header>

      {open ? (
        <div className="silk-texture fixed inset-0 z-[70] flex flex-col items-center justify-center bg-[var(--color-paper)] px-[var(--page-x)] pt-[var(--safe-top)] pb-[var(--safe-bottom)]">
          <WeddingMonogram className="mb-8 sm:mb-10" onEasterEgg={triggerPetals} />
          <nav className="flex flex-col items-center gap-5 sm:gap-6">
            {links.map((link) => (
              <button
                key={link.href}
                type="button"
                onClick={() => go(link.href)}
                className="app-press min-h-[var(--touch-min)] px-4 font-serif text-[1.85rem] tracking-[0.16em] text-[var(--color-sindoor)] sm:text-3xl md:text-4xl"
              >
                {language === "bn" ? link.bn : link.en}
              </button>
            ))}
          </nav>
          <button
            type="button"
            onClick={() => setOpen(false)}
            className="app-press mt-12 min-h-[var(--touch-min)] px-6 font-serif text-xs tracking-[0.3em] sm:mt-14"
          >
            Close
          </button>
        </div>
      ) : null}
    </>
  );
}
