# Perfil: Website / Landing

La superficie de **marketing público** de Singular. Marca **azul/cyan** (`brand-web`), dark dramático, fondo de marca animado, secciones largas narrativas.

> Stack objetivo: el website real (`FramerSingular`) es Vite + React + Tailwind v4. Los primitivos son router-agnósticos (no usan `next/*` ni `wouter`).

## Setup
```css
/* index.css del sitio */
@import "@singular/ds/tokens/theme-web.css";          /* core + brand cyan + utilities */
@import "@singular/ds/backgrounds/brand-background.css";
@import "@singular/ds/surfaces/website-landing/website.css";
```
```tsx
import { Section, SectionHeading, Eyebrow, CtaButton, Reveal, LogoMarquee } from "@singular/ds/surfaces/website-landing/primitives"
import { BrandBackground } from "@singular/ds/backgrounds/BrandBackground"
```

## Anatomía de una página
1. **Hero** — `<BrandBackground variant="animated">` + `<Eyebrow>` + H1 con palabra en `.text-gradient-brand` + subtítulo + `<CtaButton variant="accent">` + `<LogoMarquee>`.
2. **Secciones** — `<Section pad="m" alt>` con `<SectionHeading eyebrow title subtitle>` + grid de `.marketing-card`.
3. **Pricing** — cards con `.kpi-value` para el precio + `<CtaButton>`.
4. **Prefooter CTA** — sección centrada con `.section-pad-prefooter`.

## Reglas del perfil
- **Ritmo de sección**: `.section-pad-s/-m/-l/-prefooter` (no `py-16` sueltos).
- **Eyebrow**: `<Eyebrow>` (`.eyebrow.eyebrow--brand`) — el patrón de marca, no `text-[10px] uppercase` a mano (estaba 332× en el sitio).
- **Acentos tokenizados**: nada de `text-blue-400` / gradientes hardcodeados → `--primary`, `.text-gradient-brand`, `--gradient-primary`.
- **CTA**: `primary` (blanco), `accent` (gradiente de marca), `secondary` (outline). Soporta scroll-to-anchor (`#id`) y links.
- **Motion**: `<Reveal>` para entradas on-scroll; todo respeta `prefers-reduced-motion`.

## Anti-patterns (limpiar al migrar el sitio — Fase 7)
- ❌ `py-m-sm` / `section-padding` (clases fantasma del sitio, no existen).
- ❌ `FadeIn` redefinido por página → usar `<Reveal>`.
- ❌ hex de acento inline a mano → tokens / `--singular-*`.
- ❌ `bg-white/5 border-white/10` repetido → `.marketing-card`.

## Preview
`demo.html` — landing de ejemplo armada 100% con el DS. `open surfaces/website-landing/demo.html`.
