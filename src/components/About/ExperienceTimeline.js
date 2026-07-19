import React from "react";
import { Container } from "react-bootstrap";

const timeline = [
  {
    period: "2026 – Present",
    role: "Principal Platform Engineer",
    company: "Engineersmind Corp. — Jersey City, NJ",
    color: "#e0452a",
    items: [
      { name: "Governed Multi-Tenant AI Platform", desc: "vLLM (Qwen3-32B, DeepSeek-R1), EKS Auto Mode, Karpenter, KEDA, Istio mTLS, Milvus RAG, 4 verticals" },
      { name: "Multi-Tenant IdP", desc: "Go/Echo — 8 phases, SAML 2.0+JIT, AI agent registry, zero CVEs, sub-5ms at 10K concurrent" },
    ],
  },
  {
    period: "Sept 2024 – Present",
    role: "Engineering Lead",
    company: "Revi AI",
    color: "#4fc3f7",
    items: [
      { name: "Agentic Intelligence Center", desc: "LangGraph HITL across 3 verticals — 1.2M conversations/month, p95 < 350ms, RAG cut hallucinations 42%" },
      { name: "Auth & API Infrastructure", desc: "Auth0/Okta/Cognito at ≤3ms, zero CVEs — monolith → 6 microservices, 18K events/hr, led team of 21" },
    ],
  },
  {
    period: "Jan 2024 – Present",
    role: "Lead Platform Architect",
    company: "PDFfillr.ai — Engineersmind",
    color: "#ff7043",
    items: [
      { name: "MCP & A2A Platform", desc: "Production MCP + A2A Protocol — 15 days → 5 minutes, 90%→97% accuracy, multi-cloud Terraform, ~50% compute cost cut" },
    ],
  },
  {
    period: "Feb 2024 – Jun 2025",
    role: "Owner / Architect",
    company: "Global Relay + Smarsh-SMTP — Engineersmind",
    color: "#66bb6a",
    items: [
      { name: "Financial Compliance Archival", desc: "FINRA + SEC 17a-4 — 200 GB/year at 45 MB/s, zero data loss, 99.9% SLA, 2 pen tests passed" },
    ],
  },
  {
    period: "2021 – Feb 2024",
    role: "Platform Architect",
    company: "Engineersmind — Hedge Funds Portal & KYC",
    color: "#ffb74d",
    items: [
      { name: "Compliance & Security Platform", desc: "OAuth 2.0 webhooks (~7K sign events/week), KYC OCR (75% manual reduction), KMS encryption, SOC-2" },
    ],
  },
  {
    period: "Feb 2020 – Jul 2021",
    role: "System Engineer",
    company: "Tata Consultancy Services — MH, India",
    color: "#a0a0a0",
    items: [
      { name: "Banking APIs at Scale", desc: "2,000+ branches, 15M customers — 30% query optimization, Prometheus production monitoring" },
    ],
  },
];

function ExperienceTimeline() {
  return (
    <Container fluid style={{ paddingTop: "20px", paddingBottom: "60px" }}>
      <h1 className="project-heading" style={{ paddingBottom: "40px" }}>
        Career <strong className="purple">Timeline</strong>
      </h1>
      <div className="timeline">
        {timeline.map((entry, i) => (
          <div key={i} className="timeline-entry">
            <div className="timeline-dot" style={{ background: entry.color }} />
            <div className="timeline-content">
              <div className="timeline-period" style={{ color: entry.color }}>
                {entry.period}
              </div>
              <div className="timeline-role">{entry.role}</div>
              <div className="timeline-company">{entry.company}</div>
              <div className="timeline-items">
                {entry.items.map((item, j) => (
                  <div key={j} className="timeline-item">
                    <span className="timeline-item-name" style={{ color: entry.color }}>
                      {item.name}
                    </span>
                    <span className="timeline-item-desc"> — {item.desc}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>
    </Container>
  );
}

export default ExperienceTimeline;
