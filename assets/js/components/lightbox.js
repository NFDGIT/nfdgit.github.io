let lightboxEl = null;
let imgEl = null;
let currentIndex = 0;
let images = [];
let triggerElement = null;

function create() {
  lightboxEl = document.createElement('div');
  lightboxEl.className = 'glass-lightbox';
  lightboxEl.setAttribute('role', 'dialog');
  lightboxEl.setAttribute('aria-label', '图片预览');
  lightboxEl.innerHTML = `
    <button class="glass-lightbox-close" aria-label="关闭">✕</button>
    <button class="glass-lightbox-prev" aria-label="上一张">‹</button>
    <img class="glass-lightbox-img" alt="">
    <button class="glass-lightbox-next" aria-label="下一张">›</button>
  `;
  document.body.appendChild(lightboxEl);

  imgEl = lightboxEl.querySelector('.glass-lightbox-img');
  lightboxEl.querySelector('.glass-lightbox-close').addEventListener('click', close);
  lightboxEl.querySelector('.glass-lightbox-prev').addEventListener('click', prev);
  lightboxEl.querySelector('.glass-lightbox-next').addEventListener('click', next);
  lightboxEl.addEventListener('click', e => {
    if (e.target === lightboxEl) close();
  });

  document.addEventListener('keydown', onKeydown);
  setupTouch();
}

function onKeydown(e) {
  if (!lightboxEl?.classList.contains('is-open')) return;
  if (e.key === 'Escape') close();
  if (e.key === 'ArrowLeft') prev();
  if (e.key === 'ArrowRight') next();
}

function setupTouch() {
  let startX = 0;
  imgEl.addEventListener('touchstart', e => { startX = e.touches[0].clientX; }, { passive: true });
  imgEl.addEventListener('touchend', e => {
    const dx = e.changedTouches[0].clientX - startX;
    if (Math.abs(dx) > 50) {
      dx > 0 ? prev() : next();
    }
  }, { passive: true });
}

export function open(imageList, index = 0) {
  if (!lightboxEl) create();
  images = imageList;
  currentIndex = index;
  triggerElement = document.activeElement;
  show();
  lightboxEl.classList.add('is-open');
  document.body.style.overflow = 'hidden';
  lightboxEl.querySelector('.glass-lightbox-close').focus();
}

export function close() {
  if (!lightboxEl) return;
  lightboxEl.classList.remove('is-open');
  document.body.style.overflow = '';
  triggerElement?.focus();
}

function show() {
  if (!images.length) return;
  imgEl.src = images[currentIndex].src || images[currentIndex];
  imgEl.alt = images[currentIndex].alt || '';
}

function prev() {
  currentIndex = (currentIndex - 1 + images.length) % images.length;
  show();
}

function next() {
  currentIndex = (currentIndex + 1) % images.length;
  show();
}
