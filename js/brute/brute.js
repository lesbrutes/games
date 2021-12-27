var startPositionLeftX = 975;
var startPositionLeftY = 350;
    	
var startPositionRightX= 150;
var startPositionRightY = 350;

function Brute(direction) {
	
	this.lvl = 1;
	this.xp = 0;
	
	this.hp = 10;
	this.strenght = 1;
	this.defence = 1;
    this.magic = 1;
    this.range = 1;
    this.speed = 1;
	this.agility = 1;
	
	this.activeWeapon = null;
	this.weapons = [];
	
	this.startDirection = direction;
	
	this.div;
	this.attackDiv;
	this.movingInterval;
    
    this.attack = function() {
    	clearInterval(this.movingInterval);
    	this.movingInterval = setInterval(this.moveTowardEnemy.bind(this), 5*this.speed);
    }
    
    this.lvlUp = function() {
    	//todo
    }
    
    this.moveTowardEnemy = function(){
    	var targetX = this.getEnemyPositionX();
    	console.log("Moving toward: " + targetX);
    	this.moveTowardPositionX(targetX);
    }
    

    this.moveTowardPositionX = function(targetX){
    	var xString = this.div.style.left;
    	var currentX = Number(xString.substring(0, xString.length - 2));
    	if (currentX < targetX){
    		this.div.style.left = currentX + 1 + "px";
    	} 

    	else if (currentX > targetX){
    		this.div.style.left = currentX - 1 + "px";
    	}
    	
    	console.log("New x: " + currentX);
    	
    	if(currentX == targetX){
    		clearInterval(this.movingInterval);
    		if (currentX != this.getInitialPositionX()) {
    			this.attackEnemy();
    		}
    	}
    }
    
    this.attackEnemy = function() {
    	this.attackDiv = document.createElement('div');
        this.attackDiv.className = "attackAnimation";
        this.attackDiv.style.left = this.getEnemyPositionX() + 'px';
        this.attackDiv.style.top = this.startPositionY + 'px';
        var img = document.createElement("img");
        img.setAttribute("src", "../image/brute/animation/pow.png");
        this.attackDiv.appendChild(img);
        
        $("#gameContainer").append(this.attackDiv);
        setTimeout(this.removeAttackAnimationAndRunBack.bind(this), 2000);
    }
    
    this.removeAttackAnimationAndRunBack = function(){
    	this.attackDiv.remove(); 
    	this.moveTowardPositionX(this.getInitialPositionX());
    }
    
    this.getEnemyPositionX = function() {
    	if (this.startDirection == Direction.Left) {
    		return startPositionRightX + 50;
    	} else {
    		return startPositionLeftX - 50;
    	}
    }
    
    //TODO VOIR POURQUOI IL NE REBACK PAS
    this.getInitialPositionX = function() {
    	if (this.startDirection == Direction.Left) {
    		return startPositionLeftX;
    	} else {
    		return startPositionRightX;
    	}
    }
    
    this.init = function () {
    	this.div = document.createElement('div');
        this.div.className = "brute";
        this.div.style.left = this.startPositionX + 'px';
        this.div.style.top = this.startPositionY + 'px';
        var img = document.createElement("img");
        if (this.startDirection == Direction.Left) {
            this.div.style.left = startPositionLeftX + 'px';
            this.div.style.top = startPositionLeftY + 'px';
        	img.setAttribute("src", "../image/brute/brutes/bruteL.png");
        } else {
            this.div.style.left = startPositionRightX + 'px';
            this.div.style.top = startPositionRightY + 'px';
        	img.setAttribute("src", "../image/brute/brutes/bruteR.png");
        }
        this.div.appendChild(img);
        
        $("#gameContainer").append(this.div);
    }
    this.init();
}


//Season enums can be grouped as static members of a class
class Bonus {
  // Create new instances of the same class as static attributes
  static HP = new Bonus("HP")
  static Strenght = new Bonus("STR")

  constructor(name) {
    this.name = name
  }
}