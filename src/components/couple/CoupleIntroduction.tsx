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
    <section className="bg-[var(--color-ivory)] px-6 py-24 md:py-32">
      <div className="mx-auto grid max-w-6xl gap-12 md:grid-cols-2">
        {people.map((person, index) => (
          <article key={person.fullName} className={index === 1 ? "md:mt-16" : ""}>
            <TiltCard>
              <WeddingPhoto
                framed
                src={index === 0 ? wedding.photos.story1 : wedding.photos.story2}
                alt={person.fullName}
                className="aspect-[4/5] w-full"
              />
            </TiltCard>
            <p className="mt-6 font-serif text-[0.7rem] uppercase tracking-[0.35em] text-[var(--color-gold)]">
              {index === 0 && wedding.couple.nameOrder !== "bride-first" ? "The Groom" : index === 0 ? "The Bride" : wedding.couple.nameOrder !== "bride-first" ? "The Bride" : "The Groom"}
            </p>
            <h3 className="mt-2 font-serif text-4xl text-[var(--color-sindoor)]">{person.fullName}</h3>
            <p className="mt-1 font-bn text-lg">{person.bengaliName}</p>
            <p className="mt-4 text-sm tracking-wide text-[var(--color-muted)]">{person.parents}</p>
            <p className="mt-5 max-w-md font-serif text-lg leading-relaxed">
              {language === "bn" ? person.shortBio : person.shortBio}
            </p>
          </article>
        ))}
      </div>
    </section>
  );
}
