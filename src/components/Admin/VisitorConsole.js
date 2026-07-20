import React, { useState, useEffect, useCallback, useMemo } from "react";
import { Container, Row, Col } from "react-bootstrap";
import Particle from "../Particle";

const DAY_WINDOW = 14;
const TOP_N = 5;

function dateKey(iso) {
  return iso ? iso.slice(0, 10) : null;
}

function last14Days() {
  const days = [];
  for (let i = DAY_WINDOW - 1; i >= 0; i -= 1) {
    const d = new Date();
    d.setDate(d.getDate() - i);
    days.push(d.toISOString().slice(0, 10));
  }
  return days;
}

function topCounts(visitors, keyFn, limit = TOP_N) {
  const counts = new Map();
  visitors.forEach((v) => {
    const key = keyFn(v);
    if (!key) return;
    counts.set(key, (counts.get(key) || 0) + 1);
  });
  return [...counts.entries()]
    .sort((a, b) => b[1] - a[1])
    .slice(0, limit)
    .map(([label, value]) => ({ label, value }));
}

function referrerLabel(v) {
  if (!v.referrer) return null;
  try {
    const host = new URL(v.referrer).hostname.replace(/^www\./, "");
    return host || "Direct";
  } catch {
    return "Direct";
  }
}

function StatTile({ label, value }) {
  return (
    <div className="vc-stat">
      <div className="vc-stat-value">{value}</div>
      <div className="vc-stat-label">{label}</div>
    </div>
  );
}

function DayChart({ visitors }) {
  const days = useMemo(() => last14Days(), []);
  const counts = useMemo(() => {
    const byDay = new Map(days.map((d) => [d, 0]));
    visitors.forEach((v) => {
      const key = dateKey(v.timestamp);
      if (byDay.has(key)) byDay.set(key, byDay.get(key) + 1);
    });
    return days.map((d) => byDay.get(d));
  }, [visitors, days]);
  const max = Math.max(1, ...counts);

  return (
    <div className="vc-chart" role="img" aria-label={`Visits over the last ${DAY_WINDOW} days`}>
      {days.map((d, i) => {
        const count = counts[i];
        const isLast = i === days.length - 1;
        const isMax = count === max && count > 0;
        const label = new Date(d + "T00:00:00").toLocaleDateString(undefined, {
          month: "short",
          day: "numeric",
        });
        return (
          <div className="vc-col-wrap" key={d} title={`${label}: ${count} visit${count === 1 ? "" : "s"}`}>
            {(isLast || isMax) && count > 0 && <span className="vc-col-value">{count}</span>}
            <div
              className="vc-col"
              style={{ height: `${Math.max(3, (count / max) * 100)}%` }}
            />
            <span className="vc-col-label">{i % 3 === 0 || isLast ? label : ""}</span>
          </div>
        );
      })}
    </div>
  );
}

function BarList({ items }) {
  const max = Math.max(1, ...items.map((i) => i.value));
  if (!items.length) return <p className="vc-empty">Not enough data yet.</p>;
  return (
    <div className="vc-barlist">
      {items.map((item) => (
        <div className="vc-bar-row" key={item.label}>
          <span className="vc-bar-label" title={item.label}>{item.label}</span>
          <span className="vc-bar-track">
            <span className="vc-bar-fill" style={{ width: `${(item.value / max) * 100}%` }} />
          </span>
          <span className="vc-bar-value">{item.value}</span>
        </div>
      ))}
    </div>
  );
}

function VisitorConsole() {
  const [password, setPassword] = useState(sessionStorage.getItem("sg-admin-pw") || "");
  const [input, setInput] = useState("");
  const [visitors, setVisitors] = useState(null);
  const [totalCount, setTotalCount] = useState(null);
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

  useEffect(() => {
    fetch("/.netlify/functions/visitor-count")
      .then((res) => (res.ok ? res.json() : null))
      .then((data) => data && setTotalCount(data.count))
      .catch(() => {});
  }, []);

  const stats = useMemo(() => {
    if (!visitors) return null;
    const today = new Date().toISOString().slice(0, 10);
    const visitsToday = visitors.filter((v) => dateKey(v.timestamp) === today).length;
    const countries = new Set(visitors.map((v) => v.country).filter(Boolean));
    return { visitsToday, countryCount: countries.size };
  }, [visitors]);

  const topPages = useMemo(
    () => (visitors ? topCounts(visitors, (v) => v.path || "/") : []),
    [visitors]
  );
  const topReferrers = useMemo(
    () => (visitors ? topCounts(visitors, referrerLabel) : []),
    [visitors]
  );
  const topCountries = useMemo(
    () => (visitors ? topCounts(visitors, (v) => v.country) : []),
    [visitors]
  );

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
        <h2 style={{ color: "white", marginBottom: 20 }}>Visitor Dashboard</h2>

        <div className="vc-stats">
          <StatTile label="Total visitors (all-time)" value={totalCount === null ? "—" : totalCount.toLocaleString()} />
          <StatTile label="Visits today" value={stats.visitsToday} />
          <StatTile label="Logged visits (last 500)" value={visitors.length} />
          <StatTile label="Countries reached" value={stats.countryCount} />
        </div>

        <div className="vc-section">
          <h3 className="vc-section-title">Visits — last {DAY_WINDOW} days</h3>
          <DayChart visitors={visitors} />
        </div>

        <Row>
          <Col md={4} className="vc-section">
            <h3 className="vc-section-title">Top pages</h3>
            <BarList items={topPages} />
          </Col>
          <Col md={4} className="vc-section">
            <h3 className="vc-section-title">Top referrers</h3>
            <BarList items={topReferrers} />
          </Col>
          <Col md={4} className="vc-section">
            <h3 className="vc-section-title">Top countries</h3>
            <BarList items={topCountries} />
          </Col>
        </Row>

        <div className="vc-section">
          <h3 className="vc-section-title">
            Recent visitors <span style={{ color: "#c2c2d2", fontSize: "0.7em" }}>({visitors.length})</span>
          </h3>
          {visitors.length === 0 && <p className="vc-empty">No visitors logged yet.</p>}
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
        </div>
      </Container>
    </Container>
  );
}

export default VisitorConsole;
