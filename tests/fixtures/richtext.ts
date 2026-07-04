import type { RichTextContent } from "@/lib/richtext";

/** Minimal valid Lexical document with the given paragraph texts. */
export function lexicalFixture(...paragraphs: string[]): RichTextContent {
  return {
    root: {
      type: "root",
      children: paragraphs.map((text) => ({
        type: "paragraph",
        children: [{ type: "text", text, format: 0, mode: "normal", style: "", detail: 0, version: 1 }],
        direction: "ltr" as const, format: "" as const, indent: 0, version: 1,
      })),
      direction: "ltr" as const,
      format: "" as const,
      indent: 0,
      version: 1,
    },
  };
}
