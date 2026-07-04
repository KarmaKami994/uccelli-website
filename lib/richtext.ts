import type { Faq } from "@/payload-types";

/** Serialized Lexical rich text as stored by Payload. */
export type RichTextContent = Faq["answer"];

interface LexicalNode {
  type?: string;
  text?: string;
  children?: LexicalNode[];
  [k: string]: unknown;
}

/**
 * Extract plain text from a Lexical rich-text value.
 * Used for JSON-LD, meta descriptions and other text-only contexts.
 */
export function lexicalToPlainText(content: RichTextContent | null | undefined): string {
  if (!content?.root) return "";
  const parts: string[] = [];

  function walk(node: LexicalNode): void {
    if (typeof node.text === "string") parts.push(node.text);
    for (const child of node.children ?? []) walk(child);
    // Block-level nodes end with a separating space
    if (node.type && node.type !== "text") parts.push(" ");
  }

  walk(content.root as LexicalNode);
  return parts.join("").replace(/\s+/g, " ").trim();
}
