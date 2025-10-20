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
    backgroundImage.src = "assets/images/fieldBG_Puzzle1.png"; // Will be changed out for our own assets 


    //OBJECTS 
    //Tree 
    let treeImage = new Image(); 
    treeImage.src = "assets/images/tree_Puzzle1.png"; // Will be changed out for our own assets 
    let tree = new GameObject(treeImage, 20, 40, 500, 480); 

    //Decoy Cow 
    let decoyCowImage = new Image();
    decoyCowImage.src = "assets/images/decoyCow_Puzzle1.png"; //Will be changed out for our own assets 
    let decoyCow = new GameObject(decoyCowImage, 500, 270, 300, 300); 

    //Bush 
    let bushImage = new Image();
    bushImage.src = "assets/images/bush_Puzzle1.png"; // Will be changed out for our own assets 
    let bush = new GameObject(bushImage, 900, 190, 560, 460); 

    // Timer 
    let timerWidth = 300; 
    let timerHeight = 50; 
    let timerMax = 300;
    let timerVal = 0.5; // where the timer is in the loop for the draw function 
    let timerLastUpdate = Date.now(); //start of the timer d
    let timerSpeed = 0.5 // make timer go slower

    //An Phiast
    let phiastImage = new Image();
    phiastImage.src = "assets/images/AnPhiastHand.png";
    let phiast = new GameObject(phiastImage, 20, 20, 300, 900);
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

    let canClick = false;
    let treeClicked = false;


    // Collision detection -- if the hand collides with the any of the objects, the player has to press enter/ double tap for mobile, to check behind the object
    function CollisionDetection(){
        let phiastPadding = 2;
        let phiastLeft = phiast.x + phiastPadding; 
        let phiastRight = phiast.x+ phiast.width;
        let phiastTop = phiast.y + phiastPadding;

        if (!treeClicked){
            const isTreeColliding = 
                phiastRight >= tree.x &&
                phiastLeft <= tree.x + tree.width &&
                phiastTop >= tree.y &&
                phiastTop <= tree.y +tree.height;

            canClick = isTreeColliding; 
        }
        else{
            canClick = false; 
        }
    }


    //------------------------------------------------------------------------------------------------------------------------------------------------
    //DRAW AND UPATE
    //Draws the images on the canvas 
    function draw(){
        //Clearing space 
        context.clearRect(0,0, canvas.width, canvas.height)

        //Background image 
        context.drawImage(backgroundImage, 0, 0, 1500, 700); 

        //Objects
        if(treeClicked === false){
            context.drawImage(tree.spritesheet, tree.x, tree.y, tree.width, tree.height);
        }
        context.drawImage(decoyCow.spritesheet, decoyCow.x, decoyCow.y, decoyCow.width, decoyCow.height); 
        context.drawImage(bush.spritesheet, bush.x, bush.y, bush.width, bush.height); 

        //Timer
        drawTimer();

        //"An Phiast"
        context.drawImage(phiast.spritesheet, phiast.x, phiast.y, phiast.width, phiast.height);
    
        // Show when you can click on the objects
        if (canClick){
            context.fillStyle = "rgba(7, 40, 43, 0.95)";
            context.font = "20px Arial";
            context.fillText("Press Enter to look behind the object", tree.x, tree.y - 10);
        }
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
            if (phiast.y-20 >= 0){
                phiast.y -= phiastSpeed;
            }
        }
        if (keys["ArrowDown"] || keys["s"]) {
            if (phiast.y <= canvas.height - 250){
                phiast.y += phiastSpeed;
            }
        }
        if (keys["ArrowLeft"] || keys["a"]) {
            if(phiast.x >= -20){
                phiast.x -= phiastSpeed;
            }
        }
        if (keys["ArrowRight"] || keys["d"]) {
            if(phiast.x <= canvas.width-20){
                phiast.x += phiastSpeed;
            }
        }
    }

    document.addEventListener("keydown", function(event) {
    if (event.key === "Enter" && canClick === true && tree) {
        treeClicked = true; // Remove the tree from the game
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
        update();
        draw();

        window.requestAnimationFrame(gameLoop);
    }
    
    window.requestAnimationFrame(gameLoop);

}