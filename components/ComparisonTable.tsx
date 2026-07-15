import type { ReactNode } from "react"

export interface ComparisonRow {
  id?: string
  label: ReactNode
  values: [ReactNode, ReactNode]
}

/** Accessible two-column comparison with one tokenized highlighted outcome column. */
export function ComparisonTable({
  columns,
  rows,
  caption,
  className = "",
}: {
  columns: [ReactNode, ReactNode]
  rows: ComparisonRow[]
  caption?: string
  className?: string
}) {
  return (
    <div className={`comparison-table-wrap ${className}`.trim()}>
      <table className="comparison-table">
        {caption && <caption>{caption}</caption>}
        <thead>
          <tr>
            <th aria-hidden="true" />
            <th scope="col">{columns[0]}</th>
            <th scope="col" data-highlighted="true">{columns[1]}</th>
          </tr>
        </thead>
        <tbody>
          {rows.map((row, index) => (
            <tr key={row.id ?? index}>
              <th scope="row">{row.label}</th>
              <td>{row.values[0]}</td>
              <td data-highlighted="true">{row.values[1]}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
