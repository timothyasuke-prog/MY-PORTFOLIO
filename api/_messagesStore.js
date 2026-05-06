import fs from "fs";
import path from "path";
import crypto from "crypto";

const dataDir = path.join(process.cwd(), "backend", "data");
const dataFile = path.join(dataDir, "messages.json");

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
    return Array.isArray(parsed) ? parsed : [];
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
    timestamp: new Date().toISOString(),
  };
};

export const appendMessage = (newMessage) => {
  const messages = readMessages();
  messages.push(newMessage);
  fs.writeFileSync(dataFile, JSON.stringify(messages, null, 2), "utf8");
  return newMessage;
};
