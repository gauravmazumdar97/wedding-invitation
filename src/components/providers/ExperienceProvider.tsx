"use client";

import { createContext, useContext, useMemo, useState, type ReactNode } from "react";
import type { Language } from "@/types/wedding";
import type { Guest } from "@/types/guest";
import type { RsvpRecord } from "@/types/guest";

interface ExperienceContextValue {
  guest: Guest;
  language: Language;
  setLanguage: (language: Language) => void;
  opened: boolean;
  setOpened: (opened: boolean) => void;
  musicOn: boolean;
  setMusicOn: (on: boolean) => void;
  rsvpOpen: boolean;
  setRsvpOpen: (open: boolean) => void;
  existingRsvp: RsvpRecord | null;
  petalBurst: number;
  triggerPetals: () => void;
}

const ExperienceContext = createContext<ExperienceContextValue | null>(null);

export function ExperienceProvider({
  guest,
  existingRsvp,
  children,
}: {
  guest: Guest;
  existingRsvp: RsvpRecord | null;
  children: ReactNode;
}) {
  const [language, setLanguage] = useState<Language>("en");
  const [opened, setOpened] = useState(true);
  const [musicOn, setMusicOn] = useState(false);
  const [rsvpOpen, setRsvpOpen] = useState(false);
  const [petalBurst, setPetalBurst] = useState(0);

  const value = useMemo(
    () => ({
      guest,
      language,
      setLanguage,
      opened,
      setOpened,
      musicOn,
      setMusicOn,
      rsvpOpen,
      setRsvpOpen,
      existingRsvp,
      petalBurst,
      triggerPetals: () => setPetalBurst((count) => count + 1),
    }),
    [guest, language, opened, musicOn, rsvpOpen, existingRsvp, petalBurst],
  );

  return <ExperienceContext.Provider value={value}>{children}</ExperienceContext.Provider>;
}

export function useExperience(): ExperienceContextValue {
  const value = useContext(ExperienceContext);
  if (!value) {
    throw new Error("useExperience must be used within ExperienceProvider");
  }
  return value;
}
