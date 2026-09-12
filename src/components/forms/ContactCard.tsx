"use client";

import { Mail, Phone, Building2, Globe2, Clock, Linkedin, Facebook, Instagram, Twitter, Youtube } from 'lucide-react';
import { company } from '@/data/company';

const socialLinks = [
  {
    name: 'LinkedIn',
    href: 'https://in.linkedin.com/company/futurextrade',
    icon: Linkedin,
    hoverBg: 'hover:border-[#0A66C2] hover:bg-[#0A66C2]/15 hover:text-[#0A66C2]'
  },
  {
    name: 'Facebook',
    href: 'https://www.facebook.com/FuturexGroup/',
    icon: Facebook,
    hoverBg: 'hover:border-[#1877F2] hover:bg-[#1877F2]/15 hover:text-[#1877F2]'
  },
  {
    name: 'Instagram',
    href: 'https://www.instagram.com/futurexgroup/',
    icon: Instagram,
    hoverBg: 'hover:border-[#E4405F] hover:bg-[#E4405F]/15 hover:text-[#E4405F]'
  },
  {
    name: 'X (Twitter)',
    href: 'https://twitter.com/FuturexG',
    icon: Twitter,
    hoverBg: 'hover:border-white hover:bg-white/15 hover:text-white'
  },
  {
    name: 'YouTube',
    href: 'https://www.youtube.com/channel/UC9iX-FoOOdePYULF-IYgGZQ',
    icon: Youtube,
    hoverBg: 'hover:border-[#FF0000] hover:bg-[#FF0000]/15 hover:text-[#FF0000]'
  }
];

export function ContactCard() {
  return (
    <div className="group relative flex flex-col justify-between h-full bg-[#07080A] text-white rounded-3xl p-7 sm:p-8 border border-white/[0.08] shadow-2xl overflow-hidden select-none">
      
      {/* Background Volumetric Glow & Grid */}
      <div 
        className="absolute inset-0 pointer-events-none opacity-[0.15] z-0"
        style={{
          backgroundImage: `
            linear-gradient(to right, rgba(255, 255, 255, 0.08) 1px, transparent 1px),
            linear-gradient(to bottom, rgba(255, 255, 255, 0.08) 1px, transparent 1px)
          `,
          backgroundSize: '32px 32px'
        }}
        aria-hidden="true"
      />
      <div className="absolute -top-20 -right-20 w-60 h-60 rounded-full bg-red-600/15 blur-[90px] pointer-events-none" />

      <div className="relative z-10 space-y-6">
        
        {/* Header Badge */}
        <div className="inline-flex items-center gap-2 px-3 py-1 bg-white/[0.05] border border-white/10 rounded-full backdrop-blur-md">
          <span className="w-1.5 h-1.5 rounded-full bg-red-500 animate-pulse" />
          <span className="text-[10px] font-mono font-bold tracking-[0.18em] uppercase text-neutral-300">
            HEADQUARTERS // NEW DELHI
          </span>
        </div>

        {/* Address */}
        <div>
          <h2 className="text-lg font-semibold text-white leading-snug tracking-tight mb-1.5">
            {company.address}
          </h2>
          <p className="text-[11px] text-neutral-400 font-mono tracking-wider uppercase flex items-center gap-2">
            <Globe2 className="w-3.5 h-3.5 text-red-500 shrink-0" />
            <span>Global Exhibition Operations Hub</span>
          </p>
        </div>

        {/* Working Hours Badge */}
        <div className="flex items-center gap-3 p-3.5 rounded-2xl bg-white/[0.03] border border-white/[0.08] text-xs text-neutral-300">
          <Clock className="w-4 h-4 text-red-500 shrink-0" />
          <div>
            <span className="text-[10px] font-mono uppercase tracking-widest text-neutral-400 block mb-0.5">Working Hours</span>
            <span className="font-medium text-white font-mono text-[11.5px]">Mon – Fri: 10:00 AM – 06:00 PM</span>
          </div>
        </div>

        {/* Quick Contact Links */}
        <div className="space-y-2.5">
          <a 
            href={`tel:${company.phone}`}
            className="flex items-center gap-3 p-3.5 rounded-2xl bg-white/[0.03] border border-white/[0.08] hover:border-red-500/50 hover:bg-white/[0.06] transition-all duration-300 group/link"
          >
            <div className="w-8 h-8 rounded-xl bg-red-600/10 border border-red-500/20 flex items-center justify-center text-red-500 group-hover/link:bg-red-600 group-hover/link:text-white transition-colors shrink-0">
              <Phone className="w-3.5 h-3.5" />
            </div>
            <div className="min-w-0">
              <span className="text-[9.5px] font-mono uppercase tracking-widest text-neutral-400 block">Phone</span>
              <span className="text-xs font-semibold text-white group-hover/link:text-red-400 transition-colors truncate block font-mono">{company.phone}</span>
            </div>
          </a>

          <a 
            href={`mailto:${company.email}`}
            className="flex items-center gap-3 p-3.5 rounded-2xl bg-white/[0.03] border border-white/[0.08] hover:border-red-500/50 hover:bg-white/[0.06] transition-all duration-300 group/link"
          >
            <div className="w-8 h-8 rounded-xl bg-red-600/10 border border-red-500/20 flex items-center justify-center text-red-500 group-hover/link:bg-red-600 group-hover/link:text-white transition-colors shrink-0">
              <Mail className="w-3.5 h-3.5" />
            </div>
            <div className="min-w-0">
              <span className="text-[9.5px] font-mono uppercase tracking-widest text-neutral-400 block">Email</span>
              <span className="text-xs font-semibold text-white group-hover/link:text-red-400 transition-colors truncate block font-mono">{company.email}</span>
            </div>
          </a>
        </div>

        {/* Social Media Network Links */}
        <div>
          <span className="text-[10px] font-mono uppercase tracking-widest text-neutral-400 block mb-2.5">Connect With Us</span>
          <div className="flex items-center gap-2 flex-wrap">
            {socialLinks.map((item) => {
              const Icon = item.icon;
              return (
                <a
                  key={item.name}
                  href={item.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={item.name}
                  className={`w-9 h-9 rounded-xl bg-white/[0.03] border border-white/[0.08] flex items-center justify-center text-neutral-300 transition-all duration-300 ${item.hoverBg}`}
                >
                  <Icon className="w-4 h-4" />
                </a>
              );
            })}
          </div>
        </div>
      </div>

      {/* Branch Offices Footer */}
      <div className="relative z-10 pt-4 mt-6 border-t border-white/[0.08]">
        <div className="flex items-start gap-2.5 text-neutral-300 text-xs">
          <Building2 className="w-4 h-4 text-red-500 shrink-0 mt-0.5" />
          <span className="leading-relaxed text-[11px] font-normal">
            <strong className="text-white font-mono uppercase tracking-wider">Branches:</strong>{' '}
            {company.offices.slice(1).join(', ')}
          </span>
        </div>
      </div>
    </div>
  );
}