import { NextRequest, NextResponse } from "next/server";
import { getPayload } from "payload";
import { Resend } from "resend";
import config from "@payload-config";
import { contactSchema } from "@/lib/contact-schema";

const RATE_LIMIT_MAP = new Map<string, { count: number; resetAt: number }>();
const RATE_LIMIT_MAX = 5;
const RATE_LIMIT_WINDOW = 15 * 60 * 1000;

function getClientIp(request: NextRequest): string {
  const xff = request.headers.get("x-forwarded-for");
  if (xff) {
    const parts = xff.split(",").map((part) => part.trim()).filter(Boolean);
    if (parts.length > 0) return parts[parts.length - 1];
  }
  return request.headers.get("x-real-ip") ?? "unknown";
}

function checkRateLimit(ip: string): boolean {
  const now = Date.now();
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
    const response = await fetch("https://challenges.cloudflare.com/turnstile/v0/siteverify", {
      method: "POST",
      body,
    });
    const data = (await response.json()) as { success?: boolean };
    return data.success === true;
  } catch (error) {
    console.error("[contact] Turnstile verification failed:", error);
    return false;
  }
}

function getErrorMessage(error: unknown): string {
  if (error instanceof Error) return error.message.slice(0, 2000);
  return String(error).slice(0, 2000);
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

    const { name, email, subject, message, interest, project } = parsed.data;
    const source = parsed.data.source ?? "contact";
    const locale = parsed.data.locale ?? "de";

    const turnstileSecret = process.env.TURNSTILE_SECRET_KEY;
    if (turnstileSecret) {
      const token = (raw as { turnstileToken?: unknown }).turnstileToken;
      if (typeof token !== "string" || token.length === 0 || !(await verifyTurnstile(turnstileSecret, token, ip))) {
        return NextResponse.json({ error: "Bot-Verifikation fehlgeschlagen." }, { status: 403 });
      }
    }

    const resendKey = process.env.RESEND_API_KEY;
    const payload = await getPayload({ config });
    const submission = await payload.create({
      collection: "contact-submissions",
      overrideAccess: true,
      data: {
        source,
        locale,
        name,
        email,
        subject,
        message,
        interest,
        project,
        status: "new",
        emailStatus: resendKey ? "pending" : "skipped",
      },
    });

    if (!resendKey) {
      console.log("[Contact Form saved]", { id: submission.id, source, name, email, subject });
      return NextResponse.json({
        success: true,
        emailSent: false,
        message: "Anfrage erfolgreich gespeichert.",
      });
    }

    try {
      const resend = new Resend(resendKey);
      const formLabel = source === "join" ? "Teil werden" : "Kontaktformular";
      const result = await resend.emails.send({
        from: "Uccelli Website <noreply@uccelli-society.ch>",
        to: "uccelli.society@gmail.com",
        replyTo: email,
        subject: `[${formLabel}] ${subject.replace(/[\r\n]+/g, " ")}`,
        text: `Formular: ${formLabel}\nSprache: ${locale}\nName: ${name}\nE-Mail: ${email}\nBetreff: ${subject}\nInteresse: ${interest ?? "–"}\nProjekt: ${project ?? "–"}\n\nNachricht:\n${message}`,
      });

      if (result.error) throw new Error(result.error.message);

      await payload.update({
        collection: "contact-submissions",
        id: submission.id,
        overrideAccess: true,
        data: {
          emailStatus: "sent",
          emailId: result.data?.id,
          emailError: null,
        },
      });

      return NextResponse.json({
        success: true,
        emailSent: true,
        message: "Anfrage erfolgreich gespeichert und versendet.",
      });
    } catch (emailError) {
      const emailErrorMessage = getErrorMessage(emailError);
      console.error("[contact] Notification email failed:", emailError);

      await payload.update({
        collection: "contact-submissions",
        id: submission.id,
        overrideAccess: true,
        data: {
          emailStatus: "failed",
          emailError: emailErrorMessage,
        },
      });

      return NextResponse.json({
        success: true,
        emailSent: false,
        message: "Anfrage gespeichert. Die E-Mail-Benachrichtigung konnte nicht versendet werden.",
      });
    }
  } catch (error) {
    console.error("Contact form error:", error);
    return NextResponse.json({ error: "Ein Fehler ist aufgetreten." }, { status: 500 });
  }
}
