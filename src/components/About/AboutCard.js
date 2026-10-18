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
            of. <b>Software Engineer, AI Platform Engineering</b> at <b>EngineersMind</b> (full-time since June 2023), leading a
            team of engineers with formal performance reviews.
            <br />
            <br />
            My work spans{" "}
            <span className="purple">LLM inference and serving</span> (vLLM, GPU autoscaling, FP8/INT4 quantization),{" "}
            <span className="purple">RAG and vector stores</span>,{" "}
            <span className="purple">MCP-based agent frameworks</span> with audited tool calls, a{" "}
            <span className="purple">multi-tenant identity provider in Go/Echo</span> with AI agent registration and
            machine-to-machine auth, and observability for LLM systems (Langfuse, Datadog, Grafana, Jaeger).
            In my own time I do independent research on AI evaluation at{" "}
            <a href="https://shreyashgondane.com" target="_blank" rel="noreferrer" className="purple">shreyashgondane.com</a>.
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
