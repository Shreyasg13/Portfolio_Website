import React, { useEffect, useRef, useState } from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { oneDark } from "react-syntax-highlighter/dist/esm/styles/prism";
import MermaidDiagram from "./MermaidDiagram";

// Client-side typewriter reveal of the answer ask-shreyash.mjs already
// returned in full — not real network token streaming (see the phase
// plan: that would mean re-architecting the function's SEND_RESUME
// marker extraction, which needs the complete answer text, on the one
// function mediating live recruiter conversations). Feeding a growing
// slice into react-markdown each tick is the same technique most
// markdown-streaming chat UIs use; markdown degrades gracefully on a
// mid-token slice (an unclosed code fence just renders as a plain
// paragraph until it closes).
const CHARS_PER_TICK = 3;
const TICK_MS = 18;

function CodeBlock({ inline, className, children }) {
  const match = /language-(\w+)/.exec(className || "");
  const lang = match?.[1];
  const text = String(children).replace(/\n$/, "");

  if (!inline && lang === "mermaid") {
    return <MermaidDiagram chart={text} />;
  }
  if (inline) {
    return <code className="hg-md-inline-code">{children}</code>;
  }
  return (
    <SyntaxHighlighter language={lang} style={oneDark} customStyle={{ borderRadius: 8, fontSize: "0.82em", margin: "8px 0" }}>
      {text}
    </SyntaxHighlighter>
  );
}

const MD_COMPONENTS = { code: CodeBlock };

function AssistantMessage({ content, reduceMotion, onRevealDone }) {
  const [revealedLength, setRevealedLength] = useState(reduceMotion ? content.length : 0);
  const doneRef = useRef(false);

  useEffect(() => {
    if (reduceMotion) {
      if (!doneRef.current) {
        doneRef.current = true;
        onRevealDone?.();
      }
      return undefined;
    }
    if (revealedLength >= content.length) {
      if (!doneRef.current) {
        doneRef.current = true;
        onRevealDone?.();
      }
      return undefined;
    }
    const id = setTimeout(() => setRevealedLength((n) => Math.min(content.length, n + CHARS_PER_TICK)), TICK_MS);
    return () => clearTimeout(id);
  }, [revealedLength, content, reduceMotion, onRevealDone]);

  const visible = reduceMotion ? content : content.slice(0, revealedLength);
  const done = reduceMotion || revealedLength >= content.length;

  return (
    <span className="hg-md">
      <ReactMarkdown remarkPlugins={[remarkGfm]} components={MD_COMPONENTS}>
        {visible}
      </ReactMarkdown>
      {!done && <span className="hg-md-caret" aria-hidden="true" />}
    </span>
  );
}

export default AssistantMessage;
