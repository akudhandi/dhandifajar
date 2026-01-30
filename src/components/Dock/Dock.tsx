'use client';

import { motion, useMotionValue } from 'framer-motion';
import { ReactNode, useRef } from 'react';

export type DockItem = {
  id: string;
  icon: ReactNode;
  href: string;
};

type DockProps = {
  items: DockItem[];
};

export default function Dock({ items }: DockProps) {
  const hover = useMotionValue(0);
  const ref = useRef<HTMLDivElement>(null);

  return (
    <motion.div
      ref={ref}
      onMouseEnter={() => hover.set(1)}
      onMouseLeave={() => hover.set(0)}
      className="flex items-center gap-4 rounded-full border border-white/10 bg-white/5 px-6 py-3 backdrop-blur-md"
    >
      {items.map((item) => (
  <motion.a
    key={item.id}
    href={item.href}
    target="_blank"
    rel="noopener noreferrer"
    whileHover={{ scale: 1.15 }}
    transition={{ type: 'spring', stiffness: 300 }}
    className="flex h-12 w-12 items-center justify-center rounded-full bg-neutral-900 text-gray-300 hover:text-white"
  >
    {item.icon}
  </motion.a>
))}
    </motion.div>
  );
}
