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
            Hi Everyone, I am <span className="purple">Shreyash Gondane </span>
            from <span className="purple"> Jersey City, NJ.</span>
            <div style={{ padding: 20, textAlign: "Left", fontSize: 14 }}>
              <Type1 />
            </div>
            Platform engineer with <b>4+ years</b> of compounded scope — shipping foundational platform primitives in{" "}
            <span className="purple">MCP & A2A connectivity</span>,{" "}
            <span className="purple">Auth & Identity</span>, and{" "}
            <span className="purple">multi-cloud API infrastructure</span>.
            <br />
            <br />
            Apart from engineering, some other activities that I love to do!
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
            "Build platforms others depend on daily — that is the highest form of engineering impact."{" "}
          </p>
          <footer className="blockquote-footer">Shreyash</footer>
        </blockquote>
      </Card.Body>
    </Card>
  );
}

export default AboutCard;
