# Perfil: Slides / Presentaciones

Decks de Singular (kickoffs, propuestas, QBRs, pitch). Marca **corporativa** (cyan por defecto; azul para decks de *producto*). Generación vía **Gamma** (MCP) o **PPTX** (skill `pptx`).

> No es CSS: es una **especificación de marca** para que slides generadas (Gamma/PPTX) salgan on-brand. El preview (`demo.html`) muestra los layouts en 16:9.

## Cómo se produce
- **Gamma (recomendado):** plugin `kickoff-presentation-gen` → tema oscuro + gradient accents + logo Singular. Pasarle los tokens de marca (abajo) como guía de estilo.
- **PPTX:** skill `pptx` con la paleta/tipografía de marca aplicada a master slides.

## Tokens de marca para slides
| Rol | Valor (corporativo / cyan) |
|---|---|
| Fondo | `#050505` → `#010203` (dark dramático) + fondo de marca opcional (mist + grid) |
| Acento / títulos destacados | `--primary` `#4567ed` + `--gradient-primary` (cyan→cyan) |
| Texto | títulos `#ffffff` · cuerpo `rgba(255,255,255,.72)` · meta `rgba(255,255,255,.5)` |
| Datos / números | JetBrains Mono, `tabular-nums` |
| Secundario | azul `#3B82F6` (acento de datos/charts) |

Tipografía: **Poppins** (display/títulos), **Inter** (cuerpo), **JetBrains Mono** (datos/código).

## Layouts canónicos (16:9)
1. **Title** — eyebrow + título grande (palabra en gradiente) + subtítulo + logo. Fondo de marca animado-estático.
2. **Section divider** — número de sección + título, fondo con mist.
3. **Content** — título + 2–3 columnas o bullets con íconos (lucide), mucho aire.
4. **Data** — KPI grande (`kpi-value` mono) + chart (paleta `--chart-*`).
5. **Closing/CTA** — claim + datos de contacto + logo.

## Reglas
- **Una idea por slide.** Título corto, cuerpo escaso.
- **Logo** en title y closing (esquina o centrado). Versión clara sobre fondo oscuro.
- Acento de marca en **una** palabra/dato por slide — no recargar de cyan.
- Números siempre en **mono + tabular**.
- Contraste AA sobre el fondo oscuro.

## Anti-patterns
- ❌ Fondos blancos planos (rompen la identidad dark de Singular).
- ❌ Más de 2 familias tipográficas.
- ❌ Bullets de 5+ líneas; gradiente en bloques enteros de texto.

## Preview
`demo.html` — slides title + content + data en 16:9, marca roja. `open surfaces/slides-presentations/demo.html`.
