"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { motion, AnimatePresence } from "framer-motion";
import { PenTool, Layout, BarChart3, Zap } from "lucide-react";
import FlexCarousel from "@/components/FlexCarousel";

interface ServiceItem {
  number: string;
  title: string;
  subtitle: string;
  icon: React.ReactNode;
  description: string;
  deliverables: string[];
  accentColor: string;
  glowClass: string;
  tagColor: string;
}

const services: ServiceItem[] = [
  {
    number: "01",
    title: "UI & UX Design",
    subtitle: "Product Architecture & Interfaces",
    icon: <PenTool className="w-6 h-6" />,
    description: "Designing tactile, high-conversion digital interfaces rooted in cognitive psychology, atomic systems, and bespoke micro-interactions.",
    deliverables: ["Design Systems", "Interactive Prototypes", "Wireframing", "Usability Audit"],
    accentColor: "#ED9E59",
    glowClass: "from-[#ED9E59]/20 via-[#ED9E59]/5 to-transparent",
    tagColor: "border-[#ED9E59]/20 text-[#ED9E59] bg-[#ED9E59]/5",
  },
  {
    number: "02",
    title: "Web & Mobile App",
    subtitle: "Full-Cycle Engineering",
    icon: <Layout className="w-6 h-6" />,
    description: "Architecting resilient, production-grade applications using modern frameworks with zero layout shift and 60fps interaction budgets.",
    deliverables: ["Next.js & React 19", "Mobile App (Flutter)", "State Management", "Tailwind CSS v4"],
    accentColor: "#A34054",
    glowClass: "from-[#A34054]/20 via-[#A34054]/5 to-transparent",
    tagColor: "border-[#A34054]/20 text-[#E9BCB9] bg-[#A34054]/10",
  },
  {
    number: "03",
    title: "Data Analytics",
    subtitle: "Intelligence & Quantitative Models",
    icon: <BarChart3 className="w-6 h-6" />,
    description: "Extracting actionable enterprise clarity from complex datasets via statistical inference, pipeline automation, and executive dashboards.",
    deliverables: ["Python & Pandas", "Interactive Dashboards", "Statistical Modeling", "Research Analytics"],
    accentColor: "#ED9E59",
    glowClass: "from-[#ED9E59]/20 via-[#ED9E59]/5 to-transparent",
    tagColor: "border-[#ED9E59]/20 text-[#ED9E59] bg-[#ED9E59]/5",
  },
  {
    number: "04",
    title: "Core Development",
    subtitle: "API, Systems & Scale",
    icon: <Zap className="w-6 h-6" />,
    description: "Building resilient backends, sub-millisecond API services, relational models, and secure cloud pipelines engineered for high throughput.",
    deliverables: ["Supabase & PostgreSQL", "REST & RPC APIs", "Auth Security", "Performance Tuning"],
    accentColor: "#A34054",
    glowClass: "from-[#A34054]/20 via-[#A34054]/5 to-transparent",
    tagColor: "border-[#A34054]/20 text-[#E9BCB9] bg-[#A34054]/10",
  },
];

const serviceVisuals = [
  {
    src: "https://images.unsplash.com/photo-1561070791-2526d30994b5?w=1200&q=80&auto=format&fit=crop",
    alt: "UI and UX design workspace",
  },
  {
    src: "https://images.unsplash.com/photo-1547658719-da2b51169166?w=1200&q=80&auto=format&fit=crop",
    alt: "Web and mobile app development",
  },
  {
    src: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=1200&q=80&auto=format&fit=crop",
    alt: "Data analytics dashboards",
  },
  {
    src: "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=1200&q=80&auto=format&fit=crop",
    alt: "Backend server infrastructure",
  },
];

export default function WhatIDo() {
  const sectionRef = useRef<HTMLElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const [activeService, setActiveService] = useState(0);
  const service = services[activeService];

  useEffect(() => {
    if (typeof window === "undefined") return;
    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      const headerTl = gsap.timeline({
        scrollTrigger: {
          trigger: headerRef.current,
          start: "top 85%",
          end: "bottom 60%",
          toggleActions: "play none none reverse",
        },
      });

      headerTl
        .fromTo(
          ".whatido-eyebrow",
          { opacity: 0, y: 20 },
          { opacity: 1, y: 0, duration: 0.6, ease: "power3.out" }
        )
        .fromTo(
          ".whatido-title",
          { opacity: 0, y: 30 },
          { opacity: 1, y: 0, duration: 0.8, ease: "power3.out" },
          "-=0.4"
        )
        .fromTo(
          ".whatido-desc",
          { opacity: 0, y: 20 },
          { opacity: 1, y: 0, duration: 0.6, ease: "power3.out" },
          "-=0.5"
        );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const flexItems = services.map((item, i) => ({
    src: serviceVisuals[i].src,
    alt: serviceVisuals[i].alt,
    title: item.title,
    subtitle: item.subtitle,
  }));

  return (
    <section
      ref={sectionRef}
      id="services"
      className="relative py-28 md:py-36 px-4 md:px-10 max-w-7xl mx-auto w-full overflow-hidden"
    >
      <div 
        aria-hidden="true" 
        className="pointer-events-none absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] bg-[#A34054]/10 blur-[140px] rounded-full" 
      />

      <div ref={headerRef} className="mb-16 text-center max-w-3xl mx-auto">
        <div className="whatido-eyebrow inline-flex items-center gap-2 px-3 py-1 rounded-full border border-[#662249] bg-[#44174E]/40 text-xs font-mono uppercase tracking-widest text-[#ED9E59] mb-6">
          <span className="w-1.5 h-1.5 rounded-full bg-[#ED9E59] animate-pulse" />
          Core Disciplines
        </div>

        <h2 className="whatido-title text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight text-[#E9BCB9] mb-6">
          Creating Digital <br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#ED9E59] via-[#E9BCB9] to-[#A34054]">
            Solutions with Intention
          </span>
        </h2>

        <p className="whatido-desc text-[#E9BCB9]/70 text-base md:text-lg leading-relaxed">
          Bridging meticulous visual refinement and architectural rigor to build
          software that converts, performs, and lasts.
        </p>
      </div>

      <div className="relative z-10 w-full">
        <div className="h-[360px] w-full sm:h-[420px]">
          <FlexCarousel
            items={flexItems}
            preset="liquid"
            cardHeight={0.52}
            gap={14}
            radius={20}
            autoplay
            interval={4}
            captions
            onChange={(index) => setActiveService(index)}
          />
        </div>

        <div className="mx-auto mt-10 max-w-3xl">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeService}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              transition={{ duration: 0.35, ease: "easeOut" }}
              className={`relative overflow-hidden rounded-3xl border border-[#662249] bg-[#44174E]/60 p-6 text-left backdrop-blur-md sm:p-8`}
            >
              <div
                aria-hidden="true"
                className={`pointer-events-none absolute -inset-px bg-gradient-to-br ${service.glowClass}`}
              />
              <div className="relative z-10">
                <div className="mb-4 flex items-center justify-between">
                  <span className="font-mono text-xs uppercase tracking-widest text-[#E9BCB9]/60">
                    {service.number} {'//'} {service.subtitle}
                  </span>
                  <div
                    className="rounded-2xl border border-[#662249] bg-[#1B1931]/60 p-3"
                    style={{ color: service.accentColor }}
                  >
                    {service.icon}
                  </div>
                </div>
                <h3 className="text-xl font-bold tracking-tight text-[#E9BCB9] sm:text-2xl">
                  {service.title}
                </h3>
                <p className="mt-3 text-sm leading-relaxed text-[#E9BCB9]/80">
                  {service.description}
                </p>
                <div className="mt-5 flex flex-wrap gap-2 border-t border-[#662249]/60 pt-5">
                  {service.deliverables.map((item, dIdx) => (
                    <span
                      key={dIdx}
                      className={`rounded-full border px-2.5 py-1 font-mono text-xs ${service.tagColor}`}
                    >
                      {item}
                    </span>
                  ))}
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}
