//  Dingle Animation Game Prototype: An Phiast An Spiaire

// Author: Caoimhe O'Brien, Aoife Leahy and Natalia Ryl 
// Primary Programmer: Caoimhe O'Brien 
// Date: 21/10/2025

import { GameState } from "./level.js";
console.log("Current Level", GameState.level); 

const dialogue1Lines = [
    "This is An Phaist's secret lair, where he keeps his MISSION BOARD.",
    "Use the Mission Board to see where you are in the mission.",
    "Find where Cow is hiding to learn what she and Sheep are planning.",
    "You have to find Cow before she runs away, there will be a timer to remind you.",
    "Use your arrow keys (or WASD) to go around the screen and click enter to look behind/select objects.",
    "Ready? Let's go!"
];

const dialogue2Lines = [
    "Well, Cow was pretty useless.",
    "Now to find Sheep. She's hiding in the Town Square.",
    "Just like you found Cow, you're going to need to search for Sheep.",
    "You have to find Sheep before she runs away, there will be a timer to remind you.",
    "Use your arrow keys (or WASD) to go around the screen and click enter to look behind/select objects.",
    "Ready? Let's go!"
];

const dialogue3Lines = [
    "You're getting close I can feel it!",
    "Thanks to Cow and sheep, we know that the culprit Phiast needs to catch is in the church.",
    "We're pretty sure it's St. Cuan! But it can't be. (or could it).",
    "Just like you found Cow and Sheep, you're going to need to search for the shadowy figure.",
    "You have to find the shadowy figure before they run away, there will be a timer to remind you.",
    "Use your arrow keys (or WASD) to go around the screen and click enter to look behind/select objects.",
    "Ready? Let's go!"
];

// When GameState.level == 4 
const dialogueEndLines = [
    "IT WAS ST.CUAN!",
    "Who could've guessed that it was St.Cuan creating all that trouble all along!!",
    "Well, there's only one thing left to do. After 7 long years on this mission, you need to confront St.Cuan.",
    "Ready? Let's go!"
];
const canvas = document.getElementById("the_canvas")
const context = canvas.getContext("2d");

//--------------------------------------------------------------------------------------------------------------------
// Background image
let background = new Image();
background.src = "assets/images/Background_AnPhiastCave.png"

let missionBoardCowImage= new Image();
missionBoardCowImage.src = "assets/images/missionBoardCow.png";
let missionBoardCow = new GameObject(missionBoardCowImage, 30, 170, 700, 450);

let missionBoardSheepImage = new Image();
missionBoardSheepImage.src = "assets/images/missionBoardSheep.png";
let missionBoardSheep = new GameObject(missionBoardSheepImage, 30, 170, 700, 450);

let missionBoardCuanImage = new Image();
missionBoardCuanImage.src = "assets/images/missionBoardCuan.png";
let missionBoardCuan = new GameObject(missionBoardCuanImage, 30, 170, 700, 450); 


let missionBoardEndImage = new Image();
missionBoardEndImage.src = "assets/images/missionBoardCuanOut.png";
let missionBoardEnd = new GameObject(missionBoardEndImage, 30, 170, 700, 450); 

//Levels
let nowLevel1 = false;
let nowLevel2 = false;
let nowLevel3 = false; 
let nowLevel4 = false; // in the final scene 

//Dialogue stuff
let allowInput = false;

let currentLineIndex = 0;
let typedText = "";
let typingSpeed = 30;
let typingTimer = 0;
let isTyping = false;

//Turns images into an object in the game so that it doesn't loose its 
function GameObject(spritesheet, x, y, width, height){
    this.spritesheet = spritesheet;
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height; 
}

//--------------------------------------------------------------------------------------------------------------------
// DRAW
function draw(){
    //Clearing space
    context.clearRect(0,0, canvas.width, canvas.height)

    //Background image 
    context.drawImage(background, 0, 0, 1500, 700);
    if(GameState.level === 1){
        context.drawImage(missionBoardCow.spritesheet, missionBoardCow.x, missionBoardCow.y, missionBoardCow.width, missionBoardCow.height);
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
    if (GameState.level === 2){
        console.log("Drawing level 2"); 
        context.drawImage(missionBoardSheep.spritesheet, missionBoardSheep.x, missionBoardSheep.y, missionBoardSheep.width, missionBoardSheep.height);
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

    if (GameState.level === 3){
        console.log("Drawing level 3"); 
        context.drawImage(missionBoardCuan.spritesheet, missionBoardCuan.x, missionBoardCuan.y, missionBoardCuan.width, missionBoardCuan.height);
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

    
    if (GameState.level === 4){
        console.log("Drawing Final Scene"); 
        context.drawImage(missionBoardEnd.spritesheet, missionBoardEnd.x, missionBoardEnd.y, missionBoardEnd.width, missionBoardEnd.height);
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
}

//--------------------------------------------------------------------------------------------------------------------
//TYPING FUNCTIONS
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
    }
    else {
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
    let characterIndex = 0;

    function typeStep() {
        if (typedText.length < line.length) {
            typedText += line.charAt(characterIndex);
            characterIndex ++;
            setTimeout(typeStep, typingSpeed);
        } else {
            isTyping = false;
            allowInput = true;
        }
    }

    typeStep();
}

//INPUT FOR TYPING 
window.addEventListener("keydown", (e) => {
    if (e.key === "Enter" && allowInput) {
        advanceDialogue();
    }
});

function advanceDialogue() {
    if (GameState.level === 1){
        if (isTyping) {
            typedText = dialogue1Lines[currentLineIndex];
            isTyping = false;
            allowInput = true;
            return;
        }

        allowInput = false;
        currentLineIndex++;
        console.log("Now level is:", GameState.level);

        if (currentLineIndex < dialogue1Lines.length) {
            startTypingLine(dialogue1Lines[currentLineIndex]);
        } else {
            typedText = "";
            nowLevel1 = true;
        }
    }
    if (GameState.level === 2){
        if (isTyping) {
            typedText = dialogue2Lines[currentLineIndex];
            isTyping = false;
            allowInput = true;
            return;
        }


        allowInput = false;
        currentLineIndex++;
        console.log("Now level is:", GameState.level);
        console.log("Now2Level is:", nowLevel2);

        if (currentLineIndex < dialogue2Lines.length) {
            startTypingLine(dialogue2Lines[currentLineIndex]);
        } else {
            typedText = "";
            nowLevel2 = true;
            GameState.level = 2;
        }
    }

    if (GameState.level === 3){
        if (isTyping) {
            typedText = dialogue3Lines[currentLineIndex];
            isTyping = false;
            allowInput = true;
            return;
        }

        allowInput = false;
        currentLineIndex++;
        console.log("Now level is:", GameState.level);
        console.log("Now3Level is:", nowLevel3);


        if (currentLineIndex < dialogue3Lines.length) {
            startTypingLine(dialogue3Lines[currentLineIndex]);
        } else {
            typedText = "";
            nowLevel3 = true;
            GameState.level = 3;
        }
    }

    if (GameState.level === 4){
        if (isTyping) {
            typedText = dialogueEndLines[currentLineIndex];
            isTyping = false;
            allowInput = true;
            return;
        }

        allowInput = false;
        currentLineIndex++;
        console.log("Now level is:", GameState.level);
        console.log("Now3Level is:", nowLevel4);


        if (currentLineIndex < dialogueEndLines.length) {
            startTypingLine(dialogueEndLines[currentLineIndex]);
        } else {
            typedText = "";
            nowLevel4 = true;
            GameState.level = 4;
        }
    }
}

function restartDialogueLine(level){
    currentLineIndex = 0;
    typedText = "";
    allowInput = false;
    isTyping = false;

    if (level === 1){
        startTypingLine(dialogue1Lines[currentLineIndex]);
    }
    else if (level === 2) {
        startTypingLine(dialogue2Lines[currentLineIndex]);
    }
    else if (level === 3) {
        startTypingLine(dialogue3Lines[currentLineIndex]);
    }
    else if (level === 4) {
        startTypingLine(dialogueEndLines[currentLineIndex]);
    }
}
//--------------------------------------------------------------------------------------------------------------------
//UPDATE
function update(){
    if (GameState.level === 1 && nowLevel1 === true){
        console.log("Moving to next level");
        window.location.href="puzzlePage.html";
    }
    else if (GameState.level === 2 && nowLevel2 === true){
        console.log("Moving to next level");
        window.location.href="puzzle2Page.html";
    }
    else if (GameState.level === 3 && nowLevel3 === true){
        console.log("Moving to next level");
        window.location.href="puzzle3Page.html";
    }
    else if (GameState.level === 4 && nowLevel4 === true){
        console.log("Moving to next level");
        window.location.href="endscene.html";
    }
}

//--------------------------------------------------------------------------------------------------------------------
// GAME LOOP
function gameLoop(){
    // Start the first line of dialogue

    draw();
    update();
    window.requestAnimationFrame(gameLoop);
}

restartDialogueLine(GameState.level);
window.requestAnimationFrame(gameLoop);
