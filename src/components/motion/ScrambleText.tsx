"use client";

import { useEffect, useRef } from "react";
import { usePrefersReducedMotion } from "@/hooks/useMedia";

const GLYPHS = "ABCDEFGHKLMNPRSTVWXYZ";

export function ScrambleText({ text, className }: { text: string; className?: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const reduced = usePrefersReducedMotion();

  useEffect(() => {
    const node = ref.current;
    if (!node) return undefined;
    if (reduced) {
      node.textContent = text;
      return undefined;
    }

    let frame = 0;
    let step = 0;
    const latin = /^[\x20-\x7E]+$/.test(text);
    if (!latin) {
      node.textContent = text;
      return undefined;
    }

    const run = () => {
      step += 1;
      const progress = Math.min(1, step / 18);
      const chars = text.split("").map((char, index) => {
        if (char === " ") return " ";
        if (index / text.length < progress) return char;
        return GLYPHS[(index + step * 3) % GLYPHS.length] ?? char;
      });
      node.textContent = chars.join("");
      if (progress < 1) frame = window.requestAnimationFrame(run);
    };

    const io = new IntersectionObserver(
      (entries) => {
        if (!entries[0]?.isIntersecting) return;
        step = 0;
        if (frame) window.cancelAnimationFrame(frame);
        frame = window.requestAnimationFrame(run);
      },
      { threshold: 0.6 },
    );
    io.observe(node);

    return () => {
      io.disconnect();
      if (frame) window.cancelAnimationFrame(frame);
    };
  }, [text, reduced]);

  return (
    <span ref={ref} className={className}>
      {text}
    </span>
  );
}
