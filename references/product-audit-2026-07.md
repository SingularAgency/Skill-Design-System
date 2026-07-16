# Product audit — July 2026

This audit reviewed the current working trees of the four active Singular
products. Counts are directional because product repos include prototypes,
email markup and domain visualizations with legitimate literals.

| Product | Files scanned | Hex literals | Radius literals | Token refs | Main gap |
|---|---:|---:|---:|---:|---|
| singular-landing | 403 | 1088 | 201 | 668 | More accents and page recipes exist than the DS documented; local primitives still mix host shell concerns |
| v0-singular-stories-app | 454 | 508 | 18 | 209 | Central app profile was behind; data, pagination, hints, status editing and AI process patterns were not represented |
| ss-ios-prototype | 24 | 26 | 66 | 137 | No central iOS profile; color and radius definitions still exist outside the modular folder |
| singularity-2026 | 42 | 0 | 0 | 19 | No upstream Studio profile; snapshot copying is manual and unversioned |

The scan excludes vendored `design-system/singular/` files and documentation.
It is a discovery metric, not a pass/fail score.

## Cross-product findings

### Stable foundations

- Blue/cyan remains the shared identity.
- Poppins/Inter/JetBrains Mono is the web typography family.
- Dark operational surfaces, subtle semantic color and rounded controls are
  consistent across products.
- `BrandBackground`, semantic status, pill controls and layered cards have
  become recognizable system patterns.

### Drift to reconcile

- Brand anchor `#4567ed` and product action blue `#0b84ff` were treated as one
  token. The refactor separates identity from interaction.
- Website page accents expanded beyond the previous DS list.
- Stories added reusable data, form-help, pagination and AI-action patterns.
- iOS uses Apple system type rather than forcing web fonts; this is correct and
  should be documented as a platform mapping.
- Singularity uses a specialized chat/canvas shell that should not be forced
  into generic dashboard navigation.

### Keep product-local

- Stories OKR, PERT, payments and entity modal business logic.
- iOS approval/KYC/biometric state and product hierarchy.
- Studio agent orchestration, SSE parsing, MCP/publish behavior and mock preview.
- Landing routes, booking providers, navigation, footer, SEO and commercial
  content.

## Recommended sequence

1. Publish the architecture, manifest and AI contract.
2. Add iOS and Studio profiles.
3. Reconcile app interaction tokens with Stories.
4. Add snapshot export and drift audit tools.
5. Update product snapshots in separate, product-owned PRs.
6. Promote additional components only after API cleanup and host validation.
