// Lets the site owner browse the ElevenLabs voices available on this
// account and pick which one "Ask Shreyash" speaks with, without needing
// a code change/redeploy each time. Gated behind the same ADMIN_PASSWORD
// as the other /admin routes. The chosen voice is stored in Blobs and
// read by tts.mjs at request time.
import { getStore } from "@netlify/blobs";

function authorized(req) {
  const adminPassword = process.env.ADMIN_PASSWORD;
  if (!adminPassword) return false;
  return req.headers.get("x-admin-password") === adminPassword;
}

async function listVoices(apiKey) {
  const response = await fetch("https://api.elevenlabs.io/v1/voices", {
    headers: { "xi-api-key": apiKey },
  });
  if (!response.ok) {
    throw new Error(`ElevenLabs voices list failed: ${response.status}`);
  }
  const data = await response.json();
  return (data.voices || []).map((v) => ({
    voiceId: v.voice_id,
    name: v.name,
    previewUrl: v.preview_url || null,
    gender: v.labels?.gender || null,
    description: v.labels?.description || null,
    accent: v.labels?.accent || null,
    useCase: v.labels?.use_case || null,
  }));
}

// Sorts male, confident/professional-sounding voices to the top so the
// best fit for a recruiter-facing assistant is the first thing seen.
function rank(voice) {
  let score = 0;
  const gender = (voice.gender || "").toLowerCase();
  const desc = (voice.description || "").toLowerCase();
  const useCase = (voice.useCase || "").toLowerCase();
  if (gender === "male") score += 3;
  if (/confiden|authoritative|professional|deep|charismatic/.test(desc)) score += 2;
  if (/narration|informative|professional/.test(useCase)) score += 1;
  return score;
}

export default async (req) => {
  if (!authorized(req)) {
    return Response.json({ error: "Unauthorized" }, { status: 401 });
  }

  const store = getStore("settings");

  if (req.method === "GET") {
    const apiKey = process.env.ELEVENLABS_API_KEY;
    if (!apiKey) {
      return Response.json({ error: "ELEVENLABS_API_KEY isn't set" }, { status: 503 });
    }
    try {
      const voices = await listVoices(apiKey);
      voices.sort((a, b) => rank(b) - rank(a));
      const active = await store.get("active_voice_id", { type: "json" });
      return Response.json({ voices, activeVoiceId: active?.voiceId || null });
    } catch (err) {
      console.error("admin-voices list error", err);
      return Response.json({ error: "Failed to load voices from ElevenLabs" }, { status: 500 });
    }
  }

  if (req.method === "POST") {
    let voiceId;
    try {
      ({ voiceId } = await req.json());
    } catch {
      return new Response("Invalid JSON", { status: 400 });
    }
    if (!voiceId || typeof voiceId !== "string") {
      return new Response("Missing 'voiceId'", { status: 400 });
    }
    await store.setJSON("active_voice_id", { voiceId, updatedAt: new Date().toISOString() });
    return Response.json({ ok: true, voiceId });
  }

  return new Response("Method Not Allowed", { status: 405 });
};
