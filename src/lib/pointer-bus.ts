"use client";

export type PointerPayload = {
  x: number;
  y: number;
  nx: number;
  ny: number;
  clientX: number;
  clientY: number;
  inside: boolean;
};

type PointerListener = (payload: PointerPayload) => void;

let x = 0.5;
let y = 0.5;
let nx = 0;
let ny = 0;
let clientX = 0;
let clientY = 0;
let inside = false;
let frame = 0;
let listening = false;
let snapshot: PointerPayload = { x: 0.5, y: 0.5, nx: 0, ny: 0, clientX: 0, clientY: 0, inside: false };
const listeners = new Set<PointerListener>();

function write(next: PointerPayload): void {
  x = next.x;
  y = next.y;
  nx = next.nx;
  ny = next.ny;
  clientX = next.clientX;
  clientY = next.clientY;
  inside = next.inside;
  snapshot = next;
}

function flush(): void {
  frame = 0;
  listeners.forEach((listener) => listener(snapshot));
}

function schedule(): void {
  if (frame) return;
  frame = window.requestAnimationFrame(flush);
}

function fromClient(cx: number, cy: number, isInside: boolean): PointerPayload {
  const width = Math.max(1, window.innerWidth);
  const height = Math.max(1, window.innerHeight);
  const px = Math.min(1, Math.max(0, cx / width));
  const py = Math.min(1, Math.max(0, cy / height));
  return {
    x: px,
    y: py,
    nx: px * 2 - 1,
    ny: py * 2 - 1,
    clientX: cx,
    clientY: cy,
    inside: isInside,
  };
}

function settleCenter(): void {
  write({
    x: 0.5,
    y: 0.5,
    nx: 0,
    ny: 0,
    clientX: window.innerWidth / 2,
    clientY: window.innerHeight / 2,
    inside: false,
  });
  schedule();
}

function onPointerMove(event: PointerEvent): void {
  write(fromClient(event.clientX, event.clientY, true));
  schedule();
}

function onPointerLeave(): void {
  settleCenter();
}

function onVisibility(): void {
  if (document.visibilityState !== "visible") settleCenter();
}

function ensureListening(): void {
  if (listening) return;
  listening = true;
  window.addEventListener("pointermove", onPointerMove, { passive: true });
  document.addEventListener("pointerleave", onPointerLeave);
  window.addEventListener("blur", onPointerLeave);
  document.addEventListener("visibilitychange", onVisibility);
}

function maybeStop(): void {
  if (listeners.size > 0) return;
  listening = false;
  window.removeEventListener("pointermove", onPointerMove);
  document.removeEventListener("pointerleave", onPointerLeave);
  window.removeEventListener("blur", onPointerLeave);
  document.removeEventListener("visibilitychange", onVisibility);
  if (frame) {
    window.cancelAnimationFrame(frame);
    frame = 0;
  }
}

export function subscribePointer(listener: PointerListener): () => void {
  ensureListening();
  listeners.add(listener);
  listener(snapshot);
  return () => {
    listeners.delete(listener);
    maybeStop();
  };
}

export function getPointerSnapshot(): PointerPayload {
  return snapshot;
}
