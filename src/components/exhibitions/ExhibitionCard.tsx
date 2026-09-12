"use client";

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion, type Variants } from 'framer-motion';
import { 
  Calendar, 
  MapPin, 
  Globe, 
  Mail, 
  Linkedin, 
  Facebook, 
  Instagram, 
  Twitter, 
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

  return (
    <motion.article
      variants={cardVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-40px" }}
      className="group relative flex flex-col justify-between w-full h-full bg-white border border-neutral-200/90 hover:border-neutral-300 rounded-3xl overflow-hidden shadow-2xs hover:shadow-2xl transition-all duration-400 ease-[0.16,1,0.3,1] hover:-translate-y-1.5 select-none"
    >
      {/* Top Red Laser Hairline Accent on Hover */}
      <span className="absolute top-0 left-0 right-0 h-[2.5px] bg-red-600 scale-x-0 group-hover:scale-x-100 transition-transform duration-400 ease-[0.16,1,0.3,1] origin-left z-20" />

      <div>
        {/* ========================================================================= */}
        {/* LARGE PROMINENT LOGO CANVAS (CLICKABLE TO ZOOM) */}
        {/* ========================================================================= */}
        <button
          type="button"
          onClick={() => onSelect(event)}
          className="relative w-full h-56 sm:h-64 bg-gradient-to-b from-[#FBFBFD] to-[#F3F4F6] border-b border-neutral-200/80 flex items-center justify-center p-6 sm:p-8 overflow-hidden cursor-zoom-in focus:outline-none w-full"
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
            <div className="absolute top-4 right-4 z-10">
              <span className="px-3 py-1 rounded-full bg-white/90 backdrop-blur-md border border-neutral-200/90 text-neutral-800 text-[10px] font-mono tracking-widest uppercase shadow-2xs">
                {edition}
              </span>
            </div>
          )}

          {/* Industry Floating Pill */}
          {industry && (
            <div className="absolute bottom-4 left-4 z-10">
              <span className="px-3 py-1 rounded-full bg-black/60 backdrop-blur-md border border-white/20 text-white text-[10px] font-mono tracking-wider uppercase">
                {industry}
              </span>
            </div>
          )}

          {/* Large Prominent Logo Render */}
          <div className="relative z-10 w-[90%] h-[85%] flex items-center justify-center transition-transform duration-500 ease-[0.16,1,0.3,1] group-hover:scale-105">
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
        <div className="p-6 sm:p-7 space-y-4">
          <h3 className="text-lg sm:text-xl font-semibold text-[#0A0D12] tracking-[-0.02em] leading-snug group-hover:text-red-600 transition-colors duration-200 line-clamp-2 m-0">
            {name}
          </h3>

          <div className="space-y-2.5 pt-3 border-t border-neutral-100 text-xs text-neutral-600 font-normal">
            <div className="flex items-center gap-2.5">
              <Calendar size={14} className="text-red-600 shrink-0" />
              <span className="font-mono tracking-wide text-neutral-800 font-medium">{dates.display}</span>
            </div>

            <div className="flex items-center gap-2.5">
              <MapPin size={14} className="text-neutral-400 shrink-0" />
              <span className="truncate">{venue.city}{venue.country ? `, ${venue.country}` : ''}</span>
            </div>
          </div>
        </div>
      </div>

      {/* ========================================================================= */}
      {/* SOCIALS & FIXED HIGH-CONTRAST PORTAL FOOTER */}
      {/* ========================================================================= */}
      <div className="px-6 pb-6 sm:px-7 sm:pb-7 pt-4 border-t border-neutral-100 flex items-center justify-between gap-3">
        <div className="flex items-center gap-1.5 text-neutral-500">
          {socials?.website && (
            <Link
              href={socials.website}
              target="_blank"
              rel="noopener noreferrer"
              title="Official Website"
              className="w-8 h-8 rounded-full bg-neutral-100 hover:bg-neutral-900 text-neutral-600 hover:text-white flex items-center justify-center transition-all duration-200 hover:-translate-y-0.5"
            >
              <Globe size={13} />
            </Link>
          )}

          {socials?.linkedin && (
            <Link
              href={socials.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              title="LinkedIn"
              className="w-8 h-8 rounded-full bg-neutral-100 hover:bg-[#0A66C2] text-neutral-600 hover:text-white flex items-center justify-center transition-all duration-200 hover:-translate-y-0.5"
            >
              <Linkedin size={13} />
            </Link>
          )}

          {socials?.facebook && (
            <Link
              href={socials.facebook}
              target="_blank"
              rel="noopener noreferrer"
              title="Facebook"
              className="w-8 h-8 rounded-full bg-neutral-100 hover:bg-[#1877F2] text-neutral-600 hover:text-white flex items-center justify-center transition-all duration-200 hover:-translate-y-0.5"
            >
              <Facebook size={13} />
            </Link>
          )}

          {socials?.instagram && (
            <Link
              href={socials.instagram}
              target="_blank"
              rel="noopener noreferrer"
              title="Instagram"
              className="w-8 h-8 rounded-full bg-neutral-100 hover:bg-[#E4405F] text-neutral-600 hover:text-white flex items-center justify-center transition-all duration-200 hover:-translate-y-0.5"
            >
              <Instagram size={13} />
            </Link>
          )}

          {socials?.twitter && (
            <Link
              href={socials.twitter}
              target="_blank"
              rel="noopener noreferrer"
              title="X (Twitter)"
              className="w-8 h-8 rounded-full bg-neutral-100 hover:bg-black text-neutral-600 hover:text-white flex items-center justify-center transition-all duration-200 hover:-translate-y-0.5"
            >
              <Twitter size={13} />
            </Link>
          )}

          <Link
            href={mailHref}
            title="Email Secretariat"
            className="w-8 h-8 rounded-full bg-neutral-100 hover:bg-red-600 text-neutral-600 hover:text-white flex items-center justify-center transition-all duration-200 hover:-translate-y-0.5"
          >
            <Mail size={13} />
          </Link>
        </div>

        {/* High-Contrast Dark Portal Button with Smooth Hover */}
        {socials?.website ? (
          <Link
            href={socials.website}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full bg-neutral-900 hover:bg-red-600 text-white font-mono text-[11px] font-bold uppercase tracking-wider transition-all duration-300 shadow-sm hover:shadow-md hover:-translate-y-0.5 active:scale-95"
          >
            <span>Portal</span>
            <ArrowUpRight size={13} className="text-white" />
          </Link>
        ) : (
          <Link
            href={mailHref}
            className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full bg-neutral-900 hover:bg-red-600 text-white font-mono text-[11px] font-bold uppercase tracking-wider transition-all duration-300 shadow-sm hover:shadow-md hover:-translate-y-0.5 active:scale-95"
          >
            <span>Inquire</span>
            <ArrowUpRight size={13} className="text-white" />
          </Link>
        )}
      </div>
    </motion.article>
  );
}

export default ExhibitionCard;