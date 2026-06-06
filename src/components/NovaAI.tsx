"use client";

import React, { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Send, Bot, User, Sparkles, AlertCircle, Compass } from "lucide-react";

interface Message {
  id: string;
  sender: "user" | "nova";
  text: string;
  timestamp: Date;
}

const SUGGESTIONS = [
  "What does my Mercury retrograde transit mean?",
  "Are Taurus and Scorpio compatible in love?",
  "Tell me about my career path as a Capricorn Sun.",
  "How does the Moon phase affect my sleep cycle?",
];

const PREDEFINED_RESPONSES: Record<string, string> = {
  "what does my mercury retrograde transit mean?": 
    "Mercury retrograde is a cosmic invitation to slow down, review, and redirect. In luxury astrological terms, consider it a code refactor for your life. Avoid signing major contracts or starting massive projects; instead, focus on finishing what you've started, reconciling old relationships, and sharpening your internal compass. Expect minor communication static, but use it to listen closer.",
  "are taurus and scorpio compatible in love?":
    "Taurus and Scorpio sit directly opposite each other on the zodiac wheel, creating a high-voltage axis of magnetic attraction. Taurus represents material comfort, stability, and peaceful growth, while Scorpio represents emotional depth, mystery, and raw transformation. This is a legendary match: Taurus provides the safe harbor Scorpio secretly craves, while Scorpio offers the profound intensity Taurus needs to break out of comfort zones. Trust is their ultimate currency.",
  "tell me about my career path as a capricorn sun.":
    "As a Capricorn Sun, your career is a structural masterpiece. Ruled by Saturn, the planet of discipline and time, you are suited for executive leadership, long-term investments, architectural planning, and enterprise building. You scale the mountain of success methodically, valuing integrity and legacy over quick wins. Look to align with roles that offer autonomy, clear hierarchies, and substantial systemic impact.",
  "how does the moon phase affect my sleep cycle?":
    "Astrological ephemeris and biophysical studies show that the Full Moon represents the peak of emotional and tidal gravity. During a Full Moon, your pineal gland responds to subtle light increases and cosmic shifts, often leading to vivid dreams, slightly shorter deep sleep cycles, and elevated creative energy. Use the waxing moon phases to build momentum, and the waning moon phases to wind down and detoxify.",
};

const DEFAULT_AI_RESPONSE = 
  "The planetary alignments indicate a shift in your sector of introspection. To decode this fully, please specify your query or click on one of the cosmic prompts below. I am ready to scan the ephemeris for you.";

export default function NovaAI() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "welcome",
      sender: "nova",
      text: "Greetings, traveler. I am Nova, your AI cosmic assistant. Ask me anything about planetary movements, compatibility, birth charts, or the current astrological weather.",
      timestamp: new Date(),
    },
  ]);
  const [inputValue, setInputValue] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  
  const chatEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isTyping]);

  const handleSend = (text: string) => {
    if (!text.trim()) return;

    const userMessage: Message = {
      id: Math.random().toString(),
      sender: "user",
      text: text,
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInputValue("");
    setIsTyping(true);

    // Simulate AI computing response
    setTimeout(() => {
      const query = text.toLowerCase().trim().replace(/[?.]/g, "");
      
      let answer = DEFAULT_AI_RESPONSE;
      // Match key phrases from prompt
      for (const [key, value] of Object.entries(PREDEFINED_RESPONSES)) {
        if (query.includes(key) || key.includes(query)) {
          answer = value;
          break;
        }
      }

      const aiResponse: Message = {
        id: Math.random().toString(),
        sender: "nova",
        text: answer,
        timestamp: new Date(),
      };

      setMessages((prev) => [...prev, aiResponse]);
      setIsTyping(false);
    }, 2000);
  };

  return (
    <section className="py-24 relative overflow-hidden" id="nova-ai">
      {/* Starry background */}
      <div className="absolute inset-0 space-stars -z-10" />

      {/* Ambient glows */}
      <div className="absolute top-10 left-10 w-[30rem] h-[30rem] rounded-full bg-nebula-purple/5 blur-[120px] -z-10 animate-pulse-slow" />
      <div className="absolute bottom-10 right-10 w-[35rem] h-[35rem] rounded-full bg-celestial-blue/5 blur-[120px] -z-10" />

      <div className="max-w-5xl mx-auto px-6">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <div className="flex items-center justify-center space-x-2 mb-3">
            <Bot className="w-5 h-5 text-nebula-purple dark:text-celestial-blue" />
            <span className="text-xs font-bold uppercase tracking-widest text-muted">Nova AI Assistant</span>
          </div>
          <h2 className="font-display text-3xl sm:text-4xl font-extrabold mb-4">
            Consult the Cosmic Assistant
          </h2>
          <p className="text-sm sm:text-base opacity-75 text-muted">
            Ask Nova, our specialized neural model, to decode complicated transits, calculate synastry, or suggest paths forward.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          {/* Info and suggestions */}
          <div className="lg:col-span-4 flex flex-col justify-between space-y-6">
            <div className="glassmorphism rounded-3xl p-6 border border-[var(--card-border)] bg-gradient-to-br from-space-navy/40 to-cosmic-black/20 flex flex-col justify-center">
              <div className="flex items-center space-x-3 mb-4">
                <div className="w-8 h-8 rounded-full bg-gradient-to-br from-nebula-purple to-celestial-blue flex items-center justify-center animate-pulse">
                  <Sparkles className="w-4 h-4 text-white" />
                </div>
                <h4 className="font-display font-bold text-sm tracking-wide">
                  Suggested Queries
                </h4>
              </div>
              <p className="text-xs opacity-75 text-muted leading-relaxed mb-4">
                Click any prompt to instantly query Nova's astrology models:
              </p>
              <div className="space-y-2.5">
                {SUGGESTIONS.map((s) => (
                  <button
                    key={s}
                    onClick={() => handleSend(s)}
                    disabled={isTyping}
                    className="w-full text-left text-xs p-3 rounded-xl border border-[var(--card-border)] bg-[var(--card-bg)] hover:bg-nebula-purple/5 hover:border-nebula-purple/40 transition-all duration-300 disabled:opacity-50 cursor-pointer block"
                  >
                    {s}
                  </button>
                ))}
              </div>
            </div>

            <div className="glassmorphism rounded-2xl p-4 border border-[var(--card-border)] bg-amber-500/5 flex items-start space-x-3">
              <AlertCircle className="w-5 h-5 text-amber-500 flex-shrink-0 mt-0.5" />
              <div>
                <h5 className="font-bold text-xs uppercase tracking-wider text-foreground">Astro AI Disclaimer</h5>
                <p className="text-[10px] text-muted opacity-85 mt-1 leading-relaxed">
                  Nova AI outputs simulated interpretations of planetary cycles and should not replace professional, financial, or medical guidance.
                </p>
              </div>
            </div>
          </div>

          {/* Active Chat Panel */}
          <div className="lg:col-span-8 glassmorphism rounded-3xl border border-[var(--card-border)] flex flex-col h-[480px] overflow-hidden bg-gradient-to-br from-space-navy/50 to-cosmic-black/30 dark:from-space-navy/50 dark:to-cosmic-black/30 light:from-white light:to-slate-50 shadow-lg">
            {/* Chat Header */}
            <div className="px-6 py-4 border-b border-[var(--card-border)]/40 flex items-center justify-between bg-[var(--card-bg)]">
              <div className="flex items-center space-x-3">
                <div className="relative">
                  <div className="w-9 h-9 rounded-full bg-space-navy border border-nebula-purple flex items-center justify-center">
                    <Compass className="w-5 h-5 text-nebula-purple animate-spin-slow" />
                  </div>
                  <span className="absolute bottom-0 right-0 w-2.5 h-2.5 rounded-full bg-emerald-500 border-2 border-[var(--background)]" />
                </div>
                <div>
                  <h4 className="font-bold text-xs">Nova AI</h4>
                  <span className="text-[9px] text-emerald-500 font-semibold uppercase tracking-wider">Online & Aligning</span>
                </div>
              </div>
            </div>

            {/* Chat Body Messages */}
            <div className="flex-grow p-6 overflow-y-auto no-scrollbar space-y-4">
              {messages.map((m) => (
                <div
                  key={m.id}
                  className={`flex items-start space-x-3 max-w-[85%] ${
                    m.sender === "user" ? "ml-auto flex-row-reverse space-x-reverse" : "mr-auto"
                  }`}
                >
                  <div
                    className={`w-7 h-7 rounded-full flex items-center justify-center flex-shrink-0 border ${
                      m.sender === "user"
                        ? "bg-[var(--card-bg)] border-[var(--card-border)] text-muted"
                        : "bg-gradient-to-br from-nebula-purple to-celestial-blue border-transparent text-white"
                    }`}
                  >
                    {m.sender === "user" ? <User className="w-3.5 h-3.5" /> : <Bot className="w-3.5 h-3.5" />}
                  </div>

                  <div
                    className={`p-3.5 rounded-2xl text-xs sm:text-sm leading-relaxed ${
                      m.sender === "user"
                        ? "bg-gradient-to-r from-nebula-purple to-celestial-blue text-white rounded-tr-none"
                        : "bg-[var(--card-bg)] border border-[var(--card-border)] text-foreground rounded-tl-none"
                    }`}
                  >
                    {m.text}
                  </div>
                </div>
              ))}

              {isTyping && (
                <div className="flex items-start space-x-3 mr-auto max-w-[85%]">
                  <div className="w-7 h-7 rounded-full bg-gradient-to-br from-nebula-purple to-celestial-blue flex items-center justify-center border-transparent text-white">
                    <Bot className="w-3.5 h-3.5" />
                  </div>
                  <div className="p-3.5 rounded-2xl rounded-tl-none bg-[var(--card-bg)] border border-[var(--card-border)] text-foreground flex items-center space-x-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-nebula-purple animate-bounce" style={{ animationDelay: "0ms" }} />
                    <span className="w-1.5 h-1.5 rounded-full bg-nebula-purple animate-bounce" style={{ animationDelay: "150ms" }} />
                    <span className="w-1.5 h-1.5 rounded-full bg-nebula-purple animate-bounce" style={{ animationDelay: "300ms" }} />
                  </div>
                </div>
              )}
              
              <div ref={chatEndRef} />
            </div>

            {/* Chat Input Footer */}
            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleSend(inputValue);
              }}
              className="p-4 border-t border-[var(--card-border)]/40 bg-[var(--card-bg)] flex items-center space-x-3"
            >
              <input
                type="text"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                placeholder="Ask about your birth chart, transits..."
                className="flex-grow px-4 py-3 rounded-xl border border-[var(--card-border)] bg-[var(--background)] text-foreground placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-nebula-purple/50 focus:border-nebula-purple text-xs sm:text-sm"
              />
              <button
                type="submit"
                disabled={!inputValue.trim() || isTyping}
                className="p-3.5 rounded-xl bg-gradient-to-r from-nebula-purple to-celestial-blue hover:scale-105 disabled:opacity-50 text-white cursor-pointer transition-all duration-300 flex items-center justify-center"
              >
                <Send className="w-4 h-4" />
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
