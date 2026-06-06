"use client";

import React, { useState, useEffect } from "react";
import { useTheme } from "./ThemeProvider";
import { Sun, Moon, Orbit, Menu, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export default function Header() {
  const { theme, toggleTheme } = useTheme();
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navItems = [
    { name: "Features", href: "#features" },
    { name: "Zodiac Explorer", href: "#zodiac" },
    { name: "Birth Chart", href: "#chart-generator" },
    { name: "Nova AI", href: "#nova-ai" },
    { name: "Premium", href: "#pricing" },
    { name: "Insights", href: "#insights" }
  ];

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled
          ? "py-4 bg-[var(--nav-bg)] backdrop-blur-md border-b border-[var(--card-border)] shadow-md"
          : "py-6 bg-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
        {/* Logo */}
        <a href="#" className="flex items-center space-x-2 group">
          <div className="relative flex items-center justify-center w-10 h-10 rounded-full border border-nebula-purple/30 group-hover:border-celestial-blue/60 transition-colors duration-500 bg-space-navy/10">
            <Orbit className="w-5 h-5 text-nebula-purple group-hover:text-celestial-blue transition-colors duration-500 group-hover:rotate-180 duration-[1500ms] ease-in-out" />
            <div className="absolute inset-0 rounded-full border-t-2 border-transparent border-r-2 border-celestial-blue/30 group-hover:border-r-nebula-purple/50 animate-spin" />
          </div>
          <span className="font-display text-xl font-bold tracking-wider bg-clip-text text-transparent bg-gradient-to-r from-starlight-white via-nebula-purple to-celestial-blue dark:from-white dark:to-celestial-blue light:from-slate-900 light:to-nebula-purple">
            Astro<span className="text-nebula-purple dark:text-celestial-blue font-light">Nova</span>
          </span>
        </a>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-8">
          {navItems.map((item) => (
            <a
              key={item.name}
              href={item.href}
              className="text-sm font-medium opacity-80 hover:opacity-100 hover:text-nebula-purple dark:hover:text-celestial-blue transition-colors duration-300 relative group py-1"
            >
              {item.name}
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-nebula-purple to-celestial-blue group-hover:w-full transition-all duration-300" />
            </a>
          ))}
        </nav>

        {/* Action Controls */}
        <div className="hidden md:flex items-center space-x-4">
          {/* Theme Toggle */}
          <button
            onClick={toggleTheme}
            className="p-2.5 rounded-full border border-[var(--card-border)] bg-[var(--card-bg)] hover:scale-105 hover:bg-nebula-purple/10 transition-all duration-300 relative overflow-hidden cursor-pointer"
            aria-label="Toggle theme"
          >
            <motion.div
              initial={false}
              animate={{ rotate: theme === "dark" ? 0 : 180 }}
              transition={{ type: "spring", stiffness: 200, damping: 15 }}
            >
              {theme === "dark" ? (
                <Moon className="w-4 h-4 text-celestial-blue" />
              ) : (
                <Sun className="w-4 h-4 text-amber-500" />
              )}
            </motion.div>
          </button>

          {/* CTA */}
          <a
            href="#chart-generator"
            className="px-5 py-2.5 rounded-full text-xs font-semibold uppercase tracking-wider text-white bg-gradient-to-r from-nebula-purple via-accent-3 to-celestial-blue hover:from-celestial-blue hover:to-nebula-purple transition-all duration-500 scale-100 hover:scale-105 shadow-md shadow-nebula-purple/20 hover:shadow-celestial-blue/30"
          >
            Get Free Reading
          </a>
        </div>

        {/* Mobile menu and theme toggle */}
        <div className="flex items-center space-x-3 md:hidden">
          <button
            onClick={toggleTheme}
            className="p-2 rounded-full border border-[var(--card-border)] bg-[var(--card-bg)]"
            aria-label="Toggle theme"
          >
            {theme === "dark" ? (
              <Moon className="w-4 h-4 text-celestial-blue" />
            ) : (
              <Sun className="w-4 h-4 text-amber-500" />
            )}
          </button>

          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 rounded-md border border-[var(--card-border)] text-foreground bg-[var(--card-bg)]"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Panel */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden border-b border-[var(--card-border)] bg-[var(--background)] px-6 py-4 flex flex-col space-y-4 shadow-xl overflow-hidden"
          >
            {navItems.map((item) => (
              <a
                key={item.name}
                href={item.href}
                onClick={() => setMobileMenuOpen(false)}
                className="text-sm font-semibold py-2 border-b border-[var(--card-border)]/50 hover:text-nebula-purple"
              >
                {item.name}
              </a>
            ))}
            <a
              href="#chart-generator"
              onClick={() => setMobileMenuOpen(false)}
              className="w-full text-center px-4 py-3 rounded-full text-xs font-bold uppercase tracking-wider text-white bg-gradient-to-r from-nebula-purple to-celestial-blue"
            >
              Get Free Reading
            </a>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
