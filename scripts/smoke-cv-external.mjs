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
  copy: { current: "Aktuell" },
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
      company: "Beispielverwaltung Kanton Zürich",
      position: "Solution Architect Security",
      location: "Stadt Zürich",
      startDate: "September 2024",
      endDate: "Aktuell",
      highlights: [
        "Security Governance: Aufbau und Weiterentwicklung von Richtlinien, Standards und Compliance-Anforderungen für eine komplexe Organisation mit mehreren internen Fachbereichen, technischen Plattformen und regulatorischen Verantwortlichkeiten.",
        "Stakeholder-Beratung: Beratung interner Teams und Führungskräfte zu sicherheitsrelevanten Architekturentscheidungen, Abhängigkeiten, Risiken und praktisch umsetzbaren Massnahmen über mehrere Projekte hinweg.",
        "Einführung einer Data-Governance-Strategie inklusive Klassifizierung, Sensitivity Labels, Informationsschutz und klarer Verantwortlichkeiten für Betrieb, Fachbereiche und zentrale Governance-Stellen.",
        "Konfiguration von Data-Loss-Prevention-Richtlinien, Retention Labels und eDiscovery zur Einhaltung regulatorischer Anforderungen sowie zur nachvollziehbaren Bearbeitung komplexer Informationsschutzfälle.",
        "Integration verschiedener Cloud-Dienste in eine zentrale Governance-Übersicht unter Beibehaltung der operativen Zuständigkeiten und bestehenden Betriebsprozesse.",
        "Konzeption und Implementierung einer internen Public Key Infrastructure mit Root- und Issuing-Zertifizierungsstellen für unterschiedliche technische Anwendungsfälle.",
        "Automatisierung des Zertifikatsmanagements und Erstellung von Certificate Policies und Certificate Practice Statements.",
      ],
    },
    {
      company: "Beispiel Engineering AG",
      position: "Cloud Engineer",
      location: "Oerlikon, Zürich",
      startDate: "August 2021",
      endDate: "August 2023",
      highlights: [
        "Betrieb, Support und Fehleranalyse in Cloud-Umgebungen im zweiten und dritten Support-Level inklusive anspruchsvoller Incidents, bereichsübergreifender Koordination und verständlicher Kommunikation mit betroffenen Anwendergruppen.",
        "Aufbau von Identity-, Governance- und Compliance-Kontrollen für eine Plattform mit mehreren Diensten und unterschiedlichen Schutzanforderungen.",
        "Automatisierung von Betriebsabläufen mit Kommandozeilenwerkzeugen und Infrastructure-as-Code sowie Dokumentation der wiederverwendbaren Vorgehensweisen für weitere Teams.",
        "Erstellung von Betriebshandbüchern, technischer Dokumentation und einer strukturierten Knowledgebase für wiederkehrende Störungen und Änderungen.",
        "Enge Zusammenarbeit mit internen Teams zur Integration neuer Cloud-Lösungen in bestehende Systeme, Prozesse und organisatorische Verantwortlichkeiten.",
      ],
    },
    {
      company: "Beispiel Technologie GmbH",
      position: "System Administrator",
      location: "Zürich",
      startDate: "2018",
      endDate: "2021",
      highlights: [
        "Betrieb und Wartung von Cloud-Workloads, Netzwerken und Ressourcen sowie Unterstützung geschäftskritischer Infrastruktur.",
        "Steigerung der Systemeffizienz mit Skripten und Reduktion repetitiver manueller Eingriffe.",
        "Technischer Support und Pflege einer klaren, nachvollziehbaren Betriebsdokumentation.",
      ],
    },
  ],
  education: [],
  skills: [],
  projects: [],
  awards: [],
  sections: ["profile", "work"],
  headings: { work: "Berufserfahrung" },
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

console.log(`External wrapped-bullet Awesome-CV compilation succeeded (${bytes.length} bytes).`);
