"use client";

import type { FamilyMember } from "@/types/wedding";
import { wedding } from "@/config/wedding";
import { FestivalHeading } from "@/components/ui/FestivalHeading";
import { DepthStage } from "@/components/motion/DepthStage";
import { TiltCard } from "@/components/motion/TiltCard";
import { useExperience } from "@/components/providers/ExperienceProvider";

const circles: Array<{ id: FamilyMember["circle"]; en: string; bn: string }> = [
  { id: "parents", en: "Parents", bn: "পিতা-মাতা" },
  { id: "siblings", en: "Brothers and sisters", bn: "ভাই-বোন" },
  { id: "elders", en: "With the blessing of", bn: "আশীর্বাদে" },
];

function HouseCard({
  kicker,
  kickerBn,
  house,
  houseBn,
  members,
  language,
}: {
  kicker: string;
  kickerBn: string;
  house: string;
  houseBn: string;
  members: FamilyMember[];
  language: "en" | "bn";
}) {
  return (
    <TiltCard max={6} pressFeedback>
      <article className="festival-card h-full px-5 py-7 text-left sm:px-6 sm:py-8">
        <p className="festival-kicker">{language === "bn" ? kickerBn : kicker}</p>
        <p className="mt-3 font-serif text-[1.45rem] leading-tight text-[var(--color-navy)] sm:text-3xl">
          {language === "bn" ? houseBn : house}
        </p>
        {circles.map((circle) => {
          const group = members.filter((member) => member.circle === circle.id);
          if (!group.length) return null;
          return (
            <div key={circle.id} className="mt-6 border-t border-[var(--color-gold)]/25 pt-5">
              <p className="font-sans text-[0.62rem] uppercase tracking-[0.2em] text-[var(--color-coral)]">
                {language === "bn" ? circle.bn : circle.en}
              </p>
              <ul className="mt-3 space-y-3.5">
                {group.map((member) => (
                  <li key={member.name}>
                    <p className="font-serif text-lg text-[var(--color-navy)] sm:text-xl">
                      {language === "bn" && member.nameBn ? member.nameBn : member.name}
                    </p>
                    <p className="mt-0.5 text-sm italic text-[var(--color-muted)]">
                      {language === "bn" ? member.relationBn : member.relation}
                      {member.note
                        ? ` · ${language === "bn" && member.noteBn ? member.noteBn : member.note}`
                        : ""}
                    </p>
                  </li>
                ))}
              </ul>
            </div>
          );
        })}
      </article>
    </TiltCard>
  );
}

export function FamilyBlessings() {
  const { language } = useExperience();

  return (
    <section className="section-pad">
      <DepthStage>
        <FestivalHeading
          kicker={language === "bn" ? wedding.families.introBn : wedding.families.intro}
          title={language === "bn" ? "আমাদের পরিবার" : "Our Families"}
          bengali={language === "bn" ? undefined : "আমাদের পরিবার"}
        />
        <div className="relative mx-auto mt-10 grid max-w-4xl gap-7 sm:mt-12 md:grid-cols-2 md:items-start md:gap-6">
          <HouseCard
            kicker="Kanyapaksha"
            kickerBn="কন্যাপক্ষ"
            house={wedding.families.brideHouse}
            houseBn={wedding.families.brideHouseBn}
            members={wedding.families.bride}
            language={language}
          />
          <HouseCard
            kicker="Borpaksha"
            kickerBn="বরপক্ষ"
            house={wedding.families.groomHouse}
            houseBn={wedding.families.groomHouseBn}
            members={wedding.families.groom}
            language={language}
          />
        </div>
      </DepthStage>
    </section>
  );
}
