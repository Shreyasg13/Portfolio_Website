const { getStore } = require("@netlify/blobs");

exports.handler = async (event) => {
  const store = getStore("visitor-stats");

  if (event.httpMethod === "GET") {
    const total = Number((await store.get("total", { type: "text" })) || "0");
    return {
      statusCode: 200,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ count: total }),
    };
  }

  if (event.httpMethod === "POST") {
    const current = Number((await store.get("total", { type: "text" })) || "0");
    const next = current + 1;
    await store.set("total", String(next));
    return {
      statusCode: 200,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ count: next }),
    };
  }

  return { statusCode: 405, body: "Method Not Allowed" };
};
