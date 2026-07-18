import React from "react";
import { Col, Row } from "react-bootstrap";
import { DiPython, DiJava, DiReact } from "react-icons/di";
import {
  SiTypescript,
  SiNodedotjs,
  SiGo,
  SiPostgresql,
  SiRedis,
  SiApachekafka,
  SiDocker,
  SiKubernetes,
  SiTerraform,
  SiAmazonaws,
  SiPrometheus,
  SiGrafana,
  SiAuth0,
  SiMysql,
  SiOpensearch,
  SiCloudflare,
  SiFastapi,
  SiIstio,
} from "react-icons/si";

const skillBar = [
  {
    category: "Languages",
    items: "Python · Go/Echo · TypeScript · Java 11 · Node.js · SQL · Bash · Rust",
  },
  {
    category: "LLM Inference",
    items: "vLLM (Qwen3-32B INT4 AWQ · Qwen3-VL · DeepSeek-R1) · AWS Bedrock (Claude · Llama · Titan) · hybrid private/public routing · quantization · Langfuse",
  },
  {
    category: "Agentic AI & MCP",
    items: "MCP server+client · A2A Protocol · LangGraph (HITL) · LangChain · RAG (Milvus · pgvector · OpenSearch) · semantic+deterministic caching",
  },
  {
    category: "Identity & Security",
    items: "Multi-tenant IdP (Go/Echo) · JWT · SAML 2.0+JIT · OAuth2/OIDC · Cognito M2M · MFA · SSO · RBAC · PII/PHI masking · KMS/PGP · zero CVEs",
  },
  {
    category: "Cloud & Platform",
    items: "AWS (EKS Auto Mode · Lambda · ALB · S3 · DynamoDB · MemoryDB · Aurora · KMS · SQS FIFO · Bedrock · CloudFront) · Karpenter · KEDA · Istio mTLS · Helm · Cloudflare Workers",
  },
  {
    category: "Compliance",
    items: "FINRA · SOC-2 · SEC 17a-4 · HIPAA-adjacent PHI · FedRAMP-adjacent · immutable S3 audit · IAM least-privilege",
  },
];

const icons = [
  { label: "Python", icon: <DiPython /> },
  { label: "Go / Echo", icon: <SiGo /> },
  { label: "TypeScript", icon: <SiTypescript /> },
  { label: "Java 11", icon: <DiJava /> },
  { label: "Node.js", icon: <SiNodedotjs /> },
  { label: "FastAPI", icon: <SiFastapi /> },
  { label: "AWS", icon: <SiAmazonaws /> },
  { label: "Docker", icon: <SiDocker /> },
  { label: "Kubernetes", icon: <SiKubernetes /> },
  { label: "Istio", icon: <SiIstio /> },
  { label: "Terraform", icon: <SiTerraform /> },
  { label: "PostgreSQL", icon: <SiPostgresql /> },
  { label: "Redis / Valkey", icon: <SiRedis /> },
  { label: "Kafka", icon: <SiApachekafka /> },
  { label: "OpenSearch", icon: <SiOpensearch /> },
  { label: "Prometheus", icon: <SiPrometheus /> },
  { label: "Grafana", icon: <SiGrafana /> },
  { label: "Auth0 / Okta", icon: <SiAuth0 /> },
  { label: "Cloudflare", icon: <SiCloudflare /> },
  { label: "MySQL / SQL", icon: <SiMysql /> },
  { label: "React", icon: <DiReact /> },
];

function Techstack() {
  return (
    <>
      <Row style={{ justifyContent: "center", paddingBottom: "20px" }}>
        <Col md={12}>
          <div
            style={{
              background: "rgba(199, 112, 240, 0.05)",
              border: "1px solid rgba(199, 112, 240, 0.2)",
              borderRadius: "12px",
              padding: "20px 24px",
            }}
          >
            {skillBar.map((s) => (
              <p key={s.category} style={{ margin: "6px 0", fontSize: "0.88em", color: "#c2c2d2" }}>
                <b style={{ color: "#c770f0" }}>{s.category}:</b>{" "}
                <span>{s.items}</span>
              </p>
            ))}
          </div>
        </Col>
      </Row>
      <Row style={{ justifyContent: "center", paddingBottom: "50px", paddingTop: "20px" }}>
        {icons.map((s) => (
          <Col key={s.label} xs={4} md={2} className="tech-icons">
            <h4>{s.label}</h4>
            {s.icon}
          </Col>
        ))}
      </Row>
    </>
  );
}

export default Techstack;
