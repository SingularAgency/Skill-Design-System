import { useEffect, useState } from "react"

import { AgentActivityOrb } from "./AgentActivityOrb"
import type { AgentActivityIndicatorProps } from "./types"

export function AgentActivityIndicator({
  label,
  detail,
  announce = false,
  className = "",
  size = "avatar",
  ...orbProps
}: AgentActivityIndicatorProps) {
  const announcement = detail ? `${label}. ${detail}` : label
  const [announcedText, setAnnouncedText] = useState(announcement)

  useEffect(() => {
    if (!announce) return
    const timeout = window.setTimeout(() => setAnnouncedText(announcement), 450)
    return () => window.clearTimeout(timeout)
  }, [announce, announcement])

  return (
    <div
      className={`agent-activity-indicator agent-activity-indicator--${size} ${className}`.trim()}
      data-agent-activity-indicator
    >
      <AgentActivityOrb {...orbProps} decorative size={size} />
      <span className="agent-activity-indicator__copy">
        <strong>{label}</strong>
        {detail ? <small>{detail}</small> : null}
      </span>
      {announce ? (
        <span className="agent-orb-sr-only" aria-atomic="true" aria-live="polite" role="status">
          {announcedText}
        </span>
      ) : null}
    </div>
  )
}
