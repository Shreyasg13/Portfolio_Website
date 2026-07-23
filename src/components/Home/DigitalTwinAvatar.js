import React, { useEffect, useRef, useState } from "react";
import Waveform from "./Waveform";

// TASK.md's Phase 3 names 7 states, but the app only ever exposes 3
// booleans (listening/loading/speaking) — "Searching Memory", "Reasoning"
// and "Querying Knowledge" (GOAL.md's own "AI thinking" list) are folded
// into a rotating label under one unified "thinking" state rather than
// invented as real, independently-triggerable states.
const THINKING_LABELS = ["Searching Memory", "Reasoning", "Querying Knowledge"];

const STATE_LABEL = {
  idle: "Idle",
  listening: "Listening",
  thinking: "Thinking",
  speaking: "Speaking",
  completed: "Completed",
};

// Pupils track the cursor for real (not a canned loop) — clamped to a few
// px of travel so they never leave the eye-white, in the SVG's own 100x100
// user-unit space (a CSS px transform on an SVG shape resolves in that
// local coordinate system, not the screen's), so this stays correct at
// every breakpoint without extra scaling math.
const PUPIL_TRAVEL = 2.6;

function DigitalTwinAvatar({ listening, loading, speaking, reduceMotion }) {
  const [thinkingIndex, setThinkingIndex] = useState(0);
  const [justCompleted, setJustCompleted] = useState(false);
  const [pupilOffset, setPupilOffset] = useState({ x: 0, y: 0 });
  const wasLoadingRef = useRef(false);
  const avatarRef = useRef(null);

  useEffect(() => {
    if (!loading) return undefined;
    const id = setInterval(() => {
      setThinkingIndex((i) => (i + 1) % THINKING_LABELS.length);
    }, 1400);
    return () => clearInterval(id);
  }, [loading]);

  // Brief "Completed" pulse on the loading→!loading transition, in place
  // of a real backend-provided completion event.
  useEffect(() => {
    const wasLoading = wasLoadingRef.current;
    wasLoadingRef.current = loading;
    if (wasLoading && !loading) {
      setJustCompleted(true);
      const id = setTimeout(() => setJustCompleted(false), 1200);
      return () => clearTimeout(id);
    }
    return undefined;
  }, [loading]);

  useEffect(() => {
    if (reduceMotion) return undefined;
    function onMove(e) {
      const el = avatarRef.current;
      if (!el) return;
      const rect = el.getBoundingClientRect();
      const dx = e.clientX - (rect.left + rect.width / 2);
      const dy = e.clientY - (rect.top + rect.height / 2);
      const dist = Math.hypot(dx, dy) || 1;
      const travel = Math.min(dist, PUPIL_TRAVEL);
      setPupilOffset({ x: (dx / dist) * travel, y: (dy / dist) * travel });
    }
    document.addEventListener("mousemove", onMove);
    return () => document.removeEventListener("mousemove", onMove);
  }, [reduceMotion]);

  let state = "idle";
  if (speaking) state = "speaking";
  else if (listening) state = "listening";
  else if (loading) state = "thinking";
  else if (justCompleted) state = "completed";

  const label = state === "thinking" ? THINKING_LABELS[thinkingIndex] : STATE_LABEL[state];
  const pupilStyle = { transform: `translate(${pupilOffset.x}px, ${pupilOffset.y}px)` };

  return (
    <div className={`dt-avatar dt-avatar-${state}`} ref={avatarRef} aria-hidden="true">
      <div className={`dt-ring dt-ring-${state}`} />
      <svg className="dt-face" viewBox="0 0 100 100">
        <circle className="dt-face-bg" cx="50" cy="50" r="46" />
        <g className="dt-eyes">
          <g transform="translate(34,44)">
            <circle className="dt-eye-white" r="7" />
            <circle className="dt-pupil" r="3.2" style={pupilStyle} />
          </g>
          <g transform="translate(66,44)">
            <circle className="dt-eye-white" r="7" />
            <circle className="dt-pupil" r="3.2" style={pupilStyle} />
          </g>
        </g>
        <path className={`dt-mouth ${speaking ? "dt-mouth-speaking" : ""}`} d="M36 66 Q50 74 64 66" />
      </svg>
      {speaking && <Waveform active bars={10} />}
      <div className="dt-label">
        <span className={`hd-live-dot dt-label-dot dt-label-dot-${state}`} />
        {label}
      </div>
    </div>
  );
}

export default DigitalTwinAvatar;
