# Agent Activity Orb

Token-driven Canvas activity for Singular AI and agent experiences. This is a
portable React component for the `web-app` and `studio` profiles.

## Setup

```css
@import "@singular/ds/tokens/theme-app.css";
@import "@singular/ds/components/agent-activity-orb/agent-activity-orb.css";
```

```tsx
import {
  AgentActivityIndicator,
  AgentActivityOrb,
} from "@singular/ds/components/agent-activity-orb"
```

## Use the right layer

```tsx
<AgentActivityIndicator
  activity="searching"
  label="Searching project sources"
  detail="Design System · 12 files"
/>
```

Use `AgentActivityIndicator` in product UI because its visible label preserves
meaning without animation. Use `AgentActivityOrb` alone only when nearby copy
already explains the activity.

Activity is not status. The orb may accompany active understanding, planning or
work. Do not use it for `review`, `blocked`, `failed`, `published`, `live` or
`merged`; use semantic status components for those states.

## Activities

| Activity | Use when | Default accessible label |
|---|---|---|
| `listening` | Receiving or interpreting user input | Listening for input |
| `searching` | Looking through sources or external systems | Searching sources |
| `planning` | Decomposing scope or sequencing changes | Planning changes |
| `working` | Applying or executing changes | Applying changes |
| `composing` | Drafting text, code or a response | Drafting response |
| `shaping` | Iterating a prototype or visual structure | Shaping prototype |

## Variants

- `size="inline"`: separately tuned 20px recipe for dense rows and labels.
- `size="avatar"`: separately tuned 64px recipe for assistant/avatar scale.
- `tone="brand"`: Singular blue-to-cyan activity signature.
- `tone="neutral"`: quiet operational activity.
- `tone="inverse"`: media and deep preview canvases.

The public API intentionally does not expose arbitrary particle counts, engine
modes or colors. Customize through the documented `--agent-orb-*` tokens.

## Accessibility

- Standalone orbs expose `role="img"` and a default activity label.
- Set `decorative` when visible text already carries the meaning.
- The indicator keeps the canvas decorative and may announce stable activity
  changes with `announce`; announcements are debounced by 450ms.
- Reduced-motion users receive a deterministic static frame.
- Forced-colors mode replaces canvas with a static system-color mark.
- Canvas never receives focus and never communicates terminal status.

## Performance

All visible instances share one animation scheduler. Instances unsubscribe when
offscreen, pause when the document is hidden, and cap DPR at 2. The renderer
uses Canvas 2D fills only: no WebGL or canvas filters.

## Provenance

The geometry and tuned recipes adapt the MIT-licensed
[`thinking-orbs@0.1.1`](https://github.com/Jakubantalik/thinking-orbs) engine at
commit `382be79c472cd600277f01e14f98f8c0ee18dcb0`.

Singular changes include the public activity vocabulary, token palettes,
shared scheduler, composition-level accessibility, forced-colors fallback and
Studio state contract. The upstream license is preserved in
`LICENSE.thinking-orbs`.
