"use client";

import React from "react";
import { motion } from "framer-motion";
import { Check, Star, Zap, ShieldAlert } from "lucide-react";

export default function Premium() {
  const plans = [
    {
      name: "Free Alignment",
      price: "$0",
      period: "forever",
      desc: "Basic natal calculations and static zodiac reports.",
      features: [
        "Standard natal chart calculation",
        "Sun/Moon/Rising coordinates",
        "Daily general horoscope forecast",
        "Basic Nova AI queries (5/day)",
      ],
      cta: "Get Started",
      accent: "border-[var(--card-border)]",
      popular: false,
    },
    {
      name: "Cosmic Pro",
      price: "$19",
      period: "monthly",
      desc: "Deep-dive interpretations, infinite chatbot, and real-time transits.",
      features: [
        "Everything in Free Alignment",
        "Unlimited Nova AI queries",
        "Detailed planetary house analysis",
        "Monthly custom PDF cosmic report",
        "Romantic & Career synastry maps",
      ],
      cta: "Activate Pro",
      accent: "border-nebula-purple cosmic-glow-purple",
      popular: true,
    },
    {
      name: "Cosmic Elite",
      price: "$49",
      period: "monthly",
      desc: "One-on-one virtual astrologer pairing and 12-month timeline maps.",
      features: [
        "Everything in Cosmic Pro",
        "Interactive 12-month future timeline",
        "Vedic & Hellenistic secondary charts",
        "Pairing with live certified astrologers",
        "Priority AI model rendering speed",
      ],
      cta: "Join the Elite",
      accent: "border-celestial-blue cosmic-glow-blue",
      popular: false,
    },
  ];

  return (
    <section className="py-24 relative overflow-hidden" id="pricing">
      {/* Background Starry Overlay */}
      <div className="absolute inset-0 space-stars -z-10" />

      {/* Ambient Radial Lights */}
      <div className="absolute top-1/2 left-1/4 -translate-y-1/2 -translate-x-1/2 w-[35rem] h-[35rem] rounded-full bg-nebula-purple/5 blur-[130px] -z-10 animate-pulse-slow" />
      <div className="absolute top-1/2 right-1/4 -translate-y-1/2 translate-x-1/2 w-[30rem] h-[30rem] rounded-full bg-celestial-blue/5 blur-[120px] -z-10 animate-pulse-slow" style={{ animationDelay: "3s" }} />

      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center max-w-2xl mx-auto mb-20">
          <div className="flex items-center justify-center space-x-2 mb-3">
            <Zap className="w-5 h-5 text-nebula-purple dark:text-celestial-blue" />
            <span className="text-xs font-bold uppercase tracking-widest text-muted">Membership tiers</span>
          </div>
          <h2 className="font-display text-3xl sm:text-4xl font-extrabold mb-4">
            Unlock AstroNova Premium
          </h2>
          <p className="text-sm sm:text-base opacity-75 text-muted">
            Choose a plan that fits your spiritual growth path. Unlock deep astronomical correlations and unlimited AI consultations.
          </p>
        </div>

        {/* Pricing Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-stretch max-w-6xl mx-auto">
          {plans.map((plan, i) => (
            <motion.div
              key={i}
              className={`glassmorphism rounded-3xl p-8 relative flex flex-col justify-between border ${plan.accent} transition-transform duration-300 hover:-translate-y-2`}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: i * 0.15 }}
            >
              {/* Popular Tag */}
              {plan.popular && (
                <div className="absolute top-0 right-8 -translate-y-1/2 px-4 py-1.5 rounded-full bg-gradient-to-r from-nebula-purple to-celestial-blue text-[10px] font-bold text-white uppercase tracking-widest flex items-center space-x-1.5 shadow-md">
                  <Star className="w-3 h-3 fill-white" />
                  <span>Highly resonant</span>
                </div>
              )}

              <div>
                {/* Plan Header */}
                <h3 className="font-display text-xl font-bold tracking-tight mb-2">
                  {plan.name}
                </h3>
                <p className="text-xs opacity-75 text-muted mb-6 leading-relaxed">
                  {plan.desc}
                </p>

                {/* Price */}
                <div className="flex items-baseline mb-8">
                  <span className="text-5xl font-display font-extrabold tracking-tight">
                    {plan.price}
                  </span>
                  <span className="text-sm opacity-60 text-muted ml-2">
                    / {plan.period}
                  </span>
                </div>

                {/* Features List */}
                <ul className="space-y-4 mb-8">
                  {plan.features.map((feature, fIndex) => (
                    <li key={fIndex} className="flex items-start text-xs sm:text-sm">
                      <div className="p-0.5 rounded-full bg-nebula-purple/10 text-nebula-purple mr-3 mt-0.5 flex-shrink-0">
                        <Check className="w-3.5 h-3.5" />
                      </div>
                      <span className="opacity-90 text-muted">{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Action CTA */}
              <button
                className={`w-full py-4 rounded-xl text-xs font-bold uppercase tracking-widest transition-all duration-300 cursor-pointer ${
                  plan.popular
                    ? "bg-gradient-to-r from-nebula-purple via-aurora-pink to-celestial-blue text-white shadow-lg shadow-nebula-purple/20 hover:scale-[1.03]"
                    : "border border-[var(--card-border)] bg-[var(--card-bg)] hover:bg-nebula-purple/5 text-muted hover:text-foreground"
                }`}
              >
                {plan.cta}
              </button>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
