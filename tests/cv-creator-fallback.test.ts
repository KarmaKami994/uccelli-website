import { describe, expect, it } from "vitest";
import { ensureCvCreator, getCvCreatorFallback } from "@/lib/cv-creator";

describe("CV Creator fallback", () => {
  it("provides an available German community tool", () => {
    const item = getCvCreatorFallback("de");

    expect(item).toMatchObject({
      slug: "cv-creator",
      type: "tool",
      status: "available",
      href: "/community/cv-creator",
      featured: true,
      order: 1,
    });
    expect(item.summary).toContain("Lebenslauf");
  });

  it("adds the fallback exactly once", () => {
    const first = ensureCvCreator([], "en");
    const second = ensureCvCreator(first, "en");

    expect(first).toHaveLength(1);
    expect(second).toHaveLength(1);
    expect(second[0].summary).toContain("CV");
  });
});
