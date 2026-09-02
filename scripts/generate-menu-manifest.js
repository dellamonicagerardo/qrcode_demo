/**
 * Scansiona js/menus/ e genera js/menus/manifest.js
 * Esegui dopo aver aggiunto un nuovo file menu: node scripts/generate-menu-manifest.js
 */
const fs = require("fs");
const path = require("path");

const menusDir = path.join(__dirname, "../js/menus");
const exclude = new Set(["manifest.js"]);

const files = fs
  .readdirSync(menusDir)
  .filter((name) => name.endsWith(".js") && !exclude.has(name))
  .sort();

const content = `// Generato da scripts/generate-menu-manifest.js — non modificare a mano
const MENU_SCRIPT_FILES = ${JSON.stringify(files, null, 2)};
`;

fs.writeFileSync(path.join(menusDir, "manifest.js"), content);
console.log(`manifest.js aggiornato (${files.length} menu): ${files.join(", ")}`);
