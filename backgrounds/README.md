# Fondo de marca

El fondo de Singular —niebla + grilla + estrellas— unificado, **tokenizado y ligado a `--primary`**: se re-tinta solo con el brand profile (azul en app, azul/cyan en web). Reemplaza las implementaciones divergentes de producto y `singular-landing`.

## Archivos
| Archivo | Qué es |
|---|---|
| `brand-background.css` | Capas CSS (mist, grid, stars, aurora, cursor) + variantes + reduced-motion. Agnóstico de framework. |
| `BrandBackground.tsx` | Componente React (portable Next/Vite, sin framer-motion) que monta las capas y agrega el mouse-follow en `animated`. |

## Variantes
| Variante | Capas | Uso |
|---|---|---|
| `animated` | mist + grid + stars estaticas + **aurora** + **cursor-glow (mouse-follow)** | Heros del website que no necesiten la lente interactiva |
| `static` | mist + grid + stars | Canvas de app (dashboards), fondos de plataforma, slides |
| `flat` | solo color base | Detrás de tablas/contenido denso (legibilidad) |

Para el hero público del home y variantes equivalentes, usar `InteractiveHeroBackground` de `surfaces/website-landing/InteractiveHeroBackground`. Agrega la lente, horizonte y glow reactivos al cursor sobre la base estática.

## Uso

**React** (recomendado):
```tsx
import { BrandBackground } from "@singular/ds/backgrounds/BrandBackground"
// + importar una vez: brand-background.css y un brand profile

<BrandBackground variant="animated">
  <YourHero />
</BrandBackground>
```

**CSS-only** (sin React — slides, email previews, prototipos):
```html
<div class="brand-bg">           <!-- o brand-bg--flat -->
  <div class="brand-bg__stars" aria-hidden="true"></div>
  <div class="brand-bg__content">…</div>
</div>
```

## Tokens (ajustables por superficie)
| Token | Default | Qué controla |
|---|---|---|
| `--brand-bg-mist-1/-2/-3` | `--primary` / `--singular-secondary` / `--singular-cyan` | Hues del glow |
| `--brand-bg-mist-strength` | `0.20` | Intensidad del glow principal |
| `--brand-grid-size` | `60px` | Densidad de la grilla |
| `--brand-grid-color` | `rgb(255 255 255 / .028)` | Intensidad de las líneas |
| `--brand-stars-opacity` | `0.55` | Presencia de las estrellas |
| `--brand-cursor-size/-strength/-opacity` | `520px / 10% / .32` | Glow de cursor en la variante `animated` |

## Performance
Las estrellas son estaticas por defecto. No reintroducir animacion por `background-position`: en `singular-landing` esa deriva repintaba el layer completo y penalizaba Lighthouse/PSI sin aportar una diferencia visible. La variante `animated` y `InteractiveHeroBackground` no montan capas reactivas ni un RAF hasta el primer movimiento de puntero; el smoothing se detiene cuando el cursor deja de moverse.

## Accesibilidad
`prefers-reduced-motion: reduce` apaga aurora y cursor-glow (y el componente no engancha el listener de mouse). Las capas son `aria-hidden`.
