import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { HiMenuAlt3, HiX } from "react-icons/hi";

const links = [
  { label: "Home", to: "/" },
  { label: "Projects", to: "/projects" },
  { label: "About", to: "/about" },
  { label: "Contact", to: "/contact" },
  { label: "Resume / CV", to: "/resume" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const { pathname } = useLocation();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 30);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => setOpen(false), [pathname]);

  return (
    <>
      <motion.nav
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        style={{
          position: "fixed", top: 0, left: 0, right: 0, zIndex: 1000,
          padding: "0 2rem",
          height: "68px",
          display: "flex", alignItems: "center", justifyContent: "space-between",
          background: scrolled ? "rgba(10,10,15,0.85)" : "transparent",
          backdropFilter: scrolled ? "blur(20px)" : "none",
          borderBottom: scrolled ? "1px solid var(--border)" : "none",
          transition: "all 0.4s ease",
        }}
      >
        {/* Logo */}
        <Link to="/">
          <motion.div whileHover={{ scale: 1.05 }} style={{
            fontFamily: "'Syne', sans-serif",
            fontWeight: 800,
            fontSize: "1.3rem",
            background: "linear-gradient(135deg, var(--accent), var(--accent2))",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            letterSpacing: "-0.02em",
          }}>ATJ</motion.div>
        </Link>

        {/* Desktop Links */}
        <div style={{ display: "flex", gap: "2rem", alignItems: "center" }} className="desktop-nav">
          {links.map(({ label, to }) => (
            <Link key={to} to={to}>
              <motion.span
                whileHover={{ y: -2 }}
                style={{
                  fontSize: "0.9rem",
                  fontWeight: pathname === to ? 600 : 400,
                  color: pathname === to ? "var(--accent)" : "var(--muted)",
                  transition: "color 0.2s",
                  letterSpacing: "0.01em",
                }}
              >{label}</motion.span>
            </Link>
          ))}
        </div>

        {/* Hamburger */}
        <motion.button
          whileTap={{ scale: 0.9 }}
          onClick={() => setOpen(!open)}
          className="hamburger"
          style={{
            background: "none", border: "none", color: "var(--text)",
            fontSize: "1.5rem", cursor: "pointer", display: "none",
          }}
        >
          {open ? <HiX /> : <HiMenuAlt3 />}
        </motion.button>
      </motion.nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, x: "100%" }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: "100%" }}
            transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
            style={{
              position: "fixed", top: 0, right: 0, bottom: 0, width: "75vw",
              background: "var(--surface)", zIndex: 999,
              display: "flex", flexDirection: "column", padding: "6rem 2rem 2rem",
              gap: "2rem", borderLeft: "1px solid var(--border)",
            }}
          >
            {links.map(({ label, to }, i) => (
              <motion.div
                key={to}
                initial={{ opacity: 0, x: 30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.07 }}
              >
                <Link to={to} style={{
                  fontSize: "1.4rem", fontFamily: "'Syne', sans-serif",
                  fontWeight: 700,
                  color: pathname === to ? "var(--accent)" : "var(--text)",
                }}>{label}</Link>
              </motion.div>
            ))}
          </motion.div>
        )}
      </AnimatePresence>

      <style>{`
        @media (max-width: 768px) {
          .desktop-nav { display: none !important; }
          .hamburger { display: flex !important; }
        }
      `}</style>
    </>
  );
}