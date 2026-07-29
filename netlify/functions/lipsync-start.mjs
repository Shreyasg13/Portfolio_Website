// Kicks off a real lip-synced avatar clip for one chat response: generates
// TTS audio (same provider chain tts.mjs uses), feeds it + a reference
// portrait to Replicate's hosted SadTalker model, and returns the
// prediction id for the client to poll via lipsync-status.mjs.
//
// This is a *start* call only — a SadTalker generation realistically takes
// 10-60s+, well past Netlify's synchronous function timeout (10s free /
// 26s paid), so this function only ever does the fast part (create the
// prediction) and returns immediately. See lipsync-status.mjs for polling.
//
// Every failure mode here returns `{ fallback: true }` rather than throwing
// past the caller — HeroGlass.js's speakWithLipSync() treats any non-ok
// response as "fall back to the existing canned-clip + TTS-audio path",
// exactly like speak()'s own fallback to the browser voice on TTS failure.
import { getStore } from "@netlify/blobs";
import { generateSpeech } from "./_shared/tts.mjs";

const LIPSYNC_MAX_CHARS = 300;
const LIPSYNC_DAILY_CAP = Number(process.env.LIPSYNC_DAILY_CAP) || 200;
const SADTALKER_MODEL = "cjwbw/sadtalker";

function fallback(status, error) {
  return Response.json({ error, fallback: true }, { status });
}

async function withinDailyCap() {
  try {
    const store = getStore("settings");
    const key = `lipsync-usage:${new Date().toISOString().slice(0, 10)}`;
    const count = (await store.get(key, { type: "json" })) || 0;
    if (count >= LIPSYNC_DAILY_CAP) return false;
    await store.setJSON(key, count + 1);
    return true;
  } catch (err) {
    // Blobs unavailable shouldn't be the reason lip sync never works —
    // fail open on the counter itself, the Replicate account's own spend
    // limit is the hard backstop.
    console.error("lipsync daily cap check failed", err);
    return true;
  }
}

async function fetchReferencePortrait(req) {
  const origin = process.env.URL || new URL(req.url).origin;
  const res = await fetch(`${origin}/avatar/lipsync-reference.png`);
  if (!res.ok) return null;
  return { arrayBuffer: await res.arrayBuffer(), contentType: res.headers.get("content-type") || "image/png" };
}

function toDataUri(arrayBuffer, contentType) {
  return `data:${contentType};base64,${Buffer.from(arrayBuffer).toString("base64")}`;
}

export default async (req) => {
  if (req.method !== "POST") {
    return new Response("Method Not Allowed", { status: 405 });
  }

  let text;
  try {
    ({ text } = await req.json());
  } catch {
    return new Response("Invalid JSON", { status: 400 });
  }

  if (!text || typeof text !== "string" || !text.trim()) {
    return new Response("Missing 'text'", { status: 400 });
  }
  const trimmedText = text.trim();
  if (trimmedText.length > LIPSYNC_MAX_CHARS) {
    return fallback(503, "text too long for lipsync");
  }

  const apiToken = process.env.REPLICATE_API_TOKEN;
  if (!apiToken) {
    return fallback(503, "lipsync not configured");
  }

  if (!(await withinDailyCap())) {
    return fallback(503, "daily lipsync budget reached");
  }

  const speech = await generateSpeech(trimmedText);
  if (!speech) {
    return fallback(503, "tts unavailable");
  }

  const portrait = await fetchReferencePortrait(req);
  if (!portrait) {
    return fallback(503, "reference portrait not configured");
  }

  try {
    const response = await fetch(`https://api.replicate.com/v1/models/${SADTALKER_MODEL}/predictions`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiToken}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        input: {
          source_image: toDataUri(portrait.arrayBuffer, portrait.contentType),
          driven_audio: toDataUri(speech.arrayBuffer, speech.contentType),
        },
      }),
    });

    if (!response.ok) {
      console.error("Replicate prediction create failed", response.status, (await response.text()).slice(0, 300));
      return fallback(502, "lipsync generation failed to start");
    }

    const prediction = await response.json();
    return Response.json({ jobId: prediction.id, status: prediction.status || "starting" }, { status: 200 });
  } catch (err) {
    console.error("Replicate request failed", err);
    return fallback(502, "lipsync generation failed to start");
  }
};
