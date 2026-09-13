import { isSamplePreview } from "@/config/wedding";

export function SampleBadge() {
  if (!isSamplePreview) return null;
  return (
    <p className="fixed bottom-5 right-5 z-[60] rounded-full border border-[var(--color-navy)]/10 bg-[var(--color-paper)]/90 px-3 py-1.5 font-sans text-[0.62rem] tracking-[0.2em] text-[var(--color-muted)]">
      Sample preview
    </p>
  );
}
