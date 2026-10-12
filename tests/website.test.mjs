// Structural regressions, not a browser/a11y certification.
import test from "node:test"
import assert from "node:assert/strict"
import { readFileSync, existsSync } from "node:fs"
import vm from "node:vm"
const read = file => readFileSync(new URL("../" + file, import.meta.url), "utf8")
test("all website pages share navigation and load the presentation layer last", () => {
  for (const page of ["index.html", "catalog.html", "brand-voice.html"]) {
    const html = read(page)
    const css = [...html.matchAll(/<link[^>]*rel="stylesheet"[^>]*href="([^"]+)"/g)].map(m => m[1])
    assert.match(css.at(-1), /site\/website-polish\.css/)
    assert.match(html, /aria-label="Primary navigation"/)
    assert.match(html, /href="index.html\?preview=20261012\.3" data-nav-overview/)
    for (const label of ["Overview", "Surfaces", "Brand &amp; Voice", "Tokens", "Catalog", "GitHub"]) assert.ok(html.includes(label))
    const nav = html.match(/<nav class="site-nav"[\s\S]*?<\/nav>/)[0]
    assert.ok(nav.indexOf("Brand &amp; Voice") < nav.indexOf("<summary>Surfaces"))
    assert.match(nav, /href="tokens\/demo.html">Tokens/)
    assert.doesNotMatch(html, /data-fullscreen-toggle/)
  }
  assert.doesNotMatch(read("site/component-explorer.js"), /requestFullscreen|fullscreenFallback/)
  assert.doesNotMatch(read("site/design-system-page.css"), /hero-system|hero-catalog|:fullscreen/)
})
test("documentation distinguishes token navigation from explicit file downloads", () => {
  const home = read('index.html')
  assert.match(home, /class="documentation-card" href="tokens\/demo.html"[^>]*>[\s\S]*?View tokens →/)
  assert.match(home, /href="components\/README.md" download="singular-components.md"[\s\S]*?Download inventory \(MD\) ↓/)
  assert.match(home, /href="references\/consumption-and-compatibility.md" download="singular-setup-and-compatibility.md"[\s\S]*?Download reference \(MD\) ↓/)
})
test("website defaults to light while preserving an explicit saved theme", () => {
  for (const page of ["index.html", "catalog.html", "brand-voice.html"]) {
    const bootstrap = read(page).match(/<script>([\s\S]*?)<\/script>/)[1]
    for (const saved of [null, "light", "dark", "blocked"]) {
      let dark = false
      vm.runInNewContext(bootstrap, {
        document: { documentElement: { classList: { toggle(_name, value) { dark = value }, remove() { dark = false } } } },
        localStorage: { getItem() { if (saved === "blocked") throw Error("blocked"); return saved } },
        matchMedia() { throw Error("OS theme must not choose the website default") },
      })
      assert.equal(dark, saved === "dark", page + " " + saved)
    }
  }
})
test("Brand and Voice opens directly in the chapter reader with Next in the right column", () => {
  assert.doesNotMatch(read("brand-voice.html"), /class="docs-hero|class="story-spine/)
  assert.match(read("brand-voice.html"), /data-doc-content/)
  assert.match(read("site/website-polish.css"), /\.docs-pagination \[data-doc-next\] \{ grid-column: 2/)
  assert.match(read("site/website-polish.css"), /\.docs-mobile-bar \{ top: var\(--site-header-clearance\)/)
})
test("footers explain the candidate release without repeating navigation", () => {
  for (const page of ["index.html", "brand-voice.html"]) {
    const footer = read(page).match(/<footer[\s\S]*?<\/footer>/)[0]
    assert.doesNotMatch(footer, /<a\b|<nav\b/)
    assert.match(footer, /2026.10 · Candidate release/)
    assert.match(footer, /under validation/)
  }
})
test("local preview does not retain old HTML or styles across edits", () => {
  assert.equal(JSON.parse(read("package.json")).scripts.preview, "python3 scripts/preview.py")
  assert.match(read("scripts/preview.py"), /Cache-Control", "no-store, max-age=0/)
  assert.match(read("scripts/preview.py"), /del self.headers\["If-Modified-Since"\]/)
})
test("Vercel publishes the current static pages and rebuilds the downloadable skill", () => {
  const config = JSON.parse(read("vercel.json"))
  assert.equal(config.framework, null)
  assert.equal(config.outputDirectory, ".")
  assert.equal(config.buildCommand, "npm run build")
  assert.equal(JSON.parse(read("package.json")).scripts.build, "npm run validate && npm run build:skill")
})
test("home links all seven surfaces without the old orbital diagram or embedded catalog", () => {
  const html = read("index.html")
  const overview = html.match(/<section class="system-overview[^"]*"[\s\S]*?<\/section>/)[0]
  const links = [...overview.matchAll(/href="(surfaces\/[^\"]+)"/g)].map(m => m[1])
  assert.equal(links.length, 7)
  for (const href of links) assert.ok(existsSync(new URL("../" + href, import.meta.url)), href)
  assert.doesNotMatch(html, /The living catalog|data-explorer|hero-system/)
  assert.ok(html.indexOf('id="brand-assets"') < html.indexOf('id="documentation"'))
  assert.match(html, /data-install-feedback/)
})
test("surface carousel keeps six real links, pause controls and a reduced-motion default", () => {
  const html = read("index.html"), js = read("site/surface-carousel.js")
  assert.equal((html.match(/class="surface-card surface-card--/g) ?? []).length, 6)
  for (const control of ["prev", "pause", "next"]) assert.match(html, new RegExp("data-carousel-" + control))
  assert.match(js, /prefers-reduced-motion: reduce/)
  assert.match(js, /setAttribute\("aria-hidden", "true"\)/)
  assert.match(js, /setAttribute\("tabindex", "-1"\)/)
  assert.match(js, /focused|document.hidden/)
})
test("mobile catalog filters use a native disclosure and preview bar does not style slide chart bars", () => {
  assert.match(read("catalog.html"), /<details class="explorer-filters" data-filter-disclosure open>/)
  const css = read("surfaces/preview-shell.css")
  assert.match(css, /body > \.bar/)
  assert.doesNotMatch(css, /(?:^|\n)\.bar\s*\{/)
  assert.doesNotMatch(css, /\.app \.btn-primary/)
})
test("web-app demo uses current tokens and exposes detail only on demand", () => {
  const html = read("surfaces/web-app/demo.html")
  assert.match(html, /data-reference-commit="514d337a/)
  assert.match(html, /\.\.\/\.\.\/tokens\/brand-app\.css/)
  assert.doesNotMatch(html, /data-self-contained|demo-side-modal/)
  assert.match(html, /<dialog class="demo-detail" aria-labelledby="detail-title">/)
  assert.match(html, /data-kpi-toggle aria-expanded="true" aria-controls="headline-kpis"/)
})
test("web-app display utilities stay in the bottom-right corner with safe-area and toast clearance", () => {
  const css = read("surfaces/web-app/demo.css")
  const utilities = css.match(/\.demo-utilities \{([^}]+)\}/)[1]
  assert.match(utilities, /position: fixed/)
  assert.match(utilities, /right: max\(2\.5rem, env\(safe-area-inset-right\)\)/)
  assert.match(utilities, /bottom: max\(2\.5rem, env\(safe-area-inset-bottom\)\)/)
  const toast = css.match(/\.demo-toast \{([^}]+)\}/)[1]
  assert.match(toast, /bottom: calc\(max\(2\.5rem, env\(safe-area-inset-bottom\)\) \+ 4\.5rem\)/)
})
for (const allowed of [true, false]) test(`home command copy works without the removed explorer (clipboard ${allowed ? "allowed" : "denied"})`, async () => {
  const copy = { addEventListener(_name, handler) { this.handler = handler } }
  const feedback = { textContent: "" }
  const fallback = { hidden: true, focus() { this.focused = true }, select() { this.selected = true } }
  const command = "node scripts/export-snapshot.mjs --bundle=core,website-landing --target=../my-project/src/singular"
  const nodes = { "[data-copy-install]": copy, "[data-install-feedback]": feedback, "[data-install-fallback]": fallback, ".install-command code": { textContent: command } }
  let copied
  vm.runInNewContext(read("site/theme-and-assets.js"), {
    document: { documentElement: { classList: { contains() { return false } } }, querySelector: selector => nodes[selector] ?? null, querySelectorAll() { return [] } },
    navigator: { clipboard: { async writeText(text) { if (!allowed) throw Error("denied"); copied = text } } },
  })
  await copy.handler()
  if (allowed) {
    assert.equal(copied, command)
    assert.equal(feedback.textContent, "Command copied.")
    assert.equal(fallback.hidden, true)
  } else {
    assert.equal(fallback.value, command)
    assert.ok(fallback.focused && fallback.selected)
    assert.equal(fallback.hidden, false)
    assert.match(feedback.textContent, /Clipboard unavailable/)
  }
})
