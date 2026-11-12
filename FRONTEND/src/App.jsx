import { useRef, useState } from "react";
import Nav from "./components/Nav";
import Hero from "./components/Hero";
import Experience from "./components/Experience";
import Projects from "./components/Projects";
import Skills from "./components/Skills";
import Contact from "./components/Contact";
import Footer from "./components/Footer";
import ResumeDialog from "./components/ResumeDialog";
import IntroLoader from "./components/IntroLoader";
import CursorGlow from "./animation/CursorGlow";
import { prefersReducedMotion } from "./animation/motion";

export default function App() {
  const resumeRef = useRef(null);
  const openResume = () => resumeRef.current?.showModal();

  // Intro phases: "intro" = binary wall only, "reveal" = page mounted
  // under the fading overlay, "done" = overlay gone. The intro plays
  // once per browser session and never for reduced-motion users.
  const [phase, setPhase] = useState(() =>
    sessionStorage.getItem("intro-played") || prefersReducedMotion() ? "done" : "intro",
  );

  return (
    <>
      {phase !== "done" && <IntroLoader setPhase={setPhase} />}
      {phase !== "intro" && (
        <>
          <CursorGlow />
          <Nav onOpenResume={openResume} />
          <main>
            <Hero onOpenResume={openResume} />
            <Experience />
            <Projects />
            <Skills />
            <Contact onOpenResume={openResume} />
          </main>
          <Footer />
          <ResumeDialog ref={resumeRef} />
        </>
      )}
    </>
  );
}
