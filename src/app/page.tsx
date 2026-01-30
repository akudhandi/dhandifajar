'use client';
import { useState, useEffect } from 'react';
import { AnimatePresence } from 'framer-motion';
import { 
  Github, 
  Linkedin, 
  Mail, 
  MessageCircle, 
  ExternalLink, 
  Code,
  Smartphone,
  Globe,
  Database,
  HardDrive,
  Network,
  Microscope,
  PenTool,       
  BarChart3,     
  Zap,           
  Layout         
} from 'lucide-react';

import Navbar from '@/components/Navbar';
import Preloader from '@/components/Preloader';
import Hero from '@/components/Hero';
import SpotlightCard from '@/components/SpotlightCard';
import CardSwap, { Card } from '@/components/CardSwap'; 
import MyTechStack from '@/components/MyTechStack';
import { Reveal } from '@/components/Reveal';

// --- DATA PORTFOLIO ---
const portfolioData = {
  whatIDo: [
    {
      title: "UI & UX Design",
      icon: <PenTool size={32} />,
      description: "Designing interfaces that are intuitive, efficient, and enjoyable to use using Figma and modern design principles.",
      color: "text-cyan-400"
    },
    {
      title: "Web & Mobile App",
      icon: <Layout size={32} />,
      description: "Transforming ideas into exceptional web and mobile app experiences using Next.js, Laravel, and Flutter.",
      color: "text-purple-400"
    },
    {
      title: "Data Analytics",
      icon: <BarChart3 size={32} />,
      description: "Turning complex data into actionable insights and research-backed decisions using Python and Statistical tools.",
      color: "text-pink-400"
    },
    {
      title: "Development",
      icon: <Zap size={32} />,
      description: "Bringing your vision to life with the latest technology, clean code, and scalable architecture.",
      color: "text-orange-400"
    }
  ],
  projects: [
    {
      name: "Morations",
      year: "2025",
      tools: ["VB.NET", "MySQL", "RDLC Report"],
      role: "Full-Stack Developer",
      description: "Desktop-based movie rating and subscription app with data-driven ratings and admin dashboard.",
      type: "software",
      github: "https://github.com/akudhandi/morations",
      document: "https://drive.google.com/file/d/1stkUu3uJV8ug0gX3sN6FJ7xHw9GaAi1j/view?usp=drive_link"
    },
    {
      name: "Lunar Store",
      year: "2025",
      tools: ["Laravel Livewire", "Tailwind CSS", "MySQL"],
      role: "Front-End Developer",
      description: "Responsive e-commerce platform for selling digital subscriptions with integrated payment gateway.",
      type: "web",
      github: "https://github.com/Hafidzrdwn/lunar_store_laravel",
      document: "https://drive.google.com/file/d/1rlhFBzOvXI0p0H3s4tOw4qHA_f5OxQaX/view?usp=drive_link"
    },
    {
      name: "NextChamp",
      year: "2025",
      tools: ["Flutter", "Strapi", "MySQL", "Figma"],
      role: "Front-End Developer",
      description: "Cross-platform mobile app for student competition mentorship with AI chatbot and discussion forum.",
      type: "mobile",
      github: "https://github.com/akudhandi/nextchamp-strapi",
    },
    {
      name: "Blu by BCA Research",
      year: "2025",
      tools: ["Jamovi", "WarpPLS", "Python"],
      role: "Data Analyst",
      description: "Research analyzing user acceptance of Blu by BCA Digital app using UTAUT framework.",
      type: "research",
      doi: "https://doi.org/10.59934/jaiea.v4i3.1182",
    },
    {
      name: "Desk-Go",
      year: "2024",
      tools: ["PHP", "Bootstrap", "MySQL"],
      role: "Full-Stack Web Developer",
      description: "Web-based system for monitoring and booking seats in a coworking space.",
      type: "web",
      document: "https://drive.google.com/file/d/1rlhFBzOvXI0p0H3s4tOw4qHA_f5OxQaX/view?usp=drive_link"
    },
    {
      name: "Leafly DB Management",
      year: "2024",
      tools: ["MariaDB", "MySQL", "SQL"],
      role: "Database Administrator",
      description: "Database system implementation for Leafly application focusing on data security and scalability.",
      type: "database",
      document: "https://drive.google.com/file/d/16eo5WSRd0vUIcXLkzD7vZzuNjy33Gvhq/view?usp=drive_link"
    },
    {
      name: "Network Design FIK",
      year: "2024",
      tools: ["Cisco Packet Tracer"],
      role: "Network Designer",
      description: "Network design and configuration for FIK I Building UPN Veteran Jawa Timur.",
      type: "networking",
      document: "https://drive.google.com/file/d/1s3dLCpXeAYnwI-pyfpwTRqJv4ZNSVtbh/view?usp=drive_link"
    }
  ],
  experiences: [
    {
      title: "Samsung Solve for Tomorrow",
      role: "Participant",
      year: "2025",
      type: "Competition",
      description: "Developing sustainable technology solutions for environmental challenges."
    },
    {
      title: "Fasilkom Fest 2024",
      role: "Head of Security & Licensing",
      year: "2024",
      type: "Organization",
      description: "Led 30-member division, oversaw safety, and coordinated licensing for 10+ sub-events."
    },
    {
      title: "Fasilkom Tech 2024",
      role: "Head of Logistics",
      year: "2024",
      type: "Organization",
      description: "Managed logistics for a 9-session national bootcamp and hybrid sessions."
    },
    {
      title: "BEM Faculty of CS",
      role: "Student Welfare Advocacy Staff",
      year: "2024-2025",
      type: "Organization",
      description: "Managed advocacy cases and supported students with academic/financial issues."
    }
  ],
  socialLinks: [
    { icon: <Linkedin size={20}/>, label: "LinkedIn", href: "https://www.linkedin.com/in/fajar-ramadhandi-hidayat" },
    { icon: <Github size={20}/>, label: "GitHub", href: "https://github.com/akudhandi" },
    { icon: <Mail size={20}/>, label: "Email", href: "mailto:dhandifajar@gmail.com" },
    { icon: <MessageCircle size={20}/>, label: "WhatsApp", href: "https://wa.me/6285648058508" },
  ],
};

export default function Home() {
  const [isLoading, setIsLoading] = useState(true);
  const [filter, setFilter] = useState("all");

  const filteredProjects = filter === "all" 
    ? portfolioData.projects 
    : portfolioData.projects.filter(p => p.type === filter);

  useEffect(() => {
    if (isLoading) {
      document.body.style.overflow = "hidden";
      window.scrollTo(0, 0);
    } else {
      document.body.style.overflow = "auto";
    }
  }, [isLoading]);

  return (
    // Perubahan bg-black menjadi bg-[#141516]
    <main className="bg-[#141516] min-h-screen text-white selection:bg-purple-500 selection:text-white">
      
      {/* 1. PRELOADER */}
      <AnimatePresence mode='wait'>
        {isLoading && (
          <Preloader onComplete={() => setIsLoading(false)} />
        )}
      </AnimatePresence>

      {/* NAVBAR */}
      {!isLoading && <Navbar />}

      <div className="flex flex-col">
        
        {/* HERO SECTION */}
        <Hero />

        {/* 2. ABOUT ME SECTION */}
        <section id="about" className="py-24 px-4 md:px-10 max-w-7xl mx-auto w-full overflow-hidden">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
                
                {/* Kolom Kiri */}
                <Reveal>
                  <div>
                      <span className="text-purple-400 font-medium tracking-wider uppercase text-sm mb-2 block">
                          // About Me
                      </span>
                      <h2 className="text-4xl md:text-5xl font-bold mb-6 leading-tight">
                          More than just a <br/>
                          <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-600">
                              Code Writer
                          </span>
                      </h2>
                      <p className="text-neutral-400 text-lg leading-relaxed mb-6">
                          I'm a passionate <b>Information Systems student</b> at UPN "Veteran" Jawa Timur. 
                          I focus on <b>Fullstack Web Development, UI/UX Design, and Data Analytics</b>. 
                          Currently exploring the intersection between beautiful code and meaningful data insights.
                      </p>
                      
                      <div className="flex gap-8 mt-8 border-t border-white/10 pt-8">
                          <div>
                              <h3 className="text-3xl font-bold text-white">2+</h3>
                              <p className="text-sm text-neutral-500">Years Exp.</p>
                          </div>
                          <div>
                              <h3 className="text-3xl font-bold text-white">15+</h3>
                              <p className="text-sm text-neutral-500">Projects Done</p>
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
                            <h3 className="text-xl font-bold text-white">Full Stack Dev</h3>
                            <p className="text-xs text-gray-300">Laravel & Flutter Expert</p>
                          </div>
                        </Card>
                        <Card>
                          <img src="https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=1000&auto=format&fit=crop" alt="Analytics" className="h-full w-full object-cover" />
                          <div className="card-content">
                            <h3 className="text-xl font-bold text-white">Data Analyst</h3>
                            <p className="text-xs text-gray-300">Turning Data into Insights</p>
                          </div>
                        </Card>
                        <Card>
                          <img src="https://images.unsplash.com/photo-1519389950473-47ba0277781c?q=80&w=1000&auto=format&fit=crop" alt="Teamwork" className="h-full w-full object-cover" />
                          <div className="card-content">
                            <h3 className="text-xl font-bold text-white">Leadership</h3>
                            <p className="text-xs text-gray-300">Organization & Teamwork</p>
                          </div>
                        </Card>
                      </CardSwap>
                    </div>
                  </div>
                </Reveal>
            </div>
        </section>

        {/* 3. WHAT I DO SECTION */}
        <section className="py-20 px-4 md:px-10 max-w-7xl mx-auto w-full">
            <Reveal>
              <div className="text-center mb-16">
                   <h2 className="text-purple-400 font-medium tracking-wider uppercase text-sm mb-4">What I Do</h2>
                   <h2 className="text-3xl md:text-5xl font-bold text-white">Creating Digital Solutions</h2>
              </div>
            </Reveal>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {portfolioData.whatIDo.map((item, index) => (
                    <Reveal key={index} delay={index * 0.15}>
                      <SpotlightCard className="h-full p-8 border border-neutral-800 bg-neutral-900/50 hover:bg-neutral-900/80 transition-colors">
                          <div className="flex flex-col h-full">
                              <div className={`mb-6 ${item.color}`}>
                                  {item.icon}
                              </div>
                              <h3 className={`text-xl font-bold mb-4 ${item.color}`}>
                                  {item.title}
                              </h3>
                              <p className="text-neutral-400 text-sm leading-relaxed">
                                  {item.description}
                              </p>
                          </div>
                      </SpotlightCard>
                    </Reveal>
                ))}
            </div>
        </section>

        {/* 4. EXPERIENCE SECTION */}
        <section className="py-20 px-4 md:px-10 max-w-7xl mx-auto w-full">
            <Reveal>
              <h2 className="text-3xl font-bold mb-12 text-neutral-200 border-b border-white/10 pb-4 inline-block">
                  Experience
              </h2>
            </Reveal>
            <div className="space-y-6">
                {portfolioData.experiences.map((exp, index) => (
                    <Reveal key={index} delay={0.1}>
                      <div className="group relative pl-8 border-l border-neutral-800 hover:border-purple-500 transition-colors duration-300">
                          <div className="absolute -left-[5px] top-2 w-2.5 h-2.5 rounded-full bg-neutral-800 group-hover:bg-purple-500 transition-colors"></div>
                          <div className="bg-neutral-900/50 p-6 rounded-xl border border-neutral-800 hover:border-neutral-700 transition">
                              <div className="flex flex-col md:flex-row md:justify-between md:items-start mb-2">
                                  <h3 className="text-xl font-bold text-white">{exp.title}</h3>
                                  <span className="text-sm px-2 py-1 bg-neutral-800 rounded text-neutral-400 whitespace-nowrap mt-2 md:mt-0 w-fit">
                                      {exp.year}
                                  </span>
                              </div>
                              <p className="text-purple-400 text-sm font-medium mb-2">{exp.role} • {exp.type}</p>
                              <p className="text-neutral-400 text-sm leading-relaxed">{exp.description}</p>
                          </div>
                      </div>
                    </Reveal>
                ))}
            </div>
        </section>

        {/* 5. PROJECTS SECTION */}
        <section id="projects" className="py-24 px-4 md:px-10 max-w-7xl mx-auto w-full">
            <Reveal>
              <div className="flex flex-col md:flex-row justify-between items-end mb-12">
                  <div>
                      <h2 className="text-3xl font-bold text-neutral-200">Featured Work</h2>
                      <p className="text-neutral-500 mt-2">A selection of my recent projects.</p>
                  </div>
                  
                  {/* Filter Buttons */}
                  <div className="flex gap-2 mt-6 md:mt-0 overflow-x-auto pb-2 w-full md:w-auto">
                      {["all", "web", "mobile", "research", "software"].map((cat) => (
                          <button 
                              key={cat}
                              onClick={() => setFilter(cat)}
                              className={`px-4 py-2 rounded-full text-sm font-medium transition whitespace-nowrap ${
                                  filter === cat 
                                  ? "bg-white text-black" 
                                  : "bg-neutral-900 text-neutral-400 hover:bg-neutral-800"
                              }`}
                          >
                              {cat.charAt(0).toUpperCase() + cat.slice(1)}
                          </button>
                      ))}
                  </div>
              </div>
            </Reveal>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredProjects.map((project, index) => (
                    <Reveal key={index} delay={index * 0.1}>
                      <SpotlightCard className="h-full">
                          <div className="h-full flex flex-col justify-between">
                              <div>
                                  <div className="flex justify-between items-start mb-4">
                                      {/* Icon category */}
                                      <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                                          project.type === 'web' ? 'bg-blue-500/20 text-blue-400' :
                                          project.type === 'mobile' ? 'bg-purple-500/20 text-purple-400' :
                                          project.type === 'research' ? 'bg-green-500/20 text-green-400' :
                                          'bg-gray-500/20 text-gray-400'
                                      }`}>
                                          {project.type === 'web' && <Globe size={20} />}
                                          {project.type === 'mobile' && <Smartphone size={20} />}
                                          {project.type === 'research' && <Microscope size={20} />}
                                          {project.type === 'software' && <Code size={20} />}
                                          {project.type === 'networking' && <Network size={20} />}
                                          {project.type === 'database' && <Database size={20} />}
                                      </div>
                                      
                                      {/* Link Icons */}
                                      <div className="flex gap-2">
                                          {project.github && (
                                              <a href={project.github} target="_blank" className="text-neutral-500 hover:text-white transition"><Github size={18}/></a>
                                          )}
                                          {project.document && (
                                              <a href={project.document} target="_blank" className="text-neutral-500 hover:text-white transition"><HardDrive size={18}/></a>
                                          )}
                                          {project.doi && (
                                              <a href={project.doi} target="_blank" className="text-neutral-500 hover:text-white transition"><ExternalLink size={18}/></a>
                                          )}
                                      </div>
                                  </div>

                                  <h3 className="text-xl font-bold text-white mb-2">{project.name}</h3>
                                  <p className="text-neutral-400 text-sm line-clamp-3 mb-4">
                                      {project.description}
                                  </p>
                              </div>
                              
                              <div>
                                  <div className="flex flex-wrap gap-2 mb-4">
                                      {project.tools.slice(0, 3).map((tool, i) => (
                                          <span key={i} className="text-[10px] px-2 py-1 bg-neutral-800 rounded text-neutral-400 border border-neutral-700">
                                              {tool}
                                          </span>
                                      ))}
                                  </div>
                                  <div className="pt-4 border-t border-neutral-800 flex justify-between items-center text-xs text-neutral-500">
                                      <span>{project.role}</span>
                                      <span>{project.year}</span>
                                  </div>
                              </div>
                          </div>
                      </SpotlightCard>
                    </Reveal>
                ))}
            </div>
        </section>

        {/* 6. TECH STACK */}
        <Reveal>
          <MyTechStack />
        </Reveal>

        {/* 7. FOOTER */}
        <Reveal>
          <footer className="py-8 border-t border-neutral-900 mt-12">
              <div className="max-w-7xl mx-auto px-4 flex flex-col md:flex-row justify-between items-center gap-4">
                  <p className="text-neutral-500 text-sm">© 2025 Fajar Ramadhandi Hidayat.</p>
                  <div className="flex gap-6">
                      {portfolioData.socialLinks.map((social, i) => (
                          <a key={i} href={social.href} target="_blank" className="text-neutral-500 hover:text-white transition hover:scale-110">
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