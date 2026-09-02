const MENU_FORNO_NAPOLI = {
  id: "forno-napoli",
  site: {
    name: "Forno Napoli",
    pageTitle: "Forno Napoli Menu",
    metaDescription: "Menu digitale - Pizzeria Forno Napoli, Napoli",
    cover: "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=1200&h=500&fit=crop",
    logo: "https://images.unsplash.com/photo-1574071318508-1cdbab80d002?w=300&h=300&fit=crop",
    address: "Via Toledo 12 - 80134 - Napoli (NA)",
    phone: "0815551234",
    whatsapp: "https://wa.me/390815551234",
    instagram: "https://www.instagram.com/",
    facebook: null,
    tripadvisor: null,
    review: null
  },
  config: {
    pizzaCategoryIds: ["pizze", "pizze-speciali"]
  },
  categories: [
    {
      id: "pizze",
      image: "https://images.unsplash.com/photo-1513104890138-7c749659a591?w=500&h=889&fit=crop",
      name: { it: "Pizze", en: "Pizzas" },
      products: [
        { name: { it: "Marinara", en: "Marinara" }, price: "4,50", desc: { it: "Pomodoro, aglio, origano", en: "Tomato, garlic, oregano" } },
        { name: { it: "Margherita", en: "Margherita" }, price: "6,00", desc: { it: "Pomodoro, mozzarella, basilico", en: "Tomato, mozzarella, basil" } },
        { name: { it: "Diavola", en: "Diavola" }, price: "8,00", desc: { it: "Pomodoro, mozzarella, salame piccante", en: "Tomato, mozzarella, spicy salami" } }
      ]
    },
    {
      id: "pizze-speciali",
      image: "https://images.unsplash.com/photo-1574071318508-1cdbab80d002?w=500&h=889&fit=crop",
      name: { it: "Pizze Speciali", en: "Special Pizzas" },
      products: [
        { name: { it: "Capricciosa del Forno", en: "Forno Capricciosa" }, price: "10,00", desc: { it: "Pomodoro, mozzarella, prosciutto, funghi, carciofi", en: "Tomato, mozzarella, ham, mushrooms, artichokes" } },
        { name: { it: "Bufala e Pomodorini", en: "Buffalo and Cherry Tomatoes" }, price: "11,00", desc: { it: "Mozzarella di bufala, pomodorini, rucola", en: "Buffalo mozzarella, cherry tomatoes, arugula" } }
      ]
    },
    {
      id: "bibite",
      image: "https://images.unsplash.com/photo-1622483767728-3a66e9bfc0db?w=500&h=889&fit=crop",
      name: { it: "Bibite", en: "Soft Drinks" },
      products: [
        { name: { it: "Acqua naturale cl. 50", en: "Still water 50cl" }, price: "1,50", desc: { it: "", en: "" } },
        { name: { it: "Coca Cola cl. 33", en: "Coca Cola 33cl" }, price: "2,50", desc: { it: "", en: "" } }
      ]
    }
  ]
};

registerMenu(MENU_FORNO_NAPOLI);
