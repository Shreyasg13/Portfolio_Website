import React, { useEffect, useRef, useState } from "react";
import { avatarAsset } from "./avatarManifest";

// Only actually prefer webm if the manifest has one for this state AND
// the browser can decode it — the current manifest only ships raw mp4s
// (no ffmpeg available to produce the AV1 encode), so this always falls
// through to mp4 today, but stays correct the moment webm assets exist.
function pickSrc(el, asset) {
  if (asset.webm && el.canPlayType && el.canPlayType('video/webm; codecs="av01.0.05M.08"')) {
    return asset.webm;
  }
  return asset.mp4;
}

// Dual stacked <video> elements, swapped by opacity only after the
// incoming clip fires `canplay` — a naive src swap on a single <video>
// causes a black flash while the decoder resets. Audio always stays on
// the existing <audio> element useSpeechAmplitude reads; these clips
// are silent (-an, see scripts/encode-avatar.sh) so autoplay survives
// on iOS (`muted playsInline` is required for that, not optional). A
// generated clip (see below) is the one exception — it carries its own
// baked-in audio and plays unmuted.

// How long before a clip's natural end to start crossfading into a fresh
// replay of the same clip. The raw Hailuo exports aren't run through
// scripts/encode-avatar.sh's ping-pong/seamless-loop pass (no ffmpeg
// available), so the native `loop` attribute jump-cuts hard at the seam —
// most visible on idle, which loops far more than any other state. This
// crossfades a second instance of the same clip in just before that seam
// instead, hiding the cut the same way state-to-state transitions already
// are below. Not applied to a generated clip — that's a one-shot real
// clip, not a seamless loop.
const LOOP_CROSSFADE_LEAD = 0.35;

// speaking.mp4 is a canned, pre-recorded talking loop — its mouth motion
// has no relationship to what the assistant is actually saying, so this
// is NOT real lip sync (that would need per-phoneme mouth shapes, which
// only exists on the SVG fallback's amplitude-tier mouth, or a paid
// talking-head API neither available here). What this CAN do cheaply:
// freeze the clip on real silence (gaps between sentences/words in the
// true TTS amplitude, via getSpeechLevel) and only let it run while
// actual sound is playing, so the mouth isn't visibly flapping through
// silent pauses. A real amplitude-driven approximation, not a fix for
// the deeper "wrong mouth shapes" problem. Superseded entirely by a real
// generated clip when one is playing — gating a real lip-synced video off
// amplitude would freeze it on quiet passages, which is actively wrong.
const SPEAKING_SILENCE_THRESHOLD = 0.035;

function VideoAvatar({ state, getSpeechLevel, onError, generatedClip }) {
  // Both slots start with state: null (not `state`) — that's what makes
  // the effect below actually run on mount. With the initial slot
  // pre-marked as already matching `state`, the "nothing to do" guard
  // fired immediately on mount, so the visible slot's <video> never got
  // a `src` at all: no load attempt, no error event, nothing to trigger
  // the SVG fallback — just a permanently empty box. Confirmed by
  // actually loading the built app locally with no real video assets
  // present and seeing a blank box instead of the SVG fallback.
  const [slots, setSlots] = useState([
    { state: null, on: true, generatedUrl: null },
    { state: null, on: false, generatedUrl: null },
  ]);
  const ref0 = useRef(null);
  const ref1 = useRef(null);
  const refs = [ref0, ref1];
  const isFirstLoadRef = useRef(true);
  const loopSwapRef = useRef(false);
  const generatedUrl = generatedClip?.url || null;

  useEffect(() => {
    const activeIdx = slots.findIndex((s) => s.on);
    const activeSlot = slots[activeIdx];
    // Composite key: `state` alone isn't enough. Two consecutive
    // lip-synced replies both land on state === "speaking" but with a
    // different generatedClip.url each time — keying off `state` only
    // would make the second reply's clip silently never load, replaying
    // the first reply's video forever instead.
    if (activeSlot.state === state && activeSlot.generatedUrl === generatedUrl) return undefined;

    // First load fills the already-visible slot directly (nothing to
    // crossfade from yet, and loading into the hidden slot instead would
    // leave the visible one blank the whole time). Every later state
    // change loads into the currently-hidden slot as designed, so the
    // outgoing clip keeps playing until the incoming one is ready.
    const targetIdx = isFirstLoadRef.current ? activeIdx : 1 - activeIdx;
    const el = refs[targetIdx].current;
    if (!el) return undefined;

    const src = generatedUrl || pickSrc(el, avatarAsset(state));
    el.src = src;
    el.load();

    let cancelled = false;
    const go = () => {
      if (cancelled) return;
      isFirstLoadRef.current = false;
      el.play().catch(() => {});
      setSlots((s) =>
        s.map((x, i) => ({
          ...x,
          on: i === targetIdx,
          state: i === targetIdx ? state : x.state,
          generatedUrl: i === targetIdx ? generatedUrl : x.generatedUrl,
        }))
      );
    };
    const onErr = () => {
      if (cancelled) return;
      // A generated clip failing to load is a per-turn failure — report
      // it to the caller (HeroGlass.js falls back to the canned clip +
      // TTS audio for just this turn), not to AvatarStage's onError,
      // which permanently swaps in the SVG fallback for the whole
      // session. Wrong blast radius for one bad clip.
      if (generatedUrl) generatedClip.onError?.();
      else onError?.();
    };
    el.addEventListener("canplay", go, { once: true });
    el.addEventListener("error", onErr, { once: true });
    return () => {
      cancelled = true;
      el.removeEventListener("canplay", go);
      el.removeEventListener("error", onErr);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [state, generatedUrl]);

  // See LOOP_CROSSFADE_LEAD above: watches the currently-visible clip and,
  // just before it reaches its natural end, crossfades to a second,
  // freshly-restarted instance of the same clip instead of letting the
  // native `loop` attribute hard-cut back to frame 0.
  useEffect(() => {
    const activeIdx = slots.findIndex((s) => s.on);
    const el = refs[activeIdx].current;
    if (!el) return undefined;
    if (slots[activeIdx].generatedUrl) return undefined;

    function onTimeUpdate() {
      // A real state change is already mid-swap (isFirstLoadRef guards the
      // very first mount) — don't also start a loop crossfade on top of it.
      if (loopSwapRef.current) return;
      const { duration, currentTime } = el;
      if (!duration || !isFinite(duration)) return;
      if (duration - currentTime > LOOP_CROSSFADE_LEAD) return;

      loopSwapRef.current = true;
      const targetIdx = 1 - activeIdx;
      const target = refs[targetIdx].current;
      const sourceState = slots[activeIdx].state;
      if (!target) {
        loopSwapRef.current = false;
        return;
      }

      target.src = el.currentSrc || el.src;
      target.currentTime = 0;
      target.load();

      let cancelled = false;
      const go = () => {
        if (cancelled) return;
        loopSwapRef.current = false;
        target.play().catch(() => {});
        el.pause();
        setSlots((s) =>
          s.map((x, i) => (i === targetIdx ? { ...x, on: true, state: sourceState } : { ...x, on: false }))
        );
      };
      target.addEventListener("canplay", go, { once: true });
      // A failed loop-restart just leaves the current clip's native `loop`
      // attribute to jump-cut on its own — not worth surfacing via onError,
      // since the clip itself is still playing fine.
      target.addEventListener(
        "error",
        () => {
          cancelled = true;
          loopSwapRef.current = false;
        },
        { once: true }
      );
    }

    el.addEventListener("timeupdate", onTimeUpdate);
    return () => el.removeEventListener("timeupdate", onTimeUpdate);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [slots]);

  // Amplitude-gated pause/resume while speaking — see
  // SPEAKING_SILENCE_THRESHOLD above for what this is and isn't. Doesn't
  // apply to a real generated clip (no separate TTS <audio> element to
  // read amplitude from for that turn, and the video IS the ground truth).
  useEffect(() => {
    if (state !== "speaking" || !getSpeechLevel || generatedClip) return undefined;
    let rafId;
    let cancelled = false;
    function tick() {
      if (cancelled) return;
      const activeIdx = slots.findIndex((s) => s.on);
      const el = refs[activeIdx].current;
      if (el) {
        const level = getSpeechLevel();
        if (level > SPEAKING_SILENCE_THRESHOLD) {
          if (el.paused) el.play().catch(() => {});
        } else if (!el.paused) {
          el.pause();
        }
      }
      rafId = requestAnimationFrame(tick);
    }
    tick();
    return () => {
      cancelled = true;
      if (rafId) cancelAnimationFrame(rafId);
      // Don't leave the clip frozen once we stop watching it (state
      // change away from "speaking", or unmount).
      const activeIdx = slots.findIndex((s) => s.on);
      const el = refs[activeIdx].current;
      if (el && el.paused) el.play().catch(() => {});
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [state, getSpeechLevel, generatedClip]);

  // Real per-response clip: once the active slot actually holds the
  // generated clip (i.e. its crossfade-in above has completed), wire its
  // `ended`/`error` events to the caller's callbacks (see HeroGlass.js's
  // playGeneratedClip). Separate from the canplay/error listeners in the
  // mount effect, which only cover the crossfade-in itself — this covers
  // natural completion and any post-visible playback error.
  useEffect(() => {
    if (!generatedClip) return undefined;
    const activeIdx = slots.findIndex((s) => s.on);
    const slot = slots[activeIdx];
    if (slot.generatedUrl !== generatedClip.url) return undefined;
    const el = refs[activeIdx].current;
    if (!el) return undefined;

    const handleEnded = () => generatedClip.onEnded?.();
    const handleError = () => generatedClip.onError?.();
    el.addEventListener("ended", handleEnded);
    el.addEventListener("error", handleError);
    return () => {
      el.removeEventListener("ended", handleEnded);
      el.removeEventListener("error", handleError);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [slots, generatedClip]);

  return (
    <div className="dt-avatar avatar-video-wrap" aria-hidden="true">
      {slots.map((slot, i) => (
        <video
          key={i}
          ref={refs[i]}
          className="avatar-slot"
          data-on={slot.on}
          data-generated={slot.generatedUrl ? "true" : undefined}
          muted={!slot.generatedUrl}
          playsInline
          autoPlay
          loop={!slot.generatedUrl}
          preload="none"
          poster={slot.generatedUrl ? undefined : avatarAsset(slot.state || state).poster}
          aria-hidden="true"
        />
      ))}
    </div>
  );
}

export default VideoAvatar;
