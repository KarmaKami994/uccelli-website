import { RichText } from "@payloadcms/richtext-lexical/react";
import type { SerializedEditorState } from "@payloadcms/richtext-lexical/lexical";

interface RichTextRendererProps {
  content: string | SerializedEditorState | any;
  className?: string;
}

export function RichTextRenderer({ content, className = "" }: RichTextRendererProps) {
  // Plain string fallback (from static data or textarea)
  if (typeof content === "string") {
    return <div className={className}><p>{content}</p></div>;
  }

  // Lexical rich text (from Payload CMS richText field)
  if (content && typeof content === "object" && content.root) {
    return (
      <div className={className}>
        <RichText data={content} />
      </div>
    );
  }

  // Empty or unsupported
  return null;
}
