import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ArrowUpRight, ExternalLink, Github, HardDrive } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { getSiteContent } from "@/lib/content";
import { fallbackProjects } from "@/data/portfolio";

export const revalidate = 60;

export async function generateStaticParams() {
  return fallbackProjects.map((p) => ({ slug: p.slug }));
}

export default async function ProjectDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const content = await getSiteContent();
  const project = content.projects.find((p) => p.slug === slug);
  if (!project) notFound();

  const idx = content.projects.findIndex((p) => p.slug === slug);
  const prev = content.projects[idx - 1];
  const next = content.projects[idx + 1];

  return (
    <main className="min-h-screen w-full bg-[#141516] text-white selection:bg-cyan-500">
      <Navbar />
      <section className="px-6 pt-40 pb-20">
        <div className="mx-auto max-w-4xl">
          <Link href="/projects" className="inline-flex items-center gap-2 text-sm text-neutral-400 hover:text-white transition mb-10">
            <ArrowLeft size={16} /> All Projects
          </Link>

          <p className="text-cyan-400 font-medium tracking-widest uppercase text-sm mb-3">
            {project.type} • {project.year}
          </p>
          <h1 className="text-4xl md:text-6xl font-semibold tracking-tight mb-4">
            {project.name}
          </h1>
          <p className="text-purple-300 text-sm font-medium mb-6">{project.role}</p>
          <p className="text-neutral-300 text-lg leading-relaxed mb-8">{project.description}</p>

          {project.tools.length > 0 && (
            <div className="flex flex-wrap gap-2 mb-10">
              {project.tools.map((t) => (
                <span key={t} className="text-xs px-3 py-1.5 bg-neutral-800 rounded-full text-neutral-300 border border-neutral-700">
                  {t}
                </span>
              ))}
            </div>
          )}

          <div className={`rounded-[2rem] ${project.cover_url ? "" : project.gradient} border border-white/5 overflow-hidden mb-10 min-h-[280px] flex items-center justify-center`}>
            {project.cover_url ? (
              <img src={project.cover_url} alt={project.name} className="w-full h-auto object-cover" />
            ) : (
              <span className="text-white/10 font-black text-[10rem] leading-none">{project.name.charAt(0)}</span>
            )}
          </div>

          <div className="flex flex-wrap gap-3 mb-16">
            {project.github_url && (
              <a href={project.github_url} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-white text-black text-sm font-bold hover:bg-cyan-300 transition">
                <Github size={18} /> GitHub <ArrowUpRight size={16} />
              </a>
            )}
            {project.doc_url && (
              <a href={project.doc_url} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 px-6 py-3 rounded-full border border-white/20 text-sm font-medium hover:bg-white/10 transition">
                <HardDrive size={18} /> Documentation <ArrowUpRight size={16} />
              </a>
            )}
            {project.doi_url && (
              <a href={project.doi_url} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 px-6 py-3 rounded-full border border-white/20 text-sm font-medium hover:bg-white/10 transition">
                <ExternalLink size={18} /> Publication <ArrowUpRight size={16} />
              </a>
            )}
          </div>

          <div className="flex justify-between border-t border-white/10 pt-8">
            {prev ? (
              <Link href={`/projects/${prev.slug}`} className="text-sm text-neutral-400 hover:text-white transition">← {prev.name}</Link>
            ) : <span />}
            {next && (
              <Link href={`/projects/${next.slug}`} className="text-sm text-neutral-400 hover:text-white transition text-right">{next.name} →</Link>
            )}
          </div>
        </div>
      </section>
      <Footer />
    </main>
  );
}
