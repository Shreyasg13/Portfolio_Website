// Server-side text-to-speech. Generating audio here (rather than relying on
// each browser's own SpeechSynthesis voices) is what makes the assistant's
// voice — a single, consistent, professional male voice — identical for
// every visitor regardless of which browser/OS they're on.
//
// Primary: Kokoro-82M on Hugging Face's free Inference API — open-source,
// Apache-2.0, no per-request cost. Free serverless endpoints cold-start and
// can be unreliable for less-common models, so on any failure this falls
// through to ElevenLabs (paid, but dependable) rather than going silent.
const HF_MODEL = "hexgrad/Kokoro-82M";
const ELEVENLABS_DEFAULT_VOICE_ID = "pNInz6obpgDQGcFmaJgB"; // "Adam" — deep, professional male
const MAX_CHARS = 800;

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
      body: response.body,
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

  const voiceId = process.env.ELEVENLABS_VOICE_ID || ELEVENLABS_DEFAULT_VOICE_ID;

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

    return { body: response.body, contentType: "audio/mpeg" };
  } catch (err) {
    console.error("ElevenLabs request failed", err);
    return null;
  }
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

  const trimmedText = text.trim().slice(0, MAX_CHARS);

  const result = (await tryHuggingFace(trimmedText)) || (await tryElevenLabs(trimmedText));

  if (!result) {
    return Response.json(
      { error: "Voice output isn't configured or is temporarily unavailable." },
      { status: 503 }
    );
  }

  return new Response(result.body, {
    status: 200,
    headers: { "Content-Type": result.contentType, "Cache-Control": "no-store" },
  });
};
