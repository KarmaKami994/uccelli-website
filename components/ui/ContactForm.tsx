"use client";

import { useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useTranslations } from "next-intl";
import { Turnstile, type TurnstileInstance } from "@marsidev/react-turnstile";
import { Button } from "./Button";
import { createContactSchema, type ContactFormData } from "@/lib/contact-schema";

interface ContactFormProps {
  /** Cloudflare Turnstile site key (public). When unset, the widget is not rendered (dev). */
  turnstileSiteKey?: string;
}

export function ContactForm({ turnstileSiteKey }: ContactFormProps) {
  const t = useTranslations("kontakt.form");
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">("idle");
  const [serverError, setServerError] = useState("");
  const [turnstileToken, setTurnstileToken] = useState("");
  const turnstileRef = useRef<TurnstileInstance | null>(null);

  const contactSchema = createContactSchema({
    name: t("valName"),
    email: t("valEmail"),
    subject: t("valSubject"),
    message: t("valMessage"),
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ContactFormData>({
    resolver: zodResolver(contactSchema),
  });

  async function onSubmit(data: ContactFormData) {
    setStatus("sending");
    setServerError("");

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...data, turnstileToken }),
      });

      const result = await res.json();

      if (!res.ok) {
        setServerError(result.error || t("errorGeneric"));
        setStatus("error");
        // Turnstile tokens are single-use — get a fresh one for the retry.
        turnstileRef.current?.reset();
        setTurnstileToken("");
        return;
      }

      setStatus("sent");
    } catch {
      setServerError(t("errorConnection"));
      setStatus("error");
      turnstileRef.current?.reset();
      setTurnstileToken("");
    }
  }

  if (status === "sent") {
    return (
      <div className="py-12 text-center border border-dashed border-neutral-300 rounded-[12px]">
        <div className="text-2xl mb-3">✓</div>
        <p className="text-lg font-bold mb-2">{t("successTitle")}</p>
        <p className="text-neutral-500">{t("successText")}</p>
      </div>
    );
  }

  const fields = [
    { name: "name" as const, label: t("name"), type: "text" },
    { name: "email" as const, label: t("email"), type: "email" },
    { name: "subject" as const, label: t("subject"), type: "text" },
  ] as const;

  const waitingForTurnstile = Boolean(turnstileSiteKey) && turnstileToken === "";

  return (
    <form onSubmit={(e) => void handleSubmit(onSubmit)(e)} noValidate>
      <div className="space-y-5">
        {fields.map((field) => (
          <div key={field.name}>
            <label htmlFor={field.name} className="block text-[13px] font-bold uppercase tracking-wide mb-2">
              {field.label}
            </label>
            <input
              id={field.name}
              type={field.type}
              {...register(field.name)}
              className={`w-full border-b bg-transparent py-2.5 text-[15px] outline-none transition-colors ${
                errors[field.name] ? "border-red-400 focus:border-red-500" : "border-neutral-300 focus:border-black"
              }`}
            />
            {errors[field.name] && (
              <p className="text-red-500 text-[12px] mt-1.5" role="alert">{errors[field.name]?.message}</p>
            )}
          </div>
        ))}

        <div>
          <label htmlFor="message" className="block text-[13px] font-bold uppercase tracking-wide mb-2">
            {t("message")}
          </label>
          <textarea
            id="message"
            rows={5}
            {...register("message")}
            className={`w-full border-b bg-transparent py-2.5 text-[15px] outline-none transition-colors resize-y ${
              errors.message ? "border-red-400 focus:border-red-500" : "border-neutral-300 focus:border-black"
            }`}
          />
          {errors.message && (
            <p className="text-red-500 text-[12px] mt-1.5" role="alert">{errors.message.message}</p>
          )}
        </div>

        {turnstileSiteKey && (
          <Turnstile
            ref={turnstileRef}
            siteKey={turnstileSiteKey}
            onSuccess={setTurnstileToken}
            onExpire={() => setTurnstileToken("")}
            options={{ theme: "light" }}
          />
        )}

        {serverError && (
          <p className="text-red-500 text-[13px]" role="alert">{serverError}</p>
        )}

        <Button type="submit" variant="primary" disabled={status === "sending" || waitingForTurnstile}>
          {status === "sending" ? t("sending") : t("send")}
        </Button>
      </div>
    </form>
  );
}
