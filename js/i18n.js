const I18N = {
  it: {
    chooseLang: "Scegli la tua lingua",
    chooseMenu: "Scegli un menu",
    menuNotFound: "Menu non trovato",
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
    spicy: "Piccante",
    spicyLevel: "Piccantezza",
    prevPhoto: "Foto precedente",
    nextPhoto: "Foto successiva",
    photo: "Foto",
    close: "Chiudi"
  },
  en: {
    chooseLang: "Choose your language",
    chooseMenu: "Choose a menu",
    menuNotFound: "Menu not found",
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
    spicy: "Spicy",
    spicyLevel: "Spiciness",
    prevPhoto: "Previous photo",
    nextPhoto: "Next photo",
    photo: "Photo",
    close: "Close"
  }
};

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
