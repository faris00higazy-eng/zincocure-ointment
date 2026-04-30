/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { motion, useScroll, useTransform, AnimatePresence } from 'motion/react';
import { Leaf, Droplets, Hexagon, ShieldCheck, Sparkles } from 'lucide-react';
import { useState, useEffect, useRef, type ReactNode } from 'react';

// Hero Image Path from generation
const HERO_IMAGE = "/src/assets/images/zincocure_hero_jar_1777566982378.png";

const Scene = ({ children, className = "" }: { children: ReactNode, className?: string }) => (
  <section className={`min-h-screen relative flex items-center justify-center overflow-hidden px-6 ${className}`}>
    {children}
  </section>
);

const FloatingParticles = () => (
  <div className="absolute inset-0 pointer-events-none overflow-hidden">
    {[...Array(20)].map((_, i) => (
      <motion.div
        key={i}
        className="absolute w-1 h-1 bg-gold rounded-full opacity-30"
        initial={{ 
          x: Math.random() * 100 + "%", 
          y: Math.random() * 100 + "%",
          scale: Math.random() * 2
        }}
        animate={{
          y: [null, "-20%", "20%"],
          opacity: [0.2, 0.6, 0.2],
        }}
        transition={{
          duration: 5 + Math.random() * 5,
          repeat: Infinity,
          ease: "easeInOut",
          delay: Math.random() * 5
        }}
      />
    ))}
  </div>
);

export default function App() {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  const jarOpacity = useTransform(scrollYProgress, [0, 0.1, 0.8, 0.9], [0, 1, 1, 0]);
  const jarScale = useTransform(scrollYProgress, [0.1, 0.4, 0.8], [0.8, 1.1, 1]);
  const turquoisePulse = useTransform(scrollYProgress, [0, 0.5, 1], ["rgba(0,43,43,1)", "rgba(0,128,128,0.8)", "rgba(0,43,43,1)"]);

  return (
    <div ref={containerRef} className="cinematic-bg selection:bg-turquoise/30">
      <FloatingParticles />

      {/* FIXED BACKGROUND ELEMENTS */}
      <div className="fixed inset-0 pointer-events-none z-0">
        <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] bg-turquoise/10 bokeh rounded-full animate-float" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[60%] h-[60%] bg-teal-dark/10 bokeh rounded-full animate-float" style={{ animationDelay: '2s' }} />
      </div>

      {/* SCENE 1: OPENING & JAR REVEAL */}
      <Scene>
        <div className="z-10 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.5, ease: "easeOut" }}
            className="mb-8"
          >
            <span className="text-secondary text-xs uppercase tracking-[0.4em] mb-4 block opacity-60">Pure Clinical Excellence</span>
            <h1 className="font-serif text-6xl md:text-8xl italic font-light tracking-tight leading-none text-glow">
              Zinco<span className="text-turquoise">Cure</span>
            </h1>
          </motion.div>
        </div>

        <motion.div 
          style={{ opacity: jarOpacity, scale: jarScale }}
          className="fixed inset-0 flex items-center justify-center z-10 pointer-events-none"
        >
          <div className="relative group">
             {/* Glow behind product */}
             <div className="absolute inset-0 bg-turquoise/20 blur-[100px] rounded-full scale-110 group-hover:bg-turquoise/30 transition-all duration-1000" />
             <img 
               src={HERO_IMAGE} 
               alt="ZincoCure Jar" 
               className="max-h-[60vh] object-contain drop-shadow-[0_20px_50px_rgba(0,0,0,0.5)]"
               referrerPolicy="no-referrer"
             />
          </div>
        </motion.div>
      </Scene>

      {/* SCENE 2: INGREDIENTS ANIMATION */}
      <Scene className="flex-col !justify-start pt-32">
        <div className="z-20 w-full max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-12 mt-40">
          {[
            { icon: Leaf, label: "Green Olives", desc: "Premium hydration", delay: 0.2 },
            { icon: Droplets, label: "Golden Oil", desc: "Soul of nature", delay: 0.4 },
            { icon: Hexagon, label: "Honeycomb", desc: "Protective richness", delay: 0.6 },
          ].map((item, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, scale: 0.9, y: 50 }}
              whileInView={{ opacity: 1, scale: 1, y: 0 }}
              transition={{ delay: item.delay, duration: 1 }}
              className="glass-morphism p-12 rounded-3xl text-center group cursor-default hover:border-turquoise/50 transition-colors"
            >
              <div className="mx-auto w-20 h-20 mb-8 rounded-full bg-turquoise/10 flex items-center justify-center group-hover:bg-turquoise/20 transition-all duration-500">
                <item.icon className="w-10 h-10 text-turquoise group-hover:text-white transition-colors" />
              </div>
              <h3 className="font-serif text-2xl italic mb-3 group-hover:text-turquoise transition-colors">{item.label}</h3>
              <p className="text-sm tracking-wider opacity-60 group-hover:opacity-100 transition-opacity uppercase font-light">{item.desc}</p>
            </motion.div>
          ))}
        </div>
      </Scene>

      {/* SCENE 3: PHILOSOPHY */}
      <Scene>
        <div className="z-20 max-w-3xl text-center">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 2 }}
          >
            <h2 className="font-serif text-5xl md:text-7xl italic leading-tight mb-8">
              "From nature <br /> <span className="opacity-40">to you"</span>
            </h2>
            <div className="h-0.5 w-24 bg-turquoise mx-auto mb-8" />
            <p className="text-lg leading-relaxed font-light tracking-wide opacity-70">
              A meticulously crafted formula derived from the purest botanical extracts, 
              designed to restore and protect with clinical precision.
            </p>
          </motion.div>
        </div>
      </Scene>

      {/* SCENE 4: FINAL SETUP & CALL TO ACTION */}
      <Scene className="flex-col">
        <div className="z-20 text-center mt-[40vh]">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
          >
            <h4 className="text-turquoise uppercase tracking-[0.5em] text-sm mb-12">Experience the Cure</h4>
            <div className="flex flex-col md:flex-row gap-6 justify-center items-center">
              <button className="px-12 py-5 bg-turquoise text-teal-deep font-medium rounded-full hover:bg-white hover:scale-105 transition-all duration-300 shadow-[0_0_30px_rgba(64,224,208,0.4)]">
                Order Now
              </button>
              <button className="px-12 py-5 glass-morphism rounded-full hover:bg-white/10 transition-all duration-300">
                Explore Science
              </button>
            </div>
            
            <div className="mt-40 grid grid-cols-2 md:grid-cols-4 gap-12 opacity-40">
              <div className="flex flex-col items-center gap-2">
                <ShieldCheck className="w-6 h-6" />
                <span className="text-[10px] uppercase tracking-widest">Dermatologist Tested</span>
              </div>
              <div className="flex flex-col items-center gap-2">
                <Sparkles className="w-6 h-6" />
                <span className="text-[10px] uppercase tracking-widest">100% Organic Extracts</span>
              </div>
              <div className="flex flex-col items-center gap-2">
                <Leaf className="w-6 h-6" />
                <span className="text-[10px] uppercase tracking-widest">Cruelty Free</span>
              </div>
              <div className="flex flex-col items-center gap-2">
                <Droplets className="w-6 h-6" />
                <span className="text-[10px] uppercase tracking-widest">Paraben Free</span>
              </div>
            </div>
          </motion.div>
        </div>
      </Scene>

      {/* FOOTER */}
      <footer className="relative py-12 px-6 border-t border-white/10 z-20">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="font-serif italic text-2xl">Zinco<span className="text-turquoise">Cure</span></div>
          <div className="text-[10px] uppercase tracking-[0.3em] opacity-40">© 2026 ZincoCure Laboratories. All Rights Reserved.</div>
        </div>
      </footer>
    </div>
  );
}
