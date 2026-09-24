import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { ContactForm } from "@/components/ui/ContactForm";

afterEach(() => {
  vi.unstubAllGlobals();
});

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

  it("validates and submits normalized contact data", async () => {
    const user = userEvent.setup();
    const fetchMock = vi.fn().mockResolvedValue(
      new Response(JSON.stringify({ success: true }), { status: 200 }),
    );
    vi.stubGlobal("fetch", fetchMock);
    render(<ContactForm />);

    await user.type(screen.getByLabelText("name"), "  Max Muster  ");
    await user.type(screen.getByLabelText("email"), "max@example.com");
    await user.type(screen.getByLabelText("subject"), "Mitgliedschaft");
    await user.type(screen.getByLabelText("message"), "Ich möchte gerne Mitglied werden.");
    await user.click(screen.getByText("send"));

    await waitFor(() => expect(fetchMock).toHaveBeenCalledOnce());
    const request = fetchMock.mock.calls[0][1] as RequestInit;
    expect(JSON.parse(request.body as string)).toMatchObject({
      name: "Max Muster",
      email: "max@example.com",
      subject: "Mitgliedschaft",
      source: "contact",
      locale: "de",
    });
    expect(await screen.findByText("successTitle")).toBeInTheDocument();
  });
});
