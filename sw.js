//Service Worker 
const CACHE_NAME = "AnPhiastAnSpiaire";

const FILES_TO_CACHE =[
    "/DingleAnimation_AnPhiastAnSpiaire/",
    "/DingleAnimation_AnPhiastAnSpiaire/manifest.json",

    //Pages 
    "/DingleAnimation_AnPhiastAnSpiaire/index.html",
    "/DingleAnimation_AnPhiastAnSpiaire/puzzlePage.html",

    //Scripts
    "/DingleAnimation_AnPhiastAnSpiaire/main.js",
    "/DingleAnimation_AnPhiastAnSpiaire/assets/puzzleScript.js",

    //StyleSheets
    "/DingleAnimation_AnPhiastAnSpiaire/assets/style/stylesheet.css",

    //Icons 

    //Assets 

    //Images 


    //Audio 

];

// Install event: cache files
self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(FILES_TO_CACHE);
    })
  );
  self.skipWaiting();
});

// Activate event: clean up old caches
self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches.keys().then((keyList) =>
      Promise.all(
        keyList.map((key) => {
          if (key !== CACHE_NAME) {
            return caches.delete(key);
          }
        })
      )
    )
  );
  self.clients.claim();
});

// Fetch event: serve cached files when offline
self.addEventListener("fetch", (event) => {
  event.respondWith(
    caches.match(event.request).then((response) => {
      return response || fetch(event.request);
    })
  );
});