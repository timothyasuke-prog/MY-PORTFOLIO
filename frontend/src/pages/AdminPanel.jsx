import { useEffect, useMemo, useState } from "react";
import { io } from "socket.io-client";
import { fetchContactMessages, updateContactMessageStatus } from "../api";

const POLL_INTERVAL_MS = 8000;
const ADMIN_KEY_STORAGE = "portfolio_admin_key";
const REALTIME_URL = import.meta.env.VITE_REALTIME_URL;

const formatWaNumber = (value = "") => value.replace(/[^\d]/g, "");

export default function AdminPanel() {
  const [messages, setMessages] = useState([]);
  const [selectedId, setSelectedId] = useState(null);
  const [status, setStatus] = useState("Loading inbox...");
  const [adminKeyInput, setAdminKeyInput] = useState("");
  const [adminKey, setAdminKey] = useState(() => localStorage.getItem(ADMIN_KEY_STORAGE) || "");
  const [isRealtimeConnected, setIsRealtimeConnected] = useState(false);

  const selectedMessage = useMemo(
    () => messages.find((item) => item.id === selectedId) || messages[0] || null,
    [messages, selectedId]
  );

  const loadMessages = async (isBackground = false) => {
    try {
      const response = await fetchContactMessages(adminKey);
      const nextMessages = Array.isArray(response.data?.data) ? response.data.data : [];
      setMessages(nextMessages);
      if (!selectedId && nextMessages.length > 0) {
        setSelectedId(nextMessages[0].id);
      }
      if (!isBackground) {
        setStatus(`Inbox updated (${nextMessages.length} messages)`);
      }
    } catch (error) {
      if (!isBackground) {
        const unauthorized = error?.response?.status === 401;
        setStatus(unauthorized ? "Admin key required or invalid." : "Unable to load inbox right now.");
      }
    }
  };

  useEffect(() => {
    if (!adminKey) {
      return;
    }
    loadMessages();
    const timer = setInterval(() => loadMessages(true), POLL_INTERVAL_MS);
    return () => clearInterval(timer);
  }, [adminKey]);

  useEffect(() => {
    if (!REALTIME_URL || !adminKey) {
      return;
    }

    const socket = io(REALTIME_URL, { transports: ["websocket", "polling"] });
    socket.on("connect", () => setIsRealtimeConnected(true));
    socket.on("disconnect", () => setIsRealtimeConnected(false));
    socket.on("newMessage", () => loadMessages(true));
    socket.on("messageUpdated", () => loadMessages(true));

    return () => {
      socket.close();
      setIsRealtimeConnected(false);
    };
  }, [adminKey]);

  const saveAdminKey = () => {
    const clean = adminKeyInput.trim();
    setAdminKey(clean);
    localStorage.setItem(ADMIN_KEY_STORAGE, clean);
    setStatus("Admin key saved.");
  };

  const markMessageStatus = async (nextStatus) => {
    if (!selectedMessage?.id) {
      return;
    }

    try {
      await updateContactMessageStatus(selectedMessage.id, nextStatus, adminKey);
      setStatus(`Message marked as ${nextStatus}.`);
      await loadMessages(true);
    } catch (error) {
      setStatus("Failed to update message status.");
    }
  };

  const mailtoHref = selectedMessage
    ? `mailto:${selectedMessage.email}?subject=${encodeURIComponent("Reply to your message")}&body=${encodeURIComponent(
        `Hi,\n\nThanks for contacting me about:\n"${selectedMessage.message}"\n\n`
      )}`
    : "#";

  const whatsappHref = selectedMessage
    ? `https://wa.me/${formatWaNumber(selectedMessage.whatsappPhone)}?text=${encodeURIComponent(
        `Hi! Thanks for your message:\n"${selectedMessage.message}"\n\n`
      )}`
    : "#";

  return (
    <div style={{ maxWidth: 1100, margin: "0 auto", padding: "2rem 1rem 4rem" }}>
      <h1 style={{ marginBottom: "0.5rem" }}>Admin Inbox</h1>
      <p style={{ marginTop: 0, color: "var(--muted)" }}>
        Live contact messages from your portfolio form. Push updates use Socket.IO when configured.
      </p>

      <div style={{ margin: "1rem 0 1.5rem", color: "var(--muted)" }}>{status}</div>
      <div style={{ marginBottom: "1.5rem", display: "flex", gap: "0.6rem", alignItems: "center", flexWrap: "wrap" }}>
        <input
          type="password"
          value={adminKeyInput}
          onChange={(event) => setAdminKeyInput(event.target.value)}
          placeholder="Admin API key"
          style={{
            padding: "0.6rem 0.75rem",
            borderRadius: 8,
            border: "1px solid var(--border)",
            background: "var(--bg2)",
            color: "var(--text)",
            minWidth: 260,
          }}
        />
        <button
          onClick={saveAdminKey}
          style={{
            padding: "0.6rem 0.75rem",
            borderRadius: 8,
            border: "1px solid var(--border)",
            background: "var(--accent)",
            color: "#0b0d11",
            cursor: "pointer",
            fontWeight: 600,
          }}
        >
          Save Key
        </button>
        <span style={{ color: "var(--muted)", fontSize: "0.9rem" }}>
          {REALTIME_URL ? (isRealtimeConnected ? "Live: connected" : "Live: disconnected") : `Polling every ${POLL_INTERVAL_MS / 1000}s`}
        </span>
      </div>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "1.1fr 1fr",
          gap: "1rem",
        }}
      >
        <section style={{ border: "1px solid var(--border)", borderRadius: 12, padding: "1rem" }}>
          <h2 style={{ marginTop: 0 }}>Messages ({messages.length})</h2>
          {messages.length === 0 && <p style={{ color: "var(--muted)" }}>No messages yet.</p>}
          <div style={{ display: "grid", gap: "0.75rem", maxHeight: 520, overflowY: "auto" }}>
            {messages.map((msg) => {
              const isSelected = selectedMessage?.id === msg.id;
              return (
                <button
                  key={msg.id || `${msg.email}-${msg.timestamp}`}
                  onClick={() => setSelectedId(msg.id)}
                  style={{
                    textAlign: "left",
                    border: isSelected ? "1px solid var(--accent)" : "1px solid var(--border)",
                    background: isSelected ? "rgba(124,106,255,0.12)" : "var(--bg2)",
                    color: "var(--text)",
                    borderRadius: 10,
                    padding: "0.8rem",
                    cursor: "pointer",
                  }}
                >
                  <div style={{ fontWeight: 600 }}>{msg.email}</div>
                  <div style={{ color: "var(--muted)", fontSize: "0.9rem" }}>
                    {new Date(msg.timestamp).toLocaleString()}
                  </div>
                  <div style={{ marginTop: "0.3rem" }}>
                    {msg.message.length > 80 ? `${msg.message.slice(0, 80)}...` : msg.message}
                  </div>
                </button>
              );
            })}
          </div>
        </section>

        <section style={{ border: "1px solid var(--border)", borderRadius: 12, padding: "1rem" }}>
          <h2 style={{ marginTop: 0 }}>Selected Message</h2>
          {!selectedMessage ? (
            <p style={{ color: "var(--muted)" }}>Select a message to see details.</p>
          ) : (
            <>
              <p>
                <strong>Email:</strong> {selectedMessage.email}
              </p>
              <p>
                <strong>WhatsApp:</strong> {selectedMessage.whatsappPhone}
              </p>
              <p>
                <strong>Sent:</strong> {new Date(selectedMessage.timestamp).toLocaleString()}
              </p>
              <p>
                <strong>Status:</strong> {selectedMessage.status || "new"}
              </p>
              <p style={{ marginTop: "1rem", whiteSpace: "pre-wrap" }}>{selectedMessage.message}</p>
              <div style={{ display: "flex", gap: "0.6rem", marginTop: "1rem" }}>
                <button
                  onClick={() => markMessageStatus("replied")}
                  style={{
                    background: "#16a34a",
                    color: "#ecfdf3",
                    padding: "0.55rem 0.75rem",
                    borderRadius: 8,
                    fontWeight: 600,
                    border: "none",
                    cursor: "pointer",
                  }}
                >
                  Mark Replied
                </button>
                <button
                  onClick={() => markMessageStatus("new")}
                  style={{
                    background: "#334155",
                    color: "#e2e8f0",
                    padding: "0.55rem 0.75rem",
                    borderRadius: 8,
                    fontWeight: 600,
                    border: "none",
                    cursor: "pointer",
                  }}
                >
                  Mark New
                </button>
                <a
                  href={whatsappHref}
                  target="_blank"
                  rel="noreferrer"
                  style={{
                    background: "#25D366",
                    color: "#08110c",
                    padding: "0.55rem 0.75rem",
                    borderRadius: 8,
                    fontWeight: 600,
                    textDecoration: "none",
                  }}
                >
                  Reply on WhatsApp
                </a>
                <a
                  href={mailtoHref}
                  style={{
                    background: "var(--accent)",
                    color: "#0b0d11",
                    padding: "0.55rem 0.75rem",
                    borderRadius: 8,
                    fontWeight: 600,
                    textDecoration: "none",
                  }}
                >
                  Reply by Email
                </a>
              </div>
            </>
          )}
        </section>
      </div>
    </div>
  );
}
