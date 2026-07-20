import { getStore } from "@netlify/blobs";

async function logVisitor(req, context, body) {
  try {
    const store = getStore("visitor-log");
    const key = new Date().toISOString() + "-" + Math.random().toString(36).slice(2, 8);
    await store.setJSON(key, {
      timestamp: new Date().toISOString(),
      path: typeof body.path === "string" ? body.path.slice(0, 200) : null,
      referrer:
        typeof body.referrer === "string" && body.referrer
          ? body.referrer.slice(0, 300)
          : req.headers.get("referer") || null,
      userAgent: req.headers.get("user-agent")?.slice(0, 300) || null,
      ip: context?.ip || null,
      city: context?.geo?.city || null,
      country: context?.geo?.country?.name || null,
    });
  } catch (err) {
    console.error("Failed to log visitor", err);
  }
}

export default async (req, context) => {
  const store = getStore("visitor-stats");

  if (req.method === "GET") {
    const total = Number((await store.get("total", { type: "text" })) || "0");
    return Response.json({ count: total });
  }

  if (req.method === "POST") {
    const current = Number((await store.get("total", { type: "text" })) || "0");
    const next = current + 1;
    await store.set("total", String(next));

    let body = {};
    try {
      body = await req.json();
    } catch {
      // no JSON body sent — still count the visit, just without extra detail
    }
    await logVisitor(req, context, body);

    return Response.json({ count: next });
  }

  return new Response("Method Not Allowed", { status: 405 });
};
