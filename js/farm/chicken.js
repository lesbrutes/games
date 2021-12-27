function Chicken() {
	
	this.maxX = $("#barn").width()-100;
	this.maxY = $("#grass").height()-100;
	
	this.minX = 10;
	this.minY = 150;
	
	this.speed = 1;
	this.hapiness = 100;
	this.homeX = 165;
	this.homeY = 170;
	this.x = this.homeX;
	this.y = this.homeY;
    
	this.targetX;
	this.targetY;
    
	this.div = document.createElement('div');
	this.div.className = "chicken";
	this.div.style.left = this.homeX + 'px';
	this.div.style.top = this.homeY + 'px';
	var img = document.createElement("img");
	img.setAttribute("src", "../image/farm/chickenR.png");
	this.div.appendChild(img);
	$("#layer1").append(this.div);
	
	this.movingInterval;
	this.dropEggInterval;
	this.wanderInterval;
	
    this.goHome = function(){
    	this.removeIntervals();
    	this.targetX = this.homeX;
    	this.targetY = this.homeY;
    	this.updateDirection();
    	this.movingInterval = setInterval(this.moveTowardTargetPosition.bind(this), 25*this.speed);
    }; 
    this.wander = function(){
    	this.removeIntervals();
    	$(this.div).show();
    	this.goToRandomPosition();
    	this.wanderInterval = setInterval(this.goToRandomPosition.bind(this), 60000);
    	this.dropEggInterval = setInterval(this.dropEgg.bind(this), 10000 + ((100-this.hapiness)*250));
    };
    
    this.goToRandomPosition = function(){
    	clearInterval(this.movingInterval);
    	this.targetX = randomIntFromInterval(this.minX, this.maxX);
    	this.targetY = randomIntFromInterval(this.minY, this.maxY);
    	this.updateDirection();
    	this.movingInterval = setInterval(this.moveTowardTargetPosition.bind(this), 25*this.speed);
    }
    
    this.moveTowardTargetPosition = function(){
    	if (this.x < this.targetX){
    		this.div.style.left = this.x + 1 + "px";
    		this.x += 1;
    	} 
    	//On permet daller a gauche s'il ne va pas foncer dans la grange
    	else if (this.x > this.targetX && this.y >= 150){
    		this.div.style.left = this.x - 1 + "px";
    		this.x -= 1;
    	}
    	if (this.y < this.targetY){
    		this.div.style.top = this.y + 1 + "px";
    		this.y += 1;
    	}
    	//On permet de monter s'il ne va pas foncer dans la grange
    	else if (this.y > this.targetY && (this.x > 400 || this.y > 150) ){
    		this.div.style.top = this.y - 1 + "px";
    		this.y -= 1;
    	}
    	if(this.x == this.targetX && this.y == this.targetY){
    		clearInterval(this.movingInterval);
    		if (this.x == this.homeX && this.y == this.homeY){
    			$(this.div).hide();
    		}
    	}
    }
    
    this.removeIntervals = function(){
    	clearInterval(this.movingInterval);
    	clearInterval(this.dropEggInterval);
    	clearInterval(this.wanderInterval);
    }
    
    this.updateDirection = function(){
    	if (this.x < this.targetX){
    		this.div.firstChild.setAttribute("src", "../image/farm/chickenR.png");
    	}else{
    		this.div.firstChild.setAttribute("src", "../image/farm/chickenL.png");
    	}
    }
    
    this.dropEgg = function(){
    	var egg = document.createElement('div');
    	egg.className = "egg";
    	egg.style.left = this.x-10 + 'px';
    	egg.style.top = this.y+10 + 'px';
    	
    	var img = document.createElement("img");
    	img.setAttribute("src", "../image/farm/egg.png");
    	img.className = "eggImg";
    	egg.appendChild(img);
    	
    	var grass = document.getElementById("layer1");
    	
    	grass.insertBefore(egg, grass.firstChild);
    	
    	setTimeout(function(){ removeEgg(egg); }, 60000);
    	this.goToRandomPosition();
    	
    	var removeEgg = function(egg){
    		$(egg).remove();
    	}
    }
}

function randomIntFromInterval(min,max){
    return Math.floor(Math.random()*(max-min+1)+min);
}
