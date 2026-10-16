import { ArrowUpRight } from "lucide-react";
import { profile } from "../content";
import Reveal from "./Reveal";

export default function Contact({ onOpenResume }) {
  const pill =
    "inline-flex cursor-pointer items-center gap-1.5 rounded-full border border-white/20 px-6 py-3 font-medium transition-colors hover:border-white hover:bg-white hover:text-ink";

  return (
    <section id="contact" className="relative overflow-hidden py-32 md:py-48">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -bottom-1/2 left-1/2 h-[50vmax] w-[50vmax] -translate-x-1/2 rounded-full bg-forest/25 blur-[120px]"
      />
      <Reveal className="relative mx-auto max-w-4xl px-5 text-center md:px-8">
        <p className="mb-4 text-sm font-semibold tracking-wide text-sage">Contact</p>
        <h2 className="text-5xl font-semibold tracking-tight md:text-7xl">Let's talk.</h2>
        <p className="mx-auto mt-6 max-w-xl text-lg leading-relaxed text-neutral-400 md:text-xl">
          Have a role, a project, or a question? Email is the fastest way to reach me.
        </p>

        <a
          href={`mailto:${profile.email}`}
          className="mt-10 inline-block text-2xl font-medium tracking-tight text-white underline decoration-sage/50 underline-offset-8 transition-colors hover:text-sage md:text-4xl"
        >
          {profile.email}
        </a>

        <div className="mt-12 flex flex-wrap justify-center gap-3">
          <a href={profile.links.linkedin} target="_blank" rel="noopener noreferrer" className={pill}>
            LinkedIn <ArrowUpRight size={16} />
          </a>
          <a href={profile.links.github} target="_blank" rel="noopener noreferrer" className={pill}>
            GitHub <ArrowUpRight size={16} />
          </a>
          <button type="button" onClick={onOpenResume} className={pill}>
            Résumé
          </button>
        </div>
      </Reveal>
    </section>
  );
}
