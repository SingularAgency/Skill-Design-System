---
name: singular-design-system
description: >-
  El design system de marca de Singular — uno solo, para todas las superficies.
  Usalo para diseñar, construir, auditar o refactorizar cualquier experiencia
  Singular: websites, web apps, Singular Stories, Singularity Studio, SwiftUI/iOS,
  slides, social y email. Incluye tokens, componentes, BrandBackground, assets,
  contratos para IA, governance, auditoría de drift y export de snapshots. Triggers:
  "estilo Singular", "marca Singular", "design system de Singular", "aplicá el DS",
  "auditá/refactorizá esta UI", o cualquier UI/asset de un producto Singular.
---

# Singular Design System

Usar un sistema de identidad azul/cyan con perfiles de interacción por
plataforma. Mantener la lógica de negocio en cada producto.

## Flujo obligatorio

1. Leer `design-system.json`.
2. Elegir una superficie primaria.
3. Leer la guía de esa superficie.
4. Leer `tokens/README.md` para web o `surfaces/ios-app/guide.md` para SwiftUI.
5. Leer `components/README.md` antes de crear un componente.
6. Inspeccionar la implementación y documentación local del producto host.
7. Aplicar el checklist de `references/ai-agent-contract.md`.

## Router de superficies

| Trabajo | Perfil | Leer |
|---|---|---|
| Company website / landing | `website-landing` | `surfaces/website-landing/guide.md` |
| Stories web / dashboard / operaciones | `web-app` | `surfaces/web-app/guide.md` |
| Chat + agentes + preview + diff/sources | `studio` | `surfaces/studio/guide.md` |
| App nativa SwiftUI | `ios-app` | `surfaces/ios-app/guide.md` |
| Deck / presentación | `slides` | `surfaces/slides-presentations/guide.md` |
| Social asset | `social` | `surfaces/social-email/social.md` |
| Email | `email` | `surfaces/social-email/email.md` |

## Arquitectura

Separar siempre:

- foundation: marca, semántica, type roles, spacing, radius, motion y a11y;
- platform: CSS/Tailwind, SwiftUI, email o canvas;
- surface: website, app, Studio, iOS, slides, social o email;
- domain: Stories, approvals, agentes, rutas y contenido; vive en el host.

Leer `references/architecture.md` cuando una decisión pueda afectar a más de un
producto.

## Reglas no negociables

- Usar tokens, no hex de marca inline.
- Reutilizar variantes antes de crear componentes.
- Separar identidad (`--brand-primary`) de interacción (`--primary`).
- Usar status semántico; no comunicar estado sólo con color.
- Cubrir loading, empty, error, success, disabled y permisos cuando apliquen.
- Respetar contraste AA, foco, teclado, touch targets y reduced motion.
- Usar `<Logo />` o assets oficiales; no deformar ni recrear la marca.
- Mantener routing, providers, permisos, datos y copy de negocio fuera del DS.
- No mezclar `.sds-*` legacy con el sistema actual.

## Distribución y mantenimiento

- Exportar snapshots con `scripts/export-snapshot.mjs`.
- Auditar drift con `scripts/audit-products.mjs`.
- Seguir `references/adoption-and-governance.md`.
- Empaquetar la skill con `build-skill.sh`.

Repo: https://github.com/SingularAgency/Skill-Design-System
Previews: https://singularagency.github.io/Skill-Design-System/
