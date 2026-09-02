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

function initModalGallery(modal) {
  const viewport = modal.querySelector(".gallery-viewport");
  if (!viewport) return;

  const slides = Array.from(viewport.querySelectorAll(".gallery-slide"));
  const dots = Array.from(modal.querySelectorAll(".gallery-dot"));
  const prevBtn = modal.querySelector(".gallery-prev");
  const nextBtn = modal.querySelector(".gallery-next");
  if (slides.length < 1) return;

  let index = 0;

  function goTo(i) {
    index = (i + slides.length) % slides.length;
    viewport.scrollTo({ left: slides[index].offsetLeft, behavior: prefersReducedMotion() ? "auto" : "smooth" });
    dots.forEach((dot, j) => dot.classList.toggle("active", j === index));
    if (prevBtn) prevBtn.style.visibility = slides.length > 1 ? "visible" : "hidden";
    if (nextBtn) nextBtn.style.visibility = slides.length > 1 ? "visible" : "hidden";
  }

  dots.forEach((dot, i) => dot.addEventListener("click", () => goTo(i)));
  if (prevBtn) prevBtn.addEventListener("click", () => goTo(index - 1));
  if (nextBtn) nextBtn.addEventListener("click", () => goTo(index + 1));

  let scrollTimeout;
  viewport.addEventListener("scroll", () => {
    clearTimeout(scrollTimeout);
    scrollTimeout = setTimeout(() => {
      const center = viewport.scrollLeft + viewport.clientWidth / 2;
      slides.forEach((slide, i) => {
        const slideCenter = slide.offsetLeft + slide.offsetWidth / 2;
        if (Math.abs(center - slideCenter) < slide.offsetWidth / 2) index = i;
      });
      dots.forEach((dot, j) => dot.classList.toggle("active", j === index));
    }, 80);
  }, { passive: true });

  goTo(0);
  modal._galleryGoTo = goTo;
}
