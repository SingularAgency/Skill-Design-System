# Profile: iOS app / SwiftUI

Use this profile for Singular Stories mobile and future native client apps.
Follow Apple platform behavior first, then map Singular identity through
semantic tokens and reusable native primitives.

## UX writing

Start with the [client approver](../../docs/01-client-context.md#the-people-in-the-change)
and the traced [product approval decision](../../docs/08-application-map.md#worked-decision-product-approval).
Read [Product voice and tone](../../ux-voice/product.md)
for concise context, approvals, evidence, errors, recovery, and agent content.
Use `Task` in mobile-facing copy and preserve exact action consequences before
biometric or final confirmation.

## Source files

- `SingularFoundation.swift`: color, typography, spacing, radius, icon and
  elevation contracts.
- `SingularPrimitives.swift`: surfaces, segmented controls, action buttons,
  detail headers, metric tiles and empty states.

Copy both files into the app target, then keep product-specific semantic roles
in the host app.

## Platform mapping

| Web role | SwiftUI role |
|---|---|
| `--background` | `Color.singularBackground` |
| nested page background | `Color.singularBackgroundSecondary` |
| `--card` | `Color.singularPanel` |
| `--muted` / nested surface | `Color.singularPanelRaised` |
| `--foreground` | `Color.singularTextPrimary` |
| `--muted-foreground` | `Color.singularTextSecondary` |
| tertiary metadata | `Color.singularTextMuted` |
| brand anchor | `Color.singularBrand` |
| product action | `Color.singularAction` |
| spacing/radius vars | `SingularSpacing` / `SingularRadius` |

Use SF Pro through semantic `Font.system` roles. Do not force Poppins/Inter into
native UI; the brand is carried by color, hierarchy, shape and assets while
Dynamic Type and platform legibility remain native.

## Rules

- Use native navigation, sheets, menus, share, biometrics and accessibility.
- Minimum touch target: 44pt.
- Support Dynamic Type without clipped primary actions.
- Use continuous rounded rectangles and the radius scale.
- Keep status color subtle: icon, label, stroke or soft fill.
- Use `SingularSemanticTone` for portable neutral/info/success/warning/error
  treatment. Map approval phases, sprint stages and other domain enums to those
  tones inside the host app.
- Use `SingularSurface` rather than repeating rounded rectangle chrome.
- Use `SingularActionButtonStyle`; avoid mixing arbitrary native button styles
  across product surfaces.
- Treat light/dark values as semantic dynamic colors.
- Keep approval, KYC, Slack and Stories hierarchy outside this profile.

## Mobile information hierarchy

Mobile is for triage, review and focused action. Prefer:

1. concise context;
2. the decision or next action;
3. supporting evidence;
4. secondary metadata on demand.

Do not compress desktop planning tables into mobile. Recompose them as rows,
cards, drill-down screens or native lists.

## State and feedback

- Loading: preserve layout and announce progress where necessary.
- Empty: explain whether the state is complete, filtered or unavailable.
- Error: state what failed and provide recovery.
- Success: use restrained confirmation; no multicolor confetti.
- Destructive/approval: show scope before biometric or final confirmation.
- Offline: distinguish cached information from confirmed live state.

## Adoption

The current `ss-ios-prototype` validated the expanded background/text roles,
Dynamic Type typography and soft semantic treatments in a real Swift 6 build.
Keep its `ApprovalPhase`, `WorkSurface`, KYC, Slack and Stories mappings in the
app repository; only the generic `SingularSemanticTone` contract is portable.
