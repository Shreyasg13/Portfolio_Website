import React, { useState, useRef, useEffect } from "react";
import { BsChatDotsFill, BsX, BsSend } from "react-icons/bs";

const STARTERS = [
  "Is he a fit for a Staff Platform Engineer role?",
  "What's his AI / LLM infrastructure experience?",
  "Tell me about his auth & identity work.",
  "What's his experience with distributed systems?",
];

function AskShreyash() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState([
    {
      role: "assistant",
      content:
        "Hi, I'm an AI assistant grounded in Shreyash Gondane's real background. Ask me anything about his fit for a role.",
    },
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const bottomRef = useRef(null);

  useEffect(() => {
    if (open) bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, open]);

  async function ask(question) {
    if (!question.trim() || loading) return;
    setMessages((m) => [...m, { role: "user", content: question }]);
    setInput("");
    setLoading(true);
    try {
      const res = await fetch("/.netlify/functions/ask-shreyash", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ question }),
      });
      const data = await res.json();
      setMessages((m) => [
        ...m,
        { role: "assistant", content: data.answer || "No answer came back — try again?" },
      ]);
    } catch {
      setMessages((m) => [
        ...m,
        {
          role: "assistant",
          content: "Couldn't reach the AI assistant right now — please try again shortly.",
        },
      ]);
    } finally {
      setLoading(false);
    }
  }

  return (
    <>
      <button
        className={`ask-shreyash-fab ${open ? "ask-shreyash-fab-open" : ""}`}
        onClick={() => setOpen((o) => !o)}
        aria-label="Ask Shreyash AI"
      >
        {open ? (
          <BsX size={26} />
        ) : (
          <>
            <BsChatDotsFill size={20} />
            <span className="ask-shreyash-fab-label">Ask me anything</span>
          </>
        )}
      </button>

      {open && (
        <div className="ask-shreyash-panel">
          <div className="ask-shreyash-header">
            <span>Ask Shreyash — AI Assistant</span>
          </div>

          <div className="ask-shreyash-messages">
            {messages.map((m, i) => (
              <div key={i} className={`ask-shreyash-msg ask-shreyash-msg-${m.role}`}>
                {m.content}
              </div>
            ))}
            {loading && (
              <div className="ask-shreyash-msg ask-shreyash-msg-assistant ask-shreyash-typing">
                Thinking…
              </div>
            )}
            <div ref={bottomRef} />
          </div>

          {messages.length === 1 && (
            <div className="ask-shreyash-starters">
              {STARTERS.map((s) => (
                <button key={s} className="ask-shreyash-starter" onClick={() => ask(s)}>
                  {s}
                </button>
              ))}
            </div>
          )}

          <form
            className="ask-shreyash-input-row"
            onSubmit={(e) => {
              e.preventDefault();
              ask(input);
            }}
          >
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Ask about his experience, skills, fit…"
              disabled={loading}
            />
            <button type="submit" disabled={loading || !input.trim()} aria-label="Send">
              <BsSend size={16} />
            </button>
          </form>
        </div>
      )}
    </>
  );
}

export default AskShreyash;
