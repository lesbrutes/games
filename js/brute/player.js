var startPositionLeftX = 975;
var startPositionLeftY = 350;
    	
var startPositionRightX= 150;
var startPositionRightY = 350;

class Player {
    constructor(initialX, initialY, startDirection, spriteType) {
	
        this.sprites;
        this.currentSprite;
        this.spriteStep = 0;
        this.initialX = initialX;
        this.initialY = initialY;
        this.positionX = initialX;
        this.positionY = initialY;
        this.startDirection = startDirection;
        this.direction = this.startDirection;
        this.status = "test";
        this.name = "Enemy";
        this.spriteType = spriteType;


		this.lvl = 1
		this.xp = 0;
        this.totalXp = 0;

        this.hp = 3;
        this.strength = 1;
        this.defence = 1;
        this.magic = 1;
        this.range = 1;
        this.speed = 1;
        this.agility = 1;

        this.activeWeapon = null;
        this.weapons = [];
        this.usedWeapons = [];
        
        this.activeSpell = null;
        this.spells = [];
        this.usedSpells = [];
        
        this.cauldron = null;
        this.shield = shields.getRandomT1Shield();
        
        this.healthBar;
        this.enemy;

        this.init();
    }
    
    reset() {
	    this.spriteStep = 0;
        this.currentSprite = this.sprites.Idle;
        this.status = "idling";
        this.positionX = this.initialX;
        this.positionY = this.initialY;
        this.direction  = this.startDirection;
        this.healthBar.reset();
        this.activeWeapon = null;
        this.usedWeapons = [];
        this.activeSpell = null;
        this.usedSpells = [];
	}
    
    dealDamage() {
	    console.log("dealingDamage");
	    var damageDealt = this.calculateDamage();
		this.enemy.healthBar.updateHealth(Math.max(this.enemy.healthBar.health - damageDealt, 0));
		this.notifySuccessfulHit(damageDealt);
    }
    
    idling() {
        this.spriteStep = 0;
        this.currentSprite = this.sprites.Idle;
        this.status = "idling";
        console.log("idling");
    };
    
    idlingAndEndTurn() {
		if (this.status != "castingSpell") {
			this.tryToRemoveWeapon();
		}
        this.idling();
        this.notifyEndOfTurn();
    };

    
   walkingToEnemy() {
	    this.tryToEquipWeapon();
		if (this.tryCastingSpell()) {
			this.castSpell();
		} else {
			this.spriteStep = 0;
	        this.currentSprite = this.sprites.Walk;
	        this.status = "walkingToEnemy";
	        console.log("walkingToEnemy");
		}
    };
    
   dying() {
        this.spriteStep = 0;
        this.currentSprite = this.sprites.Death;
        this.status = "dying";
        console.log("dying");
    };
    
   attacking() {
        this.spriteStep = 0;
        this.currentSprite = this.sprites.Attack;
        this.status = "attacking";
        console.log("attacking");
    };
    
    countering() {
		this.spriteStep = 0;
        this.currentSprite = this.sprites.Attack;
        this.status = "countering";
        console.log("countering");
	}
	
	blocking() {
		this.spriteStep = 0;
        this.currentSprite = this.sprites.Block;
        this.status = "blocking";
        console.log("blocking");
	}
	
	dodging() {
		this.spriteStep = 0;
        this.currentSprite = this.sprites.Walk;
        this.status = "dodging";
        console.log("dodging");
	}
	
	castSpell() {
		this.spriteStep = 0;
        this.currentSprite = this.sprites.Idle;
        this.status = "castingSpell";
        console.log("castingSpell");
        if (this.activeSpell != null) {
			this.activeSpell.positionX = this.positionX + (this.direction == Direction.Right ? 50 : 0);
		}
	}
    
    tryAvoiding() {
	    if (this.isEnemyInAttackRange() && this.doesCounterSucceed()) {
		    this.countering();
		} else if (this.doesBlockSucceed()) {
			this.blocking();
		} else if (this.doesDodgeSucceed()) {
			this.dodging();
		}
		
	}
    
    //Trigger end of turn
    walkingHome() {
        this.spriteStep = 0;
        this.currentSprite = this.sprites.Walk;
        this.status = "walkingHome";
        this.changeDirection();
        console.log("walkingHome");
    };
    
    //Dont trigger end of turn/direction change
    goHomeAfterDodging() {
        this.spriteStep = 0;
        this.currentSprite = this.sprites.Walk;
        this.status = "goingHome";
        console.log("goHomeAfterDodging");
    };
    
    doesCounterSucceed() {
		var statDiff = Math.max(this.speed - this.enemy.agility, 0);
	    var odds = Math.min(10+(5*statDiff), 60); 
	    
	    var randomInt = randomIntFromInterval(1,100);
		return odds >= randomInt;
	}
	
	doesBlockSucceed() {
	    var odds = 15; 
	    var randomInt = randomIntFromInterval(1,100);
		return odds >= randomInt;
	}
	
	doesDodgeSucceed() {
		var statDiff = Math.max(this.agility - this.enemy.speed, 0);
	    var odds = Math.min(10+(10*statDiff)+this.shield.blockChance, 60); 
	    
	    var randomInt = randomIntFromInterval(1,100);
		return odds >= randomInt;
	}
	
	calculateDamage() {
		if (this.activeSpell != null) {
			return this.calculateSpellDamage();
		} else {
			return this.calculateWeaponDamage();
		}
	}
	
	calculateWeaponDamage() {
		var randomInt = randomIntFromInterval(1,100);

		var baseDamage = this.activeWeapon != null ? this.activeWeapon.damage : 1;
		var statDiff = Math.max(this.strength - this.enemy.defence, 0);
		var damage =  baseDamage * ((statDiff/10)+1); //10% dmg par stat diff
		var restant = (damage % Math.floor(damage));
		var odds = restant * 100;
		
		if (odds >= randomInt) {
			return Math.ceil(damage);
		} else  {
			return Math.floor(damage);
		}
	}
	
	calculateSpellDamage() {
		var randomInt = randomIntFromInterval(1,100);
		
		var magicAffinity = this.activeWeapon != null ? this.activeWeapon.magicAffinity : 0;
		var affinityMutiplier = magicAffinity != 0 ? 1 + (magicAffinity/10) : 1 // 10% per weapon affinity stat point
		
		var cauldronBonus = this.cauldron != null ? this.cauldron.damage : 0;
				
		var baseDamage = this.activeSpell != null ? this.activeSpell.damage : 1;
		var statDiff = Math.max(this.magic - this.enemy.defence, 0);
		var statDiffMutiplier = ((statDiff/10)+1) //10% dmg par stat diff
		
		var damage =  (baseDamage+cauldronBonus) * statDiffMutiplier * affinityMutiplier;
		var restant = (damage % Math.floor(damage));
		var odds = restant * 100;
		
		if (odds >= randomInt) {
			return Math.ceil(damage);
		} else  {
			return Math.floor(damage);
		}
	}
	
	tryToEquipWeapon() {
		var availableWeapons = this.getAvailableWeapons();
		if (this.activeWeapon == null && availableWeapons.length > 0) {
			var randomInt = randomIntFromInterval(1,100);
			if (randomInt >= 50) {
				var randomIndex = randomIntFromInterval(0, availableWeapons.length-1);
				this.activeWeapon = availableWeapons[randomIndex];
				this.usedWeapons.push(availableWeapons[randomIndex]);
			}
		}
	}
	
	tryToRemoveWeapon() {
		if (this.activeWeapon != null) {
		    var randomInt = randomIntFromInterval(1,100);
			if (randomInt >= 70) {
				this.activeWeapon = null;
			}
		}
	}
	
	getAvailableWeapons() {
		return this.weapons.filter(weapon => !this.usedWeapons.includes(weapon));
	}
	
	getAvailableSpells() {
		return this.spells.filter(spell => !this.usedSpells.includes(spell));
	}
	
	castRandomSpell() {
		var availableSpells = this.getAvailableSpells();
		var randomIndex = randomIntFromInterval(0, availableSpells.length-1);
		this.activeSpell = availableSpells[randomIndex];
		this.usedSpells.push(availableSpells[randomIndex]);
	}
	
	tryCastingSpell() {
		var availableSpells = this.getAvailableSpells();
		if (this.activeSpell == null && availableSpells.length > 0) {
			var randomInt = randomIntFromInterval(1,100);
			if (randomInt >= 25) {
                this.castRandomSpell();
                return true;
			}
		}
		return false;
	}
    
   updateSpriteStep() {
		//Sprite debug
//		this.currentSprite = this.sprites.Block;
//		this.status = "blocking";
//			var stepSpeed = 1;
//		    this.spriteStep += stepSpeed;
//		    if (this.spriteStep >= this.currentSprite.totalSteps) { 
//			    this.changeDirection();
//		        this.spriteStep -= this.currentSprite.totalSteps;
//		    }
//		    
//		    return;

	
		if (this.status == "dying" && this.spriteStep >= this.currentSprite.totalSteps) {
			this.spriteStep = this.currentSprite.totalSteps;
		 	return; //Si on est mort et l'animation est fini, alors on reste sur le dernier frame.
		}
	    var stepSpeed = Math.round((this.currentSprite.speed * ((this.speed/100)+1))*100)/100;
	    var stepSpeed = Math.min(stepSpeed, 1); // On ne doit pas dépasser 1 pour ne pas skip de frame
	    this.spriteStep += stepSpeed;
	    if (this.spriteStep >= this.currentSprite.totalSteps && this.status != "attacking" && this.status != "countering"  && this.status != "blocking" && this.status != "dying") { 
	        this.spriteStep -= this.currentSprite.totalSteps;
	    } else if (this.spriteStep >= this.currentSprite.totalSteps && this.status == "attacking") {
	        this.walkingHome();
	    } else if (this.spriteStep >= this.currentSprite.totalSteps && (this.status == "countering" || this.status == "blocking")) {
	        this.idling();
	    } else if ((this.status == "attacking" || this.status == "countering") && (this.enemy.status != "blocking" && this.enemy.status != "dodging") && this.spriteStep >= this.currentSprite.hitStep &&  this.spriteStep < this.currentSprite.hitStep + stepSpeed) {
			this.dealDamage();
		} else if ((this.status == "attacking" || this.status == "countering") && this.enemy.status == "dodging" && this.spriteStep >= this.currentSprite.hitStep &&  this.spriteStep < this.currentSprite.hitStep + stepSpeed) {
			this.enemy.goHomeAfterDodging();
		}else if (this.status == "attacking" && this.spriteStep >= this.currentSprite.hitStep-3 && this.spriteStep <= this.currentSprite.hitStep-3 + stepSpeed ) {
			this.enemy.tryAvoiding();
		}else if (this.status == "castingSpell" && this.activeSpell != null && this.isPastEnemy(this.activeSpell.positionX)) {
			this.dealDamage();
			this.activeSpell = null;
			this.idlingAndEndTurn();
		}
	};
	
	isPastEnemy(position) {
	   if (this.direction == Direction.Left) {
	        return position <= this.enemy.positionX+100;
	    } else {
	        return position >= this.enemy.positionX+100;
	    }
	}

   updatePosition() {
		this.updateSpellPosition();
        if (this.currentSprite != this.sprites.Walk) {
            return;
        }

        if (this.status == "walkingToEnemy" && this.isAtEnemy()) {
            this.attacking();
            return;
        } else if (this.status == "walkingHome" && this.isHome()) {
            this.changeDirection();
            this.idlingAndEndTurn();
            return;
        } else if (this.status == "goingHome" && this.isHome()) {
			this.idling();
		} else if (this.status == "dodging") {
	        if (this.direction == Direction.Left) {
                this.positionX += this.getStepSize();
                return;
            } else {
                this.positionX -= this.getStepSize();
                return;
            }
		} else {
            if (this.direction == Direction.Left) {
                this.positionX -= this.getStepSize();
                return;
            } else {
                this.positionX += this.getStepSize();
                return;
            }
        }
    };
    
    updateSpellPosition() {
	    var spellTravelSpeed = 15;
		if (this.status == "castingSpell" &&  this.activeSpell != null) {
			 if (this.direction == Direction.Left) {
                this.activeSpell.positionX -= spellTravelSpeed;
            } else {
                this.activeSpell.positionX += spellTravelSpeed;
            }
        }
	}
    
    getStepSize() {
		if (this.status == "dodging" || this.status == "goingHome") {
			return 2;
		}
		return 10;
	}
    
    isAtEnemy() {
        if (this.startDirection == Direction.Left) {
            return this.positionX <= startPositionRightX + 90;
        } else {
            return this.positionX >= startPositionLeftX - 90;
        }
    };
    
    isEnemyInAttackRange() {
		return Math.abs(this.positionX - this.enemy.positionX) <= 100;
	}
    
    isHome() {
	    //Si on est suffisament proche, on force sur la bonne position
		if (this.positionX > this.initialX - this.getStepSize() && this.positionX < this.initialX + this.getStepSize()) {
			this.positionX = this.initialX;
			return true;
		}
		return false;
    };
    
    changeDirection() {
            if (this.direction == Direction.Left) {
                this.direction = Direction.Right;
            } else {
                this.direction = Direction.Left;
            }
            console.log("changing direction");
        };
    
    notifyEndOfTurn() {
            console.log("Notifying end of turn");
            var event = new CustomEvent("end-of-turn", { "detail": this });
            document.dispatchEvent(event);
    };
    
   notifySuccessfulHit(damage) {
            console.log("notifySuccessfulHit");
            var event = new CustomEvent("hit", { "detail": { "damage": damage, "player" : this.enemy } });
            document.dispatchEvent(event);
    };
    
    isPlayer1() {
		return this.startDirection == Direction.Right;
    }
    
    setStartDirection(direction) {
		this.startDirection = direction;
		this.direction = direction;
	}
	
	 setInitialX(initialX) {
		this.initialX = initialX;
		this.positionX = initialX;
	}
	
	 setInitialY(initialY) {
		this.initialY = initialY;
		this.positionY = initialY;
	}
    
    addEnemy(enemy) {
		this.enemy = enemy;
	}
	
	setHp(hp) {
		this.hp = hp;
		this.healthBar.reset();
	}
	
	show(context) {
		this.currentSprite.show(context);
	}
    
    init() {
		this.initSprites();
        this.initHealthBar();
        this.xpBar = new XpBar(this);
    };
    
    initHealthBar() {
        if (this.isPlayer1()) {
			this.healthBar = new HealthBar(10, 10, this);
		} else {
			this.healthBar = new HealthBar(768, 10, this);
		}
	}
	
	initSprites() {
		this.spriteType = this.spriteType != null ? this.spriteType : randomIntFromInterval(1,5);
		this.sprites = new PlayerSprites(this);
        this.currentSprite = this.sprites.Idle;
        //this.direction = Direction.Left;
	}
}

class Direction {
  // Create new instances of the same class as static attributes
  static Left = new Direction("LEFT")
  static Right = new Direction("RIGHT")

  constructor(name) {
    this.name = name
  }
  
}