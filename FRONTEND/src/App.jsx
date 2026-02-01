// Core imports for the main application
import Navbar from "./components/Navbar/Navbar";
import Hero from "./components/Hero/Hero";
import FeaturedWork from "./components/FeaturedWork/FeaturedWork";
import Experience from "./components/Experience/Experience";
import Skills from "./components/Skills/Skills";
import Footer from "./components/Footer/Footer";
import "./App.css";
import Sammy from "./assets/Sammy.png";

import LoadingScreen from "./components/loader/loadingScrean";
import { useState } from "react";

/**
 * Functional component for the Sammy background image
 * Implements a stylized grayscale filter for cinematic effect
 */
const SammyBG = () => {
  // Returns the stylized image container with retention rule applied
  return (
    <div className="Sammy_IMG absolute top-0 left-0 w-full h-full z-1 grayscale-75 blur-[0.5px] brightness-80 contrast-110">
      <img src={Sammy} alt="Sammy" className="w-full h-full object-cover" />
    </div>
  );
};

/**
 * Main Application Component
 * Orchestrates the portfolio layout and section ordering
 */
function App() {
  const [isLoading, setIsLoading] = useState(true);

  // Returns the main application structure with Tailwind utility classes
  return (
    <>
      {isLoading && <LoadingScreen onFinished={() => setIsLoading(false)} />}

      {/* Navigation header fixed to top */}
      <Navbar />

      {/* Main content wrapper with flex column layout */}
      <div className="w-full bg-pacers-navy-dark relative flex flex-col">
        {/* Splash screen and introduction section */}
        <Hero />

        {/* Interactive horizontal scroll gallery */}
        <FeaturedWork />

        {/* Professional history and timeline section */}
        <Experience />

        {/* Technical capabilities and tools grid */}
        <Skills />

        {/* Summary and contact information footer */}
        <Footer />

        {/* Special stylized branding section at the bottom */}
        <div className="Sammy_container relative w-full h-[80vh] flex items-center justify-center bg-[#121212] -mt-px overflow-hidden">
          <SammyBG />
          <h1 className="MILKY relative z-2 text-white font-black text-[clamp(3rem,10vw,12rem)] tracking-tighter uppercase m-0 drop-shadow-2xl pointer-events-none">
            GOT MILK?
          </h1>
        </div>
      </div>
    </>
  );
}

export default App;
