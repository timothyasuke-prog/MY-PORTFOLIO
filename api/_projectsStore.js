import fs from "fs";
import path from "path";
import crypto from "crypto";
import { createRequire } from "module";
import { getDataDir, getDataFile } from "./_dataPaths.js";

const require = createRequire(import.meta.url);

const dataDir = getDataDir();
const projectsFile = getDataFile("projects.json");
const wipFile = getDataFile("currentlyWorkingOn.json");
const legacyWipFile = path.join(process.cwd(), "backend", "data", "currentlyWorkingOn.js");

const defaultProjects = [
  {
    id: 1,
    title: "Portfolio Website",
    description: "A modern, responsive portfolio website built with React and Node.js",
    techStack: ["React", "Node.js", "Express", "Vite"],
    image: "/portfolio-screenshot.png",
    githubUrl: "https://github.com/timothyasuke-prog/MY-PORTFOLIO",
    liveUrl: "https://my-portfolio-nine-swart-31.vercel.app/",
    readme: "This is a portfolio website showcasing my projects and skills.",
  },
];

const defaultWip = [
  {
    id: "wip-1",
    title: "AI Chat Application",
    description: "Real-time chat application with AI integration",
    techStack: ["React", "Socket.io", "OpenAI API", "Node.js"],
    image: "/ai-chat-screenshot.png",
    githubUrl: "https://github.com/timothyasuke-prog/ai-chat",
    liveUrl: "",
    readme: "An AI-powered chat application with real-time messaging and AI responses.",
  },
];

const ensureDir = () => {
  if (!fs.existsSync(dataDir)) {
    fs.mkdirSync(dataDir, { recursive: true });
  }
};

const readJson = (filePath, fallback) => {
  if (!fs.existsSync(filePath)) {
    return fallback;
  }
  try {
    const parsed = JSON.parse(fs.readFileSync(filePath, "utf8"));
    return Array.isArray(parsed) ? parsed : fallback;
  } catch {
    return fallback;
  }
};

const writeJson = (filePath, value) => {
  fs.writeFileSync(filePath, JSON.stringify(value, null, 2), "utf8");
};

const normalizeItem = (item, status, fallbackId) => ({
  id: item.id ?? fallbackId,
  title: item.title || "",
  description: item.description || "",
  techStack: Array.isArray(item.techStack)
    ? item.techStack
    : String(item.techStack || "")
        .split(",")
        .map((t) => t.trim())
        .filter(Boolean),
  image: item.image || "",
  githubUrl: item.githubUrl || "",
  liveUrl: item.liveUrl || "",
  readme: item.readme || "",
  status,
  createdAt: item.createdAt || new Date().toISOString(),
});

const normalizeAll = (projects, wip) => ({
  projects: projects.map((item, idx) => normalizeItem(item, "done", idx + 1)),
  wip: wip.map((item, idx) => normalizeItem(item, "working", `wip-${idx + 1}`)),
});

export const ensureProjectStore = () => {
  ensureDir();
  if (!fs.existsSync(projectsFile)) {
    writeJson(projectsFile, defaultProjects);
  }

  if (!fs.existsSync(wipFile)) {
    if (fs.existsSync(legacyWipFile)) {
      try {
        const legacy = require(legacyWipFile);
        writeJson(wipFile, Array.isArray(legacy) ? legacy : defaultWip);
      } catch {
        writeJson(wipFile, defaultWip);
      }
    } else {
      writeJson(wipFile, defaultWip);
    }
  }

  const { projects, wip } = normalizeAll(readJson(projectsFile, defaultProjects), readJson(wipFile, defaultWip));
  writeJson(projectsFile, projects);
  writeJson(wipFile, wip);
};

export const getDoneProjects = () => {
  ensureProjectStore();
  return readJson(projectsFile, []);
};

export const getWipProjects = () => {
  ensureProjectStore();
  return readJson(wipFile, []);
};

const parseTechStack = (input) => {
  if (Array.isArray(input)) return input.map((t) => String(t).trim()).filter(Boolean);
  return String(input || "")
    .split(",")
    .map((t) => t.trim())
    .filter(Boolean);
};

export const validateNewProject = (payload = {}) => {
  const title = String(payload.title || "").trim();
  const description = String(payload.description || "").trim();
  const githubUrl = String(payload.githubUrl || "").trim();
  const liveUrl = String(payload.liveUrl || "").trim();
  const image = String(payload.image || "").trim();
  const readme = String(payload.readme || "").trim();
  const status = payload.status === "working" ? "working" : "done";
  const techStack = parseTechStack(payload.techStack);

  if (!title || !description || !githubUrl) {
    return { error: "Project title, description, and GitHub link are required." };
  }

  if (techStack.length === 0) {
    return { error: "Please provide at least one tech stack item." };
  }

  return {
    data: {
      id: status === "working" ? `wip-${crypto.randomUUID()}` : Date.now(),
      title,
      description,
      techStack,
      image,
      githubUrl,
      liveUrl,
      readme,
      status,
      createdAt: new Date().toISOString(),
    },
  };
};

export const addProject = (project) => {
  const isWip = project.status === "working";
  const filePath = isWip ? wipFile : projectsFile;
  const existing = isWip ? getWipProjects() : getDoneProjects();
  const next = [project, ...existing];
  writeJson(filePath, next);
  return project;
};
