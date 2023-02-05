const SkinSwitcher = {
  selectorId: "theme-mode-switch-container",
  _callbacks: [],
  init: function () {
    this.listenToSystemTheme();
    this.initializeTheme();
  },
  addSkinChangesListener: function (handler) {
    this._callbacks.push(handler);
  },
  listenToSystemTheme: function () {
    window
      .matchMedia("(prefers-color-scheme: dark)")
      .addEventListener("change", (event) => {
        const isDarkMode = event.matches;
        this.changeSkin(isDarkMode, solarized === "true");
      });
  },
  initializeTheme: function () {
    darkMode = localStorage.getItem("storage-dark-mode");
    solarized = localStorage.getItem("storage-solarized");

    if (darkMode && solarized) {
      this.changeSkin(darkMode === "true", solarized === "true");
    } else {
      if (window.matchMedia) {
        if (window.matchMedia("(prefers-color-scheme: dark)").matches) {
          this.changeSkin(true, true);
        } else {
          this.changeSkin(false, true);
        }
      }
    }
  },
  replaceStyleSheetWith: function (skin) {
    var metaTag = document.getElementById("stylesheet");
    var SSHref = metaTag.href;
    var SSName = SSHref.substring(SSHref.lastIndexOf("/") + 1);
    var stylesheetUrl = SSHref.replace(SSName, skin);

    fetch(stylesheetUrl).then(function (_) {
      if (metaTag.href != stylesheetUrl) metaTag.href = stylesheetUrl;
    });
  },
  setThemeSwitcherContent: function (isDarkMode, solarized) {
    element = document.getElementById(this.selectorId);
    element.setAttribute("data-dark-mode", isDarkMode);
    element.setAttribute("data-solarized", solarized);

    if (isDarkMode) {
      element.innerHTML = solarized ? "nights_stay" : "dark_mode";
    } else {
      element.innerHTML = solarized ? "wb_incandescent" : "light_mode";
    }
  },
  constructSkin: function (isDarkMode, solarized) {
    if (isDarkMode) {
      return solarized ? "solarized-dark.css" : "dark.css";
    } else {
      return solarized ? "solarized-light.css" : "classic.css";
    }
  },
  changeSkin: function (isDarkMode, solarized) {
    this.setThemeSwitcherContent(isDarkMode, solarized);
    this.replaceStyleSheetWith(this.constructSkin(isDarkMode, solarized));

    localStorage.setItem("storage-dark-mode", isDarkMode);
    localStorage.setItem("storage-solarized", solarized);

    this._callbacks.forEach(function (hanlder) {
      hanlder(isDarkMode, solarized);
    });
  },
  isSolarized: function () {
    solarized = document
      .getElementById(this.selectorId)
      .getAttribute("data-solarized");
    return solarized === "true";
  },
  isDarkMode: function () {
    darkMode = document
      .getElementById(this.selectorId)
      .getAttribute("data-dark-mode");
    return darkMode === "true";
  },
  next: function () {
    var darkMode = this.isDarkMode();
    var solarize = this.isSolarized();

    var lightMode = !darkMode;
    var notSolarize = !solarize;

    if (lightMode && notSolarize) this.changeSkin(true, false);
    if (darkMode && notSolarize) this.changeSkin(false, true);
    if (lightMode && solarize) this.changeSkin(true, true);
    if (darkMode && solarize) this.changeSkin(false, false);
  },
};

SkinSwitcher.init();
