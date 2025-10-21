//  Dingle Animation Game Prototype: An Phiast An Spiaire

// Author: Caoimhe O'Brien, Aoife Leahy and Natalia Ryl 
// Primary Programmer: Natalia Ryl
// Date: 20/10/2025

const canvas = document.getElementById("the_canvas")
const context = canvas.getContext("2d");

//--------------------------------------------------------------------------------------------------------------------

//Background images
let fieldImage = new Image(); 
fieldImage.src = "assets/images/fieldBG_Puzzle1.png";

let townImage = new Image();
townImage.src = "assets/images/townTemporary.png";

//Phiast image
let phiastImage = new Image();
phiastImage.src = "assets/images/phiast.png";

//Cara image
let caraImage = new Image();
caraImage.src = "assets/images/cara.png";

//Cow image
let cowImage = new Image();
cowImage.src = "assets/images/cow.png";

//Sheep image
let sheepImage = new Image();
sheepImage.src = "assets/images/sheep.png";

//---------------------------------------------------------------------------------------------------------------------

let phiastX = 400; // start middle screen
let caraX = 270; // start middle screen
let cowX = 550; // start beside main characters
let sheepX = -300; // start off screen left

let cutsceneStep = 0;
let allowInput = false;

const dialogueLines = [
    "An Phiast: There you are Cow!",
    "Cara: You've been hard to track down.",
    "Cow: Hmph. I didn't realise I need to report my every move to spies now.",
    "An Phiast: You've been stirring up trouble. What's going on?",
    "Cow: Trouble? Oh, please. Let's just say... something big is coming. And I get the front row seat.",
    "Cara: What are you talking about?",
    "Cow: Wouldn't you ike to know? Maybe ask Sheep - he's terribleat keeping secrets.",
    "*A dark blur moves across the field...*",
    "An Phiast: That was Sheep!",
    "Cow: And off he goes.. You'd better hurry if you want answers.",
    "*Cow smirks and walks away towards the hills.*",
    "Cara: She's hiding something. I can feel it.",
    "An Phiast: Then we find Sheep. Maybe he'll slip up and tell us what she wouldn't.",
    "*They start walking toward the town...*",
    "*A short while later, in the town...*",
    "Cara: Keep an eye out. Sheep's bound to stand out here.",
    "An Phiast: Let's split up and look - the sooner we find him, the sooner we know what's going on.",
    "Find Sheep before he dissapears again."
];

let currentLineIndex = 0;
let typedText = "";
let typingSpeed = 30;
let typingTimer = 0;
let isTyping = false;

//---------------------------------------------------------------------------------------------------------------------

function draw(){
    //Clearing space 
    context.clearRect(0,0, canvas.width, canvas.height)

    //Background
    context.drawImage(fieldImage, 0, 0, 1500, 700); 

    //Characters
    context.drawImage(phiastImage, phiastX, 100, 380, 600);
    context.drawImage(caraImage, caraX, 350, 180, 250);
    context.drawImage(cowImage, cowX, 120, 200, 500);
    context.drawImage(sheepImage, sheepX, 120, 200, 500);

    //dialogue box
    // if (typedText !== "") {
    //     context.fillStyle = "rgba(0, 0, 0, 0.8)";
    //     context.fillRect(80, 540, 1340, 140);
    //     context.strokeStyle = "white";
    //     context.lineWidth = 4;
    //     context.strokeRect(80, 540, 1340, 140);

    //     context.fillStyle = "white";
    //     context.font = "22px Arial";
    //     wrapText(context, typedText, 110, 580, 1220, 28);

    //     if (allowInput) {
    //         context.font = "18px Arial";
    //         context.fillText("(Press Enter to continue...)", 1100, 640);
    //     }
    // }
}


//GAME LOOP
function gameLoop(){
    update();
    draw();
    requestAnimationFrame(gameLoop);
}
    
gameLoop();