import React from "react";

function Waveform({ active, bars = 18 }) {
  return (
    <div className={`hg-waveform ${active ? "hg-waveform-active" : ""}`} aria-hidden="true">
      {Array.from({ length: bars }).map((_, i) => (
        <span key={i} style={{ animationDelay: `${(i % 6) * 0.09}s` }} />
      ))}
    </div>
  );
}

export default Waveform;
