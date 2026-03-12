/**
 * 大字模式：整体放大正文与标题（仅移动端生效）
 * - 移动端（max-width: 768px）：开关可见，按 localStorage 应用/切换
 * - 桌面端（min-width: 769px）：不显示开关（由 CSS 隐藏），不应用 data-large-text
 */
(function () {
  var STORAGE_KEY = 'largeText';
  var mobileQuery = typeof window.matchMedia !== 'undefined' && window.matchMedia('(max-width: 768px)');

  function isMobile() {
    return mobileQuery && mobileQuery.matches;
  }

  function getStoredLargeText() {
    try {
      return localStorage.getItem(STORAGE_KEY) === 'on';
    } catch (e) {
      return false;
    }
  }

  function setLargeText(on) {
    var root = document.documentElement;
    if (on) {
      root.setAttribute('data-large-text', 'on');
    } else {
      root.removeAttribute('data-large-text');
    }
    try {
      localStorage.setItem(STORAGE_KEY, on ? 'on' : 'off');
    } catch (e) {}
    updateToggleButtons(on);
  }

  function applyByViewport() {
    if (isMobile()) {
      var on = getStoredLargeText();
      setLargeText(on);
    } else {
      document.documentElement.removeAttribute('data-large-text');
      updateToggleButtons(false);
    }
  }

  function toggleLargeText() {
    if (!isMobile()) return;
    setLargeText(!getStoredLargeText());
  }

  function updateToggleButtons(on) {
    var btns = document.querySelectorAll('.large-text-toggle');
    btns.forEach(function (btn) {
      btn.textContent = on ? 'A-' : 'A+';
      btn.setAttribute('aria-label', on ? '关闭大字模式' : '开启大字模式');
    });
  }

  function init() {
    applyByViewport();
    document.querySelectorAll('.large-text-toggle').forEach(function (btn) {
      btn.addEventListener('click', toggleLargeText);
    });
    if (mobileQuery && mobileQuery.addEventListener) {
      mobileQuery.addEventListener('change', applyByViewport);
    } else {
      window.addEventListener('resize', applyByViewport);
    }
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
