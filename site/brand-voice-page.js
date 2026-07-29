(() => {
  const GROUPS = [
    {
      label: "Start",
      items: [
        {
          id: "start",
          path: "docs/README.md",
          label: "Start here",
          description: "The complete story from client reality to system decisions.",
        },
      ],
    },
    {
      label: "Understand the client",
      items: [
        {
          id: "client-context",
          path: "docs/01-client-context.md",
          label: "Client reality",
          description: "The company, operating problem, people, and desired change.",
        },
      ],
    },
    {
      label: "Define the experience",
      items: [
        {
          id: "foundations",
          path: "docs/05-experience-foundations.md",
          label: "The Singular model",
          description: "How Singular collaborates and how client needs become system decisions.",
        },
      ],
    },
    {
      label: "Express Singular",
      items: [
        {
          id: "brand",
          path: "brand/README.md",
          label: "Brand & core voice",
          description: "The shared idea, character, voice, and visual rules.",
        },
        {
          id: "marketing-voice",
          path: "ux-voice/marketing.md",
          label: "Marketing manual",
          description: "Positioning, narrative, surfaces, claims, and commercial next steps.",
        },
        {
          id: "product-voice",
          path: "ux-voice/product.md",
          label: "Product manual",
          description: "States, actions, approvals, AI communication, and terminology.",
        },
      ],
    },
    {
      label: "Apply & evolve",
      items: [
        {
          id: "application",
          path: "docs/08-application-map.md",
          label: "Apply & evolve",
          description: "Route work, trace decisions, and keep evidence distinct from assumption.",
        },
      ],
    },
  ];

  const DOCUMENTS = GROUPS.flatMap((group) =>
    group.items.map((item) => ({ ...item, group: group.label })),
  ).map((item, index) => ({ ...item, index }));
  const DOCUMENT_BY_ID = new Map(DOCUMENTS.map((document) => [document.id, document]));
  const BASE_URL = new URL(".", window.location.href);
  const DOCUMENT_BY_PATH = new Map(
    DOCUMENTS.map((document) => [new URL(document.path, BASE_URL).pathname, document]),
  );
  const LEGACY_DOCUMENT_IDS = new Map([
    ["users-jobs-pains", "client-context"],
    ["problem-outcomes", "client-context"],
    ["collaboration", "foundations"],
    ["system-derivation", "foundations"],
    ["decisions", "application"],
    ["evidence", "application"],
  ]);
  const REPOSITORY_URL = "https://github.com/SingularAgency/Skill-Design-System";

  const chapterNavigation = document.querySelector("[data-chapter-navigation]");
  const reader = document.querySelector(".docs-reader");
  const article = document.querySelector("[data-doc-content]");
  const loading = document.querySelector("[data-doc-loading]");
  const error = document.querySelector("[data-doc-error]");
  const errorSource = document.querySelector("[data-error-source]");
  const editSource = document.querySelector("[data-edit-source]");
  const documentGroup = document.querySelector("[data-doc-group]");
  const documentStep = document.querySelector("[data-doc-step]");
  const documentDescription = document.querySelector("[data-doc-description]");
  const documentStatus = document.querySelector("[data-doc-status]");
  const mobileCurrent = document.querySelector("[data-mobile-current]");
  const outline = document.querySelector("[data-page-outline]");
  const previousLink = document.querySelector("[data-doc-previous]");
  const nextLink = document.querySelector("[data-doc-next]");
  const menuToggle = document.querySelector("[data-docs-menu-toggle]");
  const sidebar = document.querySelector(".docs-sidebar");
  const backdrop = document.querySelector(".docs-sidebar-backdrop");
  const readingProgress = document.querySelector("[data-reading-progress]");
  const drawerBackgroundElements = [
    document.querySelector(".site-header"),
    document.querySelector(".docs-hero"),
    document.querySelector(".docs-mobile-bar"),
    document.querySelector(".docs-reader"),
    document.querySelector(".docs-outline"),
    document.querySelector(".site-footer"),
  ].filter(Boolean);

  let activeDocument = null;
  let loadSequence = 0;
  let firstLoad = true;
  let headingObserver = null;
  const mobileNavigationQuery = window.matchMedia("(max-width: 980px)");

  const escapeHtml = (value) =>
    String(value)
      .replaceAll("&", "&amp;")
      .replaceAll("<", "&lt;")
      .replaceAll(">", "&gt;")
      .replaceAll('"', "&quot;")
      .replaceAll("'", "&#039;");

  const safeHref = (value) => {
    const trimmed = String(value).trim();
    if (/^(?:javascript|data|vbscript):/i.test(trimmed)) return "#";
    return escapeHtml(trimmed);
  };

  const plainText = (value) =>
    String(value)
      .replace(/!\[([^\]]*)\]\([^)]+\)/g, "$1")
      .replace(/\[([^\]]+)\]\([^)]+\)/g, "$1")
      .replace(/[*_~`>#]/g, "")
      .trim();

  const inlineMarkdown = (value) => {
    const code = [];
    let output = String(value).replace(/`([^`]+)`/g, (_, content) => {
      const token = `\u0000CODE${code.length}\u0000`;
      code.push(content);
      return token;
    });

    output = escapeHtml(output);
    output = output.replace(
      /!\[([^\]]*)\]\(([^)\s]+)(?:\s+&quot;[^&]*&quot;)?\)/g,
      (_, alt, source) => `<img src="${safeHref(source)}" alt="${alt}" loading="lazy" />`,
    );
    output = output.replace(
      /\[([^\]]+)\]\(([^)\s]+)(?:\s+&quot;[^&]*&quot;)?\)/g,
      (_, label, href) => `<a href="${safeHref(href)}">${label}</a>`,
    );
    output = output.replace(/\*\*([^*]+)\*\*/g, "<strong>$1</strong>");
    output = output.replace(/__([^_]+)__/g, "<strong>$1</strong>");
    output = output.replace(/(^|[\s(])\*([^*\n]+)\*(?=$|[\s).,;:!?])/g, "$1<em>$2</em>");
    output = output.replace(/(^|[\s(])_([^_\n]+)_(?=$|[\s).,;:!?])/g, "$1<em>$2</em>");
    output = output.replace(/~~([^~]+)~~/g, "<s>$1</s>");
    output = output.replace(/\u0000CODE(\d+)\u0000/g, (_, index) => `<code>${escapeHtml(code[Number(index)])}</code>`);
    return output;
  };

  const slugger = () => {
    const counts = new Map();
    return (value) => {
      const base =
        plainText(value)
          .normalize("NFKD")
          .replace(/[\u0300-\u036f]/g, "")
          .toLowerCase()
          .replace(/[’']/g, "")
          .replace(/[^\p{Letter}\p{Number}\s-]/gu, "")
          .trim()
          .replace(/\s+/g, "-")
          .replace(/-+/g, "-") || "section";
      const count = counts.get(base) || 0;
      counts.set(base, count + 1);
      return count ? `${base}-${count}` : base;
    };
  };

  const splitTableRow = (line) => {
    let value = line.trim();
    if (value.startsWith("|")) value = value.slice(1);
    if (value.endsWith("|")) value = value.slice(0, -1);
    return value.split("|").map((cell) => cell.trim());
  };

  const isTableSeparator = (line) => {
    const cells = splitTableRow(line);
    return cells.length > 0 && cells.every((cell) => /^:?-{3,}:?$/.test(cell));
  };

  const stripSourceNavigation = (markdown) =>
    markdown.replace(
      /\n---\s*\n(?:\s*\*\*(?:Previous|Next|Return to):\*\*[^\n]*(?:\n|$))+\s*$/,
      "\n",
    );

  const renderCode = (source, language) => {
    if (language.toLowerCase() === "mermaid") return renderDiagram(source);
    const label = language || "text";
    return `<div class="docs-code"><span class="docs-code__label">${escapeHtml(label)}</span><pre><code>${escapeHtml(source)}</code></pre></div>`;
  };

  const renderDiagram = (source) => {
    const nodes = new Map();
    const nodePattern = /\b([A-Za-z][\w-]*)\s*(?:\[\s*"([^"]+)"\s*\]|\[\s*([^\]]+)\s*\]|\(\s*"([^"]+)"\s*\))/g;
    for (const match of source.matchAll(nodePattern)) {
      const label = match[2] || match[3] || match[4] || match[1];
      if (!nodes.has(match[1])) nodes.set(match[1], plainText(label));
    }

    const edges = [];
    const edgeSource = source.replace(
      /\b([A-Za-z][\w-]*)\s*(?:\[\s*"[^"]+"\s*\]|\[\s*[^\]]+\s*\]|\(\s*"[^"]+"\s*\))/g,
      "$1",
    );
    const edgePattern = /\b([A-Za-z][\w-]*)\s*(?:-->|---|-.->)\s*([A-Za-z][\w-]*)\b/g;
    for (const match of edgeSource.matchAll(edgePattern)) {
      edges.push([match[1], match[2]]);
      if (!nodes.has(match[1])) nodes.set(match[1], match[1]);
      if (!nodes.has(match[2])) nodes.set(match[2], match[2]);
    }

    if (nodes.size < 2) {
      return `<div class="docs-code"><span class="docs-code__label">System map</span><pre><code>${escapeHtml(source)}</code></pre></div>`;
    }

    const nodeMarkup = [...nodes.entries()]
      .map(([id, label]) => `<div class="docs-diagram__node" data-node="${escapeHtml(id)}">${escapeHtml(label)}</div>`)
      .join("");
    const edgeMarkup = edges
      .map(
        ([from, to]) =>
          `<li><span>${escapeHtml(nodes.get(from) || from)}</span><i aria-hidden="true">→</i><span>${escapeHtml(nodes.get(to) || to)}</span></li>`,
      )
      .join("");

    return `<figure class="docs-diagram">
      <figcaption>System map</figcaption>
      <div class="docs-diagram__nodes">${nodeMarkup}</div>
      ${edgeMarkup ? `<ol class="docs-diagram__edges" aria-label="Relationships">${edgeMarkup}</ol>` : ""}
      <details><summary>View diagram source</summary><pre>${escapeHtml(source)}</pre></details>
    </figure>`;
  };

  const renderMarkdown = (source) => {
    const lines = stripSourceNavigation(source).replace(/\r\n?/g, "\n").split("\n");
    const makeSlug = slugger();
    const headings = [];
    const blocks = [];
    let index = 0;

    const startsBlock = (lineIndex) => {
      const line = lines[lineIndex] || "";
      const next = lines[lineIndex + 1] || "";
      return (
        /^\s*$/.test(line) ||
        /^#{1,6}\s+/.test(line) ||
        /^```/.test(line) ||
        /^>\s?/.test(line) ||
        /^\s*(?:[-+*]|\d+\.)\s+/.test(line) ||
        /^(?:-{3,}|\*{3,}|_{3,})\s*$/.test(line) ||
        (line.includes("|") && isTableSeparator(next))
      );
    };

    while (index < lines.length) {
      const line = lines[index];
      if (/^\s*$/.test(line)) {
        index += 1;
        continue;
      }

      const fence = line.match(/^```\s*([A-Za-z0-9_-]*)\s*$/);
      if (fence) {
        const language = fence[1] || "text";
        const code = [];
        index += 1;
        while (index < lines.length && !/^```\s*$/.test(lines[index])) {
          code.push(lines[index]);
          index += 1;
        }
        if (index < lines.length) index += 1;
        blocks.push(renderCode(code.join("\n"), language));
        continue;
      }

      const heading = line.match(/^(#{1,6})\s+(.+?)\s*#*\s*$/);
      if (heading) {
        const level = heading[1].length;
        const label = heading[2];
        const id = makeSlug(label);
        if (level === 2) headings.push({ id, label: plainText(label) });
        const anchor =
          level >= 2 && level <= 4
            ? `<a class="heading-anchor" href="#${id}" aria-hidden="true" tabindex="-1">#</a>`
            : "";
        const focus = level === 1 ? ' tabindex="-1"' : "";
        blocks.push(`<h${level} id="${id}"${focus}>${anchor}${inlineMarkdown(label)}</h${level}>`);
        index += 1;
        continue;
      }

      if (/^(?:-{3,}|\*{3,}|_{3,})\s*$/.test(line)) {
        blocks.push("<hr />");
        index += 1;
        continue;
      }

      if (line.includes("|") && isTableSeparator(lines[index + 1] || "")) {
        const header = splitTableRow(line);
        index += 2;
        const rows = [];
        while (index < lines.length && lines[index].includes("|") && !/^\s*$/.test(lines[index])) {
          rows.push(splitTableRow(lines[index]));
          index += 1;
        }
        const head = header.map((cell) => `<th scope="col">${inlineMarkdown(cell)}</th>`).join("");
        const body = rows
          .map(
            (row) =>
              `<tr>${header
                .map((_, cellIndex) => `<td>${inlineMarkdown(row[cellIndex] || "")}</td>`)
                .join("")}</tr>`,
          )
          .join("");
        blocks.push(`<div class="docs-table-wrap" tabindex="0"><table><thead><tr>${head}</tr></thead><tbody>${body}</tbody></table></div>`);
        continue;
      }

      if (/^>\s?/.test(line)) {
        const quote = [];
        while (index < lines.length && /^>\s?/.test(lines[index])) {
          quote.push(lines[index].replace(/^>\s?/, ""));
          index += 1;
        }
        blocks.push(`<blockquote><p>${inlineMarkdown(quote.join(" "))}</p></blockquote>`);
        continue;
      }

      const listMatch = line.match(/^\s*([-+*]|\d+\.)\s+(.+)$/);
      if (listMatch) {
        const ordered = /\d+\./.test(listMatch[1]);
        const tag = ordered ? "ol" : "ul";
        const items = [];
        while (index < lines.length) {
          const item = lines[index].match(/^\s*([-+*]|\d+\.)\s+(.+)$/);
          if (!item || /\d+\./.test(item[1]) !== ordered) break;
          const contentLines = [item[2]];
          index += 1;
          while (index < lines.length && !/^\s*$/.test(lines[index])) {
            if (/^\s*([-+*]|\d+\.)\s+/.test(lines[index])) break;
            if (startsBlock(index)) break;
            contentLines.push(lines[index].trim());
            index += 1;
          }
          let content = contentLines.join(" ");
          const task = content.match(/^\[([ xX])\]\s+(.+)$/);
          if (task) {
            const checked = task[1].toLowerCase() === "x";
            content = `<input type="checkbox" disabled${checked ? " checked" : ""} />${inlineMarkdown(task[2])}`;
          } else {
            content = inlineMarkdown(content);
          }
          items.push(`<li>${content}</li>`);
        }
        blocks.push(`<${tag}>${items.join("")}</${tag}>`);
        continue;
      }

      const paragraph = [line.trim()];
      index += 1;
      while (index < lines.length && !startsBlock(index)) {
        paragraph.push(lines[index].trim());
        index += 1;
      }
      const paragraphSource = paragraph.join(" ");
      const metadata = /^\*\*(?:Status|Version|Audience|Language|Owner|Last reviewed):\*\*/.test(paragraphSource);
      blocks.push(`<p${metadata ? ' class="doc-meta-line"' : ""}>${inlineMarkdown(paragraphSource)}</p>`);
    }

    return { html: blocks.join("\n"), headings };
  };

  const renderChapterNavigation = () => {
    chapterNavigation.innerHTML = GROUPS.map((group) => {
      const links = group.items
        .map((item) => {
          const document = DOCUMENT_BY_ID.get(item.id);
          return `<a href="#${document.id}" data-document-id="${document.id}">
            <span>${String(document.index).padStart(2, "0")}</span>
            <div><strong>${escapeHtml(document.label)}</strong><small>${escapeHtml(document.description)}</small></div>
          </a>`;
        })
        .join("");
      return `<section class="docs-chapter-group"><span>${escapeHtml(group.label)}</span>${links}</section>`;
    }).join("");
  };

  const parseRoute = () => {
    let route = window.location.hash.slice(1);
    try {
      route = decodeURIComponent(route);
    } catch {
      route = "start";
    }
    const [requestedId, ...sectionParts] = route.split("/");
    let documentId = LEGACY_DOCUMENT_IDS.get(requestedId) || requestedId;
    let section = sectionParts.join("/");

    if (requestedId === "voice") {
      if (section.startsWith("7-product-voice-and-tone") || section.startsWith("8-terminology")) {
        documentId = "product-voice";
        section = section.startsWith("8-terminology") ? "product-terminology" : "";
      } else if (section.startsWith("4-core-singular-voice")) {
        documentId = "brand";
        section = "core-voice";
      } else if (section.startsWith("5-core-writing-principles")) {
        documentId = "brand";
        section = "writing-behaviors";
      } else if (section.startsWith("9-claims-and-evidence") || section.startsWith("11-sources")) {
        documentId = "application";
        section = "evidence-appendix";
      } else {
        documentId = "marketing-voice";
        section = "";
      }
    } else if (LEGACY_DOCUMENT_IDS.has(requestedId)) {
      section = "";
    }

    const document = DOCUMENT_BY_ID.get(documentId) || DOCUMENT_BY_ID.get("start");
    return { document, section };
  };

  const sourceEditUrl = (path) => `${REPOSITORY_URL}/edit/main/${path}`;
  const sourceReadUrl = (path) => `${REPOSITORY_URL}/blob/main/${path}`;

  const rewriteLinks = (document) => {
    article.querySelectorAll("a[href]").forEach((link) => {
      const href = link.getAttribute("href");
      if (!href || href === "#") return;

      if (href.startsWith("#")) {
        link.href = `#${document.id}/${href.slice(1)}`;
        return;
      }

      let resolved;
      try {
        resolved = new URL(href, new URL(document.path, BASE_URL));
      } catch {
        return;
      }

      const targetDocument = DOCUMENT_BY_PATH.get(resolved.pathname);
      if (targetDocument) {
        link.href = `#${targetDocument.id}${resolved.hash ? `/${resolved.hash.slice(1)}` : ""}`;
        return;
      }

      if (resolved.origin === window.location.origin && resolved.pathname === new URL("README.md", BASE_URL).pathname) {
        link.href = "index.html";
        return;
      }

      if (resolved.origin === window.location.origin && resolved.pathname.endsWith(".md")) {
        const basePath = BASE_URL.pathname;
        const relativePath = decodeURIComponent(
          resolved.pathname.startsWith(basePath) ? resolved.pathname.slice(basePath.length) : resolved.pathname.replace(/^\/+/, ""),
        );
        link.href = `${sourceReadUrl(relativePath)}${resolved.hash}`;
        link.target = "_blank";
        link.rel = "noreferrer";
        return;
      }

      if (resolved.origin !== window.location.origin) {
        link.target = "_blank";
        link.rel = "noreferrer";
      }
    });
  };

  const renderOutline = (headings, document) => {
    if (headingObserver) headingObserver.disconnect();
    outline.innerHTML = headings.length
      ? headings
          .map(
            (heading) =>
              `<a href="#${document.id}/${heading.id}" data-outline-id="${heading.id}">${escapeHtml(heading.label)}</a>`,
          )
          .join("")
      : `<span class="docs-outline__empty">No sections</span>`;

    const headingElements = headings.map((heading) => article.querySelector(`#${CSS.escape(heading.id)}`)).filter(Boolean);
    if (!("IntersectionObserver" in window) || !headingElements.length) return;

    headingObserver = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);
        if (!visible.length) return;
        const id = visible[0].target.id;
        outline.querySelectorAll("a").forEach((link) => {
          if (link.dataset.outlineId === id) link.setAttribute("aria-current", "location");
          else link.removeAttribute("aria-current");
        });
      },
      { rootMargin: "-16% 0px -72% 0px", threshold: [0, 1] },
    );
    headingElements.forEach((heading) => headingObserver.observe(heading));
  };

  const updateNavigationState = (document) => {
    chapterNavigation.querySelectorAll("[data-document-id]").forEach((link) => {
      if (link.dataset.documentId === document.id) link.setAttribute("aria-current", "page");
      else link.removeAttribute("aria-current");
    });

    documentGroup.textContent = document.group;
    documentStep.textContent = `Chapter ${String(document.index).padStart(2, "0")}`;
    documentDescription.textContent = document.description;
    mobileCurrent.textContent = document.label;
    editSource.href = sourceEditUrl(document.path);
    errorSource.href = document.path;
    document.title = `${document.label} — Singular Brand & Voice`;

    const previous = DOCUMENTS[document.index - 1];
    const next = DOCUMENTS[document.index + 1];
    previousLink.hidden = !previous;
    nextLink.hidden = !next;
    if (previous) {
      previousLink.href = `#${previous.id}`;
      previousLink.querySelector("strong").textContent = previous.label;
    }
    if (next) {
      nextLink.href = `#${next.id}`;
      nextLink.querySelector("strong").textContent = next.label;
    }
  };

  const scrollToSection = (section, focus) => {
    const target = section
      ? article.querySelector(`#${CSS.escape(section)}`)
      : article.querySelector("h1");
    if (!target) {
      reader.scrollIntoView({ behavior: "auto", block: "start" });
      return;
    }
    target.scrollIntoView({ behavior: firstLoad ? "auto" : "smooth", block: "start" });
    if (focus) {
      if (!target.hasAttribute("tabindex")) target.setAttribute("tabindex", "-1");
      target.focus({ preventScroll: true });
    }
  };

  const loadDocument = async (document, section = "") => {
    const sequence = ++loadSequence;
    const changingDocument = activeDocument?.id !== document.id;
    const isInitialDocumentLoad = firstLoad;
    activeDocument = document;
    updateNavigationState(document);

    if (!changingDocument && article.childElementCount) {
      documentStatus.textContent = "";
      requestAnimationFrame(() => scrollToSection(section, !firstLoad));
      firstLoad = false;
      return;
    }

    reader.setAttribute("aria-busy", "true");
    loading.hidden = false;
    error.hidden = true;
    article.hidden = true;
    previousLink.parentElement.hidden = true;
    documentStatus.textContent = `Loading ${document.label}.`;

    try {
      const response = await fetch(document.path, { cache: "no-cache" });
      if (!response.ok) throw new Error(`HTTP ${response.status}`);
      const markdown = await response.text();
      if (sequence !== loadSequence) return;
      const rendered = renderMarkdown(markdown);
      article.innerHTML = rendered.html;
      rewriteLinks(document);
      renderOutline(rendered.headings, document);
      article.hidden = false;
      loading.hidden = true;
      previousLink.parentElement.hidden = false;
      reader.setAttribute("aria-busy", "false");
      documentStatus.textContent = isInitialDocumentLoad ? `${document.label} is ready.` : "";
      requestAnimationFrame(() => {
        const shouldScroll = !firstLoad || document.id !== "start" || Boolean(section);
        if (shouldScroll) scrollToSection(section, !firstLoad);
        updateReadingProgress();
        firstLoad = false;
      });
    } catch (loadError) {
      if (sequence !== loadSequence) return;
      console.error("Unable to load Brand & Voice document", loadError);
      article.innerHTML = "";
      article.hidden = true;
      loading.hidden = true;
      error.hidden = false;
      previousLink.parentElement.hidden = true;
      reader.setAttribute("aria-busy", "false");
      documentStatus.textContent = `Unable to load ${document.label}.`;
    }
  };

  const openMenu = () => {
    drawerBackgroundElements.forEach((element) => element.setAttribute("inert", ""));
    sidebar.removeAttribute("inert");
    sidebar.removeAttribute("aria-hidden");
    sidebar.classList.add("is-open");
    backdrop.classList.add("is-open");
    menuToggle.setAttribute("aria-expanded", "true");
    document.body.classList.add("has-docs-menu");
    sidebar.querySelector("[data-docs-menu-close]")?.focus();
  };

  const closeMenu = ({ restoreFocus = false } = {}) => {
    sidebar.classList.remove("is-open");
    backdrop.classList.remove("is-open");
    menuToggle.setAttribute("aria-expanded", "false");
    document.body.classList.remove("has-docs-menu");
    drawerBackgroundElements.forEach((element) => element.removeAttribute("inert"));
    if (mobileNavigationQuery.matches) {
      sidebar.setAttribute("inert", "");
      sidebar.setAttribute("aria-hidden", "true");
    } else {
      sidebar.removeAttribute("inert");
      sidebar.removeAttribute("aria-hidden");
    }
    if (restoreFocus) menuToggle.focus();
  };

  const updateReadingProgress = () => {
    if (!article || article.hidden || !article.offsetHeight) {
      readingProgress?.style.setProperty("--reading-progress", "0%");
      return;
    }
    const top = window.scrollY + article.getBoundingClientRect().top;
    const end = Math.max(top + article.offsetHeight - window.innerHeight, top + 1);
    const progress = Math.max(0, Math.min(1, (window.scrollY - top) / (end - top)));
    readingProgress?.style.setProperty("--reading-progress", `${(progress * 100).toFixed(2)}%`);
  };

  renderChapterNavigation();

  menuToggle?.addEventListener("click", () => {
    if (sidebar.classList.contains("is-open")) closeMenu({ restoreFocus: true });
    else openMenu();
  });
  document.querySelectorAll("[data-docs-menu-close]").forEach((control) =>
    control.addEventListener("click", () => closeMenu({ restoreFocus: true })),
  );
  chapterNavigation.addEventListener("click", (event) => {
    if (event.target.closest("a")) closeMenu();
  });
  document.addEventListener("keydown", (event) => {
    if (!sidebar.classList.contains("is-open")) return;

    if (event.key === "Escape") {
      closeMenu({ restoreFocus: true });
      return;
    }

    if (event.key !== "Tab") return;
    const focusableElements = [...sidebar.querySelectorAll(
      'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])',
    )].filter((element) => element.getClientRects().length > 0);
    const firstFocusable = focusableElements[0];
    const lastFocusable = focusableElements.at(-1);
    if (!firstFocusable) {
      event.preventDefault();
      return;
    }
    if (event.shiftKey && document.activeElement === firstFocusable) {
      event.preventDefault();
      lastFocusable.focus();
    } else if (!event.shiftKey && document.activeElement === lastFocusable) {
      event.preventDefault();
      firstFocusable.focus();
    }
  });
  mobileNavigationQuery.addEventListener("change", () => {
    closeMenu();
  });
  window.addEventListener("hashchange", () => {
    const route = parseRoute();
    loadDocument(route.document, route.section);
  });
  window.addEventListener("scroll", updateReadingProgress, { passive: true });
  window.addEventListener("resize", updateReadingProgress);

  const initialRoute = parseRoute();
  if (!window.location.hash) history.replaceState(null, "", "#start");
  closeMenu();
  loadDocument(initialRoute.document, initialRoute.section);
})();
