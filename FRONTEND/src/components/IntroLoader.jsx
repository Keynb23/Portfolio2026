import { useEffect, useRef } from "react";
import gsap from "gsap";

// Fake terminal boot: a wall of flickering 1s and 0s, a quick dip to
// black, then the page fades in underneath. App only mounts this when
// the intro should play (first load of a browser session, motion OK).
//
// Receives setPhase directly because it's a stable function — inline
// callbacks would change identity every render and restart the effect.
export default function IntroLoader({ setPhase }) {
  const overlayRef = useRef(null);
  const textRef = useRef(null);

  useEffect(() => {
    sessionStorage.setItem("intro-played", "true");
    const pre = textRef.current;
    const overlay = overlayRef.current;

    // Size the character grid to the viewport. 8×18px approximates a
    // 13px monospace glyph; overshoot just gets clipped by the overlay.
    const cols = Math.ceil(window.innerWidth / 8);
    const rows = Math.ceil(window.innerHeight / 18);
    const digits = Array.from({ length: rows * cols }, () => (Math.random() < 0.5 ? "1" : "0"));

    // textContent straight into the DOM — flicking hundreds of digits
    // through React state 14×/second would be pointless re-render churn.
    const paint = () => {
      let out = "";
      for (let r = 0; r < rows; r++) {
        out += digits.slice(r * cols, (r + 1) * cols).join("") + "\n";
      }
      pre.textContent = out;
    };
    paint();

    // Flip a quarter of the digits every tick so the wall shimmers.
    const flicker = setInterval(() => {
      for (let i = 0; i < digits.length; i++) {
        if (Math.random() < 0.25) digits[i] = digits[i] === "1" ? "0" : "1";
      }
      paint();
    }, 70);

    // ~1s flicker → 0.25s dip to black → mount page → 0.45s fade-out.
    const tl = gsap.timeline();
    tl.to(pre, {
      opacity: 0,
      duration: 0.25,
      delay: 1,
      onStart: () => clearInterval(flicker),
    })
      .add(() => setPhase("reveal"))
      .to(overlay, { opacity: 0, duration: 0.45, onComplete: () => setPhase("done") });

    return () => {
      clearInterval(flicker);
      tl.kill();
    };
  }, [setPhase]);

  return (
    <div ref={overlayRef} aria-hidden="true" className="fixed inset-0 z-[100] bg-ink">
      <pre
        ref={textRef}
        className="h-full w-full overflow-hidden font-mono text-[13px] leading-[18px] text-sage/50 select-none"
      />
    </div>
  );
}
