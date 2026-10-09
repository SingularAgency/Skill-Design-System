import test from "node:test"
import assert from "node:assert/strict"
import { readFile, access } from "node:fs/promises"
import path from "node:path"
import vm from "node:vm"
import { root } from "../scripts/lib/distribution.mjs"

const context = { window: {} }
vm.runInNewContext(await readFile(path.join(root, "site/catalog-stories.js"), "utf8"), context)
const { stories, codeFor } = context.window.SingularCatalog

test("catalog has unique stable IDs, source links, nonempty foundations and defined copy for every example", async () => {
  assert.equal(new Set(stories.map(s => s.id)).size, stories.length)
  assert.ok(stories.filter(s => s.category === "foundation").length >= 6)
  for (const story of stories) {
    await access(path.join(root, story.source))
    assert.ok(story.variants.length > 0, story.id)
    assert.equal(new Set(story.variants).size, story.variants.length)
    for (const variant of story.variants) {
      const code = codeFor(story, variant)
      assert.ok(code.length > 60, story.id + "/" + variant)
      assert.ok(story.render(variant).length > 20)
      assert.doesNotMatch(code, /<DataRow\b|<AgentTraceRow\b|highlightedColumn=|<SystemChip>|message=/)
    }
  }
})
test("copy uses real named exports and declared source-relative imports", async () => {
  for (const story of stories.filter(s => s.language === "tsx")) {
    for (const variant of story.variants) {
      const code = codeFor(story, variant)
      for (const [, names, relative] of code.matchAll(/import \{ ([^}]+) \} from "\.\/singular\/([^"]+)"/g)) {
        const files = [relative + ".tsx", relative + ".ts", relative + "/index.ts"]
        let source
        for (const file of files) { try { source = await readFile(path.join(root, file), "utf8"); break } catch {} }
        assert.ok(source, relative)
        for (const name of names.split(", ").map(n => n.trim())) {
          assert.match(source, new RegExp("export (?:(?:function|const)\\s+|\\{[^}]*\\b)" + name + "\\b"), `${story.id}: ${name} is not exported`)
        }
      }
    }
  }
})
test("variant copy updates meaning and labels without inventing domain transitions", () => {
  const status = stories.find(s => s.id === "status-badge")
  for (const tone of status.variants) assert.ok(codeFor(status, tone).includes(`tone="${tone}"`))
  const empty = stories.find(s => s.id === "empty-state")
  for (const variant of empty.variants) assert.ok(codeFor(empty, variant).includes(`variant="${variant}"`))
  const pills = stories.find(s => s.id === "pill-filter")
  assert.match(codeFor(pills, "multi"), /useState<string\[\]>\(\["ALL"\]\)/)
  assert.match(codeFor(pills, "single"), /selected=\{selected\} onSelect=\{setSelected\}/)
  const routes = stories.find(s => s.id === "section-tabs")
  assert.match(codeFor(routes, "three-items"), /pathname=.*\n\s+tabs=/)
  assert.doesNotMatch(routes.render("three-items"), /role="tab/)
})
test("both website entries load the same catalog registry before its consumer", async () => {
  for (const file of ["index.html", "catalog.html"]) {
    const html = await readFile(path.join(root, file), "utf8")
    assert.ok(html.indexOf('src="site/catalog-stories.js') < html.indexOf('src="site/component-explorer.js'))
    assert.match(html, /data-copy-link/)
    assert.match(html, /data-copy-fallback/)
    assert.doesNotMatch(html, /17 stories · 55 variants|data-component-list role="listbox"/)
  }
})
