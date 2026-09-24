import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { JoinForm } from "@/components/join/JoinForm";

afterEach(() => {
  vi.unstubAllGlobals();
});

describe("JoinForm", () => {
  const projects = [{ slug: "lifelab", title: "LifeLab" }];

  it("validates required fields with the shared schema", async () => {
    const user = userEvent.setup();
    const fetchMock = vi.fn();
    vi.stubGlobal("fetch", fetchMock);
    render(<JoinForm projects={projects} />);

    await user.click(screen.getByText("send"));

    expect(await screen.findAllByRole("alert")).toHaveLength(3);
    expect(fetchMock).not.toHaveBeenCalled();
  });

  it("builds and submits structured join metadata", async () => {
    const user = userEvent.setup();
    const fetchMock = vi.fn().mockResolvedValue(
      new Response(JSON.stringify({ success: true }), { status: 200 }),
    );
    vi.stubGlobal("fetch", fetchMock);
    render(
      <JoinForm
        projects={projects}
        initialInterest="membership"
        initialProject="lifelab"
      />,
    );

    await user.type(screen.getByLabelText("name"), "Max Muster");
    await user.type(screen.getByLabelText("email"), "max@example.com");
    await user.type(screen.getByLabelText("message"), "Ich möchte gerne Mitglied werden.");
    await user.click(screen.getByText("send"));

    await waitFor(() => expect(fetchMock).toHaveBeenCalledOnce());
    const request = fetchMock.mock.calls[0][1] as RequestInit;
    expect(JSON.parse(request.body as string)).toMatchObject({
      source: "join",
      locale: "de",
      interest: "membership",
      project: "LifeLab",
      subject: "interests.membership – LifeLab",
    });
    expect(await screen.findByText("successTitle")).toBeInTheDocument();
  });
});
