"use client"

/**
 * <Logo> — marca Singular, recoloreable y theme-aware.
 *
 * El símbolo es SVG inline con `currentColor` → toma el color del contexto
 * (p.ej. `style={{ color: "var(--primary)" }}` o `text-foreground`), así que
 * NO necesita un asset por tema. El wordmark usa la tipografía del DS.
 *
 * Para usos no-React (slides/email/social) usar los assets de marca en
 * `assets/` de este repo (ver assets/README.md).
 *
 * El símbolo inline espeja assets/symbols/singular-symbol.svg.
 */
import type { CSSProperties, ReactNode } from "react"

export type LogoVariant = "full" | "symbol" | "wordmark"

const Symbol = (): ReactNode => (
  <svg width="1em" height="1em" viewBox="0 0 48 48" fill="none" aria-hidden="true" style={{ flex: "none" }}>
    <circle cx="24" cy="22" r="10" fill="currentColor" />
    <ellipse cx="24" cy="22" rx="21" ry="6.5" transform="rotate(-22 24 22)" stroke="currentColor" strokeWidth="2.4" />
  </svg>
)

export function Logo({
  variant = "full",
  className = "",
  style,
}: {
  variant?: LogoVariant
  className?: string
  style?: CSSProperties
}) {
  if (variant === "symbol") {
    return (
      <span className={className} role="img" aria-label="Singular" style={{ display: "inline-flex", fontSize: "1.5rem", ...style }}>
        <Symbol />
      </span>
    )
  }
  return (
    <span
      className={className}
      role="img"
      aria-label="Singular"
      style={{ display: "inline-flex", alignItems: "center", gap: "0.5rem", fontFamily: "var(--font-sans)", fontWeight: 700, letterSpacing: "-0.01em", ...style }}
    >
      {variant === "full" && <span style={{ display: "inline-flex", fontSize: "1.25em" }}><Symbol /></span>}
      <span>Singular</span>
    </span>
  )
}
