"use client";

import { useState } from "react";
import { Button } from "./Button";

export function ContactForm() {
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">("idle");

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("sending");
    // TODO: Connect to API route with Turnstile verification
    await new Promise((r) => setTimeout(r, 1000));
    setStatus("sent");
  }

  if (status === "sent") {
    return (
      <div className="py-12 text-center">
        <p className="text-lg font-bold mb-2">Nachricht gesendet!</p>
        <p className="text-neutral-500">Wir werden uns so schnell wie möglich bei dir melden.</p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit}>
      <div className="space-y-6">
        {[
          { name: "name", label: "Name", type: "text" },
          { name: "email", label: "Email", type: "email" },
          { name: "subject", label: "Betreff", type: "text" },
        ].map((field) => (
          <div key={field.name}>
            <label htmlFor={field.name} className="block text-[13px] font-bold uppercase tracking-wide mb-2">
              {field.label}
            </label>
            <input
              id={field.name}
              name={field.name}
              type={field.type}
              required
              className="w-full border-b border-neutral-300 bg-transparent py-2.5 text-[15px] outline-none focus:border-black transition-colors placeholder:text-neutral-400"
            />
          </div>
        ))}
        <div>
          <label htmlFor="message" className="block text-[13px] font-bold uppercase tracking-wide mb-2">
            Nachricht
          </label>
          <textarea
            id="message"
            name="message"
            rows={5}
            required
            className="w-full border-b border-neutral-300 bg-transparent py-2.5 text-[15px] outline-none focus:border-black transition-colors resize-none placeholder:text-neutral-400"
          />
        </div>
        <Button type="submit" variant="primary" disabled={status === "sending"}>
          {status === "sending" ? "WIRD GESENDET..." : "SENDEN"}
        </Button>
      </div>
    </form>
  );
}
