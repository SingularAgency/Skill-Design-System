# AI agent contract

Read this before generating or refactoring Singular UI.

## Routing

1. Read `design-system.json`.
2. Select exactly one primary surface.
3. Read that surface guide.
4. Read `tokens/README.md` for web, or the iOS guide for SwiftUI.
5. Read `components/README.md` before creating a component.
6. Inspect the host product's local docs and current implementation.

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
- Existing primitive search completed.
- No new inline brand color without a documented exception.
- Interaction and system states covered.
- Responsive/native behavior covered.
- Accessibility and reduced motion covered.
- Host-specific logic stayed out of the DS.
- Docs and snapshot metadata updated when the shared system changed.
