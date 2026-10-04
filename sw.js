const CACHE='sa-trip-v5-2';
const ASSETS=[
  './','./index.html','./styles.css','./app.js','./hero-safari.webp','./stays-banner.webp','./bookings-banner.webp','./illustrated-route-map-v2.webp','./explore-banner.webp','./eat-banner.webp','./try-banner.webp','./manifest.webmanifest'
];

async function networkFirst(request){
  try{
    const response = await fetch(request,{cache:'no-store'});
    if(response.ok){
      const cache = await caches.open(CACHE);
      await cache.put(request,response.clone());
    }
    return response;
  } catch(error){
    return (await caches.match(request)) || (await caches.match('./index.html'));
  }
}

async function cacheFirst(request){
  const cached = await caches.match(request);
  if(cached) return cached;
  const response = await fetch(request);
  if(response.ok){
    const cache = await caches.open(CACHE);
    await cache.put(request,response.clone());
  }
  return response;
}

self.addEventListener('install',event => event.waitUntil(
  caches.open(CACHE).then(cache => cache.addAll(ASSETS)).then(() => self.skipWaiting())
));

self.addEventListener('activate',event => event.waitUntil((async () => {
  const keys = await caches.keys();
  await Promise.all(keys.filter(key => key !== CACHE).map(key => caches.delete(key)));
  await self.clients.claim();
})()));

self.addEventListener('fetch',event => {
  if(event.request.method !== 'GET') return;
  const url = new URL(event.request.url);
  if(event.request.mode === 'navigate'){
    event.respondWith(networkFirst(event.request));
    return;
  }
  if(url.origin !== self.location.origin) return;
  const freshAppFile = ['.html','.css','.js','.webmanifest'].some(extension => url.pathname.endsWith(extension));
  event.respondWith(freshAppFile ? networkFirst(event.request) : cacheFirst(event.request));
});
