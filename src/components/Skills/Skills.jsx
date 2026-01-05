import { useEffect, useRef } from "react";
import "./Skills.css";

const Skills = () => {
  const sectionRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("skills--visible");
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

  const skillCategories = [
    {
      id: 1,
      category: "Frontend Development",
      skills: [
        { name: "React", level: 95 },
        { name: "JavaScript / TypeScript", level: 95 },
        { name: "HTML5 & CSS3", level: 95 },
        { name: "Tailwind CSS", level: 80 },
        { name: "Three.js / React Three Fiber", level: 85 },
      ],
    },
    {
      id: 2,
      category: "Backend & Data",
      skills: [
        { name: "C#", level: 70 },
        { name: "Python", level: 95 },
        { name: "FastAPI / Flask", level: 80 },
        { name: "MySQL / SQLite", level: 70 },
        { name: "Firebase", level: 99 },
      ],
    },
    {
      id: 3,
      category: "AI & Machine Learning",
      skills: [
        { name: "spaCy (NLP)", level: 50 },
        { name: "Scikit-Learn", level: 50 },
        { name: "Linear Regression", level: 60 },
        { name: "Pandas & Numpy", level: 75 },
      ],
    },
    {
      id: 4,
      category: "Tools & Workflow",
      skills: [
        { name: "Git & GitHub", level: 95 },
        { name: "VS Code & Visual Studio", level: 95 },
        { name: "Postman", level: 90 },
        { name: "Vercel Deployment", level: 95 },
        { name: "Blender & Unreal Engine", level: 70 },
      ],
    },
  ];

  return (
    <section id="skills" className="skills section" ref={sectionRef}>
      <div className="container">
        <div className="skills__header">
          <h2 className="skills__title">Skills & Technologies</h2>
          <p className="skills__subtitle">
            I'm always learning and exploring new technologies to improve my skills and knowledge. It's important
            to stay critical of yourself and your work, and to never stop learning. Below are some of the technologies
            I've worked with. Along with how confident I am in each technology.
          </p>
        </div>

        <div className="skills__grid">
          {skillCategories.map((category, index) => (
            <div
              key={category.id}
              className="skill-category"
              style={{ "--delay": `${index * 0.15}s` }}
            >
              <h3 className="skill-category__title">{category.category}</h3>
              <div className="skill-category__list">
                {category.skills.map((skill, idx) => (
                  <div
                    key={idx}
                    className="skill-item"
                    style={{ "--skill-delay": `${idx * 0.05}s` }}
                  >
                    <div className="skill-item__header">
                      <span className="skill-item__name">{skill.name}</span>
                      <span className="skill-item__level">{skill.level}%</span>
                    </div>
                    <div className="skill-item__bar">
                      <div
                        className="skill-item__bar-fill"
                        style={{ "--skill-level": `${skill.level}%` }}
                      ></div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Skills;