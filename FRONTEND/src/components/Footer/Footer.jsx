import { useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import { Send, Github, Linkedin, Instagram } from "lucide-react";
import { Button } from "../ui/Button";

/**
 * Footer Component - The final section of the portfolio containing the contact form
 * and professional links. Styled with Indiana Pacers brand colors.
 */
const Footer = () => {
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, amount: 0.1 });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      const response = await fetch(
        "https://portfolioapi-j4dx.onrender.com/send-email",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(formData),
        },
      );
      if (response.ok) {
        alert("Awesome! I've received your message.");
        setFormData({ name: "", email: "", message: "" });
      } else {
        throw new Error("Failed to send");
      }
    } catch {
      alert("Oops! Something went wrong. Email me at keynb50@gmail.com.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <footer
      id="contact"
      ref={sectionRef}
      className="footer relative min-h-screen w-full flex flex-col justify-between bg-diner-black overflow-hidden pt-32"
    >
      <div className="absolute inset-0 bg-linear-to-b from-diner-black via-diner-dark-graphite to-black opacity-100 pointer-events-none" />

      <div className="container relative z-10 mx-auto px-10 md:px-20 py-24 grow flex flex-col justify-center">
        <motion.div
          className="max-w-4xl mb-24"
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <h2 className="text-6xl md:text-9xl font-black text-white mb-8 tracking-tighter leading-none uppercase">
            LET'S <span className="text-diner-crimson">WORK</span> <br />{" "}
            TOGETHER.
          </h2>
          <p className="text-diner-silver text-xl md:text-2xl max-w-2xl leading-relaxed font-semibold opacity-60">
            Currently available for freelance work and full-time opportunities.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-20 items-start">
          <motion.form
            className="lg:col-span-7 space-y-10"
            onSubmit={handleSubmit}
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
              <div className="group">
                <label className="block text-diner-crimson text-[10px] font-black uppercase tracking-[0.3em] mb-4">
                  Your Full Name
                </label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="John Doe"
                  required
                  className="w-full bg-transparent border-b-2 border-white/10 py-5 text-white text-xl focus:outline-none focus:border-diner-crimson transition-all"
                />
              </div>
              <div className="group">
                <label className="block text-diner-crimson text-[10px] font-black uppercase tracking-[0.3em] mb-4">
                  Email Address
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="john@example.com"
                  required
                  className="w-full bg-transparent border-b-2 border-white/10 py-5 text-white text-xl focus:outline-none focus:border-diner-crimson transition-all"
                />
              </div>
            </div>

            <div className="group">
              <label className="block text-diner-crimson text-[10px] font-black uppercase tracking-[0.3em] mb-4">
                Project Vision
              </label>
              <textarea
                name="message"
                value={formData.message}
                onChange={handleChange}
                placeholder="What iconic project are we bringing to life?"
                rows="4"
                required
                className="w-full bg-transparent border-b-2 border-white/10 py-5 text-white text-xl focus:outline-none focus:border-diner-crimson transition-all resize-none"
              ></textarea>
            </div>

            <div className="pt-4">
              <Button
                type="submit"
                size="lg"
                disabled={isSubmitting}
                className="rounded-full px-16 group"
              >
                <span className="flex items-center gap-3 text-lg uppercase tracking-widest">
                  {isSubmitting ? "Sending..." : "Send Message"}
                  <Send
                    size={18}
                    className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform"
                  />
                </span>
              </Button>
            </div>
          </motion.form>

          <motion.div
            className="lg:col-span-4 lg:col-start-9 space-y-16"
            initial={{ opacity: 0, x: 20 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            <div>
              <h4 className="text-diner-crimson text-[10px] font-black uppercase tracking-[0.3em] mb-8 opacity-50">
                Direct Contact
              </h4>
              <a
                href="mailto:keynb50@gmail.com"
                className="text-2xl md:text-3xl text-white font-bold hover:text-diner-crimson transition-colors underline decoration-white/10 underline-offset-8"
              >
                keynb50@gmail.com
              </a>
            </div>

            <div>
              <h4 className="text-pacers-gold text-[10px] font-black uppercase tracking-[0.3em] mb-8 opacity-50">
                Digital Presence
              </h4>
              <div className="flex flex-col gap-8">
                {[
                  {
                    name: "GitHub",
                    href: "https://github.com/keynb23",
                    icon: Github,
                  },
                  {
                    name: "LinkedIn",
                    href: "https://www.linkedin.com/in/key-n-brosdahl-5320b3353/",
                    icon: Linkedin,
                  },
                  {
                    name: "Instagram",
                    href: "https://www.instagram.com/keyn.r.b/",
                    icon: Instagram,
                  },
                ].map((social) => (
                  <a
                    key={social.name}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-4 text-white text-xl font-bold hover:text-diner-crimson transition-all group"
                  >
                    <social.icon
                      size={20}
                      className="text-diner-crimson opacity-50 group-hover:opacity-100 transition-opacity"
                    />
                    <span>{social.name}</span>
                  </a>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      <div className="relative z-10 w-full border-t border-white/5 py-12 bg-black/40 backdrop-blur-3xl">
        <div className="container mx-auto px-10 md:px-20 flex flex-col md:flex-row justify-between items-center gap-8">
          <p className="text-diner-silver text-[10px] font-black tracking-[0.4em] uppercase opacity-40">
            © {new Date().getFullYear()} Key'n Brosdahl
          </p>
          <p className="text-diner-crimson text-[10px] font-black tracking-[0.5em] uppercase">
            <a href="https://www.instagram.com/keyn.r.b/">@keyn.r.b</a>
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
