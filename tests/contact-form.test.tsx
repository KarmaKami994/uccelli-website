import { render, screen } from "@testing-library/react";
import { ContactForm } from "@/components/ui/ContactForm";

describe("ContactForm", () => {
  it("renders all form fields", () => {
    render(<ContactForm />);
    // Mock useTranslations returns the key itself, so labels are the translation keys
    expect(screen.getByLabelText("name")).toBeInTheDocument();
    expect(screen.getByLabelText("email")).toBeInTheDocument();
    expect(screen.getByLabelText("subject")).toBeInTheDocument();
    expect(screen.getByLabelText("message")).toBeInTheDocument();
  });

  it("renders submit button", () => {
    render(<ContactForm />);
    expect(screen.getByText("send")).toBeInTheDocument();
  });

  it("submit button is not disabled initially", () => {
    render(<ContactForm />);
    expect(screen.getByText("send")).not.toBeDisabled();
  });
});
