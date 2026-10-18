import React from "react";
import Typewriter from "typewriter-effect";

function Type1() {
  return (
    <Typewriter
      options={{
        strings: [
          "Software Engineer, AI Platform Engineering · EngineersMind",
          "LLM Inference · RAG · MCP Agent Frameworks",
          "AI Agent Identity, Security & Observability",
          "Independent Research: AI Evaluation",
          "M.S. Computer Engineering, NYU",
        ],
        autoStart: true,
        loop: true,
        deleteSpeed: 50,
      }}
    />
  );
}

export default Type1;
