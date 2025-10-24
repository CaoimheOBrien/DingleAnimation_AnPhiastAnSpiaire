window.onload = () => {
    'use strict';
  
    if ('serviceWorker' in navigator) {
      navigator.serviceWorker.register('./sw.js');
    }
  }

document.getElementById('startBtn').addEventListener('click', function(){
  window.location.href='storyInfo.html';
})

document.getElementById('menuBtn').addEventListener('click', function(){
  window.location.href='menu.html';
})

document.getElementById('3').addEventListener('click', function(){
  window.location.href='puzzlePage3.html';
})


// Check what level it is.
import { GameState } from "/assets/scripts/level.js";

console.log("Current level is", GameState.level);
