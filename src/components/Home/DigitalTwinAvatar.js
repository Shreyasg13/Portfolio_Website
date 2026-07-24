import React, { useEffect, useRef, useState } from "react";
import Waveform from "./Waveform";
import idlePhoto from "../../Assets/avatar-states/idle.png";
import listeningPhoto from "../../Assets/avatar-states/listening.png";
import thinkingPhoto from "../../Assets/avatar-states/thinking.png";
import reasoningPhoto from "../../Assets/avatar-states/reasoning.png";
import speakingPhoto from "../../Assets/avatar-states/speaking.png";
import completePhoto from "../../Assets/avatar-states/complete.png";

// TASK.md's Phase 3 names 7 states, but the app only ever exposes 3
// booleans (listening/loading/speaking) — "Searching Memory", "Reasoning"
// and "Querying Knowledge" (GOAL.md's own "AI thinking" list) are folded
// into a rotating label under one "thinking" state. The "Reasoning" tick
// of that rotation swaps in the reasoning photo for a bit of variety
// while thinking, since a real image exists for it.
const THINKING_LABELS = ["Searching Memory", "Reasoning", "Querying Knowledge"];
const THINKING_PHOTOS = [thinkingPhoto, reasoningPhoto, thinkingPhoto];

const STATE_LABEL = {
  idle: "Idle",
  listening: "Listening",
  thinking: "Thinking",
  speaking: "Speaking",
  completed: "Completed",
};

const STATE_PHOTO = {
  idle: idlePhoto,
  listening: listeningPhoto,
  speaking: speakingPhoto,
  completed: completePhoto,
};

// Subtle whole-photo tilt toward the cursor — a real photo can't move its
// eyes like the earlier illustrated face did, so this is the equivalent
// "reacts to your presence" touch instead.
const TILT_DEG = 4;

function DigitalTwinAvatar({ listening, loading, speaking, reduceMotion }) {
  const [thinkingIndex, setThinkingIndex] = useState(0);
  const [justCompleted, setJustCompleted] = useState(false);
  const [tilt, setTilt] = useState({ x: 0, y: 0 });
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
      const dx = (e.clientX - (rect.left + rect.width / 2)) / (rect.width / 2);
      const dy = (e.clientY - (rect.top + rect.height / 2)) / (rect.height / 2);
      setTilt({ x: Math.max(-1, Math.min(1, dx)), y: Math.max(-1, Math.min(1, dy)) });
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
  const photo = state === "thinking" ? THINKING_PHOTOS[thinkingIndex] : STATE_PHOTO[state];
  const tiltStyle = reduceMotion
    ? undefined
    : { transform: `rotateY(${tilt.x * TILT_DEG}deg) rotateX(${-tilt.y * TILT_DEG}deg)` };

  return (
    <div className={`dt-avatar dt-avatar-${state}`} ref={avatarRef} aria-hidden="true">
      <div className={`dt-ring dt-ring-${state}`} />
      <div className="dt-photo-wrap" style={tiltStyle}>
        <img key={photo} src={photo} alt="" className={`dt-photo ${speaking ? "dt-photo-speaking" : ""}`} />
      </div>
      {speaking && <Waveform active bars={12} />}
      <div className="dt-label">
        <span className={`hd-live-dot dt-label-dot dt-label-dot-${state}`} />
        {label}
      </div>
    </div>
  );
}

export default DigitalTwinAvatar;
