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

export function useIsMobile(): boolean {
  return useMedia("(max-width: 767px)");
}
