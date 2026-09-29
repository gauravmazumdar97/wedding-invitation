"use client";

import { wedding } from "@/config/wedding";
import { HoverPortrait } from "@/components/couple/HoverPortrait";
import { FestivalHeading } from "@/components/ui/FestivalHeading";
import { DepthStage } from "@/components/motion/DepthStage";
import { useExperience } from "@/components/providers/ExperienceProvider";

export function CoupleIntroduction() {
  const { language } = useExperience();
  const people = [
    {
      person: wedding.couple.groom,
      roleEn: "The Groom",
      roleBn: "বর",
      portrait: wedding.photos.groomPortrait,
      slides: wedding.photos.groomSlideshow,
    },
    {
      person: wedding.couple.bride,
      roleEn: "The Bride",
      roleBn: "কনে",
      portrait: wedding.photos.bridePortrait,
      slides: wedding.photos.brideSlideshow,
    },
  ];

  return (
    <section className="section-pad">
      <DepthStage>
        <FestivalHeading
          kicker={language === "bn" ? "কনে ও বর" : "The couple"}
          title={language === "bn" ? "যাঁরা বিবাহ করছেন" : "Bride and Groom"}
          bengali={language === "bn" ? undefined : "কনে ও বর"}
        />
        <div className="mx-auto mt-10 grid max-w-4xl gap-8 sm:mt-12 md:grid-cols-2">
          {people.map(({ person, roleEn, roleBn, portrait, slides }) => (
            <article key={person.fullName}>
              <HoverPortrait
                key={portrait}
                portrait={portrait}
                slides={slides}
                alt={person.fullName}
              />
              <p className="festival-kicker mt-5">{language === "bn" ? roleBn : roleEn}</p>
              <h3 className="mt-2 font-serif text-[2rem] leading-tight text-[var(--color-sindoor)] sm:text-4xl">
                {person.fullName}
              </h3>
              <p className="mt-1 font-bn text-base sm:text-lg">{person.bengaliName}</p>
              <p className="mt-3 text-sm tracking-wide text-[var(--color-muted)]">{person.parents}</p>
              <p className="mt-4 max-w-md font-serif text-base leading-relaxed sm:text-lg">
                {language === "bn" ? person.shortBioBn : person.shortBio}
              </p>
            </article>
          ))}
        </div>
      </DepthStage>
    </section>
  );
}
