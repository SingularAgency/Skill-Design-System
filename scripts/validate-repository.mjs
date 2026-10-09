#!/usr/bin/env node
import { access, readFile } from "node:fs/promises"
import path from "node:path"
import { root, loadManifest, collectFiles } from "./lib/distribution.mjs"

const manifest = await loadManifest()
const errors = []
const exists = async (file) => { try { await access(file); return true } catch { return false } }
const bundleFiles = await collectFiles(root, Object.values(manifest.bundles).flat())
const skillFiles = await collectFiles(root, manifest.distribution.skillEntries)
const skillSet = new Set(skillFiles)
const required = [
  "SKILL.md", "agents/openai.yaml", "design-system.json", "docs/README.md",
  "docs/05-experience-foundations.md", "docs/08-application-map.md",
  "ux-voice/product.md", "ux-voice/marketing.md", "references/ai-agent-contract.md",
]
for (const file of required) if (!skillSet.has(file)) errors.push("Skill missing entrypoint: " + file)
// File-link closure for packaged docs/demos. Fragment existence and dynamic URLs
// still need a website crawl/browser check; do not imply those were validated.
for (const file of skillFiles.filter(f => /\.(md|html|css)$/.test(f))) {
  const text = await readFile(path.join(root, file), "utf8")
  const pattern = file.endsWith(".md") ? /\]\(([^\s)]+)[^)]*\)/g
    : file.endsWith(".html") ? /(?:href|src)=["']([^"']+)["']/g
    : /url\(["']?([^\s)'\"]+)["']?\)/g
  for (const [, link] of text.matchAll(pattern)) {
    if (/^(?:[a-z][\w+.-]*:|#|\/)/i.test(link)) continue
    const pathname = decodeURIComponent(link.split(/[?#]/)[0])
    if (!pathname || !/\.[a-z0-9]+$/i.test(pathname)) continue
    const target = path.relative(root, path.resolve(root, path.dirname(file), pathname)).split(path.sep).join("/")
    if (!skillSet.has(target)) errors.push(file + " links to a resource absent from skill: " + target)
  }
}
for (const file of [...new Set([...bundleFiles, ...skillFiles])]) {
  if (!/\.(css|ts|tsx|mjs|js)$/.test(file)) continue
  const text = await readFile(path.join(root, file), "utf8")
  const imports = [...text.matchAll(/(?:from\s*|@import\s*)["'](\.[^"']+)["']/g)]
  for (const [, relative] of imports) {
    const target = path.resolve(root, path.dirname(file), relative)
    const candidates = [target, ...[".ts", ".tsx", ".js", ".mjs", "/index.ts", "/index.tsx"].map((ext) => target + ext)]
    const resolved = (await Promise.all(candidates.map(exists))).findIndex(Boolean)
    if (resolved === -1) errors.push(file + " unresolved import: " + relative)
    else if (skillSet.has(file) && !skillSet.has(path.relative(root, candidates[resolved]).split(path.sep).join("/"))) {
      errors.push(file + " imports a file absent from skill: " + relative)
    }
  }
}
for (const item of manifest.thirdParty || []) {
  for (const key of ["version", "commit", "license", "upstream", "notice"]) if (!item[key]) errors.push(item.id + " missing " + key)
  if (item.notice && !skillSet.has(item.notice)) errors.push("Missing skill license: " + item.notice)
}
const skill = await readFile(path.join(root, "SKILL.md"), "utf8")
if (!/^---\nname: singular-design-system\ndescription:/.test(skill)) errors.push("Invalid skill frontmatter")
for (const [, reference] of skill.matchAll(/`([^\s`]+\.(?:md|json|mjs|sh))`/g)) {
  if (!skillSet.has(reference)) errors.push("SKILL.md reference absent from archive: " + reference)
}
if (errors.length) {
  console.error(errors.join("\n"))
  process.exitCode = 1
} else {
  console.log("Validated " + bundleFiles.length + " bundle files; " + skillFiles.length + " allowlisted skill files; entrypoints/imports/file-links/licenses resolve.")
}
