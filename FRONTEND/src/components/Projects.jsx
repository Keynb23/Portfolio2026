import { ArrowUpRight } from "lucide-react";
import { featuredProjects, moreProjects } from "../content";
import Reveal from "./Reveal";
import SectionHeading from "./SectionHeading";

// Bolds the first half of each word, the way the Bionic Reading app does.
function Bionic({ text }) {
  return text.split(" ").map((word, i) => {
    const cut = Math.ceil(word.length / 2);
    return (
      <span key={i}>
        <b className="font-bold text-white">{word.slice(0, cut)}</b>
        <span className="text-neutral-400">{word.slice(cut)}</span>{" "}
      </span>
    );
  });
}

function BionicVisual() {
  return (
    <div className="relative flex h-full min-h-72 items-center justify-center overflow-hidden rounded-2xl bg-ink p-8 md:p-12">
      <div
        aria-hidden="true"
        className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_25%,rgb(0_0_0/0.9)_75%)]"
      />
      <p className="relative max-w-sm text-xl leading-relaxed font-normal md:text-2xl" aria-hidden="true">
        <Bionic text="Guiding the eye through each word helps readers keep their focus." />
      </p>
    </div>
  );
}

function SiteVisual({ url }) {
  const host = new URL(url).hostname.replace("www.", "");
  return (
    <div className="flex h-full min-h-72 flex-col overflow-hidden rounded-2xl bg-sand" aria-hidden="true">
      <div className="flex items-center gap-2 border-b border-stone px-4 py-3">
        <span className="h-2.5 w-2.5 rounded-full bg-stone" />
        <span className="h-2.5 w-2.5 rounded-full bg-stone" />
        <span className="h-2.5 w-2.5 rounded-full bg-stone" />
        <span className="ml-3 rounded-md bg-white px-3 py-0.5 text-xs text-neutral-500">{host}</span>
      </div>
      <div className="flex flex-1 flex-col justify-center gap-4 p-8 md:p-10">
        <div className="h-2 w-16 rounded-full bg-forest" />
        <p className="text-3xl font-semibold tracking-tight text-ink md:text-4xl">Better State</p>
        <div className="space-y-2">
          <div className="h-2 w-4/5 rounded-full bg-stone" />
          <div className="h-2 w-3/5 rounded-full bg-stone" />
        </div>
        <div className="mt-2 grid grid-cols-3 gap-3">
          <div className="h-16 rounded-lg bg-white" />
          <div className="h-16 rounded-lg bg-white" />
          <div className="h-16 rounded-lg bg-white" />
        </div>
      </div>
    </div>
  );
}

function TextLink({ href, children }) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="group inline-flex items-center gap-1 font-medium text-sage hover:underline hover:underline-offset-4"
    >
      {children}
      <ArrowUpRight size={16} className="transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
    </a>
  );
}

function Tags({ items }) {
  return (
    <ul className="flex flex-wrap gap-2">
      {items.map((t) => (
        <li key={t} className="rounded-full border border-white/15 px-3 py-1 text-xs text-neutral-300">
          {t}
        </li>
      ))}
    </ul>
  );
}

export default function Projects() {
  return (
    <section id="work" className="py-28 md:py-40">
      <div className="mx-auto max-w-6xl px-5 md:px-8">
        <SectionHeading eyebrow="Selected work" title="Projects built with care." />

        <div className="space-y-8">
          {featuredProjects.map((project) => (
            <Reveal
              key={project.name}
              as="article"
              className="grid gap-10 rounded-3xl bg-neutral-900 p-6 md:p-10 lg:grid-cols-2 lg:items-stretch lg:gap-14"
            >
              <div className="flex flex-col justify-between gap-10 lg:py-4">
                <div>
                  <p className="mb-3 text-sm font-medium text-sage">{project.kind}</p>
                  <h3 className="text-3xl font-semibold tracking-tight md:text-4xl">{project.name}</h3>
                  <p className="mt-5 text-lg leading-relaxed text-neutral-300">{project.description}</p>
                  <ul className="mt-5 space-y-2">
                    {project.bullets.map((b) => (
                      <li key={b} className="flex gap-3 leading-relaxed text-neutral-400">
                        <span className="mt-[0.7em] h-1 w-1 shrink-0 rounded-full bg-sage" aria-hidden="true" />
                        {b}
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="space-y-6">
                  <Tags items={project.tech} />
                  <div className="flex gap-8">
                    {project.live && <TextLink href={project.live}>Visit site</TextLink>}
                    <TextLink href={project.source}>Source code</TextLink>
                  </div>
                </div>
              </div>
              {project.visual === "bionic" ? <BionicVisual /> : <SiteVisual url={project.live} />}
            </Reveal>
          ))}
        </div>

        <Reveal className="mt-24">
          <h3 className="mb-6 text-sm font-semibold tracking-wide text-neutral-400">More projects</h3>
          <ul className="divide-y divide-white/10 border-y border-white/10">
            {moreProjects.map((project) => (
              <li key={project.name}>
                <a
                  href={project.source}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group grid gap-3 py-7 md:grid-cols-12 md:items-center md:gap-8"
                >
                  <span className="text-xl font-semibold tracking-tight md:col-span-3">{project.name}</span>
                  <span className="leading-relaxed text-neutral-400 md:col-span-5">{project.description}</span>
                  <span className="text-sm text-neutral-500 md:col-span-3">{project.tech.join(" · ")}</span>
                  <ArrowUpRight
                    size={20}
                    className="hidden text-neutral-500 transition group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-sage md:col-span-1 md:block md:justify-self-end"
                    aria-label="View on GitHub"
                  />
                </a>
              </li>
            ))}
          </ul>
        </Reveal>
      </div>
    </section>
  );
}
