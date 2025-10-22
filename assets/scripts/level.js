// Dingle Animation Game Prototype 
//
//  Author: Caoimhe O'Brien, Aoife Leahy and Natalia Ryl 
//  Lead Programmer on feature: Caoimhe O'Brien
//  Date: 22/10/2025

export const GameState = {
    get level(){
        return parseInt(localStorage.getItem("level")) || 1;
    },
    set level (val){
        localStorage.setItem("level", val);
    },
};

