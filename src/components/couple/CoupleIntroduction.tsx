"use client";

import { wedding } from "@/config/wedding";
import { WeddingPhoto } from "@/components/media/WeddingPhoto";
import { TiltCard } from "@/components/motion/TiltCard";
import { FestivalHeading } from "@/components/ui/FestivalHeading";
import { DepthStage } from "@/components/motion/DepthStage";
import { useExperience } from "@/components/providers/ExperienceProvider";

export function CoupleIntroduction() {
  const { language } = useExperience();
  const people =
    wedding.couple.nameOrder === "bride-first"
      ? [wedding.couple.bride, wedding.couple.groom]
      : [wedding.couple.groom, wedding.couple.bride];

  return (
    <section className="section-pad">
      <DepthStage>
        <FestivalHeading
          kicker={language === "bn" ? "কনে ও বর" : "The couple"}
          title={language === "bn" ? "যাঁরা বিবাহ করছেন" : "Bride and Groom"}
          bengali={language === "bn" ? undefined : "কনে ও বর"}
        />
        <div className="mx-auto mt-10 grid max-w-4xl gap-8 sm:mt-12 md:grid-cols-2">
          {people.map((person, index) => {
            const isBride =
              (index === 0 && wedding.couple.nameOrder === "bride-first") ||
              (index === 1 && wedding.couple.nameOrder !== "bride-first");
            return (
              <article key={person.fullName}>
                <TiltCard pressFeedback>
                  <div className="festival-card overflow-hidden">
                    <WeddingPhoto
                      src={isBride ? wedding.photos.story1 : wedding.photos.story2}
                      alt={person.fullName}
                      className="aspect-[4/5] w-full"
                      sizes="(max-width: 767px) 92vw, (max-width: 1023px) 44vw, 420px"
                    />
                  </div>
                </TiltCard>
                <p className="festival-kicker mt-5">
                  {isBride
                    ? language === "bn"
                      ? "কনে"
                      : "The Bride"
                    : language === "bn"
                      ? "বর"
                      : "The Groom"}
                </p>
                <h3 className="mt-2 font-serif text-[2rem] leading-tight text-[var(--color-sindoor)] sm:text-4xl">
                  {person.fullName}
                </h3>
                <p className="mt-1 font-bn text-base sm:text-lg">{person.bengaliName}</p>
                <p className="mt-3 text-sm tracking-wide text-[var(--color-muted)]">{person.parents}</p>
                <p className="mt-4 max-w-md font-serif text-base leading-relaxed sm:text-lg">
                  {language === "bn" ? person.shortBioBn : person.shortBio}
                </p>
              </article>
            );
          })}
        </div>
      </DepthStage>
    </section>
  );
}
