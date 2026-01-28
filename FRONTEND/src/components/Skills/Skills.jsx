import { useEffect, useRef, useState } from "react";
import { useButton } from "react-aria";

const skillItems = [
  { name: "HTML5", icon: "🟧" },
  { name: "CSS3", icon: "🟦" },
  { name: "JavaScript", icon: "🟨" },
  { name: "TypeScript", icon: "🔷" },
  { name: "React", icon: "⚛️" },
  { name: "TailwindCSS", icon: "🌬️" },
  { name: "Node.js", icon: "🟢" },
  { name: "Git", icon: "🔧" },
  { name: "Python", icon: "🐍" },
  { name: "C#", icon: "♯" },
];

const toolsItems = [
  { name: "VS Code", icon: "🖥️" },
  { name: "Visual Studios", icon: "🖥️" },
  { name: "GitHub", icon: "🐙" },
  { name: "Postman", icon: "📬" },
  { name: "Firebase", icon: "🔥" },
  { name: "Vercel", icon: "🚀" },
  { name: "Netlify", icon: "🛰️" },
  { name: "MySQL", icon: "🗄️" },
  { name: "Blender", icon: "🧩" },
  { name: "Unreal Engine", icon: "🎮" },
];

function TabButton({ children, isActive, onPress, ...props }) {
  const ref = useRef(null);
  const { buttonProps } = useButton({ ...props, onPress }, ref);

  const primaryStyle = "text-[#FDB927] bg-[#002D62] border-[#002D62] hover:bg-[#FDB927] hover:text-[#002D62] border-2 hover:border-[#FDB927]";
  const secondaryStyle = "text-white bg-transparent hover:text-[#FDB927] border-2 border-transparent";

  return (
    <button
      {...buttonProps}
      ref={ref}
      className={`z-10 font-bold rounded-lg text-sm px-6 py-3 text-center transition-all duration-300 focus:outline-none ${
        isActive ? primaryStyle : secondaryStyle
      }`}
    >
      {children}
    </button>
  );
}

const Skills = () => {
  const sectionRef = useRef(null);
  const [isVisible, setIsVisible] = useState(false);
  const [activeTab, setActiveTab] = useState("skills");

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;
    const obs = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        setIsVisible(true);
        obs.disconnect();
      }
    }, { threshold: 0.12 });
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  const renderGrid = (items) => (
    <div className="w-full">
      <div className="grid grid-cols-2 sm:grid-cols-3 xl:grid-cols-4 gap-6 w-full">
        {items.map((item, i) => (
          <div
            key={item.name}
            className="aspect-square flex flex-col items-center justify-center p-6 rounded-2xl bg-slate-900/40 border border-slate-800 shadow-md transition-all duration-500 hover:border-[#FDB927]/50"
            style={{
              transform: isVisible ? "translateY(0)" : "translateY(20px)",
              opacity: isVisible ? 1 : 0,
              transitionDelay: `${100 + i * 40}ms`
            }}
          >
            <div className="text-4xl mb-4">{item.icon}</div>
            <div className="text-xs text-slate-300 font-semibold text-center uppercase tracking-wider">
              {item.name}
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  return (
    <section id="skills" ref={sectionRef} className="w-full min-h-[80vh] flex flex-col justify-center bg-[#071022] relative overflow-hidden pt-24">
      <div className="container mx-auto px-6">
        <div className="flex flex-col lg:flex-row items-start justify-between gap-16 lg:gap-24">
          
          {/* LEFT CONTENT */}
          <div className={`flex-1 transition-all duration-700 ${isVisible ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-10"}`}>
            <div className="flex">
              <div className="hidden md:flex flex-col items-center mr-12 pt-2">
                <span className="rotate-180 [writing-mode:vertical-lr] text-[10px] tracking-[0.3em] uppercase text-slate-500 font-bold mb-8">
                  All Skills
                </span>
                <div className="w-[2px] h-32 bg-gradient-to-b from-[#002D62] to-[#FDB927]" />
              </div>

              <div>
                <h2 className="text-5xl md:text-7xl font-extrabold text-white leading-[1.1] tracking-tight">
                  Explore My<br />Expertise &amp;<br />Tech Stack
                </h2>
                <p className="mt-10 text-slate-400 text-lg leading-relaxed max-w-xl">
                  These are the tools and technologies that I use daily to develop
                  applications. With a strong foundation in frontend, I focus on
                  delivering clean, maintainable code.
                </p>
                <div className="mt-12 flex gap-4">
                  <TabButton isActive={activeTab === "skills"} onPress={() => setActiveTab("skills")}>Skills</TabButton>
                  <TabButton isActive={activeTab === "tools"} onPress={() => setActiveTab("tools")}>Tools</TabButton>
                </div>
              </div>
            </div>
          </div>

          {/* RIGHT GRID */}
          <div className={`flex-1 w-full transition-all duration-1000 ${isVisible ? "opacity-100" : "opacity-0"}`}>
            {activeTab === "skills" ? renderGrid(skillItems) : renderGrid(toolsItems)}
          </div>
        </div>
      </div>

      {/* 20% Visual Spacer - Forces empty space at the bottom of the section */}
      <div className="h-[20vh] w-full pointer-events-none"></div>
    </section>
  );
};

export default Skills;