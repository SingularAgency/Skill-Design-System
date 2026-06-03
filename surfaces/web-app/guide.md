# Perfil: Web-app / Producto

La superficie de **producto interno** de Singular (dashboards, OKR, sprints, QA, payments). Marca **azul** (`brand-app`), **dark-first** vía `next-themes`, densa en datos.

> **Fuente de verdad:** `v0-singular-stories-app/app/globals.css` + `components/`. Este perfil **espeja** ese repo — cuando cambie, re-auditar (Fase 8). No re-tokeniza: usa los tokens del DS.

## Setup
```css
@import "@singular/ds/tokens/theme-app.css";           /* core + brand azul + utilities */
@import "@singular/ds/backgrounds/brand-background.css"; /* canvas .brand-bg (static) */
```
```tsx
<ThemeProvider attribute="class" defaultTheme="dark">
```

## Anatomía de una página de producto
1. **Page header** — h1 (`.page-title`) + descripción (`.page-subtitle`) + acciones a la derecha + `KpiToggle`.
2. **`KpiRow`** — 3–4 `KpiCard` (value + trend chip + label), colapsable.
3. **`PillFilterSwitcher`** — filtros tipo pill (single/multi), con `trailing` para search.
4. **Contenido** — `Card surface="solid"` envolviendo una tabla (`data-table-patterns`) o un grid de cards.
5. **Paginación** — `PAGE_SIZE` 9 (grids) / 25 (tablas).

Ritmo: `gap-l` (24px) entre bloques; `gap-filters-to-grid` (48px) entre filtros y contenido.

## Componentes canónicos (API real)
| Componente | Props clave |
|---|---|
| **Card** | `surface="liquid"\|"solid"` (default liquid; solid = opaco para grillas), `size=xs..xl`, `translucent`. `rounded-xl`. |
| **Button** | `variant=default\|destructive\|outline\|secondary\|ghost\|link`, `size=default\|sm\|lg\|icon*`. `rounded-full`. Icono primero. |
| **KpiCard / KpiRow** | KpiCard: `value`, `subtitle`, `trend=up\|warning\|down\|neutral` (chip), `tooltip`. KpiRow: `columns=3..6`, `isExpanded`. `useKpiVisibility()`. |
| **PillFilter / …Switcher / …Multi** | `options`, `selected`, `onSelect`, `useStatusColors?`, `trailing?`, `defaultActiveKey`, `onClear`. |
| **StatusBadge / Severity / Priority** | `status` (5 familias), `size=sm\|md\|lg`, `filled?`, `showIcon?`. `mapToStatusVariant()` para strings libres. |
| **EmptyState / TableEmptyState** | `variant` (no-data/no-results/all-done/error…), `title?`, `description?`, `action?`. |
| **PageHeader** | `title`, `subtitle?`, `actions?`, `kpiToggle?`, `backLink?`. |
| **SidebarShell** | `sections` (nav), `isItemActive`, `homeHref`, `brandLogoUrl?` (white-label). Rail flotante + Sheet mobile. |
| **side-modal-layout** | `SideModalScrollBody`, `SideModalStaticSection`, `SideModalPillTabsRow` + `entity-modal-stack-host`. |
| **data-table-patterns** | Kit de clases para tablas (no componente): `dataTableCardFlushClass`, `dataTableBodyRowInteractiveClass`, etc. |

## Portabilidad Next → Vite (el website es Vite)
- **Portables tal cual** (cero acople a Next): Card, Button, Badge, StatusBadge, EmptyState, PillFilter, KpiCard, data-table-patterns, side-modal-layout.
- **Necesitan adaptador de routing** (`next/link`, `next/navigation`): SidebarShell, PageHeader (`backLink`), SectionTopTabs, app-header → introducir un **`<Link>` inyectable** (prop/slot) en vez de importar `next/link`.
- **Re-trabajo**: logo/branding (hoy un asset por tema → idealmente SVG monocromo + tokens, ver Fase 9).

## Tokens de dominio (NO están en core)
`--okr-*`, `--pert-*`, `--payments-grid-*` y `.payments-sprint-grid` son **específicos de Stories** — viven en su `globals.css`, no en el core del DS. Si otro producto los necesita, se promueven conscientemente.

## Preview
`demo.html` — dashboard de ejemplo (sidebar + header + KPI row + filtros + tabla) armado con el DS. `open surfaces/web-app/demo.html`.
