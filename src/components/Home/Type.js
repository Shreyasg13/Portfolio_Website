import React from "react";
import Typewriter from "typewriter-effect";

function Type() {
  return (
    <Typewriter
      options={{
        strings: [
          "Staff Platform Engineer",
          "MCP & A2A Connectivity Architect",
          "Auth & Identity Platform Lead",
          "AI Infrastructure Engineer",
          "Distributed Systems Engineer",
        ],
        autoStart: true,
        loop: true,
        deleteSpeed: 50,
      }}
    />
  );
}

export default Type;
