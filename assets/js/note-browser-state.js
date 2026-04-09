/**
 * 笔记浏览器：DOM 引用与常量（须最先加载）
 */
(function () {
  var NB = (window.NoteBrowser = window.NoteBrowser || {});
  NB.PREVIEW_EL = document.getElementById('note-preview-content');
  NB.PLACEHOLDER_EL = document.getElementById('note-preview-placeholder');
  NB.MOBILE_BREAKPOINT = 768;
  NB.STORAGE_KEY = 'note-sidebar-collapsed';
})();
