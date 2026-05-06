import { appendMessage, createMessage } from "./_messagesStore.js";

export default function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ success: false, message: "Method not allowed" });
  }

  try {
    const newMessage = createMessage(req.body || {});
    if (newMessage.error) {
      return res.status(400).json({ success: false, message: newMessage.error });
    }

    appendMessage(newMessage);
    return res.status(200).json({
      success: true,
      message: "Message received! I'll get back to you soon.",
      data: newMessage,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Unable to save message at the moment.",
    });
  }
}
