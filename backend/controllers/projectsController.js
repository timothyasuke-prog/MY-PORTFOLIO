const path = require("path");
const fs = require("fs");
const currentlyWorkingOn = require("../data/currentlyWorkingOn");

const projectsJsonFile = path.join(__dirname, "../data/projects.json");
const projectsJsFile = path.join(__dirname, "../data/projects.js");

// Helper function to read JSON files
const readJsonFile = (filePath, defaultValue = []) => {
  try {
    if (fs.existsSync(filePath)) {
      return JSON.parse(fs.readFileSync(filePath, "utf8"));
    }
    return defaultValue;
  } catch (err) {
    console.error(`Error reading ${filePath}:`, err);
    return defaultValue;
  }
};

// Load project data from projects.js if available, otherwise fallback to projects.json
const loadProjects = () => {
  if (fs.existsSync(projectsJsFile)) {
    console.log("[projectsController] loading projects from projects.js");
    delete require.cache[require.resolve(projectsJsFile)];
    return require(projectsJsFile);
  }
  console.log("[projectsController] loading projects from projects.json");
  return readJsonFile(projectsJsonFile);
};

// GET /api/projects
const getAllProjects = (req, res) => {
  const projects = loadProjects();
  res.status(200).json({ success: true, data: projects });
};

// GET /api/projects/featured
const getFeaturedProjects = (req, res) => {
  const projects = loadProjects();
  const featured = projects.filter((p) => p.featured);
  res.status(200).json({ success: true, data: featured });
};

// GET /api/projects/:id
const getProjectById = (req, res) => {
  const projects = loadProjects();
  const project = projects.find((p) => p.id === parseInt(req.params.id, 10));
  if (!project) {
    return res.status(404).json({ success: false, message: "Project not found" });
  }
  res.status(200).json({ success: true, data: project });
};

// GET /api/currently-working-on
const getCurrentlyWorkingOn = (req, res) => {
  res.status(200).json({ success: true, data: currentlyWorkingOn });
};

module.exports = { getAllProjects, getFeaturedProjects, getProjectById, getCurrentlyWorkingOn };