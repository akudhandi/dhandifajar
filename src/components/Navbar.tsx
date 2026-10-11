'use client';

import { useState } from 'react';
import { Home, Briefcase, User, Mail } from 'lucide-react';
import { usePathname, useRouter } from 'next/navigation';
import Link from 'next/link';
import RubberSegment from '@/components/reactbits/RubberSegment';

const ROUTES = ['/', '/projects', '/about'];

export default function Navbar() {
  const pathname = usePathname();
  const router = useRouter();
  const matched = ROUTES.includes(pathname) ? pathname : null;
  const [active, setActive] = useState('/');
  const value = matched ?? active;

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
          className="hidden md:block absolute left-1/2 -translate-x-1/2"
          aria-label="Primary"
        >
          <RubberSegment
            items={[
              { value: '/', label: 'Home', icon: <Home size={16} /> },
              { value: '/projects', label: 'Projects', icon: <Briefcase size={16} /> },
              { value: '/about', label: 'About', icon: <User size={16} /> },
            ]}
            value={value}
            onChange={(v) => {
              setActive(v);
              if (v !== pathname) router.push(v);
            }}
            trackColor="rgba(0,0,0,0.6)"
            thumbColor="#ED9E59"
            textColor="#E9BCB9"
            activeTextColor="#1B1931"
            size="md"
            radius={999}
            aria-label="Primary navigation"
            className="border border-white/10 shadow-xl backdrop-blur-md"
          />
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
