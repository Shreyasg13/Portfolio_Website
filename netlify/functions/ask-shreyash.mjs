import { readFileSync } from "fs";
import { fileURLToPath } from "url";
import path from "path";
import { getStore } from "@netlify/blobs";

const currentDir = path.dirname(fileURLToPath(import.meta.url));
const CONTEXT = readFileSync(
  path.join(currentDir, "_context", "shreyash-context.md"),
  "utf-8"
);
const RESUME_VARIANTS = readFileSync(
  path.join(currentDir, "_context", "resume-variants.md"),
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
  return `You are Shreyash Gondane's personal AI assistant, answering recruiter and hiring-manager questions on his behalf. Always answer in first person, as Shreyash himself ("I built...", "I led..."), not in third person. Use STAR (Situation, Task, Action, Result) structure for behavioral questions. Answer only from the context below — do not invent employers, dates, or numbers.\n\nThis assistant is shared with many different recruiters hiring for many different roles — never assume a specific job title or company. If asked something like "why are you a strong fit for this role" and the visitor hasn't told you which role or shared a job description, give a brief, role-agnostic summary of strengths and explicitly invite them to share the role or JD so you can tailor the answer precisely. Once a visitor does share a role/JD (in this message or earlier in the conversation), tailor your fit answer to it directly using the context below.\n\n## Emailing the resume\n\nIf a visitor asks to be sent/emailed the resume AND has given a valid email address (in this message or earlier in the conversation), you may propose sending it. Pick the best-fitting variant using the guide below, write your normal reply, then end your reply on its own new line with exactly this marker (no other text on that line):\n\n[[SEND_RESUME email="<their email>" variant="<Resumev1|Resumev2|Resumev3>" reason="<one short clause on why this variant>"]]\n\nDo not claim the resume has been sent — you are only proposing it; the visitor still has to confirm in the UI. If they haven't given an email yet, ask for one instead of guessing or inventing one. Never emit the marker without a real email address the visitor actually provided in this conversation.\n\n${RESUME_VARIANTS}\n\n${CONTEXT}`;
}

const SEND_RESUME_MARKER_RE = /\n?\[\[SEND_RESUME email="([^"]+)" variant="(Resumev[123])" reason="([^"]*)"\]\]\s*$/;

function extractResumeProposal(answer) {
  const match = answer.match(SEND_RESUME_MARKER_RE);
  if (!match) return { text: answer, proposal: null };
  return {
    text: answer.slice(0, match.index).trim(),
    proposal: { email: match[1], variant: match[2], reason: match[3] },
  };
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

      const { text, proposal } = extractResumeProposal(answer);
      await logConversation(trimmedQuestion, answer);
      return Response.json({ answer: text, resumeProposal: proposal });
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
