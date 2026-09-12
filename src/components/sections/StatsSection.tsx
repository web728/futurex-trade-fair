"use client";

import React, { useEffect, useRef } from 'react';
import { motion, useInView, useMotionValue, useSpring } from 'framer-motion';
import { company } from '@/data/company';

function CounterCell({ value, suffix = "" }: { value: number | string; suffix?: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-30px" });

  const numericTarget = typeof value === 'number' 
    ? value 
    : parseFloat(String(value).replace(/[^0-9.]/g, '')) || 0;

  const motionVal = useMotionValue(0);
  
  const springVal = useSpring(motionVal, {
    damping: 36,
    stiffness: 85,
    mass: 0.75
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
    <span className="inline-flex items-baseline font-mono font-semibold tracking-tight text-white">
      <span ref={ref}>0</span>
      {suffix && <span className="text-red-500 font-sans ml-1 text-xl sm:text-2xl font-normal">{suffix}</span>}
    </span>
  );
}

export function StatsSection() {
  const statsList = (company as any)?.stats || [
    { value: 220, suffix: '+', label: 'Trade Exhibitions', detail: 'South Asia & Global' },
    { value: 16500, suffix: '+', label: 'Global Exhibitors', detail: 'Industrial Brands' },
    { value: 1200000, suffix: '+', label: 'Trade Buyers', detail: 'Verified Footfall' },
    { value: 5, suffix: ' Hubs', label: 'Regional Offices', detail: 'Delhi, Mumbai, CMB, DAC, KTM' }
  ];

  return (
    <section 
      className="relative z-20 w-full bg-[#07080A] border-b border-white/[0.08] py-10 sm:py-14 select-none" 
      aria-label="Futurex Impact Numbers"
    >
      <div className="max-w-7xl mx-auto px-5 sm:px-8 lg:px-12">
        {/* Sleek Minimal Status Bar */}
        <div className="flex items-center justify-between pb-4 mb-7 sm:mb-9 border-b border-white/[0.06] text-xs font-mono">
          <div className="flex items-center gap-2 text-neutral-400">
            <span className="w-1.5 h-1.5 rounded-full bg-red-500" />
            <span className="tracking-widest uppercase text-[10px] sm:text-[11px]">Audited Track Record</span>
          </div>
          <span className="text-neutral-500 text-[10px] sm:text-[11px] tracking-wider uppercase">
            Est. 2011 • Official Metrics
          </span>
        </div>

        {/* 4-Item Grid with Responsive Dividers */}
        <div className="grid grid-cols-2 lg:grid-cols-4 divide-y divide-white/[0.08] sm:divide-y-0 sm:divide-x divide-white/[0.08]">
          {statsList.map((stat: any, idx: number) => (
            <motion.div 
              key={stat.label}
              initial={{ opacity: 0, y: 14 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-20px" }}
              transition={{ duration: 0.6, delay: idx * 0.06, ease: [0.16, 1, 0.3, 1] }}
              className={`flex flex-col justify-center py-4 sm:py-2 ${
                idx % 2 === 0 ? 'pr-4 sm:pr-6 lg:pr-8' : 'pl-4 sm:pl-6 lg:pl-8'
              } ${idx === 0 ? 'sm:pl-0' : ''}`}
            >
              {/* Clean Metric Number */}
              <div className="text-2xl sm:text-3xl lg:text-4xl leading-tight mb-1.5">
                <CounterCell value={stat.value} suffix={stat.suffix} />
              </div>

              {/* Compact Labels */}
              <div>
                <h3 className="text-xs sm:text-sm font-medium text-neutral-200 tracking-wide">
                  {stat.label}
                </h3>
                <p className="text-[10px] sm:text-[11px] text-neutral-400 font-mono mt-0.5 tracking-tight">
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