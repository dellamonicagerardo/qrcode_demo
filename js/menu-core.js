const DEFAULT_PIZZA_IMAGES = [
  "https://images.unsplash.com/photo-1513104890138-7c749659a591?w=500&h=889&fit=crop",
  "https://images.unsplash.com/photo-1574071318508-1cdbab80d002?w=500&h=889&fit=crop",
  "https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=500&h=889&fit=crop",
  "https://images.unsplash.com/photo-1595854341625-f33ee5427437?w=500&h=889&fit=crop",
  "https://images.unsplash.com/photo-1571997478779-2adcbbe9ab2f?w=500&h=889&fit=crop",
  "https://images.unsplash.com/photo-1604388346341-9a4d7365e9bf?w=500&h=889&fit=crop",
  "https://images.unsplash.com/photo-1628840042765-356cda07504e?w=500&h=889&fit=crop",
  "https://images.unsplash.com/photo-1511689660979-10d2b4965aa9?w=500&h=889&fit=crop"
];

let SITE = {};
let CATEGORIES = [];
let ACTIVE_MENU_ID = "";
let MENU_HAS_PHOTOS = true;
const MENU_REGISTRY = {};

function registerMenu(menu) {
  if (!menu?.id) {
    console.error("registerMenu: menu senza id", menu);
    return;
  }
  MENU_REGISTRY[menu.id] = menu;
}

function portrait(url) {
  return url.includes("?") ? url : `${url}?w=500&h=889&fit=crop`;
}

function parseIngredients(desc) {
  if (!desc) return [];
  return desc.split(/,\s*/).map((s) => s.trim()).filter(Boolean);
}

function inferPregnancyWarnings(product) {
  const ingsIt = product.ingredients?.it || parseIngredients(product.desc.it);
  const ingsEn = product.ingredients?.en || parseIngredients(product.desc.en);
  const flagged = [];

  ingsIt.forEach((ingIt, i) => {
    const ingEn = ingsEn[i] || ingIt;
    const combined = `${ingIt} ${ingEn}`;
    PREGNANCY_RULES.forEach((rule) => {
      if (rule.match.test(combined)) {
        flagged.push({
          ruleId: rule.id,
          ingredientIt: ingIt,
          ingredientEn: ingEn
        });
      }
    });
  });

  if (!flagged.length) {
    const descText = `${product.desc?.it || ""} ${product.desc?.en || ""}`;
    PREGNANCY_RULES.forEach((rule) => {
      if (rule.match.test(descText)) {
        flagged.push({ ruleId: rule.id, ingredientIt: null, ingredientEn: null });
      }
    });
  }

  return flagged;
}

function inferAllergenIds(product, catId) {
  const ids = new Set(product.allergenIds || []);
  const text = `${product.name.it} ${product.name.en} ${product.desc.it} ${product.desc.en}`.toLowerCase();

  if (/pomodoro|mozzarella|impasto|farina|pane|pizza|focaccia|prosciutto|salame|mortadella|pasta|carne|funghi|carciofi|capricciosa|calzone|ripieno|frittata/.test(text)) ids.add("glutine");
  if (/mozzarella|bufala|formagg|provola|gorgonzola|parmigiano|ricotta|latte|panna|burro|lattic/.test(text)) ids.add("latte");
  if (/uova|uovo/.test(text)) ids.add("uova");
  if (/tonno|alici|pesce|acciiug/.test(text)) ids.add("pesce");
  if (/arachidi|nocciol|pistacchio/.test(text)) ids.add("arachidi");
  if (/soia/.test(text)) ids.add("soia");
  if (/noci|mandorl|pinoli|granella/.test(text)) ids.add("frutta-guscio");
  if (/sedano|scarola/.test(text)) ids.add("sedano");
  if (/senape/.test(text)) ids.add("senape");
  if (/sesamo/.test(text)) ids.add("sesamo");
  if (/gamber|gamberetti|crostace/.test(text)) ids.add("crostacei");
  if (/vongole|cozze|mollusc/.test(text)) ids.add("molluschi");
  if (/lupin/.test(text)) ids.add("lupini");

  if (["vini-bianchi", "vini-rossi", "birre", "birre-artigianali", "fine-pasto"].includes(catId) || /vino|birra|limoncello|amaro|fernet/.test(text)) {
    ids.add("solfiti");
  }

  return Array.from(ids);
}

function slugifyId(value) {
  return String(value || "")
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 64) || "prodotto";
}

function ensureProductId(product, usedIds) {
  const base = slugifyId(product.id || product.name?.it || product.name?.en);
  let id = base;
  let n = 2;
  while (usedIds.has(id)) {
    id = `${base}-${n++}`;
  }
  usedIds.add(id);
  product.id = id;
  return id;
}

function inferSpicy(product) {
  if (typeof product.spicy === "number") return Math.max(0, Math.min(3, product.spicy));
  if (product.spicy === true) return 1;
  if (product.spicy === false) return 0;
  const text = `${product.name?.it || ""} ${product.name?.en || ""} ${product.desc?.it || ""} ${product.desc?.en || ""}`;
  if (/piccante|spicy|diavola|peperoncino|chili|jalape/i.test(text)) return 1;
  return 0;
}

function enrichProducts(menu) {
  const withPhotos = menu.config?.photos !== false;
  const pizzaIds = new Set(menu.config?.pizzaCategoryIds || ["pizze", "pizze-dautore"]);
  const pizzaImages = menu.config?.pizzaImages || DEFAULT_PIZZA_IMAGES;
  let pizzaIdx = 0;
  const usedIds = new Set();

  menu.categories.forEach((cat) => {
    const isPizza = pizzaIds.has(cat.id);
    // image: null significa "questa voce non prevede foto", diverso da image assente
    // che invece riceve un'immagine di riserva.
    const catWithoutPhoto = !withPhotos || cat.image === null;
    if (!withPhotos) cat.image = null;

    cat.products.forEach((product) => {
      ensureProductId(product, usedIds);
      product.spicy = inferSpicy(product);

      const ownImages = (Array.isArray(product.images) ? product.images : []).filter(Boolean);
      const productWithoutPhoto = product.image === null || product.images === null;

      if (!withPhotos || productWithoutPhoto || (catWithoutPhoto && !ownImages.length)) {
        product.image = null;
        product.images = [];
      } else {
        if (ownImages.length && !product.image) product.image = ownImages[0];
        if (!product.image) {
          product.image = isPizza || !cat.image
            ? pizzaImages[pizzaIdx++ % pizzaImages.length]
            : portrait(cat.image);
        }
        product.images = ownImages.length ? ownImages : [product.image];
      }
      product.ingredients = product.ingredients || {
        it: parseIngredients(product.desc.it),
        en: parseIngredients(product.desc.en)
      };
      product.allergenIds = inferAllergenIds(product, cat.id);
      product.pregnancyWarnings = inferPregnancyWarnings(product);
      product._categoryId = cat.id;
      product._categoryName = cat.name;
    });
  });
}

function getAllProducts() {
  const items = [];
  CATEGORIES.forEach((cat) => {
    cat.products.forEach((product) => {
      items.push({ product, category: cat });
    });
  });
  return items;
}

function applyOptionalImage(img, src, alt) {
  if (!img) return;
  if (src) {
    img.src = src;
    img.alt = alt || "";
    img.hidden = false;
  } else {
    img.removeAttribute("src");
    img.alt = "";
    img.hidden = true;
  }
}

// Un'immagine che non si carica non deve mai mostrare l'icona di file rotto:
// la nascondiamo e lasciamo che il contenitore mostri il proprio segnaposto.
function handleImageError(img) {
  img.hidden = true;
  img.removeAttribute("src");

  const cover = img.closest(".cover");
  if (cover) {
    cover.classList.add("hidden");
    document.documentElement.classList.add("no-cover");
    return;
  }

  const logoBox = img.closest(".logo-wrap, .footer-logo");
  if (logoBox) {
    logoBox.querySelector(".logo-text, .footer-logo-text")?.classList.remove("hidden");
    return;
  }

  img.closest("[data-img-holder]")?.classList.add("img-failed");
}

// L'evento error non fa bubbling: va intercettato in fase di capture.
document.addEventListener("error", (e) => {
  if (e.target?.tagName === "IMG") handleImageError(e.target);
}, true);

function clearMenuThemeVars() {
  const root = document.documentElement;
  [
    "--menu-accent", "--menu-accent-dark", "--menu-accent-light",
    "--menu-bg", "--menu-bg-light", "--menu-card-bg", "--menu-card-bg-light",
    "--menu-text", "--menu-text-light", "--menu-muted", "--menu-muted-light",
    "--menu-font"
  ].forEach((key) => root.style.removeProperty(key));
  document.getElementById("menu-brand-font")?.remove();
}

function applySiteTheme(site) {
  clearMenuThemeVars();
  const theme = site?.theme;
  if (!theme) return;

  const root = document.documentElement;
  const map = {
    "--menu-accent": theme.accent,
    "--menu-accent-dark": theme.accentDark || theme.accent,
    "--menu-accent-light": theme.accentLight || theme.accent,
    "--menu-bg": theme.bg,
    "--menu-bg-light": theme.bgLight,
    "--menu-card-bg": theme.cardBg,
    "--menu-card-bg-light": theme.cardBgLight,
    "--menu-text": theme.text,
    "--menu-text-light": theme.textLight,
    "--menu-muted": theme.muted,
    "--menu-muted-light": theme.mutedLight,
    "--menu-font": theme.font ? `"${theme.font}", system-ui, sans-serif` : null
  };
  Object.entries(map).forEach(([key, value]) => {
    if (value) root.style.setProperty(key, value);
  });

  if (theme.fontUrl) {
    const link = document.createElement("link");
    link.id = "menu-brand-font";
    link.rel = "stylesheet";
    link.href = theme.fontUrl;
    document.head.appendChild(link);
  }

  const meta = document.querySelector('meta[name="theme-color"]');
  if (meta) {
    const light = document.documentElement.classList.contains("theme-light");
    meta.content = light
      ? (theme.bgLight || theme.bg || meta.content)
      : (theme.bg || meta.content);
  }
}

function applySiteToPage(site) {
  if (!site) return;

  document.title = site.pageTitle || `${site.name} Menu`;
  const meta = document.querySelector('meta[name="description"]');
  if (meta) meta.content = site.metaDescription || `Menu digitale - ${site.name}`;

  applySiteTheme(site);

  applyOptionalImage(document.querySelector(".cover img"), site.cover, site.coverAlt || `Cover ${site.name}`);
  document.querySelector(".cover")?.classList.toggle("hidden", !site.cover);
  document.documentElement.classList.toggle("no-cover", !site.cover);

  applyOptionalImage(document.querySelector(".logo-wrap img"), site.logo, site.logoAlt || `Logo ${site.name}`);
  applyOptionalImage(document.querySelector(".footer-logo img"), site.logo, site.logoAlt || `Logo ${site.name}`);

  const initials = (site.name || "")
    .split(/\s+/)
    .filter(Boolean)
    .map((word) => word[0])
    .join("")
    .slice(0, 3)
    .toUpperCase();

  const logoText = document.querySelector(".logo-text");
  if (logoText) {
    logoText.textContent = initials;
    logoText.classList.toggle("hidden", Boolean(site.logo));
  }

  const footerLogoText = document.querySelector(".footer-logo-text");
  if (footerLogoText) {
    footerLogoText.textContent = initials;
    footerLogoText.classList.toggle("hidden", Boolean(site.logo));
  }

  const logoLink = document.getElementById("logo-link");
  if (logoLink) logoLink.setAttribute("aria-label", site.name);

  const phoneBtn = document.querySelector(".phone-btn");
  if (phoneBtn) {
    if (site.phone) phoneBtn.href = `tel:${site.phone.replace(/\s/g, "")}`;
    phoneBtn.classList.toggle("hidden", !site.phone);
  }

  const addressRow = document.querySelector(".footer-row");
  if (addressRow) {
    const addressText = addressRow.querySelector("span");
    if (addressText) addressText.textContent = site.address || "";
    addressRow.classList.toggle("hidden", !site.address);
  }

  const socialMap = {
    whatsapp: site.whatsapp,
    instagram: site.instagram,
    facebook: site.facebook,
    tripadvisor: site.tripadvisor
  };
  Object.entries(socialMap).forEach(([key, href]) => {
    const link = document.querySelector(`[data-social="${key}"]`);
    if (link) {
      if (href) {
        link.href = href;
        link.classList.remove("hidden");
      } else {
        link.classList.add("hidden");
      }
    }
  });

  const reviewBtn = document.getElementById("review-btn");
  if (reviewBtn) {
    if (site.review) {
      reviewBtn.href = site.review;
      reviewBtn.classList.remove("hidden");
    } else {
      reviewBtn.classList.add("hidden");
    }
  }
}

function initMenu(menu) {
  ACTIVE_MENU_ID = menu.id;
  SITE = menu.site;
  CATEGORIES = menu.categories;
  MENU_HAS_PHOTOS = menu.config?.photos !== false;
  document.documentElement.classList.toggle("no-photos", !MENU_HAS_PHOTOS);
  enrichProducts(menu);
  applySiteToPage(menu.site);
}
