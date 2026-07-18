import React from "react";
import Typewriter from "typewriter-effect";

function Type1() {
  return (
    <Typewriter
      options={{
        strings: [
          "Platform AI Architect — 5+ Years",
          "Cloud & Scalable Infrastructure Expert",
          "System Design & Distributed Systems",
          "Lead Architect — pdffillr.ai & Revi AI",
          "M.S. Computer Science, NYU",
        ],
        autoStart: true,
        loop: true,
        deleteSpeed: 50,
      }}
    />
  );
}

export default Type1;
