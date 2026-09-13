"use client";

import { useRef, useState, type PointerEvent } from "react";
import { wedding } from "@/config/wedding";
import { WeddingPhoto } from "@/components/media/WeddingPhoto";
import { TiltCard } from "@/components/motion/TiltCard";
import { useExperience } from "@/components/providers/ExperienceProvider";
import { useNativeScrollExperience } from "@/hooks/useMedia";

const layout = [
  { x: 8, y: 12, rotate: -6, z: 10 },
  { x: 38, y: 6, rotate: 4, z: 40 },
  { x: 66, y: 16, rotate: -3, z: 20 },
  { x: 12, y: 48, rotate: 5, z: 30 },
  { x: 42, y: 42, rotate: -2, z: 55 },
  { x: 70, y: 50, rotate: 7, z: 15 },
  { x: 22, y: 78, rotate: -5, z: 25 },
  { x: 54, y: 74, rotate: 3, z: 45 },
];

export function MemoryCanvas() {
  const { language } = useExperience();
  const nativeScroll = useNativeScrollExperience();
  const [active, setActive] = useState<number | null>(null);
  const table = useRef<HTMLDivElement>(null);
  const drag = useRef<{ x: number; y: number; ox: number; oy: number } | null>(null);
  const offset = useRef({ x: 0, y: 0 });
  const frame = useRef(0);

  const paint = (x: number, y: number) => {
    if (!table.current) return;
    table.current.style.transform = `translate3d(${x.toFixed(1)}px, ${y.toFixed(1)}px, 0) rotateX(${(y * 0.015).toFixed(2)}deg) rotateY(${(-x * 0.015).toFixed(2)}deg)`;
  };

  const onPointerDown = (event: PointerEvent<HTMLDivElement>) => {
    if (nativeScroll) return;
    drag.current = { x: event.clientX, y: event.clientY, ox: offset.current.x, oy: offset.current.y };
    event.currentTarget.setPointerCapture(event.pointerId);
  };

  const onPointerMove = (event: PointerEvent<HTMLDivElement>) => {
    if (!drag.current) return;
    const nextX = drag.current.ox + event.clientX - drag.current.x;
    const nextY = drag.current.oy + event.clientY - drag.current.y;
    offset.current = { x: nextX, y: nextY };
    if (frame.current) return;
    frame.current = window.requestAnimationFrame(() => {
      frame.current = 0;
      paint(offset.current.x, offset.current.y);
    });
  };

  const endDrag = () => {
    drag.current = null;
  };

  if (nativeScroll) {
    return (
      <section id="gallery" className="section-cv section-pad bg-[var(--color-paper)]">
        <p className="text-center font-bn text-lg text-[var(--color-sindoor)] sm:text-xl">স্মৃতির বাক্স</p>
        <h2 className="mt-2 text-center font-serif text-[2.5rem] leading-tight text-[var(--color-sindoor)] sm:text-5xl">
          Memories
        </h2>
        <p className="mt-3 text-center font-serif text-sm italic text-[var(--color-muted)]">Swipe the prints.</p>
        <div className="touch-scroll-x hidden-scrollbar mt-8 flex gap-4 pb-2 sm:mt-10">
          {wedding.photos.gallery.map((photo) => (
            <figure key={photo.src} className="w-[78vw] max-w-[22rem] shrink-0 snap-center sm:w-[58vw]">
              <WeddingPhoto
                framed
                src={photo.src}
                alt={photo.caption}
                className="aspect-[3/4]"
                sizes="(max-width: 767px) 78vw, 58vw"
              />
              <figcaption className="mt-3 font-serif text-sm italic sm:text-base">
                {language === "bn" ? photo.captionBn : photo.caption}
              </figcaption>
            </figure>
          ))}
        </div>
      </section>
    );
  }

  return (
    <section id="gallery" className="scene-3d section-cv relative overflow-hidden bg-[var(--color-paper)] py-20">
      <div className="px-6 text-center">
        <p className="font-bn text-xl text-[var(--color-sindoor)]">স্মৃতির বাক্স</p>
        <h2 className="mt-2 font-serif text-5xl md:text-7xl">A box of memories</h2>
        <p className="mt-4 font-serif italic text-[var(--color-muted)]">Drag the table. Hover a print. Tap to lift it.</p>
      </div>
      <div
        className="relative mt-10 h-[80vh] cursor-grab active:cursor-grabbing"
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={endDrag}
        onPointerCancel={endDrag}
      >
        <div ref={table} className="preserve-3d absolute inset-0 will-change-transform">
          {wedding.photos.gallery.map((photo, index) => {
            const pos = layout[index] ?? layout[0];
            const isActive = active === index;
            return (
              <button
                key={photo.src}
                type="button"
                data-cursor="hover"
                onClick={() => setActive(isActive ? null : index)}
                className="absolute w-[18rem] origin-center bg-[var(--color-ivory)] p-3 shadow-[0_12px_28px_rgba(42,27,24,0.12)]"
                style={{
                  left: `${pos.x}%`,
                  top: `${pos.y}%`,
                  transform: `translateZ(${isActive ? 70 : pos.z}px) rotateY(${isActive ? 0 : pos.rotate}deg) scale(${isActive ? 1.12 : 1})`,
                  zIndex: isActive ? 20 : 1,
                  transition: "transform 280ms cubic-bezier(0.22, 1, 0.36, 1)",
                }}
              >
                <TiltCard max={7}>
                  <WeddingPhoto src={photo.src} alt={photo.caption} className="aspect-[3/4]" />
                </TiltCard>
                <span className="mt-2 block text-left font-serif text-sm italic">
                  {photo.date} · {language === "bn" ? photo.captionBn : photo.caption}
                </span>
              </button>
            );
          })}
        </div>
      </div>
    </section>
  );
}
