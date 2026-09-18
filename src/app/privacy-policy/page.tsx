'use client';

import React from 'react';
import { motion, type Variants } from 'framer-motion';
import { ShieldCheck, Lock, Eye, Database, Mail } from 'lucide-react';
import { PageHero } from '@/components/hero/PageHero';
import { CTASection } from '@/components/sections/CTASection';
import Image from 'next/image';

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

export default function PrivacyPolicyPage() {
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
          eyebrow="LEGAL & COMPLIANCE" 
          title={
            <>
              Privacy Policy & <br />
              <span className="font-serif italic font-normal text-neutral-500">
                Data Protection Standards
              </span>
              <span className="text-red-600 font-sans">.</span>
            </>
          } 
          description="At Futurex Trade Fair and Events, we respect your privacy and are committed to protecting your personal and corporate data." 
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
                <div className="relative w-3.5 h-3.5 flex items-center justify-center">
                                      <Image
                                        src="/logos/svg/logo-arrow.png"
                                        alt="Icon"
                                        fill
                                        className="object-contain"
                                      />
                                    </div>
              <span>Effective Date: June 2026 </span>
            </motion.div>

            {/* Section 1 */}
            <motion.div variants={itemVariants} className="space-y-4">
              <h2 className="text-2xl sm:text-3xl font-semibold tracking-[-0.02em] text-[#0A0D12]">
                1. Information We Collect
              </h2>
              <p>
                When you register for our international trade exhibitions, conferences, download digital assets, or interact with our platform, we may collect personal and corporate identification information including your full name, business email address, direct phone number, company name, designation, and billing details.
              </p>
            </motion.div>

            {/* Section 2 */}
            <motion.div variants={itemVariants} className="space-y-4">
              <h2 className="text-2xl sm:text-3xl font-semibold tracking-[-0.02em] text-[#0A0D12]">
                2. How We Use Your Data
              </h2>
              <p>
                The information collected is strictly utilized to process trade pass accreditations, manage exhibitor stall bookings, coordinate logistics for global exhibitions (such as Buildcon, Wood, Electric, and EV Dynamics expos), and communicate important updates regarding event schedules.
              </p>
            </motion.div>

            {/* Section 3 */}
            <motion.div variants={itemVariants} className="space-y-4">
              <h2 className="text-2xl sm:text-3xl font-semibold tracking-[-0.02em] text-[#0A0D12]">
                3. Data Security & Protection
              </h2>
              <p>
                We implement robust technical and organizational security measures—including SSL encryption, secure server databases, and restricted administrative access—to safeguard your sensitive data against unauthorized access, alteration, disclosure, or destruction.
              </p>
            </motion.div>

            {/* Section 4 */}
            <motion.div variants={itemVariants} className="space-y-4">
              <h2 className="text-2xl sm:text-3xl font-semibold tracking-[-0.02em] text-[#0A0D12]">
                4. Third-Party Sharing
              </h2>
              <p>
                Futurex does not sell, trade, or rent your personal data to external third parties. Data is only shared with trusted logistics partners or authorized regulatory authorities strictly when required for event compliance and venue accreditation.
              </p>
            </motion.div>

            {/* Section 5 */}
            <motion.div variants={itemVariants} className="space-y-4">
              <h2 className="text-2xl sm:text-3xl font-semibold tracking-[-0.02em] text-[#0A0D12]">
                5. Contact Information
              </h2>
              <p>
                If you have any questions or concerns regarding our privacy practices or wish to update your records, please reach out to our legal and compliance desk at{' '}
                <a href="mailto:admin@futurextrade.com" className="text-red-600 font-mono font-medium underline underline-offset-4">
                  admin@futurextrade.com
                </a>.
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