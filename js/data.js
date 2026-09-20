/**
 * Caricamento menu multi-pizzeria.
 *
 * I file menu in js/menus/ si registrano con registerMenu().
 * L'elenco dei file è in js/menus/manifest.js (generato automaticamente).
 * Dopo un nuovo menu: node scripts/generate-menu-manifest.js
 *
 * Selezione obbligatoria: ?menu=forno-aurora | ?menu=forno-napoli | ?menu=trattoria-essenziale
 */
let MENU_REQUESTED_ID = null;

function resolveMenuId() {
  const fromUrl = new URLSearchParams(window.location.search).get("menu");
  if (!fromUrl) return null;
  MENU_REQUESTED_ID = fromUrl;
  return MENU_REGISTRY[fromUrl] ? fromUrl : null;
}

function getAvailableMenus() {
  return Object.entries(MENU_REGISTRY).map(([id, menu]) => ({
    id,
    name: menu.site.name
  }));
}

const selectedMenuId = resolveMenuId();
const selectedMenu = selectedMenuId ? MENU_REGISTRY[selectedMenuId] : null;

if (selectedMenu) {
  initMenu(selectedMenu);
}
