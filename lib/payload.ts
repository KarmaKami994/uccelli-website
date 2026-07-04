import { getPayload, type Payload, type Where } from "payload";
import config from "@payload-config";
import type { Config } from "@/payload-types";

export type Locale = Config["locale"]; // "de" | "en"
export const LOCALES: Locale[] = ["de", "en"];
export const DEFAULT_LOCALE: Locale = "de";

export function toLocale(value: string): Locale {
  return (LOCALES as string[]).includes(value) ? (value as Locale) : DEFAULT_LOCALE;
}

let payloadPromise: Promise<Payload> | null = null;

/**
 * Shared Payload Local API client.
 *
 * Errors are intentionally NOT swallowed here: a broken database should
 * surface through Next's error boundary instead of rendering an empty
 * (but seemingly healthy) website.
 */
export function getPayloadClient(): Promise<Payload> {
  if (!payloadPromise) payloadPromise = getPayload({ config });
  return payloadPromise;
}

type CollectionSlug = keyof Config["collections"];
type CollectionDoc<S extends CollectionSlug> = Config["collections"][S];
type GlobalSlug = keyof Config["globals"];
type GlobalDoc<S extends GlobalSlug> = Config["globals"][S];

interface FindOptions {
  where?: Where;
  sort?: string;
  limit?: number;
  locale: Locale;
}

/** Fetch documents from a collection in the given locale (EN falls back to DE). */
export async function fetchCollection<S extends CollectionSlug>(
  slug: S,
  options: FindOptions
): Promise<CollectionDoc<S>[]> {
  const payload = await getPayloadClient();
  const result = await payload.find({
    collection: slug,
    where: options.where,
    sort: options.sort ?? "-createdAt",
    limit: options.limit ?? 100,
    locale: options.locale,
    fallbackLocale: DEFAULT_LOCALE,
  });
  return result.docs as CollectionDoc<S>[];
}

/** Fetch a single document by its (locale-independent) slug field. */
export async function fetchBySlug<S extends CollectionSlug>(
  collection: S,
  slug: string,
  locale: Locale
): Promise<CollectionDoc<S> | null> {
  const payload = await getPayloadClient();
  const result = await payload.find({
    collection,
    where: { slug: { equals: slug } },
    limit: 1,
    locale,
    fallbackLocale: DEFAULT_LOCALE,
  });
  return (result.docs[0] as CollectionDoc<S>) ?? null;
}

/** Fetch a Global (Homepage, Navigation) in the given locale. */
export async function fetchGlobal<S extends GlobalSlug>(
  slug: S,
  locale: Locale
): Promise<GlobalDoc<S>> {
  const payload = await getPayloadClient();
  return (await payload.findGlobal({
    slug,
    locale,
    fallbackLocale: DEFAULT_LOCALE,
  })) as GlobalDoc<S>;
}
