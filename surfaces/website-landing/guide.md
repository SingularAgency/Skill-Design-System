# Perfil: Website / Landing

La superficie de **marketing público** de Singular. Marca **azul/cyan** (`brand-web`), dark-first, fondos de marca por pagina, secciones narrativas, cards glass, big-pill tabs y CTAs premium.

> Fuente actual: `singular-landing`, rama `codex/home-gargantua-scroll-camera`. Los primitivos son router-agnósticos y no portan `BookingProvider`, rutas, navbar/footer ni datos del sitio.

## Setup
```css
/* index.css del sitio */
@import "@singular/ds/tokens/theme-web.css";          /* core + brand cyan + utilities */
@import "@singular/ds/backgrounds/brand-background.css";
@import "@singular/ds/surfaces/website-landing/website.css";
```
```tsx
import {
  PageShell,
  HeroSection,
  Section,
  SectionHeading,
  Eyebrow,
  CtaButton,
  MarketingCard,
  FinalCTA,
  Reveal,
  LogoMarquee,
} from "@singular/ds/surfaces/website-landing/primitives"
import { BrandBackground } from "@singular/ds/backgrounds/BrandBackground"
```

## Anatomía de una página
1. **Page shell** — `<PageShell>` como wrapper neutral; el host decide nav, footer, routing y booking.
2. **Hero** — `<HeroSection size="compact|standard|immersive" layout="center|split">` con palabra en `.text-gradient-brand`, CTAs como children y fondo `BrandBackground`.
3. **Secciones** — `<Section pad="s|m|l|prefooter" alt>` con `<SectionHeading>` y grids de `<MarketingCard>`.
4. **Tabs / disclosure** — `.singular-tabs-shell`, `.singular-tab-button`, `.singular-tab-panel` para contenido por capas.
5. **Prefooter CTA** — `<FinalCTA>` o `<Section pad="prefooter" className="singular-cta-section">`.

## Reglas del perfil
- **Ritmo de sección**: `.section-pad-s/-m/-l/-prefooter` (no `py-16` sueltos).
- **Eyebrow**: `<Eyebrow>` (`.eyebrow.eyebrow--brand`) — el patrón de marca, no `text-[10px] uppercase` a mano (estaba 332× en el sitio).
- **Acentos tokenizados**: base azul/cyan; variaciones por pagina con `data-page-accent="home|solutions|custom-ai|success|assessment|editorial"`.
- **CTA**: `primary` (blanco), `accent` (gradiente premium), `secondary` (glass outline). `CtaButton` soporta scroll-to-anchor (`#id`) y links.
- **Motion**: `<Reveal>` para entradas on-scroll; fondos con estrellas estaticas por performance; todo respeta `prefers-reduced-motion`.
- **Rojo/naranja**: usar solo como semantica o accent de auditoria (`data-page-accent="assessment"`), no como marca base.

## Anti-patterns (limpiar al migrar el sitio — Fase 7)
- ❌ `py-m-sm` / `section-padding` heredadas del sitio → usar `section-pad-*`.
- ❌ `FadeIn` redefinido por página → usar `<Reveal>`.
- ❌ hex de acento inline a mano → tokens / `--singular-*`.
- ❌ `bg-white/5 border-white/10` repetido → `.marketing-card`.
- ❌ portar `BookingProvider`, rutas, copy o datos del homepage al DS.

## Preview
`demo.html` — landing de ejemplo armada 100% con el DS. `open surfaces/website-landing/demo.html`.
