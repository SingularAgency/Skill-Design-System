"use client"

/**
 * <BrandBackground> — fondo de marca de Singular.
 *
 * Monta la base CSS (`brand-background.css`) y, en la variante `animated`,
 * agrega aurora + cursor-glow con mouse-follow (lerp suave, sin dependencias).
 * Portable: React puro, sin `next/*` ni framer-motion → sirve en Next y Vite.
 *
 * Importá una vez el CSS del DS: `brand-background.css` (y un brand profile).
 *
 *   <BrandBackground variant="animated">…hero…</BrandBackground>   // website hero
 *   <BrandBackground variant="static" />                           // canvas de app
 *   <BrandBackground variant="flat">…tabla densa…</BrandBackground> // solo color base
 *
 * a11y: respeta prefers-reduced-motion (sin listener, sin aurora/cursor).
 */
import { useEffect, useRef, useState, type CSSProperties, type ReactNode } from "react"

export type BrandBackgroundVariant = "animated" | "static" | "flat"

export interface BrandBackgroundProps {
  variant?: BrandBackgroundVariant
  /** Mostrar la capa de estrellas (ignorado en `flat`). Default true. */
  stars?: boolean
  /** Usar como capa de fondo absoluta (hero con layout propio): se posiciona
   *  `absolute inset-0`, es aria-hidden y NO envuelve children. */
  asBackdrop?: boolean
  className?: string
  style?: CSSProperties
  children?: ReactNode
}

export function BrandBackground({
  variant = "static",
  stars = true,
  asBackdrop = false,
  className = "",
  style,
  children,
}: BrandBackgroundProps) {
  const ref = useRef<HTMLDivElement>(null)
  const [interactive, setInteractive] = useState(false)

  useEffect(() => {
    if (variant !== "animated") return
    const el = ref.current
    if (!el) return
    if (window.matchMedia?.("(prefers-reduced-motion: reduce)").matches) return

    let raf = 0
    let tx = 50, ty = 28, cx = 50, cy = 28
    let running = false
    const onMove = (e: MouseEvent) => {
      const r = el.getBoundingClientRect()
      tx = ((e.clientX - r.left) / r.width) * 100
      ty = ((e.clientY - r.top) / r.height) * 100
      if (!running) {
        running = true
        raf = requestAnimationFrame(tick)
      }
    }
    const tick = () => {
      cx += (tx - cx) * 0.08
      cy += (ty - cy) * 0.08
      el.style.setProperty("--mx", `${cx}%`)
      el.style.setProperty("--my", `${cy}%`)
      if (Math.abs(tx - cx) + Math.abs(ty - cy) > 0.05) {
        raf = requestAnimationFrame(tick)
      } else {
        running = false
      }
    }
    const activate = (e: PointerEvent) => {
      setInteractive(true)
      onMove(e)
      window.addEventListener("mousemove", onMove, { passive: true })
    }
    // There is no visual value before a real pointer interaction. Deferring the
    // RAF and animated layers protects hero LCP and idle CPU time.
    window.addEventListener("pointermove", activate, { passive: true, once: true })
    return () => {
      window.removeEventListener("pointermove", activate)
      window.removeEventListener("mousemove", onMove)
      cancelAnimationFrame(raf)
    }
  }, [variant])

  const cls = [
    "brand-bg",
    variant === "flat" && "brand-bg--flat",
    variant === "animated" && "brand-bg--animated",
    interactive && "brand-bg--interactive",
    asBackdrop && "brand-bg--backdrop",
    className,
  ]
    .filter(Boolean)
    .join(" ")

  return (
    <div ref={ref} className={cls} style={style} aria-hidden={asBackdrop || undefined}>
      {variant === "animated" && interactive && <div className="brand-bg__aurora" aria-hidden="true" />}
      {stars && variant !== "flat" && <div className="brand-bg__stars" aria-hidden="true" />}
      {variant === "animated" && interactive && <div className="brand-bg__cursor" aria-hidden="true" />}
      {!asBackdrop && <div className="brand-bg__content">{children}</div>}
    </div>
  )
}
