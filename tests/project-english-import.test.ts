import { readFileSync } from "node:fs";
import path from "node:path";
import { describe, expect, it } from "vitest";

const source = readFileSync(
  path.resolve(process.cwd(), "scripts/import-projects-en.ts"),
  "utf8",
);

describe("English project importer", () => {
  it("exports a Payload run script", () => {
    expect(source).toContain("export const script = async");
    expect(source).toContain("await payload.init({ config })");
  });

  it("targets every current project slug", () => {
    for (const slug of [
      "skills4growth",
      "lifelab",
      "nightshift-music",
      "uccelli-liga",
      "steuern-versicherung",
      "kleidersammelaktion",
    ]) {
      expect(source).toContain(`slug: \"${slug}\"`);
    }
  });

  it("updates and verifies only the English locale", () => {
    expect(source).toContain('locale: "en"');
    expect(source).toContain("fallbackLocale: false");
    expect(source).toContain("Verification failed");
  });
});
