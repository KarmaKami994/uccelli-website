import { render, screen } from "@testing-library/react";
import { Card } from "@/components/ui/Card";

describe("Card", () => {
  it("renders title and body", () => {
    render(<Card title="Test Title" body="Test body text" />);
    expect(screen.getByText("Test Title")).toBeInTheDocument();
    expect(screen.getByText("Test body text")).toBeInTheDocument();
  });

  it("renders button when buttonText is provided", () => {
    render(<Card title="T" body="B" buttonText="Click" buttonHref="/test" />);
    const btn = screen.getByText("Click");
    expect(btn).toBeInTheDocument();
    expect(btn).toHaveAttribute("href", "/test");
  });

  it("does not render button when buttonText is missing", () => {
    render(<Card title="T" body="B" />);
    expect(screen.queryByRole("link")).not.toBeInTheDocument();
  });

  it("renders image when imageSrc is provided", () => {
    render(<Card title="T" body="B" imageSrc="/test.jpg" imageAlt="Alt" />);
    expect(screen.getByAltText("Alt")).toBeInTheDocument();
  });

  it("renders placeholder when no image", () => {
    const { container } = render(<Card title="T" body="B" />);
    expect(container.querySelector(".bg-gradient-to-br")).toBeInTheDocument();
  });
});
