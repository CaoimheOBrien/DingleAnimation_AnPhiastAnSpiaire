// Dingle Animation Game Prototype 
//
//  Author: Caoimhe O'Brien, Aoife Leahy and Natalia Ryl 
//  Lead Programmer on feature: Caoimhe O'Brien
//  Date: 08/10/2025
 
window.onload = function (){

    //Set up the Canvas variable 
        const canvas = document.getElementById("puzzleCanvas"); 
        const context = canvas.getContext("2d"); 


    //Background image 
    let backgroundImage = new Image(); 
    backgroundImage.src = "assets/images/temporaryBG_Puzzle1.jpg"; 

    // Timer 
    let timerWidth = 300; 
    let timerHeight = 50; 
    let timerMax = 300;
    let timerVal = 0.5; // where the timer is in the loop for the draw function 
    let timerLastUpdate = Date.now(); //start of the timer 
    let timerSpeed = 0.5 // make timer go slower

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

    //Draws the images on the canvas 
    function draw(){
        //Clearing space 
        context.clearRect(0,0, canvas.width, canvas.height)

        //Background image 
        context.drawImage(backgroundImage, 0, 0, 1500, 700); 

        //Timer
        drawTimer();

        //Square
        context.fillStyle ="red";
        context.fillRect(20, 20, 20, 20 ); 
    }

    //Checks user input
    function update(){
       //Timer 
        let now = Date.now(); 
        let passed = (now - timerLastUpdate) / 1000; // how many seconds have passed

        timerVal += passed * timerSpeed; // counts up timer

        if (timerVal > timerMax) {
            timerVal = timerMax // ends timer at the max valu
        }
        timerLastUpdate = now; 
        

        
    }

    function gameLoop(){
        update();
        draw();
        window.requestAnimationFrame(gameLoop);
    }
    
    window.requestAnimationFrame(gameLoop);

}
