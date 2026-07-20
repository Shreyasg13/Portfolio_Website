import { getStore } from "@netlify/blobs";

export default async (req) => {
  const adminPassword = process.env.ADMIN_PASSWORD;
  if (!adminPassword) {
    return Response.json(
      { error: "Admin console isn't configured yet (ADMIN_PASSWORD not set)." },
      { status: 503 }
    );
  }

  const providedPassword = req.headers.get("x-admin-password");
  if (providedPassword !== adminPassword) {
    return Response.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const store = getStore("visitor-log");
    const { blobs } = await store.list();
    const entries = await Promise.all(
      blobs
        .sort((a, b) => (a.key < b.key ? 1 : -1))
        .slice(0, 500)
        .map((b) => store.get(b.key, { type: "json" }))
    );
    return Response.json({ visitors: entries.filter(Boolean) });
  } catch (err) {
    console.error("admin-visitors error", err);
    return Response.json({ error: "Failed to load visitors" }, { status: 500 });
  }
};
