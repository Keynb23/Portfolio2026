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
          Now wraps both the items and the animations to ensure they move in sync.
      */}
      <div className="horizontal-track flex items-center relative h-full">
        <ListBox
          items={projects}
          aria-label="Featured projects carousel"
          orientation="horizontal"
          className="gap-20 outline-none flex items-center"
          style={{
            // Maintain the track length with padding
            paddingRight: "calc(100vw - 50px)",
          }}
        >
          {(project) => (
            /* individual CAROUSEL SLIDE */
            <ListBoxItem
              key={project.id}
              textValue={project.title}
              className="outline-none focus:ring-0 focus:outline-none shrink-0"
            >
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

        {/* 
            ANIMATION LAYER 
            Now living inside the track, so they naturally follow the scroll speed.
        */}
        <video
          src="/src/components/FeaturedWork/Pushing.webm"
          autoPlay
          muted
          loop
          playsInline
          className="pusher-video"
        />
        <video
          src="/src/components/FeaturedWork/runningaway.webm"
          autoPlay
          muted
          loop
          playsInline
          className="runner-video"
        />
      </div>
    </div>
  );
};

export default Carousel;
