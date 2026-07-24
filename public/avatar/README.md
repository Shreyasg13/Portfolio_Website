# public/avatar

This directory holds the six avatar-state video assets consumed by
`src/avatar/avatarManifest.js`: for each state in
`idle`, `listening`, `thinking`, `reasoning`, `speaking`, `complete`
it expects a `{state}.webm`, `{state}.mp4`, and `{state}.jpg`
(e.g. `idle.webm`, `idle.mp4`, `idle.jpg`).

## This directory can stay empty

Until these 18 files exist, every path here 404s — that's expected. The
site's `AvatarStage` component handles this automatically: on video error
it falls back to a hand-drawn SVG avatar (`DigitalTwinAvatar.js`). Nothing
breaks if this directory is empty, so there's no rush to populate it.

## How to produce the assets

### 1. Generate six raw source clips

Produce six short (4-5s) photoreal portrait video loops, one per avatar
state, named `idle_raw.mp4`, `listening_raw.mp4`, `thinking_raw.mp4`,
`reasoning_raw.mp4`, `speaking_raw.mp4`, `complete_raw.mp4`:

1. **Still portrait**: generate a photoreal portrait with an image model
   (e.g. Midjourney or Flux), using a **locked seed** so the same identity
   and framing carries across all six poses/expressions.
2. **Animate**: turn each still into a short video loop with an
   image-to-video model (e.g. Runway Gen-3 or Kling). Prompt for **subtle
   micro-motion only** — breathing, a slight head sway, an eye blink,
   camera held static. Anything beyond that makes the ping-pong loop seam
   visible.

### 2. Encode

Run the encode script against the directory containing the six
`*_raw.mp4` files:

```bash
./scripts/encode-avatar.sh /path/to/raw/clips
```

This builds a seamless ping-pong loop for each clip, encodes it to
AV1 webm (primary) and H.264 mp4 (Safari fallback), extracts a poster
JPG, writes all of it into `public/avatar/`, and reports file sizes with
warnings if any state (or the total) blows the size budget.

See `scripts/encode-avatar.sh` for the exact ffmpeg invocations and
size-budget thresholds.
