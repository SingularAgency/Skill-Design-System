(() => {
  const githubRoot = "https://github.com/SingularAgency/Skill-Design-System/blob/main/";
  const platformMeta = {
    core: { label: "Core", short: "CO", color: "var(--brand-cyan)" },
    website: { label: "Website", short: "WE", color: "var(--brand-cyan)" },
    "web-app": { label: "Web app", short: "AP", color: "var(--primary)" },
    studio: { label: "Studio", short: "ST", color: "var(--brand-primary)" },
    ios: { label: "iOS", short: "IO", color: "var(--info)" },
    slides: { label: "Slides", short: "SL", color: "var(--singular-purple)" },
    social: { label: "Social", short: "SO", color: "var(--singular-cyan)" },
    email: { label: "Email", short: "EM", color: "var(--warning)" },
  };
  const categoryMeta = {
    all: "All",
    brand: "Brand",
    foundation: "Foundations",
    actions: "Actions",
    feedback: "Feedback",
    navigation: "Navigation",
    data: "Data display",
    layout: "Layout",
  };
  const traitMeta = {
    interactive: "Interactive",
    semantic: "Semantic",
    responsive: "Responsive",
    native: "Native",
    static: "Static",
    content: "Content",
  };

  const buttonPreview = (variant) => `<div class="story-center"><button class="preview-button preview-button--${variant}">${variant === "destructive" ? "Delete project" : variant === "secondary" ? "View details" : variant === "accent" ? "Build with Singular" : "Create story"}<span aria-hidden="true">${variant === "destructive" ? "" : "→"}</span></button></div>`;
  const statusPreview = (variant) => `<div class="story-center"><span class="preview-status tone-${variant}">${({ success: "Completed", warning: "Needs review", info: "In progress", destructive: "Blocked", neutral: "Draft" })[variant]}</span></div>`;
  const stories = [
    {
      id: "brand-background", name: "BrandBackground", category: "brand", platforms: ["core", "website", "studio", "slides", "social"], traits: ["static", "responsive"], variants: ["static", "grid", "aurora"],
      description: "The atmospheric blue and cyan canvas that connects Singular's expressive surfaces without turning the background into a permanent animation.",
      usage: "Heroes, editorial empty states, covers, and entry moments. Use the static variant by default.",
      contract: "It never captures interaction, respects reduced motion, and keeps foreground content legible.",
      a11y: "It is decorative: every layer must use aria-hidden and must never communicate essential information.",
      source: "backgrounds/BrandBackground.tsx", language: "tsx",
      code: `<BrandBackground asBackdrop variant="static" />`,
      render: (variant) => `<div class="preview-brand-canvas" data-variant="${variant}"><div class="preview-brand-canvas__copy"><span>Singular systems</span><h4>Turn complexity into clarity.</h4></div></div>`,
    },
    {
      id: "button", name: "Button / CTA", category: "actions", platforms: ["core", "website", "web-app", "studio"], traits: ["interactive", "semantic"], variants: ["primary", "secondary", "accent", "destructive"],
      description: "Actions with predictable hierarchy. The blue and cyan signature stays stable even when the page accent changes.",
      usage: "Use one primary action per context, secondary for alternatives, and destructive only with explicit scope.",
      contract: "Minimum 44px target, hover, focus, and disabled states, plus short verb-led copy.",
      a11y: "It keeps focus visible and never relies on color alone to distinguish destructive actions.",
      source: "surfaces/website-landing/primitives.tsx", language: "tsx",
      code: `<CtaButton\n  variant="primary"\n  cta={{ label: "Create story", href: "#create" }}\n/>`, render: buttonPreview,
    },
    {
      id: "status-badge", name: "StatusBadge", category: "feedback", platforms: ["core", "web-app", "ios", "studio"], traits: ["semantic", "responsive"], variants: ["success", "warning", "info", "destructive", "neutral"],
      description: "A compact, readable status for lists, tables, and tracking surfaces.",
      usage: "Use it as read-only in grids and cards. Status editing belongs in the entity detail view.",
      contract: "Text label plus semantic tone. Status is never inferred from a brand color.",
      a11y: "It always includes a text label; the color dot is redundant.",
      source: "surfaces/web-app/components.tsx", language: "tsx",
      code: `<StatusBadge tone="success">Completed</StatusBadge>`, render: statusPreview,
    },
    {
      id: "marketing-card", name: "MarketingCard", category: "layout", platforms: ["website"], traits: ["interactive", "content", "responsive"], variants: ["default", "interactive", "metric"],
      description: "A narrative container with depth, a restrained accent, and editorial hierarchy for public pages.",
      usage: "Capabilities, benefits, proof points, and campaign content. Do not use it for dense data.",
      contract: "It accepts flexible content, uses surface tokens, and preserves the website elevation profile.",
      a11y: "If the whole card navigates, use a single semantic link and avoid nested controls.",
      source: "surfaces/website-landing/primitives.tsx", language: "tsx",
      code: `<MarketingCard>\n  <SystemChip>Automation</SystemChip>\n  <h3>Operate with clarity</h3>\n</MarketingCard>`,
      render: (variant) => `<article class="preview-marketing-card" data-variant="${variant}"><div class="preview-marketing-card__icon">✦</div><h4>${variant === "metric" ? "Measured business impact" : "From prototype to operating system"}</h4><p>${variant === "interactive" ? "Hover-ready surface with restrained depth and a clear interaction boundary." : "Reusable narrative structure grounded in the website profile."}</p>${variant === "metric" ? "<strong>+42%</strong>" : ""}</article>`,
    },
    {
      id: "pill-filter", name: "PillFilter", category: "navigation", platforms: ["web-app"], traits: ["interactive", "responsive"], variants: ["single", "multi", "active"],
      description: "A compact filter for switching views or narrowing datasets without competing with primary navigation.",
      usage: "Status, team, sprint, or view filters. Use tabs to navigate between sections.",
      contract: "Selection is explicit and filtering logic remains in the host application.",
      a11y: "Implement with buttons and aria-pressed, and give the group an accessible name.",
      source: "surfaces/web-app/components.tsx", language: "tsx",
      code: `<PillFilter\n  value={status}\n  options={["All", "Active", "Review"]}\n  onChange={setStatus}\n/>`,
      render: (variant) => `<div class="story-center" role="group" aria-label="Story status"><button class="preview-pill ${variant !== "multi" ? "is-active" : ""}">All</button><button class="preview-pill ${variant === "multi" ? "is-active" : ""}">Active</button><button class="preview-pill ${variant === "active" ? "is-active" : ""}">Review</button></div>`,
    },
    {
      id: "metric-strip", name: "MetricStrip", category: "data", platforms: ["core", "website", "web-app", "slides", "social"], traits: ["responsive", "content"], variants: ["default", "compact", "emphasis"],
      description: "A semantic row of metrics for proof, KPIs, and outcomes across multiple surfaces.",
      usage: "Use when two to four numbers should be read as a group. Use charts for series or trends.",
      contract: "It renders a dl and keeps labels associated with values. Data and formatting belong to the host.",
      a11y: "It uses dl, dt, and dd, and never replaces data context with size or color.",
      source: "components/MetricStrip.tsx", language: "tsx",
      code: `<MetricStrip items={[\n  { label: "Cycle time", value: "2.4d" },\n  { label: "Delivered", value: "94%" },\n]} />`,
      render: (variant) => `<dl class="preview-metric-strip" data-variant="${variant}"><div><strong>${variant === "compact" ? "18" : "2.4d"}</strong><span>Cycle time</span></div><div><strong>94%</strong><span>Delivered</span></div><div><strong>${variant === "emphasis" ? "+42%" : "8.7"}</strong><span>Business value</span></div></dl>`,
    },
    {
      id: "comparison-table", name: "ComparisonTable", category: "data", platforms: ["core", "website", "web-app", "slides"], traits: ["responsive", "content"], variants: ["default", "highlight"],
      description: "A semantic comparison of two options with an outcome column that can be emphasized.",
      usage: "Proposal decisions, capability comparisons, and before-and-after views with a small set of criteria.",
      contract: "Optional caption, clear headers, and controlled horizontal overflow on narrow screens.",
      a11y: "Preserve table markup and never replace headers with visual layout alone.",
      source: "components/ComparisonTable.tsx", language: "tsx",
      code: `<ComparisonTable\n  columns={["Before", "With Singular"]}\n  rows={comparisonRows}\n  highlightedColumn={1}\n/>`,
      render: (variant) => `<table class="preview-comparison"><thead><tr><th>Capability</th><th>Before</th><th ${variant === "highlight" ? "data-highlight" : ""}>With Singular</th></tr></thead><tbody><tr><th>Delivery</th><td>Fragmented</td><td ${variant === "highlight" ? "data-highlight" : ""}>One system</td></tr><tr><th>Evidence</th><td>Manual</td><td ${variant === "highlight" ? "data-highlight" : ""}>Continuous</td></tr></tbody></table>`,
    },
    {
      id: "source-tag", name: "SourceTag", category: "feedback", platforms: ["core", "studio", "web-app"], traits: ["semantic", "content"], variants: ["source", "verified", "ai"],
      description: "A compact label that exposes the origin of a claim, dataset, or AI output.",
      usage: "Evidence panels, reports, agent responses, and content that requires traceability.",
      contract: "The label describes the source, not the component that renders it.",
      a11y: "It keeps the source explicit and never uses icons alone to indicate verification.",
      source: "components/SourceTag.tsx", language: "tsx",
      code: `<SourceTag label="Sprint 18 report" verified />`,
      render: (variant) => `<div class="story-center"><span class="preview-source"><i></i>${variant === "verified" ? "Verified · Sprint 18" : variant === "ai" ? "AI output · 3 sources" : "Source · Client brief"}</span></div>`,
    },
    {
      id: "empty-state", name: "EmptyState", category: "feedback", platforms: ["web-app", "ios"], traits: ["semantic", "responsive", "content"], variants: ["complete", "filtered", "error"],
      description: "An empty state that explains what missing data means and what the next step is.",
      usage: "Filtered results, completed lists, permissions, or recoverable errors.",
      contract: "It distinguishes complete, filtered, and unavailable states. An action appears only when recovery is real.",
      a11y: "The title announces the state and the action uses a specific label.",
      source: "surfaces/web-app/components.tsx", language: "tsx",
      code: `<EmptyState\n  title="All caught up"\n  message="There are no stories waiting for review."\n/>`,
      render: (variant) => `<div class="preview-empty" style="--empty-tone: ${variant === "error" ? "var(--destructive)" : variant === "filtered" ? "var(--warning)" : "var(--success)"}"><div class="preview-empty__icon">${variant === "error" ? "!" : variant === "filtered" ? "⌕" : "✓"}</div><h4>${variant === "error" ? "Couldn’t load this view" : variant === "filtered" ? "No matching stories" : "All caught up"}</h4><p>${variant === "error" ? "Try again or return to the previous view." : variant === "filtered" ? "Adjust the filters to see more results." : "There are no stories waiting for review."}</p></div>`,
    },
    {
      id: "data-row", name: "DataTableRow", category: "data", platforms: ["web-app"], traits: ["interactive", "responsive", "content"], variants: ["standard", "compact", "selected"],
      description: "An operational row optimized for fast scanning, read-only status, and access to detail.",
      usage: "Dense lists of stories, sprints, talent, or projects.",
      contract: "The row opens detail; lifecycle changes are never executed inline.",
      a11y: "Use table headers, visible focus, and accessible names for row actions.",
      source: "surfaces/web-app/patterns.ts", language: "tsx",
      code: `<DataRow\n  id="SS-248"\n  title="Client sprint summary"\n  status="review"\n/>`,
      render: (variant) => `<div class="preview-data-row" data-variant="${variant}"><div><code>SS-248</code><br><strong>Client sprint summary</strong></div><span>Product</span><span>2.4d ago</span><span class="preview-status tone-warning">Review</span></div>`,
    },
    {
      id: "section-tabs", name: "SectionTopTabs", category: "navigation", platforms: ["web-app", "website", "studio"], traits: ["interactive", "responsive"], variants: ["default", "compact", "three-items"],
      description: "Section tabs with a generous pill affordance and keyboard navigation.",
      usage: "Peer views within one section. Do not use them for combinable filters.",
      contract: "Tabs control panels; the host preserves routing or selected state.",
      a11y: "Use tablist, tab, and tabpanel roles with Arrow key, Home, and End support.",
      source: "surfaces/web-app/navigation.tsx", language: "tsx",
      code: `<SectionTopTabs\n  items={["Overview", "Activity", "Evidence"]}\n  activeId="overview"\n/>`,
      render: (variant) => `<div class="story-center"><div class="preview-tabs" role="tablist"><button class="is-active" role="tab">Overview</button><button role="tab">Activity</button>${variant === "three-items" ? "<button role=\"tab\">Evidence</button>" : ""}</div></div>`,
    },
    {
      id: "studio-trace", name: "AgentTrace", category: "feedback", platforms: ["studio"], traits: ["semantic", "content", "interactive"], variants: ["working", "review", "blocked"],
      description: "Readable agent activity: who acted, what happened, status, and duration without competing with the preview.",
      usage: "Studio runs and agentic workflows where trust depends on traceability.",
      contract: "It distinguishes progress, evidence ready, and blocked; published requires external confirmation.",
      a11y: "Progress is announced without stealing focus and remains understandable without animation.",
      source: "surfaces/studio/patterns.ts", language: "tsx",
      code: `<AgentTraceRow\n  agent="QA Agent"\n  state="review"\n  duration="1.7s"\n/>`,
      render: (variant) => `<div class="preview-trace"><div class="preview-trace__head"><span>Agent activity</span><span>${variant}</span></div><div class="preview-trace__row"><i style="--trace-tone: var(--success)"></i><span>Product Owner · checked scope</span><span>1.2s</span></div><div class="preview-trace__row"><i style="--trace-tone: ${variant === "blocked" ? "var(--warning)" : "var(--primary)"}"></i><span>${variant === "blocked" ? "QA Agent · needs human input" : variant === "review" ? "QA Agent · evidence ready" : "UX Agent · applying changes"}</span><span>${variant === "working" ? "live" : "2.8s"}</span></div></div>`,
    },
    {
      id: "ios-surface", name: "SingularSurface", category: "layout", platforms: ["ios"], traits: ["native", "semantic", "responsive"], variants: ["panel", "compact", "raised"],
      description: "A SwiftUI primitive for native panels with dynamic color, continuous corners, and restrained elevation.",
      usage: "Cards, rows, and decision panels. It preserves native iOS navigation and controls.",
      contract: "It uses SingularRadius, dynamic colors, and elevation tokens without recreating web chrome.",
      a11y: "Compatible with Dynamic Type, reduced motion, and 44pt targets.",
      source: "surfaces/ios-app/SingularPrimitives.swift", language: "swift",
      code: `VStack(alignment: .leading) {\n  Text("Ready for review")\n  Text("Sprint 18 · 8 stories")\n}\n.singularSurface(.panel, accent: .singularAction)`,
      render: (variant) => `<div class="preview-ios" style="--ios-fill: ${variant === "raised" ? "#151b25" : variant === "compact" ? "#0d1117" : "#0a0f18"}"><div class="preview-ios__head"><div class="preview-ios__icon">✓</div><div><h4>Ready for review</h4><p>Sprint 18 · 8 stories</p></div></div><div class="preview-ios__button">Open sprint</div></div>`,
    },
    {
      id: "slide-cover", name: "SlideCover", category: "layout", platforms: ["slides"], traits: ["static", "content", "responsive"], variants: ["title", "section", "data"],
      description: "A 16:9 cover with safe zones, editorial hierarchy, and one visual accent.",
      usage: "Deck openings, chapters, and executive data stories.",
      contract: "One idea per slide, type that reads at a distance, and visible data sources.",
      a11y: "Provide sufficient contrast and content that does not depend on motion during the presentation.",
      source: "surfaces/slides-presentations/guide.md", language: "html",
      code: `<section class="slide slide--cover">\n  <p class="eyebrow">Singular systems</p>\n  <h1>Build the operating advantage.</h1>\n</section>`,
      render: (variant) => `<div class="preview-slide"><span>${variant === "data" ? "Q2 · Delivery data" : variant === "section" ? "Chapter 02" : "Singular systems"}</span><h4>${variant === "data" ? "94% of committed outcomes delivered." : variant === "section" ? "From intention to evidence." : "Build the operating advantage."}</h4><p>Singular · 2026</p></div>`,
    },
    {
      id: "social-card", name: "SocialCanvas", category: "brand", platforms: ["social"], traits: ["static", "content", "responsive"], variants: ["square", "portrait", "story"],
      description: "A campaign canvas with safe zones, a visual signature, and one dominant idea per asset.",
      usage: "LinkedIn, Instagram feed, and stories. Campaign imagery and copy remain local to the asset.",
      contract: "It preserves logo clear space, safe zones, and contrast across variable crops.",
      a11y: "When visual text is informative, repeat it in the post copy or alternative text.",
      source: "surfaces/social-email/social.md", language: "html",
      code: `<article class="social-canvas" data-format="square">\n  <Logo />\n  <h1>One system. Every surface.</h1>\n</article>`,
      render: (variant) => `<div class="preview-social" style="--social-ratio: ${variant === "story" ? "9/16" : variant === "portrait" ? "4/5" : "1"}"><span>Singular perspective · 04</span><h4>One system. Every surface.</h4></div>`,
    },
    {
      id: "email-cta", name: "EmailCTA", category: "actions", platforms: ["email"], traits: ["static", "semantic", "content"], variants: ["announcement", "transactional"],
      description: "A robust email CTA with inline styles, fallbacks, and hierarchy that works in restrictive clients.",
      usage: "Announcements and transactional actions with one primary destination.",
      contract: "The final HTML uses no CSS variables and remains readable when images are blocked.",
      a11y: "Use descriptive link copy, AA contrast, and a correct heading structure.",
      source: "surfaces/social-email/email.md", language: "html",
      code: `<a href="{{url}}" style="background:#4567ed;color:#fff;padding:12px 18px;border-radius:999px;">\n  Review sprint\n</a>`,
      render: (variant) => `<div class="preview-email"><div class="preview-email__head">Singular Stories</div><div class="preview-email__body"><h4>${variant === "transactional" ? "Sprint 18 is ready for review" : "A clearer way to run product work"}</h4><p>${variant === "transactional" ? "Review the scope, evidence and delivery summary before approving." : "See how one operating system connects intent, delivery and outcomes."}</p><span class="preview-email__cta">${variant === "transactional" ? "Review sprint" : "Explore Singular"}</span></div></div>`,
    },
  ];

  const explorer = document.querySelector("[data-explorer]");
  if (!explorer) return;

  const ui = {
    search: explorer.querySelector("[data-search]"),
    platforms: explorer.querySelector("[data-platform-filters]"),
    categories: explorer.querySelector("[data-category-filters]"),
    traits: explorer.querySelector("[data-trait-filters]"),
    list: explorer.querySelector("[data-component-list]"),
    resultCount: explorer.querySelector("[data-result-count]"),
    empty: explorer.querySelector("[data-empty-results]"),
    variant: explorer.querySelector("[data-variant-select]"),
    breadcrumb: explorer.querySelector("[data-story-breadcrumb]"),
    preview: explorer.querySelector("[data-component-preview]"),
    stage: explorer.querySelector("[data-preview-stage]"),
    size: explorer.querySelector("[data-preview-size]"),
    badges: explorer.querySelector("[data-story-badges]"),
    title: explorer.querySelector("[data-story-title]"),
    description: explorer.querySelector("[data-story-description]"),
    usage: explorer.querySelector("[data-story-usage]"),
    contract: explorer.querySelector("[data-story-contract]"),
    a11y: explorer.querySelector("[data-story-a11y]"),
    code: explorer.querySelector("[data-story-code]"),
    language: explorer.querySelector("[data-code-language]"),
    source: explorer.querySelector("[data-source-link]"),
  };

  const state = { search: "", platforms: new Set(), category: "all", traits: new Set(), selected: "button", variant: "primary" };
  const normalized = (value) => value.toLocaleLowerCase("en").normalize("NFD").replace(/[\u0300-\u036f]/g, "");
  const labelVariant = (variant) => variant.replace(/-/g, " ").replace(/^./, (letter) => letter.toUpperCase());

  function filteredStories() {
    const query = normalized(state.search.trim());
    return stories.filter((story) => {
      const matchesSearch = !query || normalized(`${story.name} ${story.description} ${story.category} ${story.platforms.join(" ")}`).includes(query);
      const matchesPlatform = !state.platforms.size || story.platforms.some((platform) => state.platforms.has(platform));
      const matchesCategory = state.category === "all" || story.category === state.category;
      const matchesTrait = !state.traits.size || story.traits.some((trait) => state.traits.has(trait));
      return matchesSearch && matchesPlatform && matchesCategory && matchesTrait;
    });
  }

  function renderPlatformFilters() {
    ui.platforms.innerHTML = Object.entries(platformMeta).map(([id, meta]) => `<button class="filter-chip" type="button" data-platform-filter="${id}" aria-pressed="${state.platforms.has(id)}">${meta.label}</button>`).join("");
  }

  function renderCategoryFilters() {
    ui.categories.innerHTML = Object.entries(categoryMeta).map(([id, label]) => {
      const count = id === "all" ? stories.length : stories.filter((story) => story.category === id).length;
      return `<button class="category-button" type="button" data-category-filter="${id}" aria-pressed="${state.category === id}"><span>${label}</span><span>${count}</span></button>`;
    }).join("");
  }

  function renderTraitFilters() {
    ui.traits.innerHTML = Object.entries(traitMeta).map(([id, label]) => `<button class="filter-chip" type="button" data-trait-filter="${id}" aria-pressed="${state.traits.has(id)}">${label}</button>`).join("");
  }

  function renderList({ preserveSelection = true } = {}) {
    const visible = filteredStories();
    ui.resultCount.textContent = String(visible.length);
    ui.empty.hidden = visible.length !== 0;
    ui.list.innerHTML = visible.map((story) => {
      const primaryPlatform = story.platforms[0];
      return `<button class="component-button" type="button" role="option" data-story-id="${story.id}" aria-selected="${state.selected === story.id}"><span class="component-button__icon">${platformMeta[primaryPlatform].short}</span><span><strong>${story.name}</strong><small>${categoryMeta[story.category]}</small></span><i class="component-button__platform" style="--platform-color:${platformMeta[primaryPlatform].color}" aria-hidden="true"></i></button>`;
    }).join("");
    if (!visible.length) return;
    if (!preserveSelection || !visible.some((story) => story.id === state.selected)) {
      state.selected = visible[0].id;
      state.variant = visible[0].variants[0];
      renderStory();
      renderList();
    }
  }

  function currentStory() { return stories.find((story) => story.id === state.selected) || stories[0]; }

  function renderStory() {
    const story = currentStory();
    if (!story.variants.includes(state.variant)) state.variant = story.variants[0];
    ui.variant.innerHTML = story.variants.map((variant) => `<option value="${variant}" ${variant === state.variant ? "selected" : ""}>${labelVariant(variant)}</option>`).join("");
    ui.breadcrumb.textContent = `${categoryMeta[story.category]} / ${story.name}`;
    ui.preview.innerHTML = story.render(state.variant);
    ui.badges.innerHTML = [...story.platforms.map((platform) => platformMeta[platform].label), ...story.traits].map((badge) => `<span class="story-badge">${badge}</span>`).join("");
    ui.title.textContent = story.name;
    ui.description.textContent = story.description;
    ui.usage.textContent = story.usage;
    ui.contract.textContent = story.contract;
    ui.a11y.textContent = story.a11y;
    ui.code.textContent = story.code;
    ui.language.textContent = story.language;
    ui.source.href = githubRoot + story.source;
    ui.list.querySelectorAll("[data-story-id]").forEach((button) => button.setAttribute("aria-selected", String(button.dataset.storyId === state.selected)));
  }

  function setViewport(viewport) {
    ui.stage.dataset.viewport = viewport;
    explorer.querySelectorAll("[data-viewport]").forEach((button) => button.setAttribute("aria-pressed", String(button.dataset.viewport === viewport)));
    ui.size.textContent = ({ desktop: "1280 × auto", tablet: "768 × auto", mobile: "390 × auto" })[viewport];
  }

  function setDensity(density) {
    ui.stage.dataset.density = density;
    explorer.querySelectorAll("[data-density]").forEach((button) => button.setAttribute("aria-pressed", String(button.dataset.density === density)));
  }

  explorer.addEventListener("click", (event) => {
    const platform = event.target.closest("[data-platform-filter]");
    if (platform) {
      const id = platform.dataset.platformFilter;
      state.platforms.has(id) ? state.platforms.delete(id) : state.platforms.add(id);
      renderPlatformFilters(); renderList({ preserveSelection: false }); return;
    }
    const category = event.target.closest("[data-category-filter]");
    if (category) { state.category = category.dataset.categoryFilter; renderCategoryFilters(); renderList({ preserveSelection: false }); return; }
    const trait = event.target.closest("[data-trait-filter]");
    if (trait) {
      const id = trait.dataset.traitFilter;
      state.traits.has(id) ? state.traits.delete(id) : state.traits.add(id);
      renderTraitFilters(); renderList({ preserveSelection: false }); return;
    }
    const storyButton = event.target.closest("[data-story-id]");
    if (storyButton) { state.selected = storyButton.dataset.storyId; state.variant = currentStory().variants[0]; renderList(); renderStory(); return; }
    const viewport = event.target.closest("[data-viewport]");
    if (viewport) { setViewport(viewport.dataset.viewport); return; }
    const density = event.target.closest("[data-density]");
    if (density) { setDensity(density.dataset.density); return; }
    const reset = event.target.closest("[data-clear-filters]");
    if (reset) {
      state.search = ""; state.platforms.clear(); state.traits.clear(); state.category = "all"; ui.search.value = "";
      renderPlatformFilters(); renderCategoryFilters(); renderTraitFilters(); renderList({ preserveSelection: false }); return;
    }
    const interactivePreview = event.target.closest(".preview-pill, .preview-tabs button");
    if (interactivePreview) {
      interactivePreview.parentElement.querySelectorAll("button").forEach((button) => button.classList.remove("is-active"));
      interactivePreview.classList.add("is-active");
    }
  });

  ui.search.addEventListener("input", () => { state.search = ui.search.value; renderList({ preserveSelection: false }); });
  ui.variant.addEventListener("change", () => { state.variant = ui.variant.value; renderStory(); });

  explorer.querySelectorAll("[data-doc-tab]").forEach((tab) => {
    tab.addEventListener("click", () => {
      explorer.querySelectorAll("[data-doc-tab]").forEach((candidate) => candidate.setAttribute("aria-selected", String(candidate === tab)));
      explorer.querySelectorAll("[data-doc-panel]").forEach((panel) => { panel.hidden = panel.dataset.docPanel !== tab.dataset.docTab; });
    });
    tab.addEventListener("keydown", (event) => {
      if (!["ArrowLeft", "ArrowRight", "Home", "End"].includes(event.key)) return;
      const tabs = [...explorer.querySelectorAll("[data-doc-tab]")];
      const index = tabs.indexOf(tab);
      const next = event.key === "Home" ? 0 : event.key === "End" ? tabs.length - 1 : (index + (event.key === "ArrowRight" ? 1 : -1) + tabs.length) % tabs.length;
      event.preventDefault(); tabs[next].focus(); tabs[next].click();
    });
  });

  async function copyText(text, button) {
    try {
      await navigator.clipboard.writeText(text);
      const original = button.textContent; button.textContent = "Copied";
      window.setTimeout(() => { button.textContent = original; }, 1600);
    } catch { button.textContent = "Select and copy"; }
  }
  explorer.querySelector("[data-copy-code]").addEventListener("click", (event) => copyText(currentStory().code, event.currentTarget));
  document.querySelector("[data-copy-install]")?.addEventListener("click", (event) => copyText("node scripts/export-snapshot.mjs --bundle=core,website-landing --target=./design-system/singular", event.currentTarget));

  document.addEventListener("keydown", (event) => {
    if (event.key === "/" && document.activeElement !== ui.search && !/input|textarea|select/i.test(document.activeElement.tagName)) { event.preventDefault(); ui.search.focus(); }
  });

  const hero = document.querySelector(".hero");
  if (hero && !window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
    hero.addEventListener("pointermove", (event) => {
      const bounds = hero.getBoundingClientRect();
      hero.style.setProperty("--spot-x", `${event.clientX - bounds.left}px`);
      hero.style.setProperty("--spot-y", `${event.clientY - bounds.top}px`);
      hero.dataset.pointerActive = "true";
    }, { passive: true });
  }

  const fullscreenToggle = explorer.querySelector("[data-fullscreen-toggle]");
  const isFullscreen = () => document.fullscreenElement === explorer || explorer.dataset.fullscreenFallback === "true";
  const syncFullscreenState = () => {
    const active = isFullscreen();
    fullscreenToggle?.setAttribute("aria-pressed", String(active));
    fullscreenToggle?.setAttribute("aria-label", active ? "Exit fullscreen" : "View catalog in fullscreen");
    if (fullscreenToggle) fullscreenToggle.title = active ? "Exit fullscreen (Esc)" : "Fullscreen";
    document.body.classList.toggle("has-explorer-fullscreen", active);
  };
  const useFullscreenFallback = () => {
    explorer.dataset.fullscreenFallback = "true";
    syncFullscreenState();
  };

  fullscreenToggle?.addEventListener("click", async () => {
    if (document.fullscreenElement === explorer) {
      await document.exitFullscreen();
      return;
    }
    if (explorer.dataset.fullscreenFallback === "true") {
      delete explorer.dataset.fullscreenFallback;
      syncFullscreenState();
      return;
    }
    if (!explorer.requestFullscreen) {
      useFullscreenFallback();
      return;
    }
    try {
      await explorer.requestFullscreen();
    } catch {
      useFullscreenFallback();
    }
  });
  document.addEventListener("fullscreenchange", syncFullscreenState);
  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape" && explorer.dataset.fullscreenFallback === "true") {
      delete explorer.dataset.fullscreenFallback;
      syncFullscreenState();
      fullscreenToggle?.focus();
    }
  });

  renderPlatformFilters();
  renderCategoryFilters();
  renderTraitFilters();
  renderList();
  renderStory();
  setViewport("desktop");
  setDensity("comfortable");
})();
