import React from "react";
import { useBionic } from "../../hooks/useBionic";

/**
 * RESUME Component - A stylized display of professional qualifications.
 * Formatted for both digital dark-mode display and professional light-mode PDF export.
 */
export const RESUME = () => {
  const { formatText } = useBionic();
  return (
    <div className="space-y-10 print:text-black">
      {/* Header Info */}
      <div className="border-b border-white/10 pb-8 print:border-black/20">
        <h1 className="text-4xl font-black text-white print:text-black uppercase tracking-tighter mb-2">
          Key’n Brosdahl
        </h1>
        <p className="text-xl font-bold text-pacers-gold print:text-pacers-navy uppercase tracking-widest mb-4">
          Software Engineer
        </p>
        <div className="flex flex-wrap gap-x-6 gap-y-2 text-sm font-bold text-zinc-400 print:text-zinc-700">
          <span>573-397-8946</span>
          <a
            href="mailto:keynb50@gmail.com"
            className="hover:text-pacers-gold transition-colors"
          >
            keynb50@gmail.com
          </a>
          <span className="print:hidden text-zinc-600">|</span>
          <a
            href="https://keynb.netlify.app/"
            className="hover:text-pacers-gold transition-colors"
          >
            keynb.netlify.app
          </a>
        </div>
      </div>

      {/* Professional Summary */}
      <section>
        <h2 className="text-xs font-black text-white/40 print:text-black/40 uppercase tracking-[0.3em] mb-4">
          Professional Summary
        </h2>
        <p className="text-zinc-200 print:text-zinc-900 leading-relaxed font-semibold">
          {formatText(`Software Engineer with a strong front-end focus, specializing in
          clean, responsive, and user-centered interfaces. Experienced with
          React, JavaScript/TypeScript, and C#, building scalable component
          architectures and integrating APIs across modern web applications.
          Known for translating design intent into polished, accessible UI while
          continuously expanding technical depth.`)}
        </p>
      </section>

      {/* Skills Grid */}
      <section>
        <h2 className="text-xs font-black text-white/40 print:text-black/40 uppercase tracking-[0.3em] mb-6">
          Technical Expertise
        </h2>
        <div className="grid grid-cols-2 gap-x-12 gap-y-6">
          <div>
            <h3 className="text-[10px] font-black text-pacers-gold print:text-pacers-navy uppercase tracking-widest mb-2">
              Languages
            </h3>
            <p className="text-zinc-300 print:text-zinc-800 font-bold">
              JavaScript, TypeScript, Python, C#
            </p>
          </div>
          <div>
            <h3 className="text-[10px] font-black text-pacers-gold print:text-pacers-navy uppercase tracking-widest mb-2">
              Frameworks
            </h3>
            <p className="text-zinc-300 print:text-zinc-800 font-bold">
              React, Three.js, Tailwind CSS, Firebase, Flask
            </p>
          </div>
          <div>
            <h3 className="text-[10px] font-black text-pacers-gold print:text-pacers-navy uppercase tracking-widest mb-2">
              Tools
            </h3>
            <p className="text-zinc-300 print:text-zinc-800 font-bold">
              Git, VS Code, Postman, Blender, Unreal Engine
            </p>
          </div>
          <div>
            <h3 className="text-[10px] font-black text-pacers-gold print:text-pacers-navy uppercase tracking-widest mb-2">
              Databases
            </h3>
            <p className="text-zinc-300 print:text-zinc-800 font-bold">
              MySQL, SQLite, REST, GraphQL
            </p>
          </div>
        </div>
      </section>

      {/* Projects */}
      <section>
        <h2 className="text-xs font-black text-white/40 print:text-black/40 uppercase tracking-[0.3em] mb-8">
          Selected Projects
        </h2>
        <div className="space-y-8">
          <div>
            <h3 className="text-base font-black text-white print:text-black uppercase tracking-tight mb-2">
              {formatText("AutoFiles | C# Desktop Scaffolding Tool")}
            </h3>
            <ul className="list-disc list-outside ml-4 space-y-1.5 text-zinc-400 print:text-zinc-700 text-[13px] font-bold">
              <li>
                {formatText(
                  "Engineered a lightweight C# CLI utility to automate complex directory and file scaffolding.",
                )}
              </li>
              <li>
                Developed a modular architecture (InputParser, RootResolver) for
                portability across .NET environments.
              </li>
              <li>
                Implemented custom text-parsing logic to handle batch creation
                of nested file structures.
              </li>
              <li>
                Compiled as a self-contained executable for cross-platform
                functionality without .NET local install.
              </li>
            </ul>
          </div>
          <div>
            <h3 className="text-base font-black text-white print:text-black uppercase tracking-tight mb-2">
              {formatText("Bionic Reading App | React, Web Speech API")}
            </h3>
            <ul className="list-disc list-outside ml-4 space-y-1.5 text-zinc-400 print:text-zinc-700 text-[13px] font-bold">
              <li>
                Engineered a custom text-processing algorithm applying visual
                anchors to improve reading speed.
              </li>
              <li>
                Developed a distraction-minimized UI with a custom "Tunnel
                Vision" radial gradient.
              </li>
              <li>
                Built an interactive word-assistance engine utilizing the Speech
                Synthesis API for real-time support.
              </li>
            </ul>
          </div>
          <div>
            <h3 className="text-base font-black text-white print:text-black uppercase tracking-tight mb-2">
              {formatText("NexusData | AI-Powered Entity Resolution Engine")}
            </h3>
            <ul className="list-disc list-outside ml-4 space-y-1.5 text-zinc-400 print:text-zinc-700 text-[13px] font-bold">
              <li>
                Engineered an automated ingestion API using spaCy NLP to extract
                entities with dynamic confidence scoring.
              </li>
              <li>
                Implemented searchable SQLite database using SQLAlchemy ORM for
                high-speed retrieval.
              </li>
            </ul>
          </div>
        </div>
      </section>

      {/* Exp & Edu Split */}
      <div className="grid grid-cols-2 gap-12 pt-8 border-t border-white/10 print:border-black/20">
        <section>
          <h2 className="text-xs font-black text-white/40 print:text-black/40 uppercase tracking-[0.3em] mb-6">
            Experience
          </h2>
          <div className="space-y-6">
            <div>
              <h3 className="text-sm font-black text-white print:text-black uppercase tracking-widest">
                {formatText("Acellus Academy")}
              </h3>
              <p className="text-[10px] font-bold text-pacers-gold print:text-pacers-navy mb-2">
                {formatText("Software Engineer | Jan 2026 - Present")}
              </p>
              <p className="text-xs text-zinc-400 print:text-zinc-700 font-bold leading-relaxed">
                Developing and scaling educational platform features serving
                tens of thousands of students.
              </p>
            </div>
            <div>
              <h3 className="text-sm font-black text-white print:text-black uppercase tracking-widest">
                {formatText("AstroSkills")}
              </h3>
              <p className="text-[10px] font-bold text-pacers-gold print:text-pacers-navy mb-2">
                Frontend Intern | Aug 2025 - Sep 2025
              </p>
              <p className="text-xs text-zinc-400 print:text-zinc-700 font-bold leading-relaxed">
                Established UI standards and established secure API integrations
                for learning platforms.
              </p>
            </div>
          </div>
        </section>
        <section>
          <h2 className="text-xs font-black text-white/40 print:text-black/40 uppercase tracking-[0.3em] mb-6">
            Education
          </h2>
          <div>
            <h3 className="text-sm font-black text-white print:text-black uppercase tracking-widest">
              Coding Temple
            </h3>
            <p className="text-[10px] font-bold text-pacers-gold print:text-pacers-navy mb-2">
              Software Engineering | 2025
            </p>
            <p className="text-xs text-zinc-400 print:text-zinc-700 font-bold leading-relaxed">
              Advanced study in Full Stack Development, React, and Machine
              Learning Fundamentals.
            </p>
          </div>
        </section>
      </div>
    </div>
  );
};
