import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
const read = file => readFileSync(new URL('../' + file, import.meta.url), 'utf8');
const html = read('surfaces/social-email/demo.html');
const rgb = hex => hex.slice(1).match(/../g).map(v => parseInt(v, 16));
const luminance = values => values.map(v => v / 255).map(v => v <= .04045 ? v / 12.92 : ((v + .055) / 1.055) ** 2.4).reduce((s, v, i) => s + v * [.2126, .7152, .0722][i], 0);
const contrast = (a, b) => { const ls = [luminance(a), luminance(b)].sort((x, y) => y - x); return (ls[0] + .05) / (ls[1] + .05); };
const blend = (front, back, alpha) => front.map((v, i) => v * alpha + back[i] * (1 - alpha));
const vars = css => Object.fromEntries([...css.matchAll(/(--[\w-]+):\s*(#[\da-f]{6});/gi)].map(m => [m[1], m[2]]));
test('Social and Email text follows the theme, including logos, legal text and accents', () => {
  assert.match(html, /<html lang="es">/);
  for (const selector of ['.label', '.email p', '.email .foot', '.social p', '.social .handle']) {
    const rule = html.slice(html.indexOf(selector + ' {')).split('}')[0];
    assert.match(rule, /color: var\(--(?:muted-foreground|foreground)\)/, selector);
  }
  assert.match(html, /\.accent \{ color: var\(--interactive\)/);
  assert.match(html, /:root:not\(\.dark\) \.accent \{ background-image: var\(--gradient-text\)/);
  assert.match(html, /\.dark \.logo-light \{ display: none/);
  assert.match(html, /\.dark \.logo-dark \{ display: block/);
  assert.doesNotMatch(html, /color:\s*(?:#fff|#f5f5f5|#c4c8cf|#8a8f99|rgb\(255)/);
});
test('Email text and social text meet AA across theme surfaces and conservative mist blends', () => {
  const web = read('tokens/brand-web.css');
  const light = vars(web.split(':root:not(.dark) {')[1]);
  const navy = vars(read('tokens/navy.css'));
  for (const [background, colors] of [[light['--surface-2'], [light['--foreground-strong'], light['--muted-foreground'], light['--interactive']]], [navy['--navy-surface-2'], [navy['--navy-foreground-strong'], navy['--navy-muted-foreground'], '#8babff']]]) {
    for (const color of colors) assert.ok(contrast(rgb(color), rgb(background)) >= 4.5, `${color} on ${background}`);
  }
  for (const [base, text, accent] of [[light['--background'], light['--foreground'], ['#0067d6', '#00788f']], [navy['--navy-background'], navy['--navy-foreground'], ['#8babff']]]) {
    // Includes simultaneous maxima, more severe than the positioned radial gradients.
    for (const glow of [rgb(base), blend(rgb('#22d3ee'), blend(rgb('#06b6d4'), blend(rgb('#4567ed'), rgb(base), .2), .16), .09)]) {
      assert.ok(contrast(rgb(text), glow) >= 4.5, `social body on ${base}`);
      for (const endpoint of accent) assert.ok(contrast(rgb(endpoint), glow) >= 3, `large accent ${endpoint} on ${base}`);
    }
  }
});
test('logo library is compact without shrinking download targets or readable labels', () => {
  const css = read('site/website-polish.css');
  assert.match(css, /\.logo-download-grid \{ grid-template-columns: repeat\(3,/);
  assert.match(css, /\.logo-download-card__preview \{ min-height: 5.5rem/);
  assert.match(css, /\.logo-download-card__preview img \{ max-width: 11rem; max-height: 3.5rem/);
  assert.match(css, /\.logo-download-card a \{[^}]*min-height: 44px/);
});
