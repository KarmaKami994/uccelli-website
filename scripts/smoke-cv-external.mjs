import fs from "node:fs";
import path from "node:path";
import vm from "node:vm";

const root = path.resolve("public/tools/cv-creator");
const core = fs.readFileSync(path.join(root, "core.js"), "utf8");
const block = core.match(/const ASSET_SOURCES = (\{[\s\S]*?\n\});/);

if (!block) {
  throw new Error("ASSET_SOURCES block not found");
}

const ASSET_SOURCES = vm.runInNewContext(`(${block[1]})`);
const overrides = fs.readFileSync(path.join(root, "asset-overrides.js"), "utf8");
vm.runInNewContext(overrides, { ASSET_SOURCES });

const templateContext = vm.createContext({
  copy: { current: "Present" },
  e: (value) => String(value ?? ""),
});
vm.runInContext(fs.readFileSync(path.join(root, "template-awesome.js"), "utf8"), templateContext);

templateContext.values = {
  basics: {
    name: "Test Person",
    email: "test@example.com",
    phone: "+41 79 000 00 00",
    location: { address: "Zürich" },
    website: "example.com",
  },
  work: [
    {
      company: "Example Public Administration",
      position: "Solution Architect Security",
      location: "Zürich",
      startDate: "September 2024",
      endDate: "Present",
      highlights: [
        "Security governance: developed policies, standards and compliance requirements across a complex public-sector environment.",
        "Advised internal teams and senior stakeholders on security architecture decisions, risks and practical mitigations.",
        "Designed a data-governance strategy including classification, sensitivity labels and information protection.",
        "Configured data-loss-prevention policies, retention labels and eDiscovery for regulatory requirements.",
        "Integrated cloud services into a central governance overview while preserving operational responsibilities.",
        "Designed and implemented a public key infrastructure with root and issuing certification authorities.",
        "Automated certificate management and documented certificate policies and practice statements.",
      ],
    },
    {
      company: "Example Engineering AG",
      position: "Cloud Engineer",
      location: "Oerlikon, Zürich",
      startDate: "August 2021",
      endDate: "August 2023",
      highlights: [
        "Operated and troubleshot cloud environments across second- and third-level support including demanding incidents.",
        "Built identity, governance and compliance controls for a multi-service cloud platform.",
        "Automated operational processes with command-line tooling and infrastructure-as-code practices.",
        "Created operating manuals, technical documentation and reusable knowledge-base articles.",
        "Worked closely with internal teams to integrate cloud solutions into existing systems and processes.",
      ],
    },
    {
      company: "Example Technology GmbH",
      position: "System Administrator",
      location: "Zürich",
      startDate: "2018",
      endDate: "2021",
      highlights: [
        "Maintained cloud workloads, networks and resources and supported business-critical infrastructure.",
        "Improved system efficiency with scripts and reduced repetitive manual interventions.",
        "Delivered technical support and maintained clear operational documentation.",
      ],
    },
  ],
  education: [],
  skills: [],
  projects: [],
  awards: [],
  sections: ["profile", "work"],
  headings: { work: "Experience" },
};

const tex = vm.runInContext("buildTex_t2(values)", templateContext);
if (!tex.includes("\\renewenvironment{cvitems}")) {
  throw new Error("Generated Awesome-CV document is missing the safe cvitems spacing override");
}
if (tex.includes("\\vspace{-4mm}")) {
  throw new Error("Generated Awesome-CV document still contains the overlapping legacy list spacing");
}

async function load(resourcePath, source) {
  if (source.startsWith("./")) {
    return fs.readFileSync(path.join(root, source)).toString("base64");
  }

  const response = await fetch(source, { signal: AbortSignal.timeout(60_000) });
  if (!response.ok) {
    throw new Error(`${resourcePath}: HTTP ${response.status} from ${source}`);
  }

  const cors = response.headers.get("access-control-allow-origin");
  if (cors !== "*") {
    throw new Error(`${resourcePath}: missing browser-compatible CORS header from ${source}`);
  }

  return Buffer.from(await response.arrayBuffer()).toString("base64");
}

const required = Object.entries(ASSET_SOURCES).filter(([resourcePath]) => resourcePath !== "res.cls");
const resources = [{ main: true, content: tex }];

for (const [resourcePath, source] of required) {
  resources.push({ path: resourcePath, file: await load(resourcePath, source) });
}

const response = await fetch("https://latex.ytotech.com/builds/sync", {
  method: "POST",
  headers: { "content-type": "application/json" },
  body: JSON.stringify({ compiler: "xelatex", resources }),
  signal: AbortSignal.timeout(180_000),
});

const bytes = Buffer.from(await response.arrayBuffer());

if (!response.ok) {
  throw new Error(`Compiler HTTP ${response.status}: ${bytes.toString("utf8", 0, 1000)}`);
}

if (bytes.subarray(0, 4).toString() !== "%PDF") {
  throw new Error(`Compiler did not return a PDF: ${bytes.toString("utf8", 0, 1000)}`);
}

if (bytes.length < 10_000) {
  throw new Error(`Compiler returned an unexpectedly small PDF (${bytes.length} bytes)`);
}

const artifactDir = path.resolve("artifacts");
fs.mkdirSync(artifactDir, { recursive: true });
fs.writeFileSync(path.join(artifactDir, "cv-spacing-smoke.pdf"), bytes);
fs.writeFileSync(path.join(artifactDir, "cv-spacing-smoke.tex"), tex);

console.log(`External long-form Awesome-CV compilation succeeded (${bytes.length} bytes).`);
