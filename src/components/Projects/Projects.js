import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import ProjectCard from "./ProjectCards";
import Reveal from "../Reveal";
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
    title: "AI Platform — Inference & GPU Autoscaling",
    description:
      "Architecture and design input on EngineersMind's internal AI platform (2026): vLLM model serving, GPU node autoscaling with Karpenter and KEDA on EKS, FP8 and INT4 AWQ quantization trade-offs, Milvus retrieval, and a console with live request progress and time-to-first-token tracking.",
    link: "https://github.com/Shreyasg13",
    isBlog: false,
  },
  {
    imgPath: editor,
    title: "Multi-Tenant IdP (Auth0 Replacement)",
    description:
      "Lead engineer (May–Aug 2026). Standalone multi-tenant identity provider in Go/Echo replacing Auth0: authentication engine, SAML SSO, admin interface and API, RBAC, and the production AWS deployment pipeline. AI agent security phase: agent registration, machine-to-machine auth, per-agent audit tracking and a risk-analysis endpoint.",
    link: "https://github.com/Shreyasg13",
    isBlog: false,
  },
  {
    imgPath: chatify,
    title: "PDFfillr.ai — Agentic AI Platform (MCP & A2A)",
    description:
      "Backend engineer (Oct 2025–Jul 2026). Backend services for an AI-driven PDF automation product: cloud storage, OAuth token handling, the pdf-autofillr Python SDK, a Claude-based in-app assistant, Docker/GPU deployment for local LLMs (Llama, Mistral), LangChain workflows and Langfuse tracing.",
    link: "https://pdffillr.ai/documentation",
    isBlog: false,
  },
  {
    imgPath: leaf,
    title: "Revi AI — Agentic Intelligence Center & Auth Platform",
    description:
      "Sep 2024–Sep 2026, the longest-running project (1,200+ commits). AI-driven client-communication automation built from the ground up: automated reply pipelines, EventBridge sync, real-time notifications, a Faiss knowledge-base agent, SageMaker workloads, a multi-agent evaluation framework, and Stripe subscriptions.",
    link: "https://github.com/Shreyasg13",
    isBlog: false,
  },
  {
    imgPath: bitsOfCode,
    title: "LLM Engine Fork — Monitoring & Batch Scheduling",
    description:
      "Fork of Scale AI's open-source LLM Engine with added Prometheus metrics, a priority-based batch scheduler with exponential backoff, and a CPU-only mock executor for GPU-free CI. Personal open-source work, not affiliated with Scale AI.",
    link: "https://github.com/Shreyasg13/llm-engine",
    isBlog: false,
  },
  {
    imgPath: algo,
    title: "Multi-Agent Trading System — Consensus AI Architecture",
    description:
      "7 specialized AI agents (Quantitative Strategist, Value Investor, Risk Manager, Global Macro Specialist + 3 more) with a V(n) = α·I(n) - β·C(n) + γ·Q(n) - δ·T(n) consensus formula. 15 securities / 10-year backtest (2016–2025), 2,500+ data points/symbol. 10,000-path Monte Carlo simulation. Flask dashboard with real-time signals. Python · NumPy · Pandas · SciPy.",
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
              <Reveal>
                <ProjectCard
                  imgPath={p.imgPath}
                  isBlog={p.isBlog}
                  title={p.title}
                  description={p.description}
                  link={p.link}
                />
              </Reveal>
            </Col>
          ))}
        </Row>
      </Container>
    </Container>
  );
}

export default Projects;
