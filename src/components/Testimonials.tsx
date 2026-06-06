"use client";

import React from "react";
import { motion } from "framer-motion";
import { Star, ArrowUpRight, BookOpen, Quote } from "lucide-react";

export default function Testimonials() {
  const reviews = [
    {
      name: "Seraphina Vance",
      role: "Creative Director",
      rating: 5,
      text: "The Pro map is insanely accurate. Nova AI explained my Saturn Return transit in terms that perfectly aligned with my career shift. Absolutely stunning UX.",
      avatar: "♈",
      sign: "Aries Sun",
    },
    {
      name: "Marcus Kael",
      role: "Software Architect",
      rating: 5,
      text: "I was skeptical, but the calculation engine's math is solid. It handles Vedic sub-charts with ease. The dark mode theme feels like a luxury observatory.",
      avatar: "♑",
      sign: "Capricorn Rising",
    },
    {
      name: "Aria Sterling",
      role: "Novelist",
      rating: 5,
      text: "Consulting Nova AI has become part of my weekly reflective routine. It matches synastry transits beautifully and serves as an excellent journaling prompt.",
      avatar: "♓",
      sign: "Pisces Moon",
    },
  ];

  const articles = [
    {
      tag: "Transits",
      title: "Surviving the Autumn Mercury Retrograde",
      desc: "A guide on maintaining software integrity and personal communication flow during planetary static.",
      readTime: "4 min read",
      date: "June 04, 2026",
    },
    {
      tag: "Synastry",
      title: "The Physics of Romantic Opposition",
      desc: "Decoding why opposite signs on the zodiac wheel contain the highest electromagnetic attraction.",
      readTime: "7 min read",
      date: "May 28, 2026",
    },
    {
      tag: "AI Ethics",
      title: "Aligning Neural Models with Ancient Ephemeris",
      desc: "How AstroNova uses neural architectures to interpret planetary degrees without losing the human spark.",
      readTime: "9 min read",
      date: "May 15, 2026",
    },
  ];

  return (
    <section className="py-24 relative overflow-hidden animate-fade-in" id="insights">
      {/* Stars background */}
      <div className="absolute inset-0 space-stars -z-10" />

      <div className="max-w-7xl mx-auto px-6">
        {/* Testimonials Title */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <div className="flex items-center justify-center space-x-2 mb-3">
            <Quote className="w-5 h-5 text-nebula-purple dark:text-celestial-blue" />
            <span className="text-xs font-bold uppercase tracking-widest text-muted">Testimonials</span>
          </div>
          <h2 className="font-display text-3xl sm:text-4xl font-extrabold mb-4">
            Resonating Across the Cosmos
          </h2>
          <p className="text-sm sm:text-base opacity-75 text-muted">
            Read stories of transformation, clarity, and structural alignment from users around the world.
          </p>
        </div>

        {/* Reviews Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-28">
          {reviews.map((rev, i) => (
            <motion.div
              key={i}
              className="glassmorphism rounded-3xl p-6 sm:p-8 flex flex-col justify-between border border-[var(--card-border)] relative"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
            >
              {/* Quotes icon watermark */}
              <span className="absolute bottom-6 right-8 text-6xl font-serif text-nebula-purple/5 select-none font-bold">
                ”
              </span>

              <div>
                {/* Rating */}
                <div className="flex items-center space-x-1 mb-4">
                  {[...Array(rev.rating)].map((_, starIdx) => (
                    <Star key={starIdx} className="w-4 h-4 text-amber-500 fill-amber-500" />
                  ))}
                </div>

                <p className="text-xs sm:text-sm text-muted opacity-90 leading-relaxed mb-6 italic">
                  "{rev.text}"
                </p>
              </div>

              <div className="flex items-center space-x-3 border-t border-[var(--card-border)]/40 pt-4">
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-nebula-purple to-celestial-blue flex items-center justify-center text-lg font-bold text-white shadow-inner">
                  {rev.avatar}
                </div>
                <div>
                  <h4 className="font-bold text-xs">{rev.name}</h4>
                  <span className="text-[10px] text-muted flex items-center">
                    {rev.role} • <span className="text-nebula-purple dark:text-celestial-blue font-semibold ml-1">{rev.sign}</span>
                  </span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Blog/Insights Title */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 border-b border-[var(--card-border)]/20 pb-6">
          <div>
            <div className="flex items-center space-x-2 mb-3">
              <BookOpen className="w-5 h-5 text-nebula-purple dark:text-celestial-blue" />
              <span className="text-xs font-bold uppercase tracking-widest text-muted">Astro Insights</span>
            </div>
            <h2 className="font-display text-2xl sm:text-3xl font-extrabold">
              Decoded Wisdom & Library
            </h2>
          </div>
          <button className="text-xs font-bold uppercase tracking-widest text-nebula-purple dark:text-celestial-blue flex items-center space-x-1.5 hover:opacity-85 mt-4 md:mt-0 cursor-pointer">
            <span>Visit The Library</span>
            <ArrowUpRight className="w-4 h-4" />
          </button>
        </div>

        {/* Insights Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {articles.map((art, i) => (
            <motion.article
              key={i}
              className="glassmorphism rounded-3xl p-6 border border-[var(--card-border)] hover:border-nebula-purple/50 transition-all duration-300 flex flex-col justify-between group cursor-pointer"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
            >
              <div>
                <span className="px-3 py-1 rounded bg-nebula-purple/10 text-nebula-purple dark:text-celestial-blue text-[9px] font-bold uppercase tracking-wider block w-fit mb-4">
                  {art.tag}
                </span>
                
                <h3 className="font-display text-lg font-bold mb-3 group-hover:text-nebula-purple dark:group-hover:text-celestial-blue transition-colors duration-300">
                  {art.title}
                </h3>
                
                <p className="text-xs text-muted opacity-80 leading-relaxed mb-6">
                  {art.desc}
                </p>
              </div>

              <div className="flex items-center justify-between text-[10px] font-semibold text-muted pt-4 border-t border-[var(--card-border)]/30">
                <span>{art.date}</span>
                <span>{art.readTime}</span>
              </div>
            </motion.article>
          ))}
        </div>

      </div>
    </section>
  );
}
