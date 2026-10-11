"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Briefcase, GraduationCap, Award, Calendar } from "lucide-react";
import ScrollReveal from "@/components/ScrollReveal";

interface ExperienceItem {
  title: string;
  role: string;
  year: string;
  type: string;
  description: string;
}

interface ExperienceTimelineProps {
  experiences: ExperienceItem[];
}

export default function ExperienceTimeline({ experiences }: ExperienceTimelineProps) {
  const sectionRef = useRef<HTMLElement>(null);
  const lineDesktopRef = useRef<HTMLDivElement>(null);
  const lineMobileRef = useRef<HTMLDivElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (typeof window === "undefined") return;
    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      gsap.from(headerRef.current, {
        opacity: 0,
        y: 30,
        duration: 1,
        ease: "power3.out",
        scrollTrigger: {
          trigger: headerRef.current,
          start: "top 85%",
          toggleActions: "play none none reverse",
        },
      });

      ScrollTrigger.matchMedia({
        "(min-width: 768px)": () => {
          gsap.fromTo(
            lineDesktopRef.current,
            { scaleY: 0 },
            {
              scaleY: 1,
              transformOrigin: "top center",
              ease: "power2.out",
              duration: 1.5,
              scrollTrigger: {
                trigger: sectionRef.current,
                start: "top 70%",
                end: "bottom 30%",
                scrub: 1.2,
              },
            }
          );

          const cards = gsap.utils.toArray<HTMLElement>(".timeline-card");
          cards.forEach((card) => {
            const isLeft = card.classList.contains("timeline-card-left");
            gsap.fromTo(
              card,
              {
                opacity: 0,
                x: isLeft ? -50 : 50,
                scale: 0.96,
              },
              {
                opacity: 1,
                x: 0,
                scale: 1,
                duration: 1.2,
                ease: "power3.out",
                scrollTrigger: {
                  trigger: card,
                  start: "top 85%",
                  end: "top 55%",
                  toggleActions: "play none none reverse",
                },
              }
            );
          });

          const nodes = gsap.utils.toArray<HTMLElement>(".timeline-node");
          nodes.forEach((node) => {
            gsap.fromTo(
              node,
              { scale: 0, opacity: 0 },
              {
                scale: 1,
                opacity: 1,
                duration: 0.8,
                ease: "back.out(1.7)",
                scrollTrigger: {
                  trigger: node,
                  start: "top 80%",
                  toggleActions: "play none none reverse",
                },
              }
            );
          });
        },

        "(max-width: 767px)": () => {
          gsap.fromTo(
            lineMobileRef.current,
            { scaleY: 0 },
            {
              scaleY: 1,
              transformOrigin: "top center",
              ease: "power2.out",
              duration: 1.5,
              scrollTrigger: {
                trigger: sectionRef.current,
                start: "top 70%",
                end: "bottom 30%",
                scrub: 1.2,
              },
            }
          );

          const cards = gsap.utils.toArray<HTMLElement>(".timeline-card");
          cards.forEach((card) => {
            gsap.fromTo(
              card,
              { opacity: 0, y: 30 },
              {
                opacity: 1,
                y: 0,
                duration: 0.8,
                ease: "power3.out",
                scrollTrigger: {
                  trigger: card,
                  start: "top 85%",
                  toggleActions: "play none none reverse",
                },
              }
            );
          });
        },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const getTypeIcon = (type: string) => {
    switch (type.toLowerCase()) {
      case "work":
      case "freelance":
        return <Briefcase className="w-5 h-5 text-[#ED9E59]" />;
      case "education":
        return <GraduationCap className="w-5 h-5 text-[#ED9E59]" />;
      default:
        return <Award className="w-5 h-5 text-[#ED9E59]" />;
    }
  };

  const getTypeBadge = (type: string) => {
    switch (type.toLowerCase()) {
      case "work":
        return "border-[#ED9E59]/30 bg-[#ED9E59]/10 text-[#ED9E59]";
      case "education":
        return "border-[#A34054]/30 bg-[#A34054]/10 text-[#E9BCB9]";
      default:
        return "border-[#662249]/50 bg-[#662249]/20 text-[#ED9E59]";
    }
  };

  return (
    <section
      ref={sectionRef}
      id="experience"
      className="relative py-28 md:py-36 px-4 md:px-10 max-w-6xl mx-auto w-full overflow-hidden"
    >
      <div 
        aria-hidden="true" 
        className="pointer-events-none absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-[#A34054]/10 blur-[150px] rounded-full" 
      />

      <div ref={headerRef} className="mb-24 text-center max-w-2xl mx-auto">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-[#662249] bg-[#44174E]/40 text-xs font-mono uppercase tracking-widest text-[#ED9E59] mb-4">
          <span className="w-1.5 h-1.5 rounded-full bg-[#ED9E59] animate-pulse" />
          Career & Education
        </div>

        <ScrollReveal
          baseOpacity={0.15}
          blurStrength={3}
          textClassName="text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight text-[#E9BCB9]"
        >
          Track Record of Growth
        </ScrollReveal>

        <p className="text-[#E9BCB9]/70 mt-4 text-base md:text-lg max-w-2xl">
          An overview of milestones, hands-on engineering experience, and technical leadership.
        </p>
      </div>

      <div className="relative">
        <div
          ref={lineDesktopRef}
          aria-hidden="true"
          className="hidden md:block absolute left-1/2 top-0 bottom-0 w-[2px] bg-gradient-to-b from-[#ED9E59]/40 via-[#A34054]/40 to-[#662249]/40"
        />

        <div
          ref={lineMobileRef}
          aria-hidden="true"
          className="md:hidden absolute left-6 top-0 bottom-0 w-[2px] bg-gradient-to-b from-[#ED9E59]/40 via-[#A34054]/40 to-[#662249]/40"
        />

        <div className="space-y-12 md:space-y-24">
          {experiences.map((exp, index) => {
            const isLeft = index % 2 === 0;

            return (
              <div
                key={index}
                className={`relative flex flex-col md:flex-row items-center ${
                  isLeft ? "md:flex-row-reverse" : ""
                }`}
              >
                <div
                  className={`w-full md:w-1/2 pl-12 md:pl-0 ${
                    isLeft ? "md:pl-12" : "md:pr-12"
                  }`}
                >
                  <div
                    className={`timeline-card ${
                      isLeft ? "timeline-card-right" : "timeline-card-left"
                    }`}
                  >
                    <div className="group relative p-8 rounded-2xl border border-[#662249] bg-[#44174E]/80 backdrop-blur-sm hover:border-[#ED9E59]/30 transition-all duration-500">
                      <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-[#ED9E59]/[0.03] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                      <div className="relative z-10">
                        <div className="flex items-center justify-between mb-4">
                          <span className={`text-xs px-3 py-1 rounded-full border font-mono ${getTypeBadge(exp.type)}`}>
                            {exp.type}
                          </span>
                          <div className="p-2 rounded-xl border border-[#662249] bg-[#1B1931]/60">
                            {getTypeIcon(exp.type)}
                          </div>
                        </div>

                        <h3 className="text-2xl font-bold text-[#E9BCB9] mb-2 group-hover:text-[#ED9E59] transition-colors">
                          {exp.title}
                        </h3>

                        <p className="text-[#ED9E59] text-sm font-medium mb-4">
                          {exp.role}
                        </p>

                        <p className="text-[#E9BCB9]/70 text-sm leading-relaxed mb-4">
                          {exp.description}
                        </p>

                        <div className="flex items-center gap-2 text-xs text-[#E9BCB9]/50 font-mono">
                          <Calendar className="w-3.5 h-3.5" />
                          <span>{exp.year}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="hidden md:flex absolute left-1/2 -translate-x-1/2 items-center justify-center z-10 timeline-node">
                  <div className="relative w-6 h-6 rounded-full border-4 border-[#1B1931] bg-gradient-to-br from-[#ED9E59] via-[#A34054] to-[#662249] shadow-lg shadow-[#ED9E59]/30" />
                </div>

                <div className="md:hidden absolute left-6 top-8 -translate-x-1/2 w-4 h-4 rounded-full border-4 border-[#1B1931] bg-gradient-to-br from-[#ED9E59] via-[#A34054] to-[#662249]" />
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
