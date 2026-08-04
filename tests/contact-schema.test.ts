import { describe, expect, it } from "vitest";
import { contactSchema } from "@/lib/contact-schema";

describe("contactSchema", () => {
  const base = {
    name: "Test Person",
    email: "test@example.com",
    subject: "Mitmachen",
    message: "Ich möchte gerne bei einem Projekt mithelfen.",
  };

  it("accepts structured join metadata", () => {
    const result = contactSchema.safeParse({
      ...base,
      source: "join",
      interest: "volunteer",
      project: "Nightshift Music",
      locale: "de",
    });

    expect(result.success).toBe(true);
    if (result.success) {
      expect(result.data.source).toBe("join");
      expect(result.data.interest).toBe("volunteer");
      expect(result.data.project).toBe("Nightshift Music");
    }
  });

  it("keeps legacy contact payloads valid", () => {
    expect(contactSchema.safeParse(base).success).toBe(true);
  });

  it("rejects unknown form sources and locales", () => {
    expect(contactSchema.safeParse({ ...base, source: "unknown" }).success).toBe(false);
    expect(contactSchema.safeParse({ ...base, locale: "fr" }).success).toBe(false);
  });
});
