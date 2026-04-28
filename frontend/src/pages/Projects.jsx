import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FiExternalLink, FiGithub, FiClock, FiChevronDown } from "react-icons/fi";
import { fetchProjects, fetchCurrentlyWorkingOn } from "../api";
import ProjectModal from "./ProjectModal";
import Footer from "../components/Footer";

const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1 } },
};
const cardVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.55, ease: [0.22, 1, 0.36, 1] } },
};

function ProjectCard({ project, onLearnMore, isWip }) {
  return (
    <motion.div
      variants={cardVariants}
      whileHover={{ y: -8, boxShadow: isWip ? "0 20px 50px rgba(255,106,136,0.12)" : "0 20px 50px rgba(124,106,255,0.15)" }}
      style={{
        background: "var(--card)", border: `1px solid ${isWip ? "rgba(255,106,136,0.2)" : "var(--border)"}`,
        borderRadius: "20px", overflow: "hidden", display: "flex", flexDirection: "column",
        transition: "box-shadow 0.3s",
      }}
    >
      {/* Card Top Banner */}
      <div style={{
        height: "8px",
        background: isWip
          ? "linear-gradient(90deg, var(--accent2), #ff9a5c)"
          : "linear-gradient(90deg, var(--accent), var(--accent3))",
      }} />

      <div style={{ padding: "1.8rem", display: "flex", flexDirection: "column", flex: 1, gap: "1rem" }}>
        {/* Status badge */}
        {isWip && (
          <span style={{
            display: "inline-flex", alignItems: "center", gap: "0.35rem",
            background: "rgba(255,106,136,0.12)", border: "1px solid rgba(255,106,136,0.3)",
            color: "var(--accent2)", borderRadius: "100px",
            padding: "0.25rem 0.8rem", fontSize: "0.75rem", fontWeight: 600, alignSelf: "flex-start",
          }}>
            <FiClock size={11} /> In Progress
          </span>
        )}

        <div>
          <h3 style={{ fontFamily: "'Syne', sans-serif", fontWeight: 700, fontSize: "1.15rem", marginBottom: "0.5rem" }}>{project.title}</h3>
          <p style={{ color: "var(--muted)", fontSize: "0.88rem", lineHeight: 1.65 }}>{project.description}</p>
        </div>

        {/* Project Image */}
        {project.image && project.image.trim() !== "" && (
          <div style={{
            width: "100%", height: "180px", borderRadius: "12px", overflow: "hidden",
            background: "linear-gradient(135deg, rgba(124,106,255,0.1), rgba(0,229,160,0.1))",
            display: "flex", alignItems: "center", justifyContent: "center",
          }}>
            <img
              src={project.image}
              alt={project.title}
              style={{
                width: "100%", height: "100%", objectFit: "cover",
                transition: "transform 0.3s ease"
              }}
              onMouseEnter={(e) => e.target.style.transform = "scale(1.05)"}
              onMouseLeave={(e) => e.target.style.transform = "scale(1)"}
            />
          </div>
        )}

        {/* Tech Stack */}
        <div style={{ display: "flex", flexWrap: "wrap", gap: "0.4rem" }}>
          {(project.techStack || []).map((t) => (
            <span key={t} style={{
              background: isWip ? "rgba(255,106,136,0.08)" : "rgba(124,106,255,0.08)",
              border: `1px solid ${isWip ? "rgba(255,106,136,0.2)" : "rgba(124,106,255,0.2)"}`,
              color: isWip ? "var(--accent2)" : "var(--accent)",
              borderRadius: "20px", padding: "0.2rem 0.65rem", fontSize: "0.75rem", fontWeight: 500,
            }}>{t}</span>
          ))}
        </div>

        {/* Actions */}
        <div style={{ display: "flex", gap: "0.75rem", marginTop: "auto", paddingTop: "0.5rem" }}>
          <motion.button
            whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.96 }}
            onClick={() => onLearnMore(project)}
            style={{
              flex: 1, padding: "0.7rem",
              background: isWip
                ? "linear-gradient(135deg, rgba(255,106,136,0.15), rgba(255,154,92,0.1))"
                : "linear-gradient(135deg, rgba(124,106,255,0.15), rgba(0,229,160,0.1))",
              border: `1px solid ${isWip ? "rgba(255,106,136,0.3)" : "rgba(124,106,255,0.3)"}`,
              color: isWip ? "var(--accent2)" : "var(--accent)",
              borderRadius: "100px", fontWeight: 600, fontSize: "0.85rem", cursor: "pointer",
            }}
          >Learn More</motion.button>

          {project.githubUrl && (
            <motion.a href={project.githubUrl} target="_blank" rel="noreferrer"
              whileHover={{ scale: 1.1 }}
              style={{
                display: "flex", alignItems: "center", justifyContent: "center",
                width: "40px", height: "40px", borderRadius: "50%",
                background: "rgba(255,255,255,0.05)", border: "1px solid var(--border)",
                color: "var(--muted)", fontSize: "1rem",
              }}
            ><FiGithub /></motion.a>
          )}

          {!isWip && project.liveUrl && project.liveUrl !== "#" && (
            <motion.a href={project.liveUrl} target="_blank" rel="noreferrer"
              whileHover={{ scale: 1.1 }}
              style={{
                display: "flex", alignItems: "center", justifyContent: "center",
                width: "40px", height: "40px", borderRadius: "50%",
                background: "rgba(0,229,160,0.1)", border: "1px solid rgba(0,229,160,0.3)",
                color: "var(--accent3)", fontSize: "1rem",
              }}
            ><FiExternalLink /></motion.a>
          )}
        </div>
      </div>
    </motion.div>
  );
}

export default function Projects() {
  const [projects, setProjects] = useState([]);
  const [wipProjects, setWipProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [wipLoading, setWipLoading] = useState(true);
  const [error, setError] = useState(null);
  const [wipError, setWipError] = useState(null);
  const [selectedProject, setSelectedProject] = useState(null);
  const [showWip, setShowWip] = useState(false);

  useEffect(() => {
    fetchProjects()
      .then((res) => setProjects(res.data.data))
      .catch(() => setError("Could not load projects. Make sure the backend is running."))
      .finally(() => setLoading(false));

    fetchCurrentlyWorkingOn()
      .then((res) => setWipProjects(res.data.data))
      .catch(() => setWipError("Could not load currently working on projects."))
      .finally(() => setWipLoading(false));
  }, []);
  return (
    <div style={{ paddingTop: "88px", minHeight: "100vh" }}>
      <div style={{ maxWidth: "1200px", margin: "0 auto", padding: "3rem 2rem" }}>

        {/* Header */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}
          style={{ textAlign: "center", marginBottom: "4rem" }}
        >
          <p style={{ color: "var(--accent)", fontWeight: 600, letterSpacing: "0.1em", textTransform: "uppercase", fontSize: "0.82rem", marginBottom: "0.8rem" }}>What I've built</p>
          <h1 style={{ fontSize: "clamp(2.5rem, 5vw, 4rem)", fontWeight: 800, letterSpacing: "-0.02em" }}>My Projects</h1>
          <p style={{ color: "var(--muted)", maxWidth: "520px", margin: "1rem auto 0", lineHeight: 1.7 }}>A collection of projects I've built, from full-stack apps to creative experiments.</p>
        </motion.div>

        {/* Loading */}
        {loading && (
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(320px, 1fr))", gap: "1.5rem" }}>
            {[1,2,3].map(i => (
              <motion.div key={i} animate={{ opacity: [0.4, 0.7, 0.4] }} transition={{ duration: 1.5, repeat: Infinity, delay: i * 0.2 }}
                style={{ background: "var(--card)", borderRadius: "20px", height: "280px", border: "1px solid var(--border)" }}
              />
            ))}
          </div>
        )}

        {/* Error */}
        {error && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}
            style={{ textAlign: "center", padding: "4rem", background: "rgba(255,106,136,0.05)",
              border: "1px solid rgba(255,106,136,0.2)", borderRadius: "20px", color: "var(--accent2)" }}
          >
            <p style={{ fontSize: "1.1rem" }}>⚠️ {error}</p>
          </motion.div>
        )}

        {/* Projects Grid */}
        {!loading && !error && (
          <motion.div variants={containerVariants} initial="hidden" animate="visible"
            style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(320px, 1fr))", gap: "1.5rem" }}
          >
            {projects.map((p) => (
              <ProjectCard key={p.id} project={p} onLearnMore={setSelectedProject} isWip={false} />
            ))}
          </motion.div>
        )}

        {/* ── WIP Section ── */}
        <div style={{ marginTop: "6rem" }}>
          {/* Loading WIP */}
          {wipLoading && (
            <motion.button
              style={{
                display: "flex", alignItems: "center", gap: "0.75rem",
                background: "rgba(255,106,136,0.06)",
                border: "1px dashed rgba(255,106,136,0.35)",
                color: "var(--text)", borderRadius: "16px",
                padding: "1.2rem 2rem", width: "100%",
                fontFamily: "'Syne', sans-serif", fontWeight: 700, fontSize: "1.1rem",
              }}
            >
              <FiClock color="var(--accent2)" />
              <span>Loading Currently Working On...</span>
            </motion.button>
          )}

          {/* WIP Error */}
          {wipError && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}
              style={{ textAlign: "center", padding: "2rem", background: "rgba(255,106,136,0.05)",
                border: "1px solid rgba(255,106,136,0.2)", borderRadius: "16px", color: "var(--accent2)" }}
            >
              <p style={{ fontSize: "1rem" }}>⚠️ {wipError}</p>
            </motion.div>
          )}

          {/* WIP Projects */}
          {!wipLoading && !wipError && wipProjects.length > 0 && (
            <>
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => setShowWip(!showWip)}
                style={{
                  display: "flex", alignItems: "center", gap: "0.75rem",
                  background: "rgba(255,106,136,0.06)",
                  border: "1px dashed rgba(255,106,136,0.35)",
                  color: "var(--text)", borderRadius: "16px",
                  padding: "1.2rem 2rem", width: "100%", cursor: "pointer",
                  fontFamily: "'Syne', sans-serif", fontWeight: 700, fontSize: "1.1rem",
                }}
              >
                <FiClock color="var(--accent2)" />
                <span>Currently Working On</span>
                <span style={{ marginLeft: "auto", display: "flex", alignItems: "center", gap: "0.5rem" }}>
                  <span style={{
                    background: "rgba(255,106,136,0.12)", border: "1px solid rgba(255,106,136,0.3)",
                    color: "var(--accent2)", borderRadius: "100px",
                    padding: "0.2rem 0.7rem", fontSize: "0.78rem",
                  }}>{wipProjects.length} projects</span>
                  <motion.span animate={{ rotate: showWip ? 180 : 0 }} transition={{ duration: 0.3 }}>
                    <FiChevronDown color="var(--muted)" />
                  </motion.span>
                </span>
              </motion.button>

              <AnimatePresence>
                {showWip && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
                    style={{ overflow: "hidden" }}
                  >
                    <motion.div variants={containerVariants} initial="hidden" animate="visible"
                      style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(320px, 1fr))", gap: "1.5rem", marginTop: "1.5rem" }}
                    >
                      {wipProjects.map((p) => (
                        <ProjectCard key={p.id} project={p} onLearnMore={setSelectedProject} isWip={true} />
                      ))}
                    </motion.div>
                  </motion.div>
                )}
              </AnimatePresence>
            </>
          )}
        </div>
      </div>

      <Footer />

      {/* Modal */}
      <AnimatePresence>
        {selectedProject && (
          <ProjectModal project={selectedProject} onClose={() => setSelectedProject(null)} />
        )}
      </AnimatePresence>
    </div>
  );
}