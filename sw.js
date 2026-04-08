// ==========================================
// SERVICE WORKER – Dairy Delight PWA
// Enables offline caching for app shell
// ==========================================

const CACHE_NAME = 'dairy-delight-v6';

// Files to cache (app shell)
const STATIC_ASSETS = [
  './',
  './index.html',
  './login.html',
  './customer.html',
  './delivery.html',
  './admin.html',
  './style.css',
  './manifest.json'
];

// ---- INSTALL: Cache app shell ----
self.addEventListener('install', (event) => {
  console.log('[SW] Installing...');
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(STATIC_ASSETS);
    })
  );
  self.skipWaiting();
});

// ---- ACTIVATE: Clear old caches ----
self.addEventListener('activate', (event) => {
  console.log('[SW] Activating...');
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames
          .filter(name => name !== CACHE_NAME)
          .map(name => caches.delete(name))
      );
    })
  );
  self.clients.claim();
});

// ---- FETCH: Cache first for static, network first for API ----
self.addEventListener('fetch', (event) => {
  const url = new URL(event.request.url);

  // Skip Firebase API calls (always need network)
  if (url.hostname.includes('firebase') || url.hostname.includes('google')) {
    event.respondWith(fetch(event.request));
    return;
  }

  // Cache-first strategy for static assets
  event.respondWith(
    caches.match(event.request).then((cached) => {
      if (cached) return cached;
      return fetch(event.request).then((response) => {
        // Cache new static responses
        if (response.status === 200) {
          const cloned = response.clone();
          caches.open(CACHE_NAME).then(cache => cache.put(event.request, cloned));
        }
        return response;
      }).catch(() => {
        // If network fails and nothing cached, return offline page
        if (event.request.mode === 'navigate') {
          return caches.match('/index.html');
        }
      });
    })
  );
});
