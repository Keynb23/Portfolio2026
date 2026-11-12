import gsap from "gsap";
import { ScrollToPlugin } from "gsap/ScrollToPlugin";
import { prefersReducedMotion } from "./motion";

gsap.registerPlugin(ScrollToPlugin);

const NAV_HEIGHT = 48; // matches the fixed h-12 header

// Smooth-scrolls to an anchor ("#work") with a gentle sideways sway:
// the page drifts a few pixels toward the direction of travel, then
// settles straight as it arrives.
export default function swayScrollTo(hash) {
  const target = document.querySelector(hash);
  if (!target) return;

  // Keep the URL shareable even though we preventDefault the anchor click.
  history.pushState(null, "", hash);

  if (prefersReducedMotion()) {
    target.scrollIntoView();
    return;
  }

  // The browser's own `scroll-behavior: smooth` fights GSAP for control
  // of the scroll position, so pause it for the duration of the tween.
  const html = document.documentElement;
  html.style.scrollBehavior = "auto";

  const goingDown = target.getBoundingClientRect().top > 0;
  const sway = goingDown ? -14 : 14;
  const main = document.querySelector("main");

  gsap
    .timeline({
      defaults: { ease: "power2.inOut" },
      onComplete: () => {
        html.style.scrollBehavior = "";
      },
    })
    .to(window, { scrollTo: { y: hash, offsetY: NAV_HEIGHT }, duration: 1 }, 0)
    .to(main, { x: sway, rotation: sway / 40, duration: 0.5 }, 0)
    .to(main, { x: 0, rotation: 0, duration: 0.5 }, 0.5);
}
