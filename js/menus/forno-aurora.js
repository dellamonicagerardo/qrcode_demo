// Menu demo fittizio — contenuti e brand di esempio, non collegati a locali reali.
const MENU_FORNO_AURORA = {
  id: "forno-aurora",
  site: {
    name: "Forno Aurora",
    pageTitle: "Forno Aurora — Menu demo",
    metaDescription: "Menu digitale di esempio — pizzeria demo Forno Aurora",
    cover: "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=1200&h=500&fit=crop",
    logo: "https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=300&h=300&fit=crop",
    address: "Via dell'Esempio 12 — 84100 Salerno (demo)",
    phone: "0890000000",
    whatsapp: "https://wa.me/390890000000",
    instagram: "https://www.instagram.com/",
    facebook: "https://www.facebook.com/",
    tripadvisor: null,
    review: null,
    theme: {
      accent: "#e8a54b",
      accentDark: "#c4842e",
      accentLight: "#b8732a",
      bg: "#17140f",
      bgLight: "#f8f4ee",
      cardBg: "#241f18",
      cardBgLight: "#ffffff",
      font: "Bricolage Grotesque",
      fontUrl: "https://fonts.googleapis.com/css2?family=Bricolage+Grotesque:opsz,wght@12..96,400;12..96,600;12..96,700&display=swap"
    }
  },
  config: {
    pizzaCategoryIds: ["pizze", "pizze-speciali"]
  },
  categories: [
    {
      id: "pizze",
      image: "https://images.unsplash.com/photo-1513104890138-7c749659a591?w=500&h=889&fit=crop",
      name: { it: "Pizze classiche", en: "Classic pizzas" },
      products: [
        {
          id: "aurora",
          name: { it: "Aurora", en: "Aurora" },
          price: "6,00",
          desc: { it: "Pomodoro, fior di latte, basilico fresco", en: "Tomato, fior di latte, fresh basil" },
          images: [
            "https://images.unsplash.com/photo-1513104890138-7c749659a591?w=500&h=889&fit=crop",
            "https://images.unsplash.com/photo-1574071318508-1cdbab80d002?w=500&h=889&fit=crop"
          ]
        },
        {
          id: "vesuvio",
          name: { it: "Vesuvio", en: "Vesuvio" },
          price: "8,50",
          spicy: 2,
          desc: { it: "Pomodoro, fior di latte, salame piccante, peperoncino", en: "Tomato, fior di latte, spicy salami, chili" }
        },
        {
          id: "orto",
          name: { it: "Orto", en: "Garden" },
          price: "9,00",
          desc: { it: "Zucchine, melanzane, peperoni, provola", en: "Zucchini, eggplant, peppers, smoked provola" }
        },
        {
          id: "quattro-stagioni",
          name: { it: "Quattro stagioni", en: "Four seasons" },
          price: "10,00",
          desc: { it: "Pomodoro, fior di latte, prosciutto, funghi, carciofi, olive", en: "Tomato, fior di latte, ham, mushrooms, artichokes, olives" }
        },
        {
          id: "bufala-semplice",
          name: { it: "Bufala semplice", en: "Simple buffalo" },
          price: "8,00",
          desc: { it: "Pomodoro, mozzarella di bufala, basilico", en: "Tomato, buffalo mozzarella, basil" }
        }
      ]
    },
    {
      id: "pizze-speciali",
      image: "https://images.unsplash.com/photo-1574071318508-1cdbab80d002?w=500&h=889&fit=crop",
      name: { it: "Pizze speciali", en: "Special pizzas" },
      products: [
        {
          id: "costa-doro",
          name: { it: "Costa d'oro", en: "Golden coast" },
          price: "13,00",
          desc: { it: "Crema di pistacchio, fior di latte, mortadella", en: "Pistachio cream, fior di latte, mortadella" },
          images: [
            "https://images.unsplash.com/photo-1574071318508-1cdbab80d002?w=500&h=889&fit=crop",
            "https://images.unsplash.com/photo-1595854341625-f33ee5427437?w=500&h=889&fit=crop"
          ]
        },
        {
          id: "bosco",
          name: { it: "Bosco", en: "Woodland" },
          price: "12,00",
          desc: { it: "Funghi misti, provola, rosmarino, olio EVO", en: "Mixed mushrooms, provola, rosemary, EVO oil" }
        },
        {
          id: "mare-chiaro",
          name: { it: "Mare chiaro", en: "Clear sea" },
          price: "14,00",
          desc: { it: "Pomodorini, alici, capperi, origano", en: "Cherry tomatoes, anchovies, capers, oregano" }
        },
        {
          id: "sera-estate",
          name: { it: "Sera d'estate", en: "Summer evening" },
          price: "11,50",
          desc: { it: "Bufala, pomodorini, rucola, scaglie di grana", en: "Buffalo mozzarella, cherry tomatoes, arugula, aged cheese" }
        }
      ]
    },
    {
      id: "antipasti",
      image: "https://images.unsplash.com/photo-1604908176997-125f25cc6f3d?w=500&h=889&fit=crop",
      name: { it: "Antipasti", en: "Starters" },
      products: [
        {
          id: "bruschetta-casa",
          name: { it: "Bruschetta di casa", en: "House bruschetta" },
          price: "4,50",
          desc: { it: "Pane tostato, pomodoro, aglio, basilico", en: "Toasted bread, tomato, garlic, basil" }
        },
        {
          id: "tris-fritti",
          name: { it: "Tris di fritti", en: "Fried trio" },
          price: "7,00",
          desc: { it: "Arancini, crocchette, fiori di zucca", en: "Arancini, croquettes, zucchini flowers" }
        },
        {
          id: "focaccia-rosmarino",
          name: { it: "Focaccia al rosmarino", en: "Rosemary focaccia" },
          price: "3,50",
          desc: { it: "Impasto della casa, rosmarino, sale grosso", en: "House dough, rosemary, coarse salt" }
        }
      ]
    },
    {
      id: "bibite",
      image: "https://images.unsplash.com/photo-1622483767728-3a66e9bfc0db?w=500&h=889&fit=crop",
      name: { it: "Bevande", en: "Drinks" },
      products: [
        { id: "acqua-nat", name: { it: "Acqua naturale 75cl", en: "Still water 75cl" }, price: "2,00", desc: { it: "", en: "" } },
        { id: "acqua-fri", name: { it: "Acqua frizzante 75cl", en: "Sparkling water 75cl" }, price: "2,00", desc: { it: "", en: "" } },
        { id: "cola", name: { it: "Cola 33cl", en: "Cola 33cl" }, price: "2,50", desc: { it: "", en: "" } },
        { id: "birra-chiara", name: { it: "Birra chiara 33cl", en: "Lager 33cl" }, price: "3,50", desc: { it: "", en: "" } }
      ]
    },
    {
      id: "dolci",
      image: "https://images.unsplash.com/photo-1551024601-bec78aea704b?w=500&h=889&fit=crop",
      name: { it: "Dolci", en: "Desserts" },
      products: [
        {
          id: "tiramisu-casa",
          name: { it: "Tiramisù di casa", en: "House tiramisu" },
          price: "5,50",
          desc: { it: "Mascarpone, savoiardi, caffè, cacao", en: "Mascarpone, ladyfingers, coffee, cocoa" }
        },
        {
          id: "gelato-artigianale",
          name: { it: "Gelato artigianale", en: "Artisan gelato" },
          price: "4,00",
          desc: { it: "Gusti del giorno", en: "Daily flavors" }
        }
      ]
    }
  ]
};

registerMenu(MENU_FORNO_AURORA);
