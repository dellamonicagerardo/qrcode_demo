const PREFS_KEY = "menu-prefs";

const DEFAULT_PREFS = {
  fontSize: "normal",
  theme: "dark",
  categoryView: "carousel",
  excludedAllergens: []
};

function loadPrefs() {
  try {
    return { ...DEFAULT_PREFS, ...JSON.parse(localStorage.getItem(PREFS_KEY)) };
  } catch {
    return { ...DEFAULT_PREFS };
  }
}

function savePrefs(prefs) {
  localStorage.setItem(PREFS_KEY, JSON.stringify(prefs));
}

function applyPrefs(prefs) {
  const root = document.documentElement;
  root.classList.toggle("text-large", prefs.fontSize === "large");
  root.classList.toggle("theme-light", prefs.theme === "light");
  root.classList.toggle("categories-list", prefs.categoryView === "list");
  root.dataset.theme = prefs.theme;
  const meta = document.querySelector('meta[name="theme-color"]');
  if (meta) meta.content = prefs.theme === "light" ? "#f5f0e8" : "#1a1612";
}

function prefersReducedMotion() {
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

function shouldAutoplay() {
  const prefs = loadPrefs();
  return !prefersReducedMotion() && prefs.fontSize !== "large";
}

function initCarousel(viewport) {
  if (!viewport) return null;

  const track = viewport.querySelector(".carousel-track");
  const slides = Array.from(track.querySelectorAll(".carousel-slide"));
  if (slides.length < 2) return null;

  let index = 0;
  let autoplayTimer = null;
  const autoplay = shouldAutoplay();

  function scrollToIndex(i, smooth) {
    index = (i + slides.length) % slides.length;
    const slide = slides[index];
    const offset = slide.offsetLeft - (viewport.clientWidth - slide.offsetWidth) / 2;
    viewport.scrollTo({ left: offset, behavior: smooth === false ? "auto" : "smooth" });
    updateDots();
  }

  function updateDots() {
    viewport.parentElement.querySelectorAll(".carousel-dot").forEach((dot, i) => {
      dot.classList.toggle("active", i === index);
    });
  }

  const dotsWrap = viewport.parentElement.querySelector(".carousel-dots");
  if (dotsWrap) {
    dotsWrap.innerHTML = "";
    slides.forEach((_, i) => {
      const dot = document.createElement("button");
      dot.type = "button";
      dot.className = "carousel-dot" + (i === 0 ? " active" : "");
      dot.setAttribute("aria-label", `Slide ${i + 1}`);
      dot.addEventListener("click", () => scrollToIndex(i));
      dotsWrap.appendChild(dot);
    });
  }

  let scrollTimeout;
  const onScroll = () => {
    clearTimeout(scrollTimeout);
    scrollTimeout = setTimeout(() => {
      const center = viewport.scrollLeft + viewport.clientWidth / 2;
      let closest = 0;
      let minDist = Infinity;
      slides.forEach((slide, i) => {
        const slideCenter = slide.offsetLeft + slide.offsetWidth / 2;
        const dist = Math.abs(center - slideCenter);
        if (dist < minDist) {
          minDist = dist;
          closest = i;
        }
      });
      index = closest;
      updateDots();
    }, 80);
  };

  viewport.addEventListener("scroll", onScroll, { passive: true });

  function startAutoplay() {
    if (!autoplay) return;
    stopAutoplay();
    autoplayTimer = setInterval(() => scrollToIndex(index + 1), 4500);
  }

  function stopAutoplay() {
    if (autoplayTimer) clearInterval(autoplayTimer);
  }

  if (autoplay) {
    viewport.addEventListener("pointerenter", stopAutoplay);
    viewport.addEventListener("pointerleave", startAutoplay);
    viewport.addEventListener("touchstart", stopAutoplay, { passive: true });
  }

  scrollToIndex(0, false);
  startAutoplay();

  return { stopAutoplay, destroy: () => {
    stopAutoplay();
    viewport.removeEventListener("scroll", onScroll);
  }};
}

function destroyModalGallery(modal) {
  if (modal?._galleryDestroy) {
    modal._galleryDestroy();
    modal._galleryDestroy = null;
  }
}

function initModalGallery(modal) {
  if (!modal) return;

  destroyModalGallery(modal);

  const viewport = modal.querySelector(".gallery-viewport");
  const track = viewport?.querySelector(".gallery-track");
  const wrap = modal.querySelector(".gallery-wrap");
  const counterEl = modal.querySelector(".gallery-counter");
  if (!viewport || !track) return;

  const slides = Array.from(track.querySelectorAll(".gallery-slide"));
  const dots = Array.from(modal.querySelectorAll(".gallery-dot"));
  const prevBtn = modal.querySelector(".gallery-prev");
  const nextBtn = modal.querySelector(".gallery-next");
  const last = slides.length - 1;
  const multi = slides.length > 1;

  wrap?.classList.toggle("gallery-multi", multi);

  if (!multi) {
    if (prevBtn) prevBtn.hidden = true;
    if (nextBtn) nextBtn.hidden = true;
    if (counterEl) counterEl.classList.add("hidden");
    return;
  }

  if (prevBtn) prevBtn.hidden = false;
  if (nextBtn) nextBtn.hidden = false;
  if (counterEl) counterEl.classList.remove("hidden");

  let index = 0;
  let width = viewport.clientWidth;

  function setOffset(px, animate) {
    track.classList.toggle("is-animating", animate && !prefersReducedMotion());
    track.style.transform = `translate3d(${px}px, 0, 0)`;
  }

  function syncUi() {
    dots.forEach((dot, i) => dot.classList.toggle("active", i === index));
    if (prevBtn) prevBtn.disabled = index === 0;
    if (nextBtn) nextBtn.disabled = index === last;
    if (counterEl) {
      counterEl.textContent = `${index + 1} / ${slides.length}`;
      counterEl.setAttribute("aria-label", `${index + 1} / ${slides.length}`);
    }
  }

  function goTo(i, animate = true) {
    index = Math.min(last, Math.max(0, i));
    width = viewport.clientWidth;
    setOffset(-index * width, animate);
    syncUi();
  }

  const onPrev = () => goTo(index - 1);
  const onNext = () => goTo(index + 1);
  const dotHandlers = dots.map((_, i) => () => goTo(i));

  dotHandlers.forEach((handler, i) => dots[i]?.addEventListener("click", handler));
  prevBtn?.addEventListener("click", onPrev);
  nextBtn?.addEventListener("click", onNext);

  let pointerId = null;
  let startX = 0;
  let startY = 0;
  let startIndex = 0;
  let delta = 0;
  let axis = null;

  function releasePointer() {
    if (pointerId !== null && viewport.hasPointerCapture(pointerId)) {
      viewport.releasePointerCapture(pointerId);
    }
    pointerId = null;
    axis = null;
    delta = 0;
    viewport.classList.remove("is-grabbing");
  }

  const onPointerDown = (e) => {
    if (pointerId !== null) return;
    if (e.pointerType === "mouse" && e.button !== 0) return;
    pointerId = e.pointerId;
    startIndex = index;
    startX = e.clientX;
    startY = e.clientY;
    delta = 0;
    axis = null;
    width = viewport.clientWidth;
    track.classList.remove("is-animating");
  };

  const onPointerMove = (e) => {
    if (e.pointerId !== pointerId) return;

    const dx = e.clientX - startX;
    const dy = e.clientY - startY;

    if (!axis) {
      if (Math.abs(dx) < 8 && Math.abs(dy) < 8) return;
      if (Math.abs(dy) > Math.abs(dx)) {
        pointerId = null;
        return;
      }
      axis = "x";
      viewport.classList.add("is-grabbing");
      viewport.setPointerCapture(pointerId);
    }

    delta = Math.max(-width, Math.min(width, dx));
    const atEdge = (startIndex === 0 && delta > 0) || (startIndex === last && delta < 0);
    setOffset(-startIndex * width + (atEdge ? delta * 0.25 : delta), false);
    e.preventDefault();
  };

  const onPointerUp = (e) => {
    if (e.pointerId !== pointerId) return;

    if (axis !== "x") {
      releasePointer();
      return;
    }

    const threshold = Math.min(width * 0.15, 60);
    let target = startIndex;
    if (delta <= -threshold) target = startIndex + 1;
    else if (delta >= threshold) target = startIndex - 1;

    releasePointer();
    goTo(target, true);
  };

  const onPointerCancel = (e) => {
    if (e.pointerId !== pointerId) return;
    const from = startIndex;
    releasePointer();
    goTo(from, true);
  };

  viewport.addEventListener("pointerdown", onPointerDown);
  viewport.addEventListener("pointermove", onPointerMove, { passive: false });
  viewport.addEventListener("pointerup", onPointerUp);
  viewport.addEventListener("pointercancel", onPointerCancel);

  const onKey = (e) => {
    if (!modal.classList.contains("open")) return;
    if (e.key === "ArrowLeft") {
      e.preventDefault();
      goTo(index - 1);
    }
    if (e.key === "ArrowRight") {
      e.preventDefault();
      goTo(index + 1);
    }
  };

  document.addEventListener("keydown", onKey);

  const onResize = () => goTo(index, false);
  window.addEventListener("resize", onResize);

  goTo(0, false);

  modal._galleryDestroy = () => {
    releasePointer();
    viewport.removeEventListener("pointerdown", onPointerDown);
    viewport.removeEventListener("pointermove", onPointerMove);
    viewport.removeEventListener("pointerup", onPointerUp);
    viewport.removeEventListener("pointercancel", onPointerCancel);
    dotHandlers.forEach((handler, i) => dots[i]?.removeEventListener("click", handler));
    prevBtn?.removeEventListener("click", onPrev);
    nextBtn?.removeEventListener("click", onNext);
    document.removeEventListener("keydown", onKey);
    window.removeEventListener("resize", onResize);
    track.classList.remove("is-animating");
  };
}
