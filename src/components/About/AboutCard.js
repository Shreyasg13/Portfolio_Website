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
            <b>Platform AI Architect</b> with <b>5+ years</b> shipping foundational platform primitives across{" "}
            <span className="purple">Agentic AI</span>,{" "}
            <span className="purple">Cloud Infrastructure (AWS/GCP/Azure)</span>,{" "}
            <span className="purple">System Design & Distributed Systems</span>, and{" "}
            <span className="purple">Auth & Identity</span>.
            <br />
            <br />
            Built a complete <b>multi-tenant Identity Provider in Go/Echo</b> (Auth0-equivalent), deployed <b>MCP & A2A agentic connectivity</b> in production, authored <b>multi-cloud Terraform</b> modules, and led a team of 21 engineers. <b>1,519+ commits · 543+ PRs · 2 Springer publications.</b>
            <br />
            <br />
            Beyond engineering, I enjoy:
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
