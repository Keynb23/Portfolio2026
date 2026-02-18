import {
  Github,
  Linkedin,
  Instagram,
  Home,
  Briefcase,
  Code,
  Mail,
  X,
  Eye, // Icon for Bionic toggle
} from "lucide-react";
import profilePic from "../../assets/profile_pic.jpg";
import { useBionic } from "../../hooks/useBionic";

/**
 * NavMenu Component - The content of the side drawer.
 * Includes profile info, navigation links, and social icons.
 */
const NavMenu = ({ isOpen, onClose }) => {
  const { isBionicMode, toggleBionic, formatText } = useBionic();
  // Navigation links
  const navLinks = [
    { name: "Home", href: "#hero", icon: Home },
    { name: "Projects", href: "#work-container", icon: Code },
    { name: "Experience", href: "#experience", icon: Briefcase },
    { name: "Contact", href: "#contact", icon: Mail },
  ];

  // Social links
  const socials = [
    { icon: Github, href: "https://github.com/Keynb23", label: "GitHub" },
    {
      icon: Linkedin,
      href: "https://www.linkedin.com/in/key-n-brosdahl-5320b3353/",
      label: "LinkedIn",
    },
    {
      icon: Instagram,
      href: "https://www.instagram.com/keyn.r.b/",
      label: "Instagram",
    },
  ];

  return (
    <>
      {/* Backdrop overlay */}
      <div
        className={`fixed inset-0 bg-black/60 backdrop-blur-sm z-101 transition-opacity duration-500 ${
          isOpen ? "opacity-100 visible" : "opacity-0 invisible"
        }`}
        onClick={onClose}
      />

      {/* Side Drawer menu */}
      <div
        className={`fixed top-0 right-0 h-full w-full sm:w-[400px] md:w-[450px] bg-diner-dark-graphite shadow-2xl z-105 
        flex flex-col transition-transform duration-500 ease-in-out ${
          isOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="flex flex-col h-full overflow-y-auto custom-scrollbar relative">
          {/* Explicit Close Button */}
          <button
            onClick={onClose}
            className="absolute top-6 right-6 p-2 rounded-full hover:bg-white/10 text-white transition-all z-20 cursor-pointer"
            aria-label="Close menu"
          >
            <X size={28} strokeWidth={3} />
          </button>

          {/* Profile Section */}
          <div className="p-8 md:p-12 pb-8 border-b border-white/10 mt-20 md:mt-0 shrink-0">
            <div className="flex flex-col gap-6 items-center text-center">
              <div className="w-32 h-32 rounded-full overflow-hidden border-4 border-white/20 p-1 bg-diner-black">
                <img
                  src={profilePic}
                  alt="Key'n Brosdahl"
                  className="w-full h-full object-cover rounded-full"
                />
              </div>
              <div>
                <h2 className="text-3xl font-black text-white tracking-tighter uppercase mb-2">
                  Key'n Brosdahl
                </h2>
                <p className="text-[10px] font-black tracking-widest text-diner-crimson uppercase bg-diner-black px-3 py-1 rounded-full inline-block mb-4">
                  Frontend @ Acellus Academy
                </p>
                <p className="text-sm font-bold text-white/70 leading-relaxed px-4">
                  Aside from coding, I like basketball, working on projects in
                  blender, and prentending to be good at guitar.
                </p>
                <p className="text-xs font-medium text-white/50 mt-4 italic">
                  SE / Frontend / React / UI / (Learning - ML / C# / .NET)
                </p>
              </div>
            </div>
          </div>

          {/* Navigation Section */}
          <nav className="grow flex flex-col py-8 px-12 justify-center">
            <ul className="flex flex-col gap-6">
              {navLinks.map((link) => (
                <li key={link.name}>
                  <a
                    href={link.href}
                    className="group flex items-center gap-4 text-3xl font-black text-white hover:text-diner-crimson transition-all"
                    onClick={onClose}
                  >
                    <link.icon className="w-6 h-6 stroke-3 opacity-20 group-hover:opacity-100 transition-opacity" />
                    <span className="tracking-tighter uppercase">
                      {formatText(link.name)}
                    </span>
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          {/* Social Footer */}
          <div className="p-8 md:p-12 pt-8 border-t border-white/10 bg-diner-black/5 shrink-0 flex flex-col gap-6">
            {/* Bionic Toggle */}
            <button
              onClick={toggleBionic}
              className={`w-full py-4 rounded-xl font-black uppercase tracking-widest text-xs flex items-center justify-center gap-3 transition-all ${
                isBionicMode
                  ? "bg-diner-crimson text-white shadow-lg shadow-diner-crimson/20"
                  : "bg-white/5 text-white hover:bg-diner-crimson/20 border border-white/10"
              }`}
            >
              <Eye size={18} />
              <span>
                {isBionicMode ? "Bionic Mode On" : "Enable Bionic Mode"}
              </span>
            </button>

            <div className="flex flex-col sm:flex-row justify-between items-center gap-8 sm:gap-4">
              <div className="flex gap-4 md:gap-6">
                {socials.map((social) => (
                  <a
                    key={social.label}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-3 bg-white/5 text-white rounded-xl hover:bg-diner-crimson hover:text-white transition-all transform hover:-translate-y-1 shadow-lg shadow-black/20"
                    aria-label={social.label}
                  >
                    <social.icon size={20} />
                  </a>
                ))}
              </div>
              <p className="text-[10px] font-black text-white/30 uppercase tracking-[0.3em] text-center sm:text-right">
                KC Metro Area
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default NavMenu;
