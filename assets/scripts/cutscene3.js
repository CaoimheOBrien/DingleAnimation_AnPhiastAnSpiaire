//  Dingle Animation Game Prototype: An Phiast An Spiaire

// Author: Caoimhe O'Brien, Aoife Leahy and Natalia Ryl 
// Primary Programmer: Natalia Ryl
// Date: 21/10/2025

const canvas = document.getElementById("the_canvas")
const context = canvas.getContext("2d");

//--------------------------------------------------------------------------------------------------------------------

//Background images
let townImage = new Image();
townImage.src = "assets/images/town.png";

let churchImage = new Image();
churchImage.src = "assets/images/church.png";

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

//St Cuan image
let cuanImage = new Image();
cuanImage.src = "assets/images/StCuan.png";

//---------------------------------------------------------------------------------------------------------------------

let phiastX = 400; // start centre screen
let caraX = 270; // start centre screen
let cowX = -300; // start off screen left
let sheepX = 900; // start beside main characters
let cuanX = -450; // start off screen left

let onChurch = false; // switch background

let cutsceneStep = 0;
let allowInput = false;

const dialogueLines = [
    "Cara: There you are Sheep!",
    "An Phiast: Thought you could sneak past us, didn't you?",
    "Sheep: N-no! I was just... sightseeing! Lovely cobblestones here, really-",
    "Cara: Cut it out Sheep. What's Cow planning?",
    "Sheep: Planning? Me? I mean- her? I mean- nothing! Nobody's planning anything!",
    "An Phiast: Sheep...",
    "Sheep: Okay okay! I might've heard something. Maybe. Possibly. About a place...",
    "Cara: A place?",
    "Sheep: ...the church. But that's all I know! I swear!",
    "*Cow storms in*",
    "Cow: SHEEP! You blabbering fool!",
    "Sheep: Oh no-",
    "Cow: Can't keep your mouth shut for five minutes, can you? Come on!",
    "Cara: Well... that answers that.",
    "An Phiast: The church it is then.",
    "*They approach St. Cuan's church. The door creaks open*",
    "Cara: It's dark in here...",
    "An Phiast: Stay close.",
    "*Suddenly, a shadow darts across the far wall; just for a moment, it looks like St. Cuan.*",
    "Cara: Did you see that?",
    "An Phiast: I did. It looked like... no, it couldn't be.",
    "Cara: Only one way to find out.",
    "Find out who is lurking in the shadows."
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
    if(onChurch) context.drawImage(churchImage, 0, 0, 1500, 700);
    else context.drawImage(townImage, 0, 0, 1500, 700);

    //Characters
    context.save(); // save the current drawing state
    context.filter = "brightness(20%)"; // darken only this image
    context.drawImage(cuanImage, cuanX, 100, 600, 630);
    context.restore(); // restore normal brightness for everything else
    context.drawImage(sheepImage, sheepX, 290, 200, 400);
    context.drawImage(cowImage, cowX, 190, 200, 500);
    context.drawImage(phiastImage, phiastX, 170, 380, 600);
    context.drawImage(caraImage, caraX, 420, 180, 250);


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
    let moving = false; // track if any character is moving

    // Cow stroms in after line 9
    if (currentLineIndex === 9 && cowX < 700) {
        cowX += 10;
        moving = true;
    }

    // Cow drags Sheep off-screen to the left after line 13
    if (currentLineIndex >= 13 && cowX > -400) {
        cowX -= 10;
        sheepX -= 10;
        moving = true;
    }

    // Cuan darts across the church at line 18
    if (currentLineIndex === 18 && !isTyping && cuanX < 1800) {
        cuanX += 40;
        moving = true;
    }

    // Phiast & Cara walk toward town after line 15
    if (currentLineIndex >= 15) {
        // Before town background
        if (!onChurch && phiastX < 1500) {
            phiastX += 7;
            caraX += 7;
            moving = true;

            if (phiastX >= 1500) {
                onChurch = true;
                phiastX = -400; // re-enter from left
                caraX = -530;
            }
        }
        // Move to center in church
        else if (onChurch && phiastX < 400) {
            phiastX += 5;
            caraX += 5;
            moving = true;
        }
        // Move off right after last town line
        else if (onChurch && currentLineIndex === dialogueLines.length - 1 && !isTyping) {
            phiastX += 7;
            caraX += 7;
            moving = true;
            startPuzzle(); 
        }
    }

    // Disable input if any movement is happening
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

function startPuzzle() {
    console.log("Puzzle ends!");
      setTimeout(() => {
      window.location.href= "missionBoard.html";
    }, 500); 

}

//GAME LOOP
function gameLoop(){
    update();
    draw();
    requestAnimationFrame(gameLoop);
}
    
gameLoop();