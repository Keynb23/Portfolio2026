import { useEffect, useRef, useState } from "react";

const Footer = () => {
  const sectionRef = useRef(null);
  const [isVisible, setIsVisible] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;
    const obs = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        setIsVisible(true);
        obs.disconnect();
      }
    }, { threshold: 0.1 });
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

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
      const response = await fetch("https://portfolioapi-j4dx.onrender.com/send-email", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
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
      className="relative min-h-[100dvh] w-full flex flex-col justify-between bg-[#121212] overflow-hidden"
    >
      {/* Background Gradient Layer */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#071022] via-[#050a13] to-[#000000] opacity-100" />

      {/* Main Content Container */}
      <div className="container relative z-10 mx-auto px-6 pt-32 pb-20 flex-grow flex flex-col justify-center">
        
        {/* Header Section */}
        <div className={`max-w-4xl mb-16 transition-all duration-1000 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}>
          <h2 className="text-6xl md:text-8xl font-extrabold text-white mb-6 tracking-tighter leading-none">
            LET'S <span className="text-[#FDB927]">WORK</span> <br /> TOGETHER.
          </h2>
          <p className="text-slate-400 text-xl md:text-2xl max-w-2xl leading-relaxed font-medium">
            Currently available for freelance work and full-time opportunities. 
            Have a project in mind? Let's build something iconic.
          </p>
        </div>

        {/* Form and Info Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-start">
          
          {/* Form Section */}
          <form 
            className={`lg:col-span-7 space-y-8 transition-all duration-1000 delay-200 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`} 
            onSubmit={handleSubmit}
          >
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="group">
                <label className="block text-[#FDB927] text-xs font-bold uppercase tracking-[0.2em] mb-4 group-focus-within:text-white transition-colors">Your Name</label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="John Doe"
                  required
                  className="w-full bg-transparent border-b-2 border-slate-700 py-4 text-white text-lg focus:outline-none focus:border-[#FDB927] transition-all placeholder:text-slate-600"
                />
              </div>
              <div className="group">
                <label className="block text-[#FDB927] text-xs font-bold uppercase tracking-[0.2em] mb-4 group-focus-within:text-white transition-colors">Email Address</label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="john@example.com"
                  required
                  className="w-full bg-transparent border-b-2 border-slate-700 py-4 text-white text-lg focus:outline-none focus:border-[#FDB927] transition-all placeholder:text-slate-600"
                />
              </div>
            </div>

            <div className="group">
              <label className="block text-[#FDB927] text-xs font-bold uppercase tracking-[0.2em] mb-4 group-focus-within:text-white transition-colors">Tell me about the project</label>
              <textarea
                name="message"
                value={formData.message}
                onChange={handleChange}
                placeholder="What are we building?"
                rows="4"
                required
                className="w-full bg-transparent border-b-2 border-slate-700 py-4 text-white text-lg focus:outline-none focus:border-[#FDB927] transition-all resize-none placeholder:text-slate-600"
              ></textarea>
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="group relative inline-flex items-center justify-center px-10 py-5 font-bold text-[#002D62] transition-all duration-300 bg-[#FDB927] rounded-full hover:bg-white hover:text-black overflow-hidden disabled:opacity-50"
            >
              <span className="relative z-10 text-lg uppercase tracking-widest">{isSubmitting ? "Sending..." : "Send Inquiry"}</span>
            </button>
          </form>

          {/* Contact Details Card */}
          <div className={`lg:col-span-4 lg:col-start-9 space-y-12 transition-all duration-1000 delay-400 ${isVisible ? "opacity-100 translate-x-0" : "opacity-0 translate-x-10"}`}>
            <div>
              <h4 className="text-[#FDB927] text-xs font-bold uppercase tracking-[0.2em] mb-6">Contact Details</h4>
              <a href="mailto:keynb50@gmail.com" className="text-2xl md:text-3xl text-white font-medium hover:text-[#FDB927] transition-colors break-words">
                keynb50@gmail.com
              </a>
            </div>

            <div>
              <h4 className="text-[#FDB927] text-xs font-bold uppercase tracking-[0.2em] mb-6">Socials</h4>
              <div className="flex flex-wrap gap-6">
                {["GitHub", "LinkedIn", "Instagram"].map((social) => (
                  <a 
                    key={social} 
                    href="#" 
                    className="text-white text-lg font-semibold hover:text-[#FDB927] transition-colors relative group"
                  >
                    {social}
                    <span className="absolute -bottom-1 left-0 w-0 h-[2px] bg-[#FDB927] transition-all group-hover:w-full"></span>
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Credits Bottom Bar */}
      <div className="relative z-10 w-full border-t border-white/5 py-10 bg-black/20 backdrop-blur-md">
        <div className="container mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-slate-200 text-sm font-medium tracking-widest uppercase">
            © {new Date().getFullYear()} Key'n Brosdahl
          </p>
          <p className="text-slate-200 text-sm font-bold tracking-widest uppercase">
            Written & Directed by Key'n Brosdahl
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;