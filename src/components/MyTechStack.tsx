'use client';

import LogoLoop from '@/components/LogoLoop';
import {
  SiHtml5,
  SiCss3,
  SiJavascript,
  SiNodedotjs,
  SiPhp,
  SiLaravel,
  SiNextdotjs,
  SiMysql,
  SiGit,
  SiFlutter,
  SiDart,
  SiTailwindcss,
  SiPostman,
  SiGradle,
} from 'react-icons/si';

const techLogos = [
  { node: <SiHtml5 color="#E34F26" />, title: 'HTML5', href: 'https://developer.mozilla.org/en-US/docs/Web/HTML' },
  { node: <SiCss3 color="#1572B6" />, title: 'CSS3', href: 'https://developer.mozilla.org/en-US/docs/Web/CSS' },
  { node: <SiJavascript color="#F7DF1E" />, title: 'JavaScript', href: 'https://developer.mozilla.org/en-US/docs/Web/JavaScript' },
  { node: <SiGradle color="#007396" />, title: 'Java', href: 'https://www.java.com' },
  { node: <SiPhp color="#777BB4" />, title: 'PHP', href: 'https://www.php.net' },
  { node: <SiLaravel color="#FF2D20" />, title: 'Laravel', href: 'https://laravel.com' },
  { node: <SiNextdotjs color="#FFFFFF" />, title: 'Next.js', href: 'https://nextjs.org' },
  { node: <SiMysql color="#4479A1" />, title: 'MySQL', href: 'https://www.mysql.com' },
  { node: <SiNodedotjs color="#339933" />, title: 'Node.js', href: 'https://nodejs.org' },
  { node: <SiGit color="#F05032" />, title: 'Git', href: 'https://git-scm.com' },
  { node: <SiFlutter color="#02569B" />, title: 'Flutter', href: 'https://flutter.dev' },
  { node: <SiDart color="#0175C2" />, title: 'Dart', href: 'https://dart.dev' },
  { node: <SiTailwindcss color="#38BDF8" />, title: 'Tailwind CSS', href: 'https://tailwindcss.com' },
  { node: <SiPostman color="#FF6C37" />, title: 'RESTful API', href: 'https://www.postman.com' },
];


export default function MyTechStack() {
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
