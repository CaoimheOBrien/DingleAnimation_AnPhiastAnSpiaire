//Service Worker 
const CACHE_NAME = "AnPhiastAnSpiaire";

const FILES_TO_CACHE =[
    "/DingleAnimation_AnPhiastAnSpiaire/",
    "/DingleAnimation_AnPhiastAnSpiaire/manifest.json",

    //Pages 
    "/DingleAnimation_AnPhiastAnSpiaire/index.html",
    "/DingleAnimation_AnPhiastAnSpiaire/puzzlePage.html",
    "/DingleAnimation_AnPhiastAnSpiaire/puzzlePage2.html",
    "/DingleAnimation_AnPhiastAnSpiaire/puzzlePage3.html",
    "/DingleAnimation_AnPhiastAnSpiaire/endscene.html",
    "/DingleAnimation_AnPhiastAnSpiaire/cutscene1.html",
    "/DingleAnimation_AnPhiastAnSpiaire/cutscene2.html",
    "/DingleAnimation_AnPhiastAnSpiaire/cutscene3.html",
    "/DingleAnimation_AnPhiastAnSpiaire/missionBoard.html",
    "/DingleAnimation_AnPhiastAnSpiaire/menu.html",
    "/DingleAnimation_AnPhiastAnSpiaire/storyInfo.html",



    //Scripts
    "/DingleAnimation_AnPhiastAnSpiaire/main.js",
    "/DingleAnimation_AnPhiastAnSpiaire/assets/scripts/puzzleScript.js",
    "/DingleAnimation_AnPhiastAnSpiaire/assets/scripts/puzzle2Script.js",
    "/DingleAnimation_AnPhiastAnSpiaire/assets/scripts/puzzle3Script.js",
    "/DingleAnimation_AnPhiastAnSpiaire/assets/scripts/endsceneScript.js",
    "/DingleAnimation_AnPhiastAnSpiaire/assets/scripts/cutscene1.js",
    "/DingleAnimation_AnPhiastAnSpiaire/assets/scripts/cutscene2.js",
    "/DingleAnimation_AnPhiastAnSpiaire/assets/scripts/cutscene3.js",
    "/DingleAnimation_AnPhiastAnSpiaire/assets/scripts/missionBoard.js",
    "/DingleAnimation_AnPhiastAnSpiaire/assets/scripts/level.js",


    //StyleSheets
    "/DingleAnimation_AnPhiastAnSpiaire/assets/style/stylesheet.css",

    //Icons 

    //Images 
    "/DingleAnimation_AnPhiastAnSpiaire/assets/images/anPhiast.png",
    "/DingleAnimation_AnPhiastAnSpiaire/assets/images/AnPhiastFinger.png",
    "/DingleAnimation_AnPhiastAnSpiaire/assets/images/AnPhiastHand.png",
    "/DingleAnimation_AnPhiastAnSpiaire/assets/images/Background_AnPhiastCave.png",
    "/DingleAnimation_AnPhiastAnSpiaire/assets/images/barrels.png",
    "/DingleAnimation_AnPhiastAnSpiaire/assets/images/bush_Puzzle1.png",
    "/DingleAnimation_AnPhiastAnSpiaire/assets/images/cara.png",
    "/DingleAnimation_AnPhiastAnSpiaire/assets/images/Chandelier.png",
    //"/DingleAnimation_AnPhiastAnSpiaire/assets/images/church.png",
    "/DingleAnimation_AnPhiastAnSpiaire/assets/images/cow.png",
    "/DingleAnimation_AnPhiastAnSpiaire/assets/images/decoyCow_Puzzle1.png",
    "/DingleAnimation_AnPhiastAnSpiaire/assets/images/field2.jpg",
    "/DingleAnimation_AnPhiastAnSpiaire/assets/images/fieldBG_Puzzle1.png",
    "/DingleAnimation_AnPhiastAnSpiaire/assets/images/fieldBG.png",
    "/DingleAnimation_AnPhiastAnSpiaire/assets/images/LakeCorrailli.png",
    "/DingleAnimation_AnPhiastAnSpiaire/assets/images/lamp.png",
    "/DingleAnimation_AnPhiastAnSpiaire/assets/images/missionBoardAll.png",
    "/DingleAnimation_AnPhiastAnSpiaire/assets/images/missionBoardCow.png",
    "/DingleAnimation_AnPhiastAnSpiaire/assets/images/missionBoardCowOut.png",
    "/DingleAnimation_AnPhiastAnSpiaire/assets/images/missionBoardCuan.png",
    "/DingleAnimation_AnPhiastAnSpiaire/assets/images/missionBoardCuanOut.png",
    "/DingleAnimation_AnPhiastAnSpiaire/assets/images/missionBoardSheep.png",
    "/DingleAnimation_AnPhiastAnSpiaire/assets/images/missionBoardSheepOut.png",
    "/DingleAnimation_AnPhiastAnSpiaire/assets/images/ohiast.png",
    "/DingleAnimation_AnPhiastAnSpiaire/assets/images/pot.png",
    "/DingleAnimation_AnPhiastAnSpiaire/assets/images/sheep.png",
    "/DingleAnimation_AnPhiastAnSpiaire/assets/images/StCuan.png",
    "/DingleAnimation_AnPhiastAnSpiaire/assets/images/town.png",
    "/DingleAnimation_AnPhiastAnSpiaire/assets/images/tree_Puzzle1.png",
    "/DingleAnimation_AnPhiastAnSpiaire/assets/images/well.png",




    //Audio -- to be added in full game

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