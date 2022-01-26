"use strict";
//var width = 2000; 
//var height = 1000;
var width = 1228; 
var height = 697;
var ratio = window.devicePixelRatio;

var canvas;
var context;

var player1;
var player2;
var startingPlayer = null;
var background;
var hitsplat;
var hitsplats = [];
var lvlUpHandler = new LvlUpHandler();
var weapons = new Weapons();
var audio = new Audio('../audio/mainTrack.mp3');
audio.loop = true;
audio.volume = 0.05;

var paused = false;

window.onload = init;

function init(){
	initCanvas();
	initBackground();
	initHitsplat();
	
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

function initBackground() {
	var arenaIndex = randomIntFromInterval(1,4);
	background = new Image();
	background.src = "../image/brute/arena/arena"+arenaIndex+".png";
}

function initHitsplat() {
	hitsplat = new Image();
	hitsplat.src = "../image/brute/hitsplat.png";
}

function gameLoop(timeStamp){
	if(paused){return;}
	
	drawBackground();
	drawHealthBars();
	drawXpBar();
	drawPlayer(player1);
	drawPlayer(player2);
	drawHitsplats();
	
	updatePositions();
	updateSprites();
	
    // Keep requesting new frames
    window.requestAnimationFrame(gameLoop);
}

function drawPlayer(player){
	if (player != null) {
		player.show(context);
	}
}

function drawHitsplats() {
	hitsplats.forEach(function(hitsplat) {
		hitsplat.show(context);
	});
	hitsplats = hitsplats.filter(hitsplat => hitsplat.isVisible());
}

function drawBackground()  {
   var img = background;
   var canvas = context.canvas ;
   var hRatio = canvas.width  / img.width    ;
   var vRatio =  canvas.height / img.height  ;
   var ratio  = Math.min ( hRatio, vRatio );
   var centerShift_x = ( canvas.width - img.width*ratio ) / 2;
   var centerShift_y = ( canvas.height - img.height*ratio ) / 2;  
   context.clearRect(0,0,canvas.width, canvas.height);
   context.drawImage(img, 0,0, img.width, img.height,
                      centerShift_x,centerShift_y,img.width*ratio, img.height*ratio);  
}

function drawHealthBars() {
	drawHealthBar(player1);
	drawHealthBar(player2);
}

function drawHealthBar(player) {
	if (player != null) {
		player.healthBar.show(context);
	}
}

function drawXpBar() {
	if (player1 != null) {
		player1.xpBar.show(context);
	}
}

function updateSprites() {
	updateSprite(player1);
	updateSprite(player2);
}

function updateSprite(player) {
	if (player != null) {
		player.updateSpriteStep();
	}
}

function updatePositions() {
	updatePosition(player1);
	updatePosition(player2);
}

function updatePosition(player) {
	if (player != null) {
		player.updatePosition();
	}
}


function displayStats() {
	if (player1 != null) {
		$("#player1 .hp").text(player1.hp);
		$("#player1 .strenght").text(player1.strenght);
		$("#player1 .magic").text(player1.magic);
		$("#player1 .range").text(player1.range);
		$("#player1 .speed").text(player1.speed);
		$("#player1 .agility").text(player1.agility);
	}
	if (player2 != null) {
		$("#player2 .hp").text(player2.hp);
		$("#player2 .strenght").text(player2.strenght);
		$("#player2 .magic").text(player2.magic);
		$("#player2 .range").text(player2.range);
		$("#player2 .speed").text(player2.speed);
		$("#player2 .agility").text(player2.agility);
	}
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

function awardXp(deadPlayer) {
	if (deadPlayer == player2){
		player1.xpBar.gainXp();
		database.updateBrute(player1);
	}
}

function newBattle() {
	initBackground();
	player1.reset();
	
	player2 = new Player(975, 350, Direction.Left);
	while (player1.lvl > player2.lvl) {
		lvlUpHandler.lvlUp(player2)
	}
	player2.reset();
	
	player1.addEnemy(player2);
	player2.addEnemy(player1);
	
	
	
	chooseStartingPlayer();
	startingPlayer.walkingToEnemy();
	
	displayStats();
	
	if (paused == true) {
		paused = false;
		document.getElementById('pauseBtn').innerText = 'pause';
		requestAnimationFrame(gameLoop);
	}
}


document.addEventListener("end-of-turn", function(e) {
	if (player1 == e.detail && player2.status != "dying") {
		player2.walkingToEnemy();
	} else if (player2 == e.detail && player1.status != "dying") {
		player1.walkingToEnemy();
	}
});

document.addEventListener("death", function(e) {
	setTimeout(awardXp.bind(null,e.detail), 500) 
});

document.addEventListener("lvlUp", function(e) {
	displayStats();
	if (e.detail == player1) {
		$("#lvlUpModal").modal('show');
	}
});

document.addEventListener("hit", function(e) {
	hitsplats.push(new Hitsplat(hitsplat, e.detail.damage, e.detail.player.positionX, e.detail.player.positionY))
});

document.addEventListener("DOMContentLoaded", function() {
	document.getElementById('newBattleBtn').addEventListener('click', function() {
		newBattle();
	});
	
	document.getElementById('pauseBtn').addEventListener('click', function() {
		if (paused == false) {
			paused = true;
			this.innerText = 'unpause';
		} else {
			paused = false;
			this.innerText = 'pause';
			requestAnimationFrame(gameLoop);
		}
	});
	
	document.getElementById('audioPauseBtn').addEventListener('click', function() {
		audio.muted = !audio.muted;
		if (audio.muted) {
			this.innerText = 'unmute';
		} else {
			this.innerText = 'mute';
		}
	});
});

function randomIntFromInterval(min, max) { // min and max included 
  return Math.floor(Math.random() * (max - min + 1) + min)
}
