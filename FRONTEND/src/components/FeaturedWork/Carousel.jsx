import { ListBox, ListBoxItem } from "react-aria-components";
import ProjectCard from "./fwCards";

/**
 * Carousel: The horizontal carousel component.
 * Uses React Aria ListBox for accessibility and semantic structure.
 * The .horizontal-track class handles the scroll-driven animation logic in Work.css.
 */
const Carousel = ({ projects, formatText, toggleBionic, isBionicMode }) => {
  return (
    /* CAROUSEL VIEWPORT: Crops the sliding track */
    <div className="h-full w-full flex items-center overflow-hidden">
      {/* 
          SLIDING TRACK: This element moves horizontally based on scroll.
          We use ListBox for accessibility, but style it to be the flex-track.
          The horizontal translation is driven by the --section-scroll timeline.
      */}
      <ListBox
        items={projects}
        aria-label="Featured projects carousel"
        orientation="horizontal"
        className="horizontal-track gap-16 outline-none flex items-center"
        style={{
          paddingLeft: "calc(50vw - 240px)",
          paddingRight: "calc(50vw - 240px)",
        }}
      >
        {(project) => (
          /* CAROUSEL SLIDE: Individual project container */
          <ListBoxItem
            key={project.id}
            textValue={project.title}
            className="outline-none focus:ring-0 focus:outline-none"
          >
            {/* WRAPPER: Prevents flex items from collapsing during animation */}
            <div className="project-card-wrapper">
              <ProjectCard
                project={project}
                formatText={formatText}
                toggleBionic={toggleBionic}
                isBionicMode={isBionicMode}
              />
            </div>
          </ListBoxItem>
        )}
      </ListBox>
    </div>
  );
};

export default Carousel;
