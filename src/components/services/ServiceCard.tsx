"use client";

import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowUpRight, CheckCircle2 } from 'lucide-react';

export interface ServiceType {
  title: string;
  description: string;
  slug?: string;
  id?: string | number;
  scope?: string;
  [key: string]: any;
}

interface ServiceCardProps {
  service: ServiceType;
  index: number;
}

const easeEditorial: [number, number, number, number] = [0.16, 1, 0.3, 1];

export function ServiceCard({ service, index }: ServiceCardProps) {
  const formattedIndex = String(index + 1).padStart(2, '0');
  const serviceSlug = service.slug || service.id || `service-${index}`;

  return (
    <motion.div 
      variants={{
        hidden: { opacity: 0, y: 14 },
        visible: { 
          opacity: 1, 
          y: 0, 
          transition: { duration: 0.65, ease: easeEditorial } 
        }
      }}
      whileHover={{ y: -3, transition: { duration: 0.25, ease: easeEditorial } }}
      className="w-full"
    >
      <Link 
        href={`/services#${serviceSlug}`}
        className="group relative flex flex-col lg:flex-row lg:items-center justify-between gap-6 p-6 sm:p-7 lg:p-8 rounded-2xl bg-white border border-neutral-200/80 hover:border-neutral-300 transition-all duration-300 hover:shadow-lg overflow-hidden"
      >
        {/* Subtle Red Left Laser Indicator */}
        <div 
          className="absolute left-0 top-0 bottom-0 w-1 bg-red-600 scale-y-0 group-hover:scale-y-100 transition-transform duration-300 origin-top" 
          aria-hidden="true" 
        />

        {/* Left: Index & Service Details */}
        <div className="flex items-start gap-5 sm:gap-7 max-w-3xl">
          {/* Clean Editorial Numbering (No Clunky Box) */}
          <span className="font-mono text-sm sm:text-base font-semibold text-neutral-400 group-hover:text-red-600 transition-colors duration-200 shrink-0 mt-0.5">
            {formattedIndex}
          </span>

          <div>
            <div className="flex flex-wrap items-center gap-3 mb-2">
              <h3 className="text-lg sm:text-xl font-semibold text-[#0A0D12] tracking-tight leading-snug group-hover:text-red-600 transition-colors duration-200">
                {service.title}
              </h3>

              {/* Minimal Tag */}
              <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-neutral-100 border border-neutral-200 text-[10.5px] font-mono text-neutral-600 group-hover:text-red-600 group-hover:border-red-200 group-hover:bg-red-50/60 transition-colors duration-200">
                <CheckCircle2 size={11} className="text-red-600 shrink-0" />
                <span>{service.scope}</span>
              </span>
            </div>

            {/* Description with Open Breathing Line-Height */}
            <p className="text-xs sm:text-sm text-neutral-600 font-normal leading-[1.68] tracking-normal m-0">
              {service.description}
            </p>
          </div>
        </div>

        {/* Right: Tactile Arrow Action Button */}
        <div className="flex items-center justify-between lg:justify-end gap-4 border-t lg:border-t-0 border-neutral-100 pt-4 lg:pt-0 shrink-0">
          <span className="lg:hidden text-[11px] font-mono tracking-wider text-neutral-400 uppercase">
            Explore Details
          </span>

          <div 
            className="inline-flex items-center justify-center w-10 h-10 rounded-full border border-neutral-200/90 bg-neutral-100 text-neutral-600 group-hover:bg-red-600 group-hover:border-red-600 group-hover:text-white transition-all duration-300 shadow-2xs group-hover:shadow-[0_4px_16px_rgba(220,38,38,0.3)]"
            aria-hidden="true"
          >
            <ArrowUpRight 
              size={15} 
              className="transition-transform duration-300 group-hover:rotate-45" 
            />
          </div>
        </div>

      </Link>
    </motion.div>
  );
}

export default ServiceCard;