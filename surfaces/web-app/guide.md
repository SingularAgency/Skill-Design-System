# Perfil: Web-app / Producto

La superficie de **producto interno** de Singular (dashboards, OKR, sprints, QA, payments). Identidad azul/cyan con action blue `#0b84ff` (`brand-app`), **dark-first** vía `next-themes`, densa en datos.

> **Fuente de verdad:** `v0-singular-stories-app/app/globals.css` + `components/`. Este perfil **espeja** ese repo — cuando cambie, re-auditar (Fase 8). No re-tokeniza: usa los tokens del DS.

## UX writing

Empezar por [Singular foundations](../../docs/05-experience-foundations.md)
para
entender por qué contexto, state, evidence y ownership tienen prioridad.
Leer [Product voice and tone](../../ux-voice/product.md)
para labels, acciones, estados, approvals, evidence, QA y AI content. Mantener
la terminología del producto host y no convertir estados operativos en copy de
marketing.

## Setup
```css
@import "@singular/ds/tokens/theme-app.css";           /* core + brand azul + utilities */
@import "@singular/ds/backgrounds/brand-background.css"; /* canvas .brand-bg (static) */
```
```tsx
<ThemeProvider attribute="class" defaultTheme="dark">
```

## Código del perfil (en este repo)
A diferencia de las skills viejas, este perfil **entrega código portable** (no solo docs). Espeja el patrón de `surfaces/website-landing/primitives.tsx`: router-agnóstico, tokenizado, sin secretos.

| Archivo | Qué trae |
|---|---|
| `surfaces/web-app/navigation.tsx` | **Sistema de navegación**: `FloatingSidebarProvider`/`useFloatingSidebar`, `SidebarShell`, `AppHeaderShell` + `SearchPill`, `SectionTopTabs`/`BigPillTabsNav`, `PageHeader`, `PoweredByFooter`, `SidebarContentWrapper`. |
| `surfaces/web-app/components.tsx` | Componentes propios: `StatusBadge`/`SeverityBadge`/`PriorityBadge` + `mapToStatusVariant`, `PillFilter`/`Multi`/`Switcher`, `EmptyState`/`TableEmptyState`, `SideModalScrollBody`/`StaticSection`, `CompactFieldSelector` y `OverlayLaneHost`. |
| `surfaces/web-app/patterns.ts` | Kits de clases: `big-pill-tabs` (+ `getBigPillTabClass`), `data-table-patterns`, `navigation-patterns` y geometría `compact-field-selector`. |
| `surfaces/web-app/web-app.css` | Utilidades del perfil que no están en core: chrome de `.page-top-chrome`/section-tabs + helpers de nav en CSS plano (para entornos sin Tailwind y el demo). |

> **Portabilidad (Next → cualquier React):** los componentes de navegación reciben un `linkComponent` inyectable (default `<a>`) y el `pathname` por props — **sin `next/link` ni `next/navigation`**. El secreto (MCP/Figma key) de Stories **no viaja**. `components.tsx` asume primitivos shadcn (`@/components/ui/*`) estilados con los tokens del DS.

## Sistema de navegación
El chrome que reemplaza al sidebar "de caja": **rail flotante glass** + **header well frosteado** + **big-pill tabs** de ruta + footer **Powered by Singular**. Dark-first, white-label (logo por `brandLogoUrl`/`brandInitials`).

**Anatomía del shell:**
```tsx
<FloatingSidebarProvider>
  <SidebarShell                 // rail flotante izq: cuadrado de logo (toggle) + íconos
    pathname={pathname} sections={sections} isItemActive={...}
    homeHref="/" linkComponent={Link} />
  <AppHeaderShell               // well frosteado fijo arriba
    left={<SearchPill shortcut="⌘K" onClick={openCmdK} />}
    center={<BigPillTabsNav tabs={tabs} activeHref={...} linkComponent={Link} />}
    right={<>{themeToggle}{notifications}{avatar}</>} />
  <SidebarContentWrapper>       // offset que despeja rail + header
    <PageHeader title="…" subtitle="…" actions={…} />
    {/* …contenido… */}
  </SidebarContentWrapper>
  <PoweredByFooter logo={<Logo />} />
</FloatingSidebarProvider>
```

**Offsets de layout (clave):** rail en `left-10 top-10`; header well y contenido offset `md:left-[132px]`; contenido `pt-[92px]` (despeja el header de 60px en `top-10`). Colapsado, el contenido recupera el ancho del rail (`md:pl-10`).

**Reglas:**
- **Navegación vs filtrado:** `SectionTopTabs`/big-pill = rutas (`href`); `PillFilter` = filtros in-page (misma URL). No uses pills para navegar entre rutas salvo que sean `Link`s reales (ver `navigation-patterns`).
- **Activo:** un solo lenguaje — `bg-[var(--sidebar-nav-active)]` + `text-sidebar-primary`, igual en rail, big-pill y profile.
- **A11y:** drawer mobile con foco; `motion-safe` en los pulsos; targets ≥44px; `aria-current` en el item activo.

## Anatomía de una página de producto
1. **Page header** — h1 (`.page-title`) + descripción (`.page-subtitle`) + acciones a la derecha + `KpiToggle`.
2. **`KpiRow`** — 3–4 `KpiCard` (value + trend chip + label), colapsable.
3. **`PillFilterSwitcher`** — filtros tipo pill (single/multi), con `trailing` para search.
4. **Contenido** — `Card surface="solid"` envolviendo una tabla (`data-table-patterns`) o un grid de cards.
5. **Paginación** — `PAGE_SIZE` 9 (grids) / 25 (tablas).

Ritmo: `gap-l` (24px) entre bloques; `gap-filters-to-grid` (20px) entre filtros y contenido en producto.

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
| **CompactFieldSelector** | `field="status"\|"priority"`, `value`, `accessibleLabel?`, `leading?`, `trailing?` + props nativas de button. Trigger fijo 128×32 dentro de una fila de 44px; conserva campo + valor completos en `aria-label`/`title`. |
| **OverlayLaneHost** | Slots `toast`, `actionable`, `actions`, `footer`; `sideModalOpen` desplaza o suprime lanes según viewport; `actionsLabel?` nombra el grupo. No incluye providers, portales, permisos ni datos. |

## Convivencia de overlays

`OverlayLaneHost` resuelve posición y separación para cuatro responsabilidades
independientes del shell autenticado:

1. `toast`: feedback temporal debajo del header;
2. `actionable`: mensaje persistente o carrusel abajo a la izquierda;
3. `actions`: acciones flotantes apiladas abajo a la derecha;
4. `footer`: reserva para Powered by Singular.

Los tokens `--overlay-*` de `web-app.css` cubren safe areas, offsets, anchos,
z-index y reservas mobile. El producto sigue siendo dueño de autenticación,
duración, cola, cierre, permisos, contenido y semántica live-region; por ejemplo,
el toaster sloteado conserva su propio `role="status"`/`aria-live`. En desktop,
`sideModalOpen` mueve las acciones a la izquierda, eleva la notificación para que
no colisione y oculta el footer. En mobile, la notificación accionable se apila
sobre Agent/Feedback y el footer decorativo se oculta; todas las acciones siguen
disponibles. El toast permanece visible. `prefers-reduced-motion` elimina las
transiciones de desplazamiento.

### Selector compacto

Status y Priority comunican semánticas distintas y aun comparten geometría. Usar
`CompactFieldSelector` o las clases `compactFieldSelector*` únicamente para esos
dos campos editables en espacios densos; no es una invitación a portar el menú de
estados ni las opciones de dominio. Mantener la fila en 44px, foco visible,
operación por teclado y campo + valor completos en `aria-label`/`title`; el
truncado es solamente visual.

```tsx
<CompactFieldSelector
  field="priority"
  value="Medium"
  leading={<PriorityDot aria-hidden />}
  trailing={<ChevronDown aria-hidden />}
  onClick={openPriorityMenu}
/>
```

## Traza de decisión material — overlays y metadata compacta

**Contexto:** Un shell autenticado de web-app puede mostrar un side-modal,
feedback temporal, una notificación accionable, Agent/Feedback y Powered by al
mismo tiempo.

**Persona y job:** La persona operadora necesita inspeccionar un item, reconocer
qué requiere atención y conservar acceso a las acciones globales sin reconstruir
qué overlay oculta a cuál.

**Pain o riesgo:** Offsets fijos definidos por cada feature colisionan, cambian el
orden de foco de forma impredecible o tapan acciones en viewport estrecho. Status
y Priority también pierden alineación si cada trigger deriva su ancho del label.

**Evidencia:** Contrato documentado y comportamiento observado en el working tree
de Singular Stories (`components/authenticated-overlay-host.tsx`,
`app/globals.css`, `components/story-detail-modal.tsx` y
`docs/05-design-system/product-ui-patterns.md`, verificados el 5 de agosto de
2026). Es evidencia de implementación, no research de cliente.

**Foundation:** Hacer la complejidad navegable y preservar contexto; mantener
control humano significativo; expresar autoridad calma de forma accesible.

**Decisión y trade-off:** Promover en el release aditivo `2026.08` sólo el host de
layout, sus tokens y la geometría 128×32 de Status/Priority. En mobile las lanes
accionables consumen más espacio vertical para permanecer visibles y separadas;
el footer decorativo se oculta. Providers, portales, colas, duración, copy,
opciones, permisos y transiciones de dominio permanecen en el producto.

**System owner:** El DS posee geometría, safe areas, z-index, responsive behavior,
foco visible y reduced motion. Cada host posee contenido, live regions, estado,
autenticación y autorización.

**Aplicación:** Perfil `web-app`; `OverlayLaneHost`, clases
`compactFieldSelector*` y `web-app.css`.

**Validación:** Preview simultáneo a 1440px, 596px y 390px; Status/Priority
128×32 dentro de fila de 44px; toast visible; lanes inferiores separadas en
desktop y apiladas sin solaparse en mobile; foco por teclado y reduced motion.

## Portabilidad Next → cualquier React
- **Portables tal cual** (cero acople a Next): Card, Button, Badge, StatusBadge, EmptyState, PillFilter, KpiCard, data-table-patterns, side-modal-layout, CompactFieldSelector y OverlayLaneHost.
- **Necesitan adaptador de routing** (`next/link`, `next/navigation`): SidebarShell, PageHeader (`backLink`), SectionTopTabs, app-header → introducir un **`<Link>` inyectable** (prop/slot) en vez de importar `next/link`.
- **Re-trabajo**: logo/branding (hoy un asset por tema → idealmente SVG monocromo + tokens, ver Fase 9).

## Próximas promociones candidatas

La auditoría 2026-07 detectó patrones maduros en Stories que todavía deben
limpiarse antes de entrar al código portable:

- `DataGrid` / `DataCard` / `ListPagination`;
- `GridSectionHeader` / `EdgeFadeScroller`;
- `LabelWithHint`;
- `StatusDropdown` sólo para edición en detail; `StatusBadge` en grids;
- `AiProcessButton` / `ChartExplainer`.

No copiar dependencias de datos, routing o settings. Ver `components/README.md`.

## Tokens de dominio (NO están en core)
`--okr-*`, `--pert-*`, `--payments-grid-*` y `.payments-sprint-grid` son **específicos de Stories** — viven en su `globals.css`, no en el core del DS. Si otro producto los necesita, se promueven conscientemente.

## Preview
`demo.html` — dashboard de ejemplo con el **sistema de navegación nuevo** (rail flotante + header well + big-pill tabs + Powered by Singular), page header, KPI row, filtros y tabla. También ejercita en simultáneo side-modal + toast + notificación accionable + Agent/Feedback y el selector 128×32 de Status/Priority. Theme toggle funcional (light/dark). `open surfaces/web-app/demo.html`.
