const fs = require("fs");
const path = require("path");

const CONTEXT = fs.readFileSync(
  path.join(__dirname, "_context", "shreyash-context.md"),
  "utf-8"
);

const MODEL = "qwen/qwen3-235b-a22b:free";
const MAX_TOKENS = 400;

exports.handler = async (event) => {
  if (event.httpMethod !== "POST") {
    return { statusCode: 405, body: "Method Not Allowed" };
  }

  const apiKey = process.env.OPENROUTER_API_KEY;
  if (!apiKey) {
    return {
      statusCode: 503,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        answer:
          "The AI assistant isn't configured yet — check back soon, or explore the site and download the resume in the meantime.",
      }),
    };
  }

  let question;
  try {
    ({ question } = JSON.parse(event.body || "{}"));
  } catch {
    return { statusCode: 400, body: "Invalid JSON" };
  }

  if (!question || typeof question !== "string" || !question.trim()) {
    return { statusCode: 400, body: "Missing 'question'" };
  }

  try {
    const response = await fetch(
      "https://openrouter.ai/api/v1/chat/completions",
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${apiKey}`,
          "Content-Type": "application/json",
          "HTTP-Referer": "https://shreyashportfolio.netlify.app",
          "X-Title": "Ask Shreyash",
        },
        body: JSON.stringify({
          model: MODEL,
          max_tokens: MAX_TOKENS,
          messages: [
            {
              role: "system",
              content: `You are an assistant answering recruiter and hiring-manager questions about Shreyash Gondane's fit for engineering roles. Answer only from the context below — do not invent employers, dates, or numbers.\n\n${CONTEXT}`,
            },
            { role: "user", content: question.trim().slice(0, 2000) },
          ],
        }),
      }
    );

    if (!response.ok) {
      const errText = await response.text();
      console.error("OpenRouter error", response.status, errText);
      return {
        statusCode: 502,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          answer:
            "The AI assistant hit a snag answering that — please try again in a moment.",
        }),
      };
    }

    const data = await response.json();
    const answer =
      data?.choices?.[0]?.message?.content?.trim() ||
      "I couldn't come up with an answer to that — try rephrasing?";

    return {
      statusCode: 200,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ answer }),
    };
  } catch (err) {
    console.error("ask-shreyash handler error", err);
    return {
      statusCode: 500,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        answer: "Something went wrong answering that — please try again.",
      }),
    };
  }
};
