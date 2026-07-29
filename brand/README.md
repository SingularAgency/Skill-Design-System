# Singular Brand Foundation

**Status:** v0.1 working reference

**Audience:** Anyone creating or reviewing a Singular experience

**Owner:** Product Design

**Last reviewed:** July 29, 2026

This document defines the shared brand idea and visual character that connect
Singular's website, products, presentations, social content, and email. It is a
human-readable bridge between the
[experience foundations](../docs/05-experience-foundations.md), the
[UX Writing, Voice & Tone Manual](../ux-voice/README.md), and the technical
[Design System](../README.md).

## The brand starts with the client

Singular serves established SMBs whose operations have become harder to
coordinate as they grow. Their experience is often fragmented, manual, and
dependent on a few people. They want leverage, but not opacity; speed, but not
recklessness; expertise, but not a new dependency.

The brand must therefore make complex transformation feel:

- understandable;
- governed;
- connected;
- credible;
- ambitious without hype;
- human without artificial warmth.

Read the full [client context](../docs/01-client-context.md) and
[problem model](../docs/03-problem-and-outcome-model.md) before changing the
brand system.

## The brand idea

> Singular turns operating complexity into a system people can understand,
> control, and evolve.

This is a foundation for expression, not a public tagline or a verified
commercial claim.

## Brand character

### Calm

Singular does not use visual urgency or AI spectacle to manufacture
importance. Hierarchy, spacing, motion, and language let the main decision
stand out.

### Precise

Visual roles have meaning. Identity, action, status, evidence, and data are not
represented as one undifferentiated glow.

### Connected

The system should feel like one company across marketing and product, even
when each surface has different density and behavior.

### Structured

Complexity becomes readable through sequence, contrast, grouping, and
progressive disclosure.

### Alive

Subtle atmosphere and motion can communicate an active operating system.
Activity must never compete with content or imply autonomous “magic.”

### Human

The brand respects the reader's context and consequence. It avoids cold
enterprise sterility and playful AI-assistant performance.

## One identity, different operating profiles

Singular uses one stable blue/cyan identity.

| Role | Current value | Purpose |
|---|---|---|
| Brand anchor | `#4567ed` | Stable recognition across surfaces |
| Brand cyan | `#22d3ee` | Connected energy and gradient endpoint |
| Product action | `#0b84ff` | High-clarity interaction in operational UI |
| Marketing base | `#050505` | Dark-first editorial canvas |

These values are current Design System decisions. They are not customer
research findings.

Identity and interaction remain separate:

- brand colors establish recognition;
- interaction tokens identify actions and focus;
- semantic colors communicate success, warning, error, information, or domain
  state;
- no important state depends on color alone.

See [Tokens](../tokens/README.md) for implementation roles.

## Typography

| Role | Family | Character |
|---|---|---|
| Display and marketing headings | Poppins | Direct, confident, geometric |
| Product and body reading | Inter | Neutral, legible, operational |
| Data, metrics, code, and trace | JetBrains Mono | Exact, technical, scannable |
| Editorial quotation when appropriate | Georgia | Human, reflective, distinct |

Native products preserve platform typography when it improves usability.
Singular iOS uses semantic system font roles instead of forcing web typefaces.

Typography establishes hierarchy; it must not compensate for unclear content.

## Visual principles

### 1. Information before atmosphere

Backgrounds, gradients, and motion support hierarchy. They never reduce the
legibility of a decision, claim, source, or state.

### 2. One meaningful accent

A composition should have one primary visual emphasis. If every word, card, or
control glows, the user cannot identify what matters.

### 3. Semantic state over brand decoration

Operational status uses semantic treatment and an explicit label. Brand blue
does not automatically mean approved, complete, or safe.

### 4. Density follows the job

- Marketing uses editorial space and narrative rhythm.
- Stories uses structured density for operating work.
- Studio keeps activity secondary to preview, evidence, and decision.
- iOS uses native hierarchy for focused review and action.
- Slides and social reduce the composition to one takeaway.
- Email prioritizes robust reading and action across clients.

### 5. Motion explains relationship or state

Use motion to reveal sequence, continuity, or response. Do not use it to imply
intelligence, completion, or urgency the system cannot prove.

### 6. Accessibility preserves the brand promise

Contrast, reduced motion, keyboard access, Dynamic Type, VoiceOver, touch
targets, and status beyond color are part of clarity and control.

## Signature visual elements

### Brand background

The mist, grid, and star system creates continuity across expressive surfaces.
Use its static, animated, or flat variant according to information density and
motion context.

See [Brand Background](../backgrounds/README.md).

### Gradient

The blue-to-cyan gradient is a selective identity accent. Use it for a primary
word, meaningful emphasis, or signature action—not for large blocks of text or
every control.

### Shape

Rounded, continuous surfaces and pill actions create a coherent system. Radius
must remain tokenized and should not make dense operational UI visually soft or
ambiguous.

### Logo

Use official, theme-appropriate assets. Preserve proportion, clear space, and
legibility. Do not redraw or ask an image model to recreate the logo.

See [Assets](../assets/README.md).

## Imagery and illustration guardrails

Prefer:

- clear system or workflow relationships;
- chaos-to-clarity transformations;
- editorial line work;
- real operating context;
- restrained abstract energy when it supports the narrative;
- visible evidence and real product context when appropriate.

Avoid:

- robots, humanoid assistants, or AI-brain clip art;
- decorative circuit-board clichés;
- neon cyberpunk spectacle;
- generic “magic” glows applied to every element;
- fake dashboards or charts presented as evidence;
- client logos or testimonials without permission;
- imagery that suggests autonomous control the product does not have.

These are current working guardrails. A new visual direction must still pass
the [decision framework](../docs/07-decision-framework.md).

## Verbal identity

The visual and verbal systems express the same character.

Singular voice is:

- clear;
- sharp;
- structured;
- transparent;
- outcome-driven;
- human.

Marketing creates recognition and grounded ambition. Product reduces ambiguity
and protects informed control. Use the
[UX Writing, Voice & Tone Manual](../ux-voice/README.md) for definitions,
terminology, examples, and claims.

## Expression by surface

| Surface | Brand expression | What must remain primary |
|---|---|---|
| Website | Dark editorial canvas, expressive blue/cyan atmosphere | Operating future, problem, mechanism, proof, CTA |
| Stories web | Dense operational hierarchy, restrained brand, semantic state | Context, evidence, ownership, next decision |
| Singularity Studio | Calm active workspace, quiet trace, distinct client preview | Intent, sources, proposed change, human decision |
| iOS | Native behavior with Singular color, shape, hierarchy, and assets | Scope, evidence, consequence, accessibility |
| Slides | Executive narrative with one accent and clear data | Takeaway, evidence, risk, decision |
| Social | One recognizable claim or idea | Legibility and claim discipline |
| Email | Robust single-column brand expression | Message intent and exact next action |

Detailed contracts and their source files are mapped in
[Application map: surface routing](../docs/08-application-map.md#surface-routing).

## Relationship to the Design System

The Brand Foundation owns:

- shared brand idea and character;
- identity intent;
- visual principles;
- high-level typography and imagery direction;
- cross-surface recognition.

The Design System owns:

- token values and semantic roles;
- components and variants;
- accessibility contracts;
- platform mappings;
- surface profiles;
- distribution and governance.

Product repositories own:

- routes and data;
- permissions;
- domain states;
- customer content;
- orchestration;
- local composition;
- proof that a product or business state is true.

## Brand review

- [ ] The client and intended audience are identifiable.
- [ ] The experience feels calm, precise, connected, and structured.
- [ ] The main information or decision dominates the atmosphere.
- [ ] Brand, interaction, and semantic state roles are distinct.
- [ ] The surface behaves appropriately for its job.
- [ ] The verbal and visual character agree.
- [ ] Motion and imagery do not imply false capability.
- [ ] Accessibility remains intact.
- [ ] Claims, logos, and testimonials have appropriate evidence and permission.
- [ ] New choices are traced to a foundation and system owner.

---

**Upstream:** [Experience foundations](../docs/05-experience-foundations.md)

**Apply:** [Application map](../docs/08-application-map.md)
