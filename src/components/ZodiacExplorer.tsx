"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Sparkles, X, Heart, Shield, Flame, Droplet, Wind, Mountain } from "lucide-react";

interface ZodiacSign {
  name: string;
  symbol: string;
  date: string;
  element: "Fire" | "Water" | "Air" | "Earth";
  planet: string;
  strengths: string[];
  weaknesses: string[];
  summary: string;
  career: string;
  love: string;
  color: string;
}

const ZODIAC_SIGNS: ZodiacSign[] = [
  {
    name: "Aries",
    symbol: "♈",
    date: "Mar 21 - Apr 19",
    element: "Fire",
    planet: "Mars",
    strengths: ["Courageous", "Confident", "Determined", "Enthusiastic"],
    weaknesses: ["Impatient", "Moody", "Short-tempered", "Impulsive"],
    summary: "As the first sign in the zodiac, Aries represents initiation, courage, and leadership. They are trailblazers who welcome challenges head-on with infectious enthusiasm.",
    career: "Best suited for entrepreneurial paths, sales, military, rescue services, and dynamic startups.",
    love: "Thrives with Sagittarius, Leo, and Libra. Needs excitement and independence in relationships.",
    color: "from-red-500/20 to-orange-500/10",
  },
  {
    name: "Taurus",
    symbol: "♉",
    date: "Apr 20 - May 20",
    element: "Earth",
    planet: "Venus",
    strengths: ["Reliable", "Patient", "Practical", "Devoted", "Stable"],
    weaknesses: ["Stubborn", "Possessive", "Uncompromising"],
    summary: "Taurus represents stability, patience, and appreciation for sensory and material pleasures. They possess a strong work ethic and seek enduring security.",
    career: "Excels in finance, banking, agriculture, luxury goods, design, and culinary arts.",
    love: "Highly compatible with Virgo, Capricorn, and Scorpio. Values loyalty and consistency.",
    color: "from-emerald-500/20 to-teal-500/10",
  },
  {
    name: "Gemini",
    symbol: "♊",
    date: "May 21 - Jun 20",
    element: "Air",
    planet: "Mercury",
    strengths: ["Gentle", "Affectionate", "Curious", "Adaptable", "Witty"],
    weaknesses: ["Nervous", "Inconsistent", "Indecisive"],
    summary: "Gemini embodies duality, intellectual curiosity, and communication. They are social butterflies who digest information quickly and love sharing thoughts.",
    career: "Succeeds in journalism, public relations, software engineering, writing, and translation.",
    love: "Best matches are Libra, Aquarius, and Sagittarius. Enjoys lively intellectual banter.",
    color: "from-sky-500/20 to-blue-500/10",
  },
  {
    name: "Cancer",
    symbol: "♋",
    date: "Jun 21 - Jul 22",
    element: "Water",
    planet: "Moon",
    strengths: ["Tenacious", "Highly imaginative", "Loyal", "Sympathetic"],
    weaknesses: ["Moody", "Pessimistic", "Suspicious", "Insecure"],
    summary: "Cancer is deep, emotional, and intensely intuitive. They are deeply connected to their homes, families, and emotional roots, protecting their soft interiors.",
    career: "Flourishes in healthcare, psychology, teaching, hospitality, and real estate.",
    love: "Deeply compatible with Taurus, Virgo, and Pisces. Needs emotional safety and nurturing.",
    color: "from-indigo-500/20 to-purple-500/10",
  },
  {
    name: "Leo",
    symbol: "♌",
    date: "Jul 23 - Aug 22",
    element: "Fire",
    planet: "Sun",
    strengths: ["Creative", "Passionate", "Generous", "Warm-hearted", "Cheerful"],
    weaknesses: ["Arrogant", "Stubborn", "Self-centered", "Inflexible"],
    summary: "Leo is the natural king or queen of the zodiac, exuding warmth, vitality, and theatrical charisma. They possess a generous spirit and a drive to create.",
    career: "Natural fit for performing arts, management, politics, education, and entertainment.",
    love: "Flourishes with Aries, Sagittarius, and Aquarius. Loves grand romantic gestures and admiration.",
    color: "from-amber-500/20 to-yellow-500/10",
  },
  {
    name: "Virgo",
    symbol: "♍",
    date: "Aug 23 - Sep 22",
    element: "Earth",
    planet: "Mercury",
    strengths: ["Loyal", "Analytical", "Kind", "Hardworking", "Practical"],
    weaknesses: ["Shyness", "Worry", "Overly critical of self and others"],
    summary: "Virgo represents meticulous order, service, and refinement. They possess an analytical mind and seek to improve themselves and the world around them.",
    career: "Suited for scientific research, data analysis, healthcare, editing, and project management.",
    love: "Ties well with Taurus, Capricorn, and Pisces. Appreciates quiet acts of devotion and tidiness.",
    color: "from-slate-500/20 to-emerald-500/10",
  },
  {
    name: "Libra",
    symbol: "♎",
    date: "Sep 23 - Oct 22",
    element: "Air",
    planet: "Venus",
    strengths: ["Cooperative", "Diplomatic", "Gracious", "Fair-minded", "Social"],
    weaknesses: ["Indecisive", "Avoids confrontations", "Will carry a grudge"],
    summary: "Libra is the sign of balance, partnerships, and aesthetic beauty. They are diplomats who strive to resolve disputes and surround themselves with art.",
    career: "Excels in law, diplomacy, interior design, mediation, and public relations.",
    love: "Best matches are Gemini, Aquarius, and Aries. Desires equality and harmony.",
    color: "from-pink-500/20 to-rose-500/10",
  },
  {
    name: "Scorpio",
    symbol: "♏",
    date: "Oct 23 - Nov 21",
    element: "Water",
    planet: "Pluto",
    strengths: ["Resourceful", "Powerful", "Brave", "Passionate", "True Friend"],
    weaknesses: ["Distrustful", "Jealous", "Secretive", "Violent"],
    summary: "Scorpio represents transformation, intense passion, and psychological depth. They seek truth in all interactions and possess magnetic charisma.",
    career: "Suited for investigation, surgery, psychology, crisis management, and investment banking.",
    love: "Matches with Cancer, Pisces, and Taurus. Demands absolute honesty and spiritual connection.",
    color: "from-red-950/20 to-purple-950/10",
  },
  {
    name: "Sagittarius",
    symbol: "♐",
    date: "Nov 22 - Dec 21",
    element: "Fire",
    planet: "Jupiter",
    strengths: ["Generous", "Idealistic", "Great sense of humor"],
    weaknesses: ["Promises more than can deliver", "Impatient", "Tactless"],
    summary: "Sagittarius represents exploration, philosophy, and optimism. They are truth-seekers who travel wide to expand their horizons and grasp the meaning of life.",
    career: "Thrives in travel industries, higher education, publishing, writing, and outdoor work.",
    love: "Matches Aries, Leo, and Gemini. Requires freedom, intellectual challenge, and adventure.",
    color: "from-orange-500/20 to-yellow-500/10",
  },
  {
    name: "Capricorn",
    symbol: "♑",
    date: "Dec 22 - Jan 19",
    element: "Earth",
    planet: "Saturn",
    strengths: ["Responsible", "Disciplined", "Self-control", "Good managers"],
    weaknesses: ["Know-it-all", "Unforgiving", "Condescending", "Expecting the worst"],
    summary: "Capricorn is the builder of the zodiac, channeling duty, ambition, and long-term planning. They scale the highest peaks through hard work and discipline.",
    career: "Excels in corporate executive leadership, government agencies, architecture, and finance.",
    love: "Ties with Taurus, Virgo, and Cancer. Prefers slow, serious commitment and stable partnerships.",
    color: "from-slate-700/20 to-neutral-700/10",
  },
  {
    name: "Aquarius",
    symbol: "♒",
    date: "Jan 20 - Feb 18",
    element: "Air",
    planet: "Uranus",
    strengths: ["Progressive", "Original", "Independent", "Humanitarian"],
    weaknesses: ["Runs from emotional expression", "Temperamental", "Aloof"],
    summary: "Aquarius is the revolutionary, representing community, innovation, and futuristic thinking. They are eccentrics who strive to liberate society from outdated rules.",
    career: "Suited for technology, software development, social activism, aerospace, and science.",
    love: "Ties with Gemini, Libra, and Leo. Needs space, friendship first, and shared humanitarian values.",
    color: "from-cyan-500/20 to-indigo-500/10",
  },
  {
    name: "Pisces",
    symbol: "♓",
    date: "Feb 19 - Mar 20",
    element: "Water",
    planet: "Neptune",
    strengths: ["Compassionate", "Artistic", "Intuitive", "Gentle", "Wise"],
    weaknesses: ["Fearful", "Overly trusting", "Sad", "Desire to escape reality"],
    summary: "Pisces represents spiritual unity, empathy, and artistic imagination. They are dreamers who dissolve boundaries between themselves and the cosmic whole.",
    career: "Excels in creative arts, music, spiritual counseling, non-profits, and marine biology.",
    love: "Highly compatible with Cancer, Scorpio, and Virgo. Desires deep, soulful, romantic union.",
    color: "from-teal-500/20 to-purple-500/10",
  },
];

export default function ZodiacExplorer() {
  const [selectedElement, setSelectedElement] = useState<string>("All");
  const [selectedSign, setSelectedSign] = useState<ZodiacSign | null>(null);

  const elements = ["All", "Fire", "Earth", "Air", "Water"];

  const getElementIcon = (elem: string) => {
    switch (elem) {
      case "Fire": return <Flame className="w-4 h-4 text-red-500" />;
      case "Water": return <Droplet className="w-4 h-4 text-blue-500" />;
      case "Air": return <Wind className="w-4 h-4 text-sky-400" />;
      case "Earth": return <Mountain className="w-4 h-4 text-emerald-500" />;
      default: return null;
    }
  };

  const filteredSigns = selectedElement === "All"
    ? ZODIAC_SIGNS
    : ZODIAC_SIGNS.filter(sign => sign.element === selectedElement);

  return (
    <section className="py-24 relative overflow-hidden" id="zodiac">
      {/* Background elements */}
      <div className="absolute inset-0 space-stars -z-10" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[40rem] h-[40rem] rounded-full bg-nebula-purple/5 blur-[120px] -z-10 animate-pulse-slow" />

      <div className="max-w-7xl mx-auto px-6">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16">
          <div className="max-w-2xl">
            <div className="flex items-center space-x-2 mb-3">
              <Sparkles className="w-5 h-5 text-nebula-purple dark:text-celestial-blue" />
              <span className="text-xs font-bold uppercase tracking-widest text-muted">Zodiac Library</span>
            </div>
            <h2 className="font-display text-3xl sm:text-4xl font-extrabold mb-4">
              Explore the Cosmic Archetypes
            </h2>
            <p className="text-sm sm:text-base opacity-75 text-muted">
              Select an archetype to decode its strengths, planetary alignments, elemental attributes, and life paths.
            </p>
          </div>

          {/* Filter Buttons */}
          <div className="flex flex-wrap gap-2 mt-6 md:mt-0 bg-space-navy/5 dark:bg-space-navy/40 p-1.5 rounded-full border border-[var(--card-border)] w-fit">
            {elements.map((elem) => (
              <button
                key={elem}
                onClick={() => setSelectedElement(elem)}
                className={`px-5 py-2 rounded-full text-xs font-semibold uppercase tracking-wider flex items-center space-x-1.5 transition-all duration-300 cursor-pointer ${
                  selectedElement === elem
                    ? "bg-gradient-to-r from-nebula-purple to-celestial-blue text-white shadow-md"
                    : "hover:bg-[var(--card-border)] text-muted"
                }`}
              >
                {getElementIcon(elem)}
                <span>{elem}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Zodiac Grid */}
        <motion.div
          className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6"
          layout
        >
          <AnimatePresence mode="popLayout">
            {filteredSigns.map((sign, index) => (
              <motion.div
                key={sign.name}
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.4, delay: index * 0.05 }}
                whileHover={{ y: -6 }}
                onClick={() => setSelectedSign(sign)}
                className={`glassmorphism rounded-2xl p-6 flex flex-col justify-between cursor-pointer relative group overflow-hidden bg-gradient-to-br ${sign.color}`}
              >
                {/* Subtle light glow */}
                <div className="absolute inset-0 bg-gradient-to-tr from-transparent to-white/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <span className="text-xs font-bold text-muted uppercase tracking-wider block mb-1">
                      {sign.date}
                    </span>
                    <h3 className="font-display text-xl sm:text-2xl font-bold tracking-tight">
                      {sign.name}
                    </h3>
                  </div>
                  <span className="text-4xl opacity-90 select-none group-hover:scale-110 transition-transform duration-300">
                    {sign.symbol}
                  </span>
                </div>

                <div className="mt-8 flex items-center justify-between border-t border-[var(--card-border)]/40 pt-4">
                  <span className="text-xs font-medium text-muted flex items-center space-x-1">
                    {getElementIcon(sign.element)}
                    <span className="ml-1">{sign.element}</span>
                  </span>
                  <span className="text-[10px] font-bold uppercase tracking-wider text-nebula-purple dark:text-celestial-blue opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    Reveal traits →
                  </span>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      </div>

      {/* Details Modal */}
      <AnimatePresence>
        {selectedSign && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedSign(null)}
              className="absolute inset-0 bg-black/60 backdrop-blur-sm"
            />

            {/* Modal Body */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              transition={{ type: "spring", duration: 0.5 }}
              className="relative w-full max-w-2xl rounded-3xl glassmorphism p-6 sm:p-8 overflow-hidden max-h-[90vh] overflow-y-auto no-scrollbar shadow-2xl bg-gradient-to-br from-space-navy/95 to-cosmic-black/95 dark:from-space-navy/95 dark:to-cosmic-black/95 light:from-white light:to-slate-50 border border-[var(--card-border)]"
            >
              {/* Radial glow */}
              <div className={`absolute -top-20 -left-20 w-48 h-48 rounded-full bg-gradient-to-br ${selectedSign.color} blur-[60px] opacity-60 pointer-events-none`} />

              {/* Close Button */}
              <button
                onClick={() => setSelectedSign(null)}
                className="absolute top-6 right-6 p-2 rounded-full hover:bg-black/10 dark:hover:bg-white/10 transition-colors cursor-pointer text-foreground"
              >
                <X className="w-5 h-5" />
              </button>

              {/* Content */}
              <div className="relative z-10">
                {/* Header */}
                <div className="flex items-center space-x-4 mb-6">
                  <span className="text-5xl sm:text-6xl text-nebula-purple dark:text-celestial-blue font-bold select-none">
                    {selectedSign.symbol}
                  </span>
                  <div>
                    <span className="text-xs font-bold uppercase tracking-widest text-muted">
                      {selectedSign.date}
                    </span>
                    <h3 className="font-display text-2xl sm:text-3xl font-extrabold tracking-tight">
                      {selectedSign.name}
                    </h3>
                  </div>
                </div>

                {/* Badges / Meta Info */}
                <div className="flex flex-wrap gap-3 mb-6">
                  <div className="px-4 py-1.5 rounded-full border border-[var(--card-border)] bg-[var(--card-bg)] flex items-center space-x-1.5">
                    {getElementIcon(selectedSign.element)}
                    <span className="text-xs font-semibold uppercase tracking-wider">{selectedSign.element} Element</span>
                  </div>
                  <div className="px-4 py-1.5 rounded-full border border-[var(--card-border)] bg-[var(--card-bg)] flex items-center space-x-1.5">
                    <span className="text-xs text-nebula-purple dark:text-celestial-blue">🪐</span>
                    <span className="text-xs font-semibold uppercase tracking-wider">Ruled by {selectedSign.planet}</span>
                  </div>
                </div>

                {/* Summary */}
                <p className="text-sm sm:text-base opacity-95 text-muted leading-relaxed mb-6">
                  {selectedSign.summary}
                </p>

                {/* Traits Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                  {/* Strengths */}
                  <div className="p-4 rounded-xl border border-[var(--card-border)] bg-emerald-500/5">
                    <h4 className="font-bold text-xs uppercase tracking-wider text-emerald-600 dark:text-emerald-400 mb-2 flex items-center">
                      <Shield className="w-3.5 h-3.5 mr-1" />
                      Strengths
                    </h4>
                    <div className="flex flex-wrap gap-1.5">
                      {selectedSign.strengths.map((str) => (
                        <span key={str} className="px-2 py-0.5 rounded text-[10px] font-semibold bg-emerald-500/10 text-emerald-600 dark:text-emerald-300">
                          {str}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Weaknesses */}
                  <div className="p-4 rounded-xl border border-[var(--card-border)] bg-rose-500/5">
                    <h4 className="font-bold text-xs uppercase tracking-wider text-rose-500 dark:text-rose-400 mb-2 flex items-center">
                      <Shield className="w-3.5 h-3.5 mr-1 rotate-180" />
                      Weaknesses
                    </h4>
                    <div className="flex flex-wrap gap-1.5">
                      {selectedSign.weaknesses.map((weak) => (
                        <span key={weak} className="px-2 py-0.5 rounded text-[10px] font-semibold bg-rose-500/10 text-rose-600 dark:text-rose-300">
                          {weak}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Life paths */}
                <div className="space-y-4 pt-4 border-t border-[var(--card-border)]/50">
                  <div className="flex items-start space-x-3">
                    <div className="p-1.5 rounded bg-nebula-purple/10 text-nebula-purple mt-0.5">
                      <Sparkles className="w-3.5 h-3.5" />
                    </div>
                    <div>
                      <h4 className="font-bold text-xs uppercase tracking-wider text-foreground">Career & Wealth alignment</h4>
                      <p className="text-xs text-muted opacity-90 mt-1 leading-relaxed">{selectedSign.career}</p>
                    </div>
                  </div>

                  <div className="flex items-start space-x-3">
                    <div className="p-1.5 rounded bg-aurora-pink/10 text-aurora-pink mt-0.5">
                      <Heart className="w-3.5 h-3.5" />
                    </div>
                    <div>
                      <h4 className="font-bold text-xs uppercase tracking-wider text-foreground">Love & Compatibility</h4>
                      <p className="text-xs text-muted opacity-90 mt-1 leading-relaxed">{selectedSign.love}</p>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
}
