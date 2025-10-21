//  Dingle Animation Game Prototype: An Phiast An Spiaire

// Author: Caoimhe O'Brien, Aoife Leahy and Natalia Ryl 
// Primary Programmer: Natalia Ryl
// Date: 21/10/2025

const canvas = document.getElementById("the_canvas")
const context = canvas.getContext("2d");

//--------------------------------------------------------------------------------------------------------------------

//Background images
let townImage = new Image();
townImage.src = "assets/images/townTemporary.png";

//let churchImage = new Image();
//churchImage.src = "";

//Phiast image
let phiastImage = new Image();
phiastImage.src = "assets/images/phiast.png";

//Cara image
let caraImage = new Image();
caraImage.src = "assets/images/cara.png";

//Cow image
let cowImage = new Image();
cowImage.src = "assets/images/cow.png";

//Sheep image
let sheepImage = new Image();
sheepImage.src = "assets/images/sheep.png";

//---------------------------------------------------------------------------------------------------------------------

let phiastX = 400; // start centre screen
let caraX = 270; // start centre screen
let cowX = -300; // start off screen left
let sheepX = 800; // start beside main characters

const dialogueLines = [
    "Cara: There you are Sheep!",
    "An Phiast: Thought you could sneak past us, didn't you?",
    "Sheep: N-no! I was just... sightseeing! Lovely cobblestones here, really-",
    "Cara: Cut it out Sheep. What's Cow planning?",
    "Sheep: Planning? Me? I mean- her? I mean- nothing! Nobody's planning anything!",
    "An Phiast: Sheep...",
    "Sheep: Okay okay! I might've heard something. Maybe. Possibly. About a place...",
    "Cara: A place?",
    "Sheep: ...the church. But that's all I know! I swear!",
    "*Cow stroms in*",
    "Cow: SHEPP! You blabbering fool!",
    "Sheep: Oh no-",
    "Cow: Can't keep your mouth shut for five minutes, can you? Come on!",
    "Cara: Well... that answers that.",
    "An Phiast: The church it is then.",
    "*They approach the old church. The door creaks open*",
    "Cara: It's dark in here...",
    "An Phiast: Stay close.",
    "*Suddenly, a shadow darts across the far wall-just for a moment, it looks like St. Cuan.*",
    "Cara: Did you see that?",
    "An Phiast: I did. It looked like... no, it couldn't be.",
    "Cara: Only one way to find out.",
    "Find out who is lurking in the shadows."
];