"use client";

import type { Guest, RsvpRecord } from "@/types/guest";
import { ExperienceProvider } from "@/components/providers/ExperienceProvider";
import { WeddingHero } from "@/components/hero/WeddingHero";
import { PersonalNote } from "@/components/note/PersonalNote";
import { OurStory } from "@/components/story/OurStory";
import { MemoryCanvas } from "@/components/gallery/MemoryCanvas";
import { ClosingQuote } from "@/components/finale/FinalScene";
import { Countdown } from "@/components/date/Countdown";
import { WeddingJourney } from "@/components/journey/WeddingJourney";
import { VenueExperience } from "@/components/venue/VenueExperience";
import { FamilyBlessings } from "@/components/family/FamilyBlessings";
import { BlessingsWall } from "@/components/blessings/BlessingsWall";
import { RSVPExperience } from "@/components/rsvp/RSVPExperience";
import { Navigation } from "@/components/nav/Navigation";
import { MusicControl } from "@/components/audio/MusicControl";
import { PetalSystem } from "@/components/art/PetalSystem";
import { CustomCursor } from "@/components/ui/CustomCursor";
import { SampleBadge } from "@/components/ui/SampleBadge";
import { ScrollAtmosphere } from "@/components/motion/ScrollAtmosphere";
import { ScrollHint } from "@/components/motion/ScrollHint";
import { wedding } from "@/config/wedding";
import { coupleDisplay } from "@/lib/invite";

function Story() {
  const { first, second } = coupleDisplay();

  return (
    <>
      <noscript>
        <article className="px-6 py-16">
          <h1>
            {first.fullName} & {second.fullName}
          </h1>
          <p>
            {wedding.date.display} · {wedding.location.city}
          </p>
        </article>
      </noscript>

      <SampleBadge />
      <CustomCursor />
      <ScrollAtmosphere />
      <PetalSystem />
      <Navigation />
      <MusicControl />
      <ScrollHint />
      <main className="app-shell relative z-[2]">
        <WeddingHero />
        <PersonalNote />
        <OurStory />
        <MemoryCanvas />
        <ClosingQuote />
        <Countdown />
        <WeddingJourney />
        <VenueExperience />
        <FamilyBlessings />
        <BlessingsWall />
        <RSVPExperience />
      </main>
    </>
  );
}

export function InvitationExperience({
  guest,
  existingRsvp,
}: {
  guest: Guest;
  existingRsvp: RsvpRecord | null;
}) {
  return (
    <ExperienceProvider guest={guest} existingRsvp={existingRsvp}>
      <Story />
    </ExperienceProvider>
  );
}
