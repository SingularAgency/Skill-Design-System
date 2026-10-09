// Optional integration check against an existing React host's dependencies.
// It reads that host, never edits it. It does not prove a clean-host setup or runtime behavior.
import path from "node:path"
import { readFileSync } from "node:fs"
import { createRequire } from "node:module"
import vm from "node:vm"
import { root } from "./lib/distribution.mjs"

const dependencyRoot = process.argv.find(arg => arg.startsWith("--dependencies="))?.slice(15)
if (!dependencyRoot) throw new Error("Pass --dependencies=/absolute/path/to/react-host (with typescript and declared peer dependencies installed).")
const externalRoot = path.resolve(dependencyRoot)
const peerArg = process.argv.find(arg => arg.startsWith("--peer-dependencies="))?.slice(20)
const peerRoot = peerArg ? path.resolve(peerArg) : null
const require = createRequire(path.join(externalRoot, "package.json"))
const ts = require("typescript")
const context = { window: {} }
vm.runInNewContext(readFileSync(path.join(root, "site/catalog-stories.js"), "utf8"), context)
const { stories, codeFor } = context.window.SingularCatalog
const excludeWebsite = process.argv.includes("--exclude-website")
const examples = new Map(stories.filter(s => s.language === "tsx" && (!excludeWebsite || !s.source.startsWith("surfaces/website-landing/"))).flatMap(story =>
  story.variants.map(variant => [path.join(root, `__catalog_${story.id}_${variant}.tsx`), codeFor(story, variant)])))
const options = {
  noEmit: true, strict: true, skipLibCheck: true, esModuleInterop: true,
  jsx: ts.JsxEmit.ReactJSX, target: ts.ScriptTarget.ES2022,
  module: ts.ModuleKind.ESNext, moduleResolution: ts.ModuleResolutionKind.Bundler,
  baseUrl: externalRoot, paths: { "@/*": [externalRoot + "/*"] },
  typeRoots: [path.join(externalRoot, "node_modules/@types")],
}
const host = ts.createCompilerHost(options)
const originalRead = host.readFile
const originalExists = host.fileExists
host.readFile = file => examples.get(file) ?? originalRead(file)
host.fileExists = file => examples.has(file) || originalExists(file)
host.getSourceFile = (file, languageVersion) => {
  const text = host.readFile(file)
  return text === undefined ? undefined : ts.createSourceFile(file, text, languageVersion, true)
}
host.resolveModuleNames = (names, file) => names.map(name => {
  const localName = examples.has(file) ? name.replace(/^\.\/singular\//, "./") : name
  return ts.resolveModuleName(localName, file, options, host).resolvedModule
    ?? ts.resolveModuleName(name, path.join(externalRoot, "__catalog_dependency_lookup.tsx"), options, host).resolvedModule
    ?? (peerRoot ? ts.resolveModuleName(name, path.join(peerRoot, "__catalog_peer_lookup.tsx"), options, host).resolvedModule : undefined)
})
const program = ts.createProgram([...examples.keys()], options, host)
const errors = ts.getPreEmitDiagnostics(program)
if (errors.length) {
  console.error(ts.formatDiagnosticsWithColorAndContext(errors, {
    getCurrentDirectory: () => root, getCanonicalFileName: f => f, getNewLine: () => "\n",
  }))
  process.exitCode = 1
} else console.log(`Type-checked ${examples.size} catalog TSX examples against source APIs using dependencies from ${externalRoot}.${excludeWebsite ? " Website examples excluded: framer-motion is not installed in this host." : ""} Runtime and clean-host verification remain separate.`)
