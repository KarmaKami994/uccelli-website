import { describe, it, expect } from "vitest";
import { lexicalToPlainText } from "@/lib/richtext";
import { formatEventDate } from "@/lib/format";
import { resolveImageUrl } from "@/lib/data";
import { localizedUrl } from "@/lib/seo";
import { lexicalFixture } from "./fixtures/richtext";
import type { Media } from "@/payload-types";

describe("lexicalToPlainText", () => {
  it("extracts text from paragraphs", () => {
    expect(lexicalToPlainText(lexicalFixture("Hallo Welt", "Zweiter Absatz")))
      .toBe("Hallo Welt Zweiter Absatz");
  });

  it("returns empty string for null/undefined", () => {
    expect(lexicalToPlainText(null)).toBe("");
    expect(lexicalToPlainText(undefined)).toBe("");
  });
});

describe("formatEventDate", () => {
  it("formats German dates", () => {
    expect(formatEventDate("2026-08-15", "de")).toBe("15. August 2026");
  });
  it("formats English dates", () => {
    expect(formatEventDate("2026-08-15", "en")).toBe("15 August 2026");
  });
  it("passes through invalid input instead of crashing", () => {
    expect(formatEventDate("not-a-date", "de")).toBe("not-a-date");
  });
});

describe("resolveImageUrl", () => {
  it("returns undefined for unpopulated relations (id only)", () => {
    expect(resolveImageUrl(42)).toBeUndefined();
    expect(resolveImageUrl(null)).toBeUndefined();
  });
  it("prefers the url field", () => {
    expect(resolveImageUrl({ id: 1, url: "/api/media/file/a.png", alt: "", updatedAt: "", createdAt: "" } as Media))
      .toBe("/api/media/file/a.png");
  });
  it("falls back to filename", () => {
    expect(resolveImageUrl({ id: 1, filename: "b.png", alt: "", updatedAt: "", createdAt: "" } as Media))
      .toBe("/api/media/file/b.png");
  });
});

describe("localizedUrl", () => {
  it("serves German unprefixed", () => {
    expect(localizedUrl("/kontakt", "de")).toMatch(/[^n]\/kontakt$/);
    expect(localizedUrl("/kontakt", "de")).not.toContain("/de/");
  });
  it("prefixes English with /en", () => {
    expect(localizedUrl("/kontakt", "en")).toContain("/en/kontakt");
  });
  it("handles the root path", () => {
    expect(localizedUrl("/", "en").endsWith("/en")).toBe(true);
  });
});
