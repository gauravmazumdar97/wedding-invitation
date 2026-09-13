"use client";

import { useRef, type ButtonHTMLAttributes, type ReactNode } from "react";
import { cn } from "@/lib/cn";
import { useIsFinePointer, usePrefersReducedMotion } from "@/hooks/useMedia";

interface MagneticButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
}

export function MagneticButton({ children, className, onPointerMove, onPointerLeave, ...props }: MagneticButtonProps) {
  const ref = useRef<HTMLButtonElement>(null);
  const fine = useIsFinePointer();
  const reduced = usePrefersReducedMotion();
  const frame = useRef(0);
  const target = useRef({ x: 0, y: 0 });

  return (
    <button
      ref={ref}
      className={cn("magnetic-btn", className)}
      onPointerMove={(event) => {
        onPointerMove?.(event);
        if (!fine || reduced || !ref.current) return;
        const rect = ref.current.getBoundingClientRect();
        target.current.x = (event.clientX - (rect.left + rect.width / 2)) * 0.28;
        target.current.y = (event.clientY - (rect.top + rect.height / 2)) * 0.28;
        if (frame.current) return;
        frame.current = window.requestAnimationFrame(() => {
          frame.current = 0;
          if (ref.current) {
            ref.current.style.transform = `translate3d(${target.current.x.toFixed(1)}px, ${target.current.y.toFixed(1)}px, 0)`;
          }
        });
      }}
      onPointerLeave={(event) => {
        onPointerLeave?.(event);
        if (frame.current) {
          window.cancelAnimationFrame(frame.current);
          frame.current = 0;
        }
        if (ref.current) ref.current.style.transform = "translate3d(0,0,0)";
      }}
      {...props}
    >
      {children}
    </button>
  );
}
