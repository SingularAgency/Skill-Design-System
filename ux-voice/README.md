# Singular UX Writing, Voice & Tone Manual

**Version:** 0.1

**Status:** Working reference

**Owner:** Product Design

**Language:** English (US)

**Last reviewed:** July 29, 2026

This manual defines how Singular communicates across marketing and product.
It begins with the people Singular serves, the operational problems they face,
and the decisions our writing must help them make.

This is the operational writing reference inside a larger documentation story.
For the full path from client context to foundations, Brand & Voice, Design
System, and application, start with
[The Singular system](../docs/README.md). Canonical audience, JTBD, and pain
definitions live in
[Users, jobs, and pain points](../docs/02-users-jobs-and-pain-points.md); this
manual translates them into writing behavior. For the connected visual
character and brand guardrails, use the
[Singular Brand Foundation](../brand/README.md).

It is intentionally one document. Marketing and Product share one core voice,
but they do different jobs:

- **Marketing** helps the right buyer recognize an operational problem, trust
  Singular's approach, and choose a next step.
- **Product** helps a user understand state, scope, evidence, consequence, and
  the next available action.

This is a working reference built from the current Singular website, product
repositories, Design System surfaces, product rules, and the Brand & Voice raw
reference. It is not a substitute for user research. Statements derived from
existing behavior rather than direct research are labeled accordingly.

---

## Contents

1. [Purpose and usage](#1-purpose-and-usage)
2. [Singular's users](#2-singulars-users)
3. [The user problem](#3-the-user-problem)
4. [Core Singular voice](#4-core-singular-voice)
5. [Core writing principles](#5-core-writing-principles)
6. [Marketing voice and tone](#6-marketing-voice-and-tone)
7. [Product voice and tone](#7-product-voice-and-tone)
8. [Terminology and editorial style](#8-terminology-and-editorial-style)
9. [Claims and evidence](#9-claims-and-evidence)
10. [Examples and review checklist](#10-examples-and-review-checklist)
11. [Sources, decisions, and known gaps](#11-sources-decisions-and-known-gaps)

---

## 1. Purpose and usage

### What this manual defines

Use this manual to:

- understand who a piece of communication is for;
- identify the problem or decision the reader is facing;
- choose the Marketing or Product chapter;
- apply Singular's voice without hiding complexity or manufacturing confidence;
- write clear outcomes, states, actions, risks, and limitations;
- review human- or AI-generated writing before it is published.

### Choose the chapter by intent

| If the communication must help someone… | Use |
|---|---|
| Recognize an operational problem | Marketing |
| Understand why Singular is different | Marketing |
| Evaluate an approach, proof point, or offer | Marketing |
| Choose a commercial next step | Marketing |
| Understand what happened or what is required | Product |
| Review scope, evidence, status, or risk | Product |
| Complete, recover from, or confirm an action | Product |
| Understand what an AI system did or could not do | Product |

The channel does not decide the chapter by itself. A product release deck may
use Product writing. A website support message may use Product writing. Choose
based on the reader's job.

### What is outside this manual

This manual does not define:

- visual identity, color, typography, layout, or creative direction;
- advertising formats, safe zones, campaign cadence, or funnel strategy;
- pricing, discount, scarcity, or qualification policy;
- product permissions, routes, business logic, or status transitions;
- a client's own brand voice;
- evidence that a commercial claim is true.

The Design System owns shared visual contracts. Host products own product
behavior and domain copy. This manual owns shared writing principles and the
distinction between Marketing and Product intent.

### Evidence labels

User and problem statements use three evidence labels:

- **Documented:** explicitly present in current product rules, UI, website, or
  approved business direction.
- **Inferred:** consistently suggested by current flows, copy, or product
  structure, but not yet validated through direct research.
- **Needs validation:** useful working hypothesis that must not be presented as
  customer fact.

---

## 2. Singular's users

This section is the writing-oriented summary of the canonical
[user, JTBD, and pain-point definitions](../docs/02-users-jobs-and-pain-points.md).
Use the upstream document when changing a user definition; update this summary
when that change affects writing.

### Marketing audience

#### Founder, owner, or operator

**Evidence:** Documented

**Context**

Leads an established US SMB with approximately USD 5M–20M in annual revenue,
employees, customers, and real operating workflows. Growth has increased
coordination cost and dependence on key people.

**Job to be done**

Reduce operational dependency and create a more reliable way for work,
context, and decisions to move through the company.

**Typical trigger**

- The same decisions repeatedly return to the owner.
- Reporting or follow-up work consumes experienced employees.
- Customer, finance, delivery, or operational context is split across systems.
- AI experiments exist, but weekly work still happens the same way.
- Growth is exposing process gaps that were manageable at a smaller scale.

**Functional pain**

- fragmented context;
- manual handoffs and repeated data entry;
- inconsistent reporting;
- missed follow-ups;
- unclear ownership;
- slow decisions;
- limited visibility into operating work.

**Emotional tension**

- wants leverage without losing control;
- is skeptical of another tool, pilot, or transformation program;
- fears disruption, poor adoption, and another unfinished project;
- wants progress that employees can use and leadership can measure.

**Decision**

Is this the right workflow and partner to invest in first?

**Information required**

- a recognizable operational problem;
- a credible operating outcome;
- how the workflow changes;
- what the client owns;
- where human review and governance remain;
- what is proven, provisional, or still unknown;
- a concrete next step with appropriate commitment.

#### Business Champion

**Evidence:** Inferred

**Context**

An internal change leader—often in operations or a functional leadership
role—who can see the process failure, assemble context, and coordinate
adoption, but may not own the final budget.

**Job to be done**

Turn a recurring operational problem into a credible first initiative that
leadership and the team can support.

**Functional pain**

- legacy processes and disconnected systems;
- incomplete authority to change the full workflow;
- pressure to show value early;
- limited time and implementation capacity;
- difficulty aligning stakeholders around one outcome.

**Emotional tension**

- wants a visible win without sponsoring another failed pilot;
- needs a partner who understands implementation and adoption;
- must be able to forward and defend the recommendation internally.

**Decision**

Can I champion this initiative with confidence?

**Information required**

- business consequence;
- initial scope;
- owner and decision path;
- evidence standard;
- adoption requirements;
- implementation boundaries;
- what happens after the first capability.

#### Team adopter

**Evidence:** Inferred

**Context**

Performs or depends on the workflow that Singular may redesign. This person may
not choose Singular, but determines whether the resulting system becomes real
operating behavior.

**Job to be done**

Complete recurring work with less coordination and clearer context without
losing judgment, ownership, or an escalation path.

**Functional pain**

- copying information between tools;
- chasing status and approvals;
- rebuilding context;
- repeating reports and follow-ups;
- correcting inconsistent data;
- adapting to tools that do not match the work.

**Emotional tension**

- expects new technology to add work before it removes work;
- worries automation will hide decisions or remove agency;
- needs to understand what changed, why, and how to recover.

**Decision**

Can I trust and adopt this workflow in real work?

**Information required**

- how the new workflow fits daily work;
- what remains under human control;
- what the system can and cannot do;
- how to review, correct, or escalate;
- who owns the workflow after implementation.

### Product users

#### Client decision-maker

**Evidence:** Documented

Uses Singular Stories to understand strategy and delivery, authorize proposed
scope, review completed work, and accept or return delivery. Needs outcome,
scope, Story Points, evidence, risk, and consequences before acting.

#### Client operator or Product Owner

**Evidence:** Documented / inferred

Monitors delivery, dependencies, active work, QA, and next decisions. Needs
enough operational detail to coordinate without reading the full project
history.

#### Mobile executive approver

**Evidence:** Documented

Uses the Singular Stories mobile experience for focused Pre-Work and Post-Work
review. Needs a concise decision brief, selected Tasks, identity and approval
context, evidence, and an explicit consequence before signing.

#### Singularity operator

**Evidence:** Documented

A semi-technical SMB operator who describes a product change in natural
language, watches the system scope and work, reviews a preview, diff, and
sources, and decides whether to revise, hand off, or continue.

#### Manager, PM, or PO

**Evidence:** Documented

Coordinates scope, delivery, QA, staffing, risk, and selected commercial
information. Needs visibility across Projects while respecting ownership,
evidence, and client decision boundaries.

#### Talent

**Evidence:** Documented

Plans and delivers assigned work, provides evidence, responds to QA, and tracks
delivery. Needs exact ownership, allowed actions, evidence requirements, and
recovery from Fixing or Stuck states.

#### QA

**Evidence:** Documented

Independently validates delivery, records evidence, reports findings, routes
corrections, and approves completed QA work. Needs clear separation between
review, evidence, correction, and client acceptance.

#### Admin

**Evidence:** Documented

Operates cross-project delivery, users, queues, QA, staffing, and payment
administration. Needs predictable permissions, explicit overrides, and
auditable state changes.

### AI agents are actors, not personas

AI agents may interpret intent, generate content, propose changes, summarize
evidence, or explain status. They do not become the reader by default.

When writing for or through an AI system, identify:

1. the human who receives the result;
2. the decision or action the result supports;
3. the source context available;
4. what the system knows, infers, and cannot confirm;
5. the boundary between suggestion, execution, review, and external outcome.

---

## 3. The user problem

Singular does not begin with an AI category or a software feature. It begins
with a company whose operating work has become harder to coordinate as it
grows.

### The shared problem model

#### 1. Growth creates operating complexity

Processes that once depended on informal knowledge, direct supervision, and a
small group of people stop scaling. Work becomes harder to see and more
dependent on the owner or a few experienced employees.

#### 2. Context fragments across the company

Customer history, financial information, decisions, documents, delivery
status, and operating rules live in different systems. People reconstruct the
same context before they can act.

#### 3. Coordination becomes manual work

Employees copy data, chase updates, rebuild reports, route approvals, and
translate between systems. The organization spends judgment on coordination.

#### 4. Tools do not automatically change the workflow

Buying an AI subscription, automation tool, dashboard, or chatbot does not
resolve ownership, permissions, review, adoption, or source-of-truth problems.
The operation remains fragmented underneath the new interface.

#### 5. Automation without control creates distrust

People do not trust a system when they cannot see:

- what it read;
- what it changed;
- what remains uncertain;
- who approved the action;
- whether the outcome is proposed, delivered, released, or live;
- how to correct or stop it.

### Singular's communication job

Singular writing must turn:

```text
operating complexity
→ shared understanding
→ explicit decisions
→ governed action
→ visible evidence
→ measurable operating outcomes
```

The writing is successful when the reader can recognize the problem, understand
the system, see the boundary of certainty, and make the next decision.

---

## 4. Core Singular voice

### Voice definition

> Singular communicates with the clarity of a product system and the judgment
> of a senior operating partner. It makes complexity understandable,
> commitments visible, and the next decision clear.

### Character

Singular sounds like an experienced operator who has worked through the
problem: calm, concrete, allergic to hype, and willing to name the obstacle
before recommending a path.

It is not:

- an AI evangelist;
- a motivational speaker;
- a tool vendor;
- a cold corporate consultant;
- an assistant performing artificial warmth;
- a system claiming certainty it does not have.

### Voice priority

When principles compete, use this order:

1. Truth, safety, and user control.
2. Clear outcome, state, and action.
3. Relevant context and evidence.
4. Brevity and tone.
5. Brand distinction.

Never make a sentence more “Singular” by making it less true or less useful.

### The six traits

#### Clear

**Means:** expose the main point, reduce ambiguity, and use exact relationships.

**Does not mean:** hide necessary complexity or talk down to the reader.

**Behavior:** one primary idea per block; facts, decisions, and next steps are
easy to find.

- Weak: “There are a few considerations around the current implementation.”
- Singular: “Authentication access is still missing, so implementation cannot
  start.”

#### Sharp

**Means:** use specific verbs, nouns, and distinctions.

**Does not mean:** sound aggressive, absolute, or clever for its own sake.

**Behavior:** remove ceremony, vague qualifiers, and generic actions.

- Weak: “Please provide your thoughts when possible.”
- Singular: “Confirm the role structure by Thursday.”

#### Structured

**Means:** make complexity navigable through hierarchy, sequence, and grouping.

**Does not mean:** turn every message into a long framework.

**Behavior:** order information by reader need and disclose detail progressively.

- Weak: a paragraph mixing scope, risk, evidence, and next steps.
- Singular: “Decision”, “Impact”, “Evidence”, and “Next” as distinct blocks.

#### Transparent

**Means:** distinguish facts, assumptions, risks, dependencies, and unknowns.

**Does not mean:** narrate every internal detail or lower confidence
unnecessarily.

**Behavior:** label the boundary of certainty and explain what would change it.

- Weak: “This should be ready soon.”
- Singular: “The design is ready. The release date remains unconfirmed until
  authentication access is available.”

#### Outcome-driven

**Means:** connect work with what changes for the user or operation.

**Does not mean:** invent impact, force a metric, or ignore the work required.

**Behavior:** explain who receives value, what becomes possible, and how
progress will be seen.

- Weak: “We implemented an automated reporting workflow.”
- Singular: “The operations team no longer rebuilds the weekly status report
  by hand.”

#### Human

**Means:** sound like a competent person who understands the reader's context.

**Does not mean:** use fake enthusiasm, slang, emojis, or unnecessary apologies.

**Behavior:** acknowledge consequences, use direct language, and give a useful
path forward.

- Weak: “Oops! Something went wrong.”
- Singular: “We couldn't save these changes. Your previous version is still
  available. Try again.”

---

## 5. Core writing principles

### 1. Lead with the outcome

Start with what changed, what matters, or what must be decided. Do not make the
reader pass through process history or tool descriptions first.

- Weak: “Over the last two weeks, the team worked across several systems to…”
- Singular: “The approval workflow is ready for client review.”

### 2. Start from the operational problem, not the tool

Describe the failure in the work before recommending software or AI.

- Weak: “You need a better CRM.”
- Singular: “Sales signals are not reaching procurement in time to prevent
  stockouts.”

### 3. Make complexity navigable

Do not pretend complex work is simple. Name its parts, relationships, sequence,
and decision points.

Use:

- meaningful headings;
- short paragraphs;
- ordered steps;
- explicit state and ownership;
- progressive detail;
- comparisons when a choice exists.

### 4. Preserve relevant context

Keep the context needed to understand or act:

- Client and Project;
- Objective and Key Result;
- Key Project;
- Sprint, Story or Task;
- environment and version;
- owner and approver;
- evidence and source;
- due date or decision date.

Do not copy all available metadata. Include what changes interpretation.

### 5. Use evidence before claims

Do not replace evidence with adjectives. “Faster”, “scalable”, “successful”,
and “strategic” require a defined comparison or proof.

- Weak: “A scalable, intelligent workflow.”
- Singular: “The workflow routes approved sales signals to procurement without
  a manual handoff.”

### 6. Separate fact from uncertainty

Use explicit language:

- **Confirmed:** supported by a current source or external confirmation.
- **Assumption:** accepted temporarily to move work forward.
- **Inference:** interpretation based on available evidence.
- **Risk:** a possible negative outcome with a known trigger.
- **Dependency:** something required before work can continue.
- **Unknown:** information not currently available.

Never use confident tone to hide an unknown.

### 7. Make ownership and commitments visible

Distinguish proposed, authorized, in progress, delivered, accepted, released,
published, and paid. Name the owner of the next action when it matters.

Do not call a preview “live”, QA completion “accepted”, or delivered work
“released” without the corresponding confirmation.

### 8. Make the next decision clear

When a decision exists, name:

1. what must be decided;
2. who decides;
3. the consequence;
4. when the decision is needed;
5. what happens next.

- Weak: “Let us know your thoughts.”
- Singular: “Authorize the selected 42 SP by Thursday so Sprint 18 can begin.”

### 9. Use authority without theatre

Authority comes from judgment, evidence, and explicit trade-offs—not
superlatives, formality, or certainty.

Avoid:

- “revolutionary”;
- “world-class”;
- “game-changing”;
- “cutting-edge”;
- “the future is here”;
- “we are thrilled to announce”.

### 10. Keep only what moves the reader forward

Every sentence should help the reader:

- understand;
- decide;
- act;
- validate;
- recover;
- anticipate.

If it does none of these, remove it.

### Optional rhetorical pattern: contrast

“Not X. Y.” can expose a false category and establish a more useful frame.

- “Not another AI tool. A company that operates differently.”
- “Not faster chaos. Governed execution.”

Use contrast deliberately, not as a signature in every section. It loses force
when repeated and must never oversimplify a real trade-off.

---

## 6. Marketing voice and tone

### Objective

Marketing helps the right buyer:

1. recognize an operating problem;
2. understand why the problem persists;
3. see the operating change Singular proposes;
4. trust the boundary between proof and promise;
5. choose a useful next step.

Marketing is not successful because it sounds advanced. It is successful when
the buyer sees their operation clearly enough to act.

### Positioning foundation

Singular is an AI Transformation partner for established SMB operators. It
starts with the workflow, operating context, ownership, and adoption—not an AI
tool in isolation.

Use these positioning boundaries:

- Singular is an **outcome partner**, not a generic agency.
- Singular builds **operating capability**, not disconnected pilots.
- Singular begins with **operating pain**, not an AI category.
- The client owns the workflows, documentation, prompts, automations, code, and
  decisions created for its business.
- Human review, permissions, and adoption are part of the system.

Do not say:

- “You run the business; we own the systems.” It conflicts with client
  ownership.
- “We automate your manual tasks.” It reduces an operating-system problem to a
  list of automations.
- “We build AI tools.” It frames Singular as a tool shop.
- “AI consulting.” It hides implementation and operating change.

### Marketing audience and qualification

Address founders, owners, and operators. Do not prohibit “founder” when it
accurately identifies the reader. “Operator” is preferred when the message is
about running the business rather than founding it.

Strong fit signals:

- operating complexity has increased with growth;
- decisions depend on the same people;
- one workflow creates measurable business drag;
- the company has an internal workflow owner;
- the team is prepared to change how the work happens;
- ownership and adoption matter after implementation.

Weak fit signals:

- the buyer only wants a demo or chatbot;
- there is no owner for the workflow;
- the problem is described only as “we need AI”;
- no one can define what would improve;
- the buyer wants a tool without changing the operation.

Treat industry archetypes and deal-size patterns as working hypotheses until
their source and current validity are confirmed. Do not turn them into public
personas without evidence.

### Marketing narrative

Use this sequence as a decision tool, not a required template:

```text
recognizable operating pain
→ business consequence
→ better operating model
→ Singular's approach
→ evidence or constraint
→ next step
```

#### Hero: future first

The hero should lead with a desirable operating future. Supporting copy should
show that Singular understands the obstacle.

- Strong: “Turn the business you're running into the business that runs
  itself.”
- Supporting explanation: “Most companies don't have an AI problem. They have
  an operational complexity problem.”

Do not require a number in every hero. Use a numeric promise only when the
claim is approved for that context.

#### Body: obstacle before mechanism

After the future is visible, name the real operating friction before explaining
Company Brain, agents, platforms, or tools.

- Weak: “Deploy a Company Brain and intelligent agents.”
- Singular: “Your team rebuilds customer and operating context before it can
  act. Singular connects that context, defines the review model, and then adds
  agents where they can execute safely.”

### Tone by marketing context

| Context | Tone | Writing job |
|---|---|---|
| Hero | Calm, declarative, ambitious | Make the future clear |
| Problem | Empathetic, specific | Create recognition without dramatizing |
| Mechanism | Precise, plain, architectural | Explain how the operation changes |
| Outcome | Concrete, evidence-led | Show what becomes measurably different |
| Proof | Factual, restrained | Support trust without embellishment |
| CTA | Direct, low-friction | Name the next step |
| Presentation | Executive, structured | Move from problem to decision |
| Social/email | Immediate, human | Earn attention without clickbait |

### Headlines

Headlines should:

- communicate one primary idea;
- use the buyer's operating language;
- create a clear contrast or future when useful;
- avoid abstract category language;
- remain meaningful without the visual.

- Weak: “Unlock transformative AI-powered growth.”
- Singular: “Turn operational drag into a system your team can run.”

### Subheadlines

Use the subheadline to explain:

- who the statement is for;
- the operating problem;
- how Singular approaches it;
- the most relevant boundary or outcome.

Do not repeat the headline in more words.

### Calls to action

Use an exact next step:

- “Book a strategy call”
- “Start the AI audit”
- “Map the first workflow”
- “Read the case study”

Avoid generic labels:

- “Learn more”
- “Get started”
- “Submit”
- “Discover the future”

CTA wording and offer details may change. Verify the current commercial path
before publishing.

### Presentations and proposals

- One decision or claim per slide.
- Use the title to state the takeaway, not the topic.
- Begin with operating context and consequence.
- Separate current state, proposed change, evidence, risk, and decision.
- Use numbers only with a source and definition.
- End a decision slide with the exact approval or next step.

- Weak title: “Automation opportunities”
- Singular title: “Manual follow-up is delaying renewals and hiding account
  risk.”

### Case studies and social proof

Use this order:

1. Client context.
2. Operating problem.
3. Constraint.
4. What Singular changed.
5. Evidence.
6. Outcome and boundary.

Testimonials must be verbatim and attributable. Never invent quotes, logos,
metrics, or permissions. A result from one client does not become a universal
promise.

### Company Brain, River, and Totems

These are optional explanatory metaphors:

- **River:** live operating signals and changing data.
- **Totems:** stable rules, permissions, standards, and institutional knowledge.
- **Company Brain:** the connected context that lets people and agents
  interpret the River through the Totems.

Use them only when they make the reader's problem easier to understand. Define
them in plain English before relying on the labels.

---

## 7. Product voice and tone

### Objective

Product writing helps the user understand:

- where they are;
- what state the work is in;
- what changed or is required;
- what the action affects;
- what evidence supports the state;
- what remains uncertain;
- what they can do next.

Product writing optimizes for informed action, not persuasion.

### Default product tone

Product tone is:

- calm;
- precise;
- operational;
- transparent;
- concise;
- non-defensive.

Warmth never replaces information. Reassurance must be supported by a fact,
such as preserved work, a reversible action, or a clear recovery path.

### Product information order

Use this order when it applies:

```text
what happened or is required
→ what it affects
→ evidence, limitation, or consequence
→ available action
→ what happens next
```

For high-risk decisions, put consequence before the final action.

### Page and section copy

- Page title names the stable area.
- Subtitle explains the current task, scope, or decision.
- Tabs describe distinct views or states.
- Section headings explain the content below, not the component type.
- Empty states distinguish no data, no results, all done, unavailable, and
  permission-limited.

### Labels and actions

Use exact verbs and objects:

- “Authorize Story”
- “Accept delivery”
- “Add evidence”
- “Request fixes”
- “Review diff”
- “Delete Task”

Avoid “Submit”, “Confirm”, “Continue”, or “Done” when a more exact action is
known.

An action label must match the resulting state. “Approve” is not interchangeable
with authorize, accept, release, publish, or pay.

### Loading

Loading copy should explain the activity only when the wait is meaningful.

- “Loading Sprint evidence…”
- “Checking the affected surfaces…”
- “Preparing the preview…”

Do not imply progress that the system cannot observe. For longer agent work,
show the current stage and preserve the user's ability to review history or
stop when supported.

### Empty states

An empty state should answer:

1. What is absent?
2. Why might it be absent?
3. Is this complete, filtered, unavailable, or not yet started?
4. What can the user do?

- Weak: “No data.”
- Singular: “No Stories need your review. New work will appear here when it
  reaches Client Review.”

Do not add an action when there is no useful action.

### Errors

An error should explain:

1. what failed;
2. what was affected;
3. what was preserved;
4. how to recover.

- Weak: “Oops! Something went wrong.”
- Singular: “We couldn't save these changes. Your previous version is still
  available. Try again.”

Do not expose implementation detail unless the reader needs it to recover or
report the problem.

### Success

Confirm the completed action and resulting state.

- “Evidence added. This Story is ready to send to QA.”
- “Scope authorized. The selected Stories can enter Sprint planning.”

Avoid celebration for routine actions. Never confirm an external outcome that
has not been externally verified.

### Disabled actions

Explain why the action is unavailable and how to enable it.

- Weak: “Send to QA” (disabled with no explanation)
- Singular: “Add delivery evidence before sending this Story to QA.”

Do not use permission copy that exposes controls the user should never see.

### Warnings and destructive actions

Name:

1. the action;
2. the affected object and scope;
3. what will be lost or changed;
4. whether it can be undone;
5. the exact final action.

- Title: “Delete Story SNG-142?”
- Body: “Its evidence and history will be permanently removed from Sprint 18.
  This can't be undone.”
- Actions: “Cancel” / “Delete Story”

Do not use “Are you sure?” as the primary information.

### Authorization, approval, and acceptance

These are decisions, not generic confirmations.

Before the action, show:

- phase: Pre-Work or Post-Work;
- selected Stories or Tasks;
- total Story Points when relevant;
- Project, Sprint, and Key Project context;
- evidence or decision brief;
- approver identity and authority;
- resulting state;
- what is not included.

Use:

- **Authorize:** approve proposed scope before execution.
- **Accept:** accept delivered work after QA.
- **Approve:** only when the product policy defines approval as the correct
  action.

### Evidence and QA

- Name who provided the evidence.
- Separate delivery evidence from QA evidence.
- Explain what the evidence proves.
- Do not use evidence presence as proof of acceptance.
- When returning work, name the finding and the required correction.
- Preserve history and attribution in summaries.

### Notifications

A notification should state:

1. what changed;
2. the object;
3. why the recipient is involved;
4. the action, if any.

- “Story SNG-142 is ready for your authorization.”
- “QA returned Story SNG-142 for fixes. Review the finding.”

Avoid notifications that only say “Status updated”.

### AI communication

AI writing must distinguish:

- what the system understood;
- what it is planning;
- what it changed;
- what sources it used;
- what it inferred;
- what it could not confirm;
- whether the result is a proposal, preview, delivered artifact, or external
  outcome;
- what requires a human decision.

#### Agent state language

| State | Meaning | Example |
|---|---|---|
| Understanding | Interpreting intent and constraints | “Reviewing the request and current product rules…” |
| Planning | Mapping scope and affected surfaces | “Mapping the screens and states affected by this change…” |
| Working | Creating or checking a sandbox proposal | “Updating the sandbox preview…” |
| Review | Result and evidence are available | “The preview and diff are ready for review.” |
| Blocked | User or expert input is required | “I need the target environment before I can continue.” |
| Failed | Work stopped and recovery is available | “The preview update failed. Your previous preview is still available.” |
| Published | An external destination confirmed publication | “Published to staging at 14:32 UTC.” |

Never infer `published`, `live`, `merged`, `approved`, or `released` from an
animation, local state, generated text, or optimistic UI.

#### AI uncertainty pattern

Use:

```text
What I found
What I inferred
What I could not confirm
What I need from you
```

Do not hide uncertainty inside “may”, “might”, or “probably” when the missing
information can be named.

### Product-specific naming

#### Singular Stories and Singular Agile

They refer to the same product and operating model. In v0.1:

- use **Singular Agile** in existing marketing contexts;
- use **Singular Stories** in product and repository contexts;
- never describe them as separate products or layers.

#### Story and Task

- Singular Stories web uses **Story** as the visible atomic work item.
- Singular Stories mobile uses **Task** as the visible atomic work item.
- Business Story and Technical Story are two views of that same work item, not
  separate navigation levels.
- Preserve the visible term of the current surface. Do not mix Story and Task in
  one flow unless explaining the mapping.

#### Singularity Studio

Singularity Studio is the AI product-editing workspace. Use **request**,
**change**, **run**, **preview**, **diff**, and **sources** for Studio work.
Use Story only when Studio explicitly hands work to Singular Stories.

---

## 8. Terminology and editorial style

### Preferred terms

| Term | Use when |
|---|---|
| operating problem / operating pain | Naming the failure in how work happens |
| workflow | Describing connected work, decisions, and handoffs |
| operating model | Describing how ownership and work fit together |
| outcome | Naming an observable operating or user change |
| evidence | Showing what supports a state, claim, or decision |
| decision | Naming a choice that changes what happens next |
| ownership | Explaining who controls the workflow or next action |
| adoption | Explaining how the system becomes real working behavior |
| governed | Permissions, review, trace, and boundaries are explicit |
| capability | A useful ability inside an operating workflow |
| outcome partner | Positioning Singular's relationship to the result |
| founder / owner / operator | Identifying the reader accurately |
| Key Project | Product entity; never show Epic in current user-facing UI |
| Story / Task | Product entity according to surface mapping |
| evidence, QA, authorization, acceptance | Exact product states and decisions |

### Conditional terms

| Term | Condition |
|---|---|
| AI-native | Describe an achieved operating state; define what changed |
| Company Brain | Explain in plain English before using as shorthand |
| River / Totems | Use only when the metaphor improves understanding |
| transformation | Name the operating change, not only the category |
| leverage | Prefer concrete capacity or outcome when available |
| scalable | Define the load, behavior, or constraint that scales |
| fast / faster | State the comparison or evidence |
| intelligent | Name the behavior the system performs |
| automation | Explain ownership, review, and exception handling |

### Avoid

Avoid language that replaces information:

- revolutionary;
- game-changing;
- cutting-edge;
- world-class;
- next-generation;
- state-of-the-art;
- seamless;
- magical;
- effortless;
- unlock potential;
- harness the power of;
- leverage AI;
- supercharge;
- synergy;
- visionaries;
- “AI-powered” without explaining the changed workflow.

Avoid startup vocabulary when it obscures the operating job:

- pivot;
- disrupt;
- ship;
- iterate;
- MVP;
- prototype.

These terms may be technically correct in a specific product or delivery
context. Do not use them as default marketing value.

### Grammar and style

#### Voice

- Prefer active voice.
- Name the actor when ownership matters.
- Use passive voice only when the actor is unknown or genuinely irrelevant.

#### Sentences

- Prefer one idea per sentence.
- Put the subject and verb early.
- Use short sentences for decisions and consequences.
- Use a longer sentence only when the relationship between ideas must remain
  together.

#### Paragraphs

- Start with the main point.
- Keep one topic per paragraph.
- Break dense content into meaningful headings or lists.

#### Headings

- Use sentence case.
- State the takeaway when the reader must make a decision.
- Avoid clever headings that hide the subject.

#### Pronouns

- Use **you** for the reader when the action or consequence is theirs.
- Use **we** for Singular's actual commitment.
- Use **together** only when responsibility is genuinely shared.
- Do not use “we” to imply customer agreement.

#### Contractions

Use natural English contractions (`we're`, `can't`, `you'll`) in marketing and
most product guidance. Avoid contractions only where legal, audit, or
high-stakes precision requires the expanded form.

#### Punctuation

- Use periods for complete thoughts.
- Use colons to introduce a meaningful list or explanation.
- Use em dashes sparingly.
- Avoid exclamation marks in standard Singular writing.
- Avoid ellipses as a substitute for loading or uncertainty.

#### Numbers

- Use numerals for metrics, dates, times, counts, Story Points, and steps.
- Define the unit and comparison.
- Do not add a number to make a headline appear more concrete.

#### Dates and time

- Use an unambiguous month name in human communication: `July 29, 2026`.
- Use the product's established locale in UI.
- Include timezone when a deadline or event crosses locations.

#### Acronyms

Expand unfamiliar acronyms on first use. Keep established product terms such
as QA, SP, OKR, and KYC when the current audience already uses them.

#### Lists

- Use parallel grammar.
- Begin action lists with verbs.
- Use numbered steps when order matters.
- Do not create a list for two closely related phrases that read better as a
  sentence.

#### Emojis and enthusiasm

Do not use emojis, celebratory punctuation, or artificial enthusiasm by
default. A human tone comes from relevance and care, not decoration.

---

## 9. Claims and evidence

### Claim status

Every material claim must be treated as:

- **Verified:** source, measurement, scope, and permission are documented.
- **Provisional:** present in current material, but evidence or methodology is
  incomplete.
- **Retired:** no longer approved or contradicted by current direction.

### Current provisional claims

The following claims appear in current Singular material but must not be
published from this manual alone:

- first working capability or agent in 10 business days;
- proof of concept in under 45 days;
- 75% faster setup;
- 90% less manual reporting;
- 40% fewer operational bottlenecks;
- client-specific ROI, sales, capacity, or cost-reduction figures;
- offer pricing, operator rates, or average deal values.

Before use, confirm:

1. source;
2. calculation or methodology;
3. applicable client or offer;
4. time period;
5. exclusions;
6. permission;
7. approved wording and context.

### Testimonials

- Use verbatim quotes only.
- Record the speaker, organization, source, and permission.
- Do not improve grammar in a way that changes meaning.
- Do not combine separate statements into one quote.
- Do not use illustrative copy inside quotation marks.

### Logos

- Use the official asset.
- Confirm permission for the intended context.
- Paid advertising permission is not implied by a public case study.
- Never generate or recreate a client logo.

### Product evidence

Do not invent:

- approval;
- acceptance;
- release;
- publication;
- payment;
- QA completion;
- source trace;
- permissions;
- scope;
- metrics;
- saved or preserved work.

If the product cannot confirm a state, say what it can confirm.

---

## 10. Examples and review checklist

### Website headline

**Weak**

“Unlock game-changing AI-powered efficiency.”

**Issue**

Generic hype, no recognizable operating future, and no useful distinction.

**Singular**

“Turn the business you're running into the business that runs itself.”

**Principles**

Lead with the outcome; use authority without theatre.

### Presentation statement

**Weak**

“We leverage cutting-edge AI to transform operations.”

**Issue**

Begins with Singular's capability and hides the user's operating problem.

**Singular**

“Your team rebuilds context across systems before it can act. Singular connects
the workflow, defines human review, and adds agents where they can execute
safely.”

**Principles**

Start from the operational problem; make complexity navigable.

### Call to action

**Weak**

“Learn more”

**Issue**

The reader cannot predict the next step.

**Singular**

“Map the first workflow”

**Principles**

Make the next action clear.

### Product action

**Weak**

“Submit”

**Issue**

Does not name the action or resulting state.

**Singular**

“Authorize scope”

**Principles**

Use exact verbs; make commitments visible.

### Empty state

**Weak**

“No data”

**Issue**

Does not distinguish complete, filtered, unavailable, or not yet started.

**Singular**

“No Stories need your review. New work will appear here when it reaches Client
Review.”

**Principles**

Preserve context; make the next state clear.

### Error and recovery

**Weak**

“Oops! Something went wrong.”

**Issue**

Artificial tone and no recovery information.

**Singular**

“We couldn't save these changes. Your previous version is still available. Try
again.”

**Principles**

Human, not performative; explain impact and recovery.

### Destructive warning

**Weak**

“Are you sure you want to delete this?”

**Issue**

Does not name the object, scope, or consequence.

**Singular**

- Title: “Delete Story SNG-142?”
- Body: “Its evidence and history will be permanently removed from Sprint 18.
  This can't be undone.”
- Actions: “Cancel” / “Delete Story”

**Principles**

Make consequence and scope explicit.

### Approval

**Weak**

“Approve”

**Issue**

Does not identify phase, selected scope, or resulting commitment.

**Singular**

“Authorize 8 Stories · 42 SP. This commits the selected scope to Sprint 18.
Review the list before signing.”

Primary action: “Authorize scope”

**Principles**

Preserve context; make commitments visible.

### AI response

**Weak**

“Done! Your change is live.”

**Issue**

Claims an external outcome without confirmation.

**Singular**

“The preview is ready for review. I updated the mobile approval summary and
action labels. No production publish has been confirmed. Review Preview and
Diff before continuing.”

**Principles**

Separate fact from uncertainty; do not overstate state.

### Risk or dependency

**Weak**

“We may be delayed because we're waiting on access.”

**Issue**

The dependency, impact, owner, and decision are unclear.

**Singular**

“The release date is at risk because authentication access is still missing.
Design is ready; implementation starts when access is confirmed. Owner: Client
IT. Next decision: confirm access by Friday.”

**Principles**

Make risk, ownership, and next decision clear.

### Core review

- Is the reader identifiable?
- Is the reader's problem or decision clear?
- Is the main point immediate?
- Does every sentence help the reader understand, decide, act, validate,
  recover, or anticipate?
- Are facts, assumptions, risks, dependencies, and unknowns distinguishable?
- Is ownership visible?
- Is the terminology correct for the surface?
- Could this writing belong to any generic AI consultancy?

### Marketing review

- Does the writing begin with the operating future or a recognizable problem?
- Is the business consequence visible before the tool?
- Does the mechanism explain the changed workflow?
- Is the tone calm, specific, and grounded?
- Is the CTA an exact next step?
- Are proof and promise clearly separated?
- Is every quantitative claim approved for this context?

### Product review

- Does the copy match the user's role and permission?
- Are state, scope, and consequence clear?
- Does the action label name the actual transition?
- Is recovery explained?
- Is relevant evidence or limitation visible?
- Does AI writing identify sources and uncertainty?
- Are high-risk actions explicitly confirmed?
- Does the UI avoid claiming an external outcome prematurely?

---

## 11. Sources, decisions, and known gaps

### Source hierarchy

Use sources according to the question:

1. **Client context, users, pains, and foundations:** the
   [Singular documentation story](../docs/README.md).
2. **Product behavior and terminology:** canonical product rules and current
   implementation in Singular Stories web, Singular Stories mobile, and
   Singularity Studio.
3. **External positioning:** current Singular website and approved commercial
   direction.
4. **Shared writing direction:** this manual.
5. **Raw Brand & Voice reference:** discovery input, not automatic authority.
6. **Historical documents and prototypes:** context only unless revalidated.

### Decisions made in v0.1

- Marketing and Product share one core voice but use separate chapters.
- The hero may lead with the future; supporting sections prove understanding of
  the obstacle.
- Contrast is optional, not a mandatory signature.
- Numeric headlines are not required.
- Founders, owners, and operators are all valid when accurate.
- Client ownership takes precedence over “we own the systems” framing.
- Company Brain, River, and Totems are optional explanations.
- Visual identity and campaign execution remain outside this manual.
- Singular Stories and Singular Agile are the same product.
- Story and Task remain surface-specific in v0.1.

### Known gaps

- No direct transcript from the latest team discussion was available.
- Marketing audience needs and emotional tensions have not been validated
  through formal interviews.
- Buyer archetypes and industry deal patterns need current source review.
- Quantitative service and outcome claims need evidence and permission review.
- Real client communication examples should be added only after privacy and
  permission review.

These gaps do not block use of the manual. They limit which statements may be
treated as proven customer truth. Track evidence status and research questions
in [Evidence and evolution](../docs/09-evidence-and-evolution.md).

### Governance

- Product Design owns this working reference.
- Marketing reviews positioning, audience, claims, and public examples.
- Product owners review roles, states, terminology, and product examples.
- Leadership approves material positioning and commercial claims.
- Record meaningful changes in the repository changelog or pull request.

Keep this operational manual as one file in v0.1. The upstream context and
system rationale live in [`docs/`](../docs/README.md), where each document has a
distinct question in the story. Consider further separation only when a section
has a distinct owner, independent use, or materially different review cycle.
