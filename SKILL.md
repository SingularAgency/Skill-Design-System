---
name: singular-design-system
description: >-
  El design system de marca de Singular — uno solo, para todas las superficies.
  Usalo para diseñar o construir CUALQUIER cosa con identidad Singular: web apps
  y dashboards (producto), websites y landings (marketing), presentaciones y slides
  (Gamma/PPTX), piezas de social (Meta/IG/LinkedIn) y emails. Provee el motor de
  tokens multi-marca (azul/cyan, una sola marca), el fondo de marca
  (BrandBackground), los componentes core y las guías por superficie. Reemplaza y
  consolida las skills previas: s-skill-v1, singular-design-app-v2, singular-design-system
  (.sds-*) y s-mail-v1. Triggers: "diseñá/armá/construí una [página/landing/dashboard/
  componente/slide/deck/email/pieza] de Singular", "estilo Singular", "marca Singular",
  "design system de Singular", o cualquier UI/pieza para un producto de Singular.
---

# Singular Design System

Un solo sistema de marca para todas las superficies de Singular. **Dark-first.**

## 1. Elegí tu superficie
Cada superficie tiene su guía con setup, anatomía y reglas:

| Vas a construir… | Perfil | Guía |
|---|---|---|
| Dashboard / app interna / producto | **web-app** (azul) | `surfaces/web-app/guide.md` |
| Website / landing / marketing | **website-landing** (cyan) | `surfaces/website-landing/guide.md` |
| Presentación / deck / slides | **slides** | `surfaces/slides-presentations/guide.md` |
| Email | **email** | `surfaces/social-email/email.md` |
| Pieza de social | **social** | `surfaces/social-email/social.md` |

> Preview vivo de todo: abrí `tokens/demo.html` (core), y `surfaces/<superficie>/demo.html`.
> Todos comparten `surfaces/preview-shell.css`: canvas dark-first con grilla y estrellas estáticas; cada surface conserva la ergonomía de su formato.

## Repo y demos en vivo
- **Repo (código fuente):** https://github.com/SingularAgency/Skill-Design-System
- **Portada / docs:** https://singularagency.github.io/Skill-Design-System/
- **Demos (GitHub Pages):** core `…/tokens/demo.html` · fondo `…/backgrounds/demo.html` · web-app `…/surfaces/web-app/demo.html` · website `…/surfaces/website-landing/demo.html` · slides `…/surfaces/slides-presentations/demo.html` · social+email `…/surfaces/social-email/demo.html`
- **Assets de marca:** en este repo, `assets/` (logos + símbolos) — https://github.com/SingularAgency/Skill-Design-System/tree/main/assets
- Para el detalle de cualquier superficie, leé su `guide.md` (incluida en esta skill y en el repo).

## 2. Marca: un solo primary azul/cyan
**Primary `#4567ed` (azul) + gradiente de marca azul→cyan + acentos cyan** — el mismo para todas las superficies. Los perfiles (`brand-app` / `brand-web`) solo difieren en la **surface**: app sobre navy (light/dark), web sobre negro dramático (dark). El chrome se deriva de `--primary` con `color-mix()`. Status (`success/warning/info/destructive`) es semántico y **no** es de marca.

## 3. Setup (web, Tailwind v4)
```css
/* producto */         @import "@singular/ds/tokens/theme-app.css";
/* marketing */        @import "@singular/ds/tokens/theme-web.css";
@import "@singular/ds/backgrounds/brand-background.css";
```
- Tokens y modelo: `tokens/README.md` (core + brand-app/brand-web + utilities).
- Fondo de marca: `backgrounds/README.md` (`<BrandBackground>` · variantes animated/static/flat; `<InteractiveHeroBackground>` para el hero mouse-follow del home).
- Componentes: `components/README.md` (core vs producto vs marketing; incluye tabs accesibles y hero interactivo portable).
- Logo: `<Logo>` (`components/Logo.tsx`) — recoloreable `currentColor`; assets de marca en `assets/` (ver `assets/README.md`).

## 4. Reglas transversales
- **Tokens, no hex.** `bg-primary`, `text-foreground`, `--gradient-primary` — nunca `#xxxxxx` inline.
- **Spacing nombrado** (`gap-s/m/l/xl`), **radius por perfil** (`--radius-card`: xl app / 2xl web).
- **Tipografía**: Poppins (UI/display) · Inter (cuerpo web) · JetBrains Mono (números/datos, `tabular-nums`).
- **Tipografía semántica** (`.kpi-value`, `.eyebrow`, `.text-*`, `.label-*`) en vez de `text-lg font-semibold` sueltos.
- **Accesibilidad**: contraste AA; `focus-visible:ring`; `aria-hidden` en decorativos; `prefers-reduced-motion` respetado en fondo/animaciones; touch targets ≥44px.
- **Performance portable**: usar `LazyVisible` para charts, media y carruseles below-the-fold; dar dimensiones estables a imágenes y usar `loading="lazy"`/`decoding="async"` cuando corresponda.
- **Patrones multi-surface**: `MetricStrip`, `ComparisonTable` y `SourceTag` viven en `components/` porque sirven para web, app, slides y social; no se deben acoplar a una ruta o a datos de un producto.
- **Voz**: liderar con el resultado del usuario; cuantificar; una idea por bloque.

## 5. Anti-patterns
- ❌ Hex de marca inline → usar tokens / `--singular-*`.
- ❌ Pills/badges/filtros hechos a mano → componentes del DS.
- ❌ `<img src="logo">` por tema → `<Logo />` (`currentColor`).
- ❌ Fondos animados sin `prefers-reduced-motion`, o animar estrellas por `background-position`.
- ❌ Montar todos los charts, videos y carruseles en el primer render si están fuera del viewport.
- ❌ Usar texto en gradiente sin fallback para `forced-colors` o `prefers-contrast: more`.
- ❌ Hacer que el CTA principal herede `--primary` / `--gradient-primary`: debe mantener los tokens `--button-*` azul/cyan aunque el acento de página varíe.
- ❌ Mezclar el sistema `.sds-*` (deprecado) con este.

## 6. Mantenimiento
El perfil **web-app** espeja `v0-singular-stories-app` y entrega su sistema de navegación + componentes como código portable (`surfaces/web-app/navigation.tsx`, `components.tsx`, `patterns.ts`, `web-app.css`) — router-agnóstico (`linkComponent` inyectable), sin secretos. El **website-landing** espeja la implementación actual de `singular-landing` (`tokens/brand-web.css`, `surfaces/website-landing/primitives.tsx`, `InteractiveHeroBackground.tsx`, `website.css`) y promueve solo patrones reutilizables: hero recipes, backdrop mouse-follow activado por interacción, section rhythm, marketing cards, tabs accesibles, CTA visuales azul/cyan, accent tokens y motion rules. No porta booking providers, rutas ni contenido del sitio. Cuando esos productos evolucionen el sistema, re-auditar y actualizar acá (ver `PLAN.md` §Fase 8). Fuente única — no forkear tokens por producto.

La auditoría de `singular-landing` también promovió al core los patrones neutrales
documentados en `references/singular-landing-portable-patterns.md`: prueba/KPI,
comparaciones, tags de fuente, carga diferida, atmósfera de sección y reglas de
contraste/motion. Son contratos de composición, no una nueva marca ni una copia del home.
