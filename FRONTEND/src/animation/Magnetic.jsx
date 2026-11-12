import { useEffect, useRef } from "react";
import gsap from "gsap";
import { allowsMouseEffects } from "./motion";

// Wraps a button/link so it gently pulls toward the cursor while hovered
// and springs back on leave. Wrap the control, don't modify it:
//   <Magnetic><button>…</button></Magnetic>
export default function Magnetic({ strength = 0.25, className = "", children }) {
  const ref = useRef(null);

  useEffect(() => {
    const el = ref.current;
    if (!el || !allowsMouseEffects()) return;

    const xTo = gsap.quickTo(el, "x", { duration: 0.4, ease: "power3.out" });
    const yTo = gsap.quickTo(el, "y", { duration: 0.4, ease: "power3.out" });

    const onMove = (e) => {
      const rect = el.getBoundingClientRect();
      // Distance from the element's center, scaled down so the pull is subtle.
      xTo((e.clientX - (rect.left + rect.width / 2)) * strength);
      yTo((e.clientY - (rect.top + rect.height / 2)) * strength);
    };
    const onLeave = () => {
      // elastic ease gives the little springy settle on the way back.
      gsap.to(el, { x: 0, y: 0, duration: 0.7, ease: "elastic.out(1, 0.5)" });
    };

    el.addEventListener("mousemove", onMove);
    el.addEventListener("mouseleave", onLeave);
    return () => {
      el.removeEventListener("mousemove", onMove);
      el.removeEventListener("mouseleave", onLeave);
      gsap.killTweensOf(el);
    };
  }, [strength]);

  return (
    <span ref={ref} className={`inline-block ${className}`}>
      {children}
    </span>
  );
}
