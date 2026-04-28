const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const http = require("http");
const { Server } = require("socket.io");
const path = require("path");
const fs = require("fs");
const EventEmitter = require("events");
const errorHandler = require("./middleware/errorHandler");
const projectRoutes = require("./routes/projectRoutes");
const contactRoutes = require("./routes/contactRoutes");
const { setContactEventBus } = require("./controllers/contactController");

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;
const CLIENT_URL = process.env.CLIENT_URL || "http://localhost:5173";

const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: [CLIENT_URL, "http://localhost:5000", "http://localhost:3001"],
    methods: ["GET", "POST"],
  },
});

const dataFolder = path.join(__dirname, "data");
const visitCountFile = path.join(dataFolder, "visitCount.json");
const messagesFile = path.join(dataFolder, "messages.json");
const adminFolder = path.join(__dirname, "..", "admin");

const ensureJsonFile = (filePath, defaultValue) => {
  if (!fs.existsSync(filePath)) {
    fs.writeFileSync(filePath, JSON.stringify(defaultValue, null, 2));
  }
};
const readJson = (filePath, defaultValue) => {
  ensureJsonFile(filePath, defaultValue);
  try {
    return JSON.parse(fs.readFileSync(filePath, "utf8"));
  } catch (err) {
    fs.writeFileSync(filePath, JSON.stringify(defaultValue, null, 2));
    return defaultValue;
  }
};
const writeJson = (filePath, value) => fs.writeFileSync(filePath, JSON.stringify(value, null, 2));

ensureJsonFile(visitCountFile, { count: 0 });
ensureJsonFile(messagesFile, []);

const eventBus = new EventEmitter();
setContactEventBus(eventBus);

eventBus.on("newMessage", (message) => {
  io.emit("newMessage", message);
});

eventBus.on("visitUpdated", (count) => {
  io.emit("visitUpdate", count);
});

// Middleware
app.use(cors({
  origin: [
    CLIENT_URL,
    "http://localhost:5000",
    "http://localhost:3001",
    "http://localhost:5173",
    "http://localhost:5174",
    "http://localhost:5175",
    "http://localhost:5176",
    "http://localhost:5177",
    /\.vercel\.app$/, // Allow all Vercel domains
    "https://my-portfolio-*.vercel.app" // Allow your specific project domains
  ],
  credentials: true
}));
app.use(express.json());

// Routes
app.use("/api/projects", projectRoutes);
app.use("/api/contact", contactRoutes);

app.post("/api/visit", (req, res) => {
  const visitData = readJson(visitCountFile, { count: 0 });
  visitData.count += 1;
  writeJson(visitCountFile, visitData);
  eventBus.emit("visitUpdated", visitData.count);
  res.json({ count: visitData.count });
});

app.get("/api/visit-count", (req, res) => {
  const visitData = readJson(visitCountFile, { count: 0 });
  res.json({ count: visitData.count });
});

app.get("/api/messages", (req, res) => {
  const messages = readJson(messagesFile, []);
  res.json(messages.reverse());
});

app.use("/admin", express.static(path.join(adminFolder, "public")));
app.get("/admin", (req, res) => {
  res.sendFile(path.join(adminFolder, "public", "index.html"));
});

// Health check
app.get("/api/health", (req, res) => {
  res.json({ status: "OK", message: "Portfolio backend is running" });
});

// Error handler (must be last)
app.use(errorHandler);

io.on("connection", (socket) => {
  const visitData = readJson(visitCountFile, { count: 0 });
  const messages = readJson(messagesFile, []);
  socket.emit("initData", { visitCount: visitData.count, messagesCount: messages.length });
});

// Export for Vercel serverless functions
module.exports = app;

// Start server only when not in Vercel environment
if (require.main === module) {
  server.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}