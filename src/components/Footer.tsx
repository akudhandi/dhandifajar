import Link from 'next/link';
// Import icons dari lucide-react (Pasikan sudah install: npm install lucide-react)
import { Linkedin, Github, Instagram, MessageSquare, Mail, ArrowRight } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-[#141516] border-t border-white/10 px-6 py-16 text-white">
      <div className="mx-auto max-w-7xl">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-[1.5fr_0.8fr_1.5fr_1.2fr] gap-12 items-start">
          
          {/* 1. SLOGAN SECTION */}
          <div className="space-y-4">
            <h2 className="text-3xl font-semibold leading-tight tracking-tight">
              Where <span className="text-purple-400">aesthetics</span> & <br />
              <span className="text-cyan-400">functionality</span> meet
            </h2>
          </div>

          {/* 2. EXPLORE SECTION */}
          <div>
            <p className="text-orange-500 font-medium mb-6 uppercase tracking-widest text-xs">Explore</p>
            <ul className="space-y-4">
              {[
                { name: "Home", link: "/" },
                { name: "About Me", link: "/about" },
                { name: "Contact", link: "/contactme" },
              ].map((item) => (
                <li key={item.name}>
                  <Link href={item.link} className="text-neutral-400 hover:text-white transition-colors text-sm">
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* 3. FOLLOW ME SECTION (Updated with Real Icons) */}
          <div>
            <p className="text-cyan-400 font-medium mb-6 uppercase tracking-widest text-xs">Follow Me</p>
            <div className="grid grid-cols-2 gap-y-6 gap-x-4">
              {[
                { 
                  name: "LinkedIn", 
                  href: "https://www.linkedin.com/in/fajar-ramadhandi-hidayat", 
                  icon: <Linkedin size={16} />, 
                  hover: "group-hover:text-[#0A66C2]" 
                },
                { 
                  name: "Instagram", 
                  href: "https://instagram.com/", 
                  icon: <Instagram size={16} />, 
                  hover: "group-hover:text-[#E4405F]" 
                },
                { 
                  name: "Github", 
                  href: "https://github.com/akudhandi", 
                  icon: <Github size={16} />, 
                  hover: "group-hover:text-white" 
                },
                { 
                  name: "Discord", 
                  href: "https://discord.com/users/", 
                  icon: <MessageSquare size={16} />, 
                  hover: "group-hover:text-[#5865F2]" 
                },
              ].map((item) => (
                <a 
                  key={item.name} 
                  href={item.href} 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="flex items-center gap-3 group"
                >
                  <span className={`flex items-center justify-center text-neutral-400 transition-all duration-300 ${item.hover} group-hover:scale-110`}>
                    {item.icon}
                  </span>
                  <span className="text-neutral-400 group-hover:text-white text-sm transition-colors">
                    {item.name}
                  </span>
                </a>
              ))}
            </div>
          </div>

          {/* 4. CONTACT ACTIONS */}
          <div className="space-y-8">
            <ActionCard 
              title="Contact Me" 
              subtitle="Say Hello !" 
              href="mailto:dhandifajar@gmail.com"
            />
            <div className="h-[1px] w-full bg-white/5" />
            <ActionCard 
              title="My Projects" 
              subtitle="Explore Projects" 
              href="/projects"
            />
          </div>

        </div>
      </div>
    </footer>
  );
}

function ActionCard({ title, subtitle, href }: { title: string; subtitle: string, href: string }) {
  return (
    <Link href={href} className="flex items-center justify-between group cursor-pointer">
      <div>
        <h3 className="text-lg font-medium text-white group-hover:text-cyan-400 transition-colors">
          {title}
        </h3>
        <p className="text-[10px] text-neutral-500 uppercase tracking-widest mt-1">
          {subtitle}
        </p>
      </div>
      <div className="w-10 h-10 rounded-full border border-neutral-800 flex items-center justify-center group-hover:border-green-500 transition-all duration-500 group-hover:-rotate-45">
        <ArrowRight size={20} className="text-green-500" />
      </div>
    </Link>
  );
}