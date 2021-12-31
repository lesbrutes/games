"use strict";
var width = 1228; 
var height = 697;
var ratio = window.devicePixelRatio;

var canvas;
var context;

var player1;
var player2;
var background;

var currentPlayer = null;

window.onload = init;

function init(){
	initCanvas();
	initPlayers();
	initBackground();
	currentPlayer = player1;

    // Start the first frame request
    window.requestAnimationFrame(gameLoop);
}

function initCanvas() {
	canvas = document.getElementById("canvas");
	context = canvas.getContext("2d");

	canvas.width  = width  * ratio;
	canvas.height = height * ratio;
	canvas.style.width  = width  + "px";
	canvas.style.height = height + "px";
	context.scale(ratio, ratio);
	context.imageSmoothingEnabled = false;
	context.fillStyle = "rgba(255, 255, 255, 0.25)";
}

function initPlayers() {
	player1 = new Player(new MinotaureSprites(), 150, 350, Direction.Right);
	player2 = new Player(new MinotaureSprites(), 975, 350, Direction.Left);
	
	player1.walkingToEnemy();
}

function initBackground() {
	background = new Image();
	background.src = "../image/brute/background.png";
}

function gameLoop(timeStamp){
	drawBackground();
	drawPlayer(player1);
	drawPlayer(player2);
	
	updatePositions();
	updateSprites();
	
    // Keep requesting new frames
    window.requestAnimationFrame(gameLoop);
}

function drawPlayer(player){
	var sprite = player.currentSprite;
    var s = sprite.scale; //Facteur d'aggrandissement
    var step = Math.floor(player.spriteStep);
    
    context.drawImage(sprite.img, sprite.width*step, 0, sprite.width, sprite.height, player.positionX, player.positionY, sprite.width*s, sprite.height*s);

}

function drawBackground()  {
	context.drawImage(background, 0, 0);
}

function updateSprites() {
	player1.updateSpriteStep();
	player2.updateSpriteStep();
}

function updatePositions() {
	player1.updatePosition();
	player2.updatePosition();
}


//Add an event listener
document.addEventListener("end-of-turn", function(e) {
	debugger;
	if (player1 == e.detail) {
		player2.walkingToEnemy();
	} else if (player2 == e.detail) {
		player1.walkingToEnemy();
	}
});