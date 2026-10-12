(() => {
  // The shared showcase host owns navigation and theme.

  document.querySelectorAll("[data-tabs]").forEach(group => {
    const tabs = [...group.querySelectorAll('[role="tab"]')];
    const select = tab => {
      tabs.forEach(item => {
        const active = item === tab;
        item.setAttribute("aria-selected", String(active));
        item.tabIndex = active ? 0 : -1;
        document.getElementById(item.getAttribute("aria-controls")).hidden = !active;
      });
    };
    tabs.forEach((tab, index) => {
      tab.addEventListener("click", () => select(tab));
      tab.addEventListener("keydown", event => {
        const offset = event.key === "ArrowRight" || event.key === "ArrowDown" ? 1 : event.key === "ArrowLeft" || event.key === "ArrowUp" ? -1 : 0;
        if (!offset && event.key !== "Home" && event.key !== "End") return;
        event.preventDefault();
        const next = event.key === "Home" ? 0 : event.key === "End" ? tabs.length - 1 : (index + offset + tabs.length) % tabs.length;
        select(tabs[next]);
        tabs[next].focus();
      });
    });
  });

  const marquee = document.querySelector("[data-marquee]");
  const pause = document.querySelector("[data-marquee-pause]");
  pause?.addEventListener("click", () => {
    const paused = marquee.dataset.paused !== "true";
    marquee.dataset.paused = String(paused);
    pause.setAttribute("aria-pressed", String(paused));
    pause.textContent = paused ? "Resume motion" : "Pause motion";
  });

  const result = document.querySelector("[data-copy-result]");
  const status = document.querySelector("[data-copy-status]");
  const code = document.querySelector("[data-copy-code]");
  let copyTrigger;
  document.querySelectorAll("[data-copy-recipe]").forEach(button => button.addEventListener("click", async () => {
    const recipe = window.SingularWebsiteRecipes?.[button.dataset.copyRecipe];
    if (!recipe) return;
    copyTrigger = button;
    code.value = recipe;
    result.hidden = false;
    try {
      await navigator.clipboard.writeText(recipe);
      status.textContent = "Recipe copied. Load theme-web.css and website.css in your host.";
    } catch {
      status.textContent = "Clipboard unavailable. Select and copy the example below.";
    }
    code.focus();
    code.select();
  }));
  const close = () => { result.hidden = true; copyTrigger?.focus(); };
  document.querySelector("[data-copy-close]")?.addEventListener("click", close);
  result?.addEventListener("keydown", event => { if (event.key === "Escape") { event.preventDefault(); close(); } });
})();
