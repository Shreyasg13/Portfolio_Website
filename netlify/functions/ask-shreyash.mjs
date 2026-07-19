import { readFileSync } from "fs";
import { fileURLToPath } from "url";
import path from "path";
import { getStore } from "@netlify/blobs";

const currentDir = path.dirname(fileURLToPath(import.meta.url));
const CONTEXT = readFileSync(
  path.join(currentDir, "_context", "shreyash-context.md"),
  "utf-8"
);

// Ordered by preference; free-tier models are shared/rate-limited upstream,
// so fall through to the next one rather than failing the user's request.
// Last entry is a paid model (fraction of a cent per request) as a guaranteed
// fallback for when every free tier is saturated.
const MODELS = [
  "qwen/qwen3-next-80b-a3b-instruct:free",
  "qwen/qwen3-coder:free",
  "meta-llama/llama-3.3-70b-instruct:free",
  "mistralai/mistral-small-24b-instruct-2501",
];
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

function systemPrompt() {
  return `You are Shreyash Gondane's personal AI assistant, answering recruiter and hiring-manager questions on his behalf. Always answer in first person, as Shreyash himself ("I built...", "I led..."), not in third person. Use STAR (Situation, Task, Action, Result) structure for behavioral questions. Answer only from the context below — do not invent employers, dates, or numbers.\n\n${CONTEXT}`;
}

async function callModel(model, apiKey, question, history = []) {
  const response = await fetch("https://openrouter.ai/api/v1/chat/completions", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${apiKey}`,
      "Content-Type": "application/json",
      "HTTP-Referer": "https://shreyashportfolio.netlify.app",
      "X-Title": "Ask Shreyash",
    },
    body: JSON.stringify({
      model,
      max_tokens: MAX_TOKENS,
      messages: [
        { role: "system", content: systemPrompt() },
        ...history
          .filter((message) => message && ["user", "assistant"].includes(message.role) && typeof message.content === "string")
          .slice(-6),
        { role: "user", content: question },
      ],
    }),
  });
  return response;
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
  let history = [];
  try {
    ({ question, history = [] } = await req.json());
  } catch {
    return new Response("Invalid JSON", { status: 400 });
  }

  if (!question || typeof question !== "string" || !question.trim()) {
    return new Response("Missing 'question'", { status: 400 });
  }

  const trimmedQuestion = question.trim().slice(0, 2000);

  let lastError = null;

  for (const model of MODELS) {
    try {
      let response = await callModel(model, apiKey, trimmedQuestion, history);

      if (response.status === 429) {
        // Free-tier models share upstream rate limits — one short retry
        // resolves most transient hits before falling through to the
        // next model in the list.
        await new Promise((r) => setTimeout(r, 1500));
        response = await callModel(model, apiKey, trimmedQuestion, history);
      }

      if (!response.ok) {
        lastError = { status: response.status, body: (await response.text()).slice(0, 300) };
        console.error("OpenRouter error", model, lastError.status, lastError.body);
        continue;
      }

      const data = await response.json();
      const answer = data?.choices?.[0]?.message?.content?.trim();
      if (!answer) {
        lastError = { status: response.status, body: "empty completion" };
        continue;
      }

      await logConversation(trimmedQuestion, answer);
      return Response.json({ answer });
    } catch (err) {
      console.error("ask-shreyash model attempt failed", model, err);
      lastError = { status: 0, body: String(err) };
    }
  }

  console.error("ask-shreyash: all models exhausted", lastError);
  return Response.json(
    {
      answer:
        "All the free AI models I use are rate-limited right now — please try again in a minute.",
    },
    { status: 502 }
  );
};
