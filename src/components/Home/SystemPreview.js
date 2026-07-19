import React from "react";

const PREVIEW_CONTENT = {
  assistant: ["Intent routed", "RAG context loaded", "Response ready"],
  network: ["Gateway", "Tools", "Resources"],
  inference: ["Qwen3-32B", "Bedrock", "p95 284ms"],
  identity: ["Sign in", "Email / SSO", "Authenticate"],
  analytics: ["Requests", "Latency", "Cost / token"],
};

function SystemPreview({ type, icon }) {
  const rows = PREVIEW_CONTENT[type] || PREVIEW_CONTENT.assistant;

  return (
    <div className={`system-preview system-preview-${type}`} aria-hidden="true">
      <div className="system-preview-window">
        <span /><span /><span />
        <b>{type === "identity" ? "Identity Provider" : "Platform Console"}</b>
      </div>
      {type === "analytics" ? (
        <svg className="system-preview-chart" viewBox="0 0 220 72" preserveAspectRatio="none">
          <path d="M0 60 L18 46 L36 53 L54 25 L72 40 L90 33 L108 45 L126 12 L144 30 L162 23 L180 42 L198 18 L220 28" />
          <path className="system-preview-area" d="M0 60 L18 46 L36 53 L54 25 L72 40 L90 33 L108 45 L126 12 L144 30 L162 23 L180 42 L198 18 L220 28 V72 H0Z" />
        </svg>
      ) : type === "network" ? (
        <div className="system-preview-network">
          <i /><i /><i /><i /><em /><em /><em />
        </div>
      ) : type === "identity" ? (
        <div className="system-preview-login"><span>{icon}</span><i /><i /><b>Login</b></div>
      ) : (
        <div className="system-preview-rows">
          {rows.map((row, index) => <div key={row}><i className={`preview-dot-${index}`} /><span>{row}</span><b /></div>)}
        </div>
      )}
      <div className="system-preview-footer"><span>{icon}</span><i /><i /></div>
    </div>
  );
}

export default SystemPreview;
