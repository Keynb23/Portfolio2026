import React, { useEffect, useRef } from "react";
import "./Hero.css";

const Hero = () => {
  const heroRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("hero--visible");
          }
        });
      },
      { threshold: 0.1 }
    );

    const currentRef = heroRef.current;
    if (currentRef) {
      observer.observe(currentRef);
    }

    return () => {
      if (currentRef) {
        observer.unobserve(currentRef);
      }
    };
  }, []);

  return (
    <section id="hero" className="hero" ref={heroRef}>
      <div className="hero__container">
        <div className="hero__content">
          {/* Eyebrow */}
          <div className="hero__eyebrow">
            <span className="hero__eyebrow-text">
              Software Engineer & Designer
            </span>
          </div>

          {/* Main Headline */}
          <h1 className="hero__headline">
            Translating design intent into{" "}
            <span className="hero__highlight">polished</span>,{" "}
            <span className="hero__highlight">intelligent</span> UI
          </h1>

          {/* Subheadline */}
          <p className="hero__subheadline">
            Specializing in <strong>React, Python, and Machine Learning</strong>
            . Bridging the gap between <strong>UX/UI design</strong> and robust
            engineering with{" "}
            <strong>C#, AI tools, and Frontend Development</strong>—currently
            scaling toward Full-Stack DevOps.
          </p>

          {/* CTA Buttons */}
          <div className="hero__cta">
            <a href="#work" className="hero__cta-primary">
              View My Work
            </a>
            <a href="#contact" className="hero__cta-secondary">
              Get In Touch
            </a>
          </div>
        </div>

        {/* Decorative Elements */}
        <div className="hero__decoration">
          <div className="hero__decoration-circle hero__decoration-circle--1"></div>
          <div className="hero__decoration-circle hero__decoration-circle--2"></div>
          <div className="hero__decoration-line"></div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="hero__scroll-indicator">
        <span className="hero__scroll-text">Scroll to explore</span>
        <div className="hero__scroll-arrow"></div>
      </div>
    </section>
  );
};

export default Hero;
