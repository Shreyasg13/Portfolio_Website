import React, { useState, useRef, useEffect } from "react";
import { Link } from "react-router-dom";
import heroScreen from "../../Assets/ChatGPT Image Jul 19, 2026, 10_42_10 AM.png";
import assistantAvatar from "../../Assets/hero-portrait.png";
import {
  BsCircleFill,
  BsArrowRight,
  BsGraphUp,
  BsCheckCircleFill,
  BsGearFill,
  BsFileEarmarkTextFill,
  BsDiagram3Fill,
  BsSend,
  BsMicFill,
  BsStopFill,
  BsVolumeUpFill,
  BsVolumeMuteFill,
  BsThreeDotsVertical,
} from "react-icons/bs";
import { AiFillCloud } from "react-icons/ai";
import { GiBrain } from "react-icons/gi";
import { BookOpen, Layers3, MessagesSquare, Rocket, ShieldCheck } from "lucide-react";

const TAGS = [
  "AI Platforms",
  "MCP",
  "LLM Infrastructure",
  "Identity & Security",
  "Backend Systems",
  "Cloud & DevOps",
  "Distributed Infrastructure",
];

const ASSISTANT_SUGGESTIONS = [
  { icon: <BsCheckCircleFill />, label: "What makes you a strong fit? (tell me the role you're hiring for)" },
  { icon: <Layers3 />, label: "Tell me about your leadership experience" },
  { icon: <BsGearFill />, label: "What's your core technical expertise?" },
  { icon: <Rocket />, label: "What's your most impactful project?" },
  { icon: <BsFileEarmarkTextFill />, label: "Do you need visa sponsorship?" },
  { icon: <BsSend />, label: "Can you email me your resume?" },
];

const TOP_STATS = [
  { icon: <Rocket />, color: "#e0452a", num: "5+", lab: "Years Experience" },
  { icon: <MessagesSquare />, color: "#ff7a5c", num: "1.2M+", lab: "AI Conversations / Month" },
  { icon: <Layers3 />, color: "#4caf50", num: "10+", lab: "Production Platforms" },
  { icon: <BookOpen />, color: "#e0a02a", num: "2", lab: "Springer Publications" },
  { icon: <ShieldCheck />, color: "#4fa8e0", num: "Zero", lab: "CVEs (Security First)" },
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
  if (query.includes("fit") || query.includes("role")) {
    return "I bring 5+ years building production AI platforms \u2014 agentic AI/MCP, self-hosted LLM inference, identity security, and distributed systems \u2014 plus experience leading teams as large as 21 engineers. That mix of hands-on platform engineering and technical leadership carries across most senior/staff engineering and technical leadership roles. Let me know the specific role or JD you're hiring for and I can speak to fit more precisely.";
  }
  if (query.includes("leadership") || query.includes("lead")) {
    return "I've led engineering teams as large as 21 people (4 direct reports), mentored engineers to raise PR acceptance by 30%, and served as Principal Architect across multiple platform initiatives \u2014 balancing hands-on system design with team growth and delivery.";
  }
  if (query.includes("technical") || query.includes("expertise") || query.includes("stack")) {
    return "My core stack is Python, Go, and TypeScript, with deep experience in self-hosted LLM serving (vLLM, Qwen3, DeepSeek-R1), agentic AI (MCP, A2A, LangGraph), identity/auth systems built from scratch, and cloud-native infrastructure on AWS/Kubernetes.";
  }
  if (query.includes("project") || query.includes("impact")) {
    return "One of the most impactful was building MCP and A2A connectivity infrastructure at PDFfillr.ai \u2014 it cut document processing time from 15 days to 5 minutes while raising field accuracy from 90% to 97%, and cut compute costs roughly 50%.";
  }
  if (query.includes("visa") || query.includes("sponsor")) {
    return "Yes \u2014 I'm currently on an H1B visa and would need employer sponsorship (an H1B transfer) to take on a new role. Happy to discuss details.";
  }
  return "Thanks for asking. I build secure, production-ready AI platforms spanning LLM infrastructure, orchestration, identity, APIs, and cloud reliability. Ask about my fit for the role, leadership experience, technical expertise, or sponsorship needs.";
}

function Waveform({ active, bars = 18 }) {
  return (
    <div className={`hg-waveform ${active ? "hg-waveform-active" : ""}`} aria-hidden="true">
      {Array.from({ length: bars }).map((_, i) => (
        <span key={i} style={{ animationDelay: `${(i % 6) * 0.09}s` }} />
      ))}
    </div>
  );
}

function formatTimer(totalSeconds) {
  const m = Math.floor(totalSeconds / 60).toString().padStart(2, "0");
  const s = (totalSeconds % 60).toString().padStart(2, "0");
  return `${m}:${s}`;
}

// Voice names/availability vary wildly by OS and browser, so instead of
// matching exact names we score every available voice and pick the best —
// this actually finds a good match on whatever platform the visitor is on.
const GOOD_VOICE_PATTERNS = [
  { re: /online \(natural\)/i, score: 100 },
  { re: /neural/i, score: 95 },
  { re: /\bnatural\b/i, score: 90 },
  { re: /premium|enhanced/i, score: 85 },
  { re: /google/i, score: 75 },
  { re: /\b(guy|ryan|daniel|alex|christopher|andrew|brian)\b/i, score: 60 },
];
const BAD_VOICE_PATTERNS = [/desktop/i, /espeak/i, /compact/i, /\bzira\b/i, /\bdavid\b/i];

// The assistant's persona is a single, consistent male voice — pick from
// these first regardless of which platform/browser is rendering, so the
// "who's speaking" identity doesn't shift between visitors. Extend this
// list as more platform voice names are found to sound off.
const MALE_VOICE_RE = /\b(guy|ryan|daniel|alex|david|christopher|eric|andrew|brian|roger|steffan|thomas|oliver|diego|fred|george|james|kevin|liam|matthew|will|mark|paul|tom)\b/i;
const FEMALE_VOICE_RE = /\b(samantha|karen|moira|tessa|serena|aria|jenny|zira|susan|victoria|fiona|kate|allison|ava|michelle|nicky|catherine|hazel|sonia|libby|emma|olivia|sara|zoe|amy|joanna|salli|kimberly|female)\b/i;

// Fixed delivery — applied to whichever underlying voice engine the
// browser provides, so the pacing/tone stays the same "measured,
// professional" persona everywhere even though the raw voice timbre
// still varies by platform (the Web Speech API gives no way around that).
const VOICE_PERSONA = { rate: 0.95, pitch: 0.9, volume: 1 };

function scoreVoice(voice) {
  let score = 0;
  for (const { re, score: s } of GOOD_VOICE_PATTERNS) {
    if (re.test(voice.name)) score = Math.max(score, s);
  }
  for (const re of BAD_VOICE_PATTERNS) {
    if (re.test(voice.name)) score -= 40;
  }
  if (voice.lang === "en-US") score += 8;
  else if (voice.lang?.startsWith("en")) score += 4;
  if (!voice.localService) score += 5;
  return score;
}

function pickPreferredVoice(voices) {
  if (!voices.length) return null;
  const englishVoices = voices.filter((v) => v.lang?.startsWith("en"));
  const pool = englishVoices.length ? englishVoices : voices;

  // Gender consistency first, voice quality second: prefer an explicitly
  // male-named voice; failing that, at least avoid an explicitly
  // female-named one; only fall back to the unfiltered pool if that
  // leaves nothing to speak with at all.
  const male = pool.filter((v) => MALE_VOICE_RE.test(v.name) && !FEMALE_VOICE_RE.test(v.name));
  const notFemale = pool.filter((v) => !FEMALE_VOICE_RE.test(v.name));
  const finalPool = male.length ? male : notFemale.length ? notFemale : pool;

  return finalPool.reduce((best, v) => (scoreVoice(v) > scoreVoice(best) ? v : best), finalPool[0]);
}

function waitForVoices(synth, timeoutMs = 1000) {
  return new Promise((resolve) => {
    const existing = synth.getVoices();
    if (existing.length) {
      resolve(existing);
      return;
    }
    const onChange = () => {
      synth.removeEventListener("voiceschanged", onChange);
      resolve(synth.getVoices());
    };
    synth.addEventListener("voiceschanged", onChange);
    setTimeout(() => {
      synth.removeEventListener("voiceschanged", onChange);
      resolve(synth.getVoices());
    }, timeoutMs);
  });
}

function HeroGlass() {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [listening, setListening] = useState(false);
  const [listenSeconds, setListenSeconds] = useState(0);
  const [voiceOn, setVoiceOn] = useState(true);
  const [speaking, setSpeaking] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const bottomRef = useRef(null);
  const recognitionRef = useRef(null);
  const menuRef = useRef(null);
  const voicesRef = useRef([]);
  const audioRef = useRef(null);
  const utteranceRef = useRef(null);
  const keepAliveRef = useRef(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, loading]);

  useEffect(() => {
    const synth = window.speechSynthesis;
    if (!synth) return undefined;
    function loadVoices() {
      voicesRef.current = synth.getVoices();
    }
    loadVoices();
    synth.addEventListener("voiceschanged", loadVoices);
    return () => synth.removeEventListener("voiceschanged", loadVoices);
  }, []);

  useEffect(() => {
    if (!menuOpen) return undefined;
    function onDocClick(e) {
      if (!menuRef.current?.contains(e.target)) setMenuOpen(false);
    }
    document.addEventListener("mousedown", onDocClick);
    return () => document.removeEventListener("mousedown", onDocClick);
  }, [menuOpen]);

  useEffect(() => {
    if (!listening) {
      setListenSeconds(0);
      return undefined;
    }
    setListenSeconds(0);
    const id = setInterval(() => setListenSeconds((s) => s + 1), 1000);
    return () => clearInterval(id);
  }, [listening]);

  useEffect(() => () => stopSpeaking(), []);

  function stopSpeaking() {
    window.speechSynthesis?.cancel();
    if (keepAliveRef.current) {
      clearInterval(keepAliveRef.current);
      keepAliveRef.current = null;
    }
    utteranceRef.current = null;
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current.src = "";
      audioRef.current = null;
    }
    setSpeaking(false);
  }

  // Fallback only: each browser exposes a different voice list, so this can
  // never guarantee the exact same audio everywhere — it's what runs if the
  // server-side voice (the one that IS consistent everywhere, see speak()
  // below) is unavailable.
  //
  // Two long-standing cross-browser SpeechSynthesis bugs this works around:
  // 1. Chromium silently cuts speech off after ~15s on longer utterances
  //    (chromium issue 679437) unless the synth is periodically nudged with
  //    pause()/resume() while it's speaking.
  // 2. The utterance can get garbage-collected mid-speech if nothing keeps
  //    a reference to it, silently stopping playback — so we hold one in a
  //    ref for the duration instead of only a local variable.
  async function speakWithBrowserVoice(text) {
    const synth = window.speechSynthesis;
    if (!synth) return;
    if (!voicesRef.current.length) {
      voicesRef.current = await waitForVoices(synth);
    }
    const utterance = new SpeechSynthesisUtterance(text);
    utteranceRef.current = utterance;
    const voice = pickPreferredVoice(voicesRef.current);
    if (voice) utterance.voice = voice;
    utterance.rate = VOICE_PERSONA.rate;
    utterance.pitch = VOICE_PERSONA.pitch;
    utterance.volume = VOICE_PERSONA.volume;
    utterance.onstart = () => {
      setSpeaking(true);
      keepAliveRef.current = setInterval(() => {
        if (!synth.speaking) return;
        synth.pause();
        synth.resume();
      }, 10000);
    };
    const finish = () => {
      setSpeaking(false);
      if (keepAliveRef.current) {
        clearInterval(keepAliveRef.current);
        keepAliveRef.current = null;
      }
      utteranceRef.current = null;
    };
    utterance.onend = finish;
    utterance.onerror = finish;
    synth.speak(utterance);
  }

  async function speak(text) {
    if (!voiceOn) return;
    stopSpeaking();
    try {
      const res = await fetch("/.netlify/functions/tts", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ text }),
      });
      if (!res.ok) throw new Error("tts unavailable");
      const blob = await res.blob();
      const url = URL.createObjectURL(blob);
      const audio = new Audio(url);
      audioRef.current = audio;
      audio.onplay = () => setSpeaking(true);
      audio.onended = () => {
        setSpeaking(false);
        URL.revokeObjectURL(url);
      };
      audio.onerror = () => {
        setSpeaking(false);
        URL.revokeObjectURL(url);
      };
      await audio.play();
    } catch {
      speakWithBrowserVoice(text);
    }
  }

  function toggleVoiceOutput() {
    setVoiceOn((v) => {
      const next = !v;
      if (!next) stopSpeaking();
      return next;
    });
  }

  async function ask(question) {
    if (!question.trim() || loading) return;
    stopSpeaking();
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
      const answer = data.answer || localReply(question);
      setMessages((m) => [
        ...m,
        { role: "assistant", content: answer, resumeProposal: data.resumeProposal || null },
      ]);
      speak(answer);
    } catch {
      const answer = localReply(question);
      setMessages((m) => [...m, { role: "assistant", content: answer, offline: true }]);
      speak(answer);
    } finally {
      setLoading(false);
    }
  }

  function updateMessage(index, patch) {
    setMessages((m) => m.map((msg, i) => (i === index ? { ...msg, ...patch } : msg)));
  }

  function confirmSendResume(index, proposal) {
    updateMessage(index, { resumeSendStatus: "sending" });
    fetch("/.netlify/functions/send-resume", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email: proposal.email, variant: proposal.variant, message: proposal.message }),
    })
      .then(async (res) => {
        const data = await res.json();
        if (!res.ok) throw new Error(data.error || "Failed to send the resume.");
        updateMessage(index, { resumeSendStatus: "sent" });
      })
      .catch((err) => updateMessage(index, { resumeSendStatus: "error", resumeSendError: err.message }));
  }

  function cancelSendResume(index) {
    updateMessage(index, { resumeSendStatus: "cancelled" });
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
          <p className="hg-title">Principal AI Platform Engineer — Distributed Infrastructure &amp; Scaling</p>
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
              <img src={assistantAvatar} alt="" className="hg-avatar" />
              Shreyash AI Assistant
              <div className="hg-header-actions">
                <button
                  type="button"
                  className="hg-icon-btn"
                  aria-label={voiceOn ? "Mute voice replies" : "Unmute voice replies"}
                  aria-pressed={voiceOn}
                  onClick={toggleVoiceOutput}
                >
                  {voiceOn ? <BsVolumeUpFill /> : <BsVolumeMuteFill />}
                </button>
                <div className="hg-menu" ref={menuRef}>
                  <button
                    type="button"
                    className="hg-icon-btn"
                    aria-label="More options"
                    aria-haspopup="true"
                    aria-expanded={menuOpen}
                    onClick={() => setMenuOpen((o) => !o)}
                  >
                    <BsThreeDotsVertical />
                  </button>
                  {menuOpen && (
                    <div className="hg-menu-dropdown">
                      <button
                        type="button"
                        onClick={() => {
                          stopSpeaking();
                          setMessages([]);
                          setMenuOpen(false);
                        }}
                      >
                        Clear conversation
                      </button>
                    </div>
                  )}
                </div>
                <span className="hd-live-dot" /> Online
              </div>
            </div>
            <div className="hg-panel-body">
              <div className="hg-chat-scroll" aria-live="polite" aria-busy={loading}>
                {messages.length === 0 &&
                  <div className="hg-greeting">Hi, I’m Shreyash’s AI assistant. Ask the questions that matter most for screening — fit, leadership, technical depth, impact, or logistics.</div>}
                {messages.map((m, i) => (
                  <div key={i} className={`hg-msg hg-msg-${m.role}`}>
                    {m.content}
                    {m.role === "assistant" && i === messages.length - 1 && speaking && (
                      <Waveform active bars={14} />
                    )}
                    {m.resumeProposal && (
                      <div className="hg-resume-confirm">
                        {!m.resumeSendStatus && (
                          <>
                            <p className="hg-resume-confirm-text">
                              Send my resume ({m.resumeProposal.variant}) to {m.resumeProposal.email}?
                            </p>
                            <div className="hg-resume-confirm-actions">
                              <button
                                type="button"
                                className="hg-resume-confirm-send"
                                onClick={() => confirmSendResume(i, m.resumeProposal)}
                              >
                                Send
                              </button>
                              <button
                                type="button"
                                className="hg-resume-confirm-cancel"
                                onClick={() => cancelSendResume(i)}
                              >
                                Cancel
                              </button>
                            </div>
                          </>
                        )}
                        {m.resumeSendStatus === "sending" && <p className="hg-resume-confirm-text">Sending…</p>}
                        {m.resumeSendStatus === "sent" && (
                          <p className="hg-resume-confirm-text">Sent to {m.resumeProposal.email}.</p>
                        )}
                        {m.resumeSendStatus === "error" && (
                          <p className="hg-resume-confirm-text hg-resume-confirm-error">{m.resumeSendError}</p>
                        )}
                        {m.resumeSendStatus === "cancelled" && <p className="hg-resume-confirm-text">Cancelled.</p>}
                      </div>
                    )}
                  </div>
                ))}
                {loading && <div className="hg-msg hg-msg-assistant hg-typing">Thinking…</div>}
                <div className={`hg-suggestions ${messages.length === 0 ? "hg-suggestions-first" : ""}`}>
                  {ASSISTANT_SUGGESTIONS.map((s) => (
                    <button
                      className="hg-suggestion"
                      key={s.label}
                      onClick={() => ask(s.label)}
                      type="button"
                      disabled={loading}
                    >
                      <span className="hg-suggestion-icon">{s.icon}</span>
                      {s.label}
                    </button>
                  ))}
                </div>
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
              {listening && (
                <div className="hg-listening-bar" role="status">
                  <span className="hg-listening-mic">
                    <BsMicFill />
                  </span>
                  <span className="hg-listening-label">Listening…</span>
                  <Waveform active bars={22} />
                  <span className="hg-listening-timer">{formatTimer(listenSeconds)}</span>
                </div>
              )}
            </div>
          </div>
        </div>

        <div className="hg-center">
          <div className="hg-photo-slot">
            <img src={heroScreen} alt="Shreyash Gondane workspace dashboard" className="hg-photo-img" />
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
