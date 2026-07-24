import React, { useEffect, useRef, useState } from "react";
import Waveform from "./Waveform";

// TASK.md's Phase 3 names 7 states, but the app only ever exposes 3
// booleans (listening/loading/speaking) — "Searching Memory", "Reasoning"
// and "Querying Knowledge" (GOAL.md's own "AI thinking" list) are folded
// into a rotating label under one "thinking" state.
const THINKING_LABELS = ["Searching Memory", "Reasoning", "Querying Knowledge"];

const STATE_LABEL = {
  idle: "Idle",
  listening: "Listening",
  thinking: "Thinking",
  speaking: "Speaking",
  completed: "Completed",
};

// Five discrete mouth silhouettes (closed -> max open), picked by
// amplitude tier rather than continuously morphed. Discrete paths (not a
// single scaled shape) so each tier reads as a genuinely different mouth
// shape, not just a bigger version of the same one.
const MOUTH_PATHS = [
  "M40 57.5 Q50 59 60 57.5 Q50 58.3 40 57.5 Z",
  "M41 57 Q50 60 59 57 Q50 59 41 57 Z",
  "M40 55 Q50 66 60 55 Q50 60 40 55 Z",
  "M38 54 Q50 70 62 54 Q50 61 38 54 Z",
  "M37 53 Q50 74 63 53 Q50 62 37 53 Z",
];
const MOUTH_TIER_THRESHOLDS = [0.06, 0.14, 0.24, 0.36];

const PUPIL_TRAVEL = 2.6;

function DigitalTwinAvatar({ listening, loading, speaking, reduceMotion, getSpeechLevel }) {
  const [thinkingIndex, setThinkingIndex] = useState(0);
  const [justCompleted, setJustCompleted] = useState(false);
  const [pupilOffset, setPupilOffset] = useState({ x: 0, y: 0 });
  const [mouthTier, setMouthTier] = useState(0);
  const wasLoadingRef = useRef(false);
  const avatarRef = useRef(null);
  const mouthTierRef = useRef(0);
  const rafRef = useRef(null);
  const fallbackPhaseRef = useRef(0);

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

  // The real speaking-mouth loop: while `speaking`, read the true TTS
  // audio volume each frame (getSpeechLevel, from useSpeechAmplitude —
  // only populated on the primary ElevenLabs/<audio> path) and bucket it
  // into one of 5 mouth-open tiers. The SpeechSynthesis fallback in
  // HeroGlass.js's speakWithBrowserVoice() has no accessible audio
  // stream to analyze, so getSpeechLevel reads ~0 there — this falls
  // back to a simulated open/close oscillation instead, so the mouth
  // still visibly moves, clearly an approximation rather than real data.
  useEffect(() => {
    if (!speaking || reduceMotion) {
      mouthTierRef.current = 0;
      setMouthTier(0);
      return undefined;
    }
    let cancelled = false;
    let sawRealLevel = false;
    function tick() {
      if (cancelled) return;
      const level = getSpeechLevel ? getSpeechLevel() : 0;
      let tier;
      if (level > 0.01) {
        sawRealLevel = true;
        tier = MOUTH_TIER_THRESHOLDS.filter((t) => level >= t).length;
      } else if (sawRealLevel) {
        // Real audio is attached but momentarily quiet (a natural pause
        // between words) — hold near-closed rather than switching over
        // to the simulated pattern.
        tier = 0;
      } else {
        fallbackPhaseRef.current += 0.35;
        tier = Math.round((Math.sin(fallbackPhaseRef.current) + 1) * 1.6);
      }
      if (tier !== mouthTierRef.current) {
        mouthTierRef.current = tier;
        setMouthTier(tier);
      }
      rafRef.current = requestAnimationFrame(tick);
    }
    tick();
    return () => {
      cancelled = true;
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, [speaking, reduceMotion, getSpeechLevel]);

  let state = "idle";
  if (speaking) state = "speaking";
  else if (listening) state = "listening";
  else if (loading) state = "thinking";
  else if (justCompleted) state = "completed";

  const label = state === "thinking" ? THINKING_LABELS[thinkingIndex] : STATE_LABEL[state];
  const pupilStyle = { transform: `translate(${pupilOffset.x}px, ${pupilOffset.y}px)` };
  const browRaise = state === "listening" || state === "thinking" ? -2 : 0;

  return (
    <div className={`dt-avatar dt-avatar-${state}`} ref={avatarRef} aria-hidden="true">
      <div className={`dt-ring dt-ring-${state}`} />
      <svg className="dt-character" viewBox="0 0 100 100">
        <path className="dt-body" d="M12 100 Q12 74 30 70 L70 70 Q88 74 88 100 Z" />
        <rect className="dt-neck" x="41" y="56" width="18" height="18" rx="5" />
        <ellipse className="dt-head" cx="50" cy="40" rx="22" ry="25" />
        <path className="dt-beard" d="M30 42 Q30 60 50 63 Q70 60 70 42 Q70 55 50 58 Q30 55 30 42 Z" />
        <path className="dt-hair" d="M27 36 Q23 10 50 9 Q77 10 73 36 Q73 20 50 18 Q27 20 27 36 Z" />
        <path className="dt-hair-side" d="M27 30 Q24 42 29 48 L31 34 Z" />
        <path className="dt-hair-side" d="M73 30 Q76 42 71 48 L69 34 Z" />
        <g className="dt-brows">
          <rect className="dt-brow" x="34" y={31 + browRaise} width="12" height="3" rx="1.5" transform={`rotate(-6 40 ${32 + browRaise})`} />
          <rect className="dt-brow" x="54" y={31 + browRaise} width="12" height="3" rx="1.5" transform={`rotate(6 60 ${32 + browRaise})`} />
        </g>
        <g className="dt-eyes">
          <g transform="translate(40,40)">
            <ellipse className="dt-eye-white" rx="6" ry="5" />
            <circle className="dt-pupil" r="2.8" style={pupilStyle} />
          </g>
          <g transform="translate(60,40)">
            <ellipse className="dt-eye-white" rx="6" ry="5" />
            <circle className="dt-pupil" r="2.8" style={pupilStyle} />
          </g>
        </g>
        <path className="dt-mouth" d={MOUTH_PATHS[mouthTier]} />
      </svg>
      {speaking && <Waveform active bars={12} />}
      <div className="dt-label">
        <span className={`hd-live-dot dt-label-dot dt-label-dot-${state}`} />
        {label}
      </div>
    </div>
  );
}

export default DigitalTwinAvatar;
