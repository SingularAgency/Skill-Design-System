# Architecture

## The model

Use four layers. Promote a decision upward only when at least two products need
the same contract and the decision is not business-specific.

| Layer | Owns | Must not own |
|---|---|---|
| Foundation | Brand anchors, semantic color, type roles, spacing, radius, motion, accessibility | Framework APIs or product entities |
| Platform | CSS/Tailwind mapping, SwiftUI mapping, email compatibility, image/slide constraints | Page or workflow composition |
| Surface | Website, app, Studio, iOS, slides, social and email patterns | Customer data, routes, permissions or orchestration |
| Domain | Stories, approvals, Studio agents, website content | Shared brand foundations |

The machine-readable map is `design-system.json`.

## Color model

Singular has one blue/cyan identity, but identity and interaction are different
roles:

- `--brand-primary`: stable identity anchor, `#4567ed`.
- `--brand-cyan`: stable gradient endpoint, `#22d3ee`.
- `--primary`: primary interaction color for the active profile.
- `--interactive*`: links, focus and lightweight affordances.
- `--button-*`: filled CTA behavior.
- status tokens: semantic and independent from brand.

The website uses the brand anchor as its base primary. Data-heavy product
surfaces may use the brighter action blue `#0b84ff` for controls and charts
without changing the corporate identity.

## Profiles

| Profile | Product | Character |
|---|---|---|
| `website-landing` | singular-landing | Narrative, editorial, dark-first, expressive accents |
| `web-app` | Singular Stories web | Dense operational UI, light/dark, data and workflow |
| `studio` | Singularity Studio | Chat + preview + agent trace + evidence, dark-first |
| `ios-app` | Singular Stories iOS | Native SwiftUI, approvals and triage, Dynamic Type |
| `slides` | Presentations | 16:9 narrative and data layouts |
| `social` | Marketing assets | Fixed canvases and safe zones |
| `email` | Marketing/transactional email | Inline, table-based compatibility |

## Promotion rule

Before adding a shared primitive:

1. Identify its user job and state model.
2. Confirm an existing primitive cannot be extended.
3. Remove routing, providers, data fetching, permissions and product copy.
4. Define accessibility and responsive behavior.
5. Add it to the component inventory and the relevant surface guide.
6. Validate it in at least one real host product.

Keep domain color systems such as OKR, PERT, approval phases and agent pipeline
states out of foundation tokens. A surface may map those domain states to
semantic roles.
