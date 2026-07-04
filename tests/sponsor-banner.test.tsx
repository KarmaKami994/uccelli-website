import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { SponsorBanner } from "@/components/sections/SponsorBanner";

const NAMES = ["GZ Höngg", "Royal Studio", "Anker Swiss AG"];

describe("SponsorBanner", () => {
  it("renders the given title", () => {
    render(<SponsorBanner title="Unsere Partner & Sponsoren" names={NAMES} />);
    expect(screen.getByText("Unsere Partner & Sponsoren")).toBeInTheDocument();
  });

  it("renders all names from the CMS", () => {
    render(<SponsorBanner title="Partner" names={NAMES} />);
    for (const name of NAMES) {
      expect(screen.getByText(name)).toBeInTheDocument();
    }
  });

  it("links every name to the partner page", () => {
    render(<SponsorBanner title="Partner" names={NAMES} />);
    const links = screen.getAllByRole("link");
    expect(links).toHaveLength(NAMES.length);
    for (const link of links) {
      expect(link).toHaveAttribute("href", "/ueber-uns/partner");
    }
  });

  it("renders nothing when there are no partners", () => {
    const { container } = render(<SponsorBanner title="Partner" names={[]} />);
    expect(container.firstChild).toBeNull();
  });
});
