"use client";

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion, type Variants } from 'framer-motion';
import {
  Calendar,
  MapPin,
  Mail,
  Linkedin,
  Facebook,
  Instagram,
  Twitter,
  Youtube,
  ArrowUpRight,
  Building2
} from 'lucide-react';
import type { ExhibitionEvent } from '@/data/exhibitions';

const easeEditorial: [number, number, number, number] = [0.16, 1, 0.3, 1];

const cardVariants: Variants = {
  hidden: { opacity: 0, y: 18 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.55, ease: easeEditorial }
  }
};

// Naya social icon add karna ho to bas yahan ek line add karo
const socialItems = [
  { key: 'linkedin',  label: 'LinkedIn',  Icon: Linkedin,  glow: 'hover:shadow-[0_8px_20px_rgba(10,102,194,0.25)]' },
  { key: 'facebook',  label: 'Facebook',  Icon: Facebook,  glow: 'hover:shadow-[0_8px_20px_rgba(24,119,242,0.25)]' },
  { key: 'instagram', label: 'Instagram', Icon: Instagram, glow: 'hover:shadow-[0_8px_20px_rgba(228,64,95,0.25)]' },
  { key: 'twitter',   label: 'Twitter',   Icon: Twitter,   glow: 'hover:shadow-[0_8px_20px_rgba(0,0,0,0.25)]' },
  { key: 'youtube',   label: 'YouTube',   Icon: Youtube,   glow: 'hover:shadow-[0_8px_20px_rgba(255,0,0,0.25)]' },
  { key: 'email',     label: 'Email',     Icon: Mail,      glow: 'hover:shadow-[0_8px_20px_rgba(220,38,38,0.25)]' },
] as const;

interface ExhibitionCardProps {
  event: ExhibitionEvent;
  onSelect: (event: ExhibitionEvent) => void;
}

export function ExhibitionCard({ event, onSelect }: ExhibitionCardProps) {
  const { name, edition, dates, venue, industry, heroImage, image, socials } = event;
  const imageSrc = heroImage || image;

  const mailSubject = encodeURIComponent(`Stall & Visitor Inquiry: ${name}`);
  const mailHref = socials?.email
    ? `mailto:${socials.email}?subject=${mailSubject}`
    : `mailto:admin@futurextrade.com?subject=${mailSubject}`;

  // Sirf wahi icons jinka link data mein hai
  const socialLinks = socialItems.flatMap((item) => {
    const value = socials?.[item.key];
    if (!value) return [];
    return [{ ...item, href: item.key === 'email' ? mailHref : value }];
  });

  return (
    <motion.article
      variants={cardVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-40px" }}
      className="group relative flex flex-col justify-between w-full h-full bg-white border border-neutral-200/90 hover:border-neutral-300 rounded-3xl overflow-hidden shadow-2xs hover:shadow-2xl transition-all duration-400 ease-[cubic-bezier(0.16,1,0.3,1)] hover:-translate-y-1.5 select-none"
    >
      {/* Top Red Laser Hairline Accent on Hover */}
      <span className="absolute top-0 left-0 right-0 h-[2.5px] bg-red-600 scale-x-0 group-hover:scale-x-100 transition-transform duration-400 ease-[cubic-bezier(0.16,1,0.3,1)] origin-left z-20" />

      <div>
        {/* ========================================================================= */}
        {/* LARGE PROMINENT LOGO CANVAS (CLICKABLE TO ZOOM) */}
        {/* ========================================================================= */}
        <button
          type="button"
          onClick={() => onSelect(event)}
          className="relative w-full h-52 sm:h-64 lg:h-72 bg-gradient-to-b from-[#FBFBFD] to-[#F3F4F6] border-b border-neutral-200/80 flex items-center justify-center p-5 sm:p-8 overflow-hidden cursor-zoom-in focus:outline-none"
        >
          {/* Subtle Radial Grid Texture */}
          <div
            className="absolute inset-0 opacity-20 pointer-events-none"
            style={{
              backgroundImage: 'radial-gradient(rgba(15, 23, 42, 0.2) 1px, transparent 1px)',
              backgroundSize: '20px 20px'
            }}
          />

          {/* Edition Floating Badge */}
          {edition && (
            <div className="absolute top-3 right-3 sm:top-4 sm:right-4 z-10">
              <span className="px-2.5 sm:px-3 py-1 rounded-full bg-white/95 backdrop-blur-md border border-neutral-200/90 text-neutral-900 text-[9px] sm:text-[10px] font-mono tracking-widest uppercase shadow-2xs">
                {edition}
              </span>
            </div>
          )}

        

          {/* Large Prominent Logo Render */}
          <div className="relative z-10 w-[92%] h-[88%] flex items-center justify-center transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-105">
            {imageSrc ? (
              <div className="relative w-full h-full">
                <Image
                  src={imageSrc}
                  alt={name}
                  fill
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  className="object-contain filter drop-shadow-[0_6px_20px_rgba(0,0,0,0.08)]"
                  priority={false}
                />
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center gap-2.5 text-neutral-400">
                <Building2 size={40} className="text-red-600" />
                <span className="font-mono text-[11px] tracking-widest uppercase">Futurex Platform</span>
              </div>
            )}
          </div>
        </button>

        {/* ========================================================================= */}
        {/* TYPOGRAPHY & TELEMETRY LEDGER */}
        {/* ========================================================================= */}
        <div className="p-4 sm:p-7 space-y-3 sm:space-y-4">
          <h3 className="text-base sm:text-xl font-semibold text-[#0A0D12] tracking-[-0.02em] leading-snug group-hover:text-red-600 transition-colors duration-200 line-clamp-2 m-0">
            {name}
          </h3>

          <div className="space-y-2.5 pt-3 border-t border-neutral-100 text-xs text-neutral-600 font-normal">
            <div className="flex items-start gap-2.5">
              <Calendar size={14} className="text-red-600 shrink-0 mt-0.5" />
              <span className="font-mono tracking-wide text-neutral-900 font-medium">{dates.display}</span>
            </div>

            <div className="flex items-start gap-2.5">
              <MapPin size={14} className="text-neutral-400 shrink-0 mt-0.5" />
              <span className="line-clamp-2">
                {venue.city}{venue.country ? `, ${venue.country}` : ''}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* ========================================================================= */}
      {/* SOCIAL ICONS WITH TOOLTIPS & PORTAL BUTTON */}
      {/* ========================================================================= */}
      <div className="px-4 pb-4 sm:px-7 sm:pb-7 pt-4 border-t border-neutral-100 flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:items-center sm:justify-between">
        <div className="flex flex-wrap items-center gap-2">
          {socialLinks.map(({ key, label, Icon, glow, href }) => (
            <div key={key} className="relative group/tooltip">
              <span className="max-sm:hidden absolute -top-9 left-1/2 -translate-x-1/2 px-2.5 py-1 bg-neutral-900 text-white font-mono text-[9.5px] uppercase tracking-wider rounded-md opacity-0 group-hover/tooltip:opacity-100 transition-all duration-200 pointer-events-none shadow-md whitespace-nowrap z-30 translate-y-1 group-hover/tooltip:translate-y-0">
                {label}
              </span>
              <Link
                href={href}
                aria-label={label}
                {...(key !== 'email' && { target: '_blank', rel: 'noopener noreferrer' })}
                className={`relative w-9 h-9 sm:w-8 sm:h-8 rounded-full bg-neutral-100 text-neutral-600 flex items-center justify-center transition-all duration-300 transform sm:hover:-translate-y-1.5 sm:hover:scale-110 hover:bg-white ${glow}`}
              >
                <Icon size={14} className="transition-colors duration-200" />
              </Link>
            </div>
          ))}
        </div>

        {/* Unified High-Contrast Portal Button */}
        <Link
          href={socials?.website?.trim() || mailHref}
          {...(socials?.website && { target: '_blank', rel: 'noopener noreferrer' })}
          className="inline-flex w-full sm:w-auto items-center justify-center gap-1.5 px-4 py-2.5 sm:py-2 rounded-full bg-neutral-900 hover:bg-red-600 text-white font-mono text-[11px] font-bold uppercase tracking-wider transition-all duration-300 shadow-2xs hover:shadow-md sm:hover:-translate-y-0.5 active:scale-95"
        >
          <span className="text-white">{socials?.website ? 'Portal' : 'Inquire'}</span>
          <ArrowUpRight size={13} className="text-white" />
        </Link>
      </div>
    </motion.article>
  );
}

export default ExhibitionCard;