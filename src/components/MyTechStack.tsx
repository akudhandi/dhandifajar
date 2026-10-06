'use client';

import LogoLoop from '@/components/LogoLoop';
import { TechIcon } from '@/components/TechIcon';
import { useSiteContent } from '@/lib/use-content';


export default function MyTechStack() {
  const content = useSiteContent();
  const techLogos = content.techStack.map((t) => ({
    node: <TechIcon iconKey={t.icon_key} color={t.color} />,
    title: t.title,
    href: t.href,
  }));
  return (
    <section className="relative py-24 bg-#141516">
      <div className="max-w-6xl mx-auto px-6 text-center">
        <h2 className="text-3xl md:text-4xl font-bold mb-4 text-white">
          MY TECH STACK
        </h2>

        <p className="text-neutral-400 max-w-2xl mx-auto mb-12">
          My expertise spans a diverse range of technologies, enabling me to
          deliver comprehensive and cutting-edge solutions across various platforms.
        </p>

        <div className="relative h-[160px] overflow-hidden">
          <LogoLoop
            logos={techLogos}
            speed={80}
            direction="left"
            logoHeight={56}
            gap={56}
            hoverSpeed={0}
            scaleOnHover
            fadeOut
            fadeOutColor="#141516"
            ariaLabel="Technology Stack"
          />
        </div>
      </div>
    </section>
  );
}
