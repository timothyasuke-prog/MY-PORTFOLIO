import fs from "fs";
import crypto from "crypto";
import { getDataDir, getDataFile } from "./_dataPaths.js";

const dataDir = getDataDir();
const dataFile = getDataFile("messages.json");

const ensureStore = () => {
  if (!fs.existsSync(dataDir)) {
    fs.mkdirSync(dataDir, { recursive: true });
  }
  if (!fs.existsSync(dataFile)) {
    fs.writeFileSync(dataFile, "[]", "utf8");
  }
};

export const readMessages = () => {
  ensureStore();
  try {
    const raw = fs.readFileSync(dataFile, "utf8");
    const parsed = JSON.parse(raw);
    if (!Array.isArray(parsed)) {
      return [];
    }

    let changed = false;
    const normalized = parsed.map((item) => {
      const next = { ...item };
      if (!next.id) {
        next.id = crypto.randomUUID();
        changed = true;
      }
      if (!next.status) {
        next.status = "new";
        changed = true;
      }
      if (!Object.prototype.hasOwnProperty.call(next, "repliedAt")) {
        next.repliedAt = null;
        changed = true;
      }
      return next;
    });

    if (changed) {
      fs.writeFileSync(dataFile, JSON.stringify(normalized, null, 2), "utf8");
    }

    return normalized;
  } catch (error) {
    return [];
  }
};

const normalizePhone = (phone) => phone.replace(/[^\d+]/g, "");

export const createMessage = ({ email, whatsappPhone, message }) => {
  const cleanEmail = (email || "").trim();
  const cleanPhone = normalizePhone((whatsappPhone || "").trim());
  const cleanMessage = (message || "").trim();

  if (!cleanEmail || !cleanPhone || !cleanMessage) {
    return { error: "Please provide email, WhatsApp phone number, and message." };
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(cleanEmail)) {
    return { error: "Invalid email address." };
  }

  const phoneRegex = /^\+?\d{10,15}$/;
  if (!phoneRegex.test(cleanPhone)) {
    return { error: "Invalid WhatsApp phone number." };
  }

  if (cleanMessage.length < 10) {
    return { error: "Message must be at least 10 characters." };
  }

  return {
    id: crypto.randomUUID(),
    email: cleanEmail,
    whatsappPhone: cleanPhone,
    message: cleanMessage,
    status: "new",
    repliedAt: null,
    timestamp: new Date().toISOString(),
  };
};

export const appendMessage = (newMessage) => {
  const messages = readMessages();
  messages.push(newMessage);
  fs.writeFileSync(dataFile, JSON.stringify(messages, null, 2), "utf8");
  return newMessage;
};

export const updateMessageStatus = (id, status) => {
  const messages = readMessages();
  const index = messages.findIndex((item) => item.id === id);

  if (index === -1) {
    return null;
  }

  messages[index] = {
    ...messages[index],
    status,
    repliedAt: status === "replied" ? new Date().toISOString() : null,
  };

  fs.writeFileSync(dataFile, JSON.stringify(messages, null, 2), "utf8");
  return messages[index];
};
