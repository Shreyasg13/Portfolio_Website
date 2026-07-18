import React from "react";
import Typewriter from "typewriter-effect";

function Type() {
  return (
    <Typewriter
      options={{
        strings: [
          "Platform AI Architect",
          "Self-Hosted LLM Inference Engineer",
          "Agentic AI & MCP Platform Builder",
          "Cloud & Scalable Infrastructure Architect",
          "System Design & Distributed Systems Lead",
          "Auth & Identity Platform Architect",
        ],
        autoStart: true,
        loop: true,
        deleteSpeed: 50,
      }}
    />
  );
}

export default Type;
