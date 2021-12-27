
function Cloud(){
	this.skyWidth = $("#sky").width();
	this.x = -335;
	this.speed = 1;
	this.direction = "right";
	
	this.cloud = document.createElement('img');
	this.cloud.className = "cloud";
	this.cloud.src = "../image/farm/cloud/cloud4.png";
	this.cloud.style.left = this.x+"px";
	var sky = document.getElementById("sky");
	sky.appendChild(this.cloud);
	
	this.move = function(){
		this.x += this.speed;
		if (this.x < this.skyWidth){
			this.cloud.style.left = this.x + 1 + "px";
		} else{
			$(this.cloud).remove();
		}
	}
}
function StormCloud(){
	this.skyWidth = $("#sky").width();
	this.x = -421;
	this.speed = 1;
	this.direction = "right;"
		
	this.cloud = document.createElement('img');
	this.cloud.className = "cloud storm";
	this.cloud.src = "../image/farm/cloud/cloud10.png";
	this.cloud.style.left = "-421px";
	var sky = document.getElementById("sky");
	sky.appendChild(this.cloud);
	
	this.move = function(){
		this.x += this.speed;
		if (this.x < this.skyWidth){
			this.cloud.style.left = this.x + 1 + "px";
		} else{
			$(this.cloud).remove();
			if ($(this.cloud).hasClass("storm")){
				deleteAllRain();
			}
		}
	}
}

function createRain(){
	var clouds = document.getElementsByClassName("cloud storm");
	var gameContainer = document.getElementById("gameContainer");
	
	for (i=0; i<clouds.length;i++){
		var temp = clouds[i].style.left;
		var position = Number(temp.slice(0, temp.length-2));
		var width = clouds[i].width;
		
		var rainDrop = document.createElement('div');
		rainDrop.className = "rainDrop";
		rainDrop.style.width = random(2,3) + "px";
		rainDrop.style.height = random(8,14)+ "px";
		rainDrop.style.top = Number(removeLast2Char(clouds[i].style.top)) + 80 + "px";
		rainDrop.style.value = random(10,20); //speed
		rainDrop.style.left = random(position+20,position+width-40) + "px";
		gameContainer.appendChild(rainDrop);
	}
}
function rainFall(){
	var rainDrops = document.getElementsByClassName("rainDrop");
	var i = 0;
	for (i; i<rainDrops.length;i++){
		var y = Number(removeLast2Char(rainDrops[i].style.top));
		var test = document.getElementById("gameContainer").clientHeight;
		if (y > document.getElementById("gameContainer").clientHeight){
			$(rainDrops[i]).remove();
		} else{
			rainDrops[i].style.top = Number(removeLast2Char(rainDrops[i].style.top)) + rainDrops[i].style.value + "px";
		}
	}
}

function deleteAllRain(){
	$(".rainDrop").remove();
}

function random(min,max){
    return Math.floor(Math.random()*(max-min+1)+min);
}

function removeLast2Char(string){
	return string.slice(0, -2);
}

$(document).ready(function () {
	setInterval(createRain, 50);
	setInterval(rainFall, 25);
	setInterval(deleteAllRain, 10000);
});