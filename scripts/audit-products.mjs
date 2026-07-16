#!/usr/bin/env node

import { readdir, readFile, stat } from "node:fs/promises"
import path from "node:path"

const args = process.argv.slice(2)
const workspaceArg = args.find((arg) => arg.startsWith("--workspace="))
const productArgs = args.filter((arg) => arg.startsWith("--product="))
const json = args.includes("--json")

const defaultProducts = [
  "singular-landing",
  "v0-singular-stories-app",
  "ss-ios-prototype",
  "singularity-2026",
]

const products = productArgs.length
  ? productArgs.map((arg) => {
      const value = arg.slice("--product=".length)
      const separator = value.indexOf(":")
      if (separator < 1) throw new Error(`Invalid --product value: ${value}`)
      return { name: value.slice(0, separator), root: path.resolve(value.slice(separator + 1)) }
    })
  : defaultProducts.map((name) => ({
      name,
      root: path.join(
        path.resolve(workspaceArg?.slice("--workspace=".length) ?? process.cwd()),
        name,
      ),
    }))

const extensions = new Set([".css", ".tsx", ".ts", ".jsx", ".js", ".swift"])
const excluded = new Set(["node_modules", ".next", ".git", "DerivedData", "build", "dist"])
const rules = [
  { id: "hex", pattern: /#[0-9a-fA-F]{6,8}\b|0x[0-9a-fA-F]{6}\b/g },
  { id: "arbitrary-radius", pattern: /rounded-\[[^\]]+\]|cornerRadius:\s*\d+|border-radius:\s*\d+(?:\.\d+)?/g },
  { id: "arbitrary-type", pattern: /text-\[\d+(?:\.\d+)?(?:px|rem)\]|Font\.system\(size:\s*\d+/g },
  { id: "token-reference", pattern: /var\(--(?:primary|background|foreground|radius)|Singular(?:Spacing|Radius|Layout|Elevation)/g },
]

async function walk(root) {
  const files = []
  let entries
  try {
    entries = await readdir(root, { withFileTypes: true })
  } catch {
    return files
  }
  for (const entry of entries) {
    if (excluded.has(entry.name)) continue
    const full = path.join(root, entry.name)
    if (entry.isDirectory()) files.push(...(await walk(full)))
    else if (extensions.has(path.extname(entry.name))) files.push(full)
  }
  return files
}

const report = []
for (const product of products) {
  let exists = true
  try {
    await stat(product.root)
  } catch {
    exists = false
  }
  if (!exists) {
    report.push({ product: product.name, root: product.root, missing: true })
    continue
  }

  const files = await walk(product.root)
  const counts = Object.fromEntries(rules.map((rule) => [rule.id, 0]))
  let snapshotRelease = null

  for (const file of files) {
    const relative = path.relative(product.root, file)
    if (relative.startsWith(`design-system${path.sep}singular${path.sep}`)) continue
    const content = await readFile(file, "utf8")
    for (const rule of rules) counts[rule.id] += content.match(rule.pattern)?.length ?? 0
  }

  try {
    const snapshot = JSON.parse(
      await readFile(
        path.join(product.root, "design-system/singular/.singular-ds-snapshot.json"),
        "utf8",
      ),
    )
    snapshotRelease = snapshot.release ?? null
  } catch {
    // Products without a vendored snapshot are expected.
  }

  report.push({
    product: product.name,
    root: product.root,
    files: files.length,
    snapshotRelease,
    ...counts,
  })
}

if (json) {
  console.log(JSON.stringify(report, null, 2))
} else {
  console.table(report)
  console.log(
    "\nCounts are drift indicators, not automatic failures. Review documented exemptions.",
  )
}
