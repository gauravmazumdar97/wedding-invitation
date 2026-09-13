"use client";

import { useEffect, useSyncExternalStore } from "react";
import { getScrollSnapshot, subscribeScroll, subscribeScrollChange } from "@/lib/scroll-bus";

/** Progress 0-1, updated at most once per animation frame. */
export function useScrollProgress(): number {
  return useSyncExternalStore(
    subscribeScrollChange,
    () => getScrollSnapshot().progress,
    () => 0,
  );
}

/** Attach a low-cost scroll callback (already RAF-coalesced). */
export function useScrollFrame(
  onFrame: (payload: { y: number; progress: number; velocity: number; direction: -1 | 0 | 1 }) => void,
): void {
  useEffect(() => subscribeScroll(onFrame), [onFrame]);
}
