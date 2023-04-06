class PlayerSprite {
    constructor(source, totalSteps, weaponAngles, attachPointsX, attachPointsY, attachPointsLeftX, attachPointsLeftY, width, height, scale, speed, player) {

		this.images = new Map();
        this.img = new Image();
        this.source = source;
        this.step = 0;
        this.width = width;
        this.height = height;
        this.totalSteps = totalSteps; //Indexe a 0
        this.weaponAngles = weaponAngles;
        this.attachPointsX = attachPointsX;
        this.attachPointsY = attachPointsY;
        this.attachPointsLeftX = attachPointsLeftX;
        this.attachPointsLeftY = attachPointsLeftY;
        this.scale = scale;
        this.speed = speed;
        this.player = player;
        this.init();
    }
    
    init() {
		var imgRight = new Image();
		imgRight.src = this.source + Direction.Right.name + ".png";
		this.images.set(Direction.Right.name, imgRight);
		var imgLeft = new Image();
		imgLeft.src = this.source + Direction.Left.name + ".png";
		this.images.set(Direction.Left.name, imgLeft);
    }
    
    updateDirection() {
		this.img = this.images.get(this.player.direction.name);
	}
	
	show(context) {
		this.updateDirection();
		this.showActiveWeapon();
		this.showActiveSpell();
	    this.showPlayer(context);
	    this.showCauldron();
    }
    
    showActiveWeapon() {
		if (this.player.activeWeapon != null && this.player.status != "dying") {
			this.player.activeWeapon.sprite.show(context, this.weaponAngles[Math.floor(this.player.spriteStep)],this.attachPointsX[Math.floor(this.player.spriteStep)],this.attachPointsY[Math.floor(this.player.spriteStep)],this.attachPointsLeftX[Math.floor(this.player.spriteStep)],this.attachPointsLeftY[Math.floor(this.player.spriteStep)], this.player);
		}
	}
	
	showActiveSpell() {
		if (this.player.activeSpell != null && this.player.status == "castingSpell") {
			this.player.activeSpell.sprite.show(context, this.player.activeSpell.positionX, this.player.activeSpell.positionY);
		}
	}
	
	showCauldron() {
		if (this.player.cauldron != null) {
			if (this.player == player1) {
				this.player.cauldron.sprite.show(context, this.player.initialX-40, this.player.initialY+30);
			} else {
				this.player.cauldron.sprite.show(context, this.player.initialX+80, this.player.initialY+30);
			}
		}
	}
    
    showPlayer(context) {
		var s = this.scale; //Facteur d'aggrandissement
	    var step = Math.floor(this.player.spriteStep);
	    
	    context.drawImage(this.img, this.width*step, 0, this.width, this.height, this.player.positionX, this.player.positionY, this.width*s, this.height*s);
	    this.showWeaponInventory();
	    this.showSpellInventory();
	}
	
	showSpellInventory() {
		var offset = 30;
		var s = 0.4;
		
		if (this.player == player2) {
			this.player.getAvailableSpells().forEach(function (spell, i) {
		    	context.drawImage(spell.sprite.img, 1150, 70+(i*offset), spell.sprite.width*s, spell.sprite.height*s)
			});
		} else {
			this.player.getAvailableSpells().forEach(function (spell, i) {
		    	context.drawImage(spell.sprite.img, 10, 70+(i*offset), spell.sprite.width*s, spell.sprite.height*s)
			});
		}
	}
	
	showWeaponInventory() {
		var offset = 20;
		var s = 0.8;
		
		if (this.player == player2) {
			this.player.getAvailableWeapons().forEach(function (weapon, i) {
		    	context.drawImage(weapon.sprite.img, 1150, 635-(i*offset), weapon.sprite.width*s, weapon.sprite.height*s)
			});
		} else {
			this.player.getAvailableWeapons().forEach(function (weapon, i) {
		    	context.drawImage(weapon.sprite.img, 10, 635-(i*offset), weapon.sprite.width*s, weapon.sprite.height*s)
			});
		}
	}
}
