import { z } from "zod";

export interface ContactMessages {
  name?: string;
  email?: string;
  subject?: string;
  message?: string;
}

export type JoinMessages = Pick<ContactMessages, "name" | "email" | "message">;

export const contactSources = ["contact", "join"] as const;
export const contactInterests = ["project", "volunteer", "membership", "partnership", "support", "general"] as const;
export const contactLocales = ["de", "en"] as const;

const nameSchema = (message?: string) => z.string().trim().min(2, message).max(100, message);
const emailSchema = (message?: string) => z.string().trim().email(message).max(200, message);
const messageSchema = (message?: string) => z.string().trim().min(10, message).max(5000, message);

/**
 * Contact form schema — the single source of truth for both the client
 * and the API route. Length ceilings keep the endpoint from being used
 * as a mail cannon while optional metadata feeds the CMS inbox.
 */
export function createContactSchema(m: ContactMessages = {}) {
  return z.object({
    name: nameSchema(m.name),
    email: emailSchema(m.email),
    subject: z.string().trim().min(3, m.subject).max(150, m.subject),
    message: messageSchema(m.message),
    source: z.enum(contactSources).optional(),
    interest: z.enum(contactInterests).optional(),
    project: z.string().trim().max(200).optional(),
    locale: z.enum(contactLocales).optional(),
    turnstileToken: z.string().trim().min(1).max(2048).optional(),
  });
}

export function createJoinFormSchema(m: JoinMessages = {}) {
  return z.object({
    name: nameSchema(m.name),
    email: emailSchema(m.email),
    interest: z.enum(contactInterests),
    project: z.string().trim().max(200).optional(),
    message: messageSchema(m.message),
  });
}

export const contactSchema = createContactSchema();
export type ContactFormData = z.infer<typeof contactSchema>;
export type JoinFormData = z.infer<ReturnType<typeof createJoinFormSchema>>;
