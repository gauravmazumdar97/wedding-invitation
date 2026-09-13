import { cn } from "@/lib/cn";

export function Lotus({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 80 64" className={cn(className)} fill="none" aria-hidden>
      <path d="M40 58c-10-8-18-20-18-32 8 4 14 12 18 22 4-10 10-18 18-22 0 12-8 24-18 32z" fill="#8f1d22" opacity=".85" />
      <path d="M40 56c-8-14-6-30 2-40 2 12 4 24-2 40z" fill="#c23a2b" />
      <path d="M16 40c8-2 16 2 24 12-14 2-24-2-24-12z" fill="#6b2d3c" />
      <path d="M64 40c-8-2-16 2-24 12 14 2 24-2 24-12z" fill="#6b2d3c" />
      <path d="M40 58c8-6 22-8 30-4-10 8-22 10-30 4z" fill="#c4a574" opacity=".7" />
    </svg>
  );
}

export function PaanLeaf({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 48 72" className={cn(className)} fill="none" aria-hidden>
      <path d="M24 4c18 16 22 36 8 62-2-18-8-28-20-34 4-12 8-20 12-28z" fill="#5c6b4a" />
      <path d="M24 10c8 14 10 28 2 48" stroke="#2f3b27" strokeWidth="0.8" />
    </svg>
  );
}

export function CornerAlpana({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 80 80" className={cn(className)} fill="none" aria-hidden>
      <path d="M8 72c4-28 16-48 40-60" stroke="#c4a574" strokeWidth="1" />
      <path d="M16 72c4-20 14-36 32-48" stroke="#8f1d22" strokeWidth="0.7" />
      <circle cx="56" cy="16" r="2.4" fill="#8f1d22" />
      <circle cx="16" cy="64" r="2.4" fill="#c4a574" />
    </svg>
  );
}

export function BengaliArch({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 200 240" className={cn(className)} fill="none" aria-hidden>
      <path d="M20 230V110c0-48 36-86 80-86s80 38 80 86v120" stroke="#c4a574" strokeWidth="1.4" />
      <path d="M36 230V118c0-38 28-68 64-68s64 30 64 68v112" stroke="#8f1d22" strokeWidth="0.7" />
      <path d="M100 28c8 10 22 14 36 10-10 10-10 24 0 34-14-4-28 0-36 14-8-14-22-18-36-14 10-10 10-24 0-34 14 4 28 0 36-10z" fill="#c4a574" opacity=".35" />
    </svg>
  );
}

export function Dhaak({ className, pulsing = false }: { className?: string; pulsing?: boolean }) {
  return (
    <svg viewBox="0 0 120 80" className={cn(pulsing && "animate-[pulse-soft_1.6s_ease-in-out_infinite]", className)} fill="none" aria-hidden>
      <ellipse cx="60" cy="40" rx="38" ry="26" stroke="#c4a574" strokeWidth="1.4" />
      <ellipse cx="60" cy="40" rx="28" ry="18" stroke="#8f1d22" strokeWidth="0.8" />
      <path d="M26 28c-10 4-16 12-16 20s6 16 16 20" stroke="#6b2d3c" />
      <path d="M94 28c10 4 16 12 16 20s-6 16-16 20" stroke="#6b2d3c" />
      <path d="M48 24l4 32M72 24l-4 32" stroke="#c4a574" strokeWidth="0.6" />
    </svg>
  );
}

export function Divider({ className }: { className?: string }) {
  return (
    <div className={cn("flex items-center justify-center gap-3", className)} aria-hidden>
      <span className="h-px w-8 bg-[var(--color-gold)]/70" />
      <Lotus className="h-5 w-6 opacity-80" />
      <span className="h-px w-8 bg-[var(--color-gold)]/70" />
    </div>
  );
}
