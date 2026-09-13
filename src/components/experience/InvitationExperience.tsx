"use client";

import { useEffect, useState } from "react";
import type { Guest, RsvpRecord } from "@/types/guest";
import { ExperienceProvider, useExperience } from "@/components/providers/ExperienceProvider";
import { InvitationLoader } from "@/components/opening/InvitationLoader";
import { InvitationEnvelope } from "@/components/opening/InvitationEnvelope";
import { WeddingHero } from "@/components/hero/WeddingHero";
import { PersonalizedWelcome } from "@/components/welcome/PersonalizedWelcome";
import { SaveTheDate } from "@/components/date/SaveTheDate";
import { CoupleIntroduction } from "@/components/couple/CoupleIntroduction";
import { OurStory } from "@/components/story/OurStory";
import { PhotoReveal } from "@/components/gallery/PhotoReveal";
import { WeddingJourney } from "@/components/journey/WeddingJourney";
import { CinematicGallery } from "@/components/gallery/CinematicGallery";
import { MemoryCanvas } from "@/components/gallery/MemoryCanvas";
import { Countdown } from "@/components/date/Countdown";
import { FamilyBlessings } from "@/components/family/FamilyBlessings";
import { VenueExperience } from "@/components/venue/VenueExperience";
import { TravelInformation } from "@/components/travel/TravelInformation";
import { PersonalNote } from "@/components/note/PersonalNote";
import { RSVPExperience } from "@/components/rsvp/RSVPExperience";
import { FinalScene } from "@/components/finale/FinalScene";
import { Navigation } from "@/components/nav/Navigation";
import { MusicControl } from "@/components/audio/MusicControl";
import { PetalSystem } from "@/components/art/PetalSystem";
import { ScrollCultureLayer } from "@/components/art/ScrollCultureLayer";
import { CustomCursor } from "@/components/ui/CustomCursor";
import { SampleBadge } from "@/components/ui/SampleBadge";
import { wedding, eventsForGuest } from "@/config/wedding";
import { coupleDisplay } from "@/lib/invite";
import { usePrefersReducedMotion } from "@/hooks/useMedia";

function Story({ showLoader }: { showLoader: boolean }) {
  const { opened, setOpened, guest } = useExperience();
  const invited = eventsForGuest(guest.events);
  const { first, second } = coupleDisplay();

  return (
    <>
      <noscript>
        <article className="px-6 py-16">
          <p>{guest.greetingBn}</p>
          <h1>
            {first.fullName} & {second.fullName}
          </h1>
          <p>{wedding.date.display} · {wedding.location.city}</p>
          <ul>
            {invited.map((event) => (
              <li key={event.id}>
                {event.name} · {event.date} · {event.time}
              </li>
            ))}
          </ul>
        </article>
      </noscript>

      {showLoader ? <InvitationLoader /> : null}
      <SampleBadge />
      <PetalSystem />

      {!opened ? (
        <InvitationEnvelope onOpened={() => setOpened(true)} />
      ) : (
        <>
          <CustomCursor />
          <ScrollCultureLayer />
          <Navigation />
          <MusicControl />
          <main>
            <WeddingHero />
            <PersonalizedWelcome />
            <SaveTheDate />
            <CoupleIntroduction />
            <OurStory />
            <PhotoReveal />
            <WeddingJourney />
            <CinematicGallery />
            <MemoryCanvas />
            <Countdown />
            <FamilyBlessings />
            <VenueExperience />
            <TravelInformation />
            <PersonalNote />
            <RSVPExperience />
            <FinalScene />
          </main>
        </>
      )}
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
  const reduced = usePrefersReducedMotion();
  const [showLoader, setShowLoader] = useState(true);

  useEffect(() => {
    const delay = reduced ? 0 : 1600;
    const timer = window.setTimeout(() => setShowLoader(false), delay);
    return () => window.clearTimeout(timer);
  }, [reduced]);

  return (
    <ExperienceProvider guest={guest} existingRsvp={existingRsvp}>
      <Story showLoader={showLoader} />
    </ExperienceProvider>
  );
}
