import { ExternalLink, Github } from "lucide-react"; // Icons for project links

/**
 * ProjectCard component - Displays individual project details within the carousel.
 * Features glassmorphism, hover effects, and Indiana Pacers themed accents.
 */
const ProjectCard = ({ project, formatText, toggleBionic, isBionicMode }) => {
  return (
    /* Main card container with glassmorphism and smooth hover transitions */
    <article className="project-card flex-shrink-0 w-[480px] h-[620px] bg-linear-to-br from-pacers-navy/90 to-pacers-navy-dark border border-white/10 rounded-[3rem] p-10 flex flex-col justify-between group transition-all duration-700 hover:border-pacers-gold/40 hover:shadow-[0_0_80px_-20px_rgba(253,185,39,0.15)] relative overflow-hidden backdrop-blur-xl">
      {/* Dynamic Background Glow that appears on hover */}
      <div className="absolute -top-20 -right-20 w-64 h-64 bg-pacers-gold/5 rounded-full blur-[100px] opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none" />

      {/* Decorative large project index number */}
      <span className="absolute top-8 right-10 text-8xl font-black text-white/5 select-none leading-none tracking-tighter group-hover:text-pacers-gold/[0.07] transition-colors">
        {"KEYNB"[project.id - 1] || project.id}
      </span>

      {/* Header section containing subtitle, title, and technology tags */}
      <div className="flex flex-col gap-5 shrink-0 relative z-10 pr-16 text-left">
        <div className="flex flex-col gap-2">
          {/* Categorical label in Pacers Gold accent */}
          <span className="text-[10px] font-bold text-pacers-gold uppercase tracking-[0.4em]">
            {formatText(project.subtitle)}
          </span>
          {/* Project Title with bold typography */}
          <h3 className="text-4xl font-black text-white leading-tight tracking-tight mb-0! group-hover:text-pacers-gold-light transition-colors">
            {formatText(project.title)}
          </h3>
        </div>

        {/* Horizontal list of technology tags used in the project */}
        <div className="flex flex-wrap gap-2">
          {project.tech &&
            project.tech.map((tag, index) => (
              <span
                key={index}
                className="px-4 py-1.5 bg-white/5 border border-white/10 rounded-full text-[10px] font-bold text-pacers-silver-light uppercase tracking-widest whitespace-nowrap group-hover:border-pacers-gold/20 transition-all"
              >
                {tag}
              </span>
            ))}
        </div>
      </div>

      {/* Content body with project description and highlighted features */}
      <div className="flex-grow flex flex-col justify-center gap-8 relative z-10 py-4 text-left">
        {/* Main project narrative */}
        <p className="text-pacers-silver text-lg leading-relaxed font-medium mb-0!">
          {formatText(project.description)}
        </p>

        {/* Feature status/highlights list with custom markers */}
        <div className="space-y-4">
          <ul className="space-y-3">
            {project.highlights.map((highlight, index) => (
              <li
                key={index}
                className="text-sm text-pacers-silver-light flex items-start gap-4"
              >
                {/* Visual marker in Pacers Gold */}
                <span className="w-2 h-[2px] bg-pacers-gold/50 shrink-0 mt-2.5" />
                <span className="leading-tight font-medium opacity-80 group-hover:opacity-100 transition-opacity">
                  {formatText(highlight)}
                </span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Footer area with action links and interactive toggles */}
      <div className="flex flex-col gap-6 shrink-0 relative z-10 pt-8 mt-auto border-t border-white/10">
        <div className="flex items-center justify-between gap-4">
          <div className="flex gap-10">
            {/* Source code repository link */}
            <a
              href={project.github}
              target="_blank"
              rel="noopener noreferrer"
              className="text-[12px] text-white/90 font-bold uppercase tracking-[0.25em] relative group/link inline-flex items-center gap-2 hover:text-pacers-gold transition-colors"
            >
              <Github size={14} className="stroke-3" />
              <span>Source</span>
              <span className="absolute -bottom-2 left-0 w-0 h-[2px] bg-pacers-gold transition-all group-hover/link:w-full" />
            </a>

            {/* Live deployment link, shown only if available */}
            {project.link && (
              <a
                href={project.link}
                target="_blank"
                rel="noopener noreferrer"
                className="text-[12px] text-white/90 font-bold uppercase tracking-[0.25em] relative group/link inline-flex items-center gap-2 hover:text-pacers-gold transition-colors"
              >
                <ExternalLink size={14} className="stroke-3" />
                <span>Live</span>
                <span className="absolute -bottom-2 left-0 w-0 h-[2px] bg-pacers-gold transition-all group-hover/link:w-full" />
              </a>
            )}
          </div>

          {/* Interactive Bionic Reading toggle for accessibility demonstration */}
          {project.id === 1 && (
            <button
              onClick={toggleBionic}
              className={`px-5 py-2.5 text-[10px] font-black uppercase tracking-widest rounded-xl transition-all active:scale-95 cursor-pointer border ${
                isBionicMode
                  ? "bg-pacers-gold text-pacers-navy border-pacers-gold"
                  : "bg-white/5 text-pacers-gold border-pacers-gold/30 hover:bg-pacers-gold/10"
              }`}
            >
              {isBionicMode ? "Bionic: ON" : "Bionic: OFF"}
            </button>
          )}
        </div>
      </div>
    </article>
  );
};

export default ProjectCard;
