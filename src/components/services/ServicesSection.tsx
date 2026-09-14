"use client";

import React from 'react';
import Link from 'next/link';
import { motion, type Variants } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';
import { services } from '@/data/services';
import { ServiceCard } from './ServiceCard';

const easeEditorial: [number, number, number, number] = [0.16, 1, 0.3, 1];

const headerVariants: Variants = {
  hidden: { opacity: 0, y: 16 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.75, ease: easeEditorial }
  }
};

const listVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.08,
      delayChildren: 0.1
    }
  }
};

export function ServicesSection() {
  return (
    <section 
      className="relative z-20 w-full bg-[#FBFBFD] text-[#0A0D12] py-20 sm:py-28 lg:py-32 border-b border-neutral-200/80 overflow-hidden select-none"
      aria-labelledby="services-section-heading"
    >
      {/* Subtle Top Hairline Divider */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-neutral-300/60 to-transparent" />

      <div className="relative max-w-7xl mx-auto px-5 sm:px-8 lg:px-12 z-10">
        
    {/* Editorial Section Header */}
<motion.div
  initial="hidden"
  whileInView="visible"
  viewport={{ once: true, margin: "-40px" }}
  variants={headerVariants}
  className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-8 sm:pb-10 border-b border-neutral-200"
>
  <div className="max-w-2xl">

  

   <h2
  id="services-section-heading"
  className="text-3xl sm:text-5xl lg:text-[54px] font-semibold tracking-[-0.035em] text-[#0A0D12] leading-[1.08]"
>
  Exhibition Expertise. <br />
  <span className="text-neutral-500 font-normal">
    Built for Global Markets.
  </span>
</h2> 

<p className="mt-4 text-sm sm:text-base text-neutral-600 font-normal leading-[1.65] max-w-xl">
  Strategic planning, exhibition design, buyer programmes, and seamless event execution across international markets.
</p>
  </div>

  <div className="flex items-center gap-4 self-start md:self-end">
    <Link
      href="/services"
      className="group inline-flex items-center gap-2 px-5 py-2.5 rounded-full
                 bg-white hover:bg-[#0A0D12]
                 border border-neutral-300 hover:border-[#0A0D12]
                 text-xs font-mono tracking-wider uppercase
                 transition-all duration-300
                 shadow-2xs hover:shadow-md
                 active:scale-95"
    >
      <span className="text-neutral-800 transition-colors duration-300 group-hover:text-white">
        All Capabilities
      </span>

      <ArrowUpRight
        size={14}
        className="text-neutral-400 transition-all duration-300
                   group-hover:text-white
                   group-hover:translate-x-0.5
                   group-hover:-translate-y-0.5"
      />
    </Link>
  </div>
</motion.div>

        {/* Minimalist Architectural Services Ledger */}
        <motion.div 
          variants={listVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-40px" }}
          className="mt-10 sm:mt-12 flex flex-col gap-3.5 sm:gap-4"
        >
          {services.map((service: any, index: number) => (
            <ServiceCard 
              key={service.slug || service.id || index} 
              service={service} 
              index={index} 
            />
          ))}
        </motion.div>

        {/* Minimal Bottom Assurance Strip */}
        {/* <div className="mt-12 pt-6 border-t border-neutral-200/70 flex flex-col sm:flex-row sm:items-center justify-between gap-4 text-xs font-mono text-neutral-500">
          <span>All trade logistics handled in-house across India, Nepal, Bangladesh, Sri Lanka & Kenya</span>
          <span className="text-neutral-700 font-medium">Verified Safety & Construction Compliance</span>
        </div> */}

      </div>
    </section>
  );
}

export default ServicesSection;