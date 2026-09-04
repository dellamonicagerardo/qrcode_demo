const fs = require("fs");
const path = require("path");
const vm = require("vm");

const root = path.join(__dirname, "..");
const classes = new Set();

const stubEl = new Proxy({}, {
  get(_, prop) {
    if (prop === "classList") {
      return {
        toggle: (name, on) => (on ? classes.add(name) : classes.delete(name)),
        add: (name) => classes.add(name),
        remove: (name) => classes.delete(name),
        contains: (name) => classes.has(name)
      };
    }
    if (prop === "style" || prop === "dataset") return {};
    if (typeof prop === "string" && prop.startsWith("set")) return () => {};
    if (prop === "removeAttribute" || prop === "querySelector") return () => stubEl;
    return "";
  },
  set: () => true
});

const sandbox = {
  console,
  document: {
    documentElement: stubEl,
    title: "",
    querySelector: () => stubEl,
    querySelectorAll: () => [],
    getElementById: () => stubEl,
    addEventListener: () => {}
  },
  window: { matchMedia: () => ({ matches: false }) },
  localStorage: { getItem: () => null, setItem: () => {} }
};
sandbox.globalThis = sandbox;

const ctx = vm.createContext(sandbox);
["js/i18n.js", "js/menu-core.js", "js/menus/manifest.js"].forEach((file) => {
  vm.runInContext(fs.readFileSync(path.join(root, file), "utf8"), ctx, { filename: file });
});

vm.runInContext("MENU_SCRIPT_FILES", ctx).forEach((file) => {
  vm.runInContext(fs.readFileSync(path.join(root, "js/menus", file), "utf8"), ctx, { filename: file });
});

const menuIds = vm.runInContext("Object.keys(MENU_REGISTRY)", ctx);
let failures = 0;

menuIds.forEach((id) => {
  classes.clear();
  vm.runInContext(`initMenu(MENU_REGISTRY[${JSON.stringify(id)}])`, ctx);

  const expectPhotos = vm.runInContext("MENU_HAS_PHOTOS", ctx);
  const cats = vm.runInContext("CATEGORIES", ctx);
  const products = cats.flatMap((c) => c.products);

  // image e images devono essere sempre coerenti: o una foto valida, o niente foto.
  const badImages = products.filter((p) => {
    if (!Array.isArray(p.images)) return true;
    if (p.images.some((src) => typeof src !== "string" || !src)) return true;
    if (p.image === null) return p.images.length !== 0;
    return typeof p.image !== "string" || !p.image || p.images.length === 0;
  });
  const withoutPhoto = products.filter((p) => p.image === null);
  const badCatImage = cats.filter((c) => c.image !== null && (typeof c.image !== "string" || !c.image));
  const missingAllergens = products.filter((p) => !Array.isArray(p.allergenIds));

  const problems = [];
  if (badImages.length) problems.push(`${badImages.length} prodotti con image/images incoerenti`);
  if (badCatImage.length) problems.push(`${badCatImage.length} categorie con image non valida`);
  if (missingAllergens.length) problems.push(`${missingAllergens.length} prodotti senza allergeni`);
  if (!expectPhotos && withoutPhoto.length !== products.length) problems.push("prodotti con foto in un menu senza foto");
  if (expectPhotos === false && !classes.has("no-photos")) problems.push("classe no-photos mancante");
  if (expectPhotos === true && classes.has("no-photos")) problems.push("classe no-photos inattesa");

  const label = expectPhotos ? "con foto" : "senza foto";
  if (problems.length) {
    failures++;
    console.log(`FAIL  ${id} (${label}): ${problems.join(", ")}`);
  } else {
    const note = expectPhotos && withoutPhoto.length ? `, ${withoutPhoto.length} senza foto` : "";
    console.log(`ok    ${id} (${label}): ${cats.length} categorie, ${products.length} prodotti${note}`);
  }
});

process.exit(failures ? 1 : 0);
