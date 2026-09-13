"use client";

import { wedding } from "@/config/wedding";
import { WeddingPhoto } from "@/components/media/WeddingPhoto";
import { FestivalHeading } from "@/components/ui/FestivalHeading";
import { DepthStage } from "@/components/motion/DepthStage";
import { TiltCard } from "@/components/motion/TiltCard";
import { useExperience } from "@/components/providers/ExperienceProvider";

export function OurStory() {
  const { language } = useExperience();
  const chapters = wedding.story;

  return (
    <>
      <section id="story" className="section-pad">
        <DepthStage>
          <FestivalHeading kicker="Our story" title={wedding.storyIntro.title} />
          <blockquote className="mx-auto mt-6 max-w-2xl px-1 text-center font-serif text-[clamp(1.35rem,5.4vw,1.85rem)] italic leading-snug text-[var(--color-navy)] sm:mt-10 sm:text-4xl">
            "{language === "bn" ? wedding.storyIntro.textBn : wedding.storyIntro.text}"
          </blockquote>
        </DepthStage>
      </section>

      <section className="section-pad pt-2 sm:pt-0">
        <DepthStage>
          <FestivalHeading kicker="Our journey" title="A Love in Moments" />
          <div className="relative mx-auto mt-10 max-w-3xl sm:mt-12">
            <span className="absolute left-1/2 top-0 hidden h-full w-px -translate-x-1/2 bg-[var(--color-coral)]/35 md:block" />
            <ol className="space-y-12 sm:space-y-16">
              {chapters.map((chapter, index) => {
                const photoLeft = index % 2 === 1;
                return (
                  <li key={chapter.id} className="grid items-center gap-5 md:grid-cols-2 md:gap-12">
                    <div className={photoLeft ? "text-center md:order-1 md:text-left" : "text-center md:order-2 md:text-right"}>
                      <p className="font-serif text-3xl italic text-[var(--color-coral)] sm:text-5xl">{chapter.year}</p>
                      <h3 className="mt-1 font-serif text-xl text-[var(--color-navy)] sm:mt-2 sm:text-3xl">
                        {language === "bn" ? chapter.titleBn : chapter.title}
                      </h3>
                      <p
                        className={`mx-auto mt-3 max-w-sm font-serif text-[0.98rem] leading-relaxed text-[var(--color-muted)] sm:text-base ${
                          photoLeft ? "md:mx-0" : "md:ml-auto md:mr-0"
                        }`}
                      >
                        {language === "bn" ? chapter.textBn : chapter.text}
                      </p>
                    </div>
                    <div
                      className={`flex justify-center ${
                        photoLeft ? "md:order-2 md:justify-start" : "md:order-1 md:justify-end"
                      }`}
                    >
                      <TiltCard max={8} pressFeedback>
                        <div className="relative">
                          <span className="absolute -left-3 top-1/2 hidden h-3 w-3 -translate-y-1/2 rounded-full bg-[var(--color-coral)] md:block" />
                          <div className="h-40 w-40 overflow-hidden rounded-full sm:h-52 sm:w-52">
                            <WeddingPhoto
                              src={chapter.photo}
                              alt={chapter.photoAlt}
                              className="h-full w-full"
                              sizes="(max-width: 767px) 40vw, 208px"
                            />
                          </div>
                        </div>
                      </TiltCard>
                    </div>
                  </li>
                );
              })}
            </ol>
          </div>
        </DepthStage>
      </section>
    </>
  );
}
