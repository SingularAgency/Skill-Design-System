---
name: singular-design-system
description: >-
  El design system de marca de Singular — uno solo, para todas las superficies.
  Usalo para diseñar, construir, auditar o refactorizar cualquier experiencia
  Singular: websites, web apps, Singular Stories, Singularity Studio, SwiftUI/iOS,
  slides, social y email. Incluye tokens, componentes, BrandBackground, assets,
  contexto de clientes, usuarios, JTBD, pain points, experience foundations,
  UX writing, voice & tone, contratos para IA, governance, auditoría de drift y
  export de snapshots. Triggers:
  "estilo Singular", "marca Singular", "design system de Singular", "aplicá el DS",
  "voice/tone de Singular", "UX writing", "copy de marketing/producto",
  "auditá/refactorizá esta UI", o cualquier UI/asset de un producto Singular.
---

# Singular Design System

Usar un sistema de identidad azul/cyan con perfiles de interacción por
plataforma. Mantener la lógica de negocio en cada producto.

## Flujo obligatorio

1. Leer `docs/README.md` y elegir el tramo de contexto necesario.
2. Leer `docs/05-experience-foundations.md` para identificar usuario, job,
   pain/risk, evidencia y foundation antes de
   proponer una decisión compartida.
3. Leer `docs/08-application-map.md` para enrutar intención y superficie.
4. Leer `design-system.json`.
5. Si la tarea incluye copy, elegir `ux-voice/marketing.md` o
   `ux-voice/product.md` según la intención.
6. Elegir una superficie primaria y leer su guía.
7. Leer `tokens/README.md` para web o `surfaces/ios-app/guide.md` para SwiftUI.
8. Leer `components/README.md` antes de crear un componente.
9. Inspeccionar la implementación y documentación local del producto host.
10. Aplicar el checklist de `references/ai-agent-contract.md`.
11. Para actividad agentic, leer `components/agent-activity-orb/README.md` y
    separar actividad visual de estado real.

Para una aplicación puramente mecánica de una regla existente no es necesario
reconstruir toda la estrategia, pero nunca inventar una rationale, un pain point
o evidencia de usuario.

## Router de contexto

| Pregunta | Leer |
|---|---|
| ¿Qué empresa sirve Singular, quién vive el problema, cómo colabora y qué personality/foundation gobierna la decisión? | `docs/05-experience-foundations.md` |
| ¿Cómo se escribe para adquisición o posicionamiento? | `ux-voice/marketing.md` |
| ¿Cómo se escribe un estado, acción, decisión o recovery? | `ux-voice/product.md` |
| ¿Cómo se enruta, documenta y valida? | `docs/08-application-map.md` |

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

## Router de escritura

| Trabajo que debe resolver el copy | Capítulo |
|---|---|
| Posicionamiento, adquisición, narrativa, prueba o conversión | `ux-voice/marketing.md` |
| Estado, acción, decisión, recuperación, permisos o confianza | `ux-voice/product.md` |

La intención manda sobre el canal. Un deck de revisión puede requerir Product;
un error en el website puede requerir Product. Antes de escribir, identificar
usuario, problema, decisión y evidencia disponible.

## Arquitectura

Separar siempre:

- foundation: marca, voice, tone, semántica, type roles, spacing, radius, motion
  y a11y;
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
- Usar `AgentActivityIndicator` sólo durante actividad en curso. `review`,
  `blocked`, `failed`, `published`, `live` y `merged` requieren status semántico
  y confirmación externa; nunca se infieren desde un orb.
- Cubrir loading, empty, error, success, disabled y permisos cuando apliquen.
- Respetar contraste AA, foco, teclado, touch targets y reduced motion.
- Usar `<Logo />` o assets oficiales; no deformar ni recrear la marca.
- Separar Marketing de Product: Marketing genera reconocimiento y confianza;
  Product explica estado, consecuencia y siguiente acción.
- No empezar por una solución, componente o tono sin identificar usuario, job,
  pain/risk y foundation.
- No presentar una inferencia de UI como research ni una convención visual como
  un hallazgo de cliente.
- No inventar claims, testimonios, permisos, evidencia, scope ni estados.
- Usar la terminología visible de la superficie: `Story` en web, `Task` en
  mobile; Singular Stories y Singular Agile son el mismo producto.
- Mantener routing, providers, permisos, datos y copy de negocio fuera del DS.
- No mezclar `.sds-*` legacy con el sistema actual.

## Distribución y mantenimiento

- Exportar snapshots con `scripts/export-snapshot.mjs`.
- Auditar drift con `scripts/audit-products.mjs`.
- Seguir `references/adoption-and-governance.md`.
- Empaquetar la skill con `build-skill.sh`.

Repo: https://github.com/SingularAgency/Skill-Design-System
Previews: https://singularagency.github.io/Skill-Design-System/
