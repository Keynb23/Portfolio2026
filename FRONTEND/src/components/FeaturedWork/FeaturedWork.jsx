import { useEffect, useRef } from "react";
import { useBionic } from "../../hooks/useBionic";
import Carousel from "./Carousel";
import projects from "./projects";
import FW_Header from "./FW_Header";

//  * FeaturedWork Component - A high-impact section showcasing portfolio projects.
//  * Implements a sticky-scroll horizontal carousel driven by native vertical scroll progress.

const FeaturedWork = () => {
  const { isBionicMode, toggleBionic, formatText } = useBionic();
  const containerRef = useRef(null);
  const projectData = projects();

  // Effect to calculate and update scroll progress for the horizontal animation
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const handleScroll = () => {
      const rect = container.getBoundingClientRect();
      const viewportHeight = window.innerHeight;

      // Calculation: 0 when section top hits viewport top,
      // 1 when the 800vh container is fully traversed.
      const totalScrollable = rect.height - viewportHeight;
      const progress = Math.max(0, Math.min(1, -rect.top / totalScrollable));

      // Update CSS variable to drive the horizontal track transformation
      container.style.setProperty("--scroll-progress", progress);
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll(); // Initial position check

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div
      id="work-container"
      ref={containerRef}
      className="work-container relative h-[800vh] mt-10 mb-10 z-10 bg-pacers-navy-dark"
    >
      {/* Sticky viewport section that stays fixed while the parent container scrolls */}
      <section
        id="work"
        className="sticky top-0 w-full h-dvh overflow-hidden bg-pacers-navy-dark flex flex-col justify-center"
      >
        {/* Featured Work Header */}
        <div className="flex justify-center self-auto mx-10 ">
          <FW_Header />
        </div>

        {/* Project carousel component passing through Bionic state and logic */}
        <div className="flex-1 min-h-0 w-full">
          <Carousel
            projects={projectData}
            formatText={formatText}
            toggleBionic={toggleBionic}
            isBionicMode={isBionicMode}
          />
        </div>
      </section>
    </div>
  );
};

export default FeaturedWork;
