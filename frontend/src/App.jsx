import { Routes, Route, useLocation } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Projects from "./pages/Projects";
import About from "./pages/About";
import Contact from "./pages/Contact";
import Resume from "./pages/Resume";
import AdminPanel from "./pages/AdminPanel";

export default function App() {
  const location = useLocation();
  const isAdminRoute = location.pathname === "/admint";

  return (
    <>
      {!isAdminRoute && <Navbar />}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/projects" element={<Projects />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/resume" element={<Resume />} />
        <Route path="/admint" element={<AdminPanel />} />
      </Routes>
    </>
  );
}