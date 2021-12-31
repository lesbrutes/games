var startPositionLeftX = 975;
var startPositionLeftY = 350;
    	
var startPositionRightX= 150;
var startPositionRightY = 350;

class Player {
    constructor(sprites, initialX, initialY, startDirection) {
	
	

        this.sprites = sprites;
        this.currentSprite = sprites.Idle;
        this.spriteStep = 0;
        this.initialX = initialX;
        this.initialY = initialY;
        this.positionX = initialX;
        this.positionY = initialY;
        this.startDirection = startDirection;
        this.direction = this.startDirection;
        this.status = "idling";

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
        
        this.healthBar;

        this.init();
    }
    
    idling() {
        this.spriteStep = 0;
        this.currentSprite = this.sprites.Idle;
        this.status = "idling";
        console.log("idling");
        this.notifyEndOfTurn();
        this.currentSprite.updateSource(this.direction.name);
    };

    
   walkingToEnemy() {
        this.spriteStep = 0;
        this.currentSprite = this.sprites.Walk;
        this.status = "walkingToEnemy";
        console.log("walkingToEnemy");
        this.currentSprite.updateSource(this.direction.name);
    };
    
   attacking() {
        this.spriteStep = 0;
        this.currentSprite = this.sprites.Attack;
        this.status = "attacking";
        console.log("attacking");
        this.currentSprite.updateSource(this.direction.name);
    };
    
    walkingHome() {
        this.spriteStep = 0;
        this.currentSprite = this.sprites.Walk;
        this.status = "walkingHome";
        this.changeDirection();
        console.log("walkingHome");
        this.currentSprite.updateSource(this.direction.name);
    };
    
   updateSpriteStep() {
	    this.spriteStep += this.currentSprite.speed * this.speed;
	    if (this.spriteStep >= this.currentSprite.totalSteps && this.status != "attacking") {
	        this.spriteStep -= this.currentSprite.totalSteps;
	    } else if (this.spriteStep >= this.currentSprite.totalSteps && this.status == "attacking") {
	        this.walkingHome();
	    }
	};

   updatePosition() {
        if (this.currentSprite != this.sprites.Walk) {
            return;
        }

        if (this.status == "walkingToEnemy" && this.isAtEnemy()) {
            this.attacking();
            return;
        } else if (this.status == "walkingHome" && this.isHome()) {
            this.changeDirection();
            this.idling();
            return;
        } else {
            if (this.direction == Direction.Left) {
                this.positionX -= 4;
                return;
            } else {
                this.positionX += 4;
                return;
            }
        }
    };
    
    isAtEnemy() {
        if (this.startDirection == Direction.Left) {
            return this.positionX <= startPositionRightX + 90;
        } else {
            return this.positionX >= startPositionLeftX - 90;
        }
    };
    
    isHome() {
        if (this.startDirection == Direction.Left) {
            return this.positionX >= this.initialX;
        } else {
            return this.positionX <= this.initialX;
        }
    };
   
    
    changeDirection() {
            if (this.direction == Direction.Left) {
                this.direction = Direction.Right;
            } else {
                this.direction = Direction.Left;
            }
            this.currentSprite.updateSource(this.direction.name);
            console.log("changing direction");
        };
    
    notifyEndOfTurn() {
            console.log("Notifying end of turn");
            var event = new CustomEvent("end-of-turn", { "detail": this });
            document.dispatchEvent(event);
    };
    
    isPlayer1() {
		return this.startDirection == Direction.Right;
    }
    
    init() {
        this.currentSprite = this.sprites.Idle;
        this.currentSprite.updateSource(this.startDirection.name);
        this.initHealthBar();
    };
    
    initHealthBar() {
        if (this.isPlayer1()) {
			this.healthBar = new HealthBar(10, 10, this.hp);
		} else {
			this.healthBar = new HealthBar(768, 10, this.hp);
		}
	}
}

//Season enums can be grouped as static members of a class
class Direction {
  // Create new instances of the same class as static attributes
  static Left = new Direction("LEFT")
  static Right = new Direction("RIGHT")

  constructor(name) {
    this.name = name
  }
  
}