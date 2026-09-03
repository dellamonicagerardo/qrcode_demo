(function () {
  const LANG_KEY = "menu-lang";
  let lang = localStorage.getItem(LANG_KEY) || "it";
  let currentCategory = null;
  let excludedAllergens = [];
  let pendingExcludedAllergens = [];
  let searchQuery = "";
  let carouselInstance = null;
  let prefs = loadPrefs();

  const views = {
    picker: document.getElementById("view-picker"),
    lang: document.getElementById("view-lang"),
    menu: document.getElementById("view-menu"),
    category: document.getElementById("view-category"),
    search: document.getElementById("view-search")
  };

  const els = {
    siteHeader: document.querySelector(".site-header"),
    siteFooter: document.querySelector(".site-footer"),
    pickerTitle: document.getElementById("picker-title"),
    pickerError: document.getElementById("picker-error"),
    menuPickerGrid: document.getElementById("menu-picker-grid"),
    toolbar: document.getElementById("access-toolbar"),
    homeFab: document.getElementById("home-fab"),
    langTitle: document.getElementById("lang-title"),
    categoryCarousel: document.getElementById("category-carousel"),
    categoryGrid: document.getElementById("category-grid"),
    categoryTitle: document.getElementById("category-title"),
    breadcrumb: document.getElementById("breadcrumb"),
    productList: document.getElementById("product-list"),
    filterBar: document.getElementById("filter-bar"),
    allergenFilterBtn: document.getElementById("allergen-filter-btn"),
    allergenFilterLabel: document.getElementById("allergen-filter-label"),
    allergenFilterBadge: document.getElementById("allergen-filter-badge"),
    allergenFilterModal: document.getElementById("allergen-filter-modal"),
    allergenModalTitle: document.getElementById("allergen-modal-title"),
    allergenModalHint: document.getElementById("allergen-modal-hint"),
    allergenGrid: document.getElementById("allergen-grid"),
    allergenResetBtn: document.getElementById("allergen-reset-btn"),
    allergenApplyBtn: document.getElementById("allergen-apply-btn"),
    activeAllergenBar: document.getElementById("active-allergen-bar"),
    langSwitcher: document.getElementById("lang-switcher"),
    productModal: document.getElementById("product-modal"),
    legalModal: document.getElementById("legal-modal"),
    legalTitle: document.getElementById("legal-title"),
    legalBody: document.getElementById("legal-body"),
    disclaimer: document.getElementById("disclaimer"),
    termsBtn: document.getElementById("terms-btn"),
    privacyBtn: document.getElementById("privacy-btn"),
    reviewBtn: document.getElementById("review-btn"),
    searchInput: document.getElementById("search-input"),
    searchResults: document.getElementById("search-results"),
    searchTitle: document.getElementById("search-title"),
    btnTextSize: document.getElementById("btn-text-size"),
    btnTheme: document.getElementById("btn-theme"),
    btnCategoryView: document.getElementById("btn-category-view"),
    backBtn: document.getElementById("back-btn"),
    backLabel: document.getElementById("back-label")
  };

  function t(key) {
    return (I18N[lang] || I18N.it)[key];
  }

  function scrollToMainContent() {
    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        const target = els.breadcrumb && !els.breadcrumb.classList.contains("hidden")
          ? els.breadcrumb
          : document.querySelector("main");
        if (!target) return;
        const top = target.getBoundingClientRect().top + window.scrollY;
        window.scrollTo({ top: Math.max(0, top), behavior: "auto" });
      });
    });
  }

  function showView(name) {
    Object.values(views).forEach((v) => v && v.classList.remove("active"));
    if (views[name]) views[name].classList.add("active");
    const showChrome = name !== "lang" && name !== "picker" && lang;
    els.toolbar.classList.toggle("hidden", !showChrome);
    els.homeFab.classList.toggle("hidden", !showChrome);
    els.breadcrumb.classList.toggle("hidden", !showChrome);
    updateBreadcrumb(name);
    renderActiveAllergenBar(name);
    if (name === "lang") {
      window.scrollTo({ top: 0, behavior: "auto" });
    } else {
      scrollToMainContent();
    }
  }

  function updateBreadcrumb(viewName) {
    if (!els.breadcrumb) return;
    if (viewName === "menu") {
      els.breadcrumb.innerHTML = `<span>${t("menu")}</span>`;
    } else if (viewName === "category" && currentCategory) {
      els.breadcrumb.innerHTML = `
        <button type="button" class="crumb-link" data-go="menu">${t("menu")}</button>
        <span class="crumb-sep">›</span>
        <span>${currentCategory.name[lang]}</span>
      `;
      els.breadcrumb.querySelector("[data-go]")?.addEventListener("click", () => {
        currentCategory = null;
        showView("menu");
      });
    } else if (viewName === "search") {
      els.breadcrumb.innerHTML = `
        <button type="button" class="crumb-link" data-go="menu">${t("menu")}</button>
        <span class="crumb-sep">›</span>
        <span>${t("searchResults")}</span>
      `;
      els.breadcrumb.querySelector("[data-go]")?.addEventListener("click", () => {
        searchQuery = "";
        els.searchInput.value = "";
        showView("menu");
      });
    } else {
      els.breadcrumb.innerHTML = "";
    }
  }

  function applyPreferences() {
    applyPrefs(prefs);
    updatePreferenceButtons();
    if (carouselInstance) {
      carouselInstance.destroy();
      carouselInstance = null;
    }
    if (lang && views.menu.classList.contains("active")) renderCategories();
  }

  function updatePreferenceButtons() {
    if (els.btnTextSize) {
      const icon = els.btnTextSize.querySelector(".toolbar-btn-icon");
      const label = els.btnTextSize.querySelector(".toolbar-btn-label");
      if (icon) icon.innerHTML = ICON_TEXT_SIZE;
      if (label) label.textContent = t("toolbarText");
      els.btnTextSize.setAttribute("aria-label", prefs.fontSize === "large" ? t("textNormal") : t("textLarge"));
      els.btnTextSize.setAttribute("title", prefs.fontSize === "large" ? t("textNormal") : t("textLarge"));
      els.btnTextSize.setAttribute("aria-pressed", prefs.fontSize === "large");
    }
    if (els.btnTheme) {
      const icon = els.btnTheme.querySelector(".toolbar-btn-icon");
      const label = els.btnTheme.querySelector(".toolbar-btn-label");
      if (icon) icon.innerHTML = prefs.theme === "light" ? ICON_MOON : ICON_SUN;
      if (label) label.textContent = t("toolbarTheme");
      els.btnTheme.setAttribute("aria-label", prefs.theme === "light" ? t("themeDark") : t("themeLight"));
      els.btnTheme.setAttribute("title", prefs.theme === "light" ? t("themeDark") : t("themeLight"));
      els.btnTheme.setAttribute("aria-pressed", prefs.theme === "light");
    }
    if (els.btnCategoryView) {
      const icon = els.btnCategoryView.querySelector(".toolbar-btn-icon");
      const label = els.btnCategoryView.querySelector(".toolbar-btn-label");
      if (icon) icon.innerHTML = prefs.categoryView === "list" ? ICON_GALLERY : ICON_LIST;
      if (label) label.textContent = t("toolbarView");
      els.btnCategoryView.setAttribute("aria-label", prefs.categoryView === "list" ? t("viewCarousel") : t("viewList"));
      els.btnCategoryView.setAttribute("title", prefs.categoryView === "list" ? t("viewCarousel") : t("viewList"));
      els.btnCategoryView.setAttribute("aria-pressed", prefs.categoryView === "list");
    }
  }

  function setLang(newLang) {
    lang = newLang;
    localStorage.setItem(LANG_KEY, lang);
    renderLangSwitcher();
    renderAllergenFilter();
    updateTexts();
    if (currentCategory) renderCategory(currentCategory);
    else if (views.search.classList.contains("active")) renderSearchResults();
    else renderCategories();
    showView(currentCategory ? "category" : (searchQuery.trim() ? "search" : "menu"));
  }

  function renderMenuPicker() {
    document.title = t("chooseMenu");
    els.siteHeader?.classList.add("hidden");
    els.siteFooter?.classList.add("hidden");
    els.pickerTitle.textContent = t("chooseMenu");

    const invalidId = MENU_REQUESTED_ID && !ACTIVE_MENU_ID;
    if (invalidId) {
      els.pickerError.textContent = `${t("menuNotFound")}: ${MENU_REQUESTED_ID}`;
      els.pickerError.classList.remove("hidden");
    } else {
      els.pickerError.classList.add("hidden");
      els.pickerError.textContent = "";
    }

    const menus = getAvailableMenus();
    els.menuPickerGrid.innerHTML = menus.length
      ? menus.map((menu) => `
          <a class="lang-card" href="?menu=${encodeURIComponent(menu.id)}">
            <span class="lang-label">${menu.name}</span>
          </a>
        `).join("")
      : `<p class="picker-empty">${lang === "en" ? "No menus available." : "Nessun menu disponibile."}</p>`;

    showView("picker");
  }

  function updateTexts() {
    if (!lang) return;
    els.langTitle.textContent = t("chooseLang");
    els.disclaimer.textContent = t("disclaimer");
    els.termsBtn.textContent = t("terms");
    els.privacyBtn.textContent = t("privacy");
    if (els.reviewBtn) els.reviewBtn.textContent = t("review");
    const phoneBtn = document.querySelector(".phone-btn span");
    if (phoneBtn && SITE.phone) phoneBtn.textContent = `${t("callUs")} ${SITE.phone}`;
    if (els.backLabel) els.backLabel.textContent = t("back");
    if (els.searchInput) els.searchInput.placeholder = t("search");
    if (els.searchTitle) els.searchTitle.textContent = t("searchResults");
    renderAllergenFilter();
    renderActiveAllergenBar();
    document.getElementById("modal-close")?.setAttribute("aria-label", t("close"));
    document.getElementById("legal-close")?.setAttribute("aria-label", t("close"));
    document.getElementById("gallery-prev")?.setAttribute("aria-label", t("prevPhoto"));
    document.getElementById("gallery-next")?.setAttribute("aria-label", t("nextPhoto"));
    els.homeFab?.setAttribute("aria-label", t("home"));
    updatePreferenceButtons();
    document.documentElement.lang = lang;
    updateSocialLabels();
  }

  function updateSocialLabels() {
    document.querySelectorAll("[data-social]").forEach((el) => {
      const key = el.dataset.social;
      const label = el.querySelector(".social-label");
      if (label && t(key)) label.textContent = t(key);
    });
  }

  function renderLangSwitcher() {
    els.langSwitcher.innerHTML = "";
    ["it", "en"].forEach((code) => {
      const btn = document.createElement("button");
      btn.textContent = code === "it" ? "Italiano" : "English";
      btn.classList.toggle("active", lang === code);
      btn.addEventListener("click", () => setLang(code));
      els.langSwitcher.appendChild(btn);
    });
  }

  function renderAllergenFilter() {
    if (!els.allergenFilterBtn) return;
    const iconWrap = els.allergenFilterBtn.querySelector(".allergen-filter-icon");
    if (iconWrap) iconWrap.innerHTML = ICON_FILTER;
    if (els.allergenFilterLabel) els.allergenFilterLabel.textContent = t("allergens");
    els.allergenFilterBtn.classList.toggle("active", excludedAllergens.length > 0);
    if (els.allergenFilterBadge) {
      if (excludedAllergens.length) {
        els.allergenFilterBadge.textContent = String(excludedAllergens.length);
        els.allergenFilterBadge.classList.remove("hidden");
      } else {
        els.allergenFilterBadge.classList.add("hidden");
      }
    }
    if (els.allergenModalTitle) els.allergenModalTitle.textContent = t("allergens");
    if (els.allergenModalHint) els.allergenModalHint.textContent = t("filterAllergensHint");
    if (els.allergenResetBtn) els.allergenResetBtn.textContent = t("reset");
    if (els.allergenApplyBtn) els.allergenApplyBtn.textContent = t("showResults");
    document.getElementById("allergen-modal-close")?.setAttribute("aria-label", t("close"));
    renderActiveAllergenBar();
  }

  function renderActiveAllergenBar(viewName) {
    if (!els.activeAllergenBar) return;
    const currentView = viewName
      || (views.category.classList.contains("active") ? "category"
        : views.search.classList.contains("active") ? "search" : "menu");
    const showBar = excludedAllergens.length > 0 && (currentView === "category" || currentView === "search");

    if (!showBar) {
      els.activeAllergenBar.classList.add("hidden");
      els.activeAllergenBar.innerHTML = "";
      return;
    }

    const chips = excludedAllergens.map((id) => {
      const allergen = getAllergenById(id);
      if (!allergen) return "";
      const name = allergen.name[lang] || allergen.name.it;
      return `
        <button type="button" class="active-allergen-chip" data-remove-allergen="${id}" aria-label="${t("removeFilter")} ${name}">
          <span class="allergen-grid-icon-wrap">${allergenIconHtml(id)}</span>
          <span>${name}</span>
          <span class="active-allergen-remove" aria-hidden="true">×</span>
        </button>
      `;
    }).join("");

    els.activeAllergenBar.innerHTML = `
      <div class="active-allergen-bar-inner">
        <span class="active-allergen-label">${t("filterExcluded")}</span>
        <div class="active-allergen-chips">${chips}</div>
      </div>
    `;
    els.activeAllergenBar.classList.remove("hidden");

    els.activeAllergenBar.querySelectorAll("[data-remove-allergen]").forEach((btn) => {
      btn.addEventListener("click", () => {
        const id = btn.dataset.removeAllergen;
        excludedAllergens = excludedAllergens.filter((x) => x !== id);
        prefs.excludedAllergens = excludedAllergens;
        savePrefs(prefs);
        renderAllergenFilter();
        renderActiveAllergenBar(currentView);
        if (currentCategory) renderCategory(currentCategory);
        else if (searchQuery.trim()) renderSearchResults();
      });
    });
  }

  function renderAllergenGrid() {
    if (!els.allergenGrid) return;
    els.allergenGrid.innerHTML = ALLERGENS.map((allergen) => {
      const selected = pendingExcludedAllergens.includes(allergen.id);
      return `
        <button type="button" class="allergen-grid-item${selected ? " selected" : ""}" data-allergen="${allergen.id}" aria-pressed="${selected}">
          <span class="allergen-grid-icon-wrap">${allergenIconHtml(allergen.id, "lg")}</span>
          <span>${allergen.name[lang] || allergen.name.it}</span>
        </button>
      `;
    }).join("");
    els.allergenGrid.querySelectorAll("[data-allergen]").forEach((btn) => {
      btn.addEventListener("click", () => {
        const id = btn.dataset.allergen;
        const idx = pendingExcludedAllergens.indexOf(id);
        if (idx >= 0) pendingExcludedAllergens.splice(idx, 1);
        else pendingExcludedAllergens.push(id);
        renderAllergenGrid();
      });
    });
  }

  function openAllergenModal() {
    pendingExcludedAllergens = [...excludedAllergens];
    renderAllergenGrid();
    renderAllergenFilter();
    els.allergenFilterModal.classList.add("open");
    document.body.style.overflow = "hidden";
  }

  function closeAllergenModal() {
    els.allergenFilterModal.classList.remove("open");
    if (!els.productModal.classList.contains("open") && !els.legalModal.classList.contains("open")) {
      document.body.style.overflow = "";
    }
  }

  function applyAllergenFilter() {
    excludedAllergens = [...pendingExcludedAllergens];
    prefs.excludedAllergens = excludedAllergens;
    savePrefs(prefs);
    renderAllergenFilter();
    renderActiveAllergenBar();
    closeAllergenModal();
    if (currentCategory) renderCategory(currentCategory);
    else if (searchQuery.trim()) renderSearchResults();
  }

  function resetAllergenFilter() {
    pendingExcludedAllergens = [];
    renderAllergenGrid();
  }

  function matchesFilter(product) {
    if (!excludedAllergens.length) return true;
    const ids = product.allergenIds || [];
    return !excludedAllergens.some((id) => ids.includes(id));
  }

  function categoryCardHtml(cat) {
    return `
      <img src="${cat.image}" alt="${cat.name[lang]}" loading="lazy">
      <div class="card-top-badge">
        <span>${t("details")}</span>
        <svg width="11" height="11" viewBox="0 0 320 512" fill="currentColor"><path d="M285.476 272.971L91.132 467.314c-9.373 9.373-24.569 9.373-33.941 0l-22.667-22.667c-9.357-9.357-9.375-24.522-.04-33.901L188.505 256 34.484 101.255c-9.335-9.379-9.317-24.544.04-33.901l22.667-22.667c9.373-9.373 24.569-9.373 33.941 0L285.475 239.03c9.373 9.372 9.373 24.568.001 33.941z"/></svg>
      </div>
      <div class="card-bottom-label"><span>${cat.name[lang]}</span></div>
    `;
  }

  function bindCategoryCard(el, cat) {
    el.addEventListener("click", () => openCategory(cat.id));
  }

  function renderCategories() {
    const track = els.categoryCarousel.querySelector(".carousel-track");
    track.innerHTML = "";
    els.categoryGrid.innerHTML = "";

    CATEGORIES.forEach((cat) => {
      const slide = document.createElement("button");
      slide.type = "button";
      slide.className = "carousel-slide category-carousel-card";
      slide.innerHTML = categoryCardHtml(cat);
      bindCategoryCard(slide, cat);
      track.appendChild(slide);

      const listBtn = document.createElement("button");
      listBtn.type = "button";
      listBtn.className = "category-list-item";
      listBtn.innerHTML = `
        <img src="${cat.image}" alt="" loading="lazy">
        <span class="category-list-name">${cat.name[lang]}</span>
        <svg class="category-list-arrow" width="16" height="16" viewBox="0 0 320 512" fill="currentColor"><path d="M285.476 272.971L91.132 467.314c-9.373 9.373-24.569 9.373-33.941 0l-22.667-22.667c-9.357-9.357-9.375-24.522-.04-33.901L188.505 256 34.484 101.255c-9.335-9.379-9.317-24.544.04-33.901l22.667-22.667c9.373-9.373 24.569-9.373 33.941 0L285.475 239.03c9.373 9.372 9.373 24.568.001 33.941z"/></svg>
      `;
      bindCategoryCard(listBtn, cat);
      els.categoryGrid.appendChild(listBtn);
    });

    if (carouselInstance) carouselInstance.destroy();
    carouselInstance = initCarousel(els.categoryCarousel);
  }

  function openCategory(id) {
    currentCategory = CATEGORIES.find((c) => c.id === id);
    searchQuery = "";
    els.searchInput.value = "";
    renderCategory(currentCategory);
    showView("category");
  }

  function productAllergensHtml(product) {
    const ids = product.allergenIds || [];
    if (!ids.length) return "";
    return `<div class="product-allergens" aria-label="${t("allergens")}">${ids.map((id) => allergenIconHtml(id)).join("")}</div>`;
  }

  function productPregnancyHtml(product) {
    const warnings = product.pregnancyWarnings || [];
    if (!warnings.length) return "";
    return `<div class="product-pregnancy" aria-label="${t("pregnancyTitle")}">${pregnancyIconHtml(t("pregnancyTitle"))}<span class="product-pregnancy-label">${t("pregnancyTitle")}</span></div>`;
  }

  function ingredientPregnancyIcons(ingredient, warnings) {
    const matched = warnings.filter((w) => w.ingredientIt === ingredient || w.ingredientEn === ingredient);
    const ruleIds = [...new Set(matched.map((w) => w.ruleId))];
    return ruleIds.map((id) => {
      const rule = getPregnancyRuleById(id);
      return rule ? pregnancyIconHtml(rule.reason[lang]) : "";
    }).join("");
  }

  function pregnancySummaryHtml(warnings) {
    const seen = new Set();
    const items = [];
    warnings.forEach((w) => {
      const key = `${w.ruleId}:${w.ingredientIt || ""}`;
      if (seen.has(key)) return;
      seen.add(key);
      const rule = getPregnancyRuleById(w.ruleId);
      if (!rule) return;
      const ing = w.ingredientIt ? (lang === "en" ? w.ingredientEn : w.ingredientIt) : rule.label[lang];
      items.push(`<li><strong>${ing}</strong> — ${rule.reason[lang]}</li>`);
    });
    if (!items.length) return "";
    return `
      <div class="modal-section-head">${ICON_PREGNANCY}<strong>${t("pregnancyTitle")}</strong></div>
      <ul class="pregnancy-summary-list">${items.join("")}</ul>
      <p class="pregnancy-note">${t("pregnancyNote")}</p>
    `;
  }

  function productThumbHtml(product) {
    return `
      <div class="product-thumb">
        <img src="${product.image}" alt="${product.name[lang]}" loading="lazy">
        <div class="product-thumb-cta">
          <span>${t("details")}</span>
          <svg width="11" height="11" viewBox="0 0 320 512" fill="currentColor"><path d="M285.476 272.971L91.132 467.314c-9.373 9.373-24.569 9.373-33.941 0l-22.667-22.667c-9.357-9.357-9.375-24.522-.04-33.901L188.505 256 34.484 101.255c-9.335-9.379-9.317-24.544.04-33.901l22.667-22.667c9.373-9.373 24.569-9.373 33.941 0L285.475 239.03c9.373 9.372 9.373 24.568.001 33.941z"/></svg>
        </div>
      </div>
    `;
  }

  function renderProductCard(product, i, categoryName) {
    const desc = product.desc[lang];
    const item = document.createElement("article");
    item.className = "product-card" + (i % 2 === 1 ? " reverse" : "");
    item.innerHTML = `
      <div class="product-card-inner">
        ${productThumbHtml(product)}
        <div class="product-body">
          ${categoryName ? `<p class="product-category-label">${categoryName}</p>` : ""}
          <h3 class="product-name">${product.name[lang]}</h3>
          ${productPregnancyHtml(product)}
          ${productAllergensHtml(product)}
          ${desc ? `<p class="product-desc">${desc}</p>` : ""}
          <p class="product-price">€ ${product.price}</p>
        </div>
      </div>
    `;
    item.addEventListener("click", () => openProductModal(product));
    return item;
  }

  function renderCategory(cat) {
    els.categoryTitle.textContent = cat.name[lang];
    els.productList.innerHTML = "";
    const products = cat.products.filter(matchesFilter);
    if (!products.length) {
      els.productList.innerHTML = `<p class="empty-state">${t("noResults")}</p>`;
      return;
    }
    products.forEach((product, i) => {
      els.productList.appendChild(renderProductCard(product, i));
    });
  }

  function renderSearchResults() {
    const q = searchQuery.trim().toLowerCase();
    els.searchResults.innerHTML = "";
    if (!q) {
      showView("menu");
      return;
    }
    const results = getAllProducts().filter(({ product, category }) => {
      if (!matchesFilter(product)) return false;
      const hay = `${product.name.it} ${product.name.en} ${product.desc.it} ${product.desc.en} ${category.name.it} ${category.name.en}`.toLowerCase();
      return hay.includes(q);
    });
    if (!results.length) {
      els.searchResults.innerHTML = `<p class="empty-state">${t("noResults")}</p>`;
      return;
    }
    results.forEach(({ product, category }, i) => {
      els.searchResults.appendChild(renderProductCard(product, i, category.name[lang]));
    });
    showView("search");
  }

  function openProductModal(product) {
    const desc = product.desc[lang];
    const ingredients = product.ingredients?.[lang] || [];
    const allergenIds = product.allergenIds || [];
    const pregnancyWarnings = product.pregnancyWarnings || [];
    const images = product.images || [product.image];
    const gallery = document.getElementById("modal-gallery");
    const dotsWrap = document.getElementById("modal-gallery-dots");
    const ingredientsEl = document.getElementById("modal-ingredients");
    const pregnancyEl = document.getElementById("modal-pregnancy");
    const allergensEl = document.getElementById("modal-allergens");

    gallery.innerHTML = images.map((src) => `
      <div class="gallery-slide">
        <img src="${src}" alt="${product.name[lang]}" draggable="false">
      </div>
    `).join("");

    dotsWrap.innerHTML = images.length > 1
      ? images.map((_, i) => `<button type="button" class="gallery-dot${i === 0 ? " active" : ""}" aria-label="${t("photo")} ${i + 1}"></button>`).join("")
      : "";

    document.getElementById("modal-name").textContent = product.name[lang];
    document.getElementById("modal-price").textContent = `€ ${product.price}`;

    const descEl = document.getElementById("modal-desc");
    const hasIngredients = ingredients.length > 0;
    descEl.textContent = desc || "";
    descEl.style.display = desc && !hasIngredients ? "block" : "none";

    if (ingredientsEl) {
      if (hasIngredients) {
        ingredientsEl.innerHTML = `
          <div class="modal-section-head">${ICON_FILTER}<strong>${t("ingredients")}</strong></div>
          <ul>${ingredients.map((x) => {
            const icons = ingredientPregnancyIcons(x, pregnancyWarnings);
            const flagged = icons ? ` pregnancy-flagged` : "";
            return `<li class="ingredient-item${flagged}"><span>${x}</span>${icons}</li>`;
          }).join("")}</ul>
        `;
        ingredientsEl.style.display = "block";
      } else {
        ingredientsEl.style.display = "none";
      }
    }

    if (pregnancyEl) {
      const summary = pregnancySummaryHtml(pregnancyWarnings);
      if (summary) {
        pregnancyEl.innerHTML = summary;
        pregnancyEl.classList.remove("hidden");
      } else {
        pregnancyEl.innerHTML = "";
        pregnancyEl.classList.add("hidden");
      }
    }

    if (allergensEl) {
      const iconsHtml = allergenIds.length
        ? `<div class="modal-allergen-icons">${allergenIds.map((id) => {
            const a = getAllergenById(id);
            return a ? `<span class="allergen-labeled" title="${a.name[lang]}">${allergenIconHtml(id, "lg")}<span>${a.name[lang]}</span></span>` : "";
          }).join("")}</div>`
        : `<p>—</p>`;
      allergensEl.innerHTML = `<strong>${t("allergens")}</strong>${iconsHtml}<p class="allergen-note">${t("allergenNote")}</p>`;
    }

    initModalGallery(els.productModal);

    const scrollArea = els.productModal.querySelector(".modal-scroll");
    if (scrollArea) scrollArea.scrollTop = 0;

    els.productModal.classList.add("open");
    document.body.style.overflow = "hidden";
  }

  function closeProductModal() {
    destroyModalGallery(els.productModal);
    els.productModal.classList.remove("open");
    document.body.style.overflow = "";
  }

  function openLegal(type) {
    const content = {
      terms: {
        it: { title: "Termini e Condizioni", body: "Questo menu digitale è fornito a scopo informativo. I prezzi e la disponibilità dei prodotti possono variare. Per allergie o intolleranze, consultare sempre il personale di sala prima dell'ordine." },
        en: { title: "Terms and Conditions", body: "This digital menu is provided for informational purposes. Prices and product availability may vary. For allergies or intolerances, always consult staff before ordering." }
      },
      privacy: {
        it: { title: "Informativa Privacy", body: "Questo sito statico non raccoglie dati personali. Non vengono utilizzati cookie di tracciamento né strumenti di analisi." },
        en: { title: "Privacy Policy", body: "This static site does not collect personal data. No tracking cookies or analytics tools are used." }
      }
    };
    const data = content[type][lang || "it"];
    els.legalTitle.textContent = data.title;
    els.legalBody.textContent = data.body;
    els.legalModal.classList.add("open");
    document.body.style.overflow = "hidden";
  }

  function closeLegalModal() {
    els.legalModal.classList.remove("open");
    document.body.style.overflow = "";
  }

  function goHome() {
    currentCategory = null;
    searchQuery = "";
    els.searchInput.value = "";
    showView("menu");
  }

  document.querySelectorAll(".lang-card").forEach((btn) => {
    btn.addEventListener("click", () => setLang(btn.dataset.lang));
  });

  els.backBtn.addEventListener("click", () => {
    currentCategory = null;
    searchQuery = "";
    els.searchInput.value = "";
    showView("menu");
  });

  document.getElementById("modal-close").addEventListener("click", closeProductModal);
  els.productModal.addEventListener("click", (e) => {
    if (e.target === els.productModal) closeProductModal();
  });

  document.getElementById("legal-close").addEventListener("click", closeLegalModal);
  els.legalModal.addEventListener("click", (e) => {
    if (e.target === els.legalModal) closeLegalModal();
  });

  els.termsBtn.addEventListener("click", () => openLegal("terms"));
  els.privacyBtn.addEventListener("click", () => openLegal("privacy"));
  document.getElementById("logo-link").addEventListener("click", (e) => { e.preventDefault(); goHome(); });
  els.homeFab.addEventListener("click", goHome);

  els.allergenFilterBtn?.addEventListener("click", openAllergenModal);
  document.getElementById("allergen-modal-close")?.addEventListener("click", closeAllergenModal);
  els.allergenFilterModal?.addEventListener("click", (e) => {
    if (e.target === els.allergenFilterModal) closeAllergenModal();
  });
  els.allergenResetBtn?.addEventListener("click", resetAllergenFilter);
  els.allergenApplyBtn?.addEventListener("click", applyAllergenFilter);

  els.btnTextSize.addEventListener("click", () => {
    prefs.fontSize = prefs.fontSize === "large" ? "normal" : "large";
    savePrefs(prefs);
    applyPreferences();
    if (currentCategory) renderCategory(currentCategory);
  });

  els.btnTheme.addEventListener("click", () => {
    prefs.theme = prefs.theme === "light" ? "dark" : "light";
    savePrefs(prefs);
    applyPreferences();
  });

  els.btnCategoryView.addEventListener("click", () => {
    prefs.categoryView = prefs.categoryView === "list" ? "carousel" : "list";
    savePrefs(prefs);
    applyPreferences();
  });

  let searchTimeout;
  els.searchInput.addEventListener("input", () => {
    clearTimeout(searchTimeout);
    searchTimeout = setTimeout(() => {
      searchQuery = els.searchInput.value;
      if (searchQuery.trim()) {
        currentCategory = null;
        renderSearchResults();
      } else if (views.search.classList.contains("active")) {
        showView("menu");
      }
    }, 250);
  });

  applyPreferences();
  excludedAllergens = Array.isArray(prefs.excludedAllergens) ? [...prefs.excludedAllergens] : [];

  if (!localStorage.getItem(LANG_KEY)) {
    localStorage.setItem(LANG_KEY, lang);
  }

  if (ACTIVE_MENU_ID) {
    updateTexts();
    renderLangSwitcher();
    renderAllergenFilter();
    renderCategories();
    showView("menu");
  } else {
    renderMenuPicker();
  }
})();
