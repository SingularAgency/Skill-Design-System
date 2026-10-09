#!/usr/bin/env node
import { copyFile, lstat, mkdir, mkdtemp, rename, rm, writeFile, realpath } from "node:fs/promises"
import path from "node:path"
import { root, loadManifest, collectFiles, inventory, provenance } from "./lib/distribution.mjs"

const args = new Map(process.argv.slice(2).map((arg) => {
  const [key, ...value] = arg.replace(/^--/, "").split("=")
  return [key, value.length ? value.join("=") : true]
}))
const manifest = await loadManifest()
if (args.has("list")) {
  console.log(Object.keys(manifest.bundles).join("\n"))
} else {
  if (typeof args.get("target") !== "string" || typeof args.get("bundle") !== "string") {
    throw new Error("Usage: node scripts/export-snapshot.mjs --bundle=core,web-app --target=/new/directory")
  }
  const target = path.resolve(args.get("target"))
  const selected = [...new Set(["core", ...args.get("bundle").split(",").map((s) => s.trim()).filter(Boolean)])].sort()
  for (const name of selected) if (!manifest.bundles[name]) throw new Error("Unknown bundle: " + name)
  const files = await collectFiles(root, selected.flatMap((name) => manifest.bundles[name]))
  const isWithin = (parent, child) => child === parent || child.startsWith(parent + path.sep)
  if (target === path.parse(target).root || isWithin(target, root) ||
      (isWithin(root, target) && !isWithin(path.join(root, "dist"), target))) {
    throw new Error("Unsafe snapshot target: " + target)
  }
  // Snapshot exports never delete or overwrite a user's existing directory.
  try { await lstat(target); throw new Error("Target already exists. Choose a new directory: " + target) }
  catch (error) { if (error.code !== "ENOENT") throw error }
  await mkdir(path.dirname(target), { recursive: true })
  const actualParent = await realpath(path.dirname(target))
  const resolvedTarget = path.join(actualParent, path.basename(target))
  if (isWithin(resolvedTarget, root) ||
      (isWithin(root, resolvedTarget) && !isWithin(path.join(root, "dist"), resolvedTarget))) {
    throw new Error("Unsafe resolved snapshot target: " + resolvedTarget)
  }
  const stage = await mkdtemp(path.join(actualParent, ".singular-snapshot-"))
  try {
    for (const relative of files) {
      const destination = path.join(stage, relative)
      await mkdir(path.dirname(destination), { recursive: true })
      await copyFile(path.join(root, relative), destination)
    }
    const metadata = {
      name: manifest.name, release: manifest.release, releaseStatus: manifest.releaseStatus,
      ...provenance(), bundles: selected, layoutVersion: 1,
      generatedAt: new Date().toISOString(), files: await inventory(stage, files),
      artifactType: "code-snapshot",
    }
    await writeFile(path.join(stage, ".singular-ds-snapshot.json"), JSON.stringify(metadata, null, 2) + "\n")
    try { await lstat(target); throw new Error("Target appeared during export: " + target) }
    catch (error) { if (error.code !== "ENOENT") throw error }
    await rename(stage, target)
    console.log("Exported " + files.length + " files to " + target)
  } finally {
    // stage is the unique directory created by this invocation, never the target.
    await rm(stage, { recursive: true, force: true })
  }
}
