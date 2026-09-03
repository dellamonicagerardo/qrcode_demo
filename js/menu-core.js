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

function enrichProducts(menu) {
  const pizzaIds = new Set(menu.config?.pizzaCategoryIds || ["pizze", "pizze-dautore"]);
  const pizzaImages = menu.config?.pizzaImages || DEFAULT_PIZZA_IMAGES;
  let pizzaIdx = 0;

  menu.categories.forEach((cat) => {
    const isPizza = pizzaIds.has(cat.id);
    cat.products.forEach((product) => {
      if (Array.isArray(product.images) && product.images.length) {
        if (!product.image) product.image = product.images[0];
      }
      if (!product.image) {
        product.image = isPizza
          ? pizzaImages[pizzaIdx++ % pizzaImages.length]
          : portrait(cat.image);
      }
      product.images = Array.isArray(product.images) && product.images.length
        ? product.images
        : [product.image];
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

function applySiteToPage(site) {
  if (!site) return;

  document.title = site.pageTitle || `${site.name} Menu`;
  const meta = document.querySelector('meta[name="description"]');
  if (meta) meta.content = site.metaDescription || `Menu digitale - ${site.name}`;

  const coverImg = document.querySelector(".cover img");
  if (coverImg && site.cover) {
    coverImg.src = site.cover;
    coverImg.alt = site.coverAlt || `Cover ${site.name}`;
  }

  const logoImg = document.querySelector(".logo-wrap img");
  if (logoImg && site.logo) {
    logoImg.src = site.logo;
    logoImg.alt = site.logoAlt || `Logo ${site.name}`;
  }

  const logoLink = document.getElementById("logo-link");
  if (logoLink) logoLink.setAttribute("aria-label", site.name);

  const footerLogo = document.querySelector(".footer-logo img");
  if (footerLogo && site.logo) {
    footerLogo.src = site.logo;
    footerLogo.alt = site.logoAlt || `Logo ${site.name}`;
  }

  const phoneBtn = document.querySelector(".phone-btn");
  if (phoneBtn && site.phone) {
    phoneBtn.href = `tel:${site.phone.replace(/\s/g, "")}`;
  }

  const addressRow = document.querySelector(".footer-row span");
  if (addressRow && site.address) addressRow.textContent = site.address;

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
  enrichProducts(menu);
  applySiteToPage(menu.site);
}
