import { isSamplePreview } from "@/config/wedding";

export function SampleBadge() {
  if (!isSamplePreview) return null;
  return (
    <p className="fixed bottom-5 right-5 z-[60] border border-[var(--color-gold)]/40 bg-[var(--color-paper)] px-3 py-1.5 font-serif text-[0.65rem] tracking-[0.2em] text-[var(--color-muted)]">
      Sample preview
    </p>
  );
}
