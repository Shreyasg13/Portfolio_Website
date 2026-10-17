import React from "react";
import { Container } from "react-bootstrap";

const timeline = [
  {
    period: "Jun 2023 – Present",
    role: "Technical Lead, AI Platform Engineering (Software Engineer until 2026)",
    company: "EngineersMind Corp. — Jersey City, NJ",
    color: "#e0452a",
    items: [
      { name: "AI platform (2026)", desc: "Architecture and design input on the internal AI platform: vLLM serving, GPU autoscaling (Karpenter, KEDA on EKS), FP8/INT4 quantization, live request and time-to-first-token tracking" },
      { name: "EMC-Auth Server (May–Aug 2026)", desc: "Lead engineer: multi-tenant identity provider in Go/Echo replacing Auth0 — SAML SSO, RBAC, AI agent registration, machine-to-machine auth, per-agent audit trails" },
      { name: "Voice MCP agent (Jan–Mar 2026)", desc: "Sole author: multi-provider LLM orchestrator, MCP client + 3 MCP servers, voice interface, tool-call audit trails and allowlists" },
      { name: "AI document automation (Oct 2025–Jul 2026)", desc: "Backend services, Claude-based in-app assistant, pdf-autofillr Python SDK, local LLM deployment, Langfuse tracing" },
      { name: "Revi AI platform (Sep 2024–Sep 2026)", desc: "AI client-communication automation: reply pipelines, EventBridge sync, Faiss knowledge-base agent, SageMaker, multi-agent eval framework, Stripe billing" },
      { name: "Compliance archival (Jun 2023–Jul 2025)", desc: "Smarsh and Global Relay archival integrations for financial-services clients; feed-processing backend" },
    ],
  },
  {
    period: "Feb 2023 – May 2023",
    role: "Software Engineer Intern",
    company: "EngineersMind — remote",
    color: "#ffb74d",
    items: [
      { name: "Secure APIs", desc: "HIPAA-compliant healthcare APIs, SOC 2 e-signature APIs, AWS Cognito SRP authentication" },
    ],
  },
  {
    period: "Jun 2021 – Jun 2023",
    role: "M.S. Computer Engineering",
    company: "New York University",
    color: "#a855f7",
    items: [
      { name: "Graduate study", desc: "Computing systems, cloud and data-center computing, network security, applied matrix theory" },
    ],
  },
  {
    period: "Feb 2020 – Jun 2021",
    role: "Assistant Systems Engineer",
    company: "Tata Consultancy Services — India",
    color: "#a0a0a0",
    items: [
      { name: "Banking platform", desc: "Oracle database administration, SQL tuning and production support for a banking application (15M customers, 2,000 branches)" },
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
