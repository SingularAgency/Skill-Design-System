# Singular Design System

Sistema de producto y marca de Singular para humanos e IA. Cubre website,
Singular Stories web, Singular Stories iOS, Singularity Studio, slides, social
y email mediante tokens, componentes, assets, guías, contratos y herramientas
de governance.

## Principios

- Una identidad azul/cyan: anchor `#4567ed`, action blue `#0b84ff`, cyan `#22d3ee`.
- Foundation + platform + surface + domain.
- Tokens y variantes antes que valores o componentes locales.
- Comportamiento nativo por plataforma; SwiftUI no imita CSS.
- El DS comparte contratos. Rutas, datos, permisos y copy viven en cada producto.

## Estructura

```
SKILL.md                  ← router conciso para agentes
design-system.json        ← manifiesto machine-readable
tokens/                   ← foundation web + perfiles app/web
backgrounds/              ← BrandBackground unificado
surfaces/
  web-app/                ← Stories web / producto
  website-landing/        ← company website / marketing
  studio/                 ← chat + agentes + preview + evidencia
  ios-app/                ← SwiftUI foundation + primitives
  slides-presentations/   ← decks
  social-email/           ← social + email
components/               ← inventario y componentes portables
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
| Social / email | [`surfaces/social-email/`](./surfaces/social-email/) |

## Preview del DS — en vivo

Publicado en **GitHub Pages** (no hace falta clonar):

| Preview | URL |
|---|---|
| **Core** (tokens + todos los componentes) | https://singularagency.github.io/Skill-Design-System/tokens/demo.html |
| Fondo de marca (`BrandBackground`) | https://singularagency.github.io/Skill-Design-System/backgrounds/demo.html |
| Web-app / producto (azul) | https://singularagency.github.io/Skill-Design-System/surfaces/web-app/demo.html |
| Website / landing (cyan) | https://singularagency.github.io/Skill-Design-System/surfaces/website-landing/demo.html |
| Studio / AI workspace | https://singularagency.github.io/Skill-Design-System/surfaces/studio/demo.html |
| Slides / presentaciones | https://singularagency.github.io/Skill-Design-System/surfaces/slides-presentations/demo.html |
| Social + email | https://singularagency.github.io/Skill-Design-System/surfaces/social-email/demo.html |
| **UI kit interactivo** (Singular Stories) | https://singularagency.github.io/Skill-Design-System/ui_kits/web-app/index.html |

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

## Usar como skill

```bash
./build-skill.sh /tmp/singular-design-system.skill
```

La skill enruta a la guía correcta y usa disclosure progresivo. El contrato para
Codex/Claude vive en
[`references/ai-agent-contract.md`](./references/ai-agent-contract.md).

## Auditar productos

```bash
node scripts/audit-products.mjs --workspace=/path/to/Projects
```

El reporte mide drift potencial (hex, radius, type y adopción de tokens). No
convierte todos los literales en errores: email, charts y puentes nativos pueden
tener excepciones documentadas.

## Fuentes de verdad

| Perfil | Repo / fuente |
|---|---|
| Foundation y governance | Este repo |
| Marketing | `singular-landing` como fuente de descubrimiento |
| Producto web | `v0-singular-stories-app` como fuente de descubrimiento |
| Native mobile | `ss-ios-prototype` como fuente de descubrimiento |
| AI Studio | `singularity-2026` como fuente de descubrimiento |

Los productos no reemplazan automáticamente el foundation. Los patrones se
promueven sólo cuando son portables y no contienen lógica de dominio.

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
