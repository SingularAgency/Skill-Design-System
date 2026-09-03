import { useEffect, useRef } from "react"

import { drawAgentActivityOrb } from "./engine"
import { subscribeAgentOrb } from "./scheduler"
import {
  agentActivityLabels,
  agentOrbPixelSizes,
  type AgentActivityOrbProps,
  type AgentOrbPalette,
} from "./types"

function readPalette(canvas: HTMLCanvasElement): AgentOrbPalette {
  const styles = getComputedStyle(canvas)
  const fallback = styles.color || "currentColor"
  const read = (token: string) => styles.getPropertyValue(token).trim() || fallback
  return {
    near: read("--agent-orb-near"),
    mid: read("--agent-orb-mid"),
    far: read("--agent-orb-far"),
    ghost: read("--agent-orb-ghost"),
  }
}

export function AgentActivityOrb({
  activity = "working",
  size = "avatar",
  tone = "brand",
  speed = 1,
  paused = false,
  decorative = false,
  className = "",
  style,
  "aria-label": ariaLabel,
  ...canvasProps
}: AgentActivityOrbProps) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null)
  const pixelSize = agentOrbPixelSizes[size]

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const context = canvas.getContext("2d")
    if (!context) return

    const dpr = Math.min(2, window.devicePixelRatio || 1)
    canvas.width = Math.round(pixelSize * dpr)
    canvas.height = Math.round(pixelSize * dpr)
    context.setTransform(dpr, 0, 0, dpr, 0, 0)

    let palette = readPalette(canvas)
    let visible = true
    let unsubscribe: (() => void) | undefined
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)")

    const draw = (timeSeconds: number) => {
      drawAgentActivityOrb(context, activity, size, pixelSize, timeSeconds, speed, palette)
    }

    const stop = () => {
      unsubscribe?.()
      unsubscribe = undefined
    }
    const start = () => {
      if (unsubscribe || paused || reducedMotion.matches || !visible) return
      unsubscribe = subscribeAgentOrb(draw)
    }
    const syncMotion = () => {
      stop()
      draw(0.6)
      start()
    }
    const syncPalette = () => {
      palette = readPalette(canvas)
      if (paused || reducedMotion.matches || !visible) draw(0.6)
    }

    draw(0.6)
    start()

    const intersectionObserver =
      typeof IntersectionObserver === "undefined"
        ? undefined
        : new IntersectionObserver(([entry]) => {
            visible = entry.isIntersecting
            if (visible) start()
            else stop()
          })
    intersectionObserver?.observe(canvas)

    const mutationObserver = new MutationObserver(syncPalette)
    mutationObserver.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["class", "data-theme", "data-brand", "data-page-accent"],
      subtree: true,
    })
    reducedMotion.addEventListener("change", syncMotion)

    return () => {
      stop()
      intersectionObserver?.disconnect()
      mutationObserver.disconnect()
      reducedMotion.removeEventListener("change", syncMotion)
    }
  }, [activity, paused, pixelSize, size, speed, tone])

  return (
    <span
      className={`agent-activity-orb agent-activity-orb--${size} agent-activity-orb--${tone} ${className}`.trim()}
      data-agent-activity={activity}
      data-agent-orb-size={size}
      data-agent-orb-tone={tone}
      style={style}
    >
      <canvas
        {...canvasProps}
        ref={canvasRef}
        aria-hidden={decorative ? true : undefined}
        aria-label={decorative ? undefined : ariaLabel ?? agentActivityLabels[activity]}
        role={decorative ? undefined : "img"}
        style={{ display: "block", height: pixelSize, width: pixelSize }}
      />
      <span className="agent-activity-orb__forced-colors" aria-hidden="true" />
    </span>
  )
}
