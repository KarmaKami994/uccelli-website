"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Button } from "./Button";

const contactSchema = z.object({
  name: z.string().min(2, "Name muss mindestens 2 Zeichen lang sein."),
  email: z.string().email("Bitte gib eine gültige E-Mail-Adresse ein."),
  subject: z.string().min(3, "Betreff muss mindestens 3 Zeichen lang sein."),
  message: z.string().min(10, "Nachricht muss mindestens 10 Zeichen lang sein."),
});

type ContactFormData = z.infer<typeof contactSchema>;

export function ContactForm() {
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">("idle");
  const [serverError, setServerError] = useState("");

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
        setServerError(result.error || "Ein Fehler ist aufgetreten.");
        setStatus("error");
        return;
      }

      setStatus("sent");
    } catch {
      setServerError("Verbindungsfehler. Bitte versuche es erneut.");
      setStatus("error");
    }
  }

  if (status === "sent") {
    return (
      <div className="py-12 text-center border border-dashed border-neutral-300 rounded-[12px]">
        <div className="text-2xl mb-3">✓</div>
        <p className="text-lg font-bold mb-2">Nachricht gesendet!</p>
        <p className="text-neutral-500">Wir werden uns so schnell wie möglich bei dir melden.</p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} noValidate>
      <div className="space-y-5">
        {([
          { name: "name" as const, label: "Name", type: "text" },
          { name: "email" as const, label: "Email", type: "email" },
          { name: "subject" as const, label: "Betreff", type: "text" },
        ] as const).map((field) => (
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
            Nachricht
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

        {/* Turnstile widget placeholder — add site key in production */}
        {/* <div id="turnstile-widget" className="mt-2" /> */}

        {serverError && (
          <div className="bg-red-50 text-red-700 text-[13px] px-4 py-3 rounded-[8px]" role="alert">
            {serverError}
          </div>
        )}

        <Button type="submit" variant="primary" disabled={status === "sending"}>
          {status === "sending" ? "WIRD GESENDET..." : "SENDEN"}
        </Button>
      </div>
    </form>
  );
}
