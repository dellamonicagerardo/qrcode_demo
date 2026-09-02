const ICON_FILTER = `<svg class="icon-filter" viewBox="0 0 512 512" aria-hidden="true"><path fill="none" stroke="currentColor" stroke-miterlimit="10" stroke-width="32" d="M448 256c0-106-86-192-192-192S64 150 64 256s86 192 192 192 192-86 192-192z"></path><path fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="32" d="M144 208h224m-192 64h160m-112 64h64"></path></svg>`;

const ICON_TEXT_SIZE = `<svg class="toolbar-icon" viewBox="0 0 24 24" aria-hidden="true"><text x="2" y="17" font-size="15" font-weight="700" fill="currentColor" font-family="Montserrat, sans-serif">A</text><text x="14" y="19" font-size="10" font-weight="700" fill="currentColor" font-family="Montserrat, sans-serif">a</text></svg>`;

const ICON_SUN = `<svg class="toolbar-icon" viewBox="0 0 24 24" aria-hidden="true"><circle cx="12" cy="12" r="4" fill="none" stroke="currentColor" stroke-width="2"/><path fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M4.93 19.07l1.41-1.41M17.66 6.34l1.41-1.41"/></svg>`;

const ICON_MOON = `<svg class="toolbar-icon" viewBox="0 0 24 24" aria-hidden="true"><path fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/></svg>`;

const ICON_LIST = `<svg class="toolbar-icon" viewBox="0 0 24 24" aria-hidden="true"><path fill="currentColor" d="M4 6a2 2 0 1 0 0-4 2 2 0 0 0 0 4zm0 6a2 2 0 1 0 0-4 2 2 0 0 0 0 4zm0 6a2 2 0 1 0 0-4 2 2 0 0 0 0 4z"/><path fill="currentColor" d="M9 5h12v2H9V5zm0 6h12v2H9v-2zm0 6h12v2H9v-2z"/></svg>`;

const ICON_GALLERY = `<svg class="toolbar-icon" viewBox="0 0 24 24" aria-hidden="true"><rect x="3" y="5" width="13" height="14" rx="2" fill="none" stroke="currentColor" stroke-width="2"/><rect x="8" y="7" width="13" height="14" rx="2" fill="none" stroke="currentColor" stroke-width="2"/><circle cx="8.5" cy="10.5" r="1.5" fill="currentColor"/></svg>`;

const ICON_PREGNANCY = `<svg class="pregnancy-icon" viewBox="0 0 24 24" aria-hidden="true">
  <circle cx="12" cy="12" r="10.5" fill="currentColor" opacity="0.22"/>
  <path fill="currentColor" d="M6.2 5.8C5.4 6.8 5.6 8 6.5 8.6 7.2 4.5 9.2 3.8 10.8 4.6 12.4 5.4 12.8 7 12 8.2 11.4 9 10.4 9.2 9.6 9L9.2 9.4C8.4 9.8 7.6 11.2 7.8 12.4 8 13.2 8.6 13.1 9 12.6L9.1 14.8 9.2 20.2H11.4L11.1 16.8C12.8 17.2 15.2 16 16 13.8 16.8 11.6 15.2 9.8 13.4 9.4 12.6 9.2 11.6 9.3 10.8 9.6L9.6 9C8.8 8.2 7.8 7.2 6.2 5.8Z"/>
  <path fill="currentColor" d="M9.1 10.2C8.4 10.8 8.2 11.8 8.6 12.6 8.9 13.1 9.4 13 9.7 12.5 9.4 11.8 9.3 10.8 9.1 10.2Z"/>
  <path fill="currentColor" opacity="0.42" d="M13.2 13.6C13 13 12.5 12.9 12.3 13.4 12.1 12.9 11.6 13 11.4 13.6 11.2 14.2 12.3 15 12.3 15 12.3 15 13.4 14.2 13.2 13.6Z"/>
</svg>`;

const ALLERGENS = [
  { id: "glutine", color: "#e8a735", name: { it: "Glutine", en: "Gluten" }, icon: `<svg viewBox="0 0 24 24"><path fill="currentColor" d="M12 2C8 6 5 9 5 13a7 7 0 0 0 14 0c0-4-3-7-7-11zm0 18a5 5 0 0 1-5-5c0-2.5 2-5.2 5-8.7 3 3.5 5 6.2 5 8.7a5 5 0 0 1-5 5z"/></svg>` },
  { id: "crostacei", color: "#e07040", name: { it: "Crostacei", en: "Crustaceans" }, icon: `<svg viewBox="0 0 24 24"><path fill="currentColor" d="M4 14c2-3 5-5 8-5s6 2 8 5l-2 1c-1.5-2-4-3.5-6-3.5S7.5 13 6 15l-2-1zm2 3 1.5 2.5L9 18l-1.5-2.5L6 14l-1.5 2.5L3 18l1.5 2.5L6 22l1.5-2.5L9 18 7.5 15.5 6 17z"/></svg>` },
  { id: "uova", color: "#f0d060", name: { it: "Uova", en: "Eggs" }, icon: `<svg viewBox="0 0 24 24"><path fill="currentColor" d="M12 3c-3 0-5 5-5 9a5 5 0 0 0 10 0c0-4-2-9-5-9zm0 18a7 7 0 0 1-7-7c0-3.5 1.8-8.5 4.5-11.2.8 2.8 2.5 5.2 2.5 8.2a7 7 0 0 0 14 0c0-3-1.7-5.4-2.5-8.2C17.2 5.5 19 10.5 19 14a7 7 0 0 1-7 7z"/></svg>` },
  { id: "pesce", color: "#4a9fd8", name: { it: "Pesce", en: "Fish" }, icon: `<svg viewBox="0 0 24 24"><path fill="currentColor" d="M2 12c3-4 7-6 11-6 2 0 4 .5 6 1.5L22 4v8l-3 1.5c-2 1-4 1.5-6 1.5-4 0-8-2-11-6l3-1zm14 0a2 2 0 1 0 4 0 2 2 0 0 0-4 0z"/></svg>` },
  { id: "arachidi", color: "#c68642", name: { it: "Arachidi", en: "Peanuts" }, icon: `<svg viewBox="0 0 24 24"><path fill="currentColor" d="M8 10c-2 1-3 3-3 5a5 5 0 0 0 10 0c0-1-.5-2.5-1.5-4L8 10zm8 2c1.5 1 2.5 2.5 2.5 4a4 4 0 0 1-8 0c0-1.2.6-2.4 1.5-3.5L16 12z"/></svg>` },
  { id: "soia", color: "#7cb342", name: { it: "Soia", en: "Soy" }, icon: `<svg viewBox="0 0 24 24"><path fill="currentColor" d="M12 2c-2 3-3 6-3 9a6 6 0 0 0 12 0c0-3-1-6-3-9-1 2-2 4-3 4s-2-2-3-4z"/></svg>` },
  { id: "latte", color: "#5d9cec", name: { it: "Latte", en: "Milk" }, icon: `<svg viewBox="0 0 24 24"><path fill="currentColor" d="M8 3h8v2h1a3 3 0 0 1 3 3v10a5 5 0 0 1-10 0V8a3 3 0 0 1 3-3h1V3zm2 2v1h4V5h-4zm-1 4v9a3 3 0 0 0 6 0V9H9z"/></svg>` },
  { id: "frutta-guscio", color: "#a07040", name: { it: "Frutta a guscio", en: "Tree nuts" }, icon: `<svg viewBox="0 0 24 24"><path fill="currentColor" d="M12 2C9 5 7 8 7 11a5 5 0 0 0 10 0c0-3-2-6-5-9zm0 20a7 7 0 0 1-7-7c0-2.5 1.2-5.2 3-7.5 1.8 2.3 3 5 3 7.5a7 7 0 0 1-7 7z"/></svg>` },
  { id: "sedano", color: "#66bb6a", name: { it: "Sedano", en: "Celery" }, icon: `<svg viewBox="0 0 24 24"><path fill="currentColor" d="M11 2v20h2V2h-2zm-3 4v16h2V6H8zm6 3v13h2V9h-2z"/></svg>` },
  { id: "senape", color: "#d4a017", name: { it: "Senape", en: "Mustard" }, icon: `<svg viewBox="0 0 24 24"><path fill="currentColor" d="M12 2a6 6 0 0 0-6 6c0 2 1 4 3 5v9h6v-9c2-1 3-3 3-5a6 6 0 0 0-6-6zm0 2a4 4 0 0 1 4 4c0 1.2-.6 2.3-1.5 3H9.5A4 4 0 0 1 12 4z"/></svg>` },
  { id: "sesamo", color: "#c9a227", name: { it: "Sesamo", en: "Sesame" }, icon: `<svg viewBox="0 0 24 24"><circle fill="currentColor" cx="8" cy="10" r="1.2"/><circle fill="currentColor" cx="12" cy="8" r="1.2"/><circle fill="currentColor" cx="16" cy="10" r="1.2"/><circle fill="currentColor" cx="10" cy="13" r="1.2"/><circle fill="currentColor" cx="14" cy="13" r="1.2"/><circle fill="currentColor" cx="12" cy="16" r="1.2"/></svg>` },
  { id: "solfiti", color: "#9e6bb5", name: { it: "Solfiti", en: "Sulphites" }, icon: `<svg viewBox="0 0 24 24"><path fill="currentColor" d="M6 4h12v2H6V4zm0 4h12v2H6V8zm0 4h8v2H6v-2zm0 4h12v2H6v-2z"/><text x="14" y="17" font-size="6" fill="currentColor">SO₂</text></svg>` },
  { id: "lupini", color: "#f4b400", name: { it: "Lupini", en: "Lupin" }, icon: `<svg viewBox="0 0 24 24"><ellipse fill="currentColor" cx="8" cy="12" rx="2" ry="3"/><ellipse fill="currentColor" cx="12" cy="10" rx="2" ry="3"/><ellipse fill="currentColor" cx="16" cy="12" rx="2" ry="3"/></svg>` },
  { id: "molluschi", color: "#8d6e63", name: { it: "Molluschi", en: "Molluscs" }, icon: `<svg viewBox="0 0 24 24"><path fill="currentColor" d="M4 14c2-4 5-7 8-7s6 3 8 7c-2 1-4 2-8 2s-6-1-8-2zm8-9c-3 0-6 2-8 5h16c-2-3-5-5-8-5z"/></svg>` }
];

function getAllergenById(id) {
  return ALLERGENS.find((a) => a.id === id);
}

function allergenIconHtml(id, size) {
  const allergen = getAllergenById(id);
  if (!allergen) return "";
  const cls = size === "lg" ? "allergen-icon allergen-icon-lg" : "allergen-icon";
  return `<span class="${cls}" style="--allergen-color:${allergen.color}" title="${allergen.name.it}">${allergen.icon}</span>`;
}

function pregnancyIconHtml(title) {
  const safeTitle = (title || "").replace(/"/g, "&quot;");
  return `<span class="pregnancy-icon-wrap" title="${safeTitle}">${ICON_PREGNANCY}</span>`;
}
