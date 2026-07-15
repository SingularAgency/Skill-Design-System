import type { ReactNode } from "react"

/** Small source/citation pill for proof, data, AI output and editorial context. */
export function SourceTag({
  label,
  icon,
  className = "",
}: {
  label: string
  icon?: ReactNode
  className?: string
}) {
  return (
    <span className={`source-tag ${className}`.trim()}>
      {icon && <span className="source-tag__icon" aria-hidden="true">{icon}</span>}
      {label}
    </span>
  )
}
