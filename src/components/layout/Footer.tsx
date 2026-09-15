"use client";

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { 
  ArrowUpRight, 
  Mail, 
  Phone, 
  MapPin, 
  Globe, 
  ShieldCheck, 
  Linkedin, 
  Facebook, 
  Instagram, 
  Twitter, 
  Youtube 
} from 'lucide-react';
import { company } from '@/data/company';

const socialLinks = [
  {
    name: 'LinkedIn',
    href: 'https://in.linkedin.com/company/futurextrade',
    icon: Linkedin,
    hoverStyle: 'hover:border-[#0A66C2] hover:text-[#0A66C2]'
  },
  {
    name: 'Facebook',
    href: 'https://www.facebook.com/FuturexGroup/',
    icon: Facebook,
    hoverStyle: 'hover:border-[#1877F2] hover:text-[#1877F2]'
  },
  {
    name: 'Instagram',
    href: 'https://www.instagram.com/futurexgroup/',
    icon: Instagram,
    hoverStyle: 'hover:border-[#E4405F] hover:text-[#E4405F]'
  },
  {
    name: 'X (Twitter)',
    href: 'https://twitter.com/FuturexG',
    icon: Twitter,
    hoverStyle: 'hover:border-white hover:text-white'
  },
  {
    name: 'YouTube',
    href: 'https://www.youtube.com/channel/UC9iX-FoOOdePYULF-IYgGZQ',
    icon: Youtube,
    hoverStyle: 'hover:border-red hover:text-red'
  }
];

const explore = [
  { href: '/exhibitions', label: 'Trade Exhibitions' },
  { href: '/industries', label: 'Sectors & Industries' },
  { href: '/services', label: 'Our Services' },
  { href: '/global-presence', label: 'Global Corridors' },
] as const;

const companyLinks = [
  { href: '/about', label: 'About Group' },
  { href: '/participants', label: 'Participant Hub' },
  { href: '/gallery', label: 'Visual Archive' },
  { href: '/conferences', label: 'Trade Conferences' },
  { href: '/webinars', label: 'Digital Summits' },
  { href: '/contact', label: 'Contact & Inquiries' },
] as const;

export function Footer() {
  const currentYear = new Date().getFullYear();
  const companyName = (company as any)?.name || (company as any)?.legalName || "Futurex Trade Fair and Events Pvt. Ltd.";
  const logoSrc = (company as any)?.assets?.logo;

  return (
    <footer 
      className="relative z-20 w-full bg-ink text-white border-t border-line-dark overflow-hidden pt-20 sm:pt-28 pb-12 select-none"
      aria-labelledby="footer-heading"
    >
      {/* Top Accent Gradient Laser Hairline */}
      <span className="absolute top-0 left-0 right-0 h-[1.5px] bg-gradient-to-r from-transparent via-red to-transparent opacity-80" />

      {/* Subtle Top Red Horizon Atmosphere */}
      <div className="absolute -top-24 left-1/2 -translate-x-1/2 w-[700px] h-[160px] bg-red/[0.08] rounded-full blur-[130px] pointer-events-none" />

      {/* 
        GIANT WATERMARK TYPOGRAPHY
        Uses negative tracking, viewport-width alignment, and horizontal clamping 
        so the final 'E' NEVER gets clipped on any screen size.
      */}
      <div 
        className="absolute bottom-2 sm:bottom-0 left-1/2 -translate-x-1/2 w-screen pointer-events-none select-none overflow-hidden z-0 flex justify-center items-end"
        aria-hidden="true"
      >
        <span className="font-heading font-black text-[12.5vw] tracking-[-0.04em] text-white/[0.03] uppercase leading-none whitespace-nowrap block text-center px-4">
          FUTUREX GROUP
        </span>
      </div>

      <div className="relative z-10 max-w-[1280px] mx-auto px-6 sm:px-8">
        
        {/* Main 4-Column Grid with Open Breathing Space */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-12 lg:gap-14 pb-16 sm:pb-20 border-b border-line-dark">
          
          {/* Identity, Comprehensive Description & Social Channels (5 Cols) */}
          <div className="lg:col-span-5 flex flex-col justify-between space-y-8">
            <div>
              {/* Logo / Monogram Presentation */}
              <div className="flex items-center gap-3 mb-7">
                {logoSrc ? (
                  <Link href="/" className="inline-block relative w-52 h-13">
                    <Image
                      src={logoSrc}
                      alt={companyName}
                      fill
                      sizes="220px"
                      priority
                      className="object-contain object-left filter brightness-110"
                    />
                  </Link>
                ) : (
                  <Link href="/" className="inline-flex items-center gap-3">
                    <span className="w-8 h-8 rounded bg-red flex items-center justify-center font-mono font-bold text-white text-sm shadow-[0_0_16px_rgba(227,19,27,0.45)]">
                      F
                    </span>
                    <span className="font-heading font-black text-2xl tracking-tight text-white">
                      FUTUREX<span className="text-red">.</span>
                    </span>
                  </Link>
                )}
              </div>

              {/* Exact Corporate Portfolio Profile */}
              <p className="text-slate-300 text-xs sm:text-[13.5px] leading-[1.85] font-normal mb-8 max-w-[480px] tracking-normal">
                Futurex Trade Fair & Events Pvt. Ltd. is a renowned international exhibition and corporate events organizer headquartered in New Delhi with branch offices in Mumbai, Colombo, Kathmandu, and Dhaka. With a global track record of 220+ successful trade exhibitions and conferences, Futurex delivers specialized platforms across Building & Infra, Woodworking, Electric Vehicles, Pharma, Garments, Power, Education, and Packaging & Plastics.
              </p>

              {/* Quick Operational Badges */}
              <div className="flex flex-wrap items-center gap-3 mb-8">
                <span className="inline-flex items-center gap-2 px-3 py-1.5 bg-white/[0.04] border border-white/10 rounded text-[11px] font-mono tracking-wider uppercase text-slate-300">
                  <Globe size={13} className="text-red" />
                  <span>220+ Exhibitions Delivered</span>
                </span>
                <span className="inline-flex items-center gap-2 px-3 py-1.5 bg-white/[0.04] border border-white/10 rounded text-[11px] font-mono tracking-wider uppercase text-slate-300">
                  <ShieldCheck size={13} className="text-emerald-400" />
                  <span>Est. {(company as any)?.established || "2011"}</span>
                </span>
              </div>
            </div>

            {/* Social Media Connectivity Hub */}
            <div>
              <span className="font-mono text-[10.5px] font-bold text-slate-400 uppercase tracking-[0.22em] block mb-3.5">
                Connect Across Networks:
              </span>
              <div className="flex flex-wrap items-center gap-2.5">
                {socialLinks.map((item) => {
                  const Icon = item.icon;
                  return (
                    <Link
                      key={item.name}
                      href={item.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={`Futurex on ${item.name}`}
                      className={`w-9 h-9 flex items-center justify-center bg-white/[0.04] border border-white/10 text-slate-300 rounded transition-all duration-300 hover:-translate-y-1 hover:bg-white/[0.08] shadow-2xs ${item.hoverStyle}`}
                    >
                      <Icon size={15} />
                    </Link>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Column 1: Trade Portfolios (2 Cols) */}
          <div className="lg:col-span-2">
            <h3 className="font-mono text-[11px] font-bold text-slate-200 uppercase tracking-[0.2em] mb-7 pb-3 border-b border-line-dark flex items-center justify-between">
              <span>EXPLORE</span>
              <span className="text-red font-mono text-[10px] tracking-wider">01</span>
            </h3>
            <ul className="space-y-4 p-0 m-0 list-none text-xs sm:text-[13px]">
              {explore.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="group inline-flex items-center gap-2.5 text-slate-400 hover:text-white transition-all duration-200 leading-relaxed font-normal hover:translate-x-1"
                  >
                    <span className="w-1.5 h-1.5 rounded-full bg-white/20 group-hover:bg-red transition-colors shrink-0" />
                    <span>{item.label}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 2: Corporate Navigation (2 Cols) */}
          <div className="lg:col-span-2">
            <h3 className="font-mono text-[11px] font-bold text-slate-200 uppercase tracking-[0.2em] mb-7 pb-3 border-b border-line-dark flex items-center justify-between">
              <span>COMPANY</span>
              <span className="text-red font-mono text-[10px] tracking-wider">02</span>
            </h3>
            <ul className="space-y-4 p-0 m-0 list-none text-xs sm:text-[13px]">
              {companyLinks.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="group inline-flex items-center gap-2.5 text-slate-400 hover:text-white transition-all duration-200 leading-relaxed font-normal hover:translate-x-1"
                  >
                    <span className="w-1.5 h-1.5 rounded-full bg-white/20 group-hover:bg-red transition-colors shrink-0" />
                    <span>{item.label}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3: Headquarters & Official Desk (3 Cols) */}
          <div className="lg:col-span-3">
            <h3 className="font-mono text-[11px] font-bold text-slate-200 uppercase tracking-[0.2em] mb-7 pb-3 border-b border-line-dark flex items-center justify-between">
              <span>HEADQUARTERS</span>
              <span className="text-red font-mono text-[10px] tracking-wider">DEL</span>
            </h3>

            <div className="space-y-4 text-xs sm:text-[13px] text-slate-400">
              <div className="flex items-start gap-3">
                <MapPin size={15} className="text-red shrink-0 mt-1" />
                <address className="not-italic leading-[1.8] text-slate-300 font-normal">
                  1st Floor, E-52, Kalkaji, New Delhi, Delhi 110019, India
                </address>
              </div>

              <div className="flex items-center gap-3">
                <Phone size={14} className="text-red shrink-0" />
                <a 
                  href="tel:+911140538400" 
                  className="hover:text-white transition-colors font-mono tracking-wide text-slate-300"
                >
                  {(company as any)?.phone || "+91-11-4053-8400"}
                </a>
              </div>

              <div className="flex items-center gap-3">
                <Mail size={14} className="text-red shrink-0" />
                <a 
                  href="mailto:admin@futurextrade.com" 
                  className="hover:text-white transition-colors font-mono tracking-wide text-slate-300"
                >
                  admin@futurextrade.com
                </a>
              </div>

              <div className="pt-3">
                <Link
                  href="/contact"
                  className="inline-flex items-center gap-2 text-xs font-mono font-bold uppercase tracking-[0.16em] text-red hover:text-white transition-colors group"
                >
                  <span>Regional Branch Directory</span>
                  <ArrowUpRight size={13} className="transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </Link>
              </div>
            </div>
          </div>

        </div>

        {/* Bottom Legal & Copyright Matrix */}
        <div className="pt-10 flex flex-col md:flex-row items-center justify-between gap-6 text-xs font-mono text-slate-400 tracking-wider">
          <div>
            <span>© {currentYear} {companyName}. All rights reserved.</span>
          </div>

          <div className="flex items-center gap-6">
            <a 
              href="https://futurextrade.com/PrivacyPolicy.php" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="hover:text-slate-200 transition-colors"
            >
              Privacy Policy
            </a>
            <span className="text-white/20">|</span>
            <a 
              href="https://futurextrade.com/Terms%26Conditons.php" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="hover:text-slate-200 transition-colors"
            >
              Terms & Conditions
            </a>
          </div>

          <div className="text-slate-500 hidden lg:block">
            International Trade Platform Standards
          </div>
        </div>

      </div>
    </footer>
  );
}

export default Footer;