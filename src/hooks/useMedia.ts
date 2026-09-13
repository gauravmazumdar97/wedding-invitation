"use client";

import { useEffect, useState } from "react";

export function useMedia(query: string): boolean {
  const [matches, setMatches] = useState(false);

  useEffect(() => {
    const media = window.matchMedia(query);
    const update = () => setMatches(media.matches);
    update();
    media.addEventListener("change", update);
    return () => media.removeEventListener("change", update);
  }, [query]);

  return matches;
}

export function usePrefersReducedMotion(): boolean {
  return useMedia("(prefers-reduced-motion: reduce)");
}

export function useIsFinePointer(): boolean {
  return useMedia("(hover: hover) and (pointer: fine)");
}

export function useIsCoarsePointer(): boolean {
  return useMedia("(pointer: coarse)");
}

/** Phones in portrait/landscape. */
export function useIsMobile(): boolean {
  return useMedia("(max-width: 767px)");
}

/** Tablets and small laptops in the app-layout band. */
export function useIsTablet(): boolean {
  return useMedia("(min-width: 768px) and (max-width: 1023px)");
}

/** Phone + tablet widths. */
export function useIsNarrow(): boolean {
  return useMedia("(max-width: 1023px)");
}

/**
 * Prefer native scroll stacks over GSAP pin/scrub.
 * Covers phones, tablets, and touch-first devices (including large iPads).
 */
export function useNativeScrollExperience(): boolean {
  return useMedia("(max-width: 1023px), (pointer: coarse), (hover: none)");
}
