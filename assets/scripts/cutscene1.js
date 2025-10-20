//  Dingle Animation Game Prototype: An Phiast An Spiaire

// Author: Caoimhe O'Brien, Aoife Leahy and Natalia Ryl 
// Primary Programmer: Natalia Ryl
// Date: 09/10/2025

const canvas = document.getElementById("the_canvas")
const context = canvas.getContext("2d");

//--------------------------------------------------------------------------------------------------------------------

//Background image 
let backgroundImage = new Image(); 
backgroundImage.src = "assets/images/field.png"; // Will be changed out for our own assets 

//Phiast images
let phiastFrontImage = new Image();
phiastFrontImage.src = "assets/images/phiast_front.png";

//Cara images
let caraFrontImage = new Image();
caraFrontImage.src = "assets/images/cara_front.png";

//Cow image
let cowImage = new Image();
cowImage.src = "assets/images/cow.png";

//---------------------------------------------------------------------------------------------------------------------

let phiastX = -400; // start off screen left
let caraX = -530; // start off screen left
let cowX = -300; // starts off screen right

// let dialogue = "";
let cutsceneStep = 0;
let allowInput = false;

const dialogueLines = [
    "Cara: This is the field. Cow was last seen here.",
    "An Phiast: Good. If we can find her, we might finally get some answers about St. Cuan.",
    "Cara: Think she'll talk?",
    "An Phiast: Only if we find her before she bolts.",
    "*A shadow darts across the field...*",
    "Cara: There! That was Cow!",
    "An Phiast: She's hiding. We'll have to search the area.",
    "Find where Cow is hiding to confront her for information."
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
    context.drawImage(phiastFrontImage, phiastX, 100, 380, 600);
    context.drawImage(caraFrontImage, caraX, 350, 180, 250);
    context.drawImage(cowImage, cowX, 120, 200, 500);

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
function wrapText(ctx, text, x, y, maxWidth, lineHeight) {
  const words = text.split(" ");
  let line = "";
  for (let n = 0; n < words.length; n++) {
    const testLine = line + words[n] + " ";
    const metrics = ctx.measureText(testLine);
    const testWidth = metrics.width;
    if (testWidth > maxWidth && n > 0) {
      ctx.fillText(line, x, y);
      line = words[n] + " ";
      y += lineHeight;
    } else {
      line = testLine;
    }
  }
  ctx.fillText(line, x, y);
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

function update() {
    // Characters walk in
  if (cutsceneStep === 0) {
    phiastX += 5;
    caraX += 5;
    if (phiastX >= 400) {
      phiastX = 400;
      caraX = 270;
      cutsceneStep = 1;
      startTypingLine(dialogueLines[currentLineIndex]);
    }
  }

  // Cow run
  if (currentLineIndex === 4 && !isTyping) {
    cowX += 50;
    if (cowX > 1800) cowX = 1800;
  }

  if (currentLineIndex === dialogueLines.length - 1 && !isTyping) {
    phiastX += 10;
    caraX += 10;
  }
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
    if (phiastX > 1600) startPuzzle();
  }
}

function startPuzzle() {
    console.log("Puzzle 1 begins!");
}

//GAME LOOP
function gameLoop(){
    update();
    draw();
    requestAnimationFrame(gameLoop);
}
    
gameLoop();
