import React from "react";
import Typewriter from "typewriter-effect";

function Type() {
  return (
    <Typewriter
      options={{
        strings: [
          "Platform AI Architect",
          "Cloud & Scalable Infrastructure Engineer",
          "System Design & Distributed Systems Lead",
          "Agentic AI & MCP Platform Builder",
          "Auth & Identity Platform Architect",
          "Multi-Cloud Infrastructure Expert",
        ],
        autoStart: true,
        loop: true,
        deleteSpeed: 50,
      }}
    />
  );
}

export default Type;
