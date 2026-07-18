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

function Projects() {
  return (
    <Container fluid className="project-section">
      <Particle />
      <Container>
        <h1 className="project-heading">
          My Recent <strong className="purple">Works </strong>
        </h1>
        <p style={{ color: "white" }}>
          Here are a few projects I've worked on recently.
        </p>
        <Row style={{ justifyContent: "center", paddingBottom: "10px" }}>
          <Col md={4} className="project-card">
            <ProjectCard
              imgPath={chatify}
              isBlog={false}
              title="PDFfillr.ai — MCP & A2A Platform"
              description="Lead Platform Architect: Designed and deployed production MCP integrations and A2A communication layer connecting Classification, Extraction, Mapping, and Validation agents. Multi-cloud Terraform (AWS/GCP/Azure), RHFL fine-tuning loop (90% → 97% field accuracy), OTel + Prometheus observability, ~50% compute cost reduction. SDKs published to PyPI and npm."
              link="https://pdffillr.ai/documentation"
            />
          </Col>

          <Col md={4} className="project-card">
            <ProjectCard
              imgPath={editor}
              isBlog={false}
              title="EMC-Auth-Server — Multi-Tenant IdP (Auth0 Replacement)"
              description="Built a complete multi-tenant Identity Provider from scratch in Go/Echo across 8 phases: JWT, SAML 2.0 with JIT provisioning, RBAC, MFA, SSO, and an AI agent security registry with cryptographic agent IDs and anomaly detection. Sub-5ms token verification at 10K concurrent requests. Zero CVEs. Distroless Docker, k6 load testing."
            />
          </Col>

          <Col md={4} className="project-card">
            <ProjectCard
              imgPath={bitsOfCode}
              isBlog={false}
              title="Scale AI LLM Engine — Platform Infrastructure"
              description="Directly extended Scale AI's production LLM Engine: enterprise Prometheus metrics integration, priority-based batch job scheduler with exponential backoff retry, mock executor enabling CPU-only testing (zero GPU cost), and local-to-cloud portable deployment. 50× faster scheduling (5s → 0.1s); 100% test coverage, 85 tests, 37s CI runtime."
              link="https://github.com/Shreyasg13"
            />
          </Col>

          <Col md={4} className="project-card">
            <ProjectCard
              imgPath={algo}
              isBlog={false}
              title="Revi AI — Agentic Intelligence Center"
              description="Standalone LangGraph agent graph with Human-in-the-Loop (HITL) escalation, confidence-threshold routing, per-conversation context, streaming AI response — deployed across TRCM Investor Relations, Fitness & GYM lead management, and Healthcare Portal. SQS fan-out engine for SMS + email broadcast at scale (18K events/hr). Auth0/Okta + Cognito identity platform at ≤3ms token latency."
            />
          </Col>

          <Col md={4} className="project-card">
            <ProjectCard
              imgPath={leaf}
              isBlog={false}
              title="Multi-Agent Trading System"
              description="7 specialized AI agents with consensus-based signal aggregation and multi-model orchestration. Backtested 15 symbols / 10 years with Monte Carlo simulation (10,000 paths). Demonstrates multi-agent platform architecture with confidence-weighted decision fusion and real-time risk management."
              link="https://github.com/Shreyasg13"
            />
          </Col>

          <Col md={4} className="project-card">
            <ProjectCard
              imgPath={emotion}
              isBlog={false}
              title="Open-DLA — ML Evaluation Platform (NYU)"
              description="Unified ML benchmarking framework using Factory Method pattern for pluggable model evaluation. Open-sourced with integration tests, versioned releases, and full documentation. Supports multi-model evaluation harnesses with reproducible benchmarking — the developer experience layer for ML platform engineering at NYU."
              link="https://github.com/Shreyasg13"
            />
          </Col>
        </Row>
      </Container>
    </Container>
  );
}

export default Projects;
