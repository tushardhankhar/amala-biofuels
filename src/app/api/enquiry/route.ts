import { NextResponse } from "next/server";
import { company } from "@/content/site";
import { normaliseEnquiry, validateEnquiry, type EnquiryInput } from "@/lib/enquiry-schema";

export const runtime = "nodejs";

// Best-effort per-instance rate limit. For multi-instance production traffic,
// back this with a shared store (e.g. Upstash Redis) or a platform WAF rule.
const WINDOW_MS = 10 * 60 * 1000;
const MAX_PER_WINDOW = 5;
const hits = new Map<string, number[]>();

function rateLimited(ip: string) {
  const now = Date.now();
  const recent = (hits.get(ip) || []).filter((t) => now - t < WINDOW_MS);
  recent.push(now);
  hits.set(ip, recent);
  if (hits.size > 5000) hits.clear();
  return recent.length > MAX_PER_WINDOW;
}

const MIN_FILL_MS = 3000;

const esc = (s: string) =>
  s.replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[c]!);

function render(d: EnquiryInput) {
  const rows: [string, string][] = [
    ["Name", d.name],
    ["Company", d.company],
    ["Phone", d.phone],
    ["Email", d.email],
    ["Product of interest", d.product],
    ["Industry / application", d.industry],
    ["Quantity / monthly consumption", d.quantity || "—"],
    ["Delivery location", d.location || "—"],
  ];
  const text = [...rows.map(([k, v]) => `${k}: ${v}`), "", "Additional requirements:", d.message || "—"].join("\n");
  const html = `<table cellpadding="6" style="font-family:Arial,sans-serif;font-size:14px;border-collapse:collapse">${rows
    .map(([k, v]) => `<tr><td style="color:#555;vertical-align:top"><b>${esc(k)}</b></td><td>${esc(v)}</td></tr>`)
    .join("")}</table><p style="font-family:Arial,sans-serif;font-size:14px;white-space:pre-wrap"><b>Additional requirements</b><br>${esc(d.message || "—")}</p>`;
  return { text, html };
}

export async function POST(req: Request) {
  let raw: Record<string, unknown>;
  try {
    raw = await req.json();
  } catch {
    return NextResponse.json({ ok: false, error: "Invalid request." }, { status: 400 });
  }

  // Spam protection: honeypot field + minimum time-to-complete + rate limit.
  // Bots get a generic 400 — never a success response.
  const startedAt = Number(raw.startedAt);
  if ((typeof raw.website === "string" && raw.website.length > 0) || !startedAt || Date.now() - startedAt < MIN_FILL_MS) {
    return NextResponse.json({ ok: false, error: "Submission could not be accepted." }, { status: 400 });
  }
  const ip = (req.headers.get("x-forwarded-for") || "").split(",")[0].trim() || "unknown";
  if (rateLimited(ip)) {
    return NextResponse.json(
      { ok: false, error: "Too many submissions. Please try again in a few minutes." },
      { status: 429 },
    );
  }

  const data = normaliseEnquiry(raw);
  const errors = validateEnquiry(data);
  if (Object.keys(errors).length) {
    return NextResponse.json({ ok: false, error: "Please check the highlighted fields.", errors }, { status: 422 });
  }

  const { RESEND_API_KEY, ENQUIRY_FROM_EMAIL, ENQUIRY_TO_EMAIL, ENQUIRY_WEBHOOK_URL } = process.env;
  if (!RESEND_API_KEY || !ENQUIRY_FROM_EMAIL || !ENQUIRY_TO_EMAIL) {
    console.error("[enquiry] Email delivery is not configured (RESEND_API_KEY / ENQUIRY_FROM_EMAIL / ENQUIRY_TO_EMAIL).");
    return NextResponse.json(
      { ok: false, error: "Our enquiry service is temporarily unavailable. Please try again later." },
      { status: 503 },
    );
  }

  const { text, html } = render(data);
  try {
    const res = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: { Authorization: `Bearer ${RESEND_API_KEY}`, "Content-Type": "application/json" },
      body: JSON.stringify({
        from: ENQUIRY_FROM_EMAIL,
        to: ENQUIRY_TO_EMAIL.split(",").map((s) => s.trim()).filter(Boolean),
        reply_to: data.email,
        subject: `[${company.shortName} website] Quote request: ${data.product} — ${data.company}`,
        text,
        html,
      }),
      signal: AbortSignal.timeout(10000),
    });
    if (!res.ok) {
      console.error("[enquiry] Resend error", res.status, await res.text());
      throw new Error("delivery failed");
    }
  } catch (err) {
    console.error("[enquiry] Delivery failed", err);
    return NextResponse.json(
      { ok: false, error: "We couldn't send your enquiry just now. Please try again shortly." },
      { status: 502 },
    );
  }

  // Optional CRM hand-off. Email has already been delivered, so a webhook
  // failure is logged but does not fail the user's submission.
  if (ENQUIRY_WEBHOOK_URL) {
    try {
      await fetch(ENQUIRY_WEBHOOK_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...data, submittedAt: new Date().toISOString(), source: "website" }),
        signal: AbortSignal.timeout(5000),
      });
    } catch (err) {
      console.error("[enquiry] CRM webhook failed", err);
    }
  }

  return NextResponse.json({ ok: true });
}
