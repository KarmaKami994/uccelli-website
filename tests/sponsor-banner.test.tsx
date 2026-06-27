import { render, screen } from "@testing-library/react";
import { SponsorBanner } from "@/components/sections/SponsorBanner";

describe("SponsorBanner", () => {
  it("renders default title", () => {
    render(<SponsorBanner />);
    expect(screen.getByText("Unsere Partner & Sponsoren")).toBeInTheDocument();
  });

  it("renders custom title", () => {
    render(<SponsorBanner title="Our Sponsors" />);
    expect(screen.getByText("Our Sponsors")).toBeInTheDocument();
  });

  it("renders all sponsor names", () => {
    render(<SponsorBanner />);
    expect(screen.getByText("GZ Höngg")).toBeInTheDocument();
    expect(screen.getByText("Royal Studio")).toBeInTheDocument();
    expect(screen.getByText("Hosttech")).toBeInTheDocument();
    expect(screen.getByText("GymOne")).toBeInTheDocument();
  });

  it("all sponsors link to partner page", () => {
    render(<SponsorBanner />);
    const links = screen.getAllByRole("link");
    links.forEach((link) => {
      expect(link).toHaveAttribute("href", "/ueber-uns/partner");
    });
  });
});
