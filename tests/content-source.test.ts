import { communityItems, projects } from "@/content/legacy";

describe("canonical content source", () => {
  it("contains only the projects in the current information architecture", () => {
    expect(projects.map((project) => project.slug)).toEqual([
      "skills4growth",
      "lifelab",
      "nightshift-music",
      "uccelli-liga",
      "kleidersammelaktion",
    ]);
  });

  it("publishes the CV Creator from the same source as the other community items", () => {
    const cvCreator = communityItems.find((item) => item.slug === "cv-creator");

    expect(cvCreator).toMatchObject({
      status: "available",
      href: "/community/cv-creator",
    });
    expect(cvCreator?.summary.de).toContain("professionellen Lebenslauf");
    expect(cvCreator?.summary.en).toContain("professional CV");
  });
});
