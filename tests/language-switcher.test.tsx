import { render, screen } from "@testing-library/react";
import { LanguageSwitcher } from "@/components/layout/LanguageSwitcher";

describe("LanguageSwitcher", () => {
  it("renders DE and EN options", () => {
    render(<LanguageSwitcher currentLocale="de" />);
    expect(screen.getByText("DE")).toBeInTheDocument();
    expect(screen.getByText("EN")).toBeInTheDocument();
  });

  it("highlights current locale", () => {
    render(<LanguageSwitcher currentLocale="de" />);
    expect(screen.getByText("DE").tagName).toBe("SPAN");
    expect(screen.getByText("EN").tagName).toBe("A");
  });

  it("makes non-current locale a link", () => {
    render(<LanguageSwitcher currentLocale="de" />);
    expect(screen.getByText("EN")).toHaveAttribute("href");
  });
});
