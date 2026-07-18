import React from "react";
import { Col, Row } from "react-bootstrap";
import {
  SiVisualstudiocode,
  SiDocker,
  SiKubernetes,
  SiTerraform,
  SiGithubactions,
  SiJenkins,
  SiGrafana,
  SiPrometheus,
  SiDatadog,
  SiLinux,
  SiPostman,
} from "react-icons/si";

function Toolstack() {
  return (
    <Row style={{ justifyContent: "center", paddingBottom: "50px" }}>
      <Col xs={4} md={2} className="tech-icons">
        <h4>VS Code</h4>
        <SiVisualstudiocode />
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
        <h4>GitHub Actions</h4>
        <SiGithubactions />
      </Col>
      <Col xs={4} md={2} className="tech-icons">
        <h4>Jenkins</h4>
        <SiJenkins />
      </Col>
      <Col xs={4} md={2} className="tech-icons">
        <h4>Grafana</h4>
        <SiGrafana />
      </Col>
      <Col xs={4} md={2} className="tech-icons">
        <h4>Prometheus</h4>
        <SiPrometheus />
      </Col>
      <Col xs={4} md={2} className="tech-icons">
        <h4>Datadog</h4>
        <SiDatadog />
      </Col>
      <Col xs={4} md={2} className="tech-icons">
        <h4>Linux</h4>
        <SiLinux />
      </Col>
      <Col xs={4} md={2} className="tech-icons">
        <h4>Postman</h4>
        <SiPostman />
      </Col>
    </Row>
  );
}

export default Toolstack;
