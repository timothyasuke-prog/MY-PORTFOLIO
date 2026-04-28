import { useEffect, useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { Link } from "react-router-dom";
import { FiDownload, FiArrowRight } from "react-icons/fi";
import profileImg from "../assets/profile.jpg";
import Footer from "../components/Footer";

const skills = [
  { name: "React", level: 90, color: "#61dafb" },
  { name: "Node.js", level: 85, color: "#7c6aff" },
  { name: "JavaScript", level: 92, color: "#f7df1e" },
  { name: "MongoDB", level: 78, color: "#00e5a0" },
  { name: "PostgreSQL", level: 72, color: "#ff6a88" },
  { name: "Python", level: 70, color: "#ffd43b" },
  { name: "Express.js", level: 83, color: "#7c6aff" },
  { name: "Git & GitHub", level: 88, color: "#f05033" },
];

const experiences = [
  { role: "Full-Stack Developer", company: "Freelance", period: "2023 – Present", desc: "Building custom web applications for clients across various industries." },
  { role: "Frontend Developer", company: "Tech Startup", period: "2022 – 2023", desc: "Developed responsive UIs and improved performance metrics by 40%." },
];

const achievements = [
  { icon: "🏆", label: "10+ Projects", sub: "Delivered" },
  { icon: "⚡", label: "5+ Clients", sub: "Satisfied" },
  { icon: "🎯", label: "2+ Years", sub: "Experience" },
  { icon: "🌍", label: "3 Countries", sub: "Worked with" },
];

const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1 } },
};
const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] } },
};

function SkillBar({ name, level, color, delay }) {
  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true }}
      transition={{ delay, duration: 0.5 }}
      style={{ marginBottom: "1.2rem" }}
    >
      <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "0.4rem" }}>
        <span style={{ fontSize: "0.9rem", fontWeight: 500 }}>{name}</span>
        <span style={{ fontSize: "0.85rem", color: "var(--muted)" }}>{level}%</span>
      </div>
      <div style={{ background: "rgba(255,255,255,0.05)", borderRadius: "100px", height: "6px", overflow: "hidden" }}>
        <motion.div
          initial={{ width: 0 }}
          whileInView={{ width: `${level}%` }}
          viewport={{ once: true }}
          transition={{ delay: delay + 0.2, duration: 1, ease: [0.22, 1, 0.36, 1] }}
          style={{ height: "100%", background: color, borderRadius: "100px", boxShadow: `0 0 10px ${color}55` }}
        />
      </div>
    </motion.div>
  );
}

export default function Home() {
  const { scrollY } = useScroll();
  const heroY = useTransform(scrollY, [0, 500], [0, -120]);
  const heroOpacity = useTransform(scrollY, [0, 400], [1, 0]);

  return (
    <div>
      {/* ─── HERO ─── */}
      <section style={{
        minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center",
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
          <motion.div animate={{ scale: [1, 1.1, 1] }} transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
            style={{ position: "absolute", bottom: "20%", left: "40%", width: "300px", height: "300px",
              background: "radial-gradient(circle, rgba(0,229,160,0.1) 0%, transparent 70%)", borderRadius: "50%", filter: "blur(40px)" }} />
        </div>

        {/* Grid lines */}
        <div style={{
          position: "absolute", inset: 0, pointerEvents: "none",
          backgroundImage: "linear-gradient(rgba(255,255,255,0.02) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.02) 1px, transparent 1px)",
          backgroundSize: "60px 60px",
        }} />

        <motion.div style={{ y: heroY, opacity: heroOpacity }}
          variants={containerVariants} initial="hidden" animate="visible"
          className="hero-inner"
          style={{
            display: "flex", flexDirection: "column", alignItems: "center", textAlign: "center",
            zIndex: 1, maxWidth: "900px",
          }}
        >
          {/* Badge */}
          <motion.div variants={itemVariants} style={{
            display: "inline-flex", alignItems: "center", gap: "0.5rem",
            background: "rgba(124,106,255,0.1)", border: "1px solid rgba(124,106,255,0.3)",
            borderRadius: "100px", padding: "0.4rem 1.2rem",
            fontSize: "0.82rem", color: "var(--accent)", marginBottom: "2rem", letterSpacing: "0.05em",
          }}>
            <motion.span animate={{ opacity: [1, 0, 1] }} transition={{ duration: 1.5, repeat: Infinity }}>●</motion.span>
            Available for work
          </motion.div>

          {/* Profile Image */}
          <motion.div variants={itemVariants} style={{ position: "relative", marginBottom: "2.5rem" }}>
            <motion.div
              animate={{ rotate: 360 }} transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
              style={{
                position: "absolute", inset: "-8px",
                background: "conic-gradient(from 0deg, var(--accent), var(--accent2), var(--accent3), var(--accent))",
                borderRadius: "50%", zIndex: 0,
              }}
            />
            <div style={{
              width: "160px", height: "160px", borderRadius: "50%",
              background: "linear-gradient(135deg, var(--accent), var(--accent2))",
              display: "flex", alignItems: "center", justifyContent: "center",
              fontSize: "4rem", position: "relative", zIndex: 1,
              border: "4px solid var(--bg)",
              overflow: "hidden",
            }}>
              <img src={profileImg} alt="Asuke" style={{width:"100%",height:"100%",objectFit:"cover"}} />
            </div>
          </motion.div>

          {/* Name */}
          <motion.div variants={itemVariants}>
            <h1 style={{
              fontSize: "clamp(2.8rem, 7vw, 5.5rem)",
              fontWeight: 800, letterSpacing: "-0.03em", lineHeight: 1.05,
              marginBottom: "0.5rem",
            }}>
              {"ASUKE TIMOTHY".split("").map((char, i) => (
                <motion.span key={i} initial={{ opacity: 0, y: 40 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 + i * 0.04, duration: 0.5 }}
                  style={{ display: "inline-block", whiteSpace: char === " " ? "pre" : "normal" }}
                >{char}</motion.span>
              ))}
              <br />
              <motion.span
                initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.2 }}
                style={{
                  background: "linear-gradient(135deg, var(--accent), var(--accent2), var(--accent3))",
                  WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent",
                }}>JUNIOR</motion.span>
            </h1>
          </motion.div>

          <motion.p variants={itemVariants} style={{
            fontSize: "1.1rem", color: "var(--muted)", maxWidth: "560px",
            lineHeight: 1.7, marginBottom: "2.5rem",
          }}>
            Full-Stack Developer building high-performance digital experiences with modern web technologies.
          </motion.p>

          {/* CTAs */}
          <motion.div variants={itemVariants} style={{ display: "flex", gap: "1rem", flexWrap: "wrap", justifyContent: "center" }}>
            <motion.a
              href="/resume.pdf" download
              whileHover={{ scale: 1.05, boxShadow: "0 0 30px rgba(124,106,255,0.4)" }}
              whileTap={{ scale: 0.97 }}
              style={{
                display: "flex", alignItems: "center", gap: "0.5rem",
                background: "linear-gradient(135deg, var(--accent), var(--accent2))",
                color: "#fff", padding: "0.9rem 2rem",
                borderRadius: "100px", fontWeight: 600, fontSize: "0.95rem",
                cursor: "pointer", border: "none",
              }}
            >
              <FiDownload /> Download Resume
            </motion.a>
            <motion.a
              href="/cv.pdf" download
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.97 }}
              style={{
                display: "flex", alignItems: "center", gap: "0.5rem",
                background: "transparent",
                color: "var(--text)", padding: "0.9rem 2rem",
                borderRadius: "100px", fontWeight: 600, fontSize: "0.95rem",
                cursor: "pointer", border: "1px solid var(--border)",
              }}
            >
              <FiDownload /> Download CV
            </motion.a>
            <Link to="/projects">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.97 }}
                style={{
                  display: "flex", alignItems: "center", gap: "0.5rem",
                  background: "transparent", color: "var(--accent)",
                  padding: "0.9rem 2rem", borderRadius: "100px",
                  fontWeight: 600, fontSize: "0.95rem",
                  cursor: "pointer", border: "1px solid rgba(124,106,255,0.4)",
                }}
              >
                View Projects <FiArrowRight />
              </motion.button>
            </Link>
          </motion.div>
        </motion.div>

        {/* Scroll indicator */}
        <motion.div
          animate={{ y: [0, 10, 0] }} transition={{ duration: 2, repeat: Infinity }}
          style={{ position: "absolute", bottom: "2rem", left: "50%", transform: "translateX(-50%)", color: "var(--muted)", fontSize: "0.8rem", display: "flex", flexDirection: "column", alignItems: "center", gap: "0.5rem" }}
        >
          scroll
          <div style={{ width: "1px", height: "40px", background: "linear-gradient(to bottom, var(--muted), transparent)" }} />
        </motion.div>
      </section>

      {/* ─── ACHIEVEMENTS ─── */}
      <section style={{ padding: "4rem 2rem", maxWidth: "1200px", margin: "0 auto" }}>
        <motion.div variants={containerVariants} initial="hidden" whileInView="visible" viewport={{ once: true }}
          style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))", gap: "1.5rem" }}
        >
          {achievements.map(({ icon, label, sub }) => (
            <motion.div key={label} variants={itemVariants}
              whileHover={{ y: -6, boxShadow: "0 20px 40px rgba(0,0,0,0.3)" }}
              style={{
                background: "var(--card)", border: "1px solid var(--border)",
                borderRadius: "var(--radius)", padding: "2rem 1.5rem",
                textAlign: "center", cursor: "default",
              }}
            >
              <div style={{ fontSize: "2.5rem", marginBottom: "0.8rem" }}>{icon}</div>
              <div style={{ fontFamily: "'Syne', sans-serif", fontWeight: 800, fontSize: "1.4rem" }}>{label}</div>
              <div style={{ color: "var(--muted)", fontSize: "0.85rem", marginTop: "0.2rem" }}>{sub}</div>
            </motion.div>
          ))}
        </motion.div>
      </section>

      {/* ─── SKILLS ─── */}
      <section style={{ padding: "5rem 2rem", maxWidth: "1200px", margin: "0 auto" }}>
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
          <p style={{ color: "var(--accent)", fontWeight: 600, letterSpacing: "0.1em", textTransform: "uppercase", fontSize: "0.82rem", marginBottom: "0.8rem" }}>What I know</p>
          <h2 style={{ fontSize: "clamp(2rem, 4vw, 3rem)", fontWeight: 800, marginBottom: "3rem" }}>Skills & Expertise</h2>
        </motion.div>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))", gap: "1rem 4rem" }}>
          {skills.map(({ name, level, color }, i) => (
            <SkillBar key={name} name={name} level={level} color={color} delay={i * 0.07} />
          ))}
        </div>
      </section>

      {/* ─── EXPERIENCE ─── */}
      <section style={{ padding: "5rem 2rem", maxWidth: "1200px", margin: "0 auto" }}>
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
          <p style={{ color: "var(--accent2)", fontWeight: 600, letterSpacing: "0.1em", textTransform: "uppercase", fontSize: "0.82rem", marginBottom: "0.8rem" }}>My Journey</p>
          <h2 style={{ fontSize: "clamp(2rem, 4vw, 3rem)", fontWeight: 800, marginBottom: "3rem" }}>Experience</h2>
        </motion.div>
        <div style={{ position: "relative" }}>
          {/* Timeline line */}
          <div style={{ position: "absolute", left: "16px", top: "8px", bottom: "8px", width: "2px", background: "linear-gradient(to bottom, var(--accent), var(--accent2))", borderRadius: "2px" }} />
          {experiences.map(({ role, company, period, desc }, i) => (
            <motion.div key={i}
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.15, duration: 0.6 }}
              style={{ display: "flex", gap: "2rem", marginBottom: "2.5rem", paddingLeft: "1rem" }}
            >
              <div style={{ width: "12px", height: "12px", borderRadius: "50%", background: "var(--accent)", border: "3px solid var(--bg)", flexShrink: 0, marginTop: "6px", zIndex: 1 }} />
              <div style={{ background: "var(--card)", border: "1px solid var(--border)", borderRadius: "var(--radius)", padding: "1.5rem 2rem", flex: 1 }}>
                <div style={{ display: "flex", justifyContent: "space-between", flexWrap: "wrap", gap: "0.5rem", marginBottom: "0.5rem" }}>
                  <h3 style={{ fontFamily: "'Syne', sans-serif", fontWeight: 700, fontSize: "1.1rem" }}>{role}</h3>
                  <span style={{ color: "var(--accent)", fontSize: "0.82rem", fontWeight: 600 }}>{period}</span>
                </div>
                <p style={{ color: "var(--accent2)", fontSize: "0.85rem", marginBottom: "0.6rem", fontWeight: 500 }}>{company}</p>
                <p style={{ color: "var(--muted)", fontSize: "0.9rem", lineHeight: 1.6 }}>{desc}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      <Footer />
    </div>
  );
}