# Apply & evolve

## Route by intent

Use Marketing when the communication helps someone recognize a problem,
evaluate Singular, trust an approach or claim, or choose a commercial next
step.

Use Product when it helps someone understand or change a state, review scope or
evidence, recover, approve, authorize, accept, or interpret AI behavior.

The channel does not decide the intent. A release deck may use Product writing;
a website support message may also use Product writing.

## Route by surface

| Surface | Start with | Apply |
|---|---|---|
| Website, proposal, case study, social | [Client reality](./01-client-context.md) | [Marketing manual](../ux-voice/marketing.md) + surface guide |
| Singular Stories | Product role and current state | [Product manual](../ux-voice/product.md) + web-app guide + product rules |
| Singular Approvals iOS | Approver's decision and consequence | [Product manual](../ux-voice/product.md) + iOS guide + approval rules |
| Singularity Studio | Operator intent, sources, and risk | [Product manual](../ux-voice/product.md) + Studio guide + run rules |
| Slides | Audience, evidence, and requested decision | Marketing or Product manual + slides guide |
| Email | Message intent and required action | Marketing or Product manual + email guide |
| Shared DS change | User need and semantic responsibility | [The Singular model](./05-experience-foundations.md) + architecture and adoption guidance |

## Trace a material decision

Use this record:

```markdown
## Decision

Context:
Person and job:
Pain or risk:
Evidence:
Foundation:
Decision and trade-off:
System owner:
Application:
Validation:
```

Use it only when a choice changes shared meaning, state communication, a
consequential action, or more than one surface.

## Worked decision: product approval

**Context:** A client approver reviews proposed Sprint scope on mobile before
work begins.

**Person and job:** The executive approver must authorize selected work without
reconstructing the full project.

**Pain or risk:** A generic “Approve” action hides scope, commitment, excluded
work, and the resulting state.

**Evidence:** The current product distinguishes Pre-Work authorization,
selected Tasks, Story Points, identity confirmation, and Post-Work acceptance.

**Foundations:** Preserve relevant context; make commitments explicit; keep
meaningful human control.

**Decision:** Show phase, selected scope, total SP, project context, consequence,
and approver identity before the final action. Label it **Authorize scope**.
Mobile may reduce supporting detail, but not decision information.

**System owner:** The Design System owns hierarchy and interaction patterns.
The product owns selection, permission, identity, and state transition.

**Validation:** An approver can explain what is included, what changes after
authorization, and what remains proposed.

## Evidence appendix

### Evidence labels

- **Documented:** explicit in approved direction, product behavior, traceable
  customer evidence, or a Design System contract.
- **Inferred:** consistently suggested by product structure, flows, or aligned
  indirect sources.
- **Needs validation:** useful hypothesis with insufficient evidence.

Documented does not automatically mean customer-validated. Inferred content
may guide reversible work but cannot be presented as a customer quote.

### Claim status

- **Verified:** source, method, scope, period, permission, and wording are
  approved.
- **Provisional:** at least one publication requirement is missing.
- **Retired:** expired, contradicted, or no longer approved.

Historical promises such as 10 business days, under 45 days, 75%, 90%, 40%,
pricing, ROI, testimonials, and client logos remain provisional until their
source, method, scope, and permission are recorded.

### Current evidence boundary

Documented direction includes the USD 5M–20M central ICP, established operating
workflows, founder/owner/operator audience, client ownership, current product
roles and naming, and the shared blue/cyan identity.

Direct research is still needed for pain frequency in customer language,
industry differences, Business Champion authority, buying committees, adoption
barriers, approval information needs, and comprehension of Company Brain,
Rivers, and Totems.

## Ownership

| Area | Owner | Review |
|---|---|---|
| Client model and foundations | Product Design | Leadership, Marketing, Product |
| Marketing positioning and public examples | Marketing | Leadership, Product Design |
| Product roles, states, and terminology | Product owner | Product Design, Engineering |
| Claims, testimonials, and permissions | Marketing / Leadership | Relevant legal or client owner |
| Design System | Product Design | Product, Engineering |
| Research evidence | Research owner / Product Design | Relevant stakeholders |

## How the system changes

When evidence changes the story:

1. update the canonical upstream concept;
2. review the downstream Brand, Marketing, Product, and DS implications;
3. keep domain behavior in the product repository and record the material
   decision;
4. verify links, skill packaging, and the published documentation.

When sources conflict, current product behavior wins for what the product does;
approved business direction wins for positioning; customer research wins for
the experience it studied. Historical material remains input, not authority.

**Previous:** [Product manual](../ux-voice/product.md)

**Return to:** [Start here](./README.md)
