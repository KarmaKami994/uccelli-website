import { readFileSync } from "node:fs";
import path from "node:path";

describe("content sync version", () => {
  it("keeps the applied production version unchanged", () => {
    const source = readFileSync(
      path.join(process.cwd(), "scripts", "sync-content.ts"),
      "utf8",
    );

    expect(source).toContain(
      'const VERSION_KEY = "uccelli-content:2026-08-site-restructure-v1";',
    );
  });

  it("runs the guarded empty-database bootstrap before the versioned sync", () => {
    const packageJson = JSON.parse(
      readFileSync(path.join(process.cwd(), "package.json"), "utf8"),
    ) as { scripts: Record<string, string> };

    expect(packageJson.scripts.seed).toBe(
      "npm run bootstrap:empty-db && npm run content:sync",
    );
    expect(packageJson.scripts["bootstrap:empty-db"]).toContain(
      "scripts/bootstrap-empty-db.ts",
    );
  });
});
