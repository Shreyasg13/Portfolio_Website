// Emails one of the resume variants to a visitor via SendGrid. Only ever
// called after the visitor has explicitly confirmed in the chat UI — the
// assistant can *propose* a send (see ask-shreyash.mjs's SEND_RESUME
// marker) but never triggers this endpoint itself, so a prompt-injected
// or misread request can't cause an unwanted email on its own.
import { readFileSync, existsSync } from "fs";
import { fileURLToPath } from "url";
import path from "path";
import { getStore } from "@netlify/blobs";

const currentDir = path.dirname(fileURLToPath(import.meta.url));
const VALID_VARIANTS = new Set(["Resumev1", "Resumev2", "Resumev3"]);
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

// Abuse guard on a public, unauthenticated, email-sending endpoint: cap
// sends per requester email and a global daily cap, both tracked in Blobs.
const MAX_PER_EMAIL_PER_DAY = 3;
const MAX_TOTAL_PER_DAY = 100;

function todayKey() {
  return new Date().toISOString().slice(0, 10);
}

async function checkAndRecordRateLimit(store, email) {
  const key = `day-${todayKey()}`;
  const day = (await store.get(key, { type: "json" })) || { total: 0, byEmail: {} };

  if (day.total >= MAX_TOTAL_PER_DAY) {
    return { ok: false, reason: "Daily send limit reached — please try again tomorrow." };
  }
  if ((day.byEmail[email] || 0) >= MAX_PER_EMAIL_PER_DAY) {
    return { ok: false, reason: "That email has already received the resume the maximum number of times today." };
  }

  day.total += 1;
  day.byEmail[email] = (day.byEmail[email] || 0) + 1;
  await store.setJSON(key, day);
  return { ok: true };
}

// Logs every real attempt (rate-limited, failed, or sent) so /admin/visitors
// can show a full "what actually happened" picture, not just successes.
async function logAttempt({ email, variant, status, detail }) {
  try {
    const log = getStore("resume-send-log");
    const key = new Date().toISOString() + "-" + Math.random().toString(36).slice(2, 8);
    await log.setJSON(key, { email, variant, status, detail: detail || null, timestamp: new Date().toISOString() });
  } catch (err) {
    console.error("Failed to log resume-send attempt", err);
  }
}

export default async (req) => {
  if (req.method !== "POST") {
    return new Response("Method Not Allowed", { status: 405 });
  }

  const apiKey = process.env.SENDGRID_API_KEY;
  const fromEmail = process.env.SENDGRID_FROM_EMAIL;
  if (!apiKey || !fromEmail) {
    return Response.json(
      { error: "Resume email isn't configured yet." },
      { status: 503 }
    );
  }

  let body;
  try {
    body = await req.json();
  } catch {
    return new Response("Invalid JSON", { status: 400 });
  }

  const email = typeof body.email === "string" ? body.email.trim() : "";
  const variant = typeof body.variant === "string" ? body.variant.trim() : "";

  if (!EMAIL_RE.test(email)) {
    return Response.json({ error: "That doesn't look like a valid email address." }, { status: 400 });
  }
  if (!VALID_VARIANTS.has(variant)) {
    return Response.json({ error: "Unknown resume variant." }, { status: 400 });
  }

  const pdfPath = path.join(currentDir, "..", "..", "src", "Assets", `${variant}.pdf`);
  if (!existsSync(pdfPath)) {
    console.error("send-resume: missing PDF for variant", variant, pdfPath);
    await logAttempt({ email, variant, status: "failed", detail: "resume file missing" });
    return Response.json({ error: "That resume variant isn't available right now." }, { status: 503 });
  }

  const rateStore = getStore("resume-send-rate");
  const limit = await checkAndRecordRateLimit(rateStore, email);
  if (!limit.ok) {
    await logAttempt({ email, variant, status: "rate_limited", detail: limit.reason });
    return Response.json({ error: limit.reason }, { status: 429 });
  }

  try {
    const pdfBase64 = readFileSync(pdfPath).toString("base64");

    const sgResponse = await fetch("https://api.sendgrid.com/v3/mail/send", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        personalizations: [{ to: [{ email }] }],
        from: { email: fromEmail, name: "Shreyash Gondane" },
        subject: "Shreyash Gondane — Resume",
        content: [
          {
            type: "text/plain",
            value: "Thanks for your interest — my resume is attached.\n\nBest,\nShreyash",
          },
        ],
        attachments: [
          {
            content: pdfBase64,
            filename: "Shreyash_Gondane_Resume.pdf",
            type: "application/pdf",
            disposition: "attachment",
          },
        ],
      }),
    });

    if (!sgResponse.ok) {
      const errBody = await sgResponse.text();
      console.error("SendGrid error", sgResponse.status, errBody.slice(0, 300));
      await logAttempt({ email, variant, status: "failed", detail: `SendGrid ${sgResponse.status}` });
      return Response.json({ error: "Failed to send the email — please try again shortly." }, { status: 502 });
    }

    await logAttempt({ email, variant, status: "sent" });
    return Response.json({ ok: true });
  } catch (err) {
    console.error("send-resume error", err);
    await logAttempt({ email, variant, status: "failed", detail: String(err).slice(0, 200) });
    return Response.json({ error: "Failed to send the email — please try again shortly." }, { status: 500 });
  }
};
