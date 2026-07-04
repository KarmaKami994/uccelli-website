import { NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";
import { contactSchema } from "@/lib/contact-schema";

const RATE_LIMIT_MAP = new Map<string, { count: number; resetAt: number }>();
const RATE_LIMIT_MAX = 5;
const RATE_LIMIT_WINDOW = 15 * 60 * 1000; // 15 minutes

function getClientIp(request: NextRequest): string {
  // Behind Nginx Proxy Manager the *last* entry is the one our trusted
  // proxy appended; earlier entries are client-controlled and spoofable.
  const xff = request.headers.get("x-forwarded-for");
  if (xff) {
    const parts = xff.split(",").map((p) => p.trim()).filter(Boolean);
    if (parts.length > 0) return parts[parts.length - 1];
  }
  return request.headers.get("x-real-ip") ?? "unknown";
}

function checkRateLimit(ip: string): boolean {
  const now = Date.now();
  // Sweep expired entries so the map cannot grow unbounded.
  for (const [key, entry] of RATE_LIMIT_MAP) {
    if (now > entry.resetAt) RATE_LIMIT_MAP.delete(key);
  }
  const entry = RATE_LIMIT_MAP.get(ip);
  if (!entry) {
    RATE_LIMIT_MAP.set(ip, { count: 1, resetAt: now + RATE_LIMIT_WINDOW });
    return true;
  }
  if (entry.count >= RATE_LIMIT_MAX) return false;
  entry.count++;
  return true;
}

async function verifyTurnstile(secret: string, token: string, ip: string): Promise<boolean> {
  try {
    const body = new URLSearchParams({ secret, response: token });
    if (ip !== "unknown") body.set("remoteip", ip);
    const res = await fetch("https://challenges.cloudflare.com/turnstile/v0/siteverify", {
      method: "POST",
      body,
    });
    const data = (await res.json()) as { success?: boolean };
    return data.success === true;
  } catch (error) {
    console.error("[contact] Turnstile verification failed:", error);
    return false;
  }
}

export async function POST(request: NextRequest) {
  try {
    const ip = getClientIp(request);

    if (!checkRateLimit(ip)) {
      return NextResponse.json(
        { error: "Zu viele Anfragen. Bitte versuche es in 15 Minuten erneut." },
        { status: 429 }
      );
    }

    let raw: unknown;
    try {
      raw = await request.json();
    } catch {
      return NextResponse.json({ error: "Ungültige Anfrage." }, { status: 400 });
    }

    const parsed = contactSchema.safeParse(raw);
    if (!parsed.success) {
      return NextResponse.json(
        { error: "Bitte überprüfe deine Eingaben.", issues: parsed.error.flatten().fieldErrors },
        { status: 400 }
      );
    }
    const { name, email, subject, message } = parsed.data;

    // Bot verification: when a Turnstile secret is configured, a valid
    // token is REQUIRED — omitting it must not bypass the check.
    const turnstileSecret = process.env.TURNSTILE_SECRET_KEY;
    if (turnstileSecret) {
      const token = (raw as { turnstileToken?: unknown }).turnstileToken;
      if (typeof token !== "string" || token.length === 0 || !(await verifyTurnstile(turnstileSecret, token, ip))) {
        return NextResponse.json({ error: "Bot-Verifikation fehlgeschlagen." }, { status: 403 });
      }
    }

    const resendKey = process.env.RESEND_API_KEY;
    if (resendKey) {
      const resend = new Resend(resendKey);
      await resend.emails.send({
        from: "Uccelli Website <noreply@uccelli-society.ch>",
        to: "uccelli.society@gmail.com",
        replyTo: email,
        subject: `[Kontaktformular] ${subject.replace(/[\r\n]+/g, " ")}`,
        text: `Name: ${name}\nE-Mail: ${email}\nBetreff: ${subject}\n\nNachricht:\n${message}`,
      });
    } else {
      // Dev mode: log to console
      console.log("[Contact Form]", { name, email, subject });
    }

    return NextResponse.json({ success: true, message: "Nachricht erfolgreich gesendet." });
  } catch (error) {
    console.error("Contact form error:", error);
    return NextResponse.json({ error: "Ein Fehler ist aufgetreten." }, { status: 500 });
  }
}
