import { getStore } from "@netlify/blobs";

export default async (req) => {
  const store = getStore("visitor-stats");

  if (req.method === "GET") {
    const total = Number((await store.get("total", { type: "text" })) || "0");
    return Response.json({ count: total });
  }

  if (req.method === "POST") {
    const current = Number((await store.get("total", { type: "text" })) || "0");
    const next = current + 1;
    await store.set("total", String(next));
    return Response.json({ count: next });
  }

  return new Response("Method Not Allowed", { status: 405 });
};
