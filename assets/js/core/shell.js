import { initTheme, toggleTheme, getCurrentTheme } from './theme.js';
import { initLargeText, toggleLargeText } from './large-text.js';
import { getBreadcrumbs, getActiveNavSection, getRelativeRoot } from './router.js';

const NAV_ITEMS = [
  { id: 'note', label: '笔记', path: 'note/index.html' },
  { id: 'games', label: '游戏', path: 'games/index.html' },
  { id: 'album', label: '相册', path: 'album/index.html' },
  { id: 'tools', label: '工具', path: 'tools/index.html' },
  { id: 'guide', label: '教程', path: 'guide/index.html' },
];

function getConfig() {
  const body = document.body;
  return {
    nav: body.dataset.shellNav !== 'false' && body.dataset.shellNav !== 'custom',
    breadcrumb: body.dataset.shellBreadcrumb || null,
    footer: body.dataset.shellFooter !== 'false',
  };
}

function injectNav() {
  const root = getRelativeRoot();
  const activeSection = getActiveNavSection();

  const nav = document.createElement('nav');
  nav.className = 'shell-nav';
  nav.setAttribute('aria-label', '站点导航');

  const brand = document.createElement('a');
  brand.className = 'shell-nav-brand';
  brand.href = root + 'index.html';
  brand.textContent = '🏠';
  brand.setAttribute('aria-label', '首页');

  const links = document.createElement('div');
  links.className = 'shell-nav-links';
  NAV_ITEMS.forEach(item => {
    const a = document.createElement('a');
    a.className = 'shell-nav-link' + (activeSection === item.id ? ' is-active' : '');
    a.href = root + item.path;
    a.textContent = item.label;
    links.appendChild(a);
  });

  const actions = document.createElement('div');
  actions.className = 'shell-nav-actions';

  const themeBtn = document.createElement('button');
  themeBtn.type = 'button';
  themeBtn.className = 'theme-toggle';
  themeBtn.setAttribute('aria-label', '切换主题');
  themeBtn.textContent = getCurrentTheme() === 'dark' ? '☀️' : '🌙';
  themeBtn.addEventListener('click', toggleTheme);

  const largeBtn = document.createElement('button');
  largeBtn.type = 'button';
  largeBtn.className = 'large-text-toggle';
  largeBtn.setAttribute('aria-label', '开启大字模式');
  largeBtn.textContent = 'A+';
  largeBtn.addEventListener('click', toggleLargeText);

  const hamburger = document.createElement('button');
  hamburger.type = 'button';
  hamburger.className = 'shell-hamburger';
  hamburger.setAttribute('aria-label', '打开导航菜单');
  hamburger.setAttribute('aria-expanded', 'false');
  hamburger.textContent = '☰';

  actions.append(largeBtn, themeBtn, hamburger);
  nav.append(brand, links, actions);

  const overlay = document.createElement('div');
  overlay.className = 'shell-menu-overlay';

  const drawer = document.createElement('div');
  drawer.className = 'shell-menu-drawer';
  drawer.setAttribute('role', 'dialog');
  drawer.setAttribute('aria-label', '导航菜单');

  const closeBtn = document.createElement('button');
  closeBtn.type = 'button';
  closeBtn.className = 'shell-menu-close';
  closeBtn.setAttribute('aria-label', '关闭导航菜单');
  closeBtn.textContent = '✕';
  drawer.appendChild(closeBtn);

  NAV_ITEMS.forEach(item => {
    const a = document.createElement('a');
    a.className = 'shell-nav-link' + (activeSection === item.id ? ' is-active' : '');
    a.href = root + item.path;
    a.textContent = item.label;
    drawer.appendChild(a);
  });

  document.body.prepend(drawer, overlay, nav);
  document.body.classList.add('has-shell-nav');

  let previousFocus = null;

  function openMenu() {
    previousFocus = document.activeElement;
    overlay.classList.add('is-open');
    drawer.classList.add('is-open');
    hamburger.setAttribute('aria-expanded', 'true');
    document.body.style.overflow = 'hidden';
    closeBtn.focus();
  }

  function closeMenu() {
    overlay.classList.remove('is-open');
    drawer.classList.remove('is-open');
    hamburger.setAttribute('aria-expanded', 'false');
    document.body.style.overflow = '';
    previousFocus?.focus();
  }

  hamburger.addEventListener('click', openMenu);
  closeBtn.addEventListener('click', closeMenu);
  overlay.addEventListener('click', closeMenu);
  document.addEventListener('keydown', e => {
    if (e.key === 'Escape' && drawer.classList.contains('is-open')) closeMenu();
  });
}

function injectBreadcrumb(customLabel) {
  const crumbs = getBreadcrumbs(customLabel);
  if (!crumbs.length) return;

  const wrap = document.createElement('div');
  wrap.className = 'shell-breadcrumb-wrap';

  const nav = document.createElement('nav');
  nav.className = 'glass-breadcrumb';
  nav.setAttribute('aria-label', '面包屑');

  crumbs.forEach((crumb, i) => {
    if (i > 0) {
      const sep = document.createElement('span');
      sep.className = 'glass-breadcrumb-sep';
      sep.textContent = '›';
      sep.setAttribute('aria-hidden', 'true');
      nav.appendChild(sep);
    }
    if (crumb.href && !crumb.isCurrent) {
      const a = document.createElement('a');
      a.className = 'glass-breadcrumb-item';
      a.href = crumb.href;
      a.textContent = crumb.label;
      nav.appendChild(a);
    } else {
      const span = document.createElement('span');
      span.className = 'glass-breadcrumb-item' + (crumb.isCurrent ? ' is-current' : '');
      span.textContent = crumb.label;
      if (crumb.isCurrent) span.setAttribute('aria-current', 'page');
      nav.appendChild(span);
    }
  });

  wrap.appendChild(nav);

  const main = document.querySelector('main') || document.querySelector('.shell-breadcrumb-wrap');
  if (main) {
    main.parentNode.insertBefore(wrap, main);
  } else {
    const navEl = document.querySelector('.shell-nav');
    if (navEl) navEl.after(wrap);
  }
}

function injectFooter() {
  const footer = document.createElement('footer');
  footer.className = 'shell-footer';
  footer.innerHTML = `<a href="#" onclick="window.scrollTo({top:0,behavior:'smooth'});return false;">↑ 回到顶部</a> · © ${new Date().getFullYear()} 个人主页`;
  document.body.appendChild(footer);
}

function registerServiceWorker() {
  if ('serviceWorker' in navigator) {
    const root = getRelativeRoot();
    navigator.serviceWorker.register(root + 'sw.js').catch(() => {});
  }
}

export function initShell() {
  const config = getConfig();

  if (config.nav) {
    injectNav();
  }

  initTheme();
  initLargeText();

  if (config.breadcrumb !== 'false' && config.nav) {
    const customLabel = document.body.dataset.shellBreadcrumb || null;
    injectBreadcrumb(customLabel !== '' ? customLabel : null);
  }

  if (config.footer) {
    injectFooter();
  }

  registerServiceWorker();
}
