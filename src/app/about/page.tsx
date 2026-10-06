"use client";

import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Reveal } from "@/components/Reveal";
import { ArrowRight, Download } from "lucide-react";
import Link from "next/link";
import ProfileCard from "@/components/ProfileCard";
import StarBorder from "@/components/StarBorder";
import { useSiteContent } from "@/lib/use-content";

export default function AboutPage() {
  const content = useSiteContent();
  const handleContactClick = () => {
    window.location.href = "/contactme";
  };

  return (
    <main className="min-h-screen w-full bg-[#141516] text-white selection:bg-cyan-500">
      <Navbar />

      <section className="px-6 pt-40 pb-32">
        <div className="mx-auto max-w-7xl">
          
          {/* LAYOUT UTAMA: HEADLINE & CARD SEJAJAR DI ATAS */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-start">
            
            {/* SISI KIRI: HEADLINE, DESKRIPSI, & CV */}
            <div className="space-y-12">
              <Reveal>
                <div className="max-w-xl">
                  <h1 className="text-5xl md:text-7xl font-semibold tracking-tight leading-[1.1]">
                    I&apos;m Dhandi — <br />
                    <span className="text-neutral-500">Crafting Digital Solutions.</span>
                  </h1>
                </div>
              </Reveal>

              <Reveal delay={0.4}>
                <p className="text-xl md:text-2xl text-neutral-400 leading-relaxed font-light max-w-lg">
                  As a Software Engineer, I specialize in building high-performance 
                  applications that bridge the gap between complex backend logic 
                  and intuitive frontend experiences. My approach focuses on 
                  scalability, clean code, and user-centric design.
                </p>
              </Reveal>

              <Reveal delay={0.5}>
                <StarBorder
                  as="a"
                  href={content.profile.cv_url ?? "https://drive.google.com/file/d/1-AnW68Eg0Mj6vMHZMbFWkodPwojhljiX/view?usp=sharing"}
                  target="_blank"
                  rel="noopener noreferrer"
                  color="#22d3ee"
                  speed="8s"
                >
                  <span className="inline-flex items-center gap-3 text-sm font-medium">
                    <Download size={18} />
                    Download My CV
                  </span>
                </StarBorder>
              </Reveal>
            </div>

            {/* SISI KANAN: PROFILE CARD SEJAJAR HEADLINE */}
            <div className="flex justify-center lg:justify-end lg:pt-2">
              <Reveal delay={0.6}>
                <ProfileCard
                  avatarUrl={content.profile.avatar_url ?? "/assets/foto dhandi.jpg"}
                  miniAvatarUrl={content.profile.avatar_url ?? "/assets/foto dhandi.jpg"}
                  name={content.profile.full_name}
                  title="Software Engineer"
                  handle="akudhandi"
                  status={content.profile.open_to_work ? "Available for Work" : "Currently Busy"}
                  contactText="Contact Me"
                  behindGlowColor="rgba(34, 211, 238, 0.4)" 
                  innerGradient="linear-gradient(145deg, rgba(15, 16, 17, 0.9) 0%, rgba(0, 0, 0, 1) 100%)"
                  onContactClick={handleContactClick}
                />
              </Reveal>
            </div>
          </div>

          {/* I CAN HELP YOU WITH SECTION (DESKRIPSI LENGKAP) */}
          <div className="mt-40">
            <Reveal>
              <h2 className="text-center text-purple-400 font-medium mb-16 text-lg">
                I can help you with
              </h2>
            </Reveal>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-12 border-t border-white/5 pt-12">
              
              {/* 01. FRONTEND */}
              <Reveal delay={0.2}>
                <div className="space-y-6">
                  <span className="text-sm text-neutral-600 font-mono">01</span>
                  <h3 className="text-2xl font-medium">Frontend & Design</h3>
                  <p className="text-sm text-neutral-400 leading-relaxed">
                    I create responsive, interactive, and visually stunning interfaces 
                    using Next.js and Tailwind CSS. My goal is to ensure every interaction 
                    feels seamless and purposeful.
                  </p>
                </div>
              </Reveal>

              {/* 02. BACKEND */}
              <Reveal delay={0.4}>
                <div className="space-y-6">
                  <span className="text-sm text-neutral-600 font-mono">02</span>
                  <h3 className="text-2xl font-medium">Backend Architecture</h3>
                  <p className="text-sm text-neutral-400 leading-relaxed">
                    With expertise in Laravel and MySQL, I build robust server-side 
                    applications and APIs that are secure, scalable, and easy to 
                    maintain for long-term growth.
                  </p>
                </div>
              </Reveal>

              {/* 03. MOBILE & AI */}
              <Reveal delay={0.6}>
                <div className="space-y-6">
                  <span className="text-sm text-neutral-600 font-mono">03</span>
                  <h3 className="text-2xl font-medium">AI & Mobile Integration</h3>
                  <p className="text-sm text-neutral-400 leading-relaxed">
                    From implementing AI Chatbots with Google Gemini to building 
                    cross-platform mobile apps with Flutter, I provide comprehensive 
                    tech solutions for modern businesses.
                  </p>
                </div>
              </Reveal>
            </div>
          </div>

          {/* CALL TO ACTION */}
          <Reveal delay={0.4}>
            <div className="mt-40 flex justify-center">
               <StarBorder as={Link} href="/contactme" color="#22d3ee" speed="8s">
                 <span className="inline-flex items-center gap-3 text-sm font-medium">
                   Contact Me
                   <ArrowRight size={18} />
                 </span>
               </StarBorder>
            </div>
          </Reveal>

        </div>
      </section>

      <Footer />
    </main>
  );
}