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
  const library = document.querySelector("[data-logo-library]");
  const resultCount = document.querySelector("[data-logo-result-count]");
  const emptyState = document.querySelector("[data-logo-empty]");
  const filterControls = [...document.querySelectorAll("[data-logo-filter]")];
  const assets = [
    { name: "Full logo · dark background", file: "singular-full-dark-bg.svg", format: "svg", style: "full", background: "dark", text: "with-text", detail: "Vector · light wordmark" },
    { name: "Full logo · light background", file: "singular-full-light-bg.svg", format: "svg", style: "full", background: "light", text: "with-text", detail: "Vector · dark wordmark" },
    { name: "Singular icon · dark background", file: "singular-icon-dark-bg.svg", format: "svg", style: "icon", background: "dark", text: "no-text", detail: "Vector · icon only" },
    { name: "Singular icon · light background", file: "singular-icon-light-bg.svg", format: "svg", style: "icon", background: "light", text: "no-text", detail: "Vector · icon only" },
    { name: "Wordmark · dark background", file: "singular-wordmark-dark-bg.svg", format: "svg", style: "wordmark", background: "dark", text: "with-text", detail: "Vector · wordmark only" },
    { name: "Wordmark · light background", file: "singular-wordmark-light-bg.svg", format: "svg", style: "wordmark", background: "light", text: "with-text", detail: "Vector · wordmark only" },
    { name: "Full logo · dark background", file: "singular-full-dark-bg.png", format: "png", style: "full", background: "dark", text: "with-text", detail: "2048 × 409 · light wordmark" },
    { name: "Full logo · light background", file: "singular-full-light-bg.png", format: "png", style: "full", background: "light", text: "with-text", detail: "2048 × 409 · dark wordmark" },
    { name: "Singular favicon", file: "singular-favicon-256.png", format: "png", style: "icon", background: "neutral", text: "no-text", detail: "256 × 256 · compact placements" },
  ];

  const sourceFor = (asset) => `assets/logos/${asset.file}`;
  const renderLibrary = () => {
    if (!library) return;
    const filters = Object.fromEntries(filterControls.map((control) => [control.dataset.logoFilter, control.value]));
    const visible = assets.filter((asset) => Object.entries(filters).every(([key, value]) => value === "all" || asset[key] === value));
    library.innerHTML = visible.map((asset) => {
      const source = sourceFor(asset);
      const format = asset.format.toUpperCase();
      return `<article class="logo-download-card">
        <button class="logo-download-card__preview logo-preview--${asset.background}" type="button" data-logo-preview data-src="${source}" data-title="${asset.name}" data-format="${format}" aria-label="Preview ${asset.name}">
          <img src="${source}" alt="${asset.name}" loading="lazy" />
        </button>
        <div class="logo-download-card__body">
          <div class="logo-download-card__meta"><span>${format}</span><span>${asset.style === "full" ? "Full logo" : asset.style === "icon" ? "Icon" : "Wordmark"}</span><span>${asset.text === "with-text" ? "With text" : "No text"}</span></div>
          <h3>${asset.name}</h3>
          <p>${asset.detail}</p>
          <a href="${source}" download>Download ${format} ↓</a>
        </div>
      </article>`;
    }).join("");
    if (resultCount) resultCount.textContent = String(visible.length);
    if (emptyState) emptyState.hidden = visible.length !== 0;
  };

  filterControls.forEach((control) => control.addEventListener("change", renderLibrary));
  document.querySelector("[data-logo-reset]")?.addEventListener("click", () => {
    filterControls.forEach((control) => { control.value = "all"; });
    renderLibrary();
  });
  renderLibrary();

  document.addEventListener("click", (event) => {
    const trigger = event.target.closest("[data-logo-preview]");
    if (!trigger) return;
    const source = trigger.dataset.src;
    const label = trigger.dataset.title || "Singular logo";
    const format = trigger.dataset.format || "asset";
    image.src = source;
    image.alt = label;
    title.textContent = label;
    download.href = source;
    download.textContent = `Download ${format} ↓`;
    dialog.showModal();
  });

  dialog.querySelector("[data-lightbox-close]")?.addEventListener("click", () => dialog.close());
  dialog.addEventListener("click", (event) => {
    if (event.target === dialog) dialog.close();
  });
})();
