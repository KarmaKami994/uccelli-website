import { readFile, unlink, writeFile } from "node:fs/promises";
import path from "node:path";
import { pathToFileURL } from "node:url";

const sourcePath = path.resolve("scripts/import-projects-en.ts");
const runtimePath = path.resolve("scripts/.import-projects-en.runtime.ts");

async function buildRuntimeSource() {
  let source = await readFile(sourcePath, "utf8");

  const oldImports = [
    'import type { SanitizedConfig } from "payload";',
    'import payload from "payload";',
    "",
  ].join("\n");

  const newImports = [
    'import { getPayload } from "payload";',
    'import config from "@payload-config";',
    "",
  ].join("\n");

  if (!source.includes(oldImports)) {
    throw new Error("Could not find the expected import block in import-projects-en.ts");
  }

  source = source.replace(oldImports, newImports);

  const oldEntrypoint = [
    "export const script = async (config: SanitizedConfig) => {",
    "  await payload.init({ config });",
    "  const cms = payload as any;",
  ].join("\n");

  const newEntrypoint = [
    "async function run() {",
    "  const payload = await getPayload({ config });",
    "  const cms = payload as any;",
  ].join("\n");

  if (!source.includes(oldEntrypoint)) {
    throw new Error("Could not find the expected importer entrypoint");
  }

  source = source.replace(oldEntrypoint, newEntrypoint);

  const oldProjectLookup = [
    "    if (found.totalDocs !== 1 || !found.docs[0]) {",
    "      throw new Error(",
    "        `Expected exactly one project with slug ${project.slug}, found ${found.totalDocs}` ,",
    "      );",
    "    }",
    "",
    "    const id = found.docs[0].id;",
  ]
    .join("\n")
    .replace("}` ,", "}`,");

  const newProjectLookup = [
    "    if (found.totalDocs > 1) {",
    "      throw new Error(",
    "        `Expected at most one project with slug ${project.slug}, found ${found.totalDocs}` ,",
    "      );",
    "    }",
    "",
    "    let document = found.docs[0];",
    "",
    "    if (!document) {",
    '      if (project.slug !== "steuern-versicherung") {',
    "        throw new Error(`Project with slug ${project.slug} is missing`);",
    "      }",
    "",
    "      document = await cms.create({",
    '        collection: "projects",',
    '        locale: "de",',
    "        overrideAccess: true,",
    "        data: {",
    '          slug: "steuern-versicherung",',
    '          category: "bildung",',
    "          featured: false,",
    '          title: "Steuern & Versicherungs Schulung",',
    "          summary:",
    '            "Die Steuer- und Finanzschulung vermittelt praxisnahes Wissen zum Schweizer Steuersystem, zu Versicherungen, Vorsorge und persönlicher Finanzplanung.",',
    "        },",
    "      });",
    "",
    "      payload.logger.info(",
    '        "CREATED DE BASE: steuern-versicherung -> Steuern & Versicherungs Schulung",',
    "      );",
    "    }",
    "",
    "    const id = document.id;",
  ]
    .join("\n")
    .replace("}` ,", "}`,");

  if (!source.includes(oldProjectLookup)) {
    throw new Error("Could not find the expected project lookup block");
  }

  source = source.replace(oldProjectLookup, newProjectLookup);

  const oldEnding = ["  process.exit(0);", "};"].join("\n");
  const trimmed = source.trimEnd();

  if (!trimmed.endsWith(oldEnding)) {
    throw new Error("Could not find the expected importer ending");
  }

  source = `${trimmed.slice(0, -oldEnding.length)}}\n\nawait run();\n`;

  return source;
}

async function main() {
  const runtimeSource = await buildRuntimeSource();
  await writeFile(runtimePath, runtimeSource, "utf8");

  try {
    const runtimeUrl = `${pathToFileURL(runtimePath).href}?run=${Date.now()}`;
    await import(runtimeUrl);
  } finally {
    await unlink(runtimePath).catch(() => undefined);
  }
}

main().catch((error) => {
  console.error("English project import failed:");
  console.error(error);
  process.exit(1);
});
