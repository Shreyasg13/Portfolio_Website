// Server-side text-to-speech. Generating audio here (rather than relying on
// each browser's own SpeechSynthesis voices) is what makes the assistant's
// voice — a single, consistent, professional male voice — identical for
// every visitor regardless of which browser/OS they're on.
//
// Provider chain (Hugging Face Kokoro-82M -> ElevenLabs) lives in
// _shared/tts.mjs so lipsync-start.mjs can reuse the exact same generation
// logic (it needs the raw bytes to base64 into a Replicate prediction,
// this endpoint just streams them straight to the browser).
import { generateSpeech } from "./_shared/tts.mjs";

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

  const result = await generateSpeech(text);

  if (!result) {
    return Response.json(
      { error: "Voice output isn't configured or is temporarily unavailable." },
      { status: 503 }
    );
  }

  return new Response(result.arrayBuffer, {
    status: 200,
    headers: { "Content-Type": result.contentType, "Cache-Control": "no-store" },
  });
};
