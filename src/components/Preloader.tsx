'use client';
import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const words = ["Hello", "Bonjour", "Ciao", "Olà", "やあ", "Hallå", "Guten tag", "Halo"];

export default function Preloader({ onComplete }: { onComplete: () => void }) {
  const [index, setIndex] = useState(0);
  const [dimension, setDimension] = useState({ width: 0, height: 0 });

  useEffect(() => {
    setDimension({ width: window.innerWidth, height: window.innerHeight });
  }, []);

  useEffect(() => {
    if (index === words.length - 1) {
      // Jika kata terakhir sudah muncul, tunggu sebentar lalu selesai
      setTimeout(onComplete, 1000); 
      return;
    }
    
    // Ganti kata setiap 150ms - 200ms
    const timeout = setTimeout(() => {
      setIndex(index + 1);
    }, 200);

    return () => clearTimeout(timeout);
  }, [index, onComplete]);

  // Varian animasi slide up layarnya
  const slideUp = {
    initial: { top: 0 },
    exit: { top: "-100vh", transition: { duration: 0.8, ease: [0.76, 0, 0.24, 1] as any, delay: 0.2 } }
  };

  return (
    <motion.div
      variants={slideUp}
      initial="initial"
      exit="exit"
      className="fixed inset-0 z-50 flex items-center justify-center bg-[#141516] text-white"
    >
        {/* Teks Sapaan */}
        <div className="flex items-center justify-center">
            <motion.p 
                key={index}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="text-5xl md:text-7xl font-bold"
            >
                {/* Tanda titik di sebelah kata seperti iPhone */}
                <span className="inline-block w-3 h-3 md:w-4 md:h-4 bg-white rounded-full mr-3 md:mr-4 mb-2 md:mb-3"></span>
                {words[index]}
            </motion.p>
        </div>
    </motion.div>
  );
}