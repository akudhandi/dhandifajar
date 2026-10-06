'use client';

import ScrollVelocity from '@/components/ScrollVelocity';
import { usePrefersReducedMotion } from '@/lib/use-reduced-motion';

// Marquee divider kalem antar section. Kecepatan dasar rendah;
// saat reduced-motion tampil sebagai baris teks statis.
export default function SectionMarquee({ items }: { items: string[] }) {
  const reduced = usePrefersReducedMotion();
  const line = items.join('  \u2726  ');
  if (!line) return null;
  if (reduced) {
    return (
      <div className="border-y border-white/5 py-5 px-4 text-center text-xs uppercase tracking-[0.3em] text-neutral-500">
        {line}
      </div>
    );
  }
  return (
    <div className="border-y border-white/5 py-5 overflow-hidden" aria-hidden="true">
      <ScrollVelocity
        texts={[line]}
        velocity={40}
        className="uppercase text-neutral-600 font-semibold"
        scrollerStyle={{ fontSize: 'clamp(0.85rem, 2vw, 1.1rem)', letterSpacing: '0.3em' }}
      />
    </div>
  );
}
