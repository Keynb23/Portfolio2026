import Navbar from "./components/Navbar/Navbar";
import Hero from "./components/Hero/Hero";
import FeaturedWork from "./components/FeaturedWork/FeaturedWork";
import Experience from "./components/Experience/Experience";
import Skills from "./components/Skills/Skills";
import Footer from "./components/Footer/Footer";
import "./App.css";
import Sammy from "./assets/Sammy.png";

const SammyBG = () => {
  return (
    <div className="Sammy_IMG">
      <img src={Sammy} alt="Sammy" />
    </div>
  );
};

function App() {
  return (
    <>
      <Navbar />
      {/* REMOVED: h-screen (causes overflow issues) 
          REMOVED: p-12 (squeezes internal containers)
      */}
      <div className="w-full bg-bgmain relative flex flex-col">
        <Hero />
        <FeaturedWork />
        <Experience />
        <Skills />
        <Footer />
        <div className="Sammy_container">
          <SammyBG />
          <h1 className="MILKY">GOT MILK?</h1>
        </div>
      </div>
    </>
  );
}

export default App;
