import { useEffect, useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
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

export default function About() {
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
            display: "grid", gridTemplateColumns: "1fr 1fr", gap: "4rem", alignItems: "center",
            maxWidth: "1200px", width: "100%",
          }}
        >
          {/* Left: Text */}
          <motion.div variants={itemVariants}>
            <h1 style={{
              fontFamily: "'Syne', sans-serif", fontSize: "clamp(2.5rem, 8vw, 5rem)", fontWeight: 800,
              background: "linear-gradient(135deg, var(--accent), var(--accent2))",
              WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent",
              marginBottom: "1rem",
            }}>
              About Me
            </h1>
            <p style={{
              fontSize: "1.2rem", color: "var(--muted)", lineHeight: 1.7, marginBottom: "2rem",
            }}>
              I'm a passionate full-stack developer with a love for creating beautiful, functional web applications. With expertise in modern technologies, I turn ideas into digital realities that make a difference.
            </p>
            <p style={{
              fontSize: "1rem", color: "var(--muted)", lineHeight: 1.7,
            }}>
              When I'm not coding, you'll find me exploring new technologies, contributing to open-source projects, or enjoying a good cup of coffee while brainstorming the next big idea.
            </p>
          </motion.div>

          {/* Right: Image placeholder */}
          <motion.div variants={itemVariants} style={{
            display: "flex", justifyContent: "center", alignItems: "center",
            width: "300px", height: "300px", borderRadius: "50%",
            background: "linear-gradient(135deg, var(--accent), var(--accent2))",
            margin: "0 auto",
            overflow: "hidden",
            border: "4px solid var(--bg)",
          }}>
            <img src={profileImg} alt="Asuke" style={{width:"100%",height:"100%",objectFit:"cover"}} />
          </motion.div>
        </motion.div>
      </section>

      {/* ─── SKILLS ─── */}
      <section style={{ padding: "6rem 2rem", background: "var(--bg2)" }}>
        <div style={{ maxWidth: "1200px", margin: "0 auto" }}>
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            style={{
              fontFamily: "'Syne', sans-serif", fontSize: "3rem", fontWeight: 800,
              textAlign: "center", marginBottom: "4rem",
              background: "linear-gradient(135deg, var(--accent), var(--accent2))",
              WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent",
            }}
          >
            Skills & Expertise
          </motion.h2>
          <div style={{
            display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: "3rem",
          }}>
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <h3 style={{ fontSize: "1.5rem", marginBottom: "2rem", color: "var(--text)" }}>Technical Skills</h3>
              {skills.map((skill, i) => (
                <SkillBar key={skill.name} {...skill} delay={i * 0.1} />
              ))}
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              <h3 style={{ fontSize: "1.5rem", marginBottom: "2rem", color: "var(--text)" }}>Experience</h3>
              {experiences.map((exp, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.2, duration: 0.6 }}
                  style={{
                    marginBottom: "2rem", padding: "1.5rem",
                    background: "var(--bg)", border: "1px solid var(--border)", borderRadius: "12px",
                  }}
                >
                  <h4 style={{ fontSize: "1.1rem", fontWeight: 600, marginBottom: "0.5rem" }}>{exp.role}</h4>
                  <p style={{ color: "var(--accent)", fontSize: "0.9rem", marginBottom: "1rem" }}>{exp.company} • {exp.period}</p>
                  <p style={{ color: "var(--muted)", fontSize: "0.9rem", lineHeight: 1.6 }}>{exp.desc}</p>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </div>
      </section>

      {/* ─── ACHIEVEMENTS ─── */}
      <section style={{ padding: "6rem 2rem" }}>
        <div style={{ maxWidth: "1200px", margin: "0 auto", textAlign: "center" }}>
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            style={{
              fontFamily: "'Syne', sans-serif", fontSize: "3rem", fontWeight: 800, marginBottom: "4rem",
              background: "linear-gradient(135deg, var(--accent), var(--accent2))",
              WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent",
            }}
          >
            Achievements
          </motion.h2>
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            style={{
              display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: "2rem",
            }}
          >
            {achievements.map((ach, i) => (
              <motion.div
                key={i}
                variants={itemVariants}
                style={{
                  padding: "2rem", background: "var(--bg2)", border: "1px solid var(--border)", borderRadius: "16px",
                  textAlign: "center",
                }}
              >
                <div style={{ fontSize: "3rem", marginBottom: "1rem" }}>{ach.icon}</div>
                <h3 style={{ fontSize: "1.5rem", fontWeight: 600, marginBottom: "0.5rem" }}>{ach.label}</h3>
                <p style={{ color: "var(--muted)" }}>{ach.sub}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  );
}