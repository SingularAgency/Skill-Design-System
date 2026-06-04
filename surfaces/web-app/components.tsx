"use client"

/**
 * Componentes propios del perfil WEB-APP / PRODUCTO de Singular.
 * Portados de v0-singular-stories-app (status-badge, pill-filter, empty-state,
 * side-modal-layout) y limpiados del vocabulario de dominio de Stories.
 *
 * Peer deps (proyecto shadcn): react, lucide-react, `@/components/ui/{badge,button}`
 * y `@/lib/utils` (cn = clsx + tailwind-merge). Los primitivos shadcn van estilados
 * con los tokens del DS (ver components/README.md). Cargá theme-app.css.
 *
 * NO incluye `KpiCard`/`KpiRow` (acoplados a settings-context en Stories) ni los
 * modales de entidad (lógica de negocio) — ver guide.md.
 */

import { type ReactNode, useCallback, useEffect, useLayoutEffect, useRef, useState } from "react"
import {
  CheckCircle2Icon, ClockIcon, AlertTriangleIcon,
  InboxIcon, SearchIcon, CheckCircleIcon, type LucideIcon,
} from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

/* ============================================================================
 * StatusBadge — display unificado de estado (5 familias semánticas)
 *   Verde/Success · Amarillo/Warning · Rojo/Error · Azul/Info · Gris/Neutral
 *   Los colores de marca salen de los tokens `singular-*` del DS.
 * ========================================================================== */

export type StatusVariant =
  | "healthy" | "active" | "completed" | "approved" | "paid"   // Success
  | "warning" | "attention" | "pending" | "in-review"          // Warning
  | "error" | "at-risk" | "blocked" | "critical"               // Error
  | "info" | "in-progress" | "testing"                         // Info
  | "neutral" | "draft" | "archived"                           // Neutral

export type StatusSize = "sm" | "md" | "lg"

const statusStyles: Record<StatusVariant, string> = {
  healthy: "border-singular-cyan text-singular-cyan",
  active: "border-emerald-500/50 text-emerald-400",
  completed: "border-emerald-500/50 text-emerald-400",
  approved: "border-emerald-500/50 text-emerald-400",
  paid: "border-emerald-500/50 text-emerald-400",
  warning: "border-singular-yellow/60 text-singular-yellow",
  attention: "border-singular-yellow/60 text-singular-yellow",
  pending: "border-amber-500/50 text-amber-400",
  "in-review": "border-amber-500/50 text-amber-400",
  error: "border-singular-red/60 text-singular-red",
  "at-risk": "border-singular-red/60 text-singular-red",
  blocked: "border-destructive/60 text-destructive",
  critical: "border-destructive/60 text-destructive",
  info: "border-singular-blue/50 text-singular-blue",
  "in-progress": "border-primary/50 text-primary",
  testing: "border-singular-blue/50 text-singular-blue",
  neutral: "border-border text-muted-foreground",
  draft: "border-border text-muted-foreground",
  archived: "border-border text-muted-foreground",
}

const filledStatusStyles: Record<StatusVariant, string> = {
  healthy: "bg-singular-cyan/15 text-singular-cyan border-singular-cyan/30",
  active: "bg-emerald-500/15 text-emerald-400 border-emerald-500/30",
  completed: "bg-emerald-500/15 text-emerald-400 border-emerald-500/30",
  approved: "bg-emerald-500/15 text-emerald-400 border-emerald-500/30",
  paid: "bg-emerald-500/15 text-emerald-400 border-emerald-500/30",
  warning: "bg-singular-yellow/15 text-singular-yellow border-singular-yellow/30",
  attention: "bg-singular-yellow/15 text-singular-yellow border-singular-yellow/30",
  pending: "bg-amber-500/15 text-amber-400 border-amber-500/30",
  "in-review": "bg-amber-500/15 text-amber-400 border-amber-500/30",
  error: "bg-singular-red/15 text-singular-red border-singular-red/30",
  "at-risk": "bg-singular-red/15 text-singular-red border-singular-red/30",
  blocked: "bg-destructive/15 text-destructive border-destructive/30",
  critical: "bg-destructive/15 text-destructive border-destructive/30",
  info: "bg-singular-blue/15 text-singular-blue border-singular-blue/30",
  "in-progress": "bg-primary/15 text-primary border-primary/30",
  testing: "bg-singular-blue/15 text-singular-blue border-singular-blue/30",
  neutral: "bg-muted text-muted-foreground border-border",
  draft: "bg-muted text-muted-foreground border-border",
  archived: "bg-muted text-muted-foreground border-border",
}

const sizeStyles: Record<StatusSize, string> = {
  sm: "text-[0.625rem] px-1.5 py-0.5",
  md: "text-xs px-2 py-0.5",
  lg: "text-sm px-3 py-1",
}

const iconSizes: Record<StatusSize, string> = { sm: "size-2.5", md: "size-3", lg: "size-3.5" }

function getStatusIcon(status: StatusVariant, size: StatusSize) {
  const iconClass = cn(iconSizes[size], "mr-1")
  switch (status) {
    case "healthy": case "active": case "completed": case "approved": case "paid":
      return <CheckCircle2Icon className={iconClass} />
    case "warning": case "attention": case "pending": case "in-review":
      return <ClockIcon className={iconClass} />
    case "error": case "at-risk": case "blocked": case "critical":
      return <AlertTriangleIcon className={iconClass} />
    default:
      return null
  }
}

function formatStatusLabel(status: StatusVariant): string {
  return status.split("-").map((w) => w.charAt(0).toUpperCase() + w.slice(1)).join(" ")
}

export interface StatusBadgeProps {
  status: StatusVariant
  /** Label custom; default = nombre del status capitalizado. */
  label?: string
  size?: StatusSize
  showIcon?: boolean
  /** Estilo con relleno en vez de outline. */
  filled?: boolean
  className?: string
}

export function StatusBadge({ status, label, size = "md", showIcon = false, filled = false, className }: StatusBadgeProps) {
  const displayLabel = label ?? formatStatusLabel(status)
  const styles = filled ? filledStatusStyles[status] : statusStyles[status]
  return (
    <Badge variant="outline" className={cn("shrink-0 gap-0", styles, sizeStyles[size], className)}>
      {showIcon && getStatusIcon(status, size)}
      {displayLabel}
    </Badge>
  )
}

/** Mapea strings libres ("on track", "done", "in_qa"…) a un StatusVariant. */
export function mapToStatusVariant(status: string): StatusVariant {
  const normalized = status.toLowerCase().replace(/[\s_]/g, "-")
  if (normalized in statusStyles) return normalized as StatusVariant
  const mappings: Record<string, StatusVariant> = {
    "on-track": "healthy", "on-time": "healthy", success: "completed", done: "completed",
    accepted: "approved", authorized: "approved", waiting: "pending", review: "in-review",
    "in-qa": "testing", qa: "testing", stuck: "blocked", high: "warning", medium: "attention",
    low: "neutral", ideation: "draft", planning: "draft",
  }
  return mappings[normalized] ?? "neutral"
}

/* — Severity / Priority (QA · Stories) — */
export type SeverityLevel = "critical" | "high" | "medium" | "low"
export type PriorityLevel = "urgent" | "high" | "medium" | "low"

const levelStyles = {
  urgent: "bg-destructive/15 text-destructive border-destructive/30",
  critical: "bg-destructive/15 text-destructive border-destructive/30",
  high: "bg-singular-coral/15 text-singular-coral border-singular-coral/30",
  medium: "bg-singular-yellow/15 text-singular-yellow border-singular-yellow/30",
  low: "bg-muted text-muted-foreground border-border",
} as const

export function SeverityBadge({ severity, size = "md", className }: { severity: SeverityLevel; size?: StatusSize; className?: string }) {
  return (
    <Badge variant="outline" className={cn("shrink-0", levelStyles[severity], sizeStyles[size], className)}>
      {severity.charAt(0).toUpperCase() + severity.slice(1)}
    </Badge>
  )
}

export function PriorityBadge({ priority, size = "md", className }: { priority: PriorityLevel; size?: StatusSize; className?: string }) {
  return (
    <Badge variant="outline" className={cn("shrink-0", levelStyles[priority], sizeStyles[size], className)}>
      {priority.charAt(0).toUpperCase() + priority.slice(1)}
    </Badge>
  )
}

/* ============================================================================
 * PillFilter — filtros IN-PAGE (no navegación; para rutas usá SectionTopTabs)
 *   Single / Multi / Switcher. Scroll horizontal con fades en los bordes.
 * ========================================================================== */

export interface FilterOption {
  value?: string
  label: string
  count?: number
}

/** Geometría base de la pill (exportada para callers con aria custom). */
export const pillBase =
  "shrink-0 whitespace-nowrap px-4 py-1.5 text-xs font-medium rounded-full border transition-colors uppercase"
export const pillFilterSectionLabelClass = "text-xs font-medium uppercase tracking-wider text-foreground"
export const pillUnselectedClass =
  "bg-transparent border-border/70 text-muted-foreground hover:border-primary/45 hover:bg-muted/25 hover:text-foreground"
export const pillSelectedClass = "bg-primary border-primary text-primary-foreground shadow-sm"
export const clearFiltersButtonClass =
  "inline-flex items-center gap-1.5 rounded-md px-0.5 py-0.5 text-xs font-medium uppercase tracking-wider text-accent-foreground transition-colors hover:text-accent-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background"

const labelClass = pillFilterSectionLabelClass
const filterLabelButtonClass =
  "inline-flex items-center gap-2 rounded-md px-0.5 py-0.5 text-xs font-medium uppercase tracking-wider transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background"
const filterLabelButtonActiveClass = "text-accent-foreground hover:text-accent-foreground"
const filterLabelButtonInactiveClass = "text-primary hover:text-accent-foreground"
const filterActiveDotClass = "size-2 shrink-0 rounded-full bg-primary"

/**
 * Coloreo opcional por estado (`useStatusColors`). Genérico, derivado de
 * `mapToStatusVariant` (sin el status-config de dominio de Stories): la pill
 * seleccionada toma el relleno de su familia semántica.
 */
export const statusColors = filledStatusStyles
export function getStatusColorKey(raw: string): StatusVariant { return mapToStatusVariant(raw) }

function PillFilterScrollTrack({ children, scrollKey }: { children: ReactNode; scrollKey: string | number }) {
  const scrollRef = useRef<HTMLDivElement>(null)
  const [fades, setFades] = useState({ left: false, right: false })

  const updateFades = useCallback(() => {
    const el = scrollRef.current
    if (!el) return
    const { scrollLeft, scrollWidth, clientWidth } = el
    const maxScroll = scrollWidth - clientWidth
    const epsilon = 2
    setFades({ left: scrollLeft > epsilon, right: maxScroll > epsilon && scrollLeft < maxScroll - epsilon })
  }, [])

  useLayoutEffect(() => {
    updateFades()
    const el = scrollRef.current
    if (!el) return
    const ro = new ResizeObserver(() => requestAnimationFrame(updateFades))
    ro.observe(el)
    return () => ro.disconnect()
  }, [updateFades, scrollKey])

  return (
    <div className="relative min-w-0 w-full">
      <div
        ref={scrollRef}
        role="presentation"
        onScroll={updateFades}
        className={cn(
          "-my-1.5 flex flex-nowrap gap-s overflow-x-auto overflow-y-hidden py-1.5 scrollbar-subtle",
          "[&::-webkit-scrollbar]:h-1.5 [&::-webkit-scrollbar]:w-1.5",
        )}
      >
        {children}
      </div>
      {fades.left && (
        <div aria-hidden className="pointer-events-none absolute inset-y-0 left-0 z-[1] w-12 bg-gradient-to-r from-background from-25% via-background/80 to-transparent" />
      )}
      {fades.right && (
        <div aria-hidden className="pointer-events-none absolute inset-y-0 right-0 z-[1] w-12 bg-gradient-to-l from-background from-25% via-background/80 to-transparent" />
      )}
    </div>
  )
}

function optionValueOf(option: FilterOption, index: number): string {
  return (option.value ?? option.label ?? "").trim() || `__idx-${index}`
}

function getOptionClasses(option: FilterOption, index: number, isSelected: boolean, useStatusColors: boolean) {
  if (!useStatusColors) return isSelected ? pillSelectedClass : pillUnselectedClass
  const colorKey = getStatusColorKey(optionValueOf(option, index))
  if (isSelected) return statusColors[colorKey] || pillSelectedClass
  return pillUnselectedClass
}

function PillFilterOptionsRow({
  label, options, className, useStatusColors = false, isSelected, onSelect,
}: {
  label?: string; options: FilterOption[]; className?: string; useStatusColors?: boolean
  isSelected: (value: string) => boolean; onSelect: (value: string) => void
}) {
  const scrollKey = options.map((o, i) => optionValueOf(o, i)).join("|")
  return (
    <div className={cn(label && "flex flex-col gap-s", className)}>
      {label ? <span className={labelClass}>{label}</span> : null}
      <PillFilterScrollTrack scrollKey={scrollKey}>
        {options.map((option, index) => {
          const optionValue = optionValueOf(option, index)
          return (
            <button
              key={`pill-${label ?? "filter"}-${optionValue}-${index}`}
              type="button"
              onClick={() => onSelect(optionValue)}
              className={cn(pillBase, getOptionClasses(option, index, isSelected(optionValue), useStatusColors))}
            >
              {option.label}
            </button>
          )
        })}
      </PillFilterScrollTrack>
    </div>
  )
}

/** Filtro single-select. */
export function PillFilter({
  label, options, selected, onSelect, className, useStatusColors = false,
}: {
  label?: string; options: FilterOption[]; selected: string
  onSelect: (value: string) => void; className?: string; useStatusColors?: boolean
}) {
  return (
    <PillFilterOptionsRow
      label={label} options={options} className={className} useStatusColors={useStatusColors}
      isSelected={(value) => selected === value} onSelect={onSelect}
    />
  )
}

/** Filtro multi-select (con valor "ALL" que limpia la selección). */
export function PillFilterMulti({
  label, options, selected, onSelect, allValue = "ALL", className, useStatusColors = false,
}: {
  label: string; options: FilterOption[]; selected: string[]
  onSelect: (values: string[]) => void; allValue?: string; className?: string; useStatusColors?: boolean
}) {
  const handleToggle = (value: string) => {
    if (value === allValue) { onSelect([allValue]); return }
    const withoutAll = selected.filter((s) => s !== allValue)
    if (withoutAll.includes(value)) {
      const next = withoutAll.filter((s) => s !== value)
      onSelect(next.length === 0 ? [allValue] : next)
    } else {
      onSelect([...withoutAll, value])
    }
  }
  return (
    <PillFilterOptionsRow
      label={label} options={options} className={className} useStatusColors={useStatusColors}
      isSelected={(value) => selected.includes(value)} onSelect={handleToggle}
    />
  )
}

export type PillFilterSwitcherSingle = {
  key: string; label: string; options: FilterOption[]; selected: string
  onSelect: (value: string) => void; defaultValue?: string; useStatusColors?: boolean; type?: "single"
}
export type PillFilterSwitcherMulti = {
  key: string; label: string; options: FilterOption[]; selected: string[]
  onSelect: (values: string[]) => void; allValue?: string; defaultValue?: string[]; useStatusColors?: boolean; type: "multi"
}
export type PillFilterSwitcherItem = PillFilterSwitcherSingle | PillFilterSwitcherMulti

function normalizeMultiSelection(values: string[], allValue: string) {
  const normalized = Array.from(new Set(values))
  if (normalized.length === 0) return [allValue]
  if (normalized.includes(allValue) && normalized.length > 1) return normalized.filter((v) => v !== allValue)
  return normalized
}
function arraysMatch(left: string[], right: string[]) {
  return left.length === right.length && left.every((v, i) => v === right[i])
}
function getDefaultActiveFilterKey(filters: PillFilterSwitcherItem[], preferredKey?: string) {
  if (preferredKey && filters.some((f) => f.key === preferredKey)) return preferredKey
  const statusFilter = filters.find((f) => f.key.toLowerCase() === "status")
  return statusFilter?.key ?? filters[0]?.key ?? ""
}
function isFilterDirty(filter: PillFilterSwitcherItem) {
  if (filter.type === "multi") {
    const allValue = filter.allValue ?? "ALL"
    return !arraysMatch(normalizeMultiSelection(filter.selected, allValue), normalizeMultiSelection(filter.defaultValue ?? [allValue], allValue))
  }
  const defaultValue = filter.defaultValue ?? optionValueOf(filter.options[0] ?? { label: "" }, 0)
  return filter.selected !== defaultValue
}

/**
 * Conmuta entre varias categorías de filtro (tabs de label arriba + panel de pills
 * abajo). `trailing` = slot derecho en la MISMA fila de pills (ej. ViewSelector,
 * acciones de grid) que no participa del scroll.
 */
export function PillFilterSwitcher({
  filters, className, defaultActiveKey, clearLabel = "Clear filters", onClear, trailing,
}: {
  filters: PillFilterSwitcherItem[]; className?: string; defaultActiveKey?: string
  clearLabel?: string; onClear?: () => void; trailing?: ReactNode
}) {
  const resolvedDefaultActiveKey = getDefaultActiveFilterKey(filters, defaultActiveKey)
  const [activeKey, setActiveKey] = useState(resolvedDefaultActiveKey)

  useEffect(() => {
    setActiveKey((current) => (filters.some((f) => f.key === current) ? current : resolvedDefaultActiveKey))
  }, [filters, resolvedDefaultActiveKey])

  const activeFilter = filters.find((f) => f.key === activeKey) ?? filters.find((f) => f.key === resolvedDefaultActiveKey)
  const hasDirtyFilters = filters.some(isFilterDirty)

  return (
    <div className={cn("flex min-w-0 flex-col gap-s", className)}>
      <div role="tablist" aria-label="Filter categories" className="flex flex-wrap items-center gap-x-m gap-y-s">
        {filters.map((filter) => {
          const isActive = filter.key === activeFilter?.key
          return (
            <button
              key={filter.key}
              id={`pill-filter-tab-${filter.key}`}
              type="button" role="tab" aria-selected={isActive} aria-controls={`pill-filter-panel-${filter.key}`}
              onClick={() => setActiveKey(filter.key)}
              className={cn(filterLabelButtonClass, isActive ? filterLabelButtonActiveClass : filterLabelButtonInactiveClass)}
            >
              <span>{filter.label}</span>
              {isFilterDirty(filter) ? <span aria-hidden className={filterActiveDotClass} /> : null}
            </button>
          )
        })}
        {hasDirtyFilters && onClear ? (
          <button type="button" onClick={() => { onClear(); setActiveKey(resolvedDefaultActiveKey) }} className={clearFiltersButtonClass}>
            {clearLabel}
          </button>
        ) : null}
      </div>

      {activeFilter ? (
        <div
          id={`pill-filter-panel-${activeFilter.key}`}
          role="tabpanel" aria-labelledby={`pill-filter-tab-${activeFilter.key}`}
          className={cn("min-w-0", trailing && "flex items-center gap-m")}
        >
          <div className="min-w-0 flex-1">
            {activeFilter.type === "multi" ? (
              <PillFilterOptionsRow
                options={activeFilter.options} useStatusColors={activeFilter.useStatusColors}
                isSelected={(value) => activeFilter.selected.includes(value)}
                onSelect={(value) => {
                  const allValue = activeFilter.allValue ?? "ALL"
                  if (value === allValue) { activeFilter.onSelect([allValue]); return }
                  const withoutAll = activeFilter.selected.filter((s) => s !== allValue)
                  if (withoutAll.includes(value)) {
                    const next = withoutAll.filter((s) => s !== value)
                    activeFilter.onSelect(next.length === 0 ? [allValue] : next)
                    return
                  }
                  activeFilter.onSelect([...withoutAll, value])
                }}
              />
            ) : (
              <PillFilterOptionsRow
                options={activeFilter.options} useStatusColors={activeFilter.useStatusColors}
                isSelected={(value) => activeFilter.selected === value} onSelect={activeFilter.onSelect}
              />
            )}
          </div>
          {trailing ? <div className="shrink-0 flex items-center gap-s">{trailing}</div> : null}
        </div>
      ) : null}
    </div>
  )
}

/* ============================================================================
 * EmptyState / TableEmptyState — estados vacíos unificados (variantes genéricas)
 * ========================================================================== */

export type EmptyStateVariant = "no-data" | "no-results" | "all-done" | "error" | "custom"

const variantConfig: Record<Exclude<EmptyStateVariant, "custom">, { icon: LucideIcon; title: string; description: string }> = {
  "no-data": { icon: InboxIcon, title: "No data yet", description: "There is no data to display at this time." },
  "no-results": { icon: SearchIcon, title: "No results found", description: "Try adjusting your filters or search criteria." },
  "all-done": { icon: CheckCircleIcon, title: "All caught up!", description: "There are no pending items requiring your attention." },
  error: { icon: AlertTriangleIcon, title: "Something went wrong", description: "We encountered an error loading this data." },
}

const emptySizeStyles = {
  sm: { container: "py-6", icon: "size-8", title: "text-sm", description: "text-xs", gap: "gap-2" },
  md: { container: "py-10", icon: "size-12", title: "text-base", description: "text-sm", gap: "gap-3" },
  lg: { container: "py-16", icon: "size-16", title: "text-lg", description: "text-base", gap: "gap-4" },
}

export interface EmptyStateProps {
  variant?: EmptyStateVariant
  /** Ícono custom (usado cuando variant="custom"). */
  icon?: LucideIcon
  title?: string
  description?: string
  action?: { label: string; onClick: () => void }
  secondaryAction?: { label: string; onClick: () => void }
  children?: ReactNode
  size?: "sm" | "md" | "lg"
  className?: string
}

export function EmptyState({
  variant = "no-data", icon: CustomIcon, title: customTitle, description: customDescription,
  action, secondaryAction, children, size = "md", className,
}: EmptyStateProps) {
  const config = variant !== "custom" ? variantConfig[variant] : null
  const Icon = CustomIcon ?? config?.icon ?? InboxIcon
  const title = customTitle ?? config?.title ?? "No data"
  const description = customDescription ?? config?.description ?? ""
  const styles = emptySizeStyles[size]
  return (
    <div className={cn("flex flex-col items-center justify-center text-center", styles.container, styles.gap, className)}>
      <div className="rounded-full bg-muted/50 p-4">
        <Icon className={cn(styles.icon, "text-muted-foreground")} />
      </div>
      <div className={cn("space-y-1", styles.gap)}>
        <h3 className={cn("font-semibold text-foreground", styles.title)}>{title}</h3>
        <p className={cn("text-muted-foreground max-w-sm", styles.description)}>{description}</p>
      </div>
      {children}
      {(action || secondaryAction) && (
        <div className="flex items-center gap-3 mt-2">
          {action && <Button onClick={action.onClick} size={size === "sm" ? "sm" : "default"}>{action.label}</Button>}
          {secondaryAction && (
            <Button variant="outline" onClick={secondaryAction.onClick} size={size === "sm" ? "sm" : "default"}>{secondaryAction.label}</Button>
          )}
        </div>
      )}
    </div>
  )
}

/** EmptyState para usar dentro de una tabla (ocupa una fila a colSpan). */
export function TableEmptyState({
  colSpan, variant = "no-results", title, description, className,
}: {
  colSpan: number; variant?: EmptyStateVariant; title?: string; description?: string; className?: string
}) {
  return (
    <tr>
      <td colSpan={colSpan} className={cn("py-8", className)}>
        <EmptyState variant={variant} title={title} description={description} size="sm" />
      </td>
    </tr>
  )
}

/* ============================================================================
 * side-modal-layout — andamiaje de los side-modals (el patrón es universal)
 * ========================================================================== */

/** Padding horizontal/vertical para regiones scrolleables del side modal. */
export const sideModalBodyPaddingClass = "px-5 py-6 sm:py-10"

/** Columna scrolleable del contenido del sheet (ritmo vertical por tokens). */
export function SideModalScrollBody({
  children, className, variant = "default",
}: {
  children: ReactNode; className?: string; variant?: "default" | "compact"
}) {
  return (
    <div className={cn("min-h-0 flex-1 overflow-y-auto", className)}>
      <div className={cn(sideModalBodyPaddingClass, "flex min-w-0 flex-col", variant === "compact" ? "gap-3" : "gap-4")}>
        {children}
      </div>
    </div>
  )
}

/** Bloque no-colapsable: título de sección + contenido apilado. */
export function SideModalStaticSection({
  title, children, className, titleAs: TitleTag = "h3",
}: {
  title: string; children: ReactNode; className?: string; titleAs?: "h2" | "h3"
}) {
  return (
    <section className={cn("stack-md min-w-0", className)}>
      <TitleTag className="grid-section-title">{title}</TitleTag>
      <div className="stack-md">{children}</div>
    </section>
  )
}
