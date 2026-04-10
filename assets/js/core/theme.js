import { getThemePref, setThemePref } from '../utils/storage.js';
import { $$ } from '../utils/dom.js';
import { emit } from '../utils/event-bus.js';

function getSystemPreference() {
  if (typeof window.matchMedia !== 'function') return 'light';
  return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
}

export function getCurrentTheme() {
  const stored = getThemePref();
  if (stored === 'light' || stored === 'dark') return stored;
  return getSystemPreference();
}

function applyTheme(theme) {
  document.documentElement.setAttribute('data-theme', theme);
  setThemePref(theme);
  updateToggleButtons(theme);
  emit('theme:change', theme);
}

function updateToggleButtons(theme) {
  $$('.theme-toggle').forEach(btn => {
    btn.textContent = theme === 'dark' ? '☀️' : '🌙';
    btn.setAttribute('aria-label', theme === 'dark' ? '切换到亮色模式' : '切换到暗色模式');
  });
}

export function toggleTheme() {
  const next = getCurrentTheme() === 'light' ? 'dark' : 'light';
  if (document.startViewTransition) {
    document.startViewTransition(() => applyTheme(next));
  } else {
    applyTheme(next);
  }
}

export function initTheme() {
  const theme = getCurrentTheme();
  applyTheme(theme);
  $$('.theme-toggle').forEach(btn => {
    btn.addEventListener('click', toggleTheme);
  });
}
