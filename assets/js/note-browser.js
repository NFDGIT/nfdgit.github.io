/**
 * 笔记浏览器：入口（manifest、hash、初始化）
 */
(function () {
  var NB = window.NoteBrowser;

  function initGlobalKeyboard() {
    var searchInput = document.getElementById('note-search');

    document.addEventListener('keydown', function (e) {
      var tag = (e.target.tagName || '').toLowerCase();
      var isInput = tag === 'input' || tag === 'textarea' || e.target.isContentEditable;

      if (e.key === '/' && !isInput) {
        e.preventDefault();
        if (searchInput) {
          if (NB.isMobile()) NB.openSidebar();
          searchInput.focus();
        }
        return;
      }

      if (e.key === 'Escape') {
        if (document.activeElement === searchInput) {
          searchInput.blur();
          searchInput.value = '';
          searchInput.dispatchEvent(new Event('input'));
          return;
        }
        if (NB.isMobile() && document.body.classList.contains('note-sidebar-open')) {
          NB.closeSidebar();
          return;
        }
      }
    });
  }

  function init() {
    var container = document.getElementById('note-tree');
    var data = window.NOTE_MANIFEST;
    if (container && data && data.children) {
      NB.renderTree(data.children, container);
      NB.renderSidebarStats(data.children);
    } else if (container) {
      container.innerHTML = '<p style="padding:1rem;color:#999">无法加载目录</p>';
    }
    NB.initSidebarToggle();
    NB.initPreviewLinkInterceptor();
    NB.initSearch();
    NB.initTreeKeyboard();
    NB.syncHljsTheme();
    initGlobalKeyboard();
    var path = NB.getFileFromHash();
    if (path) {
      NB.loadFileByPath(path);
    }
    window.addEventListener('hashchange', function () {
      var p = NB.getFileFromHash();
      if (p) {
        NB.loadFileByPath(p);
      } else {
        NB.PLACEHOLDER_EL.style.display = 'block';
        NB.PREVIEW_EL.style.display = 'none';
        NB.PREVIEW_EL.innerHTML = '';
        NB.setActiveFile('');
      }
    });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
