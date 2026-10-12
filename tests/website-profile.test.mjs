// Portable API/behavior regressions. Browser verification and React host integration are separate.
import test from "node:test"
import assert from "node:assert/strict"
import { readFileSync } from "node:fs"
import vm from "node:vm"
const read = file => readFileSync(new URL("../" + file, import.meta.url), "utf8")
const primitives = read("surfaces/website-landing/primitives.tsx")
const css = read("surfaces/website-landing/website.css")
const html = read("surfaces/website-landing/demo.html")
const manifest = JSON.parse(read("design-system.json"))
test("website promotion is pinned to reviewed landing main and included in both distributions", () => {
  const reference = manifest.products.find(p => p.id === "singular-landing")
  assert.equal(reference.referenceCommit, "ef592bafecfbf260ef83c48d901f2e7a128d9b5b")
  assert.equal(reference.verifiedAt, "2026-10-12")
  for (const list of [manifest.distribution.skillEntries, manifest.bundles.core]) assert.ok(list.includes("references/singular-landing-portable-patterns.md"))
  assert.match(html, new RegExp('data-reference-commit="' + reference.referenceCommit + '"'))
  assert.doesNotMatch(primitives, /from ["'](?:next\/|@\/|.*booking)/)
})
test("website APIs remain additive with quiet hero and visible reduced-motion reveal", () => {
  for (const prop of ["secondaryEyebrow", "shortLabel", "subtitleClassName", "maxWidth", "direction", "distance", "trackClassName", "gap"]) assert.ok(primitives.includes(prop))
  assert.match(primitives, /backgroundVariant = "static"/)
  assert.match(primitives, /backgroundVariant\?: "none" \| "static" \| "animated" \| "interactive"/)
  assert.match(primitives, /initial=\{reduce \? false/)
  assert.match(primitives, /aria-label=\{cta.shortLabel \? cta.label/)
  assert.match(primitives, /e.metaKey \|\| e.ctrlKey \|\| e.shiftKey \|\| e.altKey/)
  assert.match(primitives, /target.focus\(\{ preventScroll: true \}\)/)
  assert.match(primitives, /width=\{44\} height=\{44\} loading="lazy" decoding="async"/)
})
test("marquee preserves spacing at the loop boundary, explicit pause and static full reduced-motion content", () => {
  assert.match(primitives, /aria-hidden="true" inert/)
  assert.match(primitives, /aria-pressed=\{paused\}/)
  assert.match(css, /gap: var\(--marquee-gap, 2.5rem\)/)
  assert.match(css, /translateX\(calc\(-50% - var\(--marquee-gap, 2.5rem\) \/ 2\)\)/)
  assert.match(css, /\.marquee:focus-within/)
  assert.match(css, /\.marquee__group \{ flex-wrap: wrap; justify-content: center; width: 100%; \}/)
  assert.match(css, /\.marquee__group\[aria-hidden="true"\], \.marquee-control \{ display: none; \}/)
})
test("website drops old home-specific visuals and tabs viewport bleed", () => {
  assert.doesNotMatch(css, /website-home-gravity|website-home-shell|Home showcase|margin-right: calc\(50% - 50vw\)|width: calc\(100vw/)
  assert.match(css, /\.landing-tabs \{ display: grid; gap: var\(--gap-l\); min-width: 0/)
  assert.match(css, /\.landing-section--alt \{ background: transparent/)
  assert.match(css, /\.singular-cta-section \{ background: transparent/)
  assert.doesNotMatch(html, /Trusted by industry leaders|4\.9|\+300|Book a Strategy Call|website-home-gravity/)
  assert.match(html, /HTML illustration · not a mounted React app/)
})
function luminance(hex) {
  const values = hex.slice(1).match(/../g).map(v => parseInt(v, 16) / 255).map(v => v <= .04045 ? v / 12.92 : ((v + .055) / 1.055) ** 2.4)
  return values[0] * .2126 + values[1] * .7152 + values[2] * .0722
}
const ratio = (a, b) => { const l = [luminance(a), luminance(b)].sort((x, y) => y - x); return (l[0] + .05) / (l[1] + .05) }
test("light website text, links, input borders and focus meet representative AA contrast", () => {
  const light = Object.fromEntries([...read("tokens/brand-web.css").split(":root:not(.dark) {")[1].split("}")[0].matchAll(/(--[\w-]+):\s*([^;]+);/g)].map(m => [m[1], m[2]]))
  for (const background of ["--background", "--surface-1", "--surface-2", "--surface-3", "--surface-4"]) {
    for (const text of ["--foreground", "--foreground-strong", "--muted-foreground", "--interactive"]) assert.ok(ratio(light[text], light[background]) >= 4.5, `${text} on ${background}`)
    for (const outline of ["--input", "--ring"]) assert.ok(ratio(light[outline], light[background]) >= 3, `${outline} on ${background}`)
  }
})
test("demo starts light and does not infer a default from the OS", () => {
  const bootstrap = html.match(/<script>([\s\S]*?)<\/script>/)[1]
  for (const saved of [null, "light", "dark", "blocked"]) {
    let dark = false
    vm.runInNewContext(bootstrap, {
      document: { documentElement: { classList: { toggle(_name, state) { dark = state }, remove() { dark = false } } } },
      localStorage: { getItem() { if (saved === "blocked") throw Error("blocked"); return saved } },
      matchMedia() { throw Error("OS default not allowed") },
    })
    assert.equal(dark, saved === "dark")
  }
})
function demoHarness(clipboardAllowed = true) {
  const node = attrs => ({ attrs: { ...attrs }, hidden: false, dataset: {}, addEventListener(event, handler) { this[event] = handler }, setAttribute(key, value) { this.attrs[key] = value }, getAttribute(key) { return this.attrs[key] }, focus() { this.focused = true }, select() { this.selected = true } })
  const tabs = ["narrative", "components", "interaction"].map(id => node({ "aria-controls": "panel-" + id }))
  const panels = Object.fromEntries(tabs.map(t => [t.attrs["aria-controls"], node({})]))
  const theme = node({}), marquee = node({}), pause = node({}), result = node({}), status = node({}), code = node({}), close = node({}), copy = node({})
  copy.dataset.copyRecipe = "hero"
  const nodes = { "[data-theme-toggle]": theme, "[data-marquee]": marquee, "[data-marquee-pause]": pause, "[data-copy-result]": result, "[data-copy-status]": status, "[data-copy-code]": code, "[data-copy-close]": close }
  let dark = false, copied
  const context = { window: {}, document: {
    documentElement: { classList: { contains() { return dark }, toggle() { dark = !dark } } },
    querySelector: selector => nodes[selector],
    querySelectorAll: selector => selector === "[data-tabs]" ? [{ querySelectorAll: () => tabs }] : selector === "[data-copy-recipe]" ? [copy] : [],
    getElementById: id => panels[id],
  }, localStorage: { setItem() { throw Error("blocked") } }, navigator: { clipboard: { async writeText(text) { if (!clipboardAllowed) throw Error("blocked"); copied = text } } } }
  vm.runInNewContext(read("surfaces/website-landing/recipes.js"), context)
  vm.runInNewContext(read("surfaces/website-landing/demo.js"), context)
  return { ...nodes, tabs, panels, theme, marquee, pause, result, status, code, close, copy, copied: () => copied, dark: () => dark }
}
test("demo tabs support arrow wrapping, Home and End with one active panel", () => {
  const h = demoHarness()
  for (const [current, key, selected] of [[0, "ArrowRight", 1], [1, "End", 2], [2, "ArrowRight", 0], [0, "Home", 0], [0, "ArrowLeft", 2]]) {
    let prevented = false
    h.tabs[current].keydown({ key, preventDefault() { prevented = true } })
    assert.ok(prevented)
    assert.equal(h.tabs[selected].attrs["aria-selected"], "true")
    assert.ok(h.tabs[selected].focused)
    assert.equal(Object.values(h.panels).filter(p => !p.hidden).length, 1)
    assert.equal(h.tabs.filter(t => t.tabIndex === 0).length, 1)
  }
})
test("demo theme and marquee controls work when storage is blocked", () => {
  const h = demoHarness()
  h.theme.click()
  assert.ok(h.dark())
  assert.equal(h.theme.attrs["aria-label"], "Switch to light mode")
  h.pause.click()
  assert.equal(h.marquee.dataset.paused, "true")
  assert.equal(h.pause.attrs["aria-pressed"], "true")
  h.pause.click()
  assert.equal(h.marquee.dataset.paused, "false")
})
for (const allowed of [true, false]) test(`website recipe copy exposes source and restores focus (clipboard ${allowed ? "allowed" : "blocked"})`, async () => {
  const h = demoHarness(allowed)
  await h.copy.click()
  assert.equal(h.result.hidden, false)
  assert.match(h.code.value, /import .*PageShell.*HeroSection/)
  assert.ok(h.code.focused && h.code.selected)
  assert.match(h.status.textContent, allowed ? /Recipe copied/ : /Clipboard unavailable/)
  if (allowed) assert.equal(h.copied(), h.code.value)
  h.close.click()
  assert.ok(h.result.hidden && h.copy.focused)
})
