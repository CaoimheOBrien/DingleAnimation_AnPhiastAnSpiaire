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

let phiastX = 400; // start centre screen
let caraX = 270; // start centre screen
let cowX = 800; // start beside main characters
let sheepX = -300; // start off screen left

let onTown = false; // switch background

let cutsceneStep = 0;
let allowInput = false;

const dialogueLines = [
    "An Phiast: There you are Cow!",
    "Cara: You've been hard to track down.",
    "Cow: Hmph. I didn't realise I need to report my every move to spies now.",
    "An Phiast: You've been stirring up trouble. What's going on?",
    "Cow: Trouble? Oh, please. Let's just say... something big is coming. And I get the front row seat.",
    "Cara: What are you talking about?",
    "Cow: Wouldn't you like to know? Maybe ask Sheep - he's terrible at keeping secrets.",
    "*A dark blur moves across the field...*",
    "An Phiast: That was Sheep!",
    "Cow: And off he goes.. You'd better hurry if you want answers.",
    "*Cow smirks and walks away towards the hills.*",
    "Cara: She's hiding something. I can feel it.",
    "An Phiast: Then we find Sheep. Maybe he'll slip up and tell us what she wouldn't.",
    "*They start walking toward the town...*",
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
    if(onTown) context.drawImage(townImage, 0, 0, 1500, 700);
    else context.drawImage(fieldImage, 0, 0, 1500, 700);

    //Characters
    context.drawImage(phiastImage, phiastX, 100, 380, 600);
    context.drawImage(caraImage, caraX, 350, 180, 250);
    context.drawImage(cowImage, cowX, 120, 200, 500);
    context.drawImage(sheepImage, sheepX, 220, 200, 400);

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

startTypingLine(dialogueLines[currentLineIndex]);

function update() {
    // Cow walks away after line 10
    if (currentLineIndex >= 10 && cowX > -300) {
        cowX -= 3;
    }

    // Sheep darts across the field at line 7
    if (currentLineIndex === 7 && !isTyping && sheepX < 1800) {
        sheepX += 15;
    }

    // Phiast & Cara walk toward town after line 13
    if (currentLineIndex >= 13) {
        // Before town background
        if (!onTown && phiastX < 1500) {
            phiastX += 3;
            caraX += 3;
            if (phiastX >= 1500) {
                onTown = true;
                phiastX = -400; // re-enter from left
                caraX = -530;
            }
        }
        // Move to center in town
        else if (onTown && phiastX < 400) {
            phiastX += 3;
            caraX += 3;
        }
        // Move off right after last town line
        else if (onTown && currentLineIndex === dialogueLines.length - 1 && !isTyping) {
            phiastX += 3;
            caraX += 3;
        }
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

  if (currentLineIndex < dialogueLines.length) {
    startTypingLine(dialogueLines[currentLineIndex]);
  } else {
    typedText = "";
    if (phiastX >= 1600){
      startPuzzle();
    }
  }
}

function startPuzzle() {
    console.log("Puzzle 2 begins!");
    // setTimeout(() => {
    //   window.location.href='puzzlePage.html';
    // }, 2000); 

}

//GAME LOOP
function gameLoop(){
    update();
    draw();
    requestAnimationFrame(gameLoop);
}
    
gameLoop();