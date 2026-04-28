import { useState } from "react";
import { motion } from "framer-motion";
import { sendContactMessage } from "../api";
import { FiGithub, FiInstagram, FiFacebook, FiMessageCircle } from "react-icons/fi";
import Footer from "../components/Footer";

const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1 } },
};
const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] } },
};

export default function Contact() {
  const [formData, setFormData] = useState({ email: "", whatsappPhone: "", message: "" });
  const [status, setStatus] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setStatus(null);
    try {
      const res = await sendContactMessage(formData);
      setStatus({ type: "success", message: res.data.message });
      setFormData({ email: "", whatsappPhone: "", message: "" });
    } catch (err) {
      setStatus({ type: "error", message: err.response?.data?.message || "Something went wrong." });
    }
    setLoading(false);
  };

  return (
    <div>
      {/* ─── HERO ─── */}
      <section style={{
        minHeight: "60vh", display: "flex", alignItems: "center", justifyContent: "center",
        position: "relative", overflow: "hidden", padding: "0 2rem",
      }}>
        {/* Animated BG blobs */}
        <div style={{ position: "absolute", inset: 0, overflow: "hidden", pointerEvents: "none" }}>
          <motion.div animate={{ x: [0, 30, 0], y: [0, -20, 0] }} transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
            style={{ position: "absolute", top: "15%", left: "10%", width: "400px", height: "400px",
              background: "radial-gradient(circle, rgba(124,106,255,0.18) 0%, transparent 70%)", borderRadius: "50%", filter: "blur(40px)" }} />
          <motion.div animate={{ x: [0, -30, 0], y: [0, 30, 0] }} transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
            style={{ position: "absolute", top: "40%", right: "10%", width: "350px", height: "350px",
              background: "radial-gradient(circle, rgba(255,106,136,0.15) 0%, transparent 70%)", borderRadius: "50%", filter: "blur(40px)" }} />
        </div>

        {/* Grid lines */}
        <div style={{
          position: "absolute", inset: 0, pointerEvents: "none",
          backgroundImage: "linear-gradient(rgba(255,255,255,0.02) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.02) 1px, transparent 1px)",
          backgroundSize: "60px 60px",
        }} />

        <motion.div
          variants={containerVariants} initial="hidden" animate="visible"
          style={{ textAlign: "center", zIndex: 1 }}
        >
          <motion.h1 variants={itemVariants} style={{
            fontFamily: "'Syne', sans-serif", fontSize: "clamp(2.5rem, 8vw, 5rem)", fontWeight: 800,
            background: "linear-gradient(135deg, var(--accent), var(--accent2))",
            WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent",
            marginBottom: "1rem",
          }}>
            Get In Touch
          </motion.h1>
          <motion.p variants={itemVariants} style={{
            fontSize: "1.2rem", color: "var(--muted)", maxWidth: "600px", margin: "0 auto",
          }}>
            Have a project in mind or just want to chat? I'd love to hear from you. Send me a message and I'll get back to you as soon as possible.
          </motion.p>
        </motion.div>
      </section>

      {/* ─── CONTACT FORM ─── */}
      <section style={{ padding: "4rem 2rem", maxWidth: "800px", margin: "0 auto" }}>
        <motion.form
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          onSubmit={handleSubmit}
          style={{
            background: "var(--bg2)", border: "1px solid var(--border)", borderRadius: "16px",
            padding: "3rem", boxShadow: "0 20px 40px rgba(0,0,0,0.1)",
          }}
        >
          <div style={{ marginBottom: "2rem" }}>
            <label style={{ display: "block", marginBottom: "0.5rem", fontWeight: 500 }}>Email</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              style={{
                width: "100%", padding: "1rem", border: "1px solid var(--border)", borderRadius: "8px",
                background: "var(--bg)", color: "var(--text)", fontSize: "1rem",
              }}
            />
          </div>
          <div style={{ marginBottom: "2rem" }}>
            <label style={{ display: "block", marginBottom: "0.5rem", fontWeight: 500 }}>WhatsApp Phone Number</label>
            <input
              type="tel"
              name="whatsappPhone"
              value={formData.whatsappPhone}
              onChange={handleChange}
              required
              style={{
                width: "100%", padding: "1rem", border: "1px solid var(--border)", borderRadius: "8px",
                background: "var(--bg)", color: "var(--text)", fontSize: "1rem",
              }}
            />
          </div>
          <div style={{ marginBottom: "2rem" }}>
            <label style={{ display: "block", marginBottom: "0.5rem", fontWeight: 500 }}>Message</label>
            <textarea
              name="message"
              value={formData.message}
              onChange={handleChange}
              required
              rows={5}
              style={{
                width: "100%", padding: "1rem", border: "1px solid var(--border)", borderRadius: "8px",
                background: "var(--bg)", color: "var(--text)", fontSize: "1rem", resize: "vertical",
              }}
            />
          </div>
          <motion.button
            type="submit"
            disabled={loading}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            style={{
              width: "100%", padding: "1rem", background: "linear-gradient(135deg, var(--accent), var(--accent2))",
              color: "white", border: "none", borderRadius: "8px", fontSize: "1rem", fontWeight: 600,
              cursor: loading ? "not-allowed" : "pointer", opacity: loading ? 0.7 : 1,
            }}
          >
            {loading ? "Sending..." : "Send Message"}
          </motion.button>
          {status && (
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              style={{
                marginTop: "1rem", textAlign: "center",
                color: status.type === "success" ? "var(--accent)" : "#ff6a88",
              }}
            >
              {status.message}
            </motion.p>
          )}
        </motion.form>
      </section>

      {/* ─── SOCIAL LINKS ─── */}
      <section style={{ padding: "2rem", textAlign: "center" }}>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <h2 style={{ fontSize: "2rem", marginBottom: "2rem", color: "var(--text)" }}>Connect With Me</h2>
          <div style={{ display: "flex", justifyContent: "center", gap: "2rem" }}>
            {[
              { icon: <FiGithub />, label: "GitHub", href: "https://github.com/timothyasuke-prog" }, // Add your GitHub link here
              { icon: <FiInstagram />, label: "Instagram", href: "https://www.instagram.com/tj_june_956?igsh=OW9kZm1yeDd6ZWk2" }, // Add your Instagram link here
              { icon: <FiFacebook />, label: "Facebook", href: "https://www.facebook.com/timothy.tj.694916" }, // Add your Facebook link here
              { icon: <FiMessageCircle />, label: "WhatsApp", href: "https://wa.me/+254 759 834876" }, // Add your WhatsApp link here
            ].map(({ icon, label, href }, i) => (
              <motion.a
                key={i}
                href={href}
                target="_blank"
                whileHover={{ y: -5, scale: 1.1 }}
                style={{
                  display: "flex", flexDirection: "column", alignItems: "center",
                  color: "var(--muted)", fontSize: "2rem", textDecoration: "none",
                  transition: "color 0.3s",
                }}
              >
                {icon}
                <span style={{ fontSize: "0.8rem", marginTop: "0.5rem" }}>{label}</span>
              </motion.a>
            ))}
          </div>
          <p style={{ marginTop: "2rem", color: "var(--muted)", fontSize: "0.9rem" }}>
            Add your social media links in the href attributes above. For WhatsApp, use a link like "https://wa.me/YOUR_PHONE_NUMBER".
          </p>
        </motion.div>
      </section>

      <Footer />
    </div>
  );
}