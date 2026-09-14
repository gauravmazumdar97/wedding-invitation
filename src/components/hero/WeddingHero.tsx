"use client";

import { useEffect, useRef } from "react";
import { wedding } from "@/config/wedding";
import { coupleDisplay } from "@/lib/invite";
import { WeddingPhoto } from "@/components/media/WeddingPhoto";
import { TiltCard } from "@/components/motion/TiltCard";
import { useExperience } from "@/components/providers/ExperienceProvider";
import { useSceneTilt } from "@/hooks/useSceneTilt";
import { subscribeScroll } from "@/lib/scroll-bus";
import { useNativeScrollExperience, usePrefersReducedMotion } from "@/hooks/useMedia";

export function WeddingHero() {
  const { language } = useExperience();
  const { first, second } = coupleDisplay();
  const scrollLayer = useRef<HTMLDivElement>(null);
  const tiltLayer = useRef<HTMLDivElement>(null);
  const sides = useRef<HTMLDivElement[]>([]);
  const title = useRef<HTMLHeadingElement>(null);
  const reduced = usePrefersReducedMotion();
  const nativeScroll = useNativeScrollExperience();
  const portraits = [wedding.photos.story1, wedding.photos.couplePortrait, wedding.photos.story2];

  useSceneTilt(tiltLayer, {
    intensity: nativeScroll ? 7 : 13,
    depth: nativeScroll ? 16 : 28,
    enabled: !reduced,
  });

  useEffect(() => {
    if (reduced) return undefined;
    const amp = nativeScroll ? 0.62 : 1;
    return subscribeScroll(({ y }) => {
      const p = Math.min(1, y / Math.max(220, window.innerHeight * 0.58));
      if (scrollLayer.current) {
        scrollLayer.current.style.transform = `translate3d(0, ${(p * 32 * amp).toFixed(1)}px, ${(-p * 56 * amp).toFixed(1)}px) rotateX(${(p * 12 * amp).toFixed(2)}deg)`;
      }
      sides.current.forEach((node, index) => {
        if (!node) return;
        const outward = index === 1 ? 0 : index === 0 ? -1 : 1;
        node.style.transform = `translate3d(${(outward * p * 42 * amp).toFixed(1)}px, ${(p * 12).toFixed(1)}px, ${(p * -28 * amp).toFixed(1)}px) rotateY(${(outward * p * 26 * amp).toFixed(1)}deg)`;
      });
      if (title.current) {
        title.current.style.transform = `translate3d(0, ${(p * 26 * amp).toFixed(1)}px, 0) scale(${(1 - p * 0.08).toFixed(3)})`;
        title.current.style.opacity = (1 - p * 0.4).toFixed(3);
      }
    });
  }, [reduced, nativeScroll]);

  return (
    <section className="scene-3d relative px-[var(--page-x)] pb-16 pt-[max(4.75rem,calc(var(--safe-top)+3.75rem))] text-center landscape:pb-10 landscape:pt-[max(3.5rem,calc(var(--safe-top)+2.5rem))] sm:pb-24 sm:pt-[max(5.5rem,calc(var(--safe-top)+4.5rem))]">
      <div ref={scrollLayer} className="preserve-3d will-change-transform">
        <div ref={tiltLayer} className="preserve-3d">
          <p className="festival-kicker">{language === "bn" ? wedding.copy.shubhoBibaho : "Shubho Bibaho"}</p>
          <div className="mx-auto mt-7 flex max-w-3xl items-end justify-center gap-3 sm:mt-10 sm:gap-6">
            {portraits.map((src, index) => (
              <div
                key={src}
                className="preserve-3d will-change-transform"
                ref={(node) => {
                  if (node) sides.current[index] = node;
                }}
              >
                <TiltCard max={nativeScroll ? 8 : 14} pressFeedback>
                  <div
                    className={`festival-card overflow-hidden ${
                      index === 1
                        ? "h-[12.5rem] w-[9.25rem] sm:h-80 sm:w-56"
                        : "h-[9.5rem] w-[7rem] sm:h-60 sm:w-44"
                    }`}
                  >
                    <WeddingPhoto
                      priority={index === 1}
                      src={src}
                      alt={first.fullName + " and " + second.fullName}
                      className="h-full w-full object-cover"
                      sizes="(max-width: 767px) 36vw, 224px"
                    />
                  </div>
                </TiltCard>
              </div>
            ))}
          </div>
          <h1
            ref={title}
            className="festival-title mt-7 text-[clamp(2.55rem,12vw,3.4rem)] leading-[0.9] will-change-transform sm:mt-10 sm:text-7xl"
          >
            <span className="block">{first.firstName}</span>
            <span className="my-2 block font-serif text-3xl not-italic text-[var(--color-coral)] sm:text-4xl">&</span>
            <span className="block">{second.firstName}</span>
          </h1>
          <p className="mt-5 font-bn text-base text-[var(--color-maroon)] sm:mt-6 sm:text-lg">
            {first.bengaliName} ও {second.bengaliName}
          </p>
          <p className="mt-4 font-sans text-[0.65rem] uppercase tracking-[0.2em] text-[var(--color-coral)] sm:mt-6 sm:text-[0.68rem] sm:tracking-[0.28em]">
            {language === "bn" ? wedding.date.displayBn : wedding.date.display} · {language === "bn" ? wedding.location.cityBn : wedding.location.city}
            {wedding.location.region ? `, ${wedding.location.region}` : ""}
          </p>
          <p className="festival-card mx-auto mt-4 max-w-sm px-4 py-3 font-serif text-base italic text-[var(--color-muted)] sm:mt-5 sm:px-5 sm:py-4 sm:text-lg">
            {language === "bn" ? wedding.hero.lineBn : wedding.hero.line}
          </p>
        </div>
      </div>
    </section>
  );
}
