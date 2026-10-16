import { ChevronRight } from "lucide-react";
import { profile } from "../content";

export default function Hero({ onOpenResume }) {
  return (
    <section
      id="top"
      className="relative flex min-h-svh flex-col items-center justify-center overflow-hidden px-5 pt-12 text-center"
    >
      {/* Faint forest glow so the black has some depth */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute top-1/2 left-1/2 h-[60vmax] w-[60vmax] -translate-x-1/2 -translate-y-1/2 rounded-full bg-forest/20 blur-[120px]"
      />

      <div className="relative">
        <p className="rise mb-6 inline-flex items-center gap-2 text-sm font-medium text-sage md:text-base">
          <span className="h-1.5 w-1.5 rounded-full bg-sage" aria-hidden="true" />
          {profile.title} at Acellus
        </p>

        <h1
          className="rise text-[clamp(3.25rem,11vw,8.5rem)] leading-[0.95] font-semibold tracking-[-0.04em]"
          style={{ animationDelay: "120ms" }}
        >
          {profile.name}
        </h1>

        <p
          className="rise mx-auto mt-8 max-w-2xl text-lg leading-relaxed text-neutral-400 md:text-2xl"
          style={{ animationDelay: "240ms" }}
        >
          I build React and TypeScript features for an education platform used by homeschool
          families.
        </p>

        <div
          className="rise mt-10 flex flex-wrap items-center justify-center gap-x-8 gap-y-4"
          style={{ animationDelay: "360ms" }}
        >
          <button
            type="button"
            onClick={onOpenResume}
            className="cursor-pointer rounded-full bg-white px-7 py-3 text-base font-medium text-ink transition-colors hover:bg-sage"
          >
            View résumé
          </button>
          <a
            href="#work"
            className="group inline-flex items-center gap-1 text-base font-medium text-sage hover:underline hover:underline-offset-4"
          >
            See my work
            <ChevronRight size={18} className="transition-transform group-hover:translate-x-0.5" />
          </a>
        </div>
      </div>
    </section>
  );
}
