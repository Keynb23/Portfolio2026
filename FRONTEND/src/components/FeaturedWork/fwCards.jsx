/**
 * ProjectCard: The individual project showcase item.
 * This is the content inside each carousel slide.
 */
const ProjectCard = ({ project, formatText, toggleBionic, isBionicMode }) => {
  return (
    <article className="flex-shrink-0 w-[480px] h-[620px] bg-linear-to-br from-[#0f172a] to-[#020617] border border-white/5 rounded-[3rem] p-10 flex flex-col justify-between group transition-all duration-700 hover:border-blue-500/40 hover:shadow-[0_0_80px_-20px_rgba(59,130,246,0.12)] relative overflow-hidden backdrop-blur-xl">
      {/* Background Decorative Glow */}
      <div className="absolute -top-20 -right-20 w-64 h-64 bg-blue-600/5 rounded-full blur-[100px] opacity-0 group-hover:opacity-100 transition-opacity duration-700" />

      {/* TOP RIGHT NUMBER (Absolute for stability) */}
      <span className="absolute top-8 right-10 text-7xl font-black text-white/5 select-none leading-none tracking-tighter group-hover:text-white/[0.07] transition-colors">
        0{project.id}
      </span>

      {/* HEADER: Title and Tech Stack */}
      <div className="flex flex-col gap-5 shrink-0 relative z-10 pr-16">
        <div className="flex flex-col gap-2">
          <span className="text-[10px] font-bold text-blue-400 uppercase tracking-[0.3em]">
            {formatText(project.subtitle)}
          </span>
          <h3 className="text-3xl font-black text-white leading-tight tracking-tight mb-0! group-hover:text-blue-50">
            {formatText(project.title)}
          </h3>
        </div>

        {/* TECH TAGS */}
        <div className="flex flex-wrap gap-2">
          {project.tech &&
            project.tech.map((t, i) => (
              <span
                key={i}
                className="px-3 py-1 bg-blue-500/5 border border-white/5 rounded-full text-[9px] font-bold text-blue-300/80 uppercase tracking-widest whitespace-nowrap"
              >
                {t}
              </span>
            ))}
        </div>
      </div>

      {/* CONTENT: Description and Highlights */}
      <div className="flex-grow flex flex-col justify-center gap-6 relative z-10 py-4">
        <p className="text-slate-400 text-base leading-relaxed font-medium mb-0!">
          {formatText(project.description)}
        </p>

        {/* Highlights List */}
        <div className="space-y-3">
          <ul className="space-y-2.5">
            {project.highlights.map((h, i) => (
              <li
                key={i}
                className="text-sm text-slate-300 flex items-center gap-3"
              >
                <span className="w-1.5 h-px bg-blue-500/50 shrink-0" />
                <span className="leading-tight font-medium opacity-70 group-hover:opacity-100 transition-opacity">
                  {formatText(h)}
                </span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* FOOTER: Actions and Bionic Toggle */}
      <div className="flex flex-col gap-6 shrink-0 relative z-10 pt-8 mt-auto border-t border-white/5">
        <div className="flex items-center justify-between gap-4">
          <div className="flex gap-8">
            <a
              href={project.github}
              target="_blank"
              rel="noopener noreferrer"
              className="text-[11px] text-white/90 font-bold uppercase tracking-[0.2em] relative group/link inline-flex items-center gap-2"
            >
              <span>Source</span>
              <span className="absolute -bottom-1 left-0 w-0 h-px bg-blue-500 transition-all group-hover/link:w-full" />
            </a>
            {project.link && (
              <a
                href={project.link}
                target="_blank"
                rel="noopener noreferrer"
                className="text-[11px] text-white/90 font-bold uppercase tracking-[0.2em] relative group/link inline-flex items-center gap-2"
              >
                <span>Live</span>
                <span className="absolute -bottom-1 left-0 w-0 h-px bg-blue-500 transition-all group-hover/link:w-full" />
              </a>
            )}
          </div>

          {/* ACTION: Bionic Reading Toggle */}
          {project.id === 1 && (
            <button
              onClick={toggleBionic}
              className="px-4 py-2 bg-yellow-500/5 hover:bg-yellow-500 border border-yellow-500/20 text-yellow-500 hover:text-black text-[9px] font-black uppercase tracking-widest rounded transition-all active:scale-95 cursor-pointer"
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
