import { ListBox, ListBoxItem } from "react-aria-components";
import ProjectCard from "./fwCards";

const Carousel = ({ projects, formatText, toggleBionic, isBionicMode }) => {
  return (
    /* 
       CAROUSEL VIEWPORT 
       Maintains full height and width while clipping the overflowing track.
    */
    <div className="carousel-viewport h-full w-full flex items-center overflow-hidden">
      {/* 
          SLIDING TRACK 
          This element moves horizontally based on the --scroll-progress variable.
      */}
      <ListBox
        items={projects}
        aria-label="Featured projects carousel"
        orientation="horizontal"
        className="horizontal-track gap-20 outline-none flex items-center"
        style={{
          paddingLeft: "calc(50vw - 240px)",
          paddingRight: "calc(50vw - 240px)",
        }}
      >
        {(project) => (
          /* individual CAROUSEL SLIDE */
          <ListBoxItem
            key={project.id}
            textValue={project.title}
            className="outline-none focus:ring-0 focus:outline-none shrink-0"
          >
            {/* 
                CARD WRAPPER 
            */}
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
