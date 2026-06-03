# Assets

El DS **no aloja** los assets de marca: los consume del repo público **[`singular-skill-assets`](https://github.com/SingularAgency/singular-skill-assets)** (logos, símbolos, marcas). Así un solo set de assets sirve a todas las superficies y skills, sin duplicar.

## Consumo
- **Web (React):** `import { Logo } from "@singular/ds/components/Logo"` — SVG inline, `currentColor`, theme-aware (no necesita asset por tema). Recolorear con `style={{ color: "var(--primary)" }}`.
- **No-web (slides / email / social):** referenciar por URL desde `singular-skill-assets` (raw o GitHub Pages).

## Por qué repo aparte
- Versionado independiente de los binarios/SVG de marca.
- Referenciable por URL desde superficies que no pueden inline (email, slides en Gamma, social).
- Evita la deuda actual (un PNG de logo por tema embebido en cada app).

> Estado: `singular-skill-assets` tiene **placeholders**. Al publicar (Fase 8) se reemplazan por los oficiales y se sirve por Pages/CDN.
