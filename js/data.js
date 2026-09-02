const SITE = {
  name: "White Gold",
  cover: "https://d35vozid5pezr8.cloudfront.net/whitegold.tidelizio.menu/AN9cLc-2da93a56-25a6-4e9e-bbba-a92afc3c7388.webp",
  logo: "https://d35vozid5pezr8.cloudfront.net/whitegold.tidelizio.menu/Uk7g6l-22ce3145-4a2c-4bd1-8651-e61e92025caa.webp",
  address: "Via dei Due Principati 40h/ 40i - 84081 - Baronissi (SA)",
  phone: "0899762636",
  whatsapp: "https://wa.me/+390899762636",
  instagram: "https://www.instagram.com/pizzeria_whitegold/",
  facebook: "https://www.facebook.com/pizzeriawhitegold",
  tripadvisor: "https://www.tripadvisor.it/Restaurant_Review-g187781-d23543706-Reviews-Pizzeria_White_Gold-Salerno_Amalfi_Coast_Province_of_Salerno_Campania.html",
  review: "https://search.google.com/local/writereview?placeid=ChIJUQbGHEjDOxMR1bpaKkFPeDU"
};

const I18N = {
  it: {
    chooseLang: "Scegli la tua lingua",
    disclaimer: "Le foto sono indicative e potrebbero non rispecchiare appieno le caratteristiche dei prodotti",
    terms: "Termini e Condizioni",
    privacy: "Informativa Privacy",
    allergens: "Allergeni",
    ingredients: "Ingredienti",
    back: "Indietro al menu",
    review: "Lascia una recensione",
    details: "Dettagli",
    home: "Menu principale",
    search: "Cerca piatto o bevanda…",
    searchResults: "Risultati ricerca",
    noResults: "Nessun risultato trovato",
    textLarge: "Testo grande",
    textNormal: "Testo normale",
    themeLight: "Tema chiaro",
    themeDark: "Tema scuro",
    viewCarousel: "Vista foto",
    viewList: "Vista elenco",
    menu: "Menu",
    filterAllergensHint: "Seleziona gli allergeni da escludere",
    filterExcluded: "Allergeni esclusi",
    removeFilter: "Rimuovi",
    showResults: "Mostra risultati",
    reset: "Resetta",
    save: "Salva",
    toolbarText: "Testo",
    toolbarTheme: "Tema",
    toolbarView: "Vista",
    callUs: "Chiama",
    whatsapp: "WhatsApp",
    instagram: "Instagram",
    facebook: "Facebook",
    tripadvisor: "TripAdvisor",
    allergenNote: "Per allergie e intolleranze, chiedere sempre al personale di sala.",
    pregnancyTitle: "Da valutare in gravidanza",
    pregnancyNote: "Indicazioni indicative: in gravidanza alcuni alimenti vanno limitati o evitati. Chiedi sempre al personale prima di ordinare.",
    prevPhoto: "Foto precedente",
    nextPhoto: "Foto successiva",
    close: "Chiudi"
  },
  en: {
    chooseLang: "Choose your language",
    disclaimer: "Photos are for illustration only and may not fully reflect product characteristics",
    terms: "Terms and Conditions",
    privacy: "Privacy Policy",
    allergens: "Allergens",
    ingredients: "Ingredients",
    back: "Back to menu",
    review: "Leave a review",
    details: "Details",
    home: "Main menu",
    search: "Search dish or drink…",
    searchResults: "Search results",
    noResults: "No results found",
    textLarge: "Large text",
    textNormal: "Normal text",
    themeLight: "Light theme",
    themeDark: "Dark theme",
    viewCarousel: "Photo view",
    viewList: "List view",
    menu: "Menu",
    filterAllergensHint: "Select allergens to exclude",
    filterExcluded: "Excluded allergens",
    removeFilter: "Remove",
    showResults: "Show results",
    reset: "Reset",
    save: "Save",
    toolbarText: "Text",
    toolbarTheme: "Theme",
    toolbarView: "View",
    callUs: "Call",
    whatsapp: "WhatsApp",
    instagram: "Instagram",
    facebook: "Facebook",
    tripadvisor: "TripAdvisor",
    allergenNote: "For allergies and intolerances, always ask the staff.",
    pregnancyTitle: "Consider during pregnancy",
    pregnancyNote: "These are general guidelines: some foods should be limited or avoided during pregnancy. Always ask staff before ordering.",
    prevPhoto: "Previous photo",
    nextPhoto: "Next photo",
    close: "Close"
  }
};

const PIZZA_IMAGES = [
  "https://images.unsplash.com/photo-1513104890138-7c749659a591?w=500&h=889&fit=crop",
  "https://images.unsplash.com/photo-1574071318508-1cdbab80d002?w=500&h=889&fit=crop",
  "https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=500&h=889&fit=crop",
  "https://images.unsplash.com/photo-1595854341625-f33ee5427437?w=500&h=889&fit=crop",
  "https://images.unsplash.com/photo-1571997478779-2adcbbe9ab2f?w=500&h=889&fit=crop",
  "https://images.unsplash.com/photo-1604388346341-9a4d7365e9bf?w=500&h=889&fit=crop",
  "https://images.unsplash.com/photo-1628840042765-356cda07504e?w=500&h=889&fit=crop",
  "https://images.unsplash.com/photo-1511689660979-10d2b4965aa9?w=500&h=889&fit=crop"
];

function portrait(url) {
  return url.includes("?") ? url : `${url}?w=500&h=889&fit=crop`;
}

function parseIngredients(desc) {
  if (!desc) return [];
  return desc.split(/,\s*/).map((s) => s.trim()).filter(Boolean);
}

const PREGNANCY_RULES = [
  {
    id: "basil",
    match: /basilico|\bbasil\b/i,
    label: { it: "Basilico", en: "Basil" },
    reason: {
      it: "Verdura cruda: in gravidanza è consigliato preferirla cotta",
      en: "Raw herb: cooked vegetables are recommended during pregnancy"
    }
  },
  {
    id: "raw-produce",
    match: /rucola|pomodorini|scarola|fior di zucca|\binsalata\b|lattuga/i,
    label: { it: "Frutta/verdura cruda", en: "Raw fruit/vegetables" },
    reason: {
      it: "In gravidanza è consigliato preferire frutta e verdura cotta",
      en: "Cooked fruit and vegetables are recommended during pregnancy"
    }
  },
  {
    id: "raw-food",
    match: /alici|acciughe|tonno crudo|salmone crudo|carpaccio|tartare|carne cruda|uov[oa] crud|uov[oa] all'albume/i,
    label: { it: "Alimento crudo", en: "Raw food" },
    reason: {
      it: "I cibi crudi vanno evitati in gravidanza",
      en: "Raw foods should be avoided during pregnancy"
    }
  },
  {
    id: "unpasteurized-dairy",
    match: /mascarpone|gorgonzola|mozzarella di bufala|buffalo mozzarella|\bbufala\b|ricotta fresca|formaggio fresco/i,
    label: { it: "Latticino a rischio", en: "At-risk dairy" },
    reason: {
      it: "Formaggi freschi e a pasta molle: verificare che siano pastorizzati",
      en: "Fresh and soft cheeses: check they are pasteurized"
    }
  }
];

function getPregnancyRuleById(id) {
  return PREGNANCY_RULES.find((r) => r.id === id);
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

function enrichProducts() {
  let pizzaIdx = 0;
  CATEGORIES.forEach((cat) => {
    const isPizza = cat.id === "pizze" || cat.id === "pizze-dautore";
    cat.products.forEach((product) => {
      if (!product.image) {
        product.image = isPizza
          ? PIZZA_IMAGES[pizzaIdx++ % PIZZA_IMAGES.length]
          : portrait(cat.image);
      }
      product.images = product.images || [product.image];
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

const CATEGORIES = [
  {
    id: "pizze",
    image: "https://images.unsplash.com/photo-1513104890138-7c749659a591?w=500&h=889&fit=crop",
    name: { it: "Pizze", en: "Pizzas" },
    products: [
      { name: { it: "Margherita", en: "Margherita" }, price: "5,00", desc: { it: "Pomodoro, mozzarella, basilico", en: "Tomato, mozzarella, basil" } },
      { name: { it: "Capricciosa", en: "Capricciosa" }, price: "9,00", desc: { it: "Pomodoro, mozzarella, prosciutto cotto, funghi, carciofi, olive", en: "Tomato, mozzarella, ham, mushrooms, artichokes, olives" } },
      { name: { it: "Decisa", en: "Decisa" }, price: "12,00", desc: { it: "Pomodoro, mozzarella, salame piccante, olive", en: "Tomato, mozzarella, spicy salami, olives" } },
      { name: { it: "Bufalina", en: "Bufalina" }, price: "7,00", desc: { it: "Pomodoro, mozzarella di bufala, basilico", en: "Tomato, buffalo mozzarella, basil" } },
      { name: { it: "4 Formaggi", en: "4 Cheeses" }, price: "10,00", desc: { it: "Mozzarella, gorgonzola, parmigiano, provola", en: "Mozzarella, gorgonzola, parmesan, provola" } },
      { name: { it: "Nerano", en: "Nerano" }, price: "10,00", desc: { it: "Zucchine, provola, basilico", en: "Zucchini, provola cheese, basil" } },
      { name: { it: "Mortacchio", en: "Mortacchio" }, price: "10,00", desc: { it: "Mozzarella, mortadella, pistacchio", en: "Mozzarella, mortadella, pistachio" } },
      { name: { it: "Sapore d'Estate", en: "Taste of Summer" }, price: "11,00", desc: { it: "Pomodorini, bufala, rucola", en: "Cherry tomatoes, buffalo mozzarella, arugula" } }
    ]
  },
  {
    id: "pizze-dautore",
    image: "https://images.unsplash.com/photo-1574071318508-1cdbab80d002?w=500&h=889&fit=crop",
    name: { it: "Pizze d'Autore", en: "Signature Pizzas" },
    products: [
      { name: { it: "La Mia Parmigiana", en: "My Parmigiana" }, price: "14,00", desc: { it: "Melanzane, parmigiano, pomodoro", en: "Eggplant, parmesan, tomato" }, images: [
        "https://images.unsplash.com/photo-1574071318508-1cdbab80d002?w=500&h=889&fit=crop",
        "https://images.unsplash.com/photo-1595854341625-f33ee5427437?w=500&h=889&fit=crop"
      ]},
      { name: { it: "Impeccabile", en: "Impeccable" }, price: "11,00", desc: { it: "Creazione dello chef", en: "Chef's creation" } },
      { name: { it: "Melanzanella", en: "Melanzanella" }, price: "12,00", desc: { it: "Melanzane grigliate, mozzarella", en: "Grilled eggplant, mozzarella" } },
      { name: { it: "Glicine", en: "Glicine" }, price: "13,00", desc: { it: "Creazione speciale", en: "Special creation" } },
      { name: { it: "Marinara secondo Valerio", en: "Valerio's Marinara" }, price: "10,00", desc: { it: "Pomodoro, aglio, origano, olio EVO", en: "Tomato, garlic, oregano, extra virgin olive oil" } },
      { name: { it: "Alicella", en: "Alicella" }, price: "14,00", desc: { it: "Alici, capperi, olive", en: "Anchovies, capers, olives" } }
    ]
  },
  {
    id: "antipasti",
    image: "https://images.unsplash.com/photo-1604908176997-125f25cc6f3d?w=500&h=889&fit=crop",
    name: { it: "Antipasti", en: "Starters" },
    products: [
      { name: { it: "Scugnizzi", en: "Scugnizzi" }, price: "6,00", desc: { it: "Crocchette di patate", en: "Potato croquettes" } },
      { name: { it: "Croquettes", en: "Croquettes" }, price: "2,00", desc: { it: "Crocchette assortite", en: "Assorted croquettes" } },
      { name: { it: "Focaccia", en: "Focaccia" }, price: "2,00", desc: { it: "Focaccia al forno", en: "Oven-baked focaccia" } },
      { name: { it: "Poker di Montanare", en: "Montanare Poker" }, price: "10,00", desc: { it: "5 montanare assortite", en: "5 assorted montanare" } },
      { name: { it: "Calzone classico al forno", en: "Classic baked calzone" }, price: "6,00", desc: { it: "Ripieno tradizionale", en: "Traditional filling" } }
    ]
  },
  {
    id: "fritti",
    image: "https://images.unsplash.com/photo-1630384060421-cb20d67e9c48?w=500&h=889&fit=crop",
    name: { it: "Fritti", en: "Fried" },
    products: [
      { name: { it: "Frittata classica", en: "Classic frittata" }, price: "3,00", desc: { it: "Pasta, piselli, prosciutto", en: "Pasta, peas, ham" } },
      { name: { it: "Frittata di stagione", en: "Seasonal frittata" }, price: "4,00", desc: { it: "Ingredienti di stagione", en: "Seasonal ingredients" } },
      { name: { it: "Fiore di zucca", en: "Zucchini flower" }, price: "2,00", desc: { it: "Fritto in pastella", en: "Fried in batter" } },
      { name: { it: "Patatine fritte", en: "French fries" }, price: "3,00", desc: { it: "Patatine croccanti", en: "Crispy fries" } }
    ]
  },
  {
    id: "ripieni",
    image: "https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=500&h=889&fit=crop",
    name: { it: "Ripieni", en: "Stuffed" },
    products: [
      { name: { it: "Calzone scarola", en: "Escarole calzone" }, price: "7,00", desc: { it: "Scarola, olive, uvetta, pinoli", en: "Escarole, olives, raisins, pine nuts" } },
      { name: { it: "Calzone napoletano al forno", en: "Neapolitan baked calzone" }, price: "8,00", desc: { it: "Ricotta, salame, provola", en: "Ricotta, salami, provola" } },
      { name: { it: "Curiosella", en: "Curiosella" }, price: "8,00", desc: { it: "Ripieno speciale", en: "Special filling" } },
      { name: { it: "Fried calzone", en: "Fried calzone" }, price: "9,00", desc: { it: "Calzone fritto", en: "Fried calzone" } }
    ]
  },
  {
    id: "birre",
    image: "https://images.unsplash.com/photo-1608270586620-248524c67de9?w=500&h=889&fit=crop",
    name: { it: "Birre", en: "Beers" },
    products: [
      { name: { it: "Heineken cl. 33", en: "Heineken 33cl" }, price: "3,00", desc: { it: "", en: "" } },
      { name: { it: "Heineken cl. 66", en: "Heineken 66cl" }, price: "4,00", desc: { it: "", en: "" } },
      { name: { it: "Nastro Azzurro cl. 66", en: "Nastro Azzurro 66cl" }, price: "4,00", desc: { it: "", en: "" } },
      { name: { it: "Ichnusa non filtrata cl. 33", en: "Ichnusa unfiltered 33cl" }, price: "3,00", desc: { it: "", en: "" } },
      { name: { it: "Tennent's Super cl. 33", en: "Tennent's Super 33cl" }, price: "4,00", desc: { it: "", en: "" } }
    ]
  },
  {
    id: "birre-artigianali",
    image: "https://images.unsplash.com/photo-1535958636474-b021ee887b13?w=500&h=889&fit=crop",
    name: { it: "Birre Artigianali", en: "Craft Beers" },
    products: [
      { name: { it: "Fravort Fresh Beer cl. 33 (4,9%)", en: "Fravort Fresh Beer 33cl (4.9%)" }, price: "5,00", desc: { it: "", en: "" } },
      { name: { it: "Fravort Bionda del Brenta cl. 33 (8,2%)", en: "Fravort Blonde 33cl (8.2%)" }, price: "6,00", desc: { it: "", en: "" } },
      { name: { it: "Fravort Rossa del Brenta cl. 33 (8,1%)", en: "Fravort Red 33cl (8.1%)" }, price: "6,00", desc: { it: "", en: "" } }
    ]
  },
  {
    id: "bibite",
    image: "https://images.unsplash.com/photo-1622483767728-3a66e9bfc0db?w=500&h=889&fit=crop",
    name: { it: "Bibite", en: "Soft Drinks" },
    products: [
      { name: { it: "Coca Cola cl. 33", en: "Coca Cola 33cl" }, price: "2,50", desc: { it: "", en: "" } },
      { name: { it: "Coca Cola Zero cl. 33", en: "Coca Cola Zero 33cl" }, price: "2,50", desc: { it: "", en: "" } },
      { name: { it: "Fanta cl. 33", en: "Fanta 33cl" }, price: "2,50", desc: { it: "", en: "" } },
      { name: { it: "Acqua naturale San Benedetto cl. 75", en: "San Benedetto still water 75cl" }, price: "2,00", desc: { it: "", en: "" } },
      { name: { it: "Acqua frizzante Cutolo Rionero cl. 75", en: "Cutolo Rionero sparkling water 75cl" }, price: "2,00", desc: { it: "", en: "" } }
    ]
  },
  {
    id: "vini-bianchi",
    image: "https://images.unsplash.com/photo-1510812431401-41d2bd2722f3?w=500&h=889&fit=crop",
    name: { it: "Vini Bianchi", en: "White Wines" },
    products: [
      { name: { it: "Falanghina I.G.P. cl. 75", en: "Falanghina I.G.P. 75cl" }, price: "14,00", desc: { it: "", en: "" } },
      { name: { it: "Greco di Tufo DOCG cl. 75", en: "Greco di Tufo DOCG 75cl" }, price: "18,00", desc: { it: "", en: "" } },
      { name: { it: "Fiano di Avellino DOCG cl. 75", en: "Fiano di Avellino DOCG 75cl" }, price: "18,00", desc: { it: "", en: "" } },
      { name: { it: "Calice di vino bianco (Falanghina)", en: "Glass of white wine (Falanghina)" }, price: "4,00", desc: { it: "", en: "" } }
    ]
  },
  {
    id: "vini-rossi",
    image: "https://images.unsplash.com/photo-1506377247377-780c177e6b9b?w=500&h=889&fit=crop",
    name: { it: "Vini Rossi", en: "Red Wines" },
    products: [
      { name: { it: "Aglianico I.G.P. cl. 75", en: "Aglianico I.G.P. 75cl" }, price: "14,00", desc: { it: "", en: "" } },
      { name: { it: "Gragnano D.O.P. cl. 75", en: "Gragnano D.O.P. 75cl" }, price: "16,00", desc: { it: "", en: "" } },
      { name: { it: "Moio 57 cl. 75", en: "Moio 57 75cl" }, price: "20,00", desc: { it: "", en: "" } },
      { name: { it: "Calice di vino rosso (Aglianico)", en: "Glass of red wine (Aglianico)" }, price: "4,00", desc: { it: "", en: "" } }
    ]
  },
  {
    id: "fine-pasto",
    image: "https://images.unsplash.com/photo-1551024601-bec78aea704b?w=500&h=889&fit=crop",
    name: { it: "Fine Pasto", en: "After Dinner" },
    products: [
      { name: { it: "Limoncello / Meloncello", en: "Limoncello / Meloncello" }, price: "3,00", desc: { it: "", en: "" } },
      { name: { it: "Cremoncello al pistacchio / Crema alla nocciola", en: "Pistachio / Hazelnut cream" }, price: "3,00", desc: { it: "", en: "" } },
      { name: { it: "Amaro del Capo / Lucano / Montenegro", en: "Amaro del Capo / Lucano / Montenegro" }, price: "3,00", desc: { it: "", en: "" } },
      { name: { it: "Fernet Branca / Jägermeister", en: "Fernet Branca / Jägermeister" }, price: "3,00", desc: { it: "", en: "" } },
      { name: { it: "Tiramisù", en: "Tiramisu" }, price: "6,00", desc: { it: "Mascarpone, savoiardi, caffè, cacao", en: "Mascarpone, ladyfingers, coffee, cocoa" } },
      { name: { it: "Dolci (chiedere al personale)", en: "Desserts (ask staff)" }, price: "6,00", desc: { it: "Selezione del giorno (es. dolci con mascarpone)", en: "Daily selection (e.g. desserts with mascarpone)" } }
    ]
  }
];

enrichProducts();
