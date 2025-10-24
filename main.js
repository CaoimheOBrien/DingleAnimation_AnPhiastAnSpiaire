window.onload = () => {
    'use strict';
  
    if ('serviceWorker' in navigator) {
      navigator.serviceWorker.register('./sw.js');
    }
  

document.getElementById('startBtn').addEventListener('click', function(){
  window.location.href='storyInfo.html';
})

document.getElementById('menuBtn').addEventListener('click', function(){
  window.location.href='menu.html';
})

}