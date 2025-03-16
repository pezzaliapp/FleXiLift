const CACHE_NAME = "flexilift-cache-v1";
const urlsToCache = [
    "index.html",
    "style.css",
    "app.js",
    "manifest.json",
    "assets/FleXiLift-192.png",
    "assets/FleXiLift-512.png"
];

self.addEventListener("install", (event) => {
    event.waitUntil(
        caches.open(CACHE_NAME).then((cache) => {
            return cache.addAll(urlsToCache);
        })
    );
});

self.addEventListener("fetch", (event) => {
    event.respondWith(
        caches.match(event.request).then((response) => {
            return response || fetch(event.request);
        })
    );
});

self.addEventListener("activate", (event) => {
    event.waitUntil(
        caches.keys().then((cacheNames) => {
            return Promise.all(
                cacheNames.filter((cache) => cache !== CACHE_NAME)
                .map((cache) => caches.delete(cache))
            );
        })
    );
});
