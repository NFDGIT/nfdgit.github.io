/**
 * 笔记浏览器：入口（manifest、hash、初始化）
 */
import { PREVIEW_EL, PLACEHOLDER_EL } from './state.js';
import { isMobile, openSidebar, closeSidebar, initSidebarToggle } from './sidebar.js';
import { syncHljsTheme, getFileFromHash, initPreviewLinkInterceptor, loadFileByPath, setActiveFile } from './preview.js';
import { renderTree, initTreeKeyboard } from './tree.js';
import { renderSidebarStats, initSearch } from './search.js';

function initGlobalKeyboard() {
  var searchInput = document.getElementById('note-search');

  document.addEventListener('keydown', function (e) {
    var tag = (e.target.tagName || '').toLowerCase();
    var isInput = tag === 'input' || tag === 'textarea' || e.target.isContentEditable;

    if (e.key === '/' && !isInput) {
      e.preventDefault();
      if (searchInput) {
        if (isMobile()) openSidebar();
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
      if (isMobile() && document.body.classList.contains('note-sidebar-open')) {
        closeSidebar();
        return;
      }
    }
  });
}

export function initNoteBrowser() {
  var container = document.getElementById('note-tree');
  var data = window.NOTE_MANIFEST;
  if (container && data && data.children) {
    renderTree(data.children, container);
    renderSidebarStats(data.children);
  } else if (container) {
    container.innerHTML = '<p style="padding:1rem;color:#999">无法加载目录</p>';
  }
  initSidebarToggle();
  initPreviewLinkInterceptor();
  initSearch();
  initTreeKeyboard();
  syncHljsTheme();
  initGlobalKeyboard();
  var path = getFileFromHash();
  if (path) {
    loadFileByPath(path);
  }
  window.addEventListener('hashchange', function () {
    var p = getFileFromHash();
    if (p) {
      loadFileByPath(p);
    } else {
      PLACEHOLDER_EL.style.display = 'block';
      PREVIEW_EL.style.display = 'none';
      PREVIEW_EL.innerHTML = '';
      setActiveFile('');
    }
  });
}
