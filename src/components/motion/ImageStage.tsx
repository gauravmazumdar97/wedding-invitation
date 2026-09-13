"use client";

import { useEffect, useRef, type PointerEvent } from "react";
import { WeddingPhoto } from "@/components/media/WeddingPhoto";
import { subscribeScroll } from "@/lib/scroll-bus";
import { usePrefersReducedMotion } from "@/hooks/useMedia";

interface ImageStageProps {
  src: string;
  hoverSrc?: string;
  alt: string;
  className?: string;
  sizes?: string;
  priority?: boolean;
}

/**
 * Haoqi-style photo stage: develop on enter, curl with scroll speed, cell-reveal on hover.
 */
export function ImageStage({ src, hoverSrc, alt, className, sizes, priority }: ImageStageProps) {
  const root = useRef<HTMLDivElement>(null);
  const stage = useRef<HTMLDivElement>(null);
  const reduced = usePrefersReducedMotion();
  const activity = useRef(0);

  useEffect(() => {
    const hold = root.current;
    const node = stage.current;
    if (!hold || !node) return undefined;

    if (reduced) {
      hold.style.setProperty("--develop", "1");
      return undefined;
    }

    const io = new IntersectionObserver(
      (entries) => {
        const entry = entries[0];
        if (!entry) return;
        hold.classList.toggle("is-in", entry.isIntersecting);
        if (!entry.isIntersecting) hold.style.setProperty("--develop", "0");
      },
      { threshold: 0.22 },
    );
    io.observe(hold);

    const unscroll = subscribeScroll(({ velocity, direction }) => {
      const target = Math.min(1, Math.abs(velocity) / 38);
      const attack = target > activity.current ? 0.32 : 0.08;
      activity.current += (target - activity.current) * attack;
      const curl = activity.current * 9 * (direction === 0 ? 1 : direction);
      node.style.transform = `perspective(920px) rotateX(${curl.toFixed(2)}deg) scaleX(${(1 - activity.current * 0.045).toFixed(3)})`;
    });

    return () => {
      io.disconnect();
      unscroll();
      node.style.transform = "";
    };
  }, [reduced]);

  const onMove = (event: PointerEvent<HTMLDivElement>) => {
    if (reduced || event.pointerType !== "mouse" || !root.current) return;
    const rect = event.currentTarget.getBoundingClientRect();
    const mx = ((event.clientX - rect.left) / rect.width) * 100;
    const my = ((event.clientY - rect.top) / rect.height) * 100;
    root.current.style.setProperty("--mx", `${mx.toFixed(1)}%`);
    root.current.style.setProperty("--my", `${my.toFixed(1)}%`);
    root.current.style.setProperty("--reveal", "1");
  };

  const onLeave = () => {
    if (!root.current) return;
    root.current.style.setProperty("--reveal", "0");
  };

  return (
    <div
      ref={root}
      className={`image-stage ${className ?? ""}`}
      onPointerMove={onMove}
      onPointerLeave={onLeave}
    >
      <div ref={stage} className="image-stage-curl relative h-full w-full will-change-transform">
        <WeddingPhoto src={src} alt={alt} className="h-full w-full" sizes={sizes} priority={priority} />
        {hoverSrc && hoverSrc !== src ? (
          <div className="image-stage-hover pointer-events-none absolute inset-0">
            <WeddingPhoto src={hoverSrc} alt={alt} className="h-full w-full" sizes={sizes} />
          </div>
        ) : null}
        <span className="image-stage-grid" aria-hidden />
      </div>
    </div>
  );
}
