import { useEffect, useRef, useState } from "react";
import "./Hero.css";
import heroBG from "../../assets/BG_Hero.jpg";
import bgv from "../../assets/bg-vid.mp4";

const Hero = () => {
  const heroRef = useRef(null);

  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setVisible(true), 3000);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("hero--visible");
          }
        });
      },
      { threshold: 0.1 },
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
      <img
        src={heroBG}
        alt="Hero Background"
        className="bg-[value] min-h-dvh min-w-full bg-center absolute left-0 top-0 blur-lg invert brightness-90"
      />

      <div className="hero__container">
        <div className="hero__content relative min-h-dvh flex flex-col justify-center overflow-hidden rounded-xl">
          <div
            className="absolute inset-0 z-1 opacity-2
            bg-[linear-gradient(to_right,#e2e8f0_1px,transparent_1px),linear-gradient(to_bottom,#e2e8f0_1px,transparent_1px)]
            bg-[size:20px_30px]
            [mask-image:radial-gradient(ellipse_70%_60%_at_50%_100%,#000_60%,transparent_100%)]"
          />

          <video
            src={bgv}
            autoPlay
            muted
            className="absolute inset-0 h-full w-full object-cover blur-none brightness-100 contrast-100 saturate-250 z-0"
          />

          <div className="relative z-20 m-8 p-12 rounded-lg backdrop-blur-xs backdrop-saturate-200 bg-clip-padding">
            <h1 className="text-white text-5xl font-bold">Key'n Brosdahl</h1>
          </div>

          <div className="hero__eyebrow z-2">
            <span className="hero__eyebrow-text z-2 font-weight-700">
              Software Engineer & Designer
            </span>
          </div>
          {/* text bubble */}

          <div className="flex justify-end mb-4">
            <div
              className="
      max-w-[70%] 
      px-5 py-4 z-1000
      wrap-text
      
      bg-black 
      text-purple-400           
      text-sm leading-relaxed
      border border-purple-700/40   /* subtle purple border so it doesn't look flat */
      shadow-lg shadow-purple-900/30   /* soft glow/shadow to make it stand out */
      font-bold
    "
            >
              Hi, Key'n here. Currently working on some new features! Every
              feature I add breaks an old one lol. So enjoy the broken Portfolio
              lol.
            </div>
          </div>

          <h1 className="hero__headline z-2">
            Translating design intent into{" "}
            <span className="hero__highlight">polished</span>,{" "}
            <span className="hero__highlight">intelligent</span> UI
          </h1>

          <p className="z-2 hero__subheadline text-2xl font-bold text-shadow-md text-shadow-yellow-800">
            Specializing in <strong>React, Python, and Machine Learning</strong>
            . Bridging the gap between <strong>UX/UI design</strong> and robust
            engineering with{" "}
            <strong>C#, AI tools, and Frontend Development</strong>—currently
            scaling toward Full-Stack DevOps.
          </p>

          <div className="hero__cta z-2 flex gap-4 items-center">
            <a
              href="#work"
              className="hero__cta-primary z-2 text-[#FDB927] bg-[#002D62] hover:bg-[#FDB927] hover:text-[#002D62] border-2 border-[#002D62] hover:border-[#FDB927] font-bold rounded-lg text-sm px-6 py-3 text-center transition-all duration-300 focus:outline-none"
            >
              View My Work
            </a>

            <a
              href="#contact"
              className="hero__cta-secondary z-2 text-white bg-transparent hover:text-[#FDB927] font-bold rounded-lg text-sm px-6 py-3 text-center transition-colors duration-300 focus:outline-none"
            >
              Get In Touch
            </a>
          </div>
        </div>

        <div className="hero__decoration">
          <div className="hero__decoration-circle hero__decoration-circle--1"></div>
          <div className="hero__decoration-circle hero__decoration-circle--2"></div>
          <div className="hero__decoration-line"></div>
        </div>
      </div>

      <div className="hero__scroll-indicator">
        <span className="hero__scroll-text">Scroll to explore</span>
        <div className="hero__scroll-arrow"></div>
      </div>
    </section>
  );
};

export default Hero;
