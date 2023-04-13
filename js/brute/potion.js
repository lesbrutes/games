class Potion {
	  constructor(code, flatBoost, percentBoost, boostType, sprite) {
		this.code = code;
	    this.flatBoost = flatBoost;
	    this.percentBoost = percentBoost;
	    this.boostType = boostType;
	    this.sprite = sprite;
	  }
}

class Potions {
	constructor() {
		this.agilityPotionT1 = new Potion(1,1,1.1,PotionType.Agility, new PotionSprite("../image/brute/potions/t1/agilityPotion.png", "../image/brute/potions/effects/yellowFire.png"));
		this.defencePotionT1 = new Potion(2,1,1.1,PotionType.Defence,  new PotionSprite("../image/brute/potions/t1/defencePotion.png", "../image/brute/potions/effects/grayFire.png"));
		this.healthPotionT1 = new Potion(3,1,0.05,PotionType.Health,  new PotionSprite("../image/brute/potions/t1/healthPotion.png", "../image/brute/potions/effects/redFire.png"));
		this.magicPotionT1 = new Potion(4,1,1.1,PotionType.Magic,  new PotionSprite("../image/brute/potions/t1/magicPotion.png", "../image/brute/potions/effects/blueFire.png"));
		this.speedPotionT1 = new Potion(5,1,1.1,PotionType.Speed,  new PotionSprite("../image/brute/potions/t1/speedPotion.png", "../image/brute/potions/effects/orangeFire.png"));
		this.strengthPotionT1 = new Potion(6,1,1.1,PotionType.Strength,  new PotionSprite("../image/brute/potions/t1/strengthPotion.png", "../image/brute/potions/effects/blackFire.png"));
	}
	
	getPotionByCode(code) {
		var all = this.getAllPotions();
		var result = all.filter(potion => potion.code == code);
		return result.length > 0 ? result[0] : null;
	}
	
	getTier1Potions() {
		return [this.agilityPotionT1, this.defencePotionT1, this.healthPotionT1, this.magicPotionT1, this.speedPotionT1, this.strengthPotionT1];
	}
	
	getAllPotions() {
		return this.getTier1Potions();
	}
	
	createPotion(code) {
		switch(code){
			case 1:
				return new Potion(1,1,1.1,PotionType.Agility, new PotionSprite("../image/brute/potions/t1/agilityPotion.png", "../image/brute/potions/effects/yellowFire.png"))
			case 2:
				return new Potion(2,1,1.1,PotionType.Defence,  new PotionSprite("../image/brute/potions/t1/defencePotion.png", "../image/brute/potions/effects/grayFire.png"))
			case 3:
				return new Potion(3,1,0.05,PotionType.Health,  new PotionSprite("../image/brute/potions/t1/healthPotion.png", "../image/brute/potions/effects/redFire.png"));
			case 4:
				return new Potion(4,1,1.1,PotionType.Magic,  new PotionSprite("../image/brute/potions/t1/magicPotion.png", "../image/brute/potions/effects/blueFire.png"))
			case 5:
				return new Potion(5,1,1.1,PotionType.Speed,  new PotionSprite("../image/brute/potions/t1/speedPotion.png", "../image/brute/potions/effects/orangeFire.png"));
			case 6:
				return new Potion(6,1,1.1,PotionType.Strength,  new PotionSprite("../image/brute/potions/t1/strengthPotion.png", "../image/brute/potions/effects/blackFire.png"));
		}
	}
}

class PotionSprite {
    constructor(source, effectSource) {
        this.img = new Image();
        this.img.src = source;
        this.imgEffect = new Image();
        this.imgEffect.src = effectSource;
        this.step = 0;
	
        this.scale = 0.08;
        this.width = 365;
        this.height = 488;
        this.scaledWidth = this.width*this.scale;
        this.scaledHeight = this.height*this.scale;
        
        this.effectScale = 0.9;
        this.effectWidth = 90;
        this.effectHeight = 149;
        this.effectScaledWidth = this.effectWidth*this.effectScale;
        this.effectScaledHeight = this.effectHeight*this.effectScale;
        this.effectTotalSteps = 12;
        this.rowStep = 0;
        this.row = 0;
        
        this.angle = 0;
        this.toRadians = Math.PI/180; 
    }
    
    showPotion(context, player) {
		if (player.status == "drinkingPotion") {
			if (player1 == player) {
				context.drawImage(this.img, player.positionX+player.currentSprite.scaledWidth-65-this.step, player.positionY+(player.currentSprite.scaledHeight/2), this.scaledWidth, this.scaledHeight);
			} else {
				context.drawImage(this.img, player.positionX+30+this.step, player.positionY+(player.currentSprite.scaledHeight/2), this.scaledWidth, this.scaledHeight);
			}
			this._updateStep(player);
		}
	}
    
    showEffect(context, player) {
		if (player.status != "drinkingPotion") {
			this._updateEffectRowStep();
			context.drawImage(this.imgEffect, this.effectWidth*this.rowStep, this.effectHeight*this.row, this.effectWidth, this.effectHeight, player.positionX+50, player.positionY-20, this.effectScaledWidth, this.effectScaledHeight);
			this._updateStep(player);
		}
	}
	
	_updateEffectRowStep() {
		this.row = this.step > 6 ? 1 : 0;
		if(this.step > 6) {
			this.rowStep = Math.floor(this.step-6);
			this.row = this.step > 6 ? 1 : 0;
		} else {
			this.rowStep = Math.floor(this.step);
		}
	}
	
	_updateStep(player) {
		if (this._isDrinkingLastStep(player)||this._isEffectLastStep(player)) {
			this.step = 0;
		} else {
			if (player.status != "drinkingPotion") {
				this.step += 0.2;
			} else {
				this.step++;
			}
		}
	}
    
    _isDrinkingLastStep(player) {
		return player.status == "drinkingPotion" && player.activePotion!=null && this.step >= player.currentSprite.totalSteps;
	}
	
	_isEffectLastStep(player) {
		return player.status != "drinkingPotion" && player.activePotion!=null && this.step >= this.effectTotalSteps;
	}
}

class PotionType {
  // Create new instances of the same class as static attributes
  static Agility = new PotionType("AGILITY", "../image/brute/potions/t1/agilityPotion.png", "../image/brute/potions/effects/yellowFire.png")
  static Defence = new PotionType("DEFENCE", "../image/brute/potions/t1/defencePotion.png", "../image/brute/potions/effects/grayFire.png")
  static Health = new PotionType("HEALTH", "../image/brute/potions/t1/healthPotion.png", "../image/brute/potions/effects/redFire.png")
  static Magic = new PotionType("MAGIC", "../image/brute/potions/t1/magicPotion.png", "../image/brute/potions/effects/blueFire.png")
  static Speed = new PotionType("SPEED", "../image/brute/potions/t1/speedPotion.png", "../image/brute/potions/effects/orangeFire.png")
  static Strength = new PotionType("STRENGTH", "../image/brute/potions/t1/strengthPotion.png", "../image/brute/potions/effects/blackFire.png")

  constructor(name, source, effectSource) {
    this.name = name;
    this.source = source;
    this.effectSource = effectSource;
  }
  
}