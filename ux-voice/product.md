# Product voice & tone

**Use for:** Singular Stories, Singular Approvals, Singularity Studio,
transactional email, notifications, and product-facing Design System guidance

**Owner:** Product Design; reviewed by product owners

Product writing supports informed action—not persuasion—by making state, scope,
evidence, consequence, and the next action clear. It applies
[Client reality](../docs/01-client-context.md) and
[Brand & core voice](../brand/README.md); product repositories remain canonical
for roles and permissions.

At its best, Singular product copy feels like a calm operator beside the user:
clear about what happened, honest about what is unknown, and ready with the
next useful action.

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

## Human without performance

Product language is human when it respects the person's situation. It does not
need jokes, celebration, apology theatre, or vague reassurance.

These are illustrative copy patterns. Product repositories still determine the
actual transition, permission, preservation, and recovery behavior.

| Situation | Not Singular | Singular |
|---|---|---|
| Reassurance | “Don't worry—your work is safe!” | “Your previous version is still available.” |
| Error | “Oops! Something went wrong.” | “We couldn't save the change. Try again.” |
| Success | “Awesome! You did it!” | “Scope authorized. Sprint planning can begin.” |
| Waiting | “Sit tight while the magic happens…” | “Preparing 8 Stories for review…” |
| Permission | “You aren't allowed to do that.” | “Only Client Approvers can authorize scope.” |
| Required input | “We need you to fix an issue.” | “Add the missing delivery evidence before sending this Story to QA.” |
| Help | “Need help?” | “Review what each approval state means.” |
| Responsibility | “The system rejected your request.” | “QA returned this Story because the required delivery evidence is missing.” |

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

### Action examples

| Intent | Not Singular | Singular |
|---|---|---|
| Authorize proposed work | “Submit” | “Authorize scope” |
| Accept delivered work | “Confirm” | “Accept delivery” |
| Inspect an AI-assisted change | “Continue” | “Review diff” |
| Complete QA | “Done” | “Mark QA complete” |
| Return work | “Send back” | “Request fixes” |
| Preserve a draft | “Save” | “Save draft” |
| Retry an upload | “Try again” | “Retry evidence upload” |
| Publish a reviewed change | “Proceed” | “Publish to staging” |
| Dismiss a destructive dialog | “No” | “Keep Story” |
| Remove an object | “Yes, delete” | “Delete Story” |

## State copy

State copy names what is happening, what it affects, and the useful next action.

| State | Not Singular | Singular |
|---|---|---|
| Loading approval | “Loading…” | “Preparing Sprint 18 approval…” |
| Loading rules | “Working…” | “Checking 8 Stories against Sprint rules…” |
| Empty review queue | “Nothing here.” | “No Stories need your review. New work will appear here at Client Review.” |
| Empty evidence | “No data.” | “No delivery evidence yet. Add evidence before sending this Story to QA.” |
| Empty search | “No results.” | “No Stories match ‘renewal’. Try a Story ID or clear the filters.” |
| Save error | “Something went wrong.” | “We couldn't save these changes. Your previous version is still available. Try again.” |
| Load error | “Error 500.” | “We couldn't load Sprint 18. Refresh the page or return to Projects.” |
| Upload error | “Upload failed.” | “We couldn't upload `renewal-report.pdf`. The Story was not changed. Retry the upload.” |
| Success | “Success!” | “Evidence added. This Story is ready for QA.” |
| Authorization success | “All done.” | “Scope authorized. 8 Stories can enter Sprint planning.” |
| Disabled action | “Action unavailable.” | “Add delivery evidence before sending this Story to QA.” |
| Notification | “New update.” | “QA returned SNG-142 for fixes. Review the finding.” |
| Stale version | “Conflict detected.” | “Ana saved a newer version of this Story. Review her changes before saving yours.” |
| Offline | “Network error.” | “You're offline. We can't save this draft until the connection returns.” |

Do not add an action when there is no useful action. Do not expose internal
implementation detail unless the person needs it to recover or report the
problem.

### Complete error and recovery example

**Not Singular**

**Title**

> Something went wrong

**Body**

> Please try again later.

**Action**

> OK

**Singular**

**Title**

> We couldn't publish to staging

**Body**

> Staging did not confirm the update. The previous staging version is still
> available, and production is unchanged.

**Actions**

> Review diff / Retry publication

## Warnings and destructive actions

Name the action, affected object and scope, consequence, reversibility, and
exact final action. “Are you sure?” is not decision information.

| Situation | Not Singular | Singular |
|---|---|---|
| Delete a Story | **Are you sure?** This can't be undone. | **Delete Story SNG-142?** Its evidence and history will be permanently removed from Sprint 18. **Keep Story / Delete Story** |
| Delete a Sprint | **Delete item?** | **Delete Sprint 18?** Its 8 Stories will return to the backlog. Delivery evidence will remain available. **Keep Sprint / Delete Sprint** |
| Remove evidence | **Remove file?** | **Remove `renewal-report.pdf`?** QA will no longer be able to use it as delivery evidence. **Keep evidence / Remove evidence** |
| Revoke access | **Confirm access change** | **Remove Jo from Project Atlas?** She will lose access immediately but her activity history will remain. **Keep access / Remove access** |
| Discard a preview | **Discard changes?** | **Discard this preview?** The last published version will not change. **Keep preview / Discard preview** |
| Publish externally | **Ready to continue?** | **Publish to staging?** This makes the reviewed version available at the staging URL. Production will not change. **Cancel / Publish to staging** |

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

### Approval and evidence examples

| Situation | Not Singular | Singular |
|---|---|---|
| Proposed scope | “8 items selected” | “8 Stories · 42 SP selected for authorization” |
| Authorization | “Approve work” | “Authorize 8 Stories for Sprint planning” |
| Authorization result | “Approved!” | “Scope authorized by Ana Torres at 14:32 UTC.” |
| Delivered work | “Completed” | “Delivery evidence added. This Story can move to QA.” |
| QA pass | “Approved by QA” | “QA complete. This Story is ready for Client Review.” |
| QA return | “QA failed” | “QA returned this Story: the mobile approval state is missing from the evidence.” |
| Client acceptance | “Confirm” | “Accept delivery” |
| Acceptance result | “Work approved” | “Delivery accepted by Marcus Lee. The Story is ready for release.” |
| Evidence label | “Attachment” | “Delivery evidence · `approval-flow.mov` · Added by Jo” |
| Evidence meaning | “Evidence uploaded” | “This recording supports the mobile approval acceptance criteria.” |
| Missing evidence | “Required field” | “Add evidence for the offline approval state before sending this Story to QA.” |
| Business outcome | “Project successful” | “Delivery was accepted. Renewal impact remains unconfirmed.” |

## AI communication

AI writing distinguishes:

- what the system understood, plans, or changed;
- its sources, inferences, and unconfirmed information;
- whether the result is a proposal, preview, artifact, or confirmed external
  outcome;
- what requires human judgment.

| Agent state | Meaning |
|---|---|
| Understanding | Interpreting intent and constraints |
| Planning | Mapping scope and affected surfaces |
| Working | Creating or checking a proposal |
| Review | Result and evidence are available |
| Blocked | Input or expert judgment is required |
| Failed | Work stopped and recovery is available |
| Published | An external destination confirmed publication |

Never infer published, live, merged, approved, released, or paid from an
animation, generated text, local state, or optimistic UI.

### AI response examples

| Situation | Not Singular | Singular |
|---|---|---|
| Understanding | “Thinking…” | “Reviewing the request, product rules, and affected surfaces…” |
| Planning | “Creating your experience…” | “Mapping the approval states affected on web and iOS…” |
| Working | “Making magic happen…” | “Updating the sandbox preview and checking the diff…” |
| Sources | “Based on your data…” | “I used `product-rules.md`, Sprint 18, and the current iOS approval flow.” |
| Inference | “The user wants a simpler flow.” | “I inferred that mobile approvers need less supporting detail. The approval requirement does not state that explicitly.” |
| Unknown | “This should work.” | “I couldn't confirm the production callback URL. I need that value before testing publication.” |
| Proposal | “I updated the product.” | “I prepared a proposal in the sandbox. Nothing has been published.” |
| Local result | “The change is live.” | “The local preview is ready. Staging and production are unchanged.” |
| Partial result | “Done.” | “The web preview is ready. The iOS mapping is blocked by a missing permission rule.” |
| Blocked | “I can't continue.” | “I need the target environment and approver role before I can continue.” |
| Failure | “Generation failed.” | “The preview update failed. Your previous preview is still available. Retry the run.” |
| Review | “Looks good!” | “The preview and diff are ready. Review the authorization and empty states before publishing.” |
| External action | “Published successfully.” | “Staging confirmed publication at 14:32 UTC. Production is unchanged.” |
| Permission | “You don't have access.” | “Only Project Admins can publish this change. You can still review the diff.” |
| Confidence | “I'm 95% confident.” | “The source confirms the web behavior. The iOS recovery state is still an inference.” |
| Human decision | “Approve my plan to continue.” | “Choose whether this run should update the web approval flow only or include the iOS Task view.” |

When uncertainty affects a decision, use:

```text
What I found
What I inferred
What I could not confirm
What I need from you
```

Do not hide a named unknown inside vague language such as “may” or “probably.”

### Complete AI limitation example

**Not Singular**

> I think the approval flow should work now. I'm 90% confident. Approve my plan
> and I can finish the rest.

**Singular**

**What I found**

> The web rules require approver identity, selected scope, total Story Points,
> and the resulting state.

**What I inferred**

> The iOS Task view should preserve the same decision information with less
> supporting detail.

**What I could not confirm**

> The repository does not define the offline recovery state.

**What I need from you**

> Choose whether this run should stop at the online approval flow or wait for
> the offline rule.

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

### Terminology examples

| Situation | Not Singular | Singular |
|---|---|---|
| Product name in UI | “Singular Agile module” | “Singular Stories” |
| Product name in current marketing | “Singular Stories platform” | “Singular Agile” |
| Web work item | “Task SNG-142” | “Story SNG-142” |
| Mobile work item | “Story SNG-142” | “Task SNG-142” |
| Work item views | “Business Story and Technical Story are linked items.” | “Business Story and Technical Story are two views of the same work item.” |
| Studio work | “The AI created a Story.” | “The run produced a preview and diff.” |
| Hierarchy | “Open Epic Atlas.” | “Open Key Project Atlas.” |
| External state | “The change is live.” | “Published to staging. Production is unchanged.” |

## Product review

- Does the copy match the person's role, permission, and current state?
- Are scope, consequence, owner, transition, and resulting state clear?
- Are evidence, limitations, and recovery visible where needed?
- Does AI copy separate sources, inference, and external outcome?

**Previous:** [Marketing manual](./marketing.md)

**Next:** [Apply & evolve](../docs/08-application-map.md)
