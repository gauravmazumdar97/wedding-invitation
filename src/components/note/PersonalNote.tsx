"use client";

import { wedding } from "@/config/wedding";
import { DepthStage } from "@/components/motion/DepthStage";

export function PersonalNote() {
  return (
    <section className="section-cv section-pad-lg bg-[var(--color-paper)]">
      <DepthStage className="mx-auto max-w-2xl text-center" intensity={0.75}>
        <p className="font-serif text-xs uppercase tracking-[0.35em] text-[var(--color-gold)]">A note</p>
        <p className="mt-6 font-serif text-xl leading-relaxed italic sm:mt-8 sm:text-2xl md:text-3xl">
          {wedding.personalNote.text}
        </p>
        <p className="mt-6 font-bn text-lg leading-relaxed text-[var(--color-maroon)] sm:mt-8 sm:text-xl">
          {wedding.personalNote.textBn}
        </p>
        <p className="mt-8 font-serif text-sm tracking-[0.2em] sm:mt-10">{wedding.personalNote.from}</p>
      </DepthStage>
    </section>
  );
}
