(function () {
  var STORAGE_KEY = 'lang';
  var EN_PREFIX = '/en/';
  var btn = document.querySelector('.lang-toggle');

  var isEnPage = window.location.pathname.indexOf(EN_PREFIX) === 0
    || window.location.pathname.indexOf('/en/') !== -1;

  var currentLang = isEnPage ? 'en' : 'zh';

  if (btn) {
    btn.textContent = currentLang === 'zh' ? 'EN' : '中';
    btn.setAttribute('aria-label', currentLang === 'zh' ? 'Switch to English' : '切换到中文');

    btn.addEventListener('click', function () {
      var targetLang = currentLang === 'zh' ? 'en' : 'zh';
      localStorage.setItem(STORAGE_KEY, targetLang);
      var targetPath = getTargetPath(targetLang);
      checkAndNavigate(targetPath, targetLang);
    });
  }

  function getTargetPath(targetLang) {
    var path = window.location.pathname;

    if (targetLang === 'en') {
      if (path === '/' || path === '/index.html') {
        return '/en/index.html';
      }
      return '/en' + path;
    }

    return path.replace(/^\/en\//, '/').replace(/^\/en$/, '/');
  }

  function checkAndNavigate(targetPath, targetLang) {
    var xhr = new XMLHttpRequest();
    xhr.open('HEAD', targetPath, true);
    xhr.onreadystatechange = function () {
      if (xhr.readyState === 4) {
        if (xhr.status === 200) {
          window.location.href = targetPath;
        } else if (targetLang === 'en') {
          window.location.href = targetPath;
        } else {
          window.location.href = targetPath;
        }
      }
    };
    xhr.onerror = function () {
      window.location.href = targetPath;
    };
    xhr.send();
  }
})();
