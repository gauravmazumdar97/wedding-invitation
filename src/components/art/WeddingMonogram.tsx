"use client";

import { wedding } from "@/config/wedding";
import { cn } from "@/lib/cn";

interface WeddingMonogramProps {
  className?: string;
  size?: "sm" | "md" | "lg";
  onEasterEgg?: () => void;
  decorative?: boolean;
}

export function WeddingMonogram({ className, size = "md", onEasterEgg, decorative = false }: WeddingMonogramProps) {
  const { left, right, joiner } = wedding.couple.monogram;
  const sizes = {
    sm: "h-16 w-16 text-lg",
    md: "h-28 w-28 text-3xl",
    lg: "h-40 w-40 text-5xl",
  };

  const body = (
    <>
      <svg viewBox="0 0 200 200" className="absolute inset-0 h-full w-full" aria-hidden>
        <circle cx="100" cy="100" r="92" fill="none" stroke="#c4a574" strokeWidth="0.6" />
        <circle cx="100" cy="100" r="84" fill="none" stroke="#8f1d22" strokeWidth="0.4" opacity="0.5" />
        <path
          d="M100 18 C108 34 122 40 138 38 C126 52 124 70 100 78 C76 70 74 52 62 38 C78 40 92 34 100 18 Z"
          fill="none"
          stroke="#c4a574"
          strokeWidth="0.8"
        />
        <path
          d="M100 182 C92 166 78 160 62 162 C74 148 76 130 100 122 C124 130 126 148 138 162 C122 160 108 166 100 182 Z"
          fill="none"
          stroke="#c4a574"
          strokeWidth="0.8"
        />
        <path d="M28 100 C40 86 58 78 78 86" fill="none" stroke="#8f1d22" strokeWidth="0.6" />
        <path d="M172 100 C160 114 142 122 122 114" fill="none" stroke="#8f1d22" strokeWidth="0.6" />
      </svg>
      <span className="font-serif tracking-[0.18em] transition-transform duration-500 group-hover:scale-105">
        {left} <span className="text-[0.55em] text-[var(--color-gold)]">{joiner}</span> {right}
      </span>
    </>
  );

  const frameClass = cn(
    "group relative grid place-items-center rounded-full text-[var(--color-sindoor)]",
    sizes[size],
    className,
  );

  if (decorative) {
    return <div className={frameClass}>{body}</div>;
  }

  return (
    <button
      type="button"
      aria-label={`${left} ${joiner} ${right} wedding monogram`}
      onClick={onEasterEgg}
      className={frameClass}
    >
      {body}
    </button>
  );
}
