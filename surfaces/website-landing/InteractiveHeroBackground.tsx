"use client"

/**
 * Portable cursor-reactive hero backdrop from singular-landing's home.
 * The static brand background paints first; lens layers mount only after a
 * real pointer interaction. There are no routes, data, or site dependencies.
 */
import { useEffect, useRef, useState } from "react"
import { BrandBackground } from "../../backgrounds/BrandBackground"

function cx(...classes: Array<string | false | null | undefined>) {
  return classes.filter(Boolean).join(" ")
}

export interface InteractiveHeroBackgroundProps {
  intensity?: "subtle" | "standard"
  stars?: boolean
  className?: string
}

export function InteractiveHeroBackground({
  intensity = "standard",
  stars = true,
  className,
}: InteractiveHeroBackgroundProps) {
  const ref = useRef<HTMLDivElement>(null)
  const [interactive, setInteractive] = useState(false)

  useEffect(() => {
    const el = ref.current
    if (!el || window.matchMedia?.("(prefers-reduced-motion: reduce)").matches) return

    let frame = 0
    let currentX = 50
    let currentY = 30
    let targetX = currentX
    let targetY = currentY
    let running = false

    const paint = () => {
      currentX += (targetX - currentX) * 0.12
      currentY += (targetY - currentY) * 0.12
      el.style.setProperty("--hero-pointer-x", `${currentX}%`)
      el.style.setProperty("--hero-pointer-y", `${currentY}%`)
      if (Math.abs(targetX - currentX) + Math.abs(targetY - currentY) > 0.05) {
        frame = requestAnimationFrame(paint)
      } else {
        running = false
      }
    }

    const onMove = (event: MouseEvent) => {
      const bounds = el.getBoundingClientRect()
      targetX = Math.max(0, Math.min(100, ((event.clientX - bounds.left) / bounds.width) * 100))
      targetY = Math.max(0, Math.min(100, ((event.clientY - bounds.top) / bounds.height) * 100))
      if (!running) {
        running = true
        frame = requestAnimationFrame(paint)
      }
    }

    const activate = (event: PointerEvent) => {
      setInteractive(true)
      onMove(event)
      window.addEventListener("mousemove", onMove, { passive: true })
    }

    window.addEventListener("pointermove", activate, { passive: true, once: true })
    return () => {
      window.removeEventListener("pointermove", activate)
      window.removeEventListener("mousemove", onMove)
      cancelAnimationFrame(frame)
    }
  }, [])

  return (
    <div
      ref={ref}
      className={cx("interactive-hero-bg", `interactive-hero-bg--${intensity}`, interactive && "interactive-hero-bg--active", className)}
      aria-hidden="true"
    >
      <BrandBackground asBackdrop stars={stars} variant="static" />
      {interactive && (
        <>
          <div className="interactive-hero-bg__aurora" />
          <div className="interactive-hero-bg__void" />
          <div className="interactive-hero-bg__disk" />
          <div className="interactive-hero-bg__horizon" />
          <div className="interactive-hero-bg__cursor" />
        </>
      )}
    </div>
  )
}
