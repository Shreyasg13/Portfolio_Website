// Six states, matching the reference design's state strip. Assets live
// at /public/avatar/{state}.{webm,mp4,jpg} — see
// scripts/encode-avatar.sh and public/avatar/README.md for how they're
// produced. None of these files exist yet (real photoreal source clips
// are generated outside this codebase — Midjourney/Runway/ffmpeg, per
// AVATAR_UI_OVERHAUL.md section 1), so every path here 404s until then.
// AvatarStage's fallback ladder handles that: video error -> SVG.
export const AVATAR_STATES = ["idle", "listening", "thinking", "reasoning", "speaking", "complete"];

export function avatarAsset(state) {
  return {
    webm: `/avatar/${state}.webm`,
    mp4: `/avatar/${state}.mp4`,
    poster: `/avatar/${state}.jpg`,
  };
}

// idle loads eagerly (it's what's visible on first paint); the rest are
// prefetched on requestIdleCallback so they're warm by the time a real
// conversation reaches them, without delaying the initial hero render.
export const PRELOAD_STATE = "idle";
export const PREFETCH_STATES = AVATAR_STATES.filter((s) => s !== PRELOAD_STATE);
