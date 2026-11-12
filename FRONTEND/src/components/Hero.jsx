import { Fragment, useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import { ChevronRight } from "lucide-react";
import { profile } from "../content";
import Magnetic from "../animation/Magnetic";
import swayScrollTo from "../animation/swayScrollTo";
import { allowsMouseEffects, prefersReducedMotion } from "../animation/motion";

export default function Hero({ onOpenResume }) {
  const sectionRef = useRef(null);
  const glowRef = useRef(null);

  // Letter-by-letter name entrance.
  useLayoutEffect(() => {
    if (prefersReducedMotion()) return;
    const ctx = gsap.context(() => {
      gsap.from(".hero-letter", {
        yPercent: 70,
        opacity: 0,
        duration: 0.7,
        ease: "power3.out",
        stagger: 0.035,
        delay: 0.15,
      });
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  // The background glow drifts toward the cursor instead of sitting still.
  useLayoutEffect(() => {
    const section = sectionRef.current;
    const glow = glowRef.current;
    if (!section || !glow || !allowsMouseEffects()) return;

    // Slow duration = the glow lags behind the cursor, which feels like
    // depth rather than a thing chasing the mouse.
    const xTo = gsap.quickTo(glow, "x", { duration: 1.4, ease: "power3.out" });
    const yTo = gsap.quickTo(glow, "y", { duration: 1.4, ease: "power3.out" });

    const onMove = (e) => {
      // Shift by a fraction of the cursor's offset from screen center.
      xTo((e.clientX - window.innerWidth / 2) * 0.12);
      yTo((e.clientY - window.innerHeight / 2) * 0.12);
    };
    section.addEventListener("mousemove", onMove);
    return () => {
      section.removeEventListener("mousemove", onMove);
      gsap.killTweensOf(glow);
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      id="top"
      className="relative flex min-h-svh flex-col items-center justify-center overflow-hidden px-5 pt-12 text-center"
    >
      {/* Faint forest glow so the black has some depth */}
      <div
        ref={glowRef}
        aria-hidden="true"
        className="pointer-events-none absolute top-1/2 left-1/2 h-[60vmax] w-[60vmax] -translate-x-1/2 -translate-y-1/2 rounded-full bg-forest/20 blur-[120px]"
      />

      <div className="relative">
        <p className="rise mb-6 inline-flex items-center gap-2 text-sm font-medium text-sage md:text-base">
          <span className="h-1.5 w-1.5 rounded-full bg-sage" aria-hidden="true" />
          {profile.title}
        </p>

        {/* aria-label keeps the name readable to screen readers while the
            visual letters are individual animated spans. */}
        <h1
          aria-label={profile.name}
          className="text-[clamp(3.25rem,11vw,8.5rem)] leading-[0.95] font-semibold tracking-[-0.04em]"
        >
          {/* Letters are grouped per word (whitespace-nowrap) so the name
              can only wrap at spaces, never mid-word on narrow screens. */}
          {profile.name.split(" ").map((word, w) => (
            <Fragment key={w}>
              {w > 0 && " "}
              <span aria-hidden="true" className="inline-block whitespace-nowrap">
                {word.split("").map((ch, i) => (
                  <span key={i} className="hero-letter inline-block">
                    {ch}
                  </span>
                ))}
              </span>
            </Fragment>
          ))}
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
          <Magnetic>
            <button
              type="button"
              onClick={onOpenResume}
              className="cursor-pointer rounded-full bg-white px-7 py-3 text-base font-medium text-ink transition-colors hover:bg-sage"
            >
              View résumé
            </button>
          </Magnetic>
          <a
            href="#work"
            onClick={(e) => {
              e.preventDefault();
              swayScrollTo("#work");
            }}
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
