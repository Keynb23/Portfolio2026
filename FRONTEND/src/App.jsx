import { useRef } from "react";
import Nav from "./components/Nav";
import Hero from "./components/Hero";
import Experience from "./components/Experience";
import Projects from "./components/Projects";
import Skills from "./components/Skills";
import Contact from "./components/Contact";
import Footer from "./components/Footer";
import ResumeDialog from "./components/ResumeDialog";

export default function App() {
  const resumeRef = useRef(null);
  const openResume = () => resumeRef.current?.showModal();

  return (
    <>
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
  );
}
