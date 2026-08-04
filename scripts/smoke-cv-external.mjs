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

const tex = String.raw`%!TEX TS-program = xelatex
\documentclass[]{awesome-cv}
\usepackage{textcomp}
\fontdir[fonts/]
\colorlet{awesome}{awesome-red}
\begin{document}
\begin{center}
\headerfirstnamestyle{Test} \headerlastnamestyle{Person} \\
\vspace{2mm}
{\faEnvelope\ test@example.com} | {\faMobile\ +41 79 000 00 00} | {\faMapMarker\ Zürich}
\end{center}
\cvsection{Experience}
\begin{cventries}
\cventry
{Software Engineer}
{Example AG}
{Zürich}
{2024 -- Present}
{\begin{cvitems}\item {Built a neutral integration test.}\end{cvitems}}
\end{cventries}
\end{document}`;

async function load(resourcePath, source) {
  if (source.startsWith("./")) {
    return fs.readFileSync(path.join(root, source)).toString("base64");
  }

  const response = await fetch(source, { signal: AbortSignal.timeout(60_000) });
  if (!response.ok) {
    throw new Error(`${resourcePath}: HTTP ${response.status} from ${source}`);
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

console.log(`External Awesome-CV compilation succeeded (${bytes.length} bytes).`);
