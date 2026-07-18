import React, { useState, useEffect, useCallback } from "react";
import { Container, Row, Col } from "react-bootstrap";
import Particle from "../Particle";

function AdminConsole() {
  const [password, setPassword] = useState(sessionStorage.getItem("sg-admin-pw") || "");
  const [input, setInput] = useState("");
  const [conversations, setConversations] = useState(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const load = useCallback((pw) => {
    setLoading(true);
    setError("");
    fetch("/.netlify/functions/admin-conversations", {
      headers: { "X-Admin-Password": pw },
    })
      .then(async (res) => {
        const data = await res.json();
        if (!res.ok) throw new Error(data.error || "Failed to load");
        setConversations(data.conversations);
        sessionStorage.setItem("sg-admin-pw", pw);
        setPassword(pw);
      })
      .catch((err) => {
        setError(err.message);
        setConversations(null);
      })
      .finally(() => setLoading(false));
  }, []);

  useEffect(() => {
    if (password) load(password);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (!conversations) {
    return (
      <Container fluid className="about-section" style={{ minHeight: "80vh" }}>
        <Particle />
        <Container style={{ maxWidth: 420, paddingTop: "80px" }}>
          <h2 style={{ color: "white", marginBottom: 20 }}>Admin Console</h2>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              load(input);
            }}
          >
            <input
              type="password"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Admin password"
              className="ask-shreyash-input-row"
              style={{
                width: "100%",
                background: "rgba(255,255,255,0.05)",
                border: "1px solid rgba(199,112,240,0.25)",
                borderRadius: 8,
                padding: "10px 12px",
                color: "white",
                marginBottom: 12,
              }}
            />
            <button type="submit" className="btn btn-primary" disabled={loading}>
              {loading ? "Checking…" : "Unlock"}
            </button>
          </form>
          {error && <p style={{ color: "#ff7043", marginTop: 12 }}>{error}</p>}
        </Container>
      </Container>
    );
  }

  return (
    <Container fluid className="about-section" style={{ minHeight: "80vh" }}>
      <Particle />
      <Container style={{ paddingTop: "80px", paddingBottom: 60 }}>
        <h2 style={{ color: "white", marginBottom: 20 }}>
          Conversation Console <span style={{ color: "#c2c2d2", fontSize: "0.6em" }}>({conversations.length})</span>
        </h2>
        {conversations.length === 0 && (
          <p style={{ color: "#c2c2d2" }}>No conversations yet.</p>
        )}
        <Row>
          {conversations.map((c, i) => (
            <Col md={12} key={i} style={{ marginBottom: 16 }}>
              <div className="timeline-content">
                <div className="timeline-period" style={{ color: "#4fc3f7" }}>
                  {new Date(c.timestamp).toLocaleString()}
                </div>
                <div className="timeline-role" style={{ fontSize: "0.95em", marginTop: 6 }}>
                  Q: {c.question}
                </div>
                <div className="timeline-item-desc" style={{ marginTop: 6 }}>
                  A: {c.answer}
                </div>
              </div>
            </Col>
          ))}
        </Row>
      </Container>
    </Container>
  );
}

export default AdminConsole;
