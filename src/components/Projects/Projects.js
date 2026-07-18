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
import blog2 from "../../Assets/Projects/blog2.png";

const projects = [
  {
    imgPath: chatify,
    title: "PDFfillr.ai — Agentic AI Platform (MCP & A2A)",
    description:
      "Lead Platform Architect. Production MCP integrations + A2A Protocol connecting Classification, Extraction, Mapping & Validation agents. Multi-cloud Terraform (AWS/GCP/Azure), LangGraph HITL, RHFL fine-tuning (90%→97% field accuracy), OTel+Prometheus+Grafana observability, ~50% compute cost reduction. SDKs on PyPI & npm. 15 days → 5 minutes document processing at 97% accuracy.",
    link: "https://pdffillr.ai/documentation",
    isBlog: false,
  },
  {
    imgPath: editor,
    title: "EMC-Auth-Server — Multi-Tenant Identity Provider (Auth0 Replacement)",
    description:
      "Built from scratch in Go/Echo across 8 phases: JWT, SAML 2.0+JIT provisioning, RBAC, MFA, SSO, and AI agent security registry with cryptographic agent IDs & anomaly detection. React/Vite admin UI as single binary. Sub-5ms token verification at 10K concurrent requests (k6 validated). Distroless Docker. Zero CVEs. Enterprise-grade identity at Auth0 scale.",
    link: "https://github.com/Shreyasg13",
    isBlog: false,
  },
  {
    imgPath: bitsOfCode,
    title: "Scale AI LLM Engine — Enterprise Platform Contributions",
    description:
      "Direct OSS contribution to Scale AI's production LLM Engine: Prometheus metrics integration (61 tests), priority-based batch scheduler with exponential backoff (24 tests), CPU-only mock executor enabling zero-GPU CI (19 tests). 85/85 tests passing · 100% coverage · 50× faster scheduling (5s→0.1s) · 1,617 lines production code. Python async-first architecture. EKS/Minikube/Docker Compose deployment.",
    link: "https://github.com/Shreyasg13/llm-engine",
    isBlog: false,
  },
  {
    imgPath: algo,
    title: "Multi-Agent Trading System — Consensus AI Architecture",
    description:
      "7 specialized AI agents (Quantitative Strategist, Value Investor, Risk Manager, Global Macro Specialist + 3 more) with proprietary V(n) = α·I(n) - β·C(n) + γ·Q(n) - δ·T(n) consensus formula. Backtested 15 securities / 10 years (2016–2025), 2,500+ data points per symbol. Monte Carlo simulation with 10,000 paths. Flask dashboard with real-time signals. Python · NumPy · Pandas · SciPy · Chart.js.",
    link: "https://github.com/Shreyasg13/multi-agent-trading-system",
    isBlog: false,
  },
  {
    imgPath: leaf,
    title: "Axiom Agentic Platform — Enterprise AI Orchestration",
    description:
      "Enterprise-ready multi-provider AI agent orchestration platform extending Scale AI's Agentex framework. FastAPI + PostgreSQL + Redis backend, Next.js 14 + TypeScript frontend, PowerShell production orchestration layer. Supports OpenAI GPT-4, AWS Bedrock, and Anthropic Claude. Containerized microservices via Docker Compose with 60s cold-start health management and horizontal scalability.",
    link: "https://github.com/Shreyasg13/axiom-agentic-platform",
    isBlog: false,
  },
  {
    imgPath: blog2,
    title: "Sci Discovery Agent — Cloud Infrastructure (Terraform IaC)",
    description:
      "Production-grade AWS infrastructure-as-code for an agentic research platform: EC2 compute, RDS PostgreSQL, S3 artifact storage, IAM least-privilege, security groups and VPC networking. Terraform-managed with environment-specific tfvars, PostgreSQL schema versioning, S3 remote state + DynamoDB locking. Python · HCL · Shell. Deploys reproducible, parametrized cloud environments for AI research workloads.",
    link: "https://github.com/Shreyasg13/sci-discovery-agent",
    isBlog: false,
  },
  {
    imgPath: emotion,
    title: "Voice AI Assistant — GPT-3.5 Turbo",
    description:
      "Modular Python voice assistant with OpenAI GPT-3.5 Turbo: keyword-activation speech listener, GPT API integration layer, and object-oriented component architecture (assistant.py, gpt3_api.py, speech.py). YAML-based configuration for API management. Clean separation of NLP, speech processing, and assistant logic. 21 commits · Python 100%.",
    link: "https://github.com/Shreyasg13/Voice-Assistant-with-OpenAI-GPT-3.5-Turbo",
    isBlog: false,
  },
];

function Projects() {
  return (
    <Container fluid className="project-section">
      <Particle />
      <Container>
        <h1 className="project-heading">
          Platform <strong className="purple">Projects</strong>
        </h1>
        <p style={{ color: "white" }}>
          Production-grade systems across Agentic AI, Cloud Infrastructure, Auth & Identity, and Distributed Systems — sorted by impact.
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
