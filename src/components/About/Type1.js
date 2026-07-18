import React from "react";
import Typewriter from "typewriter-effect";

function Type1() {
  return (
    <Typewriter
      options={{
        strings: [
          "Staff Platform Engineer at Engineersmind",
          "Lead Platform Architect — pdffillr.ai",
          "M.S. Computer Science, NYU",
          "Former System Engineer at TCS",
        ],
        autoStart: true,
        loop: true,
        deleteSpeed: 50,
      }}
    />
  );
}

export default Type1;
