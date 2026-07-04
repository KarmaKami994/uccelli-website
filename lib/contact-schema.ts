import { z } from "zod";

export interface ContactMessages {
  name?: string;
  email?: string;
  subject?: string;
  message?: string;
}

/**
 * Contact form schema — the single source of truth for both the client
 * (with translated messages) and the API route (default messages).
 * Length ceilings keep the endpoint from being used as a mail cannon.
 */
export function createContactSchema(m: ContactMessages = {}) {
  return z.object({
    name: z.string().min(2, m.name).max(100, m.name),
    email: z.string().email(m.email).max(200, m.email),
    subject: z.string().min(3, m.subject).max(150, m.subject),
    message: z.string().min(10, m.message).max(5000, m.message),
  });
}

export const contactSchema = createContactSchema();
export type ContactFormData = z.infer<typeof contactSchema>;
