import React from "react";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import { BiLinkExternal } from "react-icons/bi";

const categoryMeta = {
  "EMC AI Core":           { tag: "AI Platform",        gradient: "linear-gradient(135deg,#6a0dad,#c770f0)" },
  "EMC-Auth-Server":       { tag: "Auth & Identity",    gradient: "linear-gradient(135deg,#7b1fa2,#e040fb)" },
  "PDFfillr.ai":           { tag: "MCP & Agentic",      gradient: "linear-gradient(135deg,#4a148c,#ab47bc)" },
  "Revi AI":               { tag: "Agentic AI",         gradient: "linear-gradient(135deg,#1565c0,#42a5f5)" },
  "Scale AI LLM Engine":   { tag: "OSS · LLM Infra",   gradient: "linear-gradient(135deg,#1b5e20,#66bb6a)" },
  "Multi-Agent Trading":   { tag: "Multi-Agent AI",     gradient: "linear-gradient(135deg,#e65100,#ffa726)" },
  "Axiom Agentic":         { tag: "AI Orchestration",   gradient: "linear-gradient(135deg,#006064,#26c6da)" },
  "Sci Discovery":         { tag: "Cloud IaC",          gradient: "linear-gradient(135deg,#37474f,#90a4ae)" },
};

function getCategory(title) {
  for (const key of Object.keys(categoryMeta)) {
    if (title.includes(key)) return categoryMeta[key];
  }
  return { tag: "Project", gradient: "linear-gradient(135deg,#37474f,#90a4ae)" };
}

function ProjectCards(props) {
  const meta = getCategory(props.title);

  return (
    <Card className="project-card-view">
      <div
        className="project-card-header"
        style={{ background: meta.gradient }}
      >
        <img
          src={props.imgPath}
          alt={props.title}
          className="project-card-img"
        />
        <span className="project-card-tag">{meta.tag}</span>
      </div>
      <Card.Body>
        <Card.Title style={{ fontSize: "1em", fontWeight: 700 }}>
          {props.title}
        </Card.Title>
        <Card.Text style={{ textAlign: "justify", fontSize: "0.85em" }}>
          {props.description}
        </Card.Text>
        {props.link && (
          <Button variant="primary" href={props.link} target="_blank">
            <BiLinkExternal /> &nbsp;
            {props.isBlog ? "View Blog" : "View Project"}
          </Button>
        )}
      </Card.Body>
    </Card>
  );
}

export default ProjectCards;
