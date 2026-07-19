import React, { useRef, useState } from "react";
import { BsChevronLeft, BsChevronRight, BsRobot, BsServer, BsCpu, BsShieldCheck, BsGraphUp } from "react-icons/bs";

const SYSTEMS = [
  {
    icon: <BsRobot />,
    title: "AI Assistant Platform",
    desc: "Multi-tenant agentic platform serving 4 product verticals",
  },
  {
    icon: <BsServer />,
    title: "MCP Server",
    desc: "Tools, resources & prompts for agentic orchestration",
  },
  {
    icon: <BsCpu />,
    title: "LLM Inference Hub",
    desc: "Self-hosted vLLM + Bedrock hybrid routing",
  },
  {
    icon: <BsShieldCheck />,
    title: "Identity Provider",
    desc: "Auth0-equivalent IdP with SAML, OIDC, RBAC, MFA",
  },
  {
    icon: <BsGraphUp />,
    title: "Analytics & Observability",
    desc: "Real-time metrics, traces, costs & quality monitoring",
  },
];

function LiveSystems() {
  const trackRef = useRef(null);
  const [active, setActive] = useState(0);

  function scrollBy(dir) {
    const track = trackRef.current;
    if (!track) return;
    const cardWidth = track.firstChild?.offsetWidth || 260;
    track.scrollBy({ left: dir * (cardWidth + 16), behavior: "smooth" });
    setActive((a) => Math.min(Math.max(a + dir, 0), SYSTEMS.length - 1));
  }

  return (
    <div className="ls-section">
      <div className="ls-header">
        <h2 className="ls-heading">Live Systems &amp; Platforms</h2>
        <div className="ls-arrows">
          <button type="button" onClick={() => scrollBy(-1)} aria-label="Previous">
            <BsChevronLeft />
          </button>
          <button type="button" onClick={() => scrollBy(1)} aria-label="Next">
            <BsChevronRight />
          </button>
        </div>
      </div>

      <div className="ls-track" ref={trackRef}>
        {SYSTEMS.map((s) => (
          <div className="ls-card hg-glass" key={s.title}>
            <div className="ls-card-mock">
              <span className="ls-card-icon">{s.icon}</span>
            </div>
            <div className="ls-card-body">
              <div className="ls-card-title-row">
                <span className="ls-card-title">{s.title}</span>
                <span className="ls-card-live">
                  <span className="hd-live-dot" /> Live
                </span>
              </div>
              <div className="ls-card-desc">{s.desc}</div>
            </div>
          </div>
        ))}
      </div>

      <div className="ls-dots">
        {SYSTEMS.map((_, i) => (
          <span key={i} className={`ls-dot ${i === active ? "ls-dot-active" : ""}`} />
        ))}
      </div>
    </div>
  );
}

export default LiveSystems;
