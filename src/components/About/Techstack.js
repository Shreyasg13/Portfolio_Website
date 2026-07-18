import React from "react";
import { Col, Row } from "react-bootstrap";
import {
  DiPython,
  DiJava,
  DiReact,
} from "react-icons/di";
import {
  SiTypescript,
  SiNodedotjs,
  SiGo,
  SiPostgresql,
  SiRedis,
  SiApachekafka,
  SiDocker,
  SiKubernetes,
  SiTerraform,
  SiAmazonaws,
  SiPrometheus,
  SiGrafana,
  SiAuth0,
  SiMysql,
} from "react-icons/si";

function Techstack() {
  return (
    <Row style={{ justifyContent: "center", paddingBottom: "50px" }}>
      <Col xs={4} md={2} className="tech-icons">
        <h4>Python</h4>
        <DiPython />
      </Col>
      <Col xs={4} md={2} className="tech-icons">
        <h4>TypeScript</h4>
        <SiTypescript />
      </Col>
      <Col xs={4} md={2} className="tech-icons">
        <h4>Go</h4>
        <SiGo />
      </Col>
      <Col xs={4} md={2} className="tech-icons">
        <h4>Java</h4>
        <DiJava />
      </Col>
      <Col xs={4} md={2} className="tech-icons">
        <h4>Node.js</h4>
        <SiNodedotjs />
      </Col>
      <Col xs={4} md={2} className="tech-icons">
        <h4>SQL</h4>
        <SiMysql />
      </Col>
      <Col xs={4} md={2} className="tech-icons">
        <h4>AWS</h4>
        <SiAmazonaws />
      </Col>
      <Col xs={4} md={2} className="tech-icons">
        <h4>Docker</h4>
        <SiDocker />
      </Col>
      <Col xs={4} md={2} className="tech-icons">
        <h4>Kubernetes</h4>
        <SiKubernetes />
      </Col>
      <Col xs={4} md={2} className="tech-icons">
        <h4>Terraform</h4>
        <SiTerraform />
      </Col>
      <Col xs={4} md={2} className="tech-icons">
        <h4>PostgreSQL</h4>
        <SiPostgresql />
      </Col>
      <Col xs={4} md={2} className="tech-icons">
        <h4>Redis</h4>
        <SiRedis />
      </Col>
      <Col xs={4} md={2} className="tech-icons">
        <h4>Kafka</h4>
        <SiApachekafka />
      </Col>
      <Col xs={4} md={2} className="tech-icons">
        <h4>Prometheus</h4>
        <SiPrometheus />
      </Col>
      <Col xs={4} md={2} className="tech-icons">
        <h4>Grafana</h4>
        <SiGrafana />
      </Col>
      <Col xs={4} md={2} className="tech-icons">
        <h4>Auth0 / Okta</h4>
        <SiAuth0 />
      </Col>
      <Col xs={4} md={2} className="tech-icons">
        <h4>React</h4>
        <DiReact />
      </Col>
    </Row>
  );
}

export default Techstack;
