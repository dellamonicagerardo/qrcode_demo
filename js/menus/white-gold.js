const MENU_WHITE_GOLD = {
  id: "white-gold",
  site: {
    name: "White Gold",
    pageTitle: "White Gold Menu",
    metaDescription: "Menu digitale - Pizzeria White Gold, Baronissi (SA)",
    cover: "https://d35vozid5pezr8.cloudfront.net/whitegold.tidelizio.menu/AN9cLc-2da93a56-25a6-4e9e-bbba-a92afc3c7388.webp",
    logo: "https://d35vozid5pezr8.cloudfront.net/whitegold.tidelizio.menu/Uk7g6l-22ce3145-4a2c-4bd1-8651-e61e92025caa.webp",
    address: "Via dei Due Principati 40h/ 40i - 84081 - Baronissi (SA)",
    phone: "0899762636",
    whatsapp: "https://wa.me/+390899762636",
    instagram: "https://www.instagram.com/pizzeria_whitegold/",
    facebook: "https://www.facebook.com/pizzeriawhitegold",
    tripadvisor: "https://www.tripadvisor.it/Restaurant_Review-g187781-d23543706-Reviews-Pizzeria_White_Gold-Salerno_Amalfi_Coast_Province_of_Salerno_Campania.html",
    review: "https://search.google.com/local/writereview?placeid=ChIJUQbGHEjDOxMR1bpaKkFPeDU"
  },
  config: {
    pizzaCategoryIds: ["pizze", "pizze-dautore"]
  },
  categories: [
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
]
};

registerMenu(MENU_WHITE_GOLD);
