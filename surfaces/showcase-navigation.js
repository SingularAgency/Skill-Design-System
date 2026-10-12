// Showcase host chrome, not a portable product-navigation API.
(() => {
  const script = document.currentScript;
  if (!script || document.querySelector('[data-showcase-header]')) return;
  const root = document.documentElement;
  const base = new URL('../', script.src);
  const published = new URL('https://singular-design-system.vercel.app/');
  const hosted = ['localhost', '127.0.0.1', 'singularagency.github.io', 'singular-design-system.vercel.app'].includes(location.hostname) || location.hostname.endsWith('.vercel.app');
  // Bundled/file previews keep links to website-only pages on the published site.
  const site = hosted ? base : published;
  const surface = document.body.dataset.showcaseSurface;
  const routes = [
    ['website-landing', 'Website', 'Narrative and editorial', 'surfaces/website-landing/demo.html'],
    ['web-app', 'Web app', 'Dense and operational', 'surfaces/web-app/demo.html'],
    ['studio', 'Studio', 'Agentic workspace', 'surfaces/studio/demo.html'],
    ['ios-app', 'iOS', 'Native product guide', 'surfaces/ios-app/guide.md'],
    ['slides', 'Slides', 'Presentation system', 'surfaces/slides-presentations/demo.html'],
    ['social-email', 'Social', 'Campaign formats', 'surfaces/social-email/demo.html'],
    ['email', 'Email', 'Compatible templates', 'surfaces/social-email/email.md'],
  ];
  const header = document.createElement('header');
  header.className = 'ds-showcase-header';
  header.setAttribute('data-showcase-header', '');
  header.innerHTML = `
    <a class="ds-showcase-brand" data-showcase-route="index.html?preview=20261012.6" aria-label="Singular Design System — home">
      <span class="ds-showcase-logo" aria-hidden="true"><img data-showcase-logo="light" alt="" width="128" height="28"><img data-showcase-logo="dark" alt="" width="128" height="28"></span>
      <span class="ds-showcase-division">Design System</span>
    </a>
    <nav class="ds-showcase-nav" aria-label="Primary navigation">
      <a data-showcase-route="index.html?preview=20261012.6">Overview</a>
      <a data-showcase-route="brand-voice.html">Brand &amp; Voice</a>
      <button class="ds-showcase-surfaces" type="button" aria-expanded="false" aria-controls="ds-showcase-surfaces">Surfaces <svg viewBox="0 0 24 24" aria-hidden="true"><path d="m7 10 5 5 5-5"/></svg></button>
      <a data-showcase-route="tokens/demo.html"${surface === 'tokens' ? ' aria-current="page"' : ''}>Tokens</a>
      <a data-showcase-route="catalog.html">Catalog</a>
      <a href="https://github.com/SingularAgency/Skill-Design-System" target="_blank" rel="noreferrer">GitHub <span aria-hidden="true">↗</span></a>
    </nav>
    <button class="ds-showcase-theme" type="button" aria-label="Switch to dark mode" aria-pressed="false">
      <svg class="ds-showcase-moon" viewBox="0 0 24 24" aria-hidden="true"><path d="M20.5 14.2A8.5 8.5 0 0 1 9.8 3.5 8.5 8.5 0 1 0 20.5 14.2Z"/></svg>
      <svg class="ds-showcase-sun" viewBox="0 0 24 24" aria-hidden="true"><circle cx="12" cy="12" r="4"/><path d="M12 2v2M12 20v2M2 12h2M20 12h2M5 5l1.4 1.4M17.6 17.6 19 19M5 19l1.4-1.4M17.6 6.4 19 5"/></svg>
    </button>`;
  header.querySelectorAll('[data-showcase-route]').forEach(link => { link.href = new URL(link.dataset.showcaseRoute, site).href; });
  header.querySelectorAll('[data-showcase-logo]').forEach(img => { img.src = new URL(`assets/logos/singular-full-${img.dataset.showcaseLogo}-bg.svg`, base).href; });
  const panel = document.createElement('nav');
  panel.id = 'ds-showcase-surfaces';
  panel.className = 'ds-showcase-dropdown';
  panel.setAttribute('aria-label', 'Surface previews');
  panel.hidden = true;
  routes.forEach(([id, label, description, route]) => {
    const link = document.createElement('a');
    link.href = new URL(route, site).href;
    link.innerHTML = `<strong>${label}</strong><small>${description}</small>`;
    if (id === surface) link.setAttribute('aria-current', 'page');
    panel.appendChild(link);
  });
  document.body.prepend(header);
  document.body.appendChild(panel);
  const trigger = header.querySelector('.ds-showcase-surfaces');
  if (routes.some(([id]) => id === surface)) trigger.classList.add('is-current');
  const layout = () => {
    const bounds = header.getBoundingClientRect();
    root.style.setProperty('--showcase-clearance', `${Math.ceil(bounds.height) + 40}px`);
    panel.style.top = `${Math.ceil(bounds.bottom) + 8}px`;
    panel.style.left = `${Math.max(16, Math.min(trigger.getBoundingClientRect().left, window.innerWidth - 288))}px`;
  };
  const close = (focus = false) => {
    panel.hidden = true;
    trigger.setAttribute('aria-expanded', 'false');
    if (focus) trigger.focus();
  };
  trigger.addEventListener('click', () => {
    panel.hidden = !panel.hidden;
    trigger.setAttribute('aria-expanded', String(!panel.hidden));
    layout();
  });
  trigger.addEventListener('keydown', event => {
    if (event.key === 'ArrowDown' || (event.key === 'Tab' && !event.shiftKey && !panel.hidden)) {
      event.preventDefault();
      panel.hidden = false;
      trigger.setAttribute('aria-expanded', 'true');
      layout();
      panel.querySelector('a').focus();
    }
  });
  panel.addEventListener('keydown', event => {
    const links = [...panel.querySelectorAll('a')];
    if (event.key !== 'Tab') return;
    if (event.shiftKey && event.target === links[0]) { event.preventDefault(); close(true); }
    else if (!event.shiftKey && event.target === links.at(-1)) {
      event.preventDefault(); close(); header.querySelector('[data-showcase-route="tokens/demo.html"]').focus();
    }
  });
  document.addEventListener('click', event => { if (!trigger.contains(event.target) && !panel.contains(event.target)) close(); });
  document.addEventListener('keydown', event => { if (event.key === 'Escape' && !panel.hidden) { event.preventDefault(); close(true); } });
  document.addEventListener('focusin', event => { if (!trigger.contains(event.target) && !panel.contains(event.target)) close(); });
  panel.querySelectorAll('a').forEach(link => link.addEventListener('click', () => close()));
  const theme = header.querySelector('.ds-showcase-theme');
  const sync = () => {
    const dark = root.classList.contains('dark');
    theme.setAttribute('aria-label', dark ? 'Switch to light mode' : 'Switch to dark mode');
    theme.setAttribute('aria-pressed', String(dark));
  };
  const notifyTheme = () => { sync(); window.dispatchEvent(new Event('singular-ds-themechange')); };
  const requestedTheme = new URLSearchParams(location.search).get('theme');
  let savedTheme;
  try { savedTheme = localStorage.getItem('singular-ds-theme'); } catch { /* Storage is optional. */ }
  const initialTheme = ['light', 'dark'].includes(requestedTheme) ? requestedTheme : savedTheme;
  root.classList.toggle('dark', initialTheme === 'dark');
  theme.addEventListener('click', () => {
    const dark = root.classList.toggle('dark');
    try { localStorage.setItem('singular-ds-theme', dark ? 'dark' : 'light'); } catch { /* Keep the control usable. */ }
    notifyTheme();
  });
  if (window.MutationObserver) new MutationObserver(sync).observe(root, {attributes:true, attributeFilter:['class']});
  if (window.ResizeObserver) new ResizeObserver(layout).observe(header);
  window.addEventListener('resize', layout);
  notifyTheme();
  layout();
})();
