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
// on iOS (`muted playsInline` is required for that, not optional).
function VideoAvatar({ state, onError }) {
  // Both slots start with state: null (not `state`) — that's what makes
  // the effect below actually run on mount. With the initial slot
  // pre-marked as already matching `state`, the "nothing to do" guard
  // fired immediately on mount, so the visible slot's <video> never got
  // a `src` at all: no load attempt, no error event, nothing to trigger
  // the SVG fallback — just a permanently empty box. Confirmed by
  // actually loading the built app locally with no real video assets
  // present and seeing a blank box instead of the SVG fallback.
  const [slots, setSlots] = useState([
    { state: null, on: true },
    { state: null, on: false },
  ]);
  const ref0 = useRef(null);
  const ref1 = useRef(null);
  const refs = [ref0, ref1];
  const isFirstLoadRef = useRef(true);

  useEffect(() => {
    const activeIdx = slots.findIndex((s) => s.on);
    if (slots[activeIdx].state === state) return undefined;

    // First load fills the already-visible slot directly (nothing to
    // crossfade from yet, and loading into the hidden slot instead would
    // leave the visible one blank the whole time). Every later state
    // change loads into the currently-hidden slot as designed, so the
    // outgoing clip keeps playing until the incoming one is ready.
    const targetIdx = isFirstLoadRef.current ? activeIdx : 1 - activeIdx;
    const el = refs[targetIdx].current;
    if (!el) return undefined;

    const asset = avatarAsset(state);
    el.src = pickSrc(el, asset);
    el.load();

    let cancelled = false;
    const go = () => {
      if (cancelled) return;
      isFirstLoadRef.current = false;
      el.play().catch(() => {});
      setSlots((s) => s.map((x, i) => ({ ...x, on: i === targetIdx, state: i === targetIdx ? state : x.state })));
    };
    const onErr = () => {
      if (!cancelled) onError?.();
    };
    el.addEventListener("canplay", go, { once: true });
    el.addEventListener("error", onErr, { once: true });
    return () => {
      cancelled = true;
      el.removeEventListener("canplay", go);
      el.removeEventListener("error", onErr);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [state]);

  return (
    <div className="dt-avatar avatar-video-wrap" aria-hidden="true">
      {slots.map((slot, i) => (
        <video
          key={i}
          ref={refs[i]}
          className="avatar-slot"
          data-on={slot.on}
          muted
          playsInline
          autoPlay
          loop
          preload="none"
          poster={avatarAsset(slot.state || state).poster}
          aria-hidden="true"
        />
      ))}
    </div>
  );
}

export default VideoAvatar;
