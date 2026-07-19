import React from "react";
import { Link } from "react-router-dom";
import {
  BsPersonFill,
  BsRobot,
  BsServer,
  BsTools,
  BsDatabase,
  BsArrowRight,
  BsGeoAlt,
  BsTelephone,
  BsGlobe,
  BsCodeSlash,
  BsCpu,
  BsGraphUp,
  BsPeopleFill,
  BsShieldCheck,
  BsGearFill,
  BsCheckCircleFill,
} from "react-icons/bs";
import { AiFillMail, AiFillGithub, AiFillCloud } from "react-icons/ai";
import { FaLinkedinIn, FaShieldAlt, FaHeartbeat } from "react-icons/fa";
import { GiBrain } from "react-icons/gi";

const TAGS = [
  "AI Platforms",
  "MCP",
  "LLM Infrastructure",
  "Identity & Security",
  "Backend Systems",
  "Cloud & DevOps",
  "Distributed Systems",
];

const FLOW_STEPS = [
  { icon: <BsPersonFill />, label: "User Client" },
  { icon: <BsRobot />, label: "AI Assistant (Platform)" },
  { icon: <BsServer />, label: "MCP Server" },
  { icon: <BsTools />, label: "Tools & Integrations" },
  { icon: <BsDatabase />, label: "Data & Systems" },
];

const MCP_TOOLS = [
  "Classification & Triage",
  "RAG Chat",
  "Document Intelligence",
  "Risk Scoring",
  "Anomaly Detection",
  "Sentiment Analysis",
  "Forecasting",
];

const STATS = [
  { num: "5+", lab: "Years Experience" },
  { num: "1.2M+", lab: "AI Conversations / Month" },
  { num: "10+", lab: "Production Platforms" },
  { num: "2", lab: "Springer Publications" },
  { num: "Zero", lab: "CVEs (Security First)" },
  { num: "Multi-Cloud", lab: "AWS · GCP · Azure Architect" },
];

const JUGGLE = [
  {
    icon: <GiBrain />,
    title: "AI Platform Engineering",
    desc: "Agentic platforms with LangGraph, MCP, A2A Protocol, RAG, multi-model orchestration & tool execution.",
  },
  {
    icon: <BsCodeSlash />,
    title: "Backend & API Systems",
    desc: "High-scale APIs, event-driven systems, authentication, webhooks, and real-time integrations.",
  },
  {
    icon: <BsCpu />,
    title: "LLM Infrastructure",
    desc: "Self-hosted vLLM on GPU spot (Qwen3-32B, DeepSeek-R1) with scale-to-zero, Bedrock fallback routing.",
  },
  {
    icon: <BsGraphUp />,
    title: "Data & Intelligence",
    desc: "Data pipelines, vector stores, analytics, forecasting, anomaly detection & insights.",
  },
  {
    icon: <AiFillCloud />,
    title: "Infrastructure & DevOps",
    desc: "Kubernetes, AWS/GCP/Azure, CI/CD, IaC with Terraform, monitoring & autoscaling.",
  },
  {
    icon: <BsPeopleFill />,
    title: "Leadership & Architecture",
    desc: "System design, tech strategy, mentoring engineers, driving product & engineering excellence.",
  },
];

const ARCHITECTURE = [
  { label: "Clients / Channels" },
  { label: "API Gateway / Auth Layer", sub: "JWT · OIDC · SAML · Rate Limit / WAF" },
  { label: "AI Orchestrator (LangGraph)", sub: "Tools (MCP) · Memory · Guardrails" },
  { label: "Model Routing", sub: "Self-Hosted vLLM · AWS Bedrock · Fallback / Hybrid" },
  { label: "Data Layer", sub: "Milvus / pgvector · Redis / Valkey · SQS FIFO" },
  { label: "Monitoring", sub: "OTel · Langfuse" },
];

const WORKFLOW = [
  { time: "09:00", label: "Platform Roadmap & Architecture" },
  { time: "10:00", label: "Design AI Agents & MCP Tools" },
  { time: "11:30", label: "Code Review & Pull Requests" },
  { time: "13:00", label: "Team Sync & Mentoring" },
  { time: "14:00", label: "LLM Infra: Scaling & Optimization" },
  { time: "15:30", label: "Security & Compliance Reviews" },
  { time: "16:30", label: "Monitoring, Alerts & Debugging" },
  { time: "17:30", label: "Learn, Document & Improve" },
];

const TECH_EXPERTISE = [
  { title: "AI & Agentic Systems", desc: "LangGraph, MCP, A2A Protocol, RAG, multi-model orchestration, tool graphs" },
  { title: "LLM Inference & Serving", desc: "vLLM, Qwen3-32B, DeepSeek-R1, quantization (INT4/FP8), Bedrock, hybrid routing" },
  { title: "Backend Development", desc: "Python, FastAPI, Go, TypeScript, Java Spring Boot, REST/gRPC, GraphQL" },
  { title: "Identity & Security", desc: "Multi-tenant IdP, SAML 2.0, OIDC, OAuth2, RBAC, MFA, SSO, zero-trust, PII/PHI handling" },
  { title: "Data & Messaging", desc: "PostgreSQL (RLS, pgvector), Milvus, Redis/Valkey, Kafka, SQS/SNS, exactly-once processing" },
  { title: "Platform & Cloud", desc: "AWS (EKS, Lambda, S3, RDS), GCP, Azure, Terraform, Kubernetes, KEDA, Istio, CI/CD" },
  { title: "Observability", desc: "OpenTelemetry, Prometheus, Grafana, Jaeger, Langfuse, Datadog, SLO/SLA, k6" },
];

const PLATFORMS_IMPACT = [
  { icon: <FaHeartbeat />, label: "Healthcare AI" },
  { icon: <BsGraphUp />, label: "Financial Services" },
  { icon: <BsGearFill />, label: "Workflow Orchestration" },
  { icon: <BsShieldCheck />, label: "Data Quality & Risk" },
  { icon: <BsCheckCircleFill />, label: "Advisor Performance" },
  { icon: <FaShieldAlt />, label: "Anomaly Detection" },
];

function HeroDense() {
  return (
    <section className="hd-section">
      {/* ── Left sidebar ─────────────────────────── */}
      <aside className="hd-sidebar">
        <div className="hd-logo">S</div>
        <h1 className="hd-name">
          SHREYASH
          <br />
          <span>GONDANE</span>
        </h1>
        <p className="hd-title">Staff / Principal AI Platform Engineer</p>
        <p className="hd-desc">
          Building production-grade AI platforms, self-hosted LLM
          infrastructure, and secure identity systems that power{" "}
          <b>millions of conversations</b> every month.
        </p>
        <div className="hd-tags">
          {TAGS.map((t) => (
            <span className="hd-tag" key={t}>
              {t}
            </span>
          ))}
        </div>
        <ul className="hd-contact">
          <li>
            <BsGeoAlt /> Jersey City, NJ
          </li>
          <li>
            <BsTelephone /> +1 929-527-9683
          </li>
          <li>
            <AiFillMail /> sg6874@nyu.edu
          </li>
          <li>
            <BsGlobe />{" "}
            <a href="https://shreyashportfolio.netlify.app/" target="_blank" rel="noreferrer">
              Portfolio
            </a>
          </li>
          <li>
            <AiFillGithub />{" "}
            <a href="https://github.com/Shreyasg13" target="_blank" rel="noreferrer">
              github.com/Shreyasg13
            </a>
          </li>
          <li>
            <FaLinkedinIn />{" "}
            <a href="https://www.linkedin.com/in/shreyash130197/" target="_blank" rel="noreferrer">
              linkedin.com/in/shreyash130197
            </a>
          </li>
        </ul>
      </aside>

      {/* ── Center column ────────────────────────── */}
      <div className="hd-center">
        <div className="hd-tagline">I DESIGN · BUILD · SCALE · SECURE · AUTOMATE</div>
        <div className="hd-subtagline">End-to-End AI &amp; Platform Engineering</div>

        <div className="hd-flow">
          {FLOW_STEPS.map((s, i) => (
            <React.Fragment key={s.label}>
              <div className="hd-flow-step">
                <div className="hd-flow-icon">{s.icon}</div>
                <div className="hd-flow-label">{s.label}</div>
              </div>
              {i < FLOW_STEPS.length - 1 && (
                <BsArrowRight className="hd-flow-arrow" aria-hidden="true" />
              )}
            </React.Fragment>
          ))}
        </div>

        <div className="hd-panel">
          <div className="hd-panel-header">
            <BsServer /> MCP Server <span className="hd-live-dot" /> Online
          </div>
          <div className="hd-panel-body hd-mcp-tools">
            {MCP_TOOLS.map((t) => (
              <span className="hd-mcp-tool" key={t}>
                {t}
              </span>
            ))}
          </div>
        </div>

        <div className="hd-panel">
          <div className="hd-panel-header">
            <BsRobot /> Shreyash AI Assistant <span className="hd-live-dot" /> Online
          </div>
          <div className="hd-panel-body">
            <div className="hd-chat-query">
              Analyze customer sentiment and summarize key insights
            </div>
            <ul className="hd-chat-results">
              <li>
                <BsCheckCircleFill /> Overall Sentiment: Positive (72%)
              </li>
              <li>
                <BsCheckCircleFill /> Top Intents Identified
              </li>
              <li>
                <BsCheckCircleFill /> Key Risk Signals Detected
              </li>
              <li>
                <BsCheckCircleFill /> Summary Report Generated
              </li>
            </ul>
            <div className="hd-chat-caption">Analyzing conversation volume across verticals…</div>
          </div>
        </div>

        <div className="hd-stats">
          {STATS.map((s) => (
            <div className="hd-stat" key={s.lab}>
              <div className="hd-stat-num">{s.num}</div>
              <div className="hd-stat-lab">{s.lab}</div>
            </div>
          ))}
        </div>

        <div className="hd-cta-row">
          <Link className="hero-btn" to="/resume">
            View Résumé
          </Link>
          <Link className="hero-link" to="/project">
            See the work <span aria-hidden="true">→</span>
          </Link>
        </div>
      </div>

      {/* ── Right column ─────────────────────────── */}
      <div className="hd-right">
        <div className="hd-right-heading">What I Juggle Every Day</div>
        <div className="hd-juggle-grid">
          {JUGGLE.map((j) => (
            <div className="hd-juggle-card" key={j.title}>
              <div className="hd-juggle-icon">{j.icon}</div>
              <div className="hd-juggle-title">{j.title}</div>
              <div className="hd-juggle-desc">{j.desc}</div>
            </div>
          ))}
        </div>

        <div className="hd-panel">
          <div className="hd-panel-header">AI Platform Architecture</div>
          <div className="hd-panel-body hd-arch">
            {ARCHITECTURE.map((a) => (
              <div className="hd-arch-row" key={a.label}>
                <div className="hd-arch-label">{a.label}</div>
                {a.sub && <div className="hd-arch-sub">{a.sub}</div>}
              </div>
            ))}
          </div>
        </div>

        <div className="hd-panel">
          <div className="hd-panel-header">A Day In My Workflow</div>
          <div className="hd-panel-body">
            <ul className="hd-workflow">
              {WORKFLOW.map((w) => (
                <li key={w.time}>
                  <span className="hd-workflow-time">{w.time}</span>
                  {w.label}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* ── Bottom full-width sections ───────────── */}
      <div className="hd-bottom">
        <h2 className="hd-bottom-heading">
          Technology &amp; <span>Expertise</span>
        </h2>
        <div className="hd-tech-row">
          {TECH_EXPERTISE.map((t) => (
            <div className="hd-tech-card" key={t.title}>
              <div className="hd-tech-title">{t.title}</div>
              <div className="hd-tech-desc">{t.desc}</div>
            </div>
          ))}
        </div>

        <blockquote className="hd-quote">
          “I don't just use AI. I build the platforms that make AI{" "}
          <span>reliable, scalable and production-ready.</span>”
          <footer>Shreyash Gondane</footer>
        </blockquote>

        <h2 className="hd-bottom-heading">
          Platforms Powering <span>Real-World Impact</span>
        </h2>
        <div className="hd-platforms-row">
          {PLATFORMS_IMPACT.map((p) => (
            <div className="hd-platform-item" key={p.label}>
              <span className="hd-platform-icon">{p.icon}</span>
              {p.label}
            </div>
          ))}
        </div>

        <div className="hd-connect">
          <div className="hd-connect-text">Let's build something impactful together.</div>
          <a className="hero-btn" href="mailto:sg6874@nyu.edu">
            Let's Connect <span aria-hidden="true">→</span>
          </a>
        </div>
      </div>
    </section>
  );
}

export default HeroDense;
