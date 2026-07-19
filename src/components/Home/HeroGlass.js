import React, { useState, useRef, useEffect } from "react";
import { Link } from "react-router-dom";
import heroPortrait from "../../Assets/hero-portrait.png";
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
  BsMicFill,
  BsStopFill,
  BsRocketTakeoffFill,
  BsLayersFill,
  BsBookFill,
  BsShieldFillCheck,
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
  { icon: <BsChatDotsFill />, label: "How can I help you today?" },
  { icon: <BsGraphUp />, label: "Analyze customer sentiment" },
  { icon: <BsCheckCircleFill />, label: "Check system health" },
  { icon: <BsGearFill />, label: "Summarize platform metrics" },
  { icon: <BsFileEarmarkTextFill />, label: "Generate architecture diagram" },
];

const TOP_STATS = [
  { icon: <BsRocketTakeoffFill />, color: "#e0452a", num: "5+", lab: "Years Experience" },
  { icon: <BsChatDotsFill />, color: "#ff7a5c", num: "1.2M+", lab: "AI Conversations / Month" },
  { icon: <BsLayersFill />, color: "#4caf50", num: "10+", lab: "Production Platforms" },
  { icon: <BsBookFill />, color: "#e0a02a", num: "2", lab: "Springer Publications" },
  { icon: <BsShieldFillCheck />, color: "#4fa8e0", num: "Zero", lab: "CVEs (Security First)" },
];

const BUILD_DELIVER = [
  { icon: <GiBrain />, color: "#a855f7", title: "AI Platform Engineering", desc: "Agentic AI, MCP, A2A, multi-model orchestration, RAG, tools & integrations" },
  { icon: <BsDiagram3Fill />, color: "#e0a02a", title: "LLM Infrastructure", desc: "Self-hosted vLLM, Qwen3-32B, DeepSeek-R1, Bedrock fallback, scaling & cost optimization" },
  { icon: <BsCheckCircleFill />, color: "#4caf50", title: "Identity & Security", desc: "Multi-tenant IdP, SAML 2.0, OIDC, OAuth2, RBAC, MFA, zero-trust security" },
  { icon: <BsGearFill />, color: "#8a8f98", title: "Backend & APIs", desc: "High-scale APIs, event-driven systems, auth, payments, webhooks & real-time" },
  { icon: <BsGraphUp />, color: "#e0452a", title: "Data & Intelligence", desc: "Pipelines, vector stores, analytics, forecasting, anomaly detection" },
  { icon: <AiFillCloud />, color: "#4fa8e0", title: "Cloud & DevOps", desc: "AWS/GCP/Azure, K8s, CI/CD, IaC, monitoring & reliability" },
];

function localReply(question) {
  const query = question.toLowerCase();
  if (query.includes("health") || query.includes("system")) {
    return "All platform signals are healthy. I build observable, production-grade systems with metrics, tracing, and reliability controls designed in from day one.";
  }
  if (query.includes("sentiment") || query.includes("customer")) {
    return "I would route the request through an agentic workflow, combine model inference with evaluation guardrails, and return an auditable sentiment and intent summary.";
  }
  if (query.includes("metric") || query.includes("platform")) {
    return "My focus is reliable AI platform engineering: agentic AI and MCP, self-hosted and managed LLMs, identity, APIs, and cloud operations at production scale.";
  }
  if (query.includes("architecture") || query.includes("diagram")) {
    return "A typical design starts with a secure API and identity boundary, then an orchestration layer, tools and retrieval, model routing, and full observability across the request path.";
  }
  return "Thanks for asking. I build secure, production-ready AI platforms spanning LLM infrastructure, orchestration, identity, APIs, and cloud reliability. Ask about a specific platform, system, or leadership experience.";
}

function HeroGlass() {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [listening, setListening] = useState(false);
  const bottomRef = useRef(null);
  const recognitionRef = useRef(null);

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
        body: JSON.stringify({
          question,
          history: messages.slice(-6).map(({ role, content }) => ({ role, content })),
        }),
      });
      if (!res.ok) throw new Error("Assistant unavailable");
      const data = await res.json();
      setMessages((m) => [
        ...m,
        { role: "assistant", content: data.answer || localReply(question) },
      ]);
    } catch {
      setMessages((m) => [
        ...m,
        { role: "assistant", content: localReply(question), offline: true },
      ]);
    } finally {
      setLoading(false);
    }
  }

  function toggleVoiceInput() {
    if (listening) {
      recognitionRef.current?.stop();
      return;
    }
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (!SpeechRecognition) {
      setMessages((m) => [...m, { role: "assistant", content: "Voice input is not supported in this browser. Please type your question instead." }]);
      return;
    }
    const recognition = new SpeechRecognition();
    recognition.lang = "en-US";
    recognition.interimResults = false;
    recognition.maxAlternatives = 1;
    recognition.onstart = () => setListening(true);
    recognition.onend = () => setListening(false);
    recognition.onerror = () => setListening(false);
    recognition.onresult = (event) => setInput(event.results[0][0].transcript);
    recognitionRef.current = recognition;
    recognition.start();
  }

  return (
    <div className="hg-hero">
      <div className="hg-topbar">
        <div className="hg-topstats">
          {TOP_STATS.map((s) => (
            <div className="hg-topstat" key={s.lab}>
              <span className="hg-topstat-icon" style={{ color: s.color }}>
                {s.icon}
              </span>
              <div>
                <div className="hg-topstat-num" style={{ color: s.color }}>
                  {s.num}
                </div>
                <div className="hg-topstat-lab">{s.lab}</div>
              </div>
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

        <div className="hg-right">
          <div className="hg-panel hg-glass">
            <div className="hg-panel-header">
              <span className="hg-logo-chip">S</span> Shreyash AI Assistant
              <span className="hd-live-dot" style={{ marginLeft: "auto" }} /> Online
            </div>
            <div className="hg-panel-body">
              <div className="hg-chat-scroll" aria-live="polite" aria-busy={loading}>
                {messages.length === 0 &&
                  <>
                    <div className="hg-greeting">Hi, I’m Shreyash’s AI assistant. Ask me about platforms, LLM infrastructure, or leadership experience.</div>
                    {ASSISTANT_SUGGESTIONS.map((s) => (
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
                  </>}
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
                <button
                  className={`hg-mic-button ${listening ? "hg-mic-button-active" : ""}`}
                  type="button"
                  aria-label={listening ? "Stop voice input" : "Start voice input"}
                  aria-pressed={listening}
                  onClick={toggleVoiceInput}
                >
                  {listening ? <BsStopFill /> : <BsMicFill />}
                </button>
                <button type="submit" aria-label="Send" disabled={loading || !input.trim()}>
                  <BsSend />
                </button>
              </form>
            </div>
          </div>
        </div>

        <div className="hg-center">
          <div className="hg-photo-slot">
            <img src={heroPortrait} alt="Shreyash Gondane" className="hg-photo-img" />
          </div>
        </div>

        <div className="hg-panel hg-glass hg-build-panel">
          <div className="hg-panel-header">
            What I Build &amp; Deliver
            <Link to="/project" className="hg-view-all">
              View All <BsArrowRight />
            </Link>
          </div>
          <div className="hg-build-grid hg-build-grid-wide">
            {BUILD_DELIVER.map((b) => (
              <div className="hg-build-item" key={b.title}>
                <span
                  className="hg-build-icon"
                  style={{ background: `${b.color}22`, color: b.color }}
                >
                  {b.icon}
                </span>
                <div className="hg-build-title">{b.title}</div>
                <div className="hg-build-desc">{b.desc}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default HeroGlass;
