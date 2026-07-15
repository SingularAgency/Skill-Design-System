import type { ReactNode } from "react"

export interface MetricItem {
  id?: string
  label: ReactNode
  value: ReactNode
  detail?: ReactNode
}

/** A compact, semantic proof/KPI rail for web, app, slides and social layouts. */
export function MetricStrip({
  items,
  ariaLabel = "Metrics",
  className = "",
}: {
  items: MetricItem[]
  ariaLabel?: string
  className?: string
}) {
  return (
    <dl className={`metric-strip ${className}`.trim()} aria-label={ariaLabel}>
      {items.map((item, index) => (
        <div className="metric-strip__item" key={item.id ?? index}>
          <dt className="metric-strip__label">{item.label}</dt>
          <dd className="metric-strip__value">{item.value}</dd>
          {item.detail && <dd className="metric-strip__detail">{item.detail}</dd>}
        </div>
      ))}
    </dl>
  )
}
