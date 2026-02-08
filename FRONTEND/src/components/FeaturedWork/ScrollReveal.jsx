import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

/**
 * ScrollReveal Component
 * Wraps children and animates them when they scroll into view using GSAP ScrollTrigger.
 */
const ScrollReveal = ({
  children,
  baseOpacity = 0,
  enableBlur = false,
  baseRotation = 0,
  blurStrength = 0,
  yOffset = 50,
  duration = 1.0,
  stagger = 0,
}) => {
  const containerRef = useRef(null);

  useEffect(() => {
    const element = containerRef.current;
    if (!element) return;

    // Initial state
    gsap.set(element, {
      opacity: baseOpacity,
      rotation: baseRotation,
      y: yOffset,
      filter: enableBlur ? `blur(${blurStrength}px)` : "blur(0px)",
    });

    // Animation to final state
    const animation = gsap.to(element, {
      opacity: 1,
      rotation: 0,
      y: 0,
      filter: "blur(0px)",
      duration: duration,
      ease: "power3.out",
      stagger: stagger,
      scrollTrigger: {
        trigger: element,
        start: "top 85%", // Starts animation when element top hits 85% of viewport height
        toggleActions: "play none none reverse", // Play on enter, reverse on leave back up
      },
    });

    return () => {
      animation.kill();
      // Clean up ScrollTrigger related to this animation if necessary
      if (animation.scrollTrigger) animation.scrollTrigger.kill();
    };
  }, [
    baseOpacity,
    enableBlur,
    baseRotation,
    blurStrength,
    yOffset,
    duration,
    stagger,
  ]);

  return (
    <div ref={containerRef} className="scroll-reveal-container">
      {children}
    </div>
  );
};

export default ScrollReveal;
