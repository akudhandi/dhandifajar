'use client';

import Noise from '@/components/Noise';
import { usePrefersReducedMotion } from '@/lib/use-reduced-motion';

// Film grain global yang kalem: opacity sangat rendah, refresh ~7fps,
// nonaktif saat prefers-reduced-motion. pointer-events-none = tidak
// mengganggu klik/scroll sama sekali.
export default function AmbientGrain() {
  const reduced = usePrefersReducedMotion();
  if (reduced) return null;
  return (
    <div
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 z-[70] overflow-hidden"
    >
      <Noise patternAlpha={10} patternRefreshInterval={8} />
    </div>
  );
}
