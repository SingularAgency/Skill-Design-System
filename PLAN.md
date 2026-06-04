# Singular Design System — Plan Maestro

> Documento vivo. Guía la construcción del **design system universal de marca Singular**: un solo sistema, usable por cualquier persona del equipo, para cualquier superficie (website, landing, web-app, slides, social, email), entregado como **skill de Claude + tokens + assets versionados**.
>
> **Estado:** Fase 0 (plan) — en revisión.
> **Fecha de arranque:** 2026-06-02.

---

## 1. Decisiones tomadas

| # | Decisión | Detalle |
|---|---|---|
| D1 | **Un solo primary azul/cyan** | 🔵 Azul `#4567ed` + gradiente **azul→cyan** + acentos cyan, para **todas** las superficies. App y web difieren solo en la *surface* (navy / negro), no en el color. (El rojo y el dual quedaron descartados — evolución: rojo → cyan → un solo azul/cyan.) |
| D2 | **Arquitectura: núcleo + perfiles** | Una skill madre con un **core de marca** (tokens, voz, a11y, motion) + **sub-perfiles por superficie**. `singular-design-app-v2` se **incrusta** como perfil `web-app` (sigue leyendo el `globals.css` de Stories como su verdad). `.sds-*` se **deprecan como sistema de clases**, pero se rescata su andamiaje (`references/`: audit-checklist, decision-tree, patterns). |
| D3 | **Superficies v1** | Las 4: `website-landing`, `web-app`, `slides-presentations`, `social-email`. |
| D4 | **Arranque** | Este documento maestro primero; luego ejecución paso a paso. |
| D5 | **Assets en el mismo repo** | Logos y símbolos de marca viven en `assets/` de este repo (se descartó el repo aparte `singular-skill-assets`). |

### Decisiones derivadas / pendientes de confirmar
- **Valores exactos de neutrales por perfil** (web negro `#050505`/`#010203` vs app navy tintado): a afinar con diseño. La arquitectura no depende del valor final.
- **Contradicción de radius** (`rounded-2xl` web vs `rounded-xl` app): se resuelve como **default por perfil**, no como regla global. El core define la escala; cada perfil elige su radio de card.
- **Hex final del primary**: dual confirmado; valores afinables con diseño.

---

## 2. Hallazgos de la auditoría (2026-06-02)

Auditoría en 5 frentes sobre `v0-singular-stories-app`, `FramerSingular`, el sistema de fondos, y el ecosistema de skills.

### 2.1 Tres design systems que se contradicen
| | `s-skill-v1` (marca/web) | `singular-design-app-v2` (Stories) | `singular-design-system` (.sds-*) |
|---|---|---|---|
| Clases | Tailwind + `--sg-*` | Tailwind/shadcn | `.sds-*` propietarias |
| Primary | Azul `#3B82F6` | Azul `#4567ed` | tokens sin hex fijo |
| Card radius | `rounded-2xl` ("never xl") | `rounded-xl` ("never 2xl") | tokens propios |
| Tipografía | Poppins+Georgia+Inter | Poppins+JetBrains Mono | roles `.sds-text-*` |
| Fuente de verdad | bundle `.skill` (no hallado) | `globals.css` de Stories | repo `singular-design-system-2026` (no clonado) |

**El website vivo (FramerSingular) ya migró a primary ROJO `#d4513b` + fondo `#010203`. Ninguna skill lo documenta** (todas tratan el rojo como "solo logo"). → Origen de la decisión D1.

### 2.2 El motor multi-marca (la joya técnica)
El `globals.css` de Stories deriva **todo el chrome** de `--primary` vía `color-mix(in srgb, var(--primary) X%, <neutral base>)`. Cambiar `--primary` re-tinta toda la UI. **Es el mecanismo que habilita el sistema dual sin rediseñar nada** — el primary es *un token*.

**Islas hardcodeadas que NO siguen a `--primary`** (hay que tokenizarlas para multi-marca total):
- Cluster `--interactive*`, `--ring`, `--primary-strong*` (hex fijos).
- Escalas `--singular-primary-*` / `--singular-secondary-*` (azul/púrpura fijos).
- `--surface-gradient-from/-to` (fijos).
- Fondos animados: `rgba(23,65,232,…)` azul / `rgba(86,70,232,…)` púrpura / teal (literales).
- Charts `--chart-1..5` (hex fijos).

Status (`--success/--warning/--info/--destructive`) son semánticos compartidos y **correctamente** NO siguen al primary.

### 2.3 Drift confirmado vs skills viejas
- **Radius real** de Stories: `--radius: 0.5rem` (no `0.75rem` ni `rounded-xl`/`rounded-2xl` como dicen las skills).
- Stack real: Next **16.1.6**, React **19.2.4**, Tailwind **4.2**, recharts.
- Status real = `--success/--warning/--info/--destructive`, no el `--status-*` que documenta la skill.
- "primary #4567ed" oculta el rol dual: el azul de **acción** (links/ring/CTAs) es `#1741e8` (`--primary-strong`/`--interactive`).

### 2.4 Sistema de fondos de marca (gradient + grilla + stars)
Existe en **2 implementaciones sin código compartido**:
- **Web** (`InteractiveHeroBackground.tsx`): React + Framer Motion, capas con `mix-blend`, **mouse-follow** (springs), aurora, 20 partículas. **NO respeta `prefers-reduced-motion`.** Prop `theme` con default azul (≠ rojo de marca).
- **App** (`.app-canvas-bg` + `body::before/::after` en `globals.css`): CSS puro, 3 radiales de niebla + grid (50/60px) + 2 capas de stars animadas por `background-position`. **SÍ respeta `prefers-reduced-motion`.** Light + dark.

→ Unificable en un `<BrandBackground>` tokenizado (ver §3.3).

### 2.5 `custom-ai.tsx` ya es el modelo del perfil marketing
Abstrae `Section`, `SectionHeading`, `CtaButton`, `Reveal`, `SystemChip`. El resto del sitio lo hace a mano: **332 usos** del eyebrow `uppercase tracking-*`, `FadeIn` redefinido 4+ veces, acentos hardcodeados (`#d4513b`, `#d97757`, `#10a37f`…).

### 2.6 Componentes — portabilidad Next → Vite
- **Altamente portables** (cero/casi-cero acople a Next): `ui/card`, `ui/button`, `ui/badge`, `status-badge`, `empty-state`, `pill-filter`, `kpi-card`, `data-table-patterns`, `side-modal-layout`.
- **Portables con adaptador de routing**: `sidebar-shell`, `page-header`, `section-top-tabs`, `app-header` (usan `next/link` + `next/navigation`). → Introducir un `<Link>` inyectable.
- **Re-trabajo**: branding/logo (hoy un PNG/SVG por tema; ideal SVG monocromo recoloreable + tokens).

### 2.7 Fuente fragmentado / perdido
- Único fuente editable en disco: `~/Documents/Work/Singular/singular-design-app-v2.skill` (ZIP).
- `s-skill-v1`, `s-mail-v1`, `.sds-*`: solo como copias de runtime de Cowork; no versionados en disco.
- `SingularAgency/claude-marketplace`: existe en GitHub, **no clonado**; solo tiene plugins de workflow.
- `SingularAgency/singular-design-system-2026` (de `.sds-*`): existe, **no clonado**.

### 2.8 Higiene / seguridad
- ⚠️ **API key Figma** (`figd_…`) embebida en `sidebar-shell.tsx` de Stories. Revisar/rotar si es real.
- `styles/globals.css` de Stories: boilerplate v0 muerto (OKLCH, Geist).
- Doble definición PERT con colisión de tokens.
- Website: clases fantasma (`section-padding`, `py-m-sm`), `LandingPageTemplate` orphan, `STATS` dead data, `font-serif` indefinido pero usado.

---

## 3. Arquitectura objetivo

### 3.1 Estructura de la skill madre
```
singular-design-system/                ← skill madre (la consolidada)
  SKILL.md                             ← núcleo de marca + router "elegí tu superficie"
  tokens/                              ← FUENTE ÚNICA de tokens (multi-marca)
    core.css                           ← estructura: surface/status/spacing/radius/typo derivados
    brand-web.css                      ← profile: --primary rojo + escala + neutrales negros
    brand-app.css                      ← profile: --primary azul + escala + neutrales navy
    motion.css
  surfaces/
    website-landing/guide.md           ← perfil marketing (primitivos de custom-ai)
    web-app/guide.md                   ← incrusta singular-design-app-v2 (lee globals.css de Stories)
    slides-presentations/guide.md      ← specs de marca para Gamma/PPTX
    social-email/
      email.md                         ← s-mail-v1 migrado
      social.md                        ← nuevo (specs Meta)
  components/                          ← inventario core + por-perfil (con API y portabilidad)
  backgrounds/                         ← <BrandBackground> (sistema unificado §3.3)
  references/                          ← audit-checklist, decision-tree, patterns (de .sds-*)
  assets/                              ← logos + símbolos de marca (en este repo)
```

### 3.2 Modelo de tokens multi-marca (dual)
**Principio:** el *core* define **qué tokens existen y cómo se derivan**; cada *brand profile* aporta los **valores raíz** (primary, su escala, neutrales base). Se activa por `data-brand="web|app"` o por import del profile.

```
core.css     → --background, --card, --border, --muted, --accent… = color-mix(--primary X%, <neutral>)
               --interactive*, --ring, --primary-strong* = derivados de --primary (tokenizar islas)
               --success/--warning/--info/--destructive = compartidos (no siguen primary)
               escala --gap-*, --radius*, tipografía, --text-2xs/3xs

brand-web.css → --primary: #d4513b; escala roja; neutrales negros (#050505/#010203); radius-card 2xl
brand-app.css → --primary: #4567ed; escala azul; neutrales navy tintados; radius-card xl
```
**Trabajo clave de la Fase 2:** tokenizar las islas de §2.2 para que cada profile re-tinte completo (hoy quedarían "islas azules" si solo cambiás `--primary`).

### 3.3 Sistema de fondos `<BrandBackground>`
Un componente + set de tokens, capas componibles, hue ligado a `--primary`, **reduced-motion en todas**.
- **Variantes:** `brand-animated` (hero web, mouse-follow + aurora) · `brand-static` (canvas app, CSS) · `flat-dark` · `flat-tinted`.
- **Capas:** `mist` (radiales) · `grid` · `stars` · `aurora` · `cursor-glow` (toggles).
- **Tokens:** `--brand-bg-hue` (= `--primary`), `--brand-grid-size`, `--brand-stars-density`, `--brand-mist-strength`, `--brand-cursor-*`.
- **A11y:** una regla global `@media (prefers-reduced-motion)` apaga stars/aurora/cursor — cierra la deuda del web.

### 3.4 Resolución de contradicciones
| Conflicto | Resolución |
|---|---|
| `#3B82F6` vs `#4567ed` vs `#d4513b` | Dual por perfil (D1). Web=rojo, app=azul. `#3B82F6` queda como acento legacy a converger. |
| `rounded-2xl` vs `rounded-xl` | Core define escala de radius; **default de card por perfil** (web 2xl, app xl). Documentado, no contradicción. |
| `.sds-*` vs Tailwind/shadcn | Toolkit canónico = **Tailwind v4 + shadcn** (lo que está en producción). `.sds-*` se deprecа; se rescata `references/`. |

---

## 4. Plan por fases

> Cada fase: **objetivo · tareas · entregable · "done"**. Orden ejecutable. Ejecución paso a paso en este chat.

### Fase 0 — Plan maestro ✅ (este documento)
**Done:** documento aprobado por el equipo.

### Fase 1 — Centralizar el fuente + esqueleto de la skill
- **Tareas:** decidir repo del DS (nuevo `singular-design-system` vs `plugins/` del marketplace); recuperar `singular-design-app-v2.skill` (unzip); clonar/localizar `claude-marketplace` y `singular-design-system-2026`; crear el árbol de carpetas de §3.1.
- **Entregable:** repo/carpeta del DS con esqueleto + fuentes viejas recuperadas adentro.
- **Done:** un solo lugar versionado con todo el material fuente.

### Fase 2 — Núcleo de tokens core (multi-marca)
- **Tareas:** destilar `globals.css` de Stories → `tokens/core.css`; **tokenizar las islas** (§2.2); escribir `brand-web.css` (rojo) y `brand-app.css` (azul); generar la escala roja de marca para web.
- **Entregable:** `tokens/*.css` + tabla "token → core/profile" + demo de switch `data-brand`.
- **Done:** cambiar de profile re-tinta el chrome completo sin islas fuera de marca.

### Fase 3 — Sistema de fondos `<BrandBackground>`
- **Tareas:** unificar las 2 implementaciones (§2.4) en un componente + CSS tokenizado; capas con toggles; reduced-motion global; hue ligado a `--primary`.
- **Entregable:** `backgrounds/` con componente + CSS + doc de variantes.
- **Done:** mismo fondo de marca en web (animado) y app (estático), accesible, recoloreable por profile.

### Fase 4 — Perfil web-app (incrustar app-v2)
- **Tareas:** documentar componentes canónicos (Card, KpiCard, PillFilter, StatusBadge, EmptyState, PageHeader, SidebarShell, side-modal, data-table-patterns) con API real; nota de portabilidad Next→Vite (`<Link>` inyectable); apuntar a `globals.css` de Stories como verdad.
- **Entregable:** `surfaces/web-app/guide.md` + `components/` (core vs producto).
- **Done:** perfil web-app reproduce Stories sin reinventar tokens.

> **Avance (2026-06-04) — sistema de navegación + componentes entregados como CÓDIGO.** Se reemplazó el sidebar "de caja" del demo por el **sistema de navegación de Stories** (rail flotante glass + header well frosteado + big-pill tabs + Powered by Singular) y se portó como código portable:
> - **Tokens** (`tokens/brand-app.css` + `theme-mapping.css`): `--sidebar-primary(-foreground)`, `--sidebar-nav-hover/-active`, `--header-well-bg/-border/-search-bg/-search-border`, `--button-outline-*`, `--card-translucent-surface`, `--section-tabs-*`, `--container-popover-*` (valores reales de Stories, light+dark).
> - **Código** (`surfaces/web-app/`): `navigation.tsx` (FloatingSidebarProvider, SidebarShell, AppHeaderShell+SearchPill, SectionTopTabs/BigPillTabsNav, PageHeader, PoweredByFooter, SidebarContentWrapper — router-agnóstico vía `linkComponent`, **sin la Figma key**), `components.tsx` (StatusBadge/Severity/Priority, PillFilter*, EmptyState, side-modal), `patterns.ts` (big-pill-tabs, data-table-patterns), `web-app.css`.
> - **Demo + docs:** `demo.html` reescrito (verificado light+dark en browser), `guide.md` + `components/README.md` + `SKILL.md` actualizados.

### Fase 5 — Perfil website/landing (promover custom-ai)
- **Tareas:** promover `Section`, `SectionHeading`, `Eyebrow`, `CtaButton`, `Reveal`, `LogoMarquee`, `PricingCard`, `GlassTabs`; tokenizar acentos hardcodeados; section rhythm (`py-s/m/l`) → tokens; limpiar clases fantasma / código muerto.
- **Entregable:** `surfaces/website-landing/guide.md` + primitivos.
- **Done:** una sección de landing se arma con primitivos del DS, no a mano.

### Fase 6 — Perfiles slides + social/email
- **Tareas:** `slides-presentations/` (specs de marca para Gamma; alinear theme); `social-email/email.md` (migrar s-mail-v1); `social.md` (specs Meta nuevas).
- **Entregable:** las 2 superficies restantes documentadas.
- **Done:** las 4 superficies cubiertas en la skill madre.

### Fase 7 — Aplicar al website (piloto real)
- **Tareas:** refactor de `custom-ai.tsx` al DS nuevo con `brand-web` (rojo); `<BrandBackground>`; tipografía/spacing/a11y; validación visual; luego roll-out a páginas clave.
- **Entregable:** `custom-ai` corriendo sobre el DS; checklist de roll-out.
- **Done:** página piloto se ve igual o mejor, 100% sobre tokens del DS.

### Fase 8 — Publicar la skill + deprecar las viejas
- **Tareas:** publicar `singular-design-system` (vía marketplace/PR); deprecar `s-skill-v1`, `s-mail-v1`, `.sds-*`, `app-v2` suelta; mecanismo de re-audit cuando un producto cambie; **consolidar el preview core (`tokens/demo.html`) + un `demo.html` por superficie** (web-app, website-landing, slides-presentations, social-email) **y servirlos por GitHub Pages** como preview público del DS (la skill los referencia para que cualquiera previsualice sin clonar).
- **Entregable:** skill publicada + skills viejas marcadas deprecated.
- **Done:** el equipo usa una sola skill.

### Fase 9 — Assets de marca (en este repo, `assets/`)
- **Tareas:** mantener logos/símbolos oficiales en `assets/` (logos full/icon/wordmark dark/light + símbolo recoloreable); referenciarlos por ruta relativa (no-web) o vía `<Logo>` (React).
- **Entregable:** `assets/` con los assets oficiales versionados junto al resto del DS.
- **Done:** todo el DS convive en un solo repo; sin assets duplicados por tema. *(Se descartó el repo aparte `singular-skill-assets`: todo vive acá.)*

---

## 5. Riesgos y pendientes
- **Confirmar con diseño** los hex finales (primary por perfil + neutrales). No bloquea la arquitectura.
- **API key Figma** en `sidebar-shell.tsx` (Stories): revisar/rotar antes de portar ese componente. *(No viaja al DS ni a assets.)*
- **Repos no clonados** (`claude-marketplace`, `singular-design-system-2026`): clonar en Fase 1 para no perder material de `.sds-*`.
- **Contradicción de radius**: resuelta por perfil; verificar que no rompa expectativas de ningún producto en uso.
- **app-v2 lee `globals.css` de Stories**: el perfil web-app queda acoplado a ese repo; mantener el contrato de "Stories es la verdad del perfil app".

### Follow-ups (abiertos tras el pase del 2026-06-04)
- **Rotar la Figma key** `figd_…` en `v0-singular-stories-app/components/sidebar-shell.tsx` (estaba embebida en el snippet MCP; **no viajó** al DS pero sigue viva en Stories).
- **Extras DS-worthy** que la auditoría marcó reutilizables y aún NO se portaron: `DataGrid`, `DataCard`, `ListPagination`, `GridSectionHeader`, `EdgeFadeScroller`, `LabelWithHint`, `StatusDropdown`, `ThemeProvider`. Próximo pase del perfil web-app.
- **Drift de colores de marca**: `--singular-*` del DS (cyan unificado) difiere de los valores actuales de Stories (`--singular-cyan` light #0D9488/dark #2dd4bf, coral aliased a #1741E8). El DS eligió conscientemente el cyan unificado — `StatusBadge` mapea a esa paleta. Reconciliar si diseño decide converger Stories al DS.
- **`KpiCard`/`KpiRow`** quedaron fuera (acoplados a `settings-context` en Stories). Portar con `isExpanded` por prop si se necesitan como componente del DS.

---

## 6. Fuentes y rutas
| Qué | Ruta |
|---|---|
| Website (perfil web, primary rojo) | `/Users/csrspinozzi/Projects/FramerSingular` · tokens en `client/src/index.css` · modelo de primitivos en `client/src/pages/custom-ai.tsx` · hero `client/src/components/InteractiveHeroBackground.tsx` |
| Web-app Stories (perfil app, primary azul) | `/Users/csrspinozzi/Projects/v0-singular-stories-app` · tokens en `app/globals.css` (2262 líneas) · fondos `app-canvas-bg` L1060-1162 · componentes en `components/` + `components/ui/` |
| Fuente editable app-v2 | `/Users/csrspinozzi/Documents/Work/Singular/singular-design-app-v2.skill` (ZIP) |
| Skills runtime (DS) | `~/Library/Application Support/Claude/local-agent-mode-sessions/skills-plugin/.../skills/{singular-design-app-v2,singular-design-system,...}/SKILL.md` |
| Skills runtime (s-skill-v1 / s-mail-v1) | `.../skills-plugin/b2e5689d-.../c99e457a-.../skills/{s-skill-v1,s-mail-v1}/SKILL.md` |
| Marketplace (GitHub, no clonado) | `github.com/SingularAgency/claude-marketplace` |
| DS .sds-* (GitHub, no clonado) | `github.com/SingularAgency/singular-design-system-2026` |
| Skills de calidad web (hermanas) | `/Users/csrspinozzi/Documents/Work/Singular/web-quality-skills-main/skills/` |
