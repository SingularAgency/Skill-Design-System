# Singular Design System

Sistema de producto y marca de Singular para humanos e IA. Cubre website,
Singular Stories web, Singular Stories iOS, Singularity Studio, slides, social
y email mediante tokens, componentes, assets, guías, UX writing, contratos y
herramientas de governance.

## Empezar por el contexto

Este repositorio no empieza en los tokens. Empieza en la empresa que Singular
sirve, las personas dentro de ella y el problema operativo que necesitan
resolver.

La entrada canónica es
[`docs/README.md`](./docs/README.md). La historia conecta:

```text
cliente y problema
→ cómo colabora Singular
→ foundations + personalidad
→ Marketing o Product
→ superficies, estados, componentes y copy
```

| Para entender… | Leer |
|---|---|
| Qué empresa atendemos, quién vive el problema, cómo colabora Singular y por qué el sistema toma estas decisiones | [Singular foundations](./docs/05-experience-foundations.md) |
| Cómo escribir para adquisición, posicionamiento o conversión | [Marketing voice & tone](./ux-voice/marketing.md) |
| Cómo escribir estados, acciones, decisiones o recuperación | [Product voice & tone](./ux-voice/product.md) |
| Cómo enrutar, justificar y evolucionar una decisión | [Apply & evolve](./docs/08-application-map.md) |

Una persona nueva debería poder leer Start y Foundations y comprender el
sistema sin conocer previamente los repositorios ni la terminología de
producto. Hay una personalidad compartida y sólo dos manuales: Marketing y
Product.

## Principios

- Una identidad azul/cyan: anchor `#4567ed`, action blue `#0b84ff`, cyan `#22d3ee`.
- Foundation + platform + surface + domain.
- Tokens y variantes antes que valores o componentes locales.
- Comportamiento nativo por plataforma; SwiftUI no imita CSS.
- El DS comparte contratos visuales y de escritura. Rutas, datos, permisos y
  copy de dominio viven en cada producto.

## Estructura

```
SKILL.md                  ← router conciso para agentes
design-system.json        ← manifiesto machine-readable
docs/                     ← historia: cliente → foundations → aplicación
brand/                    ← ruta histórica hacia Foundations
ux-voice/                 ← manual canónico de UX writing, voice & tone
tokens/                   ← foundation web + perfiles app/web
backgrounds/              ← BrandBackground unificado
surfaces/
  web-app/                ← Stories web / producto
  website-landing/        ← company website / marketing
  studio/                 ← chat + agentes + preview + evidencia
  ios-app/                ← SwiftUI foundation + primitives
  slides-presentations/   ← decks
  social-email/           ← social + email
components/               ← inventario y componentes portables, incluido AgentActivityOrb
references/               ← arquitectura, auditoría, IA y governance
scripts/                  ← audit y export de snapshots
colors_and_type.css       ← foundation autocontenida (fuentes + paleta + type) para artefactos sueltos
preview/                  ← galería de cards de specs del DS (colores, type, spacing, componentes)
ui_kits/
  web-app/                ← UI kit interactivo "Singular Stories" (React UMD, click-thru)
assets/                   ← logos + símbolos de marca (en este repo)
```

## Elegir superficie

| Producto/asset | Guía |
|---|---|
| singular-landing | [`surfaces/website-landing/guide.md`](./surfaces/website-landing/guide.md) |
| v0-singular-stories-app | [`surfaces/web-app/guide.md`](./surfaces/web-app/guide.md) |
| singularity-2026 | [`surfaces/studio/guide.md`](./surfaces/studio/guide.md) |
| ss-ios-prototype | [`surfaces/ios-app/guide.md`](./surfaces/ios-app/guide.md) |
| Slides | [`surfaces/slides-presentations/guide.md`](./surfaces/slides-presentations/guide.md) |
| Social / email | [`social.md`](./surfaces/social-email/social.md) · [`email.md`](./surfaces/social-email/email.md) |

## Elegir voz

Primero identificar usuario, problema y decisión mediante la
[historia documental](./docs/README.md). Los manuales operativos viven en
[`ux-voice/`](./ux-voice/README.md), y la experiencia navegable se
publica en [Brand & Voice](https://singularagency.github.io/Skill-Design-System/brand-voice.html).
Usá:

| Intención | Capítulo |
|---|---|
| Posicionamiento, adquisición, narrativa o conversión | [Marketing voice & tone](./ux-voice/marketing.md) |
| Estado, acción, decisión, recuperación, permisos o confianza | [Product voice & tone](./ux-voice/product.md) |

La superficie no decide por sí sola: elegí el capítulo según el trabajo que
debe resolver la comunicación.

## Preview del DS — en vivo

Publicado en **GitHub Pages** (no hace falta clonar):

| Preview | URL |
|---|---|
| **Brand & Voice** (cliente → foundations → aplicación) | https://singularagency.github.io/Skill-Design-System/brand-voice.html |
| **Core** (tokens + todos los componentes) | https://singularagency.github.io/Skill-Design-System/tokens/demo.html |
| Fondo de marca (`BrandBackground`) | https://singularagency.github.io/Skill-Design-System/backgrounds/demo.html |
| Web-app / producto (azul) | https://singularagency.github.io/Skill-Design-System/surfaces/web-app/demo.html |
| Website / landing (cyan) | https://singularagency.github.io/Skill-Design-System/surfaces/website-landing/demo.html |
| Studio / AI workspace | https://singularagency.github.io/Skill-Design-System/surfaces/studio/demo.html |
| Slides / presentaciones | https://singularagency.github.io/Skill-Design-System/surfaces/slides-presentations/demo.html |
| Social + email | https://singularagency.github.io/Skill-Design-System/surfaces/social-email/demo.html |
| **UI kit interactivo** (Singular Stories) | https://singularagency.github.io/Skill-Design-System/ui_kits/web-app/index.html |
| **Catálogo de componentes** (incluye AgentActivityOrb) | https://singularagency.github.io/Skill-Design-System/catalog.html |

En el **core** alternás **App/Web × light/dark** y ves cómo se re-tinta todo. (Local: `open tokens/demo.html`.)

Todos los previews cargan `surfaces/preview-shell.css`: canvas dark-first, grilla y estrellas estáticas, chrome azul/cyan y elevación consistente. Cada demo conserva la ergonomía de su propia superficie en vez de convertirse en una landing genérica.

## Consumir desde otro repo

Mientras no exista un package registry, usar snapshots versionados:

```bash
node scripts/export-snapshot.mjs \
  --bundle=core,web-app,studio,governance \
  --target=/path/to/product/design-system/singular
```

El export escribe `.singular-ds-snapshot.json` con release, commit y bundles.
Ver [`references/adoption-and-governance.md`](./references/adoption-and-governance.md).
El estado verificado de los cuatro productos vive en
[`references/adoption-audit-2026-07-16.md`](./references/adoption-audit-2026-07-16.md).

## Usar como skill

```bash
./build-skill.sh /tmp/singular-design-system.skill
```

La skill enruta a la guía correcta y usa disclosure progresivo. El contrato para
Codex/Claude vive en
[`references/ai-agent-contract.md`](./references/ai-agent-contract.md). Para
trabajo estratégico, de contenido o experiencia, empieza por
[`docs/README.md`](./docs/README.md); para copy, también enruta al manual
correcto desde [`ux-voice/README.md`](./ux-voice/README.md).

## Auditar productos

```bash
node scripts/audit-products.mjs --workspace=/path/to/Projects
```

El reporte mide drift potencial (hex, radius, type y adopción de tokens). No
convierte todos los literales en errores: email, charts y puentes nativos pueden
tener excepciones documentadas. Para worktrees alternativos usá
`--product=nombre:/ruta/al/worktree`; ver
[`references/adoption-and-governance.md`](./references/adoption-and-governance.md).

## Fuentes de verdad

| Perfil | Repo / fuente |
|---|---|
| Contexto, usuarios, pains, modelo, personalidad y foundations | [`docs/05-experience-foundations.md`](./docs/05-experience-foundations.md) |
| Foundation y governance | Este repo |
| UX writing, voice y tone | [`ux-voice/marketing.md`](./ux-voice/marketing.md) + [`ux-voice/product.md`](./ux-voice/product.md) |
| Marketing | `singular-landing` como fuente de descubrimiento |
| Producto web | `v0-singular-stories-app` como fuente de descubrimiento |
| Native mobile | `ss-ios-prototype` como fuente de descubrimiento |
| AI Studio | `singularity-2026` como fuente de descubrimiento |

Los productos no reemplazan automáticamente el foundation. Los patrones se
promueven sólo cuando son portables y no contienen lógica de dominio.

## Agent activity

`components/agent-activity-orb/` entrega `AgentActivityOrb` y
`AgentActivityIndicator` para actividad de IA en web-app y Studio. Usa Canvas
2D, tokens azul/cyan, scheduler compartido, pausa offscreen y fallback para
reduced motion/forced colors.

La actividad visual no reemplaza status: `review`, `blocked`, `failed` y
`published` siguen usando componentes semánticos. Ver
[`components/agent-activity-orb/README.md`](./components/agent-activity-orb/README.md).

## Validación

```bash
python3 /path/to/skill-creator/scripts/quick_validate.py .
node scripts/export-snapshot.mjs --bundle=core,web-app,studio,governance --target=/tmp/singular-ds
node scripts/audit-products.mjs --workspace=/Users/you/Projects
./build-skill.sh /tmp/singular-design-system.skill
git diff --check
```

Arquitectura completa:
[`references/architecture.md`](./references/architecture.md). Auditoría base:
[`references/product-audit-2026-07.md`](./references/product-audit-2026-07.md).
Auditoría de adopción:
[`references/adoption-audit-2026-07-16.md`](./references/adoption-audit-2026-07-16.md).
