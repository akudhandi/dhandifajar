"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Navbar from "@/components/Navbar";
import {
  ArrowUpRight,
  Github,
  HardDrive,
  ExternalLink,
  Globe,
  Smartphone,
  Microscope,
  Code,
  Database,
  Network,
  Award,
  FileText,
  Plus,
} from "lucide-react";
import Link from "next/link";
import Footer from "@/components/Footer";
import { useSiteContent } from "@/lib/use-content";

const TypeIcon = ({ type }: { type: string }) => {
  switch (type) {
    case "web":
      return <Globe className="w-6 h-6" />;
    case "mobile":
      return <Smartphone className="w-6 h-6" />;
    case "research":
      return <Microscope className="w-6 h-6" />;
    case "software":
      return <Code className="w-6 h-6" />;
    case "database":
      return <Database className="w-6 h-6" />;
    case "networking":
      return <Network className="w-6 h-6" />;
    default:
      return <Code className="w-6 h-6" />;
  }
};

export default function ProjectsPage() {
  const content = useSiteContent();
  const projects = content.projects;
  const sectionRef = useRef<HTMLElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const heroTitleRef = useRef<HTMLHeadingElement>(null);
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);

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

      const titleEl = heroTitleRef.current;
      if (titleEl) {
        const text = titleEl.textContent || "";
        titleEl.innerHTML = text.split("").map((char) => `<span class="inline-block">${char === " " ? "&nbsp;" : char}</span>`).join("");
        const chars = titleEl.querySelectorAll("span");
        gsap.from(chars, {
          opacity: 0,
          y: 60,
          rotateX: -90,
          duration: 0.8,
          stagger: 0.03,
          ease: "back.out(1.7)",
          transformOrigin: "50% 100%",
          scrollTrigger: {
            trigger: titleEl,
            start: "top 80%",
            toggleActions: "play none none reverse",
          },
        });
      }

      const cards = cardRefs.current;
      if (cards.length > 0) {
        gsap.from(cards, {
          opacity: 0,
          y: 50,
          scale: 0.96,
          duration: 0.9,
          stagger: 0.15,
          ease: "power3.out",
          scrollTrigger: {
            trigger: cards[0],
            start: "top 85%",
            toggleActions: "play none none reverse",
          },
        });
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <main
      ref={sectionRef}
      className="min-h-screen w-full bg-[#1B1931] text-[#E9BCB9] selection:bg-[#ED9E59] selection:text-[#1B1931]"
    >
      <Navbar />

      <section className="px-6 pt-40 pb-32">
        <div className="mx-auto max-w-7xl">
          <div ref={headerRef} className="mb-20 md:mb-32">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-[#662249] bg-[#44174E]/40 text-xs font-mono uppercase tracking-widest text-[#ED9E59] mb-6">
              <span className="w-2 h-2 rounded-full bg-[#ED9E59] animate-pulse" />
              Case Studies
            </div>

            <h1
              ref={heroTitleRef}
              className="text-6xl md:text-7xl lg:text-8xl font-bold tracking-tighter text-[#E9BCB9] leading-tight"
            >
              Projects
            </h1>
            <p className="mt-6 text-[#E9BCB9]/70 text-lg md:text-xl max-w-2xl">
              A curated collection of work spanning web, mobile, research, and
              software systems.
            </p>
          </div>

          <div className="space-y-12 md:space-y-16">
            {projects.map((project, index) => {
              const cardRef = (el: HTMLDivElement | null) => {
                cardRefs.current[index] = el;
              };

              return (
                <div key={index} ref={cardRef} className="group">
                  <div className="relative grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 p-8 md:p-12 rounded-3xl border border-[#662249] bg-[#44174E]/50 backdrop-blur-sm hover:border-[#ED9E59]/40 transition-all duration-700">
                    <div className="flex flex-col justify-between">
                      <div>
                        <div className="flex items-center gap-4 mb-8">
                          <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-[#ED9E59]/10 to-[#A34054]/5 border border-[#662249] flex items-center justify-center text-[#ED9E59] group-hover:scale-110 group-hover:border-[#ED9E59]/50 transition-all duration-500">
                            <TypeIcon type={project.type} />
                          </div>
                          <span className="text-[#E9BCB9]/50 font-mono text-sm group-hover:text-[#ED9E59] transition-colors">
                            {project.year}
                          </span>
                        </div>

                        <h3 className="text-3xl md:text-4xl font-bold text-[#E9BCB9] mb-5 group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-[#E9BCB9] group-hover:to-[#ED9E59] transition-all">
                          {project.name}
                        </h3>

                        <p className="text-[#E9BCB9]/70 leading-relaxed text-lg md:text-xl mb-8">
                          {project.description}
                        </p>

                        <div className="flex flex-wrap gap-3">
                          {project.github_url && (
                            <a
                              href={project.github_url}
                              target="_blank"
                              rel="noopener noreferrer"
                              aria-label={`${project.name} GitHub`}
                              className="p-4 rounded-full bg-[#1B1931]/60 border border-[#662249] text-[#E9BCB9]/70 hover:text-[#ED9E59] hover:bg-[#ED9E59]/10 hover:border-[#ED9E59]/30 transition-all"
                            >
                              <Github className="w-5 h-5" />
                            </a>
                          )}
                          {project.doc_url && (
                            <a
                              href={project.doc_url}
                              target="_blank"
                              rel="noopener noreferrer"
                              aria-label={`${project.name} documentation`}
                              className="p-4 rounded-full bg-[#1B1931]/60 border border-[#662249] text-[#E9BCB9]/70 hover:text-[#ED9E59] hover:bg-[#ED9E59]/10 hover:border-[#ED9E59]/30 transition-all"
                            >
                              <HardDrive className="w-5 h-5" />
                            </a>
                          )}
                          {project.doi_url && (
                            <a
                              href={project.doi_url}
                              target="_blank"
                              rel="noopener noreferrer"
                              aria-label={`${project.name} publication`}
                              className="p-4 rounded-full bg-[#1B1931]/60 border border-[#662249] text-[#E9BCB9]/70 hover:text-[#ED9E59] hover:bg-[#ED9E59]/10 hover:border-[#ED9E59]/30 transition-all"
                            >
                              <ExternalLink className="w-5 h-5" />
                            </a>
                          )}
                        </div>
                      </div>

                      <Link
                        href={`/projects/${project.slug}`}
                        className="mt-12 inline-flex items-center gap-3 px-8 py-4 rounded-2xl bg-[#ED9E59] text-[#1B1931] font-bold hover:bg-[#ED9E59]/90 hover:shadow-lg hover:shadow-[#ED9E59]/30 transition-all group-hover:scale-105"
                      >
                        View Case Study <ArrowUpRight className="w-5 h-5" />
                      </Link>
                    </div>

                    <div className="relative rounded-2xl border border-[#662249] bg-[#1B1931] overflow-hidden group-hover:border-[#ED9E59]/30 transition-all duration-700">
                      {project.cover_url ? (
                        <img
                          src={project.cover_url}
                          alt={project.name}
                          className="w-full h-[400px] lg:h-auto object-cover group-hover:scale-110 transition-transform duration-1000 ease-out"
                          loading="lazy"
                        />
                      ) : (
                        <div className="w-full h-[400px] lg:h-auto flex items-center justify-center bg-gradient-to-br from-[#44174E]/50 to-[#1B1931]/50">
                          <span className="text-[#E9BCB9]/10 font-black text-8xl">
                            {project.name.charAt(0)}
                          </span>
                        </div>
                      )}
                      <div className="absolute inset-0 bg-gradient-to-t from-[#1B1931]/90 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {content.certificates.length > 0 && (
            <div className="mt-24 mb-32">
              <div className="mb-12">
                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-[#662249] bg-[#44174E]/40 text-xs font-mono uppercase tracking-widest text-[#ED9E59] mb-4">
                  <Award className="w-2 h-2 text-[#ED9E59]" />
                  Recognition
                </div>
                <h2 className="text-4xl md:text-5xl font-bold text-[#E9BCB9]">
                  Certificates
                </h2>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {content.certificates.map((c) => (
                  <div
                    key={c.id}
                    className="group p-8 rounded-2xl border border-[#662249] bg-[#44174E]/50 backdrop-blur-sm hover:border-[#ED9E59]/40 hover:bg-[#44174E]/70 transition-all duration-500"
                  >
                    <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[#ED9E59]/20 to-[#ED9E59]/10 border border-[#ED9E59]/30 flex items-center justify-center text-[#ED9E59] mb-6 group-hover:scale-110 group-hover:border-[#ED9E59] transition-all">
                      <Award className="w-6 h-6" />
                    </div>
                    <h3 className="text-xl font-bold text-[#E9BCB9] mb-2 group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-[#E9BCB9] group-hover:to-[#ED9E59] transition-all">
                      {c.title}
                    </h3>
                    <p className="text-[#E9BCB9]/50 text-sm mb-4 font-mono">
                      {c.issuer} • {c.year}
                    </p>
                    <div className="flex gap-3">
                      {c.credential_url && (
                        <a
                          href={c.credential_url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-2 text-sm text-[#E9BCB9]/70 hover:text-[#ED9E59] transition-colors"
                        >
                          Credential
                          <ExternalLink className="w-4 h-4" />
                        </a>
                      )}
                      {c.file_url && (
                        <a
                          href={c.file_url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-2 text-sm text-[#E9BCB9]/70 hover:text-[#ED9E59] transition-colors"
                        >
                          File
                          <FileText className="w-4 h-4" />
                        </a>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-32">
            <div className="group p-10 rounded-3xl border border-[#662249] bg-gradient-to-b from-[#44174E]/60 to-transparent hover:border-[#ED9E59]/40 transition-all duration-500">
              <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-[#ED9E59]/20 to-[#ED9E59]/10 border border-[#ED9E59]/30 flex items-center justify-center text-[#ED9E59] mb-8 group-hover:scale-110 group-hover:border-[#ED9E59] transition-all">
                <Award className="w-8 h-8" />
              </div>
              <h2 className="text-3xl font-bold text-[#E9BCB9] mb-4 group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-[#E9BCB9] group-hover:to-[#ED9E59] transition-all">
                Certificates
              </h2>
              <p className="text-[#E9BCB9]/70 mb-8 leading-relaxed">
                Professional certifications and academic achievements from
                coursework, bootcamps, and industry programs.
              </p>
              <a
                href={
                  content.profile.certificates_url ??
                  "https://drive.google.com/drive/folders/1BjCH56LyAxKphfNeAYp5XzsoRxEaMv36?usp=sharing"
                }
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-3 text-[#E9BCB9] font-medium hover:text-[#ED9E59] transition-colors"
              >
                Open Drive Folder
                <ArrowUpRight className="w-5 h-5" />
              </a>
            </div>

            <div className="group p-10 rounded-3xl border border-[#662249] bg-gradient-to-b from-[#44174E]/60 to-transparent hover:border-[#A34054]/60 transition-all duration-500">
              <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-[#A34054]/30 to-[#A34054]/10 border border-[#A34054]/40 flex items-center justify-center text-[#ED9E59] mb-8 group-hover:scale-110 group-hover:border-[#ED9E59] transition-all">
                <FileText className="w-8 h-8" />
              </div>
              <h2 className="text-3xl font-bold text-[#E9BCB9] mb-4 group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-[#E9BCB9] group-hover:to-[#ED9E59] transition-all">
                Project Documentation
              </h2>
              <p className="text-[#E9BCB9]/70 mb-8 leading-relaxed">
                Technical reports, system analysis, and comprehensive
                documentation for each project.
              </p>
              <a
                href={
                  content.profile.docs_url ??
                  "https://drive.google.com/drive/folders/1fl5fUtcjoHkte25901eRDgYC8aNFCIah?usp=sharing"
                }
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-3 text-[#E9BCB9] font-medium hover:text-[#ED9E59] transition-colors"
              >
                Open Drive Folder
                <ArrowUpRight className="w-5 h-5" />
              </a>
            </div>
          </div>

          <div className="flex justify-center mb-32">
            <a
              href="https://github.com/akudhandi"
              target="_blank"
              rel="noopener noreferrer"
              className="group flex items-center gap-6 px-12 py-8 rounded-[2rem] border border-dashed border-[#662249] hover:border-[#ED9E59]/50 hover:bg-[#44174E]/30 transition-all duration-500 hover:scale-105"
            >
              <div className="w-16 h-16 rounded-2xl bg-[#44174E]/40 text-[#ED9E59] group-hover:rotate-12 transition-transform duration-500 flex items-center justify-center border border-[#662249]">
                <Plus size={32} />
              </div>
              <div className="text-left">
                <p className="text-[#E9BCB9] font-semibold text-lg mb-1">
                  Want to see more?
                </p>
                <p className="text-[#E9BCB9]/50 text-sm italic">
                  Visit my GitHub for other repositories &amp; contributions
                </p>
              </div>
            </a>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
