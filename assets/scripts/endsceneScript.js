// Dingle Animation Game Prototype 
//
//  Author: Caoimhe O'Brien, Aoife Leahy and Natalia Ryl 
//  Lead Programmer on feature: Caoimhe O'Brien
//  Date: 24/10/2025

const canvas = document.getElementById("finalCanvas")
const context = canvas.getContext("2d");

import { GameState } from "../../level.js";

GameState.level = 4; //Makes sure is on final game level
//--------------------------------------------------------------------------------------------------------------------

//Background image 
let backgroundImage = new Image(); 
backgroundImage.src = "assets/images/lakeCorrailli.png";

//Phiast image
let phiastImage = new Image();
phiastImage.src = "assets/images/phiast.png";

//Cara image
let caraImage = new Image();
caraImage.src = "assets/images/cara.png";

//St Cuan image
let stCuanImage = new Image();
stCuanImage.src = "assets/images/StCuan.png";

//Pot image 
let potImage = new Image(); 
potImage.src = "assets/images/pot.png";

//---------------------------------------------------------------------------------------------------------------------

let phiastX = -400; // start off screen left
let phiastY = 120; 
let caraX = -530; // start off screen left
let cuanX = 1300; // starts off screen right
let potX = 0; // stays on Phiast's head 
let potOnPhiast = false; 

let cutsceneStep = 0;
let cutSceneEnded = false;
let allowInput = false;

const dialogueLines = [
    "An Phiast: ST. CUAN!! We know you're here. SHOW YOURSELF!", // 0
    "Cara: Dammit. How did he even slip out of the church! ",
    "*St. Cuan appears out from behind a bush*", // 2
    "St.Cuan: HAH! You thought you could catch me An Phiast? Well think again!",
    "An Phiast: You need to stop St Cuan. I won't let you terrorise the people of Dingle anymore!",
    "Cara: You tell him An Phiast!",
    "St. Cuan: Oh yes, because the people of Dingle will believe an beast over a literal SAINT!!",
    "An Phiast: Why I oughta -", //7
    "*Suddenly St Cuan whips out a pot and flings it on An Phiast's head!*", //8
    "St Cuan: MUAHAHAHA TRY STOP ME NOW AN PHIAST!",
    "An Phiast: HEY! What's going on! Get this pot off me.",
    "*Cara realises, that's his leprechaun pot! He runs back to the end of his rainbow to check on his gold.*", //11
    "*St.Cuan looks smugly at An Phiast. He turns to the townspeople.*",
    "St Cuan: Now An Phiast, you can never terrorise the people of Dingle ever again!",
    "*St Cuan turns around and goes back to the town square, leaving An Phiast on his own...*", // 14
    "An Phiast: Oh now what will I do? Who will help me now? Who are the nicest group of people in all of Dingle?",
    "An Phiast: I know! Dingle Animation Festival! Surely somone there will help me get this pot off my head.",
    "*An Phiast runs to Dingle Animation and someone helps him take off the pot.",
    "And that's where people thinks the story ends..." // 18
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
    context.drawImage(phiastImage, phiastX, phiastY, 380, 600);
    context.drawImage(caraImage, caraX, 370, 180, 250);
    
    //Draws pot 
    if (potOnPhiast === true){
      context.drawImage(potImage, potX, 120, 260, 185);
    }
    
    context.drawImage(stCuanImage, cuanX, 100, 600, 630);


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
    potX = phiastX  + 30; 

    // Characters walk in
    if (cutsceneStep === 0) {
        phiastX += 5;
        caraX += 5;
        moving = true;

        if (phiastX >= 250) {
            phiastX = 250;
            caraX = 100;
            cutsceneStep = 1;
            moving = false; // stop moving once in position
        }
    }

    // St Cuan runs in 
    if (currentLineIndex === 2 && !isTyping) {
        cuanX -= 15;
        moving = true;
        if (cuanX <= 500) {
            cuanX = 500;
            moving = false;
        }
    }

    // Phiast goes at Cuan 
    if (currentLineIndex === 7 && !isTyping) {
        phiastX += 10; 
        moving = true;
        if (phiastX >= 550) {
            phiastX = 550;
            moving = false;
        }
    }

    // Phiast gets potted
    if (currentLineIndex === 8 && !isTyping) {
        potOnPhiast = true; 
        if (cuanX <= 600 && phiastX >= 550) {
            cuanX = 800;
            phiastX = 300;
            moving = false;
        }
    }
    
    // Cara runs away
    if (currentLineIndex === 11 && !isTyping) {
      caraX -= 10; 
      moving = true; 

      if (caraX <= -200) {
          caraX = -300; 
          moving = false; 
      }
    }

    // St Cuan leaves
    if (currentLineIndex === 14 && !isTyping) {
      cuanX -= 20; 
      moving = true; 

      if (cuanX <= -600) {
          cuanX = -1300; 
          moving = false; 
      }
    }

    
    // Phiast moves forward leaves
    if (currentLineIndex === 15 && !isTyping) {
      phiastX += 10; 
      phiastY += 1;
      moving = true; 

      if (phiastX >= 500 && phiastY>= 150 ) {
          phiastX = 500; 
          phiastY = 150; 
          moving = false; 
      }
    }

    
    // Phiast goes off to get pot off his head
    if (currentLineIndex === 16 && !isTyping) {
      phiastX += 10; 
      moving = true; 

      if (phiastX >= 1500) {
          phiastX = 1500; 
          potOnPhiast = false; 
          moving = false; 
      }
    }

    
    // Phiast comes back with no pot
    if (currentLineIndex === 17 && !isTyping) {
      phiastX -= 10; 
      moving = true;  

      if (phiastX <= 500) {
          phiastX = 500; 
          moving = false; 
      }
    }

    //Goes to End of Game Page
    if (currentLineIndex === dialogueLines.length - 1 && !isTyping){
        endOfGame();
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

  if (currentLineIndex < dialogueLines.length) {
    startTypingLine(dialogueLines[currentLineIndex]);
  } else {
    typedText = "";
    
  }
}

function endOfGame() {
    console.log("Go to end game page!");
    setTimeout(() => {
      window.location.href="endPage.html";
    }, 100);
}

//GAME LOOP
function gameLoop(){
  console.log ("Typing line", currentLineIndex);
    update();
    draw();
    requestAnimationFrame(gameLoop);
}

gameLoop();
