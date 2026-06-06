"use client";

import React from "react";
import { motion } from "framer-motion";
import { Sparkles, Compass, Rocket } from "lucide-react";

export default function Hero() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" as const } },
  };

  // Zodiac sign details for decorative circles
  const zodiacSymbols = ["♈", "♉", "♊", "♋", "♌", "♍", "♎", "♏", "♐", "♑", "♒", "♓"];

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-24 pb-16">
      {/* Background gradients for dark/light themes */}
      <div className="absolute inset-0 bg-radial from-transparent via-transparent to-transparent -z-20" />
      <div className="absolute inset-0 bg-gradient-to-tr from-violet-500/5 via-transparent to-sky-500/5 dark:from-purple-950/10 dark:via-transparent dark:to-sky-950/15 -z-20" />
      
      {/* Custom Theme-aware Sparkly Backdrop */}
      <div className="absolute inset-0 space-stars -z-10" />
      
      {/* Aurora Ambient Glows */}
      <div className="absolute top-1/4 left-1/4 -translate-x-1/2 -translate-y-1/2 w-[30rem] h-[30rem] rounded-full bg-nebula-purple/10 dark:bg-nebula-purple/15 blur-[120px] -z-10 animate-pulse-slow" />
      <div className="absolute bottom-1/4 right-1/4 translate-x-1/2 translate-y-1/2 w-[35rem] h-[35rem] rounded-full bg-celestial-blue/15 dark:bg-celestial-blue/10 blur-[140px] -z-10 animate-pulse-slow" style={{ animationDelay: "2s" }} />

      <div className="max-w-7xl mx-auto px-6 w-full grid grid-cols-1 lg:grid-cols-12 gap-12 items-center relative z-10">
        
        {/* Left Side Text Content */}
        <motion.div 
          className="lg:col-span-7 flex flex-col justify-center text-center lg:text-left"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {/* Tagline */}
          <motion.div 
            variants={itemVariants}
            className="inline-flex items-center justify-center lg:justify-start space-x-2 px-3 py-1 rounded-full border border-[var(--card-border)] bg-[var(--card-bg)] backdrop-blur-sm w-fit mx-auto lg:mx-0 mb-6 shadow-sm cursor-default"
          >
            <Sparkles className="w-4 h-4 text-nebula-purple dark:text-celestial-blue animate-twinkle" />
            <span className="text-xs font-semibold tracking-wider text-muted uppercase">
              Your Universe, Decoded.
            </span>
          </motion.div>

          {/* Heading */}
          <motion.h1 
            variants={itemVariants}
            className="font-display text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-tight mb-6 leading-[1.1]"
          >
            Navigate Life Through <br />
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-nebula-purple via-aurora-pink to-celestial-blue animate-gradient bg-[length:200%_auto]">
              The Stars & AI
            </span>
          </motion.h1>

          {/* Description */}
          <motion.p 
            variants={itemVariants}
            className="text-base sm:text-lg opacity-80 max-w-xl mx-auto lg:mx-0 mb-8 leading-relaxed text-muted"
          >
            AstroNova merges ancient cosmic wisdom with state-of-the-art AI. Calculate your precise birth chart, consult Nova AI, and forecast planetary transits to align your career, relationships, and daily flow.
          </motion.p>

          {/* Buttons */}
          <motion.div 
            variants={itemVariants}
            className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4"
          >
            <a
              href="#chart-generator"
              className="group flex items-center space-x-2 w-full sm:w-auto justify-center px-8 py-4 rounded-full text-sm font-semibold uppercase tracking-wider text-white bg-gradient-to-r from-nebula-purple to-celestial-blue hover:from-celestial-blue hover:to-nebula-purple transition-all duration-500 scale-100 hover:scale-105 shadow-lg shadow-nebula-purple/20 hover:shadow-celestial-blue/30"
            >
              <Compass className="w-4 h-4 group-hover:rotate-45 transition-transform duration-300" />
              <span>Map Birth Chart</span>
            </a>
            
            <a
              href="#zodiac"
              className="flex items-center space-x-2 w-full sm:w-auto justify-center px-8 py-4 rounded-full text-sm font-semibold uppercase tracking-wider border border-[var(--card-border)] bg-[var(--card-bg)] hover:bg-nebula-purple/5 transition-all duration-300 scale-100 hover:scale-105"
            >
              <Rocket className="w-4 h-4" />
              <span>Explore Zodiac</span>
            </a>
          </motion.div>
        </motion.div>

        {/* Right Side Visual Component (3D Spinning Zodiac Sphere) */}
        <motion.div 
          className="lg:col-span-5 flex items-center justify-center relative"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, ease: "easeOut" }}
        >
          {/* Animated Background Rings */}
          <div className="absolute w-[320px] h-[320px] sm:w-[420px] sm:h-[420px] rounded-full border border-[var(--card-border)] opacity-30 animate-pulse-slow" />
          <div className="absolute w-[280px] h-[280px] sm:w-[370px] sm:h-[370px] rounded-full border border-[var(--card-border)] border-dashed opacity-40 animate-spin-reverse-slow" />

          {/* Main Spinning Zodiac Wheel */}
          <div className="relative w-[240px] h-[240px] sm:w-[320px] sm:h-[320px] rounded-full glassmorphism flex items-center justify-center animate-spin-slow hover:pause shadow-inner">
            
            {/* Spinning Star Lines */}
            <svg className="absolute inset-0 w-full h-full text-[var(--card-border)]" viewBox="0 0 100 100">
              <circle cx="50" cy="50" r="49" fill="none" stroke="currentColor" strokeWidth="0.5" />
              <circle cx="50" cy="50" r="32" fill="none" stroke="currentColor" strokeWidth="0.25" strokeDasharray="2" />
              {/* Lines separating the 12 signs */}
              {[...Array(6)].map((_, i) => {
                const angle = i * 30;
                return (
                  <line
                    key={i}
                    x1={50 + 49 * Math.cos((angle * Math.PI) / 180)}
                    y1={50 + 49 * Math.sin((angle * Math.PI) / 180)}
                    x2={50 - 49 * Math.cos((angle * Math.PI) / 180)}
                    y2={50 - 49 * Math.sin((angle * Math.PI) / 180)}
                    stroke="currentColor"
                    strokeWidth="0.25"
                  />
                );
              })}
            </svg>

            {/* Zodiac Glyphs on border */}
            {zodiacSymbols.map((sym, i) => {
              const angle = (i * 30 - 90) * (Math.PI / 180);
              const radius = 41; // Radius in percentage
              const x = 50 + radius * Math.cos(angle);
              const y = 50 + radius * Math.sin(angle);
              return (
                <div
                  key={i}
                  className="absolute select-none font-bold text-sm sm:text-base text-nebula-purple dark:text-celestial-blue"
                  style={{
                    left: `${x}%`,
                    top: `${y}%`,
                    transform: "translate(-50%, -50%) rotate(0deg)",
                  }}
                >
                  {sym}
                </div>
              );
            })}

            {/* Glowing Inner Observatory Core (Sun/Globe) */}
            <div className="relative w-[100px] h-[100px] sm:w-[130px] sm:h-[130px] rounded-full bg-gradient-to-br from-nebula-purple to-celestial-blue p-0.5 shadow-2xl animate-float">
              <div className="w-full h-full rounded-full bg-space-navy/90 flex flex-col items-center justify-center text-center p-3">
                <Compass className="w-6 h-6 text-celestial-blue mb-1 animate-spin-reverse-slow" />
                <span className="text-[9px] font-bold uppercase tracking-widest text-slate-300">
                  NOVA
                </span>
                <span className="text-[8px] opacity-75 uppercase text-slate-400">
                  ALIGNMENT
                </span>
              </div>
              <div className="absolute inset-0 rounded-full bg-gradient-to-tr from-transparent via-white/10 to-white/30 pointer-events-none" />
            </div>

          </div>

          {/* Orbiting Tiny Celestial Nodes */}
          <div className="absolute w-[360px] h-[360px] sm:w-[480px] sm:h-[480px] rounded-full pointer-events-none animate-spin-slow" style={{ animationDuration: "12s" }}>
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-4 h-4 rounded-full bg-aurora-pink shadow-md shadow-pink-500/50 animate-pulse" />
          </div>
          <div className="absolute w-[400px] h-[400px] sm:w-[540px] sm:h-[540px] rounded-full pointer-events-none animate-spin-reverse-slow" style={{ animationDuration: "25s" }}>
            <div className="absolute top-1/2 right-0 translate-y-1/2 w-2.5 h-2.5 rounded-full bg-celestial-blue shadow-md shadow-sky-500/50" />
          </div>
        </motion.div>

      </div>
    </section>
  );
}
