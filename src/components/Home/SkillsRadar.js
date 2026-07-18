import React from "react";
import { Container, Row, Col } from "react-bootstrap";

const domains = [
  { label: "Agentic AI & LLM Inference", value: 95, color: "#c770f0" },
  { label: "Cloud & Infrastructure", value: 92, color: "#4fc3f7" },
  { label: "Auth & Identity", value: 90, color: "#ff7043" },
  { label: "Distributed Systems", value: 88, color: "#66bb6a" },
];

const SIZE = 280;
const CENTER = SIZE / 2;
const RADIUS = 100;
const RINGS = [0.25, 0.5, 0.75, 1];

function pointOnAxis(index, total, fraction) {
  const angle = -Math.PI / 2 + (index * 2 * Math.PI) / total;
  return {
    x: CENTER + Math.cos(angle) * RADIUS * fraction,
    y: CENTER + Math.sin(angle) * RADIUS * fraction,
  };
}

function ringPath(total, fraction) {
  return Array.from({ length: total }, (_, i) => {
    const p = pointOnAxis(i, total, fraction);
    return `${p.x},${p.y}`;
  }).join(" ");
}

function SkillsRadar() {
  const total = domains.length;
  const dataPoints = domains
    .map((d, i) => {
      const p = pointOnAxis(i, total, d.value / 100);
      return `${p.x},${p.y}`;
    })
    .join(" ");

  return (
    <Container fluid className="skills-radar-section">
      <Container>
        <Row className="align-items-center" style={{ justifyContent: "center" }}>
          <Col md={6} style={{ textAlign: "center" }}>
            <svg viewBox={`0 0 ${SIZE} ${SIZE}`} className="radar-svg">
              {RINGS.map((r) => (
                <polygon
                  key={r}
                  points={ringPath(total, r)}
                  className="radar-ring"
                />
              ))}
              {domains.map((_, i) => {
                const p = pointOnAxis(i, total, 1);
                return (
                  <line
                    key={i}
                    x1={CENTER}
                    y1={CENTER}
                    x2={p.x}
                    y2={p.y}
                    className="radar-axis"
                  />
                );
              })}
              <polygon points={dataPoints} className="radar-area" />
              {domains.map((d, i) => {
                const p = pointOnAxis(i, total, d.value / 100);
                return (
                  <circle key={i} cx={p.x} cy={p.y} r="4" fill={d.color} />
                );
              })}
            </svg>
          </Col>
          <Col md={6}>
            <h1 className="project-heading" style={{ marginBottom: "34px" }}>
              Candidate <strong className="purple">Analytics</strong>
            </h1>
            <div className="radar-legend">
              {domains.map((d) => (
                <div key={d.label} className="radar-legend-item">
                  <span className="radar-legend-dot" style={{ background: d.color }} />
                  <span className="radar-legend-label">{d.label}</span>
                  <span className="radar-legend-value" style={{ color: d.color }}>
                    {d.value}
                  </span>
                </div>
              ))}
            </div>
          </Col>
        </Row>
      </Container>
    </Container>
  );
}

export default SkillsRadar;
