var SiteUtils = (function () {
  function getCssVar(name) {
    return getComputedStyle(document.documentElement).getPropertyValue(name).trim();
  }

  function isMobile(breakpoint) {
    return window.matchMedia('(max-width: ' + (breakpoint || 768) + 'px)').matches;
  }

  function isTouchDevice() {
    return ('ontouchstart' in window) || ((navigator && navigator.maxTouchPoints) || 0) > 0;
  }

  function getUrlParam(name) {
    var params = new URLSearchParams(window.location.search);
    return params.get(name) || null;
  }

  return {
    getCssVar: getCssVar,
    isMobile: isMobile,
    isTouchDevice: isTouchDevice,
    getUrlParam: getUrlParam,
  };
})();
