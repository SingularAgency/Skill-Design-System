// Host navigation regressions; visual/responsive verification runs separately.
import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync, existsSync } from 'node:fs';
import vm from 'node:vm';

const read = file => readFileSync(new URL('../' + file, import.meta.url), 'utf8');
const source = read('surfaces/showcase-navigation.js');
const css = read('surfaces/showcase-navigation.css');
const demos = [
  ['surfaces/website-landing/demo.html', 'website-landing'],
  ['surfaces/web-app/demo.html', 'web-app'],
  ['surfaces/studio/demo.html', 'studio'],
  ['surfaces/slides-presentations/demo.html', 'slides'],
  ['surfaces/social-email/demo.html', 'social-email'],
  ['tokens/demo.html', 'tokens'], ['backgrounds/demo.html', 'backgrounds'],
];

test('all surface and foundation demos load the same host navigation after their own styles', () => {
  for (const [file, surface] of demos) {
    const html = read(file);
    assert.match(html, new RegExp(`data-showcase-surface="${surface}"`), file);
    assert.match(html, /<script src="[^"]*showcase-navigation.js\?v=20261012.6" defer>/, file);
    const styles = [...html.matchAll(/<link\b[^>]*rel="stylesheet"[^>]*>/g)];
    assert.match(styles.at(-1)[0], /showcase-navigation.css/, file);
    assert.match(html, /<noscript><nav class="ds-showcase-fallback"/, file);
  }
  assert.doesNotMatch(read(demos[0][0]), /<header class="demo-header"/);
  const manifest = JSON.parse(read('design-system.json'));
  for (const file of ['surfaces/showcase-navigation.js', 'surfaces/showcase-navigation.css']) {
    assert.ok(manifest.bundles.core.includes(file), `${file} needed by exported previews`);
  }
});

function harness({ origin = 'http://localhost:4789/', saved = null, search = '', surface = 'web-app', blocked = false } = {}) {
  let focused, dark = true;
  const handlers = new Map(), dispatched = [], stored = [];
  const node = () => ({
    dataset: {}, attrs: {}, children: [], hidden: false, style: {},
    classList: { add() {} },
    setAttribute(key, value) { this.attrs[key] = value; },
    addEventListener(type, handler) { this[type] = handler; },
    appendChild(child) { this.children.push(child); },
    contains(target) { return this === target || this.children.includes(target); },
    focus() { focused = this; },
    getBoundingClientRect() { return { height: 80, bottom: 96, left: 600 }; },
    querySelector(selector) { return selector === 'a' ? this.children[0] : null; },
    querySelectorAll(selector) { return selector === 'a' ? this.children : []; },
  });
  const trigger = node(), theme = node(), header = node(), panel = node();
  const links = ['index.html?preview=20261012.6', 'brand-voice.html', 'catalog.html', 'tokens/demo.html'].map(route => {
    const link = node(); link.dataset.showcaseRoute = route; return link;
  });
  const logos = ['light', 'dark'].map(mode => { const img = node(); img.dataset.showcaseLogo = mode; return img; });
  header.querySelectorAll = selector => selector === '[data-showcase-route]' ? links : logos;
  header.querySelector = selector => selector === '.ds-showcase-surfaces' ? trigger : selector === '.ds-showcase-theme' ? theme : selector.includes('tokens/demo.html') ? links[3] : links[2];
  const root = {
    style: { setProperty(name, value) { this[name] = value; } },
    classList: { contains() { return dark; }, toggle(_name, force) { dark = force === undefined ? !dark : force; return dark; } },
  };
  const document = {
    currentScript: { src: new URL('surfaces/showcase-navigation.js', origin).href }, documentElement: root,
    body: { dataset: { showcaseSurface: surface }, prepend() {}, appendChild() {} },
    querySelector() { return null; },
    createElement(tag) { return tag === 'header' ? header : tag === 'nav' ? panel : node(); },
    addEventListener(type, handler) { handlers.set(type, handler); },
  };
  const window = { innerWidth: 1280, addEventListener() {}, dispatchEvent(event) { dispatched.push(event.type); } };
  const location = { hostname: new URL(origin).hostname, search };
  vm.runInNewContext(source, {
    document, window, location, URL, URLSearchParams, Event,
    localStorage: {
      getItem() { if (blocked) throw Error('blocked'); return saved; },
      setItem(key, value) { if (blocked) throw Error('blocked'); stored.push([key, value]); },
    },
  });
  return { trigger, theme, header, panel, links, logos, root, stored, dispatched, dark: () => dark, focused: () => focused, documentEvent: (type, event) => handlers.get(type)(event) };
}

test('navigation routes resolve under localhost and GitHub Pages, with published fallback for archives', () => {
  for (const origin of ['http://localhost:4789/', 'https://singularagency.github.io/Skill-Design-System/', 'file:///tmp/singular/']) {
    const h = harness({ origin });
    const site = origin.startsWith('file:') ? 'https://singular-design-system.vercel.app/' : origin;
    assert.equal(h.links[2].href, site + 'catalog.html');
    assert.equal(h.logos[0].src, origin + 'assets/logos/singular-full-light-bg.svg');
    assert.equal(h.panel.children.length, 7);
    assert.equal(h.panel.children[1].attrs['aria-current'], 'page');
    for (const link of h.panel.children) {
      const path = link.href.slice(site.length);
      assert.ok(existsSync(new URL('../' + path, import.meta.url)), path);
    }
  }
  const labels = [...source.matchAll(/>(Overview|Brand &amp; Voice|Surfaces|Tokens|Catalog|GitHub)[ <]/g)].map(m => m[1]);
  assert.deepEqual(labels, ['Overview', 'Brand &amp; Voice', 'Surfaces', 'Tokens', 'Catalog', 'GitHub']);
});

test('theme starts light, honors explicit preferences and stays usable without storage', () => {
  for (const options of [{}, { saved: 'invalid' }, { blocked: true }, { saved: 'dark', search: '?theme=light' }]) {
    const h = harness(options);
    assert.equal(h.dark(), false);
    assert.equal(h.theme.attrs['aria-pressed'], 'false');
    h.theme.click();
    assert.equal(h.dark(), true);
    assert.equal(h.theme.attrs['aria-label'], 'Switch to light mode');
    assert.equal(h.dispatched.at(-1), 'singular-ds-themechange');
  }
  assert.equal(harness({ saved: 'dark' }).dark(), true);
  assert.equal(harness({ search: '?theme=dark' }).dark(), true);
  const h = harness(); h.theme.click();
  assert.deepEqual(h.stored, [['singular-ds-theme', 'dark']]);
});

test('surface disclosure supports keyboard entry, logical Tab exit, Escape and outside focus', () => {
  const h = harness();
  let prevented = false;
  const key = (key, target, shiftKey = false) => ({ key, target, shiftKey, preventDefault() { prevented = true; } });
  h.trigger.keydown(key('ArrowDown'));
  assert.ok(prevented && !h.panel.hidden);
  assert.equal(h.focused(), h.panel.children[0]);
  h.panel.keydown(key('Tab', h.panel.children[0], true));
  assert.ok(h.panel.hidden);
  assert.equal(h.focused(), h.trigger);
  h.trigger.click(); h.trigger.keydown(key('Tab'));
  assert.equal(h.focused(), h.panel.children[0]);
  h.panel.keydown(key('Tab', h.panel.children.at(-1)));
  assert.ok(h.panel.hidden);
  assert.equal(h.focused(), h.links[3]);
  h.trigger.click(); h.documentEvent('keydown', key('Escape'));
  assert.ok(h.panel.hidden);
  assert.equal(h.focused(), h.trigger);
  h.trigger.click(); h.documentEvent('focusin', { target: h.links[0] });
  assert.ok(h.panel.hidden);
  assert.equal(h.trigger.attrs['aria-expanded'], 'false');
});

test('header reserves measured space, keeps demo controls below it and stays out of slide exports', () => {
  const h = harness();
  assert.equal(h.root.style['--showcase-clearance'], '120px');
  assert.equal(h.panel.style.top, '104px');
  assert.match(css, /position: fixed; z-index: 100/);
  assert.match(css, /body\[data-showcase-surface\] \{ padding-top: var\(--showcase-clearance/);
  assert.match(css, /\.demo-sidebar \{ top: calc\(var\(--showcase-clearance/);
  assert.match(css, /overflow-x: auto/);
  assert.match(css, /:focus-visible \{ outline: 2px/);
  assert.match(css, /@media print[\s\S]*display: none !important[\s\S]*padding-top: 0 !important/);
  assert.match(read('surfaces/web-app/demo.js'), /addEventListener\("singular-ds-themechange", syncDemoTheme\)/);
  assert.match(read('tokens/demo.html'), /addEventListener\('singular-ds-themechange', updateLabel\)/);
});

test('Studio desktop demo fills the available viewport with compact chrome and a flexible preview', () => {
  const html = read('surfaces/studio/demo.html');
  assert.match(html, /data-preview-viewport="desktop"/);
  assert.match(html, /Desktop · Fit to workspace · sandbox/);
  assert.match(html, /height: calc\(100dvh - var\(--showcase-clearance, 8rem\)\)/);
  assert.match(html, /grid-template-rows: auto minmax\(0, 1fr\) auto auto/);
  assert.match(html, /\.demo-studio \.studio-shell \{ width: 100%; height: 100%; min-height: 0/);
  assert.match(html, /\.demo-studio \.studio-preview \{ min-height: 0; overflow: auto/);
  assert.match(html, /\.demo-studio \.preview-card \{ width: 100%; min-height: 100%/);
  assert.doesNotMatch(read('surfaces/studio/studio.css'), /showcase-clearance/);
});

test('tokens demo has only the App navy profile, including legacy brand URLs', () => {
  const html = read('tokens/demo.html');
  assert.match(html, /href="\.\/brand-app.css/);
  assert.doesNotMatch(html, /brand-web.css|b-web|b-app|setBrand|Web · navy|_p.get\('brand'\)/);
  assert.match(html, /textContent = 'App · navy · ' \+ theme/);
  assert.match(html, /onclick="toggleTheme\(\)"/);
});
