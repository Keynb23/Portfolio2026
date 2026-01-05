import { useEffect, useRef, useState } from "react";
import "./Footer.css";

const Footer = () => {
  const sectionRef = useRef(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("footer--visible");
          }
        });
      },
      { threshold: 0.1 }
    );

    const currentRef = sectionRef.current;
    if (currentRef) observer.observe(currentRef);

    return () => {
      if (currentRef) observer.unobserve(currentRef);
    };
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
      // Replace with your actual live Python API URL once hosted
      const response = await fetch("https://portfolioapi-j4dx.onrender.com/send-email", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        alert("Awesome! I've received your message and will get back to you soon.");
        setFormData({ name: "", email: "", message: "" }); // Clear form
      } else {
        throw new Error("Failed to send");
      }
    } catch (error) {
      console.error("Error sending email:", error);
      alert("Oops! Something went wrong. Please try emailing me directly at keynb50@gmail.com.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const socialLinks = [
    { name: "GitHub", url: "https://github.com/Keynb23" },
    { name: "LinkedIn", url: "https://www.linkedin.com/in/key-n-brosdahl-5320b3353/" },
    { name: "Email", url: "mailto:keynb50@gmail.com" },
  ];

  return (
    <footer id="contact" className="footer" ref={sectionRef}>
      <div className="container">
        <div className="footer__contact">
          <div className="footer__contact-header">
            <h2 className="footer__title">Let's Work Together</h2>
            <p className="footer__subtitle">
              Have a project in mind or want to discuss opportunities? I'd love to hear from you.
            </p>
          </div>

          <div className="footer__content">
            <form className="footer__form" onSubmit={handleSubmit}>
              <div className="footer__form-group">
                <label htmlFor="name" className="footer__form-label">Name</label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  className="footer__form-input"
                  placeholder="Your name"
                  required
                />
              </div>

              <div className="footer__form-group">
                <label htmlFor="email" className="footer__form-label">Email</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="footer__form-input"
                  placeholder="your.email@example.com"
                  required
                />
              </div>

              <div className="footer__form-group">
                <label htmlFor="message" className="footer__form-label">Message</label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  className="footer__form-textarea"
                  placeholder="Tell me about your project..."
                  rows="5"
                  required
                ></textarea>
              </div>

              <button 
                type="submit" 
                className="footer__form-submit" 
                disabled={isSubmitting}
              >
                {isSubmitting ? "Sending..." : "Send Message"}
              </button>
            </form>

            <div className="footer__info">
              <div className="footer__info-card">
                <h3 className="footer__info-title">Get In Touch</h3>
                <p className="footer__info-text">
                  I'm currently available for freelance work and full-time
                  opportunities. Let's create something amazing together.
                </p>

                <div className="footer__social">
                  {socialLinks.map((link) => (
                    <a
                      key={link.name}
                      href={link.url}
                      className="footer__social-link"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      {link.name}
                    </a>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="footer__bottom">
          <p className="footer__copyright">
            © {new Date().getFullYear()} Key'n Brosdahl. All rights reserved.
          </p>
          <p className="footer__built">Written & Directed by Key'n Brosdahl</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;