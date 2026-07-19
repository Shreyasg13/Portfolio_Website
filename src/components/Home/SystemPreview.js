import React from "react";
import { Bot, Boxes, Cpu, Database, LockKeyhole, Network, Send, ShieldCheck, Workflow } from "lucide-react";

function SystemPreview({ type, icon }) {
  function AssistantPreview() {
    return <div className="preview-assistant-body">
      <div className="preview-chat"><Bot /><span>Hello! I’m your AI assistant.</span></div>
      <div className="preview-chat preview-chat-user"><span>Analyze system performance</span></div>
      <div className="preview-kpis"><b><small>Conversations</small>1.2M</b><b><small>Success rate</small>98.7%</b><b><small>Response</small>1.23s</b></div>
      <svg className="preview-sparkline" viewBox="0 0 100 24"><path d="M0 22 L10 18 L18 20 L26 13 L35 17 L43 8 L52 14 L61 7 L70 12 L79 4 L88 9 L100 1" /></svg>
      <div className="preview-agent-network"><i /><i /><i /><i /><i /><em /><em /><em /><em /></div>
    </div>;
  }

  function McpPreview() {
    return <div className="preview-mcp-body">
      <span className="preview-mcp-label preview-mcp-tools"><Workflow />Tools</span><span className="preview-mcp-label preview-mcp-prompts"><Send />Prompts</span><span className="preview-mcp-label preview-mcp-resources"><Database />Resources</span>
      <span className="preview-mcp-core">MCP<small>Server</small></span>
      <span className="preview-mcp-node preview-mcp-left"><Bot /></span><span className="preview-mcp-node preview-mcp-right"><Network /></span><span className="preview-mcp-node preview-mcp-top"><Boxes /></span>
      <svg className="preview-mcp-lines" viewBox="0 0 200 74"><path d="M100 37L46 54M100 37L157 51M100 37L104 8" /></svg>
      <div className="preview-protocol"><i /> Protocol <b>MCP</b></div>
    </div>;
  }

  function InferencePreview() {
    return <div className="preview-inference-body">
      <div className="preview-pipeline"><span>Request</span><i /> <span>Router</span><i /> <b>vLLM<small>Engine</small></b><i /> <span>Response</span></div>
      <div className="preview-inference-panels"><div><small>Primary · vLLM Cluster</small><Cpu /><em /><em /><em /><strong>96% utilization</strong></div><div><small>Fallback · Bedrock</small><b className="preview-aws">aws</b><strong>34% utilization</strong></div></div>
      <div className="preview-token-bars">{Array.from({ length: 15 }, (_, index) => <i key={index} style={{ height: `${18 + (index * 13) % 45}%` }} />)}</div>
    </div>;
  }

  function IdentityPreview() {
    return <div className="preview-identity-body"><div className="preview-id-sidebar"><i /><i /><i /><i /><i /></div><div className="preview-id-login"><ShieldCheck /><b>Sign in</b><small>Enterprise SSO</small><span>Continue with SAML</span><span>Continue with OIDC</span><span>Continue with OAuth2</span><em><LockKeyhole /> MFA Verification</em></div><div className="preview-access"><small>Access Control</small><b>Admin</b><b>Developer</b><b>Analyst</b><b>Viewer</b></div></div>;
  }

  function AnalyticsPreview() {
    return <div className="preview-analytics-body"><div className="preview-analytics-kpis"><b>Requests<em>2.43M</em></b><b>Latency<em>120ms</em></b><b>Errors<em>0.02%</em></b><b>Tokens<em>8.7B</em></b></div><div className="preview-analytics-grid"><svg viewBox="0 0 100 38"><path d="M0 31 L9 22 L18 28 L27 12 L36 27 L45 6 L54 18 L63 9 L72 28 L81 14 L90 23 L100 8" /></svg><div className="preview-heatmap">{Array.from({ length: 24 }, (_, index) => <i key={index} />)}</div><svg viewBox="0 0 100 38"><path d="M0 29 L8 31 L16 19 L24 25 L32 6 L40 27 L48 14 L56 23 L64 8 L72 17 L80 5 L88 25 L100 15" /></svg></div><div className="preview-analytics-footer"><span>Traces <b>1.2M</b></span><span>Logs <b>24.5M</b></span><span>Alerts <b>12</b></span></div></div>;
  }

  return (
    <div className={`system-preview system-preview-${type}`} aria-hidden="true">
      <div className="system-preview-window">
        <span /><span /><span />
        <b>{type === "identity" ? "Identity Provider" : "Platform Console"}</b>
      </div>
      {type === "assistant" && <AssistantPreview />}
      {type === "network" && <McpPreview />}
      {type === "inference" && <InferencePreview />}
      {type === "identity" && <IdentityPreview />}
      {type === "analytics" && <AnalyticsPreview />}
      <div className="system-preview-footer"><span>{icon}</span><i /><i /></div>
    </div>
  );
}

export default SystemPreview;
