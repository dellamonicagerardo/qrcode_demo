(function () {
  function loadScript(src) {
    return new Promise((resolve, reject) => {
      const el = document.createElement("script");
      el.src = src;
      el.onload = () => resolve();
      el.onerror = () => reject(new Error(`Impossibile caricare ${src}`));
      document.head.appendChild(el);
    });
  }

  async function boot() {
    const files = typeof MENU_SCRIPT_FILES !== "undefined" ? MENU_SCRIPT_FILES : [];
    for (const file of files) {
      await loadScript(`js/menus/${file}`);
    }
    await loadScript("js/data.js");
    await loadScript("js/icons.js");
    await loadScript("js/carousel.js");
    await loadScript("js/app.js");
  }

  boot().catch((err) => {
    console.error(err);
    const msg = document.createElement("p");
    msg.style.cssText = "padding:2rem;margin:0;color:#fff;background:#4a1515;font-family:sans-serif";
    msg.textContent = `Errore caricamento menu: ${err.message}`;
    document.body.prepend(msg);
  });
})();
