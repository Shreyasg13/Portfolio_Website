import { useEffect, useRef, useState } from "react";

const MIN_DWELL = 900;
const SPEAK_THRESHOLD = 0.06;
const CONSECUTIVE = 3;
// How long each of the thinking/reasoning sub-phases holds before
// alternating to the other — matches the cadence DigitalTwinAvatar's SVG
// fallback already uses for its own "Searching Memory/Reasoning/..."
// label rotation, so the two renderers feel consistent.
const THINKING_PHASE_MS = 1400;

// The app's listening/loading/speaking signals are already
// event-driven and reliable (see HeroGlass.js's speak()/
// toggleVoiceInput() — speaking flips on a real audio `play` event, not
// a guess), so they're the primary input here. Amplitude is used only
// as a confirmation gate before committing to the "speaking" video, so
// a single stray frame right as playback starts can't cause an instant
// flicker into that loop, and a minimum dwell time is enforced on every
// transition so the crossfade is never asked to fire faster than its
// own 420ms transition can visually resolve.
//
// "loading" alone used to map to a single "thinking" state and never
// actually used the "reasoning" clip at all — the full intended
// sequence is idle -> listening -> thinking -> reasoning -> speaking ->
// complete, so the loading phase now alternates between thinking and
// reasoning rather than sitting on one clip the whole time.
function deriveTarget({ listening, loading, speaking, completed }, loadingPhase) {
  if (speaking) return "speaking";
  if (listening) return "listening";
  if (loading) return loadingPhase === 0 ? "thinking" : "reasoning";
  if (completed) return "complete";
  return "idle";
}

// Real audio amplitude is only ever populated on the primary TTS
// <audio> path (useSpeechAmplitude's attach() is called from speak()'s
// success path in HeroGlass.js) — the SpeechSynthesis browser-voice
// fallback (used when the TTS function is unavailable) never feeds it,
// so getAmplitude() reads a flat 0 the whole time someone is actually
// speaking through that path. A pure "3 consecutive frames above
// threshold" gate would then never fire and the avatar would get stuck
// on its previous state forever — confirmed by actually triggering a
// mocked conversation locally and watching "speaking" never commit.
// SPEAK_COMMIT_TIMEOUT is the escape hatch: real amplitude still
// confirms quickly when it's available, but its absence can't block the
// transition indefinitely.
const SPEAK_COMMIT_TIMEOUT = 400;

function useAvatarState({ listening, loading, speaking, completed }, getAmplitude) {
  const [state, setState] = useState(() => deriveTarget({ listening, loading, speaking, completed }, 0));
  const lastChangeRef = useRef(Date.now());
  const consecutiveRef = useRef(0);
  const speakingSinceRef = useRef(null);
  const loadingSinceRef = useRef(null);
  const rafRef = useRef(null);

  useEffect(() => {
    let cancelled = false;

    function tick() {
      if (cancelled) return;
      const now = Date.now();

      let loadingPhase = 0;
      if (loading) {
        if (loadingSinceRef.current === null) loadingSinceRef.current = now;
        loadingPhase = Math.floor((now - loadingSinceRef.current) / THINKING_PHASE_MS) % 2;
      } else {
        loadingSinceRef.current = null;
      }

      const target = deriveTarget({ listening, loading, speaking, completed }, loadingPhase);
      const dwellOk = now - lastChangeRef.current >= MIN_DWELL;

      let speakConfirmed = true;
      if (target === "speaking") {
        if (speakingSinceRef.current === null) speakingSinceRef.current = now;
        const level = getAmplitude ? getAmplitude() : 1;
        consecutiveRef.current = level >= SPEAK_THRESHOLD ? consecutiveRef.current + 1 : consecutiveRef.current;
        const timedOut = now - speakingSinceRef.current >= SPEAK_COMMIT_TIMEOUT;
        speakConfirmed = consecutiveRef.current >= CONSECUTIVE || timedOut;
      } else {
        consecutiveRef.current = 0;
        speakingSinceRef.current = null;
      }

      setState((current) => {
        if (target === current) return current;
        if (!dwellOk) return current;
        if (target === "speaking" && !speakConfirmed) return current;
        lastChangeRef.current = now;
        consecutiveRef.current = 0;
        return target;
      });

      rafRef.current = requestAnimationFrame(tick);
    }

    tick();
    return () => {
      cancelled = true;
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, [listening, loading, speaking, completed, getAmplitude]);

  return state;
}

export default useAvatarState;
