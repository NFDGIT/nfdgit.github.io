const CACHE_VERSION = 'v2';
const CORE_CACHE = `${CACHE_VERSION}-core`;
const CONTENT_CACHE = `${CACHE_VERSION}-content`;

const CORE_ASSETS = [
  '/',
  '/index.html',
  '/offline.html',
  '/assets/css/theme.css',
  '/assets/css/pages/home.css',
  '/assets/js/theme-init.js',
  '/assets/js/core/shell.js',
  '/assets/js/core/theme.js',
  '/assets/js/core/large-text.js',
  '/assets/js/core/router.js',
  '/assets/js/utils/dom.js',
  '/assets/js/utils/storage.js',
  '/assets/js/utils/event-bus.js',
  '/assets/js/legacy.js',
];

self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CORE_CACHE)
      .then(cache => cache.addAll(CORE_ASSETS))
      .then(() => self.skipWaiting())
  );
});

self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(keys =>
      Promise.all(
        keys
          .filter(key => key !== CORE_CACHE && key !== CONTENT_CACHE)
          .map(key => caches.delete(key))
      )
    ).then(() => self.clients.claim())
  );
});

self.addEventListener('fetch', event => {
  const url = new URL(event.request.url);

  if (event.request.method !== 'GET') return;
  if (url.origin !== self.location.origin) return;

  const isNote = url.pathname.startsWith('/note/');
  const isManifest = url.pathname.includes('manifest.');

  if (isNote || isManifest) {
    event.respondWith(networkFirst(event.request, CONTENT_CACHE));
  } else {
    event.respondWith(cacheFirst(event.request, CORE_CACHE));
  }
});

async function cacheFirst(request, cacheName) {
  const cached = await caches.match(request);
  if (cached) return cached;
  try {
    const response = await fetch(request);
    if (response.ok) {
      const cache = await caches.open(cacheName);
      cache.put(request, response.clone());
    }
    return response;
  } catch {
    return caches.match('/offline.html');
  }
}

async function networkFirst(request, cacheName) {
  try {
    const response = await fetch(request);
    if (response.ok) {
      const cache = await caches.open(cacheName);
      cache.put(request, response.clone());
    }
    return response;
  } catch {
    const cached = await caches.match(request);
    if (cached) return cached;
    return caches.match('/offline.html');
  }
}
