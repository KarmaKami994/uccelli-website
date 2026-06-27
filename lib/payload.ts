import { getPayload } from "payload";
import config from "@payload-config";

export async function getPayloadClient() {
  return getPayload({ config });
}

// Helper: Fetch all documents from a collection
export async function fetchCollection<T = Record<string, unknown>>(
  slug: string,
  options?: { where?: Record<string, unknown>; sort?: string; limit?: number; locale?: string }
): Promise<T[]> {
  try {
    const payload = await getPayloadClient();
    const result = await payload.find({
      collection: slug as any,
      where: (options?.where || {}) as any,
      sort: options?.sort || "-createdAt" as any,
      limit: options?.limit || 100,
    });
    return result.docs as T[];
  } catch {
    // Fallback: return empty array if DB not connected
    console.warn(`[Payload] Could not fetch ${slug} — using fallback data`);
    return [];
  }
}

// Helper: Fetch single document by slug
export async function fetchBySlug<T = Record<string, unknown>>(
  collection: string,
  slug: string
): Promise<T | null> {
  try {
    const payload = await getPayloadClient();
    const result = await payload.find({
      collection: collection as any,
      where: { slug: { equals: slug } } as any,
      limit: 1,
    });
    return (result.docs[0] as T) || null;
  } catch {
    console.warn(`[Payload] Could not fetch ${collection}/${slug} — using fallback`);
    return null;
  }
}
