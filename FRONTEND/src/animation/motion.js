// Shared guards so every effect respects the same rules.
// Mouse effects only run on devices with a real pointer, and nothing
// runs for people who asked the OS for reduced motion.

export function prefersReducedMotion() {
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

export function hasFinePointer() {
  return window.matchMedia("(pointer: fine)").matches;
}

// One combined check for hover/cursor effects.
export function allowsMouseEffects() {
  return hasFinePointer() && !prefersReducedMotion();
}
