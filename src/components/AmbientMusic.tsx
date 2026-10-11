'use client';

import { useCallback, useEffect, useRef, useState } from 'react';
import { Pause, Play } from 'lucide-react';
import SloshGauge from '@/components/reactbits/SloshGauge';

const CHORD = [174.61, 220.0, 261.63, 349.23];
const STORAGE_KEY = 'ambient-volume';

function gainFromGauge(v: number) {
  return Math.pow(v / 100, 1.5) * 0.4;
}

export default function AmbientMusic() {
  const [mounted, setMounted] = useState(false);
  const [playing, setPlaying] = useState(false);
  const [volume, setVolume] = useState(40);
  const ctxRef = useRef<AudioContext | null>(null);
  const masterRef = useRef<GainNode | null>(null);

  useEffect(() => {
    setMounted(true);
    try {
      const saved = Number(window.localStorage.getItem(STORAGE_KEY));
      if (Number.isFinite(saved)) setVolume(Math.min(100, Math.max(0, saved)));
    } catch {}
    return () => {
      ctxRef.current?.close().catch(() => {});
      ctxRef.current = null;
      masterRef.current = null;
    };
  }, []);

  const ensureGraph = useCallback(() => {
    let ctx = ctxRef.current;
    if (!ctx) {
      ctx = new AudioContext();
      ctxRef.current = ctx;
      const master = ctx.createGain();
      master.gain.value = 0;
      const filter = ctx.createBiquadFilter();
      filter.type = 'lowpass';
      filter.frequency.value = 700;
      filter.Q.value = 0.4;
      master.connect(filter);
      filter.connect(ctx.destination);
      masterRef.current = master;

      const breathe = ctx.createOscillator();
      breathe.type = 'sine';
      breathe.frequency.value = 1 / 14;
      const breatheGain = ctx.createGain();
      breatheGain.gain.value = 260;
      breathe.connect(breatheGain);
      breatheGain.connect(filter.frequency);
      breathe.start();

      CHORD.forEach((freq, i) => {
        const osc = ctx!.createOscillator();
        osc.type = 'sine';
        osc.frequency.value = freq;
        const g = ctx!.createGain();
        g.gain.value = 0.05;
        const lfo = ctx!.createOscillator();
        lfo.type = 'sine';
        lfo.frequency.value = 0.05 + i * 0.017;
        const lfoGain = ctx!.createGain();
        lfoGain.gain.value = 0.025;
        lfo.connect(lfoGain);
        lfoGain.connect(g.gain);
        osc.connect(g);
        g.connect(master!);
        osc.start();
        lfo.start();
      });
    }
    return ctx;
  }, []);

  useEffect(() => {
    const master = masterRef.current;
    const ctx = ctxRef.current;
    if (!master || !ctx) return;
    const target = playing ? gainFromGauge(volume) : 0;
    master.gain.cancelScheduledValues(ctx.currentTime);
    master.gain.setTargetAtTime(target, ctx.currentTime, 0.6);
  }, [playing, volume]);

  const toggle = useCallback(() => {
    const ctx = ensureGraph();
    if (!playing) {
      ctx.resume().catch(() => {});
      setPlaying(true);
    } else {
      setPlaying(false);
    }
  }, [ensureGraph, playing]);

  const changeVolume = useCallback((v: number) => {
    setVolume(v);
    try {
      window.localStorage.setItem(STORAGE_KEY, String(v));
    } catch {}
  }, []);

  if (!mounted) return null;

  return (
    <div className="fixed bottom-6 right-6 z-40 flex items-center gap-3 rounded-2xl border border-white/10 bg-black/60 p-3 shadow-xl backdrop-blur-md">
      <div className="flex flex-col items-center gap-2">
        <button
          type="button"
          onClick={toggle}
          aria-pressed={playing}
          aria-label={playing ? 'Pause ambient music' : 'Play ambient music'}
          className="rounded-full border border-[#662249] bg-[#44174E]/60 p-2.5 text-[#E9BCB9] transition hover:border-[#ED9E59]/50 hover:text-[#ED9E59]"
        >
          {playing ? <Pause size={16} /> : <Play size={16} />}
        </button>
        <span className="text-[10px] font-mono uppercase tracking-widest text-[#E9BCB9]/50">
          {playing ? 'playing' : 'ambience'}
        </span>
      </div>
      <SloshGauge
        value={volume}
        onChange={changeVolume}
        interactive
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
