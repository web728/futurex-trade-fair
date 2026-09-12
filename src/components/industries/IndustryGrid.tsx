"use client";

import React from 'react';
import { motion, type Variants } from 'framer-motion';
import type { Industry } from '@/types/content';
import { IndustryCard } from './IndustryCard';

const gridContainerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.06,
      delayChildren: 0.04
    }
  }
};

export function IndustryGrid({ industries }: { industries: Industry[] }) {
  return (
    <div className="relative w-full">
      <motion.div 
        variants={gridContainerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-40px" }}
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-7"
      >
        {industries.map((industry, index) => (
          <IndustryCard 
            key={industry.slug || index} 
            industry={industry} 
            index={index} 
          />
        ))}
      </motion.div>
    </div>
  );
}

export default IndustryGrid;