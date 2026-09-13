"use client";

import { useEffect, useRef, useState } from "react";
import { wedding } from "@/config/wedding";
import { coupleDisplay } from "@/lib/invite";
import { useExperience } from "@/components/providers/ExperienceProvider";
import { subscribeScroll } from "@/lib/scroll-bus";
import { useIsNarrow, usePrefersReducedMotion } from "@/hooks/useMedia";

const links = [
  { href: "#story", en: wedding.copy.ourStory, bn: wedding.copy.ourStoryBn },
  { href: "#events", en: wedding.copy.events, bn: wedding.copy.eventsBn },
  { href: "#gallery", en: wedding.copy.gallery, bn: wedding.copy.galleryBn },
  { href: "#venue", en: wedding.copy.venue, bn: wedding.copy.venueBn },
  { href: "#rsvp", en: wedding.copy.rsvp, bn: wedding.copy.rsvp },
];

export function Navigation() {
  const { language, setLanguage } = useExperience();
  const { first, second } = coupleDisplay();
  const [open, setOpen] = useState(false);
  const bar = useRef<HTMLDivElement>(null);
  const reduced = usePrefersReducedMotion();
  const narrow = useIsNarrow();

  useEffect(() => {
    return subscribeScroll(({ progress }) => {
      if (bar.current) bar.current.style.transform = `scaleX(${progress})`;
    });
  }, []);

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

  const go = (href: string) => {
    setOpen(false);
    const behavior: ScrollBehavior = reduced ? "auto" : "smooth";
    document.querySelector(href)?.scrollIntoView({ behavior });
  };

  return (
    <>
      <header className="fixed inset-x-0 top-0 z-50">
        <div className="h-[2px] w-full origin-left bg-[var(--color-coral)]/15">
          <div
            ref={bar}
            className="h-full w-full origin-left bg-[var(--color-coral)] will-change-transform"
            style={{ transform: "scaleX(0)" }}
          />
        </div>
        <div
          className={`flex items-center justify-end gap-2 px-[var(--page-x)] pt-[var(--safe-top)] ${
            narrow ? "h-[var(--header-h)] bg-[var(--color-ivory)]/82 backdrop-blur-md" : "h-[var(--header-h)]"
          }`}
        >
          <button
            type="button"
            onClick={() => setLanguage(language === "en" ? "bn" : "en")}
            className="app-press inline-flex min-h-[var(--touch-min)] min-w-[3.25rem] items-center justify-center rounded-full border border-[var(--color-navy)]/15 bg-[var(--color-paper)]/90 px-3 font-sans text-[0.65rem] tracking-[0.18em]"
            aria-label="Toggle language"
          >
            {language === "en" ? "বাংলা" : "EN"}
          </button>
          <button
            type="button"
            className="app-press inline-flex min-h-[var(--touch-min)] min-w-[var(--touch-min)] items-center justify-center rounded-full border border-[var(--color-navy)]/15 bg-[var(--color-paper)]/90 px-3 font-sans text-[0.65rem] tracking-[0.18em]"
            aria-expanded={open}
            aria-label="Open menu"
            onClick={() => setOpen(true)}
          >
            Menu
          </button>
        </div>
      </header>

      {open ? (
        <div className="fixed inset-0 z-[70] flex flex-col bg-[var(--color-ivory)] px-[var(--page-x)] pt-[calc(var(--safe-top)+1rem)] pb-[calc(var(--safe-bottom)+1.25rem)]">
          <div className="flex items-center justify-between">
            <p className="festival-title text-2xl sm:text-3xl">
              {first.firstName} <span className="not-italic text-[var(--color-coral)]">&</span> {second.firstName}
            </p>
            <button
              type="button"
              onClick={() => setOpen(false)}
              className="app-press inline-flex min-h-[var(--touch-min)] min-w-[var(--touch-min)] items-center justify-center rounded-full border border-[var(--color-navy)]/15 font-sans text-xs tracking-[0.22em]"
            >
              Close
            </button>
          </div>
          <nav className="flex flex-1 flex-col items-center justify-center gap-2">
            {links.map((link) => (
              <button
                key={link.href}
                type="button"
                onClick={() => go(link.href)}
                className="app-press min-h-[3.15rem] w-full max-w-sm rounded-2xl px-4 font-serif text-[1.65rem] italic text-[var(--color-navy)] sm:text-4xl"
              >
                {language === "bn" ? link.bn : link.en}
              </button>
            ))}
          </nav>
        </div>
      ) : null}
    </>
  );
}
