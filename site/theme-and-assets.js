(() => {
  const root = document.documentElement;
  const themeColor = document.querySelector('meta[name="theme-color"]');
  const toggles = [...document.querySelectorAll("[data-theme-toggle]")];

  const syncTheme = () => {
    const isDark = root.classList.contains("dark");
    toggles.forEach((toggle) => {
      toggle.setAttribute("aria-pressed", String(isDark));
      toggle.setAttribute("aria-label", isDark ? "Switch to light mode" : "Switch to dark mode");
      toggle.title = isDark ? "Switch to light mode" : "Switch to dark mode";
    });
    if (themeColor) themeColor.content = isDark ? "#070b17" : "#f5f8ff";
  };

  toggles.forEach((toggle) => {
    toggle.addEventListener("click", () => {
      root.classList.toggle("dark");
      localStorage.setItem("singular-ds-theme", root.classList.contains("dark") ? "dark" : "light");
      syncTheme();
    });
  });
  syncTheme();

  const dialog = document.querySelector("[data-asset-lightbox]");
  if (!dialog) return;

  const image = dialog.querySelector("[data-lightbox-image]");
  const title = dialog.querySelector("[data-lightbox-title]");
  const download = dialog.querySelector("[data-lightbox-download]");

  document.querySelectorAll("[data-logo-preview]").forEach((trigger) => {
    trigger.addEventListener("click", () => {
      const source = trigger.dataset.src;
      const label = trigger.dataset.title || "Singular logo";
      image.src = source;
      image.alt = label;
      title.textContent = label;
      download.href = source;
      dialog.showModal();
    });
  });

  dialog.querySelector("[data-lightbox-close]")?.addEventListener("click", () => dialog.close());
  dialog.addEventListener("click", (event) => {
    if (event.target === dialog) dialog.close();
  });
})();
