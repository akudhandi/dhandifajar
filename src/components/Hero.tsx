'use client';
import { motion } from 'framer-motion';
// Hapus import icon navbar lama yang tidak terpakai
import {
  FaGithub,
  FaLinkedinIn,
  FaDiscord,
  FaInstagram
} from 'react-icons/fa6';
import Dock from '@/components/Dock/Dock';
import { useSiteContent } from '@/lib/use-content';

export default function Hero() {
  const content = useSiteContent();
  const dockItems = [
    {
      id: 'discord',
      icon: <FaDiscord size={22} />,
      href: content.profile.socials.discord,
    },
    {
      id: 'linkedin',
      icon: <FaLinkedinIn size={22} />,
      href: content.profile.socials.linkedin,
    },
    {
      id: 'github',
      icon: <FaGithub size={22} />,
      href: content.profile.socials.github,
    },
    {
      id: 'instagram',
      icon: <FaInstagram size={22} />,
      href: content.profile.socials.instagram,
    },
  ];

  return (
    <section className="relative flex min-h-[100svh] w-full flex-col items-center justify-center bg-[#141516] overflow-hidden text-white px-4 pt-28 pb-14">
      
      {/* DULU ADA NAVBAR DI SINI. 
          SUDAH DIHAPUS AGAR TIDAK DOBEL DENGAN NAVBAR BARU DI PAGE.TSX 
      */}

      <div className="relative z-10 flex flex-col items-center text-center">
        
        {/* Avatar (in-flow, tidak lagi menabrak navbar) */}
        <motion.div
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.5 }}
            className="mb-7 flex justify-center"
        >
            <div className="flex items-center gap-2">
                <div className="h-12 w-12 rounded-full bg-gray-600 border-2 border-white overflow-hidden">
                    {/* GANTI SRC INI DENGAN FOTO KAMU */}
                    <img src="https://ui-avatars.com/api/?name=User&background=random" alt="Avatar" className="h-full w-full object-cover" />
                </div>
                <div className="rounded-full bg-neutral-800 px-3 py-1 text-xs border border-white/10">Hello, I'm Dev</div>
            </div>
        </motion.div>

        {/* --- MAIN TYPOGRAPHY --- */}
        <div className="flex flex-col items-center leading-none tracking-tighter font-bold uppercase">
            
            {/* Baris 1: DIGITAL */}
            <h1 className="text-[12vw] md:text-[clamp(2.75rem,7vw,4.5rem)] text-purple-400 relative">
                DIGITAL
                {/* Badge Pink Kecil */}
                <span className="absolute -right-4 top-1/2 -translate-y-1/2 rotate-12 bg-pink-500 text-white text-xs md:text-sm px-2 py-1 rounded-md tracking-normal normal-case hidden md:block">
                    Product
                </span>
                 <p className="absolute right-[-150px] top-10 text-xs text-gray-400 tracking-normal normal-case w-32 text-left hidden lg:block">
                    // Based in <br/> Indonesia
                </p>
            </h1>

            {/* Baris 2: EXPERIENCE */}
            <h1 className="text-[10vw] md:text-[clamp(2.5rem,6.5vw,4rem)] text-[#fcd34d]">
                EXPERIENCE
            </h1>

            {/* Baris 3: DESIGNER */}
            <div className="relative flex items-center gap-4">
                <h1 className="text-[11vw] md:text-[clamp(2.75rem,6.75vw,4.25rem)] text-white">
                    DESIGNER
                </h1>
                {/* Tombol/Badge "Let's Connect" */}
                <div className="hidden md:flex absolute -right-40 top-1/2 -translate-y-1/2 items-center gap-2 rounded-full border border-white/20 bg-neutral-900 px-4 py-2 text-sm font-normal tracking-normal normal-case">
                    <span className="h-2 w-2 rounded-full bg-green-500 animate-pulse"></span>
                    Let's Connect
                </div>
            </div>

            {/* Baris 4: & DEVELOPER */}
            <div className="relative">
                <h1 className="text-[11vw] md:text-[clamp(2.75rem,6.75vw,4.25rem)] text-cyan-400">
                    & DEVELOPER.
                </h1>
                {/* Cursor Floating */}
                 <motion.div 
                    animate={{ y: [0, -10, 0] }}
                    transition={{ repeat: Infinity, duration: 3, ease: "easeInOut" }}
                    className="absolute -bottom-4 -left-4 md:-left-10 z-20"
                >
                    <div className="bg-blue-600 text-white text-xs px-2 py-1 rounded-md rounded-tl-none relative shadow-lg">
                        Dev
                         <svg className="absolute -top-3 -left-0 w-4 h-4 text-blue-600 fill-current" viewBox="0 0 24 24" style={{ transform: 'rotate(0deg)' }}>
                            <path d="M5.5 3.21l11.06 14.77a.8.8 0 01-1.28 1l-3.3-4.5-2.7 7.2a.8.8 0 01-1.5-.6l2.7-7.2-4.5 1.1a.8.8 0 01-1-.77L4.5 3.5a.8.8 0 011-.29z" />
                        </svg>
                    </div>
                </motion.div>
            </div>

        </div>

        {/* Subtitle */}
        <p className="mt-6 max-w-lg text-center text-neutral-400 text-sm md:text-lg text-balance px-2">
            I create a digital experience that borders on <br className="hidden md:block"/>
            <span className="text-purple-400">efficiency</span>, <span className="text-yellow-400">aesthetics</span> and <span className="text-cyan-400">functionality</span>.
        </p>

      </div>

      {/* --- SOCIAL MEDIA DOCK (in-flow agar tidak menutupi subtitle) --- */}
      <div className="mt-8 z-20">
        <Dock items={dockItems} />
      </div>

    </section>
  );
}