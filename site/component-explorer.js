(() => {
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

  const { stories, codeFor } = window.SingularCatalog;

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
  const totals = `${stories.length} stories · ${stories.reduce((n, story) => n + story.variants.length, 0)} examples`;
  document.querySelectorAll("[data-catalog-counts]").forEach(node => { node.textContent = totals; });

  function restoreLocation() {
    const params = new URLSearchParams(location.search);
    const story = stories.find(s => s.id === params.get("story")) || stories.find(s => s.id === "button");
    state.selected = story.id;
    state.variant = story.variants.includes(params.get("variant")) ? params.get("variant") : story.variants[0];
  }
  function syncLocation(mode = "replace") {
    const url = new URL(location.href);
    url.searchParams.set("story", state.selected);
    url.searchParams.set("variant", state.variant);
    if (url.href !== location.href) history[mode === "push" ? "pushState" : "replaceState"]({}, "", url);
  }
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
      return `<button class="component-button" type="button" data-story-id="${story.id}" aria-pressed="${state.selected === story.id}"><span class="component-button__icon">${platformMeta[primaryPlatform].short}</span><span><strong>${story.name}</strong><small>${categoryMeta[story.category]}</small></span><i class="component-button__platform" style="--platform-color:${platformMeta[primaryPlatform].color}" aria-hidden="true"></i></button>`;
    }).join("");
    if (!visible.length) return;
    if (!preserveSelection || !visible.some((story) => story.id === state.selected)) {
      state.selected = visible[0].id;
      state.variant = visible[0].variants[0];
      renderStory();
      syncLocation();
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
    window.SingularAgentOrbPreview?.hydrate(ui.preview);
    ui.badges.innerHTML = [story.kind || "component", ...story.platforms.map((platform) => platformMeta[platform].label), ...story.traits].map((badge) => `<span class="story-badge">${badge}</span>`).join("");
    ui.title.textContent = story.name;
    ui.description.textContent = story.description;
    ui.usage.textContent = story.usage;
    ui.contract.textContent = story.contract;
    ui.a11y.textContent = story.a11y;
    ui.code.textContent = codeFor(story, state.variant);
    ui.language.textContent = story.language;
    ui.source.href = story.source;
    ui.list.querySelectorAll("[data-story-id]").forEach((button) => button.setAttribute("aria-pressed", String(button.dataset.storyId === state.selected)));
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
    if (storyButton) { state.selected = storyButton.dataset.storyId; state.variant = currentStory().variants[0]; renderList(); renderStory(); syncLocation("push"); return; }
    const viewport = event.target.closest("[data-viewport]");
    if (viewport) { setViewport(viewport.dataset.viewport); return; }
    const density = event.target.closest("[data-density]");
    if (density) { setDensity(density.dataset.density); return; }
    const reset = event.target.closest("[data-clear-filters]");
    if (reset) {
      state.search = ""; state.platforms.clear(); state.traits.clear(); state.category = "all"; ui.search.value = "";
      renderPlatformFilters(); renderCategoryFilters(); renderTraitFilters(); renderList({ preserveSelection: false }); return;
    }
    const interactivePreview = event.target.closest(".preview-pill");
    if (interactivePreview) {
      const group = interactivePreview.parentElement;
      const multi = group.dataset.previewMulti === "true" && interactivePreview.dataset.previewFilter !== "All";
      const active = interactivePreview.getAttribute("aria-pressed") === "true";
      const setActive = (button, value) => { button.classList.toggle("is-active", value); button.setAttribute("aria-pressed", String(value)); };
      group.querySelectorAll("button").forEach(button => {
        if (!multi || button.dataset.previewFilter === "All") setActive(button, false);
      });
      setActive(interactivePreview, multi ? !active : true);
      if (multi && !group.querySelector('[aria-pressed="true"]')) setActive(group.querySelector('[data-preview-filter="All"]'), true);
    }
  });

  ui.search.addEventListener("input", () => { state.search = ui.search.value; renderList({ preserveSelection: false }); });
  ui.variant.addEventListener("change", () => { state.variant = ui.variant.value; renderStory(); syncLocation("push"); });
  window.addEventListener("popstate", () => {
    restoreLocation();
    state.search = ""; state.platforms.clear(); state.traits.clear(); state.category = "all"; ui.search.value = "";
    renderPlatformFilters(); renderCategoryFilters(); renderTraitFilters(); renderList(); renderStory();
  });

  explorer.querySelectorAll("[data-doc-tab]").forEach((tab) => {
    tab.addEventListener("click", () => {
      explorer.querySelectorAll("[data-doc-tab]").forEach((candidate) => { candidate.setAttribute("aria-selected", String(candidate === tab)); candidate.tabIndex = candidate === tab ? 0 : -1; });
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
    } catch {
      const fallback = explorer.querySelector("[data-copy-fallback]");
      fallback.hidden = false; fallback.value = text; fallback.focus(); fallback.select();
      button.textContent = "Copy selected text";
    }
    explorer.querySelector("[data-copy-feedback]").textContent = button.textContent;
  }
  explorer.querySelector("[data-copy-code]").addEventListener("click", (event) => copyText(codeFor(currentStory(), state.variant), event.currentTarget));
  explorer.querySelector("[data-copy-link]").addEventListener("click", (event) => { syncLocation(); copyText(location.href, event.currentTarget); });
  document.querySelector("[data-copy-install]")?.addEventListener("click", (event) => copyText("# Run from a cloned Skill-Design-System repo; destination must be new.\nnode scripts/export-snapshot.mjs --bundle=core,website-landing --target=../my-project/src/singular", event.currentTarget));

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

  restoreLocation();
  renderPlatformFilters();
  renderCategoryFilters();
  renderTraitFilters();
  renderList();
  renderStory();
  syncLocation();
  setViewport("desktop");
  setDensity("comfortable");
})();
