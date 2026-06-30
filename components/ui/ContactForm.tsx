"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useTranslations } from "next-intl";
import { Button } from "./Button";

type ContactFormData = {
  name: string;
  email: string;
  subject: string;
  message: string;
};

export function ContactForm() {
  const t = useTranslations("kontakt.form");
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">("idle");
  const [serverError, setServerError] = useState("");

  const contactSchema = z.object({
    name: z.string().min(2, t("valName")),
    email: z.string().email(t("valEmail")),
    subject: z.string().min(3, t("valSubject")),
    message: z.string().min(10, t("valMessage")),
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
        body: JSON.stringify({ ...data, turnstileToken: "" }),
      });

      const result = await res.json();

      if (!res.ok) {
        setServerError(result.error || t("errorGeneric"));
        setStatus("error");
        return;
      }

      setStatus("sent");
    } catch {
      setServerError(t("errorConnection"));
      setStatus("error");
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

  return (
    <form onSubmit={handleSubmit(onSubmit)} noValidate>
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
            className={`w-full border-b bg-transparent py-2.5 text-[15px] outline-none resize-none transition-colors ${
              errors.message ? "border-red-400 focus:border-red-500" : "border-neutral-300 focus:border-black"
            }`}
          />
          {errors.message && (
            <p className="text-red-500 text-[12px] mt-1.5" role="alert">{errors.message.message}</p>
          )}
        </div>

        {serverError && (
          <div className="bg-red-50 text-red-700 text-[13px] px-4 py-3 rounded-[8px]" role="alert">
            {serverError}
          </div>
        )}

        <Button type="submit" variant="primary" disabled={status === "sending"}>
          {status === "sending" ? t("sending") : t("send")}
        </Button>
      </div>
    </form>
  );
}
