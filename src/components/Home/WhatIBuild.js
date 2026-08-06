import React, { useState } from "react";
import { Link } from "react-router-dom";
import { BsArrowRight, BsChevronDown, BsDiagram3Fill, BsCheckCircleFill, BsGearFill, BsGraphUp } from "react-icons/bs";
import { AiFillCloud } from "react-icons/ai";
import { GiBrain } from "react-icons/gi";

// Moved out of the hero (HeroGlass.js) so it's no longer a first-viewport
// object competing with name/description/CTA/Spark — this is the "what do
// you do" step of the intended who → what → proof → Spark reading order,
// one scroll past the hero rather than crammed into the same screen.
//
// Rewritten from six plain static tiles into a single-column,
// click-to-expand list: a flat tile grid says "here's a list of skills";
// a challenge → solution → result narrative says "here's what I actually
// built and why it mattered" — a stronger fit for a senior/principal
// portfolio, and it's literally the "clicking one expands its details"
// structure a UX review of this site asked for. Every challenge/solution/
// result line below is paraphrased from the same factual source the AI
// assistant itself answers from (netlify/functions/_context/
// shreyash-context.md) — not invented for this component.
//
// Colors reference src/ui/tokens.css's categorical hue map (imported
// globally in App.js) instead of duplicating hex values here — one
// source of truth for "what color means what domain" across the site.
const BUILD_DELIVER = [
  {
    icon: <GiBrain />,
    color: "var(--h-ai)",
    title: "AI Platform Engineering",
    hook: "One governed platform, four product verticals — no team stands up its own inference stack.",
    challenge: "Four product verticals (healthcare triage, financial risk, workflow orchestration, anomaly detection) each needed LLM features, with no shared platform to build on.",
    solution: "Architected a hybrid inference layer — self-hosted vLLM (Qwen3-32B) on GPU spot fleets with AWS Bedrock fallback, EKS Auto Mode with Karpenter, Istio mTLS, and two-tier deterministic + semantic caching.",
    result: "All 4 verticals now run through one governed endpoint, with full LLM observability (Langfuse, OTel → Jaeger) built in from day one.",
  },
  {
    icon: <BsDiagram3Fill />,
    color: "var(--h-infra)",
    title: "LLM Infrastructure",
    hook: "Production LLM inference without paying for idle GPUs.",
    challenge: "Self-hosting large models for cost control meant unpredictable GPU spend and cold-start latency at scale.",
    solution: "Built scale-to-zero GPU spot fleets serving quantized models (INT4 AWQ Qwen3-32B, DeepSeek-R1) with Bedrock as fallback, plus semantic caching to cut redundant inference calls.",
    result: "Model-eval harnesses and Langfuse observability keep quality and cost visible in production, not just in a notebook.",
  },
  {
    icon: <BsCheckCircleFill />,
    color: "var(--h-security)",
    title: "Identity & Security",
    hook: "An Auth0-equivalent IdP, built from scratch — zero CVEs.",
    challenge: "The team needed enterprise-grade auth (JWT, SAML, MFA, SSO, RBAC) without the ongoing cost and vendor lock-in of a third-party IdP.",
    solution: "Designed and shipped a complete multi-tenant Identity Provider in Go/Echo across 8 phases — JWT/cookie auth, RBAC, tenant isolation, SAML 2.0 with JIT provisioning, MFA, SSO.",
    result: "Zero CVEs, sub-5ms token verification at 10,000 concurrent requests, validated by two external penetration tests.",
  },
  {
    icon: <BsGearFill />,
    color: "var(--h-backend)",
    title: "Backend & APIs",
    hook: "Turned a 15-day manual workflow into a 5-minute automated one.",
    challenge: "Financial document processing — classification, extraction, mapping, validation — was a manual 15-day workflow with real error rates.",
    solution: "Built production MCP integrations and an A2A communication layer connecting four specialized agents, with proxy routing, session management, and fallback patterns for when any agent step failed.",
    result: "15 days → 5 minutes, field accuracy improved 90% → 97%; published the resulting SDKs to PyPI and npm.",
  },
  {
    icon: <BsGraphUp />,
    color: "var(--h-data)",
    title: "Data & Intelligence",
    hook: "1.2M AI conversations a month — hallucinations cut 42%.",
    challenge: "An agentic platform's conversation volume was growing fast, but grounding responses in real data (not just model confidence) was the gap between a demo and something production-trustworthy.",
    solution: "Added a RAG-grounded personalization layer with confidence-threshold routing and human-in-the-loop escalation for low-confidence cases.",
    result: "1.2M conversations/month at p95 under 350ms, with hallucinations cut 42%.",
  },
  {
    icon: <AiFillCloud />,
    color: "var(--h-cloud)",
    title: "Cloud & DevOps",
    hook: "Split a monolith into 6 microservices — zero downtime, while doubling traffic.",
    challenge: "A monolith was becoming a bottleneck for both deploys and a fast-growing team of 21 engineers.",
    solution: "Drove the split into 6 microservices on EKS, added PostgreSQL row-level security for tenant isolation, and moved JWT verification to Cloudflare Workers at the edge for latency.",
    result: "2× peak traffic handled with zero downtime during the migration.",
  },
];

function WhatIBuild() {
  // Accordion, not a grid of always-expanded cards: only one story open at
  // a time, same "one dominant focused thing, not everything competing at
  // once" principle the hero's motion hierarchy already uses for Spark.
  const [openIndex, setOpenIndex] = useState(null);

  return (
    <div className="hg-panel hg-glass hg-build-panel hg-build-panel-standalone">
      <div className="hg-panel-header">
        What I Build &amp; Deliver
        <Link to="/project" className="hg-view-all">
          View All <BsArrowRight />
        </Link>
      </div>
      <div className="hg-build-list">
        {BUILD_DELIVER.map((b, i) => {
          const isOpen = openIndex === i;
          return (
            <div className="hg-build-row" key={b.title} style={{ "--accent": b.color }}>
              <button
                type="button"
                className={`hg-build-row-head ${isOpen ? "hg-build-row-head-open" : ""}`}
                onClick={() => setOpenIndex(isOpen ? null : i)}
                aria-expanded={isOpen}
                aria-controls={`build-detail-${i}`}
              >
                <span
                  className="hg-build-icon"
                  style={{ background: `color-mix(in srgb, ${b.color} 13%, transparent)`, color: b.color }}
                >
                  {b.icon}
                </span>
                <span className="hg-build-row-text">
                  <span className="hg-build-title">{b.title}</span>
                  <span className="hg-build-hook">{b.hook}</span>
                </span>
                <BsChevronDown className="hg-build-chevron" aria-hidden="true" />
              </button>
              <div className="hg-build-expand" id={`build-detail-${i}`}>
                <div className="hg-build-expand-inner">
                  <p>
                    <span className="hg-build-label">Challenge</span> {b.challenge}
                  </p>
                  <p>
                    <span className="hg-build-label">Solution</span> {b.solution}
                  </p>
                  <p className="hg-build-result">{b.result}</p>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default WhatIBuild;
