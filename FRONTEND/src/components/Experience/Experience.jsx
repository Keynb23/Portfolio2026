import React, { useEffect, useRef } from "react";
import "./Experience.css";

const Experience = () => {
  const sectionRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("experience--visible");
          }
        });
      },
      { threshold: 0.1 }
    );

    const currentRef = sectionRef.current;
    if (currentRef) {
      observer.observe(currentRef);
    }

    return () => {
      if (currentRef) {
        observer.unobserve(currentRef);
      }
    };
  }, []);

  const experiences = [
    {
      id: 1,
      company: "AstroSkills",
      role: "Frontend Developer Intern",
      period: "June 2025 - September 2025",
      location: "Remote",
      description:
        "Developing modern web applications with a focus on user experience and performance optimization.",
      achievements: [
        "Built responsive UI components using React and TypeScript",
        "Implemented state management solutions for complex data flows",
        "Collaborated with design team to translate Figma mockups into pixel-perfect interfaces",
        "Optimized application performance, reducing load times by 40%",
        "Contributed to component library and design system documentation",
      ],
      tech: ["React", "TypeScript", "CSS3", "Git", "Figma"],
    },
    {
      id: 2,
      company: "Acellus Academy",
      role: "Frotend Software Engineer",
      period: "January 2026 - Present",
      location: "Kansas City, MO",
      description:
        "Working with the frontend team to enhance user interface and user experience across the Acellus learning platform. While rebuilding an active react codebase that serves 10s of thousands of active users.",
      achievements: [
        "Implemented workload automation tools to improve Manual Test Case writing.",
        "Helped organize restructuring of frontend codebase to improve scalability and maintainability.",
      ],
      tech: ["React", "TypeScript", "Tailwind CSS", "Gitlabs"],
    }
  ];

  return (
    <section id="experience" className="experience section" ref={sectionRef}>
      <div className="container">
        {/* Section Header */}
        <div className="experience__header">
          <h2 className="experience__title">Experience</h2>
          <p className="experience__subtitle">
            Professional journey building polished, accessible user interfaces
          </p>
        </div>

        {/* Timeline */}
        <div className="experience__timeline">
          {experiences.map((exp, index) => (
            <article
              key={exp.id}
              className="experience-card"
              style={{ "--delay": `${index * 0.2}s` }}
            >
              {/* Timeline Dot */}
              <div className="experience-card__dot"></div>

              {/* Card Content */}
              <div className="experience-card__content">
                {/* Header */}
                <div className="experience-card__header">
                  <div className="experience-card__header-left">
                    <h3 className="experience-card__role">{exp.role}</h3>
                    <p className="experience-card__company">{exp.company}</p>
                  </div>
                  <div className="experience-card__header-right">
                    <span className="experience-card__period">
                      {exp.period}
                    </span>
                    <span className="experience-card__location">
                      {exp.location}
                    </span>
                  </div>
                </div>

                {/* Description */}
                <p className="experience-card__description">
                  {exp.description}
                </p>

                {/* Achievements */}
                <div className="experience-card__achievements">
                  <h4 className="experience-card__achievements-title">
                    Key Achievements
                  </h4>
                  <ul className="experience-card__achievements-list">
                    {exp.achievements.map((achievement, idx) => (
                      <li
                        key={idx}
                        className="experience-card__achievement-item"
                      >
                        {achievement}
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Tech Stack */}
                <div className="experience-card__tech">
                  {exp.tech.map((tech, idx) => (
                    <span key={idx} className="experience-card__tech-tag">
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Experience;
