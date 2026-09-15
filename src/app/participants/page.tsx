'use client';

import React, { useState, useEffect, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import { PageHero } from '@/components/hero/PageHero';
import { ExhibitorForm } from '@/components/forms/ExhibitorForm';
import { VisitorForm } from '@/components/forms/VisitorForm';
import { SponsorForm } from '@/components/forms/SponsorForm';
import { Sparkles, ShieldCheck, Users, Megaphone } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const tabs = [
  { id: 'exhibitor', label: 'Exhibitor Space', icon: ShieldCheck, subtitle: 'Book booth space & trade floor presence' },
  { id: 'visitor', label: 'Trade Visitor', icon: Users, subtitle: 'Register for entry passes & badges' },
  { id: 'sponsor', label: 'Sponsor & Partner', icon: Megaphone, subtitle: 'Brand visibility & institutional collaboration' },
];

function ParticipantsContent() {
  const searchParams = useSearchParams();
  const defaultEvent = searchParams.get('event') || '';
  const defaultTab = searchParams.get('tab') || 'exhibitor';

  const [activeTab, setActiveTab] = useState<string>(defaultTab);

  // Keep tab in sync if query params change
  useEffect(() => {
    const tabParam = searchParams.get('tab');
    if (tabParam && tabs.some(t => t.id === tabParam)) {
      setActiveTab(tabParam);
    }
  }, [searchParams]);

  return (
    <main className="relative bg-[#FBFBFD] text-[#0A0D12] overflow-hidden select-none min-h-screen">
      
      {/* 1. Gorgeous Page Hero */}
      <PageHero 
        eyebrow="PARTICIPATE & COLLABORATE" 
        title={
          <>
            Choose how you want <br />
            <span className="font-serif italic font-normal text-neutral-400">to do business.</span>
          </>
        } 
        description="Futurex creates high-impact participation pathways for exhibitors, trade visitors, sponsors, and global industry partners."
        
      />

      {/* 2. Interactive Toggle Switcher Section */}
      <section className="relative z-20 w-full py-16 sm:py-24 bg-[#FBFBFD]">
        <div className="max-w-5xl mx-auto px-5 sm:px-8">
          
          <div className="text-center max-w-2xl mx-auto mb-12">
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-white border border-neutral-200/80 text-[10.5px] font-mono tracking-[0.18em] uppercase text-neutral-600 mb-4 shadow-2xs">
              <Sparkles size={12} className="text-red-600 animate-pulse" />
              <span>ENGAGEMENT CORRIDORS</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-semibold tracking-[-0.03em] text-[#0A0D12]">
              Select Registration Portal<span className="text-red-600">.</span>
            </h2>
            <p className="mt-3 text-sm text-neutral-500 font-normal">
              Switch between participation pathways instantly without scrolling.
            </p>
          </div>

          {/* Luxury Tab Switcher Bar */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 p-1.5 bg-neutral-200/70 backdrop-blur-md rounded-2xl mb-12 shadow-inner">
            {tabs.map((tab) => {
              const Icon = tab.icon;
              const isActive = activeTab === tab.id;

              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  type="button"
                  className={`relative flex items-center gap-3 p-4 rounded-xl font-mono text-xs uppercase tracking-wider transition-all duration-300 cursor-pointer ${
                    isActive 
                      ? 'text-white font-bold shadow-md' 
                      : 'text-neutral-600 hover:text-neutral-950 hover:bg-white/50'
                  }`}
                >
                  {isActive && (
                    <motion.div
                      layoutId="activeParticipantTabBubble"
                      className="absolute inset-0 bg-[#0A0D12] rounded-xl -z-10 shadow-lg"
                      transition={{ type: 'spring', stiffness: 400, damping: 30 }}
                    />
                  )}
                  <div className={`w-8 h-8 rounded-lg flex items-center justify-center shrink-0 transition-colors ${
                    isActive ? 'bg-red-600 text-white' : 'bg-white text-neutral-700 shadow-2xs'
                  }`}>
                    <Icon size={16} />
                  </div>
                  <div className="text-left overflow-hidden">
                    <span className="block truncate">{tab.label}</span>
                    <span className={`block text-[9.5px] font-normal lowercase tracking-normal truncate ${isActive ? 'text-neutral-400' : 'text-neutral-500'}`}>
                      {tab.subtitle}
                    </span>
                  </div>
                </button>
              );
            })}
          </div>

          {/* 3. Dynamic Form Container with Smooth AnimatePresence */}
          <div className="bg-white border border-neutral-200/90 rounded-3xl p-6 sm:p-10 lg:p-12 shadow-xl relative overflow-hidden">
            {/* Top Red Laser Accent */}
            <span className="absolute top-0 left-0 right-0 h-[3px] bg-red-600" />

            <AnimatePresence mode="wait">
              {activeTab === 'exhibitor' && (
                <motion.div
                  key="exhibitor"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
                >
                  <div className="mb-8 pb-6 border-b border-neutral-100">
                    <span className="font-mono text-xs uppercase tracking-widest text-red-600 font-semibold">// PORTAL 01</span>
                    <h3 className="text-2xl sm:text-3xl font-semibold tracking-tight text-[#0A0D12] mt-1">Exhibitor Space Application</h3>
                    <p className="text-xs sm:text-sm text-neutral-500 mt-1">Secure premium booth positioning and connect directly with targeted industry buyers.</p>
                  </div>
                  <ExhibitorForm defaultEvent={defaultEvent} />
                </motion.div>
              )}

              {activeTab === 'visitor' && (
                <motion.div
                  key="visitor"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
                >
                  <div className="mb-8 pb-6 border-b border-neutral-100">
                    <span className="font-mono text-xs uppercase tracking-widest text-red-600 font-semibold">// PORTAL 02</span>
                    <h3 className="text-2xl sm:text-3xl font-semibold tracking-tight text-[#0A0D12] mt-1">Trade Visitor Access</h3>
                    <p className="text-xs sm:text-sm text-neutral-500 mt-1">Register to discover verified global suppliers, cutting-edge technologies, and innovations.</p>
                  </div>
                  <VisitorForm defaultEvent={defaultEvent} />
                </motion.div>
              )}

              {activeTab === 'sponsor' && (
                <motion.div
                  key="sponsor"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
                >
                  <div className="mb-8 pb-6 border-b border-neutral-100">
                    <span className="font-mono text-xs uppercase tracking-widest text-red-600 font-semibold">// PORTAL 03</span>
                    <h3 className="text-2xl sm:text-3xl font-semibold tracking-tight text-[#0A0D12] mt-1">Sponsorship & Partnership Inquiry</h3>
                    <p className="text-xs sm:text-sm text-neutral-500 mt-1">Build high-visibility enterprise engagement around high-footfall industrial expos.</p>
                  </div>
                  <SponsorForm defaultEvent={defaultEvent} />
                </motion.div>
              )}
            </AnimatePresence>

          </div>

        </div>
      </section>

    </main>
  );
}

export default function ParticipantsPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-[#07080A]" />}>
      <ParticipantsContent />
    </Suspense>
  );
}