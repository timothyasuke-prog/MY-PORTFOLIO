import React, { useState, useEffect } from 'react';
import './index.css';

const API_BASE = process.env.NODE_ENV === "production" ? "/api" : "http://localhost:5000/api";

function App() {
  const [visitCount, setVisitCount] = useState(0);
  const [messages, setMessages] = useState([]);
  const [isConnected, setIsConnected] = useState(false);

  useEffect(() => {
    fetchInitialData();
  }, []);

  const fetchInitialData = async () => {
    try {
      console.log('Testing backend connection...');
      // Test health endpoint first
      const healthResponse = await fetch(`${API_BASE}/health`);
      console.log('Health response:', healthResponse);

      // Fetch visit count
      const visitResponse = await fetch(`${API_BASE}/visit-count`);
      const visitData = await visitResponse.json();
      console.log('Visit data:', visitData);
      setVisitCount(visitData.count);

      // Fetch messages
      const messagesResponse = await fetch(`${API_BASE}/messages`);
      const messagesData = await messagesResponse.json();
      console.log('Messages data:', messagesData);
      setMessages(messagesData.reverse()); // Show newest first
    } catch (error) {
      console.error('Error fetching initial data:', error);
    }
  };

  return (
    <div className="app">
      <header className="header">
        <h1>Portfolio Admin Dashboard</h1>
        <p>Real-time monitoring and message management</p>
        <div style={{ marginTop: '1rem', fontSize: '0.9rem', color: isConnected ? 'var(--success)' : 'var(--error)' }}>
          {isConnected ? '🟢 Connected' : '🔴 Disconnected'}
        </div>
      </header>

      <main className="dashboard">
        <div className="stats-grid">
          <div className="stat-card">
            <div className="stat-number">{visitCount}</div>
            <div className="stat-label">Total Visits</div>
          </div>

          <div className="stat-card">
            <div className="stat-number">{messages.length}</div>
            <div className="stat-label">Total Messages</div>
          </div>
        </div>

        <div className="messages-section">
          <h2>📬 Message Inbox</h2>
          <div className="message-list">
            {messages.length === 0 ? (
              <div className="message-item">
                <p style={{ textAlign: 'center', color: 'var(--text-secondary)' }}>
                  No messages yet. Messages from the contact form will appear here in real-time.
                </p>
              </div>
            ) : (
              messages.map((message, index) => (
                <div key={message.id || index} className="message-item">
                  <div className="message-header">
                    <div className="message-contact">{message.name}</div>
                    <div className="message-time">{new Date(message.timestamp).toLocaleString()}</div>
                  </div>
                  <div className="message-content">{message.message}</div>
                  <div className="message-meta">
                    <span>📧 {message.email}</span>
                    {message.phone && <span>📱 {message.phone}</span>}
                    {message.whatsapp && <span>💬 {message.whatsapp}</span>}
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </main>
    </div>
  );
}

export default App;