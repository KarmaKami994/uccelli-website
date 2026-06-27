import { render, screen } from "@testing-library/react";
import { Button } from "@/components/ui/Button";

describe("Button", () => {
  it("renders with text", () => {
    render(<Button>Click me</Button>);
    expect(screen.getByText("Click me")).toBeInTheDocument();
  });

  it("renders as a link when href is provided", () => {
    render(<Button href="/test">Link</Button>);
    const link = screen.getByText("Link");
    expect(link.tagName).toBe("A");
    expect(link).toHaveAttribute("href", "/test");
  });

  it("renders as a button when no href", () => {
    render(<Button>Btn</Button>);
    expect(screen.getByText("Btn").tagName).toBe("BUTTON");
  });

  it("applies primary variant styles by default", () => {
    render(<Button>Primary</Button>);
    const btn = screen.getByText("Primary");
    expect(btn.className).toContain("bg-black");
  });

  it("applies secondary variant styles", () => {
    render(<Button variant="secondary">Secondary</Button>);
    const btn = screen.getByText("Secondary");
    expect(btn.className).toContain("border");
  });

  it("applies accent variant styles", () => {
    render(<Button variant="accent">Accent</Button>);
    const btn = screen.getByText("Accent");
    expect(btn.className).toContain("bg-brand-accent");
  });

  it("applies large size", () => {
    render(<Button size="lg">Large</Button>);
    const btn = screen.getByText("Large");
    expect(btn.className).toContain("px-9");
  });

  it("forwards disabled attribute", () => {
    render(<Button disabled>Disabled</Button>);
    expect(screen.getByText("Disabled")).toBeDisabled();
  });
});
