# Componentes

Inventario de los componentes del DS, clasificados. La **API real** vive en cada perfil; acá está el mapa de qué es reutilizable universal vs específico de producto.

> Base común: **Tailwind v4 + shadcn/ui + lucide**. Núcleo shadcn (`ui/`) compartido por todas las superficies web.

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

## APP / producto (específicos de Singular Stories)
KPI de dominio (`KpiCard`/`KpiRow` acoplados a `settings-context`), modales de entidad (`story/sprint/okr/epic/issue/...-detail-modal`), `entity-modal-stack-host`, `goal-tree`, `pert-gantt`, `qa-charts-*`, payments (`payments-*`), sprints/stories (`story-views`, `stories-table`, `sprint-sp-distributor`), talent (`talent-*`), sidebars de producto (`app/admin/client-sidebar`), `app-header`.

## Marketing / website (perfil website-landing)
`Section`, `SectionHeading`, `Eyebrow`, `CtaButton`, `Reveal`, `SystemChip`, `LogoMarquee` → ver `surfaces/website-landing/primitives.tsx`.

## ⚠️ Higiene pendiente (de la auditoría)
- API key Figma (`figd_…`) embebida en `sidebar-shell.tsx` de Stories — **no debe viajar** al DS; revisar/rotar.
- `styles/globals.css` legacy muerto en Stories (ignorar).
- Doble definición PERT con colisión de tokens (`--pert-normal-*`, `--status-done-*`).
