import { readMessages } from "./_messagesStore.js";

export default function handler(req, res) {
  if (req.method !== "GET") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  try {
    const messages = readMessages().slice().reverse();
    return res.status(200).json({ data: messages });
  } catch (error) {
    return res.status(500).json({ error: "Unable to load messages." });
  }
}
