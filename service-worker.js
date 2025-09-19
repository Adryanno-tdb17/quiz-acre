const CACHE_NAME = "quiz-acre-v3";
const urlsToCache = [
  "/",
  "/index.html",
  "/manifest.json",
  "/perguntas.json",
  "/icon-192.png",
  "/icon-512.png",
  "/fundo.jpg"
];

self.addEventListener("install", event => {
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => cache.addAll(urlsToCache))
  );
});

self.addEventListener("activate", event => {
  event.waitUntil(
    caches.keys().then(keys => Promise.all(
      keys.filter(key => key !== CACHE_NAME).map(key => caches.delete(key))
    ))
  );
});

self.addEventListener("fetch", event => {
  event.respondWith(
    caches.match(event.request).then(resp => resp || fetch(event.request))
  );
});