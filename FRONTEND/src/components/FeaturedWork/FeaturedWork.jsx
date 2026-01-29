import { useEffect, useRef } from "react";
import { useBionic } from "../../context/BionicContext"; // Context for Bionic reading mode
import Carousel from "./Carousel"; // Carousel component for project display
import projects from "./projects"; // Project data provider

/**
 * FeaturedWork Component - A high-impact section showcasing portfolio projects.
 * Implements a sticky-scroll horizontal carousel driven by native vertical scroll progress.
 */
const FeaturedWork = () => {
  // Extract Bionic Reading utilities from context
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
      className="work-container relative h-[800vh] mt-20 z-10 bg-pacers-navy-dark"
    >
      {/* Sticky viewport section that stays fixed while the parent container scrolls */}
      <section
        id="work"
        className="sticky top-0 w-full h-screen overflow-hidden bg-pacers-navy-dark flex flex-col justify-center"
      >
        {/* Responsive header for the section */}
        <div className="container mx-auto px-10 md:px-20 mb-12 relative z-20">
          <h2 className="text-5xl md:text-8xl font-black text-white tracking-tighter uppercase drop-shadow-2xl">
            {/* Applies Bionic reading formatting if enabled */}
            {formatText("Featured Work")}
          </h2>
        </div>

        {/* Project carousel component passing through Bionic state and logic */}
        <Carousel
          projects={projectData}
          formatText={formatText}
          toggleBionic={toggleBionic}
          isBionicMode={isBionicMode}
        />
      </section>
    </div>
  );
};

export default FeaturedWork;
