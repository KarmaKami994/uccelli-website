import { render, screen, fireEvent } from "@testing-library/react";
import { PersonCard } from "@/components/ui/PersonCard";

describe("PersonCard", () => {
  it("renders name and role", () => {
    render(<PersonCard name="Max Muster" role="CEO" />);
    expect(screen.getByText("Max Muster")).toBeInTheDocument();
    expect(screen.getByText("CEO")).toBeInTheDocument();
  });

  it("shows initial when no image", () => {
    render(<PersonCard name="Max Muster" role="CEO" />);
    expect(screen.getByText("M")).toBeInTheDocument();
  });

  it("renders image when provided", () => {
    render(<PersonCard name="Max" role="CEO" imageSrc="/max.jpg" />);
    expect(screen.getByAltText("Max")).toBeInTheDocument();
  });

  it("shows learn-more link when bio is provided", () => {
    render(<PersonCard name="Max" role="CEO" bio="Some bio text" />);
    // Mock useTranslations returns the key: t("moreInfo") → "moreInfo"
    expect(screen.getByText("moreInfo")).toBeInTheDocument();
  });

  it("does not show learn-more link without bio", () => {
    render(<PersonCard name="Max" role="CEO" />);
    expect(screen.queryByText("moreInfo")).not.toBeInTheDocument();
  });

  it("opens bio modal on click", () => {
    render(<PersonCard name="Max" role="CEO" bio="Some bio text" />);
    fireEvent.click(screen.getByText("Max"));
    expect(screen.getByText("Some bio text")).toBeInTheDocument();
  });
});
