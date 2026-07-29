# Experience foundations

**Status:** v0.1 working reference

**Purpose:** Convert the client and problem model into principles that govern
brand, content, product, and Design System decisions

These foundations are the bridge between strategy and execution. They explain
why Singular should sound, look, and behave the way it does.

## The core experience promise

At every meaningful point, a Singular experience should help the person answer:

1. Where am I in the work?
2. What is happening or required?
3. Why does it matter?
4. What context or evidence supports it?
5. What is known, inferred, or still uncertain?
6. Who owns the next action or decision?
7. What happens next?
8. What remains under human control?

Not every screen or message needs to display all eight answers. The experience
must preserve the answers required for the current job and consequence.

## Foundation map

| Client reality | Experience foundation |
|---|---|
| Context is fragmented | Preserve relevant context |
| Complexity has grown | Make complexity navigable |
| Decisions return to key people | Make ownership and commitments explicit |
| Status lacks proof | Use evidence before assertion |
| AI creates uncertainty | Expose system behavior and limits |
| Automation creates anxiety | Keep meaningful human control |
| Tools fail to become workflow | Design for adoption |
| Buyers distrust hype | Express calm authority |

## 1. Start from operating reality

### Why

The client does not need another abstract AI category. They need to recognize
the work that is slow, fragile, or dependent on private knowledge.

### Principle

Begin with the user's operating job, current workflow, trigger, and consequence
before selecting a feature, component, agent, or message.

### In content

- Name the operating problem before the tool.
- Explain how the workflow changes.
- Connect activity to an observable outcome.

### In product

- Organize around user decisions and work states.
- Preserve the hierarchy that gives an item meaning.
- Do not expose internal implementation structure as the user's primary model.

### Design check

Can the decision be explained without mentioning the technology first?

## 2. Make complexity navigable

### Why

The client's operation is genuinely complex. Pretending it is simple hides
scope, exceptions, and consequence.

### Principle

Use hierarchy, sequence, grouping, and progressive disclosure to make
complexity understandable without erasing it.

### In content

- One primary idea per block.
- Distinguish context, decision, impact, evidence, and next step.
- Use plain English before specialist terms.

### In product

- Stable page and navigation hierarchy.
- Summary before detail.
- Dense information remains grouped and scannable.
- Mobile prioritizes the decision, not every desktop field.

### Design check

Can a first-time reader find the main point and then inspect the necessary
detail?

## 3. Preserve relevant context

### Why

People lose time reconstructing why work exists and how it connects to the
business.

### Principle

Carry forward the minimum context needed to interpret or act.

### Relevant context may include

- Client and Project;
- Objective and Key Result;
- Key Project;
- Sprint and atomic work item;
- owner and approver;
- environment and version;
- source and evidence;
- due date or decision date;
- prior state and next state.

### In content

Name the affected workflow, owner, and business consequence.

### In product

Keep decision briefs, breadcrumbs, source traces, and linked entities available
at the point of action.

### Design check

Would the user need to open another tool or ask another person to interpret
this state?

## 4. Make ownership and commitments explicit

### Why

Ambiguous ownership sends decisions back to founders, operators, and managers.

### Principle

Name who owns the next action and distinguish every state that changes a
commitment.

### Required distinctions

- proposed;
- selected;
- authorized;
- in progress;
- delivered;
- QA-complete;
- accepted;
- released;
- published;
- paid.

### In content

Use exact verbs and objects. Avoid generic “Submit,” “Confirm,” or “Done” when
the resulting state is known.

### In product

Action labels, confirmation content, permissions, and state feedback must
describe the same transition.

### Design check

Can the user predict what changes, who becomes responsible, and whether the
action can be undone?

## 5. Use evidence before assertion

### Why

Activity, confidence, and visual polish do not prove delivery or business
impact.

### Principle

Show the source, evidence, scope, and confirmation boundary appropriate to the
claim or state.

### In content

- Separate proof from promise.
- Define metrics and comparison periods.
- Mark claims as verified, provisional, or retired.
- Never manufacture testimonials, approvals, or quotes.

### In product

- Separate delivery evidence, QA evidence, and client acceptance.
- Show source trace for agent work.
- Never infer external publication from local success.

### Design check

What would a skeptical reader need to verify this statement?

## 6. Keep automation under meaningful human control

### Why

The client wants leverage without opaque or irreversible action.

### Principle

Make automated behavior inspectable, bounded, and interruptible where the
product supports it. Route consequential ambiguity and risk to human judgment.

### In content

- Explain what the system understood and could not confirm.
- Do not use reassurance without a recovery fact.
- Name when an expert decision is required.

### In product

- Expose agent state, sources, and limitations.
- Show scope before destructive or approval actions.
- Provide review, revise, cancel, stop, or handoff when supported.
- Do not show controls the user cannot use.

### Design check

Does the user understand what the system can do, what it did, and where their
decision still matters?

## 7. Design for adoption, not delivery alone

### Why

A working implementation can still fail if it adds effort, ignores exceptions,
or does not fit the team's weekly work.

### Principle

Treat comprehension, exception handling, recovery, and operating ownership as
part of the capability.

### In content

- Explain the changed workflow, not only the feature.
- Use terminology the role already understands.
- Make escalation and next steps actionable.

### In product

- Cover loading, empty, error, success, disabled, permission, and offline or
  delayed states when relevant.
- Preserve history and attribution.
- Avoid parallel workflows that duplicate existing decision channels.

### Design check

Can the intended user use, correct, and explain this capability in real work?

## 8. Express calm authority

### Why

The buyer and user are making consequential decisions. Hype increases distance
from the operating reality and weakens trust.

### Principle

Communicate through judgment, specificity, structure, and restraint.

### In voice

Singular is:

- clear;
- sharp;
- structured;
- transparent;
- outcome-driven;
- human.

See the full
[UX Writing, Voice & Tone Manual](../ux-voice/README.md#4-core-singular-voice).

### In visual design

Singular should feel:

- coherent rather than ornamental;
- precise rather than sterile;
- alive rather than theatrical;
- premium through hierarchy and craft, not excess;
- calm even when the underlying system is active.

The blue/cyan identity, restrained motion, semantic status, legible hierarchy,
and controlled backgrounds express this character. They are brand decisions,
not claims that a color has been validated through user research.

### Design check

Is confidence coming from clear information and craft, or from spectacle?

## Accessibility is foundational

Accessibility is not a surface-specific enhancement.

Singular experiences must:

- preserve contrast;
- communicate status beyond color;
- support keyboard and assistive technology;
- respect Dynamic Type on native platforms;
- provide meaningful focus and touch targets;
- reduce or remove motion when requested;
- use language that is understandable without visual context;
- avoid time pressure unless the underlying task truly requires it.

This is especially important because clarity, control, and evidence cannot be
available only to users who perceive or interact with the default presentation.

## Shared principles, different expressions

The foundation remains stable while tone and density change by job.

| Context | Foundation emphasis |
|---|---|
| Marketing | Recognition, operating future, mechanism, proof, next step |
| Singular Stories | Context, state, commitment, evidence, ownership |
| iOS approvals | Decision quality, concise scope, consequence, identity |
| Singularity Studio | Intent, agent trace, sources, uncertainty, human gate |
| Slides | Takeaway, evidence, risk, and decision |
| Social | One recognizable idea with a verified claim boundary |
| Email | Intent-specific action, state, or narrative with a clear next step |

## Foundation review

Before approving a shared decision, ask:

- Which user and job does it support?
- Which pain or risk does it reduce?
- Which foundation requires it?
- What evidence supports the choice?
- What trade-off is accepted?
- Which layers and surfaces inherit it?
- What must remain local to a product?

The next document explains how these foundations become systems rather than
isolated preferences.

---

**Previous:** [How Singular collaborates](./04-how-singular-collaborates.md)

**Next:** [From foundations to system](./06-from-foundations-to-system.md)
