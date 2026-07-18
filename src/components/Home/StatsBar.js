import React from "react";
import { Container, Row, Col } from "react-bootstrap";

const stats = [
  { value: "5+", label: "Years Experience" },
  { value: "3,000+", label: "Commits" },
  { value: "700+", label: "Pull Requests" },
  { value: "10+", label: "Production Repos" },
  { value: "1.2M", label: "Conv / Month" },
  { value: "0", label: "CVEs" },
];

function StatsBar() {
  return (
    <Container fluid className="stats-bar-section">
      <Container>
        <Row className="stats-bar-row">
          {stats.map((s, i) => (
            <Col key={i} xs={6} md={2} className="stats-bar-item">
              <div className="stats-value">{s.value}</div>
              <div className="stats-label">{s.label}</div>
            </Col>
          ))}
        </Row>
      </Container>
    </Container>
  );
}

export default StatsBar;
