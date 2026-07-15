# Tokens — el motor multi-marca

Un solo motor de tokens, dos perfiles de marca. El chrome se deriva de `--primary` con `color-mix()`: cambiar el profile re-tinta toda la UI.

## Archivos

| Archivo | Qué es | ¿Tailwind? |
|---|---|---|
| `core.css` | Tokens **universales**: spacing, radius scale, tipografía, status + remap a11y dark. No tiene color de marca. | No (vars puras) |
| `brand-app.css` | Profile **APP** (producto): primary azul `#4567ed`, surface navy-tinted, escalas, charts. Light + dark. | No (vars puras) |
| `brand-web.css` | Profile **WEB** (marketing): primary azul/cyan, surface dark-first, card/button/motion tokens y `data-page-accent` desde `singular-landing`. | No (vars puras) |
| `theme-mapping.css` | `@theme inline` — expone las vars como utilidades Tailwind (`bg-primary`, `gap-m`…). Compartido. | Sí |
| `theme-app.css` / `theme-web.css` | **Entries de build** por superficie: `tailwindcss` + core + brand + mapping + utilities. | Sí |
| `core-utilities.css` | **Utility classes** universales (capa 2): `.surface-liquid`/glass, `.gap-*`/`.stack-*`, tipografía semántica (`.kpi-value`, `.text-*`, `.label-*`, `.eyebrow`), proof/data (`.metric-strip`, `.source-tag`, `.comparison-table`), performance/layout (`.lazy-visible`, `.section-atmosphere`, `.text-gradient-safe`), `.page-container`, `.scrollbar-subtle`. | No (clases planas) |
| `demo.html` | **Preview vivo del DS** (sin build): alterna profile/tema y muestra tokens + todos los componentes core. | — |

## Uso

**En una app/website (con Tailwind v4):** importá el entry de tu superficie.
```css
/* app interna (Stories, dashboards) */
@import '@singular/ds/tokens/theme-app.css';
/* website / landing */
@import '@singular/ds/tokens/theme-web.css';
```

**Switch en runtime (multi-tenant / preview):** cargá `core.css` + el `brand-*.css` que toque, o togglealo por `href`. El tema claro/oscuro se controla con la clase `.dark` en `<html>` (compatible con `next-themes`).

## Core vs Profile

| Capa | Define | Por qué |
|---|---|---|
| **core** | spacing `--gap-*`, `--radius*`, tipografía, `--success/--warning/--info/--destructive` | Igual en todos los productos. `--info` es azul **semántico** (no toma el color de marca). |
| **profile** | `--primary` + escalas + acentos, surface, `--interactive*`, `--ring`, `--radius-card`, charts, surface-gradient | Es lo que cambia entre marca web (cyan) y app (azul). |

### CTA primario web
En website/landing, `--button-primary`, `--button-gradient-primary`, `--button-gradient-primary-hover` y `--button-shadow-primary` son azul/cyan deliberadamente. No deben derivar de `--primary` ni de `--gradient-primary`: esos tokens sí cambian con `data-page-accent`, mientras que el CTA principal mantiene la firma azul/cyan de Singular.

## Verificar

```bash
open tokens/demo.html   # alterná App/Web y light/dark; mirá cómo se re-tinta todo
```

## Notas / pendientes
- `brand-web.css` incluye accents de pagina (`home`, `solutions`, `custom-ai`, `success`, `assessment`, `editorial`) para retintar marketing sin crear otra marca.
- **Light del perfil web**: el website es dark-first hoy; el bloque light queda como `TODO` en `brand-web.css`.
- **Tokens de dominio** (OKR, PERT, payments-grid) NO viven acá — son del perfil `web-app` (Fase 4), no de la marca.
- Las **utility classes** del sistema (`.surface-liquid`, `.page-*`, `.label-*`, proof/data y performance) son capa 2 de core; los componentes React correspondientes viven en `components/`.
