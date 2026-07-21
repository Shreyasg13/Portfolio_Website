// Server-side text-to-speech via ElevenLabs. Generating audio here (rather
// than relying on each browser's own SpeechSynthesis voices) is what makes
// the assistant's voice — a single, consistent, professional male voice —
// identical for every visitor regardless of which browser/OS they're on.
const DEFAULT_VOICE_ID = "pNInz6obpgDQGcFmaJgB"; // "Adam" — deep, professional male
const MAX_CHARS = 800;

export default async (req) => {
  if (req.method !== "POST") {
    return new Response("Method Not Allowed", { status: 405 });
  }

  const apiKey = process.env.ELEVENLABS_API_KEY;
  if (!apiKey) {
    return Response.json({ error: "Voice output isn't configured yet." }, { status: 503 });
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
  const voiceId = process.env.ELEVENLABS_VOICE_ID || DEFAULT_VOICE_ID;

  try {
    const response = await fetch(`https://api.elevenlabs.io/v1/text-to-speech/${voiceId}`, {
      method: "POST",
      headers: {
        "xi-api-key": apiKey,
        "Content-Type": "application/json",
        Accept: "audio/mpeg",
      },
      body: JSON.stringify({
        text: trimmedText,
        model_id: "eleven_turbo_v2_5",
        voice_settings: { stability: 0.55, similarity_boost: 0.8, style: 0.15, use_speaker_boost: true },
      }),
    });

    if (!response.ok) {
      const body = await response.text();
      console.error("ElevenLabs error", response.status, body.slice(0, 300));
      return Response.json({ error: "Voice generation failed" }, { status: 502 });
    }

    return new Response(response.body, {
      status: 200,
      headers: { "Content-Type": "audio/mpeg", "Cache-Control": "no-store" },
    });
  } catch (err) {
    console.error("tts function error", err);
    return Response.json({ error: "Voice generation failed" }, { status: 502 });
  }
};
