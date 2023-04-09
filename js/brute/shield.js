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
		this.loveShield = new Shield(2, 0,  new ShieldSprite("../image/brute/shields/t1/loveShield.png"));
		this.roundShield = new Shield(3, 0,  new ShieldSprite("../image/brute/shields/t1/roundShield.png"));
		this.squareShield = new Shield(4, 0,  new ShieldSprite("../image/brute/shields/t1/squareShield.png"));
		this.u2Shield = new Shield(5, 0,  new ShieldSprite("../image/brute/shields/t1/u2Shield.png"));
		this.uShield = new Shield(6, 0,  new ShieldSprite("../image/brute/shields/t1/uShield.png"));
		this.v2Shield = new Shield(7, 0,  new ShieldSprite("../image/brute/shields/t1/v2Shield.png"));
		this.vShield = new Shield(8, 0,  new ShieldSprite("../image/brute/shields/t1/vShield.png"));
		
		this.baseShieldT2 = new Shield(11, 5,  new ShieldSprite("../image/brute/shields/t2/baseShield.png"));
		this.loveShieldT2 = new Shield(12, 5,  new ShieldSprite("../image/brute/shields/t2/loveShield.png"));
		this.roundShieldT2 = new Shield(13, 5,  new ShieldSprite("../image/brute/shields/t2/roundShield.png"));
		this.squareShieldT2 = new Shield(14, 5,  new ShieldSprite("../image/brute/shields/t2/squareShield.png"));
		this.u2ShieldT2 = new Shield(15, 5,  new ShieldSprite("../image/brute/shields/t2/u2Shield.png"));
		this.uShieldT2 = new Shield(16, 5,  new ShieldSprite("../image/brute/shields/t2/uShield.png"));
		this.v2ShieldT2 = new Shield(17, 5,  new ShieldSprite("../image/brute/shields/t2/v2Shield.png"));
		this.vShieldT2 = new Shield(18, 5,  new ShieldSprite("../image/brute/shields/t2/vShield.png"));
		
		this.baseShieldT3 = new Shield(21, 10,  new ShieldSprite("../image/brute/shields/t3/baseShield.png"));
		this.loveShieldT3 = new Shield(22, 10,  new ShieldSprite("../image/brute/shields/t3/loveShield.png"));
		this.roundShieldT3 = new Shield(23, 10,  new ShieldSprite("../image/brute/shields/t3/roundShield.png"));
		this.squareShieldT3 = new Shield(24, 10,  new ShieldSprite("../image/brute/shields/t3/squareShield.png"));
		this.u2ShieldT3 = new Shield(25, 10,  new ShieldSprite("../image/brute/shields/t3/u2Shield.png"));
		this.uShieldT3 = new Shield(26, 10,  new ShieldSprite("../image/brute/shields/t3/uShield.png"));
		this.v2ShieldT3 = new Shield(27, 10,  new ShieldSprite("../image/brute/shields/t3/v2Shield.png"));
		this.vShieldT3 = new Shield(28, 10,  new ShieldSprite("../image/brute/shields/t3/vShield.png"));
		
		this.baseShieldT4 = new Shield(31, 15,  new ShieldSprite("../image/brute/shields/t4/baseShield.png"));
		this.loveShieldT4 = new Shield(32, 15,  new ShieldSprite("../image/brute/shields/t4/loveShield.png"));
		this.roundShieldT4 = new Shield(33, 15,  new ShieldSprite("../image/brute/shields/t4/roundShield.png"));
		this.squareShieldT4 = new Shield(34, 15,  new ShieldSprite("../image/brute/shields/t4/squareShield.png"));
		this.u2ShieldT4 = new Shield(35, 15,  new ShieldSprite("../image/brute/shields/t4/u2Shield.png"));
		this.uShieldT4 = new Shield(36, 15,  new ShieldSprite("../image/brute/shields/t4/uShield.png"));
		this.v2ShieldT4 = new Shield(37, 15,  new ShieldSprite("../image/brute/shields/t4/v2Shield.png"));
		this.vShieldT4 = new Shield(38, 15,  new ShieldSprite("../image/brute/shields/t4/vShield.png"));
	}
	
	getShieldByCode(code) {
		var all = this.getAllShields();
		var result = all.filter(shield => shield.code == code);
		return result.length > 0 ? result[0] : null;
	}
	
	getTier1Shields() {
		return [this.baseShield, this.loveShield, this.roundShield, this.squareShield, this.u2Shield, this.uShield, this.v2Shield, this.vShield];
	}
	
	getTier2Shields() {
		return [this.baseShieldT2, this.loveShieldT2, this.roundShieldT2, this.squareShieldT2, this.u2ShieldT2, this.uShieldT2, this.v2ShieldT2, this.vShieldT2];
	}
	
	getTier3Shields() {
		return [this.baseShieldT3, this.loveShieldT3, this.roundShieldT3, this.squareShieldT3, this.u2ShieldT3, this.uShieldT3, this.v2ShieldT3, this.vShieldT3];
	}
	
	getTier4Shields() {
		return [this.baseShieldT4, this.loveShieldT4, this.roundShieldT4, this.squareShieldT4, this.u2ShieldT4, this.uShieldT4, this.v2ShieldT4, this.vShieldT4];
	}
	
	getAllShields() {
		return this.getTier1Shields().concat(this.getTier2Shields()).concat(this.getTier3Shields()).concat(this.getTier4Shields());
	}
	
	getRandomT1Shield() {
		var t1Shields = this.getTier1Shields();
		var randomIndex = randomIntFromInterval(0, t1Shields.length-1);
		return t1Shields[randomIndex];
	}
	
	getUpgrade(shield) {
		var upgradedShield = this.getShieldByCode(shield.code + 10);
		return upgradedShield != null ? upgradedShield : shield;
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
    
    show(context, attachAtX, attachAtY, attachAtLeftX, attachAtLeftY, player) {
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