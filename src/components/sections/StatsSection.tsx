"use client";

import React, { useEffect, useRef } from 'react';
import Image from 'next/image';
import { motion, useInView, useMotionValue, useSpring } from 'framer-motion';

function CounterCell({ value, suffix = "" }: { value: number | string; suffix?: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-30px" });

  const numericTarget = typeof value === 'number' 
    ? value 
    : parseFloat(String(value).replace(/[^0-9.]/g, '')) || 0;

  const motionVal = useMotionValue(0);
  
  const springVal = useSpring(motionVal, {
    damping: 40,
    stiffness: 90,
    mass: 0.8
  });

  useEffect(() => {
    if (isInView) {
      motionVal.set(numericTarget);
    }
  }, [isInView, motionVal, numericTarget]);

  useEffect(() => {
    const unsubscribe = springVal.on("change", (latest) => {
      if (ref.current) {
        ref.current.textContent = Math.floor(latest).toLocaleString('en-IN');
      }
    });
    return () => unsubscribe();
  }, [springVal]);

  return (
    <span className="inline-flex items-baseline font-mono tracking-tighter text-white">
      <span ref={ref} className="text-3xl sm:text-4xl lg:text-[42px] font-bold">0</span>
      {suffix && <span className="text-red-500 font-sans ml-1 text-lg sm:text-xl font-semibold">{suffix}</span>}
    </span>
  );
}

export function StatsSection() {
  const statsList = [
    { 
      value: 220, 
      suffix: '+', 
      label: 'Trade Exhibitions', 
      detail: 'Delivering large-scale industrial events and public platforms across South Asia & global corridors.'
    },
    { 
      value: 16500, 
      suffix: '+', 
      label: 'Global Exhibitors', 
      detail: 'Trusted industrial brands managed under strict execution discipline and single-point accountability.'
    },
    { 
      value: 25800, 
      suffix: '+', 
      label: 'Brands on display', 
      detail: 'Showcasing cutting-edge machinery, products, and technical innovations across multi-zone venues.'
    },
    { 
      value: 950000, 
      suffix: '+', 
      label: 'Trade Visitors', 
      detail: 'High-footfall visitor management ensuring safety, dignity, and seamless institutional experiences.'
    }
  ];

  return (
    <section 
      className="relative z-20 w-full bg-[#07080A] border-b border-white/[0.08] py-16 sm:py-20 lg:py-24 overflow-hidden select-none" 
      aria-label="Futurex Impact Numbers"
    >
      {/* Background Architectural Ambient Glow */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden select-none z-0">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[250px] bg-red-600/[0.05] rounded-full blur-[140px]" />
      </div>

      <div className="relative max-w-7xl mx-auto px-5 sm:px-8 lg:px-12 z-10">
        
        {/* Section Mini Header with SVG Logo integrated */}
        {/* <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-10 sm:mb-12 pb-6 border-b border-white/[0.08]">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/[0.04] border border-white/[0.08] text-[11px] font-mono tracking-widest uppercase text-neutral-300 mb-3">
              <div className="relative w-3.5 h-3.5 flex items-center justify-center">
                <Image
                  src="/logos/svg/logo-arrow-white.png"
                  alt="Futurex Icon"
                  fill
                  className="object-contain"
                />
              </div>
              <span>Futurex Ecosystem Impact</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-semibold tracking-[-0.03em] text-white">
              Execution Scale & Institutional Footprint
            </h2>
          </div>
          <p className="text-xs sm:text-sm text-neutral-400 max-w-sm font-normal">
            Single-point accountability and precision execution across complex multi-zone industrial events.
          </p>
        </div> */}

        {/* 4-Item Premium Architectural Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5">
          {statsList.map((stat, idx) => (
            <motion.div 
              key={stat.label}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-30px" }}
              transition={{ duration: 0.6, delay: idx * 0.08, ease: [0.16, 1, 0.3, 1] }}
              whileHover={{ y: -3, transition: { duration: 0.2 } }}
              className="group relative bg-white/[0.015] hover:bg-white/[0.035] border border-white/[0.06] hover:border-white/[0.16] p-6 sm:p-7 rounded-2xl transition-all duration-300 backdrop-blur-md shadow-xl flex flex-col justify-between text-center"
            >
              {/* Subtle Red Laser Top Accent Line on First Card */}
              {idx === 0 && (
                <div className="absolute top-0 left-6 right-6 h-[2px] bg-red-600 group-hover:shadow-[0_0_10px_rgba(220,38,38,0.7)] transition-all duration-300" />
              )}

              <div>
                {/* Centered Label at the Top of Number */}
                <h3 className="text-xs sm:text-sm font-semibold text-neutral-300 group-hover:text-white transition-colors duration-200 uppercase tracking-widest mb-3">
                  {stat.label}
                </h3>

                {/* Metric Counter Center-Aligned */}
                <div className="mb-4 flex justify-center">
                  <CounterCell value={stat.value} suffix={stat.suffix} />
                </div>

                {/* Professional description text */}
                <p className="text-[11.5px] text-neutral-400 font-sans tracking-tight leading-relaxed">
                  {stat.detail}
                </p>
              </div>

            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}

export default StatsSection;