import React from "react";
import { Col, Row } from "react-bootstrap";
import { DiPython, DiJava, DiReact } from "react-icons/di";
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
  SiOpensearch,
  SiApachespark,
} from "react-icons/si";

const skills = [
  { label: "Python", icon: <DiPython /> },
  { label: "Go / Echo", icon: <SiGo /> },
  { label: "TypeScript", icon: <SiTypescript /> },
  { label: "Java 11", icon: <DiJava /> },
  { label: "Node.js", icon: <SiNodedotjs /> },
  { label: "SQL", icon: <SiMysql /> },
  { label: "AWS", icon: <SiAmazonaws /> },
  { label: "Docker", icon: <SiDocker /> },
  { label: "Kubernetes", icon: <SiKubernetes /> },
  { label: "Terraform", icon: <SiTerraform /> },
  { label: "PostgreSQL", icon: <SiPostgresql /> },
  { label: "Redis", icon: <SiRedis /> },
  { label: "Kafka", icon: <SiApachekafka /> },
  { label: "OpenSearch", icon: <SiOpensearch /> },
  { label: "Prometheus", icon: <SiPrometheus /> },
  { label: "Grafana", icon: <SiGrafana /> },
  { label: "Auth0 / Okta", icon: <SiAuth0 /> },
  { label: "React", icon: <DiReact /> },
];

function Techstack() {
  return (
    <>
      <Row style={{ justifyContent: "center", paddingBottom: "10px" }}>
        <Col md={12} style={{ textAlign: "center", color: "white", paddingBottom: "20px" }}>
          <p style={{ fontSize: "0.95em", color: "#c770f0" }}>
            <b>Languages:</b> Python · Go · TypeScript · Java 11 · Node.js · SQL · Bash &nbsp;|&nbsp;
            <b>Cloud:</b> AWS (EKS, Lambda, S3, DynamoDB, Aurora, KMS, Bedrock, CloudFront) · GCP · Azure &nbsp;|&nbsp;
            <b>Infra:</b> Kubernetes · Terraform · Helm · Docker · Cloudflare Workers &nbsp;|&nbsp;
            <b>AI:</b> MCP · A2A · LangGraph · LangChain · Claude · GPT-4o · Bedrock · vLLM · RAG &nbsp;|&nbsp;
            <b>Identity:</b> Auth0 · Okta · Cognito · JWT · SAML 2.0 · RBAC · MFA · SSO &nbsp;|&nbsp;
            <b>Compliance:</b> SOC-2 · FINRA · SEC 17a-4 · FedRAMP-adjacent
          </p>
        </Col>
      </Row>
      <Row style={{ justifyContent: "center", paddingBottom: "50px" }}>
        {skills.map((s) => (
          <Col key={s.label} xs={4} md={2} className="tech-icons">
            <h4>{s.label}</h4>
            {s.icon}
          </Col>
        ))}
      </Row>
    </>
  );
}

export default Techstack;
