// Payload Next.js RSC components
import { CollectionCards, FolderField, FolderTableCell } from "@payloadcms/next/rsc"
import { DocumentHeader } from "@payloadcms/next/rsc"
import { Logo } from "@payloadcms/next/rsc"
import { DefaultNav } from "@payloadcms/next/rsc"

// Lexical RSC components
import { RscEntryLexicalField } from "@payloadcms/richtext-lexical/rsc"
import { RscEntryLexicalCell } from "@payloadcms/richtext-lexical/rsc"
import { LexicalDiffComponent } from "@payloadcms/richtext-lexical/rsc"

// Lexical client feature components (toolbars, formatting, etc.)
import {
  FixedToolbarFeatureClient,
  InlineToolbarFeatureClient,
  BoldFeatureClient,
  ItalicFeatureClient,
  UnderlineFeatureClient,
  StrikethroughFeatureClient,
  SubscriptFeatureClient,
  SuperscriptFeatureClient,
  InlineCodeFeatureClient,
  HeadingFeatureClient,
  AlignFeatureClient,
  ParagraphFeatureClient,
  BlockquoteFeatureClient,
  LinkFeatureClient,
  RelationshipFeatureClient,
  UploadFeatureClient,
  ChecklistFeatureClient,
  OrderedListFeatureClient,
  UnorderedListFeatureClient,
  HorizontalRuleFeatureClient,
  IndentFeatureClient,
  BlocksFeatureClient,
  TableFeatureClient,
} from "@payloadcms/richtext-lexical/client"

export const importMap: Record<string, unknown> = {
  // Next.js RSC
  "@payloadcms/next/rsc#CollectionCards": CollectionCards,
  "@payloadcms/next/rsc#FolderField": FolderField,
  "@payloadcms/next/rsc#FolderTableCell": FolderTableCell,
  "@payloadcms/next/rsc#DocumentHeader": DocumentHeader,
  "@payloadcms/next/rsc#Logo": Logo,
  "@payloadcms/next/rsc#DefaultNav": DefaultNav,

  // Lexical RSC
  "@payloadcms/richtext-lexical/rsc#RscEntryLexicalField": RscEntryLexicalField,
  "@payloadcms/richtext-lexical/rsc#RscEntryLexicalCell": RscEntryLexicalCell,
  "@payloadcms/richtext-lexical/rsc#LexicalDiffComponent": LexicalDiffComponent,

  // Lexical client features
  "@payloadcms/richtext-lexical/client#FixedToolbarFeatureClient": FixedToolbarFeatureClient,
  "@payloadcms/richtext-lexical/client#InlineToolbarFeatureClient": InlineToolbarFeatureClient,
  "@payloadcms/richtext-lexical/client#BoldFeatureClient": BoldFeatureClient,
  "@payloadcms/richtext-lexical/client#ItalicFeatureClient": ItalicFeatureClient,
  "@payloadcms/richtext-lexical/client#UnderlineFeatureClient": UnderlineFeatureClient,
  "@payloadcms/richtext-lexical/client#StrikethroughFeatureClient": StrikethroughFeatureClient,
  "@payloadcms/richtext-lexical/client#SubscriptFeatureClient": SubscriptFeatureClient,
  "@payloadcms/richtext-lexical/client#SuperscriptFeatureClient": SuperscriptFeatureClient,
  "@payloadcms/richtext-lexical/client#InlineCodeFeatureClient": InlineCodeFeatureClient,
  "@payloadcms/richtext-lexical/client#HeadingFeatureClient": HeadingFeatureClient,
  "@payloadcms/richtext-lexical/client#AlignFeatureClient": AlignFeatureClient,
  "@payloadcms/richtext-lexical/client#ParagraphFeatureClient": ParagraphFeatureClient,
  "@payloadcms/richtext-lexical/client#BlockquoteFeatureClient": BlockquoteFeatureClient,
  "@payloadcms/richtext-lexical/client#LinkFeatureClient": LinkFeatureClient,
  "@payloadcms/richtext-lexical/client#RelationshipFeatureClient": RelationshipFeatureClient,
  "@payloadcms/richtext-lexical/client#UploadFeatureClient": UploadFeatureClient,
  "@payloadcms/richtext-lexical/client#ChecklistFeatureClient": ChecklistFeatureClient,
  "@payloadcms/richtext-lexical/client#OrderedListFeatureClient": OrderedListFeatureClient,
  "@payloadcms/richtext-lexical/client#UnorderedListFeatureClient": UnorderedListFeatureClient,
  "@payloadcms/richtext-lexical/client#HorizontalRuleFeatureClient": HorizontalRuleFeatureClient,
  "@payloadcms/richtext-lexical/client#IndentFeatureClient": IndentFeatureClient,
  "@payloadcms/richtext-lexical/client#BlocksFeatureClient": BlocksFeatureClient,
  "@payloadcms/richtext-lexical/client#TableFeatureClient": TableFeatureClient,
}
