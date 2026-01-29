import { useEffect, useRef } from "react";
import { useBionic } from "../../context/BionicContext";
import Carousel from "./Carousel";
import projects from "./projects";
import "./Work.css";

const FeaturedWork = () => {
  const { isBionicMode, toggleBionic, formatText } = useBionic();
  const containerRef = useRef(null);
  const projectData = projects();

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const handleScroll = () => {
      const rect = container.getBoundingClientRect();
      const viewportHeight = window.innerHeight;

      // Calculation: 0 when top first hits top of screen,
      // 1 when container is fully scrolled.
      const totalScrollable = rect.height - viewportHeight;
      const progress = Math.max(0, Math.min(1, -rect.top / totalScrollable));

      container.style.setProperty("--scroll-progress", progress);
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll(); // Initial check

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div
      id="work-container"
      ref={containerRef}
      className="relative h-[800vh] z-10"
    >
      <section
        id="work"
        className="sticky top-0 w-full h-screen overflow-hidden bg-[#0b1220]"
      >
        <div className="container mx-auto px-12 absolute top-12 left-0 right-0 z-20">
          <h2 className="text-4xl md:text-5xl font-black text-white">
            {formatText("Featured Work")}
          </h2>
        </div>

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
