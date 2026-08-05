/**
 * Kits de clases (strings, NO componentes) del perfil WEB-APP de Singular.
 * Portados de v0-singular-stories-app (ui/big-pill-tabs, data-table-patterns,
 * navigation-patterns). Solo dependen de un `cn` (incluido). Tokenizados: usan
 * los tokens del DS (--sidebar-nav-active, --gap-*, etc.).
 *
 * Cargá theme-app.css. El subconjunto de payments (`payments-grid-*`) NO se porta
 * acá: es específico de Stories (vive en su globals.css).
 */

/* — util mínima de clases (reemplazable por el `cn` de @/lib/utils en shadcn) — */
function cn(...parts: Array<string | false | null | undefined>): string {
  return parts.filter(Boolean).join(" ")
}

/* ============================================================================
 * big-pill-tabs — el tab "big pill" de marca (navegación de ruta)
 *   Activo: bg-[var(--sidebar-nav-active)] + text-sidebar-primary (mismo lenguaje
 *   que el item activo del rail). Tono "emerald" para el estado "Active = live".
 * ========================================================================== */

export const bigPillTabsContainerClass =
  "inline-flex items-stretch gap-1 rounded-full bg-muted/85 backdrop-blur-xl border border-border/40 shadow-md p-1"

export const bigPillTabClass =
  "flex min-h-9 items-center gap-1.5 rounded-full px-3 py-0 text-xs font-medium leading-none whitespace-nowrap transition-all md:px-4 md:text-sm"

export const bigPillTabActiveClass =
  "bg-[var(--sidebar-nav-active)] text-sidebar-primary shadow-none font-semibold"

export const bigPillTabInactiveClass = "text-muted-foreground hover:text-primary"

/** Segmento no disponible (ej. stepper de modal): anula el hover, queda muteado. */
export const bigPillTabUnreachableClass =
  "cursor-not-allowed text-muted-foreground/60 hover:text-muted-foreground/60"

export const bigPillTabCountClass = "text-xs"

/**
 * Tono visual. `"default"` mantiene el lenguaje sidebar-primary. `"emerald"` tinta
 * label + fill + count en emerald (mirror del "In Progress"); `SectionTopTabs` lo
 * auto-aplica cuando el label de un tab es `"Active"`.
 */
export type BigPillTabTone = "default" | "emerald"

const bigPillTabEmeraldActiveClass =
  "bg-emerald-500/15 text-emerald-700 dark:text-emerald-300 shadow-none font-semibold"
const bigPillTabEmeraldInactiveClass =
  "text-emerald-600 dark:text-emerald-400 hover:text-emerald-700 dark:hover:text-emerald-300"

export function getBigPillTabClass(isActive: boolean, className?: string, tone: BigPillTabTone = "default") {
  const activeClass = tone === "emerald" ? bigPillTabEmeraldActiveClass : bigPillTabActiveClass
  const inactiveClass = tone === "emerald" ? bigPillTabEmeraldInactiveClass : bigPillTabInactiveClass
  return cn(bigPillTabClass, isActive ? activeClass : inactiveClass, className)
}

export function getBigPillTabCountClass(isActive: boolean, className?: string, tone: BigPillTabTone = "default") {
  if (tone === "emerald") {
    // Emerald: label + count a la misma intensidad en ambos estados (drop del className).
    return cn(bigPillTabCountClass, isActive ? "text-emerald-700 dark:text-emerald-300" : "text-emerald-600 dark:text-emerald-400")
  }
  return cn(bigPillTabCountClass, isActive ? "text-sidebar-primary/75" : "text-muted-foreground", className)
}

/* ============================================================================
 * data-table-patterns — chrome compartido de tablas/grids de dashboard
 *   (Alineado con BalancedStoryTable. Ritmo de página: gap-xs…gap-xl,
 *   gap-filters-to-grid, stack-*. Block headers: GridSectionHeader / CardTitle.)
 * ========================================================================== */

export const dataTableCardFlushClass = "overflow-hidden p-0"
export const dataTableScrollClass = "overflow-x-auto"

/** Columna + card shell de la grilla balanceada. */
export const balancedDataGridShellClass = "flex min-w-0 flex-col"
/** Card root flush (con el `rounded-xl border shadow-sm` default de ui/card). */
export const balancedDataGridCardClass = `${dataTableCardFlushClass} min-w-0`
/** Wrapper interno de la tabla — evita overflow blowout del flex. */
export const balancedDataGridTableWrapClass = "min-w-0 w-full overflow-x-hidden"

export const dataTableHeaderRowClass = "border-b border-border bg-muted/30 hover:bg-muted/30"
/** Fila de agrupación (header de sprint/epic dentro del body). */
export const dataTableSubheaderRowClass = "border-b border-border bg-muted/50"
/** Fila de total/summary al pie. */
export const dataTableSummaryRowClass = "border-b border-border bg-muted/50 font-medium"
export const dataTableBodyRowClass = "border-b border-border hover:bg-muted/20"
export const dataTableBodyRowInteractiveClass =
  "group cursor-pointer border-b border-border hover:bg-muted/20"
/** Columnas secundarias que abren tooltips / invitan a inspección. */
export const dataTableInteractiveTailClass =
  "text-xs font-normal text-muted-foreground transition-colors hover:text-foreground"

export const dataTableFirstHeadClass = "pl-6"
export const dataTableLastHeadClass = "pr-6"
export const dataTableFirstCellClass = "py-3 pl-6 pr-4 align-middle"
export const dataTableCellClass = "px-4 py-3 align-middle"
export const dataTableLastCellClass = "py-3 pl-4 pr-6 align-middle"

/* ============================================================================
 * navigation-patterns — convención navegación vs filtrado
 * ========================================================================== */

/**
 * - `SectionTopTabs` / big-pill = navegación PRIMARIA entre rutas (cada tab es un `href`).
 * - `PillFilter` / `PillFilterMulti` = filtros IN-PAGE (misma URL, subset de filas).
 * Evitá controles tipo pill para navegar entre rutas salvo que sean `Link`s reales.
 */
export const pageTopChromeClass = "page-top-chrome"
/** Usar en `.page-header` cuando es el sibling directo bajo los tabs en `page-top-chrome`. */
export const pageHeaderAfterTopChromeClass = "page-header--after-top-chrome"

/* ============================================================================
 * compact-field-selector — Status/Priority editables en side-modals
 *   Status y Priority comparten geometría sin comunicar que comparten semántica.
 * ========================================================================== */

/** Frame visual fijo de 128 × 32px. Montarlo dentro de una fila de al menos 44px. */
export const compactFieldSelectorClass =
  "relative inline-flex box-border h-8 min-h-8 w-32 min-w-32 max-w-32 items-center gap-2 rounded-full border border-border bg-transparent px-3 text-xs font-medium leading-none text-foreground transition-colors hover:bg-muted/30 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background disabled:pointer-events-none disabled:opacity-50 before:absolute before:-inset-y-1.5 before:inset-x-0 before:content-['']"

/** Preserva un target vertical efectivo de 44px para el control visual compacto. */
export const compactFieldSelectorRowClass =
  "flex min-h-11 min-w-0 items-center gap-2"

/** Aplicar al label visible; el nombre completo debe permanecer en title/aria-label. */
export const compactFieldSelectorLabelClass =
  "min-w-0 flex-1 truncate text-left"
