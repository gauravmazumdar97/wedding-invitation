"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/cn";
import { TiltCard } from "@/components/motion/TiltCard";
import { useIsFinePointer, usePrefersReducedMotion } from "@/hooks/useMedia";

/**
 * One portrait card with its own hover slideshow.
 * Frames crossfade; hovering this card never affects another portrait.
 */
export function HoverPortrait({
  portrait,
  slides,
  alt,
}: {
  portrait: string;
  slides: string[];
  alt: string;
}) {
  const sequence = slides.length > 1 ? slides : [portrait];
  const [index, setIndex] = useState(0);
  const [hovering, setHovering] = useState(false);
  const timer = useRef<number>(0);
  const fine = useIsFinePointer();
  const reduced = usePrefersReducedMotion();
  const canSlide = fine && !reduced && sequence.length > 1;

  useEffect(() => {
    setIndex(0);
  }, [portrait]);

  useEffect(() => {
    return () => {
      if (timer.current) window.clearInterval(timer.current);
    };
  }, []);

  const stop = () => {
    if (timer.current) {
      window.clearInterval(timer.current);
      timer.current = 0;
    }
    setHovering(false);
    setIndex(0);
  };

  const start = () => {
    if (!canSlide) return;
    if (timer.current) window.clearInterval(timer.current);
    setHovering(true);
    setIndex(1 % sequence.length);
    timer.current = window.setInterval(() => {
      setIndex((current) => (current + 1) % sequence.length);
    }, 2400);
  };

  return (
    <TiltCard pressFeedback>
      <div
        className="festival-card overflow-hidden"
        onPointerEnter={start}
        onPointerLeave={stop}
        onPointerCancel={stop}
      >
        <figure className="relative aspect-[4/5] w-full overflow-hidden bg-[var(--color-beige)]">
          {sequence.map((src, frame) => {
            const visible = frame === index;
            return (
              <Image
                key={src}
                src={src}
                alt={visible ? alt : ""}
                fill
                sizes="(max-width: 767px) 92vw, (max-width: 1023px) 44vw, 420px"
                priority={frame === 0}
                aria-hidden={!visible}
                className={cn(
                  "object-cover will-change-[opacity,transform]",
                  reduced ? "" : "portrait-slide",
                  visible && hovering && "is-active",
                  visible && !hovering && "is-idle",
                  !visible && "is-hidden",
                  reduced && (visible ? "opacity-100" : "opacity-0"),
                )}
              />
            );
          })}
        </figure>
      </div>
    </TiltCard>
  );
}
