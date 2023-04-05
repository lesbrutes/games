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
    
    showPlayer(context) {
		var s = this.scale; //Facteur d'aggrandissement
	    var step = Math.floor(this.player.spriteStep);
	    
	    context.drawImage(this.img, this.width*step, 0, this.width, this.height, this.player.positionX, this.player.positionY, this.width*s, this.height*s);
	    this.showWeaponInventory();
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


class WeaponSprite {
    constructor(source) {
        this.img = new Image();
        this.img.src = source;
	
        this.scale =  0.3;
        this.width = 280*this.scale;
        this.height = 100*this.scale;
        
        this.toRadians = Math.PI/180; 
    }
    
    show(context, angle, attachAtX, attachAtY, attachAtLeftX, attachAtLeftY, player) {
	    var angleInRadians;
	    var x;
	    var y;
	    
		if (player.direction == Direction.Left) {
			angleInRadians = (-angle+180)*this.toRadians;
			var x  = player.positionX + attachAtLeftX;
    		var y = player.positionY + attachAtLeftY;
		} else {
			angleInRadians = angle*this.toRadians;
			var x  = player.positionX + attachAtX;
    		var y = player.positionY + attachAtY;
		}

    	context.translate(x, y);
		context.rotate(angleInRadians);
		context.drawImage(this.img, 0, 0, this.width, this.height);
		context.rotate(-angleInRadians);
		context.translate(-x, -y);

    }
}

class SpellSprite {
    constructor(source) {
        this.img = new Image();
        this.img.src = source;
	
        this.scale = 1;
        this.width = 64*this.scale;
        this.height = 64*this.scale;
        this.angle = 0;
        
        this.toRadians = Math.PI/180; 
    }
    
    show(context, positionX, positionY) {
	    this.angle += 7;
	    var angleInRadians = this.angle*this.toRadians;

		context.translate(positionX, positionY);
		context.rotate(angleInRadians);
		context.drawImage(this.img, -this.width/2,-this.height/2, this.width, this.height);
		context.rotate(-angleInRadians);
		context.translate(-positionX, -positionY);

    }
}