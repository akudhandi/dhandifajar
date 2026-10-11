'use client';
import { useState, useEffect } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { 
  Github, 
  Linkedin, 
  Mail, 
  MessageCircle,
} from 'lucide-react';

import Navbar from '@/components/Navbar';
import Preloader from '@/components/Preloader';
import CodeSlots from '@/components/CodeSlots';
import Hero from '@/components/Hero';
import CardSwap, { Card } from '@/components/CardSwap'; 
import MyTechStack from '@/components/MyTechStack';
import { Reveal } from '@/components/Reveal';
import WhatIDo from '@/components/sections/WhatIDo';
import ExperienceTimeline from '@/components/sections/ExperienceTimeline';
import FeaturedWork from '@/components/sections/FeaturedWork';
import { useSiteContent } from '@/lib/use-content';

// --- DATA PORTFOLIO ---
const portfolioFilters = ["all", "web", "mobile", "research", "software", "database", "networking"];

const GATE_KEY = 'portfolio_gate_passed';
const CODE_KEY = 'portfolio_access_code';
const MAX_ATTEMPTS = 5;

const makeCode = () => Math.floor(1000 + Math.random() * 9000).toString();

export default function Home() {
  const [isLoading, setIsLoading] = useState(true);
  const [showGate, setShowGate] = useState(() => {
    if (typeof window === 'undefined') return true;
    return sessionStorage.getItem(GATE_KEY) !== 'passed';
  });
  const [accessCode, setAccessCode] = useState(() => {
    if (typeof window === 'undefined') return '';
    if (sessionStorage.getItem(GATE_KEY) === 'passed') return '';
    const code = makeCode();
    sessionStorage.setItem(CODE_KEY, code);
    return code;
  });
  const [attempts, setAttempts] = useState(0);
  const [slotStatus, setSlotStatus] = useState<'idle' | 'error' | 'success'>('idle');

  // Konten dinamis dari Supabase (via /api/content), fallback statis bila offline.
  const content = useSiteContent();
  const projects = content.projects.map((p) => ({
    name: p.name,
    year: p.year,
    tools: p.tools,
    role: p.role,
    description: p.description,
    type: p.type,
    slug: p.slug,
    github: p.github_url,
    document: p.doc_url,
    doi: p.doi_url,
    cover: p.cover_url ?? null,
  }));
  const experiences = content.experiences.map((e) => ({
    title: e.title,
    role: e.role,
    year: e.year_range,
    type: e.type,
    description: e.description,
  }));
  const socialLinks = [
    { icon: <Linkedin size={20}/>, label: "LinkedIn", href: content.profile.socials.linkedin },
    { icon: <Github size={20}/>, label: "GitHub", href: content.profile.socials.github },
    { icon: <Mail size={20}/>, label: "Email", href: `mailto:${content.profile.email}` },
    { icon: <MessageCircle size={20}/>, label: "WhatsApp", href: content.profile.whatsapp },
  ];

  useEffect(() => {
    if (isLoading) {
      document.body.style.overflow = "hidden";
      window.scrollTo(0, 0);
    } else {
      document.body.style.overflow = showGate ? "hidden" : "";
    }
  }, [isLoading, showGate]);

  const passGate = () => {
    sessionStorage.setItem(GATE_KEY, 'passed');
    setShowGate(false);
  };

  const handleCodeComplete = (input: string) => {
    if (input === accessCode) {
      setSlotStatus('success');
      setTimeout(passGate, 900);
    } else {
      setSlotStatus('error');
      setAttempts((prev) => {
        const next = prev + 1;
        if (next >= MAX_ATTEMPTS) {
          const code = makeCode();
          setAccessCode(code);
          sessionStorage.setItem(CODE_KEY, code);
          return 0;
        }
        return next;
      });
      setTimeout(() => setSlotStatus('idle'), 700);
    }
  };

  return (
    <main className="bg-[#1B1931] min-h-screen text-[#E9BCB9] selection:bg-[#ED9E59] selection:text-[#1B1931]">
      
      {/* 1. PRELOADER */}
      <AnimatePresence mode='wait'>
        {isLoading && (
          <Preloader onComplete={() => setIsLoading(false)} />
        )}
      </AnimatePresence>

      {/* NAVBAR */}
      {!isLoading && <Navbar />}

      {/* CODE GATE */}
      <AnimatePresence>
        {!isLoading && showGate && (
          <motion.div
            key="code-gate"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0, scale: 0.98 }}
            transition={{ duration: 0.5, ease: 'easeOut' }}
            className="fixed inset-0 z-40 flex items-center justify-center bg-[#1B1931]/95 px-4 backdrop-blur-md"
          >
            <div className="w-full max-w-md rounded-3xl border border-[#662249] bg-[#44174E]/60 p-8 text-center shadow-2xl shadow-black/40">
              <span className="inline-flex items-center gap-2 rounded-full border border-[#662249] bg-[#1B1931]/60 px-4 py-1.5 font-mono text-xs uppercase tracking-widest text-[#ED9E59]">
                <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-[#ED9E59]" />
                Restricted Access
              </span>
              <h2 className="mt-5 text-2xl font-bold text-[#E9BCB9]">
                Enter the access code
              </h2>
              <p className="mt-2 text-sm text-[#E9BCB9]/60">
                Your one-time code for this visit is
              </p>
              <p className="mt-3 font-mono text-4xl font-bold tracking-[0.35em] text-[#ED9E59]">
                {accessCode || '••••'}
              </p>
              <div className="mt-6 flex justify-center">
                <CodeSlots
                  length={4}
                  onComplete={handleCodeComplete}
                  status={slotStatus}
                  autoFocus
                  accentColor="#ED9E59"
                  inkColor="#E9BCB9"
                  slotColor="#44174E"
                  digitColor="#1B1931"
                  dangerColor="#A34054"
                  slotSize={52}
                  gap={10}
                  radius={14}
                />
              </div>
              <p className="mt-4 font-mono text-xs text-[#E9BCB9]/50">
                Attempts: {attempts}/{MAX_ATTEMPTS} — 5 misses generate a new code
              </p>
              <button
                onClick={passGate}
                className="mt-6 w-full rounded-full border border-[#662249] px-6 py-3 text-sm font-medium text-[#E9BCB9]/70 transition hover:border-[#ED9E59]/40 hover:text-[#ED9E59]"
              >
                Skip for now
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="flex flex-col">
        
        {/* HERO SECTION */}
        <Hero active={!isLoading && !showGate} />

        {/* 2. ABOUT ME SECTION */}
        <section id="about" className="py-24 px-4 md:px-10 max-w-7xl mx-auto w-full overflow-hidden">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
                
                {/* Kolom Kiri */}
                <Reveal>
                  <div>
                        <span className="text-[#ED9E59] font-medium tracking-wider uppercase text-sm mb-2 block">
                            {'//'} About Me
                        </span>
                       <h2 className="text-4xl md:text-5xl font-bold mb-6 leading-tight text-[#E9BCB9]">
                           More than just a <br/>
                           <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#ED9E59] to-[#A34054]">
                               Code Writer
                           </span>
                       </h2>
                        <p className="text-[#E9BCB9]/70 text-lg leading-relaxed mb-6">
                           I&apos;m a passionate <b>Information Systems student</b> at UPN &quot;Veteran&quot; Jawa Timur. 
                           I focus on <b>Fullstack Web Development, UI/UX Design, and Data Analytics</b>. 
                           Currently exploring the intersection between beautiful code and meaningful data insights.
                       </p>
                      
                       <div className="flex gap-8 mt-8 border-t border-[#662249] pt-8">
                           <div>
                               <h3 className="text-3xl font-bold text-[#E9BCB9]">{content.profile.years_exp}</h3>
                               <p className="text-sm text-[#E9BCB9]/50">Years Exp.</p>
                           </div>
                           <div>
                               <h3 className="text-3xl font-bold text-[#E9BCB9]">{content.profile.projects_count}</h3>
                               <p className="text-sm text-[#E9BCB9]/50">Projects Done</p>
                           </div>
                       </div>
                  </div>
                </Reveal>

                {/* Kolom Kanan: Card Swap */}
                <Reveal delay={0.4}>
                  <div className="relative w-full flex items-center justify-center min-h-[700px] overflow-visible">
                    <div className="relative overflow-visible" style={{ width: '100%', maxWidth: '500px', height: '400px' }}>
                      <CardSwap
                        width="100%"
                        height="100%"
                        cardDistance={60}
                        verticalDistance={50}
                        delay={4000}
                        pauseOnHover={false}
                      >
                        <Card>
                          <img src="https://images.unsplash.com/photo-1498050108023-c5249f4df085?q=80&w=1000&auto=format&fit=crop" alt="Coding" className="h-full w-full object-cover" />
                          <div className="card-content">
                            <h3 className="text-xl font-bold text-[#E9BCB9]">Full Stack Dev</h3>
                            <p className="text-xs text-[#E9BCB9]/70">Laravel & Flutter Expert</p>
                          </div>
                        </Card>
                        <Card>
                          <img src="https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=1000&auto=format&fit=crop" alt="Analytics" className="h-full w-full object-cover" />
                          <div className="card-content">
                            <h3 className="text-xl font-bold text-[#E9BCB9]">Data Analyst</h3>
                            <p className="text-xs text-[#E9BCB9]/70">Turning Data into Insights</p>
                          </div>
                        </Card>
                        <Card>
                          <img src="https://images.unsplash.com/photo-1519389950473-47ba0277781c?q=80&w=1000&auto=format&fit=crop" alt="Teamwork" className="h-full w-full object-cover" />
                          <div className="card-content">
                            <h3 className="text-xl font-bold text-[#E9BCB9]">Leadership</h3>
                            <p className="text-xs text-[#E9BCB9]/70">Organization & Teamwork</p>
                          </div>
                        </Card>
                      </CardSwap>
                    </div>
                  </div>
                </Reveal>
            </div>
        </section>

        {/* 3. WHAT I DO SECTION */}
        <WhatIDo />

        {/* 4. EXPERIENCE SECTION */}
        <ExperienceTimeline experiences={experiences} />

        {/* 5. PROJECTS SECTION */}
        <FeaturedWork projects={projects} filters={portfolioFilters} />

        {/* 6. TECH STACK */}
        <Reveal>
          <MyTechStack />
        </Reveal>

        {/* 7. FOOTER */}
        <Reveal>
          <footer className="py-8 border-t border-[#662249] mt-12">
              <div className="max-w-7xl mx-auto px-4 flex flex-col md:flex-row justify-between items-center gap-4">
                  <p className="text-[#E9BCB9]/50 text-sm">© 2025 Fajar Ramadhandi Hidayat.</p>
                  <div className="flex gap-6">
                      {socialLinks.map((social, i) => (
                          <a key={i} href={social.href} target="_blank" className="text-[#E9BCB9]/50 hover:text-[#ED9E59] transition hover:scale-110">
                              {social.icon}
                          </a>
                      ))}
                  </div>
              </div>
          </footer>
        </Reveal>

      </div>
    </main>
  );
}