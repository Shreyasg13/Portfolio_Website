import React from "react";
import { Link } from "react-router-dom";
import { BsArrowRight, BsDiagram3Fill, BsCheckCircleFill, BsGearFill, BsGraphUp } from "react-icons/bs";
import { AiFillCloud } from "react-icons/ai";
import { GiBrain } from "react-icons/gi";

// Moved out of the hero (HeroGlass.js) so it's no longer a first-viewport
// object competing with name/description/CTA/Spark — this is the "what do
// you do" step of the intended who → what → proof → Spark reading order,
// one scroll past the hero rather than crammed into the same screen.
//
// Colors reference src/ui/tokens.css's categorical hue map (imported
// globally in App.js) instead of duplicating hex values here — one
// source of truth for "what color means what domain" across the site.
const BUILD_DELIVER = [
  { icon: <GiBrain />, color: "var(--h-ai)", title: "AI Platform Engineering", desc: "Agentic AI, MCP, A2A, multi-model orchestration, RAG, tools & integrations" },
  { icon: <BsDiagram3Fill />, color: "var(--h-infra)", title: "LLM Infrastructure", desc: "Self-hosted vLLM, Qwen3-32B, DeepSeek-R1, Bedrock fallback, scaling & cost optimization" },
  { icon: <BsCheckCircleFill />, color: "var(--h-security)", title: "Identity & Security", desc: "Multi-tenant IdP, SAML 2.0, OIDC, OAuth2, RBAC, MFA, zero-trust security" },
  { icon: <BsGearFill />, color: "var(--h-backend)", title: "Backend & APIs", desc: "High-scale APIs, event-driven systems, auth, payments, webhooks & real-time" },
  { icon: <BsGraphUp />, color: "var(--h-data)", title: "Data & Intelligence", desc: "Pipelines, vector stores, analytics, forecasting, anomaly detection" },
  { icon: <AiFillCloud />, color: "var(--h-cloud)", title: "Cloud & DevOps", desc: "AWS/GCP/Azure, K8s, CI/CD, IaC, monitoring & reliability" },
];

function WhatIBuild() {
  return (
    <div className="hg-panel hg-glass hg-build-panel hg-build-panel-standalone">
      <div className="hg-panel-header">
        What I Build &amp; Deliver
        <Link to="/project" className="hg-view-all">
          View All <BsArrowRight />
        </Link>
      </div>
      <div className="hg-build-grid hg-build-grid-wide">
        {BUILD_DELIVER.map((b) => (
          <div className="hg-build-item" key={b.title} style={{ "--accent": b.color }}>
            <span
              className="hg-build-icon"
              style={{ background: `color-mix(in srgb, ${b.color} 13%, transparent)`, color: b.color }}
            >
              {b.icon}
            </span>
            <div className="hg-build-title">{b.title}</div>
            <div className="hg-build-desc">{b.desc}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default WhatIBuild;
