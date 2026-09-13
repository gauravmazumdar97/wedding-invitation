"use client";

import { wedding } from "@/config/wedding";
import { DepthStage } from "@/components/motion/DepthStage";

export function PersonalNote() {
  return (
    <section className="section-cv bg-[var(--color-paper)] px-6 py-28 md:py-36">
      <DepthStage className="mx-auto max-w-2xl text-center" intensity={0.75}>
        <p className="font-serif text-xs uppercase tracking-[0.35em] text-[var(--color-gold)]">A note</p>
        <p className="mt-8 font-serif text-2xl leading-relaxed italic md:text-3xl">{wedding.personalNote.text}</p>
        <p className="mt-8 font-bn text-xl leading-relaxed text-[var(--color-maroon)]">{wedding.personalNote.textBn}</p>
        <p className="mt-10 font-serif text-sm tracking-[0.2em]">{wedding.personalNote.from}</p>
      </DepthStage>
    </section>
  );
}
