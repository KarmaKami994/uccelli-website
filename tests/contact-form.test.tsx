import { render, screen } from "@testing-library/react";
import { ContactForm } from "@/components/ui/ContactForm";

describe("ContactForm", () => {
  it("renders all form fields", () => {
    render(<ContactForm />);
    expect(screen.getByLabelText("Name")).toBeInTheDocument();
    expect(screen.getByLabelText("Email")).toBeInTheDocument();
    expect(screen.getByLabelText("Betreff")).toBeInTheDocument();
    expect(screen.getByLabelText("Nachricht")).toBeInTheDocument();
  });

  it("renders submit button", () => {
    render(<ContactForm />);
    expect(screen.getByText("SENDEN")).toBeInTheDocument();
  });

  it("submit button is not disabled initially", () => {
    render(<ContactForm />);
    expect(screen.getByText("SENDEN")).not.toBeDisabled();
  });
});
