# Perfil: Email

Emails de Singular (marketing, transaccional, newsletter). Hereda de la marca corporativa (cyan). Sustituye a `s-mail-v1` (ver `legacy/s-mail-v1`).

> Email = HTML **table-based** + estilos inline (no clases ni var() — los clientes de correo no los soportan). Los tokens del DS son la **referencia de valores** a inlinear.

## UX writing

Empezar por [Singular foundations](../../docs/05-experience-foundations.md) y definir qué job
debe resolver el mensaje.
Para campaigns, newsletters y commercial follow-up, leer
[Marketing voice and tone](../../ux-voice/marketing.md).
Para transactional email, errors, approvals y status, leer
[Product voice and tone](../../ux-voice/product.md).
La intención del mensaje define la voz; el formato email no la define.

## Estructura
- Ancho máximo **600px**, centrado, sobre fondo `#050505` (o `#f4f4f7` para variante clara).
- **Header**: logo Singular (PNG/SVG hospedado — Fase 9), 24–32px de alto.
- **Body**: 1 columna, jerarquía clara (título Poppins, cuerpo Inter ~16px, line-height 1.6).
- **CTA**: botón pill (`border-radius: 9999px`), fondo `#4567ed` (o gradiente azul→cyan via VML/imagen para Outlook), texto blanco, padding 14×28.
- **Footer**: links legales + dirección + unsubscribe, texto `rgba(255,255,255,.5)` ~12px.

## Valores de marca (inline)
| Rol | Valor |
|---|---|
| Fondo | `#050505` (dark) / `#f4f4f7` (light) |
| Card | `#0f0f10` / `#ffffff` |
| Texto | `#f5f5f5` / `#1a202c` · secundario `#9aa0aa` |
| Acento / CTA | `#4567ed` · link `#7ccaff` (dark) / `#1741e8` (light) |
| Tipografía | Poppins (títulos) → fallback Arial; Inter (cuerpo) → fallback Helvetica |

## Reglas
- Todo **inline-styled**; nada de `var()`/clases/`backdrop-filter`.
- Dark-mode vía `@media (prefers-color-scheme: dark)` + `meta name="color-scheme"`.
- Imágenes con `alt`; CTA también como texto-link de respaldo.
- Un CTA primario por email.

## Preview
`demo.html` — email de 600px on-brand. `open surfaces/social-email/demo.html`.
