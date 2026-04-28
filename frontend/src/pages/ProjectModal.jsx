import { useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FiX, FiExternalLink, FiGithub } from "react-icons/fi";
import ReactMarkdown from "react-markdown";

export default function ProjectModal({ project, onClose }) {
  useEffect(() => {
    document.body.style.overflow = "hidden";
    const onKey = (e) => { if (e.key === "Escape") onClose(); };
    window.addEventListener("keydown", onKey);
    return () => { document.body.style.overflow = ""; window.removeEventListener("keydown", onKey); };
  }, [onClose]);

  if (!project) return null;

  const readmeContent = project.readme || `
## ${project.title}

${project.description}

### Tech Stack
${(project.techStack || []).map(t => `- **${t}**`).join("\n")}

### Features
- Responsive design across all devices
- Clean and intuitive user interface
- Optimized performance and loading speed
- Modern development practices

### How to Run
\`\`\`bash
git clone ${project.githubUrl || "https://github.com/yourname/project"}
cd project
npm install
npm run dev
\`\`\`
  `.trim();

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
        style={{
          position: "fixed", inset: 0, zIndex: 2000,
          background: "rgba(0,0,0,0.85)", backdropFilter: "blur(8px)",
          display: "flex", alignItems: "center", justifyContent: "center",
          padding: "1rem",
        }}
      >
        <motion.div
          initial={{ opacity: 0, scale: 0.88, y: 40 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.88, y: 40 }}
          transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
          onClick={(e) => e.stopPropagation()}
          style={{
            background: "var(--surface)", border: "1px solid var(--border)",
            borderRadius: "24px", width: "100%", maxWidth: "780px",
            maxHeight: "88vh", overflow: "hidden", display: "flex", flexDirection: "column",
          }}
        >
          {/* Modal Header */}
          <div style={{
            padding: "1.5rem 2rem",
            borderBottom: "1px solid var(--border)",
            display: "flex", justifyContent: "space-between", alignItems: "center",
            flexWrap: "wrap", gap: "1rem",
            background: "linear-gradient(135deg, rgba(124,106,255,0.08), rgba(255,106,136,0.05))",
          }}>
            <div>
              <h2 style={{ fontFamily: "'Syne', sans-serif", fontWeight: 800, fontSize: "1.4rem" }}>{project.title}</h2>
              <div style={{ display: "flex", flexWrap: "wrap", gap: "0.4rem", marginTop: "0.5rem" }}>
                {(project.techStack || []).map((t) => (
                  <span key={t} style={{
                    background: "rgba(124,106,255,0.12)", border: "1px solid rgba(124,106,255,0.25)",
                    color: "var(--accent)", borderRadius: "20px",
                    padding: "0.15rem 0.7rem", fontSize: "0.75rem", fontWeight: 500,
                  }}>{t}</span>
                ))}
              </div>
            </div>
            <div style={{ display: "flex", gap: "0.75rem", alignItems: "center" }}>
              {project.liveUrl && project.liveUrl !== "#" && (
                <motion.a
                  href={project.liveUrl} target="_blank" rel="noreferrer"
                  whileHover={{ scale: 1.05, boxShadow: "0 0 20px rgba(0,229,160,0.3)" }}
                  style={{
                    display: "flex", alignItems: "center", gap: "0.4rem",
                    background: "linear-gradient(135deg, var(--accent3), #00b386)",
                    color: "#000", padding: "0.6rem 1.2rem",
                    borderRadius: "100px", fontWeight: 700, fontSize: "0.85rem",
                  }}
                >
                  <FiExternalLink /> See Live
                </motion.a>
              )}
              {project.githubUrl && (
                <motion.a href={project.githubUrl} target="_blank" rel="noreferrer"
                  whileHover={{ scale: 1.05 }}
                  style={{
                    display: "flex", alignItems: "center", gap: "0.4rem",
                    background: "rgba(255,255,255,0.07)", border: "1px solid var(--border)",
                    color: "var(--text)", padding: "0.6rem 1.2rem",
                    borderRadius: "100px", fontWeight: 600, fontSize: "0.85rem",
                  }}
                >
                  <FiGithub /> GitHub
                </motion.a>
              )}
              <motion.button whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }} onClick={onClose}
                style={{
                  background: "rgba(255,255,255,0.07)", border: "1px solid var(--border)",
                  color: "var(--text)", width: "38px", height: "38px",
                  borderRadius: "50%", cursor: "pointer",
                  display: "flex", alignItems: "center", justifyContent: "center",
                  fontSize: "1.1rem",
                }}
              ><FiX /></motion.button>
            </div>
          </div>

          {/* Readme Content */}
          <div style={{ overflow: "auto", padding: "2rem", flex: 1 }} className="readme-body">
            <ReactMarkdown>{readmeContent}</ReactMarkdown>
          </div>
        </motion.div>
      </motion.div>

      <style>{`
        .readme-body h1,.readme-body h2,.readme-body h3 { font-family:'Syne',sans-serif; margin: 1.2rem 0 0.6rem; color: var(--text); }
        .readme-body h2 { font-size: 1.2rem; color: var(--accent); border-bottom: 1px solid var(--border); padding-bottom: 0.5rem; }
        .readme-body p { color: var(--muted); line-height: 1.7; margin-bottom: 0.8rem; }
        .readme-body ul,.readme-body ol { color: var(--muted); padding-left: 1.5rem; margin-bottom: 0.8rem; }
        .readme-body li { margin-bottom: 0.3rem; line-height: 1.6; }
        .readme-body code { background: rgba(124,106,255,0.15); color: var(--accent); padding: 0.15rem 0.45rem; border-radius: 5px; font-size: 0.85rem; }
        .readme-body pre { background: rgba(0,0,0,0.4); border: 1px solid var(--border); border-radius: 10px; padding: 1rem; overflow-x: auto; margin-bottom: 1rem; }
        .readme-body pre code { background: none; padding: 0; color: var(--accent3); }
        .readme-body strong { color: var(--text); }
      `}</style>
    </AnimatePresence>
  );
}