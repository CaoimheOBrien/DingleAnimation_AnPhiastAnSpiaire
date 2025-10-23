// Dingle Animation Game Prototype 
//
//  Author: Caoimhe O'Brien, Aoife Leahy and Natalia Ryl 
//  Lead Programmer on feature: Caoimhe O'Brien
//  Date: 22/10/2025

import { GameState } from "/assets/scripts/level.js";
function nextLevel(){
    console.log("Player has won game");
    GameState.level = 3; 
    console.log("Player has advanced to", GameState.level)
    window.location.href="cutscene3.html";
}

window.onload = function (){

    //VARIABLES:
    //Set up the Canvas variable 
    const canvas = document.getElementById("puzzleCanvas"); 
    const context = canvas.getContext("2d"); 

    //Background image 
    let backgroundImage = new Image(); 
    backgroundImage.src = "assets/images/town.png"; 


    //OBJECTS 
    //Lamp
    let lampImage = new Image(); 
    lampImage.src = "assets/images/lamp.png"; 
    let lamp = new GameObject(lampImage, 240, 220, 90, 424); 

    //Well
    let wellImage = new Image();
    wellImage.src = "assets/images/well.png"; 
    let well = new GameObject(wellImage, 500, 290, 319, 320); 

    //Barrels
    let barrelsImage = new Image();
    barrelsImage.src = "assets/images/barrels.png"; 
    let barrels= new GameObject(barrelsImage, 780, 430, 420, 270);

    //Sheep that they're looking for
    let sheepImage =  new Image();
    sheepImage.src = "assets/images/sheep.png";
    let sheep = new GameObject(sheepImage, 610, 440, 78.6, 155.5); 

    // Timer 
    let timerWidth = 300; 
    let timerHeight = 50; 
    let timerMax = 300;
    let timerVal = 0.5; // where the timer is in the loop for the draw function 
    let timerLastUpdate = Date.now(); //start of the timer d
    let timerSpeed = 30; // make timer go slower

    //An Phiast
    let phiastImage = new Image();
    phiastImage.src = "assets/images/AnPhiastHand.png";
    let phiast = new GameObject(phiastImage, 10, 550, 180, 800);
    let phiastFingerImage = new Image();
    phiastFingerImage.src = "assets/images/AnPhiastFinger.png";
    let phiastFinger = new GameObject(phiastFingerImage, 58, 462, 24, 90); 
    
    let phiastSpeed = 10;
    
    //------------------------------------------------------------------------------------------------------------------------------------------------
    //EVENT LISTENERS
    let keys = {};

    window.addEventListener("keydown", function(e) {
        keys[e.key] = true;
    });

    window.addEventListener("keyup", function(e) {
        keys[e.key] = false;
    });

    //------------------------------------------------------------------------------------------------------------------------------------------------
    //FUNCTIONS: 
    function drawTimer(){
        // Draw the background
        context.fillStyle = "#000000";
        context.clearRect(1100, 2, timerWidth,timerHeight);
        context.fillRect(1100, 2, timerWidth, timerHeight);

        // Draw the fill
        context.fillStyle = "#9CADCE";
        var fillVal = Math.min(Math.max(timerVal / timerMax, 0), 1);
        context.fillRect(1100, 2, fillVal * timerWidth, timerHeight);

        // Draw frame 
        context.strokeStyle = "#EBD57C";
        context.lineWidth = 4; 
        context.strokeRect(1098, 0, timerWidth + 1, timerHeight + 1); 
    }

    //Turns images into an object in the game so that it doesn't loose its 
    function GameObject(spritesheet, x, y, width, height){
        this.spritesheet = spritesheet;
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height; 
    }


    //  Colision Global Variables
    let canClick = false;
    let lampClicked = false;
    let wellClicked = false;
    let barrelsClicked = false;
    let wellSelected = false;
    let lampSelected = false;
    let barrelsSelected = false;
    let sheepSelected = false;
    let sheepClicked = false;
    let winGame = false;
    let looseGame = false; 

    // Collision detection -- if the hand collides with the any of the objects, the player has to press enter/ double tap for mobile, to check behind the object
    function CollisionDetection(){
        let phiastLeft = phiastFinger.x;
        let phiastRight = phiastFinger.x+ phiastFinger.width;
        let phiastTop = phiastFinger.y;

        // Has the lamp been clicked?
        const islampColliding =
            phiastRight >= lamp.x &&
            phiastLeft <= lamp.x + lamp.width &&
            phiastTop >= lamp.y &&
            phiastTop <= lamp.y +lamp.height;

        
        lampSelected = islampColliding;

        // Has the decoy cow been clicked
        const iswellColliding =
            phiastRight >= well.x &&
            phiastLeft <= well.x + well.width &&
            phiastTop >= well.y &&
            phiastTop <= well.y + well.height;

        wellSelected = iswellColliding;

        //Has the Barrelsbeen clicked?
        const isbarrelsColliding =
            phiastRight >= barrels.x &&
            phiastLeft <= barrels.x + barrels.width &&
            phiastTop >= barrels.y &&
            phiastTop <= barrels.y + barrels.height;

        barrelsSelected = isbarrelsColliding;

        // Has the real Cow been clicked?
        const issheepColliding = wellClicked === true &&
            phiastRight >= sheep.x &&
            phiastLeft <= sheep.x + sheep.width &&
            phiastTop >= sheep.y &&
            phiastTop <= sheep.y + sheep.height;

        sheepSelected = issheepColliding;

        if (sheepSelected === true){
            wellSelected = false;
        }

        canClick = lampSelected || wellSelected || barrelsSelected || sheepSelected;
    }


    //------------------------------------------------------------------------------------------------------------------------------------------------
    //DRAW AND UPDATE
    //Draws the images on the canvas 
    function draw(){
        //Clearing space 
        context.clearRect(0,0, canvas.width, canvas.height)

        //Background image 
        context.drawImage(backgroundImage, 0, 0, 1500, 700);
        
        //Real Cow --> What they are trying to find.
        if(!sheepClicked && wellClicked){
            
        }
        context.drawImage(sheep.spritesheet, sheep.x, sheep.y, sheep.width, sheep.height);

        //Objects
        if(!lampClicked){
            context.drawImage(lamp.spritesheet, lamp.x, lamp.y, lamp.width, lamp.height);
        }
        if (!wellClicked){
            context.drawImage(well.spritesheet, well.x, well.y, well.width, well.height);
        }
        if (!barrelsClicked){
            context.drawImage(barrels.spritesheet, barrels.x, barrels.y, barrels.width, barrels.height);
        }
        
        //Timer
        drawTimer();

        //"An Phiast"
        context.drawImage(phiast.spritesheet, phiast.x, phiast.y, phiast.width, phiast.height);
        context.drawImage(phiastFinger.spritesheet, phiastFinger.x, phiastFinger.y, phiastFinger.width, phiastFinger.height);

        // Show when you can click on the objects
        if (canClick){
            if (lampSelected || wellSelected || barrelsSelected){
                context.fillStyle = "rgba(0, 0, 0, 0.6)";
                context.fillRect(5, 8, 350, 40);
                context.strokeStyle = "white";
                context.lineWidth = 4;
                context.strokeRect(5, 8, 350, 40);

                context.fillStyle = "white";
                context.font = "20px Arial";
                context.fillText("Press Enter to look behind the object", 10, 35);
            }
            else if (sheepSelected){
                context.fillStyle = "rgba(0, 0, 0, 0.6)";
                context.fillRect(5, 8, 350, 40);
                context.strokeStyle = "white";
                context.lineWidth = 4;
                context.strokeRect(5, 8, 350, 40);

                context.fillStyle = "white";
                context.font = "20px Arial";
                context.fillText("Press Enter to catch Sheep!", 10, 35);
            }
        }
    }

    //Updates timer
    function updateTimer(){
        let now = Date.now(); 
        let passed = (now - timerLastUpdate) / 1000; // how many seconds have passed

        timerVal += passed * timerSpeed; // counts up timer

        if (timerVal > timerMax) {
            timerVal = timerMax // ends timer at the max value
            console.log("Timer is up");
        }
        timerLastUpdate = now;

        if(timerVal == timerMax){
            looseGame = true; // the timer is up so you have lost the game
            console.log("Game told to end");
        }
    }

    //Player Movement
    function playerMovement(){
        //Response to keys
        if (keys["ArrowUp"] || keys["w"]) {
            if (phiastFinger.y-20 >= 0){
                phiast.y -= phiastSpeed;
                phiastFinger.y -= phiastSpeed; 
            }
        }
        if (keys["ArrowDown"] || keys["s"]) {
            if (phiast.y <= canvas.height - 250){
                phiast.y += phiastSpeed;
                phiastFinger.y += phiastSpeed; 

            }
        }
        if (keys["ArrowLeft"] || keys["a"]) {
            if(phiast.x >= -20){
                phiast.x -= phiastSpeed;
                phiastFinger.x -= phiastSpeed; 
            }
        }
        if (keys["ArrowRight"] || keys["d"]) {
            if(phiast.x <= canvas.width - 160){
                phiast.x += phiastSpeed;
                phiastFinger.x += phiastSpeed; 
            }
        }
    }

    document.addEventListener("keydown", function(event) {
        if (event.key === "Enter" && canClick === true) {
            if (lampSelected === true){
                lampClicked = !lampClicked; // Remove the lamp from the game
            }
            if (wellSelected === true){
                wellClicked = !wellClicked;
            }
            if (barrelsSelected === true && !sheepSelected){
                barrelsClicked = !barrelsClicked;
            }
            if (sheepSelected === true){
                sheepClicked = !sheepClicked;
                winGame = true;
            }
            canClick = false; // Waits until you collide again to click
        }
    });


    //Checks user input
    function update(){
        //Timer
        updateTimer();

        //Player Movement
        playerMovement();

        //Collision detection
        CollisionDetection();
    }

    //------------------------------------------------------------------------------------------------------------------------------------------------
    //GAME LOOP
    function gameLoop(){

        // Game is being played
        if (winGame === false && looseGame === false){
            update();
            draw();
            window.requestAnimationFrame(gameLoop);
        }

        // Player won the game so moves onto next level
        else if (winGame=== true){
            setTimeout(() => {
                //Clearing space 
                context.clearRect(0,0, canvas.width, canvas.height)

                //Background image 
                context.drawImage(backgroundImage, 0, 0, 1500, 700);

                //End Message
                context.fillStyle = "rgba(7, 40, 43, 0.95)";
                context.font = "80px Arial";
                context.fillText("You found Cow!", 200, 200);
            }, 5000);
            nextLevel();
        }
        // Player didn't find Sheep in time so game is reset
        else if (looseGame === true && winGame === false){
            setTimeout(() => {
                //Clearing space
                context.clearRect(0,0, canvas.width, canvas.height)

                //Background image 
                context.drawImage(backgroundImage, 0, 0, 1500, 700);

                //End Message
                context.fillStyle = "rgba(44, 52, 59, 0.3)";
                context.fillRect(180, 120, 780, 150);

                context.fillStyle = "White";
                context.font = "80px Arial";
                context.fillText("Time's up! Try again!", 200, 230);
            }, 500);
            setTimeout(() => location.reload(), 3000); // page is reloaded to reset puzzle  
        }
    }

    window.requestAnimationFrame(gameLoop);

}