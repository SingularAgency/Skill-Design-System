# Product voice & tone

**Use for:** Singular Stories, Singular Approvals, Singularity Studio,
transactional email, notifications, and product-facing Design System guidance

**Owner:** Product Design; reviewed by product owners

Product writing supports informed action—not persuasion—by making state, scope,
evidence, consequence, and the next action clear. It applies
[Client reality](../docs/01-client-context.md) and
[Brand & core voice](../brand/README.md); product repositories remain canonical
for roles and permissions.

## The reader's job

Product copy responds to the job at the current decision point:

- a client approver evaluates scope or delivery;
- a client operator coordinates work and exceptions;
- a delivery role moves, proves, or verifies work;
- a Singularity operator expresses intent and reviews AI-assisted change;
- an admin changes broad operational state.

The same person may occupy several roles. Write for what they need to
understand or decide now.

## Default tone

Product tone is **calm, precise, operational, transparent, concise, and
non-defensive**.

Warmth never replaces information. Reassurance needs a fact: preserved work, a
reversible action, a known owner, or a recovery path.

Use this information order when it applies:

```text
what happened or is required
→ what it affects
→ evidence, limitation, or consequence
→ available action
→ resulting state
```

For high-consequence decisions, show scope and consequence before the action.

## Actions and commitments

Use an exact verb and object:

- “Authorize scope”
- “Accept delivery”
- “Add evidence”
- “Request fixes”
- “Review diff”
- “Delete Task”

Avoid “Submit,” “Confirm,” “Continue,” or “Done” when the actual transition is
known.

An action label, confirmation, permission, and success message must describe
the same state change. Proposed, selected, authorized, in progress, delivered,
QA-complete, accepted, released, published, and paid are not interchangeable.

## State copy

| State | Copy must answer | Example |
|---|---|---|
| Loading | What meaningful activity is happening? | “Preparing the preview…” |
| Empty | What is absent, why, and is action available? | “No Stories need your review. New work will appear here at Client Review.” |
| Error | What failed, what was affected or preserved, and how to recover? | “We couldn't save these changes. Your previous version is still available. Try again.” |
| Success | What completed and what state exists now? | “Evidence added. This Story is ready for QA.” |
| Disabled | Why is the action unavailable and how can it become available? | “Add delivery evidence before sending this Story to QA.” |
| Notification | What changed, which object, why this person, and what action? | “QA returned SNG-142 for fixes. Review the finding.” |

Do not add an action when there is no useful action. Do not expose internal
implementation detail unless the person needs it to recover or report the
problem.

## Warnings and destructive actions

Name the action, affected object and scope, consequence, reversibility, and
exact final action.

**Title:** Delete Story SNG-142?

**Body:** Its evidence and history will be permanently removed from Sprint 18.
This can't be undone.

**Actions:** Cancel / Delete Story

“Are you sure?” is not decision information.

## Authorization, approval, and acceptance

These are different commitments.

- **Authorize:** approve proposed scope before execution.
- **Accept:** accept delivered work after QA.
- **Approve:** use only when product policy defines approval as the action.

Before a high-consequence decision, show the relevant phase, selected Stories
or Tasks, Story Points when used, project context, evidence or brief, approver
identity, resulting state, and what is excluded.

### Product approval example

**Decision:** Authorize 8 Stories · 42 SP

**Context:** Project Atlas · Sprint 18 · Pre-Work

**Consequence:** The selected scope can enter Sprint planning. Unselected
Stories remain proposed.

**Primary action:** Authorize scope

Mobile may reduce detail, but not the information required for informed
authorization.

## Evidence and QA

- Attribute evidence and explain what it supports.
- Separate delivery evidence, QA findings, and client acceptance.
- When returning work, name the finding and required correction.
- Preserve history and attribution; evidence alone does not prove acceptance
  or business impact.

## AI communication

AI writing distinguishes:

- what the system understood, plans, or changed;
- its sources, inferences, and unconfirmed information;
- whether the result is a proposal, preview, artifact, or confirmed external
  outcome;
- what requires human judgment.

| Agent state | Meaning | Example |
|---|---|---|
| Understanding | Interpreting intent and constraints | “Reviewing the request and product rules…” |
| Planning | Mapping scope and affected surfaces | “Mapping the screens and states affected…” |
| Working | Creating or checking a proposal | “Updating the sandbox preview…” |
| Review | Result and evidence are available | “The preview and diff are ready for review.” |
| Blocked | Input or expert judgment is required | “I need the target environment before I can continue.” |
| Failed | Work stopped and recovery is available | “The update failed. Your previous preview is still available.” |
| Published | An external destination confirmed publication | “Published to staging at 14:32 UTC.” |

Never infer published, live, merged, approved, released, or paid from an
animation, generated text, local state, or optimistic UI.

When uncertainty affects a decision, use:

```text
What I found
What I inferred
What I could not confirm
What I need from you
```

Do not hide a named unknown inside vague language such as “may” or “probably.”

## Product terminology

### Singular Stories and Singular Agile

They are the same product. Use **Singular Agile** only in current marketing
contexts and **Singular Stories** in product and repository contexts. Never
describe them as separate products.

### Story and Task

Stories web uses **Story**. Mobile uses **Task**. Business Story and Technical
Story are two views of the same work item. Preserve the visible term of the
surface and explain the mapping only when both must appear.

### Singularity Studio

Use request, change, run, preview, diff, and sources for Studio work. Use Story
only when Studio explicitly hands work to Singular Stories.

Use Key Project in current user-facing product copy; do not expose Epic as a
parallel visible hierarchy.

## Product review

- Does the copy match the person's role, permission, and current state?
- Are scope, consequence, owner, transition, and resulting state clear?
- Are evidence, limitations, and recovery visible where needed?
- Does AI copy separate sources, inference, and external outcome?

**Previous:** [Marketing manual](./marketing.md)

**Next:** [Apply & evolve](../docs/08-application-map.md)
