"use client";

import { wedding } from "@/config/wedding";
import { FestivalHeading } from "@/components/ui/FestivalHeading";
import { DepthStage } from "@/components/motion/DepthStage";
import { TiltCard } from "@/components/motion/TiltCard";
import { useExperience } from "@/components/providers/ExperienceProvider";

function familyLine(members: { name: string }[]) {
  const last = members[0]?.name.split(" ").slice(-1)[0] ?? "";
  const firsts = members.map((member) => member.name.replace(` ${last}`, "").trim());
  if (firsts.length >= 2) {
    return `${firsts[0]} & ${firsts[1]} ${last}`;
  }
  return members.map((member) => member.name).join(" & ");
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
        <div className="relative mx-auto mt-10 grid max-w-3xl gap-7 text-center sm:mt-12 md:grid-cols-[1fr_auto_1fr] md:items-center md:gap-6">
          <TiltCard max={8} pressFeedback>
          <article className="festival-card px-5 py-7">
            <p className="festival-kicker">{language === "bn" ? "কন্যাপক্ষ" : "Kanyapaksha"}</p>
            <p className="mt-1 font-bn text-sm text-[var(--color-maroon)]">{language === "bn" ? "Bride's house" : "কন্যাপক্ষ"}</p>
            <p className="mt-3 font-serif text-[1.45rem] text-[var(--color-navy)] sm:mt-4 sm:text-3xl">
              {familyLine(wedding.families.bride)}
            </p>
            <p className="mt-2 font-serif italic text-[var(--color-muted)]">
              {language === "bn" ? "কনের পিতা-মাতা" : "Parents of the Bride"}
            </p>
          </article>
          </TiltCard>
          <p className="font-serif text-3xl italic text-[var(--color-coral)] sm:text-4xl" aria-hidden>
            &
          </p>
          <TiltCard max={8} pressFeedback>
          <article className="festival-card px-5 py-7">
            <p className="festival-kicker">{language === "bn" ? "বরপক্ষ" : "Borpaksha"}</p>
            <p className="mt-1 font-bn text-sm text-[var(--color-maroon)]">{language === "bn" ? "Groom's house" : "বরপক্ষ"}</p>
            <p className="mt-3 font-serif text-[1.45rem] text-[var(--color-navy)] sm:mt-4 sm:text-3xl">
              {familyLine(wedding.families.groom)}
            </p>
            <p className="mt-2 font-serif italic text-[var(--color-muted)]">
              {language === "bn" ? "বরের পিতা-মাতা" : "Parents of the Groom"}
            </p>
          </article>
          </TiltCard>
        </div>
      </DepthStage>
    </section>
  );
}
