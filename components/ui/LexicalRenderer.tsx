"use client";

interface LexicalNode {
  type: string;
  tag?: string;
  text?: string;
  format?: number;
  children?: LexicalNode[];
  listType?: string;
  value?: string;
  direction?: string;
  indent?: number;
  version?: number;
  url?: string;
  fields?: { url?: string; linkType?: string };
}

// Format flags (bitmask used by Lexical)
const IS_BOLD = 1;
const IS_ITALIC = 2;
const IS_STRIKETHROUGH = 4;
const IS_UNDERLINE = 8;
const IS_CODE = 16;
const IS_SUBSCRIPT = 32;
const IS_SUPERSCRIPT = 64;

function renderText(node: LexicalNode): string {
  let text = node.text || "";
  const format = node.format || 0;

  if (format & IS_BOLD) text = `<strong>${text}</strong>`;
  if (format & IS_ITALIC) text = `<em>${text}</em>`;
  if (format & IS_UNDERLINE) text = `<u>${text}</u>`;
  if (format & IS_STRIKETHROUGH) text = `<s>${text}</s>`;
  if (format & IS_CODE) text = `<code>${text}</code>`;
  if (format & IS_SUBSCRIPT) text = `<sub>${text}</sub>`;
  if (format & IS_SUPERSCRIPT) text = `<sup>${text}</sup>`;

  return text;
}

function renderNode(node: LexicalNode): string {
  if (node.type === "text") return renderText(node);

  const children = (node.children || []).map(renderNode).join("");

  switch (node.type) {
    case "root": return children;
    case "paragraph": return `<p>${children || "<br>"}</p>`;
    case "heading": return `<${node.tag || "h2"}>${children}</${node.tag || "h2"}>`;
    case "list": {
      const tag = node.listType === "number" ? "ol" : "ul";
      return `<${tag}>${children}</${tag}>`;
    }
    case "listitem": return `<li>${children}</li>`;
    case "quote": return `<blockquote>${children}</blockquote>`;
    case "link":
    case "autolink": {
      const url = node.fields?.url || node.url || "#";
      return `<a href="${url}" target="_blank" rel="noopener">${children}</a>`;
    }
    case "horizontalrule": return "<hr>";
    case "linebreak": return "<br>";
    default: return children;
  }
}

interface LexicalRendererProps {
  data: any;
  className?: string;
}

export function LexicalRenderer({ data, className = "" }: LexicalRendererProps) {
  if (!data || !data.root) return null;
  const html = renderNode(data.root);

  return (
    <div
      className={className}
      dangerouslySetInnerHTML={{ __html: html }}
    />
  );
}
