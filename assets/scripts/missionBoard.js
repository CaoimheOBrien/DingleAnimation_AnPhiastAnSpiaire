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

    let missionBoardCow= new Image();
    missionBoardCow.src = "assets/images/missionBoardCow.png"; 

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
            context.drawImage(missionBoardCow, 100, 100);
        }

    }

    function gameLoop(){
        draw();
        window.requestAnimationFrame(gameLoop);
    }
    window.requestAnimationFrame(gameLoop);

}