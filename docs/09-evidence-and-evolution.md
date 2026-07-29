# Evidence and evolution

**Status:** v0.1 working reference

**Purpose:** Keep the Singular story honest, current, and distinguishable from
marketing repetition or product inference

The current system is strong enough to guide v0.1 work, but it is not a
completed research repository. Clear evidence status prevents a useful
hypothesis from becoming a fictional customer fact.

## Evidence types

### Documented

Use when a statement is explicitly supported by:

- user or leadership direction;
- canonical product behavior or business rules;
- current approved website direction;
- a traceable customer artifact with permission;
- a Design System contract.

Documented does not always mean externally validated. It means the statement is
present in an authoritative current source.

### Inferred

Use when a statement is consistently suggested by:

- product flows;
- repeated copy patterns;
- roles and permissions;
- existing service structure;
- several aligned but indirect sources.

Inference is appropriate for working design decisions. It must not be quoted as
something customers said.

### Needs validation

Use when the statement is a strategically useful hypothesis with insufficient
evidence.

It should include:

- why the hypothesis matters;
- what current signal suggests it;
- what research or measurement would validate it;
- what decisions should remain reversible meanwhile.

## Claim status

Commercial and outcome claims use a separate system:

| Status | Meaning |
|---|---|
| Verified | Source, method, scope, time period, permission, and approved wording are documented |
| Provisional | Appears in current material, but one or more publication requirements are missing |
| Retired | Contradicted, expired, or no longer approved |

See the complete
[Claims and evidence guidance](../ux-voice/README.md#9-claims-and-evidence).

## Current evidence register

| Statement | Status | Current source | What would strengthen it |
|---|---|---|---|
| Central ICP is a US SMB at approximately USD 5M–20M annual revenue | Documented | User direction and Brand & Voice raw reference | CRM/deal analysis and customer segmentation |
| The client has employees and established operating workflows | Documented | User direction | Employee/maturity segmentation |
| Founder, owner, or operator is the primary economic audience | Documented | User direction and website direction | Buyer interviews and deal-role analysis |
| Business Champion is a distinct change role | Inferred | Brand reference and common buying path | Interviews identifying sponsor roles |
| Team adopters fear additional work and loss of agency | Inferred | Workflow and adoption logic | Direct interviews and usability research |
| Fragmented context and manual coordination are central pains | Documented / inferred | Website positioning and product models | Frequency/severity evidence in customer language |
| AI pilots often fail to change weekly work | Documented direction | Current positioning | Customer examples and adoption metrics |
| Clients prioritize leverage without losing control | Inferred | Product gates, ownership direction, and positioning | Decision-maker interviews |
| Clients own resulting workflow and implementation assets | Documented direction | Website positioning and user decision | Approved contract/service language |
| Singular Stories and Singular Agile are the same product | Documented | User direction | Naming consolidation decision |
| Story is current web terminology and Task is current mobile terminology | Documented | Product repositories | Future cross-product naming decision |
| Business Story and Technical Story are two views of one work item | Documented | iOS product documentation | Cross-product terminology review |
| Studio's primary user is a semi-technical SMB operator | Documented | Studio business rules | Usability sessions with target users |
| Company Brain, Rivers, and Totems improve comprehension | Needs validation | Current marketing material | Comprehension testing |
| Calm authority is the correct brand character | Documented direction | Brand reference and approved manual | Audience response and brand research |
| Blue/cyan is the shared Singular identity | Documented system decision | Design System | Brand governance, not customer pain research |
| First capability in 10 business days | Provisional claim | Current website material | Method, scope, delivery data, and approval |
| Proof of concept in under 45 days | Provisional claim | Current website material | Method, scope, delivery data, and approval |
| Percentage outcome claims in raw material | Provisional claim | Raw reference / website sources | Client-specific source, method, permission |

## Source hierarchy

Use the most relevant authoritative source.

1. **Explicit user and approved leadership direction** for current business
   decisions.
2. **Canonical product documentation and behavior** for roles, states,
   permissions, and product terminology.
3. **Current website and approved commercial material** for external
   positioning.
4. **This narrative documentation** for shared context and foundations.
5. **The UX Writing, Voice & Tone Manual** for language decisions.
6. **The Design System** for shared visual and interaction contracts.
7. **Raw brand references, historical documents, and prototypes** as discovery
   input unless revalidated.

No source is authoritative for every question.

## Current known gaps

### Customer understanding

- No canonical interview repository exists for the central ICP.
- We lack verbatim descriptions of operating pain by role.
- Industry differences are not validated.
- We do not know which emotional tensions are strongest at each buying stage.

### Buying and adoption

- Business Champion role and authority need validation.
- Decision committee and procurement patterns are not documented.
- Team adoption barriers and change-management needs are inferred.
- Weak-fit criteria are not yet an approved sales policy.

### Product

- External client roles across web, mobile, and Studio need one cross-product
  research view.
- Naming between Singular Agile, Singular Stories, Singular Approvals, and
  Singularity needs a future portfolio decision.
- Approval information needs should be tested with real client approvers.
- Studio source, uncertainty, and human-handoff comprehension need testing.

### Claims

- Speed and outcome claims need a central source register.
- Testimonial and logo permissions need explicit ownership and expiry.
- Product mock data must remain visibly distinct from live evidence.

## Research questions to ask next

### Founder / owner / operator

- Which decisions still return to you every week?
- Where does the company lose time reconstructing context?
- Which workflow failure has the clearest business consequence?
- What happened in the last AI or automation initiative?
- What would you never allow an agent to decide or execute alone?
- What proof would make a first capability credible?
- What must your company own after working with a partner?

### Business Champion / workflow owner

- What must you coordinate manually today?
- Which stakeholders disagree about the current workflow?
- Where do exceptions live?
- What would make adoption fail?
- What information must leadership see before approving the initiative?
- How would you measure a useful first win?

### Team adopter

- What do you copy, search for, or chase repeatedly?
- When do you avoid the official system?
- What makes an automated result trustworthy?
- What correction or escalation path do you need?
- Which change would remove work rather than create another step?

### Product approver

- What do you inspect before authorizing scope?
- What distinguishes evidence from confidence?
- Which terms are unclear?
- What needs to be visible on mobile?
- What would make you stop or defer approval?

## Research capture template

```markdown
# Research note

Date:
Participant role:
Company context:
Researcher:
Permission / privacy boundary:

## Trigger and job

## Current workflow

## Pain and consequence

## Workaround

## Decision criteria

## Trust and control needs

## Verbatim evidence

## Researcher interpretation

## Contradictions or unknowns

## Documentation decisions affected
```

Keep verbatim evidence separate from interpretation.

## How the documentation evolves

When new evidence changes the story:

1. identify the source and evidence level;
2. update the canonical upstream document;
3. review downstream foundations and decisions;
4. update the Voice & Tone Manual if language changes;
5. update DS architecture or surface guidance if a shared contract changes;
6. leave product-domain behavior in the product repository;
7. record the meaningful decision in a pull request or changelog;
8. revalidate links and the skill bundle.

Do not patch several downstream examples while leaving the canonical user or
problem definition unchanged.

## Conflict resolution

When sources disagree:

1. Product behavior wins for what the product currently does.
2. Explicit approved business direction wins for current positioning.
3. Customer research wins for what customers experience, within its scope.
4. This documentation explains the shared interpretation.
5. Raw or historical material remains context, not automatic authority.

If the disagreement changes a material decision, record the trade-off rather
than silently selecting one phrase.

## Ownership

| Area | Owner | Reviewers |
|---|---|---|
| Client context and shared user model | Product Design | Leadership, Marketing, Product |
| Marketing audience and positioning | Marketing | Leadership, Product Design |
| Product roles and behavior | Product owner for each product | Product Design, Engineering |
| Experience foundations | Product Design | Marketing, Product owners |
| Voice & Tone | Product Design | Marketing, Product owners |
| Claims and permissions | Marketing / Leadership | Legal or client owner when required |
| Design System | Product Design | Product and Engineering |
| Research evidence | Research owner / Product Design | Relevant stakeholders |

## v0.1 boundary

This documentation may guide current work. It must not be used to:

- invent customer quotes;
- claim research that did not occur;
- publish provisional metrics;
- define product permissions outside the product repository;
- imply the current ICP is permanently fixed;
- treat a metaphor as a validated mental model.

The system becomes more specific as evidence improves, not more certain through
repetition.

---

**Previous:** [Application map](./08-application-map.md)

**Return to:** [Start here](./README.md)
