"use client";

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
  Plus
} from "lucide-react";
import Link from "next/link";
import Footer from "@/components/Footer";
import { Reveal } from "@/components/Reveal"; // Pastikan path import benar

const projects = [
  {
    name: "Morations",
    year: "2025",
    tools: "VB.NET, MySQL, RDLC Report",
    type: "software",
    description: "Desktop-based movie rating and subscription app with data-driven ratings and admin dashboard.",
    github: "https://github.com/akudhandi/morations",
    document: "https://drive.google.com/file/d/1stkUu3uJV8ug0gX3sN6FJ7xHw9GaAi1j/view?usp=drive_link",
    image: "bg-gradient-to-br from-blue-900/40 to-black"
  },
  {
    name: "Lunar Store",
    year: "2025",
    tools: "Laravel Livewire, Tailwind CSS, MySQL",
    type: "web",
    description: "Responsive e-commerce platform for selling digital subscriptions with integrated payment gateway.",
    github: "https://github.com/Hafidzrdwn/lunar_store_laravel",
    document: "https://drive.google.com/file/d/1rlhFBzOvXI0p0H3s4tOw4qHA_f5OxQaX/view?usp=drive_link",
    image: "bg-gradient-to-br from-emerald-900/40 to-black"
  },
  {
    name: "NextChamp",
    year: "2025",
    tools: "Flutter, Strapi, MySQL, Figma",
    type: "mobile",
    description: "Cross-platform mobile app for student competition mentorship with AI chatbot and discussion forum.",
    github: "https://github.com/akudhandi/nextchamp-strapi",
    image: "bg-gradient-to-br from-purple-900/40 to-black"
  },
  {
    name: "Blu by BCA Research",
    year: "2025",
    tools: "Jamovi, WarpPLS, Python",
    type: "research",
    description: "Research analyzing user acceptance of Blu by BCA Digital app using UTAUT framework.",
    doi: "https://doi.org/10.59934/jaiea.v4i3.1182",
    image: "bg-gradient-to-br from-pink-900/40 to-black"
  },
  {
    name: "Desk-Go",
    year: "2024",
    tools: "PHP, Bootstrap, MySQL",
    type: "web",
    description: "Web-based system for monitoring and booking seats in a coworking space.",
    document: "https://drive.google.com/file/d/1rlhFBzOvXI0p0H3s4tOw4qHA_f5OxQaX/view?usp=drive_link",
    image: "bg-gradient-to-br from-orange-900/40 to-black"
  }
];

const TypeIcon = ({ type }: { type: string }) => {
  switch (type) {
    case 'web': return <Globe size={20} />;
    case 'mobile': return <Smartphone size={20} />;
    case 'research': return <Microscope size={20} />;
    case 'software': return <Code size={20} />;
    case 'database': return <Database size={20} />;
    case 'networking': return <Network size={20} />;
    default: return <Code size={20} />;
  }
};

export default function ProjectsPage() {
  return (
    <main className="min-h-screen w-full bg-[#141516] text-white selection:bg-cyan-500">
      <Navbar />

      <section className="px-6 pt-40 pb-20">
        <div className="mx-auto max-w-7xl">
          {/* HEADER */}
          <Reveal>
            <div className="mb-16">
              <p className="text-cyan-400 font-medium tracking-widest uppercase text-sm mb-3">
                // Case Studies
              </p>
              <h1 className="text-6xl md:text-8xl font-semibold tracking-tighter">
                Projects
              </h1>
            </div>
          </Reveal>

          {/* LIST PROJECT UTAMA */}
          <div className="space-y-12">
            {projects.map((project, index) => (
              <Reveal key={index} delay={0.2}>
                <div 
                  className="group relative grid grid-cols-1 lg:grid-cols-2 gap-8 p-6 md:p-10 border border-white/5 rounded-[2.5rem] bg-white/[0.01] hover:bg-white/[0.02] transition-all duration-500"
                >
                  <div className="flex flex-col justify-between">
                    <div>
                      <div className="flex justify-between items-start mb-6">
                        <div className="flex items-center gap-4">
                          <div className="w-12 h-12 rounded-2xl bg-white/5 flex items-center justify-center text-cyan-400 border border-white/10">
                            <TypeIcon type={project.type} />
                          </div>
                          <span className="text-neutral-500 font-mono text-sm">{project.year}</span>
                        </div>
                      </div>
                      <h3 className="text-3xl font-medium mb-4">{project.name}</h3>
                      <p className="text-neutral-400 leading-relaxed text-lg mb-6">{project.description}</p>
                      <div className="flex gap-3">
                        {project.github && <a href={project.github} target="_blank" rel="noopener noreferrer" className="p-3 rounded-full bg-white/5 hover:bg-white/10 border border-white/5 transition-all text-neutral-400 hover:text-white"><Github size={20}/></a>}
                        {project.document && <a href={project.document} target="_blank" rel="noopener noreferrer" className="p-3 rounded-full bg-white/5 hover:bg-white/10 border border-white/5 transition-all text-neutral-400 hover:text-white"><HardDrive size={20}/></a>}
                        {project.doi && <a href={project.doi} target="_blank" rel="noopener noreferrer" className="p-3 rounded-full bg-white/5 hover:bg-white/10 border border-white/5 transition-all text-neutral-400 hover:text-white"><ExternalLink size={20}/></a>}
                      </div>
                    </div>
                    <Link href={project.github || project.document || "#"} target="_blank" className="mt-10 inline-flex items-center gap-2 w-fit px-8 py-3 rounded-full bg-white text-black font-bold hover:bg-cyan-400 transition-all">
                      View Project <ArrowUpRight size={18} />
                    </Link>
                  </div>
                  <div className={`h-[300px] lg:h-auto rounded-[2rem] ${project.image} border border-white/5 flex items-center justify-center overflow-hidden`}>
                     <span className="text-white/5 font-black text-9xl group-hover:scale-110 transition-transform duration-700">{project.name.charAt(0)}</span>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>

          {/* CTA GITHUB */}
          <Reveal delay={0.3}>
            <div className="mt-12 mb-32 flex justify-center">
              <a 
                href="https://github.com/akudhandi" 
                target="_blank"
                rel="noopener noreferrer"
                className="group flex items-center gap-4 px-10 py-6 border border-dashed border-white/20 rounded-[2rem] hover:border-cyan-400/50 hover:bg-white/[0.02] transition-all"
              >
                <div className="p-4 rounded-full bg-white/5 text-cyan-400 group-hover:rotate-12 transition-transform">
                  <Plus size={24} />
                </div>
                <div className="text-left">
                  <p className="text-white font-semibold text-lg">Want to see more?</p>
                  <p className="text-neutral-500 text-sm italic">Visit my GitHub for other repositories & contributions</p>
                </div>
              </a>
            </div>
          </Reveal>

          {/* ARCHIVE SECTION */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <Reveal delay={0.2}>
              <div className="p-10 border border-white/5 rounded-[2.5rem] bg-gradient-to-b from-white/[0.02] to-transparent hover:border-purple-500/30 transition-all h-full">
                <Award className="text-purple-400 mb-6" size={40} />
                <h2 className="text-3xl font-semibold mb-3">Certificates</h2>
                <p className="text-neutral-500 mb-8">Kumpulan sertifikasi profesional dan pencapaian akademik selama masa studi.</p>
                <a href="https://drive.google.com/drive/folders/1BjCH56LyAxKphfNeAYp5XzsoRxEaMv36?usp=sharing" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 text-white font-medium hover:text-purple-400 transition-colors">
                  Open Drive Folder <ExternalLink size={18} />
                </a>
              </div>
            </Reveal>

            <Reveal delay={0.4}>
              <div className="p-10 border border-white/5 rounded-[2.5rem] bg-gradient-to-b from-white/[0.02] to-transparent hover:border-cyan-500/30 transition-all h-full">
                <FileText className="text-cyan-400 mb-6" size={40} />
                <h2 className="text-3xl font-semibold mb-3">Project Documentation</h2>
                <p className="text-neutral-500 mb-8">Laporan teknis, analisis sistem, dan dokumentasi detail dari setiap proyek.</p>
                <a href="https://drive.google.com/drive/folders/1fl5fUtcjoHkte25901eRDgYC8aNFCIah?usp=sharing" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 text-white font-medium hover:text-cyan-400 transition-colors">
                  Open Drive Folder <ExternalLink size={18} />
                </a>
              </div>
            </Reveal>
          </div>
        </div>
      </section>
      
      <Footer />
    </main>
  );
}