/* eslint-disable no-unused-vars */
import { useState } from "react";
import { motion } from "framer-motion";
import HeroButtons from "./HeroButtons";
import { ResumeModal } from "./ResumeModal";
import Subtext from "./subtext";
import "./bghero.css";

const Hero = ({ onScrollToWork  }) => {
  const [isResumeOpen, setIsResumeOpen] = useState(false);

  return (
    <section id="hero" className="relative min-h-screen flex items-center justify-center bg-diner-black overflow-hidden px-6">
      
      {/* LAYER 1: The Scrambling Background Words */}
      <Subtext />

      {/* LAYER 2: Main Content Container */}
      <div className="relative z-10 text-center flex flex-col items-center">
        
        {/* Status Badge */}
        <div className="mb-6 px-4 py-1 border border-diner-crimson/30 rounded-full bg-diner-crimson/10">
           <span className="text-[10px] font-black uppercase tracking-[0.4em] text-diner-crimson animate-pulse">
             System Active // 2026
           </span>
        </div>

        {/* The Title - Use a high-contrast shadow to make it pop over bg words */}
        <h1 className="text-6xl md:text-[120px] font-black uppercase tracking-tighter leading-[0.85] text-white drop-shadow-2xl">
          Key'n <br />
          <span className="text-diner-crimson">Brosdahl</span>
        </h1>

        {/* The Description - Clean and Readable */}
        <p className="mt-8 text-zinc-400 text-lg md:text-xl max-w-xl font-medium leading-relaxed">
          Crafting <span className="text-white">high-fidelity</span> interfaces with 
          technical precision and creative motion.
        </p>

        {/* The Buttons - Only render once! */}
        <div className="mt-10">
          <HeroButtons onOpenResume={() => setIsResumeOpen(true)}
           onScrollToWork={onScrollToWork} />
        </div>
      </div>

      <ResumeModal isOpen={isResumeOpen} onClose={() => setIsResumeOpen(false)} />
    </section>
  );
};

export default Hero;