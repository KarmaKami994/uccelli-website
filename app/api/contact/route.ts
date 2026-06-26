import { NextRequest, NextResponse } from "next/server";

const TURNSTILE_SECRET = process.env.TURNSTILE_SECRET_KEY;
const RATE_LIMIT_MAP = new Map<string, { count: number; resetAt: number }>();
const RATE_LIMIT_MAX = 5;
const RATE_LIMIT_WINDOW = 15 * 60 * 1000; // 15 minutes

function getResend() {
  const key = process.env.RESEND_API_KEY;
  if (!key) return null;
  // Dynamic import to avoid build-time error
  const { Resend } = require("resend");
  return new Resend(key);
}

function checkRateLimit(ip: string): boolean {
  const now = Date.now();
  const entry = RATE_LIMIT_MAP.get(ip);
  if (!entry || now > entry.resetAt) {
    RATE_LIMIT_MAP.set(ip, { count: 1, resetAt: now + RATE_LIMIT_WINDOW });
    return true;
  }
  if (entry.count >= RATE_LIMIT_MAX) return false;
  entry.count++;
  return true;
}

async function verifyTurnstile(token: string, ip: string): Promise<boolean> {
  if (!TURNSTILE_SECRET) return true; // Skip in dev if not configured
  const res = await fetch("https://challenges.cloudflare.com/turnstile/v0/siteverify", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ secret: TURNSTILE_SECRET, response: token, remoteip: ip }),
  });
  const data = await res.json();
  return data.success === true;
}

export async function POST(request: NextRequest) {
  try {
    const ip = request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || "unknown";

    // Rate limiting
    if (!checkRateLimit(ip)) {
      return NextResponse.json(
        { error: "Zu viele Anfragen. Bitte versuche es in 15 Minuten erneut." },
        { status: 429 }
      );
    }

    const body = await request.json();
    const { name, email, subject, message, turnstileToken } = body;

    // Validation
    if (!name || !email || !subject || !message) {
      return NextResponse.json({ error: "Alle Felder sind erforderlich." }, { status: 400 });
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return NextResponse.json({ error: "Ungültige E-Mail-Adresse." }, { status: 400 });
    }

    // Turnstile verification
    if (TURNSTILE_SECRET && turnstileToken) {
      const valid = await verifyTurnstile(turnstileToken, ip);
      if (!valid) {
        return NextResponse.json({ error: "Bot-Verifikation fehlgeschlagen." }, { status: 403 });
      }
    }

    // Send email via Resend
    const resend = getResend();
    if (resend) {
      await resend.emails.send({
        from: "Uccelli Website <noreply@uccelli-society.ch>",
        to: "uccelli.society@gmail.com",
        replyTo: email,
        subject: `[Kontaktformular] ${subject}`,
        text: `Name: ${name}\nE-Mail: ${email}\nBetreff: ${subject}\n\nNachricht:\n${message}`,
      });
    } else {
      // Dev mode: log to console
      console.log("[Contact Form]", { name, email, subject, message });
    }

    return NextResponse.json({ success: true, message: "Nachricht erfolgreich gesendet." });
  } catch (error) {
    console.error("Contact form error:", error);
    return NextResponse.json({ error: "Ein Fehler ist aufgetreten." }, { status: 500 });
  }
}
