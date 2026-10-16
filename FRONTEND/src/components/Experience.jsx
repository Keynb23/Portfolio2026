import { experience } from "../content";
import Reveal from "./Reveal";
import SectionHeading from "./SectionHeading";

function BulletList({ items }) {
  return (
    <ul className="space-y-3">
      {items.map((item) => (
        <li key={item} className="flex gap-3 leading-relaxed text-neutral-600">
          <span className="mt-[0.7em] h-1 w-1 shrink-0 rounded-full bg-forest" aria-hidden="true" />
          {item}
        </li>
      ))}
    </ul>
  );
}

export default function Experience() {
  return (
    <section id="experience" className="bg-paper py-28 text-ink md:py-40">
      <div className="mx-auto max-w-6xl px-5 md:px-8">
        <SectionHeading
          tone="light"
          eyebrow="Experience"
          title="Shipping features students use every day."
        />

        <div className="divide-y divide-stone border-t border-stone">
          {experience.map((job) => (
            <Reveal key={job.company} as="article" className="grid gap-8 py-14 md:grid-cols-12 md:gap-12">
              <div className="md:col-span-4">
                <h3 className="text-3xl font-semibold tracking-tight">{job.company}</h3>
                <p className="mt-2 text-neutral-500">{job.location}</p>
                <p className="mt-1 text-sm font-medium text-forest">{job.period}</p>
              </div>

              <div className="space-y-12 md:col-span-8">
                {job.shipped && (
                  <div>
                    <h4 className="mb-5 text-sm font-semibold tracking-wide text-neutral-500">
                      What I've worked on
                    </h4>
                    <div className="grid gap-4 sm:grid-cols-2">
                      {job.shipped.map((feature) => (
                        <div key={feature.name} className="rounded-2xl bg-sand p-6">
                          <p className="font-semibold tracking-tight">{feature.name}</p>
                          <p className="mt-2 text-[0.95rem] leading-relaxed text-neutral-600">
                            {feature.detail}
                          </p>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {job.roles.map((role) => (
                  <div key={role.title}>
                    <h4 className="mb-4 text-xl font-semibold tracking-tight">{role.title}</h4>
                    <BulletList items={role.bullets} />
                  </div>
                ))}
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
