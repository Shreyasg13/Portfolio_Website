import React from "react";
import Card from "react-bootstrap/Card";
import { ImPointRight } from "react-icons/im";
import Type1 from "./Type1";

function AboutCard() {
  return (
    <Card className="quote-card-view">
      <Card.Body>
        <blockquote className="blockquote mb-0">
          <p style={{ textAlign: "justify" }}>
            Hi Everyone, I am{" "}
            <span className="purple">Shreyash Gondane</span> based in{" "}
            <span className="purple">Jersey City, NJ.</span>
            <div style={{ padding: 20, textAlign: "Left", fontSize: 14 }}>
              <Type1 />
            </div>
            I build infrastructure — the code, systems, and{" "}
            <span className="purple">LLM/AI platforms</span> that other engineers build on top
            of. <b>Platform AI Architect</b> with <b>5+ years</b> of hands-on technical work (
            <b>3,000+ commits · 700+ PRs · 10+ production repos</b>), backed by experience{" "}
            <b>leading and managing engineering teams</b>.
            <br />
            <br />
            As Principal Architect, I built a{" "}
            <span className="purple">governed multi-tenant AI platform</span> with self-hosted{" "}
            <span className="purple">vLLM (Qwen3-32B · DeepSeek-R1)</span> on GPU spot fleets, Bedrock fallback, Milvus RAG, and Langfuse LLM observability.
            I built a complete{" "}
            <span className="purple">multi-tenant IdP in Go/Echo</span> (zero CVEs, ≤5ms, 10K concurrent), and shipped{" "}
            <span className="purple">MCP + A2A agentic infrastructure</span> and LangGraph HITL systems serving{" "}
            <span className="purple">1.2M conversations/month</span> — while leading a team of 21 (4 direct reports).
            <br />
            <br />
            Beyond engineering:
          </p>
          <ul>
            <li className="about-activity">
              <ImPointRight /> Playing Chess ♛♖
            </li>
            <li className="about-activity">
              <ImPointRight /> Reading Books 📘
            </li>
            <li className="about-activity">
              <ImPointRight /> Travelling 🧭
            </li>
          </ul>
          <p style={{ color: "rgb(155 126 172)" }}>
            "Design systems others build on — ship infrastructure that multiplies every engineer around you."
          </p>
          <footer className="blockquote-footer">Shreyash Gondane</footer>
        </blockquote>
      </Card.Body>
    </Card>
  );
}

export default AboutCard;
