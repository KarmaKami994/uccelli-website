"use client";

import { useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { useLocale, useTranslations } from "next-intl";
import { Turnstile, type TurnstileInstance } from "@marsidev/react-turnstile";
import { Button } from "@/components/ui/Button";

const interestValues = ["project", "volunteer", "membership", "partnership", "support", "general"] as const;
type Interest = (typeof interestValues)[number];

type JoinFormData = {
  name: string;
  email: string;
  interest: Interest;
  project?: string;
  message: string;
};

export function JoinForm({
  projects,
  initialInterest = "general",
  initialProject = "",
  turnstileSiteKey,
}: {
  projects: { slug: string; title: string }[];
  initialInterest?: string;
  initialProject?: string;
  turnstileSiteKey?: string;
}) {
  const t = useTranslations("join.form");
  const locale = useLocale() === "en" ? "en" : "de";
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">("idle");
  const [serverError, setServerError] = useState("");
  const [turnstileToken, setTurnstileToken] = useState("");
  const turnstileRef = useRef<TurnstileInstance | null>(null);
  const safeInterest = interestValues.includes(initialInterest as Interest) ? (initialInterest as Interest) : "general";

  const { register, handleSubmit, formState: { errors } } = useForm<JoinFormData>({
    defaultValues: { interest: safeInterest, project: initialProject },
  });

  async function onSubmit(data: JoinFormData) {
    setStatus("sending");
    setServerError("");
    const interestLabel = t(`interests.${data.interest}`);
    const projectTitle = projects.find((project) => project.slug === data.project)?.title;
    const subject = `${interestLabel}${projectTitle ? ` – ${projectTitle}` : ""}`;
    const message = `${t("interest")}: ${interestLabel}\n${t("project")}: ${projectTitle || t("none")}\n\n${data.message}`;

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: data.name,
          email: data.email,
          subject,
          message,
          source: "join",
          interest: data.interest,
          project: projectTitle,
          locale,
          turnstileToken,
        }),
      });
      const result = await response.json();
      if (!response.ok) {
        setServerError(result.error || t("errorGeneric"));
        setStatus("error");
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
        <div className="text-2xl mb-3" aria-hidden="true">✓</div>
        <p className="text-lg font-bold mb-2">{t("successTitle")}</p>
        <p className="text-neutral-500">{t("successText")}</p>
      </div>
    );
  }

  const inputClass = "w-full border-b bg-transparent py-2.5 text-[15px] outline-none border-neutral-300 focus:border-black transition-colors";
  const waitingForTurnstile = Boolean(turnstileSiteKey) && !turnstileToken;

  return (
    <form onSubmit={(event) => void handleSubmit(onSubmit)(event)} noValidate className="space-y-6">
      <div>
        <label htmlFor="join-name" className="block text-[13px] font-bold uppercase tracking-wide mb-2">{t("name")}</label>
        <input id="join-name" {...register("name", { required: t("required"), minLength: { value: 2, message: t("required") } })} className={inputClass} />
        {errors.name && <p role="alert" className="text-red-500 text-[12px] mt-1.5">{errors.name.message}</p>}
      </div>

      <div>
        <label htmlFor="join-email" className="block text-[13px] font-bold uppercase tracking-wide mb-2">{t("email")}</label>
        <input id="join-email" type="email" {...register("email", { required: t("required"), pattern: { value: /^\S+@\S+\.\S+$/, message: t("emailInvalid") } })} className={inputClass} />
        {errors.email && <p role="alert" className="text-red-500 text-[12px] mt-1.5">{errors.email.message}</p>}
      </div>

      <div>
        <label htmlFor="join-interest" className="block text-[13px] font-bold uppercase tracking-wide mb-2">{t("interest")}</label>
        <select id="join-interest" {...register("interest", { required: true })} className={inputClass}>
          {interestValues.map((value) => <option key={value} value={value}>{t(`interests.${value}`)}</option>)}
        </select>
      </div>

      <div>
        <label htmlFor="join-project" className="block text-[13px] font-bold uppercase tracking-wide mb-2">{t("project")}</label>
        <select id="join-project" {...register("project")} className={inputClass}>
          <option value="">{t("none")}</option>
          {projects.map((project) => <option key={project.slug} value={project.slug}>{project.title}</option>)}
        </select>
      </div>

      <div>
        <label htmlFor="join-message" className="block text-[13px] font-bold uppercase tracking-wide mb-2">{t("message")}</label>
        <textarea id="join-message" rows={6} {...register("message", { required: t("required"), minLength: { value: 10, message: t("messageShort") } })} className={`${inputClass} resize-y`} />
        {errors.message && <p role="alert" className="text-red-500 text-[12px] mt-1.5">{errors.message.message}</p>}
      </div>

      {turnstileSiteKey && (
        <Turnstile ref={turnstileRef} siteKey={turnstileSiteKey} onSuccess={setTurnstileToken} onExpire={() => setTurnstileToken("")} options={{ theme: "light" }} />
      )}

      {serverError && <p className="text-red-500 text-[13px]" role="alert">{serverError}</p>}

      <Button type="submit" variant="primary" disabled={status === "sending" || waitingForTurnstile}>
        {status === "sending" ? t("sending") : t("send")}
      </Button>
    </form>
  );
}
