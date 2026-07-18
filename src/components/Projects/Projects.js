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
import codeEditor3 from "../../Assets/Projects/codeEditor3.png";

// Sorted by production impact (v2 resume, July 2026)
const projects = [
  {
    imgPath: codeEditor3,
    title: "EMC AI Core — Governed Multi-Tenant AI Platform",
    description:
      "Principal Architect (2026–Present). Self-hosted vLLM: Qwen3-32B INT4 AWQ + Qwen3-VL vision + DeepSeek-R1 on GPU spot fleets (EKS Auto Mode, Karpenter, KEDA). AWS Bedrock fallback. Serves 4 verticals (healthcare triage, financial advisor risk, workflow orchestration, data-quality anomaly detection) via single ALB endpoint. Milvus multi-turn RAG, two-tier Valkey caching, Langfuse cost/quality tracking, OTEL→Jaeger tracing, Istio mTLS, Cognito M2M OAuth2, PHI masking, CloudTrail compliance.",
    link: "https://github.com/Shreyasg13",
    isBlog: false,
  },
  {
    imgPath: editor,
    title: "EMC-Auth-Server — Multi-Tenant IdP (Auth0 Replacement)",
    description:
      "Principal Architect (May 2026–Present). Complete multi-tenant Identity Provider in Go/Echo across 8 phases: JWT, SAML 2.0+JIT provisioning, fine-grained RBAC, tenant isolation, MFA, SSO. AI agent security registry with cryptographic agent IDs, role-claim injection, lifecycle tracking & anomaly detection. React/Vite admin UI as single binary. Sub-5ms at 10K concurrent (k6). Distroless Docker. Zero CVEs.",
    link: "https://github.com/Shreyasg13",
    isBlog: false,
  },
  {
    imgPath: chatify,
    title: "PDFfillr.ai — Agentic AI Platform (MCP & A2A)",
    description:
      "Lead Platform Architect (Jan 2024–Present). Production MCP + A2A Protocol connecting Classification, Extraction, Mapping & Validation agents. Multi-cloud Terraform (AWS/GCP/Azure), LangGraph HITL, RHFL+vLLM fine-tuning (90%→97% accuracy), OTel+Prometheus+Grafana, ~50% compute cost cut. SDKs on PyPI & npm. 15 days → 5 minutes. OpenAPI 3.1. Mentored 4 engineers, PR acceptance +30%.",
    link: "https://pdffillr.ai/documentation",
    isBlog: false,
  },
  {
    imgPath: leaf,
    title: "Revi AI — Agentic Intelligence Center & Auth Platform",
    description:
      "Engineering Lead (Sept 2024–Present). LangGraph agent graph with HITL escalation deployed across TRCM Investor Relations, Fitness & Healthcare verticals. 1.2M conversations/month, p95<350ms. RAG cut hallucinations 42%. Multi-tenant Auth0/Okta+Cognito at ≤3ms, zero CVEs. Edge JWT on Cloudflare Workers. 18K webhook events/hr. Monolith→6 microservices (EKS), 2× peak traffic, zero downtime. Led 21 engineers.",
    link: "https://github.com/Shreyasg13",
    isBlog: false,
  },
  {
    imgPath: bitsOfCode,
    title: "Scale AI LLM Engine — Enterprise Platform Contributions",
    description:
      "Direct OSS contribution to Scale AI's production LLM Engine. Enterprise Prometheus metrics (61 tests), priority-based batch scheduler with exponential backoff (24 tests), CPU-only mock executor for zero-GPU CI (19 tests). 85/85 tests · 100% coverage · 50× faster scheduling (5s→0.1s) · 1,617 lines prod code · 37s CI runtime. Python async-first. EKS/Minikube/Docker Compose.",
    link: "https://github.com/Shreyasg13/llm-engine",
    isBlog: false,
  },
  {
    imgPath: algo,
    title: "Multi-Agent Trading System — Consensus AI Architecture",
    description:
      "7 specialized AI agents (Quantitative Strategist, Value Investor, Risk Manager, Global Macro Specialist + 3 more) with proprietary V(n) = α·I(n) - β·C(n) + γ·Q(n) - δ·T(n) consensus formula. 15 securities / 10-year backtest (2016–2025), 2,500+ data points/symbol. 10,000-path Monte Carlo simulation. Flask dashboard with real-time signals. Python · NumPy · Pandas · SciPy.",
    link: "https://github.com/Shreyasg13/multi-agent-trading-system",
    isBlog: false,
  },
  {
    imgPath: blog2,
    title: "Axiom Agentic Platform — Multi-Provider AI Orchestration",
    description:
      "Enterprise AI agent orchestration platform extending Scale AI's Agentex framework. FastAPI + PostgreSQL + Redis backend, Next.js 14 + TypeScript frontend, PowerShell production orchestration layer. Supports OpenAI GPT-4, AWS Bedrock, and Anthropic Claude. Containerized microservices (Docker Compose), 60s cold-start health management, horizontal scalability.",
    link: "https://github.com/Shreyasg13/axiom-agentic-platform",
    isBlog: false,
  },
  {
    imgPath: emotion,
    title: "Sci Discovery Agent — Cloud Infrastructure (Terraform IaC)",
    description:
      "Production-grade AWS IaC for an agentic research platform: EC2 compute, RDS PostgreSQL, S3 artifact storage, IAM least-privilege, VPC networking, S3 remote state + DynamoDB locking. Environment-specific tfvars, PostgreSQL schema versioning, utility scripts for ingestion and experiments. Reproducible, parametrized cloud environments for AI research workloads. Python · HCL · Shell.",
    link: "https://github.com/Shreyasg13/sci-discovery-agent",
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
          Production AI platforms, cloud infrastructure, agentic systems, and distributed systems — sorted by impact.
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
