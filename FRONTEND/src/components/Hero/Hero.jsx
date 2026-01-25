import  { useEffect, useRef } from "react";
import "./Hero.css";
import heroBG from '../../assets/BG_Hero.jpg';


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
      <img src={heroBG} alt="Hero Background" className="bg-[value] min-h-dvh min-w-full bg-center absolute left-0 top-0 blur-xs invert brightness-90" />
      <div className="hero__container">
        <div className="hero__content relative min-h-dvh flex flex-col justify-center overflow-hidden rounded-xl">
  
  {/* 1. The Base Image */}
  <img 
    src={heroBG} 
    alt="Hero Background" 
    className="absolute inset-0 h-full w-full object-cover blur-none invert-0 brightness-60 contrast-150 saturate-10 z-0" 
  />

  {/* 2. The Grid Overlay Snippet (Tailwind-ified) */}
  <div 
    className="absolute inset-0 z-10 opacity-30
               bg-[linear-gradient(to_right,#e2e8f0_1px,transparent_1px),linear-gradient(to_bottom,#e2e8f0_1px,transparent_1px)]
               bg-[size:20px_30px]
               [mask-image:radial-gradient(ellipse_70%_60%_at_50%_100%,#000_60%,transparent_100%)]"
  />

  {/* 3. The Glassmorphism Layer & Actual Content */}
  <div className="relative z-20 m-8 p-12 rounded-lg border border-white/10
                  bg-stone-900/30 backdrop-blur-sm backdrop-saturate-200 
                  bg-clip-padding">
     {/* Your text/buttons go here */}
     <h1 className="text-white text-5xl font-bold">Key'n Brosdahl</h1>
  </div>


          {/* Eyebrow */}
          <div className="hero__eyebrow">
            <span className="hero__eyebrow-text font-weight-700">
              Software Engineer & Designer
            </span>
          </div>

          {/* Main Headline */}
          <h1 className="hero__headline">
            Translating design intent into{" "}
            <span className="hero__highlight invert brightness-100 saturate-150 ">polished</span>,{" "}
            <span className="hero__highlight brightness-100 saturate-150">intelligent</span> UI
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
