"use client";

import { cn } from "@/lib/cn";

interface AlpanaIllustrationProps {
  className?: string;
  drawn?: boolean;
}

export function AlpanaIllustration({ className, drawn = true }: AlpanaIllustrationProps) {
  return (
    <svg
      viewBox="0 0 400 400"
      className={cn("overflow-visible", className)}
      fill="none"
      aria-hidden
    >
      <g
        stroke="#8f1d22"
        strokeWidth="1.1"
        pathLength={1}
        className={drawn ? "draw-stroke" : ""}
        style={{ strokeDasharray: 1, strokeDashoffset: drawn ? undefined : 1 }}
      >
        <circle cx="200" cy="200" r="28" />
        <circle cx="200" cy="200" r="72" />
        <path d="M200 40c22 36 52 52 88 48-24 28-28 64 0 96-36-4-66 12-88 48-22-36-52-52-88-48 24-28 28-64 0-96 36 4 66-12 88-48z" />
        <path d="M200 92c12 18 28 26 46 24-12 14-14 32 0 48-18-2-34 6-46 24-12-18-28-26-46-24 12-14 14-32 0-48 18 2 34-6 46-24z" />
        <circle cx="200" cy="86" r="5" />
        <circle cx="200" cy="314" r="5" />
        <circle cx="86" cy="200" r="5" />
        <circle cx="314" cy="200" r="5" />
        <path d="M200 12c8 22 24 28 44 24-16 16-16 36 0 52-20-4-36 2-44 24-8-22-24-28-44-24 16-16 16-36 0-52 20 4 36-2 44-24z" />
      </g>
    </svg>
  );
}
