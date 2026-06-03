# Singular Design System

El **design system universal de marca Singular**: un solo sistema, usable por cualquier persona del equipo, para cualquier superficie — website, landing, web-app, slides, social, email. Se entrega como **skill de Claude + tokens + assets versionados**.

> **Estado:** en construcción. Ver [`PLAN.md`](./PLAN.md) para el plan maestro y las fases.

## Principios

- **Primary dual por superficie** — 🔴 rojo `#d4513b` (marca pública / marketing) · 🔵 azul `#4567ed` (producto / app). Es un *brand profile*, no una contradicción.
- **Núcleo + perfiles** — un core de marca (tokens, voz, a11y, motion) + sub-perfiles por superficie.
- **Motor multi-marca** — el chrome se deriva de `--primary` vía `color-mix()`; cambiar el profile re-tinta todo.

## Estructura

```
SKILL.md                  ← skill madre (router + core)            [Fase 2+]
tokens/                   ← fuente única de tokens (core + brand-web + brand-app)  [Fase 2]
backgrounds/              ← <BrandBackground> unificado            [Fase 3]
surfaces/
  web-app/                ← perfil app (incrusta app-v2)           [Fase 4]
  website-landing/        ← perfil marketing (primitivos custom-ai)[Fase 5]
  slides-presentations/   ← specs de marca para Gamma              [Fase 6]
  social-email/           ← email (s-mail-v1) + social (Meta)      [Fase 6]
components/               ← inventario core + por-perfil
references/               ← audit-checklist, decision-tree, patterns
assets/                   ← → repo singular-skill-assets           [Fase 9]
legacy/                   ← FUENTES recuperados (input, no se publican)
```

## Preview del DS

`tokens/demo.html` es el **preview vivo** del sistema: abrilo en el browser y alterná **App/Web × light/dark** para ver tokens y todos los componentes core (buttons, inputs, search, dropdown, cards, badges, pills, tabs, tabla, KPI, sidebar, empty state…). Carga el DS completo (`core` + brand profile + utilities), sin build.

```bash
open tokens/demo.html
```

Además, **cada superficie** tendrá su propio preview (`surfaces/<superficie>/demo.html` — web-app, website-landing, slides-presentations, social-email), construido al desarrollar cada perfil (Fases 4–6).

Al armar el repo final (Fase 8) se publican por **GitHub Pages** el preview core + los 4 demos de superficie, para que cualquiera del equipo previsualice el DS completo sin clonar.

## Fuentes de verdad

| Perfil | Repo / fuente |
|---|---|
| **web-app** (azul) | [`v0-singular-stories-app`](https://github.com/SingularAgency/v0-singular-stories-app) — `app/globals.css` es la verdad de tokens del perfil app |
| **website-landing** (rojo) | `FramerSingular` — `client/src/index.css` + primitivos de `client/src/pages/custom-ai.tsx` |
| skills legacy | `legacy/` (recuperadas de bundles `.skill` + copias runtime de Cowork) |

## Decisiones

Registradas en [`PLAN.md`](./PLAN.md) §1. Resumen: dual rojo/azul, núcleo+perfiles, 4 superficies en v1, `.sds-*` deprecado (se rescata su andamiaje en `references/`), assets al final.
