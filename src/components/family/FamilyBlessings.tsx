"use client";

import { wedding } from "@/config/wedding";
import { Diya, KanthaBorder } from "@/components/art/BengaliMotifs";
import { useExperience } from "@/components/providers/ExperienceProvider";

export function FamilyBlessings() {
  const { language } = useExperience();

  return (
    <section className="bg-[var(--color-ivory)] px-6 py-24 md:py-32">
      <div className="mx-auto max-w-4xl text-center">
        <Diya className="mx-auto mb-5 h-10 w-14" />
        <p className="font-bn text-xl text-[var(--color-sindoor)]">{wedding.families.introBn}</p>
        <h2 className="mt-3 font-serif text-4xl md:text-6xl">{wedding.families.intro}</h2>
        <p className="mt-4 font-serif italic text-[var(--color-muted)]">আশীর্বাদ</p>
        <KanthaBorder className="mx-auto mt-6 w-full max-w-sm" />
      </div>
      <div className="mx-auto mt-16 grid max-w-5xl gap-16 md:grid-cols-2">
        <article>
          <p className="font-serif text-xs uppercase tracking-[0.3em] text-[var(--color-gold)]">{"Bride's family"}</p>
          <ul className="mt-6 space-y-5">
            {wedding.families.bride.map((member) => (
              <li key={member.name}>
                <p className="font-serif text-2xl">{member.name}</p>
                <p className="text-sm text-[var(--color-muted)]">
                  {language === "bn" ? member.relationBn : member.relation}
                </p>
              </li>
            ))}
          </ul>
        </article>
        <article>
          <p className="font-serif text-xs uppercase tracking-[0.3em] text-[var(--color-gold)]">{"Groom's family"}</p>
          <ul className="mt-6 space-y-5">
            {wedding.families.groom.map((member) => (
              <li key={member.name}>
                <p className="font-serif text-2xl">{member.name}</p>
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
