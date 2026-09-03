# Singular Agent Orbits — implementation plan

> Status: DS implementation complete on `design/orbits`; product pilots pending.
> Reference reviewed: `thinking-orbs@0.1.1` / upstream commit
> `382be79c472cd600277f01e14f98f8c0ee18dcb0` on 2026-07-21.

## Outcome

Add a token-driven activity indicator for AI and agent experiences without
turning an animation into a source of truth. The visual language may be
inspired by [thinking-orbs](https://orbs.jakubantalik.com/), but the delivered
component must look, behave and read like Singular across web-app and Studio.

The system will expose two layers:

1. `AgentActivityOrb`: the canvas primitive.
2. `AgentActivityIndicator`: the accessible composition of orb, label and
   optional detail.

The orb communicates that work is active and which kind of activity is
happening. Status components remain responsible for terminal, blocked, failed,
review and published truth.

## Implementation status — 2026-07-21

Completed in the central DS:

- token-aware Canvas 2D engine with all six activities;
- separately tuned `inline` (20px) and `avatar` (64px) recipes;
- `brand`, `neutral` and `inverse` tones;
- one shared scheduler, DPR cap, offscreen/hidden pausing;
- deterministic reduced-motion and forced-colors fallbacks;
- accessible `AgentActivityOrb` and `AgentActivityIndicator` APIs;
- Studio run-state mapping, catalog story, documentation, manifest, skill,
  attribution and release `2026.07.2`.

Pending outside this branch:

- Singularity Studio pilot;
- Singular Stories pilot;
- product-level performance evidence and adoption snapshots;
- SwiftUI parity decision after both web pilots.

## Why adaptation is required

The upstream package is a strong technical reference: React 18+, plain Canvas
2D, live theme detection, reduced-motion support, offscreen pausing and a DPR
cap. It is also a new `0.1.1` package and its current contract does not fit the
Singular system without changes:

- its renderer is monochrome and cannot consume Singular brand tokens;
- `thinking-orbs` activity names do not map one-to-one to Studio run states;
- the canvas owns `role="img"`, while live product progress needs a controlled
  `status` announcement at the composition layer;
- it runs one animation loop per mounted instance;
- this repository distributes portable source and snapshots, not an npm
  dependency graph.

Recommendation: adapt and vendor the small MIT-licensed engine as portable
source, retain attribution and the license notice, and track the upstream
version in the component documentation. Do not install the package directly in
host products.

## Semantic contract

### Activity is not status

Keep these two models separate:

| Agent activity | Visual recipe | Typical message |
|---|---|---|
| `listening` | rolling latitude waveform | Listening for input |
| `searching` | scanned dotted globe | Searching sources |
| `planning` | resolving segmented bands | Planning changes |
| `working` | particles on tilted orbits | Applying changes |
| `composing` | undulating dotted ribbon | Drafting response |
| `shaping` | circle-to-triangle-to-square morph | Shaping prototype |

The public Singular API uses `planning`, not upstream `solving`. Engine names
remain private implementation details.

The existing Studio run model stays authoritative:

- `idle`, `understanding`, `planning`, `working`, `review`, `blocked`, `failed`,
  `published` remain in `surfaces/studio/patterns.ts`;
- an orb may accompany `understanding`, `planning` or `working`;
- `review`, `blocked`, `failed` and `published` use semantic status UI and a
  static icon, never a continuous activity orb;
- the UI must not infer completion, publication or external success from the
  animation.

## Proposed API

```tsx
type AgentActivity =
  | "listening"
  | "searching"
  | "planning"
  | "working"
  | "composing"
  | "shaping"

type AgentOrbSize = "inline" | "avatar"
type AgentOrbTone = "brand" | "neutral" | "inverse"

interface AgentActivityOrbProps {
  activity?: AgentActivity
  size?: AgentOrbSize
  tone?: AgentOrbTone
  speed?: number
  paused?: boolean
  decorative?: boolean
  className?: string
}

interface AgentActivityIndicatorProps extends AgentActivityOrbProps {
  label: string
  detail?: string
  announce?: boolean
}
```

Defaults:

- activity: `working`;
- size: `avatar` (`64px`); `inline` is a separately tuned `20px` recipe;
- tone: `brand`;
- `announce`: `false`, so streaming UIs do not repeatedly interrupt assistive
  technology.

Do not expose arbitrary canvas colors, particle counts or engine modes in the
public API. Those are implementation details governed by tokens and presets.

## Singular visual language

### Palette

Canvas particles interpolate by depth between tokenized ink values instead of
grayscale:

```css
--agent-orb-near: var(--brand-cyan);
--agent-orb-mid: var(--primary);
--agent-orb-far: color-mix(in srgb, var(--brand-primary) 42%, transparent);
--agent-orb-glow: color-mix(in srgb, var(--brand-cyan) 18%, transparent);
--agent-orb-surface: color-mix(in srgb, var(--surface-2) 82%, transparent);
--agent-orb-border: color-mix(in srgb, var(--primary) 24%, var(--border));
```

- `brand` uses the stable blue-to-cyan identity in every profile.
- `neutral` uses foreground/muted tokens for dense operational rows.
- `inverse` is reserved for media or dark preview canvases.
- warning, destructive and success colors are not activity palettes.

The `AgentActivityIndicator` uses existing liquid-surface, spacing, radius and
typography tokens. It must not introduce a new handmade pill system.

### Motion

- Preserve the six distinct geometries and separately tuned `20px` / `64px`
  presets.
- Use a shared scheduler for all visible instances.
- Pause when offscreen or when the document is hidden.
- Cap device pixel ratio at `2`.
- `prefers-reduced-motion: reduce` renders one deterministic representative
  frame.
- Avoid blur/filter work inside canvas. Glow belongs to the CSS wrapper.

## Accessibility and trust

- The canvas is `aria-hidden="true"` when used inside
  `AgentActivityIndicator`.
- The composition may use `role="status"` and `aria-live="polite"` only when
  `announce` is explicitly enabled.
- A standalone non-decorative orb requires an `aria-label`.
- The visible label always explains the activity; meaning never depends on
  motion or geometry alone.
- Activity changes should be debounced before announcement to prevent chatter.
- Forced-colors mode renders a static CSS fallback mark and keeps the label.
- The component never steals focus.

## File and ownership model

```text
components/agent-activity-orb/
  AgentActivityOrb.tsx        # public canvas primitive
  AgentActivityIndicator.tsx  # accessible composition
  engine/                     # private Canvas 2D renderers and scheduler
  presets.ts                  # activity + size recipes
  types.ts                    # public contracts
  agent-activity-orb.css      # tokenized surface/glow/fallback
  README.md                   # API, states, examples, attribution
  LICENSE.thinking-orbs       # upstream MIT notice
```

Ownership:

- foundation owns palette, motion and accessibility tokens;
- web platform owns Canvas/React implementation;
- Studio owns mapping from run state to activity;
- host products own copy, orchestration, async state and announcements.

After the primitive proves useful in Studio and Stories, keep it in `components`
as a cross-surface web primitive. If only Studio adopts it, move the composition
to `surfaces/studio` while retaining the low-level engine in `components`.

## Catalog and documentation

Add an `AgentActivityOrb` story to the component explorer with:

- filters for `web-app` and `studio`;
- all six activities;
- `inline` and `avatar` sizes;
- `brand`, `neutral` and `inverse` tones;
- light and dark previews;
- play/pause and reduced-motion preview;
- Usage, Code and Accessibility tabs;
- attribution and upstream version in the source notes.

Update:

- `components/README.md`;
- `surfaces/studio/guide.md` and `patterns.ts`;
- `references/ai-agent-contract.md`;
- `design-system.json` bundles and release metadata;
- `SKILL.md`, so agents know when to use the component and when a status badge
  is required instead;
- snapshots generated by `scripts/export-snapshot.mjs`.

## Implementation phases

### Phase 0 — Reference lock and license ✅

- Record upstream `0.1.1` and commit `382be79c…`.
- Copy the MIT notice and identify adapted files.
- Add an upstream comparison note for future updates.

Done when provenance is explicit and redistribution is compliant.

### Phase 1 — Token and engine spike ✅

- Port one `working` recipe to a token-aware Canvas 2D engine.
- Replace grayscale paint with depth-aware Singular palette interpolation.
- Build the shared scheduler, DPR cap and visibility pausing.
- Validate Chrome, Safari and Firefox behavior.

Done when `20px` and `64px` remain crisp in light and dark modes and no inline
brand colors exist in the component.

### Phase 2 — Complete primitive ✅

- Port all six activities and tuned sizes.
- Add `brand`, `neutral` and `inverse` tones.
- Add deterministic reduced-motion and forced-colors fallbacks.
- Add unit tests for preset resolution, state mapping and scheduler cleanup.

Done when every public prop is typed and every animation has a static fallback.

### Phase 3 — Accessible composition ✅

- Build `AgentActivityIndicator` from existing Singular surfaces/type roles.
- Add optional polite announcements with debouncing.
- Document standalone, decorative and live-progress usage.
- Add Studio run-state mapping without changing terminal-state semantics.

Done when the UI is understandable with canvas disabled and with motion reduced.

### Phase 4 — Catalog and contract integration ✅

- Add interactive catalog stories and source examples.
- Update component inventory, Studio guide, AI contract, skill and manifest.
- Export a new versioned snapshot.

Done when humans and agents can discover the same API and usage constraints.

### Phase 5 — Product pilots (pending)

1. Pilot in Singularity Studio for active agent trace/composer states.
2. Pilot in Singular Stories for `AiProcessButton` or another real async AI
   flow.
3. Keep orchestration and product copy in each host.
4. Audit performance and language before promoting any additional variant.

Done when two real hosts use the same contract without local color or animation
forks.

### Phase 6 — Native parity decision (pending)

After the web pilots, decide whether iOS needs a SwiftUI-native implementation.
Do not embed the React canvas or promise pixel parity. Preserve only activity
semantics, Singular palette, reduced motion and accessibility behavior.

## Acceptance criteria

- All six activities work at `20px` and `64px` in app light/dark and Studio
  dark contexts.
- Brand mode visibly uses Singular blue/cyan tokens.
- No consumer can use the orb to assert `review`, `blocked`, `failed` or
  `published` state.
- Reduced-motion, forced-colors, offscreen and hidden-tab behavior are tested.
- Canvas is not the only carrier of meaning.
- Ten visible avatar orbs and twenty inline orbs remain responsive on a
  mid-range laptop; the final threshold is recorded during the spike.
- No product-specific routing, data, permissions, prompts or copy enters the DS.
- Attribution, docs, manifest and snapshot are complete.

## Risks and controls

| Risk | Control |
|---|---|
| Upstream API is new and changes quickly | Vendor a reviewed commit and update intentionally |
| Animation suggests certainty or hidden cognition | Call it activity, pair with text, keep status separate |
| Blue/cyan loses depth in light mode | Tune near/mid/far tokens per profile and test contrast |
| Too many rAF loops | Shared scheduler plus visibility and tab pausing |
| Motion becomes decorative noise | Use only during active work and provide static fallback |
| License notice is lost in snapshots | Include notice in component folder and export manifest |
