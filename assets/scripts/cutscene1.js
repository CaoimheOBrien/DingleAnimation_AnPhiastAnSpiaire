//  Dingle Animation Game Prototype: An Phiast An Spiaire

// Author: Caoimhe O'Brien, Aoife Leahy and Natalia Ryl 
// Primary Programmer: Natalia Ryl. 
// Date: 09/10/2025

const canvas = document.getElementById("the_canvas")
const context = canvas.getContext("2d");

import { GameState } from "./level.js";

GameState.level = 1; //Makes sure Game Level is 1 for the first cut scene 
//--------------------------------------------------------------------------------------------------------------------

//Background image 
let backgroundImage = new Image(); 
backgroundImage.src = "assets/images/fieldBG.png";

//Phiast image
let phiastImage = new Image();
phiastImage.src = "assets/images/phiast.png";

//Cara image
let caraImage = new Image();
caraImage.src = "assets/images/cara.png";

//Cow image
let cowImage = new Image();
cowImage.src = "assets/images/cow.png";

//---------------------------------------------------------------------------------------------------------------------

let phiastX = -400; // start off screen left
let caraX = -530; // start off screen left
let cowX = -300; // starts off screen right

let cutsceneStep = 0;
let cutSceneEnded = false;
let allowInput = false;

const dialogueLines = [
    "Cara: This is the field. Cow was last seen here.",
    "An Phiast: Then we're in the right place. Something's going on between her and Sheep.",
    "Cara: You think they are working together?",
    "An Phiast: Maybe.. But we'll need to find Cow first to know for sure.",
    "*A shadow darts across the field...*",
    "Cara: There! That was Cow!",
    "An Phiast: She's hiding. We'll have to search the area.",
    "Find where Cow is hiding to learn what she and Sheep are planning."
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
    context.drawImage(backgroundImage, 0, 0, 1500, 700); 

    //Characters
    context.drawImage(cowImage, cowX, 120, 200, 500);
    context.drawImage(phiastImage, phiastX, 100, 380, 600);
    context.drawImage(caraImage, caraX, 350, 180, 250);


    //dialogue box
    if (typedText !== "") {
        context.fillStyle = "rgba(0, 0, 0, 0.8)";
        context.fillRect(80, 540, 1340, 140);
        context.strokeStyle = "white";
        context.lineWidth = 4;
        context.strokeRect(80, 540, 1340, 140);

        context.fillStyle = "white";
        context.font = "22px Arial";
        wrapText(context, typedText, 110, 580, 1220, 28);

        if (allowInput) {
            context.font = "18px Arial";
            context.fillText("(Press Enter to continue...)", 1100, 640);
        }
    }
}

//TEXT WRAPPING HELPER
function wrapText(context, text, x, y, maxWidth, lineHeight) {
  const words = text.split(" ");
  let line = "";
  for (let n = 0; n < words.length; n++) {
    const testLine = line + words[n] + " ";
    const metrics = context.measureText(testLine);
    const testWidth = metrics.width;
    if (testWidth > maxWidth && n > 0) {
      context.fillText(line, x, y);
      line = words[n] + " ";
      y += lineHeight;
    } else {
      line = testLine;
    }
  }
  context.fillText(line, x, y);
}

//TYPEWRITER FUNCTION
function startTypingLine(line) {
  typedText = "";
  isTyping = true;
  typingTimer = 0;

  function typeStep() {
    if (typedText.length < line.length) {
      typedText += line[typedText.length];
      setTimeout(typeStep, typingSpeed);
    } else {
      isTyping = false;
      allowInput = true;
    }
  }

  typeStep();
}

startTypingLine(dialogueLines[currentLineIndex]);

function update() {
    let moving = false; // track if any movement is happening

    // Characters walk in
    if (cutsceneStep === 0) {
        phiastX += 5;
        caraX += 5;
        moving = true;

        if (phiastX >= 400) {
            phiastX = 400;
            caraX = 270;
            cutsceneStep = 1;
            moving = false; // stop moving once in position
        }
    }

    // Cow runs across screen after line 4
    if (currentLineIndex >= 4 && !isTyping) {
        cowX += 15;
        moving = true;
        if (cowX > 1800) {
            cowX = 1800;
            moving = false;
        }
    }

    // Phiast & Cara walk off right at last line
    if (currentLineIndex === dialogueLines.length - 1 && !isTyping) {
        phiastX += 7;
        caraX += 7;
        moving = true;
    }
     if (phiastX >= 1800  && caraX >=1700){
      startPuzzle();
    }

    // Disable input while movement or typing is happening
    allowInput = !moving && !isTyping;
}

window.addEventListener("keydown", (e) => {
    if (e.key === "Enter" && allowInput) {
        advanceDialogue();
    }
});

function advanceDialogue() {
    if (isTyping) {
    // Finish current line instantly
    typedText = dialogueLines[currentLineIndex];
    isTyping = false;
    allowInput = true;
    return;
  }

  allowInput = false;
  currentLineIndex++;

  // Trigger actions at specific lines
  if (currentLineIndex === 4) { // Cow runs
    cowX = -300;
  }

  if (currentLineIndex < dialogueLines.length) {
    startTypingLine(dialogueLines[currentLineIndex]);
  } else {
    typedText = "";
    if (phiastX >= 1600){
      
    }
  }
}

function startPuzzle() {
    console.log("Puzzle 1 begins!");
    setTimeout(() => {
      window.location.href="missionBoard.html";
    }, 2000);
}

//GAME LOOP
function gameLoop(){
    update();
    draw();
    requestAnimationFrame(gameLoop);
}

gameLoop();
