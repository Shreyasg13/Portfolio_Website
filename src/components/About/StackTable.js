import React from "react";

const ROWS = [
  ["LLM and agents", "RAG, MCP, LangChain, LangGraph, Langfuse, vLLM, Claude, OpenAI, Gemini, Bedrock"],
  ["Evaluation", "Harbor, Terminal-Bench, Inspect, pre-registered designs, bootstrap confidence intervals"],
  ["Cloud and infra", "AWS (EKS, Lambda, ECS Fargate, S3, Aurora, DynamoDB, SageMaker), Terraform, Docker, Kubernetes"],
  ["Data", "PostgreSQL, MySQL, Redis, DynamoDB, OpenSearch, Faiss, pgvector"],
  ["Observability and security", "Datadog, Grafana, Jaeger, Sentry, CloudWatch; OAuth 2.0, SAML SSO, RBAC, SOC 2 controls"],
];

function StackTable() {
  return (
    <div style={{ overflowX: "auto", margin: "10px auto 50px", maxWidth: 980 }}>
      <table style={{ width: "100%", borderCollapse: "collapse", color: "#e6e6ef", textAlign: "left", fontSize: "0.98em" }}>
        <thead>
          <tr>
            <th style={{ padding: "10px 14px", borderBottom: "1px solid rgba(255,255,255,0.25)", color: "#e0452a", width: "28%" }}>Area</th>
            <th style={{ padding: "10px 14px", borderBottom: "1px solid rgba(255,255,255,0.25)", color: "#e0452a" }}>Tools</th>
          </tr>
        </thead>
        <tbody>
          {ROWS.map(([area, tools]) => (
            <tr key={area}>
              <td style={{ padding: "10px 14px", borderBottom: "1px solid rgba(255,255,255,0.1)", fontWeight: 600 }}>{area}</td>
              <td style={{ padding: "10px 14px", borderBottom: "1px solid rgba(255,255,255,0.1)" }}>{tools}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default StackTable;
