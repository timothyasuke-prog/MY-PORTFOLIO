const path = require("path");
const fs = require("fs");
const crypto = require("crypto");

const projectsJsonFile = path.join(__dirname, "../data/projects.json");
const currentlyWorkingOnJsonFile = path.join(__dirname, "../data/currentlyWorkingOn.json");
const legacyCurrentlyWorkingOnJsFile = path.join(__dirname, "../data/currentlyWorkingOn.js");

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

const writeJsonFile = (filePath, value) => {
  fs.writeFileSync(filePath, JSON.stringify(value, null, 2), "utf8");
};

const ensureStoreFiles = () => {
  if (!fs.existsSync(projectsJsonFile)) {
    writeJsonFile(projectsJsonFile, []);
  }

  if (!fs.existsSync(currentlyWorkingOnJsonFile)) {
    if (fs.existsSync(legacyCurrentlyWorkingOnJsFile)) {
      delete require.cache[require.resolve(legacyCurrentlyWorkingOnJsFile)];
      const legacy = require(legacyCurrentlyWorkingOnJsFile);
      writeJsonFile(currentlyWorkingOnJsonFile, Array.isArray(legacy) ? legacy : []);
    } else {
      writeJsonFile(currentlyWorkingOnJsonFile, []);
    }
  }
};

const normalizeTechStack = (value) => {
  if (Array.isArray(value)) {
    return value.map((item) => String(item).trim()).filter(Boolean);
  }
  return String(value || "")
    .split(",")
    .map((item) => item.trim())
    .filter(Boolean);
};

const sanitizeProjectPayload = (body = {}, status) => {
  const title = String(body.title || "").trim();
  const description = String(body.description || "").trim();
  const githubUrl = String(body.githubUrl || "").trim();
  const liveUrl = String(body.liveUrl || "").trim();
  const image = String(body.image || "").trim();
  const readme = String(body.readme || "").trim();
  const techStack = normalizeTechStack(body.techStack);

  if (!title || !description || !githubUrl) {
    return { error: "Project title, description, and GitHub link are required." };
  }
  if (techStack.length === 0) {
    return { error: "Please provide at least one tech stack value." };
  }

  return {
    data: {
      id: status === "working" ? `wip-${crypto.randomUUID()}` : Date.now(),
      title,
      description,
      techStack,
      githubUrl,
      liveUrl,
      image,
      readme,
      status,
      createdAt: new Date().toISOString(),
    },
  };
};

const isAdminAuthorized = (req) => {
  const key = process.env.ADMIN_API_KEY;
  if (!key) return true;
  return req.headers["x-admin-key"] === key;
};

const loadProjects = () => {
  ensureStoreFiles();
  return readJsonFile(projectsJsonFile);
};

const loadCurrentlyWorkingOn = () => {
  ensureStoreFiles();
  return readJsonFile(currentlyWorkingOnJsonFile);
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
  res.status(200).json({ success: true, data: loadCurrentlyWorkingOn() });
};

const createDoneProject = (req, res) => {
  if (!isAdminAuthorized(req)) {
    return res.status(401).json({ success: false, message: "Unauthorized" });
  }

  const validated = sanitizeProjectPayload(req.body, "done");
  if (validated.error) {
    return res.status(400).json({ success: false, message: validated.error });
  }

  const projects = loadProjects();
  projects.unshift(validated.data);
  writeJsonFile(projectsJsonFile, projects);
  return res.status(201).json({ success: true, data: validated.data });
};

const createCurrentlyWorkingOnProject = (req, res) => {
  if (!isAdminAuthorized(req)) {
    return res.status(401).json({ success: false, message: "Unauthorized" });
  }

  const validated = sanitizeProjectPayload(req.body, "working");
  if (validated.error) {
    return res.status(400).json({ success: false, message: validated.error });
  }

  const projects = loadCurrentlyWorkingOn();
  projects.unshift(validated.data);
  writeJsonFile(currentlyWorkingOnJsonFile, projects);
  return res.status(201).json({ success: true, data: validated.data });
};

module.exports = {
  getAllProjects,
  getFeaturedProjects,
  getProjectById,
  getCurrentlyWorkingOn,
  createDoneProject,
  createCurrentlyWorkingOnProject,
};