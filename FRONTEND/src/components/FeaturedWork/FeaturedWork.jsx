import { useEffect, useRef, useState } from "react";
import { useBionic } from "../../context/BionicContext"; 
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import HScrollTrack from "./hScrollTrack";
import './Work.css';

gsap.registerPlugin(ScrollTrigger);

const FeaturedWork = () => {
  const { isBionicMode, toggleBionic, formatText } = useBionic();
  const triggerRef = useRef(null);
  const trackRef = useRef(null);
  const [isVisible, setIsVisible] = useState(false);

  const projects = [
    { id: 1, title: "Bionic Reading App", subtitle: "Enhanced Reading Experience", description: "A React-based reading application featuring a unique 'Tunnel Vision' mode.", highlights: ["Custom anchors", "Tunnel Vision UI"], tech: ["React"], github: "#" },
    { id: 2, title: "Typing Speed + ML", subtitle: "Linear Regression Model", description: "Machine learning application predicting speed improvements.", highlights: ["Linear Regression", "Trend analysis"], tech: ["Python"], github: "#" },
    { id: 3, title: "NexusData", subtitle: "AI Intelligence Ingestion", description: "FastAPI backend transforming unstructured text.", highlights: ["NLP Ingestion", "Entity Resolution"], tech: ["FastAPI"], github: "#" },
    { id: 4, title: "Better State Pools", subtitle: "Business Site Redesign", description: "Rebuilt business website for clarity and accessibility.", highlights: ["Accessibility", "Lead gen"], tech: ["React"], github: "#", link: "#" },
    { id: 5, title: "AutoFiles", subtitle: "C# CLI Scaffolder", description: "Tool to rapidly scaffold project structures.", highlights: ["Recursive Logic", "Batch processing"], tech: ["C#"], github: "#" },
  ];

  useEffect(() => {
    let ctx = gsap.context(() => {
      const track = trackRef.current;
      const trigger = triggerRef.current;
      
      const scrollDistance = track.scrollWidth - window.innerWidth;

      gsap.to(track, {
        x: -scrollDistance,
        ease: "none",
        scrollTrigger: {
          trigger: trigger,
          pin: true,
          scrub: 1,
          start: "top top", // Change to top top for the smoothest pin lock
          end: () => `+=${scrollDistance * 1.5}`, // Added extra padding for the scroll depth
          invalidateOnRefresh: true,
          onToggle: (self) => setIsVisible(self.isActive),
        },
      });
    }, triggerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section id="work" ref={triggerRef} className="relative w-full h-screen bg-[#0b1220]">
      <div className={`container mx-auto px-12 absolute top-12 left-0 right-0 z-20 transition-all duration-700 ${isVisible ? "opacity-100" : "opacity-0"}`}>
         <h2 className="text-4xl md:text-5xl font-black text-white">{formatText("Featured Work")}</h2>
      </div>

      <HScrollTrack 
        trackRef={trackRef} 
        projects={projects} 
        formatText={formatText}
        toggleBionic={toggleBionic}
        isBionicMode={isBionicMode}
      />
    </section>
  );
};

export default FeaturedWork;