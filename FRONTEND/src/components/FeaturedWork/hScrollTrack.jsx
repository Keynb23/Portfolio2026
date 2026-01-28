/**
 * ProjectCard: The individual object that moves along the track.
 */
const ProjectCard = ({ project, formatText, toggleBionic, isBionicMode }) => {
  return (
    <article className="flex-shrink-0 w-[450px] h-[600px] bg-[#0d1629] border border-slate-800/80 rounded-[2.5rem] p-12 flex flex-col justify-between group transition-all duration-500 hover:border-slate-500 relative overflow-hidden">
      <div className="flex flex-col gap-2 shrink-0">
        <span className="text-[10px] font-bold text-blue-500 uppercase tracking-[0.25em]">
          {formatText(project.subtitle)}
        </span>
        <h3 className="text-3xl font-bold text-white leading-none tracking-tight">
          {formatText(project.title)}
        </h3>
      </div>

      <div className="flex-grow flex flex-col justify-center gap-5">
        <p className="text-slate-400 text-sm leading-relaxed">
          {formatText(project.description)}
        </p>
        
        {project.id === 1 && (
          <div className="mt-4">
            <button 
              onClick={toggleBionic}
              className="px-4 py-2 bg-yellow-500 text-[#002D62] text-[10px] font-black uppercase tracking-widest rounded shadow-lg hover:bg-yellow-400 transition-transform active:scale-95"
            >
              {isBionicMode ? "Disable Bionic" : "Enable Bionic"}
            </button>
          </div>
        )}

        <div>
          <h4 className="text-[9px] font-black text-slate-600 uppercase tracking-[0.25em] mb-3">
            Project Scope
          </h4>
          <ul className="space-y-2">
            {project.highlights.map((h, i) => (
              <li key={i} className="text-xs text-slate-300 flex items-start gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-blue-600 mt-1.5 shrink-0" />
                <span className="leading-tight">{formatText(h)}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="flex flex-col gap-5 shrink-0 pt-5 border-t border-slate-800">
        <div className="flex items-center justify-between">
          <div className="flex gap-6">
            <a href={project.github} target="_blank" rel="noopener noreferrer" className="text-[10px] text-white font-black uppercase tracking-widest border-b border-transparent hover:border-white transition-all">
              Source
            </a>
            {project.link && (
              <a href={project.link} target="_blank" rel="noopener noreferrer" className="text-[10px] text-white font-black uppercase tracking-widest border-b border-transparent hover:border-white transition-all">
                Live
              </a>
            )}
          </div>
          <span className="text-4xl font-black text-slate-800/40 select-none">
            0{project.id}
          </span>
        </div>
      </div>
    </article>
  );
};

/**
 * HScrollTrack: The path (the track) that coordinates the motion.
 */
const HScrollTrack = ({ trackRef, projects, formatText, toggleBionic, isBionicMode }) => {
  return (
    <div className="h-full w-full flex items-center overflow-hidden">
      <div 
        ref={trackRef} 
        className="flex gap-16 px-4 will-change-transform items-center h-full" 
        style={{ 
          width: "max-content",
          paddingLeft: "calc(50vw - 225px)",
          paddingRight: "calc(50vw + 25px)" 
        }}
      >
        {projects.map((project) => (
          <ProjectCard 
            key={project.id} 
            project={project} 
            formatText={formatText} 
            toggleBionic={toggleBionic}
            isBionicMode={isBionicMode}
          />
        ))}
      </div>
    </div>
  );
};

export default HScrollTrack;