import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import { SiOpenai, SiAmazonaws, SiAuth0, SiApachekafka } from "react-icons/si";
import { GiBrain } from "react-icons/gi";
import { MdOutlineDesignServices } from "react-icons/md";
import { AiFillCloud } from "react-icons/ai";
import { FaShieldAlt } from "react-icons/fa";

const pillars = [
  {
    icon: <GiBrain size={40} />,
    title: "Agentic AI & LLM Inference",
    color: "#c770f0",
    points: [
      "Self-hosted vLLM: Qwen3-32B INT4 AWQ · Qwen3-VL · DeepSeek-R1",
      "MCP server+client · A2A Protocol orchestration",
      "LangGraph HITL agent graphs · LangChain",
      "RAG: Milvus · pgvector · OpenSearch",
      "AWS Bedrock (Claude · Llama · Titan) fallback routing",
      "Langfuse LLM observability · RHFL fine-tuning",
    ],
  },
  {
    icon: <AiFillCloud size={40} />,
    title: "Cloud & Scalable Infrastructure",
    color: "#4fc3f7",
    points: [
      "AWS EKS Auto Mode · Karpenter · KEDA autoscaling",
      "Multi-cloud Terraform: AWS / GCP / Azure",
      "Kubernetes · Istio mTLS · Helm · Docker (distroless)",
      "Karpenter spot-first node provisioning",
      "GitHub Actions · Jenkins CI/CD pipelines",
      "SDKs on PyPI & npm · OpenAPI 3.1",
    ],
  },
  {
    icon: <FaShieldAlt size={40} />,
    title: "Auth & Identity",
    color: "#ff7043",
    points: [
      "Multi-tenant IdP from scratch in Go/Echo (Auth0-equivalent)",
      "JWT · SAML 2.0+JIT · OAuth2/OIDC · Cognito M2M",
      "MFA · SSO · RBAC · PostgreSQL RLS",
      "AI agent security registry + anomaly detection",
      "Edge JWT on Cloudflare Workers (HS256/RS256)",
      "Zero CVEs · 2 external pen tests passed · HIPAA/SOC-2/FINRA",
    ],
  },
  {
    icon: <MdOutlineDesignServices size={40} />,
    title: "System Design & Distributed Systems",
    color: "#66bb6a",
    points: [
      "Monolith → 6 microservices (EKS, Docker, Nx)",
      "Kafka · SQS FIFO · SNS · EventBridge",
      "Exactly-once event processing · 18K events/hr",
      "OTel → Jaeger tracing · Prometheus · Grafana Tempo",
      "SLO/SLA design · k6 load testing",
      "PostgreSQL (RLS · pgvector · Kysely) · Milvus · Valkey/MemoryDB",
    ],
  },
];

function ExpertisePillars() {
  return (
    <Container fluid style={{ paddingBottom: "50px" }}>
      <h1 className="project-heading" style={{ paddingBottom: "30px" }}>
        Expertise <strong className="purple">Pillars</strong>
      </h1>
      <Row style={{ justifyContent: "center" }}>
        {pillars.map((p) => (
          <Col key={p.title} md={6} lg={3} style={{ paddingBottom: "30px" }}>
            <div className="pillar-card" style={{ borderTop: `3px solid ${p.color}` }}>
              <div className="pillar-icon" style={{ color: p.color }}>
                {p.icon}
              </div>
              <h5 className="pillar-title">{p.title}</h5>
              <ul className="pillar-list">
                {p.points.map((pt, i) => (
                  <li key={i}>{pt}</li>
                ))}
              </ul>
            </div>
          </Col>
        ))}
      </Row>
    </Container>
  );
}

export default ExpertisePillars;
