import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, FileText, Download } from "lucide-react";
import { useReactToPrint } from "react-to-print"; // Library for generating PDF via print dialog
import { Button } from "../ui/Button";
import { RESUME } from "./RESUME";
import heroBG from "../../assets/BG_Hero.jpg";
import bgv from "../../assets/bg-vid.mp4";

/**
 * Hero section component - The primary landing view of the portfolio.
 */
const Hero = () => {
  const heroRef = useRef(null);
  const resumeRef = useRef(null); // Ref for the resume content to be printed/saved
  const [isVisible, setIsVisible] = useState(false);
  const [isResumeOpen, setIsResumeOpen] = useState(false);

  // Logic to handle PDF Generation (via Browser Print Context)
  const handlePrint = useReactToPrint({
    contentRef: resumeRef,
    documentTitle: "Keyn_Brosdahl_Resume",
  });

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.1 }
    );

    const currentRef = heroRef.current;
    if (currentRef) observer.observe(currentRef);

    return () => {
      if (currentRef) observer.unobserve(currentRef);
    };
  }, []);

  const containerVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.8, ease: "easeOut", staggerChildren: 0.2 },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: "easeOut" },
    },
  };

  return (
    <section
      id="hero"
      className="hero min-h-screen relative flex flex-col justify-center items-center overflow-hidden px-6 md:px-12 py-32"
      ref={heroRef}
    >
      <img
        src={heroBG}
        alt="Hero Background"
        className="absolute inset-0 w-full h-full object-cover blur-lg invert brightness-90 z-[-1]"
      />

      <motion.div
        className="hero__container relative w-full max-w-7xl z-10"
        initial="hidden"
        animate={isVisible ? "visible" : "hidden"}
        variants={containerVariants}
      >
        <div className="hero__content relative min-h-[80vh] flex flex-col justify-center overflow-hidden rounded-2xl glass-panel p-8 md:p-16">
          <div
            className="absolute inset-0 z-0 opacity-10
            bg-[linear-gradient(to_right,#e2e8f0_1px,transparent_1px),linear-gradient(to_bottom,#e2e8f0_1px,transparent_1px)]
            bg-[size:20px_30px]"
          />

          <video
            src={bgv}
            autoPlay
            muted
            loop
            playsInline
            className="absolute inset-0 h-full w-full object-cover blur-none brightness-75 contrast-125 saturate-150 z-[-1]"
          />

          <motion.div
            variants={itemVariants}
            className="relative z-20 mb-8 inline-block"
          >
            <h1 className="text-white text-4xl md:text-5xl font-black tracking-tight uppercase">
              Key'n Brosdahl
            </h1>
          </motion.div>

          <motion.div variants={itemVariants} className="hero__eyebrow mb-6">
            <span className="hero__eyebrow-text inline-block text-lg md:text-xl uppercase tracking-[0.2em] font-bold animate-color-shift">
              Software Engineer & Designer
            </span>
          </motion.div>

          <motion.div
            variants={itemVariants}
            className="flex justify-end mb-8 relative z-30"
          >
            <button
              onClick={() => setIsResumeOpen(true)}
              className="max-w-[80%] md:max-w-[60%] px-6 py-4 bg-black/80 text-pacers-gold hover:text-white border-2 border-pacers-gold/30 hover:border-pacers-gold transition-all shadow-2xl shadow-pacers-gold/10 font-bold rounded-3xl rounded-tr-none flex items-center gap-3 active:scale-95"
            >
              <FileText size={18} />
              <span>
                if you don't want to go through the motions, click here!
              </span>
            </button>
          </motion.div>

          <motion.h2
            variants={itemVariants}
            className="hero__headline text-4xl md:text-7xl font-black leading-tight text-white mb-8 max-w-4xl uppercase tracking-tighter"
          >
            Translating design intent into{" "}
            <span className="text-pacers-gold">polished</span>,{" "}
            <span className="text-pacers-gold">intelligent</span> UI
          </motion.h2>

          <motion.p
            variants={itemVariants}
            className="hero__subheadline text-xl md:text-2xl font-medium text-zinc-200 mb-12 max-w-2xl leading-relaxed opacity-75"
          >
            Specializing in{" "}
            <strong className="text-pacers-gold">
              React, Python, and Machine Learning
            </strong>
            . Bridging the gap between design and high-performance engineering.
          </motion.p>

          <motion.div
            variants={itemVariants}
            className="hero__cta flex flex-wrap gap-6"
          >
            <Button size="lg" className="w-full md:w-auto rounded-full">
              <a href="#work">Explore Work</a>
            </Button>
            <Button
              variant="secondary"
              size="lg"
              className="w-full md:w-auto rounded-full"
            >
              <a href="#contact">Get In Touch</a>
            </Button>
          </motion.div>
        </div>

        <div className="hero__decoration absolute top-0 right-0 w-1/2 h-full pointer-events-none opacity-20 hidden lg:block">
          <div className="hero__decoration-circle--1 absolute w-96 h-96 top-10 right-10 rounded-full bg-pacers-navy blur-[150px] animate-float"></div>
          <div className="hero__decoration-line absolute top-1/2 right-0 w-[2px] h-48 bg-linear-to-b from-transparent via-pacers-navy to-transparent -translate-y-1/2"></div>
        </div>
      </motion.div>

      <div className="hero__scroll-indicator absolute bottom-12 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 opacity-40">
        <span className="text-[8px] font-black uppercase tracking-[0.5em] text-white">
          Scroll
        </span>
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          className="w-px h-12 bg-linear-to-b from-pacers-gold to-transparent"
        />
      </div>

      {/* Resume Modal Implementation */}
      <AnimatePresence>
        {isResumeOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-1000 flex items-center justify-center p-4 md:p-8 bg-black/90 backdrop-blur-xl"
            onClick={() => setIsResumeOpen(false)}
          >
            <motion.div
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 20 }}
              className="bg-zinc-900 border border-white/10 w-full max-w-4xl max-h-[90vh] rounded-4xl overflow-hidden flex flex-col relative"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="p-6 md:p-10 border-b border-white/5 flex justify-between items-center bg-zinc-900/50 sticky top-0 z-10">
                <div className="flex items-center gap-4">
                  <div className="p-3 bg-pacers-gold rounded-xl text-pacers-navy">
                    <FileText size={24} />
                  </div>
                  <div>
                    <h3 className="text-2xl font-black text-white uppercase tracking-tighter">
                      My Résumé
                    </h3>
                    <p className="text-xs text-zinc-500 font-bold uppercase tracking-widest">
                      Digital Curriculum Vitae
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-4 relative z-50">
                  <button
                    onClick={() => setIsResumeOpen(false)}
                    className="p-3 rounded-full hover:bg-white/10 text-white transition-colors cursor-pointer"
                    aria-label="Close modal"
                  >
                    <X size={24} />
                  </button>
                </div>
              </div>

              {/* Modal Body: This is the area that will be converted to PDF */}
              <div className="grow overflow-y-auto p-8 md:p-16 custom-scrollbar bg-zinc-900 text-zinc-300">
                <div
                  ref={resumeRef}
                  className="prose prose-invert max-w-none print:p-8 print:bg-white print:text-black"
                >
                  <RESUME />
                </div>
              </div>

              <div className="p-6 bg-zinc-950 border-t border-white/5 flex justify-center">
                <Button
                  variant="primary"
                  className="rounded-full px-12 gap-3 group"
                  onClick={handlePrint}
                >
                  <Download
                    size={18}
                    className="group-hover:translate-y-1 transition-transform"
                  />
                  <span>Download PDF</span>
                </Button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};

export default Hero;
