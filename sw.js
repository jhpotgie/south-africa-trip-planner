const CACHE='sa-trip-v4-6';
const ASSETS=[
  './','./index.html','./styles.css','./app.js','./hero-safari.webp','./stays-banner.webp','./bookings-banner.webp','./illustrated-route-map-v2.webp','./explore-banner.webp','./eat-banner.webp','./manifest.webmanifest'
];
self.addEventListener('install',e=>e.waitUntil(caches.open(CACHE).then(c=>c.addAll(ASSETS))));
self.addEventListener('activate',e=>e.waitUntil(caches.keys().then(keys=>Promise.all(keys.filter(k=>k!==CACHE).map(k=>caches.delete(k))))));
self.addEventListener('fetch',e=>e.respondWith(caches.match(e.request).then(r=>r||fetch(e.request))));
