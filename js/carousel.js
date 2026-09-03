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

const GALLERY_ANIM_MS = 200;

function destroyModalGallery(modal) {
  if (modal?._galleryDestroy) {
    modal._galleryDestroy();
    modal._galleryDestroy = null;
  }
}

function stopGalleryAnimation(viewport) {
  if (viewport?._galleryAnimFrame) {
    cancelAnimationFrame(viewport._galleryAnimFrame);
    viewport._galleryAnimFrame = null;
  }
  viewport?.classList.remove("is-animating");
}

function animateGalleryScroll(viewport, targetLeft, duration = GALLERY_ANIM_MS) {
  stopGalleryAnimation(viewport);

  if (prefersReducedMotion()) {
    viewport.scrollLeft = targetLeft;
    return;
  }

  const startLeft = viewport.scrollLeft;
  const distance = targetLeft - startLeft;
  if (Math.abs(distance) < 2) {
    viewport.scrollLeft = targetLeft;
    return;
  }

  viewport.classList.add("is-animating");
  const startTime = performance.now();

  function step(now) {
    const t = Math.min(1, (now - startTime) / duration);
    const eased = 1 - (1 - t) ** 3;
    viewport.scrollLeft = startLeft + distance * eased;
    if (t < 1) {
      viewport._galleryAnimFrame = requestAnimationFrame(step);
    } else {
      viewport.scrollLeft = targetLeft;
      stopGalleryAnimation(viewport);
    }
  }

  viewport._galleryAnimFrame = requestAnimationFrame(step);
}

function getNearestGalleryIndex(viewport, slides) {
  const width = viewport.clientWidth || 1;
  if (width > 0 && slides.length > 1) {
    return Math.min(
      slides.length - 1,
      Math.max(0, Math.floor((viewport.scrollLeft + width * 0.25) / width))
    );
  }

  const center = viewport.scrollLeft + viewport.clientWidth / 2;
  let nearest = 0;
  let minDist = Infinity;
  slides.forEach((slide, i) => {
    const slideCenter = slide.offsetLeft + slide.offsetWidth / 2;
    const dist = Math.abs(center - slideCenter);
    if (dist < minDist) {
      minDist = dist;
      nearest = i;
    }
  });
  return nearest;
}

function bindGalleryTouch(viewport, getIndex, goTo) {
  let startX = 0;
  let startScrollLeft = 0;
  let startIndex = 0;
  let tracking = false;

  const onTouchStart = (e) => {
    if (e.touches.length !== 1) return;
    stopGalleryAnimation(viewport);
    tracking = true;
    startX = e.touches[0].clientX;
    startScrollLeft = viewport.scrollLeft;
    startIndex = getIndex();
  };

  const onTouchEnd = (e) => {
    if (!tracking) return;
    tracking = false;

    const touch = e.changedTouches[0];
    if (!touch) return;

    const dx = touch.clientX - startX;
    const scrollDelta = viewport.scrollLeft - startScrollLeft;
    const width = viewport.clientWidth;
    const threshold = Math.min(width * 0.12, 56);

    if (dx > threshold || scrollDelta < -threshold) {
      goTo(startIndex - 1, true);
    } else if (dx < -threshold || scrollDelta > threshold) {
      goTo(startIndex + 1, true);
    } else {
      goTo(startIndex, true);
    }
  };

  viewport.addEventListener("touchstart", onTouchStart, { passive: true });
  viewport.addEventListener("touchend", onTouchEnd, { passive: true });
  viewport.addEventListener("touchcancel", onTouchEnd, { passive: true });

  return () => {
    viewport.removeEventListener("touchstart", onTouchStart);
    viewport.removeEventListener("touchend", onTouchEnd);
    viewport.removeEventListener("touchcancel", onTouchEnd);
  };
}

function bindGalleryMouseDrag(viewport, slides, getIndex, goTo) {
  let startX = 0;
  let startY = 0;
  let startScrollLeft = 0;
  let startIndex = 0;
  let axisLock = null;
  let pointerId = null;
  let mouseDragging = false;

  function finishMouseGesture(endX) {
    viewport.classList.remove("is-dragging");

    if (!mouseDragging || axisLock !== "x") {
      mouseDragging = false;
      axisLock = null;
      pointerId = null;
      return;
    }

    const dx = endX - startX;
    const width = viewport.clientWidth;
    const scrollDelta = viewport.scrollLeft - startScrollLeft;
    const threshold = Math.min(width * 0.18, 72);

    if (dx < -threshold || scrollDelta > threshold) {
      goTo(startIndex + 1, true);
    } else if (dx > threshold || scrollDelta < -threshold) {
      goTo(startIndex - 1, true);
    } else {
      goTo(startIndex, true);
    }

    mouseDragging = false;
    axisLock = null;
    pointerId = null;
  }

  const onPointerDown = (e) => {
    if (e.pointerType !== "mouse" || e.button !== 0) return;
    stopGalleryAnimation(viewport);
    pointerId = e.pointerId;
    startIndex = getIndex();
    startX = e.clientX;
    startY = e.clientY;
    startScrollLeft = viewport.scrollLeft;
    axisLock = null;
    mouseDragging = false;
    viewport.setPointerCapture(e.pointerId);
  };

  const onPointerMove = (e) => {
    if (e.pointerType !== "mouse" || e.pointerId !== pointerId) return;

    const dx = e.clientX - startX;
    const dy = e.clientY - startY;

    if (!axisLock && (Math.abs(dx) > 6 || Math.abs(dy) > 6)) {
      axisLock = Math.abs(dx) >= Math.abs(dy) ? "x" : "y";
      if (axisLock === "x") {
        mouseDragging = true;
        viewport.classList.add("is-dragging");
      }
    }

    if (mouseDragging) {
      const minIdx = Math.max(startIndex - 1, 0);
      const maxIdx = Math.min(startIndex + 1, slides.length - 1);
      const minScroll = slides[minIdx].offsetLeft;
      const maxScroll = slides[maxIdx].offsetLeft;
      viewport.scrollLeft = Math.min(maxScroll, Math.max(minScroll, startScrollLeft - dx));
      e.preventDefault();
    }
  };

  const onPointerUp = (e) => {
    if (e.pointerType !== "mouse" || e.pointerId !== pointerId) return;
    finishMouseGesture(e.clientX);
    if (viewport.hasPointerCapture(e.pointerId)) {
      viewport.releasePointerCapture(e.pointerId);
    }
  };

  const onPointerCancel = (e) => {
    if (e.pointerType !== "mouse" || e.pointerId !== pointerId) return;
    finishMouseGesture(e.clientX);
  };

  viewport.addEventListener("pointerdown", onPointerDown);
  viewport.addEventListener("pointermove", onPointerMove, { passive: false });
  viewport.addEventListener("pointerup", onPointerUp);
  viewport.addEventListener("pointercancel", onPointerCancel);

  return () => {
    viewport.removeEventListener("pointerdown", onPointerDown);
    viewport.removeEventListener("pointermove", onPointerMove);
    viewport.removeEventListener("pointerup", onPointerUp);
    viewport.removeEventListener("pointercancel", onPointerCancel);
    viewport.classList.remove("is-dragging");
  };
}

function initModalGallery(modal) {
  if (!modal) return;

  destroyModalGallery(modal);

  const viewport = modal.querySelector(".gallery-viewport");
  const wrap = modal.querySelector(".gallery-wrap");
  const counterEl = modal.querySelector(".gallery-counter");
  if (!viewport) return;

  const slides = Array.from(viewport.querySelectorAll(".gallery-slide"));
  const dots = Array.from(modal.querySelectorAll(".gallery-dot"));
  const prevBtn = modal.querySelector(".gallery-prev");
  const nextBtn = modal.querySelector(".gallery-next");
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

  function updateCounter() {
    if (!counterEl) return;
    counterEl.textContent = `${index + 1} / ${slides.length}`;
    counterEl.setAttribute("aria-label", `${index + 1} / ${slides.length}`);
  }

  function syncUi() {
    dots.forEach((dot, j) => dot.classList.toggle("active", j === index));
    updateCounter();
  }

  function goTo(i, smooth = true) {
    index = (i + slides.length) % slides.length;
    const target = slides[index].offsetLeft;
    syncUi();
    if (smooth) {
      animateGalleryScroll(viewport, target);
    } else {
      stopGalleryAnimation(viewport);
      viewport.scrollLeft = target;
    }
  }

  const onPrev = () => goTo(index - 1);
  const onNext = () => goTo(index + 1);
  const dotHandlers = dots.map((_, i) => () => goTo(i));

  dotHandlers.forEach((handler, i) => dots[i]?.addEventListener("click", handler));
  prevBtn?.addEventListener("click", onPrev);
  nextBtn?.addEventListener("click", onNext);

  let scrollRaf = 0;

  const onScroll = () => {
    if (viewport.classList.contains("is-dragging") || viewport.classList.contains("is-animating")) return;
    cancelAnimationFrame(scrollRaf);
    scrollRaf = requestAnimationFrame(() => {
      index = getNearestGalleryIndex(viewport, slides);
      syncUi();
    });
  };

  viewport.addEventListener("scroll", onScroll, { passive: true });

  const unbindTouch = bindGalleryTouch(viewport, () => index, goTo);
  const unbindMouseDrag = bindGalleryMouseDrag(viewport, slides, () => index, goTo);

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

  goTo(0, false);

  modal._galleryDestroy = () => {
    cancelAnimationFrame(scrollRaf);
    stopGalleryAnimation(viewport);
    viewport.removeEventListener("scroll", onScroll);
    unbindTouch();
    unbindMouseDrag();
    dotHandlers.forEach((handler, i) => dots[i]?.removeEventListener("click", handler));
    prevBtn?.removeEventListener("click", onPrev);
    nextBtn?.removeEventListener("click", onNext);
    document.removeEventListener("keydown", onKey);
  };
}
