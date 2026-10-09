// DOM-shaped unit doubles exercise state/copy logic; not visual browser verification.
import test from "node:test"
import assert from "node:assert/strict"
import vm from "node:vm"
import { readFileSync } from "node:fs"

const source = name => readFileSync(new URL("../site/" + name, import.meta.url), "utf8")
function element() {
  return {
    textContent: "", innerHTML: "", hidden: true, value: "", dataset: {}, attributes: {}, handlers: {},
    classList: { toggle() {}, add() {}, remove() {} },
    addEventListener(name, handler) { this.handlers[name] = handler },
    setAttribute(name, value) { this.attributes[name] = value },
    querySelectorAll() { return [] }, focus() { this.focused = true }, select() { this.selected = true },
  }
}
function setup(url = "https://example.test/catalog.html", clipboardAllowed = true) {
  const names = ["search", "platform-filters", "category-filters", "trait-filters", "component-list", "result-count",
    "empty-results", "variant-select", "story-breadcrumb", "component-preview", "preview-stage", "preview-size",
    "story-badges", "story-title", "story-description", "story-usage", "story-contract", "story-a11y",
    "story-code", "code-language", "source-link", "copy-code", "copy-link", "copy-fallback", "copy-feedback"]
  const nodes = Object.fromEntries(names.map(name => [name, element()]))
  nodes["copy-code"].textContent = "Copy"
  nodes["copy-link"].textContent = "Copy link"
  const explorer = element()
  explorer.querySelector = selector => nodes[selector.match(/^\[data-(.+)\]$/)?.[1]] ?? null
  const events = {}, totals = element()
  const context = {
    location: { href: url, search: new URL(url).search },
    document: { querySelector: selector => selector === "[data-explorer]" ? explorer : null,
      querySelectorAll: selector => selector === "[data-catalog-counts]" ? [totals] : [],
      addEventListener() {}, body: element() },
    navigator: { clipboard: { async writeText(text) { if (!clipboardAllowed) throw Error("denied"); context.copied = text } } },
    URL, URLSearchParams, Set,
    addEventListener(name, fn) { events[name] = fn }, setTimeout() {},
  }
  context.window = context
  const navigation = []
  const update = next => { context.location.href = String(next); context.location.search = new URL(next).search }
  context.history = {
    pushState(_a, _b, next) { navigation.push(context.location.href); update(next) },
    replaceState(_a, _b, next) { update(next) },
  }
  vm.runInNewContext(source("catalog-stories.js"), context)
  vm.runInNewContext(source("component-explorer.js"), context)
  function click(selector, dataset) {
    const target = { dataset, closest: query => query === selector ? target : null }
    explorer.handlers.click({ target })
  }
  return { nodes, context, events, totals, click, navigation, update }
}
test("permalink restores story/variant and invalid parameters fall back safely", () => {
  const app = setup("https://example.test/catalog.html?story=status-badge&variant=urgent")
  assert.equal(app.nodes["story-title"].textContent, "StatusBadge")
  assert.match(app.nodes["story-code"].textContent, /tone="urgent"/)
  assert.match(app.totals.textContent, /25 stories · 79 examples/)
  const invalid = setup("https://example.test/catalog.html?story=unknown&variant=%3Cscript%3E")
  assert.equal(invalid.nodes["story-title"].textContent, "Button / CTA")
  assert.match(invalid.nodes["story-code"].textContent, /variant="primary"/)
})
test("variant copy, link copy and back/forward state use the selected contract", async () => {
  const app = setup()
  app.click("[data-story-id]", { storyId: "status-badge" })
  app.nodes["variant-select"].value = "danger"
  app.nodes["variant-select"].handlers.change()
  await app.nodes["copy-code"].handlers.click({ currentTarget: app.nodes["copy-code"] })
  assert.match(app.context.copied, /tone="danger"/)
  assert.match(app.context.location.href, /story=status-badge&variant=danger/)
  await app.nodes["copy-link"].handlers.click({ currentTarget: app.nodes["copy-link"] })
  assert.equal(app.context.copied, app.context.location.href)
  app.update(app.navigation.pop())
  app.events.popstate()
  assert.match(app.nodes["story-code"].textContent, /tone="success"/)
})
test("clipboard denial exposes the complete selected text without reporting success", async () => {
  const app = setup("https://example.test/catalog.html?story=empty-state&variant=error", false)
  await app.nodes["copy-code"].handlers.click({ currentTarget: app.nodes["copy-code"] })
  assert.equal(app.nodes["copy-fallback"].hidden, false)
  assert.equal(app.nodes["copy-fallback"].value, app.nodes["story-code"].textContent)
  assert.ok(app.nodes["copy-fallback"].focused && app.nodes["copy-fallback"].selected)
  assert.equal(app.nodes["copy-feedback"].textContent, "Copy selected text")
})
test("foundation filter yields its six entries; empty search resets without stale selection", () => {
  const app = setup()
  app.click("[data-category-filter]", { categoryFilter: "foundation" })
  assert.equal(app.nodes["result-count"].textContent, "6")
  assert.equal(app.nodes["story-title"].textContent, "Color roles")
  app.nodes.search.value = "nothing-matches-this-string"
  app.nodes.search.handlers.input()
  assert.equal(app.nodes["result-count"].textContent, "0")
  assert.equal(app.nodes["empty-results"].hidden, false)
  app.click("[data-clear-filters]", {})
  assert.equal(app.nodes["result-count"].textContent, "25")
  assert.equal(app.nodes.search.value, "")
})
