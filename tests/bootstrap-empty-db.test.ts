import {
  bootstrapEmptyDb,
  EMPTY_DB_BOOTSTRAP,
  type BootstrapPayload,
} from "@/scripts/bootstrap-empty-db";

function createPayload(
  existing: Partial<Record<string, number>> = {},
  globals: Partial<Record<"homepage" | "navigation", Record<string, unknown>>> = {},
): BootstrapPayload & { find: ReturnType<typeof vi.fn>; create: ReturnType<typeof vi.fn> } {
  const find = vi.fn(async ({ collection }: { collection: string }) => {
    const totalDocs = existing[collection] ?? 0;
    return {
      docs: totalDocs > 0 ? [{ id: 1 }] : [],
      totalDocs,
    };
  });
  const create = vi.fn(async () => ({ id: 1 }));
  const findGlobal = vi.fn(async ({ slug }: { slug: "homepage" | "navigation" }) => (
    globals[slug] ?? {}
  ));

  return { find, create, findGlobal } as unknown as BootstrapPayload & {
    find: ReturnType<typeof vi.fn>;
    create: ReturnType<typeof vi.fn>;
  };
}

describe("empty database bootstrap", () => {
  it("includes all collections required by the active archive pages", async () => {
    const payload = createPayload();
    const result = await bootstrapEmptyDb(payload);

    expect(EMPTY_DB_BOOTSTRAP.map(({ collection }) => collection)).toEqual([
      "networks",
      "werte",
      "courses",
      "events",
    ]);
    expect(result.created.map(({ collection }) => collection)).toEqual([
      "networks",
      "werte",
      "courses",
      "events",
    ]);
    expect(Object.fromEntries(
      EMPTY_DB_BOOTSTRAP.map(({ collection, items }) => [collection, items.length]),
    )).toEqual({
      networks: 4,
      werte: 6,
      courses: 4,
      events: 3,
    });

    expect(payload.create).toHaveBeenCalledTimes(
      EMPTY_DB_BOOTSTRAP.reduce((total, entry) => total + entry.items.length, 0),
    );
    for (const definition of EMPTY_DB_BOOTSTRAP) {
      expect(payload.create).toHaveBeenCalledWith(expect.objectContaining({
        collection: definition.collection,
        overrideAccess: true,
      }));
    }
  });

  it("refuses to write when versioned editorial content already exists", async () => {
    const payload = createPayload({ projects: 1 });

    await expect(bootstrapEmptyDb(payload)).rejects.toThrow(
      "Der Empty-DB-Bootstrap darf nur für eine neue Datenbank verwendet werden",
    );
    expect(payload.create).not.toHaveBeenCalled();
  });

  it("refuses to write when an editorial global already contains content", async () => {
    const payload = createPayload({}, { homepage: { hero: { title: "Bestehender Titel" } } });

    await expect(bootstrapEmptyDb(payload)).rejects.toThrow("homepage (Global)");
    expect(payload.create).not.toHaveBeenCalled();
  });

  it.each(["networks", "werte", "courses", "events"] as const)(
    "does not overwrite an already populated %s collection",
    async (collection) => {
      const payload = createPayload({ [collection]: 2 });
      const result = await bootstrapEmptyDb(payload);

      expect(result.skipped).toContainEqual({ collection, existing: 2 });
      expect(payload.create).not.toHaveBeenCalledWith(expect.objectContaining({
        collection,
      }));
      expect(result.created.map((entry) => entry.collection)).not.toContain(collection);
    },
  );
});
