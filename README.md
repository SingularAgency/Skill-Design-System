# Singular Design System

El **design system universal de marca Singular**: un solo sistema, usable por cualquier persona del equipo, para cualquier superficie — website, landing, web-app, slides, social, email. Se entrega como **skill de Claude + tokens + assets versionados**.

> **Estado:** en construcción. Ver [`PLAN.md`](./PLAN.md) para el plan maestro y las fases.

## Principios

- **Un solo primary** — 🔵 azul `#4567ed` + gradiente **azul→cyan** + acentos cyan, para todas las superficies. Los perfiles solo difieren en la *surface* (app navy · web negro).
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
colors_and_type.css       ← foundation autocontenida (fuentes + paleta + type) para artefactos sueltos
preview/                  ← galería de cards de specs del DS (colores, type, spacing, componentes)
ui_kits/
  web-app/                ← UI kit interactivo "Singular Stories" (React UMD, click-thru)
references/               ← audit-checklist, decision-tree, patterns
assets/                   ← logos + símbolos de marca (en este repo)
legacy/                   ← FUENTES recuperados (input, no se publican)
```

## Preview del DS — en vivo

Publicado en **GitHub Pages** (no hace falta clonar):

| Preview | URL |
|---|---|
| **Core** (tokens + todos los componentes) | https://singularagency.github.io/Skill-Design-System/tokens/demo.html |
| Fondo de marca (`BrandBackground`) | https://singularagency.github.io/Skill-Design-System/backgrounds/demo.html |
| Web-app / producto (azul) | https://singularagency.github.io/Skill-Design-System/surfaces/web-app/demo.html |
| Website / landing (cyan) | https://singularagency.github.io/Skill-Design-System/surfaces/website-landing/demo.html |
| Slides / presentaciones | https://singularagency.github.io/Skill-Design-System/surfaces/slides-presentations/demo.html |
| Social + email | https://singularagency.github.io/Skill-Design-System/surfaces/social-email/demo.html |
| **UI kit interactivo** (Singular Stories) | https://singularagency.github.io/Skill-Design-System/ui_kits/web-app/index.html |

En el **core** alternás **App/Web × light/dark** y ves cómo se re-tinta todo. (Local: `open tokens/demo.html`.)

## Fuentes de verdad

| Perfil | Repo / fuente |
|---|---|
| **web-app** (azul) | [`v0-singular-stories-app`](https://github.com/SingularAgency/v0-singular-stories-app) — `app/globals.css` es la verdad de tokens del perfil app |
| **website-landing** (cyan) | `FramerSingular` — `client/src/index.css` + primitivos de `client/src/pages/custom-ai.tsx` |
| skills legacy | `legacy/` (recuperadas de bundles `.skill` + copias runtime de Cowork) |

## Decisiones

Registradas en [`PLAN.md`](./PLAN.md) §1. Resumen: azul/cyan unificado, núcleo+perfiles, 4 superficies en v1, `.sds-*` deprecado (se rescata su andamiaje en `references/`), assets al final.
