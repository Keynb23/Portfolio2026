import Navbar from "./components/Navbar/Navbar";
import Hero from "./components/Hero/Hero";
import FeaturedWork from "./components/FeaturedWork/FeaturedWork";
import Experience from "./components/Experience/Experience";
import Skills from "./components/Skills/Skills";
import Footer from "./components/Footer/Footer";
import "./App.css";

function App() {
  return (
    <div className="app">
      <Navbar />
      <Hero />
      <FeaturedWork />
      <Experience />
      <Skills />
      <Footer />
    </div>
  );
}

export default App;
