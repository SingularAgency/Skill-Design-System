// Static illustrations; copy contracts reference the source files, not this markup.
(() => {
  const buttonPreview = (variant) => `<div class="story-center"><a class="preview-button preview-button--${variant}" href="#example-cta">${variant === "secondary" ? "View details" : variant === "accent" ? "Build with Singular" : "Explore Singular"}<span aria-hidden="true">→</span></a></div>`;
  const statusLabels = { success: "Completed", warning: "Needs review", urgent: "High priority", danger: "Blocked", info: "Planned", neutral: "Draft" };
  const statusPreview = (variant) => `<div class="story-center"><span class="preview-status" style="color:var(--status-${variant}-fg);background:var(--status-${variant}-bg);border-color:var(--status-${variant}-border)">${statusLabels[variant]}</span></div>`;
  const stories = [
    {
      id: "brand-background", name: "BrandBackground", category: "brand", platforms: ["core", "website", "studio"], traits: ["static", "responsive"], variants: ["static", "animated", "flat"],
      description: "The atmospheric blue and cyan canvas that connects Singular's expressive surfaces without turning the background into a permanent animation.",
      usage: "Heroes, editorial empty states, covers, and entry moments. Use the static variant by default.",
      contract: "It never captures interaction, respects reduced motion, and keeps foreground content legible.",
      a11y: "It is decorative: every layer must use aria-hidden and must never communicate essential information.",
      source: "backgrounds/BrandBackground.tsx", language: "tsx",

      render: (variant) => `<div class="preview-brand-canvas" data-variant="${variant}"><div class="preview-brand-canvas__copy"><span>Singular systems</span><h4>Turn complexity into clarity.</h4></div></div>`,
    },
    {
      id: "button", name: "Button / CTA", category: "actions", platforms: ["website"], traits: ["interactive", "semantic"], variants: ["primary", "secondary", "accent"],
      description: "Actions with predictable hierarchy. The blue and cyan signature stays stable even when the page accent changes.",
      usage: "Website links and calls to action: primary, secondary, or accent. App buttons use the host's accessible button primitive and the app profile.",
      contract: "Minimum 44px target, hover, focus, and disabled states, plus short verb-led copy.",
      a11y: "It keeps focus visible and never relies on color alone to distinguish destructive actions.",
      source: "surfaces/website-landing/primitives.tsx", language: "tsx",
      render: buttonPreview,
    },
    {
      id: "status-badge", name: "StatusBadge", category: "feedback", platforms: ["web-app", "studio"], traits: ["semantic", "responsive"], variants: ["success", "warning", "urgent", "danger", "info", "neutral"],
      description: "A compact, readable status for lists, tables, and tracking surfaces.",
      usage: "Use it as read-only in grids and cards. Status editing belongs in the entity detail view.",
      contract: "Required status, optional label and explicit semantic tone. The host owns lifecycle mappings; a color never changes business state.",
      a11y: "It always includes a text label; the color dot is redundant.",
      source: "surfaces/web-app/components.tsx", language: "tsx",
      render: statusPreview,
    },
    {
      id: "marketing-card", name: "MarketingCard", category: "layout", platforms: ["website"], traits: ["content", "responsive"], variants: ["default", "metric"],
      description: "A narrative container with depth, a restrained accent, and editorial hierarchy for public pages.",
      usage: "Capabilities, benefits, proof points, and campaign content. Do not use it for dense data.",
      contract: "It accepts flexible content, uses surface tokens, and preserves the website elevation profile.",
      a11y: "If the whole card navigates, use a single semantic link and avoid nested controls.",
      source: "surfaces/website-landing/primitives.tsx", language: "tsx",

      render: (variant) => `<article class="preview-marketing-card" data-variant="${variant}"><div class="preview-marketing-card__icon">✦</div><h4>${variant === "metric" ? "Measured business impact" : "From prototype to operating system"}</h4><p>${variant === "interactive" ? "Hover-ready surface with restrained depth and a clear interaction boundary." : "Reusable narrative structure grounded in the website profile."}</p>${variant === "metric" ? "<strong>+42%</strong>" : ""}</article>`,
    },
    {
      id: "pill-filter", name: "PillFilter", category: "navigation", platforms: ["web-app"], traits: ["interactive", "responsive"], variants: ["single", "multi", "active"],
      description: "A compact filter for switching views or narrowing datasets without competing with primary navigation.",
      usage: "Status, team, sprint, or view filters. Use tabs to navigate between sections.",
      contract: "Selection is explicit and filtering logic remains in the host application.",
      a11y: "Implement with buttons and aria-pressed, and give the group an accessible name.",
      source: "surfaces/web-app/components.tsx", language: "tsx",

      render: (variant) => `<div class="story-center" role="group" aria-label="Story status" data-preview-multi="${variant === "multi"}">${["All", "Active", "Review"].map(label => { const active = label === (variant === "active" ? "Review" : "All"); return `<button type="button" data-preview-filter="${label}" aria-pressed="${active}" class="preview-pill ${active ? "is-active" : ""}">${label}</button>`; }).join("")}</div>`,
    },
    {
      id: "metric-strip", name: "MetricStrip", category: "data", platforms: ["core", "website", "web-app"], traits: ["responsive", "content"], variants: ["default", "compact", "emphasis"],
      description: "A semantic row of metrics for proof, KPIs, and outcomes across multiple surfaces.",
      usage: "Use when two to four numbers should be read as a group. Use charts for series or trends.",
      contract: "It renders a dl and keeps labels associated with values. Data and formatting belong to the host.",
      a11y: "It uses dl, dt, and dd, and never replaces data context with size or color.",
      source: "components/MetricStrip.tsx", language: "tsx",

      render: (variant) => `<dl class="preview-metric-strip" data-variant="${variant}"><div><strong>${variant === "compact" ? "18" : "2.4d"}</strong><span>Cycle time</span></div><div><strong>94%</strong><span>Delivered</span></div><div><strong>${variant === "emphasis" ? "+42%" : "8.7"}</strong><span>Business value</span></div></dl>`,
    },
    {
      id: "comparison-table", name: "ComparisonTable", category: "data", platforms: ["core", "website", "web-app"], traits: ["responsive", "content"], variants: ["default"],
      description: "A semantic comparison of two options with an outcome column that can be emphasized.",
      usage: "Proposal decisions, capability comparisons, and before-and-after views with a small set of criteria.",
      contract: "Optional caption, clear headers, and controlled horizontal overflow on narrow screens.",
      a11y: "Preserve table markup and never replace headers with visual layout alone.",
      source: "components/ComparisonTable.tsx", language: "tsx",

      render: () => `<table class="preview-comparison"><caption>Illustrative capability comparison</caption><thead><tr><th scope="col">Capability</th><th scope="col">Before</th><th scope="col" data-highlight>With Singular</th></tr></thead><tbody><tr><th scope="row">Delivery</th><td>Fragmented</td><td data-highlight>One system</td></tr><tr><th scope="row">Evidence</th><td>Manual</td><td data-highlight>Continuous</td></tr></tbody></table>`,
    },
    {
      id: "source-tag", name: "SourceTag", category: "feedback", platforms: ["core", "studio", "web-app"], traits: ["semantic", "content"], variants: ["source", "verified", "ai"],
      description: "A compact label that exposes the origin of a claim, dataset, or AI output.",
      usage: "Evidence panels, reports, agent responses, and content that requires traceability.",
      contract: "The label describes the source, not the component that renders it.",
      a11y: "It keeps the source explicit and never uses icons alone to indicate verification.",
      source: "components/SourceTag.tsx", language: "tsx",

      render: (variant) => `<div class="story-center"><span class="preview-source"><i></i>${variant === "verified" ? "Verified · Sprint 18" : variant === "ai" ? "AI output · 3 sources" : "Source · Client brief"}</span></div>`,
    },
    {
      id: "empty-state", name: "EmptyState", category: "feedback", platforms: ["web-app"], traits: ["semantic", "responsive", "content"], variants: ["all-done", "no-results", "error"],
      description: "An empty state that explains what missing data means and what the next step is.",
      usage: "Filtered results, completed lists, permissions, or recoverable errors.",
      contract: "It distinguishes complete, filtered, and unavailable states. An action appears only when recovery is real.",
      a11y: "The title announces the state and the action uses a specific label.",
      source: "surfaces/web-app/components.tsx", language: "tsx",

      render: (variant) => `<div class="preview-empty" style="--empty-tone: ${variant === "error" ? "var(--destructive)" : variant === "no-results" ? "var(--warning)" : "var(--success)"}"><div class="preview-empty__icon">${variant === "error" ? "!" : variant === "no-results" ? "⌕" : "✓"}</div><h4>${variant === "error" ? "Couldn’t load this view" : variant === "no-results" ? "No matching stories" : "All caught up"}</h4><p>${variant === "error" ? "Try again or return to the previous view." : variant === "no-results" ? "Adjust the filters to see more results." : "There are no stories waiting for review."}</p></div>`,
    },
    {
      id: "data-row", name: "DataTableRow recipe", kind: "recipe", category: "data", platforms: ["web-app"], traits: ["responsive", "content"], variants: ["standard", "compact"],
      description: "An operational row optimized for fast scanning, read-only status, and access to detail.",
      usage: "Dense lists of stories, sprints, talent, or projects.",
      contract: "Composition of exported table classes, not a DataRow component. A link opens detail; lifecycle changes are never executed inline.",
      a11y: "Use table headers, visible focus, and accessible names for row actions.",
      source: "surfaces/web-app/patterns.ts", language: "tsx",

      render: (variant) => `<div class="preview-data-row" data-variant="${variant}"><div><code>SS-248</code><br><strong>Client sprint summary</strong></div><span>Product</span><span>2.4d ago</span><span class="preview-status tone-warning">Review</span></div>`,
    },
    {
      id: "section-tabs", name: "SectionTopTabs", category: "navigation", platforms: ["web-app"], traits: ["interactive", "responsive"], variants: ["default", "three-items"],
      description: "Route navigation with a generous pill affordance and ordinary links.",
      usage: "Peer views within one section. Do not use them for combinable filters.",
      contract: "Pass tabs, pathname and an optional linkComponent. These links navigate routes; they do not control in-page panels.",
      a11y: "Use nav, links and aria-current=page. Tab reaches links; do not add tablist roles to route navigation.",
      source: "surfaces/web-app/navigation.tsx", language: "tsx",

      render: (variant) => `<div class="story-center"><nav class="preview-tabs" aria-label="Example section routes"><a class="is-active" aria-current="page" href="#overview">Overview</a><a href="#activity">Activity</a>${variant === "three-items" ? "<a href=\"#evidence\">Evidence</a>" : ""}</nav></div>`,
    },
    {
      id: "studio-trace", name: "AgentTrace recipe", kind: "recipe", category: "feedback", platforms: ["studio"], traits: ["semantic", "content"], variants: ["working", "review", "blocked"],
      description: "Readable agent activity: who acted, what happened, status, and duration without competing with the preview.",
      usage: "Studio runs and agentic workflows where trust depends on traceability.",
      contract: "It distinguishes progress, evidence ready, and blocked; published requires external confirmation.",
      a11y: "Progress is announced without stealing focus and remains understandable without animation.",
      source: "surfaces/studio/patterns.ts", language: "tsx",

      render: (variant) => `<div class="preview-trace"><div class="preview-trace__head"><span>Agent activity</span><span>${variant}</span></div><div class="preview-trace__row"><i style="--trace-tone: var(--success)"></i><span>Product Owner · checked scope</span><span>1.2s</span></div><div class="preview-trace__row"><i style="--trace-tone: ${variant === "blocked" ? "var(--warning)" : "var(--primary)"}"></i><span>${variant === "blocked" ? "QA Agent · needs human input" : variant === "review" ? "QA Agent · evidence ready" : "UX Agent · applying changes"}</span><span>${variant === "working" ? "live" : "2.8s"}</span></div></div>`,
    },
    {
      id: "agent-activity-orb", name: "AgentActivityOrb", category: "feedback", platforms: ["web-app", "studio"], traits: ["interactive", "semantic", "responsive"], variants: ["listening", "searching", "planning", "working", "composing", "shaping"],
      description: "A token-driven Canvas activity signature for AI and agent work, tuned to Singular blue and cyan across light and dark surfaces.",
      usage: "Active understanding, search, planning, execution, composing, and prototype shaping. Pair it with visible activity copy.",
      contract: "Activity is not status. Review, blocked, failed, and published remain semantic status UI and never use a continuous orb.",
      a11y: "The indicator keeps canvas decorative, exposes visible text, debounces optional polite announcements, pauses offscreen, and renders a static frame for reduced motion.",
      source: "components/agent-activity-orb/AgentActivityOrb.tsx", language: "tsx",

      render: (variant) => `<div class="preview-agent-orbs" data-preview-agent-activity="${variant}"><article class="preview-agent-orb-card" data-tone="brand"><span>Brand · 64</span><div class="preview-agent-indicator"><canvas data-orb-activity="${variant}" data-orb-size="64" aria-hidden="true"></canvas><div><strong>${({ listening: "Listening for input", searching: "Searching project sources", planning: "Planning changes", working: "Applying changes", composing: "Drafting response", shaping: "Shaping prototype" })[variant]}</strong><small>Singular Agent · active</small></div></div></article><article class="preview-agent-orb-card" data-tone="neutral"><span>Neutral · 20</span><div class="preview-agent-indicator preview-agent-indicator--inline"><canvas data-orb-activity="${variant}" data-orb-size="20" aria-hidden="true"></canvas><strong>${variant}</strong></div></article><article class="preview-agent-orb-card preview-agent-orb-card--inverse" data-tone="inverse"><span>Inverse · 64</span><canvas data-orb-activity="${variant}" data-orb-size="64" role="img" aria-label="${variant} activity"></canvas></article></div>`,
    },
    {
      id: "ios-surface", name: "SingularSurface", category: "layout", platforms: ["ios"], traits: ["native", "semantic", "responsive"], variants: ["panel", "compactCard", "raised"],
      description: "A SwiftUI primitive for native panels with dynamic color, continuous corners, and restrained elevation.",
      usage: "Cards, rows, and decision panels. It preserves native iOS navigation and controls.",
      contract: "It uses SingularRadius, dynamic colors, and elevation tokens without recreating web chrome.",
      a11y: "Compatible with Dynamic Type, reduced motion, and 44pt targets.",
      source: "surfaces/ios-app/SingularPrimitives.swift", language: "swift",

      render: (variant) => `<div class="preview-ios" style="--ios-fill: ${variant === "raised" ? "#151b25" : variant === "compactCard" ? "#0d1117" : "#0a0f18"}"><div class="preview-ios__head"><div class="preview-ios__icon">✓</div><div><h4>Ready for review</h4><p>Sprint 18 · 8 stories</p></div></div><div class="preview-ios__button">Open sprint</div></div>`,
    },
    {
      id: "slide-cover", name: "SlideCover recipe", kind: "recipe", category: "layout", platforms: ["slides"], traits: ["static", "content", "responsive"], variants: ["title", "section", "data"],
      description: "A 16:9 cover with safe zones, editorial hierarchy, and one visual accent.",
      usage: "Deck openings, chapters, and executive data stories.",
      contract: "One idea per slide, type that reads at a distance, and visible data sources.",
      a11y: "Provide sufficient contrast and content that does not depend on motion during the presentation.",
      source: "surfaces/slides-presentations/guide.md", language: "html",

      render: (variant) => `<div class="preview-slide"><span>${variant === "data" ? "Q2 · Delivery data" : variant === "section" ? "Chapter 02" : "Singular systems"}</span><h4>${variant === "data" ? "94% of committed outcomes delivered." : variant === "section" ? "From intention to evidence." : "Build the operating advantage."}</h4><p>Singular · 2026</p></div>`,
    },
    {
      id: "social-card", name: "SocialCanvas recipe", kind: "recipe", category: "brand", platforms: ["social"], traits: ["static", "content", "responsive"], variants: ["square", "portrait", "story"],
      description: "A campaign canvas with safe zones, a visual signature, and one dominant idea per asset.",
      usage: "LinkedIn, Instagram feed, and stories. Campaign imagery and copy remain local to the asset.",
      contract: "It preserves logo clear space, safe zones, and contrast across variable crops.",
      a11y: "When visual text is informative, repeat it in the post copy or alternative text.",
      source: "surfaces/social-email/social.md", language: "html",

      render: (variant) => `<div class="preview-social" style="--social-ratio: ${variant === "story" ? "9/16" : variant === "portrait" ? "4/5" : "1"}"><span>Singular perspective · 04</span><h4>One system. Every surface.</h4></div>`,
    },
    {
      id: "email-cta", name: "EmailCTA recipe", kind: "recipe", category: "actions", platforms: ["email"], traits: ["static", "semantic", "content"], variants: ["announcement", "transactional"],
      description: "A robust email CTA with inline styles, fallbacks, and hierarchy that works in restrictive clients.",
      usage: "Announcements and transactional actions with one primary destination.",
      contract: "The final HTML uses no CSS variables and remains readable when images are blocked.",
      a11y: "Use descriptive link copy, AA contrast, and a correct heading structure.",
      source: "surfaces/social-email/email.md", language: "html",

      render: (variant) => `<div class="preview-email"><div class="preview-email__head">Singular Stories</div><div class="preview-email__body"><h4>${variant === "transactional" ? "Sprint 18 is ready for review" : "A clearer way to run product work"}</h4><p>${variant === "transactional" ? "Review the scope, evidence and delivery summary before approving." : "See how one operating system connects intent, delivery and outcomes."}</p><span class="preview-email__cta">${variant === "transactional" ? "Review sprint" : "Explore Singular"}</span></div></div>`,
    },
  ];
  const foundation = (id, name, source, variants, description, render, usage, contract) => ({
    id, name, source, variants, description, render, usage, contract,
    kind: "foundation", category: "foundation", platforms: ["core", "website", "web-app", "studio"],
    traits: ["semantic", "responsive"], language: "css",
    a11y: "Use semantic structure, visible focus, readable contrast and reduced-motion preferences. Native surfaces use their own platform adapters.",
  });
  stories.push(
    foundation("color-roles", "Color roles", "tokens/brand-app.css", ["identity", "action", "semantic"],
      "Identity, interaction and semantic status have separate roles. App action text/fills are contrast-adjusted; identity remains blue/cyan.",
      (v) => `<div class="foundation-samples">${(v === "semantic" ? Object.keys(statusLabels).map(t => [`--status-${t}-solid`, statusLabels[t]]) : v === "action" ? [["--interactive", "Interactive text"], ["--button-primary", "CTA fill"]] : [["--brand-primary", "Identity blue"], ["--brand-cyan", "Identity cyan"]]).map(([token,label]) => `<div><i class="foundation-swatch" style="background:var(${token})"></i><strong>${label}</strong><code>${token}</code></div>`).join("")}</div>`,
      "Use brand anchors for identity, interactive roles for controls, and status slots for outcomes.",
      "Choose one profile. This website shows its web profile; app values are defined in brand-app.css, not inferred from this illustration."),
    foundation("typography", "Typography roles", "tokens/typography.css", ["page-title", "section-title", "body", "caption"],
      "Shared primitives and semantic type roles with responsive overrides by profile.",
      v => `<div class="foundation-type"><p class="${({"page-title":"page-title","section-title":"section-title",body:"text-body",caption:"text-caption"})[v]}">Turn complexity into clarity.</p><code>--type-${v}-size</code></div>`,
      "Choose roles by information hierarchy, not by whichever pixel size looks convenient.",
      "Core utilities consume roles. App titles grow at md/lg breakpoints; native platforms retain Dynamic Type."),
    foundation("spacing", "Spacing & rhythm", "tokens/core.css", ["xs", "s", "m", "l", "xl"],
      "Named gaps make relationships and density consistent without hardcoded spacing per screen.",
      v => `<div class="foundation-spacing stack-${v}"><span>Related content</span><span>Related content</span><code>--gap-${v}</code></div>`,
      "Small gaps group related controls; larger gaps separate sections. Keep a minimum 44px interaction row around compact triggers.",
      "Tailwind aliases s/m/l are additive; built-in xs/xl spacing names are not overwritten."),
    foundation("semantic-tones", "Semantic tones", "tokens/semantic-status.css", Object.keys(statusLabels),
      "Six brand-independent tones, each with foreground, background, border, solid and on-solid slots.",
      statusPreview, "Success, warning, urgency, danger, information and neutrality describe meaning, not decoration.",
      "Measure the rendered foreground/background pair. Color is redundant with a visible label. Domain-to-tone mapping belongs to the host."),
    foundation("motion", "Motion & reduced motion", "tokens/core-utilities.css", ["standard", "reduced"],
      "Motion explains hierarchy and progress; reduced motion must preserve meaning without continuous animation.",
      v => `<div class="foundation-type"><strong>${v === "reduced" ? "Static feedback" : "Purposeful transitions"}</strong><p>Meaning comes from text and state, not movement.</p></div>`,
      "Use motion only when it helps understanding. Agent activity is never proof of publication or success.",
      "Honor prefers-reduced-motion. This illustration does not animate; inspect source for the runtime behavior."),
    foundation("experience", "Experience foundations", "docs/05-experience-foundations.md", ["users", "jobs", "risk", "evidence"],
      "Shared experience principles: user goals, context, jobs, pains, risks and evidence before choosing a component.",
      v => `<div class="foundation-type"><h4>${({users:"Who is using this?",jobs:"What outcome matters?",risk:"What could go wrong?",evidence:"What evidence supports it?"})[v]}</h4><p>Start with the experience contract, then select the surface and pattern.</p></div>`,
      "Frame product and marketing work before layout. Separate observed evidence from assumptions.",
      "Read the shared foundation and the surface guide; implementation details and business decisions remain in the host."),
    {
      id: "compact-selector", name: "CompactFieldSelector", category: "actions", platforms: ["web-app"], traits: ["interactive", "responsive"], variants: ["status", "priority"],
      description: "Consistent compact metadata trigger promoted from Stories, with the full value exposed accessibly.",
      usage: "Editable status or priority in entity detail; use read-only badges in dense lists.",
      contract: "128 × 32 trigger inside a 44px interaction row. Menus, options, permissions and state updates are host-owned.",
      a11y: "The title and accessibleLabel preserve the full value; the surrounding row alone does not enlarge the actual click target. Hosts must provide a 44px target or equivalent spacing.",
      source: "surfaces/web-app/components.tsx", language: "tsx",
      render: v => `<div class="story-center"><button class="foundation-selector" aria-label="${v}: ${v === "status" ? "In progress" : "High"}">${v === "status" ? "In progress" : "High"}<span aria-hidden="true">⌄</span></button></div>`,
    },
    {
      id: "overlay-lanes", name: "OverlayLaneHost", category: "layout", platforms: ["web-app"], traits: ["responsive", "content"], variants: ["default", "side-modal-open"],
      description: "Portable shell lanes for notifications, actionable feedback, actions and footer.",
      usage: "Coexistence of authenticated overlays; keep notifications above the action dock.",
      contract: "Positions host-provided slots, not providers, portals, authentication or business state. Side-modal state is explicit.",
      a11y: "Hosts provide labelled controls, notification announcements and dialog focus management. Layout slots alone do not implement these behaviors.",
      source: "surfaces/web-app/components.tsx", language: "tsx",
      render: v => `<div class="foundation-lanes"><p>Content${v === "side-modal-open" ? " · side modal open" : ""}</p><div>Notification lane</div><div>Actionable feedback lane</div><div>Action dock lane</div><small>Illustrated anatomy, not an active portal or dialog</small></div>`,
    },
  );

  const componentExample = (imports, jsx, setup = "") => `${imports}\n\n// Load this surface's styles and declared host dependencies first.\nexport default function Example() {\n${setup ? `  ${setup}\n` : ""}  return (\n    ${jsx}\n  );\n}`;
  const coreImport = (name, path) => `import { ${name} } from "./singular/${path}";`;
  function codeFor(story, variant = story.variants[0]) {
    if (!story.variants.includes(variant)) variant = story.variants[0];
    const q = JSON.stringify;
    switch (story.id) {
      case "brand-background": return componentExample(coreImport("BrandBackground", story.source.replace(/\.tsx$/, "")), `<BrandBackground asBackdrop variant=${q(variant)} />`);
      case "button": return componentExample(coreImport("CtaButton", "surfaces/website-landing/primitives"), `<CtaButton variant=${q(variant)} cta={{ label: "Explore Singular", href: "/solutions" }} />`);
      case "status-badge": return componentExample(coreImport("StatusBadge", "surfaces/web-app/components"), `<StatusBadge status=${q(({success:"completed",warning:"in-review",urgent:"attention",danger:"blocked",info:"info",neutral:"draft"})[variant])} tone=${q(variant)} label=${q(statusLabels[variant])} />`);
      case "marketing-card": return componentExample(coreImport("MarketingCard, SystemChip", "surfaces/website-landing/primitives"), `<MarketingCard>\n      <SystemChip label="Automation" />\n      <h3>${variant === "metric" ? "Measured impact" : "Operate with clarity"}</h3>\n      ${variant === "metric" ? '<p>Example data: +42%</p>' : '<p>One system for product delivery.</p>'}\n    </MarketingCard>`);
      case "pill-filter": {
        const multi = variant === "multi";
        return componentExample(`"use client";\nimport { useState } from "react";\n${coreImport(multi ? "PillFilterMulti" : "PillFilter", "surfaces/web-app/components")}`, `<${multi ? "PillFilterMulti" : "PillFilter"}\n      label="Story status"\n      options={[{ value: "ALL", label: "All" }, { value: "ACTIVE", label: "Active" }, { value: "REVIEW", label: "Review" }]}\n      selected={selected} onSelect={setSelected}\n    />`, `const [selected, setSelected] = useState${multi ? '<string[]>(["ALL"])' : `(${q(variant === "active" ? "REVIEW" : "ALL")})`};`);
      }
      case "metric-strip": return componentExample(coreImport("MetricStrip", "components/MetricStrip"), `<MetricStrip ariaLabel="Illustrative delivery metrics" items={[\n      { label: "Cycle time", value: ${q(variant === "compact" ? "18" : "2.4d")} },\n      { label: "Delivered", value: "94%" },\n      { label: "Business value", value: ${q(variant === "emphasis" ? "+42%" : "8.7")} },\n    ]} />`);
      case "comparison-table": return componentExample(coreImport("ComparisonTable", "components/ComparisonTable"), `<ComparisonTable caption="Illustrative capability comparison"\n      columns={["Before", "With Singular"]}\n      rows={[{ label: "Delivery", values: ["Fragmented", "One system"] }, { label: "Evidence", values: ["Manual", "Continuous"] }]}\n    />`);
      case "source-tag": return componentExample(coreImport("SourceTag", "components/SourceTag"), `<SourceTag label=${q(variant === "verified" ? "Host-verified · Sprint 18" : variant === "ai" ? "AI output · 3 sources" : "Source · Client brief")} />`);
      case "empty-state": return componentExample(coreImport("EmptyState", "surfaces/web-app/components"), `<EmptyState variant=${q(variant)} description=${q(variant === "error" ? "Try again or return to the previous view." : variant === "no-results" ? "Adjust the filters to see more results." : "There are no stories waiting for review.")} />`);
      case "data-row": return componentExample(coreImport("dataTableBodyRowClass, dataTableCellClass", "surfaces/web-app/patterns"), `<table>\n      <caption>Illustrative story list</caption>\n      <thead><tr><th scope="col">Story</th><th scope="col">Status</th></tr></thead>\n      <tbody><tr className={dataTableBodyRowClass}>\n        <th scope="row" className={${variant === "compact" ? '`${dataTableCellClass} py-2`' : "dataTableCellClass"}}><a href="/stories/SS-248">Client sprint summary</a></th>\n        <td className={dataTableCellClass}>Review</td>\n      </tr></tbody>\n    </table>`);
      case "section-tabs": return componentExample(coreImport("SectionTopTabs", "surfaces/web-app/navigation"), `<SectionTopTabs ariaLabel="Project sections" pathname="/projects/overview"\n      tabs={[{ label: "Overview", href: "/projects/overview" }, { label: "Activity", href: "/projects/activity" }${variant === "three-items" ? ', { label: "Evidence", href: "/projects/evidence" }' : ""}]}\n    />`);
      case "studio-trace": return componentExample(coreImport("studioRunStateMeta", "surfaces/studio/patterns"), `<section aria-label="Agent activity">\n      <p role="status">{state.label}</p>\n      <ol><li>QA Agent · ${variant === "blocked" ? "needs human input" : variant === "review" ? "evidence ready" : "applying changes"}</li></ol>\n    </section>`, `const state = studioRunStateMeta[${q(variant)}];`);
      case "agent-activity-orb": return componentExample(coreImport("AgentActivityIndicator", "components/agent-activity-orb"), `<AgentActivityIndicator activity=${q(variant)} label=${q(`${variant} project sources`)} detail="Illustrative activity · not publication status" />`);
      case "ios-surface": return `import SwiftUI\n\n// Include the iOS bundle's Swift token and primitive files in your target.\nstruct Example: View {\n  var body: some View {\n    VStack(alignment: .leading) {\n      Text("Ready for review")\n      Text("Sprint 18 · 8 stories")\n    }.singularSurface(.${variant}, accent: .singularAction)\n  }\n}`;
      case "slide-cover": return `<!-- Composition recipe, not a React component. Apply the slide guide's layout, type and safe zones in your presentation tool. -->\n<section aria-label="${variant} slide">\n  <p>Singular systems</p>\n  <h1>${variant === "data" ? "Example: 94% delivered" : variant === "section" ? "From intention to evidence." : "Build the operating advantage."}</h1>\n</section>`;
      case "social-card": return `<!-- Composition recipe. Follow social.md for ${variant} format, crop and safe zones; no social-canvas component is exported. -->\n<article aria-label="Social campaign draft">\n  <h1>One system. Every surface.</h1>\n  <p>Repeat informative visual copy in the post text or alternative text.</p>\n</article>`;
      case "email-cta": return `<!-- Replace the example URL; test the final HTML in target email clients. -->\n<a href="https://example.com/review" style="display:inline-block;background:#4567ed;color:#fff;padding:14px 18px;border-radius:999px;font-family:Arial,sans-serif;font-size:16px;line-height:20px;text-decoration:none;">${variant === "transactional" ? "Review sprint" : "Explore Singular"}</a>`;
      case "compact-selector": return componentExample(coreImport("CompactFieldSelector", "surfaces/web-app/components"), `<CompactFieldSelector field=${q(variant)} value=${q(variant === "status" ? "In progress" : "High")}\n      disabled accessibleLabel=${q(`Example ${variant}: ${variant === "status" ? "In progress" : "High"}`)} style={{ minHeight: 44 }}\n    />`);
      case "overlay-lanes": return componentExample(coreImport("OverlayLaneHost", "surfaces/web-app/components"), `<OverlayLaneHost sideModalOpen={${variant === "side-modal-open"}} actionsLabel="Example actions"\n      toast={<p role="status">Example notification</p>}\n      actionable={<p>Example feedback</p>}\n      actions={<a href="/projects">Open projects</a>}\n    />`);
      case "color-roles": return `/* Load core.css + one brand profile before these rules. */\n.example { ${variant === "identity" ? "border-color: var(--brand-primary);" : variant === "action" ? "color: var(--interactive);" : "color: var(--status-info-fg); background: var(--status-info-bg);"} }`;
      case "typography": return `/* core.css includes typography.css; load core-utilities.css. */\n.example { font-size: var(--type-${variant}-size); font-family: var(--type-family-ui); }\n/* Prefer semantic utility classes and semantic heading elements. */`;
      case "spacing": return `.example-stack { display: flex; flex-direction: column; gap: var(--gap-${variant}); }`;
      case "semantic-tones": return `.example-status {\n  color: var(--status-${variant}-fg);\n  background: var(--status-${variant}-bg);\n  border: 1px solid var(--status-${variant}-border);\n}\n/* Filled: solid + on-solid slots. Always include a text label. */`;
      case "motion": return `.example { transition: opacity var(--motion-fast) var(--motion-ease-out); }\n@media (prefers-reduced-motion: reduce) { .example { transition: none; animation: none; } }`;
      case "experience": return `/* Read docs/05-experience-foundations.md, then the surface guide.\n * Frame ${variant}: user, context, desired outcome, risk, evidence.\n * This is a design brief, not an installable component. */`;
      default: throw new Error(`Missing copy contract for ${story.id}`);
    }
  }
  window.SingularCatalog = { stories, codeFor };
})();
