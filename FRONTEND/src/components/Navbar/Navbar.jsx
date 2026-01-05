import React, { useState, useEffect } from "react";
import "./Navbar.css";

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { name: "Work", href: "#work" },
    { name: "Experience", href: "#experience" },
    { name: "Skills", href: "#skills" },
    { name: "Contact", href: "#contact" },
  ];

  const scrollToSection = (e, href) => {
    e.preventDefault();
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
      setIsMobileMenuOpen(false);
    }
  };

  return (
    <nav className={`navbar ${isScrolled ? "navbar--scrolled" : ""}`}>
      <div className="navbar__container">
        {/* Logo */}
        <a
          href="#"
          className="navbar__logo"
          onClick={(e) => scrollToSection(e, "#hero")}
        >
          <span className="navbar__logo-text">Key'n Brosdahl</span>
        </a>

        {/* Desktop Navigation */}
        <ul className="navbar__links">
          {navLinks.map((link) => (
            <li key={link.name} className="navbar__link-item">
              <a
                href={link.href}
                className="navbar__link"
                onClick={(e) => scrollToSection(e, link.href)}
              >
                {link.name}
              </a>
            </li>
          ))}
        </ul>

        {/* Mobile Menu Toggle */}
        <button
          className={`navbar__toggle ${
            isMobileMenuOpen ? "navbar__toggle--active" : ""
          }`}
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          aria-label="Toggle menu"
        >
          <span className="navbar__toggle-line"></span>
          <span className="navbar__toggle-line"></span>
          <span className="navbar__toggle-line"></span>
        </button>
      </div>

      {/* Mobile Menu */}
      <div
        className={`navbar__mobile ${
          isMobileMenuOpen ? "navbar__mobile--open" : ""
        }`}
      >
        <ul className="navbar__mobile-links">
          {navLinks.map((link) => (
            <li key={link.name} className="navbar__mobile-link-item">
              <a
                href={link.href}
                className="navbar__mobile-link"
                onClick={(e) => scrollToSection(e, link.href)}
              >
                {link.name}
              </a>
            </li>
          ))}
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
