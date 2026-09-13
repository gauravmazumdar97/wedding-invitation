"use client";

import { useEffect, useRef } from "react";
import { wedding } from "@/config/wedding";
import { useExperience } from "@/components/providers/ExperienceProvider";

export function MusicControl() {
  const { opened, musicOn, setMusicOn } = useExperience();
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return undefined;

    const fade = (target: number) => {
      const start = audio.volume;
      const startTime = performance.now();
      const step = (now: number) => {
        const t = Math.min(1, (now - startTime) / 700);
        audio.volume = start + (target - start) * t;
        if (t < 1) requestAnimationFrame(step);
      };
      requestAnimationFrame(step);
    };

    if (musicOn) {
      audio.volume = 0;
      const play = audio.play();
      if (play) {
        play.then(() => fade(0.38)).catch(() => setMusicOn(false));
      }
    } else {
      fade(0);
      window.setTimeout(() => audio.pause(), 720);
    }
    return undefined;
  }, [musicOn, setMusicOn]);

  if (!opened) return null;

  return (
    <div className="safe-fixed-bl fixed z-50 pb-[max(0.15rem,env(safe-area-inset-bottom,0px))]">
      <audio ref={audioRef} src={wedding.music.src} loop preload="none" />
      <button
        type="button"
        onClick={() => setMusicOn(!musicOn)}
        aria-pressed={musicOn}
        aria-label={musicOn ? "Pause music" : "Play music"}
        className="app-press inline-flex min-h-[var(--touch-min)] items-center rounded-full border border-[var(--color-navy)]/15 bg-[var(--color-paper)]/92 px-4 py-2 font-sans text-[0.65rem] tracking-[0.22em] text-[var(--color-ink)] backdrop-blur-sm"
      >
        {musicOn ? "Sound on" : "Sound off"}
      </button>
    </div>
  );
}
