//  Dingle Animation Game Prototype: An Phiast An Spiaire

// Author: Caoimhe O'Brien, Aoife Leahy and Natalia Ryl 
// Primary Programmer: Caoimhe O'Brien 
// Date: 21/10/2025

import { GameState } from "./level.js";

window.onload = function (){
    const canvas = document.getElementById("the_canvas")
    const context = canvas.getContext("2d");

    //--------------------------------------------------------------------------------------------------------------------
    // Background image
    let background = new Image();
    background.src = "assets/images/Background_AnPhiastCave.png"

    let missionBoardCowImage= new Image();
    missionBoardCowImage.src = "assets/images/missionBoardCow.png";
    let missionBoardCow = new GameObject(missionBoardCowImage, 30, 170, 700, 450); 

    let missionBoardSheep = new Image();
    missionBoardSheep.src = "assets/images/missionBoardSheep.png";

    let missionBoardCuan = new Image();
    missionBoardCuan.src = "assets/images/missionBoardCuan.png"


    //--------------------------------------------------------------------------------------------------------------------
    function draw(){
        //Clearing space
        context.clearRect(0,0, canvas.width, canvas.height)

        //Background image 
        context.drawImage(background, 0, 0, 1500, 700);
        if(GameState.level == 1){
            context.drawImage(missionBoardCow.spritesheet, missionBoardCow.x, missionBoardCow.y, missionBoardCow.width, missionBoardCow.height);
        }

    }

    //Turns images into an object in the game so that it doesn't loose its 
    function GameObject(spritesheet, x, y, width, height){
        this.spritesheet = spritesheet;
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height; 
    }


    function gameLoop(){
        draw();
        window.requestAnimationFrame(gameLoop);
    }
    window.requestAnimationFrame(gameLoop);

}