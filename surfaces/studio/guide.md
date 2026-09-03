# Profile: Studio / AI editing workspace

Use this profile for Singularity and future Singular products where a user
describes intent, watches agents work, reviews a preview/diff/sources and
decides whether to publish or hand off.

The Studio profile extends `web-app`; it is not a dashboard skin.

## UX writing

Start with the [people and operating problem](../../docs/05-experience-foundations.md#the-people-in-the-change).
Read [Product voice and tone](../../ux-voice/product.md)
for agent states, uncertainty, source trace, recovery, review, and publish
language. Never claim `published`, `live`, or `merged` without external
confirmation.

## Setup

```css
@import "@singular/ds/tokens/theme-app.css";
@import "@singular/ds/backgrounds/brand-background.css";
@import "@singular/ds/surfaces/web-app/web-app.css";
@import "@singular/ds/surfaces/studio/studio.css";
```

Use `BrandBackground variant="static"` for the workspace. Reserve animated
backgrounds for empty/onboarding moments and respect reduced motion.

For active agent work, import the portable component separately:

```css
@import "@singular/ds/components/agent-activity-orb/agent-activity-orb.css";
```

```tsx
<AgentActivityIndicator
  activity="planning"
  label="Planning changes"
  detail="3 surfaces affected"
/>
```

## Information architecture

1. **Conversation rail** — user intent and assistant responses.
2. **Activity trace** — current agent, completed steps, latency and blockers.
3. **Preview canvas** — the proposed product state, visually distinct from the
   Studio chrome.
4. **Evidence** — preview, diff and sources as separate views.
5. **Decision controls** — continue, revise, hand off or publish.

On mobile, expose conversation and preview as explicit peer views. Do not stack
the full desktop shell into a narrow canvas.

## Layout ownership

`studio.css` separates semantic chrome from composition:

- `studio-shell`, `studio-conversation`, `studio-workspace`, `studio-preview`,
  `studio-evidence` and `studio-decision-bar` provide the visual contract.
- `studio-shell-layout` opts into the reference two-column rail/canvas grid.
- `studio-workspace-layout` opts into the reference preview/evidence/decision
  stack.

Use the layout classes only when the host follows the reference composition.
Existing products may keep their own responsive shell and apply only the
semantic classes. Do not override shared classes with `!important` merely to
undo a reference grid.

## State model

Use the exported states in `patterns.ts`:

- `idle`: waiting for intent.
- `understanding`: parsing and clarifying.
- `planning`: mapping scope and impacted surfaces.
- `working`: generating or editing in the sandbox.
- `review`: preview/evidence is ready.
- `blocked`: user or human expert input is required.
- `failed`: the run ended with an error and recovery is available.
- `published`: an external change is confirmed.

Never label a result `published`, `live` or `merged` from optimistic UI alone.

### Activity orb mapping

`studioRunStateActivity` maps only active run states:

| Studio run state | Orb activity |
|---|---|
| `understanding` | `listening` |
| `planning` | `planning` |
| `working` | `working` |
| `idle`, `review`, `blocked`, `failed`, `published` | none |

Task-level UI may also use `searching`, `composing` and `shaping` when the
visible copy names that concrete activity. The orb is not proof that a task
finished. See `components/agent-activity-orb/README.md`.

## Component contracts

- **Prompt action**: verb-led, short, contextual; it starts a conversation.
- **Composer**: owns text entry only; mode and run state stay with the parent.
- **Agent trace row**: agent, action, state, optional duration/detail.
- **Result tabs**: Preview, Diff, Sources; tabs must be keyboard accessible.
- **Preview canvas**: owns viewport/resize state, not chat state.
- **Publish control**: shows destination, permission and confirmation state.
- **Human handoff**: explains why automation stopped and what the expert needs.

## Visual rules

- Use app tokens and liquid surfaces.
- Use mono/tabular type for durations, file counts and diffs.
- Use brand color for action and selection, semantic color for run status.
- Keep trace rows quiet; the preview and decision should dominate.
- Do not make the preview inherit Studio chrome or background.
- Avoid decorative “AI magic” gradients on every control.

## Accessibility and trust

- Announce agent progress without repeatedly stealing focus.
- Keep orb canvas decorative inside `AgentActivityIndicator`; announcements are
  opt-in, polite and debounced.
- Keep activity understandable without animation.
- Preserve user scroll position when streaming content.
- Provide a “jump to latest” affordance when new content arrives off-screen.
- Make source links visible and keyboard reachable.
- Pair destructive/high-risk actions with explicit scope and confirmation.
