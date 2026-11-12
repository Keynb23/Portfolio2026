import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { prefersReducedMotion } from "../animation/motion";

// Fades children up into place the first time they scroll into view.
// Pass `stagger` (a CSS selector, e.g. "li") to also cascade the matching
// children in one after another instead of arriving as a single block.
export default function Reveal({ as: Tag = "div", delay = 0, stagger, className = "", children }) {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    // Hide the stagger items up front so they can animate in later.
    // Safe from flicker: the container itself is still at opacity 0.
    let items = [];
    if (stagger && !prefersReducedMotion()) {
      items = gsap.utils.toArray(el.querySelectorAll(stagger));
      gsap.set(items, { opacity: 0, y: 16 });
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          if (items.length) {
            gsap.to(items, {
              opacity: 1,
              y: 0,
              duration: 0.6,
              ease: "power3.out",
              stagger: 0.07,
              delay: 0.15,
            });
          }
          observer.disconnect();
        }
      },
      { threshold: 0.15, rootMargin: "0px 0px -8% 0px" },
    );
    observer.observe(el);
    return () => {
      observer.disconnect();
      if (items.length) gsap.killTweensOf(items);
    };
  }, [stagger]);

  return (
    <Tag
      ref={ref}
      className={`reveal ${visible ? "is-visible" : ""} ${className}`}
      style={delay ? { transitionDelay: `${delay}ms` } : undefined}
    >
      {children}
    </Tag>
  );
}
