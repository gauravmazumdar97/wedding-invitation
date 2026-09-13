"use client";

import { wedding } from "@/config/wedding";
import { Diya, KanthaBorder } from "@/components/art/BengaliMotifs";
import { useExperience } from "@/components/providers/ExperienceProvider";

export function FamilyBlessings() {
  const { language } = useExperience();

  return (
    <section className="section-pad bg-[var(--color-ivory)] md:py-[var(--section-y-lg)]">
      <div className="mx-auto max-w-4xl text-center">
        <Diya className="mx-auto mb-4 h-9 w-12 sm:mb-5 sm:h-10 sm:w-14" />
        <p className="font-bn text-lg text-[var(--color-sindoor)] sm:text-xl">{wedding.families.introBn}</p>
        <h2 className="mt-3 font-serif text-[2.15rem] leading-tight sm:text-4xl md:text-6xl">{wedding.families.intro}</h2>
        <p className="mt-4 font-serif italic text-[var(--color-muted)]">আশীর্বাদ</p>
        <KanthaBorder className="mx-auto mt-6 w-full max-w-sm" />
      </div>
      <div className="mx-auto mt-12 grid max-w-5xl gap-12 sm:mt-16 md:grid-cols-2 md:gap-16">
        <article className="text-center md:text-left">
          <p className="font-serif text-xs uppercase tracking-[0.3em] text-[var(--color-gold)]">{"Bride's family"}</p>
          <ul className="mt-5 space-y-4 sm:mt-6 sm:space-y-5">
            {wedding.families.bride.map((member) => (
              <li key={member.name}>
                <p className="font-serif text-xl sm:text-2xl">{member.name}</p>
                <p className="text-sm text-[var(--color-muted)]">
                  {language === "bn" ? member.relationBn : member.relation}
                </p>
              </li>
            ))}
          </ul>
        </article>
        <article className="text-center md:text-left">
          <p className="font-serif text-xs uppercase tracking-[0.3em] text-[var(--color-gold)]">{"Groom's family"}</p>
          <ul className="mt-5 space-y-4 sm:mt-6 sm:space-y-5">
            {wedding.families.groom.map((member) => (
              <li key={member.name}>
                <p className="font-serif text-xl sm:text-2xl">{member.name}</p>
                <p className="text-sm text-[var(--color-muted)]">
                  {language === "bn" ? member.relationBn : member.relation}
                </p>
              </li>
            ))}
          </ul>
        </article>
      </div>
    </section>
  );
}
