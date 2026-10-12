(() => {
  // Example state only; no API calls, persistence, permissions or host business rules.
  const stories = [
    { id: "SS-104", title: "Auth refactor", owner: "Camila", initials: "CA", status: "In Progress", priority: "High", points: 8, project: "Platform" },
    { id: "SS-105", title: "Billing webhook", owner: "Alonso", initials: "AL", status: "Completed", priority: "Medium", points: 5, project: "Platform" },
    { id: "SS-106", title: "QA queue triage", owner: "César", initials: "CE", status: "Blocked", priority: "High", points: 3, project: "Platform" },
    { id: "SS-107", title: "Onboarding wizard", owner: "Luis", initials: "LU", status: "In Review", priority: "Low", points: 5, project: "Website" },
  ];
  const q = selector => document.querySelector(selector);
  const all = selector => [...document.querySelectorAll(selector)];
  let filter = "all", search = "", project = "all", cards = false, selected = stories[0];
  const escape = value => String(value).replace(/[&<>"']/g, c => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));
  const tone = status => status === "In Progress" || status === "Completed" ? "success" : status === "Blocked" ? "danger" : "warning";
  const badge = story => `<span class="demo-status" data-tone="${tone(story.status)}">${escape(story.status)}</span>`;
  const link = story => `<button type="button" class="demo-story-link" data-story="${story.id}"><small>${story.id} · ${story.project}</small><strong>${escape(story.title)}</strong></button>`;
  const render = () => {
    const visible = stories.filter(s => (filter === "all" || s.status === filter) && (project === "all" || s.project === project) && (s.title + " " + s.owner).toLowerCase().includes(search));
    q("[data-story-rows]").innerHTML = visible.map(s => `<tr class="${s.status === "In Progress" ? "demo-live" : ""}"><td>${link(s)}</td><td class="demo-owner"><i aria-hidden="true">${s.initials}</i>${s.owner}</td><td>${badge(s)}</td><td>${s.priority}</td><td class="demo-number">${s.points}</td></tr>`).join("");
    q("[data-story-cards]").innerHTML = visible.map(s => `<article class="demo-story-card">${link(s)}<div>${badge(s)}<span>${s.points} SP</span></div><div><span>${s.owner}</span><span>${s.priority} priority</span></div></article>`).join("");
    q(".demo-table-scroll").hidden = cards || !visible.length;
    q("[data-story-cards]").hidden = !cards || !visible.length;
    q("[data-empty]").hidden = visible.length > 0;
    q("[data-result-count]").textContent = `${visible.length} ${visible.length === 1 ? "story" : "stories"}`;
    all("[data-status-filter]").forEach(b => b.setAttribute("aria-pressed", String(b.dataset.statusFilter === filter)));
  };
  all("[data-status-filter]").forEach(b => b.addEventListener("click", () => { filter = b.dataset.statusFilter; render(); }));
  q("[data-search]").addEventListener("input", e => { search = e.target.value.toLowerCase(); render(); });
  q("[data-project]").addEventListener("change", e => { project = e.target.value; render(); });
  q("[data-reset]").addEventListener("click", () => { filter = "all"; search = ""; project = "all"; q("[data-search]").value = ""; q("[data-project]").value = "all"; render(); });
  q("[data-search-toggle]").addEventListener("click", e => {
    const field = q(".demo-search"); field.hidden = !field.hidden;
    e.currentTarget.setAttribute("aria-expanded", String(!field.hidden));
    if (!field.hidden) q("[data-search]").focus();
    else { search = ""; q("[data-search]").value = ""; render(); }
  });
  q("[data-view-toggle]").addEventListener("click", e => { cards = !cards; e.currentTarget.setAttribute("aria-pressed", String(cards)); e.currentTarget.setAttribute("aria-label", cards ? "Switch to table view" : "Switch to card view"); render(); });
  q("[data-kpi-toggle]").addEventListener("click", e => { const panel = q("#headline-kpis"); panel.hidden = !panel.hidden; e.currentTarget.textContent = panel.hidden ? "Show metrics" : "Hide metrics"; e.currentTarget.setAttribute("aria-expanded", String(!panel.hidden)); });
  const mobile = matchMedia("(max-width: 767px)");
  const syncMenu = () => { q("#product-nav").hidden = mobile.matches; q("[data-menu-toggle]").setAttribute("aria-expanded", String(!mobile.matches)); q("[data-menu-toggle]").setAttribute("aria-label", mobile.matches ? "Show navigation" : "Hide navigation"); };
  mobile.addEventListener("change", syncMenu); syncMenu();
  q("[data-menu-toggle]").addEventListener("click", e => { const nav = q("#product-nav"); nav.hidden = !nav.hidden; e.currentTarget.setAttribute("aria-expanded", String(!nav.hidden)); e.currentTarget.setAttribute("aria-label", nav.hidden ? "Show navigation" : "Hide navigation"); });
  q("[data-expand]").addEventListener("click", e => { const wide = q(".demo-content").classList.toggle("is-wide"); q(".demo-sidebar").hidden = wide; e.currentTarget.setAttribute("aria-pressed", String(wide)); e.currentTarget.setAttribute("aria-label", wide ? "Restore content width" : "Expand content"); });
  const syncDemoTheme = () => {
    const dark = document.documentElement.classList.contains("dark");
    q("[data-demo-theme]").setAttribute("aria-label", dark ? "Switch to light mode" : "Switch to dark mode");
    q("[data-demo-theme]").textContent = dark ? "☼" : "☾";
    q("[data-demo-logo]").src = `../../assets/logos/singular-icon-${dark ? "dark" : "light"}-bg.svg`;
  };
  q("[data-demo-theme]").addEventListener("click", () => {
    const dark = document.documentElement.classList.toggle("dark");
    try { localStorage.setItem("singular-ds-theme", dark ? "dark" : "light"); } catch { /* Optional preference. */ }
    syncDemoTheme();
  });
  window.addEventListener("singular-ds-themechange", syncDemoTheme);
  syncDemoTheme();
  const dialog = q(".demo-detail");
  let returnStoryId = null;
  const open = (story, trigger) => { selected = story; returnStoryId = trigger?.dataset.story || null; q("#detail-title").textContent = story.title; q("[data-detail-status]").value = story.status; q("[data-detail-priority]").value = story.priority; dialog.showModal(); };
  q("[data-open-detail]").addEventListener("click", () => open(stories[0]));
  document.addEventListener("click", e => { const trigger = e.target.closest("[data-story]"); if (trigger) open(stories.find(s => s.id === trigger.dataset.story), trigger); });
  // Editing re-renders the row/card, so native dialog restoration can target a detached node.
  dialog.addEventListener("close", () => {
    const trigger = all("[data-story]").find(b => b.dataset.story === returnStoryId && b.getClientRects().length);
    (trigger || q("[data-open-detail]")).focus();
  });
  all("[data-close-detail]").forEach(b => b.addEventListener("click", () => dialog.close()));
  let toastTimer;
  const updateDetail = () => {
    selected.status = q("[data-detail-status]").value; selected.priority = q("[data-detail-priority]").value; render();
    q("[data-toast]").textContent = "Preview updated locally. No changes saved to Stories.";
    clearTimeout(toastTimer); toastTimer = setTimeout(() => { q("[data-toast]").textContent = ""; }, 5000);
  };
  q("[data-detail-status]").addEventListener("change", updateDetail); q("[data-detail-priority]").addEventListener("change", updateDetail);
  render();
})();
