import { useEffect, useRef } from "react";
import { useBionic } from "../../context/BionicContext"; // Ensure path is correct
import "./FeaturedWork.css";

const FeaturedWork = () => {
  const { isBionicMode, toggleBionic, formatText } = useBionic();
  const sectionRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("featured-work--visible");
          }
        });
      },
      { threshold: 0.1 }
    );

    const currentRef = sectionRef.current;
    if (currentRef) observer.observe(currentRef);

    return () => {
      if (currentRef) observer.unobserve(currentRef);
    };
  }, []);

  const projects = [
    {
      id: 1,
      title: "Bionic Reading App",
      subtitle: "Enhanced Reading Experience with Tunnel Vision UI",
      description:
        'A React-based reading application featuring a unique "Tunnel Vision" mode that highlights visual anchors to improve reading speed and comprehension. Implements custom text processing algorithms and responsive design for optimal mobile reading.',
      tech: ["React", "TypeScript", "CSS Grid", "Web APIs"],
      highlights: [
        "Custom visual anchor algorithm for text highlighting",
        "Tunnel Vision UI with 750px constrained column",
        "Real-time text processing and formatting",
        "Mobile-first responsive design",
      ],
      github: "https://github.com/Keynb23/Reading",
      gradient:
        "linear-gradient(135deg, var(--color-primary), var(--color-tertiary))",
    },
    {
      id: 2,
      title: "Typing Speed + ML Predictor",
      subtitle: "Linear Regression Model for Performance Analysis",
      description:
        "Machine learning application that predicts typing speed improvements using Linear Regression. Features asynchronous data flow, real-time performance tracking, and interactive visualizations of progress over time.",
      tech: ["React", "Python", "scikit-learn", "FastAPI", "Chart.js"],
      highlights: [
        "Linear Regression model for speed prediction",
        "Asynchronous data pipeline with FastAPI",
        "Real-time performance metrics and charts",
        "Historical data analysis and trends",
      ],
      github: "https://github.com/Keynb23/typing-speed-test-main",
      gradient:
        "linear-gradient(135deg, var(--color-tertiary), var(--color-secondary))",
    },
    {
      id: 3,
      title: "NexusData",
      subtitle: "AI-Powered Intelligence Ingestion & Entity Resolution",
      description:
        "A high-performance FastAPI backend designed to transform messy, unstructured text into clean, structured intelligence using Natural Language Processing.",
      tech: ["Python", "FastAPI", "spaCy NLP", "SQLAlchemy", "SQLite"],
      highlights: [
        "Engineered an automated ingestion API using spaCy NLP to extract people and organizations from unstructured text",
        "Developed an Entity Resolution module to resolve duplicate records and preserve high-confidence 'Golden Records'",
        "Implemented a searchable SQLite database using SQLAlchemy ORM for high-speed retrieval of normalized data",
      ],
      github: "https://github.com/Keynb23/NexusData",
      gradient:
        "linear-gradient(135deg, var(--color-secondary), var(--color-primary))",
    },
    {
      id: 4,
      title: "Better State Pools",
      subtitle: "NLP-Powered Entity Resolution Platform",
      description:
        "Redesigned and rebuilt a local business website to improve clarity, accessibility, and usability. Implemented a scalable component-based architecture for easier long-term maintenance.",
      tech: ["React JSX", "CSS", "Firebase", "Vercel"],
      highlights: [
        "Redesigned and rebuilt a local business website to improve clarity, accessibility, and usability.",
        "Implemented a scalable component-based architecture for easier long-term maintenance.",
        "Delivered a modern, intuitive interface tailored to a broad user demographic.",
      ],
      link: "https://www.betterstatepools.com/",
      github: "https://github.com/Keynb23/BetterStateMo",
      gradient:
        "linear-gradient(135deg, var(--color-secondary), var(--color-primary))",
    },
    {
      id: 5,
      title: "AutoFiles: Project Scaffolder",
      subtitle: "High-Speed C# CLI for Automated Directory Structuring",
      description:
        "A lightweight command-line tool designed to rapidly scaffold project structures, allowing users to define complex folder and file hierarchies via simple text input.",
      tech: ["C#", ".NET", "CLI"],
      highlights: [
        "Developed a custom InputParser to convert complex text-based path strings into physical directory nodes",
        "Engineered for portability as a self-contained executable that runs without a local .NET installation",
        "Features a recursive FileCreator system for batch-creating files across multiple subdirectories in a single session",
      ],
      github: "https://github.com/Keynb23/AutomatedFiling",
      gradient:
        "linear-gradient(135deg, var(--color-secondary), var(--color-primary))",
    },
  ];

  return (
    <section id="work" className="featured-work section" ref={sectionRef}>
      <div className="container">
        <div className="featured-work__header">
          <h2 className="featured-work__title">
            {formatText("Featured Work")}
          </h2>
          <p className="featured-work__subtitle">
            {formatText(
              "A selection of projects showcasing expertise in React, TypeScript, Machine Learning, and modern web technologies."
            )}
          </p>
        </div>

        <div className="featured-work__grid">
          {projects.map((project, index) => (
            <article
              key={project.id}
              className="project-card"
              style={{ "--delay": `${index * 0.2}s` }}
            >
              <div className="project-card__header">
                <div
                  className="project-card__gradient"
                  style={{ background: project.gradient }}
                ></div>
                <div className="project-card__header-content">
                  <h3 className="project-card__title">
                    {formatText(project.title)}
                  </h3>
                  <p className="project-card__subtitle">
                    {formatText(project.subtitle)}
                  </p>
                </div>
              </div>

              <div className="project-card__body">
                <div className="project-card__description">
                  {formatText(project.description)}
                </div>

                {/* THE TOGGLE BUTTON - Only appears on the Bionic Project Card */}
                {project.id === 1 && (
                  <button onClick={toggleBionic} className="bionic-toggle-btn">
                    {isBionicMode
                      ? "Disable Bionic Mode"
                      : "Enable Site-wide Bionic Reading"}
                  </button>
                )}

                <div className="project-card__highlights">
                  <h4 className="project-card__highlights-title">
                    Key Features
                  </h4>
                  <ul className="project-card__highlights-list">
                    {project.highlights.map((highlight, idx) => (
                      <li key={idx} className="project-card__highlight-item">
                        {formatText(highlight)}
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="project-card__tech">
                  {project.tech.map((tech, idx) => (
                    <span key={idx} className="project-card__tech-tag">
                      {tech}
                    </span>
                  ))}
                </div>
              </div>

              {/* Project Footer */}
              <div className="project-card__footer">
                {/* Primary Action: Only shows if project.link exists */}
                {project.link && (
                  <a
                    href={project.link}
                    className="project-card__link"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Live Site
                    <svg
                      className="project-card__link-icon"
                      width="16"
                      height="16"
                      viewBox="0 0 16 16"
                      fill="none"
                    >
                      <path
                        d="M6 3L11 8L6 13"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </a>
                )}

                {/* Secondary Action: GitHub Link */}
                {project.github && (
                  <a
                    href={project.github}
                    className="project-card__link project-card__link--secondary"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Source Code
                    <svg
                      className="project-card__link-icon"
                      width="16"
                      height="16"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                    >
                      <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"></path>
                    </svg>
                  </a>
                )}
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturedWork;
