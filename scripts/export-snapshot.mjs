#!/usr/bin/env node

import { cp, mkdir, readFile, rm, stat, writeFile } from "node:fs/promises"
import { execFileSync } from "node:child_process"
import path from "node:path"
import { fileURLToPath } from "node:url"

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..")
const args = new Map(
  process.argv.slice(2).map((arg) => {
    const [key, ...rest] = arg.replace(/^--/, "").split("=")
    return [key, rest.length ? rest.join("=") : true]
  }),
)

const manifest = JSON.parse(await readFile(path.join(ROOT, "design-system.json"), "utf8"))

if (args.has("list")) {
  console.log(Object.keys(manifest.bundles).join("\n"))
  process.exit(0)
}

const targetValue = args.get("target")
const bundleValue = args.get("bundle")
if (!targetValue || !bundleValue) {
  console.error("Usage: node scripts/export-snapshot.mjs --bundle=core,web-app --target=/path")
  process.exit(2)
}

const target = path.resolve(String(targetValue))
if (target === "/" || target === ROOT) {
  throw new Error(`Unsafe target: ${target}`)
}

const requested = String(bundleValue)
  .split(",")
  .map((value) => value.trim())
  .filter(Boolean)

const unknown = requested.filter((bundle) => !manifest.bundles[bundle])
if (unknown.length) throw new Error(`Unknown bundle(s): ${unknown.join(", ")}`)

const selected = new Set(["core", ...requested])
const entries = new Set()
for (const bundle of selected) {
  for (const entry of manifest.bundles[bundle]) entries.add(entry)
}

await rm(target, { recursive: true, force: true })
await mkdir(target, { recursive: true })

for (const relative of [...entries].sort()) {
  const source = path.join(ROOT, relative)
  await stat(source)
  const destination = path.join(target, relative)
  await mkdir(path.dirname(destination), { recursive: true })
  await cp(source, destination, { recursive: true })
}

let commit = "unknown"
let sourceDirty = null
try {
  commit = execFileSync("git", ["rev-parse", "HEAD"], { cwd: ROOT, encoding: "utf8" }).trim()
  sourceDirty =
    execFileSync("git", ["status", "--porcelain"], { cwd: ROOT, encoding: "utf8" }).trim().length > 0
} catch {
  // Export remains useful outside a Git checkout.
}

const snapshot = {
  name: manifest.name,
  release: manifest.release,
  sourceCommit: commit,
  sourceDirty,
  bundles: [...selected].sort(),
  generatedAt: new Date().toISOString(),
}

await writeFile(
  path.join(target, ".singular-ds-snapshot.json"),
  `${JSON.stringify(snapshot, null, 2)}\n`,
)

console.log(`Exported ${entries.size} entries to ${target}`)
