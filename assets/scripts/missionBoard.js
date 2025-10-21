//  Dingle Animation Game Prototype: An Phiast An Spiaire

// Author: Caoimhe O'Brien, Aoife Leahy and Natalia Ryl 
// Primary Programmer: Caoimhe O'Brien 
// Date: 21/10/2025


window.onload = function (){
    const canvas = document.getElementById("the_canvas")
    const context = canvas.getContext("2d");

    //--------------------------------------------------------------------------------------------------------------------
    // Background image

    //--------------------------------------------------------------------------------------------------------------------
    //Turns images into an object in the game so that it doesn't loose its 
    function GameObject(spritesheet, x, y, width, height){
        this.spritesheet = spritesheet;
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height; 
    }

    function draw(){
        
    }

    function gameLoop(){
        update();
        draw();
        window.requestAnimationFrame(gameLoop);
    }
    window.requestAnimationFrame(gameLoop);

}