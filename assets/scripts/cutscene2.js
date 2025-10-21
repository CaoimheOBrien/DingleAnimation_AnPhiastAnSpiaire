//  Dingle Animation Game Prototype: An Phiast An Spiaire

// Author: Caoimhe O'Brien, Aoife Leahy and Natalia Ryl 
// Primary Programmer: Natalia Ryl
// Date: 20/10/2025

const canvas = document.getElementById("the_canvas")
const context = canvas.getContext("2d");

//--------------------------------------------------------------------------------------------------------------------

//Background image 
// let backgroundImage = new Image(); 
// backgroundImage.src = "assets/images/field.png"; 

//Phiast images
let phiastFrontImage = new Image();
phiastFrontImage.src = "assets/images/phiast_front.png";

//Cara images
let caraFrontImage = new Image();
caraFrontImage.src = "assets/images/cara_front.png";

//---------------------------------------------------------------------------------------------------------------------

let phiastX = -400; // start off screen left
let caraX = -530; // start off screen left