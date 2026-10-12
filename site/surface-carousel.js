(() => {
  const carousel = document.querySelector("[data-surface-carousel]");
  if (!carousel) return;
  const track = carousel.querySelector("[data-surface-track]");
  const originals = [...track.children];
  const motion = matchMedia("(prefers-reduced-motion: reduce)");
  const pause = carousel.querySelector("[data-carousel-pause]");
  let paused = motion.matches, hovered = false, focused = false, visible = false;
  let span = 0, previousTime = 0;

  // Only the real six links participate in AT/keyboard navigation. Visual
  // copies preserve pointer links, without duplicate announcements or IDs.
  const copies = () => originals.map(card => {
    const copy = card.cloneNode(true);
    copy.dataset.carouselClone = "true";
    copy.setAttribute("aria-hidden", "true");
    copy.setAttribute("tabindex", "-1");
    return copy;
  });
  track.prepend(...copies());
  track.append(...copies());
  const measure = () => {
    const firstCopy = track.firstElementChild;
    span = originals[0].offsetLeft - firstCopy.offsetLeft;
    track.scrollLeft = span;
  };
  new ResizeObserver(measure).observe(track);
  const sync = () => {
    pause.textContent = paused ? "Play motion" : "Pause motion";
    pause.setAttribute("aria-pressed", String(paused));
  };
  pause.addEventListener("click", () => { paused = !paused; sync(); });
  motion.addEventListener("change", () => { paused = motion.matches; sync(); });
  track.addEventListener("pointerenter", () => { hovered = true; });
  track.addEventListener("pointerleave", () => { hovered = false; });
  track.addEventListener("pointerdown", () => { paused = true; sync(); });
  track.addEventListener("wheel", () => { paused = true; sync(); }, { passive: true });
  track.addEventListener("focusin", () => { focused = true; });
  track.addEventListener("focusout", event => { focused = track.contains(event.relatedTarget); });
  // Seamless wrap preserves the relative position within one repeated set.
  const wrap = () => {
    if (!span || focused) return;
    if (track.scrollLeft < span * .5) track.scrollLeft += span;
    else if (track.scrollLeft >= span * 1.5) track.scrollLeft -= span;
  };
  track.addEventListener("scroll", wrap, { passive: true });
  for (const [selector, direction] of [["[data-carousel-prev]", -1], ["[data-carousel-next]", 1]]) {
    carousel.querySelector(selector).addEventListener("click", () => {
      paused = true; sync();
      track.scrollLeft += direction * (originals[0].getBoundingClientRect().width + 16);
      wrap();
    });
  }
  new IntersectionObserver(entries => { visible = entries[0].isIntersecting; }).observe(carousel);
  const animate = time => {
    if (previousTime && visible && !paused && !hovered && !focused && !document.hidden) {
      track.scrollLeft += Math.min(time - previousTime, 50) * .025;
      wrap();
    }
    previousTime = time;
    requestAnimationFrame(animate);
  };
  sync(); measure(); requestAnimationFrame(animate);
})();
