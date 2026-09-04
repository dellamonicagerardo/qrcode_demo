// Versione semplice: nessuna foto, solo testo.
// config.photos = false disattiva copertina, immagini categorie e gallerie prodotto.
const MENU_TRATTORIA_ESSENZIALE = {
  id: "trattoria-essenziale",
  site: {
    name: "Trattoria Essenziale",
    pageTitle: "Trattoria Essenziale - Menu",
    metaDescription: "Menu digitale - Trattoria Essenziale, Salerno",
    cover: null,
    logo: null,
    address: "Via Roma 8 - 84121 - Salerno (SA)",
    phone: "089123456",
    whatsapp: "https://wa.me/39089123456",
    instagram: null,
    facebook: null,
    tripadvisor: null,
    review: null,
    theme: {
      accent: "#3d6b5a",
      accentDark: "#2f5346",
      accentLight: "#2f5346",
      bg: "#141916",
      bgLight: "#eef2ef",
      cardBg: "#1e2622",
      cardBgLight: "#ffffff",
      font: "Source Serif 4",
      fontUrl: "https://fonts.googleapis.com/css2?family=Source+Serif+4:wght@400;600;700&display=swap"
    }
  },
  config: {
    photos: false
  },
  categories: [
    {
      id: "antipasti",
      name: { it: "Antipasti", en: "Starters" },
      products: [
        { name: { it: "Bruschetta al pomodoro", en: "Tomato bruschetta" }, price: "4,00", desc: { it: "Pane casereccio, pomodoro, basilico, olio EVO", en: "Homemade bread, tomato, basil, extra virgin olive oil" } },
        { name: { it: "Tagliere di salumi", en: "Cured meats board" }, price: "9,00", desc: { it: "Prosciutto crudo, salame, mortadella", en: "Prosciutto, salami, mortadella" } },
        { name: { it: "Caprese", en: "Caprese" }, price: "7,00", desc: { it: "Mozzarella di bufala, pomodoro, basilico", en: "Buffalo mozzarella, tomato, basil" } }
      ]
    },
    {
      id: "primi",
      name: { it: "Primi Piatti", en: "First Courses" },
      products: [
        { name: { it: "Spaghetti alle vongole", en: "Spaghetti with clams" }, price: "12,00", desc: { it: "Spaghetti, vongole, aglio, prezzemolo", en: "Spaghetti, clams, garlic, parsley" } },
        { name: { it: "Paccheri alla genovese", en: "Paccheri alla genovese" }, price: "11,00", desc: { it: "Paccheri, cipolla, carne di manzo, sedano", en: "Paccheri, onion, beef, celery" } },
        { name: { it: "Gnocchi alla sorrentina", en: "Gnocchi alla sorrentina" }, price: "10,00", desc: { it: "Gnocchi, pomodoro, mozzarella, basilico", en: "Gnocchi, tomato, mozzarella, basil" } }
      ]
    },
    {
      id: "secondi",
      name: { it: "Secondi Piatti", en: "Main Courses" },
      products: [
        { name: { it: "Tagliata di manzo", en: "Beef tagliata" }, price: "18,00", desc: { it: "Manzo, rucola, scaglie di parmigiano", en: "Beef, arugula, parmesan flakes" } },
        { name: { it: "Frittura di paranza", en: "Mixed fried fish" }, price: "14,00", desc: { it: "Pesce misto, farina, limone", en: "Mixed fish, flour, lemon" } },
        { name: { it: "Parmigiana di melanzane", en: "Eggplant parmigiana" }, price: "10,00", desc: { it: "Melanzane, pomodoro, mozzarella, parmigiano", en: "Eggplant, tomato, mozzarella, parmesan" } }
      ]
    },
    {
      id: "contorni",
      name: { it: "Contorni", en: "Side Dishes" },
      products: [
        { name: { it: "Patate al forno", en: "Roast potatoes" }, price: "4,00", desc: { it: "Patate, rosmarino, olio EVO", en: "Potatoes, rosemary, extra virgin olive oil" } },
        { name: { it: "Insalata mista", en: "Mixed salad" }, price: "4,50", desc: { it: "Lattuga, pomodoro, carote", en: "Lettuce, tomato, carrots" } },
        { name: { it: "Friarielli saltati", en: "Sautéed friarielli" }, price: "5,00", desc: { it: "Friarielli, aglio, olio EVO", en: "Friarielli, garlic, extra virgin olive oil" } }
      ]
    },
    {
      id: "dolci",
      name: { it: "Dolci", en: "Desserts" },
      products: [
        { name: { it: "Tiramisù", en: "Tiramisu" }, price: "5,00", desc: { it: "Savoiardi, mascarpone, uova, caffè", en: "Ladyfingers, mascarpone, eggs, coffee" } },
        { name: { it: "Delizia al limone", en: "Lemon delight" }, price: "5,50", desc: { it: "Pan di spagna, crema al limone, panna", en: "Sponge cake, lemon cream, whipped cream" } },
        { name: { it: "Sorbetto al limone", en: "Lemon sorbet" }, price: "4,00", desc: { it: "Limone, zucchero", en: "Lemon, sugar" } }
      ]
    },
    {
      id: "bibite",
      name: { it: "Bibite", en: "Soft Drinks" },
      products: [
        { name: { it: "Acqua naturale cl. 75", en: "Still water 75cl" }, price: "2,00", desc: { it: "", en: "" } },
        { name: { it: "Acqua frizzante cl. 75", en: "Sparkling water 75cl" }, price: "2,00", desc: { it: "", en: "" } },
        { name: { it: "Coca Cola cl. 33", en: "Coca Cola 33cl" }, price: "2,50", desc: { it: "", en: "" } },
        { name: { it: "Birra alla spina cl. 40", en: "Draft beer 40cl" }, price: "4,00", desc: { it: "", en: "" } }
      ]
    },
    {
      id: "fine-pasto",
      name: { it: "Fine Pasto", en: "After Dinner" },
      products: [
        { name: { it: "Caffè", en: "Coffee" }, price: "1,20", desc: { it: "", en: "" } },
        { name: { it: "Limoncello", en: "Limoncello" }, price: "3,00", desc: { it: "", en: "" } },
        { name: { it: "Amaro della casa", en: "House amaro" }, price: "3,00", desc: { it: "", en: "" } }
      ]
    }
  ]
};

registerMenu(MENU_TRATTORIA_ESSENZIALE);
