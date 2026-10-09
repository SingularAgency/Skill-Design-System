/** Visual semantics only. Hosts own the mapping from domain states to tones. */
export type SemanticTone = "success" | "warning" | "urgent" | "danger" | "info" | "neutral"

export const semanticToneClasses: Record<SemanticTone, { outline: string; filled: string }> = {
  success: {
    outline: "border-status-success-border text-status-success-fg",
    filled: "bg-status-success-bg text-status-success-fg border-status-success-border",
  },
  warning: {
    outline: "border-status-warning-border text-status-warning-fg",
    filled: "bg-status-warning-bg text-status-warning-fg border-status-warning-border",
  },
  urgent: {
    outline: "border-status-urgent-border text-status-urgent-fg",
    filled: "bg-status-urgent-bg text-status-urgent-fg border-status-urgent-border",
  },
  danger: {
    outline: "border-status-danger-border text-status-danger-fg",
    filled: "bg-status-danger-bg text-status-danger-fg border-status-danger-border",
  },
  info: {
    outline: "border-status-info-border text-status-info-fg",
    filled: "bg-status-info-bg text-status-info-fg border-status-info-border",
  },
  neutral: {
    outline: "border-status-neutral-border text-status-neutral-fg",
    filled: "bg-status-neutral-bg text-status-neutral-fg border-status-neutral-border",
  },
}
