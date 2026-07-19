import React from "react";
import { BsChatDotsFill, BsCpu, BsServer, BsShieldCheck, BsCheckCircleFill } from "react-icons/bs";

const FEED = [
  { icon: <BsChatDotsFill />, label: "Processed conversation batch", sub: "Sentiment + intent analysis", time: "2m ago" },
  { icon: <BsCpu />, label: "LLM Inference Request", sub: "Qwen3-32B", time: "4m ago" },
  { icon: <BsServer />, label: "MCP Tool Call Executed", sub: "RAG Search", time: "5m ago" },
  { icon: <BsShieldCheck />, label: "User Authentication (SSO)", sub: "Success", time: "7m ago" },
  { icon: <BsCheckCircleFill />, label: "Deployment Completed", sub: "AI Orchestrator v2.4.1", time: "12m ago" },
];

function ActivityFeed() {
  return (
    <div className="af-panel hg-glass">
      <div className="hg-panel-header">
        Activity Feed
        <span className="af-live" style={{ marginLeft: "auto" }}>
          <span className="hd-live-dot" /> Real-time
        </span>
      </div>
      <ul className="af-list">
        {FEED.map((f, i) => (
          <li key={i}>
            <span className="af-icon">{f.icon}</span>
            <span className="af-text">
              <span className="af-label">{f.label}</span>
              <span className="af-sub">{f.sub}</span>
            </span>
            <span className="af-time">{f.time}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default ActivityFeed;
