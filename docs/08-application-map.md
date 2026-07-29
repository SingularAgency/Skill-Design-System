# Application map

**Status:** v0.1 working reference

**Purpose:** Route a real task from context to the correct guideline and
surface

Use this document after the upstream story is understood. It prevents two
common failures:

- applying a surface style without the user and problem;
- rereading the entire repository for a narrow implementation decision.

## The application sequence

```text
1. Identify the human and current job.
2. Name the pain, risk, state, or decision.
3. Confirm the evidence level.
4. Select the experience foundation.
5. Select Marketing or Product intent.
6. Select the surface profile.
7. Apply the relevant domain behavior.
8. Review states, accessibility, claims, and next action.
```

## Intent routing

| Communication job | Use |
|---|---|
| Recognition, positioning, acquisition, narrative, proof, or conversion | [Marketing voice and tone](../ux-voice/README.md#6-marketing-voice-and-tone) |
| State, action, decision, recovery, permission, evidence, or trust | [Product voice and tone](../ux-voice/README.md#7-product-voice-and-tone) |

The channel does not choose the intent. A product review deck usually needs
Product language. A website error needs Product language.

## Surface routing

| Task | Context to read | System guidance |
|---|---|---|
| Company website or landing | [Client context](./01-client-context.md), [problem model](./03-problem-and-outcome-model.md) | [Marketing voice](../ux-voice/README.md#6-marketing-voice-and-tone), [website guide](../surfaces/website-landing/guide.md) |
| Pitch, proposal, or leadership deck | [Client context](./01-client-context.md), [collaboration model](./04-how-singular-collaborates.md) | Marketing or Product intent, [slides guide](../surfaces/slides-presentations/guide.md) |
| Social post or campaign asset | [Client context](./01-client-context.md), [users and pains](./02-users-jobs-and-pain-points.md) | [Marketing voice](../ux-voice/README.md#6-marketing-voice-and-tone), [social guide](../surfaces/social-email/social.md) |
| Marketing email | [User and buying stage](./02-users-jobs-and-pain-points.md#the-user-journey-across-singular) | [Marketing voice](../ux-voice/README.md#6-marketing-voice-and-tone), [email guide](../surfaces/social-email/email.md) |
| Transactional email | Product role and current state | [Product voice](../ux-voice/README.md#7-product-voice-and-tone), [email guide](../surfaces/social-email/email.md) |
| Singular Stories web | External or internal [product user](./02-users-jobs-and-pain-points.md#external-product-users) | [Product voice](../ux-voice/README.md#7-product-voice-and-tone), [web-app guide](../surfaces/web-app/guide.md), host product rules |
| Singular Approvals iOS | [Mobile executive approver](./02-users-jobs-and-pain-points.md#mobile-executive-approver) | [Product voice](../ux-voice/README.md#7-product-voice-and-tone), [iOS guide](../surfaces/ios-app/guide.md), host approval rules |
| Singularity Studio | [Singularity operator](./02-users-jobs-and-pain-points.md#singularity-operator) | [Product voice](../ux-voice/README.md#7-product-voice-and-tone), [Studio guide](../surfaces/studio/guide.md), host run/safety rules |
| New shared component | [Experience foundations](./05-experience-foundations.md), [system layers](./06-from-foundations-to-system.md) | [Components](../components/README.md), [technical architecture](../references/architecture.md) |
| Token or visual foundation | [Experience foundations](./05-experience-foundations.md), [system layers](./06-from-foundations-to-system.md) | [Tokens](../tokens/README.md), accessibility, affected surface guides |
| AI-generated Singular work | Applicable user/problem docs | [`SKILL.md`](../SKILL.md), [AI agent contract](../references/ai-agent-contract.md) |

## Apply to Marketing

### Before writing

Answer:

- Which audience is this for?
- What operating situation should they recognize?
- What is the business consequence?
- What desired future is credible here?
- What mechanism can we explain in plain English?
- What proof exists?
- Which claims are provisional?
- What is the exact next step?

### Narrative pattern

```text
operating future or recognizable pain
→ business consequence
→ better operating model
→ Singular's collaboration
→ evidence or constraint
→ next step
```

### Review

- The piece could not belong to a generic AI consultancy.
- The buyer can identify their situation.
- The tool does not appear before the problem.
- The client retains ownership.
- Company Brain, Rivers, and Totems are defined or omitted.
- Every metric and testimonial has an approved source.
- The CTA names the actual next step.

## Apply to Product

### Before writing or designing

Answer:

- Which role is acting?
- What state is the work in?
- What decision or recovery job exists?
- What context changes interpretation?
- What evidence supports the state?
- What is uncertain?
- What does the action change?
- Who owns the next step?
- What happens if the action fails?

### Information pattern

```text
event or requirement
→ affected object and scope
→ evidence, limitation, or consequence
→ available action
→ resulting or next state
```

### State checklist

- loading;
- empty;
- error;
- success;
- disabled;
- permission-limited;
- blocked;
- warning or destructive;
- offline or delayed when relevant;
- external confirmation when relevant.

### Review

- The action label matches the transition.
- Marketing claims or urgency do not enter the workflow.
- Relevant Project, Objective, Key Result, Key Project, Sprint, and work-item
  context is preserved.
- Evidence is not confused with acceptance.
- Agent output names sources and limitations.
- High-risk work has a meaningful human gate.
- Recovery explains what was preserved.

## Apply to a Design System decision

### Before changing the shared system

1. Identify the user job and affected surfaces.
2. Connect the need to an experience foundation.
3. Search existing tokens, variants, components, and patterns.
4. Decide whether the need belongs to foundation, platform, surface, or domain.
5. Keep routes, permissions, data, and product copy out of the shared layer.
6. Define states, accessibility, responsive or native behavior, and trade-offs.
7. Record the decision using the
   [decision framework](./07-decision-framework.md#decision-record-template).

### Promotion check

Do not promote a local pattern merely because it is reusable in code. Promote
it when its **meaning** is shared and its product-specific behavior can be
removed.

## Detailed surface stacks

### Website stack

1. Client context
2. Marketing audience and pain
3. Marketing Voice & Tone
4. Claims and evidence
5. Website surface
6. Current website content and commercial route

### Singular Stories stack

1. Product role and JTBD
2. Product Voice & Tone
3. Web-app surface
4. Host product hierarchy, roles, permissions, and Story policy
5. Shared components and tokens

### iOS stack

1. Mobile executive approver
2. Product Voice & Tone
3. iOS surface and native behavior
4. Host approval phase, KYC, biometric, and Task rules
5. Accessibility and Dynamic Type

### Studio stack

1. Singularity operator
2. Automation/control pain
3. Product Voice & Tone
4. Studio surface
5. Host run-state, source, safety, handoff, and publish rules

### Slides stack

1. Audience and decision
2. Marketing or Product intent
3. Evidence and claim status
4. Slide narrative
5. Visual surface guide

## A compact rationale format

Use this in Figma, tickets, or reviews:

```text
For [user] trying to [job],
the risk is [pain / ambiguity / consequence].
We apply [foundation]
by [decision],
so the user can [understand / decide / act / recover].
Evidence: [documented / inferred / needs validation + source].
```

Example:

```text
For a mobile executive approver trying to authorize Pre-Work,
the risk is signing scope they have not reviewed.
We apply Preserve relevant context and Make commitments explicit
by showing selected Tasks, total SP, consequence, and exclusions before Face ID,
so the user can make an informed commitment.
Evidence: documented in the current iOS approval flow.
```

## Completion gate

Before handoff:

- [ ] User and job are identifiable.
- [ ] Pain, risk, state, or decision is explicit.
- [ ] The foundation is named.
- [ ] Marketing or Product intent is correct.
- [ ] The correct surface and domain sources were used.
- [ ] Terminology matches the surface.
- [ ] Context, evidence, ownership, and next action are visible.
- [ ] Required states and recovery are covered.
- [ ] Claims and external outcomes are verified or qualified.
- [ ] Accessibility is preserved.
- [ ] Shared and product-local responsibilities remain separate.
- [ ] Documentation links to the upstream rationale.

---

**Previous:** [Decision framework](./07-decision-framework.md)

**Next:** [Evidence and evolution](./09-evidence-and-evolution.md)
