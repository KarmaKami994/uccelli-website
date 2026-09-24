import { communityItems } from "@/content/legacy";

describe("CV Creator bootstrap content", () => {
  it("makes the CV Creator available in fresh installations", () => {
    const cvCreator = communityItems.find((item) => item.slug === "cv-creator");

    expect(cvCreator).toMatchObject({
      status: "available",
      href: "/community/cv-creator",
    });
    expect(cvCreator?.summary.de).toContain("professionellen Lebenslauf");
    expect(cvCreator?.summary.en).toContain("professional CV");
  });
});
