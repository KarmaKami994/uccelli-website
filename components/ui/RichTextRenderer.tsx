import { RichText } from "@payloadcms/richtext-lexical/react";
import type { RichTextContent } from "@/lib/richtext";

interface RichTextRendererProps {
  content: RichTextContent | string | null | undefined;
  className?: string;
}

/**
 * Renders Payload Lexical rich text via the official renderer
 * (escapes content — safe against stored XSS). Plain strings are
 * supported as a fallback for textarea fields.
 */
export function RichTextRenderer({ content, className = "" }: RichTextRendererProps) {
  if (typeof content === "string") {
    return <div className={`rich-text ${className}`}><p>{content}</p></div>;
  }

  if (content?.root) {
    return (
      <div className={`rich-text ${className}`}>
        <RichText data={content} />
      </div>
    );
  }

  return null;
}
