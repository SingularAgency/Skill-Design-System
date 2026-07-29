# AI agent contract

Read this before generating or refactoring Singular UI.

## Routing

1. Read `docs/README.md`.
2. Identify the human, current job, pain/risk, evidence level, and experience
   foundation. Use `docs/08-application-map.md` to route the task.
3. Read `design-system.json`.
4. Select exactly one primary surface and read that surface guide.
5. For copy, choose Marketing or Product in `ux-voice/README.md`.
6. Read `tokens/README.md` for web, or the iOS guide for SwiftUI.
7. Read `components/README.md` before creating a component.
8. Inspect the host product's local docs and current implementation.

For a narrow mechanical application of an existing token or component, cite
the existing contract. Do not invent user research or strategic rationale.

## Required behavior

- Reuse tokens and existing variants before adding a primitive.
- Keep host routing, providers, permissions, data and copy in the host repo.
- Use semantic status tokens; never infer status from brand color.
- Define loading, empty, error, success, disabled and permission states where
  the feature can encounter them.
- Preserve focus, keyboard behavior, Dynamic Type/touch target requirements and
  reduced-motion behavior.
- Keep product-specific language consistent with the host product source.
- Explain any new token or component in the relevant inventory.
- Preserve the trace from user problem to foundation and system layer for any
  new shared decision.
- Label documented behavior, inference, and validation need accurately.
- Never convert provisional commercial material into a verified claim.

## Surface-specific constraints

- Website: optimize narrative hierarchy and load cost; do not mount heavy
  visuals before they approach the viewport.
- Web app: optimize scanability, state clarity and predictable data density.
- Studio: distinguish intent, system activity, preview, evidence and publish
  state. Never imply an external change happened before confirmation.
- iOS: prefer native controls and system behavior; map the brand through tokens
  rather than recreating web chrome.
- Social/slides: one idea and one visual accent per canvas.
- Email: inline styles and robust fallbacks; no CSS variables in final markup.

## Completion checklist

- Correct surface selected.
- User, job and governing foundation identified.
- Existing primitive search completed.
- No new inline brand color without a documented exception.
- Interaction and system states covered.
- Responsive/native behavior covered.
- Accessibility and reduced motion covered.
- Host-specific logic stayed out of the DS.
- Docs and snapshot metadata updated when the shared system changed.
