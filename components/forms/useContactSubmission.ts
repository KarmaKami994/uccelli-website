"use client";

import { useRef, useState } from "react";
import type { TurnstileInstance } from "@marsidev/react-turnstile";
import type { ContactFormData } from "@/lib/contact-schema";

type SubmissionStatus = "idle" | "sending" | "sent" | "error";

type ContactApiResponse = {
  error?: string;
};

interface UseContactSubmissionOptions {
  turnstileSiteKey?: string;
  genericError: string;
  connectionError: string;
}

export function useContactSubmission({
  turnstileSiteKey,
  genericError,
  connectionError,
}: UseContactSubmissionOptions) {
  const [status, setStatus] = useState<SubmissionStatus>("idle");
  const [serverError, setServerError] = useState("");
  const [turnstileToken, setTurnstileToken] = useState("");
  const turnstileRef = useRef<TurnstileInstance | null>(null);

  function resetChallenge() {
    turnstileRef.current?.reset();
    setTurnstileToken("");
  }

  async function submit(data: ContactFormData) {
    setStatus("sending");
    setServerError("");

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...data, turnstileToken: turnstileToken || undefined }),
      });
      const result = (await response.json().catch(() => ({}))) as ContactApiResponse;

      if (!response.ok) {
        setServerError(result.error || genericError);
        setStatus("error");
        resetChallenge();
        return;
      }

      setStatus("sent");
    } catch {
      setServerError(connectionError);
      setStatus("error");
      resetChallenge();
    }
  }

  return {
    serverError,
    status,
    submit,
    turnstileRef,
    waitingForTurnstile: Boolean(turnstileSiteKey) && turnstileToken === "",
    onTurnstileExpire: () => setTurnstileToken(""),
    onTurnstileSuccess: setTurnstileToken,
  };
}
