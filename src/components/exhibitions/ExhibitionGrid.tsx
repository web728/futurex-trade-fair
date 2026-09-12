"use client";

import React, { useState } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence, type Variants } from 'framer-motion';
import { X } from 'lucide-react';
import { ExhibitionCard } from './ExhibitionCard';
import type { ExhibitionEvent } from '@/data/exhibitions';

const easeEditorial: [number, number, number, number] = [0.16, 1, 0.3, 1];

const gridVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.06,
      delayChildren: 0.04
    }
  }
};

export function ExhibitionGrid({ 
  events 
}: { 
  events: ExhibitionEvent[]; 
}) {
  const [activeModalEvent, setActiveModalEvent] = useState<ExhibitionEvent | null>(null);

  return (
    <>
      <motion.div 
        variants={gridVariants}
        initial="hidden"
        animate="visible"
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6"
      >
        {events.map((event) => (
          <ExhibitionCard 
            key={event.id || event.name} 
            event={event} 
            onSelect={(e) => setActiveModalEvent(e)}
          />
        ))}
      </motion.div>

      {/* Optional Lightbox Modal for Logo View */}
      <AnimatePresence>
        {activeModalEvent && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setActiveModalEvent(null)}
              className="absolute inset-0 bg-[#050608]/85 backdrop-blur-md cursor-pointer"
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.3, ease: easeEditorial }}
              className="relative z-10 w-full max-w-xl bg-white rounded-3xl p-8 sm:p-12 shadow-2xl border border-white/20 flex flex-col items-center justify-center select-none"
            >
              <button
                type="button"
                onClick={() => setActiveModalEvent(null)}
                aria-label="Close"
                className="absolute top-4 right-4 p-2.5 rounded-full text-neutral-400 hover:text-black hover:bg-neutral-100 transition-colors cursor-pointer"
              >
                <X size={20} />
              </button>

              <div className="relative w-full h-64 sm:h-72 flex items-center justify-center mb-4">
                {(activeModalEvent.heroImage || activeModalEvent.image) ? (
                  <Image
                    src={(activeModalEvent.heroImage || activeModalEvent.image)!}
                    alt={activeModalEvent.name}
                    fill
                    sizes="500px"
                    className="object-contain"
                    priority
                  />
                ) : (
                  <span className="text-neutral-500 font-mono text-sm uppercase">
                    {activeModalEvent.name}
                  </span>
                )}
              </div>
              <h4 className="text-center font-semibold text-neutral-900 text-base">
                {activeModalEvent.name}
              </h4>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
}

export default ExhibitionGrid;