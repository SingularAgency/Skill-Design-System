# Assets

Los assets son la capa de reconocimiento visual del sistema descrito en
[The Singular model](../docs/05-experience-foundations.md#from-foundation-to-system). Usarlos
de forma consistente refuerza una identidad; no reemplazan jerarquía, evidencia
ni claridad de producto.

Los assets de marca de Singular (logos, símbolos) **viven en este mismo repo**, dentro de `assets/`. Todo el Design System convive en un único repositorio: tokens, componentes, superficies y assets.

```
assets/
├── logos/      ← logos oficiales (full, icon, wordmark) en dark/light · svg + png · favicon
└── symbols/    ← símbolo recoloreable (mono + color)
```

## Consumo
- **Web (React):** `import { Logo } from "@singular/ds/components/Logo"` — SVG inline, `currentColor`, theme-aware (no necesita asset por tema). Recolorear con `style={{ color: "var(--primary)" }}`.
- **No-web (slides / email / social):** referenciar por ruta relativa dentro del repo (p. ej. `assets/logos/singular-full-dark-bg.svg`) o por URL raw / GitHub Pages de este repo.

## Variantes de logo (`assets/logos/`)
| Archivo | Uso |
|---|---|
| `singular-full-*` | Ícono + wordmark. Para headers, portadas, footers. |
| `singular-icon-*` | Solo el símbolo orbital. Para marcas chicas, favicons, badges. |
| `singular-wordmark-*` | Solo el texto. Cuando el símbolo ya está presente. |
| `*-dark-bg` / `*-light-bg` | Elegí según el fondo. |
| `singular-favicon-256.png` | Favicon. |

> El símbolo de `assets/symbols/` es la versión recoloreable (`currentColor`) que espeja `components/Logo.tsx`. Los `logos/` son los assets oficiales con la aberración cromática rojo/cyan de marca.
