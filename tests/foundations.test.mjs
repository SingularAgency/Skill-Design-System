import test from "node:test"
import assert from "node:assert/strict"
import { readFileSync } from "node:fs"

const read = (file) => readFileSync(new URL("../" + file, import.meta.url), "utf8")
const css = read("tokens/semantic-status.css")
function declarations(selector) {
  const body = css.split(selector + " {")[1].split("}")[0]
  return Object.fromEntries([...body.matchAll(/(--[\w-]+):\s*([^;]+);/g)].map((m) => [m[1], m[2]]))
}
function luminance(hex) {
  const rgb = hex.slice(1).match(/../g).map((s) => parseInt(s, 16) / 255)
    .map((c) => c <= 0.04045 ? c / 12.92 : ((c + 0.055) / 1.055) ** 2.4)
  return rgb[0] * 0.2126 + rgb[1] * 0.7152 + rgb[2] * 0.0722
}
const contrast = (a, b) => {
  const l = [luminance(a), luminance(b)].sort((a, b) => b - a)
  return (l[0] + 0.05) / (l[1] + 0.05)
}
function composite(foreground, background, opacity) {
  const channels = hex => hex.slice(1).match(/../g).map(s => parseInt(s, 16))
  const fg = channels(foreground), bg = channels(background)
  return "#" + fg.map((v, i) => Math.round(v * opacity + bg[i] * (1 - opacity)).toString(16).padStart(2, "0")).join("")
}
const light = declarations(":root"), dark = { ...light, ...declarations(".dark") }
const tones = ["success", "warning", "urgent", "danger", "info", "neutral"]
test("six semantic tones expose five slots and are independent of brand/page accent", () => {
  for (const tone of tones) for (const slot of ["fg", "bg", "border", "solid", "on-solid"]) {
    const value = light["--status-" + tone + "-" + slot]
    assert.ok(value, tone + "/" + slot)
    assert.doesNotMatch(value, /--primary|--brand|--singular/)
    assert.ok(read("tokens/theme-mapping.css").includes("--color-status-" + tone + "-" + slot + ":"))
  }
})
test("semantic text and on-solid pairs meet 4.5:1 on representative surfaces", () => {
  for (const [theme, vars, backgrounds] of [
    ["light", light, ["#ffffff", "#e6ecf6"]],
    ["dark", dark, ["#05060d", "#1a1f36", "#131d33"]],
  ]) for (const tone of tones) {
    const prefix = "--status-" + tone + "-"
    assert.ok(contrast(vars[prefix + "on-solid"], vars[prefix + "solid"]) >= 4.5, theme + "/" + tone + "/solid")
    for (const background of backgrounds) {
      assert.ok(contrast(vars[prefix + "fg"], background) >= 4.5, theme + "/" + tone + "/" + background)
    }
  }
})
test("new typography is an imported role system, not feature-local values", () => {
  const type = read("tokens/typography.css")
  for (const role of ["page-title", "card-title", "modal-title", "entity-narrative", "body", "caption", "kpi"]) {
    assert.ok(type.includes("--type-" + role + "-size:"))
    assert.ok(read("tokens/core-utilities.css").includes("var(--type-" + role + "-size)"))
  }
  assert.match(read("tokens/core.css"), /@import "\.\/typography\.css"/)
  assert.match(read("tokens/core.css"), /@import "\.\/semantic-status\.css"/)
})
test("semantic foreground remains readable on its alpha-tinted badge background", () => {
  for (const [theme, vars, backgrounds] of [
    ["light", light, ["#ffffff", "#e6ecf6"]],
    ["dark", dark, ["#05060d", "#1a1f36", "#131d33"]],
  ]) for (const tone of tones) for (const background of backgrounds) {
    const prefix = "--status-" + tone + "-"
    const percent = Number(vars[prefix + "bg"].match(/(\d+)%/)[1]) / 100
    const resolved = composite(vars[prefix + "solid"], background, percent)
    const ratio = contrast(vars[prefix + "fg"], resolved)
    assert.ok(ratio >= 4.5, `${theme}/${tone} tinted ${background}: ${ratio.toFixed(2)}`)
  }
})
test("spacing mappings do not collide with Tailwind container sizes", () => {
  const mapping = read("tokens/theme-mapping.css")
  for (const name of ["s", "m", "l"]) assert.ok(mapping.includes("--spacing-" + name + ": var(--gap-" + name + ")"))
  assert.doesNotMatch(mapping, /--spacing-(xs|xl):/)
})
test("legacy semantic and type entrypoints still exist", () => {
  const core = read("tokens/core.css")
  for (const name of ["success", "warning", "info", "destructive", "font-sans", "font-mono", "text-2xs", "text-3xs"]) {
    assert.ok(core.includes("--" + name + ":"))
  }
})
test("app CTA gradient endpoints support normal white text", () => {
  const app = read("tokens/brand-app.css")
  for (const color of ["#0067d6", "#00788f", "#005bbf", "#006f86"]) assert.ok(contrast("#ffffff", color) >= 4.5, color)
  assert.doesNotMatch(app, /linear-gradient\(180deg, color-mix\(in srgb, #ffffff (16|20)%/)
})
test("app primary and sidebar solid pairs support their declared foreground in both themes", () => {
  const app = read("tokens/brand-app.css")
  const vars = selector => Object.fromEntries([...app.split(selector + " {")[1].split("}")[0]
    .matchAll(/(--[\w-]+):\s*([^;]+);/g)].map(m => [m[1], m[2]]))
  const lightApp = vars(":root"), darkApp = { ...lightApp, ...vars(".dark") }
  for (const profile of [lightApp, darkApp]) {
    assert.ok(contrast(profile["--primary"], profile["--primary-foreground"]) >= 4.5)
    assert.ok(contrast(profile["--interactive"], profile["--sidebar-primary-foreground"]) >= 4.5)
    assert.ok(contrast(profile["--button-primary"], profile["--button-primary-foreground"]) >= 4.5)
  }
})
