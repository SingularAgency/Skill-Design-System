// Initial coverage signal: source exports referenced by copy examples.
// Not coverage of visual states, a11y behavior, native APIs, tokens or all recipes.
import path from "node:path"
import vm from "node:vm"
import { readFile } from "node:fs/promises"
import { root, collectFiles, loadManifest } from "./lib/distribution.mjs"

const manifest = await loadManifest()
const files = await collectFiles(root, manifest.distribution.skillEntries)
const context = { window: {} }
vm.runInNewContext(await readFile(path.join(root, "site/catalog-stories.js"), "utf8"), context)
const { stories, codeFor } = context.window.SingularCatalog
const references = new Map()
for (const story of stories.filter(s => s.language === "tsx")) for (const variant of story.variants) {
  for (const [, names] of codeFor(story, variant).matchAll(/import \{ ([^}]+) \} from "\.\/singular\/[^\"]+"/g)) {
    for (const name of names.split(", ")) {
      if (!references.has(name)) references.set(name, new Set())
      references.get(name).add(story.id)
    }
  }
}
const components = []
for (const source of files.filter(f => f.endsWith(".tsx"))) {
  const text = await readFile(path.join(root, source), "utf8")
  for (const [, name] of text.matchAll(/^export (?:function|const) ([A-Z][\w]*)/gm)) {
    components.push({ name, source, referencedByExamples: [...(references.get(name) ?? [])] })
  }
}
console.log(JSON.stringify({
  release: manifest.release, coverageStatus: "partial", scope: "named uppercase React exports",
  storyCount: stories.length, exampleCount: stories.reduce((n, s) => n + s.variants.length, 0),
  exportCount: components.length,
  referencedExportCount: components.filter(c => c.referencedByExamples.length).length,
  components,
}, null, 2))
