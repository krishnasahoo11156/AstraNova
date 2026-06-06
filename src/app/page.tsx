import React from "react";
import Header from "@/components/Header";
import Hero from "@/components/Hero";
import Stats from "@/components/Stats";
import ZodiacExplorer from "@/components/ZodiacExplorer";
import BirthChartGenerator from "@/components/BirthChartGenerator";
import NovaAI from "@/components/NovaAI";
import Premium from "@/components/Premium";
import Testimonials from "@/components/Testimonials";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <>
      <Header />
      <main className="flex-grow flex flex-col">
        <Hero />
        <Stats />
        <ZodiacExplorer />
        <BirthChartGenerator />
        <NovaAI />
        <Premium />
        <Testimonials />
      </main>
      <Footer />
    </>
  );
}
