"use client";

import { useEffect, useState } from "react";
import { wedding } from "@/config/wedding";
import { WeddingPhoto } from "@/components/media/WeddingPhoto";
import { FestivalHeading } from "@/components/ui/FestivalHeading";
import { DepthStage } from "@/components/motion/DepthStage";
import { TiltCard } from "@/components/motion/TiltCard";
import { useExperience } from "@/components/providers/ExperienceProvider";

const mosaic = [
  "col-span-2 row-span-2",
  "col-span-1 row-span-1",
  "col-span-1 row-span-1",
  "col-span-1 row-span-1",
  "col-span-1 row-span-1",
  "col-span-2 row-span-1 sm:col-span-1",
];

export function MemoryCanvas() {
  const { language } = useExperience();
  const [active, setActive] = useState<string | null>(null);
  const photos = wedding.photos.gallery.slice(0, 6);

  useEffect(() => {
    document.body.classList.toggle("lightbox-locked", Boolean(active));
    return () => document.body.classList.remove("lightbox-locked");
  }, [active]);

  return (
    <section id="gallery" className="section-pad">
      <DepthStage>
        <FestivalHeading kicker="Our photos" title="Captured Together" />
        <div className="mx-auto mt-8 grid max-w-4xl grid-cols-2 gap-2.5 sm:mt-12 sm:grid-cols-3 sm:gap-4">
          {photos.map((photo, index) => (
            <TiltCard key={photo.src} max={6} pressFeedback wrapperClassName={`h-full ${mosaic[index] ?? ""}`}>
            <button
              type="button"
              onClick={() => setActive(photo.src)}
              className="festival-card app-press h-full w-full overflow-hidden"
            >
              <WeddingPhoto
                src={photo.src}
                alt={language === "bn" ? photo.captionBn : photo.caption}
                className="aspect-square h-full min-h-[7.5rem] w-full sm:min-h-[11rem]"
                sizes={index === 0 ? "(max-width: 767px) 100vw, 720px" : "(max-width: 767px) 100vw, 420px"}
                quality={92}
              />
            </button>
            </TiltCard>
          ))}
        </div>
      </DepthStage>

      {active ? (
        <div
          className="fixed inset-0 z-[80] flex items-center justify-center bg-[rgba(42,51,68,0.58)] px-[var(--page-x)] pt-[var(--safe-top)] pb-[var(--safe-bottom)]"
          onClick={() => setActive(null)}
        >
          <button
            type="button"
            className="app-press absolute right-[var(--page-x-end)] top-[calc(var(--safe-top)+0.75rem)] inline-flex min-h-[var(--touch-min)] min-w-[var(--touch-min)] items-center justify-center rounded-full bg-[var(--color-paper)] font-sans text-xs tracking-[0.2em]"
            onClick={() => setActive(null)}
          >
            Close
          </button>
          <div
            className="festival-card relative h-[min(78vh,720px)] w-full max-w-5xl overflow-hidden"
            onClick={(event) => event.stopPropagation()}
          >
            <WeddingPhoto
              src={active}
              alt="Gallery photograph"
              className="h-full w-full"
              sizes="(max-width: 767px) 100vw, 1200px"
              quality={95}
              fit="contain"
            />
          </div>
        </div>
      ) : null}
    </section>
  );
}
