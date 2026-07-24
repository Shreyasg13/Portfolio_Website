import React, { useEffect, useRef, useState } from "react";
import "./RadialWaveform.css";

const BAR_COUNT = 64;
const RING_RADIUS = 110;
const VIEW_SIZE = (RING_RADIUS + 40) * 2;
const CENTER = VIEW_SIZE / 2;

// Deterministic pseudo-random per-bar offset, seeded by index — keeps the
// ring stable across renders instead of re-randomizing every frame.
function seededOffset(i) {
  const x = Math.sin(i * 12.9898) * 43758.5453;
  return x - Math.floor(x); // fractional part, in [0, 1)
}

const BAR_SEEDS = Array.from({ length: BAR_COUNT }, (_, i) => seededOffset(i));

// Violet -> cyan -> amber across the ring, i in [0, BAR_COUNT).
function hueForIndex(i) {
  const t = i / BAR_COUNT; // 0..1
  if (t < 0.5) {
    const local = t / 0.5; // 0..1 across first half
    return 265 + (190 - 265) * local; // violet -> cyan
  }
  const local = (t - 0.5) / 0.5; // 0..1 across second half
  return 190 + (45 - 190) * local; // cyan -> amber
}

function formatElapsed(totalSeconds) {
  const s = Math.max(0, Math.floor(totalSeconds || 0));
  const mm = String(Math.floor(s / 60)).padStart(2, "0");
  const ss = String(s % 60).padStart(2, "0");
  return `${mm}:${ss}`;
}

function MicIcon() {
  return (
    <svg viewBox="0 0 24 24" className="radial-waveform-mic-icon" aria-hidden="true">
      <rect x="9" y="2" width="6" height="12" rx="3" fill="currentColor" />
      <path
        d="M5 11a7 7 0 0 0 14 0"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
      />
      <path d="M12 18v3" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
    </svg>
  );
}

function RadialWaveform({
  active = false,
  amplitude = 0,
  label = "Listening…",
  elapsedSeconds = 0,
  onMicClick,
  reduceMotion = false,
}) {
  const [smoothAmp, setSmoothAmp] = useState(0);
  const rafRef = useRef(null);
  const targetRef = useRef(0);

  targetRef.current = active ? amplitude : 0;

  useEffect(() => {
    if (reduceMotion) {
      // Fixed nominal amplitude, no per-frame lerp loop needed.
      setSmoothAmp(active ? 0.4 : 0);
      return undefined;
    }

    const tick = () => {
      setSmoothAmp((prev) => prev + (targetRef.current - prev) * 0.2);
      rafRef.current = requestAnimationFrame(tick);
    };
    rafRef.current = requestAnimationFrame(tick);

    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, [reduceMotion, active]);

  const amp = reduceMotion ? (active ? 0.4 : 0) : smoothAmp;

  return (
    <div className={`radial-waveform ${active ? "is-active" : "is-idle"}`}>
      <div className="radial-waveform-stage">
        <svg
          className="radial-waveform-ring"
          viewBox={`0 0 ${VIEW_SIZE} ${VIEW_SIZE}`}
          width={VIEW_SIZE}
          height={VIEW_SIZE}
          aria-hidden="true"
        >
          <circle
            className="radial-waveform-track"
            cx={CENTER}
            cy={CENTER}
            r={RING_RADIUS}
          />
          <g transform={`translate(${CENTER}, ${CENTER})`}>
            {Array.from({ length: BAR_COUNT }).map((_, i) => {
              const angle = i * (360 / BAR_COUNT);
              const hue = hueForIndex(i);
              const jitter = BAR_SEEDS[i];
              const base = 6;
              const variance = 22 * (0.6 + jitter * 0.8);
              const length = active
                ? base + amp * variance
                : base + 0.15 * variance;

              return (
                <rect
                  key={i}
                  className="radial-waveform-bar"
                  x={-1.6}
                  y={-RING_RADIUS - length}
                  width={3.2}
                  height={length}
                  rx={1.6}
                  fill={`hsl(${hue}deg 85% ${active ? 62 : 38}%)`}
                  opacity={active ? 0.9 : 0.35}
                  transform={`rotate(${angle})`}
                />
              );
            })}
          </g>
        </svg>

        <button
          type="button"
          className="radial-waveform-mic"
          onClick={onMicClick}
          aria-label="Toggle microphone"
        >
          <MicIcon />
        </button>
      </div>

      <div className="radial-waveform-meta">
        <div className="radial-waveform-label">{label}</div>
        <div className="radial-waveform-time">{formatElapsed(elapsedSeconds)}</div>
      </div>
    </div>
  );
}

export default RadialWaveform;
