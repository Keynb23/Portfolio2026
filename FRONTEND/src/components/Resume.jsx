import { education, experience, profile, resumeProjects, skills } from "../content";

function Heading({ children }) {
  return (
    <h2 className="mb-3 border-b border-neutral-300 pb-1 text-xs font-bold tracking-[0.15em] text-forest uppercase">
      {children}
    </h2>
  );
}

function Bullets({ items }) {
  return (
    <ul className="mt-1.5 list-disc space-y-1 pl-5 marker:text-neutral-400">
      {items.map((b) => (
        <li key={b}>{b}</li>
      ))}
    </ul>
  );
}

const linkClass = "text-forest underline-offset-2 hover:underline";

// Printable résumé. Mirrors "Key'n Brosdahl — Resume.md".
export default function Resume() {
  return (
    <div className="bg-white px-8 py-10 text-[13px] leading-snug text-neutral-800 sm:px-12 sm:py-12 print:p-0">
      <header className="mb-6">
        <h1 className="text-3xl font-bold tracking-tight text-ink">{profile.name}</h1>
        <p className="mt-1 text-neutral-600">
          <span className="font-semibold text-ink">{profile.title}</span> · {profile.location} ·{" "}
          {profile.phone} ·{" "}
          <a href={`mailto:${profile.email}`} className={linkClass}>
            {profile.email}
          </a>
        </p>
        <p className="mt-1 space-x-3">
          <a href={profile.links.portfolio} className={linkClass}>Portfolio</a>
          <a href={profile.links.github} className={linkClass}>GitHub</a>
          <a href={profile.links.linkedin} className={linkClass}>LinkedIn</a>
        </p>
      </header>

      <section className="mb-5">
        <Heading>Summary</Heading>
        <p>{profile.summary}</p>
      </section>

      <section className="mb-5">
        <Heading>Skills</Heading>
        <dl className="space-y-0.5">
          {skills.map((s) => (
            <div key={s.group} className="flex gap-1.5">
              <dt className="font-semibold text-ink">{s.group}:</dt>
              <dd>{s.items.join(", ")}</dd>
            </div>
          ))}
        </dl>
      </section>

      <section className="mb-5">
        <Heading>Experience</Heading>
        <div className="space-y-4">
          {experience.map((job) => (
            <div key={job.company} className="break-inside-avoid">
              <p className="flex justify-between gap-4">
                <span>
                  <span className="font-bold text-ink">{job.company}</span> — {job.location}
                </span>
                <span className="shrink-0 text-neutral-500">{job.period}</span>
              </p>
              {(job.resumeRoles ?? job.roles).map((role) => (
                <div key={role.title} className="mt-2">
                  <p className="font-semibold text-ink italic">{role.title}</p>
                  <Bullets items={role.bullets} />
                </div>
              ))}
            </div>
          ))}
        </div>
      </section>

      <section className="mb-5">
        <Heading>Projects</Heading>
        <div className="space-y-3">
          {resumeProjects.map((p) => (
            <div key={p.name} className="break-inside-avoid">
              <p>
                <span className="font-bold text-ink">{p.name}</span>{" "}
                <span className="text-neutral-500">— {p.meta}</span>
              </p>
              <Bullets items={p.bullets} />
            </div>
          ))}
        </div>
      </section>

      <section>
        <Heading>Education</Heading>
        <p className="flex justify-between gap-4">
          <span>
            <span className="font-bold text-ink">{education.school}</span> — {education.credential} ·{" "}
            {education.location}
          </span>
          <span className="shrink-0 text-neutral-500">{education.period}</span>
        </p>
        <Bullets items={[education.detail]} />
      </section>
    </div>
  );
}
