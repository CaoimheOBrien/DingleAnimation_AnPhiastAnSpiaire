// Dingle Animation Game Prototype 
//
//  Author: Caoimhe O'Brien, Aoife Leahy and Natalia Ryl 
//  Lead Programmer on feature: Caoimhe O'Brien
//  Date: 22/10/2025

import { GameState } from "/../../level.js";
function nextLevel(){
    console.log("Player has won game");
    GameState.level = 4; 
    console.log("Player has advanced to final scene")
    window.location.href="missionBoard.html";
}

window.onload = function (){

    //VARIABLES:
    //Set up the Canvas variable 
    const canvas = document.getElementById("puzzleCanvas"); 
    const context = canvas.getContext("2d"); 

    //Background image 
    let backgroundImage = new Image(); 
    backgroundImage.src = "assets/images/church_Puzzle.png"; 


    //OBJECTS 
    //chandelier
    let chandelierImage = new Image(); 
    chandelierImage.src = "assets/images/chandelier.png"; 
    let chandelier = new GameObject(chandelierImage, 340, 0, 267, 225); 

    //altar
    let altarImage = new Image();
    altarImage.src = "assets/images/altar.png"; 
    let altar = new GameObject(altarImage, 980, 307, 200, 200); 

    //fountain
    let fountainImage = new Image();
    fountainImage.src = "assets/images/fountain.png"; 
    let fountain= new GameObject(fountainImage, 1180, 430, 250, 220);

    //St Cuan (what they're looking for)
    let StCuanImage =  new Image();
    StCuanImage.src = "assets/images/StCuan.png";
    let StCuan = new GameObject(StCuanImage, 970, 300, 180, 220); 

    // Timer 
    let timerWidth = 300; 
    let timerHeight = 50; 
    let timerMax = 300;
    let timerVal = 0.5; // where the timer is in the loop for the draw function 
    let timerLastUpdate = Date.now(); //start of the timer 
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
    let chandelierClicked = false;
    let altarClicked = false;
    let fountainClicked = false;
    let altarSelected = false;
    let chandelierSelected = false;
    let fountainSelected = false;
    let StCuanSelected = false;
    let StCuanClicked = false;
    let winGame = false;
    let looseGame = false; 

    // Collision detection -- if the hand collides with the any of the objects, the player has to press enter/ double tap for mobile, to check behind the object
    function CollisionDetection(){
        let phiastLeft = phiastFinger.x;
        let phiastRight = phiastFinger.x+ phiastFinger.width;
        let phiastTop = phiastFinger.y;

        // Has the chandelier been clicked?
        const ischandelierColliding =
            phiastRight >= chandelier.x &&
            phiastLeft <= chandelier.x + chandelier.width &&
            phiastTop >= chandelier.y &&
            phiastTop <= chandelier.y +chandelier.height;

        
        chandelierSelected = ischandelierColliding;

        // Has the decoy cow been clicked
        const isaltarColliding =
            phiastRight >= altar.x &&
            phiastLeft <= altar.x + altar.width &&
            phiastTop >= altar.y &&
            phiastTop <= altar.y + altar.height;

        altarSelected = isaltarColliding;

        //Has the fountainbeen clicked?
        const isfountainColliding =
            phiastRight >= fountain.x &&
            phiastLeft <= fountain.x + fountain.width &&
            phiastTop >= fountain.y &&
            phiastTop <= fountain.y + fountain.height;

        fountainSelected = isfountainColliding;

        // Has the real Cow been clicked?
        const isStCuanColliding = altarClicked === true &&
            phiastRight >= StCuan.x &&
            phiastLeft <= StCuan.x + StCuan.width &&
            phiastTop >= StCuan.y &&
            phiastTop <= StCuan.y + StCuan.height;

        StCuanSelected = isStCuanColliding;

        if (StCuanSelected === true){
            altarSelected = false;
        }

        canClick = chandelierSelected || altarSelected || fountainSelected || StCuanSelected;
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
        if(!StCuanClicked && altarClicked){
            
        }
        context.drawImage(StCuan.spritesheet, StCuan.x, StCuan.y, StCuan.width, StCuan.height);

        //Objects
        if(!chandelierClicked){
            context.drawImage(chandelier.spritesheet, chandelier.x, chandelier.y, chandelier.width, chandelier.height);
        }
        if (!altarClicked){
            context.drawImage(altar.spritesheet, altar.x, altar.y, altar.width, altar.height);
        }
        if (!fountainClicked){
            context.drawImage(fountain.spritesheet, fountain.x, fountain.y, fountain.width, fountain.height);
        }
        
        //Timer
        drawTimer();

        //"An Phiast"
        context.drawImage(phiast.spritesheet, phiast.x, phiast.y, phiast.width, phiast.height);
        context.drawImage(phiastFinger.spritesheet, phiastFinger.x, phiastFinger.y, phiastFinger.width, phiastFinger.height);

        // Show when you can click on the objects
        if (canClick){
            if (chandelierSelected || altarSelected || fountainSelected){
                context.fillStyle = "rgba(0, 0, 0, 0.6)";
                context.fillRect(5, 8, 350, 40);
                context.strokeStyle = "white";
                context.lineWidth = 4;
                context.strokeRect(5, 8, 350, 40);

                context.fillStyle = "white";
                context.font = "20px Arial";
                context.fillText("Press Enter to look behind the object", 10, 35);
            }
            else if (StCuanSelected){
                context.fillStyle = "rgba(0, 0, 0, 0.6)";
                context.fillRect(5, 8, 350, 40);
                context.strokeStyle = "white";
                context.lineWidth = 4;
                context.strokeRect(5, 8, 350, 40);

                context.fillStyle = "white";
                context.font = "20px Arial";
                context.fillText("Press Enter to catch StCuan!", 10, 35);
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
            if (chandelierSelected === true){
                chandelierClicked = !chandelierClicked; // Remove the chandelier from the game
            }
            if (altarSelected === true){
                altarClicked = !altarClicked;
            }
            if (fountainSelected === true && !StCuanSelected){
                fountainClicked = !fountainClicked;
            }
            if (StCuanSelected === true){
                StCuanClicked = !StCuanClicked;
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
        // Player didn't find St Cuanin time so game is reset
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