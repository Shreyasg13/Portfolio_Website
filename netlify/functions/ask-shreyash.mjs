import { readFileSync } from "fs";
import { fileURLToPath } from "url";
import path from "path";
import { getStore } from "@netlify/blobs";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const CONTEXT = readFileSync(
  path.join(__dirname, "_context", "shreyash-context.md"),
  "utf-8"
);

const MODEL = "qwen/qwen3-235b-a22b:free";
const MAX_TOKENS = 400;

async function logConversation(question, answer) {
  try {
    const store = getStore("conversations");
    const key = new Date().toISOString() + "-" + Math.random().toString(36).slice(2, 8);
    await store.setJSON(key, { question, answer, timestamp: new Date().toISOString() });
  } catch (err) {
    console.error("Failed to log conversation", err);
  }
}

export default async (req) => {
  if (req.method !== "POST") {
    return new Response("Method Not Allowed", { status: 405 });
  }

  const apiKey = process.env.OPENROUTER_API_KEY;
  if (!apiKey) {
    return Response.json(
      {
        answer:
          "The AI assistant isn't configured yet — check back soon, or explore the site and download the resume in the meantime.",
      },
      { status: 503 }
    );
  }

  let question;
  try {
    ({ question } = await req.json());
  } catch {
    return new Response("Invalid JSON", { status: 400 });
  }

  if (!question || typeof question !== "string" || !question.trim()) {
    return new Response("Missing 'question'", { status: 400 });
  }

  const trimmedQuestion = question.trim().slice(0, 2000);

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
            { role: "user", content: trimmedQuestion },
          ],
        }),
      }
    );

    if (!response.ok) {
      const errText = await response.text();
      console.error("OpenRouter error", response.status, errText);
      return Response.json(
        {
          answer:
            "The AI assistant hit a snag answering that — please try again in a moment.",
        },
        { status: 502 }
      );
    }

    const data = await response.json();
    const answer =
      data?.choices?.[0]?.message?.content?.trim() ||
      "I couldn't come up with an answer to that — try rephrasing?";

    await logConversation(trimmedQuestion, answer);

    return Response.json({ answer });
  } catch (err) {
    console.error("ask-shreyash handler error", err);
    return Response.json(
      { answer: "Something went wrong answering that — please try again." },
      { status: 500 }
    );
  }
};
