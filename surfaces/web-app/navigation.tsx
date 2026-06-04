"use client"

/**
 * Sistema de navegación del perfil WEB-APP / PRODUCTO de Singular.
 *
 * Portado de v0-singular-stories-app (sidebar-shell, app-header, section-top-tabs,
 * page-header, floating-sidebar-context, sidebar-*-wrapper, powered-by-footer) y
 * DESACOPLADO de Next/contexts para que sea reutilizable en cualquier app React:
 *
 *  - Router-agnóstico: pasás un `linkComponent` (default `<a>`) y el `pathname`
 *    actual por props. Sin `next/link` ni `next/navigation`.
 *  - Sin secretos ni datos de Stories: el header recibe search / theme / notif /
 *    avatar como slots (props), no lee contexts de usuario o notificaciones.
 *  - Tokenizado: todo el chrome usa tokens del DS (--header-well-bg,
 *    --sidebar-nav-active/-hover, --sidebar-primary, --header-search-*,
 *    --section-tabs-*). El estado activo es `bg-[var(--sidebar-nav-active)]` +
 *    `text-sidebar-primary`.
 *
 * Requiere: `theme-app.css` + `web-app.css` (clases .page-top-chrome, etc.) y un
 * runtime Tailwind v4. Peer deps: react, lucide-react. (Trae un `cn` local mínimo;
 * en un proyecto shadcn reemplazalo por el `cn` de `@/lib/utils`.)
 *
 * Anatomía del shell (ver guide.md → "Sistema de navegación"):
 *   <FloatingSidebarProvider>
 *     <SidebarShell .../>            // rail flotante: cuadrado de logo (toggle) + íconos
 *     <AppHeaderShell left={<SearchPill/>} center={<SectionTopTabs/>} right={...}/>
 *     <SidebarContentWrapper>        // offset para despejar rail + header
 *       <PageHeader .../> ...contenido...
 *     </SidebarContentWrapper>
 *     <PoweredByFooter logo={<Logo/>}/>
 *   </FloatingSidebarProvider>
 */

import * as React from "react"
import { MenuIcon, XIcon, UserIcon } from "lucide-react"
import { bigPillTabsContainerClass, getBigPillTabClass, getBigPillTabCountClass, type BigPillTabTone } from "./patterns"

/* — util mínima de clases (reemplazable por el `cn` de @/lib/utils en shadcn) — */
function cn(...parts: Array<string | false | null | undefined>): string {
  return parts.filter(Boolean).join(" ")
}

/* ── Link inyectable ─────────────────────────────────────────────────────────
 * Por defecto un `<a>`. Pasá tu `<Link>` (Next / React Router / wouter) vía la
 * prop `linkComponent` para SPA-navigation. Debe aceptar `href` + `className` +
 * `children` + `onClick`.
 */
export type NavLinkProps = {
  href: string
  className?: string
  children: React.ReactNode
  onClick?: () => void
  "aria-label"?: string
  "aria-current"?: React.AriaAttributes["aria-current"]
}
export type NavLinkComponent = React.ComponentType<NavLinkProps>
const DefaultLink: NavLinkComponent = ({ href, children, ...rest }) => (
  <a href={href} {...rest}>{children}</a>
)

/* ============================================================================
 * 1. FloatingSidebarProvider — estado colapsado del rail (persistido)
 * ========================================================================== */

const SIDEBAR_STORAGE_KEY = "floating-sidebar-collapsed"

type FloatingSidebarContextProps = {
  collapsed: boolean
  setCollapsed: (collapsed: boolean) => void
  toggleCollapsed: () => void
  isHovering: boolean
  setIsHovering: (hovering: boolean) => void
}

const FloatingSidebarContext = React.createContext<FloatingSidebarContextProps | null>(null)

/** Devuelve defaults seguros si se usa fuera del provider (SSR / componentes sueltos). */
export function useFloatingSidebar(): FloatingSidebarContextProps {
  const context = React.useContext(FloatingSidebarContext)
  if (!context) {
    return {
      collapsed: false,
      setCollapsed: () => {},
      toggleCollapsed: () => {},
      isHovering: false,
      setIsHovering: () => {},
    }
  }
  return context
}

export function FloatingSidebarProvider({ children }: { children: React.ReactNode }) {
  const [collapsed, setCollapsedState] = React.useState(false)
  const [isHovering, setIsHovering] = React.useState(false)

  React.useEffect(() => {
    const stored = typeof window !== "undefined" ? localStorage.getItem(SIDEBAR_STORAGE_KEY) : null
    if (stored !== null) setCollapsedState(stored === "true")
  }, [])

  const setCollapsed = React.useCallback((value: boolean) => {
    setCollapsedState(value)
    if (typeof window !== "undefined") localStorage.setItem(SIDEBAR_STORAGE_KEY, String(value))
  }, [])

  const toggleCollapsed = React.useCallback(() => setCollapsed(!collapsed), [collapsed, setCollapsed])

  return (
    <FloatingSidebarContext.Provider value={{ collapsed, setCollapsed, toggleCollapsed, isHovering, setIsHovering }}>
      {children}
    </FloatingSidebarContext.Provider>
  )
}

/* ============================================================================
 * 2. SidebarShell — rail flotante glass (cuadrado de logo + íconos) + drawer mobile
 * ========================================================================== */

export type SidebarNavIcon = React.ComponentType<{ className?: string }>

export type SidebarNavItem = {
  title: string
  href: string
  icon: SidebarNavIcon
}

export type SidebarNavSection = {
  items: SidebarNavItem[]
  /** Divider después de la sección (regla en desktop / borde en mobile). */
  showDividerAfter?: boolean
}

export interface SidebarShellProps {
  /** Ruta actual — para resolver el item activo (sin `usePathname`). */
  pathname: string
  homeHref: string
  navAriaLabel: string
  sections: SidebarNavSection[]
  isItemActive: (href: string, pathname: string) => boolean
  /** Link de la app (SPA-aware). Default: `<a>`. */
  linkComponent?: NavLinkComponent
  /** Item Profile al pie del rail (omitir para esconderlo). */
  profileHref?: string
  /** Mostrar punto rojo de notificación en un item. */
  hasItemNotification?: (item: SidebarNavItem) => boolean
  /** Items extra al pie (entre la nav y Profile). */
  beforeProfileNavItems?: SidebarNavItem[]
  /** White-label: imagen de logo → iniciales → slot `brand` → tile gradiente. */
  brandLogoUrl?: string | null
  brandInitials?: string
  /** Nodo de marca (ej. `<Logo/>`) usado cuando no hay url/iniciales. */
  brand?: React.ReactNode
}

const desktopLinkLabelClass = "text-[0.625rem] font-medium text-center leading-tight"

function RailLink({
  href, title, icon: Icon, active, badge, linkComponent: Link = DefaultLink, onClick,
}: {
  href: string; title: string; icon: SidebarNavIcon; active: boolean
  badge?: boolean; linkComponent?: NavLinkComponent; onClick?: () => void
}) {
  return (
    <Link
      href={href}
      onClick={onClick}
      aria-current={active ? "page" : undefined}
      className={cn(
        "flex w-full flex-col items-center justify-center py-2.5 rounded-lg transition-all duration-200",
        active
          ? "bg-[var(--sidebar-nav-active)] text-sidebar-primary"
          : "text-sidebar-foreground/60 hover:bg-[var(--sidebar-nav-hover)] hover:text-sidebar-foreground",
      )}
    >
      <span className={badge ? "relative" : undefined}>
        <Icon className={cn("size-5 mb-1 transition-colors", active ? "text-sidebar-primary" : "text-current")} />
        {badge ? <span className="absolute -top-0.5 -right-0.5 size-2 rounded-full bg-red-500 motion-safe:animate-pulse" /> : null}
      </span>
      <span className={cn(desktopLinkLabelClass, active ? "text-sidebar-primary" : "text-current")}>{title}</span>
    </Link>
  )
}

function DrawerLink({
  href, title, icon: Icon, active, badge, onNavigate, linkComponent: Link = DefaultLink,
}: {
  href: string; title: string; icon: SidebarNavIcon; active: boolean
  badge?: boolean; onNavigate: () => void; linkComponent?: NavLinkComponent
}) {
  return (
    <Link
      href={href}
      onClick={onNavigate}
      aria-current={active ? "page" : undefined}
      className={cn(
        "flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-200",
        active
          ? "bg-[var(--sidebar-nav-active)] text-sidebar-primary"
          : "text-sidebar-foreground/70 hover:bg-[var(--sidebar-nav-hover)] hover:text-sidebar-foreground",
      )}
    >
      <span className={badge ? "relative" : undefined}>
        <Icon className="size-5" />
        {badge ? <span className="absolute -top-1 -right-1 size-2.5 rounded-full bg-red-500 motion-safe:animate-pulse" /> : null}
      </span>
      <span className="text-sm font-medium">{title}</span>
    </Link>
  )
}

export function SidebarShell({
  pathname, homeHref, navAriaLabel, sections, isItemActive,
  linkComponent: Link = DefaultLink, profileHref, hasItemNotification,
  beforeProfileNavItems, brandLogoUrl, brandInitials, brand,
}: SidebarShellProps) {
  const [mobileOpen, setMobileOpen] = React.useState(false)
  const { collapsed, toggleCollapsed, isHovering, setIsHovering } = useFloatingSidebar()
  const closeMobile = () => setMobileOpen(false)
  const showNav = !collapsed || isHovering
  const showProfileLink = Boolean(profileHref)

  /** Marca: imagen → iniciales → slot `brand` → tile gradiente (fallback chain). */
  const BrandMark = ({ size }: { size: "sm" | "lg" }) => {
    if (brandLogoUrl) {
      return (
        <img
          src={brandLogoUrl}
          alt="Company logo"
          className={size === "lg" ? "size-full object-contain p-2.5" : "h-8 w-auto max-w-[160px] rounded-md object-contain"}
        />
      )
    }
    if (brandInitials) {
      return (
        <span
          aria-hidden
          className={cn(
            "flex items-center justify-center rounded-xl bg-primary/15 font-bold text-primary select-none",
            size === "lg" ? "size-full text-lg tracking-wide" : "h-8 w-12 text-sm tracking-wider",
          )}
        >
          {brandInitials}
        </span>
      )
    }
    if (brand) return <span className="flex items-center justify-center">{brand}</span>
    return <span aria-hidden className="size-7 rounded-[10px] bg-[image:var(--gradient-primary)]" />
  }

  const allItems = [...sections.flatMap((s) => s.items), ...(beforeProfileNavItems ?? [])]

  return (
    <>
      {/* Mobile: botón menú + drawer (reemplaza shadcn Sheet, sin dependencias) */}
      <button
        type="button"
        onClick={() => setMobileOpen(true)}
        className="fixed left-4 top-4 z-50 inline-flex size-10 items-center justify-center rounded-full text-sidebar-foreground hover:bg-[var(--sidebar-nav-hover)] md:hidden"
        aria-label="Open menu"
      >
        <MenuIcon className="size-6" />
      </button>

      {mobileOpen ? (
        <div className="fixed inset-0 z-50 md:hidden" role="dialog" aria-modal="true" aria-label={navAriaLabel}>
          <button type="button" aria-label="Close menu" onClick={closeMobile} className="absolute inset-0 bg-black/50 backdrop-blur-sm" />
          <div className="absolute inset-y-0 left-0 flex w-72 max-w-[80vw] flex-col bg-sidebar shadow-xl">
            <div className="flex h-16 items-center justify-between border-b border-sidebar-border bg-[var(--header-well-bg)] px-6">
              <Link href={homeHref} onClick={closeMobile} aria-label="Go to home" className="inline-flex">
                <BrandMark size="sm" />
              </Link>
              <button type="button" onClick={closeMobile} aria-label="Close menu" className="inline-flex size-9 items-center justify-center rounded-full text-sidebar-foreground/70 hover:bg-[var(--sidebar-nav-hover)]">
                <XIcon className="size-5" />
              </button>
            </div>
            <nav className="flex flex-col gap-1 p-4" aria-label={navAriaLabel}>
              {sections.map((section, sIdx) => (
                <React.Fragment key={sIdx}>
                  {section.items.map((item) => (
                    <DrawerLink
                      key={item.href}
                      href={item.href} title={item.title} icon={item.icon}
                      active={isItemActive(item.href, pathname)} onNavigate={closeMobile}
                      badge={hasItemNotification?.(item) ?? false} linkComponent={Link}
                    />
                  ))}
                  {section.showDividerAfter ? <div className="my-2 mx-4 border-t border-sidebar-border" /> : null}
                </React.Fragment>
              ))}
              {beforeProfileNavItems?.map((item) => (
                <DrawerLink
                  key={item.href}
                  href={item.href} title={item.title} icon={item.icon}
                  active={isItemActive(item.href, pathname)} onNavigate={closeMobile}
                  badge={hasItemNotification?.(item) ?? false} linkComponent={Link}
                />
              ))}
            </nav>
          </div>
        </div>
      ) : null}

      {/* Desktop: rail flotante — logo separado de la nav */}
      <div
        className="hidden md:flex fixed left-10 top-10 z-40 flex-col items-center gap-5"
        aria-label={navAriaLabel}
        onMouseEnter={() => collapsed && setIsHovering(true)}
        onMouseLeave={() => setIsHovering(false)}
      >
        {/* Cuadrado de logo flotante — click togglea el rail */}
        <button
          type="button"
          onClick={toggleCollapsed}
          aria-label={collapsed ? "Show sidebar" : "Hide sidebar"}
          aria-expanded={!collapsed}
          className="flex size-[62px] items-center justify-center overflow-hidden rounded-[20px] bg-[var(--header-well-bg)]/60 shadow-lg backdrop-blur-md transition-all duration-200 hover:opacity-90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
        >
          <BrandMark size="lg" />
        </button>

        {/* Rail de navegación — se esconde al colapsar, reaparece en hover */}
        <aside
          className={cn(
            "flex w-[72px] flex-col rounded-[20px] bg-[var(--header-well-bg)]/60 shadow-lg backdrop-blur-md transition-all duration-300",
            showNav ? "opacity-100 translate-y-0 pointer-events-auto" : "opacity-0 -translate-y-2 pointer-events-none",
          )}
        >
          <nav className="flex-1 py-4 flex flex-col items-stretch w-full">
            <ul className="flex flex-col gap-1 px-2">
              {sections.map((section, sIdx) => (
                <React.Fragment key={sIdx}>
                  {section.items.map((item) => (
                    <li key={item.href}>
                      <RailLink
                        href={item.href} title={item.title} icon={item.icon}
                        active={isItemActive(item.href, pathname)}
                        badge={hasItemNotification?.(item) ?? false} linkComponent={Link}
                      />
                    </li>
                  ))}
                  {section.showDividerAfter ? <li className="w-10 mx-auto my-2 border-t border-sidebar-border" /> : null}
                </React.Fragment>
              ))}
            </ul>
          </nav>

          {(beforeProfileNavItems?.length || showProfileLink) && (
            <div className="py-4 flex flex-col gap-2 px-2 border-t border-sidebar-border">
              {beforeProfileNavItems?.map((item) => (
                <RailLink
                  key={item.href}
                  href={item.href} title={item.title} icon={item.icon}
                  active={isItemActive(item.href, pathname)}
                  badge={hasItemNotification?.(item) ?? false} linkComponent={Link}
                />
              ))}
              {showProfileLink && profileHref ? (
                <RailLink
                  href={profileHref} title="Profile" icon={UserIcon}
                  active={isItemActive(profileHref, pathname)} linkComponent={Link}
                />
              ) : null}
            </div>
          )}
        </aside>
      </div>
    </>
  )
}

/* ============================================================================
 * 3. AppHeaderShell + SearchPill — well frosteado fijo con zonas left/center/right
 * ========================================================================== */

export interface AppHeaderShellProps {
  /** Zona izquierda (típicamente `<SearchPill/>`). */
  left?: React.ReactNode
  /** Zona central (típicamente `<SectionTopTabs/>` / big-pill, visible en xl+). */
  center?: React.ReactNode
  /** Cluster derecho: theme toggle, notificaciones, avatar (slots de la app). */
  right?: React.ReactNode
  className?: string
}

/**
 * Header well: fijo arriba, frosteado, offset a la izquierda para despejar el rail
 * (`md:left-[132px]`). El centro crece y empuja el cluster derecho al borde.
 */
export function AppHeaderShell({ left, center, right, className }: AppHeaderShellProps) {
  return (
    <header
      className={cn(
        "fixed left-0 right-0 top-0 z-30 flex h-16 items-center gap-2 bg-[var(--header-well-bg)]/60 px-4 backdrop-blur-md transition-all duration-300 ease-in-out",
        "md:left-[132px] md:right-10 md:top-10 md:h-[60px] md:rounded-[20px] md:shadow-lg md:pl-6 md:pr-5",
        className,
      )}
    >
      <div className="flex shrink-0 items-center gap-2">
        <div className="w-10 md:hidden" /> {/* spacer del botón menú mobile */}
        {left}
      </div>
      <div className="hidden min-w-0 flex-1 justify-center xl:flex">{center}</div>
      <div className="ml-auto flex shrink-0 items-center gap-2 md:gap-3 xl:ml-0">{right}</div>
    </header>
  )
}

export interface SearchPillProps {
  placeholder?: string
  /** Texto del atajo mostrado a la derecha (ej. "⌘K"). */
  shortcut?: React.ReactNode
  onClick?: () => void
  /** Estado abierto del command palette (mantiene la pill expandida). */
  open?: boolean
  className?: string
}

/**
 * Trigger de búsqueda: ícono-only por defecto; se expande a campo completo en hover
 * o cuando `open`. Sin lógica de command palette (pasá `onClick` para abrir el tuyo).
 */
export function SearchPill({ placeholder = "Jump to…", shortcut, onClick, open, className }: SearchPillProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      data-state={open ? "open" : "closed"}
      aria-label="Search"
      className={cn(
        "group relative flex h-10 w-10 items-center justify-center overflow-hidden rounded-full border text-muted-foreground transition-[width] duration-200 ease-out",
        "border-[color:var(--header-search-border)] bg-[var(--header-search-bg)] hover:bg-[var(--sidebar-nav-hover)] hover:text-sidebar-foreground",
        "xl:hover:w-56 xl:hover:justify-start xl:data-[state=open]:w-56 xl:data-[state=open]:justify-start",
        className,
      )}
    >
      <SearchGlyph className="size-4 shrink-0 transition-[margin] duration-200 xl:group-hover:mr-2 xl:group-data-[state=open]:mr-2" />
      <span className="hidden whitespace-nowrap text-sm xl:group-hover:inline xl:group-data-[state=open]:inline">{placeholder}</span>
      {shortcut ? (
        <span className="ml-auto hidden items-center gap-1 text-[0.625rem] text-muted-foreground/80 xl:group-hover:flex xl:group-data-[state=open]:flex">
          {shortcut}
        </span>
      ) : null}
    </button>
  )
}

function SearchGlyph({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <circle cx="11" cy="11" r="7" /><path d="m21 21-4.3-4.3" />
    </svg>
  )
}

/* ============================================================================
 * 4. SectionTopTabs / BigPillTabsNav — tabs de ruta "big pill"
 * ========================================================================== */

export interface SectionTab {
  label: string
  href: string
  count?: number
  countClassName?: string
  /** Tono. Si se omite, `"Active"` resuelve a `"emerald"` (regla "Active = live"). */
  tone?: BigPillTabTone
}

function resolveTabTone(tab: SectionTab): BigPillTabTone {
  if (tab.tone) return tab.tone
  if (tab.label === "Active") return "emerald"
  return "default"
}

/** Match por prefijo más largo (igual que Stories). */
export function defaultGetActiveHref(pathname: string, tabs: SectionTab[]): string | undefined {
  const normalized = pathname.replace(/\/$/, "") || "/"
  return tabs
    .filter((tab) => {
      const h = tab.href.replace(/\/$/, "") || "/"
      return normalized === h || normalized.startsWith(`${h}/`)
    })
    .sort((a, b) => b.href.length - a.href.length)[0]?.href
}

/** El row de pills en sí (sin chrome de layout). Reutilizable en header (xl+) e in-page. */
export function BigPillTabsNav({
  tabs, ariaLabel, activeHref, className, linkComponent: Link = DefaultLink,
}: {
  tabs: SectionTab[]; ariaLabel: string; activeHref?: string
  className?: string; linkComponent?: NavLinkComponent
}) {
  return (
    <nav className={cn(bigPillTabsContainerClass, className)} aria-label={ariaLabel}>
      {tabs.map((tab) => {
        const isActive = activeHref === tab.href
        const tone = resolveTabTone(tab)
        return (
          <Link key={tab.href} href={tab.href} className={getBigPillTabClass(isActive, undefined, tone)} aria-current={isActive ? "page" : undefined}>
            {tab.label}
            {tab.count !== undefined ? (
              <span className={getBigPillTabCountClass(isActive, tab.countClassName, tone)}>{tab.count}</span>
            ) : null}
          </Link>
        )
      })}
    </nav>
  )
}

export interface SectionTopTabsProps {
  tabs: SectionTab[]
  ariaLabel: string
  pathname: string
  className?: string
  linkComponent?: NavLinkComponent
  getActiveHref?: (pathname: string, tabs: SectionTab[]) => string | undefined
}

/**
 * Navegación primaria entre rutas hermanas (big pill, centrado). Para filtros
 * in-page usá `PillFilter` (ver components.tsx + navigation-patterns).
 * En xl+ podés montar `<BigPillTabsNav/>` dentro del slot `center` del header.
 */
export function SectionTopTabs({
  tabs, ariaLabel, pathname, className, linkComponent = DefaultLink, getActiveHref = defaultGetActiveHref,
}: SectionTopTabsProps) {
  const activeHref = getActiveHref(pathname, tabs)
  return (
    <div className={cn("flex w-full min-w-0 justify-center overflow-x-auto scrollbar-subtle", className)}>
      <BigPillTabsNav tabs={tabs} ariaLabel={ariaLabel} activeHref={activeHref} linkComponent={linkComponent} />
    </div>
  )
}

/* ============================================================================
 * 5. PageHeader — chrome estándar de página (title + subtitle + actions)
 * ========================================================================== */

export interface PageHeaderBackLink { href: string; label: string }

export interface PageHeaderProps {
  title: React.ReactNode
  subtitle?: React.ReactNode
  actions?: React.ReactNode
  kpiToggle?: React.ReactNode
  backLink?: PageHeaderBackLink
  linkComponent?: NavLinkComponent
  className?: string
}

export function PageHeader({
  title, subtitle, actions, kpiToggle, backLink, linkComponent: Link = DefaultLink, className,
}: PageHeaderProps) {
  const hasRight = actions || kpiToggle
  return (
    <header className={cn("page-header flex flex-col gap-m", className)}>
      {backLink ? (
        <Link href={backLink.href} className="inline-flex w-fit items-center gap-1.5 text-sm text-primary transition-colors hover:underline">
          <ArrowLeftGlyph className="size-3.5" />
          {backLink.label}
        </Link>
      ) : null}
      <div className="flex flex-col gap-m sm:flex-row sm:items-end sm:justify-between">
        <div className="min-w-0">
          <h1 className="page-title">{title}</h1>
          {subtitle ? <p className="page-subtitle">{subtitle}</p> : null}
        </div>
        {hasRight ? (
          <div className="flex shrink-0 flex-wrap items-center gap-s sm:justify-end">
            {actions}
            {kpiToggle}
          </div>
        ) : null}
      </div>
    </header>
  )
}

function ArrowLeftGlyph({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <path d="m12 19-7-7 7-7" /><path d="M19 12H5" />
    </svg>
  )
}

/* ============================================================================
 * 6. PoweredByFooter + SidebarContentWrapper — pie de marca + offset de contenido
 * ========================================================================== */

/** Pie fijo abajo-izquierda. Pasá tu `<Logo/>` (o cualquier nodo) por `logo`. */
export function PoweredByFooter({ logo, label = "Powered by" }: { logo: React.ReactNode; label?: string }) {
  return (
    <div className="pointer-events-none fixed bottom-12 left-10 z-30 hidden flex-col items-start gap-1 md:flex">
      <span className="text-[0.625rem] font-medium uppercase tracking-wide text-muted-foreground/50">{label}</span>
      {logo}
    </div>
  )
}

/**
 * Envuelve el contenido y aplica el offset para despejar rail (izq) + header (arriba).
 * Colapsado: el contenido recupera el ancho del rail.
 */
export function SidebarContentWrapper({ children, className }: { children: React.ReactNode; className?: string }) {
  const { collapsed } = useFloatingSidebar()
  return (
    <div
      className={cn(
        "pt-20 transition-all duration-300 ease-in-out md:pt-[92px]",
        collapsed ? "md:pl-10" : "md:pl-[132px]",
        className,
      )}
    >
      {children}
    </div>
  )
}
