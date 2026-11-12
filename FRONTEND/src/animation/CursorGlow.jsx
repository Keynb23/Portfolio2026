import { useEffect, useRef } from "react";
import gsap from "gsap";
import { allowsMouseEffects } from "./motion";

// A soft sage glow that trails the cursor across the page.
// mix-blend-screen means it brightens the dark sections and almost
// disappears on the light ones, so it never fights the content.
export default function CursorGlow() {
  const ref = useRef(null);

  useEffect(() => {
    const el = ref.current;
    if (!el || !allowsMouseEffects()) return;

    // quickTo gives us a cheap, reusable tween — much smoother than
    // starting a brand-new tween on every mousemove event.
    const xTo = gsap.quickTo(el, "x", { duration: 0.7, ease: "power3.out" });
    const yTo = gsap.quickTo(el, "y", { duration: 0.7, ease: "power3.out" });
    const half = el.offsetWidth / 2;

    const onMove = (e) => {
      xTo(e.clientX - half);
      yTo(e.clientY - half);
      // Fade in on the first real mouse position so it never flashes at 0,0.
      if (!el.dataset.awake) {
        el.dataset.awake = "true";
        gsap.to(el, { opacity: 1, duration: 0.6 });
      }
    };

    window.addEventListener("mousemove", onMove);
    return () => {
      window.removeEventListener("mousemove", onMove);
      gsap.killTweensOf(el);
    };
  }, []);

  return (
    <div
      ref={ref}
      aria-hidden="true"
      className="pointer-events-none fixed top-0 left-0 z-30 h-[34rem] w-[34rem] rounded-full opacity-0 mix-blend-screen"
      style={{
        background:
          "radial-gradient(circle, rgb(156 191 163 / 0.10) 0%, rgb(47 93 58 / 0.06) 45%, transparent 70%)",
      }}
    />
  );
}
