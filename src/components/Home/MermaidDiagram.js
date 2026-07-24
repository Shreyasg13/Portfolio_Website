import React, { useEffect, useRef, useState } from "react";
import mermaid from "mermaid";

let initialized = false;
function ensureInit() {
  if (initialized) return;
  mermaid.initialize({ startOnLoad: false, theme: "dark", securityLevel: "strict" });
  initialized = true;
}

let idCounter = 0;

// Only mounts once react-markdown has a complete ```mermaid fenced block —
// while the typewriter reveal (AssistantMessage.js) is still mid-block,
// react-markdown renders the partial text as a plain unclosed code block
// instead, so mermaid.render always gets a full diagram definition.
function MermaidDiagram({ chart }) {
  const containerRef = useRef(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    ensureInit();
    let cancelled = false;
    const id = `mmd-${++idCounter}`;
    mermaid
      .render(id, chart)
      .then(({ svg }) => {
        if (!cancelled && containerRef.current) {
          containerRef.current.innerHTML = svg;
        }
      })
      .catch((err) => {
        if (!cancelled) setError(err?.message || "Diagram failed to render");
      });
    return () => {
      cancelled = true;
    };
  }, [chart]);

  if (error) {
    return <pre className="hg-md-mermaid-error">{chart}</pre>;
  }
  return <div className="hg-md-mermaid" ref={containerRef} aria-label="Diagram" />;
}

export default MermaidDiagram;
