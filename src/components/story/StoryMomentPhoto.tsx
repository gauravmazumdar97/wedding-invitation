"use client";

import { useEffect, useId, useState } from "react";
import { createPortal } from "react-dom";
import { WeddingPhoto } from "@/components/media/WeddingPhoto";

export function StoryMomentPhoto({
  photos,
  alt,
}: {
  photos: string[];
  alt: string;
}) {
  const [active, setActive] = useState(0);
  const [open, setOpen] = useState(false);
  const titleId = useId();
  const total = photos.length;
  const current = photos[Math.min(active, total - 1)] ?? photos[0];
  const hasGallery = total > 1;

  useEffect(() => {
    if (!open) return undefined;
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false);
      if (event.key === "ArrowRight") setActive((value) => (value + 1) % total);
      if (event.key === "ArrowLeft") setActive((value) => (value - 1 + total) % total);
    };
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = previous;
      window.removeEventListener("keydown", onKey);
    };
  }, [open, total]);

  const step = (delta: number) => {
    setActive((value) => (value + delta + total) % total);
  };

  return (
    <>
      <div className="relative shrink-0">
        <span className="absolute -left-3 top-1/2 hidden h-3 w-3 -translate-y-1/2 rounded-full bg-[var(--color-coral)] md:block" />
        {hasGallery ? (
          <button
            type="button"
            className="app-press group block shrink-0 text-center focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[var(--color-coral)]"
            onClick={() => setOpen(true)}
            aria-label={`${alt}. View ${total} photos`}
          >
            <div className="aspect-square size-40 overflow-hidden rounded-full sm:size-52">
              <WeddingPhoto
                src={photos[0]}
                alt={alt}
                className="h-full w-full"
                sizes="(max-width: 767px) 40vw, 208px"
              />
            </div>
            <p className="mt-2 font-serif text-sm italic text-[var(--color-coral)] transition group-hover:text-[var(--color-navy)]">
              View photos · {total}
            </p>
          </button>
        ) : (
          <div className="aspect-square size-40 shrink-0 overflow-hidden rounded-full sm:size-52">
            <WeddingPhoto
              src={current}
              alt={alt}
              className="h-full w-full"
              sizes="(max-width: 767px) 40vw, 208px"
            />
          </div>
        )}
      </div>

      {open
        ? createPortal(
            <div
              className="fixed inset-0 z-[80] flex items-center justify-center bg-[rgba(28,18,16,0.88)] px-4 py-8"
              role="dialog"
              aria-modal="true"
              aria-labelledby={titleId}
              onClick={() => setOpen(false)}
            >
              <div className="relative w-full max-w-3xl" onClick={(event) => event.stopPropagation()}>
                <p id={titleId} className="sr-only">
                  {alt}
                </p>
                <div className="relative aspect-[4/3] w-full overflow-hidden rounded-[1.1rem] bg-black/30 sm:aspect-[16/10]">
                  <WeddingPhoto
                    src={current}
                    alt={`${alt} (${active + 1} of ${total})`}
                    className="h-full w-full"
                    sizes="(max-width: 767px) 94vw, 768px"
                    fit="contain"
                  />
                </div>
                <div className="mt-4 flex items-center justify-between gap-3 text-[var(--color-paper)]">
                  <button
                    type="button"
                    className="app-press min-h-[var(--touch-min)] rounded-full border border-white/25 px-4 font-sans text-[0.65rem] tracking-[0.18em]"
                    onClick={() => step(-1)}
                  >
                    Prev
                  </button>
                  <p className="font-serif text-sm italic">
                    {active + 1} / {total}
                  </p>
                  <button
                    type="button"
                    className="app-press min-h-[var(--touch-min)] rounded-full border border-white/25 px-4 font-sans text-[0.65rem] tracking-[0.18em]"
                    onClick={() => step(1)}
                  >
                    Next
                  </button>
                </div>
                <button
                  type="button"
                  className="app-press absolute -top-1 right-0 min-h-[var(--touch-min)] min-w-[var(--touch-min)] rounded-full font-sans text-[0.65rem] tracking-[0.18em] text-white/85"
                  onClick={() => setOpen(false)}
                  aria-label="Close gallery"
                >
                  Close
                </button>
              </div>
            </div>,
            document.body,
          )
        : null}
    </>
  );
}
