'use client';

import LogoLoop from '@/components/LogoLoop';
import { techLogos } from '@/data/techStack';

export default function TechStack() {
  return (
    <section className="py-24">
      <h2 className="text-3xl font-bold text-center mb-4">
        My Tech Stack
      </h2>

      <p className="text-center text-neutral-400 max-w-xl mx-auto mb-12">
        My expertise spans a diverse range of technologies, enabling me to
        deliver comprehensive and cutting-edge solutions across various platforms.
      </p>

      <div className="relative h-[120px] overflow-hidden">
        <LogoLoop
          logos={techLogos}
          speed={80}
          direction="left"
          logoHeight={52}
          gap={48}
          scaleOnHover
          fadeOut
          fadeOutColor="#000000"
        />
      </div>
    </section>
  );
}
