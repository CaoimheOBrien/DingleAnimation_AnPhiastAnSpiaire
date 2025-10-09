//  Dingle Animation Game Prototype: An Phiast An Spiaire

// Author: Caoimhe O'Brien, Aoife Leahy and Natalia Ryl 
// Primary Programmer: Natalia Ryl
// Date: 09/10/2025

const canvas = document.getElementById("the_canvas")
const context = canvas.getContext("2d");

//Background image 
let backgroundImage = new Image(); 
backgroundImage.src = "assets/images/temporaryBG_Puzzle1.jpg"; // Will be changed out for our own assets 

//Phiast Image
let phiastFrontImage = new Image();
phiastFrontImage.src = "assets/images/phiast_front.png";

function draw(){
    //Clearing space 
    context.clearRect(0,0, canvas.width, canvas.height)

    //Background image 
    context.drawImage(backgroundImage, 0, 0, 1500, 700); 
}

//GAME LOOP
function gameLoop(){
    draw();
    window.requestAnimationFrame(gameLoop);
}
    
window.requestAnimationFrame(gameLoop);
