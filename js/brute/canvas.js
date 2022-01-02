"use strict";
var width = 1228; 
var height = 697;
var ratio = window.devicePixelRatio;

var canvas;
var context;

var player1;
var player2;
var startingPlayer = null;
var background;
var lvlUpHandler = new LvlUpHandler();

var paused = false;

window.onload = init;

function init(){
	initCanvas();
	initPlayers();
	initBackground();

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
	
	player1.addEnemy(player2);
	player2.addEnemy(player1);
	
	displayStats();
	chooseStartingPlayer();
	
}

function initBackground() {
	background = new Image();
	background.src = "../image/brute/background.png";
}

function gameLoop(timeStamp){
	if(paused){return;}
	
	drawBackground();
	drawHealthBars();
	drawXpBar();
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

function drawHealthBars() {
	player1.healthBar.show(context);
	player2.healthBar.show(context);
}

function drawXpBar() {
	player1.xpBar.show(context);
}

function updateSprites() {
	player1.updateSpriteStep();
	player2.updateSpriteStep();
}

function updatePositions() {
	player1.updatePosition();
	player2.updatePosition();
}

function displayStats() {
	$("#player1 .hp").text(player1.hp);
	$("#player1 .strenght").text(player1.strenght);
	$("#player1 .magic").text(player1.magic);
	$("#player1 .range").text(player1.range);
	$("#player1 .speed").text(player1.speed);
	$("#player1 .agility").text(player1.agility);
	
	$("#player2 .hp").text(player2.hp);
	$("#player2 .strenght").text(player2.strenght);
	$("#player2 .magic").text(player2.magic);
	$("#player2 .range").text(player2.range);
	$("#player2 .speed").text(player2.speed);
	$("#player2 .agility").text(player2.agility);
}

function chooseStartingPlayer(){
	startingPlayer = null;
	if (player1.speed > player2.speed) {
		startingPlayer = player1;
	} else if (player2.speed > player1.speed) {
		startingPlayer = player2;
	} else {
		startingPlayer = randomIntFromInterval(0,1) == 0 ? player1 : player2;
	}
}

function pauseAndAwardXp(player) {
	paused = true;
	if (player == player2){
		player1.xpBar.gainXp();
	}
}


document.addEventListener("end-of-turn", function(e) {
	if (player1 == e.detail) {
		player2.walkingToEnemy();
	} else if (player2 == e.detail) {
		player1.walkingToEnemy();
	}
});

document.addEventListener("death", function(e) {
	setTimeout(pauseAndAwardXp.bind(null,e.detail), 125) 
});

document.addEventListener("lvlUp", function(e) {
	displayStats();
});

document.addEventListener("DOMContentLoaded", function() {
	document.getElementById('newBattleBtn').addEventListener('click', function() {
		player1.reset();
		player2 = new Player(new MinotaureSprites(), 975, 350, Direction.Left);
		
		while (player1.lvl > player2.lvl) {
			lvlUpHandler.lvlUp(player2)
		}
		
		player1.addEnemy(player2);
		player2.addEnemy(player1);
		
		chooseStartingPlayer();
		startingPlayer.walkingToEnemy();
		
		displayStats();
		
		if (paused == true) {
			paused = false;
			requestAnimationFrame(gameLoop);
		}
	});
	
	document.getElementById('pauseBtn').addEventListener('click', function() {
		if (paused == false) {
			paused = true;
		} else {
			paused = false;
			requestAnimationFrame(gameLoop);
		}
	});
});

function randomIntFromInterval(min, max) { // min and max included 
  return Math.floor(Math.random() * (max - min + 1) + min)
}
