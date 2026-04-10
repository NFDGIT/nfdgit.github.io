import { getLargeTextPref, setLargeTextPref } from '../utils/storage.js';
import { isMobile, $$ } from '../utils/dom.js';

function apply(on) {
  if (on) {
    document.documentElement.setAttribute('data-large-text', 'on');
  } else {
    document.documentElement.removeAttribute('data-large-text');
  }
  updateButtons(on);
}

function updateButtons(on) {
  $$('.large-text-toggle').forEach(btn => {
    btn.textContent = on ? 'A-' : 'A+';
    btn.setAttribute('aria-label', on ? '关闭大字模式' : '开启大字模式');
  });
}

function applyByViewport() {
  if (isMobile()) {
    apply(getLargeTextPref());
  } else {
    document.documentElement.removeAttribute('data-large-text');
    updateButtons(false);
  }
}

export function toggleLargeText() {
  if (!isMobile()) return;
  const next = !getLargeTextPref();
  setLargeTextPref(next);
  apply(next);
}

export function initLargeText() {
  applyByViewport();
  $$('.large-text-toggle').forEach(btn => {
    btn.addEventListener('click', toggleLargeText);
  });
  const mq = window.matchMedia?.('(max-width: 768px)');
  if (mq?.addEventListener) {
    mq.addEventListener('change', applyByViewport);
  }
}
