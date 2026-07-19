import React, { useState, useRef, useEffect } from "react";
import { Link } from "react-router-dom";
import {
  BsCircleFill,
  BsArrowRight,
  BsChatDotsFill,
  BsGraphUp,
  BsCheckCircleFill,
  BsGearFill,
  BsFileEarmarkTextFill,
  BsDiagram3Fill,
  BsSend,
} from "react-icons/bs";
import { AiFillCloud } from "react-icons/ai";
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

const ASSISTANT_SUGGESTIONS = [
  { icon: <BsChatDotsFill />, label: "Is he a fit for a Staff Platform Engineer role?" },
  { icon: <BsGraphUp />, label: "What's his AI / LLM infrastructure experience?" },
  { icon: <BsCheckCircleFill />, label: "Tell me about his auth & identity work" },
  { icon: <BsGearFill />, label: "What's his experience with distributed systems?" },
  { icon: <BsFileEarmarkTextFill />, label: "Is he open to sponsorship?" },
];

const TOP_STATS = [
  { num: "5+", lab: "Years Experience" },
  { num: "1.2M+", lab: "AI Conversations / Month" },
  { num: "10+", lab: "Production Platforms" },
  { num: "2", lab: "Springer Publications" },
  { num: "Zero", lab: "CVEs (Security First)" },
];

const BUILD_DELIVER = [
  { icon: <GiBrain />, title: "AI Platform Engineering", desc: "Agentic AI, MCP, A2A, multi-model orchestration, RAG, tools & integrations" },
  { icon: <BsDiagram3Fill />, title: "LLM Infrastructure", desc: "Self-hosted vLLM, Qwen3-32B, DeepSeek-R1, Bedrock fallback, scaling & cost optimization" },
  { icon: <BsCheckCircleFill />, title: "Identity & Security", desc: "Multi-tenant IdP, SAML 2.0, OIDC, OAuth2, RBAC, MFA, zero-trust security" },
  { icon: <BsGearFill />, title: "Backend & APIs", desc: "High-scale APIs, event-driven systems, auth, payments, webhooks & real-time" },
  { icon: <BsGraphUp />, title: "Data & Intelligence", desc: "Pipelines, vector stores, analytics, forecasting, anomaly detection" },
  { icon: <AiFillCloud />, title: "Cloud & DevOps", desc: "AWS/GCP/Azure, K8s, CI/CD, IaC, monitoring & reliability" },
];

function HeroGlass() {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const bottomRef = useRef(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, loading]);

  async function ask(question) {
    if (!question.trim() || loading) return;
    setMessages((m) => [...m, { role: "user", content: question }]);
    setInput("");
    setLoading(true);
    try {
      const res = await fetch("/.netlify/functions/ask-shreyash", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ question }),
      });
      const data = await res.json();
      setMessages((m) => [
        ...m,
        { role: "assistant", content: data.answer || "No answer came back — try again?" },
      ]);
    } catch {
      setMessages((m) => [
        ...m,
        { role: "assistant", content: "Couldn't reach the AI assistant right now — please try again shortly." },
      ]);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="hg-hero">
      <div className="hg-topbar">
        <div className="hg-topstats">
          {TOP_STATS.map((s) => (
            <div className="hg-topstat" key={s.lab}>
              <div className="hg-topstat-num">{s.num}</div>
              <div className="hg-topstat-lab">{s.lab}</div>
            </div>
          ))}
        </div>
      </div>

      <div className="hg-grid">
        <div className="hg-left">
          <span className="hg-open-pill">
            <BsCircleFill className="hg-open-dot" /> Open to Opportunities
          </span>
          <h1 className="hg-name">
            Shreyash
            <br />
            <span>Gondane</span>
          </h1>
          <p className="hg-title">Staff / Principal AI Platform Engineer</p>
          <p className="hg-desc">
            I design, build and scale production-grade AI platforms,
            self-hosted LLM systems, and secure identity infrastructure that
            power millions of conversations every month.
          </p>
          <div className="hg-tags">
            {TAGS.map((t) => (
              <span className="hg-tag" key={t}>
                {t}
              </span>
            ))}
          </div>
          <div className="hg-cta-row">
            <Link className="hero-btn" to="/project">
              View My Work <BsArrowRight />
            </Link>
            <Link className="hg-btn-outline" to="/resume">
              Download Resume
            </Link>
          </div>
        </div>

        <div className="hg-center">
          {/* Photo placeholder — swap for a real photo: add the image to
              src/Assets (e.g. profile.jpg), import it above, and replace
              this div's content with <img src={profile} alt="Shreyash Gondane" /> */}
          <div className="hg-photo-slot" aria-hidden="true">
            <span className="hg-photo-initials">SG</span>
          </div>
        </div>

        <div className="hg-right">
          <div className="hg-panel hg-glass">
            <div className="hg-panel-header">
              <span className="hg-logo-chip">S</span> Shreyash AI Assistant
              <span className="hd-live-dot" style={{ marginLeft: "auto" }} /> Online
            </div>
            <div className="hg-panel-body">
              <div className="hg-chat-scroll">
                {messages.length === 0 &&
                  ASSISTANT_SUGGESTIONS.map((s) => (
                    <button
                      className="hg-suggestion"
                      key={s.label}
                      onClick={() => ask(s.label)}
                      type="button"
                    >
                      <span className="hg-suggestion-icon">{s.icon}</span>
                      {s.label}
                    </button>
                  ))}
                {messages.map((m, i) => (
                  <div key={i} className={`hg-msg hg-msg-${m.role}`}>
                    {m.content}
                  </div>
                ))}
                {loading && <div className="hg-msg hg-msg-assistant hg-typing">Thinking…</div>}
                <div ref={bottomRef} />
              </div>
              <form
                className="hg-ask-row"
                onSubmit={(e) => {
                  e.preventDefault();
                  ask(input);
                }}
              >
                <input
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  placeholder="Ask anything…"
                  disabled={loading}
                />
                <button type="submit" aria-label="Send" disabled={loading || !input.trim()}>
                  <BsSend />
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>

      <div className="hg-panel hg-glass hg-build-panel">
        <div className="hg-panel-header">What I Build &amp; Deliver</div>
        <div className="hg-build-grid hg-build-grid-wide">
          {BUILD_DELIVER.map((b) => (
            <div className="hg-build-item" key={b.title}>
              <span className="hg-build-icon">{b.icon}</span>
              <div className="hg-build-title">{b.title}</div>
              <div className="hg-build-desc">{b.desc}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default HeroGlass;
