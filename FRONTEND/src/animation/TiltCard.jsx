import { useEffect, useRef } from "react";
import gsap from "gsap";
import { allowsMouseEffects } from "./motion";

// Tilts its surface a few degrees toward the cursor, like a physical card.
// maxDeg stays small on purpose — past ~5° it reads as a gimmick.
export default function TiltCard({ as: Tag = "div", maxDeg = 3, className = "", children }) {
  const ref = useRef(null);

  useEffect(() => {
    const el = ref.current;
    if (!el || !allowsMouseEffects()) return;

    // transformPerspective makes the rotation read as 3D depth.
    gsap.set(el, { transformPerspective: 900 });
    const rxTo = gsap.quickTo(el, "rotationX", { duration: 0.5, ease: "power2.out" });
    const ryTo = gsap.quickTo(el, "rotationY", { duration: 0.5, ease: "power2.out" });

    const onMove = (e) => {
      const rect = el.getBoundingClientRect();
      // -1 … 1 across the card, so the center is neutral.
      const nx = ((e.clientX - rect.left) / rect.width) * 2 - 1;
      const ny = ((e.clientY - rect.top) / rect.height) * 2 - 1;
      ryTo(nx * maxDeg); // cursor right → card turns right
      rxTo(-ny * maxDeg); // cursor down → card tips away
    };
    const onLeave = () => {
      rxTo(0);
      ryTo(0);
    };

    el.addEventListener("mousemove", onMove);
    el.addEventListener("mouseleave", onLeave);
    return () => {
      el.removeEventListener("mousemove", onMove);
      el.removeEventListener("mouseleave", onLeave);
      gsap.killTweensOf(el);
    };
  }, [maxDeg]);

  return (
    <Tag ref={ref} className={className}>
      {children}
    </Tag>
  );
}
