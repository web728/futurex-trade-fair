'use client';

import React from 'react';
import { motion, type Variants } from 'framer-motion';
import { FileText, ShieldAlert, Scale, CheckCircle2 } from 'lucide-react';
import { PageHero } from '@/components/hero/PageHero';
import { CTASection } from '@/components/sections/CTASection';

const easeEditorial: [number, number, number, number] = [0.16, 1, 0.3, 1];

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.08, delayChildren: 0.1 }
  }
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 16 },
  visible: { 
    opacity: 1, 
    y: 0, 
    transition: { duration: 0.6, ease: easeEditorial } 
  }
};

export default function TermsAndConditionsPage() {
  return (
    <main className="relative min-h-screen bg-[#FBFBFD] text-[#0A0D12] selection:bg-red-600 selection:text-white overflow-hidden select-none">
      
      {/* Background Architectural Grid Pattern */}
      <div 
        className="absolute inset-0 pointer-events-none opacity-[0.35]"
        style={{
          backgroundImage: `
            linear-gradient(to right, rgba(0, 0, 0, 0.04) 1px, transparent 1px),
            linear-gradient(to bottom, rgba(0, 0, 0, 0.04) 1px, transparent 1px)
          `,
          backgroundSize: '48px 48px'
        }}
        aria-hidden="true"
      />

      {/* 1. Hero Section */}
      <div className="relative z-10 border-b border-neutral-200/80 bg-white">
        <PageHero 
          eyebrow="LEGAL AGREEMENT" 
          title={
            <>
              Terms & <br />
              <span className="font-serif italic font-normal text-neutral-500">
                Conditions of Service
              </span>
              <span className="text-red-600 font-sans">.</span>
            </>
          } 
          description="Please review these terms and conditions carefully before participating in Futurex trade exhibitions, conferences, or digital platforms." 
        />
      </div>

      {/* 2. Content Section */}
      <section className="relative z-20 w-full py-20 sm:py-28 lg:py-32 border-b border-neutral-200/80">
        <div className="max-w-4xl mx-auto px-5 sm:px-8 lg:px-12">
          
          <motion.div 
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="space-y-12 text-neutral-600 font-normal leading-[1.85]"
          >
            {/* Last Updated Badge */}
            <motion.div variants={itemVariants} className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white border border-neutral-200/80 text-xs font-mono tracking-widest uppercase text-neutral-500 shadow-2xs">
              <Scale size={14} className="text-red-600" />
              <span>Governing Agreement // Futurex Group</span>
            </motion.div>

            {/* Section 1 */}
            <motion.div variants={itemVariants} className="space-y-4">
              <h2 className="text-2xl sm:text-3xl font-semibold tracking-[-0.02em] text-[#0A0D12]">
                1. Acceptance of Terms
              </h2>
              <p>
                By accessing our website, registering as a trade visitor, or booking exhibition space with Futurex Trade Fair and Events, you agree to be bound by these Terms and Conditions. If you do not agree with any part of these terms, you must refrain from using our services.
              </p>
            </motion.div>

            {/* Section 2 */}
            <motion.div variants={itemVariants} className="space-y-4">
              <h2 className="text-2xl sm:text-3xl font-semibold tracking-[-0.02em] text-[#0A0D12]">
                2. Exhibition Registration & Bookings
              </h2>
              <p>
                All exhibitor booth bookings and trade pass registrations are subject to written confirmation by Futurex management. Payments must be completed within the stipulated deadlines mentioned in the proforma invoice. Failure to clear dues may result in cancellation of allotted stall space.
              </p>
            </motion.div>

            {/* Section 3 */}
            <motion.div variants={itemVariants} className="space-y-4">
              <h2 className="text-2xl sm:text-3xl font-semibold tracking-[-0.02em] text-[#0A0D12]">
                3. Cancellation & Refund Policy
              </h2>
              <p>
                Booth space cancellations must be submitted in writing. Refund requests are governed strictly by the timelines outlined in individual exhibitor contracts. In the event of unforeseen force majeure circumstances (natural disasters, pandemics, government restrictions), event schedules may be rescheduled.
              </p>
            </motion.div>

            {/* Section 4 */}
            <motion.div variants={itemVariants} className="space-y-4">
              <h2 className="text-2xl sm:text-3xl font-semibold tracking-[-0.02em] text-[#0A0D12]">
                4. Intellectual Property Rights
              </h2>
              <p>
                All content published across Futurex platforms—including media archives, exhibition catalogs, brand logos, graphic design assets, and text—is the exclusive property of Futurex Trade Fair and Events and is protected under applicable copyright laws.
              </p>
            </motion.div>

            {/* Section 5 */}
            <motion.div variants={itemVariants} className="space-y-4">
              <h2 className="text-2xl sm:text-3xl font-semibold tracking-[-0.02em] text-[#0A0D12]">
                5. Governing Law & Jurisdiction
              </h2>
              <p>
                Any disputes arising out of or in connection with Futurex exhibitions, conferences, or platform usage shall be governed by the laws of India, with exclusive jurisdiction resting with the courts of New Delhi, India.
              </p>
            </motion.div>

          </motion.div>

        </div>
      </section>

      {/* 3. CTA Section */}
      <CTASection />

    </main>
  );
}