/**
 * Caricamento menu multi-pizzeria.
 *
 * I file menu in js/menus/ si registrano con registerMenu().
 * L'elenco dei file è in js/menus/manifest.js (generato automaticamente).
 * Dopo un nuovo menu: node scripts/generate-menu-manifest.js
 *
 * Senza ?menu= apre il default (forno-aurora).
 * Altri: ?menu=forno-napoli | ?menu=trattoria-essenziale
 */
const DEFAULT_MENU_ID = "forno-aurora";
let MENU_REQUESTED_ID = null;

function resolveMenuId() {
  const fromUrl = new URLSearchParams(window.location.search).get("menu");
  if (fromUrl) {
    MENU_REQUESTED_ID = fromUrl;
    return MENU_REGISTRY[fromUrl] ? fromUrl : null;
  }
  MENU_REQUESTED_ID = null;
  return MENU_REGISTRY[DEFAULT_MENU_ID] ? DEFAULT_MENU_ID : null;
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
  // Senza ?menu= nella barra: allinea l'URL al menu di default (share / analytics).
  if (!new URLSearchParams(window.location.search).get("menu")) {
    const url = new URL(window.location.href);
    url.searchParams.set("menu", selectedMenuId);
    history.replaceState(history.state, "", `${url.pathname}${url.search}${url.hash}`);
  }
}
