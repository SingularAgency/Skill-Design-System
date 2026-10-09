import { lstat, readdir, readFile } from "node:fs/promises"
import path from "node:path"
import { createHash } from "node:crypto"
import { execFileSync } from "node:child_process"

export const root = path.resolve(import.meta.dirname, "../..")
export const loadManifest = async (base = root) => JSON.parse(await readFile(path.join(base, "design-system.json"), "utf8"))
export function safeRelative(value) {
  if (typeof value !== "string" || !value || path.isAbsolute(value) || value.includes("\\") ||
      value.split("/").some((part) => !part || part === "." || part === "..")) {
    throw new Error("Invalid distribution path: " + value)
  }
  return value
}
export async function collectFiles(base, entries) {
  const files = new Set()
  async function walk(relative) {
    safeRelative(relative)
    if ([".DS_Store", ".gitkeep"].includes(path.basename(relative))) return
    const info = await lstat(path.join(base, relative))
    if (info.isSymbolicLink()) throw new Error("Distribution cannot contain a symlink: " + relative)
    if (info.isDirectory()) {
      for (const name of (await readdir(path.join(base, relative))).sort()) await walk(relative + "/" + name)
    } else if (info.isFile()) {
      if (relative.split("/").some((part) => part.startsWith(".") || part === "node_modules")) {
        throw new Error("Local/private file in distribution: " + relative)
      }
      files.add(relative)
    }
  }
  for (const entry of entries) await walk(entry)
  return [...files].sort()
}
export async function inventory(base, files) {
  return Promise.all(files.map(async (file) => ({
    path: file,
    sha256: createHash("sha256").update(await readFile(path.join(base, file))).digest("hex"),
  })))
}
export function provenance(base = root) {
  try {
    return {
      sourceCommit: execFileSync("git", ["rev-parse", "HEAD"], { cwd: base, encoding: "utf8" }).trim(),
      sourceDirty: execFileSync("git", ["status", "--porcelain"], { cwd: base, encoding: "utf8" }).trim().length > 0,
    }
  } catch { return { sourceCommit: null, sourceDirty: null } }
}
