import React, { useState, useEffect, useCallback } from "react";
import { Container, Row, Col } from "react-bootstrap";
import Particle from "../Particle";

function VisitorConsole() {
  const [password, setPassword] = useState(sessionStorage.getItem("sg-admin-pw") || "");
  const [input, setInput] = useState("");
  const [visitors, setVisitors] = useState(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const load = useCallback((pw) => {
    setLoading(true);
    setError("");
    fetch("/.netlify/functions/admin-visitors", {
      headers: { "X-Admin-Password": pw },
    })
      .then(async (res) => {
        const data = await res.json();
        if (!res.ok) throw new Error(data.error || "Failed to load");
        setVisitors(data.visitors);
        sessionStorage.setItem("sg-admin-pw", pw);
        setPassword(pw);
      })
      .catch((err) => {
        setError(err.message);
        setVisitors(null);
      })
      .finally(() => setLoading(false));
  }, []);

  useEffect(() => {
    if (password) load(password);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (!visitors) {
    return (
      <Container fluid className="about-section" style={{ minHeight: "80vh" }}>
        <Particle />
        <Container style={{ maxWidth: 420, paddingTop: "80px" }}>
          <h2 style={{ color: "white", marginBottom: 20 }}>Visitor Console</h2>
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
                border: "1px solid rgba(224, 69, 42,0.25)",
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
          Visitor Console <span style={{ color: "#c2c2d2", fontSize: "0.6em" }}>({visitors.length})</span>
        </h2>
        {visitors.length === 0 && (
          <p style={{ color: "#c2c2d2" }}>No visitors logged yet.</p>
        )}
        <Row>
          {visitors.map((v, i) => (
            <Col md={12} key={i} style={{ marginBottom: 16 }}>
              <div className="timeline-content">
                <div className="timeline-period" style={{ color: "#4fc3f7" }}>
                  {new Date(v.timestamp).toLocaleString()}
                </div>
                <div className="timeline-role" style={{ fontSize: "0.95em", marginTop: 6 }}>
                  {[v.city, v.country].filter(Boolean).join(", ") || "Unknown location"}
                  {v.ip ? ` — ${v.ip}` : ""}
                </div>
                <div className="timeline-item-desc" style={{ marginTop: 6 }}>
                  Page: {v.path || "/"}
                  {v.referrer ? ` · From: ${v.referrer}` : ""}
                </div>
                <div className="timeline-item-desc" style={{ marginTop: 4, fontSize: "0.75em", color: "#8892a6" }}>
                  {v.userAgent || ""}
                </div>
              </div>
            </Col>
          ))}
        </Row>
      </Container>
    </Container>
  );
}

export default VisitorConsole;
