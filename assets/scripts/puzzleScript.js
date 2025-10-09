// Dingle Animation Game Prototype 
//
//  Author: Caoimhe O'Brien, Aoife Leahy and Natalia Ryl 
//  Lead Programmer on feature: Caoimhe O'Brien
//  Date: 08/10/2025
 
window.onload = function (){

    //VARIABLES:
    //Set up the Canvas variable 
    const canvas = document.getElementById("puzzleCanvas"); 
    const context = canvas.getContext("2d"); 

    //Background image 
    let backgroundImage = new Image(); 
    backgroundImage.src = "assets/images/temporaryBG_Puzzle1.jpg"; // Will be changed out for our own assets 

    // Timer 
    let timerWidth = 300; 
    let timerHeight = 50; 
    let timerMax = 300;
    let timerVal = 0.5; // where the timer is in the loop for the draw function 
    let timerLastUpdate = Date.now(); //start of the timer 
    let timerSpeed = 0.5 // make timer go slower

    //An Phiast for now 
    let phiastX = 400;
    let phiastY = 300; 
    let phiastSpeed = 5; 


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
        context.clearRect(900, 2, timerWidth,timerHeight);
        context.fillRect(900, 2, timerWidth, timerHeight);

        // Draw the fill
        context.fillStyle = "#9CADCE";
        var fillVal = Math.min(Math.max(timerVal / timerMax, 0), 1);
        context.fillRect(900, 2, fillVal * timerWidth, timerHeight);

        // Draw frame 
        context.strokeStyle = "#EBD57C";
        context.lineWidth = 4; 
        context.strokeRect(898, 0, timerWidth + 1, timerHeight + 1); 
    }

    //Turns images into an object in the game so that it doesn't loose its 
    function GameObject(spritesheet, x, y, width, height){
        this.spritesheet = spritesheet;
        this.x = x;
        this.y = y; 
        this.width = width; 
        this.height = height; 
    }


    //------------------------------------------------------------------------------------------------------------------------------------------------
    //DRAW AND UPATE
    //Draws the images on the canvas 
    function draw(){
        //Clearing space 
        context.clearRect(0,0, canvas.width, canvas.height)

        //Background image 
        context.drawImage(backgroundImage, 0, 0, 1500, 700); 

        //Timer
        drawTimer();

        //"An Phiast"
        context.fillStyle ="green";
        context.fillRect(phiastX, phiastY, 100, 140 ); 
    }

    //Updates timer
    function updateTimer(){
        let now = Date.now(); 
        let passed = (now - timerLastUpdate) / 1000; // how many seconds have passed

        timerVal += passed * timerSpeed; // counts up timer

        if (timerVal > timerMax) {
            timerVal = timerMax // ends timer at the max valu
        }
        timerLastUpdate = now; 
    }

    //Player Movement
    function playerMovement(){
        //Response to keys
        if (keys["ArrowUp"] || keys["w"]) {
            phiastY -= phiastSpeed;
        }
        if (keys["ArrowDown"] || keys["s"]) {
            phiastY += phiastSpeed;
        }
        if (keys["ArrowLeft"] || keys["a"]) {
            phiastX -= phiastSpeed;
        }
        if (keys["ArrowRight"] || keys["d"]) {
            phiastX += phiastSpeed;
        }
    }


    //Checks user input
    function update(){
       //Timer 
        updateTimer();

        //Player Movement
        playerMovement(); 
    }

    //------------------------------------------------------------------------------------------------------------------------------------------------
    //GAME LOOP
    function gameLoop(){
        update();
        draw();
        window.requestAnimationFrame(gameLoop);
    }
    
    window.requestAnimationFrame(gameLoop);

}
 