"use client";

import { useRef, type ReactNode } from "react";
import { cn } from "@/lib/cn";
import { useIsFinePointer, usePrefersReducedMotion } from "@/hooks/useMedia";

interface TiltCardProps {
  children: ReactNode;
  className?: string;
  wrapperClassName?: string;
  max?: number;
}

export function TiltCard({ children, className, wrapperClassName, max = 12 }: TiltCardProps) {
  const ref = useRef<HTMLDivElement>(null);
  const shine = useRef<HTMLDivElement>(null);
  const fine = useIsFinePointer();
  const reduced = usePrefersReducedMotion();
  const frame = useRef(0);
  const target = useRef({ x: 0, y: 0 });

  const reset = () => {
    if (frame.current) window.cancelAnimationFrame(frame.current);
    if (!ref.current) return;
    ref.current.style.transform = "translate3d(0,0,0) rotateX(0deg) rotateY(0deg) scale(1)";
    if (shine.current) shine.current.style.opacity = "0";
  };

  return (
    <div className={cn("[perspective:1000px]", wrapperClassName)}>
      <div
        ref={ref}
        data-cursor="hover"
        className={cn("relative will-change-transform", className)}
        style={{
          transformStyle: "preserve-3d",
          transition: "transform 160ms cubic-bezier(0.33, 1, 0.68, 1)",
        }}
        onPointerMove={(event) => {
          if (!fine || reduced || max <= 0 || !ref.current) return;
          const rect = event.currentTarget.getBoundingClientRect();
          target.current.x = (event.clientX - rect.left) / rect.width - 0.5;
          target.current.y = (event.clientY - rect.top) / rect.height - 0.5;
          if (frame.current) return;
          frame.current = window.requestAnimationFrame(() => {
            frame.current = 0;
            if (!ref.current) return;
            const { x, y } = target.current;
            ref.current.style.transform = `translate3d(0,0,18px) rotateY(${x * max * 2}deg) rotateX(${-y * max * 2}deg) scale(1.015)`;
            if (shine.current) {
              shine.current.style.opacity = "0.85";
              shine.current.style.background = `radial-gradient(circle at ${50 + x * 70}% ${50 + y * 70}%, rgba(255,255,255,0.26), transparent 55%)`;
            }
          });
        }}
        onPointerLeave={reset}
      >
        {children}
        <div ref={shine} className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-150" />
      </div>
    </div>
  );
}
