"use client"

import { useEffect, useRef, useState, type ReactNode } from "react"

/**
 * Mounts expensive content shortly before it enters the viewport.
 * Use for charts, carousels, media and below-the-fold sections.
 */
export function LazyVisible({
  children,
  rootMargin = "600px",
  minHeight,
  className = "",
}: {
  children: ReactNode
  rootMargin?: string
  minHeight?: number | string
  className?: string
}) {
  const ref = useRef<HTMLDivElement>(null)
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    if (visible) return

    const element = ref.current
    if (!element) return

    if (!("IntersectionObserver" in window)) {
      setVisible(true)
      return
    }

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries.some((entry) => entry.isIntersecting)) {
          setVisible(true)
          observer.disconnect()
        }
      },
      { rootMargin },
    )

    observer.observe(element)
    return () => observer.disconnect()
  }, [rootMargin, visible])

  return (
    <div
      ref={ref}
      className={`lazy-visible ${className}`.trim()}
      style={!visible && minHeight !== undefined ? { minHeight } : undefined}
    >
      {visible ? children : null}
    </div>
  )
}
