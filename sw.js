/* Prayer Forest PWA: network-first live prayers, offline guidance only. */
const CACHE = 'pray1-offline-v1';
const ROOT = new URL('./',self.location.href);
const OFFLINE = new URL('./offline.html',self.location.href);
self.addEventListener('install', event => {
  event.waitUntil(caches.open(CACHE).then(cache => cache.addAll([OFFLINE.href,new URL('./icon-192.png',self.location.href).href])).then(()=>self.skipWaiting()));
});
self.addEventListener('activate', event => {
  event.waitUntil(caches.keys().then(keys=>Promise.all(keys.filter(key=>key.startsWith('pray1-offline-')&&key!==CACHE).map(key=>caches.delete(key)))).then(()=>self.clients.claim()));
});
self.addEventListener('fetch', event => {
  const request=event.request;
  if(request.mode!=='navigate')return;
  const url=new URL(request.url);
  if(url.origin!==ROOT.origin||!url.pathname.startsWith(ROOT.pathname))return;
  event.respondWith(fetch(request).catch(async()=>await caches.match(OFFLINE.href)||Response.error()));
});
