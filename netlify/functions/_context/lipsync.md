# Lip-sync avatar generation

Real, per-response lip-synced avatar video, generated via Replicate's hosted
SadTalker model (`cjwbw/sadtalker`), replacing the canned `speaking.mp4`
loop for that turn. See `src/avatar/VideoAvatar.jsx` and
`src/components/Home/HeroGlass.js`'s `speakWithLipSync()` for the client
side.

## Flow

1. `HeroGlass.js`'s `speakWithLipSync(text)` calls `POST lipsync-start.mjs`.
2. `lipsync-start.mjs` generates TTS audio (via `_shared/tts.mjs`, the same
   Hugging Face Kokoro / ElevenLabs chain `tts.mjs` uses), fetches the
   reference portrait, and creates a Replicate prediction. Returns
   `{ jobId }` immediately — a SadTalker generation takes 10-60s+, well
   past Netlify's synchronous function timeout, so this only does the fast
   "create" step.
3. The client polls `GET lipsync-status.mjs?id=<jobId>` every ~2s (up to a
   60s hard cap) until Replicate reports `succeeded`/`failed`.
4. On success, the client plays the generated clip **unmuted, as the sole
   media element** for that turn (no separate TTS `<audio>` element —
   SadTalker's audio and video are the same file, so there's no drift risk
   between two independently-buffered elements).
5. **Any failure at any stage** (missing config, over the daily cap, text
   too long, generation failed, poll timeout, or the clip itself failing to
   load) falls straight through to the existing `speak()` path — canned
   `speaking.mp4` + TTS audio. This fallback is a hard requirement, not
   optional polish.

While generating/polling, the avatar stays in the existing alternating
thinking/reasoning states (`lipSyncPending` is OR'd into `loading` before
`useAvatarState` sees it) — no new visual state was needed.

## Env vars

| Var | Required | Purpose |
|---|---|---|
| `REPLICATE_API_TOKEN` | yes — else `lipsync-start`/`lipsync-status` gracefully no-op and every turn uses the fallback path | Auth for Replicate's API |
| `LIPSYNC_DAILY_CAP` | no, default `200` | Daily generation cap (defense-in-depth cost guard; also set a spend limit in the Replicate dashboard itself — this endpoint is public/unauthenticated) |
| `REPLICATE_SADTALKER_VERSION` | no | Only needed if the unversioned `/v1/models/cjwbw/sadtalker/predictions` endpoint form stops resolving and a pinned `version` hash fallback is added |

## Reference portrait

`public/avatar/lipsync-reference.png` — a static asset, fetched by
`lipsync-start.mjs` at `${process.env.URL}/avatar/lipsync-reference.png`
(Netlify's built-in site-URL env var, works under `netlify dev` too).
Should be a clean, frontal, eyes-visible headshot — SadTalker's face
detector does best with that framing. Until this file exists, every turn
safely falls back to the canned clip (no build-time dependency on it).

## Known trade-offs

- **Latency**: the user explicitly accepted waiting for a real clip over
  starting audio immediately — every lip-synced response takes noticeably
  longer to start than the old canned-clip behavior.
- **Framing**: SadTalker's output is a tight face crop with no
  desk-scene backdrop, unlike the other 5 states' Hailuo clips — it gets
  its own, much gentler CSS transform (`.avatar-slot[data-generated="true"]`
  in `src/style.css`) rather than reusing the hand-calibrated 2.4x zoom
  tuned for those clips. Expect it to look visually distinct.
- **No amplitude analysis**: `useSpeechAmplitude` isn't attached to
  generated clips (no separate `<audio>` element for that turn) —
  `useAvatarState`'s existing `SPEAK_COMMIT_TIMEOUT` escape hatch (already
  exercised by the SpeechSynthesis browser-voice fallback) covers this,
  no code changes were needed there.
