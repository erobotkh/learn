const PostComments = {
  selectorId: "post-comments",
  init: function () {
    self = this;

    SkinSwitcher.addSkinChangesListener(function (isDarkMode, solarized) {
      self.setTheme(isDarkMode, solarized);
    });

    this.setTheme(SkinSwitcher.isDarkMode(), SkinSwitcher.isSolarized());
  },
  constructTheme: function (isDarkMode, solarized) {
    if (isDarkMode) {
      return solarized ? "gruvbox-dark" : "github-dark";
    } else {
      return solarized ? "boxy-light" : "github-light";
    }
  },
  setTheme: function (isDarkMode, solarized) {
    let theme = this.constructTheme(isDarkMode, solarized);

    let script = document.createElement("script");
    script.src = "https://utteranc.es/client.js";

    script.setAttribute("repo", "erobotkh/learn");
    script.setAttribute("issue-term", "pathname");
    script.setAttribute("theme", theme);
    script.setAttribute("crossorigin", "anonymous");
    script.setAttribute("async", "");

    document.getElementById(this.selectorId).innerHTML = "";
    document.getElementById(this.selectorId).appendChild(script);
  },
};

PostComments.init();
