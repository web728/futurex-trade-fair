'use client';

import React, { useEffect, useRef, type ReactNode } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion, type Variants } from 'framer-motion';
import { ChevronRight } from 'lucide-react';

interface PageHeroProps {
  eyebrow: string;
  title: ReactNode;
  description?: string;
  tagline?: string;
  image?: string; // Optional image prop for inner pages
  imageAlt?: string;
}

const easeEditorial: [number, number, number, number] = [0.16, 1, 0.3, 1];

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.08,
      delayChildren: 0.1,
    },
  },
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 16 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.8,
      ease: easeEditorial,
    },
  },
};

// Lightweight version of Home Hero Architectural Canvas
function InnerPageCanvas() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animId: number;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const onResize = () => {
      if (!canvas) return;
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };
    window.addEventListener('resize', onResize);

    const isMobile = width < 768;
    const nodeCount = isMobile ? 14 : 26;
    const nodes: Array<{
      x: number;
      y: number;
      vx: number;
      vy: number;
      size: number;
      alpha: number;
    }> = [];

    for (let i = 0; i < nodeCount; i++) {
      nodes.push({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * 0.2,
        vy: (Math.random() - 0.5) * 0.2,
        size: Math.random() * 1.4 + 0.6,
        alpha: Math.random() * 0.35 + 0.15,
      });
    }

    const render = () => {
      ctx.clearRect(0, 0, width, height);

      // Subtle Architectural Concentric Hub Ring
      const centerX = width > 1024 ? width * 0.8 : width * 0.5;
      const centerY = height * 0.5;

      ctx.beginPath();
      ctx.arc(centerX, centerY, isMobile ? 120 : 260, 0, Math.PI * 2);
      ctx.strokeStyle = 'rgba(255, 255, 255, 0.03)';
      ctx.lineWidth = 1;
      ctx.setLineDash([4, 12]);
      ctx.stroke();

      ctx.beginPath();
      ctx.arc(centerX, centerY, isMobile ? 190 : 380, 0, Math.PI * 2);
      ctx.strokeStyle = 'rgba(239, 68, 68, 0.035)';
      ctx.lineWidth = 1;
      ctx.setLineDash([6, 14]);
      ctx.stroke();
      ctx.setLineDash([]);

      // Connecting Node Web
      for (let i = 0; i < nodes.length; i++) {
        const n = nodes[i];
        n.x += n.vx;
        n.y += n.vy;

        if (n.x < 0 || n.x > width) n.vx *= -1;
        if (n.y < 0 || n.y > height) n.vy *= -1;

        ctx.beginPath();
        ctx.arc(n.x, n.y, n.size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255, 255, 255, ${n.alpha})`;
        ctx.fill();

        for (let j = i + 1; j < nodes.length; j++) {
          const m = nodes[j];
          const dist = Math.hypot(n.x - m.x, n.y - m.y);
          const threshold = isMobile ? 85 : 130;

          if (dist < threshold) {
            ctx.beginPath();
            ctx.moveTo(n.x, n.y);
            ctx.lineTo(m.x, m.y);
            ctx.strokeStyle = `rgba(239, 68, 68, ${0.14 * (1 - dist / threshold)})`;
            ctx.lineWidth = 0.6;
            ctx.stroke();
          }
        }
      }

      animId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener('resize', onResize);
      cancelAnimationFrame(animId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 pointer-events-none z-[1] opacity-70"
    />
  );
}

export function PageHero({ eyebrow, title, description, tagline, image, imageAlt = "Futurex Page Hero Asset" }: PageHeroProps) {
  return (
    <section 
      className="relative w-full min-h-[46vh] sm:min-h-[50vh] bg-[#07080A] text-[#F3F4F6] overflow-hidden flex flex-col justify-center border-b border-white/[0.08]"
      aria-label="Page Header"
    >
      {/* 1. Kinetic Background Canvas */}
      <InnerPageCanvas />

      {/* Atmospheric Soft Lighting */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden select-none z-0">
        <motion.div
          animate={{
            scale: [1, 1.1, 1],
            opacity: [0.14, 0.22, 0.14],
          }}
          transition={{
            duration: 14,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
          className="absolute -top-24 -left-16 w-[360px] sm:w-[540px] h-[360px] sm:h-[540px] bg-red-600/20 rounded-full blur-[110px] sm:blur-[160px]"
        />

        <motion.div
          animate={{
            scale: [1, 1.15, 1],
            opacity: [0.08, 0.15, 0.08],
          }}
          transition={{
            duration: 18,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
          className="absolute top-1/2 -right-28 w-[320px] sm:w-[500px] h-[320px] sm:h-[500px] bg-blue-600/15 rounded-full blur-[120px] sm:blur-[170px]"
        />

        {/* Minimal Matte Grid Matrix */}
        <div
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage: `radial-gradient(rgba(255, 255, 255, 0.4) 1px, transparent 1px)`,
            backgroundSize: '48px 48px',
          }}
        />

        {/* Falloff Vignette */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#07080A] via-[#07080A]/40 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-r from-[#07080A] via-[#07080A]/70 to-transparent" />
      </div>

      {/* 2. Main Page Hero Content */}
      <div className="relative max-w-7xl mx-auto w-full px-5 sm:px-8 lg:px-12 pt-28 sm:pt-36 pb-14 sm:pb-20 z-10">
        <div className={`grid grid-cols-1 ${image ? 'lg:grid-cols-12' : ''} gap-8 lg:gap-12 items-center`}>
          
          {/* Left Text Column */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className={`${image ? 'lg:col-span-7' : 'max-w-4xl'}`}
          >
            {/* Eyebrow & Navigational Breadcrumb */}
            <motion.div variants={itemVariants} className="mb-5 sm:mb-6 flex flex-wrap items-center gap-2.5 sm:gap-3">
              <div className="inline-flex items-center gap-2 px-3 py-1 sm:px-3.5 sm:py-1.5 rounded-full bg-white/[0.04] border border-white/[0.08] backdrop-blur-md text-[10px] sm:text-[11px] font-mono tracking-widest text-neutral-300 uppercase">
                <span className="w-1.5 h-1.5 rounded-full bg-red-500 animate-pulse" />
                <span>{eyebrow}</span>
              </div>

              <nav aria-label="Breadcrumb" className="inline-flex items-center gap-1.5 text-[11px] sm:text-xs font-mono text-neutral-400">
                <Link href="/" className="hover:text-white transition-colors duration-200">Home</Link>
                <ChevronRight className="w-3 h-3 text-neutral-600 shrink-0" />
                <span className="text-neutral-300 capitalize">{eyebrow}</span>
              </nav>
            </motion.div>

            {/* Fluid Editorial Title */}
            <motion.h1
              variants={itemVariants}
              className="text-[32px] xs:text-4xl sm:text-5xl lg:text-[60px] font-semibold tracking-[-0.03em] text-white leading-[1.12] sm:leading-[1.06]"
            >
              {title}
            </motion.h1>

            {/* Optional Tagline Accent */}
            {tagline ? (
              <motion.div variants={itemVariants} className="flex items-center gap-2.5 mt-3 sm:mt-4">
                <span className="h-px w-5 bg-red-500 shrink-0" />
                <p className="text-xs sm:text-sm font-mono text-neutral-400 tracking-wide">
                  {tagline}
                </p>
              </motion.div>
            ) : null}

            {/* Editorial Description */}
            {description ? (
              <motion.p
                variants={itemVariants}
                className="mt-4 sm:mt-6 text-sm sm:text-base lg:text-lg text-neutral-300/80 font-normal leading-[1.65] sm:leading-[1.7] max-w-2xl tracking-normal"
              >
                {description}
              </motion.p>
            ) : null}
          </motion.div>

          {/* Right Optional Image Column */}
          {image ? (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.9, ease: easeEditorial, delay: 0.2 }}
              className="lg:col-span-5 relative w-full h-[280px] sm:h-[340px] lg:h-[380px] rounded-3xl overflow-hidden border border-white/10 shadow-2xl group"
            >
              <div className="absolute top-0 left-0 right-0 h-[2.5px] bg-red-600 z-20" />
              <Image
                src={image}
                alt={imageAlt}
                fill
                sizes="(max-width: 1024px) 100vw, 40vw"
                className="object-cover object-center group-hover:scale-105 transition-transform duration-700 ease-[0.16,1,0.3,1]"
                priority
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent pointer-events-none" />
            </motion.div>
          ) : null}

        </div>
      </div>
    </section>
  );
}

export default PageHero;