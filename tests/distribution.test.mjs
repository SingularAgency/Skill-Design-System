import test from "node:test"
import assert from "node:assert/strict"
import { mkdtemp, mkdir, readFile, writeFile, rm } from "node:fs/promises"
import { tmpdir } from "node:os"
import path from "node:path"
import { execFileSync, spawnSync } from "node:child_process"
import { createHash } from "node:crypto"
import { root, loadManifest, collectFiles, safeRelative } from "../scripts/lib/distribution.mjs"

test("skill allowlist contains complete routing resources but no local agent config", async () => {
  const manifest = await loadManifest()
  const files = await collectFiles(root, manifest.distribution.skillEntries)
  for (const expected of ["SKILL.md", "agents/openai.yaml", "docs/README.md", "ux-voice/product.md",
    "surfaces/studio/guide.md", "surfaces/ios-app/guide.md", "tokens/typography.css", "tokens/semantic-status.css"]) {
    assert.ok(files.includes(expected), expected)
  }
  assert.ok(files.every((f) => !/(^|\/)(\.claude|\.env|\.git|node_modules|site)(\/|$)/.test(f)))
})
test("distribution paths cannot escape their root", () => {
  for (const value of ["../outside", "/tmp/outside", "a/../b", "a\\b", ""]) assert.throws(() => safeRelative(value))
})
test("every snapshot bundle exports with source-relative dependencies and hashes", async () => {
  const temp = await mkdtemp(path.join(tmpdir(), "singular-export-test-"))
  try {
    const manifest = await loadManifest()
    for (const bundle of Object.keys(manifest.bundles)) {
      const target = path.join(temp, bundle)
      execFileSync(process.execPath, ["scripts/export-snapshot.mjs", "--bundle=" + bundle, "--target=" + target], { cwd: root })
      const metadata = JSON.parse(await readFile(path.join(target, ".singular-ds-snapshot.json"), "utf8"))
      assert.equal(metadata.release, manifest.release)
      assert.equal(metadata.artifactType, "code-snapshot")
      assert.ok(metadata.files.some((f) => f.path === "tokens/semantic-status.css"))
      assert.ok(metadata.files.every((f) => /^[a-f0-9]{64}$/.test(f.sha256)))
      await readFile(path.join(target, "docs/05-experience-foundations.md"))
    }
  } finally { await rm(temp, { recursive: true, force: true }) }
})
test("export refuses existing directories and invalid bundles without deleting anything", async () => {
  const temp = await mkdtemp(path.join(tmpdir(), "singular-export-safety-"))
  try {
    const target = path.join(temp, "user-data")
    await mkdir(target)
    await writeFile(path.join(target, "important.txt"), "keep")
    for (const bundle of ["core", "unknown"]) {
      const result = spawnSync(process.execPath, ["scripts/export-snapshot.mjs", "--bundle=" + bundle, "--target=" + target], { cwd: root })
      assert.notEqual(result.status, 0)
      assert.equal(await readFile(path.join(target, "important.txt"), "utf8"), "keep")
    }
    for (const target of [root, path.dirname(root), path.join(root, "assets/new-snapshot")]) {
      assert.notEqual(spawnSync(process.execPath, ["scripts/export-snapshot.mjs", "--bundle=core", "--target=" + target], { cwd: root }).status, 0)
    }
  } finally { await rm(temp, { recursive: true, force: true }) }
})
test("built skill archive has one root, complete verified resources and no local settings", async () => {
  const temp = await mkdtemp(path.join(tmpdir(), "singular-skill-archive-test-"))
  try {
    const output = path.join(temp, "skill.zip")
    execFileSync(process.execPath, ["scripts/build-skill.mjs", output], { cwd: root })
    const entries = execFileSync("unzip", ["-Z1", output], { encoding: "utf8" }).trim().split("\n")
    assert.ok(entries.every(f => f.startsWith("singular-design-system/")))
    assert.ok(entries.every(f => !/(^|\/)(\.env|\.claude|\.git|node_modules|site)(\/|$)/.test(f)))
    const metadata = JSON.parse(execFileSync("unzip", ["-p", output, "singular-design-system/skill-release.json"], { encoding: "utf8" }))
    assert.equal(metadata.artifactType, "agent-skill")
    assert.equal(metadata.releaseStatus, (await loadManifest()).releaseStatus)
    for (const file of metadata.files) {
      const bytes = execFileSync("unzip", ["-p", output, "singular-design-system/" + file.path])
      assert.equal(createHash("sha256").update(bytes).digest("hex"), file.sha256, file.path)
    }
    for (const required of ["docs/05-experience-foundations.md", "ux-voice/product.md", "references/consumption-and-compatibility.md", "agents/openai.yaml"]) {
      assert.ok(entries.includes("singular-design-system/" + required))
    }
    // Run the downloaded skill's exporter without consulting the original clone.
    const extraction = path.join(temp, "extracted")
    execFileSync("unzip", ["-q", output, "-d", extraction])
    const downloadedRoot = path.join(extraction, "singular-design-system")
    const offlineSnapshot = path.join(temp, "offline-snapshot")
    execFileSync(process.execPath, ["scripts/export-snapshot.mjs", "--bundle=core,web-app", "--target=" + offlineSnapshot], { cwd: downloadedRoot, stdio: "pipe" })
    assert.equal(JSON.parse(await readFile(path.join(offlineSnapshot, ".singular-ds-snapshot.json"), "utf8")).release, metadata.release)
    await readFile(path.join(offlineSnapshot, "surfaces/web-app/components.tsx"))
    // Generated artifacts can rebuild; unrelated files cannot be replaced.
    execFileSync(process.execPath, ["scripts/build-skill.mjs", output], { cwd: root })
    const foreign = path.join(temp, "personal.zip")
    await writeFile(foreign, "keep")
    assert.notEqual(spawnSync(process.execPath, ["scripts/build-skill.mjs", foreign], { cwd: root }).status, 0)
    assert.equal(await readFile(foreign, "utf8"), "keep")
    assert.notEqual(spawnSync(process.execPath, ["scripts/build-skill.mjs", path.join(root, "assets/logos/personal.zip")], { cwd: root }).status, 0)
  } finally { await rm(temp, { recursive: true, force: true }) }
})
