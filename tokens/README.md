# Tokens — identity + interaction profiles

Tokens are a downstream expression of the
[experience foundations](../docs/05-experience-foundations.md), not the
starting point of the Singular system. Read
[Singular foundations](../docs/05-experience-foundations.md#from-foundations-to-system) for why
identity, interaction, semantic status, platform, and surface roles remain
separate.

Un solo foundation azul/cyan con dos perfiles web. La identidad y la interacción
no se mezclan:

- `--brand-primary: #4567ed` y `--brand-cyan: #22d3ee` son anchors estables.
- `--primary` es la acción principal del perfil.
- website usa el anchor; app conserva `#0b84ff` como action blue en dark,
  con `--primary: #0067d6` en light para texto y fills contrastados.
- status sigue siendo semántico e independiente.

## Archivos

| Archivo | Qué es | ¿Tailwind? |
|---|---|---|
| `core.css` | Tokens **universales**: spacing, radius scale, tipografía, status, Agent Orb roles + remap a11y dark. Las tintas del orb referencian anchors del profile; no agregan una marca paralela. | No (vars puras) |
| `brand-app.css` | Profile **APP**: action blue con valores de interacción ajustados por contraste, identity anchor `#4567ed`, superficies navy-tinted. Light + dark. | No (vars puras) |
| `typography.css` | Escala primitiva + roles semánticos `--type-*`. Importada por core; el profile adapta roles y breakpoints. | No |
| `semantic-status.css` | Seis tonos independientes × cinco slots (`fg/bg/border/solid/on-solid`) + skeleton. Importada por core. | No |
| `brand-web.css` | Profile **WEB** (marketing): primary azul/cyan, surface dark-first, card/button/motion tokens y `data-page-accent` desde `singular-landing`. | No (vars puras) |
| `theme-mapping.css` | `@theme inline` — expone las vars como utilidades Tailwind (`bg-primary`, `gap-m`…). Compartido. | Sí |
| `theme-app.css` / `theme-web.css` | **Entries de build** por superficie: `tailwindcss` + core + brand + mapping + utilities. | Sí |
| `core-utilities.css` | **Utility classes** universales (capa 2): `.surface-liquid`/glass, `.gap-*`/`.stack-*`, tipografía semántica (`.kpi-value`, `.text-*`, `.label-*`, `.eyebrow`), proof/data (`.metric-strip`, `.source-tag`, `.comparison-table`), performance/layout (`.lazy-visible`, `.section-atmosphere`, `.text-gradient-safe`), `.page-container`, `.scrollbar-subtle`. | No (clases planas) |
| `demo.html` | **Preview vivo del DS** (sin build): alterna profile/tema y muestra tokens + todos los componentes core. | — |

## Uso

**En una app/website (con Tailwind v4):** importá el entry de tu superficie.
```css
/* app interna (Stories, dashboards) */
@import './singular/tokens/theme-app.css';
/* website / landing */
@import './singular/tokens/theme-web.css';
```

**Switch en runtime (multi-tenant / preview):** cargá `core.css` + el `brand-*.css` que toque, o togglealo por `href`. El tema claro/oscuro se controla con la clase `.dark` en `<html>` (compatible con `next-themes`).

Las rutas asumen un snapshot en `singular/` junto al entry CSS. No se publica
`@singular/ds` en npm. Ver [setup real](../references/consumption-and-compatibility.md).

### Promoción desde Stories — candidate 2026.10

Origen revisado: `SingularAgency/singular-stories-design`, main `6c55bea1`.
Se comparten nombres de roles y slots, no datos ni transiciones de negocio.
Se preservan los tokens legacy y el mapping default `in-progress → info`;
el host puede elegir otro tono explícito en StatusBadge sin cambiar el dominio.

Seis tonos: success, warning, urgent, danger, info y neutral; cinco slots por
tono. Urgent es naranja; danger es rojo. Las pruebas miden pares representativos
y fills con texto blanco. El CTA app usa un gradiente más oscuro, sin overlay
blanco glossy que reduce contraste. No es una copia literal de cada hex de
Stories ni una certificación WCAG global: los consumidores deben medir los
pares efectivos, incluyendo alpha y hover.

En dark, un fill `--primary: #0b84ff` usa foreground oscuro `#05060d`;
blanco sobre ese azul brillante no alcanza 4.5:1. El fill dedicado del CTA es
más oscuro y conserva texto blanco. No intercambiar esos foregrounds.

Los aliases Tailwind `--spacing-s/m/l` se agregan sin pisar los nombres nativos
xs/xl. No se mueve ningún archivo ni se elimina un token existente.

## Core vs Profile

| Capa | Define | Por qué |
|---|---|---|
| **core** | spacing `--gap-*`, `--radius*`, tipografía, `--success/--warning/--info/--destructive` | Igual en todos los productos. `--info` es azul **semántico** (no toma el color de marca). |
| **profile** | identity anchors + `--primary` + escalas + acentos, surface, `--interactive*`, `--ring`, `--radius-card`, charts | Adapta interacción y densidad sin crear otra marca. |

### CTA primario web
En website/landing, `--button-primary`, `--button-gradient-primary`, `--button-gradient-primary-hover` y `--button-shadow-primary` son azul/cyan deliberadamente. No deben derivar de `--primary` ni de `--gradient-primary`: esos tokens sí cambian con `data-page-accent`, mientras que el CTA principal mantiene la firma azul/cyan de Singular.

## Verificar

```bash
open tokens/demo.html   # alterná App/Web y light/dark; mirá cómo se re-tinta todo
```

## Notas / pendientes
- `brand-web.css` incluye accents de pagina (`home`, `solutions`, `custom-ai`, `success`, `assessment`, `editorial`) para retintar marketing sin crear otra marca.
- **Light del perfil web**: el website es dark-first hoy; el bloque light queda como `TODO` en `brand-web.css`.
- **Agent activity**: `--agent-orb-{near,mid,far,ghost,glow}` deriva de
  `--brand-primary`, `--brand-cyan` y `--primary`; no usar status colors para
  animaciones de trabajo en curso.
- **Tokens de dominio** (OKR, PERT, payments-grid) NO viven acá — son del perfil `web-app` (Fase 4), no de la marca.
- Las **utility classes** del sistema (`.surface-liquid`, `.page-*`, `.label-*`, proof/data y performance) son capa 2 de core; los componentes React correspondientes viven en `components/`.
