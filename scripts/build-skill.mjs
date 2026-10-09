#!/usr/bin/env node
import { copyFile, mkdir, mkdtemp, writeFile, rm, rename, lstat, realpath } from "node:fs/promises"
import { tmpdir } from "node:os"
import path from "node:path"
import { execFileSync } from "node:child_process"
import { root, loadManifest, collectFiles, inventory, provenance } from "./lib/distribution.mjs"

const manifest = await loadManifest()
const output = path.resolve(process.argv[2] || path.join(root, "dist", manifest.name + "-" + manifest.release + ".zip"))
if (!/\.(zip|skill)$/.test(output)) throw new Error("Skill output must be a .zip or .skill archive")
const within = (parent, child) => child === parent || child.startsWith(parent + path.sep)
if (within(root, output) && !within(path.join(root, "dist"), output)) throw new Error("Build output cannot replace source files: " + output)
const files = await collectFiles(root, manifest.distribution.skillEntries)
await mkdir(path.dirname(output), { recursive: true })
const resolvedOutput = path.join(await realpath(path.dirname(output)), path.basename(output))
if (within(root, resolvedOutput) && !within(path.join(root, "dist"), resolvedOutput)) throw new Error("Unsafe resolved archive output")
async function checkExisting() {
  let info
  try { info = await lstat(output) } catch (error) { if (error.code === "ENOENT") return; throw error }
  if (!info.isFile() || info.isSymbolicLink()) throw new Error("Archive output is not a regular file")
  try {
    const previous = JSON.parse(execFileSync("unzip", ["-p", output, manifest.name + "/skill-release.json"], { encoding: "utf8", stdio: ["ignore", "pipe", "ignore"] }))
    if (previous.artifactType !== "agent-skill" || previous.name !== manifest.name) throw new Error("Not a generated skill")
  } catch { throw new Error("Refusing to overwrite an unrelated file: " + output) }
}
await checkExisting()
const stage = await mkdtemp(path.join(tmpdir(), "singular-skill-"))
const archiveStage = await mkdtemp(path.join(path.dirname(output), ".singular-archive-"))
try {
  const skillRoot = path.join(stage, manifest.name)
  for (const relative of files) {
    const destination = path.join(skillRoot, relative)
    await mkdir(path.dirname(destination), { recursive: true })
    await copyFile(path.join(root, relative), destination)
  }
  await writeFile(path.join(skillRoot, "skill-release.json"), JSON.stringify({
    name: manifest.name, release: manifest.release, releaseStatus: manifest.releaseStatus,
    ...provenance(), artifactType: "agent-skill", files: await inventory(skillRoot, files),
  }, null, 2) + "\n")
  const archive = path.join(archiveStage, "skill.zip")
  execFileSync("zip", ["-q", "-r", "-X", archive, manifest.name], { cwd: stage })
  await checkExisting()
  await rename(archive, output)
  console.log("Built " + files.length + " allowlisted files: " + output)
} finally {
  await rm(stage, { recursive: true, force: true })
  await rm(archiveStage, { recursive: true, force: true })
}
