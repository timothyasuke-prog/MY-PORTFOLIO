import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { FiGithub, FiInstagram, FiFacebook, FiMessageCircle } from "react-icons/fi";

const skills = ["React", "Node.js", "Express", "MongoDB", "PostgreSQL", "JavaScript", "Python", "Git"];
const quickLinks = [
  { label: "Home", to: "/" },
  { label: "Projects", to: "/projects" },
  { label: "About", to: "/about" },
  { label: "Contact", to: "/contact" },
  { label: "Resume / CV", to: "/resume" },
];

export default function Footer() {
  return (
    <footer style={{
      background: "var(--bg2)",
      borderTop: "1px solid var(--border)",
      padding: "5rem 2rem 2rem",
      marginTop: "6rem",
    }}>
      <div style={{
        maxWidth: "1200px", margin: "0 auto",
        display: "grid",
        gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
        gap: "3rem",
      }}>

        {/* Brand */}
        <div>
          <h3 style={{
            fontFamily: "'Syne', sans-serif", fontSize: "1.6rem", fontWeight: 800,
            background: "linear-gradient(135deg, var(--accent), var(--accent2))",
            WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent",
            marginBottom: "1rem",
          }}>Asuke Timothy Junior</h3>
          <p style={{ color: "var(--muted)", fontSize: "0.9rem", lineHeight: 1.7, maxWidth: "260px" }}>
            Full-stack developer crafting clean, performant, and beautiful digital experiences. Turning ideas into reality, one line of code at a time.
          </p>
          <div style={{ display: "flex", gap: "1rem", marginTop: "1.5rem" }}>
            {[
              { icon: <FiGithub />, href: "https://github.com/timothyasuke-prog" }, // Add your GitHub link here
              { icon: <FiInstagram />, href: "https://www.instagram.com/tj_june_956?igsh=OW9kZm1yeDd6ZWk2" }, // Add your Instagram link here
              { icon: <FiFacebook />, href: "https://www.facebook.com/timothy.tj.694916" }, // Add your Facebook link here
              { icon: <FiMessageCircle />, href: "https://wa.me/+254 759 834876" }, // Add your WhatsApp link here
            ].map(({ icon, href }, i) => (
              <motion.a key={i} href={href} target="_blank" whileHover={{ y: -3, color: "var(--accent)" }}
                style={{ color: "var(--muted)", fontSize: "1.2rem", transition: "color 0.2s" }}>
                {icon}
              </motion.a>
            ))}
          </div>
        </div>

        {/* Quick Links */}
        <div>
          <h4 style={{ fontFamily: "'Syne', sans-serif", fontWeight: 700, marginBottom: "1.2rem", fontSize: "1rem", letterSpacing: "0.05em", color: "var(--muted)", textTransform: "uppercase" }}>Quick Access</h4>
          <div style={{ display: "flex", flexDirection: "column", gap: "0.7rem" }}>
            {quickLinks.map(({ label, to }) => (
              <Link key={to} to={to}>
                <motion.span whileHover={{ x: 6 }} style={{
                  display: "inline-block", color: "var(--text)", fontSize: "0.95rem",
                  transition: "color 0.2s",
                }}
                  onMouseEnter={e => e.target.style.color = "var(--accent)"}
                  onMouseLeave={e => e.target.style.color = "var(--text)"}
                >{label}</motion.span>
              </Link>
            ))}
          </div>
        </div>

        {/* Skills */}
        <div>
          <h4 style={{ fontFamily: "'Syne', sans-serif", fontWeight: 700, marginBottom: "1.2rem", fontSize: "1rem", letterSpacing: "0.05em", color: "var(--muted)", textTransform: "uppercase" }}>Tech Stack</h4>
          <div style={{ display: "flex", flexWrap: "wrap", gap: "0.5rem" }}>
            {skills.map((s) => (
              <motion.span key={s} whileHover={{ scale: 1.08 }} style={{
                background: "rgba(124,106,255,0.1)", border: "1px solid rgba(124,106,255,0.25)",
                color: "var(--accent)", borderRadius: "20px",
                padding: "0.3rem 0.75rem", fontSize: "0.8rem", fontWeight: 500,
                cursor: "default",
              }}>{s}</motion.span>
            ))}
          </div>
        </div>

        {/* What I do */}
        <div>
          <h4 style={{ fontFamily: "'Syne', sans-serif", fontWeight: 700, marginBottom: "1.2rem", fontSize: "1rem", letterSpacing: "0.05em", color: "var(--muted)", textTransform: "uppercase" }}>What I Do</h4>
          {[
            { title: "Frontend Development", desc: "Responsive UIs with React & modern CSS" },
            { title: "Backend Engineering", desc: "REST APIs with Node.js & Express" },
            { title: "Database Design", desc: "SQL & NoSQL architecture" },
          ].map(({ title, desc }) => (
            <div key={title} style={{ marginBottom: "1rem" }}>
              <p style={{ fontSize: "0.9rem", fontWeight: 600, color: "var(--text)" }}>{title}</p>
              <p style={{ fontSize: "0.82rem", color: "var(--muted)" }}>{desc}</p>
            </div>
          ))}
        </div>
      </div>

      <div style={{
        maxWidth: "1200px", margin: "3rem auto 0",
        borderTop: "1px solid var(--border)", paddingTop: "1.5rem",
        display: "flex", justifyContent: "space-between", alignItems: "center",
        flexWrap: "wrap", gap: "1rem",
      }}>
        <p style={{ color: "var(--muted)", fontSize: "0.85rem" }}>© {new Date().getFullYear()} Asuke Timothy Junior. All rights reserved.</p>
        <p style={{ color: "var(--muted)", fontSize: "0.85rem" }}>Contact for inquiries: +254 759 834876</p>
      </div>
    </footer>
  );
}