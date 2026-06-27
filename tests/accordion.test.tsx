import { render, screen, fireEvent } from "@testing-library/react";
import { Accordion } from "@/components/ui/Accordion";

const items = [
  { question: "Question 1?", answer: "Answer 1." },
  { question: "Question 2?", answer: "Answer 2." },
];

describe("Accordion", () => {
  it("renders all questions", () => {
    render(<Accordion items={items} />);
    expect(screen.getByText("Question 1?")).toBeInTheDocument();
    expect(screen.getByText("Question 2?")).toBeInTheDocument();
  });

  it("does not show answers initially", () => {
    render(<Accordion items={items} />);
    expect(screen.queryByText("Answer 1.")).not.toBeInTheDocument();
  });

  it("shows answer when question is clicked", () => {
    render(<Accordion items={items} />);
    fireEvent.click(screen.getByText("Question 1?"));
    expect(screen.getByText("Answer 1.")).toBeInTheDocument();
  });

  it("hides answer when clicked again", () => {
    render(<Accordion items={items} />);
    fireEvent.click(screen.getByText("Question 1?"));
    expect(screen.getByText("Answer 1.")).toBeInTheDocument();
    fireEvent.click(screen.getByText("Question 1?"));
    expect(screen.queryByText("Answer 1.")).not.toBeInTheDocument();
  });

  it("only opens one item at a time", () => {
    render(<Accordion items={items} />);
    fireEvent.click(screen.getByText("Question 1?"));
    fireEvent.click(screen.getByText("Question 2?"));
    expect(screen.queryByText("Answer 1.")).not.toBeInTheDocument();
    expect(screen.getByText("Answer 2.")).toBeInTheDocument();
  });
});
