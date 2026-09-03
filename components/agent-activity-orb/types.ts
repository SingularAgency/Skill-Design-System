import type { CanvasHTMLAttributes, CSSProperties } from "react"

export type AgentActivity =
  | "listening"
  | "searching"
  | "planning"
  | "working"
  | "composing"
  | "shaping"

export type AgentOrbSize = "inline" | "avatar"
export type AgentOrbTone = "brand" | "neutral" | "inverse"

export interface AgentActivityOrbProps
  extends Omit<CanvasHTMLAttributes<HTMLCanvasElement>, "children" | "height" | "size" | "width"> {
  /** The activity being performed. This is not a completion or status value. */
  activity?: AgentActivity
  /** Separately tuned 20px and 64px recipes. */
  size?: AgentOrbSize
  /** Token palette used by the renderer. */
  tone?: AgentOrbTone
  /** Multiplier applied to the tuned activity speed. */
  speed?: number
  /** Freeze the activity on a deterministic representative frame. */
  paused?: boolean
  /** Hide the canvas from assistive technology when visible text carries meaning. */
  decorative?: boolean
  style?: CSSProperties
}
export interface AgentActivityIndicatorProps extends AgentActivityOrbProps {
  /** Visible, user-facing activity message. */
  label: string
  /** Optional secondary context such as the active agent or source count. */
  detail?: string
  /** Announce stable label/detail changes after a short debounce. */
  announce?: boolean
}

export interface AgentOrbPalette {
  near: string
  mid: string
  far: string
  ghost: string
}

export const agentActivityLabels: Record<AgentActivity, string> = {
  listening: "Listening for input",
  searching: "Searching sources",
  planning: "Planning changes",
  working: "Applying changes",
  composing: "Drafting response",
  shaping: "Shaping prototype",
}

export const agentOrbPixelSizes: Record<AgentOrbSize, 20 | 64> = {
  inline: 20,
  avatar: 64,
}
