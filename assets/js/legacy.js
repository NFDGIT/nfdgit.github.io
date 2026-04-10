(function () {
  var STORAGE_KEY = 'theme';

  function getTheme() {
    try {
      var stored = localStorage.getItem(STORAGE_KEY);
      if (stored === 'light' || stored === 'dark') return stored;
    } catch (e) {}
    if (window.matchMedia && matchMedia('(prefers-color-scheme: dark)').matches) return 'dark';
    return 'light';
  }

  function setTheme(theme) {
    document.documentElement.setAttribute('data-theme', theme);
    try { localStorage.setItem(STORAGE_KEY, theme); } catch (e) {}
    var btns = document.querySelectorAll('.theme-toggle');
    for (var i = 0; i < btns.length; i++) {
      btns[i].textContent = theme === 'dark' ? '☀️' : '🌙';
    }
  }

  function init() {
    setTheme(getTheme());
    var btns = document.querySelectorAll('.theme-toggle');
    for (var i = 0; i < btns.length; i++) {
      btns[i].addEventListener('click', function () {
        setTheme(getTheme() === 'light' ? 'dark' : 'light');
      });
    }
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
