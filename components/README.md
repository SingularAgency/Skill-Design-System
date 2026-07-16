# Componentes

Inventario de los componentes del DS, clasificados. La **API real** vive en cada perfil; acá está el mapa de qué es reutilizable universal vs específico de producto.

> Base común: **Tailwind v4 + shadcn/ui + lucide**. Núcleo shadcn (`ui/`) compartido por todas las superficies web.

## Código entregado (por perfil)
Los perfiles web entregan **código portable** (no solo docs), router-agnóstico y tokenizado:

| Perfil | Archivos |
|---|---|
| **web-app** | `surfaces/web-app/navigation.tsx` (sistema de navegación: SidebarShell, AppHeaderShell+SearchPill, SectionTopTabs/BigPillTabs, PageHeader, PoweredByFooter), `components.tsx` (StatusBadge/Severity/Priority, PillFilter*, EmptyState, side-modal), `patterns.ts` (big-pill-tabs, data-table-patterns), `web-app.css`. |
| **website-landing** | `surfaces/website-landing/primitives.tsx` + `website.css` (patrones promovidos desde `singular-landing`). |
| **studio** | `surfaces/studio/patterns.ts` + `studio.css` + `guide.md` (state model, chrome y layout opt-in chat/canvas/evidence). |
| **ios-app** | `surfaces/ios-app/SingularFoundation.swift` + `SingularPrimitives.swift` (tokens y primitivas SwiftUI portables). |

## CORE universal (cualquier superficie web)
| Familia | Componentes | Notas |
|---|---|---|
| Primitivos shadcn | `card`, `button`, `badge`, `input`, `select`, `dialog`, `sheet`, `tooltip`, `popover`, `dropdown-menu`, `tabs`, `table`… | Estilados con tokens del DS. |
| Estado | `StatusBadge`, `SeverityBadge`, `PriorityBadge` + `status-config` | 5 familias semánticas. |
| Vacíos | `EmptyState`, `TableEmptyState` | Variantes preset. |
| Cabeceras | `PageHeader`, `GridSectionHeader` | Genéricas (routing inyectable). |
| Filtros | `PillFilter`, `PillFilterMulti`, `PillFilterSwitcher` | El patrón de filtros del DS. |
| Tabs | `SectionTopTabs` / `big-pill-tabs` | "Big pill" de marca. |
| Branding | `Logo`, `SingularFullLogo`, `PoweredByFooter` | Theme-aware; assets → Fase 9. |
| Modales (andamiaje) | `side-modal-layout`, `side-modal-expandable-card`, `side-modal-pill-tabs-row` | El *patrón* es universal. |
| Tablas (kit) | `data-table-patterns.ts` | Clases, no componente. |
| Proof / datos | `MetricStrip` | `<dl>` responsive para métricas, resultados y KPIs; sirve en web, app, slides y social. |
| Comparación | `ComparisonTable` | Tabla semántica de dos columnas con outcome destacado por tokens. |
| Contexto | `SourceTag` | Tag compacto para fuente, cita, dataset o salida de IA. |
| Performance | `LazyVisible` | Monta contenido pesado cerca del viewport con `IntersectionObserver`. |
| Layout / motion | `section-atmosphere`, `overflow-clip-x`, `text-gradient-safe` | Utilidades portadas de singular-landing con reduced-motion y forced-colors. |

## APP / producto (específicos de Singular Stories)
KPI de dominio (`KpiCard`/`KpiRow` acoplados a `settings-context`), modales de entidad (`story/sprint/okr/epic/issue/...-detail-modal`), `entity-modal-stack-host`, `goal-tree`, `pert-gantt`, `qa-charts-*`, payments (`payments-*`), sprints/stories (`story-views`, `stories-table`, `sprint-sp-distributor`), talent (`talent-*`), sidebars de producto (`app/admin/client-sidebar`), `app-header`.

### Patrones candidatos observados en Stories

No copiarlos sin limpiar dependencias. Son candidatos para próximas promociones:

- `DataGrid`, `DataCard`, `DataCardGrid`, `ListPagination`.
- `GridSectionHeader`, `EdgeFadeScroller`, `LabelWithHint`.
- `StatusDropdown` con la regla read-only badge en grids / edición en detail.
- `AiProcessButton`, `ChartExplainer`.

Promover sólo cuando la API sea router/data-agnostic y exista un segundo uso o
una necesidad clara del core.

## Studio / AI workspace

El DS define contratos, no la orquestación:

- conversation rail, agent trace, preview canvas, evidence tabs y decision bar;
- estados `idle|understanding|planning|working|review|blocked|failed|published`;
- no marcar `published/live/merged` sin confirmación externa;
- SSE, MCP, permisos, prompts y publish quedan en Singularity.

## iOS / SwiftUI

El foundation portable incluye spacing, radius, elevation, dynamic colors,
typography roles, `SingularSemanticTone`, surfaces, action buttons, detail
headers, metric tiles y empty states. Approval/KYC/biometric/Slack y jerarquía
Stories quedan en la app.

## Marketing / website (perfil website-landing)
`PageShell`, `HeroSection`, `Section`, `SectionHeading`, `Eyebrow`, `CtaButton`, `MarketingCard`, `TestimonialCard`, `FinalCTA`, `InlineLinkCTA`, `Reveal`, `SystemChip`, `LogoMarquee`, `LandingTabs` → ver `surfaces/website-landing/primitives.tsx`.

`InteractiveHeroBackground` vive en `surfaces/website-landing/InteractiveHeroBackground.tsx`: backdrop mouse-follow portable, activado sólo después de interacción y sin acople a rutas, booking o contenido. `HeroSection backgroundVariant="interactive"` lo monta automáticamente.

Los patrones que atraviesan superficies se mantienen en `components/` y no dentro de
`website-landing`: `MetricStrip` para prueba/KPI, `ComparisonTable` para decisiones,
`SourceTag` para contexto y `LazyVisible` para diferir gráficos, media o carruseles.
La implementación sigue las garantías observadas en `singular-landing`: targets de
interacción amplios, `aria` semántico, lazy loading de contenido pesado y fallback
cuando `IntersectionObserver` no existe.

No se portan al DS los providers de booking, rutas, navbar/footer ni datos comerciales de `singular-landing`; esos quedan en el sitio host.

## ⚠️ Higiene
- ✅ API key Figma (`figd_…`) que estaba embebida en `sidebar-shell.tsx` de Stories: **NO viajó** al DS (el `navigation.tsx` portado no incluye el snippet MCP). Pendiente fuera de este repo: **rotar la key** en Stories.
- `styles/globals.css` legacy muerto en Stories (ignorar al re-auditar).
- Doble definición PERT con colisión de tokens (`--pert-normal-*`, `--status-done-*`) — específico de Stories, no se promovió al core.
