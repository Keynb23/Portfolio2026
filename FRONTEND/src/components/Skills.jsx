import { skills } from "../content";
import Reveal from "./Reveal";
import SectionHeading from "./SectionHeading";

export default function Skills() {
  return (
    <section id="skills" className="bg-sand py-28 text-ink md:py-40">
      <div className="mx-auto max-w-6xl px-5 md:px-8">
        <SectionHeading tone="light" eyebrow="Skills" title="The tools I use every day." />

        <div className="grid gap-x-12 gap-y-12 sm:grid-cols-2 lg:grid-cols-3">
          {skills.map((s, i) => (
            <Reveal
              key={s.group}
              delay={i * 80}
              className={`border-t border-ink/15 pt-6 ${s.group === "Libraries" ? "lg:row-span-2" : ""}`}
            >
              <h3 className="mb-5 text-sm font-semibold tracking-wide text-forest">{s.group}</h3>
              <ul className="space-y-2">
                {s.items.map((item) => (
                  <li key={item} className="text-2xl font-medium tracking-tight">
                    {item}
                  </li>
                ))}
              </ul>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
