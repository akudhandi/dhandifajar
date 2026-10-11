"use client";

import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Reveal } from "@/components/Reveal";
import { ArrowRight, Download } from "lucide-react";
import Link from "next/link";
import ProfileCard from "@/components/ProfileCard";
import { useSiteContent } from "@/lib/use-content";

export default function AboutPage() {
  const content = useSiteContent();
  const handleContactClick = () => {
    window.location.href = "/contactme";
  };

  return (
    <main className="min-h-screen w-full bg-[#1B1931] text-[#E9BCB9] selection:bg-[#ED9E59] selection:text-[#1B1931]">
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
                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#ED9E59] to-[#A34054]">Crafting Digital Solutions.</span>
                  </h1>
                </div>
              </Reveal>

              <Reveal delay={0.4}>
                <p className="text-xl md:text-2xl text-[#E9BCB9]/70 leading-relaxed font-light max-w-lg">
                  As a Software Engineer, I specialize in building high-performance 
                  applications that bridge the gap between complex backend logic 
                  and intuitive frontend experiences. My approach focuses on 
                  scalability, clean code, and user-centric design.
                </p>
              </Reveal>

              <Reveal delay={0.5}>
                <a
                  href={content.profile.cv_url ?? "https://drive.google.com/file/d/1-AnW68Eg0Mj6vMHZMbFWkodPwojhljiX/view?usp=sharing"}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-3 px-8 py-4 border border-[#662249] rounded-full text-sm font-medium text-[#E9BCB9] hover:bg-[#ED9E59] hover:text-[#1B1931] hover:border-[#ED9E59] transition-all duration-300 group"
                >
                  <Download size={18} className="group-hover:-translate-y-1 transition-transform" />
                  Download My CV
                </a>
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
                  behindGlowColor="rgba(237, 158, 89, 0.4)"
                  innerGradient="linear-gradient(145deg, rgba(68, 23, 78, 0.9) 0%, rgba(27, 25, 49, 1) 100%)"
                  onContactClick={handleContactClick}
                />
              </Reveal>
            </div>
          </div>

          {/* I CAN HELP YOU WITH SECTION (DESKRIPSI LENGKAP) */}
          <div className="mt-40">
            <Reveal>
              <h2 className="text-center text-[#ED9E59] font-medium mb-16 text-lg">
                I can help you with
              </h2>
            </Reveal>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-12 border-t border-[#662249]/60 pt-12">
              
              {/* 01. FRONTEND */}
              <Reveal delay={0.2}>
                <div className="space-y-6">
                  <span className="text-sm text-[#E9BCB9]/40 font-mono">01</span>
                  <h3 className="text-2xl font-medium text-[#E9BCB9]">Frontend & Design</h3>
                  <p className="text-sm text-[#E9BCB9]/70 leading-relaxed">
                    I create responsive, interactive, and visually stunning interfaces 
                    using Next.js and Tailwind CSS. My goal is to ensure every interaction 
                    feels seamless and purposeful.
                  </p>
                </div>
              </Reveal>

              {/* 02. BACKEND */}
              <Reveal delay={0.4}>
                <div className="space-y-6">
                  <span className="text-sm text-[#E9BCB9]/40 font-mono">02</span>
                  <h3 className="text-2xl font-medium text-[#E9BCB9]">Backend Architecture</h3>
                  <p className="text-sm text-[#E9BCB9]/70 leading-relaxed">
                    With expertise in Laravel and MySQL, I build robust server-side 
                    applications and APIs that are secure, scalable, and easy to 
                    maintain for long-term growth.
                  </p>
                </div>
              </Reveal>

              {/* 03. MOBILE & AI */}
              <Reveal delay={0.6}>
                <div className="space-y-6">
                  <span className="text-sm text-[#E9BCB9]/40 font-mono">03</span>
                  <h3 className="text-2xl font-medium text-[#E9BCB9]">AI & Mobile Integration</h3>
                  <p className="text-sm text-[#E9BCB9]/70 leading-relaxed">
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
               <Link 
                  href="/contactme"
                   className="group flex items-center gap-4 bg-[#ED9E59] text-[#1B1931] px-8 py-4 rounded-full font-medium transition-all hover:bg-[#E9BCB9]"
                >
                  Contact Me
                  <ArrowRight className="group-hover:translate-x-1 transition-transform" />
               </Link>
            </div>
          </Reveal>

        </div>
      </section>

      <Footer />
    </main>
  );
}