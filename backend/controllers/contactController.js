const fs = require('fs');
const path = require('path');
const crypto = require('crypto');

let eventBus = null;
const setContactEventBus = (bus) => {
  eventBus = bus;
};

const sendMessage = (req, res) => {
  const { email, whatsappPhone, message } = req.body;

  // Validation
  if (!email || !whatsappPhone || !message) {
    return res.status(400).json({
      success: false,
      message: "Please provide email, WhatsApp phone number, and message.",
    });
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    return res.status(400).json({ success: false, message: "Invalid email address." });
  }

  const phoneRegex = /^\+?\d{10,15}$/;
  if (!phoneRegex.test(whatsappPhone)) {
    return res.status(400).json({ success: false, message: "Invalid WhatsApp phone number." });
  }

  if (message.trim().length < 10) {
    return res.status(400).json({
      success: false,
      message: "Message must be at least 10 characters.",
    });
  }

  const contactMessage = {
    id: crypto.randomUUID(),
    email,
    whatsappPhone,
    message,
    status: "new",
    repliedAt: null,
    timestamp: new Date().toISOString(),
  };
  console.log("📩 New contact message:", contactMessage);

  const messagesFile = path.join(__dirname, '../data/messages.json');
  let messages = [];
  if (fs.existsSync(messagesFile)) {
    messages = JSON.parse(fs.readFileSync(messagesFile, 'utf8'));
  }
  messages.push(contactMessage);
  fs.writeFileSync(messagesFile, JSON.stringify(messages, null, 2));

  eventBus?.emit('newMessage', contactMessage);

  res.status(200).json({
    success: true,
    message: "Message received! I'll get back to you soon.",
  });
};

module.exports = { sendMessage, setContactEventBus };