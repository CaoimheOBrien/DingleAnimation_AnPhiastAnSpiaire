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


    function GameObject(spritesheet, x, y, width, height){
        this.spritesheet = spritesheet;
        this.x = x;
        this.y = y; 
        this.width = width; 
        this.height = height; 
    }

    //Draws the images on the canvas 
    function draw(){
        // Drawing a square
        context.clearRect(0,0, canvas.width, canvas.height)
        context.fillStyle ="red";
        context.fillRect(20, 20, 20, 20 ); 

        context.drawImage(backgroundImage, 0, 0, 1500, 700);
    }

    //Checks user input
    function update(){
        //No inputs yet
    }

    function gameLoop(){
        update();
        draw();
        window.requestAnimationFrame(gameLoop);
    }
    
    window.requestAnimationFrame(gameLoop);

}
