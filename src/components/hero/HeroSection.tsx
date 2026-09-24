'use client';

import React, { useEffect, useRef } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion, type Variants } from 'framer-motion';
import { ArrowUpRight, Award, Globe2, MapPin, ArrowRight, Download } from 'lucide-react';

const easeLuxury: [number, number, number, number] = [0.19, 1, 0.22, 1];

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.12,
      delayChildren: 0.1,
    },
  },
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 1,
      ease: easeLuxury,
    },
  },
};

// Canvas Animated Node Network (Global Trade Web)
function NetworkCanvas() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };

    window.addEventListener('resize', handleResize);

    const pointsCount = Math.floor((width * height) / 22000);
    const points: Array<{
      x: number;
      y: number;
      vx: number;
      vy: number;
      radius: number;
    }> = [];

    for (let i = 0; i < pointsCount; i++) {
      points.push({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * 0.45,
        vy: (Math.random() - 0.5) * 0.45,
        radius: Math.random() * 1.5 + 1,
      });
    }

    const render = () => {
      ctx.clearRect(0, 0, width, height);

      // Connecting Lines
      for (let i = 0; i < points.length; i++) {
        for (let j = i + 1; j < points.length; j++) {
          const dx = points[i].x - points[j].x;
          const dy = points[i].y - points[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < 130) {
            ctx.beginPath();
            ctx.strokeStyle = `rgba(220, 38, 38, ${0.18 * (1 - dist / 130)})`;
            ctx.lineWidth = 0.8;
            ctx.moveTo(points[i].x, points[i].y);
            ctx.lineTo(points[j].x, points[j].y);
            ctx.stroke();
          }
        }
      }

      // Nodes
      for (const p of points) {
        p.x += p.vx;
        p.y += p.vy;

        if (p.x < 0 || p.x > width) p.vx *= -1;
        if (p.y < 0 || p.y > height) p.vy *= -1;

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.fillStyle = 'rgba(255, 255, 255, 0.45)';
        ctx.fill();
      }

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 pointer-events-none z-[1] opacity-70"
    />
  );
}

export function HeroSection() {
  return (
    <section className="relative min-h-[100vh] w-full bg-[#07080A] text-[#F3F4F6] overflow-hidden flex flex-col justify-between border-b border-white/[0.08]">
      
      {/* ATMOSPHERIC RIGHT-SIDE FOGGY EXHIBITION BACKGROUND IMAGE */}
      <div className="absolute inset-0 pointer-events-none z-0 overflow-hidden">
        <div className="absolute right-0 top-0 bottom-0 w-full lg:w-[65%] h-full opacity-35 mix-blend-luminosity filter contrast-125 select-none">
          <Image
            src="/gallery/images-event/slider/hero.png"
            alt="Global Exhibition Venue Atmosphere"
            fill
            sizes="100vw"
            className="object-cover object-right"
            priority
          />
        </div>
        
        {/* Advanced Foggy Multi-Stop Gradient Mask */}
        <div className="absolute inset-0 bg-gradient-to-r from-[#07080A] via-[#07080A]/90 to-[#07080A]/40" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#07080A] via-transparent to-[#07080A]/60" />
      </div>

      {/* Dynamic Animated Node Network */}
      <NetworkCanvas />

      {/* Floating Ambient Atmosphere */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden select-none z-0">
        <motion.div
          animate={{
            scale: [1, 1.15, 1],
            opacity: [0.18, 0.28, 0.18],
          }}
          transition={{
            duration: 12,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
          className="absolute -top-32 -left-20 w-[600px] h-[600px] bg-red-600/25 rounded-full blur-[160px]"
        />

        <motion.div
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.12, 0.22, 0.12],
          }}
          transition={{
            duration: 16,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
          className="absolute top-1/2 right-0 w-[560px] h-[560px] bg-blue-600/15 rounded-full blur-[180px]"
        />
      </div>

      {/* Hero Body Content */}
      <div className="relative max-w-7xl mx-auto w-full px-6 sm:px-8 lg:px-12 pt-36 pb-20 flex-1 flex flex-col justify-end z-10">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="max-w-4xl"
        >
          {/* Identity Tagline */}
          <motion.div variants={itemVariants} className="mb-7 flex flex-wrap items-center gap-3">
            <div className="inline-flex items-center gap-2.5 px-3.5 py-1.5 rounded-full bg-white/[0.04] border border-white/[0.1] backdrop-blur-md text-[11px] font-mono tracking-widest text-neutral-300 uppercase shadow-xs">
              <div className="relative w-3.5 h-3.5 flex items-center justify-center">
                <Image
                  src="/logos/svg/logo-arrow-white.png"
                  alt="Icon"
                  fill
                  className="object-contain"
                />
              </div>
              <span>Est. 2011</span>
            </div>

            <div className="flex items-center gap-2 text-xs font-mono tracking-wide text-neutral-400">
              <Globe2 className="w-3.5 h-3.5 text-neutral-400" />
              <span>New Delhi • Mumbai • Colombo • Dhaka • Kathmandu</span>
            </div>
          </motion.div>

          {/* Point 6: Homepage H1 exactly as specified */}
          <motion.h1
            variants={itemVariants}
            className="text-4xl sm:text-5xl lg:text-[68px] font-semibold tracking-[-0.03em] text-white leading-[1.08]"
          >
            Futurex Trade Fair &
            <br />
            <span className="text-neutral-300 font-normal">Events Private Limited</span>
          </motion.h1>

          {/* Point 6: Opening copy immediately below H1 */}
          <motion.p
            variants={itemVariants}
            className="mt-7 text-base sm:text-lg text-neutral-300/90 font-normal leading-[1.7] max-w-2xl tracking-normal"
          >
            We organise sector-focused B2B trade exhibitions across India, South Asia and East Africa, bringing manufacturers face to face with distributors, buyers and industry networks in each market.
          </motion.p>

          {/* CTAs */}
          <motion.div
            variants={itemVariants}
            className="mt-10 flex flex-wrap items-center gap-4"
          >
            <Link
              href="/exhibitions"
              className="inline-flex items-center gap-2.5 px-7 py-3.5 bg-red-600 hover:bg-red-500 text-white !text-white font-medium text-xs tracking-wider rounded-full transition-all duration-300 shadow-[0_0_24px_rgba(220,38,38,0.28)] hover:shadow-[0_0_32px_rgba(220,38,38,0.45)] active:scale-[0.98]"
            >
              <span className="!text-white">EXPLORE EXHIBITIONS</span>
              <ArrowRight className="w-4 h-4 !text-white" />
            </Link>

            <Link
              href="/contact"
              className="group inline-flex items-center gap-2.5 px-7 py-3.5 bg-white/[0.04] hover:bg-white/[0.08] border border-white/[0.12] hover:border-white/30 text-white !text-white font-medium text-xs tracking-wider rounded-full backdrop-blur-xl transition-all duration-300 active:scale-[0.98]"
            >
              <span className="!text-white">EXHIBIT WITH FUTUREX</span>
              <ArrowUpRight className="w-4 h-4 !text-white transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </Link>

            <Link
              href="/documents/futurex-group-company-profile.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="group inline-flex items-center gap-1.5 ml-1 text-xs text-neutral-400 hover:text-white !text-neutral-400 hover:!text-white font-medium tracking-wide transition-colors duration-200"
            >
              <span>Download Company Profile</span>
              <Download className="w-3.5 h-3.5 transition-transform duration-200 group-hover:translate-y-0.5" />
            </Link>
          </motion.div>
        </motion.div>
      </div>

      {/* CIEO Membership Footer Strip */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.4, duration: 1 }}
        className="relative border-t border-white/[0.08] bg-[#0A0B0E]/85 backdrop-blur-xl py-4 z-10"
      >
        <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="inline-flex items-center gap-3 rounded-xl px-2.5 py-1.5 text-neutral-300">
            <div className="p-1.5 rounded-full bg-white/[0.05] border border-white/10">
              <Award className="w-4 h-4 text-red-500" />
            </div>
            <div className="text-xs font-mono">
              <span>Member of CIEO (Council of Indian Exhibition Organisers)</span>
            </div>
          </div>

          <div className="text-xs text-neutral-400 font-mono flex items-center gap-2">
            <MapPin className="w-4 h-4 text-red-500 shrink-0" />
            <span>E-52, 1st Floor, Kalkaji, New Delhi, India - 110019</span>
          </div>
        </div>
      </motion.div>
    </section>
  );
}

export default HeroSection;