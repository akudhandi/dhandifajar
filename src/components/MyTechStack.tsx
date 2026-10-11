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
  const mid = Math.ceil(techLogos.length / 2);
  const rowA = techLogos.slice(0, mid);
  const rowB = techLogos.slice(mid);

  return (
    <section className="relative py-24 bg-[#1B1931]">
      <div className="max-w-6xl mx-auto px-6 text-center">
        <h2 className="text-3xl md:text-4xl font-bold mb-4 text-[#E9BCB9]">
          MY TECH STACK
        </h2>

        <p className="text-[#E9BCB9]/60 max-w-2xl mx-auto mb-12">
          My expertise spans a diverse range of technologies, enabling me to
          deliver comprehensive and cutting-edge solutions across various platforms.
        </p>

        <div className="relative h-[140px] overflow-hidden">
          <LogoLoop
            logos={rowA}
            speed={80}
            direction="left"
            logoHeight={52}
            gap={52}
            hoverSpeed={0}
            scaleOnHover
            fadeOut
            fadeOutColor="#1B1931"
            ariaLabel="Technology Stack row one"
          />
        </div>

        {rowB.length > 0 && (
          <div className="relative h-[140px] overflow-hidden">
            <LogoLoop
              logos={rowB}
              speed={64}
              direction="right"
              logoHeight={52}
              gap={52}
              hoverSpeed={0}
              scaleOnHover
              fadeOut
              fadeOutColor="#1B1931"
              ariaLabel="Technology Stack row two"
            />
          </div>
        )}
      </div>
    </section>
  );
}
