# Perfil: Social

Piezas sociales de Singular (Meta/IG/LinkedIn). Marca corporativa (cyan) sobre fondo dark de marca. Complementa al plugin `singular-meta-ads` (que genera con gpt-image-2) dándole **specs de marca** que hoy no existían.

> Formato imagen (no HTML). El `demo.html` muestra plantillas a escala; la producción se exporta a PNG/JPG en los tamaños de abajo.

## UX writing

Elegir audience, pain y buying stage desde
[Users, jobs, and pain points](../../docs/02-users-jobs-and-pain-points.md) antes
de reducir la historia a una sola idea visual.
Leer [Marketing voice and tone](../../ux-voice/README.md#6-marketing-voice-and-tone)
antes de escribir claims, proof o CTAs. Mantener una idea reconocible por pieza
y verificar todo claim cuantitativo según
[Claims and evidence](../../ux-voice/README.md#9-claims-and-evidence).

## Formatos
| Uso | Tamaño | Safe zone |
|---|---|---|
| Post cuadrado | 1080×1080 | margen 64px |
| Portrait / feed recomendado | 1080×1350 (4:5) | margen 64px |
| Story / Reel | 1080×1920 (9:16) | top 14% · bottom 35% · sides 6% |

## Anatomía
1. **Fondo de marca** — dark `#050505` + mist cyan (grid opcional, sin stars en estático pequeño).
2. **Logo** — esquina superior (o centrado en story). Versión clara.
3. **Claim** — 4–9 palabras, Poppins bold, una palabra en `--gradient-primary`.
4. **Apoyo** — 1 línea Inter, `rgba(255,255,255,.7)`.
5. **CTA/handle** — pill o `@singular.ai` abajo.

## Valores de marca
| Rol | Valor |
|---|---|
| Fondo | `#050505` + glow `--primary` |
| Título | `#ffffff`, acento `--gradient-primary` (azul→cyan) |
| Apoyo | `rgba(255,255,255,.7)` |
| Tipografía | Poppins (claim) · Inter (apoyo) · JetBrains Mono (datos) |

## Reglas
- Texto **grande y escaso** (legible en miniatura del feed).
- Feed por defecto en **4:5 portrait (1080×1350)**; es el ratio principal para Meta/IG feed.
- Stories/Reels: mantener texto, logo y CTA dentro de la safe zone (top 14%, bottom 35%, sides 6%).
- Contraste AA mínimo sobre el fondo.
- Acento de marca en **una** palabra/dato.
- Logo siempre presente; no deformar.

## Anti-patterns
- ❌ Párrafos largos / texto chico.
- ❌ Más de 2 tipografías o fondos claros planos.
- ❌ Claim entero en gradiente.

## Preview
`demo.html` — pieza 4:5 on-brand. `open surfaces/social-email/demo.html`.
