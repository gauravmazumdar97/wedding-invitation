"use client";

import { wedding } from "@/config/wedding";
import { DepthStage } from "@/components/motion/DepthStage";
import { TiltCard } from "@/components/motion/TiltCard";
import { FestivalHeading } from "@/components/ui/FestivalHeading";
import { AlpanaIllustration } from "@/components/art/AlpanaIllustration";
import { Dhunuchi, KanthaBorder, Mukut, ShankhaPola, Topor } from "@/components/art/BengaliMotifs";
import { useExperience } from "@/components/providers/ExperienceProvider";

const signs = [
  {
    id: "shankha",
    Motif: ShankhaPola,
    title: "Shankha & Pola",
    titleBn: "শঙ্খ পোলা",
    line: "Ivory conch and sindoor-red bangles, worn as a married blessing.",
    lineBn: "শঙ্খ আর সিঁদুর-লাল পোলা, বিবাহিত আশীর্বাদের চিহ্ন।",
    frame: "h-16 w-32",
  },
  {
    id: "topor",
    Motif: Topor,
    title: "Topor",
    titleBn: "টোপর",
    line: "The groom's sholapith crown, worn only for the mandap.",
    lineBn: "বরের শোলার টোপর, শুধু মণ্ডপের জন্য।",
    frame: "h-24 w-20",
  },
  {
    id: "mukut",
    Motif: Mukut,
    title: "Mukut",
    titleBn: "মুকুট",
    line: "The bride's crown of gold, pith and a drop of sindoor.",
    lineBn: "কনের সোনা, শোলা ও সিঁদুরের মুকুট।",
    frame: "h-20 w-28",
  },
  {
    id: "dhunuchi",
    Motif: Dhunuchi,
    title: "Dhunuchi",
    titleBn: "ধুনুচি",
    line: "Incense and fire for the courtyard dance when the dhaak begins.",
    lineBn: "ঢাক বাজলে আঙ্গিনায় ধুনুচির নৃত্য।",
    frame: "h-24 w-20",
  },
] as const;

export function BengaliTraditions() {
  const { language } = useExperience();
  const copy = wedding.traditions;

  return (
    <section id="traditions" className="section-pad">
      <DepthStage>
        <AlpanaIllustration className="mx-auto mb-6 h-20 w-20 opacity-70 sm:mb-8 sm:h-24 sm:w-24" />
        <FestivalHeading
          kicker={language === "bn" ? copy.kickerBn : copy.kicker}
          title={language === "bn" ? copy.titleBn : copy.title}
          bengali={language === "bn" ? undefined : copy.titleBn}
        />
        <p className="festival-card mx-auto mt-5 max-w-xl px-5 py-6 text-center font-serif text-[1.02rem] italic leading-relaxed text-[var(--color-muted)] sm:mt-6 sm:px-8 sm:py-8 sm:text-xl">
          {language === "bn" ? copy.introBn : copy.intro}
        </p>
        <KanthaBorder className="mx-auto mt-8 w-full max-w-xs opacity-80 sm:mt-10" />

        <div className="mx-auto mt-8 grid max-w-3xl grid-cols-2 gap-3 sm:mt-12 sm:gap-5">
          {signs.map((sign) => (
            <TiltCard key={sign.id} max={10} pressFeedback>
              <article className="festival-card flex min-h-[11.5rem] flex-col items-center px-3 py-6 text-center sm:min-h-[14rem] sm:px-5 sm:py-8">
                <sign.Motif className={sign.frame} />
                <h3 className="mt-4 font-serif text-lg text-[var(--color-navy)] sm:text-2xl">
                  {language === "bn" ? sign.titleBn : sign.title}
                </h3>
                {language === "en" ? (
                  <p className="mt-1 font-bn text-sm text-[var(--color-maroon)]">{sign.titleBn}</p>
                ) : null}
                <p className="mt-2 max-w-[16rem] font-serif text-sm italic leading-relaxed text-[var(--color-muted)] sm:text-base">
                  {language === "bn" ? sign.lineBn : sign.line}
                </p>
              </article>
            </TiltCard>
          ))}
        </div>

        <h3 className="festival-title mx-auto mt-12 max-w-xl text-center text-[clamp(1.45rem,6vw,1.85rem)] sm:mt-16 sm:text-4xl">
          {language === "bn" ? "দিন ও রীতি" : "The days and rites"}
        </h3>
        <ol className="mx-auto mt-7 max-w-xl space-y-3 sm:mt-10 sm:space-y-4">
          {copy.rites.map((rite, index) => (
            <li key={rite.id}>
              <TiltCard max={6} pressFeedback>
                <article className="festival-card flex gap-3 px-4 py-4 sm:gap-5 sm:px-6 sm:py-5">
                  <span className="font-serif text-xl italic text-[var(--color-coral)] sm:text-2xl">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <div className="min-w-0">
                    <h4 className="font-serif text-lg text-[var(--color-navy)] sm:text-xl">
                      {language === "bn" ? rite.titleBn : rite.title}
                    </h4>
                    {language === "en" ? (
                      <p className="font-bn text-sm text-[var(--color-maroon)]">{rite.titleBn}</p>
                    ) : null}
                    <p className="mt-1.5 font-serif text-sm italic leading-relaxed text-[var(--color-muted)] sm:text-base">
                      {language === "bn" ? rite.lineBn : rite.line}
                    </p>
                  </div>
                </article>
              </TiltCard>
            </li>
          ))}
        </ol>
      </DepthStage>
    </section>
  );
}
