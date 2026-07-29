// Polled by HeroGlass.js's pollLipSyncStatus() every ~2s while a SadTalker
// generation is in flight. Stateless proxy over Replicate's own prediction
// status — no Blobs/local state needed here, Replicate is already the
// durable source of truth for a prediction's lifecycle.
export default async (req) => {
  if (req.method !== "GET") {
    return new Response("Method Not Allowed", { status: 405 });
  }

  const id = new URL(req.url).searchParams.get("id");
  if (!id) {
    return new Response("Missing 'id'", { status: 400 });
  }

  const apiToken = process.env.REPLICATE_API_TOKEN;
  if (!apiToken) {
    return Response.json({ status: "failed", error: "lipsync not configured" }, { status: 200 });
  }

  try {
    const response = await fetch(`https://api.replicate.com/v1/predictions/${id}`, {
      headers: { Authorization: `Bearer ${apiToken}` },
    });

    if (!response.ok) {
      return Response.json({ status: "failed", error: "status check failed" }, { status: 502 });
    }

    const prediction = await response.json();

    if (prediction.status === "succeeded") {
      const output = Array.isArray(prediction.output) ? prediction.output[0] : prediction.output;
      if (!output) {
        return Response.json({ status: "failed", error: "no output returned" }, { status: 200 });
      }
      return Response.json({ status: "ready", videoUrl: output }, { status: 200 });
    }

    if (prediction.status === "failed" || prediction.status === "canceled") {
      return Response.json(
        { status: "failed", error: prediction.error || "generation failed" },
        { status: 200 }
      );
    }

    // "starting" | "processing"
    return Response.json({ status: "pending" }, { status: 200 });
  } catch (err) {
    console.error("lipsync status check failed", err);
    return Response.json({ status: "failed", error: "status check failed" }, { status: 502 });
  }
};
