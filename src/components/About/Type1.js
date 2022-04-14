import React from "react";
import Typewriter from "typewriter-effect";

function Type() {
  return (
    <Typewriter
      options={{
        strings: [
          " Computer Engineering Grad At NYU",
          
          "Former Software Developer of TCS",
        ],
        autoStart: true,
        loop: true,
        deleteSpeed: 50,
      }}
    />
    
  );
}

export default Type;
