import { useRef } from "react";
import { motion, useInView } from "framer-motion"; // For smooth timeline entrance
import { MapPin, Briefcase, ChevronRight } from "lucide-react"; // Icons for detail points
import { useBionic } from "../../hooks/useBionic";

/**
 * Experience Component - Chronicles professional history and key achievements.
 * Implements a vertical timeline with Pacers-themed accents and motion reveals.
 */
const Experience = () => {
  const { formatText } = useBionic();
  const sectionRef = useRef(null);
  // Motion hook to trigger animations when the section is in view
  const isInView = useInView(sectionRef, { once: true, amount: 0.1 });

  // Professional history dataset
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
      role: "Frontend Software Engineer",
      period: "January 2026 - Present",
      location: "Kansas City, MO",
      description:
        "Enhancing user interface and experience across the Acellus learning platform. Scaling a React codebase serving tens of thousands of active users with a focus on maintainability.",
      achievements: [
        "Implemented workload automation tools to improve Manual Test Case writing.",
        "Led restructuring of frontend codebase to improve scalability and maintainability.",
        "Integrated AI components for automated student feedback systems.",
      ],
      tech: ["React", "TypeScript", "Tailwind CSS", "Gitlabs"],
    },
  ];

  return (
    <section
      id="experience"
      className="experience py-32 bg-diner-black relative"
      ref={sectionRef}
    >
      <div className="container mx-auto px-6 md:px-12">
        {/* Section Header with Pacers-themed typography */}
        <motion.div
          className="experience__header text-center mb-24"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
        >
          <h2 className="experience__title text-5xl md:text-6xl font-black text-white mb-4 uppercase tracking-tighter">
            Experience
          </h2>
          <p className="experience__subtitle text-xl text-white/60 max-w-2xl mx-auto font-medium">
            Professional journey building polished, accessible user interfaces
          </p>
        </motion.div>

        {/* Timeline Container */}
        <div className="experience__timeline max-w-4xl mx-auto relative">
          {/* Vertical timeline line - Diner Crimson */}
          <div className="absolute left-0 md:left-1/2 top-0 bottom-0 w-1 md:-translate-x-1/2 bg-diner-crimson/20 rounded-full" />

          {/* Individual Experience Cards */}
          <div className="space-y-20">
            {experiences.map((exp, index) => (
              <motion.article
                key={exp.id}
                className={`experience-card relative flex flex-col md:flex-row items-center gap-8 ${
                  index % 2 === 0 ? "md:flex-row-reverse" : ""
                }`}
                initial={{ opacity: 0, x: index % 2 === 0 ? 50 : -50 }}
                animate={isInView ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.8, delay: index * 0.2 }}
              >
                {/* Timeline Center Dot */}
                <div className="absolute left-[-5px] md:left-1/2 top-1 md:-translate-x-1/2 w-4 h-4 rounded-full bg-diner-crimson border-4 border-diner-black z-10 shadow-lg shadow-diner-crimson/40" />

                {/* Content Side */}
                <div className="w-full md:w-1/2 pl-8 md:pl-0">
                  <div className="experience-card__content bg-diner-dark-graphite p-8 md:p-10 rounded-[2.5rem] shadow-xl shadow-black/20 border border-white/5 hover:border-diner-crimson/30 hover:shadow-diner-crimson/5 transition-all duration-500 group">
                    {/* Header: Role and Company */}
                    <div className="flex flex-col mb-6">
                      <div className="flex items-center gap-2 mb-2">
                        <Briefcase size={16} className="text-diner-crimson" />
                        <span className="text-xs font-black text-diner-crimson uppercase tracking-widest">
                          {formatText(exp.period)}
                        </span>
                      </div>
                      <h3 className="text-2xl md:text-3xl font-black text-white mb-1 group-hover:text-diner-crimson transition-colors">
                        {formatText(exp.role)}
                      </h3>
                      <p className="text-xl font-bold text-white/40">
                        {formatText(exp.company)}
                      </p>
                    </div>

                    {/* Metadata: Location */}
                    <div className="flex items-center gap-1.5 text-sm text-white/50 font-bold uppercase tracking-widest mb-6">
                      <MapPin size={14} />
                      {formatText(exp.location)}
                    </div>

                    {/* Description Paragraph */}
                    <p className="experience-card__description text-white/70 leading-relaxed mb-8 font-medium">
                      {formatText(exp.description)}
                    </p>

                    {/* Key Achievements List */}
                    <div className="experience-card__achievements mb-8">
                      <h4 className="text-[10px] font-black uppercase tracking-[0.2em] text-white/30 mb-4 px-2">
                        Key Achievements
                      </h4>
                      <ul className="space-y-3">
                        {exp.achievements.map((achievement, idx) => (
                          <li
                            key={idx}
                            className="flex items-start gap-3 text-sm font-semibold text-white/60 group-hover:text-white transition-colors"
                          >
                            <ChevronRight
                              size={14}
                              className="mt-1 text-diner-crimson shrink-0"
                            />
                            {formatText(achievement)}
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* Technical Stack Tags */}
                    <div className="experience-card__tech flex flex-wrap gap-2 pt-6 border-t border-white/5">
                      {exp.tech.map((tech, idx) => (
                        <span
                          key={idx}
                          className="px-4 py-1.5 bg-white/5 border border-white/5 rounded-full text-[10px] font-bold text-white/60 uppercase tracking-widest hover:border-diner-crimson/30 hover:text-diner-crimson transition-all"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Empty Spacer Side (Desktop View Only) */}
                <div className="hidden md:block md:w-1/2" />
              </motion.article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Experience;
