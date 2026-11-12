import { useEffect, useRef } from "react";
import gsap from "gsap";
import { allowsMouseEffects } from "./motion";

// A hard-edged circle that inverts whatever it passes over
// (mix-blend-difference against everything beneath it).
// Drop it as the LAST child of a `relative` section — it tracks the mouse
// within that parent and fades out when the cursor leaves.
export default function Spotlight({ size = 160 }) {
  const ref = useRef(null);

  useEffect(() => {
    const el = ref.current;
    const area = el?.parentElement;
    if (!el || !area || !allowsMouseEffects()) return;

    const xTo = gsap.quickTo(el, "x", { duration: 0.3, ease: "power3.out" });
    const yTo = gsap.quickTo(el, "y", { duration: 0.3, ease: "power3.out" });
    const half = size / 2;
    let visible = false;

    const onMove = (e) => {
      // Position is relative to the parent section, not the viewport.
      const rect = area.getBoundingClientRect();
      xTo(e.clientX - rect.left - half);
      yTo(e.clientY - rect.top - half);
      if (!visible) {
        visible = true;
        gsap.to(el, { opacity: 1, duration: 0.25 });
      }
    };
    const onLeave = () => {
      visible = false;
      gsap.to(el, { opacity: 0, duration: 0.25 });
    };

    area.addEventListener("mousemove", onMove);
    area.addEventListener("mouseleave", onLeave);
    return () => {
      area.removeEventListener("mousemove", onMove);
      area.removeEventListener("mouseleave", onLeave);
      gsap.killTweensOf(el);
    };
  }, [size]);

  return (
    <div
      ref={ref}
      aria-hidden="true"
      className="pointer-events-none absolute top-0 left-0 z-10 rounded-full bg-white opacity-0 mix-blend-difference"
      style={{ width: size, height: size }}
    />
  );
}
