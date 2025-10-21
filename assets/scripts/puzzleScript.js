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
    backgroundImage.src = "assets/images/fieldBG_Puzzle1.png"; 


    //OBJECTS 
    //Tree 
    let treeImage = new Image(); 
    treeImage.src = "assets/images/tree_Puzzle1.png"; 
    let tree = new GameObject(treeImage, 10, 30, 500, 480); 

    //Decoy Cow 
    let decoyCowImage = new Image();
    decoyCowImage.src = "assets/images/decoyCow_Puzzle1.png"; 
    let decoyCow = new GameObject(decoyCowImage, 550, 270, 300, 300); 

    //Bush 
    let bushImage = new Image();
    bushImage.src = "assets/images/bush_Puzzle1.png"; 
    let bush = new GameObject(bushImage, 900, 190, 560, 460);

    //Real Cow that they're looking for
    let realCowImage =  new Image();
    realCowImage.src = "assets/images/cow.png";
    let realCow = new GameObject(realCowImage, 1060, 240, 200, 375); 

    // Timer 
    let timerWidth = 300; 
    let timerHeight = 50; 
    let timerMax = 300;
    let timerVal = 0.5; // where the timer is in the loop for the draw function 
    let timerLastUpdate = Date.now(); //start of the timer d
    let timerSpeed = 10; // make timer go slower

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
    let treeClicked = false;
    let decoyCowClicked = false;
    let bushClicked = false;
    let decoyCowSelected = false;
    let treeSelected = false;
    let bushSelected = false;
    let realCowSelected = false;
    let realCowClicked = false;
    let winGame = false;
    let looseGame = false; 

    // Collision detection -- if the hand collides with the any of the objects, the player has to press enter/ double tap for mobile, to check behind the object
    function CollisionDetection(){
        let phiastLeft = phiastFinger.x;
        let phiastRight = phiastFinger.x+ phiastFinger.width;
        let phiastTop = phiastFinger.y;

        // Has the tree been clicked?
        const isTreeColliding =
            phiastRight >= tree.x &&
            phiastLeft <= tree.x + tree.width &&
            phiastTop >= tree.y &&
            phiastTop <= tree.y +tree.height;

        
        treeSelected = isTreeColliding;

        // Has the decoy cow been clicked
        const isDecoyCowColliding =
            phiastRight >= decoyCow.x &&
            phiastLeft <= decoyCow.x + decoyCow.width &&
            phiastTop >= decoyCow.y &&
            phiastTop <= decoyCow.y + decoyCow.height;

        decoyCowSelected = isDecoyCowColliding;

        //Has the bush been clicked?
        const isBushColliding =
            phiastRight >= bush.x &&
            phiastLeft <= bush.x + bush.width &&
            phiastTop >= bush.y &&
            phiastTop <= bush.y + bush.height;

        bushSelected = isBushColliding;

        // Has the real Cow been clicked?
        const isRealCowColliding = bushClicked === true &&
            phiastRight >= realCow.x &&
            phiastLeft <= realCow.x + realCow.width &&
            phiastTop >= realCow.y &&
            phiastTop <= realCow.y + realCow.height;

        realCowSelected = isRealCowColliding;

        if (realCowSelected === true){
            bushSelected = false;
        }

        canClick = treeSelected || decoyCowSelected || bushSelected || realCowSelected;
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
        if(!realCowClicked && bushClicked){
            context.drawImage(realCow.spritesheet, realCow.x, realCow.y, realCow.width, realCow.height);
        }
    
        //Objects
        if(!treeClicked){
            context.drawImage(tree.spritesheet, tree.x, tree.y, tree.width, tree.height);
        }
        if (!decoyCowClicked){
            context.drawImage(decoyCow.spritesheet, decoyCow.x, decoyCow.y, decoyCow.width, decoyCow.height);
        }
        if (!bushClicked){
            context.drawImage(bush.spritesheet, bush.x, bush.y, bush.width, bush.height);
        }
        
        //Timer
        drawTimer();

        //"An Phiast"
        context.drawImage(phiast.spritesheet, phiast.x, phiast.y, phiast.width, phiast.height);
        context.drawImage(phiastFinger.spritesheet, phiastFinger.x, phiastFinger.y, phiastFinger.width, phiastFinger.height);

        // Show when you can click on the objects
        if (canClick){
            if (treeSelected || decoyCowSelected || bushSelected){
                context.fillStyle = "rgba(7, 40, 43, 0.95)";
                context.font = "20px Arial";
                context.fillText("Press Enter to look behind the object", tree.x, tree.y - 10);
            }
            else if (realCowSelected){
                context.fillStyle = "rgba(7, 40, 43, 0.95)";
                context.font = "20px Arial";
                context.fillText("Press Enter to catch Cow!", tree.x, tree.y - 10);
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
            if (treeSelected === true){
                treeClicked = !treeClicked; // Remove the tree from the game
            }
            if (decoyCowSelected === true){
                decoyCowClicked = !decoyCowClicked;
            }
            if (bushSelected === true && !realCowSelected){
                bushClicked = !bushClicked;
            }
            if (realCowSelected === true){
                realCowClicked = !realCowClicked;
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
        if (winGame === false && looseGame === false){
            update();
            draw();
            window.requestAnimationFrame(gameLoop);
        }
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
            }, 1000);
        }
        else if (looseGame === true){
            setTimeout(() => {
                //Clearing space 
                context.clearRect(0,0, canvas.width, canvas.height)

                //Background image 
                context.drawImage(backgroundImage, 0, 0, 1500, 700);

                //End Message
                context.fillStyle = "rgba(7, 40, 43, 0.95)";
                context.font = "80px Arial";
                context.fillText("Time's up! Try again!", 200, 200);
            }, 1000);
        }
    }
    
    window.requestAnimationFrame(gameLoop);

}