import { useState, useEffect, useRef } from "react";
import { useButton } from "react-aria";
import { Key } from "lucide-react"; // Keyhole icon for the menu
import NavMenu from "./NavMenu"; // Reorganized menu component

/**
 * Navbar component with scroll detection and a key-themed side drawer.
 * Removed blur effect for a cleaner, higher-contrast look.
 */
const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isBeigeSection, setIsBeigeSection] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);

    // Observer for sectional contrast
    const observer = new IntersectionObserver(
      ([entry]) => setIsBeigeSection(entry.isIntersecting),
      { rootMargin: "-80px 0px -90% 0px", threshold: 0 }
    );
    const experienceSection = document.querySelector("#experience");
    if (experienceSection) observer.observe(experienceSection);

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
      if (experienceSection) observer.unobserve(experienceSection);
    };
  }, []);

  const ref = useRef();
  const { buttonProps } = useButton(
    {
      onPress: () => setIsMenuOpen(!isMenuOpen),
      "aria-label": "Toggle Menu",
    },
    ref
  );

  // Dynamic colors for the keyhole button
  const iconColor =
    isMenuOpen || isBeigeSection ? "text-pacers-navy" : "text-white";

  return (
    <>
      <nav
        className={`fixed top-0 left-0 w-full z-100 transition-all duration-300 ${
          isScrolled ? "py-6 bg-black/5" : "bg-transparent py-8"
        }`}
      >
        <div className="w-full px-10 md:px-16 flex justify-between items-center">
          {/* Logo */}
          <a href="#hero" className="z-110 p-2">
            <img
              src="/key-chain.png"
              alt="Logo"
              className={`w-10 h-10 transition-all ${isBeigeSection && !isMenuOpen ? "brightness-50" : ""}`}
            />
          </a>

          {/* Special Keyhole Menu Toggle */}
          <button
            {...buttonProps}
            ref={ref}
            className={`group relative z-110 p-3 rounded-full transition-all duration-300 hover:scale-110 active:scale-95 outline-none ${
              isMenuOpen
                ? "bg-pacers-gold rotate-90 shadow-xl"
                : "bg-transparent"
            }`}
          >
            <Key
              size={32}
              className={`transition-colors duration-300 ${iconColor} ${!isMenuOpen && "hover:text-pacers-gold"}`}
              strokeWidth={3}
            />
          </button>
        </div>
      </nav>

      {/* Reorganized side menu component */}
      <NavMenu isOpen={isMenuOpen} onClose={() => setIsMenuOpen(false)} />
    </>
  );
};

export default Navbar;
