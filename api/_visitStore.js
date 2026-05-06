import fs from "fs";
import { getDataDir, getDataFile } from "./_dataPaths.js";

const dataDir = getDataDir();
const visitFile = getDataFile("visitCount.json");

const ensureStore = () => {
  if (!fs.existsSync(dataDir)) {
    fs.mkdirSync(dataDir, { recursive: true });
  }
  if (!fs.existsSync(visitFile)) {
    fs.writeFileSync(visitFile, JSON.stringify({ count: 0 }, null, 2), "utf8");
  }
};

const readCount = () => {
  ensureStore();
  try {
    const parsed = JSON.parse(fs.readFileSync(visitFile, "utf8"));
    return Number.isFinite(parsed?.count) ? parsed.count : 0;
  } catch {
    return 0;
  }
};

export const getVisitCount = () => ({ count: readCount() });

export const incrementVisitCount = () => {
  const next = { count: readCount() + 1 };
  fs.writeFileSync(visitFile, JSON.stringify(next, null, 2), "utf8");
  return next;
};
