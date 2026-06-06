"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Sparkles, ArrowRight, RefreshCw, Compass, Moon, Sun, Star } from "lucide-react";

interface PlanetPosition {
  name: string;
  symbol: string;
  sign: string;
  degree: number;
  house: number;
  angle: number; // angle in degrees for SVG plotting
}

interface AspectLine {
  from: string;
  to: string;
  type: "Trine" | "Square" | "Opposition" | "Conjunction";
  color: string;
  x1: number;
  y1: number;
  x2: number;
  y2: number;
}

export default function BirthChartGenerator() {
  const [step, setStep] = useState<"input" | "calculating" | "result">("input");
  const [formData, setFormData] = useState({
    name: "",
    dob: "",
    tob: "",
    pob: "",
    gender: "Other",
  });

  const [chartData, setChartData] = useState<{
    sunSign: string;
    moonSign: string;
    ascendant: string;
    planets: PlanetPosition[];
    aspects: AspectLine[];
  } | null>(null);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const calculateChart = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.dob) return;

    setStep("calculating");

    // Simulate astronomical computation
    setTimeout(() => {
      // Mock calculation based on letters of name/date to give semi-consistent but randomized premium output
      const signs = ["Aries", "Taurus", "Gemini", "Cancer", "Leo", "Virgo", "Libra", "Scorpio", "Sagittarius", "Capricorn", "Aquarius", "Pisces"];
      const seed = formData.name.length + parseInt(formData.dob.split("-")[2] || "5");
      
      const sunSignIndex = seed % 12;
      const moonSignIndex = (seed * 7) % 12;
      const ascSignIndex = (seed * 3) % 12;

      // Planets coordinates
      const planetsList = [
        { name: "Sun", symbol: "☉", sign: signs[sunSignIndex], degree: 14.2, house: 10 },
        { name: "Moon", symbol: "☽", sign: signs[moonSignIndex], degree: 28.5, house: 4 },
        { name: "Ascendant", symbol: "ASC", sign: signs[ascSignIndex], degree: 4.8, house: 1 },
        { name: "Mercury", symbol: "☿", sign: signs[(sunSignIndex + 1) % 12], degree: 9.1, house: 10 },
        { name: "Venus", symbol: "♀", sign: signs[(sunSignIndex - 1 + 12) % 12], degree: 22.3, house: 9 },
        { name: "Mars", symbol: "♂", sign: signs[(seed * 2) % 12], degree: 11.4, house: 2 },
        { name: "Jupiter", symbol: "♃", sign: signs[(seed * 5) % 12], degree: 3.5, house: 11 },
        { name: "Saturn", symbol: "♄", sign: signs[(seed * 11) % 12], degree: 18.9, house: 7 },
        { name: "Uranus", symbol: "♅", sign: signs[(seed + 4) % 12], degree: 26.0, house: 8 },
        { name: "Neptune", symbol: "♆", sign: signs[(seed + 9) % 12], degree: 12.2, house: 5 },
      ];

      // Convert planet positions to angles for circular plotting (0-360 degrees)
      const planetsWithAngles: PlanetPosition[] = planetsList.map((p, index) => {
        // Distribute nicely around the wheel
        const baseAngle = index * 36;
        const offset = (p.degree / 30) * 30; // mapping 30 degrees of zodiac to SVG angles
        return {
          ...p,
          angle: (baseAngle + offset) % 360,
        };
      });

      // Calculate aspects between some planets
      const aspects: AspectLine[] = [];
      const center = 150; // SVG viewBox center 150, 150 (300x300 viewBox)
      const radius = 90; // Radius of plotting circle

      const getCoords = (angle: number) => {
        const rad = ((angle - 90) * Math.PI) / 180;
        return {
          x: center + radius * Math.cos(rad),
          y: center + radius * Math.sin(rad),
        };
      };

      // Add a couple of aspect lines
      const aspectConnections = [
        { from: 0, to: 1, type: "Opposition" as const, color: "stroke-rose-500" },
        { from: 0, to: 4, type: "Conjunction" as const, color: "stroke-yellow-400" },
        { from: 1, to: 5, type: "Trine" as const, color: "stroke-celestial-blue" },
        { from: 4, to: 7, type: "Square" as const, color: "stroke-nebula-purple" },
      ];

      aspectConnections.forEach((conn) => {
        const p1 = planetsWithAngles[conn.from];
        const p2 = planetsWithAngles[conn.to];
        if (p1 && p2) {
          const c1 = getCoords(p1.angle);
          const c2 = getCoords(p2.angle);
          aspects.push({
            from: p1.name,
            to: p2.name,
            type: conn.type,
            color: conn.color,
            x1: c1.x,
            y1: c1.y,
            x2: c2.x,
            y2: c2.y,
          });
        }
      });

      setChartData({
        sunSign: signs[sunSignIndex],
        moonSign: signs[moonSignIndex],
        ascendant: signs[ascSignIndex],
        planets: planetsWithAngles,
        aspects,
      });

      setStep("result");
    }, 2800);
  };

  return (
    <section className="py-24 relative overflow-hidden" id="chart-generator">
      {/* Stars backdrop */}
      <div className="absolute inset-0 space-stars -z-10" />

      {/* Decorative ambient glows */}
      <div className="absolute top-1/2 right-1/4 translate-x-1/2 -translate-y-1/2 w-[35rem] h-[35rem] rounded-full bg-celestial-blue/5 blur-[120px] -z-10" />
      <div className="absolute bottom-10 left-10 w-[30rem] h-[30rem] rounded-full bg-nebula-purple/5 blur-[120px] -z-10 animate-pulse-slow" />

      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <div className="flex items-center justify-center space-x-2 mb-3">
            <Compass className="w-5 h-5 text-nebula-purple dark:text-celestial-blue" />
            <span className="text-xs font-bold uppercase tracking-widest text-muted">Astro engine</span>
          </div>
          <h2 className="font-display text-3xl sm:text-4xl font-extrabold mb-4">
            Generate Your Birth Chart
          </h2>
          <p className="text-sm sm:text-base opacity-75 text-muted">
            Enter your exact birth parameters to fetch astronomical ephemeris coordinates and compile your interactive celestial blueprint.
          </p>
        </div>

        <div className="max-w-4xl mx-auto">
          <AnimatePresence mode="wait">
            {/* Input Form Step */}
            {step === "input" && (
              <motion.div
                key="form"
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                transition={{ duration: 0.4 }}
                className="glassmorphism rounded-3xl p-6 sm:p-10 shadow-xl border border-[var(--card-border)] bg-gradient-to-br from-space-navy/40 to-cosmic-black/20 dark:from-space-navy/40 dark:to-cosmic-black/20 light:from-white light:to-slate-50"
              >
                <form onSubmit={calculateChart} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* Name */}
                    <div className="flex flex-col space-y-2">
                      <label htmlFor="name" className="text-xs font-bold uppercase tracking-wider text-muted">
                        Full Name
                      </label>
                      <input
                        type="text"
                        name="name"
                        id="name"
                        required
                        value={formData.name}
                        onChange={handleInputChange}
                        placeholder="John Doe"
                        className="px-4 py-3.5 rounded-xl border border-[var(--card-border)] bg-[var(--card-bg)] text-foreground placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-nebula-purple/50 focus:border-nebula-purple transition-all duration-300"
                      />
                    </div>

                    {/* DOB */}
                    <div className="flex flex-col space-y-2">
                      <label htmlFor="dob" className="text-xs font-bold uppercase tracking-wider text-muted">
                        Date of Birth
                      </label>
                      <input
                        type="date"
                        name="dob"
                        id="dob"
                        required
                        value={formData.dob}
                        onChange={handleInputChange}
                        className="px-4 py-3.5 rounded-xl border border-[var(--card-border)] bg-[var(--card-bg)] text-foreground focus:outline-none focus:ring-2 focus:ring-nebula-purple/50 focus:border-nebula-purple transition-all duration-300"
                      />
                    </div>

                    {/* TOB */}
                    <div className="flex flex-col space-y-2">
                      <label htmlFor="tob" className="text-xs font-bold uppercase tracking-wider text-muted">
                        Time of Birth (Approximate)
                      </label>
                      <input
                        type="time"
                        name="tob"
                        id="tob"
                        required
                        value={formData.tob}
                        onChange={handleInputChange}
                        className="px-4 py-3.5 rounded-xl border border-[var(--card-border)] bg-[var(--card-bg)] text-foreground focus:outline-none focus:ring-2 focus:ring-nebula-purple/50 focus:border-nebula-purple transition-all duration-300"
                      />
                    </div>

                    {/* Place of Birth */}
                    <div className="flex flex-col space-y-2">
                      <label htmlFor="pob" className="text-xs font-bold uppercase tracking-wider text-muted">
                        Place of Birth (City, Country)
                      </label>
                      <input
                        type="text"
                        name="pob"
                        id="pob"
                        required
                        value={formData.pob}
                        onChange={handleInputChange}
                        placeholder="Paris, France"
                        className="px-4 py-3.5 rounded-xl border border-[var(--card-border)] bg-[var(--card-bg)] text-foreground placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-nebula-purple/50 focus:border-nebula-purple transition-all duration-300"
                      />
                    </div>
                  </div>

                  {/* Submit Button */}
                  <div className="pt-4 flex justify-end">
                    <button
                      type="submit"
                      className="group w-full md:w-auto px-8 py-4 rounded-full text-sm font-semibold uppercase tracking-wider text-white bg-gradient-to-r from-nebula-purple via-aurora-pink to-celestial-blue hover:from-celestial-blue hover:to-nebula-purple transition-all duration-500 scale-100 hover:scale-[1.03] shadow-lg shadow-nebula-purple/20 cursor-pointer flex items-center justify-center space-x-2"
                    >
                      <span>Compute Alignments</span>
                      <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" />
                    </button>
                  </div>
                </form>
              </motion.div>
            )}

            {/* Calculating Screen */}
            {step === "calculating" && (
              <motion.div
                key="calculating"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                className="glassmorphism rounded-3xl p-12 text-center flex flex-col items-center justify-center border border-[var(--card-border)] min-h-[400px]"
              >
                <div className="relative w-24 h-24 mb-6">
                  {/* Outer spinning dash ring */}
                  <div className="absolute inset-0 rounded-full border-2 border-dashed border-nebula-purple animate-spin" style={{ animationDuration: "8s" }} />
                  {/* Middle rotating ring */}
                  <div className="absolute inset-2 rounded-full border border-celestial-blue animate-spin-reverse-slow" />
                  {/* Inner breathing glow */}
                  <div className="absolute inset-5 rounded-full bg-gradient-to-br from-nebula-purple to-celestial-blue animate-pulse opacity-85 flex items-center justify-center">
                    <Compass className="w-5 h-5 text-white animate-spin-slow" />
                  </div>
                </div>

                <h3 className="font-display text-xl font-bold mb-2">
                  Querying Orbit Ephemeris Data...
                </h3>
                <p className="text-xs text-muted max-w-sm leading-relaxed animate-pulse">
                  Mapping planetary aspects, calculating house boundaries, and correlating stellar coordinates for {formData.name}...
                </p>
              </motion.div>
            )}

            {/* Result Display Dashboard */}
            {step === "result" && chartData && (
              <motion.div
                key="result"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ type: "spring", stiffness: 100, damping: 15 }}
                className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch"
              >
                {/* Visual Chart Card */}
                <div className="lg:col-span-6 glassmorphism rounded-3xl p-6 sm:p-8 flex flex-col items-center justify-center border border-[var(--card-border)] min-h-[380px]">
                  <h3 className="text-sm font-semibold uppercase tracking-wider text-muted mb-4">
                    Interactive Natal Blueprint
                  </h3>
                  
                  {/* Dynamic SVG Birth Chart */}
                  <div className="relative w-full aspect-square max-w-[280px]">
                    <svg className="w-full h-full text-slate-300 dark:text-slate-600" viewBox="0 0 300 300">
                      {/* Outer Rim */}
                      <circle cx="150" cy="150" r="140" fill="none" stroke="var(--card-border)" strokeWidth="1.5" />
                      <circle cx="150" cy="150" r="115" fill="none" stroke="var(--card-border)" strokeWidth="0.75" />
                      <circle cx="150" cy="150" r="90" fill="none" stroke="var(--card-border)" strokeWidth="0.75" />

                      {/* House Dividers (12 standard lines) */}
                      {[...Array(6)].map((_, i) => {
                        const angle = i * 30 + 15;
                        const rad = (angle * Math.PI) / 180;
                        const x1 = 150 + 90 * Math.cos(rad);
                        const y1 = 150 + 90 * Math.sin(rad);
                        const x2 = 150 + 140 * Math.cos(rad);
                        const y2 = 150 + 140 * Math.sin(rad);
                        return (
                          <line
                            key={i}
                            x1={x1}
                            y1={y1}
                            x2={x2}
                            y2={y2}
                            stroke="var(--card-border)"
                            strokeWidth="0.5"
                            strokeDasharray="1"
                          />
                        );
                      })}

                      {/* Aspect Lines (Glowing aspects inside core) */}
                      {chartData.aspects.map((aspect, i) => (
                        <line
                          key={i}
                          x1={aspect.x1}
                          y1={aspect.y1}
                          x2={aspect.x2}
                          y2={aspect.y2}
                          className={`${aspect.color} opacity-75`}
                          strokeWidth="1.2"
                          strokeDasharray={aspect.type === "Square" ? "2 2" : "none"}
                        />
                      ))}

                      {/* Plotting Planets (As small circular node dots) */}
                      {chartData.planets.map((planet, i) => {
                        // Plot coordinates at radius 90
                        const rad = ((planet.angle - 90) * Math.PI) / 180;
                        const r = 90;
                        const px = 150 + r * Math.cos(rad);
                        const py = 150 + r * Math.sin(rad);

                        // Placement of label slightly further out
                        const lx = 150 + 102 * Math.cos(rad);
                        const ly = 150 + 102 * Math.sin(rad);

                        return (
                          <g key={i} className="group/planet">
                            {/* Connector line to outer edge */}
                            <line x1={px} y1={py} x2={150 + 115 * Math.cos(rad)} y2={150 + 115 * Math.sin(rad)} stroke="var(--card-border)" strokeWidth="0.5" />
                            {/* Planet Node dot */}
                            <circle
                              cx={px}
                              cy={py}
                              r="4"
                              className="fill-nebula-purple dark:fill-celestial-blue stroke-[var(--background)] stroke-2 group-hover/planet:r-6 group-hover/planet:fill-aurora-pink transition-all duration-300"
                            />
                            {/* Planet symbol label */}
                            <text
                              x={lx}
                              y={ly}
                              className="fill-foreground font-sans text-[9px] font-bold text-center"
                              textAnchor="middle"
                              alignmentBaseline="middle"
                            >
                              {planet.symbol}
                            </text>
                          </g>
                        );
                      })}

                      {/* Center Hub Core */}
                      <circle cx="150" cy="150" r="10" className="fill-[var(--background)] stroke-nebula-purple" strokeWidth="1" />
                      <circle cx="150" cy="150" r="2" className="fill-celestial-blue" />
                    </svg>
                  </div>

                  <div className="mt-4 flex flex-wrap justify-center gap-4 text-[9px] font-semibold text-muted uppercase tracking-widest">
                    <span className="flex items-center"><span className="w-2.5 h-0.5 bg-rose-500 mr-1.5" /> Opposition</span>
                    <span className="flex items-center"><span className="w-2.5 h-0.5 bg-sky-500 mr-1.5" /> Trine</span>
                    <span className="flex items-center"><span className="w-2.5 h-0.5 bg-violet-500 mr-1.5" /> Square</span>
                  </div>
                </div>

                {/* Data readout & interpretation */}
                <div className="lg:col-span-6 flex flex-col justify-between space-y-6">
                  
                  {/* Top Big Three Summary */}
                  <div className="glassmorphism rounded-3xl p-6 border border-[var(--card-border)] bg-gradient-to-br from-space-navy/40 to-cosmic-black/20">
                    <h4 className="text-[10px] font-bold uppercase tracking-widest text-muted mb-4">
                      The Cosmic Trinity (Big Three)
                    </h4>
                    <div className="grid grid-cols-3 gap-4">
                      {/* Sun */}
                      <div className="flex flex-col items-center p-3 rounded-xl bg-space-navy/5 dark:bg-space-navy/40 border border-[var(--card-border)]">
                        <Sun className="w-5 h-5 text-amber-500 mb-1" />
                        <span className="text-[9px] font-bold uppercase text-muted">Sun</span>
                        <span className="text-sm font-display font-extrabold">{chartData.sunSign}</span>
                      </div>
                      
                      {/* Moon */}
                      <div className="flex flex-col items-center p-3 rounded-xl bg-space-navy/5 dark:bg-space-navy/40 border border-[var(--card-border)]">
                        <Moon className="w-5 h-5 text-celestial-blue mb-1" />
                        <span className="text-[9px] font-bold uppercase text-muted">Moon</span>
                        <span className="text-sm font-display font-extrabold">{chartData.moonSign}</span>
                      </div>

                      {/* Ascendant */}
                      <div className="flex flex-col items-center p-3 rounded-xl bg-space-navy/5 dark:bg-space-navy/40 border border-[var(--card-border)]">
                        <Star className="w-5 h-5 text-nebula-purple mb-1" />
                        <span className="text-[9px] font-bold uppercase text-muted">Rising</span>
                        <span className="text-sm font-display font-extrabold">{chartData.ascendant}</span>
                      </div>
                    </div>
                  </div>

                  {/* Planetary Placements Table */}
                  <div className="glassmorphism rounded-3xl p-6 border border-[var(--card-border)] flex-grow overflow-y-auto no-scrollbar max-h-[220px]">
                    <h4 className="text-[10px] font-bold uppercase tracking-widest text-muted mb-3">
                      Planetary Coordinates
                    </h4>
                    <div className="divide-y divide-[var(--card-border)]/30">
                      {chartData.planets.map((planet) => (
                        <div key={planet.name} className="py-2.5 flex items-center justify-between text-xs">
                          <span className="font-semibold flex items-center">
                            <span className="w-5 text-center text-nebula-purple dark:text-celestial-blue font-bold text-sm mr-2">{planet.symbol}</span>
                            {planet.name}
                          </span>
                          <span className="opacity-80 text-muted">
                            {planet.degree}° {planet.sign}
                          </span>
                          <span className="px-2 py-0.5 rounded border border-[var(--card-border)]/60 bg-[var(--card-bg)] text-[9px] font-semibold text-muted uppercase">
                            House {planet.house}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Action buttons to recalculate */}
                  <div className="flex items-center space-x-4">
                    <button
                      onClick={() => setStep("input")}
                      className="p-4 rounded-full border border-[var(--card-border)] bg-[var(--card-bg)] hover:bg-nebula-purple/10 transition-colors cursor-pointer group flex items-center justify-center"
                      title="Generate New Chart"
                    >
                      <RefreshCw className="w-4 h-4 text-muted group-hover:rotate-180 transition-transform duration-500" />
                    </button>
                    
                    <a
                      href="#nova-ai"
                      className="flex-grow text-center px-6 py-4 rounded-full text-xs font-semibold uppercase tracking-wider text-white bg-gradient-to-r from-nebula-purple to-celestial-blue hover:from-celestial-blue hover:to-nebula-purple transition-all duration-500 shadow-md hover:shadow-celestial-blue/30"
                    >
                      Discuss Chart with Nova AI →
                    </a>
                  </div>

                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}
