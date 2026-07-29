// Shared TTS generation, used by both tts.mjs (streams straight to the
// browser) and lipsync-start.mjs (needs the raw bytes to base64 into a
// Replicate prediction). Primary: Kokoro-82M on Hugging Face's free
// Inference API — open-source, no per-request cost. Free serverless
// endpoints cold-start and can be unreliable for less-common models, so on
// any failure this falls through to ElevenLabs (paid, but dependable)
// rather than going silent.
import { getStore } from "@netlify/blobs";

const HF_MODEL = "hexgrad/Kokoro-82M";
const ELEVENLABS_DEFAULT_VOICE_ID = "pNInz6obpgDQGcFmaJgB"; // "Adam" — deep, professional male
const MAX_CHARS = 800;

// Voice precedence: whatever's picked in /admin/visitors (stored in Blobs)
// > ELEVENLABS_VOICE_ID env var > the hardcoded default above.
async function activeVoiceId() {
  try {
    const store = getStore("settings");
    const active = await store.get("active_voice_id", { type: "json" });
    return active?.voiceId || null;
  } catch (err) {
    console.error("Failed to read active voice id", err);
    return null;
  }
}

async function tryHuggingFace(text) {
  const hfToken = process.env.HUGGINGFACE_API_KEY;
  if (!hfToken) return null;

  const endpoint = `https://api-inference.huggingface.co/models/${HF_MODEL}`;
  const requestOptions = {
    method: "POST",
    headers: {
      Authorization: `Bearer ${hfToken}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ inputs: text }),
  };

  try {
    let response = await fetch(endpoint, requestOptions);

    // Free serverless models unload when idle; a cold start reports 503
    // with an estimated_time. One short wait-and-retry covers most of these.
    if (response.status === 503) {
      await new Promise((r) => setTimeout(r, 3000));
      response = await fetch(endpoint, requestOptions);
    }

    if (!response.ok) {
      console.error("Hugging Face TTS error", response.status, (await response.text()).slice(0, 300));
      return null;
    }

    return {
      arrayBuffer: await response.arrayBuffer(),
      contentType: response.headers.get("content-type") || "audio/flac",
    };
  } catch (err) {
    console.error("Hugging Face TTS request failed", err);
    return null;
  }
}

async function tryElevenLabs(text) {
  const apiKey = process.env.ELEVENLABS_API_KEY;
  if (!apiKey) return null;

  const voiceId = (await activeVoiceId()) || process.env.ELEVENLABS_VOICE_ID || ELEVENLABS_DEFAULT_VOICE_ID;

  try {
    const response = await fetch(`https://api.elevenlabs.io/v1/text-to-speech/${voiceId}`, {
      method: "POST",
      headers: {
        "xi-api-key": apiKey,
        "Content-Type": "application/json",
        Accept: "audio/mpeg",
      },
      body: JSON.stringify({
        text,
        model_id: "eleven_turbo_v2_5",
        voice_settings: { stability: 0.55, similarity_boost: 0.8, style: 0.15, use_speaker_boost: true },
      }),
    });

    if (!response.ok) {
      console.error("ElevenLabs error", response.status, (await response.text()).slice(0, 300));
      return null;
    }

    return { arrayBuffer: await response.arrayBuffer(), contentType: "audio/mpeg" };
  } catch (err) {
    console.error("ElevenLabs request failed", err);
    return null;
  }
}

// Returns { arrayBuffer, contentType } on success, or null if every
// provider is unavailable/unconfigured/failed — callers decide how to
// surface that (tts.mjs returns 503, lipsync-start.mjs falls back).
export async function generateSpeech(text) {
  const trimmedText = text.trim().slice(0, MAX_CHARS);
  return (await tryHuggingFace(trimmedText)) || (await tryElevenLabs(trimmedText));
}
