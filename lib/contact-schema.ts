import { z } from "zod";

export interface ContactMessages {
  name?: string;
  email?: string;
  subject?: string;
  message?: string;
}

export const contactSources = ["contact", "join"] as const;
export const contactInterests = ["project", "volunteer", "membership", "partnership", "support", "general"] as const;
export const contactLocales = ["de", "en"] as const;

/**
 * Contact form schema — the single source of truth for both the client
 * and the API route. Length ceilings keep the endpoint from being used
 * as a mail cannon while optional metadata feeds the CMS inbox.
 */
export function createContactSchema(m: ContactMessages = {}) {
  return z.object({
    name: z.string().min(2, m.name).max(100, m.name),
    email: z.string().email(m.email).max(200, m.email),
    subject: z.string().min(3, m.subject).max(150, m.subject),
    message: z.string().min(10, m.message).max(5000, m.message),
    source: z.enum(contactSources).optional(),
    interest: z.enum(contactInterests).optional(),
    project: z.string().max(200).optional(),
    locale: z.enum(contactLocales).optional(),
  });
}

export const contactSchema = createContactSchema();
export type ContactFormData = z.infer<typeof contactSchema>;
