"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useLocale, useTranslations } from "next-intl";
import { Turnstile } from "@marsidev/react-turnstile";
import { useContactSubmission } from "@/components/forms/useContactSubmission";
import { Button } from "@/components/ui/Button";
import {
  contactInterests,
  createJoinFormSchema,
  type JoinFormData,
} from "@/lib/contact-schema";

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
  const safeInterest = contactInterests.includes(initialInterest as JoinFormData["interest"])
    ? (initialInterest as JoinFormData["interest"])
    : "general";
  const joinSchema = createJoinFormSchema({
    name: t("required"),
    email: t("emailInvalid"),
    message: t("messageShort"),
  });
  const {
    onTurnstileExpire,
    onTurnstileSuccess,
    serverError,
    status,
    submit,
    turnstileRef,
    waitingForTurnstile,
  } = useContactSubmission({
    turnstileSiteKey,
    genericError: t("errorGeneric"),
    connectionError: t("errorConnection"),
  });

  const { register, handleSubmit, formState: { errors } } = useForm<JoinFormData>({
    resolver: zodResolver(joinSchema),
    defaultValues: { interest: safeInterest, project: initialProject },
  });

  async function onSubmit(data: JoinFormData) {
    const interestLabel = t(`interests.${data.interest}`);
    const projectTitle = projects.find((project) => project.slug === data.project)?.title;
    const subject = `${interestLabel}${projectTitle ? ` – ${projectTitle}` : ""}`;
    const message = `${t("interest")}: ${interestLabel}\n${t("project")}: ${projectTitle || t("none")}\n\n${data.message}`;

    await submit({
      name: data.name,
      email: data.email,
      subject,
      message,
      source: "join",
      interest: data.interest,
      project: projectTitle,
      locale,
    });
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
  return (
    <form onSubmit={(event) => void handleSubmit(onSubmit)(event)} noValidate className="space-y-6">
      <div>
        <label htmlFor="join-name" className="block text-[13px] font-bold uppercase tracking-wide mb-2">{t("name")}</label>
        <input id="join-name" {...register("name")} className={inputClass} />
        {errors.name && <p role="alert" className="text-red-500 text-[12px] mt-1.5">{errors.name.message}</p>}
      </div>

      <div>
        <label htmlFor="join-email" className="block text-[13px] font-bold uppercase tracking-wide mb-2">{t("email")}</label>
        <input id="join-email" type="email" {...register("email")} className={inputClass} />
        {errors.email && <p role="alert" className="text-red-500 text-[12px] mt-1.5">{errors.email.message}</p>}
      </div>

      <div>
        <label htmlFor="join-interest" className="block text-[13px] font-bold uppercase tracking-wide mb-2">{t("interest")}</label>
        <select id="join-interest" {...register("interest")} className={inputClass}>
          {contactInterests.map((value) => <option key={value} value={value}>{t(`interests.${value}`)}</option>)}
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
        <textarea id="join-message" rows={6} {...register("message")} className={`${inputClass} resize-y`} />
        {errors.message && <p role="alert" className="text-red-500 text-[12px] mt-1.5">{errors.message.message}</p>}
      </div>

      {turnstileSiteKey && (
        <Turnstile ref={turnstileRef} siteKey={turnstileSiteKey} onSuccess={onTurnstileSuccess} onExpire={onTurnstileExpire} options={{ theme: "light" }} />
      )}

      {serverError && <p className="text-red-500 text-[13px]" role="alert">{serverError}</p>}

      <Button type="submit" variant="primary" disabled={status === "sending" || waitingForTurnstile}>
        {status === "sending" ? t("sending") : t("send")}
      </Button>
    </form>
  );
}
