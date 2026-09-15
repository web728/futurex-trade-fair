'use client';

import React, { useEffect, useState, useRef } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Menu, X, ArrowUpRight, Phone, Mail, ChevronRight, MessageSquare } from 'lucide-react';
import { AnimatePresence, motion, useReducedMotion, type Variants } from 'framer-motion';
import { company } from '@/data/company';

interface NavItem {
  href: string;
  label: string;
}

const navItems: NavItem[] = [
  { href: '/about', label: 'About' },
  { href: '/exhibitions', label: 'Exhibitions' },
  { href: '/industries', label: 'Industries' },
  { href: '/global-presence', label: 'Global Hubs' },
  { href: '/services', label: 'Services' },
  { href: '/gallery', label: 'Media' },
  { href: '/contact', label: 'Contact' }
];

const easeEditorial: [number, number, number, number] = [0.16, 1, 0.3, 1];

// Buttery-smooth fluid slide-down & slide-up animation
const mobileNavVariants: Variants = {
  hidden: { 
    opacity: 0, 
    y: '-100%',
    transition: { 
      duration: 0.4, 
      ease: [0.32, 0, 0.67, 0] 
    } 
  },
  visible: {
    opacity: 1,
    y: '0%',
    transition: {
      duration: 0.55,
      ease: easeEditorial,
      staggerChildren: 0.05,
      delayChildren: 0.1
    }
  },
  exit: {
    opacity: 0,
    y: '-100%',
    transition: { 
      duration: 0.45, 
      ease: [0.32, 0, 0.67, 0] 
    }
  }
};

const mobileItemVariants: Variants = {
  hidden: { opacity: 0, y: -10 },
  visible: { 
    opacity: 1, 
    y: 0, 
    transition: { duration: 0.4, ease: easeEditorial } 
  }
};

export function Header() {
  const pathname = usePathname();
  const reducedMotion = useReducedMotion();
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [visible, setVisible] = useState(true);
  const lastScrollY = useRef(0);

  // WhatsApp configuration
  const whatsappNumber = "919810855697";
  const whatsappMessage = encodeURIComponent("Hello Futurex Team, I am interested in exhibiting at your upcoming trade shows. Please share the stall booking details.");
  const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${whatsappMessage}`;

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      setScrolled(currentScrollY > 20);

      if (currentScrollY > lastScrollY.current && currentScrollY > 90) {
        setVisible(false);
      } else {
        setVisible(true);
      }

      lastScrollY.current = currentScrollY;
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    if (menuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [menuOpen]);

  useEffect(() => {
    setMenuOpen(false);
  }, [pathname]);

  const companyLogo = (company as any)?.assets?.logo;
  const companyName = (company as any)?.name || (company as any)?.legalName || "Futurex Trade Fair and Events";

  return (
    <>
      <motion.header 
        initial={{ y: 0 }}
        animate={{ y: visible ? 0 : -100 }}
        transition={{ duration: 0.35, ease: easeEditorial }}
        className={`fixed top-0 left-0 right-0 w-full z-50 transition-colors duration-300 select-none ${
          scrolled 
            ? 'bg-[#050608]/90 backdrop-blur-xl border-b border-white/[0.08] py-3.5 shadow-[0_12px_36px_rgba(0,0,0,0.6)]' 
            : 'bg-gradient-to-b from-[#050608]/95 via-[#050608]/60 to-transparent py-5 sm:py-6'
        }`}
      >
        <div className="max-w-7xl mx-auto px-5 sm:px-8 lg:px-12 flex items-center justify-between gap-6">
          
          {/* Brand Identity / Big Distinct Logo */}
          <Link 
            href="/" 
            className="flex items-center gap-2.5 group focus:outline-none shrink-0" 
            aria-label="Futurex Home"
          >
            {companyLogo ? (
              <div className="relative h-11 sm:h-14 w-44 sm:w-56 transition-transform duration-200 group-hover:scale-[0.99]">
                <Image 
                  src={companyLogo} 
                  alt={companyName} 
                  fill 
                  priority 
                  sizes="260px"
                  className="object-contain object-left filter brightness-110"
                />
              </div>
            ) : (
              <div className="flex items-center gap-3">
                <span className="w-9 h-9 rounded-xl bg-red-600 flex items-center justify-center font-mono font-bold text-white text-sm shadow-[0_0_18px_rgba(220,38,38,0.5)]">
                  F
                </span>
                <span className="text-2xl font-semibold tracking-[-0.03em] text-white">
                  FUTUREX<span className="text-red-500 font-normal">.</span>
                </span>
              </div>
            )}
          </Link>

          {/* Desktop Navigation Capsule */}
          <nav 
            className="hidden lg:flex items-center gap-1 bg-white/[0.03] border border-white/[0.09] px-2.5 py-1.5 backdrop-blur-xl rounded-full shadow-2xs" 
            aria-label="Primary navigation"
          >
            {navItems.map((item) => {
              const currentPath = pathname || '';
              const isActive = currentPath === item.href || currentPath.startsWith(`${item.href}/`);
              
              return (
                <Link 
                  key={item.href} 
                  href={item.href} 
                  className={`group relative px-3.5 py-1 text-xs font-mono tracking-[0.14em] uppercase transition-colors duration-200 ${
                    isActive ? 'text-white font-medium' : 'text-neutral-400 hover:text-white'
                  }`}
                >
                  <span className="relative z-10">{item.label}</span>

                  {isActive && (
                    <motion.span 
                      layoutId="activeHeaderPill"
                      className="absolute inset-0 rounded-full bg-white/[0.08] border border-white/[0.12] -z-0"
                      transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                    />
                  )}
                </Link>
              );
            })}
          </nav>

          {/* Action CTA & Mobile Trigger */}
          <div className="flex items-center gap-3 shrink-0">
            <a 
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="hidden sm:inline-flex items-center gap-2 px-5 py-2.5 bg-red-600 hover:bg-red-500 text-white text-xs font-medium tracking-wider uppercase rounded-full transition-all duration-300 shadow-[0_0_18px_rgba(220,38,38,0.35)] hover:shadow-[0_0_24px_rgba(220,38,38,0.5)] active:scale-95 cursor-pointer"
            >
              <span>Exhibit With Us</span>
              <ArrowUpRight size={13} className="transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </a>

            {/* Pure Minimalist Hamburger Button */}
            <button 
              type="button"
              onClick={() => setMenuOpen(true)} 
              aria-expanded={menuOpen} 
              aria-controls="mobile-menu" 
              aria-label="Open navigation menu" 
              className="lg:hidden p-1.5 text-white hover:text-red-500 transition-colors cursor-pointer active:scale-90"
            >
              <Menu size={24} className="stroke-[2.2]" />
            </button>
          </div>

        </div>
      </motion.header>

      {/* Smooth Sliding Full-Screen Mobile Drawer */}
      <AnimatePresence mode="wait">
        {menuOpen && (
          <motion.div
            id="mobile-menu"
            initial="hidden"
            animate="visible"
            exit="exit"
            variants={reducedMotion ? undefined : mobileNavVariants}
            className="fixed inset-0 z-[120] bg-[#050608] text-white flex flex-col justify-between p-6 sm:p-10 overflow-y-auto"
          >
            {/* Top Bar */}
            <div className="relative z-10">
              <div className="flex justify-between items-center pb-6 border-b border-white/[0.08]">
                <div className="flex items-center gap-2.5">
                  <span className="w-2 h-2 rounded-full bg-red-500 animate-pulse" />
                  <span className="font-mono text-[11px] tracking-widest text-neutral-300 uppercase">
                    Futurex Directory
                  </span>
                </div>

                {/* Pure Minimal Close Icon */}
                <button 
                  type="button"
                  onClick={() => setMenuOpen(false)} 
                  aria-label="Close menu" 
                  className="p-1.5 text-white hover:text-red-500 transition-colors cursor-pointer active:scale-90"
                >
                  <X size={24} className="stroke-[2.2]" />
                </button>
              </div>

              {/* Navigation Links */}
              <nav aria-label="Mobile navigation" className="flex flex-col mt-8 divide-y divide-white/[0.04]">
                {navItems.map((item, index) => {
                  const currentPath = pathname || '';
                  const isActive = currentPath === item.href || currentPath.startsWith(`${item.href}/`);
                  const formattedIndex = String(index + 1).padStart(2, '0');

                  return (
                    <motion.div key={item.href} variants={reducedMotion ? undefined : mobileItemVariants}>
                      <Link 
                        href={item.href}
                        onClick={() => setMenuOpen(false)}
                        className={`flex items-center justify-between py-4 group transition-colors ${
                          isActive ? 'text-white' : 'text-neutral-400 hover:text-white'
                        }`}
                      >
                        <div className="flex items-center gap-4">
                          <span className="font-mono text-xs font-semibold text-neutral-500 group-hover:text-red-500 transition-colors">
                            {formattedIndex}
                          </span>
                          <span className={`text-xl font-medium tracking-tight group-hover:translate-x-1 transition-transform ${
                            isActive ? 'text-red-500' : 'text-white'
                          }`}>
                            {item.label}
                          </span>
                        </div>
                        <ChevronRight size={16} className="text-neutral-500 group-hover:text-red-500 group-hover:translate-x-1 transition-all" />
                      </Link>
                    </motion.div>
                  );
                })}
              </nav>
            </div>

            {/* Bottom Actions & Contacts */}
            <motion.div 
              variants={reducedMotion ? undefined : mobileItemVariants}
              className="relative z-10 pt-8 mt-6 border-t border-white/[0.08] flex flex-col gap-5"
            >
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <a 
                  href={whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => setMenuOpen(false)}
                  className="w-full py-3.5 bg-red-600 hover:bg-red-500 text-white text-xs font-medium tracking-wider uppercase text-center rounded-full transition-all shadow-[0_0_20px_rgba(220,38,38,0.4)] flex items-center justify-center gap-2"
                >
                  <MessageSquare size={14} />
                  <span>Exhibit With Us (WhatsApp)</span>
                </a>
                <Link 
                  href="/participants#visitor" 
                  onClick={() => setMenuOpen(false)}
                  className="w-full py-3.5 bg-white/[0.04] hover:bg-white/[0.08] border border-white/[0.1] text-neutral-300 text-xs font-mono tracking-wider uppercase text-center rounded-full transition-all flex items-center justify-center"
                >
                  Trade Pass Accreditation
                </Link>
              </div>

              <div className="flex flex-wrap items-center justify-between gap-4 text-xs font-mono text-neutral-400 pt-3">
                <div className="flex items-center gap-2">
                  <Phone size={13} className="text-red-500" />
                  <a href="tel:+911140538400" className="hover:text-white transition-colors">
                    +91-11-4053-8400
                  </a>
                </div>
                <div className="flex items-center gap-2">
                  <Mail size={13} className="text-red-500" />
                  <a href="mailto:admin@futurextrade.com" className="hover:text-white transition-colors">
                    admin@futurextrade.com
                  </a>
                </div>
              </div>
            </motion.div>

          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

export default Header;