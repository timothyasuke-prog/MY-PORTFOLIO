import { motion } from "framer-motion";
import { FiDownload } from "react-icons/fi";
import Footer from "../components/Footer";

const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1 } },
};
const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] } },
};

export default function Resume() {
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
            Resume / CV
          </motion.h1>
          <motion.p variants={itemVariants} style={{
            fontSize: "1.2rem", color: "var(--muted)", maxWidth: "600px", margin: "0 auto",
          }}>
            Download my latest resume to learn more about my experience, skills, and qualifications.
          </motion.p>
        </motion.div>
      </section>

      {/* ─── DOWNLOAD SECTION ─── */}
      <section style={{ padding: "4rem 2rem", textAlign: "center" }}>
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          style={{
            maxWidth: "600px", margin: "0 auto",
            background: "var(--bg2)", border: "1px solid var(--border)", borderRadius: "16px",
            padding: "3rem", boxShadow: "0 20px 40px rgba(0,0,0,0.1)",
          }}
        >
          <FiDownload style={{ fontSize: "4rem", color: "var(--accent)", marginBottom: "2rem" }} />
          <h2 style={{ fontSize: "2rem", marginBottom: "1rem", color: "var(--text)" }}>Download My Resume</h2>
          <p style={{ color: "var(--muted)", marginBottom: "2rem" }}>
            Get a detailed overview of my professional background, technical skills, and project experience.
          </p>
          <motion.a
            href="#" // Add your resume PDF link here
            download="Asuke_Timothy_Resume.pdf"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            style={{
              display: "inline-flex", alignItems: "center", gap: "0.5rem",
              padding: "1rem 2rem", background: "linear-gradient(135deg, var(--accent), var(--accent2))",
              color: "white", textDecoration: "none", borderRadius: "8px", fontWeight: 600,
            }}
          >
            <FiDownload /> Download PDF
          </motion.a>
          <p style={{ marginTop: "2rem", color: "var(--muted)", fontSize: "0.9rem" }}>
            Add your resume PDF to the public folder and update the href above.
          </p>
        </motion.div>
      </section>

      <Footer />
    </div>
  );
}