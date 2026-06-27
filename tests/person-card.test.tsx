import { render, screen } from "@testing-library/react";
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
});
