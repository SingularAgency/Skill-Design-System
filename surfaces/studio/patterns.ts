export type StudioRunState =
  | "idle"
  | "understanding"
  | "planning"
  | "working"
  | "review"
  | "blocked"
  | "failed"
  | "published"

export type StudioSemanticTone =
  | "neutral"
  | "info"
  | "success"
  | "warning"
  | "destructive"

export const studioRunStateMeta: Record<
  StudioRunState,
  { label: string; tone: StudioSemanticTone; terminal: boolean }
> = {
  idle: { label: "Ready", tone: "neutral", terminal: false },
  understanding: { label: "Understanding request", tone: "info", terminal: false },
  planning: { label: "Planning changes", tone: "info", terminal: false },
  working: { label: "Working in sandbox", tone: "info", terminal: false },
  review: { label: "Ready for review", tone: "success", terminal: false },
  blocked: { label: "Needs input", tone: "warning", terminal: false },
  failed: { label: "Run failed", tone: "destructive", terminal: true },
  published: { label: "Published", tone: "success", terminal: true },
}

export const studioLayoutPatterns = {
  shell: "studio-shell",
  shellLayout: "studio-shell-layout",
  conversation: "studio-conversation",
  workspace: "studio-workspace",
  workspaceLayout: "studio-workspace-layout",
  preview: "studio-preview",
  evidence: "studio-evidence",
  decisionBar: "studio-decision-bar",
} as const

export const studioEvidenceTabs = ["preview", "diff", "sources"] as const
export type StudioEvidenceTab = (typeof studioEvidenceTabs)[number]
