import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import ProjectCard from "./ProjectCards";
import Particle from "../Particle";
import algo from "../../Assets/Projects/algo.png";
import editor from "../../Assets/Projects/codeEditor.png";
import chatify from "../../Assets/Projects/chatify.png";
import leaf from "../../Assets/Projects/leaf.png";
import bitsOfCode from "../../Assets/Projects/blog.png";
import emotion from "../../Assets/Projects/emotion.jpeg";

const projects = [
  {
    imgPath: chatify,
    title: "PDFfillr.ai — Agentic AI Platform (MCP & A2A)",
    description:
      "Lead Platform Architect. Production MCP integrations + A2A Protocol connecting Classification, Extraction, Mapping & Validation agents. Multi-cloud Terraform (AWS/GCP/Azure), LangGraph HITL, RHFL fine-tuning (90%→97% accuracy), OTel+Prometheus+Grafana, ~50% compute cost cut. SDKs on PyPI & npm. 15 days → 5 minutes document processing.",
    link: "https://pdffillr.ai/documentation",
    isBlog: false,
  },
  {
    imgPath: editor,
    title: "EMC-Auth-Server — Multi-Tenant IdP (Auth0 Replacement)",
    description:
      "Built from scratch in Go/Echo across 8 phases: JWT, SAML 2.0+JIT provisioning, RBAC, MFA, SSO, AI agent security registry with cryptographic agent IDs & anomaly detection. React/Vite admin UI (single binary). Sub-5ms token verification at 10K concurrent requests via k6 load tests. Distroless Docker. Zero CVEs across full security review.",
    link: "https://github.com/Shreyasg13",
    isBlog: false,
  },
  {
    imgPath: bitsOfCode,
    title: "Scale AI LLM Engine — Platform Infrastructure (OSS)",
    description:
      "Direct contribution to Scale AI's production LLM Engine: enterprise Prometheus metrics, priority-based batch scheduler with exponential backoff, mock executor enabling CPU-only CI (zero GPU cost), local-to-cloud portable deployment. 50× faster scheduling (5s→0.1s). 100% test coverage, 85 tests, 37s CI runtime.",
    link: "https://github.com/Shreyasg13",
    isBlog: false,
  },
  {
    imgPath: algo,
    title: "Revi AI — Agentic Intelligence Center & Campaign Platform",
    description:
      "LangGraph agent graph with HITL escalation, confidence-threshold routing, streaming AI response — deployed across TRCM Investor Relations, Fitness & Healthcare verticals. SQS fan-out SMS+email broadcast at 18K events/hr. Auth0/Okta+Cognito at ≤3ms token latency. Monolith→6 microservices (EKS). Led team of 21 engineers. 1.2M GPT-4 conversations/month at p95<350ms.",
    link: "https://github.com/Shreyasg13",
    isBlog: false,
  },
  {
    imgPath: leaf,
    title: "Multi-Agent Trading System — Consensus AI Architecture",
    description:
      "7 specialized AI agents with consensus-based signal aggregation and multi-model orchestration (Claude, GPT-4o, Bedrock). Backtested 15 symbols / 10 years. Monte Carlo simulation with 10,000 paths for risk quantification. Demonstrates scalable multi-agent platform architecture with confidence-weighted decision fusion.",
    link: "https://github.com/Shreyasg13",
    isBlog: false,
  },
  {
    imgPath: emotion,
    title: "Open-DLA — ML Evaluation Platform (NYU Research)",
    description:
      "Unified ML benchmarking framework (Factory Method pattern) for pluggable multi-model evaluation. Open-sourced with integration tests, versioned releases, and full documentation. Supports reproducible evaluation harnesses across model families — the developer experience layer for ML platform engineering at NYU.",
    link: "https://github.com/Shreyasg13",
    isBlog: false,
  },
];

function Projects() {
  return (
    <Container fluid className="project-section">
      <Particle />
      <Container>
        <h1 className="project-heading">
          Platform <strong className="purple">Projects </strong>
        </h1>
        <p style={{ color: "white" }}>
          Production-grade systems across Agentic AI, Cloud Infrastructure, Auth & Identity, and Distributed Systems.
        </p>
        <Row style={{ justifyContent: "center", paddingBottom: "10px" }}>
          {projects.map((p) => (
            <Col key={p.title} md={4} className="project-card">
              <ProjectCard
                imgPath={p.imgPath}
                isBlog={p.isBlog}
                title={p.title}
                description={p.description}
                link={p.link}
              />
            </Col>
          ))}
        </Row>
      </Container>
    </Container>
  );
}

export default Projects;
