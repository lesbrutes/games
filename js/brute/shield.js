class Shield {
	  constructor(code, blockChance, sprite) {
		this.code = code;
		this.blockChance = blockChance;
	    this.sprite = sprite;
	  }
}

class Shields {
	constructor() {
		this.baseShield = new Shield(1, 0,  new ShieldSprite("../image/brute/shields/t1/baseShield.png"));
	}
	
	getShieldByCode(code) {
		var all = this.getAllShields();
		var result = all.filter(shield => shield.code == code);
		return result.length > 0 ? result[0] : null;
	}
	
	
	getTier1Shields() {
		return [this.baseShield];
	}
	
	getAllShields() {
		return this.getTier1Shields();
	}
	
	getRandomT1Shield() {
		var t1Shields = this.getTier1Shields();
		var randomIndex = randomIntFromInterval(0, t1Shields.length-1);
		return t1Shields[randomIndex];
	}
	
}

class ShieldSprite {
    constructor(source) {
        this.img = new Image();
        this.img.src = source;
	
        this.scale = 0.3;
        this.width = 160*this.scale;
        this.height = 160*this.scale;
    }
    
    show(context, attachAtX, attachAtY, attachAtLeftX, attachAtLeftY, player, step) {
		var x;
	    var y;
	    
		if (player.direction == Direction.Left) {
			 x  = player.positionX + attachAtLeftX;
    		 y = player.positionY + attachAtLeftY;
		} else {
			 x  = player.positionX + attachAtX;
    		 y = player.positionY + attachAtY;
		}
		
		context.drawImage(this.img, x, y, this.width, this.height);
    }
}