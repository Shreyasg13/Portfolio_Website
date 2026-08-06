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
//
// OpenRouter's free-tier catalog turns over — the previous list
// (qwen3-next-80b/qwen3-coder/llama-3.3-70b, all :free) was fully
// deprecated/renamed at OpenRouter and silently 404ing on every request,
// which is why every reply was falling through to "all models exhausted."
// Re-picked from https://openrouter.ai/api/v1/models filtered to `:free`
// on 2026-07-23 — if this list goes stale again, re-check that endpoint
// rather than guessing at names.
const MODELS = [
  "openai/gpt-oss-20b:free",
  "google/gemma-4-31b-it:free",
  "nvidia/nemotron-3-super-120b-a12b:free",
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
  return `You are Shreyash Gondane's personal AI assistant, answering recruiter and hiring-manager questions on his behalf. Always answer in first person, as Shreyash himself ("I built...", "I led..."), not in third person. Use STAR (Situation, Task, Action, Result) structure for behavioral questions. Answer only from the context below — do not invent employers, dates, or numbers.\n\nThis assistant is shared with many different recruiters hiring for many different roles — never assume a specific job title or company. If asked something like "why are you a strong fit for this role" and the visitor hasn't told you which role or shared a job description, give a brief, role-agnostic summary of strengths and explicitly invite them to share the role or JD so you can tailor the answer precisely. Once a visitor does share a role/JD (in this message or earlier in the conversation), tailor your fit answer to it directly using the context below.\n\n## Emailing the resume\n\nIf a visitor asks to be sent/emailed the resume, you need TWO things before you may propose sending it: a valid email address, AND which position/role they're hiring for. If either is missing, ask for it — don't propose a send yet, and don't guess or invent either one. Once you have both (from this message or earlier in the conversation), pick the best-fitting variant using the guide below, write your normal reply, then end your reply on its own new line with exactly this marker (no other text on that line — valid JSON, no line breaks inside it):\n\n[[SEND_RESUME {"email": "<their email>", "variant": "<Resumev1|Resumev2|Resumev3>", "reason": "<one short clause on why this variant>", "message": "<a short, warm, personalized email body — 2-4 sentences, first person as Shreyash, referencing the specific role/company they mentioned and why this resume variant fits it. Use \\n\\n between paragraphs if more than one. Do not include a greeting/signature — those are added automatically.>"}]]\n\nDo not claim the resume has been sent — you are only proposing it; the visitor still has to confirm in the UI. Never emit the marker without a real email address and a real position/role the visitor actually provided in this conversation.\n\n${RESUME_VARIANTS}\n\n${CONTEXT}`;
}

const SEND_RESUME_MARKER_RE = /\n?\[\[SEND_RESUME (\{[\s\S]*\})\]\]\s*$/;
const RESUME_VARIANT_RE = /^Resumev[123]$/;
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

// Smaller/free-tier models don't always reliably escape newlines inside
// the JSON string values when asked for a multi-paragraph message, which
// breaks strict JSON.parse. Retry once with raw control characters inside
// the blob escaped before giving up on the whole proposal.
function parseMarkerJson(raw) {
  try {
    return JSON.parse(raw);
  } catch {
    const sanitized = raw.replace(/[\n\r\t]/g, (c) => (c === "\t" ? "\\t" : c === "\r" ? "\\r" : "\\n"));
    try {
      return JSON.parse(sanitized);
    } catch (err) {
      console.error("Failed to parse SEND_RESUME marker even after sanitizing", err);
      return null;
    }
  }
}

function extractResumeProposal(answer) {
  const match = answer.match(SEND_RESUME_MARKER_RE);
  if (!match) return { text: answer, proposal: null };

  const text = answer.slice(0, match.index).trim();
  const parsed = parseMarkerJson(match[1]);
  if (parsed) {
    if (
      typeof parsed.email === "string" && EMAIL_RE.test(parsed.email) &&
      typeof parsed.variant === "string" && RESUME_VARIANT_RE.test(parsed.variant)
    ) {
      return {
        text,
        proposal: {
          email: parsed.email,
          variant: parsed.variant,
          reason: typeof parsed.reason === "string" ? parsed.reason : "",
          message: typeof parsed.message === "string" ? parsed.message.slice(0, 1500) : "",
        },
      };
    }
  }
  // Malformed marker (bad JSON, unparseable even after sanitizing, or
  // invalid fields) — still strip it from what the visitor sees, but
  // don't propose a send off bad data.
  return { text, proposal: null };
}

// Free-tier models on OpenRouter share a rate-limited upstream queue and
// can return a real 200 OK 15-30s+ later under load — that's not a
// failure the existing 429/!ok handling below catches at all, so a slow
// (but eventually successful) model was blocking the whole request for as
// long as it felt like taking, with no fallback to a faster model in the
// list. Each attempt now gets its own budget; a model that blows through
// it is aborted and treated exactly like any other failed attempt, so the
// loop moves on to the next (faster, or eventually the guaranteed paid)
// model instead of just waiting.
const MODEL_TIMEOUT_MS = 6000;

async function callModel(model, apiKey, question, history = []) {
  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), MODEL_TIMEOUT_MS);
  try {
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
      signal: controller.signal,
    });
    return response;
  } finally {
    clearTimeout(timeoutId);
  }
}

class ModelAttemptError extends Error {
  constructor(model, status, body) {
    super(`model ${model} failed: ${status} ${body}`);
    this.model = model;
    this.status = status;
    this.body = body;
  }
}

// One model, one full attempt (including the existing 429-retry) — pulled
// out of the old for-loop's body so both the sequential fallback below AND
// the parallel race in the handler can share the exact same per-model
// behavior (including the 429 retry) instead of duplicating it.
async function attemptModel(model, apiKey, question, history) {
  let response = await callModel(model, apiKey, question, history);

  if (response.status === 429) {
    // Free-tier models share upstream rate limits — one short retry
    // resolves most transient hits before giving up on this model.
    await new Promise((r) => setTimeout(r, 1500));
    response = await callModel(model, apiKey, question, history);
  }

  if (!response.ok) {
    throw new ModelAttemptError(model, response.status, (await response.text()).slice(0, 300));
  }

  const data = await response.json();
  const answer = data?.choices?.[0]?.message?.content?.trim();
  if (!answer) {
    throw new ModelAttemptError(model, response.status, "empty completion");
  }
  return { model, answer };
}

function logAttemptFailure(err) {
  if (err instanceof ModelAttemptError) {
    console.error("ask-shreyash model attempt failed", err.model, err.status, err.body);
  } else {
    console.error("ask-shreyash model attempt failed", err);
  }
}

// Racing the first two (smallest/fastest) free models concurrently instead
// of trying them one at a time is the actual fix for the latency users hit
// in production: sequential attempts with a per-attempt timeout still SUM
// every failed/slow attempt's timeout before reaching a working model —
// live testing showed 17-30s replies even after that timeout was added,
// consistent with 2-3 sequential free-tier attempts each genuinely eating
// most of their budget under a busy shared queue. Racing bounds total wait
// to whichever of the two responds first, not their sum. Only falls
// through to the remaining models sequentially (as before, same 429/retry
// behavior) if BOTH racers fail — same free-tier cost profile as before in
// the common case, just parallel instead of serial.
const PARALLEL_MODEL_COUNT = 2;

async function resolveAnswer(apiKey, question, history) {
  const parallelModels = MODELS.slice(0, PARALLEL_MODEL_COUNT);
  const sequentialModels = MODELS.slice(PARALLEL_MODEL_COUNT);
  let lastError = null;

  try {
    return await Promise.any(
      parallelModels.map((model) =>
        attemptModel(model, apiKey, question, history).catch((err) => {
          logAttemptFailure(err);
          throw err;
        })
      )
    );
  } catch (aggregateErr) {
    const errors = aggregateErr.errors;
    lastError = errors && errors.length ? errors[errors.length - 1] : aggregateErr;
  }

  for (const model of sequentialModels) {
    try {
      return await attemptModel(model, apiKey, question, history);
    } catch (err) {
      logAttemptFailure(err);
      lastError = err;
    }
  }

  throw lastError;
}

// Netlify Functions have a hard execution ceiling (10s free tier / 26s
// paid — see lipsync-start.mjs for the same constraint documented there).
// The race + sequential-fallback chain above is bounded by MODEL_TIMEOUT_MS
// per attempt, but its worst case (both racers fail, then 1-2 more
// sequential attempts, one possibly with a 429 retry) can still add up
// past that ceiling — confirmed live: a real request took 31s and came
// back as Netlify's own generic platform-kill error
// (`{"errorType":"Error","errorMessage":"An unknown error has occurred"}`),
// not the graceful JSON fallback this function returns on a normal
// failure, because Netlify killed the process before that code ever ran.
// This races resolveAnswer against a fixed budget so THIS function always
// responds for itself, on time, with a real answer — never leaving it to
// the platform's kill switch.
const REQUEST_BUDGET_MS = 9000;

function budgetTimeout(ms) {
  return new Promise((resolve) => setTimeout(() => resolve({ timedOut: true }), ms));
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

  try {
    const result = await Promise.race([
      resolveAnswer(apiKey, trimmedQuestion, history),
      budgetTimeout(REQUEST_BUDGET_MS),
    ]);

    if (result.timedOut) {
      console.error("ask-shreyash: overall request budget exceeded", REQUEST_BUDGET_MS);
      return Response.json(
        {
          answer:
            "The AI models I use are responding slowly right now — please try again in a moment.",
        },
        { status: 502 }
      );
    }

    const { answer } = result;
    const { text, proposal } = extractResumeProposal(answer);
    await logConversation(trimmedQuestion, answer);
    return Response.json({ answer: text, resumeProposal: proposal });
  } catch (lastError) {
    console.error("ask-shreyash: all models exhausted", lastError);
    return Response.json(
      {
        answer:
          "All the free AI models I use are rate-limited right now — please try again in a minute.",
      },
      { status: 502 }
    );
  }
};
