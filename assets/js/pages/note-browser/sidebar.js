/**
 * 笔记浏览器：侧栏展开/收起与移动端 overlay
 */
import { MOBILE_BREAKPOINT, STORAGE_KEY } from './state.js';

export function isMobile() {
  return window.innerWidth <= MOBILE_BREAKPOINT;
}

function isDesktopCollapsed() {
  return document.body.classList.contains('note-sidebar-collapsed');
}

function updateToolbarToggle() {
  var btn = document.getElementById('note-toolbar-toggle');
  if (!btn) return;
  if (isMobile()) {
    var open = document.body.classList.contains('note-sidebar-open');
    btn.setAttribute('aria-expanded', String(open));
  } else {
    var collapsed = isDesktopCollapsed();
    btn.setAttribute('aria-expanded', String(!collapsed));
  }
}

function setDesktopCollapsed(collapsed) {
  if (collapsed) {
    document.body.classList.add('note-sidebar-collapsed');
  } else {
    document.body.classList.remove('note-sidebar-collapsed');
  }
  try {
    localStorage.setItem(STORAGE_KEY, collapsed ? '1' : '0');
  } catch (e) { /* ignore */ }
  updateToolbarToggle();
}

export function openSidebar() {
  document.body.classList.add('note-sidebar-open');
  var overlay = document.getElementById('note-sidebar-overlay');
  if (overlay) overlay.setAttribute('aria-hidden', 'false');
  var sidebar = document.getElementById('note-sidebar');
  if (sidebar) sidebar.setAttribute('aria-hidden', 'false');
  updateToolbarToggle();
}

export function closeSidebar() {
  document.body.classList.remove('note-sidebar-open');
  var overlay = document.getElementById('note-sidebar-overlay');
  if (overlay) overlay.setAttribute('aria-hidden', 'true');
  var sidebar = document.getElementById('note-sidebar');
  if (sidebar && isMobile()) sidebar.setAttribute('aria-hidden', 'true');
  updateToolbarToggle();
}

export function initSidebarToggle() {
  var toolbarToggle = document.getElementById('note-toolbar-toggle');
  var closeBtn = document.getElementById('note-sidebar-close');
  var overlay = document.getElementById('note-sidebar-overlay');
  var sidebar = document.getElementById('note-sidebar');
  if (sidebar && isMobile()) {
    sidebar.setAttribute('aria-hidden', 'true');
  }
  if (!isMobile()) {
    try {
      var stored = localStorage.getItem(STORAGE_KEY);
      if (stored === '1') setDesktopCollapsed(true);
    } catch (e) { /* ignore */ }
  }
  updateToolbarToggle();
  if (toolbarToggle) {
    toolbarToggle.addEventListener('click', function () {
      if (isMobile()) {
        var isOpen = document.body.classList.contains('note-sidebar-open');
        if (isOpen) closeSidebar();
        else openSidebar();
      } else {
        setDesktopCollapsed(!isDesktopCollapsed());
        updateToolbarToggle();
      }
    });
  }
  if (closeBtn) {
    closeBtn.addEventListener('click', closeSidebar);
  }
  if (overlay) {
    overlay.addEventListener('click', closeSidebar);
  }
}
