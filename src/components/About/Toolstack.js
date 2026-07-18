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
  SiOpentelemetry,
} from "react-icons/si";

const tools = [
  { label: "VS Code", icon: <SiVisualstudiocode /> },
  { label: "Docker", icon: <SiDocker /> },
  { label: "Kubernetes", icon: <SiKubernetes /> },
  { label: "Terraform", icon: <SiTerraform /> },
  { label: "GitHub Actions", icon: <SiGithubactions /> },
  { label: "Jenkins", icon: <SiJenkins /> },
  { label: "OpenTelemetry", icon: <SiOpentelemetry /> },
  { label: "Prometheus", icon: <SiPrometheus /> },
  { label: "Grafana", icon: <SiGrafana /> },
  { label: "Datadog", icon: <SiDatadog /> },
  { label: "Linux", icon: <SiLinux /> },
  { label: "Postman", icon: <SiPostman /> },
];

function Toolstack() {
  return (
    <Row style={{ justifyContent: "center", paddingBottom: "50px" }}>
      {tools.map((t) => (
        <Col key={t.label} xs={4} md={2} className="tech-icons">
          <h4>{t.label}</h4>
          {t.icon}
        </Col>
      ))}
    </Row>
  );
}

export default Toolstack;
