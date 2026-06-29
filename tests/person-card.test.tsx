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

  it("shows 'Mehr erfahren' when bio is provided", () => {
    render(<PersonCard name="Max" role="CEO" bio="Some bio text" />);
    expect(screen.getByText("Mehr erfahren →")).toBeInTheDocument();
  });

  it("does not show 'Mehr erfahren' without bio", () => {
    render(<PersonCard name="Max" role="CEO" />);
    expect(screen.queryByText("Mehr erfahren →")).not.toBeInTheDocument();
  });

  it("opens bio modal on click", () => {
    render(<PersonCard name="Max" role="CEO" bio="Some bio text" />);
    fireEvent.click(screen.getByText("Max"));
    expect(screen.getByText("Some bio text")).toBeInTheDocument();
  });
});
