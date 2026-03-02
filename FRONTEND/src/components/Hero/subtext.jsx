import React, { useEffect, useRef, useMemo } from "react";
import gsap from "gsap";
import { ScrambleTextPlugin } from "gsap/ScrambleTextPlugin";

gsap.registerPlugin(ScrambleTextPlugin);

const skills = [
  "TYPESCRIPT", "JAVASCRIPT", "REACT", "PYTHON", "C#", "UX/UI", "CSS",
  "TAILWIND", "ZUSTAND", "TANSTACK", "JOTAI", "BLENDER", "ZOD", 
  "MACHINE LEARNING", "GSAP", "FRAMER", "THREE.JS", "NODE", "SQL", "NEXT.JS"
];

const Subtext = () => {
  const containerRef = useRef(null);
  const positions = useMemo(() => 
    skills.map(() => ({
      // eslint-disable-next-line react-hooks/purity
      top: Math.floor(Math.random() * 90) + 5,
      // eslint-disable-next-line react-hooks/purity
      left: Math.floor(Math.random() * 90) + 5,
    })),
    []
  );

  useEffect(() => {
    const words = containerRef.current.querySelectorAll(".scramble-item");
    
    words.forEach((word) => {
      const originalText = word.innerText;
      
      // Infinite scramble loop
      gsap.to(word, {
        duration: 1.5,
        scrambleText: {
          text: originalText,
          chars: "01X#<>-_",
          speed: 0.03,
        },
        repeat: -1,
        repeatDelay: Math.random() * 8 + 3,
        delay: Math.random() * 2, // Stagger the start times
      });

      // Subtle floating movement for depth
      gsap.to(word, {
        x: "random(-20, 20)",
        y: "random(-20, 20)",
        duration: "random(3, 5)",
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut"
      });
    });
  }, []);

  return (
    <div ref={containerRef} className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
      {/* Background radial gradient to keep the center readable */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_20%,rgba(5,5,5,0.8)_80%)] z-10" />

      {skills.map((skill, index) => {
        return (
          <span
            key={index}
            className="scramble-item absolute text-[10px] md:text-xs font-mono text-zinc-600/40 uppercase tracking-widest"
            style={{
              top: `${positions[index].top}%`,
              left: `${positions[index].left}%`,
            }}
          >
            {skill}
          </span>
        );
      })}
    </div>
  );
};

export default Subtext;