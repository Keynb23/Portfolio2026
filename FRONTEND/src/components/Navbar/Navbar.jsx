import { useState, useEffect, useRef } from "react";
import { useButton } from "react-aria";

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isBeigeSection, setIsBeigeSection] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    const observer = new IntersectionObserver(
      ([entry]) => setIsBeigeSection(entry.isIntersecting),
      { rootMargin: "-80px 0px -90% 0px", threshold: 0 },
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
    ref,
  );

  const navLinks = [
    { name: "Work", href: "#work" },
    { name: "Experience", href: "#experience" },
    { name: "Skills", href: "#skills" },
    { name: "Contact", href: "#contact" },
  ];

  // Logic: Ensure the X is dark so it shows up against the slate drawer background
  const barColor = isBeigeSection ? "bg-[#002D62]" : "bg-white";
  const activeBarColor = isMenuOpen ? "bg-[#002D62]" : barColor;

  return (
    <>
      <nav
        className={`fixed top-0 left-0 w-full z-[100] transition-all duration-300 ${
          isScrolled
            ? "py-4 backdrop-bg-black/10"
            : "bg-transparent py-6"
        }`}
      >
        <div className="w-full px-8 md:px-10 flex justify-between items-center">
          {/* Logo */}
          <a href="#hero" className="z-[110] p-2">
            <img
              src="/key-chain.png"
              alt="Logo"
              className={`w-10 h-10 transition-all ${isBeigeSection && !isMenuOpen ? "brightness-50" : ""}`}
            />
          </a>

          {/* Hamburger Button: z-[110] keeps it above the drawer (z-[105]) */}
          <button
            {...buttonProps}
            ref={ref}
            className="group relative z-[110] flex flex-col justify-between h-4 w-8 p-2 outline-none"
          >
            {/* Top Bar: Rotates to form part of the X */}
            <span
              className={`h-[2px] w-full transition-all duration-300 transform ${activeBarColor} ${
                isMenuOpen ? "rotate-45 translate-y-[7px]" : ""
              }`}
            ></span>

            {/* Middle Bar: Fades out */}
            <span
              className={`h-[2px] w-full transition-all duration-300 ${activeBarColor} ${
                isMenuOpen ? "opacity-0" : "opacity-100"
              }`}
            ></span>

            {/* Bottom Bar: Rotates to form other part of the X */}
            <span
              className={`h-[2px] w-full transition-all duration-300 transform ${activeBarColor} ${
                isMenuOpen ? "-rotate-45 -translate-y-[7px]" : ""
              }`}
            ></span>
          </button>
        </div>
      </nav>

      {/* Backdrop */}
      <div
        className={`fixed inset-0 bg-black/40 backdrop-blur-sm z-[101] transition-opacity duration-500 ${
          isMenuOpen ? "opacity-100 visible" : "opacity-0 invisible"
        }`}
        onClick={() => setIsMenuOpen(false)}
      />

      {/* Side Drawer */}
      <div
        className={`fixed top-0 right-0 h-full w-[280px] md:w-[20vw] bg-slate-300 shadow-2xl z-[105] 
        flex flex-col pl-10 justify-center transition-transform duration-500 ease-in-out ${
          isMenuOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <ul className="flex flex-col gap-10 items-center">
          {navLinks.map((link) => (
            <li key={link.name}>
              <a
                href={link.href}
                className="text-2xl font-bold text-[#002D62] hover:text-[#ebaf0b] transition-colors block"
                onClick={() => setIsMenuOpen(false)}
              >
                {link.name}
              </a>
            </li>
          ))}
        </ul>
      </div>
    </>
  );
};

export default Navbar;