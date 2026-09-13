"use client";

type ScrollPayload = { y: number; progress: number; velocity: number };
type ScrollListener = (payload: ScrollPayload) => void;

let y = 0;
let progress = 0;
let velocity = 0;
let lastY = 0;
let frame = 0;
let listening = false;
let snapshot: ScrollPayload = { y: 0, progress: 0, velocity: 0 };
const listeners = new Set<ScrollListener>();

function measure(): void {
  y = window.scrollY || 0;
  const max = Math.max(1, document.documentElement.scrollHeight - window.innerHeight);
  progress = Math.min(1, Math.max(0, y / max));
  velocity = y - lastY;
  lastY = y;
  if (snapshot.y !== y || snapshot.progress !== progress || snapshot.velocity !== velocity) {
    snapshot = { y, progress, velocity };
  }
}

function flush(): void {
  frame = 0;
  measure();
  listeners.forEach((listener) => listener(snapshot));
}

function onScroll(): void {
  if (frame) return;
  frame = window.requestAnimationFrame(flush);
}

function ensureListening(): void {
  if (listening) return;
  listening = true;
  measure();
  lastY = y;
  window.addEventListener("scroll", onScroll, { passive: true });
}

function maybeStop(): void {
  if (listeners.size > 0) return;
  listening = false;
  window.removeEventListener("scroll", onScroll);
  if (frame) {
    window.cancelAnimationFrame(frame);
    frame = 0;
  }
}

/** For React useSyncExternalStore: notify with no args. */
export function subscribeScrollChange(onStoreChange: () => void): () => void {
  return subscribeScroll(() => onStoreChange());
}

export function subscribeScroll(listener: ScrollListener): () => void {
  ensureListening();
  listeners.add(listener);
  listener(snapshot);
  return () => {
    listeners.delete(listener);
    maybeStop();
  };
}

export function getScrollSnapshot(): ScrollPayload {
  return snapshot;
}
