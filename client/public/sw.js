// Simple service worker for PWA support
const CACHE_NAME = 'warlok-tcg-v1';
const urlsToCache = [
  '/',
  '/manifest.webmanifest',
  '/icon-192x192.svg',
  '/icon-512x512.svg'
];

self.addEventListener('install', function(event) {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(function(cache) {
        return cache.addAll(urlsToCache);
      })
  );
});

self.addEventListener('fetch', function(event) {
  event.respondWith(
    caches.match(event.request)
      .then(function(response) {
        // Return cached version or fetch from network
        return response || fetch(event.request);
      }
    )
  );
});
