'use client';

import { useCallback, useEffect, useRef, useState, useSyncExternalStore } from 'react';
import { Pause, Play } from 'lucide-react';
import SloshGauge from '@/components/reactbits/SloshGauge';

// Track: "Melancholic Ambient Background" by Universfield (Pixabay Content License).
const SRC = '/audio/ambient.mp3';
const STORAGE_KEY = 'ambient-volume';

function gainFromGauge(v: number) {
  return Math.pow(v / 100, 1.5) * 0.4;
}

function readSavedVolume() {
  if (typeof window === 'undefined') return 40;
  try {
    const saved = Number(window.localStorage.getItem(STORAGE_KEY));
    return Number.isFinite(saved) ? Math.min(100, Math.max(0, saved)) : 40;
  } catch {
    return 40;
  }
}

export default function AmbientMusic() {
  const mounted = useSyncExternalStore(
    () => () => {},
    () => true,
    () => false
  );
  const [playing, setPlaying] = useState(false);
  const [volume, setVolume] = useState(readSavedVolume);
  const [failed, setFailed] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const ctxRef = useRef<AudioContext | null>(null);
  const masterRef = useRef<GainNode | null>(null);

  useEffect(() => {
    const audio = audioRef.current;
    return () => {
      audio?.pause();
      ctxRef.current?.close().catch(() => {});
      ctxRef.current = null;
      masterRef.current = null;
    };
  }, []);

  const ensureGraph = useCallback(() => {
    const audio = audioRef.current;
    if (!audio) return null;
    let ctx = ctxRef.current;
    if (!ctx) {
      ctx = new AudioContext();
      ctxRef.current = ctx;
      const master = ctx.createGain();
      master.gain.value = gainFromGauge(volume);
      const source = ctx.createMediaElementSource(audio);
      source.connect(master);
      master.connect(ctx.destination);
      masterRef.current = master;
    }
    return ctx;
  }, [volume]);

  useEffect(() => {
    const master = masterRef.current;
    const ctx = ctxRef.current;
    if (!master || !ctx) return;
    master.gain.cancelScheduledValues(ctx.currentTime);
    master.gain.setTargetAtTime(gainFromGauge(volume), ctx.currentTime, 0.4);
  }, [volume]);

  const toggle = useCallback(async () => {
    const audio = audioRef.current;
    if (!audio || failed) return;
    if (!playing) {
      const ctx = ensureGraph();
      if (!ctx) return;
      try {
        await ctx.resume();
      } catch {}
      try {
        await audio.play();
        setPlaying(true);
      } catch {
        setPlaying(false);
      }
    } else {
      audio.pause();
      setPlaying(false);
    }
  }, [playing, failed, ensureGraph]);

  const changeVolume = useCallback((v: number) => {
    setVolume(v);
    try {
      window.localStorage.setItem(STORAGE_KEY, String(v));
    } catch {}
  }, []);

  if (!mounted) return null;

  return (
    <div className="fixed bottom-6 right-6 z-40 flex items-center gap-3 rounded-2xl border border-white/10 bg-black/60 p-3 shadow-xl backdrop-blur-md">
      <audio
        ref={audioRef}
        src={SRC}
        loop
        preload="none"
        aria-hidden="true"
        onError={() => {
          setFailed(true);
          setPlaying(false);
        }}
      />
      <div className="flex flex-col items-center gap-2">
        <button
          type="button"
          onClick={toggle}
          disabled={failed}
          aria-pressed={playing}
          aria-label={
            failed
              ? 'Ambient music unavailable'
              : playing
                ? 'Pause ambient music'
                : 'Play ambient music'
          }
          title={failed ? 'Audio gagal dimuat' : undefined}
          className="rounded-full border border-[#662249] bg-[#44174E]/60 p-2.5 text-[#E9BCB9] transition hover:border-[#ED9E59]/50 hover:text-[#ED9E59] disabled:opacity-40"
        >
          {playing ? <Pause size={16} /> : <Play size={16} />}
        </button>
        <span className="text-[10px] font-mono uppercase tracking-widest text-[#E9BCB9]/50">
          {failed ? 'offline' : playing ? 'playing' : 'ambience'}
        </span>
      </div>
      <SloshGauge
        value={volume}
        onChange={changeVolume}
        interactive={!failed}
        disabled={failed}
        width={56}
        height={118}
        radius={14}
        liquidColor="#ED9E59"
        glassColor="#44174E"
        unit="%"
        ariaLabel="Ambient music volume"
      />
    </div>
  );
}
