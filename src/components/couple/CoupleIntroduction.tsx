"use client";

import { wedding } from "@/config/wedding";
import { WeddingPhoto } from "@/components/media/WeddingPhoto";
import { TiltCard } from "@/components/motion/TiltCard";
import { useExperience } from "@/components/providers/ExperienceProvider";

export function CoupleIntroduction() {
  const { language } = useExperience();
  const people =
    wedding.couple.nameOrder === "bride-first"
      ? [wedding.couple.bride, wedding.couple.groom]
      : [wedding.couple.groom, wedding.couple.bride];

  return (
    <section className="section-pad bg-[var(--color-ivory)] md:py-[var(--section-y-lg)]">
      <div className="mx-auto grid max-w-6xl gap-10 sm:gap-12 md:grid-cols-2">
        {people.map((person, index) => (
          <article key={person.fullName} className={index === 1 ? "md:mt-16" : ""}>
            <TiltCard pressFeedback>
              <WeddingPhoto
                framed
                src={index === 0 ? wedding.photos.story1 : wedding.photos.story2}
                alt={person.fullName}
                className="aspect-[4/5] w-full"
                sizes="(max-width: 767px) 92vw, (max-width: 1023px) 44vw, 520px"
              />
            </TiltCard>
            <p className="mt-5 font-serif text-[0.7rem] uppercase tracking-[0.35em] text-[var(--color-gold)] sm:mt-6">
              {index === 0 && wedding.couple.nameOrder !== "bride-first" ? "The Groom" : index === 0 ? "The Bride" : wedding.couple.nameOrder !== "bride-first" ? "The Bride" : "The Groom"}
            </p>
            <h3 className="mt-2 font-serif text-[2.15rem] leading-tight text-[var(--color-sindoor)] sm:text-4xl">
              {person.fullName}
            </h3>
            <p className="mt-1 font-bn text-base sm:text-lg">{person.bengaliName}</p>
            <p className="mt-3 text-sm tracking-wide text-[var(--color-muted)] sm:mt-4">{person.parents}</p>
            <p className="mt-4 max-w-md font-serif text-base leading-relaxed sm:mt-5 sm:text-lg">
              {language === "bn" ? person.shortBio : person.shortBio}
            </p>
          </article>
        ))}
      </div>
    </section>
  );
}
