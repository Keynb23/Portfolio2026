import { useRef, useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion"; // For smoother tab switching
import { Button } from "../ui/Button"; // Reusable Pacers-themed button

/**
 * Skill item configuration with emoji icons
 */
const skillItems = [
  { name: "HTML5", icon: "🟧" },
  { name: "CSS3", icon: "🟦" },
  { name: "JavaScript", icon: "🟨" },
  { name: "TypeScript", icon: "🔷" },
  { name: "React", icon: "⚛️" },
  { name: "TailwindCSS", icon: "🌬️" },
  { name: "Node.js", icon: "🟢" },
  { name: "Git", icon: "🔧" },
  { name: "Python", icon: "🐍" },
  { name: "C#", icon: "♯" },
];

/**
 * Tools and software configuration
 */
const toolsItems = [
  { name: "VS Code", icon: "🖥️" },
  { name: "Visual Studios", icon: "🖥️" },
  { name: "GitHub", icon: "🐙" },
  { name: "Postman", icon: "📬" },
  { name: "Firebase", icon: "🔥" },
  { name: "Vercel", icon: "🚀" },
  { name: "Netlify", icon: "🛰️" },
  { name: "MySQL", icon: "🗄️" },
  { name: "Blender", icon: "🧩" },
  { name: "Unreal Engine", icon: "🎮" },
];

/**
 * Skills Component - Showcases technical expertise and toolset.
 */
const Skills = () => {
  const sectionRef = useRef(null);
  const [isVisible, setIsVisible] = useState(false);
  const [activeTab, setActiveTab] = useState("skills");

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          obs.disconnect();
        }
      },
      { threshold: 0.12 },
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  const renderGrid = (items) => (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
      transition={{ duration: 0.5 }}
      className="w-full"
    >
      <div className="grid grid-cols-2 sm:grid-cols-3 xl:grid-cols-4 gap-8 w-full">
        {items.map((item, i) => (
          <motion.div
            key={item.name}
            className="aspect-square flex flex-col items-center justify-center p-6 rounded-3xl bg-diner-dark-graphite/40 border border-white/5 shadow-xl transition-all duration-500 hover:border-diner-crimson/50 hover:bg-diner-dark-graphite/60 group"
            animate={isVisible ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ delay: 0.1 + i * 0.04 }}
          >
            <div className="text-4xl mb-4 group-hover:-translate-y-2 transition-transform duration-300">
              {item.icon}
            </div>
            <div className="text-[10px] text-diner-silver font-black text-center uppercase tracking-[0.2em]">
              {item.name}
            </div>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );

  return (
    <section
      id="skills"
      ref={sectionRef}
      className="skills w-full min-h-screen flex flex-col justify-center bg-diner-black relative overflow-hidden pt-48 pb-24"
    >
      <div className="container mx-auto px-10 md:px-20">
        <div className="flex flex-col lg:flex-row items-start justify-between gap-16 lg:gap-32">
          <div
            className={`flex-1 transition-all duration-1000 ease-out ${isVisible ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-12"}`}
          >
            <div className="flex">
              <div className="hidden md:flex flex-col items-center mr-16 pt-4">
                <span className="rotate-180 [writing-mode:vertical-lr] text-[10px] tracking-[0.5em] uppercase text-diner-silver/30 font-black mb-12">
                  Technical Arsenal
                </span>
                <div className="w-px h-48 bg-linear-to-b from-diner-crimson to-diner-silver opacity-50" />
              </div>

              <div>
                <h2 className="text-6xl md:text-8xl font-black text-white leading-[0.9] tracking-tighter uppercase">
                  Explore My
                  <br />
                  <span className="text-diner-crimson">Expertise</span> &amp;
                  <br />
                  Tech Stack
                </h2>
                <p className="mt-12 text-diner-silver text-xl leading-relaxed max-w-xl font-medium opacity-80">
                  These are the tools and technologies that I use daily to
                  develop high-performance applications.
                </p>
                <div className="mt-16 flex gap-6">
                  <Button
                    variant={activeTab === "skills" ? "primary" : "secondary"}
                    onClick={() => setActiveTab("skills")}
                  >
                    Skills
                  </Button>
                  <Button
                    variant={activeTab === "tools" ? "primary" : "secondary"}
                    onClick={() => setActiveTab("tools")}
                  >
                    Tools
                  </Button>
                </div>
              </div>
            </div>
          </div>

          <div
            className={`flex-1 w-full transition-all duration-1000 ${isVisible ? "opacity-100" : "opacity-0"}`}
          >
            <AnimatePresence mode="wait">
              {activeTab === "skills"
                ? renderGrid(skillItems)
                : renderGrid(toolsItems)}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Skills;
