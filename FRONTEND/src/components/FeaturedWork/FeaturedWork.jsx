import { useEffect, useRef, useState } from "react";
import { useBionic } from "../../context/BionicContext"; 
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const FeaturedWork = () => {
  const { isBionicMode, toggleBionic, formatText } = useBionic();
  const triggerRef = useRef(null);
  const trackRef = useRef(null);
  const [isVisible, setIsVisible] = useState(false);

  const projects = [
    {
      id: 1,
      title: "Bionic Reading App",
      subtitle: "Enhanced Reading Experience",
      description: "A React-based reading application featuring a unique 'Tunnel Vision' mode that highlights visual anchors to improve reading speed and comprehension.",
      tech: ["React", "TypeScript", "CSS Grid"],
      highlights: ["Custom visual anchor algorithm", "Tunnel Vision UI", "Real-time processing"],
      github: "https://github.com/Keynb23/Reading",
    },
    {
      id: 2,
      title: "Typing Speed + ML",
      subtitle: "Linear Regression Model",
      description: "Machine learning application that predicts typing speed improvements using Linear Regression and real-time performance tracking.",
      tech: ["React", "Python", "scikit-learn"],
      highlights: ["Linear Regression prediction", "Asynchronous pipeline", "Trend analysis"],
      github: "https://github.com/Keynb23/typing-speed-test-main",
    },
    {
      id: 3,
      title: "NexusData",
      subtitle: "AI Intelligence Ingestion",
      description: "High-performance FastAPI backend designed to transform unstructured text into clean intelligence using NLP.",
      tech: ["Python", "FastAPI", "spaCy NLP"],
      highlights: ["Automated NLP ingestion", "Entity Resolution", "SQLAlchemy retrieval"],
      github: "https://github.com/Keynb23/NexusData",
    },
    {
      id: 4,
      title: "Better State Pools",
      subtitle: "Business Site Redesign",
      description: "Rebuilt business website to improve clarity and accessibility with a scalable component-based architecture.",
      tech: ["React JSX", "Firebase", "Vercel"],
      highlights: ["Accessibility standards", "Scalable architecture", "Lead generation"],
      link: "https://www.betterstatepools.com/",
      github: "https://github.com/Keynb23/BetterStateMo",
    },
    {
      id: 5,
      title: "AutoFiles",
      subtitle: "C# CLI Scaffolder",
      description: "Lightweight tool to rapidly scaffold project structures via path strings and recursive creation logic.",
      tech: ["C#", ".NET", "CLI"],
      highlights: ["Custom path InputParser", "Recursive FileCreator", "Batch processing"],
      github: "https://github.com/Keynb23/AutomatedFiling",
    },
  ];

  useEffect(() => {
    let ctx = gsap.context(() => {
      const track = trackRef.current;
      const trigger = triggerRef.current;
      
      // Calculate total movable width
      // We scroll the entire width of the track minus the viewport
      const scrollDistance = track.scrollWidth - window.innerWidth;

      gsap.to(track, {
        x: -scrollDistance, // Moves the track to the left
        ease: "none",
        scrollTrigger: {
          trigger: trigger,
          pin: true,
          scrub: 1, // Smoothness of the scrub
          start: "top top",
          // INCREASED: This controls "how long" the user has to scroll
          // A higher number (6000) makes the animation feel slower and more deliberate
          end: () => "+=6000", 
          invalidateOnRefresh: true,
          onToggle: (self) => setIsVisible(self.isActive),
        },
      });
    }, triggerRef);
    return () => ctx.revert();
  }, []);

  return (
    <section id="work" ref={triggerRef} className="bg-[#0b1220] h-screen overflow-hidden relative">
        
        {/* HEADER: Absolute Position 
            This removes the header from the flow, allowing the cards to be 
            perfectly vertically centered in the viewport. 
        */}
        <div className={`container mx-auto px-12 absolute top-12 left-0 right-0 z-20 pointer-events-none transition-all duration-700 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-10"}`}>
          <h2 className="text-4xl md:text-5xl font-black text-white mb-2 tracking-tighter drop-shadow-lg">
            {formatText("Featured Work")}
          </h2>
          <p className="text-slate-400 text-sm max-w-xl leading-relaxed italic drop-shadow-md">
            {formatText("A selection of projects showcasing full-stack expertise and machine learning integration.")}
          </p>
        </div>

        {/* THE TRACK CONTAINER
            h-full ensures it takes up the whole screen height.
            items-center ensures the cards float in the middle vertically.
        */}
        <div className="h-full w-full flex items-center">
          <div 
            ref={trackRef} 
            className="flex gap-16 px-4 will-change-transform items-center h-full" 
            style={{ 
                width: "max-content",
                // START LOGIC: 50vw (center) - 225px (half card) = First card dead center
                paddingLeft: "calc(50vw - 225px)",
                // END LOGIC: We add EXTRA padding here so the last card can scroll PAST center
                // 50vw + 25px ensures it goes just slightly past center before stopping
                paddingRight: "calc(50vw + 25px)" 
            }}
          >
            {projects.map((project) => (
              <article
                key={project.id}
                /* LAYOUT FIXES:
                   1. flex-shrink-0: Vital for GSAP horizontal scrolling
                   2. p-12: As requested (Large internal padding)
                   3. justify-between: Pushes Header to top, Links to bottom
                */
                className="flex-shrink-0 w-[450px] h-[600px] bg-[#0d1629] border border-slate-800/80 rounded-[2.5rem] p-12 flex flex-col justify-between group transition-all duration-500 hover:border-slate-500 hover:shadow-[0_0_50px_-12px_rgba(255,255,255,0.1)] relative overflow-hidden"
              >
                
                {/* TOP: Header */}
                <div className="flex flex-col gap-2 shrink-0">
                  <span className="text-[10px] font-bold text-blue-500 uppercase tracking-[0.25em]">
                    {formatText(project.subtitle)}
                  </span>
                  <h3 className="text-3xl font-bold text-white leading-none tracking-tight">
                    {formatText(project.title)}
                  </h3>
                </div>

                {/* MIDDLE: Content
                    - flex-grow: Fills the available space
                    - justify-center: Keeps content visually balanced
                    - gap-5: Reduced from gap-10 to prevent clipping with p-12
                */}
                <div className="flex-grow flex flex-col justify-center gap-5">
                  <div>
                    <p className="text-slate-400 text-sm leading-relaxed">
                      {formatText(project.description)}
                    </p>
                    
                    {/* Conditional Button */}
                    {project.id === 1 && (
                      <div className="mt-4">
                        <button 
                          onClick={toggleBionic}
                          className="px-4 py-2 bg-yellow-500 text-[#002D62] text-[10px] font-black uppercase tracking-widest rounded shadow-lg hover:bg-yellow-400 transition-transform active:scale-95"
                        >
                          {isBionicMode ? "Disable Bionic" : "Enable Bionic"}
                        </button>
                      </div>
                    )}
                  </div>

                  {/* Highlights List */}
                  <div>
                    <h4 className="text-[9px] font-black text-slate-600 uppercase tracking-[0.25em] mb-3">
                      Project Scope
                    </h4>
                    <ul className="space-y-2">
                      {project.highlights.map((h, i) => (
                        <li key={i} className="text-xs text-slate-300 flex items-start gap-2">
                          <span className="w-1.5 h-1.5 rounded-full bg-blue-600 mt-1.5 shrink-0" />
                          <span className="leading-tight">{formatText(h)}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                {/* BOTTOM: Footer */}
                <div className="flex flex-col gap-5 shrink-0">
                  <div className="flex flex-wrap gap-2">
                    {project.tech.map((t, i) => (
                      <span key={i} className="text-[9px] font-bold bg-slate-900 text-slate-500 px-3 py-1.5 rounded-full border border-slate-800 uppercase tracking-wider">
                        {t}
                      </span>
                    ))}
                  </div>
                  
                  <div className="flex items-center justify-between border-t border-slate-800 pt-5">
                    <div className="flex gap-6">
                      <a href={project.github} target="_blank" rel="noopener noreferrer" className="text-[10px] text-white font-black uppercase tracking-widest border-b border-transparent hover:border-white transition-all">
                        Source
                      </a>
                      {project.link && (
                        <a href={project.link} target="_blank" rel="noopener noreferrer" className="text-[10px] text-white font-black uppercase tracking-widest border-b border-transparent hover:border-white transition-all">
                          Live
                        </a>
                      )}
                    </div>
                    <span className="text-4xl font-black text-slate-800/40 select-none">
                      0{project.id}
                    </span>
                  </div>
                </div>

              </article>
            ))}
          </div>
        </div>
    </section>
  );
};

export default FeaturedWork;