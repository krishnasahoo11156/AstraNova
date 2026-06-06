"use client";

import React from "react";
import { Orbit, MessageSquare } from "lucide-react";

export default function Footer() {
  const footerLinks = [
    {
      title: "Navigation",
      links: [
        { name: "Features", href: "#features" },
        { name: "Zodiac Explorer", href: "#zodiac" },
        { name: "Birth Chart", href: "#chart-generator" },
        { name: "Nova AI Chat", href: "#nova-ai" },
      ],
    },
    {
      title: "Company",
      links: [
        { name: "About Us", href: "#" },
        { name: "Astronomy API", href: "#" },
        { name: "Cosmic Library", href: "#insights" },
        { name: "Careers", href: "#" },
      ],
    },
    {
      title: "Legal & Support",
      links: [
        { name: "Help Center", href: "#" },
        { name: "Privacy Policy", href: "#" },
        { name: "Terms of Service", href: "#" },
        { name: "Astrological Rules", href: "#" },
      ],
    },
  ];

  return (
    <footer className="mt-auto border-t border-[var(--card-border)] bg-[var(--nav-bg)] backdrop-blur-md py-16 relative overflow-hidden">
      {/* Stars backdrop */}
      <div className="absolute inset-0 space-stars opacity-5 -z-10" />

      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-8 lg:gap-12 relative z-10">
        
        {/* Left Side: Brand and Socials */}
        <div className="lg:col-span-4 flex flex-col justify-between space-y-6">
          <div>
            <a href="#" className="flex items-center space-x-2 group w-fit mb-4">
              <div className="flex items-center justify-center w-8 h-8 rounded-full border border-nebula-purple/30 bg-space-navy/10">
                <Orbit className="w-4 h-4 text-nebula-purple group-hover:rotate-180 transition-transform duration-1000 ease-in-out" />
              </div>
              <span className="font-display text-lg font-bold tracking-wider">
                Astro<span className="text-nebula-purple">Nova</span>
              </span>
            </a>
            <p className="text-xs text-muted opacity-85 leading-relaxed max-w-sm">
              Merging deep astronomical planetary tracking with advanced neural architectures to map your spiritual and material coordinates. Decoded luxury for modern seekers.
            </p>
          </div>

          {/* Socials */}
          <div className="flex items-center space-x-4">
            <a href="#" className="p-2.5 rounded-full border border-[var(--card-border)] bg-[var(--card-bg)] hover:text-nebula-purple transition-colors duration-300 flex items-center justify-center" aria-label="Instagram">
              <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
                <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
                <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
              </svg>
            </a>
            <a href="#" className="p-2.5 rounded-full border border-[var(--card-border)] bg-[var(--card-bg)] hover:text-nebula-purple transition-colors duration-300 flex items-center justify-center" aria-label="X (formerly Twitter)">
              <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M4 4l11.733 16h4.267l-11.733 -16z" />
                <path d="M4 20l6.768 -6.768m2.46 -2.46l6.772 -6.772" />
              </svg>
            </a>
            <a href="#" className="p-2.5 rounded-full border border-[var(--card-border)] bg-[var(--card-bg)] hover:text-nebula-purple transition-colors duration-300 flex items-center justify-center" aria-label="Discord">
              <MessageSquare className="w-4 h-4" />
            </a>
            <a href="#" className="p-2.5 rounded-full border border-[var(--card-border)] bg-[var(--card-bg)] hover:text-nebula-purple transition-colors duration-300 flex items-center justify-center" aria-label="YouTube">
              <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M22.54 6.42a2.78 2.78 0 0 0-1.94-2C18.88 4 12 4 12 4s-6.88 0-8.6.46a2.78 2.78 0 0 0-1.94 2A29 29 0 0 0 1 11.75a29 29 0 0 0 .46 5.33A2.78 2.78 0 0 0 3.4 19c1.72.46 8.6.46 8.6.46s6.88 0 8.6-.46a2.78 2.78 0 0 0 1.94-2 29 29 0 0 0 .46-5.25 29 29 0 0 0-.46-5.33z" />
                <polygon points="9.75 15.02 15.5 11.75 9.75 8.48 9.75 15.02" />
              </svg>
            </a>
          </div>
        </div>

        {/* Right Side: Links Grids */}
        <div className="lg:col-span-8 grid grid-cols-2 sm:grid-cols-3 gap-8">
          {footerLinks.map((section, idx) => (
            <div key={idx} className="flex flex-col space-y-4">
              <h4 className="font-display text-xs font-extrabold uppercase tracking-widest text-muted">
                {section.title}
              </h4>
              <ul className="space-y-2.5">
                {section.links.map((link, lIdx) => (
                  <li key={lIdx}>
                    <a
                      href={link.href}
                      className="text-xs opacity-80 hover:opacity-100 hover:text-nebula-purple dark:hover:text-celestial-blue transition-colors duration-300 block"
                    >
                      {link.name}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

      </div>

      {/* Copyright Footer bar */}
      <div className="max-w-7xl mx-auto px-6 mt-16 pt-8 border-t border-[var(--card-border)]/30 text-center flex flex-col sm:flex-row items-center justify-between text-[10px] font-semibold text-muted tracking-wider uppercase relative z-10">
        <span>© {new Date().getFullYear()} AstroNova Inc. All orbits aligned.</span>
        <span className="mt-2 sm:mt-0">Calculations based on Swiss Ephemeris data models.</span>
      </div>
    </footer>
  );
}
