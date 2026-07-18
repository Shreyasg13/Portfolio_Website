import React from "react";
import Typewriter from "typewriter-effect";

function Type1() {
  return (
    <Typewriter
      options={{
        strings: [
          "Platform AI Architect — 5+ Years",
          "Principal Architect — Multi-Tenant AI Platform & pdffillr.ai",
          "Self-Hosted vLLM Inference (Qwen3-32B · DeepSeek-R1)",
          "Cloud & Scalable Infrastructure Expert",
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
