"use client";

import { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import {
  Github,
  ExternalLink,
  HardDrive,
  Globe,
  Smartphone,
  Microscope,
  Code,
  Database,
  Network,
  ArrowUpRight,
} from "lucide-react";
import DriftWall from "@/components/DriftWall";

interface Project {
  name: string;
  year: string;
  tools: string[];
  role: string;
  description: string;
  type: string;
  slug: string;
  github?: string | null;
  document?: string | null;
  doi?: string | null;
  cover?: string | null;
}

const TILE_FALLBACK_COLOR: Record<string, string> = {
  web: "ED9E59",
  mobile: "A34054",
  research: "ED9E59",
  software: "A34054",
  database: "ED9E59",
  networking: "A34054",
};

const tileImage = (project: Project) =>
  project.cover ||
  `https://placehold.co/600x400/${TILE_FALLBACK_COLOR[project.type] ?? "662249"}/1B1931?text=${encodeURIComponent(project.name)}`;

interface FeaturedWorkProps {
  projects: Project[];
  filters: string[];
}

export default function FeaturedWork({ projects, filters }: FeaturedWorkProps) {
  const [filter, setFilter] = useState("all");
  const sectionRef = useRef<HTMLElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);
  const router = useRouter();

  const filteredProjects = filter === "all" ? projects : projects.filter((p) => p.type === filter);

  const wallItems = filteredProjects.map((p) => ({
    image: tileImage(p),
    title: p.name,
    href: `/projects/${p.slug}`,
  }));

  const getIcon = (type: string) => {
    switch (type) {
      case "web":
        return <Globe className="w-5 h-5" />;
      case "mobile":
        return <Smartphone className="w-5 h-5" />;
      case "research":
        return <Microscope className="w-5 h-5" />;
      case "software":
        return <Code className="w-5 h-5" />;
      case "database":
        return <Database className="w-5 h-5" />;
      case "networking":
        return <Network className="w-5 h-5" />;
      default:
        return <Code className="w-5 h-5" />;
    }
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case "web":
        return "bg-[#ED9E59]/20 text-[#ED9E59] border-[#ED9E59]/30";
      case "mobile":
        return "bg-[#A34054]/20 text-[#E9BCB9] border-[#A34054]/30";
      case "research":
        return "bg-[#ED9E59]/20 text-[#ED9E59] border-[#ED9E59]/30";
      case "software":
        return "bg-[#A34054]/20 text-[#E9BCB9] border-[#A34054]/30";
      case "database":
        return "bg-[#ED9E59]/20 text-[#ED9E59] border-[#ED9E59]/30";
      case "networking":
        return "bg-[#A34054]/20 text-[#E9BCB9] border-[#A34054]/30";
      default:
        return "bg-[#662249]/20 text-[#E9BCB9] border-[#662249]/30";
    }
  };

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

      gsap.fromTo(
        ".drift-wall-wrap",
        { opacity: 0, y: 40 },
        {
          opacity: 1,
          y: 0,
          duration: 0.9,
          ease: "power3.out",
          scrollTrigger: {
            trigger: gridRef.current,
            start: "top 80%",
            toggleActions: "play none none reverse",
          },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="projects"
      className="relative py-28 md:py-36 px-4 md:px-10 max-w-7xl mx-auto w-full"
    >
      <div ref={headerRef} className="mb-16">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-8">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-[#662249] bg-[#44174E]/40 text-xs font-mono uppercase tracking-widest text-[#ED9E59] mb-4">
              <span className="w-1.5 h-1.5 rounded-full bg-[#ED9E59] animate-pulse" />
              Portfolio Showcase
            </div>

            <h2 className="text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight text-[#E9BCB9] mb-4">
              Featured Work
            </h2>
            <p className="text-[#E9BCB9]/70 text-base md:text-lg max-w-2xl">
              Recent projects spanning development, design, and research.
            </p>
          </div>

          <div className="flex gap-2 overflow-x-auto pb-2 md:pb-0 scrollbar-hide">
            {filters.map((cat) => (
              <button
                key={cat}
                onClick={() => setFilter(cat)}
                className={`px-4 py-2.5 rounded-full text-sm font-medium transition-all duration-300 whitespace-nowrap border ${
                  filter === cat
                    ? "bg-[#ED9E59] text-[#1B1931] border-[#ED9E59] shadow-lg shadow-[#ED9E59]/30"
                    : "bg-[#44174E]/40 text-[#E9BCB9]/70 border-[#662249] hover:bg-[#A34054]/20 hover:border-[#ED9E59]/40 hover:text-[#ED9E59]"
                }`}
              >
                {cat.charAt(0).toUpperCase() + cat.slice(1)}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div ref={gridRef}>
        <div className="drift-wall-wrap h-[480px] w-full md:h-[560px]">
          {wallItems.length > 0 ? (
            <DriftWall
              items={wallItems}
              columns={5}
              tileWidth={220}
              tileHeight={140}
              gap={18}
              radius={14}
              perspective={1200}
              speed={42}
              pauseOnHover
              lift={64}
              dim={0.55}
              overlayColor="#1B1931"
              aria-label="Project showcase wall"
            />
          ) : (
            <div className="flex h-full items-center justify-center rounded-2xl border border-[#662249] bg-[#44174E]/40">
              <p className="text-sm text-[#E9BCB9]/60">No projects in this category yet.</p>
            </div>
          )}
        </div>
        <p className="mt-4 text-center font-mono text-xs uppercase tracking-widest text-[#E9BCB9]/40">
          Hover to spotlight — click a tile to open the case study
        </p>

        <div className="mt-8 divide-y divide-[#662249]/60 rounded-2xl border border-[#662249] bg-[#44174E]/40">
          {filteredProjects.map((project) => (
            <div
              key={project.slug}
              onClick={() => router.push(`/projects/${project.slug}`)}
              className="group flex cursor-pointer items-center gap-4 px-5 py-4 transition-colors hover:bg-[#A34054]/10 sm:px-6"
            >
              <div className={`hidden p-2.5 rounded-xl border sm:block ${getTypeColor(project.type)}`}>
                {getIcon(project.type)}
              </div>
              <div className="min-w-0 flex-1">
                <h3 className="truncate text-base font-bold text-[#E9BCB9] transition-colors group-hover:text-[#ED9E59] sm:text-lg">
                  {project.name}
                </h3>
                <p className="mt-0.5 truncate font-mono text-xs text-[#E9BCB9]/50">
                  {project.role} — {project.year} — {project.tools.slice(0, 3).join(" · ")}
                </p>
              </div>
              <div className="flex items-center gap-2">
                {project.github && (
                  <a
                    href={project.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={(e) => e.stopPropagation()}
                    aria-label="GitHub repository"
                    className="rounded-lg border border-[#662249] bg-[#1B1931]/60 p-2 text-[#E9BCB9]/70 transition-all hover:bg-[#ED9E59]/10 hover:text-[#ED9E59]"
                  >
                    <Github className="h-4 w-4" />
                  </a>
                )}
                {project.document && (
                  <a
                    href={project.document}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={(e) => e.stopPropagation()}
                    aria-label="Project document"
                    className="rounded-lg border border-[#662249] bg-[#1B1931]/60 p-2 text-[#E9BCB9]/70 transition-all hover:bg-[#ED9E59]/10 hover:text-[#ED9E59]"
                  >
                    <HardDrive className="h-4 w-4" />
                  </a>
                )}
                {project.doi && (
                  <a
                    href={project.doi}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={(e) => e.stopPropagation()}
                    aria-label="DOI link"
                    className="rounded-lg border border-[#662249] bg-[#1B1931]/60 p-2 text-[#E9BCB9]/70 transition-all hover:bg-[#ED9E59]/10 hover:text-[#ED9E59]"
                  >
                    <ExternalLink className="h-4 w-4" />
                  </a>
                )}
                <span className="flex h-8 w-8 items-center justify-center rounded-full border border-[#662249] bg-[#1B1931]/60 transition-all duration-300 group-hover:rotate-45 group-hover:border-[#ED9E59]/40">
                  <ArrowUpRight className="h-4 w-4 text-[#ED9E59]" />
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}