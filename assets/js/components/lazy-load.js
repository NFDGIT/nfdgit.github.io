const defaultOptions = {
  rootMargin: '200px 0px',
  threshold: 0.01,
};

export function initLazyLoad(selector = 'img[data-src]', options = {}) {
  const opts = { ...defaultOptions, ...options };

  if (!('IntersectionObserver' in window)) {
    document.querySelectorAll(selector).forEach(load);
    return;
  }

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        load(entry.target);
        observer.unobserve(entry.target);
      }
    });
  }, opts);

  document.querySelectorAll(selector).forEach(el => observer.observe(el));
  return observer;
}

function load(el) {
  if (el.dataset.src) {
    el.src = el.dataset.src;
    el.removeAttribute('data-src');
  }
  el.classList.add('is-loaded');
}
