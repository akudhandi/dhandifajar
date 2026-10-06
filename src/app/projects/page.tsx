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
import { useSiteContent } from "@/lib/use-content";

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
  const content = useSiteContent();
  const projects = content.projects;
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
                        {project.github_url && <a href={project.github_url} target="_blank" rel="noopener noreferrer" aria-label={`${project.name} GitHub`} className="p-3 rounded-full bg-white/5 hover:bg-white/10 border border-white/5 transition-all text-neutral-400 hover:text-white"><Github size={20}/></a>}
                        {project.doc_url && <a href={project.doc_url} target="_blank" rel="noopener noreferrer" aria-label={`${project.name} documentation`} className="p-3 rounded-full bg-white/5 hover:bg-white/10 border border-white/5 transition-all text-neutral-400 hover:text-white"><HardDrive size={20}/></a>}
                        {project.doi_url && <a href={project.doi_url} target="_blank" rel="noopener noreferrer" aria-label={`${project.name} publication`} className="p-3 rounded-full bg-white/5 hover:bg-white/10 border border-white/5 transition-all text-neutral-400 hover:text-white"><ExternalLink size={20}/></a>}
                      </div>
                    </div>
                    <Link href={`/projects/${project.slug}`} className="mt-10 inline-flex items-center gap-2 w-fit px-8 py-3 rounded-full bg-white text-black font-bold hover:bg-cyan-400 transition-all">
                      View Project <ArrowUpRight size={18} />
                    </Link>
                  </div>
                  <div className={`h-[300px] lg:h-auto rounded-[2rem] ${project.cover_url ? "" : project.gradient} border border-white/5 flex items-center justify-center overflow-hidden`}>
                    {project.cover_url ? (
                      <img src={project.cover_url} alt={project.name} className="h-full w-full object-cover group-hover:scale-105 transition-transform duration-700" loading="lazy" />
                    ) : (
                      <span className="text-white/5 font-black text-9xl group-hover:scale-110 transition-transform duration-700">{project.name.charAt(0)}</span>
                    )}
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

          {/* CERTIFICATES GRID (dari admin, bila ada) */}
          {content.certificates.length > 0 && (
            <div className="mb-16">
              <Reveal>
                <h2 className="text-3xl font-semibold mb-8">Certificates</h2>
              </Reveal>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {content.certificates.map((c, i) => (
                  <Reveal key={c.id} delay={i * 0.1}>
                    <div className="p-8 border border-white/5 rounded-[2rem] bg-white/[0.01] hover:bg-white/[0.03] hover:border-purple-500/30 transition-all h-full">
                      <Award className="text-purple-400 mb-4" size={32} />
                      <h3 className="text-xl font-semibold mb-1">{c.title}</h3>
                      <p className="text-neutral-500 text-sm mb-4">{c.issuer} • {c.year}</p>
                      <div className="flex gap-3">
                        {c.credential_url && <a href={c.credential_url} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 text-sm text-white font-medium hover:text-purple-400 transition-colors">Credential <ExternalLink size={16} /></a>}
                        {c.file_url && <a href={c.file_url} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 text-sm text-white font-medium hover:text-purple-400 transition-colors">File <FileText size={16} /></a>}
                      </div>
                    </div>
                  </Reveal>
                ))}
              </div>
            </div>
          )}

          {/* ARCHIVE SECTION */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <Reveal delay={0.2}>
              <div className="p-10 border border-white/5 rounded-[2.5rem] bg-gradient-to-b from-white/[0.02] to-transparent hover:border-purple-500/30 transition-all h-full">
                <Award className="text-purple-400 mb-6" size={40} />
                <h2 className="text-3xl font-semibold mb-3">Certificates</h2>
                <p className="text-neutral-500 mb-8">Kumpulan sertifikasi profesional dan pencapaian akademik selama masa studi.</p>
                <a href={content.profile.certificates_url ?? "https://drive.google.com/drive/folders/1BjCH56LyAxKphfNeAYp5XzsoRxEaMv36?usp=sharing"} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 text-white font-medium hover:text-purple-400 transition-colors">
                  Open Drive Folder <ExternalLink size={18} />
                </a>
              </div>
            </Reveal>

            <Reveal delay={0.4}>
              <div className="p-10 border border-white/5 rounded-[2.5rem] bg-gradient-to-b from-white/[0.02] to-transparent hover:border-cyan-500/30 transition-all h-full">
                <FileText className="text-cyan-400 mb-6" size={40} />
                <h2 className="text-3xl font-semibold mb-3">Project Documentation</h2>
                <p className="text-neutral-500 mb-8">Laporan teknis, analisis sistem, dan dokumentasi detail dari setiap proyek.</p>
                <a href={content.profile.docs_url ?? "https://drive.google.com/drive/folders/1fl5fUtcjoHkte25901eRDgYC8aNFCIah?usp=sharing"} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 text-white font-medium hover:text-cyan-400 transition-colors">
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