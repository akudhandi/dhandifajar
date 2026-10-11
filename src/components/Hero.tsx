'use client';
import { motion } from 'framer-motion';
import {
  Github,
  Linkedin,
  Mail,
  MessageCircle,
  ChevronDown,
  ArrowUpRight,
} from 'lucide-react';
import { useSiteContent } from '@/lib/use-content';
import MaskedHeading from '@/components/MaskedHeading';

const HERO_VIDEO_URL = 'https://storage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4';

export default function Hero({ active = true }: { active?: boolean }) {
  const content = useSiteContent();

  const fadeUp = (delay: number) => ({
    initial: { opacity: 0, y: 24 },
    animate: active ? { opacity: 1, y: 0 } : { opacity: 0, y: 24 },
    transition: { duration: 0.7, delay, ease: 'easeOut' as const },
  });

  const socials = [
    { id: 'github', icon: <Github size={18} />, href: content.profile.socials.github, label: 'GitHub' },
    { id: 'linkedin', icon: <Linkedin size={18} />, href: content.profile.socials.linkedin, label: 'LinkedIn' },
    { id: 'email', icon: <Mail size={18} />, href: `mailto:${content.profile.email}`, label: 'Email' },
    { id: 'whatsapp', icon: <MessageCircle size={18} />, href: content.profile.whatsapp, label: 'WhatsApp' },
  ];

  return (
    <section className="relative flex min-h-[100svh] w-full items-center justify-center overflow-hidden bg-[#1B1931] px-4 pb-20 pt-28 text-[#E9BCB9]">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -top-32 left-1/2 h-[420px] w-[680px] -translate-x-1/2 rounded-full bg-[#A34054]/10 blur-[140px]"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute bottom-0 left-1/4 h-[300px] w-[420px] rounded-full bg-[#ED9E59]/10 blur-[120px]"
      />

      <div className="relative z-10 mx-auto flex w-full max-w-4xl flex-col items-center text-center">
        <motion.div {...fadeUp(0.1)}>
          <span className="inline-flex items-center gap-2 rounded-full border border-[#662249] bg-[#44174E]/40 px-4 py-2 text-xs font-mono uppercase tracking-widest text-[#ED9E59]">
            <span className="h-2 w-2 animate-pulse rounded-full bg-[#ED9E59]" />
            {content.profile.open_to_work ? 'Available for Work' : `Hello, I'm`}
          </span>
        </motion.div>

        <motion.div {...fadeUp(0.2)} className="mt-8 w-full">
          <MaskedHeading
            key={active ? 'hero-on' : 'hero-off'}
            tag="h1"
            text={content.profile.full_name}
            mediaType="video"
            src={HERO_VIDEO_URL}
            trigger="mount"
            reveal="rise"
            duration={1.2}
            stagger={0.12}
            align="center"
            weight={800}
            tracking={-0.02}
            lineHeight={1.08}
            textScale={0.085}
            drift={16}
            parallax={22}
            brightness={1.05}
            saturation={1.25}
          />
        </motion.div>

        <motion.p
          {...fadeUp(0.3)}
          className="mt-6 text-lg font-medium tracking-wide text-[#ED9E59] md:text-2xl"
        >
          Full Stack Developer &amp; Software Engineer
        </motion.p>

        <motion.p
          {...fadeUp(0.4)}
          className="mx-auto mt-6 max-w-2xl text-base leading-relaxed text-[#E9BCB9]/70 md:text-lg"
        >
          I build efficient web &amp; mobile experiences where aesthetics meets
          functionality — from system design to shipped product.
        </motion.p>

        <motion.div {...fadeUp(0.5)} className="mt-10 flex flex-wrap items-center justify-center gap-4">
          <a
            href="#projects"
            className="inline-flex items-center gap-2 rounded-full bg-[#ED9E59] px-7 py-3.5 text-sm font-semibold text-[#1B1931] transition hover:bg-[#ED9E59]/90"
          >
            View Work
            <ArrowUpRight className="h-4 w-4" />
          </a>
          <a
            href="/contactme"
            className="inline-flex items-center gap-2 rounded-full border border-[#662249] px-7 py-3.5 text-sm font-medium text-[#E9BCB9] transition hover:border-[#ED9E59]/40 hover:bg-[#44174E]/40 hover:text-[#ED9E59]"
          >
            Let&apos;s Talk
          </a>
        </motion.div>

        <motion.div {...fadeUp(0.6)} className="mt-8 flex items-center justify-center gap-3">
          {socials.map((item) => (
            <a
              key={item.id}
              href={item.href}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={item.label}
              className="rounded-full border border-[#662249] bg-[#44174E]/30 p-3 text-[#E9BCB9]/70 transition hover:border-[#ED9E59]/40 hover:bg-[#ED9E59]/10 hover:text-[#ED9E59]"
            >
              {item.icon}
            </a>
          ))}
        </motion.div>
      </div>

      <motion.a
        href="#about"
        aria-label="Scroll to about section"
        initial={{ opacity: 0 }}
        animate={{ opacity: active ? 1 : 0 }}
        transition={{ delay: 1, duration: 0.8 }}
        className="absolute bottom-8 z-10"
      >
        <motion.span
          animate={{ y: [0, 8, 0] }}
          transition={{ repeat: Infinity, duration: 2, ease: 'easeInOut' }}
          className="block"
        >
          <ChevronDown className="h-6 w-6 text-[#E9BCB9]/40" />
        </motion.span>
      </motion.a>
    </section>
  );
}
