"use client";

import { useEffect, useRef } from "react";
import { wedding } from "@/config/wedding";
import { useExperience } from "@/components/providers/ExperienceProvider";

type YouTubePlayer = {
  playVideo: () => void;
  pauseVideo: () => void;
  setVolume: (volume: number) => void;
  destroy: () => void;
};

type YouTubeNamespace = {
  Player: new (
    element: HTMLElement,
    options: {
      width: number;
      height: number;
      videoId: string;
      playerVars: Record<string, string | number>;
      events: {
        onReady: (event: { target: YouTubePlayer }) => void;
        onStateChange?: (event: { data: number; target: YouTubePlayer }) => void;
      };
    },
  ) => YouTubePlayer;
  PlayerState: { ENDED: number };
};

function youtubeApi(): YouTubeNamespace | undefined {
  return (window as Window & { YT?: YouTubeNamespace }).YT;
}

function loadYouTubeApi(): Promise<YouTubeNamespace> {
  const existing = youtubeApi();
  if (existing?.Player) return Promise.resolve(existing);

  return new Promise((resolve) => {
    const win = window as Window & { onYouTubeIframeAPIReady?: () => void };
    const previous = win.onYouTubeIframeAPIReady;
    win.onYouTubeIframeAPIReady = () => {
      previous?.();
      const api = youtubeApi();
      if (api) resolve(api);
    };

    if (!document.querySelector("script[src='https://www.youtube.com/iframe_api']")) {
      const script = document.createElement("script");
      script.src = "https://www.youtube.com/iframe_api";
      document.head.appendChild(script);
    }
  });
}

export function MusicControl() {
  const { opened, musicOn, setMusicOn } = useExperience();
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const hostRef = useRef<HTMLDivElement | null>(null);
  const playerRef = useRef<YouTubePlayer | null>(null);
  const musicOnRef = useRef(musicOn);
  const youtubeId = wedding.music.youtubeId;

  musicOnRef.current = musicOn;

  useEffect(() => {
    if (!youtubeId || !hostRef.current) return undefined;
    const mount = document.createElement("div");
    hostRef.current.appendChild(mount);
    let cancelled = false;

    loadYouTubeApi().then((YT) => {
      if (cancelled) return;
      playerRef.current = new YT.Player(mount, {
        width: 200,
        height: 200,
        videoId: youtubeId,
        playerVars: {
          autoplay: 0,
          controls: 0,
          disablekb: 1,
          fs: 0,
          modestbranding: 1,
          playsinline: 1,
          rel: 0,
          loop: 1,
          playlist: youtubeId,
        },
        events: {
          onReady: (event) => {
            event.target.setVolume(40);
            if (musicOnRef.current) event.target.playVideo();
          },
          onStateChange: (event) => {
            if (event.data === YT.PlayerState.ENDED) event.target.playVideo();
          },
        },
      });
    });

    return () => {
      cancelled = true;
      playerRef.current?.destroy();
      playerRef.current = null;
      mount.remove();
    };
  }, [youtubeId]);

  useEffect(() => {
    if (youtubeId) {
      if (musicOn) playerRef.current?.playVideo();
      else playerRef.current?.pauseVideo();
      return undefined;
    }

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
  }, [musicOn, setMusicOn, youtubeId]);

  return (
    <>
      {youtubeId ? (
        <div
          className="pointer-events-none fixed top-0 -left-[240px] h-[200px] w-[200px] overflow-hidden opacity-0"
          aria-hidden
        >
          <div ref={hostRef} />
        </div>
      ) : (
        <audio ref={audioRef} src={wedding.music.src} loop preload="none" />
      )}
      {opened ? (
        <div className="safe-fixed-bl fixed z-50 pb-[max(0.15rem,env(safe-area-inset-bottom,0px))]">
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
      ) : null}
    </>
  );
}
