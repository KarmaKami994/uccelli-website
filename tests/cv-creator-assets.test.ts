import { execFileSync } from "node:child_process";
import { readFileSync } from "node:fs";
import path from "node:path";
import { describe, expect, it } from "vitest";

const root = path.resolve(process.cwd(), "public/tools/cv-creator");
const scripts = [
  "core.js",
  "asset-overrides.js",
  "template-classic.js",
  "template-awesome.js",
  "template-res.js",
  "ui.js",
];

function read(name: string) {
  return readFileSync(path.join(root, name), "utf8");
}

describe("CV Creator static application", () => {
  it("loads all required Uccelli tool assets", () => {
    const html = read("index.html");

    expect(html).toContain("Uccelli CV Creator");
    expect(html).toContain("extras.css");
    for (const script of scripts) expect(html).toContain(script);
    expect(read("assets/fontawesome.sty")).toContain("faEnvelope");
  });

  it("keeps JSON persistence and transparent external PDF generation", () => {
    const core = read("core.js");
    const ui = read("ui.js");
    const sources = read("asset-overrides.js");

    expect(core).toContain("uccelli_cv_generator_v1");
    expect(core).toContain("YtoTech");
    expect(core).toContain("selectedTemplate: Number(template)");
    expect(ui).toContain("exportJSON");
    expect(ui).toContain("importJSON");
    expect(ui).toContain("data._template ?? data.selectedTemplate");
    expect(ui).toContain("localStorage");
    expect(ui).toContain("https://latex.ytotech.com/builds/sync");
    expect(sources).toContain("awesome-cv.cls");
    expect(sources).toContain("res.cls");
  });

  it("ships all three LaTeX generators and fixes the classic dispatcher", () => {
    const classic = read("template-classic.js");
    const awesome = read("template-awesome.js");
    const res = read("template-res.js");

    expect(classic).toContain("function buildTex_t1");
    expect(classic).toContain("profileSection_t1(values.basics)");
    expect(awesome).toContain("function buildTex_t2");
    expect(awesome).toContain("\\\\documentclass[]{awesome-cv}");
    expect(res).toContain("function buildTex_t5");
    expect(res).toContain("\\\\documentclass[line,margin]{res}");
  });

  it("contains syntactically valid browser scripts", () => {
    for (const script of scripts) {
      expect(() =>
        execFileSync(process.execPath, ["--check", path.join(root, script)], {
          stdio: "pipe",
        }),
      ).not.toThrow();
    }
  });
});
