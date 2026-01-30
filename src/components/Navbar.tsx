'use client';

import { Home, Briefcase, User, Mail } from 'lucide-react';
import { usePathname } from 'next/navigation';
import Link from 'next/link';

export default function Navbar() {
  const pathname = usePathname();

  return (
    <header className="fixed top-6 inset-x-0 z-50">
      <div className="max-w-7xl mx-auto px-4 relative flex items-center justify-between">

        {/* LEFT — BRAND */}
        <Link
          href="/"
          className="bg-black/60 backdrop-blur-md border border-white/10
                     rounded-full px-5 py-2.5 flex items-center gap-3
                     shadow-xl text-white font-bold text-sm tracking-wide
                     hover:bg-white/10 transition group"
        >
          <span className="w-2.5 h-2.5 rounded-full bg-yellow-400 animate-pulse group-hover:bg-cyan-400" />
          dhandifajar
        </Link>

        {/* CENTER — NAV */}
        <nav
          className="hidden md:flex items-center gap-1
                     bg-black/60 backdrop-blur-md border border-white/10
                     rounded-full px-2 py-1.5 shadow-xl
                     absolute left-1/2 -translate-x-1/2"
        >
          {/* HOME */}
          <Link 
            href="/" 
            className={`nav-btn ${pathname === '/' ? 'bg-white/10 text-cyan-400' : ''}`}
          >
            <Home size={16} />
            Home
          </Link>

          {/* PROJECTS — Ke page /projects */}
          <Link 
            href="/projects" 
            className={`nav-btn ${pathname === '/projects' ? 'bg-white/10 text-cyan-400' : ''}`}
          >
            <Briefcase size={16} />
            Projects
          </Link>

          {/* ABOUT — Ke page /about */}
          <Link 
            href="/about" 
            className={`nav-btn ${pathname === '/about' ? 'bg-white/10 text-cyan-400' : ''}`}
          >
            <User size={16} />
            About
          </Link>
        </nav>

        {/* RIGHT — CONTACT PAGE */}
        <Link
          href="/contactme"
          className={`bg-black/60 backdrop-blur-md border border-white/10
                     rounded-full px-5 py-2.5 flex items-center gap-2
                     shadow-xl text-white text-sm font-medium transition
                     hover:bg-white/10 hover:border-white/30 
                     ${pathname === '/contactme' ? 'border-cyan-400/50 text-cyan-400' : ''}`}
        >
          <Mail size={16} />
          Contact Me
        </Link>

      </div>
    </header>
  );
}