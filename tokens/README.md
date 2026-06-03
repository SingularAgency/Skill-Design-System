# Tokens — el motor multi-marca

Un solo motor de tokens, dos perfiles de marca. El chrome se deriva de `--primary` con `color-mix()`: cambiar el profile re-tinta toda la UI.

## Archivos

| Archivo | Qué es | ¿Tailwind? |
|---|---|---|
| `core.css` | Tokens **universales**: spacing, radius scale, tipografía, status + remap a11y dark. No tiene color de marca. | No (vars puras) |
| `brand-app.css` | Profile **APP** (producto): primary azul `#4567ed`, surface navy-tinted, escalas, charts. Light + dark. | No (vars puras) |
| `brand-web.css` | Profile **WEB** (marketing): primary rojo `#d4513b`, surface negro dramático, escala roja. Dark-first. | No (vars puras) |
| `theme-mapping.css` | `@theme inline` — expone las vars como utilidades Tailwind (`bg-primary`, `gap-m`…). Compartido. | Sí |
| `theme-app.css` / `theme-web.css` | **Entries de build** por superficie: `tailwindcss` + core + brand + mapping + utilities. | Sí |
| `core-utilities.css` | **Utility classes** universales (capa 2): `.surface-liquid`/glass, `.gap-*`/`.stack-*`, tipografía semántica (`.kpi-value`, `.text-*`, `.label-*`, `.eyebrow`), `.page-container`, `.scrollbar-subtle`. | No (clases planas) |
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
| **core** | spacing `--gap-*`, `--radius*`, tipografía, `--success/--warning/--info/--destructive` | Igual en todos los productos. `--info` es azul **semántico** (no se vuelve rojo en web). |
| **profile** | `--primary` + escalas + acentos, surface, `--interactive*`, `--ring`, `--radius-card`, charts, surface-gradient | Es lo que cambia entre marca web (rojo) y app (azul). |

## Verificar

```bash
open tokens/demo.html   # alterná App/Web y light/dark; mirá cómo se re-tinta todo
```

## Notas / pendientes
- ⚠️ **La escala roja** (`--singular-primary-*` en `brand-web.css`) fue **generada** desde `#d4513b`. Diseño debe validar los hex finales.
- **Light del perfil web**: el website es dark-first hoy; el bloque light queda como `TODO` en `brand-web.css`.
- **Tokens de dominio** (OKR, PERT, payments-grid) NO viven acá — son del perfil `web-app` (Fase 4), no de la marca.
- Las **utility classes** del sistema (`.surface-liquid`, `.page-*`, `.label-*`, etc.) se portan en el siguiente paso (capa 2 de core).
