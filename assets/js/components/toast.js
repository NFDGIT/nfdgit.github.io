let container = null;

function ensureContainer() {
  if (container) return container;
  container = document.createElement('div');
  container.className = 'glass-toast-container';
  container.setAttribute('aria-live', 'polite');
  document.body.appendChild(container);
  return container;
}

export function showToast(message, { type = 'info', duration = 3000 } = {}) {
  const el = document.createElement('div');
  el.className = `glass-toast is-${type}`;
  el.textContent = message;
  el.setAttribute('role', 'status');

  ensureContainer().appendChild(el);

  setTimeout(() => {
    el.classList.add('is-leaving');
    el.addEventListener('animationend', () => el.remove());
  }, duration);

  return el;
}
